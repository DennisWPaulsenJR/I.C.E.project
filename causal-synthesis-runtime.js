"use strict";

const RESULT = "PARTIAL_CAUSAL_SYNTHESIS_COMPREHENSION";
const VOCABULARY = new Set(["COMPATIBLE_CAUSAL_EXPRESSIONS","OVERLAPPING_CAUSAL_EXPLANATIONS","COMPLEMENTARY_CAUSAL_EXPLANATIONS","QUALIFIED_CAUSAL_SYNTHESIS","TENSIONED_CAUSAL_SYNTHESIS","ALTERNATIVE_CAUSAL_EXPLANATIONS","SCOPE_DIFFERENT_CAUSAL_EXPLANATIONS","SEQUENTIAL_SOURCE_EXPRESSED_PATHWAYS","SHARED_CAUSAL_COMPONENT","DIVERGENT_CAUSAL_COMPONENT","CONVERGENT_SOURCE_EXPRESSED_OUTCOME","DIVERGENT_SOURCE_EXPRESSED_OUTCOME","INSUFFICIENT_FOR_CAUSAL_SYNTHESIS","UNKNOWN_CAUSAL_SYNTHESIS"]);
const canonical = values => [...new Set((values || []).map(value => String(value)).filter(Boolean))].sort();

function synthesize(inputs = {}) {
  const relation = VOCABULARY.has(inputs.relation) ? inputs.relation : (!inputs.references || !inputs.references.length ? "INSUFFICIENT_FOR_CAUSAL_SYNTHESIS" : "UNKNOWN_CAUSAL_SYNTHESIS");
  const references = canonical(inputs.references);
  const provenance = {
    sourceIdentities: canonical(inputs.sourceIdentities), sourceUnits: canonical(inputs.sourceUnits), claimReferences: canonical(inputs.claimReferences),
    roleScopeReferences: canonical(inputs.roleScopeReferences), mechanismReferences: canonical(inputs.mechanismReferences), comparisonReferences: canonical(inputs.comparisonReferences), evidenceReferences: canonical(inputs.evidenceReferences), lineageReferences: canonical(inputs.lineageReferences), derivationReferences: canonical(inputs.derivationReferences), duplicateReferences: canonical(inputs.duplicateReferences), independenceStates: canonical(inputs.independenceStates),
    modalities: canonical(inputs.modalities), negations: canonical(inputs.negations), questionStates: canonical(inputs.questionStates), attributions: canonical(inputs.attributions), semanticOrder: Array.isArray(inputs.semanticOrder) ? inputs.semanticOrder.map(String) : []
  };
  const identityParts = canonical([relation, ...references, ...provenance.claimReferences, ...provenance.mechanismReferences, ...provenance.comparisonReferences, ...provenance.evidenceReferences, ...(provenance.semanticOrder.length ? [`ORDER:${provenance.semanticOrder.join(">")}`] : [])]);
  return { semanticResult: RESULT, semanticIdentity: `R48|${identityParts.join("|")}`, synthesisRelation: relation, governedReferences: references, provenance,
    objectiveCausation:false, objectiveMechanism:false, truthPromotion:false, validation:false, mechanismSelection:false, winnerSelection:false, probability:0, synthesisScore:0, causalStrength:0, plausibilityRanking:0,
    transitiveCausation:false, graphReachabilityCausation:false, temporalCausation:false, sourceAgreementValidation:false, sourceDisagreementInvalidation:false, authoritySelection:false, countValidation:false,
    duplicateToIndependent:false, sharedUpstreamToIndependent:false, derivedToIndependent:false, modalityStrengthening:false, negationLoss:false, questionToAssertion:false, attributionLoss:false, userBeliefMutated:false, eventAdmitted:false, interventionSemantics:false, network:0 };
}
module.exports = { RESULT, VOCABULARY, synthesize };
