# Runtime Layer And Processing Pipeline Architecture

Task ID: ICE-ARCH-0012

Status: Architecture only. No runtime behavior, storage schema, migration, service implementation, API interface, queue behavior, background process, Study Panel behavior, parser behavior, renderer behavior, export behavior, AI workflow, QA script, package update, build configuration, source connector, crawling, or automatic processing is created by this document.

Project identity: I.C.E. - Integrated Comprehension Engine.

Prerequisites reviewed:

- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`.

## 1. Purpose

This document defines the permanent runtime processing pipeline that connects approved I.C.E. architecture documents into coherent service boundaries.

It describes how evidence moves through the system while preserving provenance, evidence basis, confidence, review state, authority scope, and evidence distance.

Every runtime layer has one clearly defined responsibility. A layer may consume upstream records and produce downstream records, but it may not silently perform another layer's work or increase its own authority.

Presentation is always downstream of evidence.

## 2. Runtime Layer Model

Conceptual runtime layers include:

- Source Acquisition.
- Document Parsing.
- Normalization.
- Observation Extraction.
- Observation Validation.
- Knowledge Object Resolution.
- Relationship Resolution.
- Evidence Graph.
- Convergence Analysis.
- Temporal Reasoning.
- Research Gap Generation.
- Calculation Services.
- Literary Analysis.
- Journey Analysis.
- Workspace Services.
- Presentation Services.
- Export Services.
- AI Assistance.
- Rendering Services.
- Persistence.
- Configuration.
- Logging.
- Diagnostics.

These are conceptual layers, not a mandate to create separate processes, files, classes, services, APIs, databases, or packages.

## 3. Processing Order

Recommended conceptual order:

```text
Source
-> Parser
-> Normalizer
-> Observation Engine
-> Validation
-> Knowledge Objects
-> Evidence Graph
-> Convergence
-> Timeline
-> Research Gap
-> Workspace
-> Presentation
-> Export
```

The order may be iterative after initial processing. For example, a Research Gap may send a user back to approved source acquisition, or a reviewed Knowledge Object split may require downstream convergence and presentation refresh.

Even in iterative workflows, downstream layers may not overwrite upstream evidence. They may create new attributed records, mark records stale, or request review.

## 4. Service Responsibilities

### Source Acquisition

Responsible for registering approved source material, source collection boundaries, source metadata, and provenance.

Not responsible for interpretation, observation meaning, Knowledge Object identity, convergence, workspace organization, or presentation conclusions.

### Document Parsing

Responsible for extracting source structure such as text, spans, headings, references, pages, images, tables, or metadata from registered sources.

Not responsible for deciding meaning, resolving identity, calculating convergence, or presenting conclusions.

### Normalization

Responsible for deterministic cleanup and alignment: references, casing where appropriate, source span identifiers, language forms, and canonical structural keys.

Not responsible for replacing original wording, erasing variants, or declaring identity.

### Observation Extraction

Responsible for creating source-traceable observations from explicit or governed source signals.

Not responsible for doctrine, theme, motive, application, fulfillment, Knowledge Object acceptance, or final interpretation.

### Observation Validation

Responsible for verifying observation shape, source reference, evidence basis, scope, provenance, confidence fields, and prohibited inference boundaries.

Not responsible for rewriting observations silently or converting candidates into facts.

### Knowledge Object Resolution

Responsible for proposing and maintaining object identity candidates, object versions, merge/split/supersession states, and supporting/opposing observations.

Not responsible for changing source records or hiding conflicting observations.

### Relationship Resolution

Responsible for resolving explicit, derived, candidate, disputed, lens-contained, rejected, and unresolved relationships among records and objects.

Not responsible for creating actors, locations, source facts, or motive without evidence.

### Evidence Graph

Responsible for connecting source records, source spans, observations, relationships, Knowledge Objects, questions, lenses, presentations, and renderings while preserving lineage and dependency.

Not responsible for visual layout, user notes, exports, or conclusions.

### Convergence Analysis

Responsible for comparing observations and sources across agreement, divergence, contradiction, silence, source dependency, and confidence dimensions.

Not responsible for vote-count truth, source rewriting, or erasing disagreement.

### Temporal Reasoning

Responsible for explicit chronology, normalized chronology, derived chronology, estimated chronology, alternate sequences, duration candidates, and disputed chronology.

Not responsible for making a visually convenient sequence canonical.

### Research Gap Generation

Responsible for producing Research Question Objects from missing evidence, unresolved conflicts, incomplete metadata, unknown chronology, source dependency uncertainty, and calculation/reconstruction limits.

Not responsible for inventing answers.

### Calculation Services

Responsible for calculations such as travel, chronology, statistics, distance, rates, text metrics, and literary metrics with visible inputs and assumptions.

Not responsible for creating evidence or hiding sensitivity to assumptions.

### Literary Analysis

Responsible for presenting observable repetition, candidate structures, attributed scholarly proposals, lens-specific structures, disputed structures, and user proposals.

Not responsible for proving authorship, antiquity, inspiration, fabrication, or intentional design by pattern detection alone.

### Journey Analysis

Responsible for journey segments, route candidates, participant status, companion status, geography, timing, and unresolved route questions.

Not responsible for forcing a single route or filling missing travel details.

### Workspace Services

Responsible for organizing research into workspaces, sessions, collections, boards, trails, notebooks, saved searches, calculations, presentations, and exports.

Not responsible for storing evidence as authority or modifying canonical graph records.

### Presentation Services

Responsible for user-facing organization, summaries, cards, tables, graphs, inspectors, labels, filters, and progressive disclosure.

Not responsible for creating evidence, mutating source records, or hiding uncertainty.

### Export Services

Responsible for packaging presentations, reports, evidence packets, citations, graph snapshots, maps, timelines, or notebooks while preserving provenance and confidence.

Not responsible for changing evidence or creating authority.

### AI Assistance

Responsible for candidate extraction, summarization, question generation, explanation, comparison drafts, and visualization instructions when approved.

Not responsible for fabricating evidence, replacing provenance, overriding reviewer decisions, or treating generated output as source.

### Rendering Services

Responsible for generating visual representations from approved visualization models and evidence-linked rendering elements.

Not responsible for making visualized elements evidence.

### Persistence

Responsible for storing approved source records, observations, object versions, graph records, workspace artifacts, settings, logs, and derived records according to authority boundaries.

Not responsible for promoting records merely because they are persisted.

### Configuration

Responsible for feature flags, adapter settings, source permissions, lens availability, workspace preferences, and processing policy.

Not responsible for bypassing constitutional rules.

### Logging

Responsible for recording operational actions, errors, audit events, processing stages, user actions where appropriate, and system decisions.

Not responsible for creating semantic authority.

### Diagnostics

Responsible for health checks, validation reports, missing provenance, stale dependencies, performance metrics, and constitutional warnings.

Not responsible for automatic correction unless a future approved workflow authorizes it.

## 5. Runtime Contracts

Contracts between services are conceptual and should preserve:

- Input record type.
- Output record type.
- Source scope.
- Evidence basis.
- Provenance.
- Confidence.
- Review state.
- Authority scope.
- Evidence distance.
- Dependency links.
- Version or lineage identifiers.
- Error and diagnostic state.

Example conceptual contracts:

- Source Acquisition outputs registered Source Records and Source Spans.
- Document Parsing consumes Source Records and outputs parsed source structures.
- Normalization consumes parsed structures and outputs normalized structures plus links back to original source.
- Observation Extraction consumes normalized source structures and outputs candidate or accepted Observation records.
- Observation Validation consumes Observation records and outputs validation status, warnings, or rejected candidates.
- Knowledge Object Resolution consumes observations and outputs object candidates, object versions, merge/split proposals, or object links.
- Evidence Graph consumes graph-eligible records and outputs graph nodes, graph edges, dependencies, lineage, and stale-state markers.
- Convergence Analysis consumes graph records and outputs convergence assessments without replacing observations.
- Temporal Reasoning consumes source/observation/object records and outputs chronology candidates, sequences, date ranges, and uncertainty.
- Workspace Services consume graph, question, timeline, map, calculation, and presentation records and output workspace organization artifacts.
- Presentation and Export consume approved downstream records and output views or artifacts with evidence links.

This document does not define code interfaces.

## 6. Event Pipeline

Conceptual event pipeline:

```text
New source added
-> Observations extracted
-> Validation
-> Knowledge Object updates
-> Relationship updates
-> Convergence recalculation
-> Timeline recalculation
-> Question generation
-> Workspace refresh
```

The pipeline must occur without overwriting evidence.

New source records produce new observations or new versions. They may propose Knowledge Object enrichment, relationship updates, convergence recalculation, timeline recalculation, and Research Gap changes. Prior evidence remains visible, including contradictions, superseded records, rejected candidates, and unresolved questions.

Workspace refresh updates presentation and organization only. It may not mutate the Evidence Graph to match a view.

## 7. AI Service Boundaries

AI may assist with:

- Extraction.
- Summarization.
- Question generation.
- Explanation.
- Visualization instructions.
- Candidate relationship proposals.
- Candidate timeline proposals.
- Draft comparison text.
- Research workflow organization.

AI must never:

- Fabricate evidence.
- Replace provenance.
- Override reviewer decisions.
- Invent quotations.
- Invent dates.
- Invent participants.
- Invent source metadata.
- Promote possibilities into facts.
- Hide contradictions.
- Treat generated images, summaries, or narratives as source material.

AI outputs remain attributable, reviewable, versioned, and subordinate to source evidence and approved review workflows.

## 8. Calculation Services

Calculation Services are separate from evidence services.

Examples:

- Travel.
- Chronology.
- Statistics.
- Distance.
- Rates.
- Text metrics.
- Literary metrics.

Calculations must preserve:

- Inputs.
- Assumptions.
- Formula.
- Units.
- Included records.
- Excluded records.
- Date boundaries.
- Confidence.
- Alternatives.
- Sensitivity to changed assumptions.
- Version.
- Review state.

Calculated values are derived records. They do not become primary evidence.

## 9. Rendering Pipeline

Future rendering flow:

```text
Evidence
-> Workspace
-> Visualization Model
-> Renderer
-> Presentation
```

Rendering services may produce maps, diagrams, timelines, animations, scene reconstructions, graph layouts, route views, confidence overlays, or exported images.

Generated output never becomes evidence.

Each rendered element should preserve a link to its evidence status, such as explicit, historical, inferred, lens-derived, decorative, unknown, or disputed.

## 10. Performance Architecture

Future runtime performance may support:

- Incremental recalculation.
- Caching.
- Background indexing.
- Dependency tracking.
- Workspace loading.
- Partial updates.
- Stale-record markers.
- Lazy presentation rendering.
- Scoped graph loading.
- Batched diagnostics.

Performance mechanisms must not weaken trust boundaries. Cached records must preserve version, source scope, provenance, generation, invalidation basis, and stale status.

Background indexing must not crawl, ingest, process queues, or mutate storage unless explicitly authorized.

## 11. Extensibility

Future plugin points may include:

- Archaeology.
- Geography.
- Linguistics.
- Genealogy.
- Translation.
- Maps.
- Image generation.
- 3D reconstruction.
- Academic databases.
- Document repositories.
- Expert libraries.
- Corpus connectors.
- Lens packs.
- Export formats.

Extensions must declare:

- Consumed record types.
- Produced record types.
- Authority scope.
- Evidence basis.
- Provenance policy.
- Confidence policy.
- Review requirements.
- Prohibited actions.

No extension may bypass constitutional rules, rewrite source evidence, override Context Lock, or promote its outputs beyond its authority.

## 12. Runtime Constitution

- Single responsibility.
- Evidence first.
- Presentation last.
- Every change is attributable.
- Every service is replaceable.
- Every calculation is reviewable.
- Source remains immutable.
- Derived records preserve lineage.
- Persistence does not create authority.
- Caches must be invalidatable.
- AI remains attributable.
- Rendering is presentation.
- Diagnostics observe before correcting.
- Runtime layers may depend on upstream evidence; they may not rewrite it.

## 13. Open Questions

- Which conceptual layers should become separate modules first?
- What minimum canonical runtime contract is needed for `ICE-OBS-0002`?
- How should current `ICE_*` records map into future runtime layers without destructive migration?
- Should the Evidence Graph be stored as documents, edges, relational tables, or a graph database?
- What dependency system is needed before incremental recalculation?
- How should workspace refresh detect stale calculations?
- How should AI service output be reviewed before entering candidate records?
- What diagnostics are required before automatic recalculation is allowed?
- How should background indexing respect user-controlled source authorization?
- How should plugin-produced records be sandboxed by authority scope?
- What export contract preserves provenance across file formats?
- How should renderer-produced assets retain evidence-status metadata?
- Which runtime logs belong in durable audit history versus ephemeral diagnostics?
- How should service failures preserve partial work without corrupting evidence?

These questions require separate architecture or implementation tasks. They must not be resolved by unsupported assumptions.
