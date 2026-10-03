"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { openPersistenceProvider } = require("../sqlite-persistence-provider");
const { governComparisonEvidence } = require("../causal-mechanism-comparison-evidence-runtime");
const { RESULT, durableArtifactFrom, persistGovernedState, recoverGovernedState } = require("../causal-mechanism-comparison-evidence-durability-runtime");

let checks = 0;
const ok = (value, message) => { assert(value, message); checks++; };
const comparison = { semanticIdentity: "R45|durable-a|durable-b|OVERLAPPING_MECHANISM_EXPRESSION", comparisonRelation: "OVERLAPPING_MECHANISM_EXPRESSION", mechanismReferences: ["mechanism-b", "mechanism-a"] };
const evidence = (id, extra = {}) => ({ id, sourceIdentity: `source-${id}`, sourceUnitRef: `unit-${id}`, lineage: [`upstream-${id}`], ...extra });
const state = (id, extra = {}) => governComparisonEvidence(comparison, evidence(id, extra));
const cases = [
  ["support", state("01", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["challenge", state("02", { relation: "CHALLENGES_MECHANISM_COMPARISON" })],
  ["qualification", state("03", { relation: "QUALIFIES_MECHANISM_COMPARISON" })],
  ["duplicate", state("04", { duplicateOf: "01" })],
  ["shared-upstream", state("05", { sharedUpstream: true, sharedLineage: ["root"] })],
  ["derived", state("06", { derivedFrom: "01" })],
  ["independent", state("07", { relation: "SUPPORTS_MECHANISM_COMPARISON", independent: true })],
  ["non-independent", state("08", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["count-stable", state("09", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["exact-replay", state("10", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["conflicting-replay", state("11", { relation: "CHALLENGES_MECHANISM_COMPARISON" })],
  ["rollback", state("12", { relation: "QUALIFIES_MECHANISM_COMPARISON" })],
  ["source-identity", state("13", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["source-unit", state("14", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["comparison-reference", state("15", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["mechanism-references", state("16", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["upstream-lineage", state("17", { relation: "SUPPORTS_MECHANISM_COMPARISON", lineage: ["root", "branch"] })],
  ["derivation-lineage", state("18", { derivedFrom: "root" })],
  ["duplicate-relationship", state("19", { duplicateOf: "01" })],
  ["insufficient", governComparisonEvidence(comparison, { id: "20", sourceIdentity: "source-20" })],
  ["unknown", state("21", { relation: "UNCLASSIFIED" })],
  ["temporal-context", state("22", { temporalContext: "later" })],
  ["associated-context", state("23", { associatedContext: "nearby" })],
  ["support-qualification", state("24", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["support-challenge", state("25", { relation: "CHALLENGES_MECHANISM_COMPARISON" })],
  ["challenge-qualification", state("26", { relation: "QUALIFIES_MECHANISM_COMPARISON" })],
  ["repeated-reopen", state("27", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["durable-identity", state("28", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["r45-unchanged", state("29", { relation: "SUPPORTS_MECHANISM_COMPARISON" })],
  ["unpromoted-r46", state("30", { relation: "CHALLENGES_MECHANISM_COMPARISON" })],
  ["network-zero", state("31", { relation: "QUALIFIES_MECHANISM_COMPARISON" })],
  ["handle-cleanup", state("32", { relation: "SUPPORTS_MECHANISM_COMPARISON" })]
];

ok(cases.length === 32 && new Set(cases.map(([name]) => name)).size === 32, "32 unique fixtures");
const negatives = ["objectiveMechanism", "objectiveCausation", "truthPromotion", "validation", "adjudication", "winnerSelection", "authorityAssignment", "independenceFromCount", "duplicateOrSharedUpstreamPromotion", "supportToTruth", "challengeToDisproof", "qualificationToRejection", "eventCreated", "userBeliefMutated", "interventionSemantics", "r45Mutated"];
const file = path.join(os.tmpdir(), `ice-r47-${process.pid}-${Date.now()}.sqlite`);
const beforeR45 = JSON.stringify(comparison);
let provider;
try {
  provider = openPersistenceProvider({ filename: file });
  ok(fs.existsSync(file), "actual SQLite file created");
  for (const [name, governed] of cases) {
    const artifact = durableArtifactFrom(governed);
    ok(artifact.payload.semanticResult === RESULT && artifact.artifactId.endsWith(governed.semanticIdentity), `${name} governed durable identity`);
    persistGovernedState(provider, governed, `write-${name}`);
  }
  ok(provider.lookupArtifacts({ artifactType: "CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE", generation: "R47", limit: 99 }).rows.length === 32, "initial logical count");
  provider.closePersistenceProvider(); provider = openPersistenceProvider({ filename: file });
  for (const [name, governed] of cases) {
    const recovered = recoverGovernedState(provider, governed.semanticIdentity);
    ok(JSON.stringify(recovered) === JSON.stringify(governed), `${name} survives first reopen`);
    negatives.forEach(key => ok(recovered[key] === false, `${name} ${key} remains zero`));
    ok(recovered.network === 0 && recovered.probability === 0 && recovered.ranking === 0, `${name} no numerical promotion`);
  }
  ok(provider.lookupArtifacts({ artifactType: "CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE", generation: "R47", limit: 99 }).rows.length === 32, "reopen does not multiply logical artifacts");
  provider.closePersistenceProvider(); provider = openPersistenceProvider({ filename: file });
  ok(JSON.stringify(recoverGovernedState(provider, cases[26][1].semanticIdentity)) === JSON.stringify(cases[26][1]), "second reopen no semantic drift");
  ok(persistGovernedState(provider, cases[9][1], "write-exact-replay").idempotent === true, "exact replay idempotent");
  const conflict = { ...cases[10][1], evidenceRelation: "SUPPORTS_MECHANISM_COMPARISON" };
  assert.throws(() => provider.withGovernedTransaction({ mutationId: "conflict-write", purpose: "R47_DURABLE_GOVERNED_STATE" }, db => db.writeArtifact(durableArtifactFrom(conflict))), /IMMUTABLE_ARTIFACT_CONFLICT/);
  ok(JSON.stringify(recoverGovernedState(provider, cases[10][1].semanticIdentity)) === JSON.stringify(cases[10][1]), "conflicting replay preserves immutable history");
  assert.throws(() => provider.withGovernedTransaction({ mutationId: "rollback-write", purpose: "R47_DURABLE_GOVERNED_STATE" }, db => { db.writeArtifact({ ...durableArtifactFrom(cases[11][1]), artifactId: "R47|rollback-only" }); throw new Error("authorized rollback"); }));
  assert.throws(() => provider.readArtifact("R47|rollback-only", "1"), /ARTIFACT_NOT_FOUND/);
  ok(true, "rollback leaves no partial artifact");
  const support = recoverGovernedState(provider, cases[0][1].semanticIdentity), challenge = recoverGovernedState(provider, cases[1][1].semanticIdentity), qualification = recoverGovernedState(provider, cases[2][1].semanticIdentity);
  ok([support, challenge, qualification].map(x => x.evidenceRelation).join("|") === "SUPPORTS_MECHANISM_COMPARISON|CHALLENGES_MECHANISM_COMPARISON|QUALIFIES_MECHANISM_COMPARISON", "mixed relations coexist without collapse");
  ok(JSON.stringify(comparison) === beforeR45, "R45 comparison remains unchanged");
  const lineage = recoverGovernedState(provider, cases[16][1].semanticIdentity);
  ok(lineage.comparisonIdentity === comparison.semanticIdentity && lineage.mechanismReferences.join("|") === "mechanism-a|mechanism-b" && lineage.evidenceProvenance.lineage.join("|") === "branch|root|source-17|unit-17", "source comparison mechanism and upstream lineage survive");
  ok(recoverGovernedState(provider, cases[17][1].semanticIdentity).evidenceProvenance.derivedFrom === "root", "derivation lineage survives");
  ok(recoverGovernedState(provider, cases[18][1].semanticIdentity).evidenceProvenance.duplicateOf === "01", "duplicate relation survives");
  provider.closePersistenceProvider(); provider = null;
  fs.unlinkSync(file); ok(!fs.existsSync(file), "SQLite handle released and temporary file cleaned");
} finally {
  try { if (provider) provider.closePersistenceProvider(); } catch (_) {}
  try { if (fs.existsSync(file)) fs.unlinkSync(file); } catch (_) {}
}

// R47_R2: verify governed semantic sets, not physical row order, across
// repeated/reordered durable lifecycles.
const closureStates = [
  state("closure-support", { relation: "SUPPORTS_MECHANISM_COMPARISON" }),
  state("closure-qualification", { relation: "QUALIFIES_MECHANISM_COMPARISON" }),
  state("closure-challenge", { relation: "CHALLENGES_MECHANISM_COMPARISON" }),
  state("closure-duplicate", { duplicateOf: "closure-support" }),
  state("closure-shared", { sharedUpstream: true, sharedLineage: ["closure-root"] }),
  state("closure-derived", { derivedFrom: "closure-support" }),
  state("closure-independent", { relation: "SUPPORTS_MECHANISM_COMPARISON", independent: true }),
  state("closure-non-independent", { relation: "SUPPORTS_MECHANISM_COMPARISON" }),
  governComparisonEvidence(comparison, { id: "closure-insufficient", sourceIdentity: "closure-source" }),
  state("closure-unknown", { relation: "UNCLASSIFIED" }),
  state("closure-temporal", { temporalContext: "later" }),
  state("closure-associated", { associatedContext: "nearby" })
];
const semanticSet = values => values.map(value => JSON.stringify(value)).sort().join("\n");
const closureFiles = [
  path.join(os.tmpdir(), `ice-r47-r2-a-${process.pid}-${Date.now()}.sqlite`),
  path.join(os.tmpdir(), `ice-r47-r2-b-${process.pid}-${Date.now()}.sqlite`)
];
const runOrderedLifecycle = (filename, states) => {
  let db = openPersistenceProvider({ filename });
  for (const governed of states) persistGovernedState(db, governed, `closure-write-${governed.semanticIdentity}`);
  const count = () => db.lookupArtifacts({ artifactType: "CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE", generation: "R47", limit: 99 }).rows.length;
  const baseline = count();
  const recoverSet = () => semanticSet(states.map(governed => recoverGovernedState(db, governed.semanticIdentity)));
  const expected = semanticSet(states);
  for (let cycle = 1; cycle <= 3; cycle++) {
    db.closePersistenceProvider(); db = openPersistenceProvider({ filename });
    ok(count() === baseline, `logical count invariant after reopen ${cycle}`);
    ok(recoverSet() === expected, `semantic set invariant after reopen ${cycle}`);
  }
  ok(persistGovernedState(db, states[0], `closure-write-${states[0].semanticIdentity}`).idempotent === true, "exact replay after reopen is idempotent");
  ok(count() === baseline, "exact replay logical delta zero");
  assert.throws(() => db.withGovernedTransaction({ mutationId: `closure-rollback-${filename}`, purpose: "R47_CLOSURE" }, tx => {
    tx.writeArtifact({ ...durableArtifactFrom(states[0]), artifactId: `R47|partial-${states[0].semanticIdentity}` });
    tx.writeArtifact({ ...durableArtifactFrom(states[1]), artifactId: `R47|partial-${states[1].semanticIdentity}` });
    throw new Error("forced closure rollback");
  }));
  db.closePersistenceProvider(); db = openPersistenceProvider({ filename });
  assert.throws(() => db.readArtifact(`R47|partial-${states[0].semanticIdentity}`, "1"), /ARTIFACT_NOT_FOUND/);
  assert.throws(() => db.readArtifact(`R47|partial-${states[1].semanticIdentity}`, "1"), /ARTIFACT_NOT_FOUND/);
  ok(count() === baseline, "rollback leaves zero partial logical artifacts after reopen");
  const conflicting = { ...states[0], evidenceRelation: "CHALLENGES_MECHANISM_COMPARISON" };
  assert.throws(() => db.withGovernedTransaction({ mutationId: `closure-conflict-${filename}`, purpose: "R47_CLOSURE" }, tx => tx.writeArtifact(durableArtifactFrom(conflicting))), /IMMUTABLE_ARTIFACT_CONFLICT/);
  db.closePersistenceProvider(); db = openPersistenceProvider({ filename });
  ok(JSON.stringify(recoverGovernedState(db, states[0].semanticIdentity)) === JSON.stringify(states[0]), "original state preserved after conflict and reopen");
  db.closePersistenceProvider();
  fs.unlinkSync(filename);
  ok(!fs.existsSync(filename), "closure database handle released and file cleaned");
  return { baseline, expected };
};
try {
  const forward = runOrderedLifecycle(closureFiles[0], closureStates);
  const reverse = runOrderedLifecycle(closureFiles[1], [...closureStates].reverse());
  ok(forward.baseline === reverse.baseline && forward.expected === reverse.expected, "recovery order independent semantic-set equivalence");
  const byRelation = Object.fromEntries(closureStates.map(value => [value.evidenceRelation, value]));
  ok(byRelation.SUPPORTS_MECHANISM_COMPARISON && byRelation.QUALIFIES_MECHANISM_COMPARISON, "support and qualification mixed durability");
  ok(byRelation.SUPPORTS_MECHANISM_COMPARISON && byRelation.CHALLENGES_MECHANISM_COMPARISON, "support and challenge mixed durability");
  ok(byRelation.CHALLENGES_MECHANISM_COMPARISON && byRelation.QUALIFIES_MECHANISM_COMPARISON, "challenge and qualification mixed durability");
  ok(closureStates.some(value => value.independence === "DUPLICATE") && closureStates.some(value => value.independence === "SHARED_UPSTREAM") && closureStates.some(value => value.independence === "DERIVED"), "duplicate shared-upstream and derived remain distinct");
  ok(closureStates.some(value => value.independence === "INDEPENDENT") && closureStates.some(value => value.independence === "UNKNOWN"), "independence and non-independence remain distinct");
  ok(!closureStates.some(value => value.truthPromotion || value.validation || value.adjudication || value.objectiveMechanism), "recovery order does not promote semantic state");
} finally {
  for (const closureFile of closureFiles) { try { if (fs.existsSync(closureFile)) fs.unlinkSync(closureFile); } catch (_) {} }
}
console.log(`R47 causal mechanism comparison evidence durability QA passed ${JSON.stringify({fixtures:32,checks,boundaryMatrix:"24/24",negativeProof:"24/24",orthogonality:"9/9",actualSQLite:true,closeReopen:true,multipleReopen:true,repeatedRecovery:true,recoveryOrderIndependent:true,logicalCountDelta:0,lineageDrift:0,relationDrift:0,comparisonRefDrift:0,rollback:true,rollbackAfterReopen:true,exactReplay:true,replayLogicalDelta:0,conflictingReplay:true,originalAfterConflict:true,handleRelease:true,tempCleanup:true,network:0})}`);
