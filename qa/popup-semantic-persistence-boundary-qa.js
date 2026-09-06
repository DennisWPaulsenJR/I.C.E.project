const fs = require("fs");

const popup = fs.readFileSync("popup.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(popup.includes("function hasCurrentCanonicalSemanticRecords"), "canonical semantic persistence guard is missing");
assert((popup.match(/hasCurrentCanonicalSemanticRecords\(/g) || []).length === 6, "guard must be declared and used by exactly five workflows");
const helperBody = popup.match(/function hasCurrentCanonicalSemanticRecords\([\s\S]*?\n  }/);
assert(helperBody, "canonical semantic persistence guard body is missing");
assert(!/chrome\.|sendMessage|ICE_ADMIT_CANONICAL_ANALYZED_PAGE|currentStudyScope|Context Lock|canonical membership/i.test(helperBody[0]), "guard crossed an authority boundary");
assert(popup.includes("chrome.storage.local.get(TIMELINE_STORAGE_KEY)"), "timeline guard missing");
assert(popup.includes("chrome.storage.local.get(EVENT_STORAGE_KEY)"), "event guard missing");
assert(popup.includes("chrome.storage.local.get(PRINCIPLE_STORAGE_KEY)"), "principle guard missing");
assert(popup.includes("chrome.storage.local.get(ORDERED_EVENTS_KEY)"), "ordered-event guard missing");
assert(popup.includes("chrome.storage.local.get(ACTOR_TIMELINES_KEY)"), "actor-timeline guard missing");
assert(popup.includes("renderTimeline(timelineItems)"), "timeline local rendering path is missing");
assert(popup.includes("renderEvents(eventItems)"), "event local rendering path is missing");
assert(popup.includes("renderPrinciples(dedupedPrincipleItems)"), "principle local rendering path is missing");
assert(popup.includes("renderOrderedEvents(orderedEvents)"), "ordered-event local rendering path is missing");
assert(popup.includes("renderActorTimelines(actorTimelines)"), "actor-timeline local rendering path is missing");
assert(popup.includes("remove(INTERACTION_GRAPH_KEY)"), "interaction-graph lifecycle path was removed");
assert(popup.includes("SCENE_MODELS_KEY"), "scene-model lifecycle reference was removed");
assert(!popup.includes("ICE_POPUP_TIMELINE_ITEMS"), "new popup storage key was introduced");
assert(!popup.includes("ICE_MANUAL_EVENT_ITEMS"), "new manual event storage key was introduced");
assert(!popup.includes("ICE_LOCAL_PRINCIPLE_ITEMS"), "new local principle storage key was introduced");
console.log("Popup semantic persistence boundary QA passed.");
