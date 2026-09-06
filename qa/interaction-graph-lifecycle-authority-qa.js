const fs = require("fs");

const popup = fs.readFileSync("popup.js", "utf8");
const semanticPersistenceQa = fs.readFileSync("qa/popup-semantic-persistence-boundary-qa.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const orderBody = popup.match(/async function orderEvents\(\) \{[\s\S]*?async function clearOrderedEvents/);
const actorBody = popup.match(/async function buildActorTimelines\(\) \{[\s\S]*?async function clearActorTimelines/);

assert(orderBody, "orderEvents workflow is missing");
assert(actorBody, "buildActorTimelines workflow is missing");
assert(orderBody[0].includes("const governedUpstreamPreserved = hasCurrentCanonicalSemanticRecords"), "orderEvents preservation decision is missing");
assert(actorBody[0].includes("const governedUpstreamPreserved = hasCurrentCanonicalSemanticRecords"), "buildActorTimelines preservation decision is missing");
assert(orderBody[0].includes("if (!governedUpstreamPreserved) {\n      await chrome.storage.local.remove(INTERACTION_GRAPH_KEY);"), "orderEvents must clear graph only when upstream was not preserved");
assert(actorBody[0].includes("if (!governedUpstreamPreserved) {\n      await chrome.storage.local.remove(INTERACTION_GRAPH_KEY);"), "buildActorTimelines must clear graph only when upstream was not preserved");
assert(/async function clearOrderedEvents\(\)[\s\S]*?INTERACTION_GRAPH_KEY[\s\S]*?SCENE_MODELS_KEY/.test(popup), "explicit ordered-event clear must remain");
assert(/async function clearActorTimelines\(\)[\s\S]*?INTERACTION_GRAPH_KEY[\s\S]*?SCENE_MODELS_KEY/.test(popup), "explicit actor-timeline clear must remain");
assert(popup.includes("const SCENE_MODELS_KEY = \"ICE_SCENE_MODELS\""), "scene-model key must remain unchanged");
assert(!popup.includes("ICE_INTERACTION_GRAPH_V2"), "new interaction-graph storage key was introduced");
assert(!popup.includes("ICE_SCENE_MODELS_V2"), "scene-model storage behavior was changed");
assert(semanticPersistenceQa.includes("hasCurrentCanonicalSemanticRecords"), "five-family persistence boundary QA is not present");

console.log("Interaction graph lifecycle authority QA passed.");
