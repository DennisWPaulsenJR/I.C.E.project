const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const output = process.argv[2] || path.join("QA_REPORTS", "latest-study-panel-report.md");
const inputs = process.argv.slice(3).length ? process.argv.slice(3) : [
  path.join("qa-output", "latest-qa-bundle.json"),
  path.join("qa-output", "latest-matthew2-qa-bundle.json"),
  path.join("qa-output", "latest-matthew3-qa-bundle.json"),
  path.join("qa-output", "latest-matthew5-qa-bundle.json")
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
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

function provenanceLine(source, label, layer, key) {
  return `${source} | Label: ${clean(label || "Not recorded")} | Layer: ${layer} | Storage key: ${key}`;
}
function evidenceWeightLine(type, strength, grounding, supportingCount = 0) {
  return `${type} | Strength: ${clean(strength)} | Source grounding: ${clean(grounding || "Not recorded")} | Supporting records: ${supportingCount}`;
}
function guidedStudyLines(sorted, limit = 6) {
  const lines = [];
  const allSamples = sorted.flatMap((entry) => [entry.bundle.samples || {}]);
  if (allSamples.some((samples) => asArray(samples.teachingSemantics).some((item) => /\bJESUS\b/i.test(item.speaker || item.derivedMeaning || "")))) {
    lines.push("Study JESUS as Teacher | Character Focus | Source: I.C.E. generated study suggestion from Teaching Semantics + Knowledge Graph | Evidence Weight: Derived Semantic Evidence / Relationship Inference");
  }
  const principle = allSamples.flatMap((samples) => asArray(samples.principleRelationships)).find((item) => /mercy|merciful|peace|peacemak|reconcil/i.test([item.principle, asArray(item.relatedPrinciples).join(" "), item.derivedMeaning].join(" ")));
  if (principle) lines.push(`Study ${clean(principle.principle || "Mercy")} with related principles | Principle Focus | Source: I.C.E. generated study suggestion from Principle Relationships | Evidence Weight: Relationship Inference`);
  const relation = allSamples.flatMap((samples) => asArray(samples.characterInteractions)).find((item) => item.sourceCharacter || item.targetCharacter);
  if (relation) lines.push(`Study ${clean(relation.sourceCharacter || "source")} and ${clean(relation.targetCharacter || "target")} | Relationship Focus | Source: I.C.E. generated study suggestion from Character Interactions | Evidence Weight: Relationship Inference`);
  lines.push("Study continuity across the current session | Session Continuity Focus | Source: I.C.E. generated study suggestion from Session Continuity Review | Evidence Weight: Continuity Inference");
  return unique(lines).slice(0, limit);
}function studyProgressionLines(sorted, limit = 4) {
  const allSamples = sorted.flatMap((entry) => [entry.bundle.samples || {}]);
  const teachings = allSamples.flatMap((samples) => asArray(samples.teachingSemantics));
  const relationships = allSamples.flatMap((samples) => asArray(samples.principleRelationships));
  const interactions = allSamples.flatMap((samples) => asArray(samples.characterInteractions));
  const explored = [];
  const related = [];
  if (teachings.some((item) => /\bJESUS\b/i.test(item.speaker || item.derivedMeaning || ""))) explored.push("JESUS as Teacher");
  teachings.forEach((item) => {
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
  const exploredSet = new Set(unique(explored).map((item) => item.toLowerCase()));
  const notYet = unique(related).filter((item) => item && !exploredSet.has(item.toLowerCase()));
  const next = notYet.find((item) => /reconciliation|righteousness|law fulfillment|peacemak|mercy|kingdom/i.test(item)) || notYet[0] || "Review another grounded Guided Study suggestion";
  if (!explored.length && !related.length) return [];
  return [
    `Current Focus: ${teachings[0]?.teachingTopic || teachings[0]?.teachingBlock || "Current analyzed session"}`,
    `Explored Topics: ${unique(explored).slice(0, 5).join(", ") || "grounded topics awaiting review"}`,
    `Not Yet Explored: ${notYet.slice(0, 5).join(", ") || "none detected from current compact records"}`,
    `Suggested Next: ${next} | Why: connected through existing semantic layers | Evidence Weight: Relationship Inference / Derived Semantic Evidence`
  ].slice(0, limit);
}function principleHierarchyLines(sorted, limit = 14) {
  const rows = [];
  const push = (category, label, item = {}) => {
    const cleanLabel = clean(label);
    if (!cleanLabel) return;
    rows.push(`${category}: ${cleanLabel} | Source phrase: ${clean(item.sourcePhrase || "Not recorded")} | App accuracy: ${clean(item.confidence || "probable")}`);
  };
  sorted.forEach((entry) => {
    const samples = entry.bundle.samples || {};
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
  });
  return unique(rows).slice(0, limit);
}function resolutionExplanationLines(sorted, range, limit = 8) {
  const values = sorted.flatMap((entry) => {
    const samples = entry.bundle.samples || {};
    return [
      ...asArray(samples.teachingSemantics).slice(0, 2).map((item) => `${clean(item.teachingTopic || item.blessing || item.commandment || "Teaching")} | Direct Source Evidence | source phrase -> speaker/audience context -> teaching category -> final teaching resolution`),
      ...asArray(samples.principleRelationships).slice(0, 2).map((item) => `${clean(item.principle || "Principle")} ${clean(item.relationshipType || "related")} ${clean(asArray(item.relatedPrinciples).slice(0, 2).join(", "))} | Relationship Inference | source teaching evidence -> shared discourse context -> relationship type -> final principle relationship`),
      ...asArray(samples.characterInteractions).slice(0, 2).map((item) => `${clean(item.sourceCharacter || "Source")} -> ${clean(item.targetCharacter || "Target")} | Relationship Inference | source character -> target character -> interaction type -> final interaction resolution`),
      ...asArray(samples.knowledgeGraph).slice(0, 2).map((item) => `${clean(item.node || "Node")} = ${clean(item.type || "Semantic Node")} | Derived Semantic Evidence | existing semantic records -> node relationship aggregation -> scope preservation -> final graph node`)
    ];
  });
  values.push(`${clean(range)} | Continuity Inference | analyzed pages -> continuing characters/themes -> session review -> final continuity resolution`);
  return unique(values).slice(0, limit);
}function currentGitAnchor() {
  try {
    return execSync("git log --oneline -1", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (_error) {
    return "not available";
  }
}

function loadBundle(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function pageLabel(bundle) {
  const title = clean(bundle.pageTitle || bundle.samples?.analysisStatus?.sourceCaptureTitle || "");
  const match = title.match(/Matthew\s+(\d+)/i) || clean(bundle.url).match(/matt\/(\d+)/i);
  return match ? `Matthew ${match[1]}` : title || clean(bundle.url) || "Unknown page";
}

function pageChapter(label) {
  return Number(String(label || "").match(/Matthew\s+(\d+)/i)?.[1] || 0);
}

function progressionForChapter(chapter) {
  return {
    1: "Matthew 1: mission revealed",
    2: "Matthew 2: mission preserved",
    3: "Matthew 3: mission announced",
    4: "Matthew 4: mission prepared",
    5: "Matthew 5: mission taught"
  }[chapter] || "";
}

function reportFromBundles(bundles) {
  const sorted = bundles
    .map((bundle) => ({ bundle, label: pageLabel(bundle), chapter: pageChapter(pageLabel(bundle)) }))
    .filter((entry) => entry.label)
    .sort((left, right) => (left.chapter || 999) - (right.chapter || 999));
  const labels = unique(sorted.map((entry) => entry.label));
  const chapters = new Set(sorted.map((entry) => entry.chapter).filter(Boolean));
  const has = (chapter) => chapters.has(chapter);
  const range = labels.length ? `${labels[0]} -> ${labels[labels.length - 1]}` : "No session range";
  const counts = sorted.reduce((acc, entry) => {
    for (const [key, value] of Object.entries(entry.bundle.counts || {})) acc[key] = (acc[key] || 0) + Number(value || 0);
    return acc;
  }, {});
  const samples = sorted.flatMap((entry) => {
    const bundleSamples = entry.bundle.samples || {};
    return [
      ...asArray(bundleSamples.semanticContinuity).map((item) => `Continuity: ${item.continuedEntity || "entity"} | ${item.chapterTransition || entry.label}`),
      ...asArray(bundleSamples.characterInteractions).map((item) => `Interaction: ${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"} | ${item.interactionType || "interaction"}`),
      ...asArray(bundleSamples.teachingSemantics).map((item) => `Teaching: ${item.teachingTopic || item.blessing || item.commandment || "teaching"} | ${item.sourcePhrase || entry.label}`),
      ...asArray(bundleSamples.principleRelationships).map((item) => `Principle: ${item.principle || "principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).slice(0, 3).join(", ")}`),
      ...asArray(bundleSamples.knowledgeGraph).map((item) => `Knowledge Graph: ${item.node || "Node"} | ${item.type || "Semantic Node"} | ${asArray(item.relationships).slice(0, 2).join("; ")}`)
    ];
  });
  const continuingCharacters = unique([
    has(1) || has(2) || has(3) || has(5) ? "JESUS" : "",
    has(1) || has(2) ? "Joseph" : "",
    has(1) || has(2) ? "Mary" : "",
    has(3) ? "John" : "",
    has(5) ? "disciples" : "",
    has(5) ? "People / multitudes" : ""
  ]);
  const continuingThemes = unique([
    has(1) ? "mission revealed" : "",
    has(2) ? "mission preserved" : "",
    has(3) ? "mission announced" : "",
    has(4) ? "mission prepared" : "",
    has(5) ? "mission taught" : "",
    has(5) ? "kingdom" : "",
    has(5) ? "righteousness" : "",
    has(5) ? "mercy" : "",
    has(1) || has(2) ? "obedience" : "",
    has(1) || has(2) ? "fulfillment" : ""
  ]);
  const authorityPaths = unique([
    has(1) || has(2) ? "THE LORD -> AngEL Of THE LORD -> Joseph" : "",
    has(3) ? "HOLY SPIRIT source wording / derived display continuity" : "",
    has(5) ? "JESUS -> disciples / multitudes" : ""
  ]);
  const progression = unique([1, 2, 3, 4, 5].filter(has).map(progressionForChapter));

  return [
    "# I.C.E. GPT Review Report",
    "",
    "## Repo Context",
    `Current canonical anchor: ${clean(currentGitAnchor())}`,
    "Report generated by: GPT Review Mode / session continuity review command",
    "QA command: npm.cmd run review:matthew-session",
    "",
    "## Review Prompt",
    "Current Review Question: Does Matthew 1 -> Matthew 5 preserve grounded session continuity across narrative, protection, baptism/preaching, preparation, and teaching layers?",
    "User Observed Issue: Not provided in QA bundle. Add the user's observed issue before requesting architectural review.",
    "",
    "## Source",
    `Active source page: ${labels[labels.length - 1] || "Not recorded"}`,
    "Adapter: lds_scripture_adapter",
    `Analysis timestamp: ${new Date().toISOString()}`,
    "Current page/chapter type: Session / range review",
    "",
    "## Study Scope",
    `Range: ${range}`,
    `Analyzed pages: ${labels.join(", ") || "none recorded"}`,
    "Continuity: session continuity review generated from separate local QA bundles; no auto-crawling performed",
    "",
    "## Scripture Knowledge Graph",
    `Graph foundation nodes: ${counts.knowledgeGraph || 0}`,
    "Purpose: connect existing semantic layers into reviewable graph node summaries; no visual graph rendering yet.",
    "",
    "## Session Continuity Review",
    `Session Range: ${range}`,
    ...list(continuingCharacters.map((item) => `Continuing Character: ${item}`)),
    ...list(continuingThemes.map((item) => `Continuing Theme: ${item}`)),
    ...list(authorityPaths.map((item) => `Continuing Authority Path: ${item}`)),
    ...list(progression.map((item) => `Teaching Progression: ${item}`)),
    "",
    "## Layer Counts",
    `Semantic Continuity: ${counts.semanticContinuity || 0}`,
    `Ontology Roles: ${counts.ontologyRoles || 0}`,
    `Authority Paths: ${counts.originAuthorityPaths || 0}`,
    `Teaching / Discourse: ${counts.teachingSemantics || 0}`,
    `Principle Relationships: ${counts.principleRelationships || 0}`,
    `Principle Hierarchy Items: ${principleHierarchyLines(sorted).length}`,
    `Character Interactions: ${counts.characterInteractions || 0}`,
    `Scripture Knowledge Graph: ${counts.knowledgeGraph || 0}`,
    "Session Continuity Review: 1",
    `Guided Study: ${guidedStudyLines(sorted).length}`,
    `Study Progression: ${studyProgressionLines(sorted).length}`,
    `Semantic Resolution Explanations: ${resolutionExplanationLines(sorted, range).length}`,
    "",
    "## Provenance Labels",
    ...list([
      "I.C.E. Classification | Label: Semantic Coverage status | Layer: Semantic Coverage | Storage key: derived panel coverage row",
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.teachingSemantics).slice(0, 2).map((item) => provenanceLine("I.C.E. Teaching Classification", item.teachingTopic || item.blessing || item.commandment || "Teaching", "Teaching / Discourse Structure", "ICE_TEACHING_SEMANTICS"))),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.principleRelationships).slice(0, 2).map((item) => provenanceLine("I.C.E. Principle Relationship", `${item.principle || "Principle"} ${item.relationshipType || "related"} ${asArray(item.relatedPrinciples).join(", ")}`, "Principle Relationships", "ICE_PRINCIPLE_RELATIONSHIPS"))),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.characterInteractions).slice(0, 2).map((item) => provenanceLine("I.C.E. Relationship", `${item.sourceCharacter || "Source"} -> ${item.targetCharacter || "Target"}`, "Character Interactions", "ICE_CHARACTER_INTERACTIONS"))),
      provenanceLine("I.C.E. Continuity", range, "Session Continuity Review", "ICE_SESSION_CONTINUITY_REVIEW"),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.knowledgeGraph).slice(0, 2).map((item) => provenanceLine("I.C.E. Knowledge Graph", item.node || "Knowledge Graph Node", "Scripture Knowledge Graph", "ICE_KNOWLEDGE_GRAPH")))
    ], "no generated semantic labels available"),
    "",
    "## Evidence Weights",
    ...list([
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.teachingSemantics).slice(0, 2).map((item) => evidenceWeightLine(item.sourcePhrase ? "Direct Source Evidence" : "Derived Semantic Evidence", item.sourcePhrase ? "directly grounded in source phrase" : "derived from teaching/discourse record", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length))),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.principleRelationships).slice(0, 2).map((item) => evidenceWeightLine("Relationship Inference", "relationship supported by grounded principle/teaching evidence", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length + asArray(item.relatedPrinciples).length))),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.characterInteractions).slice(0, 2).map((item) => evidenceWeightLine("Relationship Inference", "interaction supported by character/action evidence", item.sourceGrounding || item.sourcePhrase, asArray(item.evidence).length))),
      evidenceWeightLine("Continuity Inference", "session range derived from analyzed QA bundles", range, labels.length),
      ...sorted.flatMap((entry) => asArray(entry.bundle.samples?.knowledgeGraph).slice(0, 2).map((item) => evidenceWeightLine("Derived Semantic Evidence", "graph node derived from connected semantic layer records", item.sourceGrounding || item.derivedMeaning, asArray(item.evidence).length + asArray(item.relationships).length)))
    ], "no semantic evidence weights available"),
    "",
    "## Principle Hierarchy",
    ...list(principleHierarchyLines(sorted), "no principle hierarchy records available"),
    "",
    "## Semantic Resolution Explanations",
    ...list(resolutionExplanationLines(sorted, range), "no resolution explanations available"),
    "",
    "## Guided Study",
    ...list(guidedStudyLines(sorted), "no guided study suggestions available"),
    "",
    "## Study Progression",
    ...list(studyProgressionLines(sorted), "no study progression records available"),
    "",
    "## Semantic Coverage",
    "- Scripture Knowledge Graph: Graph foundation; uses grounded semantic layers when available",
    "- Session Continuity Review: Pilot layer; grounded review generated from analyzed QA bundles",
    "- Cross-Chapter Continuity: Available from Matthew 2 and session range metadata",
    "- Teaching / Discourse Structure: Primary semantic layer for Matthew 5",
    "- Library Awareness: Framework only; current-source records remain source grounded",
    "",
    "## Top Concern Auto-Detection",
    ...list(sorted.flatMap((entry) => asArray(entry.bundle.failures)).concat(labels.length < 2 ? ["Session range has fewer than two analyzed pages."] : []), "none detected in compact review snapshot"),
    "",
    "## GPT Recommended Review Focus",
    "- check session range and analyzed pages",
    "- check continuing characters are grounded to analyzed chapter anchors",
    "- check teaching progression does not include unanalyzed pages",
    "- check current semantic layers support continuity claims",
    "- check knowledge graph nodes do not imply ungrounded visual relationships",
    "",
    "## Selected Evidence",
    ...(unique(samples).slice(0, 8).map((line, index) => `${index + 1}. ${line}`)),
    "",
    "## Excluded From This Report",
    "- full Source Discovery",
    "- full Reference Graph",
    "- huge DOM hints",
    "- full raw mention index",
    "",
    "## Review Notes",
    "This report is generated from local QA outputs. GPT reviews this artifact; it does not control the browser or crawl pages."
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

const bundles = inputs.filter((file) => fs.existsSync(file)).map(loadBundle);
if (!bundles.length) {
  throw new Error("No QA bundle inputs found for session continuity report.");
}
const report = reportFromBundles(bundles);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report, "utf8");
console.log(`Wrote ${output}`);
console.log(`Characters: ${report.length}`);
