function studyPanelSummaryLabelCore({ title = "", summaryLabel = "", useProgressiveDisclosure = false } = {}) {
  if (summaryLabel) return summaryLabel;
  return useProgressiveDisclosure ? progressiveDisclosureSummaryLabelCore(title) : `Show ${title}`;
}
