"use strict";

// R46 governs evidence *about* an R45 comparison.  It deliberately preserves
// the comparison as an expressed-source artifact and makes no truth claim.
const normalize = value => String(value || "").trim().toLowerCase();
const stableList = values => [...new Set((values || []).map(normalize).filter(Boolean))].sort();

const RELATIONS = new Set([
  "SUPPORTS_MECHANISM_COMPARISON",
  "CHALLENGES_MECHANISM_COMPARISON",
  "QUALIFIES_MECHANISM_COMPARISON",
  "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE",
  "SHARES_UPSTREAM_COMPARISON_EVIDENCE",
  "DERIVED_COMPARISON_EVIDENCE",
  "TEMPORALLY_SUPPORTS_COMPARISON_CONTEXT",
  "ASSOCIATED_WITH_COMPARISON_CONTEXT",
  "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE",
  "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE"
]);

function relationFor(evidence = {}) {
  const requested = String(evidence.relation || evidence.kind || "").toUpperCase();
  if (evidence.duplicateOf) return "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE";
  if (evidence.sharedUpstream || (evidence.sharedLineage || []).length) return "SHARES_UPSTREAM_COMPARISON_EVIDENCE";
  if (evidence.derivedFrom) return "DERIVED_COMPARISON_EVIDENCE";
  if (evidence.temporalContext) return "TEMPORALLY_SUPPORTS_COMPARISON_CONTEXT";
  if (evidence.associatedContext) return "ASSOCIATED_WITH_COMPARISON_CONTEXT";
  if (RELATIONS.has(requested)) return requested;
  if (!evidence.id || !evidence.sourceIdentity || !evidence.sourceUnitRef) {
    return "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE";
  }
  return "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE";
}

function independenceFor(relation, evidence = {}) {
  if (relation === "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE") return "DUPLICATE";
  if (relation === "SHARES_UPSTREAM_COMPARISON_EVIDENCE") return "SHARED_UPSTREAM";
  if (relation === "DERIVED_COMPARISON_EVIDENCE") return "DERIVED";
  if (evidence.independent === true) return "INDEPENDENT";
  return "UNKNOWN";
}

function governComparisonEvidence(comparison = {}, evidence = {}) {
  const comparisonId = String(comparison.semanticIdentity || comparison.id || "");
  const relation = comparisonId ? relationFor(evidence) : "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE";
  const lineage = stableList([evidence.sourceIdentity, evidence.sourceUnitRef, ...(evidence.lineage || [])]);
  const identityParts = stableList([comparisonId, evidence.id, evidence.sourceIdentity, evidence.sourceUnitRef, relation]);

  return {
    semanticIdentity: `R46|${identityParts.join("|")}`,
    comparisonIdentity: comparisonId || null,
    comparisonRelation: comparison.comparisonRelation || null,
    mechanismReferences: stableList(comparison.mechanismReferences || []),
    evidenceRelation: relation,
    evidenceProvenance: {
      evidenceId: evidence.id || null,
      sourceIdentity: evidence.sourceIdentity || null,
      sourceUnitRef: evidence.sourceUnitRef || null,
      lineage,
      duplicateOf: evidence.duplicateOf || null,
      sharedUpstream: Boolean(evidence.sharedUpstream),
      sharedLineage: stableList(evidence.sharedLineage || []),
      derivedFrom: evidence.derivedFrom || null,
      temporalContext: evidence.temporalContext || null,
      associatedContext: evidence.associatedContext || null
    },
    independence: independenceFor(relation, evidence),
    objectiveMechanism: false,
    objectiveCausation: false,
    truthPromotion: false,
    validation: false,
    adjudication: false,
    winnerSelection: false,
    probability: 0,
    ranking: 0,
    authorityAssignment: false,
    independenceFromCount: false,
    duplicateOrSharedUpstreamPromotion: false,
    supportToTruth: false,
    challengeToDisproof: false,
    qualificationToRejection: false,
    eventCreated: false,
    userBeliefMutated: false,
    interventionSemantics: false,
    r45Mutated: false,
    network: 0
  };
}

module.exports = { governComparisonEvidence, RELATIONS };
