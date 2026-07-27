# I.C.E. Master Design

Reconstructed from durable I.C.E. architecture and coordination documents after repository history confirmed that no tracked historical MASTER_DESIGN.md copy exists.

This is a reconstruction, not a restoration. It must not be treated as the original historical `MASTER_DESIGN.md`.

Purpose: serve as the first-read architectural overview for I.C.E. It explains mission, direction, system layers, trust model, major subsystems, frontend/backend relationship, and future vision.

`THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` governs the non-negotiable trust and governance rules. If this Master Design and the Constitution conflict, the Constitution controls.

`THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md` records the foundational mission philosophy that this Master Design operationalizes: discovery before direction, human agency, transparent reasoning, model independence, and knowledge architecture as the durable product asset.

`THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md` records the long-term direction that I.C.E. is an Understanding Engine: external models and research systems may assist discovery, but I.C.E. remains responsible for evidence organization, semantic structure, provenance, certainty evaluation, relationship construction, competing hypotheses, presentation, and transparency.

`THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md` records the future architecture for persistent Knowledge Objects and evidence-based Character Profiles. It is directional architecture only; it does not mean exhaustive profiles, Joseph Smith Papers ingestion, multi-source confidence evaluation, or characteristic generation are currently implemented.

`THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` records the future architecture for the primary I.C.E. — Integrated Comprehension Engine research workspace where users will read, inspect Knowledge Objects, compare evidence, navigate timelines and relationships, maintain notes, and prepare traceable presentations. It is documentation only and does not implement workspace persistence, UI behavior, AI research actions, or Knowledge Object mutation.

`THREAD_ARCHIVE/LENS_ARCHITECTURE.md` records the future architecture for independent presentation and evaluation lenses, concurrent lens evaluation, and lens convergence. Lenses organize existing evidence through defined perspectives, but they do not modify observations, provenance, confidence, semantic records, or Knowledge Objects.

`THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` records the canonical Observation architecture, Evidence Basis concept, Research Gap Engine direction, Situational Completeness Profiles, translation/lens contribution boundaries, and the bridge from current Observation Engine records toward future Knowledge Objects and evidence review. It is documentation only and does not implement canonical observation runtime storage.

`THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` records the future Evidence Graph architecture and the lifecycle by which canonical observations become versioned, auditable Knowledge Objects, Question Objects, journeys, presentations, and renderings. It is documentation only and does not implement graph storage, object persistence, schema migration, rendering behavior, or runtime Observation Engine changes.

`THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` records the future architecture for comparing multiple accounts, source dependency, temporal reasoning, context windows, event sequences, transparent calculations, literary-structure proposals, reconstructions, possibilities, expert material, lens interaction, visualization hooks, and AI-assisted reconstruction boundaries. It is documentation only and does not implement convergence scoring, timeline calculation, rendering, image generation, storage, or runtime behavior.

`THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` records the future Study Workspace orchestration architecture for projects, sessions, investigations, collections, research trails, boards, comparative study, synchronized timelines, geographic workspace, visualization workspace, AI-assisted research, presentations, collaboration, notebooks, and saved calculations. It is documentation only and does not implement workspace persistence, runtime UI, storage, exports, collaboration, AI workflows, maps, timelines, or application behavior.

`THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` records the future runtime layer model, service responsibilities, processing order, conceptual contracts, event pipeline, AI boundaries, calculation services, rendering pipeline, performance architecture, extensibility points, and runtime constitution. It is documentation only and does not implement services, schemas, APIs, queues, storage, runtime behavior, rendering, exports, AI workflows, or build changes.

## 1. Document Status And Reconstruction Notice

This document was reconstructed from durable I.C.E. architecture and coordination records, including:

- `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
- `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
- `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md`
- `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`
- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`
- `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/AUTOMATIC_DISCOVERY_EXPANSION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/LANGUAGE_ADAPTER_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`
- `PROJECT_STATE.md`
- `PROJECT_LOG.md`
- `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
- `QA_REPORTS/master-design-investigation.md`

The investigation report concluded that no tracked historical `MASTER_DESIGN.md` copy exists in the current checkout, tracked Git history, current branches, or tags. This document is therefore a reconstructed first-read design overview.

## 2. Mission

I.C.E. is a grounded understanding and study exploration system.

Its mission is to help users study scripture, talks, commentary, and eventually broader religious or comparative corpora with clarity, traceability, and trust. I.C.E. should surface what is present in the selected scope, show how records relate, preserve uncertainty, and help users explore characters, locations, events, themes, language, fulfillment, evidence, and perspective without collapsing those categories into unsupported interpretation.

The broader architectural mission is to help people discover, organize, evaluate, and understand knowledge through transparent semantic reasoning while preserving human agency. I.C.E. does not replace human judgment; it expands human understanding by organizing evidence, relationships, context, and qualified reasoning.

Backend precision and frontend clarity are the core product posture:

- The backend may evaluate deeply.
- The frontend should present selectively and clearly.
- Technical depth remains available in Editor / Architect views.
- User-facing views should remain readable, scoped, and honest about confidence.

## 3. Core Design Rules

I.C.E. follows a strict dependency order:

```text
Context precedes meaning.
Meaning precedes relationships.
Relationships precede journeys.
Journeys precede study guidance.
Primary evidence remains authoritative.
```

The system may derive records from evidence, but derived records may not rewrite the evidence that produced them.

Core rules:

- Source wording remains distinguishable from interpretation.
- Context Lock remains grounded and may not be overwritten.
- Possible meaning must remain possible.
- Typology must remain typology unless explicitly established otherwise.
- Scope boundaries must remain intact.
- Confidence, provenance, and evidence distance must remain visible where they matter.

## 4. Evidence Distance

Evidence distance describes how far a record is from primary evidence. It is not a value hierarchy and it is not a permission to increase authority.

Typical distance model:

```text
Distance 0: Source Text
Distance 1: Language / Tokens / Grammar
Distance 2: Context
Distance 3: Entities
Distance 4: Events / Timeline / Scenes
Distance 5: Relationships
Distance 6: Themes / Literary Structures
Distance 7: Discovery / Perspectives / Cross References
Distance 8: Presentation / Study Guidance
```

Greater evidence distance requires stronger provenance, clearer confidence labels, and better explanation. Authority may not increase merely because a record is farther from the source.

Evidence distance is distinct from ontological dependence. A distant presentation lens may be useful, but it remains presentation. A close source record may be simple, but it remains authoritative.

## 5. Trust Architecture

Trust architecture defines what may not be rewritten.

Major trust systems:

- Context Lock
- Meaning Staging
- Scope integrity
- Evidence chains
- Provenance
- Confidence and Analysis Support
- Authority boundaries
- Semantic Verification

Context Lock preserves speaker, audience, authority, participants, location, source scope, and immediate contextual grounding. Broader application, later cross-reference, tradition, expert interpretation, or presentation wording may illuminate context, but may not replace it.

Scope integrity requires that current selected scope, retained pages, cross-reference pages, and broader comparison sets remain distinct. Retained records may be summarized separately, but they may not redefine active scope.

## 6. Semantic Ontology Backbone

The ontology backbone is the shared contract between backend evaluation and frontend presentation.

Primary flow:

```text
Source
-> Language
-> Context
-> Entity
-> Event
-> Relationship
-> Theme
-> Literary
-> Discovery
-> Perspective
-> Presentation
```

Each layer may reference primary or nearer evidence. No layer may rewrite the records it depends on.

The ontology backbone supports:

- Source records
- Language records
- Context records
- Entity records
- Event records
- Relationship records
- Theme records
- Literary records
- Discovery records
- Perspective records
- Presentation records

Every future storage shape, adapter, plugin, model, QA harness, and lens should align with the ontology contracts.

## 7. Canonical Observation And Research Gaps

Canonical Observations are the future source-traceable bridge between current Observation Engine records and durable Knowledge Objects.

An Observation is the smallest durable unit representing something I.C.E. has observed, extracted, normalized, calculated, correlated, questioned, or proposed. An Observation is not automatically a fact. It must preserve provenance, Evidence Basis, classification, confidence, review state, alternatives, contradictions, and version history.

Evidence Basis is distinct from Observation Class. Observation Class describes what kind of record exists. Evidence Basis explains why the record is shown, such as explicit source text, deterministic derivation, linguistic analysis, historical source, cultural source, geographic calculation, translation comparison, lens-specific source, qualified absence, or generated research question.

The future Research Gap Engine identifies missing information, unanswered questions, incomplete situations, possible supporting materials, reducible uncertainty, and irreducible uncertainty. It must not invent answers. Research questions are prompts, not conclusions.

## 8. Evidence Graph And Knowledge Object Lifecycle

The Evidence Graph is the future durable graph that connects Source Collections, Source Records, Source Spans, Canonical Observations, Relationships, Claims or Propositions, Knowledge Objects, Question Objects, Lens Evaluations, Presentation Objects, and Rendering Objects.

Knowledge Objects are persistent research entities. They evolve through versioned evidence rather than overwriting earlier records. Object lifecycle states may include detected, candidate, correlated, provisional, reviewed, accepted, disputed, merged, split, superseded, archived, and future-governed deletion. Accepted means accepted within a defined authority scope; it does not mean infallible, closed, or immune to new evidence.

Evidence Basis remains separate from Observation Class and must remain attached to meaningful graph contributions. Observation identity must distinguish immutable observation versions from continuing observation lineage. Knowledge Object identity must remain distinct from display name, source mention, generated summary, or current preferred label.

The graph preserves merge, split, supersession, dependency, convergence, question, lens, user contribution, presentation, and rendering boundaries. Summaries, maps, timelines, scene renderings, and visual graph layouts are views over the graph; they are not evidence and may not be re-ingested as evidence without independent source registration and review.

## 9. Evidence Convergence, Temporal Reasoning, And Reconstruction

Evidence Convergence is the future structured comparison of observations and sources across dimensions such as identity, event occurrence, date, sequence, duration, location, route, participants, speech content, action, motive, physical conditions, quantities, literary structure, and consequence.

Convergence is not source counting. Source dependency, shared sources, copies, summaries, translations, retrospective recollections, oral traditions, and unknown dependencies must remain visible so repeated derivative accounts are not mistaken for independent witnesses.

Temporal reasoning organizes explicit dates, relative dates, durations, sequence statements, simultaneous events, approximate timing, uncertain placement, disputed chronology, and unknown chronology. No sequence may become the official narrative merely because it is easiest to draw.

Reconstructions and possibilities are labeled models. They may organize explicit elements, historically supported elements, inferred elements, lens elements, unknowns, assumptions, and excluded alternatives, but they may never overwrite observations. Calculations must expose inputs, date boundaries, excluded days, units, formulas, uncertainty ranges, alternate calculations, and sensitivity to assumptions.

## 10. Language Architecture

Language architecture provides support records that help illuminate source wording without becoming source authority.

Implemented or planned language foundations include:

- English surface adapter
- Language records
- Part-of-speech preview
- Scripture/KJV-style POS supplement
- Pronoun resolution preview
- Quotation boundary preview
- Speaker detection preview
- Audience detection preview
- Dialogue relationship preview
- Grammatical role preview
- Subject/object preview
- Morphology preview
- Translation alignment preview
- Strong's alignment preview
- Koine Greek adapter foundation
- Biblical Hebrew adapter foundation

Language records are advisory until explicitly promoted by grounded rules. They do not rewrite source text, Context Lock, entity classification, semantic records, or Study View output.

Future adapters should support original-language tokens, lemma, morphology, grammar, syntax, quotation boundaries, speaker/audience support, provenance, and confidence. Translation, grammar, Strong's, lexicon, and expert models remain attributable perspectives.

## 11. Entity And Ontology Architecture

Entity architecture keeps identity, ontology, status, and role distinct.

Entity classes may include:

- Divine Being
- Divine Title / Reference
- Human Actor
- Messenger
- Prophet
- Disciple
- Group / Multitude
- Nation / People
- Location
- Region
- City
- Body of Water
- Object
- Scripture / Writing
- Institution
- Symbol
- Narrator / Source Voice
- Unknown / Unresolved

Truth and status classes must preserve distinctions such as:

- Established by source authority
- Claimed by participants
- Referenced by narrator
- Symbolic
- Object of worship
- Disputed
- Unresolved
- Possible / inferred

Hierarchy boundaries matter. A claimed deity must not become an established Divine Being. A false god, idol, graven image, or crafted object may be a false deity claim or object of worship, but not automatically a real divine being. Literary figures, parable figures, and symbolic beings must remain literary or symbolic unless source context establishes otherwise.

Class of Being and Exaltation readiness should preserve hierarchy rather than flatten it. Grammar, language, and literary models may inform hierarchy, but they may not override grounded entity class or Context Lock.

## 12. Events, Timelines, Scenes, And Relationships

Events are promoted only from grounded source evidence, accepted ordered events, explicit source sequence, explicit context, and source references.

Timeline records summarize source order. They may not infer missing chronology, reorder source events, or create implied events.

Scene records summarize explicit context. They may not create actors, locations, audience, authority, or chronology.

Relationships connect grounded records. Low-risk relationships include authority, speaker/audience, messenger/recipient, actor/location, event/location, sequence, teacher/audience, parent/child, lineage, and source narrator/narrated event. Medium-risk relationships such as prophecy/fulfillment, command/response, request/response, healing agent/recipient, and opposition/conflict require explicit support.

Relationships may summarize primary and nearer records. They may not rewrite context, create actors, create locations, infer motives, or invent fulfillment.

## 13. Themes, Literary Structures, Fulfillment, And Discovery

Themes and literary structures connect grounded semantic records into study-visible patterns. They must not create doctrine or replace source meaning.

The system preserves distinctions between:

- Explicit
- Grounded
- Supported
- Strongly implied
- Possible
- Tradition-recognized
- Typological
- Unresolved

Fulfillment confidence must be guarded. Explicit fulfillment is explicit only when source wording marks it. Quoted or referenced fulfillment must preserve the source and target relationship. Strongly supported candidates require multiple grounded links. Possible fulfillment remains possible. Tradition-recognized fulfillment remains attributed. Typology remains typology unless the source explicitly establishes fulfillment.

Discovery should help users see continuity, development, fulfillment, comparison, common ground, differences, repeated themes, repeated phrases, narrative parallels, and large-scope congruencies without over-promoting uncertain connections.

## 14. Registry Architecture

Registries define contracts and boundaries. They are not semantic authority by themselves.

Major registries:

- Corpus Registry
- Language Adapter Registry
- Perspective Registry
- Expert Registry
- Lens Registry
- Ontology Registry
- Authority Registry

Corpus Registry defines source collections, canon boundaries, provenance, language expectations, and perspective defaults. Corpora define boundaries; they do not define truth.

Language Adapter Registry defines adapter capabilities and support levels.

Perspective Registry defines evaluation methods such as translation, grammar, lexicon, expert, commentary, tradition, language adapter, and interreligious comparison models.

Expert Registry defines attributable evaluators. Experts illuminate evidence; they do not become evidence.

Lens Registry defines presentation surfaces that consume ontology, evidence, and perspectives. Lenses present; they do not create truth.

The Lens Architecture extends the registry with future independent lens evaluation. A lens is a presentation and evaluation framework that organizes existing evidence according to a defined perspective without modifying the underlying evidence. The Neutral Lens is the default, source-first presentation and should emphasize observations, chronology, geography, language, provenance, confidence, and unresolved questions without privileging a theological or interpretive tradition.

Future Concurrent Lens Evaluation may evaluate the same subject through multiple applicable lenses in parallel, compare shared and distinct evidence, and produce a Lens Convergence Profile. Convergence is not truth and is not majority vote; it is one confidence dimension that must preserve each lens's reasoning, evidence, and attribution.

Ontology Registry defines classification categories and hierarchy boundaries.

Authority Registry defines what can inform what, what cannot override what, and where authority must remain limited.

## 15. Architecture Observability

I.C.E. treats architecture itself as inspectable.

Observability surfaces include:

- QA Architecture Dashboard
- Architecture Graph
- Integrated Semantic Pipeline
- Semantic Health
- Semantic Explainability
- Provenance Graph
- Semantic Verification

QA checks implementation behavior. Semantic Health observes system behavior. Explainability answers why a record exists. Provenance Graph traces record lineage. Semantic Verification checks constitutional integrity. None of these tools may mutate semantic records, repair records automatically, rewrite evidence, change Context Lock, process queues, crawl, or alter Study View output.

## 16. Frontend And Backend Separation

Evaluation and presentation are separate.

The backend may extract, classify, validate, stage meaning, prepare semantic records, run diagnostics, maintain registries, and generate display-ready modules.

The frontend should expose selected useful views:

- Study View
- Editor / Architect View
- Character / Actor Lens
- Entity Index
- Location Movement
- Event Flow
- Narrative Type View
- Inference Ladder
- Evidence / Provenance
- Timeline Lens
- Theme Study
- Relationship Graph
- Journey Study
- Cross Reference View
- Language Lens
- Translation Lens
- Fulfillment Lens
- Confidence Lens

User selection changes presentation only. It must not reprocess source, mutate scope, rewrite Context Lock, alter semantic records, process queues, or silently change storage authority.

Study View should be clean, readable, and user-facing. Editor / Architect View should preserve technical detail, unresolved records, provenance, diagnostics, and architectural transparency.

## 17. Study Workspace

The Study Workspace is the long-term primary research environment for I.C.E. It should help users observe, compare, evaluate, organize, and understand rather than merely read documents.

Future workspace areas may include the Reading Pane, Knowledge Object Inspector, Character Profile, Event Profile, Timeline, Relationship Graph, Source Confidence, Notes, Research Journal, Saved Studies, Semantic Filters, Cross References, Language Tools, Perspective Comparison, Common Ground View, Observation History, and Evidence Explorer.

The Study Workspace is the orchestration layer of I.C.E. It organizes research into Workspaces, Study Sessions, Projects, Research Collections, Evidence Collections, Question Collections, Notebooks, Bookmarks, Saved Searches, Research Trails, Investigations, Presentations, and Exports. It is not the evidence storage layer.

Workspace modes may include Reading, Research, Comparison, Timeline, Language Study, Character Study, Topic Study, Multi-source Study, and Presentation Mode. These modes organize presentation and workflow; they do not alter source authority, Context Lock, semantic records, storage authority, queues, or Knowledge Objects.

Workspace lens profiles may eventually support Neutral Research, Historical Geography, Language Study, Conference Study, Temple Study, Character Study, Comparative Study, Personal Devotional Study, and user-defined profiles. Lens profiles select organization and comparison surfaces; they do not establish truth or rewrite evidence.

The intended research flow is:

```text
Source
-> Observation
-> Relationship
-> Evidence Review
-> Confidence
-> Knowledge Object
-> Study Notes
-> Presentation
```

Future AI research assistants may suggest, summarize, explain, organize, and propose research directions, but they may not determine truth, replace evidence, overwrite Knowledge Objects, silently modify conclusions, hide uncertainty, or create doctrine.

Every workspace summary should remain drillable from summary to claim, evidence, original source, context, confidence, and revision history. Notes, saved workspaces, bookmarks, research collections, exports, and presentations require separate implementation and trust review.

Research Trails should make investigation reproducible. Evidence Boards, synchronized timelines, geographic workspaces, visualization workspaces, presentation mode, notebooks, collaboration, and saved calculations may help users organize research, but they remain workspace artifacts. They do not become evidence and must preserve links back to the Evidence Graph.

## 18. Runtime Layering And Processing Pipeline

The future runtime should preserve a single-responsibility pipeline:

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

Runtime layers may include Source Acquisition, Document Parsing, Normalization, Observation Extraction, Observation Validation, Knowledge Object Resolution, Relationship Resolution, Evidence Graph, Convergence Analysis, Temporal Reasoning, Research Gap Generation, Calculation Services, Literary Analysis, Journey Analysis, Workspace Services, Presentation Services, Export Services, AI Assistance, Rendering Services, Persistence, Configuration, Logging, and Diagnostics.

Every service has one responsibility, declares its conceptual inputs and outputs, and preserves provenance. Presentation remains downstream of evidence. Persistence does not create authority. Rendering output, generated summaries, calculations, caches, and exports never become evidence by being produced or stored.

## 19. Operational Boundaries

Operational boundaries are part of the design:

- No crawling unless explicitly authorized.
- No automatic queue processing unless explicitly started.
- No automatic study progression.
- No automatic navigation.
- No automatic scope mutation.
- No hidden storage-authority changes.
- No scope leakage.
- Do not modify user-owned untracked files.
- Do not run destructive cleanup commands to hide repository state.

The system should be powerful, but never covert. The user must be able to see what is active, what is retained, what is current scope, what is cross-reference context, what is derived, what is unresolved, and what remains possible.

## 20. Future Vision

I.C.E. should grow from current scoped study into large-volume, library-scale understanding while preserving constitutional trust.

Future directions include:

- Single verse, selected range, chapter, full book, volume, and full-library evaluation.
- Prior / Current / Future relationship views.
- Repeated phrase and repeated theme discovery.
- Character journeys, theme journeys, location journeys, and event continuity.
- Translation comparison and original-language models.
- Strong's, lexicon, grammar, and expert source integration.
- Attributed commentary, tradition, and religious authority perspectives.
- Modern talks and recent material, with temporal/provenance boundaries.
- Interreligious principle comparison.
- Literary structure detection, including repeated formulas, discourse structures, parallelism, and carefully guarded chiasmus candidates.
- Visual lenses for timelines, relationships, movement, confidence, provenance, and evidence distance.
- Semantic verification dashboards that keep constitutional violations visible.

The long-term goal is not merely to produce more records. The goal is to help users see what careful study normally reveals: who is present, who speaks, who receives, what happens, where it happens, what is stated, what is supported, what remains possible, and how grounded records connect across larger scopes without losing trust boundaries.
