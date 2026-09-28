function studyPanelCardMetadataCore(title, body, meta = "") {
  return {
    titleText: title || "Untitled",
    bodyText: body || "No detail available.",
    metaText: meta || ""
  };
}
