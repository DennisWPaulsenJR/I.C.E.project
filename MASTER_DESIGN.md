# I.C.E. Master Design

Reconstructed from durable I.C.E. architecture and coordination documents after repository history confirmed that no tracked historical MASTER_DESIGN.md copy exists.

This is a reconstruction, not a restoration. It must not be treated as the original historical `MASTER_DESIGN.md`.

Purpose: serve as the first-read architectural overview for I.C.E. It explains mission, direction, system layers, trust model, major subsystems, frontend/backend relationship, and future vision.

`THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` governs the non-negotiable trust and governance rules. If this Master Design and the Constitution conflict, the Constitution controls.

## 1. Document Status And Reconstruction Notice

This document was reconstructed from durable I.C.E. architecture and coordination records, including:

- `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
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

## 7. Language Architecture

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

## 8. Entity And Ontology Architecture

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

## 9. Events, Timelines, Scenes, And Relationships

Events are promoted only from grounded source evidence, accepted ordered events, explicit source sequence, explicit context, and source references.

Timeline records summarize source order. They may not infer missing chronology, reorder source events, or create implied events.

Scene records summarize explicit context. They may not create actors, locations, audience, authority, or chronology.

Relationships connect grounded records. Low-risk relationships include authority, speaker/audience, messenger/recipient, actor/location, event/location, sequence, teacher/audience, parent/child, lineage, and source narrator/narrated event. Medium-risk relationships such as prophecy/fulfillment, command/response, request/response, healing agent/recipient, and opposition/conflict require explicit support.

Relationships may summarize primary and nearer records. They may not rewrite context, create actors, create locations, infer motives, or invent fulfillment.

## 10. Themes, Literary Structures, Fulfillment, And Discovery

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

## 11. Registry Architecture

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

Ontology Registry defines classification categories and hierarchy boundaries.

Authority Registry defines what can inform what, what cannot override what, and where authority must remain limited.

## 12. Architecture Observability

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

## 13. Frontend And Backend Separation

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

## 14. Operational Boundaries

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

## 15. Future Vision

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
