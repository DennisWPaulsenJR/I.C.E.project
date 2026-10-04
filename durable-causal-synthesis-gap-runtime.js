"use strict";
const RESULT="PARTIAL_DURABLE_CAUSAL_SYNTHESIS_GAP_COMPREHENSION";
const clone=value=>JSON.parse(JSON.stringify(value));
function durableArtifactFrom(governed={}){
  if(!governed.gap?.semanticIdentity)throw new Error("R49_GOVERNED_GAP_REQUIRED");
  const identity=governed.gap.semanticIdentity;
  return {artifactId:`R50|${identity}`,version:"1",artifactType:"DURABLE_CAUSAL_SYNTHESIS_GAP",generation:"R50",payload:{semanticResult:RESULT,governedState:clone(governed)}};
}
function persistGovernedGap(provider,governed,mutationId){const artifact=durableArtifactFrom(governed);return provider.withGovernedTransaction({transactionId:`R50|${artifact.artifactId}`,mutationId,purpose:"R50_DURABLE_GAP",expectedWrites:[artifact.artifactId]},db=>db.writeArtifact(artifact));}
function recoverGovernedGap(provider,semanticIdentity){const record=provider.readArtifact(`R50|${semanticIdentity}`,"1");if(record.artifactType!=="DURABLE_CAUSAL_SYNTHESIS_GAP"||record.payload.semanticResult!==RESULT)throw new Error("R50_DURABLE_ARTIFACT_INVALID");return clone(record.payload.governedState);}
module.exports={RESULT,durableArtifactFrom,persistGovernedGap,recoverGovernedGap};
