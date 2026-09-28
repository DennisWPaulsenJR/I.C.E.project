function presentationSemanticWordingProvenanceLines({ source, label, layer, storageKey, scopePath, generated = true, rule = "" } = {}) {
  return [
    `Source: ${source || "I.C.E. Generated"}`,
    `Label: ${normalizeText(label || "Not recorded.")}`,
    layer ? `Layer: ${layer}` : "Layer: Not recorded.",
    storageKey ? `Storage key: ${storageKey}` : "Storage key: Not recorded.",
    scopePath ? `Scope path: ${scopePath}` : "Scope path: Not recorded.",
    `Generated or source-provided: ${generated ? "I.C.E. generated display wording" : "source-provided wording"}`,
    rule ? `Rule: ${rule}` : ""
  ].filter(Boolean);
}

function presentationSemanticEvidenceWeightLines({ evidenceType, evidenceStrength, sourceGrounding, supportingRecords = [], sourcePhrase = "" } = {}) {
  const records = asArray(supportingRecords).map((value) => normalizeText(value)).filter(Boolean);
  return [
    `Evidence Type: ${evidenceType || "Derived Semantic Evidence"}`,
    `Evidence Strength: ${evidenceStrength || "grounded by current semantic record"}`,
    `Source Grounding: ${normalizeText(sourceGrounding || sourcePhrase || "Not recorded.")}`,
    `Supporting Records: ${records.length ? records.slice(0, 5).join("; ") : "Not recorded."}`,
    records.length > 5 ? `Supporting Records Hidden: ${records.length - 5}` : ""
  ].filter(Boolean);
}
