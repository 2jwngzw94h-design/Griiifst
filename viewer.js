let currentManifest = null;
let mappedColumns = {};

function debug(msg, data) {
  const el = document.getElementById("message");
  el.style.display = "block";
  el.innerHTML = `<pre>${msg}\n${data ? JSON.stringify(data, null, 2) : ""}</pre>`;
  console.log(msg, data);
}

grist.ready({
  requiredAccess: "read table",
  columns: [
    { name: "manifest", title: "Manifest IIIF", type: "Text" }
  ]
});

grist.onOptions((options) => {
  mappedColumns = options?.columns || {};
  debug("Options / mapping reçus :", mappedColumns);
});

grist.onRecord(async (record, mappings) => {
  debug("Record reçu :", record);

  if (!record) {
    debug("Aucune ligne sélectionnée.", null);
    return;
  }

  const manifestColId =
    mappings?.manifest ||
    mappedColumns?.manifest;

  const manifestUrl = manifestColId ? record[manifestColId] : null;

  if (!manifestUrl) {
    debug("Aucune URL de manifest mappée.", { mappings, record });
    return;
  }

  currentManifest = manifestUrl;
  debug("Manifest trouvé :", { manifestUrl });

  await loadManifest(manifestUrl);
});
