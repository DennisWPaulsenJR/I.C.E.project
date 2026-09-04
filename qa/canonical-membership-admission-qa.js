const fs = require("fs");

const background = fs.readFileSync("background.js", "utf8");
const popup = fs.readFileSync("popup.js", "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(background.includes('"ICE_ADMIT_CANONICAL_ANALYZED_PAGE"'), "background admission message missing");
assert(popup.includes('"ICE_ADMIT_CANONICAL_ANALYZED_PAGE"'), "popup admission request missing");
assert(background.includes("async function admitCanonicalAnalyzedPageFromPopup"), "background admission owner missing");
assert(background.includes("validStudyScopePageRecord(page, { requireAnalyzed: true })"), "background admission validation missing");
assert(background.includes("[CANONICAL_ANALYZED_PAGES_KEY]: nextMarkers"), "background canonical membership write missing");
assert(popup.includes("const admission = await chrome.runtime.sendMessage"), "popup requester missing");
assert(!popup.includes("[CANONICAL_ANALYZED_PAGES_KEY]: nextMarkers"), "popup still writes canonical membership");

console.log("canonical-membership-admission-qa: PASS");
