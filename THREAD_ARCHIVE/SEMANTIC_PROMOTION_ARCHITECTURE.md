# Semantic Promotion Architecture

Purpose: define the rules that allow I.C.E. records to move from source text into higher study layers without losing source grounding, Context Lock, Meaning Staging, actor classification, scope isolation, or provenance.

This document is architecture guidance. It does not implement new extraction, crawling, automatic analysis, queue execution, or scope expansion.

## Promotion Ladder

Promotion flows in one direction:

```text
Source Text
-> Context
-> Grounded Observation
-> Semantic Event
-> Knowledge Graph
-> Theme
-> Relationship
-> Journey
```

Higher layers may depend on lower layers. Higher layers may not rewrite, invert, or replace lower-layer facts.

## Entry Criteria

Every promotion requires:

- A source scope: book, chapter, verse/range, canonical key, page key, or scope path.
- Source evidence: source phrase, verse text, DOM reference, capture evidence, or retained page snapshot.
- A parent record: the lower-layer record that justified promotion.
- A promotion rule: the named rule that explains why the record moved upward.
- A Meaning Staging level: Grounded, Supported, Strongly Implied, or Possible.
- Provenance: generated/source-provided state, storage key or layer name, and confidence/support wording.

Promotion is not allowed from vague keyword presence alone when the resulting record would assign actor roles, location roles, authority, recipient, relationship direction, or doctrinal meaning.

## Event Entry Criteria

Healing may promote when the source explicitly contains a healing/cleansing/restoration action, or a directly supported healing result. Participants must come from Context Lock or explicit source text. Example event types include healing event, cleansing event, deliverance event, and miracle event.

Movement may promote when the source explicitly contains travel, arrival, departure, entering, crossing, going up/down, coming to, or place-to-place movement. Locations remain locations unless the source gives them agency.

Dialogue may promote when the source explicitly contains speech, question, request, response, command, instruction, rebuke, blessing, or testimony. Speaker and audience must be resolved from Context Lock or explicit source text.

Genealogy may promote when the source explicitly contains lineage wording such as begat, son of, father of, mother of, wife of, or named familial context. Genealogy produces lineage records and explicit family relationships only. It must not infer firstborn status, unnamed mothers, or unsupported descendants.

Authority statements may promote when the source directly identifies authority, divine source, command origin, fulfillment authority, or recognized role. Authority source, messenger, and recipient must remain distinct.

Revelation may promote when the source explicitly contains appearance, dream, vision, word from the Lord, angelic instruction, divine instruction, or recipient response. The messenger does not become the authority source unless the source says so.

Fulfillment statements may promote when the source explicitly contains fulfillment wording or directly cites prior scripture/prophecy. Fulfillment promotion must stay within the actual source evidence; it may not inherit fulfillment locations or prior chapter semantics from unrelated validation passages.

Teaching may promote when the source explicitly contains teaching, sermon, commandment, doctrine, principle, blessing, warning, contrast, explanation, or audience instruction. Teaching records must preserve source phrase versus derived meaning.

## Layer Boundaries

Context may create:

- Actors
- Locations
- Regions, cities, nations, bodies of water, and settings
- Authority source
- Messenger
- Recipient
- Speaker
- Audience
- Participants
- Narrator/source roles
- Event scope

Context may not create:

- Derived doctrine
- Journey paths
- Theme conclusions
- Knowledge graph edges that are not explicit context roles
- Rewritten actor/location identity

Grounded Observation may create:

- Explicit source facts
- Explicit actions
- Explicit role statements
- Explicit relationship phrases
- Explicit lineage links
- Explicit place references

Grounded Observation may not:

- Add unnamed participants
- Convert locations into actors
- Convert actors into locations
- Infer motives or doctrine

Semantic Event may create:

- Healing event
- Cleansing event
- Movement event
- Dialogue event
- Request/response event
- Authority instruction event
- Revelation or messenger event
- Fulfillment statement event
- Teaching event
- Lineage record
- Obedient response event

Semantic Event may not:

- Rewrite Context Lock roles
- Promote a location into a participant without agency
- Replace a source actor with a generic actor
- Import event semantics from another chapter or book

Knowledge Graph may create:

- Relationships between already-grounded entities, events, themes, principles, teachings, and source references.
- Edge labels such as supports, speaks to, travels to, heals, instructs, receives instruction, fulfills, contrasts, continues, or relates to.

Knowledge Graph may not:

- Create new actors without lower-layer grounding
- Rewrite authority, messenger, recipient, speaker, or audience
- Convert place references into actors
- Treat retained out-of-scope records as active scope

Themes may create:

- Current-scope thematic groupings
- Supporting record lists
- Supporting verses
- Theme-to-event or theme-to-principle associations

Themes may not:

- Generate doctrine beyond source-supported meaning
- Discover themes outside the analyzed scope
- Rewrite source facts or roles

Relationships may create:

- Grounded links between existing records
- Directional relationship labels when lower-layer evidence supports direction
- Evidence chains that explain the link

Relationships may not:

- Reverse actor roles
- Reverse source/recipient direction
- Reclassify locations or actors
- Use relationship convenience to override Context Lock

Journeys may create:

- Study nodes, paths, hubs, exploration paths, and guided journeys from existing scoped records.
- Suggested study progression within the current analyzed scope.

Journeys may not:

- Navigate automatically
- Create queue items automatically
- Crawl or analyze pages
- Redefine active Study Scope
- Promote out-of-scope retained records into current guidance

## Promotion Prohibitions

The following are forbidden:

- Inherited chapter semantics: a record from one chapter, book, or source must not supply semantic content to another unless a source-grounded cross-reference explicitly supports it.
- Role inversion: authority must not become messenger, messenger must not become recipient, recipient must not become authority, and speaker/audience must not be reversed.
- Location-to-actor promotion: Nazareth, Egypt, Jerusalem, Galilee, Jordan, wilderness, Capernaum, sea, mountain, and similar places remain locations unless the text explicitly personifies or gives them geopolitical agency.
- Actor-to-location promotion: named persons, divine entities, messengers, groups, and narrators must not be downgraded into places.
- Relationship rewriting context: graph, theme, timeline, journey, or exploration layers may not alter Context Lock.
- Scope leakage: retained records may be summarized as retained/out-of-scope, but they may not redefine active Study Scope or appear as current-scope guidance.
- Doctrine invention: derived layers must not add doctrinal claims not supported by source evidence and Meaning Staging.
- Firstborn/mother/descendant inference in genealogy when the source phrase does not state it.
- Generic fallback actor assignment when a named grounded actor exists.

## Volume Neutrality

The promotion architecture must work across:

- Old Testament
- New Testament
- Book of Mormon
- Doctrine and Covenants
- Pearl of Great Price

Matthew is a validation corpus, not the architecture itself. Promotion rules must be based on source evidence, context roles, and Meaning Staging rather than hardcoded chapter identity.

Validation examples may use Matthew, but implementation should prefer reusable rule families such as healing, movement, revelation, fulfillment, genealogy, authority, dialogue, and teaching.

## Provenance Requirements

Every promoted record should answer:

- What source scope grounded this?
- What exact source evidence or phrase supports it?
- Which parent record did it come from?
- Which promotion rule allowed the promotion?
- Which Meaning Staging level applies?
- What evidence weight or Analysis Support applies?
- Which layer/storage key generated it?
- Was it source-provided or I.C.E.-derived display wording?
- Is it in active scope, retained scope, or explicitly out-of-scope?

When a promoted record is rejected, diagnostics should record:

- Raw candidate count
- Scoped accepted count
- Rejection reason
- Conflicting lower-layer value, if any
- Source record id/key when available

## Confidence And Meaning Staging

I.C.E. user-facing confidence wording is Analysis Support, not a judgment on scripture truth.

Meaning Staging maps as follows:

- Grounded: direct source text or explicit Context Lock fact.
- Supported: directly supported by source context and lower-layer records.
- Strongly Implied: required or highly supported by the source action/context, but not directly stated.
- Possible: plausible from context, but not established.

Promotion level expectations:

- Context and Grounded Observation should normally be Grounded.
- Semantic Events should be Grounded or Supported.
- Knowledge Graph edges should be Grounded or Supported; Strongly Implied edges require clear reasoning.
- Themes may be Supported or Strongly Implied when multiple scoped records converge.
- Relationships and Journeys may include Strongly Implied study routes, but must expose Evidence Chain, Analysis Support, Challenge Factors, and Provenance.
- Possible meanings may be displayed as possible, but should not drive actor identity, authority direction, lineage, scope selection, or automatic promotion.

## Architecture Consistency

This specification is consistent with:

- Context Lock: lower-layer context roles are authoritative for higher layers.
- Meaning Staging: each promoted record declares its staging level and may not collapse possible meaning into grounded fact.
- Actor Architecture: named actors remain actors, locations remain locations, authority remains authority, narrators remain source/narrator roles.
- Timeline Architecture: events, relationships, and sequences derive from scoped records and do not add visual timeline, dates, traversal, crawling, or automatic navigation.
- Theme Architecture: themes group current-scope records and do not discover doctrine outside analyzed scope.
- Journey Architecture: journeys organize existing scoped records into study routes and do not navigate, crawl, analyze, or redefine scope.

## Next Implementation Guidance

Before expanding Matthew 8 or other chapters, add promotion logic by reusable rule family rather than chapter-specific inheritance:

- Healing / cleansing / deliverance
- Movement / place transition
- Dialogue / request / response
- Authority instruction
- Revelation / messenger
- Fulfillment citation
- Genealogy / lineage
- Teaching / discourse

Each new promotion family should include a QA or diagnostic path that verifies source scope, parent record, promotion rule, entity classification, Context Lock stability, and no out-of-scope leakage.
