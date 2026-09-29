"use strict";

// R35 stores source-scoped temporal comprehension in the existing local
// governed artifact provider. Persistence preserves candidates and history;
// it never promotes them to facts or a global chronology.
const crypto = require("crypto");
const { openPersistenceProvider } = require("./sqlite-persistence-provider");

const CONTRACT = "PD_0156_R35";
const hash = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 20);
const clone = (value) => JSON.parse(JSON.stringify(value));
const artifact = (artifactId, artifactType, payload, status = "HISTORICAL") => ({ artifactId, version: "1", artifactType, generation: "TEMPORAL_COMPREHENSION_R35", contract: CONTRACT, producer: "temporal-durability-runtime", provenance: { contract: CONTRACT, sourceScope: payload.sourceScope || null }, epistemicClass: "SOURCE_SCOPED_TEMPORAL_CANDIDATE", authorityClass: "NO_OBJECTIVE_CHRONOLOGY", status, payload });

function open(filename) { return openPersistenceProvider({ filename }); }
function rows(provider, artifactType) { return provider.lookupArtifacts({ artifactType, generation: "TEMPORAL_COMPREHENSION_R35", limit: 1000000 }).rows.map((row) => provider.readArtifact(row.artifactId || row.artifact_id, row.version).payload); }
function expressionPayload(expression, propositionContext = null) { return { ...clone(expression), propositionContext: propositionContext ? clone(propositionContext) : null, durableRecordType: "TEMPORAL_EXPRESSION", historicalStatus: "PRESERVED", currentAuthority: false }; }
function relationPayload(relation) { return { ...clone(relation), durableRecordType: "TEMPORAL_RELATION", historicalStatus: "PRESERVED", currentAuthority: false }; }

function persist(model, options = {}) {
  const provider = options.provider || open(options.filename);
  const expressions = model.temporalExpressions || [];
  const relations = model.temporalRelations || [];
  const mutationId = `temporal-persist|${hash({ sourceScope: model.sourceScope, expressions: expressions.map((x) => x.temporalExpressionId), relations: relations.map((x) => x.temporalRelationId) })}`;
  try {
    const transaction = provider.withGovernedTransaction({ transactionId: mutationId, mutationId, purpose: CONTRACT, expectedWrites: ["TEMPORAL_EXPRESSION", "TEMPORAL_RELATION"] }, (db) => {
      const propositionById = new Map((model.propositions || []).map((item) => [item.propositionCandidateId, item]));
      expressions.forEach((item) => db.writeArtifact(artifact(`temporal-expression|${item.temporalExpressionId}`, "TEMPORAL_EXPRESSION", expressionPayload(item, propositionById.get(item.propositionRef)))));
      relations.forEach((item) => db.writeArtifact(artifact(`temporal-relation|${item.temporalRelationId}`, "TEMPORAL_RELATION", relationPayload(item))));
      return { expressions: expressions.length, relations: relations.length };
    });
    return { state: transaction.status === "COMMITTED" ? "DURABLY_PERSISTED" : "NOT_PERSISTED", replay: Boolean(transaction.idempotent), transaction, network: 0 };
  } finally { if (!options.provider) provider.closePersistenceProvider(); }
}

function recover(options = {}) {
  const provider = options.provider || open(options.filename);
  try {
    const sourceScope = options.sourceScope || null;
    const filter = (record) => !sourceScope || record.sourceScope === sourceScope;
    return { expressions: rows(provider, "TEMPORAL_EXPRESSION").filter(filter), relations: rows(provider, "TEMPORAL_RELATION").filter(filter), governance: rows(provider, "TEMPORAL_GOVERNANCE"), authorities: rows(provider, "TEMPORAL_AUTHORITY").filter(filter), network: 0 };
  } finally { if (!options.provider) provider.closePersistenceProvider(); }
}

function govern(input = {}, options = {}) {
  if (!/[A-Z_]+/.test(input.type || "")) throw new Error("GOVERNANCE_TYPE_REQUIRED");
  if (!input.fromRecordId || !input.toRecordId) throw new Error("GOVERNANCE_ENDPOINTS_REQUIRED");
  if (input.type === "SUPERSEDES" && !input.authorizationRef) throw new Error("SUPERSESSION_AUTHORIZATION_REQUIRED");
  const provider = options.provider || input.provider || open(options.filename);
  const logical = { type: input.type, fromRecordId: input.fromRecordId, toRecordId: input.toRecordId, sourceScope: input.sourceScope || null, authorizationRef: input.authorizationRef || null, reason: input.reason || null };
  const payload = { governanceId: `temporal-governance-${hash(logical)}`, ...logical, provenance: input.provenance || "EXPLICIT_GOVERNANCE_OPERATION", originalMutated: false, predecessorDeleted: false, contradictionSelectsWinner: false };
  try {
    const tx = provider.withGovernedTransaction({ transactionId: `temporal-governance-write|${payload.governanceId}`, mutationId: `temporal-governance-write|${payload.governanceId}`, purpose: CONTRACT, expectedWrites: ["TEMPORAL_GOVERNANCE"] }, (db) => db.writeArtifact(artifact(`temporal-governance|${payload.governanceId}`, "TEMPORAL_GOVERNANCE", payload)));
    if (tx.status !== "COMMITTED") throw new Error("TEMPORAL_GOVERNANCE_NOT_PERSISTED");
    return payload;
  } finally { if (!options.provider && !input.provider) provider.closePersistenceProvider(); }
}

function setCurrentAuthority(input = {}, options = {}) {
  if (!input.recordId || !input.sourceScope || !input.use || !input.authorizationRef) throw new Error("EXPLICIT_AUTHORITY_DECISION_REQUIRED");
  const provider = options.provider || input.provider || open(options.filename);
  const logical = { recordId: input.recordId, sourceScope: input.sourceScope, use: input.use, authorizationRef: input.authorizationRef, policyVersion: input.policyVersion || "R35" };
  const payload = { authorityId: `temporal-authority-${hash(logical)}`, ...logical, currentAuthority: true, newestRecordRule: false, objectiveChronologyPromoted: false };
  try {
    const tx = provider.withGovernedTransaction({ transactionId: `temporal-authority-write|${payload.authorityId}`, mutationId: `temporal-authority-write|${payload.authorityId}`, purpose: CONTRACT, expectedWrites: ["TEMPORAL_AUTHORITY"] }, (db) => db.writeArtifact(artifact(`temporal-authority|${payload.authorityId}`, "TEMPORAL_AUTHORITY", payload, "CURRENT")));
    if (tx.status !== "COMMITTED") throw new Error("TEMPORAL_AUTHORITY_NOT_PERSISTED");
    return payload;
  } finally { if (!options.provider && !input.provider) provider.closePersistenceProvider(); }
}

function revalidate(record, options = {}) {
  if (!record?.sourceScope || !record?.semanticTemporalIdentity && !record?.temporalRelationId) return { state: "REVALIDATION_REQUIRED", reason: "INSUFFICIENT_TEMPORAL_PROVENANCE" };
  if (options.sourceScope && record.sourceScope !== options.sourceScope) return { state: "REVALIDATION_REQUIRED", reason: "SOURCE_SCOPE_INAPPLICABLE" };
  if (record.anchorRequirement && record.anchorRequirement !== "NONE" && record.resolutionState === "RESOLVED_CANDIDATE" && !record.anchorReference) return { state: "REVALIDATION_REQUIRED", reason: "MISSING_TEMPORAL_ANCHOR" };
  return { state: "REVALIDATED_CANDIDATE", semanticIdentity: record.semanticTemporalIdentity || record.temporalRelationId, objectiveChronologyPromoted: false };
}

module.exports = { CONTRACT, open, persist, recover, govern, setCurrentAuthority, revalidate };
