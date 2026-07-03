# Modular Study Presentation Architecture

Purpose: separate I.C.E. evaluation from Study Panel presentation so the same selected scope can support multiple user-facing views without reprocessing, scope mutation, or primary-evidence rewrites.

## Core Separation

Evaluation layer:

- Extracts source text.
- Classifies actors, entities, locations, events, references, and relationships.
- Validates Context Lock and entity roles.
- Stages meaning through the inference ladder.
- Prepares scoped semantic records.

Presentation layer:

- Shows or hides prepared modules selected by the user.
- Does not extract, analyze, crawl, queue, navigate, or mutate Study Scope.
- Does not rewrite Context Lock, Meaning Staging, actor classification, semantic records, or provenance.

## Module Categories

Initial display modules:

- Overview
- Character Study
- Entities
- Location Movement
- Event Flow
- Narrative Types
- Inference Levels
- Evidence / Provenance
- Themes / Teaching
- Relationships
- Cross Reference
- Journey Study
- Study Guidance
- Focus / Scope / Depth / View Lens
- Full Technical View

User-facing presets:

- Full Technical View: all modules visible.
- Study View: high-value study modules visible without requiring raw diagnostic review.
- Evidence View: inference, evidence, cross-reference, and technical review modules visible.

## Rules

- User selection changes presentation only.
- Hidden modules remain backed by prepared storage/session records.
- Hidden modules may be shown again without re-analysis.
- User selection must not change source extraction.
- User selection must not mutate Context Lock.
- User selection must not alter semantic records.
- Derived presentation layers may not rewrite primary evidence data.
- Scope boundaries remain controlled by current Study Scope, not display selection.

## Current Implementation

The Study Panel now exposes `Study Display Modules` controls above the main panel.

The selector maps existing Study Panel sections to module categories and applies visibility after render. This keeps existing deferred-section behavior while allowing the user to focus the display.

No new storage key, extraction behavior, queue behavior, crawling behavior, automatic progression, or semantic record migration was added.

## Future Direction

Future work can make module presets richer, persist a user preference if desired, and attach module badges to each card. Those changes should remain presentation-only and must not change the evaluated record set.
