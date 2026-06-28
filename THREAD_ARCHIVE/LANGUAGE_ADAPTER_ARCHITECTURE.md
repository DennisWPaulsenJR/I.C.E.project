# Language Adapter Architecture

## Purpose

Language adapters define how I.C.E. may evaluate grammar, morphology, quotation boundaries, token meaning, and translation perspectives without rewriting source text or Context Lock records.

This document is an architecture contract only. It does not implement Koine Greek, Ancient Hebrew, Aramaic, Strong's, morphology, part-of-speech parsing, or lexicon lookup yet.

## Architecture Position

Language adapters belong to the Language Layer in the Semantic Ontology Backbone.

Dependency order:

Source
-> Language
-> Context
-> Entities
-> Events
-> Relationships
-> Themes
-> Literary Structures
-> Discovery
-> Perspectives
-> Presentation

Language adapters may illuminate lower source wording and support later semantic evaluation. They may not replace source text, silently rewrite context, or alter downstream records without provenance.

Related architecture documents:

- `THREAD_ARCHIVE/SEMANTIC_ONTOLOGY_BACKBONE_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ONTOLOGY_RECORD_CONTRACTS.md`
- `THREAD_ARCHIVE/ENTITY_RELATIONSHIP_CLASSIFICATION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/AUTOMATIC_DISCOVERY_EXPANSION_ARCHITECTURE.md`
- `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md`

## Language Adapter Contract

Each adapter should declare:

```json
{
  "adapterId": "koine_greek_v1",
  "sourceLanguage": "Koine Greek",
  "targetLanguage": "English",
  "tokenizationRules": [],
  "quoteRules": [],
  "divineTitleRules": [],
  "pronounRules": [],
  "morphologySupportLevel": "none | partial | full | external-reference",
  "confidenceModel": "surface | lexicon-supported | morphology-supported | expert-reviewed"
}
```

Required fields:

- `adapterId`: stable adapter identifier.
- `sourceLanguage`: language being evaluated.
- `targetLanguage`: translation or presentation language.
- `tokenizationRules`: how source text is split into tokens.
- `quoteRules`: how quotations, speakers, nested quotes, and boundaries are detected.
- `divineTitleRules`: how divine names/titles/references are preserved without collapsing distinctions.
- `pronounRules`: how pronouns may be linked to possible antecedents while preserving uncertainty.
- `morphologySupportLevel`: adapter capability for morphology.
- `confidenceModel`: how the adapter assigns confidence and support language.

## Language Record Shape

Canonical language records should use this shape:

```json
{
  "tokenId": "language-token-001",
  "token": "logos",
  "surfaceForm": "logos",
  "lemma": "logos",
  "language": "Koine Greek",
  "morphology": {
    "tense": "",
    "aspect": "",
    "mood": "",
    "voice": "",
    "case": "",
    "gender": "",
    "number": "",
    "person": ""
  },
  "partOfSpeech": "noun",
  "grammaticalRole": "subject",
  "syntaxRole": "main clause subject",
  "quoteBoundary": {
    "insideQuote": false,
    "quoteId": "",
    "speaker": "",
    "audience": ""
  },
  "confidence": "supported",
  "provenance": "language adapter"
}
```

Required fields:

- `tokenId`
- `token`
- `surfaceForm`
- `lemma`
- `language`
- `morphology`
- `partOfSpeech`
- `grammaticalRole`
- `syntaxRole`
- `quoteBoundary`
- `confidence`
- `provenance`

Recommended common fields:

- `sourceScope`
- `sourceReference`
- `sourceAdapter`
- `translation`
- `inferenceLevel`
- `creationReason`
- `parentRecordIds`

## Part-Of-Speech Categories

Initial categories:

- noun
- verb
- adjective
- adverb
- pronoun
- conjunction
- article
- preposition
- particle
- interjection

Adapters may add language-specific subtypes, but the canonical top-level category should remain stable.

## Grammatical Roles

Initial roles:

- subject
- object
- indirect object
- modifier
- predicate
- speaker
- audience
- quotation source
- quotation target

Grammar roles support Context Lock, but do not override it. If grammar suggests a different speaker, audience, or participant than Context Lock, the disagreement must be preserved as a visible perspective conflict.

## Morphology Fields

Initial morphology examples:

- tense
- aspect
- mood
- voice
- case
- gender
- number
- person

Adapters may leave fields blank when unsupported. Unknown morphology must not be guessed.

## Quote Rules

Adapters should preserve:

- direct quotation boundaries
- nested quotation boundaries
- speaker candidates
- audience candidates
- quotation source
- quotation target
- confidence and unresolved state

A quote boundary may inform Context Lock. It may not silently rewrite Context Lock once context is established.

## Divine Title Rules

Adapters must preserve distinctions among:

- exact source divine names
- divine titles
- narrator references
- participant claims
- translated titles
- pronoun references
- inferred antecedents

Examples:

- `GOD` and `THE LORD` may be authority-source entities when grounded.
- `JESUS`, `JESUS CHRIST`, and title forms must not be collapsed without provenance.
- False gods, idols, or participant claims must not automatically become established divine authority.

## Pronoun Rules

Pronoun handling must remain conservative.

Required behavior:

- identify pronoun token
- list possible antecedents
- identify strongest grounded antecedent if available
- preserve uncertainty
- attach confidence and provenance

Forbidden behavior:

- silently replacing a named entity with a guessed antecedent
- changing actor identity from a pronoun guess
- using later semantic layers to rewrite a pronoun's source context

## Perspective Models Supported

Language adapters should support these perspective models:

- surface translation model
- original language model
- Strong's model
- lexicon model
- grammar model
- translation comparison model
- expert source model

Perspective models are comparisons, not replacements.

A perspective model may say:

- this term may carry a semantic range
- this grammar supports a reading
- this translation emphasizes one possible sense
- another translation handles the phrase differently

A perspective model may not say:

- the source text has changed
- Context Lock should be overwritten
- a possible reading is now fact
- a doctrinal conclusion is established without source/provenance support

## Confidence Model

Suggested language support labels:

- `direct`: explicit token/grammar evidence in the source record.
- `supported`: lexical or grammatical support from a known adapter/model.
- `limited`: partial evidence or incomplete adapter support.
- `unresolved`: insufficient data to evaluate.

Confidence must be attached to each language record and perspective observation.

Confidence does not judge scriptural truth. It describes how directly I.C.E. can support a language observation from available source and adapter data.

## Future Languages

Prepare adapters for:

- English
- Koine Greek
- Ancient Hebrew
- Aramaic
- future religious adapters

Future adapters should remain volume-neutral and library-neutral. Matthew is a validation corpus, not the architecture boundary.

## Trust Rules

- Language may illuminate meaning.
- Language may not rewrite source text.
- Grammar may illuminate context.
- Grammar may not silently replace context.
- Translation models remain perspectives.
- Perspective disagreement remains visible.
- Confidence and provenance remain attached.
- Language records may support Context Lock but may not overwrite it.
- Later semantic layers may consume Language records but may not mutate them.
- Presentation may hide or show language detail but may not alter the underlying record.

## Prohibited Promotions

Language adapters must not produce:

- doctrine without evidence
- inferred typology without provenance
- automatic fulfillment claims
- ungrounded actor-role changes
- location-to-actor conversion
- actor-to-location conversion
- pronoun identity replacement without visible uncertainty
- translation preference as established source truth

## Validation Expectations

Future implementation should validate:

- token records retain source scope
- morphology fields are blank rather than guessed when unsupported
- pronoun resolution preserves uncertainty
- quote boundaries do not rewrite Context Lock
- language perspectives do not mutate source/context/entity records
- Strong's or lexicon observations include provenance
- translation comparison preserves source and target references

## Implementation Boundary

This phase is documentation only.

No crawling, automatic queue processing, automatic study progression, scope expansion, or source mutation is introduced by this document.
