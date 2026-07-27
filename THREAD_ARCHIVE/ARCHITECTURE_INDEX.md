# I.C.E. Architecture Index And Dependency Map

Purpose: provide a single map of the major I.C.E. architecture documents, their responsibilities, their authority level, and the dependency order future contributors should follow.

This document is architecture guidance only. It does not implement runtime behavior.

## 1. Core Constitutional Documents

### `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`

Authority level: explicit non-negotiable constitutional rules.

Purpose: define the governing trust, evidence, authority, ontology, provenance, explainability, verification, scope, and operational rules that every implementation, adapter, model, corpus, expert source, lens, and contributor must obey.

Use this after `MASTER_DESIGN.md` and before adding or reviewing any feature that creates, promotes, presents, verifies, or interprets semantic records.

### `MASTER_DESIGN.md`

Authority level: first-read reconstructed master design overview.

Purpose: define the global product vision, architectural direction, target user experience, major subsystems, frontend/backend relationship, and long-term system philosophy.

Current note: `MASTER_DESIGN.md` is reconstructed, not restored. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` controls non-negotiable trust and governance rules if the two documents conflict.

### `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`

Authority level: foundational mission philosophy.

Purpose: define why I.C.E. exists, how it should relate to human agency, discovery, transparency, model independence, knowledge architecture, historical integrity, progressive capability, and AI reasoning services.

Use this with `MASTER_DESIGN.md` when evaluating product direction or proposed capabilities. It is mission-level guidance and does not override `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`.

### `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`

Authority level: long-term architecture direction.

Purpose: establish I.C.E. as an Understanding Engine rather than an AI assistant, define the long-term processing model from Source Material through Observation, Relationship, Continuity, Certainty, Corpus Evidence, Perspective, Research Workspace, Journey Builder, and Understanding, and preserve external models as research contributors rather than semantic authorities.

Use this when evaluating future schema evolution, multi-model research, evidence engines, competing hypotheses, perspective studies, knowledge objects, and research workspaces. It does not authorize runtime crawling, ingestion, storage authority, or model-created ontology without separate approved implementation work.

### `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md`

Authority level: directional / future architecture.

Purpose: define persistent Knowledge Objects and evidence-based Character Profiles as traceable semantic representations assembled from observations, relationships, claims, source records, confidence profiles, coverage profiles, and review state.

Use this when designing future person/place/event/concept/document objects, Character Profiles, Joseph Smith Papers source-collection integration, multi-source confidence, identity resolution, characteristic candidates, user-contributed research materials, generated summaries, and profile presentation. It does not implement runtime behavior or authorize ingestion, crawling, storage authority, characteristic generation, or model-created profile facts.

### `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md`

Authority level: directional / future workspace architecture.

Purpose: define the long-term I.C.E. — Integrated Comprehension Engine Study Workspace as the primary research environment for observing, comparing, evaluating, organizing, and understanding source-grounded evidence, Knowledge Objects, Character Profiles, timelines, relationships, notes, confidence, and future AI-assisted research.

Use this when designing future workspace surfaces, workspace modes, evidence drilldowns, notes, saved studies, research journals, semantic filters, source-confidence views, and presentation workflows. It does not implement runtime UI, persistence, AI research behavior, Knowledge Object mutation, crawling, ingestion, queues, or storage authority.

### `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`

Authority level: directional / future presentation and evaluation architecture.

Purpose: define lenses as independent presentation and evaluation frameworks that organize existing evidence according to defined perspectives without modifying observations, evidence, provenance, confidence, semantic records, or Knowledge Objects.

Use this when designing Neutral Lens behavior, tradition-specific lenses, language lenses, historical/geographical/chronological lenses, Concurrent Lens Evaluation, Lens Convergence, Lens Divergence, multidimensional confidence across lenses, user-configurable Lens Profiles, and small-selection lens support. It does not implement runtime behavior, storage, highlighting, graph behavior, semantic mutation, Knowledge Object mutation, crawling, ingestion, or lens activation.

### `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`

Authority level: canonical observation and future research-gap architecture.

Purpose: define Observation classes, Evidence Basis, Observation lifecycle, source/interpretation/presentation separation, Research Gap Engine direction, Situational Completeness Profiles, dynamic enrichment boundaries, translation comparison boundaries, lens contribution boundaries, confidence dimensions, and the relationship between current Observation Engine runtime and future canonical observation records.

Use this before implementing canonical observation normalization, evidence review states, Knowledge Object enrichment, Research Gap Engine runtime, situational completeness metrics, translation comparison, lens-contained observations, journey analysis, or rendering support. It does not implement runtime behavior, storage, migrations, Knowledge Objects, lenses, maps, timelines, rendering, source connectors, QA changes, or UI controls.

### `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`

Authority level: future Evidence Graph and Knowledge Object lifecycle architecture.

Purpose: define the durable Evidence Graph model, graph node categories, evidence basis requirements, observation lineage, Knowledge Object identity, object lifecycle, dynamic enrichment, merge/split/supersession boundaries, situational relationships, Before / During / After context windows, convergence/dependency relationships, Journey Objects, Question Objects, lens interaction, user contributions, presentation summaries, rendering boundaries, dependency propagation, auditability, reversibility, and runtime transition strategy.

Use this before implementing persistent Knowledge Objects, Evidence Graph storage, object identity/versioning, object merge/split workflows, Evidence Graph presentation, journey object persistence, persistent Question Objects, object enrichment, source convergence, rendering dependency hooks, or graph-backed workspace summaries. It does not implement runtime behavior, storage, schema migration, graph database behavior, rendering, maps, timelines, Knowledge Object runtime, Observation Engine changes, crawling, ingestion, QA changes, or UI controls.

### `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`

Authority level: future evidence convergence, temporal reasoning, and reconstruction architecture.

Purpose: define how I.C.E. compares multiple accounts, models source independence and dependency, evaluates dimensional agreement and divergence, reasons about time and event sequence, exposes transparent calculations, presents literary-structure proposals, labels situational reconstructions and possibilities, handles expert material and lenses, reserves visualization/rendering hooks, and keeps AI-assisted outputs attributable and reviewable.

Use this before implementing Evidence Convergence runtime, source-dependency analysis, temporal reasoning, alternate chronology presentation, duration/rate calculations, literary-structure analysis, situational reconstruction, possibility records, evidence-density views, journey convergence, translation chronology research tools, expert-contribution convergence, AI-assisted rendering prompts, or convergence-backed Research Gap generation. It does not implement runtime behavior, storage, schema migration, graph database behavior, timeline calculations, convergence scores, literary analysis, image generation, rendering, maps, QA changes, crawling, ingestion, or UI controls.

### `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`

Authority level: future Study Workspace orchestration and investigation architecture.

Purpose: define the Study Workspace as the user-facing orchestration layer for Workspaces, Study Sessions, Projects, Research Collections, Evidence Collections, Question Collections, Notebooks, Bookmarks, Saved Searches, Research Trails, Investigations, Presentation, Export, workspace views, collections, investigation boards, comparative study, synchronized timelines, geographic workspace, visualization workspace, AI-assisted research, presentation mode, collaboration, notebooks, and saved calculations.

Use this before implementing workspace persistence, saved investigations, research trails, evidence boards, workspace collections, notebooks, bookmarks, saved searches, synchronized timeline workspaces, map workspaces, visualization workspaces, AI-assisted research workflows, presentation mode, exports, collaboration, or saved calculations. It does not implement runtime behavior, storage, schema migration, Study Panel behavior, maps, timelines, visualization, AI workflows, export generation, collaboration, QA changes, crawling, ingestion, or UI controls.

### `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`

Authority level: future runtime layering and service-boundary architecture.

Purpose: define the conceptual runtime layer model, processing order, service responsibilities, conceptual contracts, event pipeline, AI service boundaries, calculation service boundaries, rendering pipeline, performance architecture, extensibility points, runtime constitution, and open runtime questions that connect the approved architecture documents into one processing pipeline.

Use this before implementing runtime modules, service boundaries, canonical processing order, source acquisition, parsing, normalization, observation validation, Knowledge Object resolution, Evidence Graph services, convergence services, temporal reasoning, Research Gap generation, calculation services, rendering services, workspace services, presentation/export services, AI-assisted runtime workflows, caching, dependency tracking, background indexing, diagnostics, logging, persistence boundaries, or plugin interfaces. It does not implement runtime behavior, storage, schema migration, APIs, services, queues, crawling, QA changes, UI controls, rendering, exports, AI workflows, package changes, or build changes.

### `PROJECT_STATE.md`

Authority level: active operational state.

Purpose: record the current implemented state, latest confirmed behavior, active constraints, known next tasks, blocked items, and repo coordination state.

Use this before implementing. It tells agents what is currently true.

### `PROJECT_LOG.md`

Authority level: chronological project memory.

Purpose: record completed phases, implementation decisions, validation outcomes, and historical reasoning.

Use this to understand why the project moved in a given direction.

### `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`

Authority level: agent activity ledger.

Purpose: record cdx/pcdx work, validation commands, smoke results, commits, and handoff-relevant results.

### `THREAD_ARCHIVE/AGENT_OUTBOX.md`

Authority level: current handoff surface.

Purpose: communicate current next tasks, blocked items, and repo-readable handoff notes between agents.

## 2. Trust Architecture

Trust architecture defines what cannot be rewritten.

Relevant systems:

- Context Lock
- Meaning Staging
- Scope Hierarchy
- Scope Perspectives
- Evidence Chains
- Analysis Support / Challenge Factors
- Source Verse Quick References

Core rules:

- Source remains immutable.
- Context always wins.
- Meaning never rewrites Context.
- Relationships never rewrite Meaning.
- Journeys never rewrite Relationships.
- Study guidance never rewrites Evidence.
- Presentation does not mutate extraction, scope, storage, queues, or semantic records.

Primary references:

- `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`
- `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/OBSERVATION_ENGINE_PHASE_1.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`

## 3. Semantic Architecture

Semantic architecture defines the records that I.C.E. creates and how records may be promoted.

Primary documents:

- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`

Responsibilities:

- Define ontology layer order.
- Define canonical record shapes.
- Define entity classes.
- Define relationship classes.
- Define truth/status classes.
- Define direct Observation Layer records before higher semantic interpretation.
- Define canonical Observation classes and Evidence Basis before runtime normalization.
- Define future persistent Knowledge Objects and evidence-based Character Profiles.
- Define future Evidence Graph identity, lineage, lifecycle, convergence, dependency, merge, split, supersession, and rendering boundaries.
- Define future evidence convergence, source dependency, temporal reasoning, transparent calculation, reconstruction, possibility, and evidence-density boundaries.
- Define Study Workspace research flow from evidence through Knowledge Objects, notes, and presentation.
- Define future Study Workspace orchestration for projects, sessions, collections, boards, research trails, notebooks, presentations, exports, collaboration, and saved calculations.
- Define future runtime layering, service responsibilities, conceptual contracts, processing order, AI/calculation/rendering boundaries, performance, extensibility, logging, diagnostics, and persistence responsibilities.
- Define promotion criteria.
- Define prohibited promotions.
- Preserve source scope, evidence, confidence, provenance, and inference level.

Semantic architecture owns:

- Entity type classification
- Relationship type classification
- Event classification
- Knowledge Object and Character Profile architecture
- Evidence Graph and Knowledge Object lifecycle architecture
- Evidence Convergence, temporal reasoning, and reconstruction architecture
- Study Workspace and research workflow architecture
- Runtime layer and processing pipeline architecture
- Theme record grounding
- Fulfillment relationship grounding
- Meaning Staging alignment

Semantic architecture does not own:

- Frontend card wording by itself
- User view selection
- Queue execution
- Crawling
- Automatic study progression

## 4. Discovery Architecture

Discovery architecture defines how I.C.E. eventually finds patterns beyond explicitly requested questions.

Primary documents:

- `THREAD_ARCHIVE/AUTOMATIC_DISCOVERY_EXPANSION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/EVIDENCE_ENGINE_GUIDED_DISCOVERY_ARCHITECTURE.md`
- `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`

Included systems:

- Automatic Discovery Expansion
- Fulfillment Detection
- Literary Structure Detection
- Theme Discovery
- Discovery Measurement
- Evidence Engine / Guided Discovery
- Research Gap Engine
- Situational Completeness Profiles
- Persistent Question Objects
- Evidence convergence / dependency analysis
- Temporal reasoning and alternate chronology
- Reconstruction and possibility modeling
- Evidence-density visualization
- Comparative evidence collections
- Evidence convergence metrics
- Possible similitude discovery
- Prior / Current / Future relationships
- Common Ground / Difference future lenses
- Concurrent Lens Evaluation
- Lens Convergence / Divergence
- Lens Profiles
- Revelation and Development modeling

Discovery architecture owns:

- Discovery candidate categories
- Measurement evidence requirements
- Drillable support expectations
- Fulfillment category boundaries
- Literary structure evidence rules
- Evidence collection boundaries
- Corpus connector expectations
- Convergence metrics as evidence organization rather than truth scoring

Discovery architecture does not own:

- Rewriting source context
- Treating possible patterns as facts
- Replacing source text with perspective or translation records
- Running automatic capture or crawling
- Creating corpus ingestion, crawling, or external-source authority without a separate approved implementation task

## 5. Language Architecture

Language architecture defines how grammar, translation, lexicon, and model-specific observations may support the ontology.

Primary documents:

- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/AUTOMATIC_DISCOVERY_EXPANSION_ARCHITECTURE.md`

Included systems:

- Grammar Layer
- Translation Models
- Perspective Models
- Original Language Adapters
- Lexicon Models
- Translation Comparison

Language architecture owns:

- Tokens
- Lemma
- Morphology
- Part of speech
- Grammatical role
- Syntax role
- Quotation boundaries
- Translation alignment
- Perspective-model observations

Language architecture does not own:

- Replacing selected source text
- Rewriting Context Lock
- Collapsing multiple perspective models into one unsupported conclusion

## 6. Presentation Architecture

Presentation architecture defines how prepared ontology records are shown to users.

Primary documents:

- `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`

Included systems:

- Study View
- Editor / Architect View
- Study Modules
- View Lens
- Future Lenses
- Neutral Lens
- Character Lens
- Entity Lens
- Location Lens
- Event Lens
- Timeline Lens
- Relationship Lens
- Theme Lens
- Journey Lens
- Evidence Lens
- Confidence Lens
- Translation Lens
- Fulfillment Lens
- Interreligious Lens
- Prior / Current / Future Lens
- Historical Lens
- Geographical Lens
- Chronological Lens
- Archaeological Lens
- Jewish Lens
- Catholic Lens
- Orthodox Lens
- Protestant Lens
- Latter-day Saint Lens
- Personal Study Lens
- Research Workspace Lens
- Concurrent Lens Evaluation
- Lens Convergence Profile
- Reading Pane
- Knowledge Object Inspector
- Character Profile
- Event Profile
- Source Confidence
- Notes
- Research Journal
- Saved Studies
- Evidence Explorer

Related presentation contract:

- Graph Object Provenance Architecture: `THREAD_ARCHIVE/GRAPH_OBJECT_PROVENANCE_ARCHITECTURE.md`

Presentation architecture owns:

- Display wording
- Card ordering
- Collapsed/expanded sections
- User-selectable view modules
- Technical vs user-facing grouping
- Evidence/provenance disclosure placement
- Workspace region and mode boundaries
- Notes and research-journal presentation boundaries
- Evidence drilldown presentation
- Independent lens organization and comparison
- Lens convergence/divergence presentation
- Multidimensional confidence display across lenses

Presentation architecture does not own:

- Source truth
- Context truth
- Semantic record mutation
- Queue execution
- Storage writes except presentation preferences
- Source, semantic, or Knowledge Object mutation from workspace presentation alone
- Lens output rewriting evidence, provenance, confidence, observations, semantic records, or Knowledge Objects

## 7. Dependency Graph

Canonical dependency order:

```text
Source
-> Language
-> Context
-> Entities
-> Events
-> Relationships
-> Themes
-> Discovery
-> Perspectives
-> Presentation
```

Expanded ontology order:

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

Dependency rule:

Each derived layer may consume primary or nearer evidence records. No derived layer may rewrite primary evidence or nearer evidence records.

Evidence distance model:

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

Primary evidence remains authoritative. Greater semantic distance requires stronger provenance, clearer confidence labeling, and visible inference boundaries.

## 8. Ownership Rules

### Source Truth

Owned by: Source Layer.

Source text, source reference, translation, source adapter, and provenance are immutable for the record.

### Semantic Truth

Owned by: Context, Entity, Event, Relationship, Theme, Literary, and Discovery layers according to dependency order.

Semantic truth is always bounded by source scope, evidence, inference level, and provenance.

### Display Wording

Owned by: Presentation Layer.

Display wording must be clear and user-facing, but it may not change record meaning.

### Inference

Owned by: Meaning Staging and derived semantic layers.

Inference must remain labeled:

- Grounded
- Supported
- Strongly Implied
- Possible
- Study Relationship

### Confidence / Analysis Support

Owned by: record-producing layers, surfaced by presentation.

Confidence describes I.C.E.'s support from current source and analyzed scope. It is not a judgment on scriptural truth.

### Provenance

Owned by: every layer.

Every source, derived, discovery, perspective, and presentation record must preserve where it came from and what primary or nearer evidence records it depends on.

## 9. Contributor Guidance

### Recommended Reading Order For New Developers

1. `MASTER_DESIGN.md`
2. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
3. `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
4. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
5. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
6. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
7. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
8. `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
9. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md`
10. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md`
11. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`
12. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
13. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
14. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
15. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`
16. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`
17. `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
18. `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
19. `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`
20. `PROJECT_STATE.md`
21. `PROJECT_LOG.md`

### Recommended Reading Order For New AI Agents

1. `PROJECT_STATE.md`
2. `PROJECT_LOG.md`
3. `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
4. `THREAD_ARCHIVE/AGENT_OUTBOX.md`
5. `MASTER_DESIGN.md`
6. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
7. `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
8. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
9. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
10. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
11. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
12. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md` when the task concerns persistent objects, profiles, identity, characteristics, or source integration.
13. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` when the task concerns workspace surfaces, research workflows, notes, saved studies, evidence drilldowns, or presentation modes.
14. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md` when the task concerns lenses, perspective presentation, concurrent lens evaluation, lens convergence, divergence, or lens profiles.
15. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` when the task concerns canonical observations, Evidence Basis, Research Gap Engine, Situational Completeness, canonical observation runtime normalization, or observation review boundaries.
16. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` when the task concerns Evidence Graph identity, Knowledge Object lifecycle, object lineage, merge/split/supersession, convergence, dependency relationships, persistent questions, rendering boundaries, or graph-backed workspace summaries.
17. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` when the task concerns multiple accounts, source independence, convergence/divergence, temporal reasoning, alternate event sequences, transparent calculations, literary structure proposals, reconstructions, possibilities, evidence density, expert-material contribution, or AI-assisted rendering boundaries.
18. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` when the task concerns Study Workspace orchestration, saved investigations, research trails, boards, collections, notebooks, bookmarks, synchronized timeline workspaces, map workspaces, visualization workspace, presentation mode, exports, collaboration, or saved calculations.
19. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` when the task concerns runtime layering, service boundaries, processing order, conceptual service contracts, AI/calculation/rendering services, persistence, logging, diagnostics, extensibility, caching, dependency tracking, or background indexing.
20. Relevant task-specific architecture docs.

### Recommended Reading Order For Reviewers

1. `PROJECT_STATE.md`
2. `MASTER_DESIGN.md`
3. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
4. `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
5. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
6. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
7. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` for workspace, research-flow, notes, saved-study, or evidence-drilldown tasks.
8. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md` for lens, perspective comparison, convergence, divergence, or lens-profile tasks.
9. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` for canonical Observation, Evidence Basis, Research Gap, Situational Completeness, or observation review tasks.
10. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` for Evidence Graph, Knowledge Object lifecycle, lineage, convergence, dependency, merge, split, supersession, rendering-boundary, or persistent-question tasks.
11. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` for convergence, source dependency, temporal reasoning, calculations, reconstructions, possibility, evidence density, and rendering-hook review.
12. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` for workspace, investigation, research-trail, collection, board, notebook, presentation, export, collaboration, and saved-calculation review.
13. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` for runtime layer, service boundary, processing pipeline, persistence, diagnostics, AI service, calculation service, rendering service, and extensibility review.
14. Task-specific architecture doc.
15. Relevant source files.
16. QA report and activity log.

## 10. Feature Placement Checklist

Before adding a new feature, identify:

- Which ontology layer owns it?
- Which primary or nearer evidence layers does it consume?
- Which primary evidence records must it preserve?
- What source scope does it apply to?
- What inference level does it claim?
- What evidence does it expose?
- What provenance does it carry?
- Which presentation modules consume it?
- What is forbidden for this feature?

If those answers are unclear, design first and implement later.
