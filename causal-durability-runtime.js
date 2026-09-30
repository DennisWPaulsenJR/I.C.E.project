"use strict";

// R38 persists source-expressed R37 comprehension; it never adjudicates causation.
const crypto = require("crypto");
const { openPersistenceProvider } = require("./sqlite-persistence-provider");
const CONTRACT = "PD_0156_R38";
const hash = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 20);
const clone = (value) => JSON.parse(JSON.stringify(value));
const open = (filename) => openPersistenceProvider({ filename });
const artifact = (id, type, payload) => ({ artifactId: id, version: "1", artifactType: type, generation: "CAUSAL_COMPREHENSION_R38", contract: CONTRACT, producer: "causal-durability-runtime", provenance: { sourceScope: payload.sourceScope, sourceIdentity: payload.sourceIdentity }, epistemicClass: "SOURCE_EXPRESSED_CAUSAL_CANDIDATE", authorityClass: "NO_OBJECTIVE_CAUSATION", status: "HISTORICAL", payload });

function expression(candidate, source, sourceScope) {
  const expressionId = candidate?.causalExpressionId || `causal-expression-${hash({ source, sourceScope, boundary: candidate?.boundary || "NON_CAUSAL" })}`;
  return { ...clone(candidate || {}), causalExpressionId: expressionId, sourceScope, sourceIdentity: sourceScope, surfaceText: candidate?.surfaceText || source, durableRecordType: "CAUSAL_EXPRESSION", sourceExpressed: true, derived: false, currentAuthority: false, truthPromoted: false, causalProof: false, objectiveCausation: false, eventCreated: false, userBeliefMutated: false, network: 0 };
}
function relations(candidate, expressionRecord) {
  const explicit = candidate?.explicitRelations || (candidate?.causalRelationId ? [candidate] : []);
  return explicit.map((relation, order) => {
    if (!relation.causalRelationId || !relation.cause || !relation.effect) throw new Error("CAUSAL_RELATION_FIELDS_REQUIRED");
    return { ...clone(relation), causalExpressionId: expressionRecord.causalExpressionId, sourceScope: expressionRecord.sourceScope, sourceIdentity: expressionRecord.sourceIdentity, sourceOrder: relation.sourceOrder || order + 1, durableRecordType: "CAUSAL_RELATION", sourceExpressed: true, derived: false, currentAuthority: false, truthPromoted: false, causalProof: false, objectiveCausation: false, eventCreated: false, userBeliefMutated: false, network: 0 };
  });
}
function persist(model, options = {}) {
  const provider = options.provider || open(options.filename); const source = options.source || model.source || model.surfaceText || ""; const sourceScope = options.sourceScope || model.sourceScope;
  if (!sourceScope) throw new Error("SOURCE_SCOPE_REQUIRED");
  const candidates = model.candidates || []; const expressions = candidates.length ? candidates.map((item) => expression(item, source || item.surfaceText, sourceScope)) : [expression({ boundary: model.boundary || "NON_CAUSAL_OR_AMBIGUOUS" }, source, sourceScope)];
  const allRelations = expressions.flatMap((item, index) => relations(candidates[index], item)); const mutationId = `causal-persist|${hash({ sourceScope, expressions: expressions.map((x) => x.causalExpressionId), relations: allRelations.map((x) => x.causalRelationId) })}`;
  try { const transaction = provider.withGovernedTransaction({ transactionId: mutationId, mutationId, purpose: CONTRACT, expectedWrites: ["CAUSAL_EXPRESSION", "CAUSAL_RELATION"] }, (db) => { expressions.forEach((item) => db.writeArtifact(artifact(`causal-expression|${item.causalExpressionId}|${sourceScope}`, "CAUSAL_EXPRESSION", item))); allRelations.forEach((item) => db.writeArtifact(artifact(`causal-relation|${item.causalRelationId}|${sourceScope}`, "CAUSAL_RELATION", item))); return { expressions: expressions.length, relations: allRelations.length }; }); return { state: transaction.status === "COMMITTED" ? "DURABLY_PERSISTED" : "NOT_PERSISTED", replay: Boolean(transaction.idempotent), transaction, network: 0, eventObjectsCreated: 0, userBeliefMutations: 0 }; } finally { if (!options.provider) provider.closePersistenceProvider(); }
}
function rows(provider, type) { return provider.lookupArtifacts({ artifactType: type, generation: "CAUSAL_COMPREHENSION_R38", limit: 1000000 }).rows.map((row) => provider.readArtifact(row.artifactId || row.artifact_id, row.version).payload); }
function recover(options = {}) { const provider = options.provider || open(options.filename); try { const scope = options.sourceScope; const filter = (x) => !scope || x.sourceScope === scope; return { expressions: rows(provider, "CAUSAL_EXPRESSION").filter(filter), relations: rows(provider, "CAUSAL_RELATION").filter(filter).sort((left, right) => left.sourceOrder - right.sourceOrder || left.causalRelationId.localeCompare(right.causalRelationId)), network: 0, eventObjectsCreated: 0, userBeliefMutations: 0, externalProviderCalls: 0 }; } finally { if (!options.provider) provider.closePersistenceProvider(); } }
module.exports = { CONTRACT, open, persist, recover };
