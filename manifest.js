function displayMetadata(manifest) {

  let label = ""

  if (manifest.label) {

    if (typeof manifest.label === "string") {
      label = manifest.label
    }

    else {

      const values = Object.values(manifest.label)

      if (values.length > 0) {
        label = values[0][0]
      }

    }

  }

  const el = document.getElementById("manifestLabel")

  if (label) {
    el.textContent = label
  }

}

function displayThumbnails(manifest) {

  const thumbs = document.getElementById("thumbs")

  thumbs.innerHTML = ""

  const items =
    manifest.items ||
    manifest.sequences?.[0]?.canvases

  if (!items) return

  items.forEach(canvas => {

    let thumb =
      canvas.thumbnail?.[0]?.id ||
      canvas.thumbnail?.id

    if (!thumb) return

    const img = document.createElement("img")

    img.src = thumb

    thumbs.appendChild(img)

  })

}
