function studyPanelCountLabelCore(recordCount) {
  return recordCount == null ? "Not loaded" : `${recordCount} record(s)`;
}

function studyPanelStatusLineCore(recordCount, rendered = false) {
  if (rendered) return `${studyPanelCountLabelCore(recordCount)} · Details rendered.`;
  if (recordCount == null) return "Details not rendered.";
  return recordCount > 0 ? `${recordCount} record(s) · Details not rendered.` : "No records · Details not rendered.";
}

function studyPanelPlaceholderTextCore(text = "Not rendered yet. Expand to load details for the current Study Scope.") {
  return text == null || text === "" ? "Not rendered yet. Expand to load details for the current Study Scope." : String(text);
}

function studyPanelEmptyStateMessageCore(message = "No graphable records are available for the current study.") {
  return message == null || message === "" ? "No graphable records are available for the current study." : String(message);
}
