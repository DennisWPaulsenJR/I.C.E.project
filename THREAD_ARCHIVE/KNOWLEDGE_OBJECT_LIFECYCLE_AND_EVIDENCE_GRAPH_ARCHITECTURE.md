# Knowledge Object Lifecycle And Evidence Graph Architecture

Task ID: ICE-ARCH-0009

Status: Architecture only. No runtime behavior, storage schema, migration, graph database, Study Panel behavior, rendering engine, Knowledge Object runtime, Observation Engine change, source connector, crawling, queue behavior, QA script, package update, or automatic evaluation is created by this document.

Project identity: I.C.E. - Integrated Comprehension Engine.

Prerequisite reviewed: `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`.

## 1. Purpose

Knowledge Objects are persistent research entities, not temporary runtime objects.

They organize durable evidence across time while preserving every source, observation, contradiction, review state, lens contribution, and unresolved question that shaped the object.

Potential Knowledge Object categories include:

- Character.
- Place.
- Event.
- Journey.
- Group.
- Organization.
- Artifact.
- Time Period.
- Theme.
- Question.
- Source Collection.
- Document.
- Concept.
- Relationship.
- Situation.

A Knowledge Object is not a generated summary, display label, single source mention, inferred identity, or presentation card. It is a versioned evidence structure whose current view may change as evidence changes.

## 2. Evidence Graph

The Evidence Graph is the durable core of I.C.E. It describes how registered sources, source spans, canonical observations, relationships, questions, Knowledge Objects, lenses, and presentations connect without collapsing into one undifferentiated record.

Conceptual flow:

```text
Source Collections
-> Source Records
-> Source Spans
-> Canonical Observations
-> Relationships and Claims
-> Knowledge Objects
-> Events, Places, Characters, Journeys, Situations
-> Research Questions and Gap Records
-> Lens Evaluations
-> Workspace Presentations and Renderings
```

The Evidence Graph contains:

- Nodes: source collections, source records, source spans, observations, relationships, claims or propositions, Knowledge Objects, Question Objects, Lens Evaluations, Presentation Objects, and Rendering Objects.
- Edges: evidence support, derivation, normalization, identity candidacy, relationship, contradiction, dependency, presentation, rendering, lens contribution, review, supersession, merge, split, and archival relationships.
- Evidence Sources: registered source collections and source records from which source spans and observations are derived.
- Observations: durable, source-traceable records aligned with `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`.
- Questions: persistent research objects that identify unresolved evidence, missing dimensions, contradictions, or reducible/irreducible uncertainty.
- Situations: contextual groupings of people, places, events, time, environment, questions, evidence, and uncertainty.
- Journeys: route, segment, participant, event, place, question, confidence, and provenance structures derived from existing observations and object links.
- Relationships: explicit, derived, candidate, disputed, lens-contained, and rejected links among graph nodes.

Observations never disappear. They may be superseded, rejected, disputed, archived, or replaced by later versions, but their lineage remains inspectable.

Knowledge Objects evolve. They may gain evidence, lose active claims, split, merge, or be superseded, but the evidence that shaped each state remains auditable.

Study Panel views, workspace views, maps, timelines, summaries, graph layouts, and renderings are views over the Evidence Graph. They are not evidence by themselves.

## 3. Core Graph Node Categories

### Source Collection

A bounded source collection, such as Scripture, a conference corpus, historical archive, academic corpus, or user-approved source set.

### Source Record

A registered item within a source collection, such as a chapter, article, talk, manuscript, map, image, journal entry, dataset row, or document.

### Source Span

An exact source segment: text range, verse range, image region, map feature, document page, timestamp, coordinate, or dataset segment.

### Observation

A durable record of something directly observed, normalized, derived, calculated, correlated, questioned, or proposed. Observation Class and Evidence Basis remain distinct.

### Claim Or Proposition

A future record type, or possibly a carefully governed subtype, for statements that assert a relationship or meaning beyond raw observation. A Claim is not the same as an Observation unless the claim itself is explicitly present in a source span.

This architecture does not settle whether Claim should be a separate persisted type or a subtype. Until resolved, implementations must not equate Observation with settled claim.

### Relationship

A typed edge or record connecting graph nodes. Relationships may be explicit, derived, candidate, disputed, lens-contained, or rejected. Relationship authority depends on evidence, provenance, review state, and evidence distance.

### Knowledge Object

A persistent object that organizes evidence about an identifiable person, place, event, concept, journey, question, document, group, time period, theme, or other approved category.

### Question Object

A persistent research question with known evidence, missing dimensions, candidate answers, opposing evidence, lens participation, search/review status, and history.

### Lens Evaluation

An attributed lens-scoped evaluation. It may organize or interpret evidence for a perspective, but it may not overwrite neutral observations, Knowledge Objects, or another lens output.

### Presentation Object

A generated or user-configured view over graph records, such as a workspace summary, study card, comparison view, selected focus panel, or exported outline.

### Rendering Object

A visual or spatial representation, such as a map, timeline, relationship graph, scene rendering, route visualization, or confidence overlay. Rendering Objects must declare the evidence and assumptions behind each displayed element.

## 4. Evidence Basis

Every Observation and every meaningful graph contribution must declare `evidenceBasis`.

Evidence Basis answers why I.C.E. considers a record relevant, displayable, reviewable, or graph-connected. It must not be replaced by Observation Class alone.

Allowed architecture values align with the canonical observation architecture:

- Explicit source text.
- Normalized source content.
- Deterministic derivation.
- Geographic calculation.
- Linguistic analysis.
- Historical context.
- Cultural context.
- Archaeological context.
- Correlated evidence.
- Lens-specific source.
- Interpretive proposal.
- Situational reconstruction.
- Qualified absence.
- Generated research question.
- User-authored note.
- Presentation summary.
- Artistic rendering.

Examples:

- A derived route segment may use `observationClass: Derived Observation` and `evidenceBasis: Geographic calculation`.
- A possible identity link may use `observationClass: Candidate Observation` and `evidenceBasis: Historical-context correlation`.
- A map scene may use `observationClass: Situational Reconstruction` and `evidenceBasis: Geographic calculation` plus `Historical context`.
- A question about a missing companion may use `observationClass: Question Observation` and `evidenceBasis: Generated research question`.

Evidence Basis does not establish truth. It declares the support category and required provenance burden.

## 5. Observation Identity And Lineage

Observation identity must distinguish an immutable version from the continuing conceptual line.

Potential fields:

- `observationId`: immutable ID for one specific observation version.
- `observationLineageId`: stable ID for the continuing conceptual observation across revisions.
- `recordVersion`: version number or version label.
- `priorVersionId`: prior observation version.
- `supersedesObservationId`: observation version this one supersedes.
- `revisionReason`: why a new version exists.
- `revisedBy`: user, process, adapter, reviewer, or migration that produced the version.
- `revisedAt`: timestamp.
- `activeVersion`: whether this is the current active version in its lineage.
- `restorationStatus`: whether an older version can be restored or viewed.
- `sourceAttribution`: source collection, source record, and source span.
- `reviewHistory`: review states, reviewers, confidence changes, and decisions.

Changes that should create a new observation version include:

- Meaning changed.
- Source reference changed.
- Observation Class changed.
- Evidence Basis changed.
- Confidence changed materially.
- Review state changed materially.
- Supporting source span changed.
- Contradiction status changed.
- A replacement relationship was added.

Superseded observations remain inspectable. Replacement does not erase history.

## 6. Knowledge Object Identity

Knowledge Object identity is stable and distinct from:

- Display name.
- Source name.
- Mention.
- Single Observation.
- Inferred identity.
- Generated summary.
- Current preferred label.

Potential fields:

- `objectId`: immutable ID for one object version.
- `objectType`: Person, Place, Event, Journey, Group, Organization, Artifact, Time Period, Theme, Question, or approved type.
- `objectLineageId`: continuing conceptual object across versions.
- `canonicalLabel`: current display label.
- `alternateLabels`: other source names, normalized names, titles, or language forms.
- `identityCandidates`: possible identity links with evidence and confidence.
- `supportingObservationIds`: observations supporting current identity or object facts.
- `opposingObservationIds`: observations that challenge or complicate current identity.
- `relatedObjectIds`: connected objects.
- `questionIds`: unresolved questions attached to the object.
- `confidenceProfile`: multidimensional confidence record.
- `reviewState`: detected, candidate, provisional, reviewed, accepted, disputed, superseded, archived, or other approved state.
- `objectVersion`: current version label.
- `priorVersionId`: prior object version.
- `createdAt`: creation timestamp.
- `updatedAt`: update timestamp.

Knowledge Object identity must survive label changes and must not be reduced to a current display string.

## 7. Knowledge Object Lifecycle

Conceptual lifecycle:

```text
Detected Mention
-> Object Candidate
-> Correlated Candidate
-> Provisional Object
-> Reviewed Object
-> Accepted Object
-> Dynamically Enriched Object
-> Disputed / Split / Merged / Superseded Object
```

State meanings:

- Detected: a mention or signal exists.
- Candidate: possible object identity or object record.
- Correlated: multiple observations or source signals may refer to the same object.
- Provisional: enough support exists to present as a structured candidate, but review is incomplete.
- Reviewed: a human, approved rule, or governed process has evaluated the object.
- Accepted: accepted for the defined authority scope, not infallible or closed.
- Disputed: material evidence or lens outputs conflict.
- Superseded: a later object version replaces the current version.
- Archived: retained for history but not active.
- Deleted: allowed only if future governance defines deletion; archival is preferred.

Audit requirements:

- Preserve prior version.
- Preserve supporting and opposing evidence.
- Preserve review decisions and reviewers.
- Preserve confidence changes.
- Preserve merge/split/supersession reasons.
- Preserve dependent presentations and recalculation requirements.

Accepted does not mean permanently settled. New evidence may enrich, challenge, split, merge, or supersede an accepted object.

## 8. Dynamic Enrichment

New observations expand objects without overwriting earlier evidence.

Conceptual flow:

```text
New Source Registered
-> New Observations Created
-> Existing Object Candidates Retrieved
-> Identity and Relationship Evaluation
-> Possible Enrichment Proposed
-> Contradiction and Duplication Check
-> Candidate Object Version Created
-> Automatic or Human Review Boundary
-> Active Object View Updated
```

Enrichment may add:

- Appearance.
- Alternate name.
- Title.
- Role.
- Relationship.
- Quotation.
- Action.
- Location.
- Event participation.
- Journey segment.
- Chronology candidate.
- Language form.
- Historical context.
- Cultural context.
- Lens contribution.
- Contradiction.
- Unresolved question.
- Confidence change.
- Qualified absence.

Enrichment categories must remain distinct:

- Accepted.
- Candidate.
- Conflicting.
- Historical.
- Lens.
- Question.
- Qualified absence.

A new source may propose a candidate update; it may not silently rewrite earlier observations or active object identity.

## 9. Merge Architecture

Merging is appropriate only when evidence indicates two Knowledge Objects likely represent the same underlying object within a defined authority scope.

Merge records should preserve:

- Original object IDs.
- Original object lineage IDs.
- Supporting observations.
- Opposing observations.
- Merge reason.
- Merge confidence.
- Reviewer or approved rule.
- Conflicts and unresolved evidence.
- Affected relationships.
- Affected questions.
- Affected presentations.
- Reversible history.
- New merged candidate object or active merged object version.

Relationship migration must not erase the original path. A migrated relationship should retain the prior source object and the merge record that explains why it now appears under the merged object.

Merges may be neutral, lens-scoped, provisional, reviewed, accepted, disputed, or reversed.

## 10. Split Architecture

Splitting is appropriate when one Knowledge Object is found to combine evidence from two or more distinct objects.

Split records should preserve:

- Original object ID.
- Original object lineage ID.
- New object IDs and lineage IDs.
- Observations reassigned to each object.
- Observations that remain unresolved.
- Split reason.
- Reviewer or approved rule.
- Confidence and ambiguity.
- Affected relationships.
- Affected presentations.
- Recalculation needs.
- Reversible history.

Examples:

- A place name refers to two locations in different source contexts.
- A title was incorrectly treated as a person.
- Two historical figures share a name.
- A symbolic figure was collapsed with a literal actor.
- A lens-contained identity proposal was accidentally presented as neutral identity.

Split architecture must keep unresolved evidence visible instead of forcing every observation into a new object.

## 11. Supersession And Correction

Supersession and correction are not deletion.

Distinctions:

- Correction: a mistake in extraction, normalization, classification, or presentation is fixed.
- Enrichment: new evidence adds support without replacing prior evidence.
- Reinterpretation: a review or lens changes how evidence is understood while preserving original evidence.
- Contradiction: new evidence conflicts with prior support.
- Supersession: a newer object or observation version becomes active while prior versions remain inspectable.
- Deletion: future-governed removal from active data; not authorized by this architecture.
- Archival: record retained but no longer active.

All correction and supersession events require reason, provenance, and affected-dependency tracking.

## 12. Review And Authority Boundaries

Review state and authority scope must remain explicit.

Supported states include:

- Detected.
- Extracted.
- Normalized.
- Candidate.
- Provisional.
- Reviewed.
- Accepted.
- Rejected.
- Disputed.
- Superseded.
- Archived.
- Lens-contained.
- Reconstruction-only.
- User-authored.

Authority is scoped. A record accepted within a lens, corpus, expert model, tradition, or user workspace is not automatically accepted as neutral evidence.

Primary evidence remains authoritative. Derived records may organize, explain, or challenge understanding, but they may not rewrite source evidence.

## 13. Situational Relationships

Situational relationships connect:

- Characters.
- Places.
- Events.
- Journeys.
- Time.
- Questions.
- Evidence.
- Source spans.
- Relationships.
- Lenses.
- Renderings.

These relationships may express presence, participation, movement, sequence, location, dependency, uncertainty, contradiction, question, review, and presentation.

Situational relationships must declare:

- Evidence basis.
- Observation support.
- Confidence.
- Review state.
- Evidence distance.
- Whether the relation is explicit, derived, candidate, lens-contained, reconstruction-only, or unresolved.

## 14. Before / During / After Context Windows

Each Event Object should support temporal context windows:

- Before.
- During.
- After.

Each window may contain:

- Explicit observations.
- Historical context.
- Cultural context.
- Linguistic context.
- Geographic context.
- Evidence-supported possibilities.
- Questions.
- Consequences.
- Related events.
- Unknowns.
- Contradictions.
- Lens contributions.
- Presentation notes.

Context windows do not infer chronology by themselves. They organize already-supported records around an event so users can inspect what is known, possible, unknown, or disputed.

No event window may turn a possible cause, unstated motive, or artistic reconstruction into explicit source evidence.

## 15. Evidence Convergence

Future convergence analysis compares evidence without calculating authority in this architecture.

Differentiate:

- Independent evidence: materially separate source origin or method.
- Dependent evidence: copied, summarized, inherited, or methodologically dependent source.
- Complementary evidence: different records support compatible dimensions.
- Conflicting evidence: records materially disagree.
- Later recollections: sources produced after the event or after earlier source circulation.
- Derivative summaries: summaries based on prior records.
- Silence: a source lacks an expected detail within a declared scope.

Convergence never overrides evidence. Agreement may be interesting, but it is not truth by vote.

## 16. Dependency Relationships

Dependency records should distinguish:

- Derived from.
- Copied from.
- Summarized from.
- Independent witness.
- Secondary source.
- Unknown dependency.

Dependency is separate from confidence. A copied source may be accurate but dependent. An independent source may be weak. Both dimensions should remain visible.

Dependency relationships help prevent false convergence, circular support, and accidental elevation of repeated derivative summaries.

## 17. Journey Objects

Journey Objects connect:

- Route.
- Segments.
- Locations.
- Participants.
- Companion status.
- Events.
- Time windows.
- Evidence.
- Confidence.
- Questions.
- Alternate routes.
- Lens contributions.
- Rendering hooks.

Journey Objects must separate:

- Explicit travel.
- Calculated travel.
- Reconstructed travel.
- Alternate routes.
- Travel with named participants.
- Travel with probable companions.
- Travel with unresolved companion status.
- Unsupported or not evaluated segments.

## 18. Research Question Lifecycle

Questions become persistent objects.

Conceptual lifecycle:

```text
Question Identified
-> Evidence Sources Assigned
-> Evaluation Active
-> Candidate Answers Proposed
-> Partially Answered
-> Disputed or Resolved
-> Reopened by New Evidence
```

Additional states:

- Created.
- Answered.
- Partially answered.
- Reopened.
- Superseded.
- Retired.

Potential fields:

- Question text.
- Origin.
- Related objects.
- Known observations.
- Missing dimensions.
- Candidate answers.
- Supporting evidence.
- Opposing evidence.
- Lenses involved.
- Sources searched.
- Status.
- Confidence.
- History.

Questions are not claims and may not become answers by repetition.

## 19. Lens Interaction

Lenses may create:

- Lens Evaluations.
- Lens-contained propositions.
- Source-selection rules.
- Lens-specific questions.
- Confidence assessments.
- Explanatory summaries.
- Comparison records.

Lenses may not:

- Edit explicit Observations.
- Erase contradictions.
- Merge objects by doctrinal preference.
- Promote a lens proposition to neutral evidence.
- Overwrite another lens output.
- Hide unresolved evidence.

Continuing-revelation or tradition-specific materials may connect to the same Knowledge Objects while preserving source collection, authority scope, lens ID, evidence basis, confidence, and review status.

## 20. User Contributions

User contributions may include:

- Private note.
- Public contribution.
- Source correction.
- Proposed Observation.
- Proposed relationship.
- Uploaded document.
- Personal interpretation.
- Journey hypothesis.
- Rendering suggestion.

User contributions are distinct from:

- Registered source evidence.
- System-extracted observations.
- Accepted canonical records.
- Lens-authoritative sources.

Contribution metadata should preserve contributor, contribution type, visibility, privacy, source rights, review state, related objects, related observations, version, and deletion policy.

## 21. Presentation And Summary Generation

Summaries are derived views.

A summary should record:

- Included objects.
- Included observations.
- Included lenses.
- Included filters.
- Confidence boundaries.
- Generation time.
- Summary version.
- Unresolved contradictions displayed or omitted.
- Evidence drilldown path.
- User edits or curation.

Summaries must be regenerable from the graph. A generated summary is not the sole source for later Knowledge Objects.

## 22. Rendering Boundary

Maps, timelines, scenes, relationship graphs, and visual reconstructions attach to the Evidence Graph.

Every rendering element should connect to:

- Observation IDs.
- Object IDs.
- Evidence Basis.
- Reconstruction classification.
- Confidence.
- Assumptions.
- Alternatives.
- Rendering version.
- Source data.

Renderings are presentation, never evidence. A rendering may not be re-ingested as historical evidence without independent source registration and review.

Visual precision must not exceed evidentiary precision. A route may be approximate, a position may be candidate, and a scene may be artistic; the rendering must say so.

## 23. Recalculation And Dependency Propagation

Future dependency propagation should identify stale derived records without mutating them silently.

Examples:

- Splitting a character alters journey totals.
- Changing a place identity alters distance calculations.
- Rejecting event correlation alters chronology candidates.
- New source evidence changes confidence.
- Lens changes must not alter neutral records.
- Superseding an observation requires presentation refresh.

Dependency categories:

- Direct dependency.
- Derived dependency.
- Presentation dependency.
- Lens dependency.
- Rendering dependency.
- Stale calculation.
- Recalculation required.

This document does not implement a scheduler, invalidation engine, dependency graph runtime, or automatic recalculation.

## 24. Auditability And Reversibility

Every significant Evidence Graph change should answer:

- What changed?
- Which record was affected?
- What prior version existed?
- What new version exists?
- Why did the change occur?
- What evidence supports the change?
- Who or what process performed it?
- When did it occur?
- What review state applies?
- Which dependent records or presentations are affected?
- Can the prior state be restored?

Audit records should preserve action, record affected, prior version, new version, reason, method, actor or process, timestamp, review state, dependent records, and rollback availability.

## 25. Confidence Evolution

Confidence may require reassessment when:

- New support appears.
- Contradiction appears.
- Duplicate support is found to share a source.
- Source is removed or reclassified.
- Objects merge.
- Objects split.
- Route assumptions change.
- Lens source boundaries change.
- Candidate review state changes.
- Evaluation method changes.
- Dependencies are found.

Confidence remains multidimensional. No single unexplained score may replace source confidence, extraction confidence, identity confidence, chronology confidence, geographic confidence, linguistic confidence, historical confidence, lens agreement, contradiction severity, and coverage.

## 26. Runtime Transition Strategy

Future transition path:

```text
Existing ICE_* records
-> Canonical Observation Adapter
-> Versioned Observation Collection
-> Candidate Evidence Graph
-> Minimal Character / Place / Event Objects
-> Review and Enrichment
```

Reuse:

- Current `ICE_OBSERVATION_RECORDS` as source-adjacent runtime material.
- Existing source references, scope metadata, provenance, confidence, generation stamps, and graph object provenance.
- Existing Study Panel and graph presentation as views.

Normalize:

- Observation Class.
- Evidence Basis.
- Lineage IDs.
- Review state.
- Version state.
- Dependency links.
- Candidate object links.

Legacy-only until migrated:

- Old semantic arrays that lack canonical observation identity.
- Presentation-only graph nodes.
- Generated summaries with no durable dependency record.

This document does not implement migration, destructive rewriting, schema changes, storage authority, runtime normalization, or review UI.

## 27. Initial Runtime Sequence After This Task

Recommended future implementation order:

1. Canonical Observation Runtime Foundation (`ICE-OBS-0002`).
2. Evidence Review and Acceptance states.
3. Minimal persistent Character, Place, and Event Objects.
4. Dynamic enrichment proposals.
5. Research Gap Engine.
6. Situational Completeness Profiles.
7. Translation comparison.
8. Lens runtime.
9. Journey Objects.
10. Timeline and map rendering hooks.
11. Expanded Study Workspace.
12. Contributed-source workflows.
13. Advanced rendering.

The next runtime milestone remains `ICE-OBS-0002`. This architecture does not authorize a different implementation order by itself.

## 28. Constitutional Principles

- Evidence is immutable.
- Presentation is disposable.
- Interpretation is attributable.
- Objects evolve.
- Provenance is permanent.
- Convergence never overrides evidence.
- Visualization is never evidence.
- Knowledge Objects organize evidence; they do not replace evidence.
- Accepted does not mean infallible or closed.
- Identity is not display name only.
- Enrichment is versioned.
- Prior states remain preserved.
- Merges and splits remain reversible.
- Contradiction remains visible.
- Lenses remain scoped.
- User contributions do not become evidence automatically.
- Summaries and renderings are not self-authorizing.
- Confidence remains inspectable.
- Unresolved information survives.
- Recalculation does not erase history.
- Visual precision may not exceed evidence.

## 29. Open Questions

- Should Claim be a separate record type, relationship subtype, or observation subtype?
- What is the first governed relationship vocabulary for the Evidence Graph?
- What graph storage model should eventually be used?
- What identity threshold promotes a candidate object to provisional object?
- What evidence threshold permits object merge?
- What ambiguity threshold triggers object split?
- Which object changes require semantic version changes rather than metadata revisions?
- Should the audit log be an immutable event stream?
- How deep should rollback support be?
- How should collaborative editing and private notes interact?
- How should source removal propagate through Knowledge Objects?
- How should derived records be invalidated without automatic mutation?
- How should confidence be recalculated after merge, split, or supersession?
- How should stale presentations be detected?
- How should offline and synchronized Evidence Graph authority be coordinated?
- How should private and public objects remain separated?
- How should lens overlays be exported?
- What governance applies to user corrections?
- How should large graph performance be handled?
- What export format preserves graph lineage?
- How should rendering dependency invalidation work?

These questions require separate review or implementation tasks. They must not be resolved by unsupported assumptions.
