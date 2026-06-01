const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const input = process.argv[2] || path.join("qa-output", "latest-matthew5-qa-bundle.json");
const output = process.argv[3] || path.join("QA_REPORTS", "latest-study-panel-report.md");

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function count(value) {
  return Array.isArray(value) ? value.length : value && typeof value === "object" ? 1 : 0;
}

function clean(value = "") {
  return String(value || "")
    .replace(/[\u2190\u2192\u2194]/g, "->")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function list(lines, fallback = "none recorded") {
  const values = asArray(lines).map(clean).filter(Boolean);
  return values.length ? values.map((line) => `- ${line}`) : [`- ${fallback}`];
}


function unique(values = []) {
  const seen = new Set();
  return asArray(values).map(clean).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function currentGitAnchor() {
  try {
    return execSync("git log --oneline -1", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (_error) {
    return "not available";
  }
}

function reviewQuestionForTitle(title = "") {
  if (/Matthew 5/i.test(title)) return "Is Matthew 5 teaching/discourse structure resolving speaker/audience and principle relationships correctly?";
  if (/Matthew 3/i.test(title)) return "Is the baptism/preaching context keeping primary referenced being and related characters distinct?";
  if (/Matthew 1/i.test(title)) return "Is the narrative/revelation baseline preserving source phrase, derived meaning, and ontology roles correctly?";
  return "Does the generated semantic report match the active source and expected layer behavior?";
}

function autoConcerns(bundle, activeTitle, adapterName) {
  const counts = bundle.counts || {};
  const concerns = [...asArray(bundle.failures)];
  if (/Matthew 5/i.test(activeTitle) && !counts.teachingSemantics) concerns.push("Primary applicable layer has zero records: Teaching / Discourse Structure.");
  if (/Matthew 5/i.test(activeTitle) && !counts.principleRelationships) concerns.push("Pilot applicable layer has zero records: Principle Relationships.");
  if (/Matthew 2/i.test(activeTitle) && !counts.movementSemantics) concerns.push("Primary applicable layer has zero records: Movement / Location Semantics.");
  if (/Matthew/i.test(activeTitle) && /generic_html_adapter/i.test(adapterName || "")) concerns.push("Generic adapter is active on a scripture-like source page.");
  if ((counts.sourceDiscovery || 0) > 250 || (counts.referenceGraph || 0) > 250 || (counts.domSemanticHints || 0) > 250) concerns.push("Large diagnostic sections are present; use compact report instead of raw panel paste.");
  return Array.from(new Set(concerns));
}

function uniqueList(values = []) {
  const seen = new Set();
  return asArray(values).map(clean).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function libraryFamilyForText(value = "") {
  const text = clean(value).toLowerCase();
  if (/merciful|mercy|peace|peacemak|forgiv|compassion/.test(text)) {
    return { principleFamily: "Mercy", teachingFamily: "Sermon on the Mount / Beatitudes", doctrineFamily: "Mercy / Peacemaking", relatedCategories: ["Forgiveness", "Peacemaking", "Compassion"] };
  }
  if (/righteous|law|fulfil|fulfill|commandment|kingdom/.test(text)) {
    return { principleFamily: "Righteousness", teachingFamily: "Sermon on the Mount / Law Fulfillment", doctrineFamily: "Kingdom righteousness", relatedCategories: ["Law Fulfillment", "Commandment Expansion", "Kingdom of heaven themes"] };
  }
  if (/reconcil|brother|agree|altar/.test(text)) {
    return { principleFamily: "Reconciliation", teachingFamily: "Sermon on the Mount / Righteousness Teaching", doctrineFamily: "Peace / Relationship repair", relatedCategories: ["Peace", "Mercy", "Inward Righteousness"] };
  }
  if (/pure|heart|adulter|lust/.test(text)) {
    return { principleFamily: "Purity", teachingFamily: "Sermon on the Mount / Commandment Interpretation", doctrineFamily: "Inward righteousness", relatedCategories: ["Purity of heart", "Commandment Expansion", "Inner intent"] };
  }
  if (/enemy|love|persecut|retaliat|oath|speech/.test(text)) {
    return { principleFamily: "Love and Integrity", teachingFamily: "Sermon on the Mount / Commandment Interpretation", doctrineFamily: "Covenant conduct", relatedCategories: ["Love of enemy", "Speech integrity", "Non-retaliation"] };
  }
  return null;
}

function libraryAwarenessRecords(samples, activeTitle) {
  const records = [];
  asArray(samples.principleRelationships).forEach((item) => {
    const family = libraryFamilyForText([item.principle, asArray(item.relatedPrinciples).join(" "), item.sourcePhrase, item.derivedMeaning].join(" "));
    if (!family) return;
    records.push({
      ...family,
      currentSource: clean(activeTitle || "Current source"),
      currentGrounding: clean(item.sourcePhrase || item.sourceGrounding || item.derivedMeaning || "Current source grounding recorded in principle relationship layer."),
      knownRelatedCategories: uniqueList([...family.relatedCategories, ...asArray(item.relatedPrinciples)]),
      futureScope: "Awaiting analysis; no cross-library source links generated yet."
    });
  });
  asArray(samples.teachingSemantics).forEach((item) => {
    const family = libraryFamilyForText([item.principle, item.teachingTopic, item.blessing, item.commandment, item.interpretation, item.sourcePhrase, item.derivedMeaning].join(" "));
    if (!family) return;
    records.push({
      ...family,
      currentSource: clean(activeTitle || "Current source"),
      currentGrounding: clean(item.sourcePhrase || item.sourceGrounding || item.derivedMeaning || "Current source grounding recorded in teaching layer."),
      knownRelatedCategories: uniqueList(family.relatedCategories),
      futureScope: "Awaiting analysis; no cross-library source links generated yet."
    });
  });
  const seen = new Set();
  return records.filter((item) => {
    const key = `${item.principleFamily}|${item.currentSource}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function libraryAwarenessLines(records, limit = 5) {
  return asArray(records).slice(0, limit).map((item) => `${item.principleFamily} | Current source: ${item.currentSource} | Related categories: ${asArray(item.knownRelatedCategories).slice(0, 3).join(", ") || "awaiting analysis"} | Future sources: awaiting analysis`);
}
function provenanceLine(source, label, layer, key) {
  return `${source} | Label: ${clean(label || "Not recorded")} | Layer: ${layer} | Storage key: ${key}`;
}
function evidenceWeightLine(type, strength, grounding, supportingCount = 0) {
  return `${type} | Strength: ${clean(strength)} | Source grounding: ${clean(grounding || "Not recorded")} | Supporting records: ${supportingCount}`;
}
function guidedStudyLines(samples, libraryAwareness, limit = 6) {
  const teaching = asArray(samples.teachingSemantics);
  const relationships = asArray(samples.principleRelationships);
  const interactions = asArray(samples.characterInteractions);
  const graph = asArray(samples.knowledgeGraph);
  const semanticQuestions = asArray(samples.semanticQuestions);
  const trustVerification = asArray(samples.trustVerification);
  const lines = [];
  if (teaching.some((item) => /\bJESUS\b/i.test(item.speaker || item.derivedMeaning || "")) || graph.some((item) => /\bJESUS\b/i.test(item.node || ""))) {
    lines.push("Study JESUS as Teacher | Character Focus | Source: I.C.E. generated study suggestion from Teaching Semantics + Knowledge Graph | Evidence Weight: Derived Semantic Evidence / Relationship Inference");
  }
  const principle = relationships.find((item) => /mercy|merciful|peace|peacemak|reconcil/i.test([item.principle, asArray(item.relatedPrinciples).join(" "), item.derivedMeaning].join(" ")));
  if (principle) lines.push(`Study ${clean(principle.principle || "Mercy")} with related principles | Principle Focus | Source: I.C.E. generated study suggestion from Principle Relationships | Evidence Weight: Relationship Inference`);
  const block = teaching.find((item) => item.teachingBlock || item.teachingTopic || item.discourseType);
  if (block) lines.push(`Study ${clean(block.teachingBlock || block.teachingTopic || "the teaching block")} | Teaching Focus | Source: I.C.E. generated study suggestion from Teaching Semantics | Evidence Weight: ${block.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence"}`);
  const relation = interactions.find((item) => item.sourceCharacter || item.targetCharacter);
  if (relation) lines.push(`Study ${clean(relation.sourceCharacter || "source")} and ${clean(relation.targetCharacter || "target")} | Relationship Focus | Source: I.C.E. generated study suggestion from Character Interactions | Evidence Weight: Relationship Inference`);
  const family = asArray(libraryAwareness)[0];
  if (family) lines.push(`Study the ${clean(family.principleFamily || "principle")} family in this source | Library Awareness Focus | Source: I.C.E. generated study suggestion from Library Awareness | Evidence Weight: Library Awareness Classification`);
  return lines.slice(0, limit);
}function studyProgressionLines(samples, libraryAwareness, limit = 4) {
  const teaching = asArray(samples.teachingSemantics);
  const relationships = asArray(samples.principleRelationships);
  const interactions = asArray(samples.characterInteractions);
  const graph = asArray(samples.knowledgeGraph);
  const semanticQuestions = asArray(samples.semanticQuestions);
  const trustVerification = asArray(samples.trustVerification);
  const library = asArray(libraryAwareness);
  const explored = [];
  const related = [];
  if (teaching.some((item) => /\bJESUS\b/i.test(item.speaker || item.derivedMeaning || ""))) explored.push("JESUS as Teacher");
  teaching.forEach((item) => {
    if (item.teachingBlock || item.teachingTopic || item.discourseType) explored.push(clean(item.teachingBlock || item.teachingTopic || item.discourseType));
    if (item.principle || item.commandment || item.blessing || item.promise || item.warning) related.push(clean(item.principle || item.commandment || item.blessing || item.promise || item.warning));
  });
  relationships.forEach((item) => {
    if (item.principle) explored.push(clean(item.principle));
    asArray(item.relatedPrinciples).forEach((topic) => related.push(clean(topic)));
  });
  interactions.forEach((item) => {
    if (item.sourceCharacter || item.targetCharacter) explored.push(`${clean(item.sourceCharacter || "source")} and ${clean(item.targetCharacter || "target")}`);
    if (item.interactionType) related.push(clean(item.interactionType));
  });
  graph.forEach((item) => {
    if (item.node) related.push(clean(item.node));
    asArray(item.relatedPrinciples).forEach((topic) => related.push(clean(topic)));
  });
  library.forEach((item) => {
    if (item.principleFamily) explored.push(clean(item.principleFamily));
    asArray(item.knownRelatedCategories).forEach((topic) => related.push(clean(topic)));
  });
  const exploredSet = new Set(unique(explored).map((item) => item.toLowerCase()));
  const notYet = unique(related).filter((item) => item && !exploredSet.has(item.toLowerCase()));
  const next = notYet.find((item) => /reconciliation|righteousness|law fulfillment|peacemak|mercy|kingdom/i.test(item)) || notYet[0] || "Review another grounded Guided Study suggestion";
  if (!explored.length && !related.length) return [];
  return [
    `Current Focus: ${teaching[0]?.teachingTopic || teaching[0]?.teachingBlock || "Current analyzed source"}`,
    `Explored Topics: ${unique(explored).slice(0, 5).join(", ") || "grounded topics awaiting review"}`,
    `Not Yet Explored: ${notYet.slice(0, 5).join(", ") || "none detected from current compact records"}`,
    `Suggested Next: ${next} | Why: connected through existing semantic layers | Evidence Weight: Relationship Inference / Derived Semantic Evidence`
  ].slice(0, limit);
}function principleHierarchyLines(samples, limit = 14) {
  const rows = [];
  const push = (category, label, item = {}) => {
    const cleanLabel = clean(label);
    if (!cleanLabel) return;
    rows.push(`${category}: ${cleanLabel} | Source phrase: ${clean(item.sourcePhrase || "Not recorded")} | App accuracy: ${clean(item.confidence || "probable")}`);
  };
  asArray(samples.teachingSemantics).forEach((item) => {
    if (item.principle) push(/blessing|principle/i.test(item.discourseType || "") ? "Core Principles" : "Supporting Principles", item.principle, item);
    if (item.teachingTopic) push("Teaching Themes", item.teachingTopic, item);
    if (item.commandment) push("Commandments", item.commandment, item);
    if (item.application) String(item.application).split(/;|,/).forEach((part) => push("Applications", part, item));
    if (item.promise) push("Promises", item.promise, item);
    if (item.warning) push("Warnings / Consequences", item.warning, item);
    if (item.requirement) push(/kingdom of heaven|exceeding/i.test(item.requirement) ? "Audience Conditions" : "Warnings / Consequences", item.requirement, item);
    if (item.contrast) push("Contrasts", item.contrast, item);
    if (item.example) push("Examples", item.example, item);
    if (item.audience) push("Audience Conditions", item.audience, item);
  });
  asArray(samples.principleRelationships).forEach((item) => {
    if (item.principle) push("Supporting Principles", item.principle, item);
    asArray(item.relatedPrinciples).forEach((part) => push("Supporting Principles", part, item));
  });
  return unique(rows).slice(0, limit);
}function focusLensLines(samples, limit = 8) {
  return asArray(samples.focusLens).slice(0, limit).map((item) => `${clean(item.currentFocus || "Focus")} | Type: ${clean(item.focusType || "Theme")} | Related: ${asArray([...asArray(item.relatedPrinciples), ...asArray(item.relatedCharacters), ...asArray(item.relatedTeachings)]).slice(0, 4).map(clean).join(", ") || "related records awaiting grounding"} | Next: ${clean(item.suggestedNextFocus || "not recorded")} | Evidence: ${clean(item.evidenceWeight || "Derived Semantic Evidence")}`);
}function scopeLensLines(samples, limit = 8) {
  return asArray(samples.scopeLens).slice(0, limit).map((item) => `${clean(item.activeFocus || "Focus")} | Scope: ${clean(item.activeScope || "Current scope")} | Type: ${clean(item.scopeType || "Current page/session")} | Included: ${asArray(item.includedPages).slice(0, 4).map(clean).join(", ") || "current page"} | Future excluded: ${asArray(item.excludedFuturePages).slice(0, 3).map(clean).join(", ") || "book/volume/library"} | Evidence: ${clean(item.evidenceWeight || "Derived Semantic Evidence")}`);
}function principleNetworkLines(samples, limit = 8) {
  return asArray(samples.principleNetworks).slice(0, limit).map((item) => `${clean(item.corePrinciple || "Principle")} | Related: ${asArray(item.relatedPrinciples).slice(0, 3).map(clean).join(", ") || "related principles awaiting records"} | Promises: ${asArray(item.promises).slice(0, 2).map(clean).join(", ") || "none recorded"} | Authority: ${clean(item.authorityContext || "Current source")} | Evidence: ${clean(item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference")}`);
}function resolutionExplanationLines(samples, libraryAwareness, limit = 8) {
  const teaching = asArray(samples.teachingSemantics).slice(0, 3).map((item) => `${clean(item.teachingTopic || item.blessing || item.commandment || "Teaching")} | Direct Source Evidence | source phrase -> speaker/audience context -> teaching category -> final teaching resolution`);
  const relationships = asArray(samples.principleRelationships).slice(0, 3).map((item) => `${clean(item.principle || "Principle")} ${clean(item.relationshipType || "related")} ${clean(asArray(item.relatedPrinciples).slice(0, 2).join(", "))} | Relationship Inference | source teaching evidence -> shared discourse context -> relationship type -> final principle relationship`);
  const interactions = asArray(samples.characterInteractions).slice(0, 2).map((item) => `${clean(item.sourceCharacter || "Source")} -> ${clean(item.targetCharacter || "Target")} | Relationship Inference | source character -> target character -> interaction type -> final interaction resolution`);
  const graph = asArray(samples.knowledgeGraph).slice(0, 2).map((item) => `${clean(item.node || "Node")} = ${clean(item.type || "Semantic Node")} | Derived Semantic Evidence | existing semantic records -> node relationship aggregation -> scope preservation -> final graph node`);
  const library = asArray(libraryAwareness).slice(0, 2).map((item) => `${clean(item.principleFamily || "Library Awareness")} | Library Awareness Classification | current source grounding -> family classification -> future sources held open -> final library awareness label`);
  return [...teaching, ...relationships, ...interactions, ...graph, ...library].slice(0, limit);
}function recommendedFocus(activeTitle) {
  if (/Matthew 5/i.test(activeTitle)) {
    return [
      "check speaker resolution",
      "check audience classification",
      "check teaching block and source-text grounding",
      "check principle relationship grounding",
      "check reference role filtering"
    ];
  }
  return [
    "check active source target",
    "check semantic layer counts",
    "check source phrase vs derived meaning separation"
  ];
}

function loadBundle(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function reportFromBundle(bundle) {
  const samples = bundle.samples || {};
  const counts = bundle.counts || {};
  const activeAdapter = samples.activeAdapter || {};
  const teaching = asArray(samples.teachingSemantics);
  const relationships = asArray(samples.principleRelationships);
  const characterInteractions = asArray(samples.characterInteractions);
  const sessionContinuityReview = asArray(samples.sessionContinuityReview);
  const knowledgeGraph = asArray(samples.knowledgeGraph);
  const principleNetworks = asArray(samples.principleNetworks);
  const focusLens = asArray(samples.focusLens);
  const scopeLens = asArray(samples.scopeLens);
  const semanticQuestions = asArray(samples.semanticQuestions);
  const trustVerification = asArray(samples.trustVerification);
  const answeredSemanticQuestions = semanticQuestions.filter((item) => item.questionKind !== "suggested");
  const suggestedSemanticQuestions = semanticQuestions.filter((item) => item.questionKind === "suggested");
  const source = teaching[0]?.sourceContext || {};
  const activeTitle = source.sourceTitle || bundle.pageTitle || "Matthew 5";
  const activeUrl = source.sourceUrl || bundle.url || "Not recorded";
  const evidence = [
    ...teaching.slice(0, 4).map((item) => `${item.sourcePhrase || item.teachingTopic || "Teaching"} | ${item.derivedMeaning || "derived meaning not recorded"}`),
    ...relationships.slice(0, 3).map((item) => `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")} | ${item.sourcePhrase || "source phrase not recorded"}`),
    ...characterInteractions.slice(0, 3).map((item) => `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"} | ${item.sourcePhrase || "source phrase not recorded"}`),
    ...sessionContinuityReview.slice(0, 2).map((item) => `${item.sessionRange || "Current session"} | ${asArray(item.teachingProgression).slice(0, 3).join("; ") || "session progression"}`),
    ...knowledgeGraph.slice(0, 3).map((item) => `${item.node || "Node"} | ${item.type || "Semantic Node"} | ${asArray(item.relationships).slice(0, 2).join("; ") || "relationships not recorded"}`)
  ];
  const adapterName = clean(activeAdapter.adapterName || "lds_scripture_adapter");
  const libraryAwareness = libraryAwarenessRecords(samples, activeTitle);
  const concerns = autoConcerns(bundle, activeTitle, adapterName);

  return [
    "# I.C.E. GPT Review Report",
    "",
    "## Repo Context",
    `Current canonical anchor: ${clean(currentGitAnchor())}`,
    "Report generated by: GPT Review Mode",
    "QA command: npm.cmd run review:matthew5",
    "",
    "## Review Prompt",
    `Current Review Question: ${reviewQuestionForTitle(activeTitle)}`,
    "User Observed Issue: Not provided in QA bundle. Add the user's observed issue before requesting architectural review.",
    "",
    "## Source",
    `Active source page: ${clean(activeTitle)}`,
    `URL: ${clean(activeUrl)}`,
    `Adapter: ${adapterName}`,
    `Analysis timestamp: ${clean(bundle.testedAt || "Not recorded")}`,
    "Current page/chapter type: Teaching / discourse heavy",
    "",
    "## Study Scope",
    "Range: Matthew 5",
    "Analyzed pages: Matthew 5",
    "Continuity: no cross-page continuity in standalone QA bundle",
    "",
    "## Layer Counts",
    `DOM hints: ${counts.domSemanticHints || 0}`,
    `Source Discovery: ${counts.sourceDiscovery || 0}`,
    `Reference Graph: ${counts.referenceGraph || 0}`,
    `Reference Roles: ${counts.referenceRoles || 0}`,
    `Ontology Roles: ${counts.ontologyRoles || 0}`,
    `Teaching / Discourse: ${counts.teachingSemantics || 0}`,
    `Principle Relationships: ${counts.principleRelationships || 0}`,
    `Principle Networks: ${counts.principleNetworks || principleNetworks.length || 0}`,
    `Focus Lens: ${counts.focusLens || focusLens.length || 0}`,
    `Scope Lens: ${counts.scopeLens || scopeLens.length || 0}`,
    `Principle Hierarchy Items: ${principleHierarchyLines(samples).length}`,
    `Character Interactions: ${counts.characterInteractions || 0}`,
    `Session Continuity Review: ${counts.sessionContinuityReview || sessionContinuityReview.length || 0}`,
    `Scripture Knowledge Graph: ${counts.knowledgeGraph || knowledgeGraph.length || 0}`,
    `Semantic Questions: ${counts.semanticQuestions || semanticQuestions.length || 0}`,
    `Trust & Verification: ${counts.trustVerification || trustVerification.length || 0}`,
    `Library Awareness: ${libraryAwareness.length}`,
    `Guided Study: ${guidedStudyLines(samples, libraryAwareness).length}`,
    `Study Progression: ${studyProgressionLines(samples, libraryAwareness).length}`,
    `Semantic Resolution Explanations: ${resolutionExplanationLines(samples, libraryAwareness).length}`,
    "",
    "## Provenance Labels",
    ...list([
      "I.C.E. Classification | Label: Semantic Coverage status | Layer: Semantic Coverage | Storage key: derived panel coverage row",
      ...teaching.slice(0, 4).map((item) => provenanceLine("I.C.E. Teaching Classification", item.teachingTopic || item.blessing || item.commandment || item.principle || item.discourseType, "Teaching / Discourse Structure", "ICE_TEACHING_SEMANTICS")),
      ...relationships.slice(0, 4).map((item) => provenanceLine("I.C.E. Principle Relationship", `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")}`, "Principle Relationships", "ICE_PRINCIPLE_RELATIONSHIPS")),
      ...principleNetworks.slice(0, 4).map((item) => provenanceLine(item.provenance || "I.C.E. Principle Network", `${item.corePrinciple || "Principle"} network`, "Principle Networks", "ICE_PRINCIPLE_NETWORKS")),
      ...focusLens.slice(0, 4).map((item) => provenanceLine(item.provenance || "I.C.E. Focus Lens", `${item.currentFocus || "Focus"} lens`, "Focus Lens", "ICE_FOCUS_LENS")),
      ...scopeLens.slice(0, 4).map((item) => provenanceLine(item.provenance || "I.C.E. Scope Lens", `${item.activeFocus || "Focus"} in ${item.activeScope || "Current scope"}`, "Scope Lens", "ICE_SCOPE_LENS")),
      ...characterInteractions.slice(0, 3).map((item) => provenanceLine("I.C.E. Relationship", `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"}`, "Character Interactions", "ICE_CHARACTER_INTERACTIONS")),
      ...sessionContinuityReview.slice(0, 2).map((item) => provenanceLine("I.C.E. Continuity", item.sessionRange || "Session Continuity Review", "Session Continuity Review", "ICE_SESSION_CONTINUITY_REVIEW")),
      ...knowledgeGraph.slice(0, 4).map((item) => provenanceLine("I.C.E. Knowledge Graph", item.node || "Knowledge Graph Node", "Scripture Knowledge Graph", "ICE_KNOWLEDGE_GRAPH")),
      ...answeredSemanticQuestions.slice(0, 4).map((item) => provenanceLine("I.C.E. Semantic Question", item.question || "Semantic Question", "Semantic Questions", "ICE_SEMANTIC_QUESTIONS")),
      ...suggestedSemanticQuestions.slice(0, 4).map((item) => provenanceLine("I.C.E. Contextual Inquiry Suggestion", item.question || "Semantic Question", "Semantic Questions", "ICE_SEMANTIC_QUESTIONS")),
      ...trustVerification.slice(0, 4).map((item) => provenanceLine(item.provenance || "I.C.E. Trust Verification", item.result || "Trust Verification", "Trust & Verification", "ICE_TRUST_VERIFICATION")),
      ...libraryAwareness.slice(0, 4).map((item) => provenanceLine("I.C.E. Library Awareness", item.principleFamily || "Library Awareness", "Library Awareness", "ICE_LIBRARY_AWARENESS_FOUNDATION"))
    ], "no generated semantic labels available"),
    "",
    "## Evidence Weights",
    ...list([
      ...teaching.slice(0, 4).map((item) => evidenceWeightLine(item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence", item.sourcePhrase ? "directly grounded in source phrase" : "derived from teaching/discourse record", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length)),
      ...relationships.slice(0, 4).map((item) => evidenceWeightLine("Relationship Inference", "relationship supported by grounded principle/teaching evidence", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length + asArray(item.relatedPrinciples).length)),
      ...principleNetworks.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence / Relationship Inference", "principle neighborhood derived from existing semantic records", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length + asArray(item.relatedPrinciples).length)),
      ...focusLens.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence", "default focus derived from existing semantic records", item.sourceGrounding || item.sourcePhrase, asArray(item.relatedEvidence).length + asArray(item.relatedPrinciples).length + asArray(item.relatedCharacters).length)),
      ...scopeLens.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence", "scope boundary derived from current analyzed page/session records only", item.sourceGrounding || item.scopeBoundary, asArray(item.relatedEvidence).length + asArray(item.includedPages).length)),
      ...characterInteractions.slice(0, 3).map((item) => evidenceWeightLine("Relationship Inference", "interaction supported by character/action evidence", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length)),
      ...sessionContinuityReview.slice(0, 2).map((item) => evidenceWeightLine("Continuity Inference", "derived from analyzed session records", item.sourceGrounding || item.derivedMeaning, asArray(item.evidence).length + asArray(item.teachingProgression).length)),
      ...knowledgeGraph.slice(0, 4).map((item) => evidenceWeightLine("Derived Semantic Evidence", "graph node derived from connected semantic layer records", item.sourceGrounding || item.derivedMeaning, asArray(item.evidence).length + asArray(item.relationships).length)),
      ...answeredSemanticQuestions.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence", "question answer constructed from current semantic records", item.sourceGrounding || item.derivedMeaning, asArray(item.evidence).length + asArray(item.groundingLayers).length)),
      ...suggestedSemanticQuestions.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence", "contextual inquiry suggestion from current semantic records", item.sourceGrounding || item.reasonSuggested || item.derivedMeaning, asArray(item.evidence).length + asArray(item.groundingLayers).length)),
      ...trustVerification.slice(0, 4).map((item) => evidenceWeightLine(item.evidenceWeight || "Derived Semantic Evidence", "trust basis from visible provenance and supporting records", item.sourceGrounding || item.sourceBasis, asArray(item.supportingRecords).length + asArray(item.trustSignals).length)),
      ...libraryAwareness.slice(0, 4).map((item) => evidenceWeightLine("Library Awareness Classification", "classification from current analyzed source only", item.currentGrounding, asArray(item.knownRelatedCategories).length))
    ], "no semantic evidence weights available"),
    "",
    "## Principle Hierarchy",
    ...list(principleHierarchyLines(samples), "no principle hierarchy records available"),
    "",
    "## Principle Networks",
    ...list(principleNetworkLines(samples), "no principle network records available"),
    "",
    "## Focus Lens",
    ...list(focusLensLines(samples), "no focus lens records available"),
    "",
    "## Scope Lens",
    ...list(scopeLensLines(samples), "no scope lens records available"),
    "",
    "## Trust & Verification",
    ...list(trustVerification.slice(0, 6).map((item) => `${item.result || "Trust result"} | Source: ${clean(item.sourceBasis || "source basis not recorded")} | Evidence: ${clean(item.evidenceWeight || "Derived Semantic Evidence")} | Signals: ${asArray(item.trustSignals).slice(0, 3).join(", ") || "signals awaiting records"}`), "no trust verification records available"),
    "",
    "## Semantic Resolution Explanations",
    ...list(resolutionExplanationLines(samples, libraryAwareness), "no resolution explanations available"),
    "",
    "## Guided Study",
    ...list(guidedStudyLines(samples, libraryAwareness), "no guided study suggestions available"),
    "",
    "## Study Progression",
    ...list(studyProgressionLines(samples, libraryAwareness), "no study progression records available"),
    "",
    "## Semantic Coverage",
    ...list([
      counts.teachingSemantics ? "Teaching / Discourse Structure: Primary semantic layer for this chapter; grounded records found" : "Teaching / Discourse Structure: Primary semantic layer for this chapter; awaiting grounding",
      counts.principleRelationships ? "Principle Relationships: Pilot layer; grounded records found" : "Principle Relationships: Pilot layer; no grounded records found",
      (counts.principleNetworks || principleNetworks.length) ? "Principle Networks: Derived principle-neighborhood records found" : "Principle Networks: Awaiting grounded principle records",
      (counts.focusLens || focusLens.length) ? "Focus Lens: Default focus records found" : "Focus Lens: Awaiting grounded semantic focus records",
      (counts.scopeLens || scopeLens.length) ? "Scope Lens: Current page/session scope boundary records found" : "Scope Lens: Awaiting current scope records",
      counts.characterInteractions ? "Character Interactions: Pilot layer; grounded records found" : "Character Interactions: Pilot layer; awaiting grounding",
      (counts.sessionContinuityReview || sessionContinuityReview.length) ? "Session Continuity Review: Pilot layer; grounded review records found" : "Session Continuity Review: Available when session scope spans multiple pages",
      (counts.knowledgeGraph || knowledgeGraph.length) ? "Scripture Knowledge Graph: Graph foundation; grounded node records found" : "Scripture Knowledge Graph: Graph foundation; awaiting grounded semantic layers",
      (counts.semanticQuestions || semanticQuestions.length) ? "Semantic Questions: Question framework; grounded answers/suggestions found" : "Semantic Questions: Question framework; awaiting grounded semantic records",
      (counts.trustVerification || trustVerification.length) ? "Trust & Verification: Trust basis records found" : "Trust & Verification: Awaiting grounded records",
      libraryAwareness.length ? "Library Awareness: Framework only; current-source grounded records found" : "Library Awareness: Framework only; awaiting analyzed teaching/principle grounding",
      "Movement / Location Semantics: Not applicable to current chapter",
      "Cross-Chapter Continuity: Available when session scope spans multiple pages"
    ]),
    "",
    "## Scripture Knowledge Graph",
    ...list(knowledgeGraph.slice(0, 6).map((item) => `${item.node || "Node"} | ${item.type || "Semantic Node"} | ${asArray(item.relationships).slice(0, 3).join("; ") || "relationships awaiting grounding"}`), "no knowledge graph records available"),
    "",
    "## Semantic Questions",
    "Answered Questions",
    ...list(answeredSemanticQuestions.slice(0, 6).map((item) => `${item.question || "Question"} => ${item.answer || "answer awaiting grounding"} | ${asArray(item.groundingLayers).slice(0, 3).join(", ") || "grounding awaiting records"}`), "no answered semantic question records available"),
    "",
    "Suggested Next Questions",
    ...list(suggestedSemanticQuestions.slice(0, 6).map((item) => `${item.question || "Question"} | Why: ${item.reasonSuggested || "suggested from current semantic records"} | Layer: ${item.supportingLayer || asArray(item.groundingLayers)[0] || "grounding awaiting records"}`), "no contextual inquiry suggestions available"),
    "",
    "## Session Continuity Review",
    ...list(sessionContinuityReview.slice(0, 5).map((item) => `${item.sessionRange || "Current session"} | ${asArray(item.teachingProgression).slice(0, 5).join("; ") || "progression awaiting session records"}`), "no session continuity review records available"),
    "",
    "## Library Awareness",
    ...list(libraryAwarenessLines(libraryAwareness), "no library awareness records available"),
    "",
    "## Top Concern Auto-Detection",
    ...list(concerns, "none detected in compact review snapshot"),
    "",
    "## GPT Recommended Review Focus",
    ...list(recommendedFocus(activeTitle)),
    "",
    "## Top Derived Sections",
    ...list([
      ...teaching.slice(0, 6).map((item) => `${item.teachingTopic || item.blessing || item.commandment || item.principle || item.discourseType} | ${item.verseRange || item.scopePath || "current scope"} | App accuracy: ${item.confidence || "probable"}`),
      ...relationships.slice(0, 5).map((item) => `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")} | App accuracy: ${item.confidence || "probable"}`),
      ...principleNetworks.slice(0, 5).map((item) => `${item.corePrinciple || "Principle"} network | ${asArray(item.relatedPrinciples).slice(0, 3).join(", ")} | App accuracy: ${item.confidence || "probable"}`),
      ...focusLens.slice(0, 5).map((item) => `${item.currentFocus || "Focus"} lens | ${item.focusType || "Theme"} | Next: ${item.suggestedNextFocus || "not recorded"} | App accuracy: ${item.confidence || "probable"}`),
      ...scopeLens.slice(0, 5).map((item) => `${item.activeFocus || "Focus"} in ${item.activeScope || "Current scope"} | ${item.scopeType || "Current page/session"} | App accuracy: ${item.confidence || "probable"}`),
      ...characterInteractions.slice(0, 5).map((item) => `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"} | App accuracy: ${item.confidence || "probable"}`),
      ...sessionContinuityReview.slice(0, 5).map((item) => `${item.sessionRange || "Current session"} | ${asArray(item.teachingProgression).slice(0, 3).join("; ") || "session progression"} | App accuracy: ${item.confidence || "probable"}`),
      ...knowledgeGraph.slice(0, 6).map((item) => `${item.node || "Node"} | ${item.type || "Semantic Node"} | App accuracy: ${item.confidence || "probable"}`)
    ], "no derived teaching/principle summaries available"),
    "",
    "## Selected Evidence",
    ...(evidence.length ? evidence.slice(0, 5).map((line, index) => `${index + 1}. ${clean(line)}`) : ["1. No compact evidence lines available."]),
    "",
    "## QA-Style Summary",
    `pass: ${Boolean(bundle.pass)}`,
    `latestCapture: ${counts.latestCapture || 0}`,
    `domSemanticHints: ${counts.domSemanticHints || 0}`,
    `teachingSemantics: ${counts.teachingSemantics || 0}`,
    `principleRelationships: ${counts.principleRelationships || 0}`,
    `characterInteractions: ${counts.characterInteractions || 0}`,
    `sessionContinuityReview: ${counts.sessionContinuityReview || sessionContinuityReview.length || 0}`,
    `knowledgeGraph: ${counts.knowledgeGraph || knowledgeGraph.length || 0}`,
    `scopeLens: ${counts.scopeLens || scopeLens.length || 0}`,
    `semanticQuestions: ${counts.semanticQuestions || semanticQuestions.length || 0}`,
    `trustVerification: ${counts.trustVerification || trustVerification.length || 0}`,
    `libraryAwareness: ${libraryAwareness.length}`,
    "",
    "## Excluded From This Report",
    "- full Source Discovery",
    "- full Reference Graph",
    "- huge DOM hints",
    "- full raw mention index",
    "",
    "## Review Notes",
    "This report is generated from local QA output. GPT reviews this artifact; it does not control the browser or crawl pages."
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

const bundle = loadBundle(input);
const report = reportFromBundle(bundle);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report, "utf8");
console.log(`Wrote ${output}`);
console.log(`Characters: ${report.length}`);
