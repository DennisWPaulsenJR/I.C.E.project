"use strict";

// R47 persists an already-governed R46 state. It never classifies, promotes,
// ranks, or adjudicates that state; the R46 semantic identity remains primary.
const RESULT = "PARTIAL_DURABLE_CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE";
const clone = value => JSON.parse(JSON.stringify(value));

function durableArtifactFrom(governedState = {}) {
  if (!governedState.semanticIdentity || !governedState.evidenceRelation) {
    throw new Error("R46_GOVERNED_STATE_REQUIRED");
  }
  const payload = clone(governedState);
  return {
    artifactId: `R47|${governedState.semanticIdentity}`,
    version: "1",
    artifactType: "CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE",
    generation: "R47",
    payload: { semanticResult: RESULT, governedState: payload }
  };
}

function persistGovernedState(provider, governedState, mutationId) {
  const artifact = durableArtifactFrom(governedState);
  return provider.withGovernedTransaction(
    { transactionId: `R47|${artifact.artifactId}`, mutationId, purpose: "R47_DURABLE_GOVERNED_STATE", expectedWrites: [artifact.artifactId] },
    db => db.writeArtifact(artifact)
  );
}

function recoverGovernedState(provider, semanticIdentity) {
  const record = provider.readArtifact(`R47|${semanticIdentity}`, "1");
  if (record.artifactType !== "CAUSAL_MECHANISM_COMPARISON_EVIDENCE_GOVERNANCE" || record.payload.semanticResult !== RESULT) {
    throw new Error("R47_DURABLE_ARTIFACT_INVALID");
  }
  return clone(record.payload.governedState);
}

module.exports = { RESULT, durableArtifactFrom, persistGovernedState, recoverGovernedState };
