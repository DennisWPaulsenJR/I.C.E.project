"use strict";

// R34 is intentionally a source-expression layer.  It never admits events,
// selects world chronology, or treats operational timestamps as event time.
const crypto = require("crypto");
const propositions = require("./propositional-comprehension-runtime");
const discourse = require("./discourse-comprehension-runtime");

const hash = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 20);
const freeze = (value) => Object.freeze(value);
const normalized = (value = "") => String(value).trim().replace(/\s+/g, " ").toLowerCase();
const dateOnly = /^\d{4}-\d{2}-\d{2}$/;

function temporalExpressionId(logical) {
  return `temporal-expression-${hash(logical)}`;
}

function temporalRelationId(logical) {
  return `temporal-relation-${hash(logical)}`;
}

function sourceSpans(source) {
  const parts = String(source).match(/[^.!?]+[.!?]?/g) || [String(source)];
  let offset = 0;
  return parts.map((part, index) => {
    const text = part.trim();
    const start = String(source).indexOf(text, offset);
    offset = Math.max(offset, start + text.length);
    return { text, index, start: Math.max(0, start), end: Math.max(0, start) + text.length };
  }).filter((part) => part.text);
}

function addDays(anchor, days) {
  const [year, month, day] = anchor.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + days));
  return value.toISOString().slice(0, 10);
}

function expressionRecord({ sourceScope, propositionRef, clauseRef, span, surfaceText, expressionClass, explicit = true, anchorRequirement = "NONE", anchorReference = null, resolutionState = "RECOGNIZED", candidateTemporalSemantics = {}, provenance = {} }) {
  const logical = { sourceScope, propositionRef, clauseRef, sourceStart: span.start, sourceEnd: span.end, normalizedText: normalized(surfaceText), expressionClass, anchorRequirement };
  return freeze({
    temporalExpressionId: temporalExpressionId(logical),
    sourceScope,
    propositionRef,
    clauseRef,
    sourceSpan: freeze({ start: span.start, end: span.end }),
    surfaceText,
    normalizedText: logical.normalizedText,
    expressionClass,
    explicit,
    candidateTemporalSemantics: freeze(candidateTemporalSemantics),
    anchorRequirement,
    anchorReference,
    resolutionState,
    provenance: freeze({ kind: "SOURCE_EXPRESSION", ...provenance }),
    semanticTemporalIdentity: temporalExpressionId(logical),
    storageRowIdentity: null,
    truthPromoted: false,
    eventCreated: false,
    objectiveChronologyPromoted: false
  });
}

function detectExpressions(part, proposition, sourceScope, options) {
  const records = [];
  const add = (match, expressionClass, detail = {}) => records.push(expressionRecord({
    sourceScope,
    propositionRef: proposition.propositionCandidateId,
    clauseRef: `clause-${sourceScope}-${part.index}`,
    span: { start: part.start + match.index, end: part.start + match.index + match[0].length },
    surfaceText: match[0], expressionClass, ...detail
  }));
  const relative = /\b(yesterday|tomorrow)\b/ig;
  for (let match; (match = relative.exec(part.text));) {
    const anchor = options.referenceTime || null;
    const usable = anchor && dateOnly.test(anchor);
    const days = match[0].toLowerCase() === "yesterday" ? -1 : 1;
    add(match, "RELATIVE_TIME_EXPRESSION", {
      anchorRequirement: "REFERENCE_TIME_REQUIRED",
      anchorReference: usable ? freeze({ value: anchor, provenance: "EXPLICIT_CONTROLLED_REFERENCE_TIME" }) : null,
      resolutionState: usable ? "RESOLVED_CANDIDATE" : "UNRESOLVED",
      candidateTemporalSemantics: usable ? { candidateDate: addDays(anchor, days), derivationRule: `UTC_DATE_${days > 0 ? "PLUS" : "MINUS"}_${Math.abs(days)}_DAY`, status: "DERIVED_CANDIDATE" } : { reason: "MISSING_TEMPORAL_ANCHOR" },
      provenance: usable ? { anchorProvenance: "EXPLICIT_CONTROLLED_REFERENCE_TIME", derivation: "GOVERNED_DATE_ARITHMETIC" } : { unresolvedReason: "MISSING_TEMPORAL_ANCHOR" }
    });
  }
  const absoluteDate = /\b(?:on\s+)?((?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2})\b/ig;
  for (let match; (match = absoluteDate.exec(part.text));) add(match, "ABSOLUTE_DATE_EXPRESSION", { candidateTemporalSemantics: { calendarText: match[1], year: null, verifiedDate: false } });
  const absoluteTime = /\b(noon|midnight|\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.|am|pm)?)\b/ig;
  for (let match; (match = absoluteTime.exec(part.text));) add(match, "ABSOLUTE_TIME_EXPRESSION", { candidateTemporalSemantics: { clockText: match[1], verifiedTime: false } });
  const duration = /\b(?:for\s+)?\d+\s+(?:days?|weeks?|months?|years?|hours?|minutes?)\b/ig;
  for (let match; (match = duration.exec(part.text));) add(match, "DURATION_EXPRESSION");
  const ordering = /\b(before|after|during|then)\b/ig;
  for (let match; (match = ordering.exec(part.text));) {
    const term = match[0].toLowerCase();
    const thenAnchor = term === "then" ? options.discourseAnchor || null : null;
    add(match, term === "then" ? "TEMPORAL_CONNECTIVE" : "ORDERING_EXPRESSION", {
      anchorRequirement: term === "then" ? "DISCOURSE_ANCHOR_REQUIRED" : "NONE",
      anchorReference: thenAnchor ? freeze({ value: thenAnchor, provenance: "EXPLICIT_OR_PRIOR_DISCOURSE_ANCHOR" }) : null,
      resolutionState: term === "then" && !thenAnchor ? "UNRESOLVED" : "RECOGNIZED",
      candidateTemporalSemantics: term === "then" && !thenAnchor ? { reason: "MISSING_TEMPORAL_ANCHOR", exactTimestamp: null } : { orderingOnly: term === "then", exactTimestamp: null }
    });
  }
  if (/\bwill\s+\w+/i.test(part.text)) add(Object.assign([part.text.match(/\bwill\s+\w+/i)[0]], { index: part.text.search(/\bwill\s+\w+/i) }), "TENSE_TIME_CANDIDATE", { explicit: false, candidateTemporalSemantics: { orientation: "FUTURE_CANDIDATE", verifiedOccurrence: false } });
  else if (/\b\w+(?:ed)\b/i.test(part.text)) add(Object.assign([part.text.match(/\b\w+(?:ed)\b/i)[0]], { index: part.text.search(/\b\w+(?:ed)\b/i) }), "TENSE_TIME_CANDIDATE", { explicit: false, candidateTemporalSemantics: { orientation: "PAST_CANDIDATE", exactTime: null, verifiedOccurrence: false } });
  return records;
}

function relationRecord({ sourceScope, type, left, right, expression, explicit = true, provenance }) {
  const logical = { sourceScope, type, leftPropositionRef: left.propositionCandidateId, rightPropositionRef: right.propositionCandidateId, temporalExpressionId: expression.temporalExpressionId, anchorReference: expression.anchorReference?.value || null };
  return freeze({
    temporalRelationId: temporalRelationId(logical), ...logical, explicit, relationStatus: "SOURCE_EXPRESSED_TEMPORAL_RELATION_CANDIDATE",
    provenance: freeze({ kind: explicit ? "EXPLICIT_TEMPORAL_RELATION" : "DERIVED_TEMPORAL_RELATION", ...provenance }),
    discourseRelationRef: null, sourceExpressed: true, objectiveChronologyPromoted: false, causalRelationCreated: false, eventMerged: false
  });
}

function derive(source, sourceScope = "local", options = {}) {
  const parts = sourceSpans(source);
  const propositionRecords = parts.map((part, index) => freeze({ ...propositions.derive(part.text, `${sourceScope}-${index}`), sourceSpan: freeze({ start: part.start, end: part.end }) }));
  const temporalExpressions = propositionRecords.flatMap((proposition, index) => detectExpressions(parts[index], proposition, sourceScope, options));
  const temporalRelations = [];
  parts.forEach((part, index) => {
    const marker = /\b(before|after|during)\b/i.exec(part.text);
    if (!marker) return;
    const [leftText, rightText] = part.text.split(new RegExp(`\\b${marker[1]}\\b`, "i"));
    if (!leftText?.trim() || !rightText?.trim()) return;
    const left = propositions.derive(leftText.trim(), `${sourceScope}-${index}-left`);
    const right = propositions.derive(rightText.replace(/[.!?]$/, "").trim(), `${sourceScope}-${index}-right`);
    const expression = temporalExpressions.find((item) => item.propositionRef === propositionRecords[index].propositionCandidateId && normalized(item.surfaceText) === normalized(marker[1]));
    if (!expression) return;
    temporalRelations.push(relationRecord({ sourceScope, type: marker[1].toUpperCase(), left, right, expression, provenance: { sourceSpan: expression.sourceSpan } }));
  });
  const discourseModel = discourse.derive(source, sourceScope);
  return freeze({
    sourceScope,
    sourceTime: options.sourceTime && dateOnly.test(options.sourceTime) ? freeze({ value: options.sourceTime, status: "SOURCE_METADATA_CANDIDATE" }) : null,
    reportTime: null,
    propositions: freeze(propositionRecords),
    discourseRelations: discourseModel.relations,
    textualOrder: discourseModel.textualOrder,
    temporalExpressions: freeze(temporalExpressions),
    temporalRelations: freeze(temporalRelations),
    temporalReferenceState: freeze(temporalExpressions.filter((item) => item.anchorRequirement !== "NONE").map((item) => freeze({ temporalExpressionId: item.temporalExpressionId, status: item.resolutionState, reason: item.candidateTemporalSemantics.reason || null }))),
    authority: freeze({ runtimeOnly: true, truthPromotion: false, eventCreation: false, entityFoundationMutation: false, userBeliefMutation: false, externalProviderCalls: 0, captureTimeUsedAsEventTime: false, analysisTimeUsedAsEventTime: false, sourceTimeUsedAsEventTimeWithoutRule: false })
  });
}

module.exports = { derive, temporalExpressionId, temporalRelationId };
