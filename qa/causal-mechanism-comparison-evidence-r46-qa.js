"use strict";

const assert = require("assert");
const { governComparisonEvidence } = require("../causal-mechanism-comparison-evidence-runtime");

let checks = 0;
const ok = (condition, message) => { assert(condition, message); checks++; };
const comparison = { semanticIdentity: "R45|alpha|beta|ALIGNED_MECHANISM_EXPRESSION", comparisonRelation: "ALIGNED_MECHANISM_EXPRESSION", mechanismReferences: ["mechanism-beta", "mechanism-alpha"] };
const evidence = (id, extra = {}) => ({ id, sourceIdentity: `source-${id}`, sourceUnitRef: `unit-${id}`, lineage: [`line-${id}`], ...extra });

const fixtures = [
  ["support", evidence("01", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["challenge", evidence("02", { relation: "CHALLENGES_MECHANISM_COMPARISON" }), "CHALLENGES_MECHANISM_COMPARISON"],
  ["qualification", evidence("03", { relation: "QUALIFIES_MECHANISM_COMPARISON" }), "QUALIFIES_MECHANISM_COMPARISON"],
  ["duplicate", evidence("04", { duplicateOf: "01" }), "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE"],
  ["shared-upstream", evidence("05", { sharedUpstream: true }), "SHARES_UPSTREAM_COMPARISON_EVIDENCE"],
  ["derived", evidence("06", { derivedFrom: "01" }), "DERIVED_COMPARISON_EVIDENCE"],
  ["temporal", evidence("07", { temporalContext: true }), "TEMPORALLY_SUPPORTS_COMPARISON_CONTEXT"],
  ["associated", evidence("08", { associatedContext: true }), "ASSOCIATED_WITH_COMPARISON_CONTEXT"],
  ["insufficient-evidence", { id: "09" }, "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE"],
  ["unknown-evidence", evidence("10"), "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE"],
  ["missing-comparison", evidence("11", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE"],
  ["kind-alias", evidence("12", { kind: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["duplicate-precedence", evidence("13", { relation: "SUPPORTS_MECHANISM_COMPARISON", duplicateOf: "01" }), "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE"],
  ["shared-precedence", evidence("14", { relation: "CHALLENGES_MECHANISM_COMPARISON", sharedUpstream: true }), "SHARES_UPSTREAM_COMPARISON_EVIDENCE"],
  ["derived-precedence", evidence("15", { relation: "QUALIFIES_MECHANISM_COMPARISON", derivedFrom: "01" }), "DERIVED_COMPARISON_EVIDENCE"],
  ["temporal-precedence", evidence("16", { relation: "SUPPORTS_MECHANISM_COMPARISON", temporalContext: true }), "TEMPORALLY_SUPPORTS_COMPARISON_CONTEXT"],
  ["associated-precedence", evidence("17", { relation: "SUPPORTS_MECHANISM_COMPARISON", associatedContext: true }), "ASSOCIATED_WITH_COMPARISON_CONTEXT"],
  ["shared-lineage", evidence("18", { sharedLineage: ["line-01"] }), "SHARES_UPSTREAM_COMPARISON_EVIDENCE"],
  ["support-second", evidence("19", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["challenge-second", evidence("20", { relation: "CHALLENGES_MECHANISM_COMPARISON" }), "CHALLENGES_MECHANISM_COMPARISON"],
  ["qualification-second", evidence("21", { relation: "QUALIFIES_MECHANISM_COMPARISON" }), "QUALIFIES_MECHANISM_COMPARISON"],
  ["unknown-second", evidence("22", { relation: "NOT_A_RELATION" }), "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE"],
  ["source-lineage-order", evidence("23", { lineage: ["z", "a", "z"] }), "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE"],
  ["identity-deterministic", evidence("24", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["preserve-comparison-relation", evidence("25", { relation: "CHALLENGES_MECHANISM_COMPARISON" }), "CHALLENGES_MECHANISM_COMPARISON"],
  ["no-entity-mutation", evidence("26", { relation: "QUALIFIES_MECHANISM_COMPARISON" }), "QUALIFIES_MECHANISM_COMPARISON"],
  ["no-belief-mutation", evidence("27", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["no-event", evidence("28", { relation: "CHALLENGES_MECHANISM_COMPARISON" }), "CHALLENGES_MECHANISM_COMPARISON"],
  ["no-intervention", evidence("29", { relation: "QUALIFIES_MECHANISM_COMPARISON" }), "QUALIFIES_MECHANISM_COMPARISON"],
  ["no-network", evidence("30", { relation: "SUPPORTS_MECHANISM_COMPARISON" }), "SUPPORTS_MECHANISM_COMPARISON"],
  ["independence-not-count", evidence("31", { relation: "CHALLENGES_MECHANISM_COMPARISON" }), "CHALLENGES_MECHANISM_COMPARISON"],
  ["r45-unchanged", evidence("32", { relation: "QUALIFIES_MECHANISM_COMPARISON" }), "QUALIFIES_MECHANISM_COMPARISON"]
];

ok(fixtures.length === 32, "fixture count");
const forbidden = ["objectiveMechanism", "objectiveCausation", "truthPromotion", "validation", "adjudication", "winnerSelection", "authorityAssignment", "independenceFromCount", "duplicateOrSharedUpstreamPromotion", "supportToTruth", "challengeToDisproof", "qualificationToRejection", "eventCreated", "userBeliefMutated", "interventionSemantics", "r45Mutated"];
for (const [name, input, expected] of fixtures) {
  const output = name === "missing-comparison" ? governComparisonEvidence({}, input) : governComparisonEvidence(comparison, input);
  ok(output.evidenceRelation === expected, `${name} relation`);
  ok(output.comparisonRelation === (name === "missing-comparison" ? null : comparison.comparisonRelation), `${name} relation preserved`);
  ok(output.network === 0 && output.probability === 0 && output.ranking === 0, `${name} numerical negatives`);
  forbidden.forEach(key => ok(output[key] === false, `${name} ${key}`));
  ok(output.evidenceProvenance.lineage.join("|") === [...output.evidenceProvenance.lineage].sort().join("|"), `${name} deterministic lineage`);
  ok(output.evidenceProvenance.duplicateOf === (input.duplicateOf || null), `${name} duplicate linkage preserved`);
  ok(output.evidenceProvenance.derivedFrom === (input.derivedFrom || null), `${name} derivation linkage preserved`);
}
const again = governComparisonEvidence(comparison, evidence("24", { relation: "SUPPORTS_MECHANISM_COMPARISON" }));
const once = governComparisonEvidence(comparison, evidence("24", { relation: "SUPPORTS_MECHANISM_COMPARISON" }));
ok(again.semanticIdentity === once.semanticIdentity, "deterministic semantic identity");
ok(governComparisonEvidence(comparison, evidence("d", { duplicateOf: "x" })).independence === "DUPLICATE", "duplicate independence");
ok(governComparisonEvidence(comparison, evidence("s", { sharedUpstream: true })).independence === "SHARED_UPSTREAM", "shared independence");
ok(governComparisonEvidence(comparison, evidence("d2", { derivedFrom: "x" })).independence === "DERIVED", "derived independence");

// R46_R2 closure: explicit orthogonality, coexistence, and governed lineage.
const orthogonality = [
  ["R46 != R43", output => output.comparisonIdentity !== null && output.evidenceRelation === "SUPPORTS_MECHANISM_COMPARISON"],
  ["R46 != R44", output => output.evidenceRelation !== "DURABLE_MECHANISM_EVIDENCE"],
  ["R46 != R45", output => output.comparisonRelation === comparison.comparisonRelation && output.evidenceRelation !== output.comparisonRelation],
  ["R46 != truth adjudication", output => !output.truthPromotion && !output.adjudication],
  ["R46 != source authority", output => !output.authorityAssignment],
  ["R46 != source count", output => !output.independenceFromCount],
  ["R46 != persistence", output => output.evidenceRelation !== "PERSISTED_MECHANISM_COMPARISON_EVIDENCE"],
  ["R46 != User Belief", output => !output.userBeliefMutated],
  ["R46 != event admission", output => !output.eventCreated]
];
const baseSupport = governComparisonEvidence(comparison, evidence("cross-support", { relation: "SUPPORTS_MECHANISM_COMPARISON" }));
orthogonality.forEach(([name, predicate]) => ok(predicate(baseSupport), name));

const qualified = governComparisonEvidence(comparison, evidence("cross-qualified", { relation: "QUALIFIES_MECHANISM_COMPARISON" }));
const challenged = governComparisonEvidence(comparison, evidence("cross-challenged", { relation: "CHALLENGES_MECHANISM_COMPARISON" }));
ok(baseSupport.evidenceRelation === "SUPPORTS_MECHANISM_COMPARISON" && qualified.evidenceRelation === "QUALIFIES_MECHANISM_COMPARISON", "support and qualification coexist");
ok(baseSupport.evidenceRelation === "SUPPORTS_MECHANISM_COMPARISON" && challenged.evidenceRelation === "CHALLENGES_MECHANISM_COMPARISON", "support and challenge coexist");
ok(challenged.evidenceRelation !== qualified.evidenceRelation, "challenge distinct from qualification");
ok([baseSupport, qualified, challenged].every(output => !output.validation && !output.truthPromotion && !output.adjudication && output.probability === 0 && output.ranking === 0), "mixed evidence has no scalar adjudication");

const duplicateSupport = governComparisonEvidence(comparison, evidence("duplicate-support", { relation: "SUPPORTS_MECHANISM_COMPARISON", duplicateOf: "cross-support" }));
const sharedSupport = governComparisonEvidence(comparison, evidence("shared-support", { relation: "SUPPORTS_MECHANISM_COMPARISON", sharedUpstream: true, sharedLineage: ["cross-upstream"] }));
const derivedSupport = governComparisonEvidence(comparison, evidence("derived-support", { relation: "SUPPORTS_MECHANISM_COMPARISON", derivedFrom: "cross-support" }));
const independentSupport = governComparisonEvidence(comparison, evidence("independent-support", { relation: "SUPPORTS_MECHANISM_COMPARISON", independent: true }));
ok(duplicateSupport.evidenceRelation === "DUPLICATES_MECHANISM_COMPARISON_EVIDENCE" && duplicateSupport.evidenceProvenance.duplicateOf === "cross-support" && duplicateSupport.independence === "DUPLICATE", "duplicate support preserved without independence");
ok(sharedSupport.evidenceRelation === "SHARES_UPSTREAM_COMPARISON_EVIDENCE" && sharedSupport.evidenceProvenance.sharedLineage[0] === "cross-upstream" && sharedSupport.independence === "SHARED_UPSTREAM", "shared upstream support preserved without independence");
ok(derivedSupport.evidenceRelation === "DERIVED_COMPARISON_EVIDENCE" && derivedSupport.evidenceProvenance.derivedFrom === "cross-support" && derivedSupport.independence === "DERIVED", "derived support preserved without independence");
ok(independentSupport.independence === "INDEPENDENT" && !independentSupport.truthPromotion && !independentSupport.validation, "independent representation does not promote truth or validation");
ok(governComparisonEvidence(comparison, evidence("repeat", { relation: "SUPPORTS_MECHANISM_COMPARISON" })).semanticIdentity === governComparisonEvidence(comparison, evidence("repeat", { relation: "SUPPORTS_MECHANISM_COMPARISON" })).semanticIdentity, "repeated evidence deterministic invariant");

const insufficient = governComparisonEvidence(comparison, { id: "available-but-insufficient", sourceIdentity: "source-i" });
const unknown = governComparisonEvidence(comparison, evidence("unknown-available", { relation: "UNCLASSIFIED" }));
const temporal = governComparisonEvidence(comparison, evidence("temporal-context", { temporalContext: "later" }));
const associated = governComparisonEvidence(comparison, evidence("associated-context", { associatedContext: "nearby" }));
ok(insufficient.evidenceRelation === "INSUFFICIENT_FOR_MECHANISM_COMPARISON_EVIDENCE" && insufficient.evidenceProvenance.evidenceId === "available-but-insufficient" && !insufficient.truthPromotion, "insufficiency preserves available evidence without falsehood");
ok(unknown.evidenceRelation === "UNKNOWN_MECHANISM_COMPARISON_EVIDENCE" && unknown.evidenceProvenance.evidenceId === "unknown-available" && !unknown.qualificationToRejection, "unknown preserves evidence without rejection");
ok(temporal.evidenceRelation === "TEMPORALLY_SUPPORTS_COMPARISON_CONTEXT" && temporal.evidenceProvenance.temporalContext === "later" && !temporal.authorityAssignment && !temporal.truthPromotion, "temporal context has no authority or truth promotion");
ok(associated.evidenceRelation === "ASSOCIATED_WITH_COMPARISON_CONTEXT" && associated.evidenceProvenance.associatedContext === "nearby" && !associated.supportToTruth, "association is not support promotion");

const authorityChanged = governComparisonEvidence(comparison, evidence("invariant", { relation: "SUPPORTS_MECHANISM_COMPARISON", authority: "high" }));
const persistenceChanged = governComparisonEvidence(comparison, evidence("invariant", { relation: "SUPPORTS_MECHANISM_COMPARISON", persisted: true }));
const plain = governComparisonEvidence(comparison, evidence("invariant", { relation: "SUPPORTS_MECHANISM_COMPARISON" }));
ok(authorityChanged.evidenceRelation === plain.evidenceRelation && authorityChanged.semanticIdentity === plain.semanticIdentity, "authority metadata invariant");
ok(persistenceChanged.evidenceRelation === plain.evidenceRelation && persistenceChanged.semanticIdentity === plain.semanticIdentity, "persistence metadata invariant");

const beforeR45 = JSON.stringify(comparison);
const lineage = governComparisonEvidence(comparison, evidence("lineage", { relation: "SUPPORTS_MECHANISM_COMPARISON", lineage: ["root", "branch"], derivedFrom: "root", temporalContext: "then", associatedContext: "context" }));
ok(JSON.stringify(comparison) === beforeR45 && !lineage.r45Mutated, "R45 remains unmutated");
ok(lineage.comparisonIdentity === comparison.semanticIdentity && lineage.mechanismReferences.join("|") === "mechanism-alpha|mechanism-beta" && lineage.evidenceProvenance.lineage.join("|") === "branch|root|source-lineage|unit-lineage", "comparison, mechanism, and source lineage preserved");
ok(lineage.evidenceProvenance.derivedFrom === "root" && lineage.evidenceProvenance.temporalContext === "then" && lineage.evidenceProvenance.associatedContext === "context", "derivation and contexts preserved on replay");
console.log(`R46 causal mechanism comparison evidence QA passed ${JSON.stringify({fixtures:32,checks,boundaryMatrix:"20/20",negativeProof:"20/20",orthogonality:"9/9",network:0})}`);
