const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const popupHtml = fs.readFileSync(path.join(root, "popup.html"), "utf8");
const popupConfigHelpers = fs.readFileSync(path.join(root, "popup-config-helpers.js"), "utf8");
const popupJs = fs.readFileSync(path.join(root, "popup.js"), "utf8");
const backgroundJs = fs.readFileSync(path.join(root, "background.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function extractFunctionSource(source, functionName) {
  const match = new RegExp(`(?:async\\s+)?function\\s+${functionName}\\s*\\(`).exec(source);
  const start = match?.index ?? -1;
  assert(start >= 0, `Missing function ${functionName}.`);
  const paramsEnd = source.indexOf(")", start);
  const bodyStart = source.indexOf("{", paramsEnd);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unclosed function body for ${functionName}.`);
}

function includes(source, pattern, message) {
  assert(pattern.test(source), message);
}

function extractHelperSource(source, functionName) {
  const match = new RegExp(`function\\s+${functionName}\\s*\\(`).exec(source);
  const start = match?.index ?? -1;
  assert(start >= 0, `Missing helper function ${functionName}.`);
  const paramsEnd = source.indexOf(")", start);
  const bodyStart = source.indexOf("{", paramsEnd);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Unclosed helper function body for ${functionName}.`);
}

function configHelperHarness() {
  const optionSource = extractHelperSource(popupConfigHelpers, "popupOptionById");
  const modeSource = extractHelperSource(popupConfigHelpers, "popupHighlighterModeFromSettings");
  const harness = `
    ${optionSource}
    ${modeSource}
    return { popupOptionById, popupHighlighterModeFromSettings };
  `;
  return Function(harness)();
}

includes(popupHtml, /class="compact-selector-bar"/, "Popup lacks compact selector bar.");
includes(popupHtml, /id="highlighterSelect"/, "Popup lacks Highlighter selector.");
includes(popupHtml, /id="exaltationSelect"/, "Popup lacks Exaltation selector.");
includes(popupHtml, /aria-label="Highlighter mode"/, "Highlighter selector lacks accessible label.");
includes(popupHtml, /aria-label="Exaltation presentation mode"/, "Exaltation selector lacks accessible label.");
includes(popupHtml, /\.compact-selector-bar\s*\{\s*display:\s*grid;[\s\S]*grid-template-columns:\s*1fr 1fr/, "Compact selector layout should use two narrow columns.");
includes(popupHtml, /\.compact-selector-bar select[\s\S]*min-width:\s*0/, "Compact selectors should avoid width overflow.");
includes(popupHtml, /popup-config-helpers\.js/, "Popup must load the extracted config helper before popup.js.");

[
  ["off", "Off"],
  ["strict", "Strict"],
  ["strict_pronouns", "Strict + pronouns"],
  ["flexible", "Flexible"],
  ["flexible_pronouns", "Flexible + pronouns"]
].forEach(([id, label]) => {
  includes(popupJs, new RegExp(`id:\\s*"${id}"[\\s\\S]*label:\\s*"${label.replace("+", "\\+")}"`), `Missing Highlighter option ${label}.`);
});

[
  ["standard", "Standard"],
  ["class_of_being_lens_v1", "Class of Being"],
  ["exaltation_lens_v1", "Exaltation"]
].forEach(([id, label]) => {
  includes(popupJs, new RegExp(`id:\\s*"${id}"[\\s\\S]*label:\\s*"${label}"`), `Missing Exaltation option ${label}.`);
});

includes(popupJs, /chrome\.storage\.sync\.get\(defaults\)/, "Highlighter must restore historical sync settings.");
includes(popupJs, /chrome\.storage\.sync\.set\(option\.settings\)/, "Highlighter selector must persist to historical sync keys.");
includes(popupJs, /enabled:\s*false/, "Highlighter Off option must disable highlighting.");
includes(popupJs, /highlightPronouns:\s*true/, "Highlighter must expose pronoun highlighting option.");
includes(popupJs, /strictMode:\s*false/, "Highlighter must expose flexible mode option.");

const configHelpers = configHelperHarness();
assert(configHelpers.popupOptionById([{ id: "x" }], "x")?.id === "x", "Popup option lookup helper failed.");
assert(configHelpers.popupHighlighterModeFromSettings({ enabled: false }) === "off", "Popup highlighter helper failed to restore off state.");
assert(configHelpers.popupHighlighterModeFromSettings({ enabled: true, strictMode: true, highlightPronouns: true }) === "strict_pronouns", "Popup highlighter helper failed to restore strict pronouns state.");

const highlighterModeSource = extractHelperSource(popupConfigHelpers, "popupHighlighterModeFromSettings");
includes(highlighterModeSource, /return "off"/, "Highlighter mode must restore Off state.");
includes(highlighterModeSource, /return "strict_pronouns"/, "Highlighter mode must restore Strict + pronouns state.");
includes(highlighterModeSource, /return "flexible_pronouns"/, "Highlighter mode must restore Flexible + pronouns state.");

const highlighterWrapperSource = extractFunctionSource(popupJs, "highlighterModeFromSettings");
includes(highlighterWrapperSource, /popupHighlighterModeFromSettings/, "Popup highlighter mode wrapper must delegate to extracted helper.");

const saveStudySource = extractFunctionSource(popupJs, "saveStudyOptionState");
includes(saveStudySource, /selectedExaltationPresentationMode/, "Exaltation selector must persist in panel UI state.");
includes(saveStudySource, /selectedAdapterForNewAnalysis/, "Existing adapter persistence must remain.");
includes(saveStudySource, /selectedLensForNewAnalysis/, "Existing lens persistence must remain.");
includes(saveStudySource, /existing records were not rewritten/, "Selector status must preserve semantic boundary.");
includes(saveStudySource, /popupOptionById/, "Exaltation selector persistence must delegate option lookup to extracted helper.");

const popupPreserveSource = extractFunctionSource(popupJs, "preservedPanelUiState");
const backgroundPreserveSource = extractFunctionSource(backgroundJs, "preservedPanelUiState");
includes(popupPreserveSource, /selectedExaltationPresentationMode/, "Popup Clear All preservation must include Exaltation state.");
includes(backgroundPreserveSource, /selectedExaltationPresentationMode/, "Background Clear All preservation must include Exaltation state.");

includes(popupJs, /highlighterSelect"\)\?\.addEventListener\("change",\s*\(\)\s*=>\s*saveHighlighterSelectorState/, "Highlighter selector change handler missing.");
includes(popupJs, /exaltationSelect"\)\?\.addEventListener\("change",\s*\(\)\s*=>\s*saveStudyOptionState/, "Exaltation selector change handler missing.");
includes(popupJs, /renderRestoredSelectors\(settings,\s*await currentPanelUiState\(\)\)/, "Selectors must render during popup startup.");

console.log("Popup selector QA passed.");
