const assert = require("node:assert/strict");
const fs = require("node:fs");

const study = fs.readFileSync("study.js", "utf8");
const background = fs.readFileSync("background.js", "utf8");
const popup = fs.readFileSync("popup.js", "utf8");

assert.match(study, /if \(!normalized\) return "not recorded";/, "missing display confidence must be neutral");
assert.doesNotMatch(study, /if \(!normalized\) return "grounded";/, "missing display confidence must not be grounded");
assert.doesNotMatch(study, /item\.confidence \|\| "probable"/, "Study item fallbacks must not promote missing confidence");
assert.doesNotMatch(study, /record\.confidence \|\| "probable"/, "Study record fallbacks must not promote missing confidence");
assert.match(study, /\["explicit", "source-markup", "direct", "source-grounded", "source grounded"\]/, "explicit mapping preserved");
assert.match(study, /\["probable", "semantic agreement", "multiple semantic", "prophecy-fulfillment"\]/, "probable mapping preserved");
assert.match(study, /\["weak", "limited"\]/, "grounded-adjacent mapping preserved");
assert.match(study, /\["possible"\]/, "grounded-equivalent mapping preserved");
assert.match(background, /confidence: record\.confidence \|\| "probable"/, "background inference defaults remain unchanged");
assert.match(popup, /function confidenceForEvent\(hasAction, hasOrderingCue, hasDate\)/, "popup numeric confidence remains present");
assert.match(popup, /return Math\.min\(0\.95, Number\(confidence\.toFixed\(2\)\)\);/, "popup numeric confidence range remains unchanged");
assert.match(background, /const TRUST_VERIFICATION_KEY = "ICE_TRUST_VERIFICATION";/, "trust authority remains unchanged");
assert.match(background, /function createTrustVerification\(/, "trust producer remains unchanged");
assert.match(study, /displayConfidence\(value\)/, "confidence remains presentation-owned");

console.log("missing-evaluation-confidence-qa: PASS");
