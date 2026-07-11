# Semantic Ontology Backbone Architecture

Purpose: define the canonical ontology contract that future I.C.E. backend evaluation systems and frontend presentation modules should consume.

This document is architecture only. It does not implement new runtime behavior.

Constitutional reference: `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` defines the non-negotiable trust, evidence, authority, ontology, provenance, explainability, verification, scope, and operational rules that govern this ontology backbone.

## Why This Exists

I.C.E. now contains or plans many interconnected systems:

- Context Lock
- Meaning Staging
- Entity Classification
- Relationship Classification
- Automatic Discovery
- Theme Discovery
- Literary Structure Detection
- Fulfillment Detection
- Perspective Models
- Translation Models
- Language Adapters
- Cross-Reference Relationships
- Prior / Current / Future Relationships
- Study Lenses
- Editor / Architect View

Without a shared ontology, these systems can drift. The ontology backbone is the contract between backend precision and frontend clarity.

## Core Principle

Primary evidence remains authoritative.

Derived layers may depend on primary layers.

Derived layers may never rewrite primary evidence or nearer evidence layers.

Greater semantic distance requires stronger provenance, clearer confidence labeling, and visible inference boundaries.

This extends the existing Context Lock philosophy:

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

## Evidence Distance Model

I.C.E. describes ontology records by evidence distance rather than value hierarchy. A record farther from the source is not less useful, but it must carry clearer provenance and confidence labeling.

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

Rules:

- Primary evidence remains authoritative.
- Derived records may depend on primary records.
- Greater semantic distance requires stronger provenance.
- Presentation may simplify but may not rewrite evidence.
- Lenses consume ontology; lenses do not create ontology.
- Meaning may expand with distance, but source context remains locked.
- If an ontology, adapter, perspective, expert model, or lens conflicts with `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md`, the conflict must remain visible and may not become authoritative until resolved.

## Ontology Layer Order

### 1. Source Layer

Immutable source record.

Contains:

- Source text
- Source reference
- Source URL
- Source adapter
- Translation
- Capture metadata
- Provenance

Rules:

- Source text is immutable.
- Source reference is immutable for the record.
- Later layers may quote, cite, summarize, or relate source text, but may not alter it.

### 2. Language Layer

Language and grammar observations over the source.

Contains:

- Tokens
- Lemma
- Morphology
- Part of speech
- Grammatical role
- Syntax
- Quotation boundaries
- Commands
- Questions
- Comparisons
- Conditionals
- Translation alignment

Rules:

- Language supports Source.
- Language does not rewrite Source.
- Original-language or grammar observations may illuminate a translation but may not silently replace the selected source text.

### 3. Context Layer

Context Lock and source situation.

Contains:

- Speaker
- Audience
- Authority
- Messenger
- Recipient
- Participants
- Location
- Time
- Narrative frame
- Source situation

Rules:

- Context is built from Source and Language.
- Context does not rewrite Language.
- Later layers may depend on Context but may not redefine it.

### 4. Entity Layer

Grounded entity classification.

Contains:

- Entity id
- Entity label
- Entity type
- Entity truth/status classification
- Entity role
- Confidence / Analysis Support
- Evidence
- Provenance

Rules:

- Entities depend on Source, Language, and Context.
- Entities do not rewrite Context.
- Locations remain locations.
- Actors remain actors.
- Objects remain objects.
- Symbols remain symbols unless source context establishes otherwise.
- Claimed divine status does not become established divine authority.

### 5. Event Layer

Grounded event and information-record classification.

Contains:

- Event id
- Event type
- Narrative type
- Participants
- Locations
- Sequence
- Causes
- Outcomes
- Source reference
- Evidence
- Provenance

Rules:

- Events depend on Source, Context, and Entity records.
- Events do not rewrite Entity identity or Context roles.
- Lineage records, identity statements, fulfillment statements, teachings, healings, movements, and dialogue records must remain distinguishable.

### 6. Relationship Layer

Connections between grounded records.

Contains:

- Relationship id
- Relationship type
- Relationship direction
- Source record
- Target record
- Source scope
- Target scope
- Evidence
- Inference level
- Confidence / Analysis Support
- Provenance

Rules:

- Relationships depend on Entities, Events, Context, and Source.
- Relationships do not rewrite Entities.
- Messenger / recipient, speaker / audience, prophecy / fulfillment, command / response, cause / effect, family / lineage, movement, and location relationships must preserve direction.

### 7. Theme Layer

Grouped current-scope or broad-scope study themes.

Contains:

- Theme id
- Theme label
- Theme type
- Evidence
- Supporting records
- Related entities
- Related events
- Related relationships
- Confidence / Analysis Support
- Provenance

Rules:

- Themes depend on primary relationship, event, entity, context, and source records.
- Themes do not rewrite Relationships.
- Themes summarize support; they do not invent doctrine.

### 8. Literary Layer

Literary, structural, and genre observations.

Contains:

- Parallelism
- Chiasmus
- Inclusio
- Repetition
- Contrast
- Progression
- Genre
- Narrative structure
- Poetic structure
- Prophetic structure
- Confidence
- Evidence
- Provenance

Rules:

- Literary structures are evidence, not proof.
- Literary observations may support themes and discovery, but may not rewrite source, context, entity, or relationship records.

### 9. Discovery Layer

Automatic discovery and larger study synthesis.

Contains:

- Continuity
- Development
- Fulfillment
- Comparison
- Common ground
- Differences
- Prior / Current / Future relationships
- Repeated patterns
- Principle recurrence
- Practice development
- Confidence
- Evidence
- Provenance

Rules:

- Discovery depends on primary and nearer evidence ontology records.
- Discovery does not rewrite Literary, Theme, Relationship, Event, Entity, Context, Language, or Source layers.
- Inferred, possible, typological, tradition-recognized, and projected relationships must remain visibly labeled.

### 10. Perspective Layer

Model-specific or tradition-specific perspective records.

Contains:

- Translation model
- Grammar model
- Lexicon model
- Expert source model
- Canonical model
- Tradition model
- Surface translation model
- Original language model
- Comparison model
- Evidence
- Confidence
- Provenance

Rules:

- Perspectives compare observations.
- Perspectives do not rewrite Themes.
- Tradition-specific applications remain attributed.
- Expert or tradition perspectives may illuminate but may not silently replace source-grounded records.

### 11. Presentation Layer

Frontend views and lenses.

Consumes ontology records and generates:

- Study View
- Editor / Architect View
- Character Lens
- Entity Lens
- Location Lens
- Event Lens
- Timeline Lens
- Relationship Lens
- Theme Lens
- Journey Lens
- Translation Lens
- Fulfillment Lens
- Confidence Lens
- Evidence Lens
- Interreligious Lens
- Prior / Current / Future Lens

Rules:

- Presentation consumes ontology records.
- Presentation does not rewrite Evidence.
- View selection must not mutate extraction, storage, scope, queue state, Context Lock, Meaning Staging, or semantic records.
- Hidden modules remain prepared and available.

## Dependency Rules

The dependency order is strict:

```text
Source is the base.
Language depends on Source.
Context depends on Source and Language.
Entities depend on Source, Language, and Context.
Events depend on Source, Context, and Entities.
Relationships depend on Entities and Events.
Themes depend on Relationships and supporting primary evidence records.
Literary observations depend on Source, Language, and Context.
Discovery depends on all nearer grounded layers.
Perspectives compare nearer evidence observations.
Presentation displays selected ontology records.
```

## Trust Rules

- Language does not rewrite Source.
- Context does not rewrite Language.
- Entities do not rewrite Context.
- Events do not rewrite Entities.
- Relationships do not rewrite Entities.
- Themes do not rewrite Relationships.
- Literary structures do not rewrite Source or Context.
- Discovery does not rewrite primary grounded records.
- Perspectives do not rewrite Themes.
- Presentation does not rewrite Evidence.
- Broad-scope summaries may summarize narrow records but may not redefine them.
- Later passages may illuminate earlier passages but may not redefine earlier source context.
- Possible meaning remains possible.
- Participant claims remain participant claims.
- Tradition-specific interpretation remains attributed.

## Relationship To Existing Architecture

This backbone should be read with:

- `THREAD_ARCHIVE/FULL_CONTEXT_EVALUATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/SEMANTIC_PROMOTION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/AUTOMATIC_DISCOVERY_EXPANSION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/MODULAR_STUDY_PRESENTATION_ARCHITECTURE.md`

The ontology backbone provides the shared layer order. The linked documents provide the detailed rules for promotion, classification, automatic discovery, and presentation modules.

## Future Contributor Guidance

Before adding a new semantic layer, a contributor should answer:

- Which ontology layer does this belong to?
- Which primary or nearer evidence layers does it depend on?
- What primary evidence values must it preserve?
- What evidence and provenance does it carry?
- What inference level does it claim?
- What scope does it apply to?
- What is explicitly forbidden for this layer?
- Which frontend views consume it?

If a new feature cannot answer those questions, it should remain an experiment rather than a canonical I.C.E. semantic layer.
