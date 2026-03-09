async function loadManifest(url) {

  try {

    const res = await fetch(url);
    const manifest = await res.json();

    displayMetadata(manifest);
    displayViewer(url);
    displayThumbnails(manifest);

  } catch (e) {

    showMessage("Impossible de charger le manifest");

  }

}

function displayViewer(manifestUrl) {

  document.getElementById("viewer").innerHTML = "";

  Mirador.viewer({

    id: "viewer",

    windows: [
      {
        manifestId: manifestUrl
      }
    ]

  });

}

function displayMetadata(manifest) {

  let label = "";

  if (manifest.label) {

    if (typeof manifest.label === "string") {
      label = manifest.label;
    } else {
      label = Object.values(manifest.label)[0][0];
    }

  }

  document.getElementById("manifestLabel").innerText = label;

}

function displayThumbnails(manifest) {

  const thumbs = document.getElementById("thumbs");

  thumbs.innerHTML = "";

  const items =
    manifest.items ||
    manifest.sequences?.[0]?.canvases;

  if (!items) return;

  items.forEach(canvas => {

    let thumb =
      canvas.thumbnail?.[0]?.id ||
      canvas.thumbnail?.id;

    if (!thumb) return;

    const img = document.createElement("img");

    img.src = thumb;

    thumbs.appendChild(img);

  });

}

function showMessage(msg) {

  document.getElementById("message").innerText = msg;

}
