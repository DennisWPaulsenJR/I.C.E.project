function diagnosticDetailLine(label, value) {
  const normalized = typeof globalThis.ICENormalizeText === "function" ? globalThis.ICENormalizeText(value || "Not recorded") : String(value || "Not recorded").replace(/\s+/g, " ").trim();
  return `${label}: ${normalized}`;
}

function diagnosticDisplayValue(value, available = true, loadedFallback = "Not loaded") {
  if (!available) return loadedFallback;
  const normalized = typeof globalThis.ICENormalizeText === "function" ? globalThis.ICENormalizeText(value) : String(value ?? "").replace(/\s+/g, " ").trim();
  return normalized || loadedFallback;
}

function diagnosticStatusValue(value, loadedFallback = "Not loaded") {
  return diagnosticDisplayValue(value, true, loadedFallback);
}

function diagnosticPresentationCount(value, available = fullStudyDataLoaded) {
  return diagnosticDisplayValue(value, available);
}

function diagnosticFailureMessage(prefix, error, fallbackMessage = "Unknown error") {
  const message = error && typeof error === "object" && "message" in error
    ? String(error.message ?? "")
    : (error == null ? "" : String(error));
  return `${prefix}: ${message || fallbackMessage}`;
}
