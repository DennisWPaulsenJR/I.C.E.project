# I.C.E. Architecture Index And Dependency Map

Purpose: provide a single map of the major I.C.E. architecture documents, their responsibilities, their authority level, and the dependency order future contributors should follow.

This document is architecture guidance only. It does not implement runtime behavior.

## 1. Core Constitutional Documents

### `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md`

Authority level: governing constitutional rules for future architecture and implementation work.

Purpose: consolidate I.C.E.'s governing principles for evidence handling, observations, provenance, interpretation, Knowledge Objects, convergence, temporal/geographic reasoning, calculations, lenses, reconstructions, visualization, AI assistance, research workflow, automation/action boundaries, evolution, compatibility, and constitutional review tests.

Use this after `MASTER_DESIGN.md` and before adding or reviewing any feature that creates, promotes, presents, verifies, interprets, visualizes, exports, automates from, or acts upon evidence-linked records.

### `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`

Authority level: historical constitutional architecture.

Purpose: preserve the original Constitution v1.0 trust, evidence, authority, ontology, provenance, explainability, verification, scope, and operational rules.

Current note: `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md` supersedes V1 for future work. V1 remains retained for historical traceability.

### `MASTER_DESIGN.md`

Authority level: first-read reconstructed master design overview.

Purpose: define the global product vision, architectural direction, target user experience, major subsystems, frontend/backend relationship, and long-term system philosophy.

Current note: `MASTER_DESIGN.md` is reconstructed, not restored. `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md` controls non-negotiable trust and governance rules if the two documents conflict.

### `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md`

Authority level: Architecture Version 1.0 baseline declaration.

Purpose: declare the approved Architecture Baseline Version 1.0, list baseline documents, identify I.C.E. as an Evidence-Centered Research Platform, distinguish architecture from implemented capability, define change governance, and point implementation work to `IMPLEMENTATION_MANIFEST.md` and `ICE-RUN-0001`.

Use this to determine whether a future task is inside the approved baseline, departs from it, or requires architecture review before runtime implementation.

### `IMPLEMENTATION_MANIFEST.md`

Authority level: implementation roadmap and phase governance.

Purpose: define the ordered implementation program, current runtime baseline, phase sequence, phase definitions, cross-cutting requirements, task naming convention, GPT Review Gate report standard, and first recommended implementation-adjacent task.

Use this before starting runtime work. It recommends `ICE-RUN-0001 - Current Runtime Contract and Compatibility Inventory` before `ICE-OBS-0002`.

### `THREAD_ARCHIVE/ALIGN_PLATFORM_VISION.md`

Authority level: first-class adjacent platform vision.

Purpose: establish ALIGN - Adaptive Living Intelligence & Guidance Network - as the human-centered coordination and guidance platform in the broader ecosystem, beginning with Family and remaining portable to education, sports, teams, business, healthcare, community organizations, government, military, volunteer groups, and future domains.

Use this when evaluating whether proposed ALIGN work fits the platform mission, first deployment target, future domain portability, relationship to I.C.E., and relationship to P.A.S.S. This document does not implement runtime behavior, UI, APIs, databases, automation, or storage authority.

### `THREAD_ARCHIVE/ALIGN_ARCHITECTURE.md`

Authority level: adjacent platform architecture.

Purpose: define ALIGN's domain-neutral architecture, ecosystem hierarchy, domain model, and cooperating engine responsibilities for goals, relationships, coordination, communication, teaching, mitigation, safety, health, automation, permissions, policy, GPT checks, and I.C.E. integration.

Use this before designing ALIGN modules, domain policies, engine contracts, or future coordination workflows. It documents responsibilities only and does not implement runtime behavior.

### `THREAD_ARCHIVE/ALIGN_CONSTITUTION.md`

Authority level: ALIGN constitutional principles.

Purpose: define ALIGN's non-negotiable platform principles: technology serves people, truth precedes action, evidence precedes recommendation, trust precedes automation, goals are user-defined, consent and minimum disclosure are required, human authority remains final, and automation remains reversible.

Use this before any future ALIGN architecture or implementation task that produces recommendations, coordinates people, handles permissions, discloses information, automates actions, or integrates with I.C.E. or P.A.S.S.

### `THREAD_ARCHIVE/ALIGN_PLATFORM_ROADMAP.md`

Authority level: adjacent platform domain roadmap.

Purpose: define the intended ALIGN expansion order from Family through Education, Sports, Business, Healthcare, Community, Government, and later domain modules while preserving one stable core architecture.

Use this when planning domain sequencing. It is roadmap guidance only and does not authorize implementation.

### `THREAD_ARCHIVE/ALIGN_TERMINOLOGY.md`

Authority level: adjacent platform vocabulary.

Purpose: define official ALIGN naming, acronym, domain-model vocabulary, engine terminology, I.C.E. relationship, P.A.S.S. boundary language, and prohibited terminology drift.

Use this to keep future ALIGN architecture and task drafting consistent.

### `THREAD_ARCHIVE/ALIGN_EARLY_DETECTION_ARCHITECTURE.md`

Authority level: future ALIGN early-detection architecture.

Purpose: define early detection as meaningful change relative to an authorized expectation, goal, pattern, responsibility, safety policy, device state, location expectation, maintenance requirement, communications pattern, or confirmed baseline while preserving the rules that deviation is not guilt and a signal is not a conclusion.

Use this before designing ALIGN drift detection, anomaly presentation, baseline correction, non-punitive mitigation, or early-warning workflows. It does not implement runtime behavior, device integration, scoring, automation, or escalation.

### `THREAD_ARCHIVE/ALIGN_SITUATIONAL_AWARENESS_MODEL.md`

Authority level: future ALIGN situational-awareness architecture.

Purpose: define situational awareness as organized understanding of who, what, where, when, expected condition, observed condition, goal, risk, alternatives, and authorized response, with location treated as one contextual signal rather than a conclusion.

Use this before designing awareness summaries, contextual signal handling, alternative explanation review, or policy/human review surfaces.

### `THREAD_ARCHIVE/ALIGN_IOT_AND_DEVICE_INTEGRATION_ARCHITECTURE.md`

Authority level: future ALIGN device-boundary architecture.

Purpose: define authorized IoT/device signal roles, device trust dimensions, failure modes, and the rule that evidence-producing devices do not automatically become action endpoints.

Use this before any future BLE, cellular, Wi-Fi, phone, watch, vehicle, sensor, safety-device, P.A.S.S., or other device integration proposal. It does not authorize integration.

### `THREAD_ARCHIVE/ALIGN_CONTROLLED_ESCALATION_FRAMEWORK.md`

Authority level: future ALIGN escalation-governance architecture.

Purpose: define proportionate escalation stages from record-only through private confirmation, supportive reminder, authorized coordinator notification, human review, safety policy activation, and emergency escalation.

Use this before designing notifications, reminders, coordinator alerts, safety-policy activation, GPT Check Layer review, or minimum-disclosure escalation behavior.

### `THREAD_ARCHIVE/ALIGN_PASS_INTEGRATION_BOUNDARY.md`

Authority level: future ALIGN/P.A.S.S. integration boundary.

Purpose: define how ALIGN may receive authorized safety and status information from P.A.S.S. without assuming direct control over a P.A.S.S. device, firearm, physical authorization mechanism, or specialized safety function.

Use this before any future P.A.S.S. coordination task. P.A.S.S. retains safety-critical physical responsibility; ALIGN supports context, communication, coordination, and escalation management only.

### `THREAD_ARCHIVE/ALIGN_SIGNAL_CONFIDENCE_AND_ANOMALY_MODEL.md`

Authority level: future ALIGN signal-confidence architecture.

Purpose: define signal categories, anomaly progression, confidence levels, required assessment fields, source reliability factors, and prohibited collapses such as anomaly into guilt, location into intent, or model suspicion into fact.

Use this before designing signal confidence, anomaly, concern, confirmed-condition, recommendation, action, or audit presentation models.

### `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`

Authority level: foundational mission philosophy.

Purpose: define why I.C.E. exists, how it should relate to human agency, discovery, transparency, model independence, knowledge architecture, historical integrity, progressive capability, and AI reasoning services.

Use this with `MASTER_DESIGN.md` when evaluating product direction or proposed capabilities. It is mission-level guidance and does not override `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`.

### `THREAD_ARCHIVE/EXALTATION_INTERNAL_CODE_AND_LANGUAGE_COMPLIANCE_BOUNDARY.md`

Authority level: future Exaltation compliance boundary.

Purpose: define how The Exaltation may govern and evaluate human-readable language inside the I.C.E. repository while preserving executable semantics, machine contracts, storage keys, APIs, identifiers, and runtime stability.

Use this when evaluating source-language compliance, presentation-language compliance, documentation wording, code-vs-language semantics, and future source-comprehension reviews. It does not authorize blind source transformation, runtime mutation, storage changes, or repository-wide mechanical renaming.

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

### `THREAD_ARCHIVE/ICE_CONTEXT_RESOLUTION_ARCHITECTURE.md`

Authority level: future I.C.E. context-resolution architecture.

Purpose: define Context Resolution as the process of organizing evidence into an understandable description of the current situation without asserting unsupported conclusions.

Use this before designing context resolution, Difference Engine behavior, competing explanations, unknown tracking, or consumer-facing situation summaries. It does not implement runtime behavior, services, APIs, schemas, UI, storage, or code.

### `THREAD_ARCHIVE/ICE_SITUATIONAL_UNDERSTANDING_MODEL.md`

Authority level: future I.C.E. situational-understanding architecture.

Purpose: define situational understanding as the organized explanation of who, what, where, when, expected condition, observed condition, difference, known causes, unknowns, confidence, alternative explanations, required evidence, and possible next questions.

Use this before designing Situation Objects, situation summaries, consumer suitability, evidence freshness, or context explanation surfaces.

### `THREAD_ARCHIVE/ICE_STATE_MODEL.md`

Authority level: future I.C.E. state-model architecture.

Purpose: define descriptive states such as Observed State, Expected State, Historical State, Declared State, Authorized State, Unknown State, Transition State, Derived State, and Contextual State.

Use this before designing state records, state comparisons, baseline handling, transition descriptions, or state-derived context views. States are descriptive and are not judgments.

### `THREAD_ARCHIVE/ICE_CONTEXT_SERVICE_SPECIFICATION.md`

Authority level: future I.C.E. context-service boundary.

Purpose: define the conceptual Context Service as a future boundary that may answer evidence-centered questions such as what is happening, what changed, what evidence supports this, what remains uncertain, what competing explanations exist, and how confident the assessment is.

Use this before proposing Context Service runtime contracts. It is not an API, schema, or service implementation.

### `THREAD_ARCHIVE/ICE_EVALUATION_RELIABILITY_ARCHITECTURE.md`

Authority level: future I.C.E. evaluation-reliability architecture.

Purpose: define how I.C.E. describes the quality, completeness, reliability, reproducibility, and limits of its own evaluations.

Use this before designing evaluation reports, self-evaluation, reproducibility traces, correction workflows, or reliability summaries. It does not implement runtime behavior, schemas, APIs, databases, UI, or code.

### `THREAD_ARCHIVE/ICE_CONFIDENCE_CALIBRATION_MODEL.md`

Authority level: future I.C.E. confidence-calibration architecture.

Purpose: define conceptual confidence levels such as Observed, Verified, Supported, Probable, Emerging, Unknown, Insufficient Evidence, and Conflicting Evidence.

Use this before designing confidence labels, confidence explanations, limitation-aware confidence reduction, or consumer-facing confidence presentation.

### `THREAD_ARCHIVE/ICE_EVALUATION_COVERAGE_MODEL.md`

Authority level: future I.C.E. evaluation-coverage architecture.

Purpose: define how I.C.E. reports artifacts inspected, available and unavailable evidence, executed and unavailable analyses, excluded scope, temporal/version/environmental coverage, and completeness levels.

Use this before designing coverage reports or evaluation completeness indicators.

### `THREAD_ARCHIVE/ICE_CAPABILITY_BOUNDARY_ARCHITECTURE.md`

Authority level: future I.C.E. capability-boundary architecture.

Purpose: define how I.C.E. communicates what it could evaluate, what it could not evaluate, what assumptions were required, what constraints existed, what permissions were unavailable, and what evidence could not be verified.

Use this before designing capability statements, limitation reporting, or consumer handoff boundaries.

### `THREAD_ARCHIVE/ICE_TRUST_AND_LIMITATIONS_MODEL.md`

Authority level: future I.C.E. trust and limitation architecture.

Purpose: define trust dimensions such as Evidence Trust, Source Trust, Process Trust, Evaluation Trust, Transparency, Explainability, Correction History, Revision History, and Human Review.

Use this before designing trust statements, limitation displays, correction history, revision history, or consumer-facing trust summaries.

### `THREAD_ARCHIVE/ICE_RUNTIME_COMPONENT_ARCHITECTURE.md`

Authority level: future I.C.E. runtime component blueprint.

Purpose: translate existing constitutional, evidence, context, confidence, coverage, capability, trust, correction, audit, extension, and consumer-boundary decisions into stable conceptual component classes and responsibilities.

Use this before proposing runtime modules or service decomposition. It does not select a language, framework, database, broker, deployment platform, API style, schema, source code, queue, service, storage, or UI.

### `THREAD_ARCHIVE/ICE_COMPONENT_RESPONSIBILITY_CATALOG.md`

Authority level: future I.C.E. component ownership catalog.

Purpose: define what each major component owns, does not own, consumes, produces, depends on, exposes, preserves, and must do when failure, unknowns, or corrections occur.

Use this before assigning ownership to any future implementation component or extension.

### `THREAD_ARCHIVE/ICE_SERVICE_CONTRACT_MODEL.md`

Authority level: future I.C.E. conceptual service-contract architecture.

Purpose: define conceptual preservation contracts between components, including Observation, Evidence, Provenance, Chronology, Context, State, Situation, Difference, Competing Explanation, Confidence, Coverage, Capability Boundary, Limitation, Correction, Audit, Consumer, and Extension contracts.

Use this before designing actual service contracts. It intentionally does not define URLs, REST, GraphQL, RPC, protocol buffers, JSON structures, database schemas, method signatures, framework interfaces, APIs, or services.

### `THREAD_ARCHIVE/ICE_DEPENDENCY_AND_EXECUTION_GRAPH.md`

Authority level: future I.C.E. dependency and lifecycle architecture.

Purpose: define allowed conceptual dependency direction, execution lifecycle, feedback paths, failure categories, and prohibited dependency patterns.

Use this before designing dependency graphs, lifecycle handling, reevaluation, corrections, stale evaluations, consumer projections, or failure behavior.

### `THREAD_ARCHIVE/ICE_EXTENSION_FRAMEWORK_ARCHITECTURE.md`

Authority level: future I.C.E. extension architecture.

Purpose: define how future source connectors, parsers, domain vocabularies, domain evidence evaluators, domain context resolvers, domain comparison models, domain presentation adapters, and consumer adapters may extend I.C.E. without weakening constitutional guarantees.

Use this before designing extensions for software engineering, DevOps, organizational evaluation, research, manufacturing, education, healthcare coordination, emergency management, logistics, family systems, ALIGN, P.A.S.S., or future domains.

### `THREAD_ARCHIVE/ICE_CONSUMER_INTEGRATION_BOUNDARY.md`

Authority level: future I.C.E. consumer-boundary architecture.

Purpose: define what consumers such as ALIGN, P.A.S.S., engineering review systems, organizational dashboards, research tools, human analysts, and future authorized systems may receive from I.C.E. and what they may not assume.

Use this before designing consumer handoffs, dashboards, integrations, or downstream projections.

### `docs/architecture/ICE_PHASE1_ARCHITECTURE_INDEX.md`

Authority level: Phase I consolidation index.

Purpose: provide a master index of approved Phase I architecture documents by major domain, purpose, dependency, and architectural layer.

Use this as the current consolidation entry point before Phase II review, inventory, or implementation planning.

### `docs/architecture/ICE_ARCHITECTURE_GLOSSARY.md`

Authority level: Phase I terminology consolidation.

Purpose: define canonical terms including Evidence, Provenance, Identity, Context, Situation, State, Confidence, Reliability, Explanation, Constitutional Principle, Rule, Consumer, and Extension.

Use this to keep future task drafting and review terminology consistent.

### `docs/architecture/ICE_ARCHITECTURE_DEPENDENCY_MAP.md`

Authority level: Phase I conceptual dependency map.

Purpose: map how approved architecture documents relate to one another without creating implementation dependencies.

Use this when checking whether a proposed change preserves evidence/context/confidence/reliability/consumer dependency direction.

### `docs/architecture/ICE_PHASE1_COMPLETENESS_REPORT.md`

Authority level: Phase I completeness assessment.

Purpose: assess completed architecture domains, remaining conceptual gaps, Phase II candidates, implementation readiness, risks, and future priorities.

Use this before starting Phase II or runtime-adjacent work. It recommends inventory and compatibility review before feature implementation.

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
- `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md`
- `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md`
- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`
- `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`
- `IMPLEMENTATION_MANIFEST.md`
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
4. `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md`
5. `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md`
6. `IMPLEMENTATION_MANIFEST.md`
7. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
8. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
9. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
10. `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
11. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md`
12. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md`
13. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md`
14. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`
15. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`
16. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`
17. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md`
18. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md`
19. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` for historical constitutional context when needed.
20. `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
21. `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
22. `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`
23. `PROJECT_STATE.md`
24. `PROJECT_LOG.md`

### Recommended Reading Order For New AI Agents

1. `PROJECT_STATE.md`
2. `PROJECT_LOG.md`
3. `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
4. `THREAD_ARCHIVE/AGENT_OUTBOX.md`
5. `MASTER_DESIGN.md`
6. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
7. `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
8. `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md`
9. `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md`
10. `IMPLEMENTATION_MANIFEST.md`
11. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
12. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
13. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
14. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md` when the task concerns persistent objects, profiles, identity, characteristics, or source integration.
15. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` when the task concerns workspace surfaces, research workflows, notes, saved studies, evidence drilldowns, or presentation modes.
16. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md` when the task concerns lenses, perspective presentation, concurrent lens evaluation, lens convergence, divergence, or lens profiles.
17. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` when the task concerns canonical observations, Evidence Basis, Research Gap Engine, Situational Completeness, canonical observation runtime normalization, or observation review boundaries.
18. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` when the task concerns Evidence Graph identity, Knowledge Object lifecycle, object lineage, merge/split/supersession, convergence, dependency relationships, persistent questions, rendering boundaries, or graph-backed workspace summaries.
19. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` when the task concerns multiple accounts, source independence, convergence/divergence, temporal reasoning, alternate event sequences, transparent calculations, literary structure proposals, reconstructions, possibilities, evidence density, expert-material contribution, or AI-assisted rendering boundaries.
20. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` when the task concerns Study Workspace orchestration, saved investigations, research trails, boards, collections, notebooks, bookmarks, synchronized timeline workspaces, map workspaces, visualization workspace, presentation mode, exports, collaboration, or saved calculations.
21. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` when the task concerns runtime layering, service boundaries, processing order, conceptual service contracts, AI/calculation/rendering services, persistence, logging, diagnostics, extensibility, caching, dependency tracking, or background indexing.
22. Relevant task-specific architecture docs.

### Recommended Reading Order For Reviewers

1. `PROJECT_STATE.md`
2. `MASTER_DESIGN.md`
3. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
4. `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`
5. `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md`
6. `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md`
7. `IMPLEMENTATION_MANIFEST.md`
8. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
9. `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` for workspace, research-flow, notes, saved-study, or evidence-drilldown tasks.
10. `THREAD_ARCHIVE/LENS_ARCHITECTURE.md` for lens, perspective comparison, convergence, divergence, or lens-profile tasks.
11. `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` for canonical Observation, Evidence Basis, Research Gap, Situational Completeness, or observation review tasks.
12. `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` for Evidence Graph, Knowledge Object lifecycle, lineage, convergence, dependency, merge, split, supersession, rendering-boundary, or persistent-question tasks.
13. `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` for convergence, source dependency, temporal reasoning, calculations, reconstructions, possibility, evidence density, and rendering-hook review.
14. `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` for workspace, investigation, research-trail, collection, board, notebook, presentation, export, collaboration, and saved-calculation review.
15. `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` for runtime layer, service boundary, processing pipeline, persistence, diagnostics, AI service, calculation service, rendering service, and extensibility review.
16. Task-specific architecture doc.
17. Relevant source files.
18. QA report and activity log.

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
