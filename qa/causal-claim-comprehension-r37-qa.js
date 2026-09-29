"use strict";

const assert = require("assert");
const causal = require("../causal-claim-comprehension-runtime");

let checks = 0;

function check(name, condition) {
  assert(condition, name);
  checks += 1;
}

function derive(source) {
  return causal.derive(source, "x");
}

// fixture: positive active causation
const positiveActive = derive("Rain caused the flooding.");
check(
  "ACTIVE_CAUSE_AND_EFFECT",
  positiveActive.candidates[0].cause === "Rain" &&
    positiveActive.candidates[0].effect === "the flooding"
);

// fixture: causal connective
check(
  "BECAUSE_CONNECTIVE_PRODUCES_CANDIDATE",
  derive("The road was wet because it rained.").candidates.length === 1
);

// fixture: causal result
check(
  "RESULTED_IN_IS_CAUSAL_RESULT",
  derive("The storm resulted in flooding.").candidates[0].expressionClass ===
    "CAUSAL_RESULT"
);

// fixture: causal result phrase
check(
  "LED_TO_PRODUCES_CANDIDATE",
  derive("The failure led to an outage.").candidates.length === 1
);

// fixture: reversed causal reason
check(
  "DUE_TO_REVERSES_CAUSE",
  derive("The delay was due to weather.").candidates[0].cause === "weather"
);

// fixture: contributory cause
check(
  "CONTRIBUTED_TO_IS_CONTRIBUTORY_CAUSE",
  derive("Heavy rain contributed to the flooding.").candidates[0].expressionClass ===
    "CONTRIBUTORY_CAUSE"
);

// fixture: preventive causation
check(
  "PREVENTED_IS_PREVENTIVE_CAUSATION",
  derive("The barrier prevented the water from entering.").candidates[0]
    .expressionClass === "PREVENTIVE_CAUSATION"
);

// fixture: passive causation
check(
  "PASSIVE_CAUSE_DIRECTION",
  derive("Flooding was caused by rain.").candidates[0].cause === "rain"
);

// fixture: temporal order is not causation
check(
  "TEMPORAL_ORDER_IS_NOT_CAUSATION",
  derive("The rain started before the outage.").candidates.length === 0
);

// fixture: correlation is not causation
check(
  "CORRELATION_IS_NOT_CAUSATION",
  derive("Rainfall was correlated with flooding.").candidates.length === 0
);

// fixture: association is not causation
check(
  "ASSOCIATION_IS_NOT_CAUSATION",
  derive("Rainfall was associated with flooding.").candidates.length === 0
);

// fixture: requirement is not causation
check(
  "REQUIREMENT_IS_NOT_CAUSATION",
  derive("The machine requires power to operate.").candidates.length === 0
);

// fixture: dependency is not causation
check(
  "DEPENDENCY_IS_NOT_CAUSATION",
  derive("The system depends on the database.").candidates.length === 0
);

// fixture: purpose is not causation
check(
  "PURPOSE_IS_NOT_CAUSATION",
  derive("John opened the door to let Mary enter.").candidates.length === 0
);

// fixture: motive is not causation
check(
  "MOTIVE_IS_NOT_CAUSATION",
  derive("John left because he wanted to rest.").candidates.length === 0
);

// fixture: epistemic reason is not causation
check(
  "EPISTEMIC_REASON_IS_NOT_CAUSATION",
  derive("I know the road is wet because I can see water on it.").candidates
    .length === 0
);

// fixture: command reason is not causation
check(
  "COMMAND_REASON_IS_NOT_CAUSATION",
  derive("Close the window because it is raining.").candidates.length === 0
);

// fixture: multiple causes remain one candidate
check(
  "MULTIPLE_CAUSES_REMAIN_ONE_CANDIDATE",
  derive("Rain and a blocked drain caused the flooding.").candidates.length === 1
);

// fixture: common cause produces two candidates
check(
  "COMMON_CAUSE_PRODUCES_TWO_CANDIDATES",
  derive("The storm caused both the outage and the flooding.").candidates
    .length === 2
);

// fixture: negated causation
const negated = derive("The rain did not cause the outage.");
check("NEGATED_CAUSATION_POLARITY", negated.candidates[0].polarity === "NEGATIVE");

// fixture: interrogative causation
const interrogative = derive("Did the rain cause the outage?");
check("INTERROGATIVE_CAUSATION_ASSERTION", interrogative.assertion === "INTERROGATIVE");

// fixture: modal causation
const modal = derive("The rain may have caused the outage.");
check("MODAL_CAUSATION_MODALITY", modal.modality === "MAY");

// fixture: attributed causation
const attributed = derive("Mary said the rain caused the outage.");
check("ATTRIBUTED_CAUSATION", attributed.attributed === true);

// fixture: causal candidate does not promote objective truth or causation
check(
  "NO_TRUTH_OR_OBJECTIVE_CAUSATION_PROMOTION",
  positiveActive.candidates[0].truthPromoted === false &&
    positiveActive.candidates[0].objectiveCausation === false
);

// fixture: causal transitiveness is not inferred
check(
  "CAUSAL_TRANSITIVITY_IS_NOT_DERIVED",
  derive("A caused B, and B caused C.").candidates.length === 1
);

// fixture: deterministic relation identity
check(
  "CAUSAL_RELATION_ID_IS_DETERMINISTIC",
  causal.derive("Rain caused the flooding.", "x").candidates[0].causalRelationId ===
    positiveActive.candidates[0].causalRelationId
);

// strengthening: causal result preserves source-expressed direction
const causalResult = derive("The storm resulted in flooding.");
check(
  "CAUSAL_RESULT_DIRECTION_AND_BOUNDARY",
  causalResult.candidates[0].cause === "The storm" &&
    causalResult.candidates[0].effect === "flooding" &&
    causalResult.candidates[0].expressionClass === "CAUSAL_RESULT" &&
    causalResult.candidates[0].objectiveCausation === false &&
    causalResult.candidates[0].causalProof === false
);

// strengthening: contribution is not sole or sufficient causal proof
const contributoryCause = derive("Heavy rain contributed to the flooding.");
check(
  "CONTRIBUTORY_CAUSE_IS_NOT_SOLE_OR_SUFFICIENT",
  contributoryCause.candidates[0].cause === "Heavy rain" &&
    contributoryCause.candidates[0].effect === "the flooding" &&
    contributoryCause.candidates[0].expressionClass === "CONTRIBUTORY_CAUSE" &&
    contributoryCause.candidates[0].objectiveCausation === false &&
    contributoryCause.candidates[0].causalProof === false
);

// strengthening: prevention does not admit the prevented event
const preventiveCausation = derive("The barrier prevented the water from entering.");
check(
  "PREVENTIVE_CAUSATION_DOES_NOT_ADMIT_EVENT",
  preventiveCausation.candidates[0].cause === "The barrier" &&
    preventiveCausation.candidates[0].effect === "the water from entering" &&
    preventiveCausation.candidates[0].expressionClass === "PREVENTIVE_CAUSATION" &&
    preventiveCausation.candidates[0].eventCreated === false &&
    preventiveCausation.candidates[0].objectiveCausation === false
);

// strengthening fixture: enablement is not direct causation
check(
  "ENABLEMENT_IS_NOT_CAUSATION",
  derive("The open gate enabled water to enter.").candidates.length === 0
);

// strengthening: requirement remains outside direct causal candidates
const requirement = derive("The machine requires power to operate.");
check(
  "REQUIREMENT_REMAINS_NON_CAUSAL_BOUNDARY",
  requirement.candidates.length === 0 &&
    requirement.boundary === "NON_CAUSAL_OR_AMBIGUOUS"
);

// strengthening: epistemic justification remains outside world causation
const epistemicJustification = derive(
  "I know the road is wet because I can see water on it."
);
check(
  "EPISTEMIC_JUSTIFICATION_REMAINS_NON_CAUSAL_BOUNDARY",
  epistemicJustification.candidates.length === 0 &&
    epistemicJustification.boundary === "NON_CAUSAL_OR_AMBIGUOUS"
);

// strengthening fixture: co-occurrence does not establish causation
check(
  "SAME_DAY_COOCCURRENCE_IS_NOT_CAUSATION",
  derive("Rain and flooding occurred on the same day.").candidates.length === 0
);

// strengthening fixture: temporal succession does not establish causation
check(
  "TEMPORAL_SUCCESSION_IS_NOT_CAUSATION",
  derive("Water entered after the gate opened.").candidates.length === 0
);

// strengthening fixture: purpose is not a causal claim
check(
  "SO_THAT_PURPOSE_IS_NOT_CAUSATION",
  derive("The door opened so that Mary could enter.").candidates.length === 0
);

// strengthening fixture: dependency is not direct causation
check(
  "DEPENDENCY_VARIANT_IS_NOT_CAUSATION",
  derive("The machine depends on power to operate.").candidates.length === 0
);

// strengthening fixture: temporal sequence is not a causal claim
check(
  "WHEN_SEQUENCE_IS_NOT_CAUSATION",
  derive("The lights went out when the storm arrived.").candidates.length === 0
);

console.log(
  `causal claim comprehension R37 QA passed ${JSON.stringify({
    checks,
    network: 0,
  })}`
);
