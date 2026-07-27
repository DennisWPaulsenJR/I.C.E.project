# Study Workspace, Research Workflow, And Investigation Architecture

Task ID: ICE-ARCH-0011

Status: Architecture only. No runtime behavior, storage schema, migration, Study Panel behavior, workspace persistence, graph database, map rendering, timeline rendering, visualization engine, AI workflow, export engine, collaboration feature, QA script, package update, source connector, crawling, queue behavior, or application behavior is created by this document.

Project identity: I.C.E. - Integrated Comprehension Engine.

Prerequisites reviewed:

- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md`.

## 1. Purpose

The Study Workspace is the primary environment where users investigate evidence rather than merely read documents.

The Study Workspace is the orchestration layer of I.C.E. It helps users gather, arrange, compare, annotate, question, visualize, and present research paths through the Evidence Graph, Knowledge Objects, Timelines, Convergence Assessments, Research Questions, Maps, Visualizations, AI-assisted workflows, and saved investigations.

Workspaces organize evidence. They never replace evidence.

A workspace may collect views, notes, boards, filters, searches, calculations, and presentations, but the underlying evidence remains in source records, canonical observations, Knowledge Objects, convergence assessments, and other governed graph records.

## 2. Workspace Model

Future workspace concepts include:

- Workspace: a user-controlled research environment containing views, filters, collections, notes, boards, searches, and presentation drafts.
- Study Session: a time-bounded research session with selected scope, active views, navigation history, and current working question.
- Project: a larger research effort that may contain multiple workspaces, sessions, collections, notebooks, exports, and review states.
- Research Collection: a curated set of related records, questions, sources, observations, objects, calculations, or visualizations.
- Evidence Collection: a workspace grouping of evidence references, not a new evidence authority.
- Question Collection: a set of Research Question Objects or user-authored questions under investigation.
- Notebook: user-authored research notes linked to evidence, objects, questions, views, and presentations.
- Bookmarks: saved pointers to source spans, observations, objects, graph views, timeline states, map extents, calculations, or notes.
- Saved Searches: reproducible search definitions with filters, scope, source collections, and timestamp.
- Research Trail: an auditable navigation and decision path through sources, objects, questions, views, notes, and presentations.
- Investigation: a structured inquiry organized around one or more questions, collections, evidence sets, hypotheses, reconstructions, or presentations.
- Presentation: a curated output view that preserves evidence links and uncertainty.
- Export: a generated package, file, report, slide deck, citation list, map image, graph snapshot, or evidence packet that remains downstream from evidence.

Workspace records may preserve user organization. They do not create primary evidence, overwrite source records, or mutate canonical observations.

## 3. Research Workflow

A typical investigation may move through:

```text
Question
-> Evidence Discovery
-> Observation Review
-> Knowledge Objects
-> Convergence
-> Timeline
-> Maps
-> Reconstruction
-> Questions
-> Notes
-> Presentation
-> Export
```

The workflow is iterative. A map may create a new question. A question may send the user back to source evidence. A convergence conflict may split a Knowledge Object or mark a sequence as unresolved. A note may become a user-authored proposal only through a future review boundary.

The workspace should preserve the path without forcing a conclusion.

## 4. Research Trails

Research Trails are persistent, reproducible records of investigation.

Every significant navigation or research action may become part of a Research Trail, such as:

```text
Luke 2
-> Temple
-> Passover
-> Pilgrimage
-> Jewish Education
-> Travel Companies
-> John the Baptist
-> Elizabeth
-> Temple Architecture
-> Josephus
-> Map
-> Timeline
-> Notebook
```

Research Trails should preserve:

- Chronology of investigation.
- Starting question.
- Source scopes visited.
- Objects opened.
- Views used.
- Searches run.
- Filters applied.
- Notes created.
- Questions raised.
- Calculations viewed or saved.
- Reconstructions inspected.
- Presentations generated.
- Review decisions, where applicable.

A Research Trail is not evidence. It documents how a user moved through evidence.

## 5. Workspace Views

Future workspace views may include:

- Evidence Table.
- Timeline.
- Journey Map.
- Relationship Graph.
- Source Comparison.
- Parallel Text.
- Confidence View.
- Evidence Density.
- Question Dashboard.
- Knowledge Object Explorer.
- Notebook.
- Presentation Mode.

Views organize existing records. They may sort, filter, visualize, compare, summarize, and annotate, but they may not rewrite evidence or create source authority.

## 6. Collections

Users may save collections of:

- People.
- Places.
- Events.
- Journeys.
- Questions.
- Sources.
- Observations.
- Reconstructions.
- Calculations.
- Images.
- Maps.
- Timelines.
- Relationships.
- Evidence packets.
- Notes.

Collections are workspace organization, not evidence replacement. Removing an item from a collection does not delete source evidence. Adding an item to a collection does not promote it to accepted fact.

## 7. Investigation Boards

Investigation Boards are visual evidence boards for arranging research material.

Boards may support pinning:

- Sources.
- Maps.
- Timelines.
- Images.
- Questions.
- Notes.
- Knowledge Objects.
- Calculations.
- Relationships.
- Convergence assessments.
- Reconstructions.
- Research gaps.

Boards should preserve provenance links and evidence status for every pinned item.

Board position, color, grouping, and visual emphasis are presentation choices. They do not alter evidence weight, confidence, or object authority.

## 8. Comparative Study

The workspace should support comparison between:

- Biblical accounts.
- Book of Mormon.
- Doctrine and Covenants.
- Pearl of Great Price.
- Historical journals.
- Pioneer diaries.
- Ancient sources.
- Modern scholarship.
- User collections.
- Approved reference libraries.

Comparison must preserve provenance, source boundaries, dependency relationships, lens scope, translation status, and review state.

Comparative display may reveal agreement, divergence, silence, qualified absence, dependency, and unresolved questions. It must not flatten distinct source classes into one authority.

## 9. Timeline Workspace

The workspace may allow multiple synchronized timelines.

Examples:

- Scriptural Events.
- Historical Events.
- Book of Mormon Translation.
- Lehi Journey.
- Paul's Missions.
- Pioneer Migration.
- Research Timeline.
- Personal Timeline.

No timeline is automatically canonical.

Timeline views should preserve explicit chronology, normalized chronology, derived chronology, estimated chronology, disputed chronology, and unknown chronology as distinct states.

Synchronized timelines may align events by date, relative sequence, source order, geography, research trail, or lens, but the alignment method must remain visible.

## 10. Geographic Workspace

Future map support may include:

- Interactive maps.
- Ancient routes.
- Modern maps.
- Elevation.
- Terrain.
- Travel distance.
- Water.
- Political boundaries.
- Archaeological sites.
- Confidence overlays.
- Route comparisons.

Example: Lehi Journey.

The workspace should support multiple candidate routes and display assumptions for each route.

It must never force one official route merely because a map requires a line.

Geographic views should distinguish explicit locations, historically supported locations, calculated routes, reconstructed routes, lens-derived locations, unknowns, and disputed points.

## 11. Visualization Workspace

Future visualization may include:

- Evidence Graphs.
- Relationship Diagrams.
- Journey Animations.
- Chronology Animations.
- Event Sequence.
- Evidence Density.
- Literary Structure.
- AI-assisted scene reconstruction.

Every visualization must identify represented elements as:

- Explicit.
- Historical.
- Inferred.
- Lens.
- Decorative.
- Unknown.
- Disputed.

Visualization never becomes evidence.

Visualization may help the user inspect evidence, but it must remain traceable to source records, observations, Knowledge Objects, convergence assessments, calculations, or rendering assumptions.

## 12. AI Assistant Workspace

Future GPT or AI interactions may:

- Summarize evidence.
- Suggest questions.
- Build timelines.
- Explain convergence.
- Prepare presentations.
- Generate research notebooks.
- Draft comparisons.
- Generate visualization instructions.
- Suggest alternate reconstructions.
- Identify missing evidence dimensions.

AI systems must never fabricate evidence.

All AI outputs remain attributable, reviewable, and subordinate to evidence. AI-generated notes, summaries, draft comparisons, and visualization instructions are workspace contributions until reviewed through future approved workflows.

AI output must preserve prompt/input context, model identity where available, generation time, source records consumed, assumptions, limitations, and review status.

## 13. Presentation Mode

Presentation Mode may support creation of:

- Study Reports.
- Research Reports.
- Teaching Slides.
- Interactive Lessons.
- Evidence Packets.
- Investigation Summaries.
- Source Comparison Packets.
- Timeline or map exhibits.

Presentations must preserve evidence links, confidence, provenance, unresolved questions, and lens boundaries where relevant.

A presentation is a curated downstream artifact. It may simplify but may not falsify.

## 14. Collaboration

Future collaboration may support:

- Shared Workspaces.
- Shared Notes.
- Reviewer Comments.
- Approval Workflow.
- Version History.
- Suggested Edits.
- Workspace Permissions.
- Shared Collections.
- Shared Presentations.

Collaboration must preserve authorship, review state, permissions, privacy boundaries, and contribution type.

Collaborative notes and suggestions do not become source evidence unless future source-registration and review workflows explicitly approve them.

## 15. Notebook Architecture

Notebooks may support:

- Rich Notes.
- Linked Notes.
- Evidence Citations.
- Embedded Maps.
- Embedded Timelines.
- Embedded Images.
- Embedded Calculations.
- Embedded Questions.
- Embedded Knowledge Objects.
- Embedded Convergence Assessments.

Notes never overwrite evidence.

Notebook entries should distinguish user observations, personal conclusions, hypotheses, questions, copied source quotations, generated summaries, and reviewed claims.

## 16. Saved Calculations

Users may save:

- Travel calculations.
- Chronology calculations.
- Translation estimates.
- Distance estimates.
- Population estimates.
- Evidence-density summaries.
- Source-dependency summaries.

Every saved calculation should preserve:

- Inputs.
- Assumptions.
- Formula.
- Version.
- Confidence.
- Included records.
- Excluded records.
- Alternate calculations.
- Sensitivity notes.
- Review state.

Saved calculations are workspace artifacts. They do not become evidence and may need recalculation when source data, assumptions, dates, object identity, or dependency relationships change.

## 17. Workspace Constitution

- Evidence remains primary.
- Presentation is temporary.
- Research is reproducible.
- AI is attributable.
- Visualization is reviewable.
- Collections never replace evidence.
- User conclusions remain separate from evidence.
- Research trails remain auditable.
- Workspaces organize evidence; they do not store or replace evidence.
- Notes may propose but may not silently promote.
- Exports preserve provenance.
- Maps and timelines expose uncertainty.
- Collaboration preserves authorship and review state.

## 18. Open Questions

- What minimum workspace record shape is needed before runtime implementation?
- Should Research Trails be automatic, user-controlled, or hybrid?
- How should private notes and shared notes remain separated?
- How should workspace permissions interact with source collections?
- How should exports preserve graph lineage?
- How should saved calculations signal stale assumptions?
- How should AI-assisted workspace actions be reviewed?
- How should collaborative review states map to canonical object review states?
- Should Evidence Boards support freeform spatial layout, structured columns, or both?
- How should very large workspaces remain performant?
- How should offline workspaces synchronize with canonical graph records?
- What citation format should presentations and exports use?
- How should deleted or superseded evidence appear in old presentations?
- How should workspace collections handle lens-contained records?

These questions require separate architecture or implementation tasks. They must not be resolved by unsupported assumptions.
