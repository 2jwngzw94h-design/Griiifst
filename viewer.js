let viewerInstance = null
let currentManifest = null

function showMessage(msg) {

  const el = document.getElementById("message")
  el.style.display = "block"
  el.textContent = msg

}

function hideMessage() {

  const el = document.getElementById("message")
  el.style.display = "none"

}

function displayViewer(manifestUrl) {

  const viewerContainer = document.getElementById("viewer")

  viewerContainer.innerHTML = ""

  viewerInstance = Mirador.viewer({
    id: "viewer",
    windows: [
      {
        manifestId: manifestUrl
      }
    ]
  })

}

async function loadManifest(url) {

  if (!url) {
    showMessage("Aucun manifest IIIF trouvé")
    return
  }

  try {

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error("Manifest inaccessible")
    }

    const manifest = await res.json()

    hideMessage()

    displayViewer(url)

    if (typeof displayMetadata === "function") {
      displayMetadata(manifest)
    }

    if (typeof displayThumbnails === "function") {
      displayThumbnails(manifest)
    }

  }

  catch (err) {

    console.error(err)

    showMessage("Impossible de charger le manifest")

  }

}


/* --------------------------
   INITIALISATION GRIST
--------------------------- */

grist.ready({

  requiredAccess: "read table",

  columns: [
    {
      name: "manifest",
      title: "Manifest IIIF",
      type: "Text"
    }
  ]

})


/* --------------------------
   RÉCEPTION DES LIGNES
--------------------------- */

grist.onRecord(async (record, mappings) => {

  console.log("record reçu", record)

  if (!record) {
    showMessage("Aucune ligne sélectionnée")
    return
  }

  const manifestColumn = mappings.manifest

  const manifestUrl = record[manifestColumn]

  if (!manifestUrl) {
    showMessage("La ligne ne contient pas d'URL de manifest")
    return
  }

  if (manifestUrl === currentManifest) {
    return
  }

  currentManifest = manifestUrl

  await loadManifest(manifestUrl)

})


/* --------------------------
   BOUTON OUVRIR MIRADOR
--------------------------- */

document
  .getElementById("openMirador")
  .addEventListener("click", () => {

    if (!currentManifest) return

    const url =
      "https://projectmirador.org/embed/?iiif-content=" +
      encodeURIComponent(currentManifest)

    window.open(url, "_blank")

})
