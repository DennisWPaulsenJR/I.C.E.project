function scopeSnapshotReasonForInclusionRowsCore(provenance = {}) {
  return [
    ["Created by", provenance.createdBy],
    ["Rule", provenance.rule],
    ["Matched source", provenance.matchedSource],
    ["Context", provenance.context],
    ["Graph decision", provenance.graphDecision],
    ["Qualification", provenance.qualification],
    ["Confidence", provenance.confidence]
  ];
}

function scopeSnapshotProvenanceLinesCore(model = {}) {
  const path = Array.isArray(model.path) ? model.path : [];
  const item = model.item || {};
  const graphObject = model.graphObject || {};
  const record = model.record || {};
  if (model.selectionType === "edge") {
    return [
      `Graph object type: ${graphObject.objectType}`,
      `Relationship stable key: ${graphObject.graphKey}`,
      `Builder / projection path: Primary Evidence -> Positioned Snapshot Nodes -> Linear Scope Snapshot Edge`,
      `Source node: ${graphObject.sourceNode}`,
      `Target node: ${graphObject.targetNode}`,
      `Creation reason: ${graphObject.reasonForInclusion}`,
      `Relationship rule: ${item.relationshipRule || graphObject.rule}`,
      `Authority source: presentation authority only; connected records retain semantic authority.`,
      `Confidence inheritance: ${graphObject.confidence}`,
      `Verification status: ${graphObject.verification}`,
      `Evidence chain: ${(item.sourceReference || item.relationshipType || item.targetReference) ? [item.sourceReference, item.relationshipType, item.targetReference].filter(Boolean).join(" -> ") : graphObject.sourceReference}`,
      `Recorded provenance: ${item.provenance || graphObject.createdBy}`,
      `Diagnostics: ${graphObject.diagnostics}`
    ];
  }
  if (model.selectionType === "cluster") {
    const representativeRecords = Array.isArray(item.representativeRecords) ? item.representativeRecords : [];
    return [
      "Originating source record: clustered child records retain individual provenance",
      `Builder / promotion path: Primary Evidence -> Scoped semantic records -> Lane clustering -> Snapshot cluster`,
      `Intermediate derived layers: ${Array.isArray(item.dominantRecordTypes) && item.dominantRecordTypes.length ? item.dominantRecordTypes.join(", ") : "mixed scoped records"}`,
      "Authority source: presentation authority only; child records remain authoritative for meaning.",
      "Confidence inheritance: not inherited by cluster; inspect child records for confidence.",
      `Verification status: ${item.warningCount ? "review warnings present" : "verified presentation grouping"}`,
      `Evidence chain: ${representativeRecords.slice(0, 6).map((node) => node.reference?.label || node.label).join(" -> ") || "not recorded"}`,
      item.recordCount > representativeRecords.length ? `Show Full Provenance Chain: ${item.recordCount - representativeRecords.length} additional child record(s) available through zoom/detail.` : "Show Full Provenance Chain: representative child records shown above."
    ];
  }
  return [
    `Originating source record: ${model.originatingSource || item.reference?.label || model.activeScope || "not recorded"}`,
    `Builder / promotion path: ${path.join(" -> ")}`,
    `Intermediate derived layers: ${model.intermediateDerivedLayers || item.recordType || "snapshot node builder"}`,
    `Authority source: ${model.authoritySource || "primary evidence plus current scoped semantic record"}`,
    `Confidence inheritance: ${model.confidenceInheritance || item.confidence || "not recorded"}`,
    `Verification status: ${/unresolved|ambiguous/i.test(item.status || "") ? "review" : "verified display record"}`,
    `Evidence chain: ${model.evidenceChain || [item.reference?.label, item.recordType, "Snapshot Node"].filter(Boolean).join(" -> ")}`,
    item.provenance ? `Recorded provenance: ${item.provenance}` : "Missing provenance warning: snapshot node has no explicit provenance beyond its source record.",
    "Show Full Provenance Chain: use Open Inspector for the native record inspector and full scoped lineage."
  ];
}
