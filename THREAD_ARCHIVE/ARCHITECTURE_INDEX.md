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
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`

## 3. Semantic Architecture

Semantic architecture defines the records that I.C.E. creates and how records may be promoted.

Primary documents:

- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`

Responsibilities:

- Define ontology layer order.
- Define canonical record shapes.
- Define entity classes.
- Define relationship classes.
- Define truth/status classes.
- Define promotion criteria.
- Define prohibited promotions.
- Preserve source scope, evidence, confidence, provenance, and inference level.

Semantic architecture owns:

- Entity type classification
- Relationship type classification
- Event classification
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
- Comparative evidence collections
- Evidence convergence metrics
- Possible similitude discovery
- Prior / Current / Future relationships
- Common Ground / Difference future lenses
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
- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`

Included systems:

- Study View
- Editor / Architect View
- Study Modules
- View Lens
- Future Lenses
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

Presentation architecture owns:

- Display wording
- Card ordering
- Collapsed/expanded sections
- User-selectable view modules
- Technical vs user-facing grouping
- Evidence/provenance disclosure placement

Presentation architecture does not own:

- Source truth
- Context truth
- Semantic record mutation
- Queue execution
- Storage writes except presentation preferences

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
3. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
4. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
5. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
6. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
7. `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
8. `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
9. `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
10. `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`
11. `PROJECT_STATE.md`
12. `PROJECT_LOG.md`

### Recommended Reading Order For New AI Agents

1. `PROJECT_STATE.md`
2. `PROJECT_LOG.md`
3. `THREAD_ARCHIVE/AGENT_ACTIVITY_LOG.md`
4. `THREAD_ARCHIVE/AGENT_OUTBOX.md`
5. `MASTER_DESIGN.md`
6. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
7. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
8. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
9. `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
10. `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
11. Relevant task-specific architecture docs.

### Recommended Reading Order For Reviewers

1. `PROJECT_STATE.md`
2. `MASTER_DESIGN.md`
3. `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md`
4. `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`
5. `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`
6. Task-specific architecture doc.
7. Relevant source files.
8. QA report and activity log.

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
