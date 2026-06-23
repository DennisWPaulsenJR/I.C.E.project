# Full Context Evaluation Architecture

Purpose: define the long-term I.C.E. architecture for fully evaluating selected scripture input while keeping frontend presentation clear, modular, and trustworthy.

Core principle:

```text
Backend precision.
Frontend clarity.
```

The backend may store detailed structured records. The frontend should show only selected, useful views.

## Evaluation Scope

I.C.E. should eventually evaluate:

- Source text
- Speaker
- Audience
- Location
- Participants
- Sequence
- Movement
- Relationship dynamics
- Authority structure
- Narrative type
- Implied situational context
- Cross-references
- Prior references
- Later fulfillment or continuation
- Repeated themes
- Large-volume congruencies

Supported input targets should grow from:

- Single verses
- Chapters
- Selected ranges
- Full books
- Full volumes
- All New Testament books
- All standard works

Large-volume support must remain explicit, queued, resumable, segmented, and lazy-rendered. It must not run from panel open, simple navigation, or passive view selection.

## Backend Layers

### 1. Source Layer

Stores exact source text, source reference, source URL, source scope, source phrase, capture metadata, and source adapter context.

Rule: source text is never rewritten by derived layers.

### 2. Context Layer

Stores who, what, where, when, speaker, audience, authority, participants, narrator/source roles, messenger, recipient, and location.

Rule: Context Lock controls later meaning. Higher layers may depend on context but may not redefine it.

### 3. Situation Layer

Stores what is happening around the words:

- Who is present
- Who came
- Who left
- Who is addressed
- Who is observing
- Where the action occurs
- What conditions surround the event

Rule: situation records distinguish explicit text from supported or implied context.

### 4. Event Layer

Stores ordered events, including:

- Teaching
- Healing
- Movement
- Calling
- Revelation
- Testimony
- Conflict
- Miracle
- Fulfillment
- Lineage
- Covenant
- Warning
- Judgment
- Deliverance

Rule: events must be grounded by source text, Context Lock, and a named promotion rule.

### 5. Inference Layer

Inference must remain leveled:

- Directly stated
- Grounded observation
- Supported meaning
- Strongly implied meaning
- Possible meaning
- Study relationship

Example:

Source:

```text
They came unto HIM.
```

Grounded:

```text
They came to HIM.
```

Supported:

```text
They were not already positioned with HIM in that described moment.
```

Strongly implied:

```text
Movement toward HIM occurred.
```

Possible:

```text
They may have gathered elsewhere first.
```

Rule: possible meaning must never be displayed as grounded fact.

### 6. Relationship Layer

Stores:

- Actor relationships
- Authority relationships
- Teacher/audience relationships
- Movement relationships
- Cause/effect relationships
- Fulfillment relationships
- Theme relationships
- Narrative relationships

Rule: relationships may connect lower-layer records but may not rewrite meaning or context.

### 7. Large Scope Comparison Layer

Supports cross-scope study across:

- Chapters
- Books
- Volumes
- Repeated phrases
- Repeated events
- Related teachings
- Fulfillment patterns
- Character journeys
- Doctrine themes

Rule: later passages may illuminate earlier passages, but they may not redefine earlier source context.

#### Prior / Current / Future Relativity

For a selected expression, character, event, doctrine, place, theme, or phrase, I.C.E. should eventually expose relative cross-reference views:

- Prior: earlier related teachings, prophecies, lineage, background, or setup.
- Current: immediate source context, speaker, audience, event, location, and meaning stage.
- Future: later fulfillment, repetition, continuation, contrast, or development.
- Related / Projected: useful study relationships that remain visibly labeled by confidence and inference level.

Future cross-reference relationship records should preserve:

- Source reference
- Target reference
- Relationship type
- Direction: prior, current, future, related, fulfillment, echo, character journey, theme journey, or location journey
- Evidence strength
- Inference level
- Source phrase or entity
- Reason for connection
- Confidence
- Provenance

Trust rules:

- Prior references may inform current understanding but may not rewrite current context.
- Future references may illuminate later fulfillment or continuation but may not redefine earlier source meaning.
- Projected relationships must remain labeled as possible or inferred.
- Cross-reference relationships must preserve source scope and provenance.
- Current Context Lock remains authoritative.

### 8. Presentation Layer

Frontend views are selectable modules:

- Character Study
- Entity Index
- Location Movement
- Event Flow
- Narrative Type View
- Inference Ladder
- Evidence / Provenance
- Timeline
- Theme Study
- Relationship Graph
- Journey Study
- Cross Reference View
- Prior / Current / Future Reference View
- Full Technical View

Rule: presentation selection changes visibility only. It must not mutate extraction, scope, Context Lock, semantic records, queues, or stored analysis.

## Trust Rule

```text
Context always wins.
Meaning never rewrites context.
Relationships never rewrite meaning.
Journeys never rewrite relationships.
Study guidance never rewrites evidence.
```

## User Benefit

The goal is to help users see what deep study normally reveals:

- Congruencies
- Repeated patterns
- Timelines
- Who was present
- Who moved
- Who spoke
- Who received
- How teachings connect
- How events build
- How narratives differ
- What is stated
- What is implied
- What remains only possible

Those levels must stay separate. I.C.E. must not collapse source text, observation, inference, and study guidance into one unsupported interpretation.

## First Lightweight UI Target

The first lightweight UI target is the Study Reference Index.

Sections:

- Characters
- Entities
- Locations
- Events
- Narrative Types
- Inference Ladder
- Cross References
- Available Views

Current implementation already includes the first Study Reference Index foundation and modular Study Display controls. Future work should refine this surface before building full New Testament processing.

## Near-Term Implementation Direction

Before full-book or full-volume execution:

- Keep improving reusable semantic promotion families.
- Keep Context Lock and Meaning Staging visible.
- Keep actor/entity/location classification stable.
- Keep Study Reference Index compact.
- Keep presentation modules selectable.
- Add large-volume evaluation only through explicit queue architecture.
- Preserve source scope and provenance for every promoted record.
