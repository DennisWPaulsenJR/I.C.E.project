# Canonical Observation, Situational Inference, And Research Gap Architecture

Task ID: ICE-ARCH-0008

Status: Architecture only. No runtime behavior, runtime schema, storage migration, database, graph implementation, Knowledge Object implementation, Research Gap runtime, lens runtime, rendering, map, timeline, parser, popup, Study Panel runtime, QA script, package script, manifest, CSS, semantic data, network permission, source connector, or external model behavior is created by this document.

Project identity: I.C.E. — Integrated Comprehension Engine.

## 1. Canonical Observation Principle

An Observation is the smallest durable, source-traceable unit representing something that I.C.E. has observed, extracted, normalized, calculated, correlated, questioned, or proposed.

An Observation is not automatically a fact.

Every Observation must preserve:

- Provenance.
- Evidence basis.
- Classification.
- Confidence.
- Review state.
- Alternatives.
- Contradictions.
- Version history.

Observations sit between source evidence and higher-level meaning. They provide a stable bridge from current Observation Engine records toward future Knowledge Objects, Evidence Graphs, Research Gap processing, Situational Profiles, lenses, translation comparison, journeys, rendering, and review workflows.

## 2. Observation Classes

Observation Class describes what kind of observation is being recorded. It is distinct from Evidence Basis.

### Explicit Observation

Purpose: preserve what the source directly presents.

Evidence source: source text, source span, image region, map feature, data segment, or other registered source unit.

Allowable use: can support Context Lock, entity mentions, event records, relationships, provenance, and future Knowledge Objects as primary or near-primary evidence.

Limitations: may not include unstated motives, unstated identities, theological conclusions, or later interpretation.

### Normalized Observation

Purpose: preserve a normalized form of explicit content, such as standardized reference, cleaned text, canonical casing, or normalized name spelling.

Evidence source: explicit observation plus deterministic normalization rule.

Allowable use: search, grouping, deduplication, display consistency, and identity-candidate support.

Limitations: normalization may not silently replace original wording.

### Derived Observation

Purpose: record a deterministic derivation from explicit or normalized evidence.

Evidence source: explicit/normalized observations plus declared deterministic method.

Allowable use: calculated ordering, structured relationship candidates, route calculations, language-derived support, or other reproducible derivations.

Limitations: derived does not mean accepted fact. The derivation method must remain visible.

### Candidate Observation

Purpose: record a proposed observation that may be useful but is not accepted as established.

Evidence source: weak signal, partial evidence, unresolved correlation, model suggestion, user proposal, or lens-scoped proposal.

Allowable use: review queues, research prompts, unresolved records, and candidate Knowledge Object enrichment.

Limitations: candidates must not appear as accepted facts.

### Historical Context Observation

Purpose: record historically sourced context relevant to a source, event, person, place, or situation.

Evidence source: historical source, registered corpus, scholarly source, dataset, or reviewed contributed material.

Allowable use: situational enrichment, source context, lens evaluation, confidence review, and research gap reduction.

Limitations: historical context remains attributable and may not rewrite explicit source observations.

### Cultural Context Observation

Purpose: record cultural or social context relevant to interpreting a situation.

Evidence source: cultural source, historical dataset, academic source, tradition source, or reviewed contributed material.

Allowable use: situational profiles, lens evaluation, explanatory context, and research questions.

Limitations: cultural context must remain qualified by source, period, location, and confidence.

### Linguistic Observation

Purpose: record token, grammar, morphology, syntax, lexicon, or language-adapter observations.

Evidence source: source language material, language adapter, lexicon, grammar model, or translation source.

Allowable use: translation comparison, lexical study, grammatical role support, confidence review, and lens evaluation.

Limitations: linguistic analysis may illuminate meaning but may not overwrite source text or Context Lock.

### Translation Observation

Purpose: record translation choices, surface renderings, alignment candidates, or translation differences.

Evidence source: registered translation, source-language alignment, Strong's alignment, lexicon, manuscript evidence, or translation model.

Allowable use: translation comparison, confidence review, language lens output, and research questions.

Limitations: no translation is declared universally superior by this architecture.

### Lens Contribution

Purpose: record an observation contributed by a named lens.

Evidence source: lens-specific source set, method, tradition, expert, or perspective model.

Allowable use: lens comparison, convergence/divergence, attributed interpretation, and user exploration.

Limitations: lens contribution remains scoped to its lens and may not become neutral evidence automatically.

### Interpretive Proposal

Purpose: record a proposed interpretation that is not established by explicit source evidence.

Evidence source: interpretive method, lens, tradition, expert, model candidate, user note, or comparative reasoning.

Allowable use: review, comparison, research questions, and presentation as possible or attributed.

Limitations: interpretive proposals may not overwrite observations or present themselves as source content.

### Situational Reconstruction

Purpose: record a qualified reconstruction of a situation, route, scene, environment, or historical context.

Evidence source: explicit observations, historical context, geography, cultural context, archaeological support, calculations, or contributed material.

Allowable use: maps, timelines, journey views, scene/situation rendering, and situational completeness review.

Limitations: reconstruction must visibly distinguish direct evidence, supported reconstruction, plausible completion, artistic interpretation, and unknown details.

### Question Observation

Purpose: record a durable research question generated by I.C.E., a lens, a user, or unresolved evidence.

Evidence source: missing fields, contradictions, unresolved candidates, user query, or research gap detection.

Allowable use: Research Gap Engine, Study Workspace prompts, review queues, and future Question Objects.

Limitations: questions are not answers and may not become claims by repetition.

### Qualified Absence

Purpose: record that a dimension is absent, not found, not evaluated, contradicted, or unresolved in a qualified way.

Evidence source: scope-limited search, explicit contradiction, review result, missing source field, or declared non-evaluation.

Allowable use: situational completeness, confidence review, research gap detection, and prevention of unsupported completion.

Limitations: absence of evidence is not evidence of absence unless the basis and scope of the absence are explicit.

## 3. Evidence Basis

Evidence Basis answers:

> Why is this observation being shown?

Evidence Basis is independent from Observation Class. Observation Class says what kind of record this is. Evidence Basis says why I.C.E. considers the record relevant, displayable, or reviewable.

Possible evidence bases include:

- Explicit source text.
- Deterministic derivation.
- Linguistic analysis.
- Historical source.
- Cultural source.
- Archaeological source.
- Geographic calculation.
- Translation comparison.
- Manuscript evidence.
- Lens-specific source.
- Interpretive proposal.
- Qualified absence.
- Generated research question.

Examples:

- `observationClass: derived`; `evidenceBasis: geographic calculation`.
- `observationClass: candidate`; `evidenceBasis: historical-context correlation`.
- `observationClass: question`; `evidenceBasis: generated research question`.
- `observationClass: qualified_absence`; `evidenceBasis: not evaluated in current source scope`.

Observation Class must not be overloaded to communicate evidence basis.

## 4. Observation Lifecycle

Conceptual lifecycle:

```text
Detected
-> Extracted
-> Normalized
-> Classified
-> Related
-> Confidence Evaluated
-> Candidate
-> Reviewed
-> Accepted or Disputed
```

This lifecycle is architectural only. It does not create a runtime review UI or acceptance workflow.

Lifecycle notes:

- Detected means a source signal exists.
- Extracted means the signal has been captured into a record.
- Normalized means a stable form has been prepared without replacing the original.
- Classified means observation class and evidence basis have been assigned.
- Related means the observation is linked to other observations, entities, events, places, or questions.
- Confidence Evaluated means multidimensional confidence has been assessed.
- Candidate means the record may support future meaning but is not accepted as settled.
- Reviewed means a future review workflow has evaluated it.
- Accepted or Disputed remains scoped, reversible, and provenance-bearing.

## 5. Source Separation

Architectural separation:

```text
Source Material
-> Source Span
-> Explicit Observation
-> Derived Observation
-> Interpretation
-> Presentation
```

Presentation must never become evidence.

Interpretation must never overwrite explicit observations.

Source Material is the registered source. Source Span is the exact text, range, image region, map feature, or data segment. Explicit Observation captures what is directly presented. Derived Observation adds declared method. Interpretation proposes meaning or relationship beyond direct presentation. Presentation organizes records for the user.

Each step may reference prior steps. No step may rewrite the step it references.

## 6. Research Gap Engine

The Research Gap Engine is a future component that identifies:

- Missing information.
- Unanswered questions.
- Incomplete situations.
- Possible supporting materials.
- Reducible uncertainty.
- Irreducible uncertainty.

It must not invent answers.

Questions generated by the engine are research prompts, not claims. A gap may point toward useful sources, possible lenses, historical datasets, language tools, or user review, but it may not fill the gap by speculation.

Research Gap records should remain connected to:

- Source scope.
- Related observations.
- Related Knowledge Objects.
- Missing dimensions.
- Candidate source collections.
- Confidence status.
- Review state.
- Whether the gap is reducible or irreducible.

## 7. Situational Completeness

A Situational Completeness Profile describes how much of a situation is supported, unresolved, disputed, or not evaluated.

Potential dimensions:

- Participants.
- Location.
- Chronology.
- Companions.
- Purpose.
- Environment.
- Political context.
- Religious context.
- Cultural context.
- Geography.
- Transportation.
- Route.
- Duration.
- Source agreement.
- Contradictions.
- Unresolved questions.

Each dimension may be:

- Explicit.
- Derived.
- Historically supported.
- Lens-supported.
- Disputed.
- Unknown.
- Not evaluated.

Situational completeness is not a quality score. A sparse but honest profile is better than a complete-looking profile filled with unsupported inference.

## 8. Dynamic Enrichment

New observations may enrich future Knowledge Objects without replacing prior evidence.

Conceptual enrichment flow:

```text
New source or source span
-> New observation
-> Candidate relationship or object association
-> Contradiction / duplicate check
-> Candidate enrichment
-> Review boundary
-> Versioned object update
```

Dynamic enrichment must preserve:

- Prior versions.
- Provenance.
- Alternatives.
- Contradictions.
- Review history.
- Confidence changes.
- Reason for enrichment.

Enrichment creates candidate information first. It may not silently alter the original source, erase prior evidence, or make a generated summary authoritative.

## 9. Translation Architecture

Translation comparison should remain conceptually separated:

```text
Source Language
-> Lexical Possibilities
-> Grammar
-> Manuscript Differences
-> Translation Choices
-> English Renderings
-> Interpretive Effects
```

Translation architecture must preserve:

- Source-language evidence where available.
- Lexical range.
- Grammar and morphology.
- Manuscript or textual variants where relevant.
- Translation choice.
- English rendering.
- Potential interpretive effect.
- Translation and adapter provenance.
- Confidence and uncertainty.

No translation is declared universally superior by this architecture. Translation observations may support lens evaluation, language study, confidence review, and research questions, but they may not rewrite source evidence.

## 10. Lens Contributions

Lenses may contribute additional information without altering source observations.

Example lenses:

- Neutral.
- Historical.
- Historical-Critical.
- Latter-day Saint.
- Catholic.
- Orthodox.
- Protestant.

Lens contributions must remain:

- Attributed.
- Isolated.
- Inspectable.
- Reversible.

A lens may organize evidence, add lens-contained propositions, raise lens-specific questions, apply a source-selection rule, or contribute a confidence assessment. A lens may not edit explicit source observations, erase contradictory evidence, promote a lens proposition to neutral evidence, overwrite another lens output, or merge objects solely through doctrinal preference.

## 11. Jerusalem Example

The account of Christ remaining in Jerusalem illustrates separation among explicit observation, context, unknowns, alternatives, lenses, and questions.

Explicit observations may include:

- Christ remained in Jerusalem.
- Mary and Joseph traveled without realizing the absence for a stated period.
- The text mentions the company, relatives, and acquaintances.
- The event is connected to Jerusalem.

Historically supported context may include:

- Group travel practices, if supported by attributed historical sources.
- Travel route or distance candidates, if supported by geography and source data.

Unknown information includes:

- Exact group organization.
- Exact location within the company.
- Exact motive or awareness of each participant unless stated.

Alternative explanations may be represented as candidates, not facts.

Lens contributions may add attributed interpretations or theological framing while remaining lens-scoped.

Research questions may include:

- What social or travel practices are historically supported for the setting?
- Which source collections discuss this event?
- What is explicit, and what remains unstated?

The architecture does not resolve the event beyond available evidence.

## 12. Journey Example

Question:

> What distances did Christ travel with or without His disciples?

Future architecture may distinguish:

- Explicit travel.
- Calculated travel.
- Reconstructed travel.
- Alternate routes.
- Companion certainty.
- Unresolved segments.

The question may connect Character Objects, Event Objects, Place Objects, Journey Objects, companion-presence observations, route candidates, geographic datasets, source parallels, and confidence dimensions.

No actual distances are calculated by this architecture. Future totals must remain separated by evidentiary category, such as explicitly evidenced travel, reconstructed route travel, travel with named disciples, travel with probable companions, travel where companion status is unresolved, and alternate route or location candidates.

## 13. Confidence

Confidence must be multidimensional.

Possible dimensions include:

- Source confidence.
- Extraction confidence.
- Identity confidence.
- Chronology confidence.
- Geographic confidence.
- Linguistic confidence.
- Historical confidence.
- Lens agreement.
- Contradiction severity.

Do not define one overall percentage.

Confidence should explain what kind of support exists and what kind is missing. A record may have high extraction confidence and low identity confidence, or strong geographic calculation support and weak route certainty.

## 14. Constitutional Principles

This architecture follows these principles:

- Source evidence remains primary.
- Observations remain separate from interpretation.
- Questions are not conclusions.
- Historical context remains attributable.
- Lens contributions remain scoped.
- Unknown information remains unknown.
- Absence of evidence is not evidence of absence.
- Visual precision must not exceed evidentiary precision.
- Every observation remains traceable to its source.
- Presentation never becomes evidence.
- Interpretation never overwrites explicit observations.
- Candidate observations do not appear as accepted facts.
- Qualified absence must declare scope and basis.
- Confidence remains multidimensional and inspectable.

## 15. Relationship To Current Runtime

Current implemented runtime:

- Observation Engine Phase 1 creates `ICE_OBSERVATION_RECORDS`.
- Current observation records are created from event candidates and ordered events.
- Current records preserve fields such as observation id, observation type, source scope, source reference, source text, matched text, observed subject/action/object/location, participants, event id, extraction/context rule, evidence, evidence distance, inference level, confidence, provenance, and boundary text.
- Current records are generation-stamped into local extension storage.
- Current Study Panel renders an Observation Engine section.
- Current Linear Scope Snapshot projects Observation records as presentation nodes.
- Current graph/architecture pipeline recognizes Observation Records as a source-adjacent layer.
- Current QA validates Observation Engine Phase 1 through `qa/observation-engine-qa.js`.

Future runtime:

- Canonical Observation normalizer.
- Versioned canonical observation schema.
- Evidence Basis field.
- Observation Class field.
- Review state field.
- Alternatives and contradictions.
- Lineage and version history.
- Research Gap Engine.
- Situational Completeness Profiles.
- Persistent Knowledge Object integration.

Architecture only:

- This document does not change `ICE_OBSERVATION_RECORDS`.
- This document does not implement canonical observation storage.
- This document does not implement Research Gap runtime.
- This document does not implement Evidence Review UI.
- This document does not implement Knowledge Object persistence.
- This document does not implement maps, rendering, timelines, lens runtime, or source connectors.

## 16. Open Questions

Unresolved questions:

- Canonical runtime schema.
- Evidence Graph implementation.
- Review workflow.
- Persistent Knowledge Objects.
- Observation lineage.
- Confidence calculations.
- Graph storage.
- Source authority registry.
- Rendering dependencies.
- Synchronization.
- Future migration strategy.
- Exact relationship between Observation and Claim.
- Qualified absence vocabulary.
- Source-span representation across text, images, maps, and datasets.
- How lens-contained observations interact with neutral presentations.
- How user-authored notes become candidates without becoming evidence.
- How old `ICE_*` records should be normalized without destructive migration.

These questions must not be resolved through unsupported assumptions. They require separate review or implementation tasks.
