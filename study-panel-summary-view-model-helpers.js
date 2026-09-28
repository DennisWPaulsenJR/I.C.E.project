function studyPanelGroupSummaryViewModelCore({ visibleEntries = 0, warningCount = 0, rendered = 0, notLoaded = 0, recordTotal = 0, matchCount = 0, term = "" } = {}) {
  const statusText = visibleEntries
    ? `${warningCount ? `${warningCount} warning(s)` : "Ready"}`
    : "Hidden by view";
  const countText = [
    `${visibleEntries} section(s)`,
    `${rendered} rendered`,
    notLoaded ? `${notLoaded} not loaded` : "",
    recordTotal ? `${recordTotal} record(s)` : ""
  ].filter(Boolean).join(" · ");
  const matchText = term ? `${matchCount} match(es)` : "";
  return { statusText, countText, matchText };
}
