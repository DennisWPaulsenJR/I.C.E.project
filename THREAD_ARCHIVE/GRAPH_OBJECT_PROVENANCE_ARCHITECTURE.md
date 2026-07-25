# Graph Object Provenance Architecture

Purpose: define how Linear Scope Snapshot graph objects expose their origin, evidence, context, confidence, and inspection path without changing semantic records.

Status: implementation foundation. This document describes the current display-only graph provenance contract and the existing flow that feeds it.

## Current End-to-End Flow

1. Source capture

   The Study Panel receives current source-page records, retained Current Study records, analyzed pages, selected source scopes, and scoped semantic arrays already present in extension storage or runtime memory. Linear Scope Snapshot does not crawl, fetch, analyze queues, or create new source records.

2. Extraction and semantic inputs

   Snapshot source nodes are projected from existing records such as Study Reference Index actors, Ordered Events, Timeline Records, Relationship Records, Dialogue Preview, Theme Records, Principle Extraction, Journey / Narrative Arc, unresolved preview diagnostics, Current Study source-scope records, and session-local Copy Render selections.

3. Context and event resolution

   Event-focused cards reuse existing event fields such as source reference, event text, source excerpt, participants, sub-events, sequence number, scene references, confidence, verification, and provenance. Missing fields remain labeled as not recorded or source unavailable.

4. Graph node creation

   `scopeSnapshotAddNode` normalizes each existing source record into a display node with a stable presentation key, lane id, semantic category, source collection, source record id, source-generation diagnostics, reference diagnostics, primary reference, supporting references, source text, evidence, provenance, confidence, and status.

5. Graph edge creation

   Linear Scope Snapshot creates display-only lane connector edges between adjacent positioned records in the same visible lane. These edges are graph presentation relationships, not promoted semantic relationships. Their purpose is to make traversal and lane ordering inspectable.

6. Stable keys

   Nodes use `scopeSnapshotPresentationKey` plus collision suffixing. Edges use a hash of lane id, source node id, target node id, and source/target references. Clusters use their existing cluster/anchor identifiers.

7. Evidence and provenance disclosure

   Focused detail cards show primary reference, supporting references, record type, presentation type, stable key, confidence, evidence/provenance availability, and a visible Reason for Inclusion block. Source Evidence and Provenance remain lazy-loaded detail sections.

8. Inspector and timeline navigation

   Open Inspector remains the only action that triggers broader semantic navigation. Show in Timeline uses existing timeline/event target sections only when available. Source Evidence and Provenance do not mutate graph state, semantic records, storage, or scope.

9. Verification

   Snapshot verification is display verification over loaded scoped records. Unresolved and ambiguous records remain unresolved/ambiguous. Graph object provenance may reveal missing evidence or missing provenance but does not repair it automatically.

## Graph Object Provenance Contract

Graph provenance is exposed through a normalized inspector adapter rather than forcing every source record into the same stored schema.

### Identity

- stable graph-object key
- object type
- semantic classification
- canonical entity identifier when recorded
- graph scope
- schema version

### Origin

- source document or adapter when recorded
- source reference
- text span, token id, or quote id when recorded
- captured source text or source-unavailable state
- capture mode
- source order when recorded

### Creation Reason

- extraction rule or resolution rule when recorded
- graph-builder operation
- explicit reason for inclusion
- qualification: explicit, derived, unresolved, ambiguous, display-only, or not recorded

### Context

- active Study Scope
- rendered graph scope
- event context when recorded
- subject / actor context when recorded
- parent or connected node context for edges

### Evidence

- primary evidence
- supporting evidence
- supporting references
- evidence count
- confidence
- rejected / ambiguous evidence when recorded

### Resolution

- resolved, unresolved, ambiguous, or display-only status
- canonical target when recorded
- alternative candidates when recorded
- ambiguity reason when recorded
- resolution method and confidence when recorded

### Verification

- verification state
- review state
- validation messages when recorded
- supersession/deprecation state when recorded

### Diagnostics

- creation path
- graph operation
- source collection
- source generation
- reference diagnostics
- parent node or edge identifiers

## Node Support

The normalized adapter supports the graph object classes currently projected into Linear Scope Snapshot:

- characters by class
- happenings / ordered events
- major events / timeline records
- relationships / dialogue
- meaning / themes
- principles / teachings
- journeys / progressions
- unresolved / ambiguous records
- session-local Copy Render selections
- Current Study source-scope placeholders

Type-specific fields remain on the source record and continue to be shown by native inspectors.

## Relationship / Edge Support

Display edges are inspectable independently from connected nodes. Each edge exposes:

- source node
- target node
- relationship type
- direction
- reason created
- supporting reference
- supporting text span when available
- extraction / relationship rule
- event context
- graph scope
- confidence
- verification state
- ambiguity state
- stable key

Edges are presentation relationships unless the underlying source record is itself a promoted relationship record. Edge provenance must not be used to infer doctrine, chronology, fulfillment, motive, or semantic authority.

## Trust Rules

- Graph provenance describes existing graph objects.
- Graph provenance does not create semantic records.
- Graph provenance does not rewrite evidence.
- Graph provenance does not mutate Context Lock.
- Graph provenance does not change canonical Study Scope.
- Graph provenance does not write storage.
- Graph provenance does not process queues or crawl.
- Missing provenance must remain visible.
- Display edges do not become semantic relationship authority.
