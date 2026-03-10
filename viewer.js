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

  // nettoyage
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
    showMessage("Aucun manifest IIIF dans cette ligne")
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

    displayMetadata(manifest)

    displayThumbnails(manifest)

  }

  catch (err) {

    console.error(err)

    showMessage("Impossible de charger le manifest IIIF")

  }

}

grist.ready({

  requiredAccess: "read table"

})

grist.onRecord(async (record) => {

  console.log("Record reçu depuis Grist :", record)

  if (!record) {
    showMessage("Aucune ligne sélectionnée")
    return
  }

  const manifestUrl =
    record.manifest_url ||
    record.manifest ||
    record.iiif_manifest

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

document
  .getElementById("openMirador")
  .addEventListener("click", () => {

    if (!currentManifest) return

    const url =
      "https://projectmirador.org/embed/?iiif-content=" +
      encodeURIComponent(currentManifest)

    window.open(url, "_blank")

})
