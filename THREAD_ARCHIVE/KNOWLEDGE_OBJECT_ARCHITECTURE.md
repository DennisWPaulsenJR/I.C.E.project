# Knowledge Object Architecture

Task ID: ICE-ARCH-0003

Status: Directional / Future Architecture

Implementation Status: Not Implemented

Runtime Impact: None

Purpose: define the long-term architecture for persistent Knowledge Objects, with Character Profiles as the first detailed application.

This document is documentation and architecture only. It does not implement runtime behavior, parsers, ingestion, storage, graph generation, Study View changes, crawling, queues, semantic extraction, or confidence scoring.

## 1. Purpose

A Knowledge Object is a persistent semantic representation of an identifiable person, place, event, concept, title, name, teaching, covenant, prophecy, document, or other supported entity.

Knowledge Objects grow through traceable evidence rather than manual narrative authorship.

Knowledge Objects are living semantic representations that grow through evaluated evidence. Every characteristic, relationship, event, attribute, and conclusion remains traceable to its source, supporting observations, confidence profile, and review state.

I.C.E. evaluates, processes, extracts, classifies, compares, associates, qualifies, records, preserves, and presents information. I.C.E. does not think, believe, intend, know in the human sense, or possess organic cognition.

## 2. Knowledge Object Categories

Initial Knowledge Object categories include:

- Person
- Place
- Event
- Document
- Name
- Title
- Concept
- Teaching
- Command
- Covenant
- Promise
- Prophecy
- Symbol
- Language term
- Organization
- Historical period
- Geographic feature
- Source collection

This list is extensible. New categories may be proposed through the governed schema-evolution process established in `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md`: detect representational gap, propose semantic structure, justify necessity, review, approve, register, implement, and document.

## 3. Character Profile Architecture

A Character Profile is a specialized Person Knowledge Object composed of evidence-linked dimensions. It is not a manually authored biography and not an AI-generated summary presented as fact.

Potential Character Profile dimensions include:

- Identity
- Name forms and variants
- Name meanings and semantic components
- Titles
- Roles
- Genealogy
- Chronology
- Locations
- Journeys
- Events
- Relationships
- Associations
- Statements
- Teachings
- Questions asked
- Commands received
- Commands given
- Promises received
- Prophecies given
- Prophecies concerning the person
- Covenants
- Witnessed events
- Actions
- Behaviors
- Characteristic candidates
- Leadership activity
- Trials
- Conflicts
- Failures
- Repentance or change
- Service
- Authority claims
- Divine attribution claims
- Recorded revelation claims
- Languages
- Documents authored
- Documents attributed
- Documents mentioning the person
- Conference references
- Historical references
- Joseph Smith Papers references
- Lexical references
- Open questions
- Competing interpretations
- Contradictory identity claims
- Confidence profile
- Coverage profile
- Source provenance
- Review history

Not every profile will contain every dimension. Absence of data must not be converted into a negative characteristic.

## 4. Characteristic Accumulation

Governed path from explicit material to a profile characteristic:

```text
Source record
-> Explicit observation
-> Action or behavior classification
-> Repeated or materially significant pattern
-> Characteristic candidate
-> Supporting and conflicting evidence
-> Confidence evaluation
-> Review state
-> Profile presentation
```

A characteristic must never be created solely because a language model proposes an adjective.

Each characteristic candidate must retain:

- exact supporting observations
- source spans
- event and historical context
- frequency where meaningful
- contextual variation
- potentially conflicting observations
- whether the characteristic is explicit or inferred
- derivation rule or model contribution
- confidence dimensions
- review status
- creation and revision history

Illustrative architecture examples include leadership, questioning, obedience, impulsive action, testimony, service, and opposition. These examples are category examples only; they do not establish facts about any particular person unless verified records support them.

## 5. Explicit Characteristics Versus Derived Characteristics

Characteristic classifications must remain visible and may not be flattened into one undifferentiated profile field.

### Explicit Characteristic

A source directly describes the person using a characteristic or equivalent proposition.

### Behavior-Derived Characteristic

I.C.E. identifies a characteristic candidate from one or more actions or behavioral patterns.

### Traditionally Attributed Characteristic

A source or interpretive tradition assigns the characteristic.

### Model-Proposed Characteristic

An external model proposes the characteristic for evaluation.

### User-Proposed Characteristic

A user submits the characteristic as a research candidate.

## 6. Source Integration

A Knowledge Object can accumulate material from multiple collections while preserving source identity.

Potential source collections include:

- Canonical Scripture
- Official Church publications
- General Conference Talks
- Joseph Smith Papers
- Historical documents
- Journals and correspondence
- Biographical records
- Lexicons and concordances
- Linguistic resources
- Geographic and archaeological sources
- Encyclopedic sources
- Scholarly publications
- Government and public datasets
- User-submitted documents
- AI-generated candidate analyses

Source integration does not erase source classification, authority, date, authorship, editorial history, or confidence.

## 7. Joseph Smith Papers Integration

The Joseph Smith Papers should be treated as a source collection, not as a single undifferentiated authority.

Where available, I.C.E. should preserve:

- document title
- document type
- creation date
- represented date
- author
- scribe
- recorder
- recipient
- editor
- repository
- source transcription
- editorial annotations
- document version
- historical context
- citation
- collection classification
- referenced persons
- referenced places
- related events
- direct versus editorial statements

A reference to a character creates a relationship candidate between the document, the referenced character, the speaker or author, and the relevant event or concept.

Editorial commentary must remain distinguishable from original document text.

## 8. Identity Resolution And Entity Separation

Knowledge Object identity resolution must protect against incorrectly merging two people with similar names or titles.

Identity evidence may include:

- name forms
- chronology
- geography
- genealogy
- titles
- relationships
- source-specific identifiers
- document context
- language variants
- aliases
- explicit identity statements
- conflicting evidence

Identity resolution status values should include:

- Confirmed same entity
- Strongly supported same entity
- Possible same entity
- Unresolved
- Strongly supported distinct entities
- Confirmed distinct entities

Model agreement alone must not resolve identity.

## 9. Name And Semantic Components

Character names may include:

- original-language form
- transliteration
- translated form
- semantic components
- lexical roots
- narrative explanation
- later usage
- titles
- renamed identities
- disputed etymologies
- traditional interpretations

I.C.E. must preserve distinctions among:

- explicit scriptural explanation
- lexical-resource definition
- historical linguistic analysis
- narrative association
- theological interpretation
- model-proposed interpretation

Capitalization or visible substrings in an English rendering are not sufficient linguistic proof.

## 10. Confidence Architecture

A Character Profile or characteristic must not be reduced to a single opaque percentage.

Separate confidence dimensions may include:

- identity confidence
- source confidence
- observation confidence
- relationship confidence
- chronology confidence
- location confidence
- attribution confidence
- characteristic confidence
- lexical confidence
- historical confidence
- corroboration
- contradiction level
- interpretive dependence
- profile completeness
- source coverage

Confidence measures the support for represented information and the completeness of available evidence. It does not measure the worth, morality, spiritual standing, or importance of a person.

## 11. Coverage Profile

A coverage profile explains how complete the available representation is.

Possible dimensions include:

- Scripture coverage
- Historical-document coverage
- Conference coverage
- Joseph Smith Papers coverage
- Chronological coverage
- Geographic coverage
- Relationship coverage
- Teaching coverage
- Action coverage
- Lexical coverage
- Contradiction review
- Unresolved research areas

Coverage must not be confused with certainty.

A highly supported but narrowly documented claim can have high confidence and low coverage.

## 12. Profile Presentation

Character Profile presentation should support progressive disclosure:

```text
Accessible summary
-> Evidence-backed profile dimensions
-> Individual characteristics and relationships
-> Supporting observations
-> Exact source spans and provenance
```

Future views may include:

- Overview
- Timeline
- Map
- Relationships
- Teachings
- Actions
- Characteristics
- Names and titles
- Source collections
- Confidence
- Conflicts
- Open questions
- Research history

This task does not design or implement UI. Presentation responsibilities are future-facing only.

## 13. Generated Summaries

A generated profile summary is a presentation artifact, not canonical knowledge.

It must include or retain access to:

- source scope
- generation date
- model or deterministic composer used
- included and excluded source categories
- confidence thresholds
- unresolved conflicts
- citations
- version

A summary must not introduce facts that are absent from the underlying Knowledge Object.

## 14. Multi-Model Contribution

GPT, Gemini, and future systems may assist with:

- candidate entity detection
- name-variant proposals
- claim extraction
- relationship proposals
- characteristic candidates
- source comparison
- semantic query planning
- readable profile composition
- missing-field detection

Their outputs remain candidate material.

Model contributions require:

- model identity
- model version when available
- prompt or task class
- output timestamp
- cited source scope
- candidate classification
- verification state
- accepted, rejected, or unresolved status

Agreement among models may increase review priority but must not establish truth.

## 15. User-Contributed Materials

A user may add documents, notes, hypotheses, identity proposals, and characteristic candidates.

User material must be:

- preserved
- attributed
- source classified
- evaluated
- connected to relevant Knowledge Objects
- distinguishable from verified source content

User-submitted material enters I.C.E. as attributed evidence or a research candidate, not automatic truth and not automatic error.

## 16. Contradictions And Competing Interpretations

Knowledge Objects must preserve conflicts rather than silently reconcile them.

For each conflict, retain:

- competing claims
- source support
- source classification
- chronological relevance
- interpretive assumptions
- confidence
- unresolved questions
- review history

A profile may display more than one identity, chronology, motive, characteristic interpretation, or event reconstruction when the evidence remains divided.

## 17. Profile Evolution And Versioning

Every material Knowledge Object change should retain:

- prior value
- new value
- evidence added or removed
- confidence change
- reason for change
- responsible process or reviewer
- timestamp
- schema version

New evidence must not erase historical evaluation states.

## 18. Knowledge Object Relationships

Relationship types should be first-class and may include:

- person participated in event
- person present at location
- person related to person
- person spoke statement
- person received command
- person gave command
- person authored document
- person attributed source
- document references person
- event affected person
- name applies to person
- title applies to person
- characteristic supported by observation
- interpretation concerns person
- source conflicts with claim
- source corroborates claim

Relationships must carry their own evidence, provenance, certainty, and temporal context.

## 19. Data-Minimization And Accuracy Protections

Safeguards against overstatement include:

- no characteristic from absence alone
- no motive assigned without evidence
- no modern psychological diagnosis from ancient narrative evidence
- no collapse of theological attribution into independently verified fact
- no conflation of a source author with an editor or recorder
- no flattening of conflicting accounts
- no presentation of model language as a direct quotation
- no inferred chronology presented as explicit chronology
- no popularity-based truth assignment

## 20. Expression And Terminology Rules

Preferred system verbs include:

- evaluates
- processes
- parses
- extracts
- classifies
- compares
- correlates
- associates
- detects
- calculates
- qualifies
- retrieves
- records
- preserves
- presents
- proposes
- generates a candidate

Avoid unqualified statements that I.C.E. thinks, believes, wants, feels, intends, realizes, imagines, or knows in the human sense.

Where terms such as reasoning, understanding, or interpretation are retained as architecture labels, they describe computational organization, evidence evaluation, semantic classification, and presentation. They do not imply organic consciousness.

## 21. Constitutional Principles

- Knowledge Objects grow through traceable evidence rather than narrative invention.
- A Character Profile represents available evidence about a person; it does not claim exhaustive access to the person's complete nature, motives, or spiritual condition.
- Every profile conclusion remains inspectable through its supporting observations and source provenance.
- Source integration expands coverage without erasing source identity.
- Conflicting evidence remains visible.
- Confidence remains explainable and multidimensional.
- Model-generated material remains a candidate until evaluated.
- Accessible presentation must never replace the underlying evidence record.
- I.C.E. evaluates and presents information; human users study, interpret, judge, and seek understanding.

## 22. Current Implementation Boundary

Currently implemented capabilities:

- Observation Engine Phase 1 records direct source-text occurrence observations.
- Architecture, provenance, explainability, evidence-distance, ontology, authority, corpus, perspective, expert, lens, and graph foundations exist as documented elsewhere.
- Study Panel and Linear Scope Snapshot can display existing scoped records.

Pilot or experimental capabilities:

- Current preview and diagnostic layers may display runtime-generated semantic and language records, but they do not implement exhaustive Knowledge Objects or Character Profiles.

Approved future architecture:

- Persistent Knowledge Objects.
- Evidence-based Character Profiles.
- Multi-source profile accumulation.
- Joseph Smith Papers source-collection integration.
- Multi-dimensional confidence and coverage profiles.
- Multi-model candidate contribution review.
- User-contributed research candidate handling.

Unresolved architectural questions:

- Canonical storage schema and migration path for persistent Knowledge Objects.
- Review workflow and authority classes for accepting candidate characteristics.
- Versioning granularity for profile changes.
- UI surfaces for profile presentation and evidence drilldown.
- Source connector boundaries for Joseph Smith Papers and other external collections.
- Governance for user-contributed materials and private research notes.

## 23. Runtime Boundary

This architecture has no runtime impact.

It does not implement exhaustive Character Profiles, Joseph Smith Papers ingestion, characteristic generation, multi-source confidence evaluation, graph behavior changes, Study View changes, crawling, queue processing, parser changes, storage authority changes, or semantic extraction changes.
