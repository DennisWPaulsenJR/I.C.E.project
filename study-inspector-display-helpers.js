function normalizeInspectorDisplayText(value) {
  return value == null ? "" : String(value);
}

function progressiveDisclosureSummaryLabelCore(title) {
  const normalizedTitle = normalizeInspectorDisplayText(title).toLowerCase();
  if (/reasoning path|semantic resolution trace/.test(normalizedTitle)) return "Show Reasoning";
  if (/provenance|wording provenance|source\b|source phrase|source wording|derived meaning/.test(normalizedTitle)) return "Show Provenance";
  if (/evidence|grounding|supporting layers|supporting records|related semantic layers|semantic layers|strict layers|grounded layers|elaborate layers|technical detail|scope\b|storage|adapter/.test(normalizedTitle)) return "Show Evidence";
  return `Show ${normalizeInspectorDisplayText(title).toLowerCase()}`;
}

function shouldCollapseStudyDetailCore(title, options = {}) {
  if (options.collapsed === false || options.alwaysVisible) return false;
  const normalizedTitle = normalizeInspectorDisplayText(title).toLowerCase();
  return /source phrase|source wording|derived meaning|provenance|wording provenance|evidence weight|^evidence$|reasoning path|technical detail|supporting layers|supporting records|related semantic layers|strict layers|grounded layers|elaborate layers|grounding|source grounding|source evidence|supporting evidence|key evidence|full evidence|related evidence|grounding \/ evidence|semantic resolution trace/.test(normalizedTitle);
}
