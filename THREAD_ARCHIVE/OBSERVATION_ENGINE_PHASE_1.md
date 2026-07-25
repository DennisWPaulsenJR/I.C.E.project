# Observation Engine Phase 1

Status: implemented foundation.

Purpose: define the first deterministic Observation Layer between source extraction/context resolution and higher semantic interpretation.

## Position In The Pipeline

The Observation Engine records what the source text explicitly presents before I.C.E. classifies higher-level meaning.

Flow:

```text
Source Text
-> Capture
-> Candidate Extraction
-> Context Resolution
-> Observation
-> Graph Projection
-> Higher-Level Semantic Layers
```

Observation records are nearer-evidence support records. They may inform graph projection and later semantic layers, but they do not rewrite source text, Context Lock, entity classification, themes, doctrine, or application.

## Phase 1 Observation Types

Phase 1 supports conservative source-presented occurrences such as:

- `person_speaking`
- `person_moving`
- `object_mentioned`
- `place_named`
- `event_occurring`
- `command_spoken`
- `promise_spoken`
- `question_asked`
- `relationship_expressed`
- `temporal_transition_stated`

These labels describe observable textual presentation only. They are not doctrine, theme, motive, symbolism, fulfillment, or application.

## Observation Record Shape

Observation records use:

- `observationId`
- `schemaVersion`
- `observationType`
- `sourceScope`
- `sourceReference`
- `scopePath`
- `sourceCaptureId`
- `sourceTitle`
- `sourceUrl`
- `sourceContext`
- `sourceText`
- `matchedText`
- `textSpan`
- `tokenRange`
- `observedSubject`
- `observedAction`
- `observedObject`
- `observedLocation`
- `participants`
- `eventId`
- `sequenceIndex`
- `sequenceOrder`
- `candidateSource`
- `extractionRule`
- `contextRule`
- `creationReason`
- `evidence`
- `evidenceDistance`
- `inferenceLevel`
- `confidence`
- `verificationStatus`
- `status`
- `provenance`
- `boundary`

## Creation Rules

- Create observations only from current generated event candidates and explicit semantic sub-events.
- Skip source summaries and heading-style summary records.
- Preserve source reference, source scope, source context, source text, and provenance.
- Deduplicate identical observation emissions by type, reference, matched text, event id, subject, action, and object.
- Treat explicit sub-events as direct observations only when their confidence is explicitly marked.

## Prohibited Behavior

Observation records may not:

- infer doctrine
- infer theme
- infer motive
- infer symbolism
- infer application
- infer fulfillment
- create semantic authority
- rewrite Context Lock
- widen scope
- crawl
- process queues
- change Study View meaning

## Presentation

The Study Panel exposes an Observation Engine section and diagnostics counts. The Linear Scope Snapshot may project scoped observations as display nodes, but graph projection remains presentation-only.

## Trust Rule

Observation is a bridge, not an interpretation layer. It preserves directly supportable source presentation so later semantic layers can explain what they depend on.
