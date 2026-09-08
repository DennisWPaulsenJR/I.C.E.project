# I.C.E. Controlled Architecture Freeze

Document: ICE_ARCHITECTURE_FREEZE_AA_0072
Revision: AA_0072
Status: Authorized for GPT review
Baseline: `master` at `4bc57e45662d580a3e69fdcea4965b128625c2a8`
Source task: I.C.E._AA_0071

## Purpose

This record freezes the cross-domain authority model verified by AA_0071. It is a controlled documentation baseline, not a runtime implementation specification. The existing high-level architecture document `ICE_Application_High_Level_Architecture_R1_0.docx` is preserved as the high-level architecture record; this document records the verified live authority contracts and their boundaries.

## System Model

I.C.E. organizes source material into evidence-grounded comprehension and derived knowledge structures for transparent study and inspection.

The authority direction is:

`SOURCE -> CAPTURE -> EVIDENCE -> SOURCE/SCOPE -> GENERATION-GOVERNED ANALYSIS -> SEMANTIC DERIVATION -> ENTITY/RELATIONSHIP -> GRAPH/KNOWLEDGE -> EVALUATION/VERIFICATION -> PRESENTATION/EXPLORATION`

The four-plane view remains: `EVIDENCE -> COMPREHENSION -> KNOWLEDGE -> PRESENTATION`, with authority and governance crossing all planes.

## Frozen Contracts

### Authority and Components

`background.js` owns governed source validation, canonical target and membership, generation, semantic persistence, entity registry construction, derived structures, trust verification, and complete reset. `content.js` observes source pages and acquires primary captures. `popup.js` owns workflow/control, bounded compatibility behavior, partial cleanup, and bounded fallback reset. `study.js` is a consumer, presentation and diagnostics surface, navigation and queue-workflow owner, bounded cleanup owner, and complete-reset requester. `pageOverlay.js` is presentation-only. `engine.js` and shared helpers provide supporting processing, normalization, shaping, filtering, or presentation support. QA verifies contracts and has no runtime authority.

### Source, Evidence, and Scope

Source identity, canonical target, canonical membership, active source, selected range, and multi-page scope remain distinct. Canonical membership is background-governed. Selected range cannot admit pages. Context Lock is Model A: **a derived assertion over governed current scope**. Provenance, graph presence, queue presence, presentation, and persistence do not independently admit source or scope.

### Generation and Lifecycle

Generation governs lifecycle currentness and reset invalidation. It does not establish truth, source admission, entity admission, graph authority, trust authority, or provenance authority. Consumers may filter by generation. Complete reset is background-owned and advances the generation/currentness boundary.

### Semantics, Entities, and Graphs

`background.js` is the canonical governed semantic producer. Popup compatibility workflows may not replace valid current-generation semantic records; Study, overlay, queue, and graph consumers do not write semantic authority upstream. The Entity Registry owns entity admission; canonical identities are downstream enrichment. Relationships, scenes, interaction graphs, and knowledge graphs are derived structures and cannot establish upstream authority.

### Queue and Evaluation

Queue completion means workflow completion only. It does not mean generation, semantic, graph, provenance, confidence, trust, or canonical-scope completion. Confidence is a record-level support assessment; reliability is derived evidence/derivation dependability; trust is explanatory verification, not authorization. Missing confidence remains neutral and non-evaluative.

### Provenance and Persistence

**Provenance supports traceability and explanation. Provenance does not create authority merely by being present.** Source/capture and derived lineage remain bounded. Record IDs may be volatile; logical/source keys support comparison where available. Persisted state is not automatically current or authoritative. Partial-write, migration, exact-span, and cross-run concerns remain deferred debt.

### Presentation and Reset

Study, popup, and pageOverlay may format, summarize, filter, navigate, explain, and display provenance, confidence, and trust. They may not establish source authority, canonical membership, generation, semantic truth, entity admission, graph authority, or trust authority. Partial clears remove declared families and dependencies; complete Clear All remains background-owned and preserves bounded panel UI state where required.

## Architecture Invariants

INV-001 through INV-017 all PASS at AA_0071: evidence and semantics are distinct; source admission and derivation are distinct; generation governs currentness; Context Lock is derived; background owns governed persistence; popup compatibility is bounded; the Entity Registry owns admission; graphs are downstream; queue is workflow-only; confidence, reliability, trust, and provenance remain separate from authority; persistence does not establish currentness; presentation is non-authoritative; background owns complete reset; deferred debt does not redefine authority.

## Closed Defect Register

The following remain CLOSED, DURABLE, with no regression at this baseline: GAP-001 active source; GAP-002 canonical membership; GAP-003 source identity; GAP-004 selected range; GAP-005 multi-page scope; GAP-006 Context Lock; GAP-007 provenance versus scope; SEM-WRITER-001; GRAPH-FRESH-001; QUEUE-AUTH-001; OBS-EVID-001; ENT-ID-001; CRT-AUTH-003.

## Deferred Debt

The complete non-blocking appendix is maintained in [`ICE_DEFERRED_DEBT_APPENDIX_AA_0072.md`](ICE_DEFERRED_DEBT_APPENDIX_AA_0072.md). Deferred debt is not authority, does not invalidate this freeze, and requires separate authorization before implementation.

## Control

This freeze is based on AA_0071, at the repository baseline stated above. It changes documentation only. No runtime, storage, schema, identifier, generation, source/scope, Context Lock, semantic, entity, graph, queue, evaluation, provenance, reset, presentation, or Exaltation source contract is changed by this record.
