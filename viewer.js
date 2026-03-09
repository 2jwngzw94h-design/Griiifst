let viewer = null;
let currentManifest = null;

grist.ready({
  requiredAccess: 'read table'
});

grist.onRecord(async record => {

  if (!record) return;

  const manifestUrl =
    record.manifest_url ||
    record.manifest ||
    record.iiif_manifest;

  if (!manifestUrl) {
    showMessage("Aucun manifest IIIF dans la ligne");
    return;
  }

  currentManifest = manifestUrl;

  await loadManifest(manifestUrl);

});
