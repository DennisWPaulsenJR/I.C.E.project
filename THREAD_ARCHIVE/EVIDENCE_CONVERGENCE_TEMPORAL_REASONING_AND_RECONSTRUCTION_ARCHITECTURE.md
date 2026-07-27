# Evidence Convergence, Temporal Reasoning, And Reconstruction Architecture

Task ID: ICE-ARCH-0010

Status: Architecture only. No runtime behavior, storage schema, migration, timeline calculation, convergence score, literary analysis engine, reconstruction engine, image generation, graph database, Study Panel behavior, Observation Engine change, Knowledge Object runtime, source connector, crawling, queue behavior, QA script, package update, or automatic evaluation is created by this document.

Project identity: I.C.E. - Integrated Comprehension Engine.

Prerequisites reviewed:

- `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md`.
- `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md`.

## 1. Purpose

This architecture governs how I.C.E. evaluates:

- Multiple accounts.
- Event chronology.
- Source agreement.
- Source disagreement.
- Source dependence.
- Missing evidence.
- Temporal relationships.
- Possible reconstructions.
- Confidence evolution.

It supports scripture study, historical travel records, pioneer journals, Book of Mormon translation chronology, biographies, legal and documentary collections, comparative corpora, and other multi-source research workflows.

I.C.E. organizes evidence and uncertainty.

I.C.E. does not force a theological, historical, apologetic, skeptical, or ideological conclusion.

The user must be able to inspect the evidence, assumptions, calculations, alternatives, and source relationships behind every presentation.

## 2. Constitutional Separation

I.C.E. must preserve separation between:

- Source material.
- Extracted observation.
- Normalized observation.
- Temporal assertion.
- Dependency assertion.
- Convergence assessment.
- Interpretation.
- Reconstruction.
- Presentation.
- User conclusion.

None of the following automatically becomes evidence:

- Generated narrative.
- Visual reconstruction.
- Timeline placement.
- Confidence label.
- Calculated estimate.
- Lens contribution.
- AI-generated image.

Each layer may organize or derive from prior evidence, but no layer may rewrite the source, erase uncertainty, or silently upgrade its authority.

## 3. Evidence Convergence Model

Evidence Convergence is structured comparison among observations and sources. It asks where records materially agree, where they differ, whether the sources are independent, and which dimensions remain unresolved.

Convergence states may include:

- Strong agreement.
- Partial agreement.
- Complementary reporting.
- Compatible difference.
- Unresolved divergence.
- Direct contradiction.
- Chronology conflict.
- Identity conflict.
- Numerical conflict.
- Geographic conflict.
- Silence.
- Qualified absence.
- Unknown relationship.

Convergence is not simple vote counting. Five sources derived from one earlier source must not automatically be treated as five independent witnesses.

Convergence may increase research interest or confidence in a specific dimension, but it does not establish truth by majority.

## 4. Source Independence And Dependency

Future source relationship types may include:

- Independent witness.
- Possible independent witness.
- Shared source.
- Derived from.
- Copied from.
- Summarized from.
- Translated from.
- Edited from.
- Quoted from.
- Retrospective recollection.
- Institutional compilation.
- Oral tradition.
- Unknown dependency.
- Disputed dependency.

Source dependency affects convergence presentation without erasing underlying observations. A dependent account may preserve important evidence, but it should not be counted as an independent witness unless dependency review supports that status.

Dependency must remain attributable and reviewable. A dependency assertion is itself a record that should preserve evidence, confidence, provenance, review state, and uncertainty.

## 5. Source Metadata Relevant To Convergence

Future convergence evaluation may require metadata such as:

- Author or recorder.
- Witness role.
- Date of event.
- Date recorded.
- Place recorded.
- Original language.
- Surviving copy date.
- Translation history.
- Editorial history.
- Proximity to event.
- Direct or indirect participation.
- Intended audience.
- Genre.
- Known source dependencies.
- Later revisions.
- Disputed attribution.
- Provenance confidence.

This document does not implement a metadata schema. It defines architectural requirements only.

Metadata should remain incomplete when not available. Missing metadata should create questions or confidence limits, not invented context.

## 6. Convergence Assessment Object

A future persistent Convergence Assessment Object should reference:

- Subject event, person, place, journey, question, or claim.
- Participating observations.
- Participating sources.
- Source dependency relationships.
- Agreement dimensions.
- Divergence dimensions.
- Excluded sources and reasons.
- Unresolved questions.
- Assessment history.
- Reviewer history.
- Confidence dimensions.
- Presentation summaries.

A convergence assessment must be recalculable when new evidence is added, source dependency changes, dates shift, observations are superseded, or review decisions change.

The assessment must never overwrite its contributing observations.

## 7. Dimensions Of Agreement

Agreement can occur independently across dimensions such as:

- Identity.
- Event occurrence.
- Date.
- Time of day.
- Sequence.
- Duration.
- Location.
- Route.
- Participants.
- Speech content.
- Action.
- Motive.
- Physical conditions.
- Weather.
- Quantities.
- Literary structure.
- Consequence.

Two accounts may agree that an event occurred while disagreeing on sequence, number, wording, or location.

I.C.E. must preserve dimensional distinctions so a strong agreement in one dimension does not hide uncertainty in another.

## 8. Divergence And Contradiction

Divergence categories include:

- Omission: a source leaves out a detail.
- Silence: a source does not address a dimension within a declared scope.
- Complementary detail: sources add different compatible details.
- Compatible variation: wording or framing differs without clear conflict.
- Unresolved difference: records differ but the conflict cannot yet be characterized.
- Apparent contradiction: records appear to conflict under one interpretation or assumption set.
- Direct contradiction: explicit propositions conflict under the same scope, time, place, and identity assumptions.
- Irreconcilable contradiction under current evidence: no currently supported reconciliation can preserve all propositions.

Silence must not automatically be treated as denial.

A contradiction determination must identify:

- Exact propositions in conflict.
- Scope.
- Time.
- Place.
- Identity.
- Translation effects.
- Assumptions required to produce the conflict.
- Evidence supporting each proposition.
- Review state.

Contradiction records may be reviewed or revised as evidence, chronology, translation, identity, or source dependency changes.

## 9. Temporal Reasoning Model

Temporal reasoning is evidence-based placement and ordering of events.

Supported temporal evidence categories include:

- Explicit dates.
- Relative dates.
- Durations.
- Sequence statements.
- Before and after statements.
- Simultaneous events.
- Approximate timing.
- Recurring events.
- Date ranges.
- Uncertain placement.
- Inferred intervals.
- Disputed chronology.
- Unknown chronology.

Temporal classification must distinguish:

- Explicit chronology.
- Normalized chronology.
- Derived chronology.
- Historically supplied chronology.
- Lens chronology.
- Estimated chronology.
- Speculative chronology.

Temporal reasoning may organize records, propose alternatives, and expose uncertainty. It may not force an official narrative because one ordering is easier to draw.

## 10. Before / During / After Context Windows

Context Windows are reusable organizational views for Events, Journeys, Situations, and Research Questions.

### Before

May contain:

- Prior explicit events.
- Known participants.
- Known locations.
- Historical context.
- Cultural context.
- Unresolved setup questions.
- Possible preparations.
- Temporal constraints.

### During

May contain:

- Explicit observations.
- Participant actions.
- Location changes.
- Dialogue.
- Environmental conditions.
- Evidence-supported possibilities.
- Conflicting accounts.
- Practical constraints.
- Unknowns.

### After

May contain:

- Explicit consequences.
- Immediate responses.
- Later references.
- Changed relationships.
- Subsequent journeys.
- Later recollections.
- Unresolved consequences.
- Related research questions.

A Context Window is an organizational view, not proof of causation.

## 11. Event Sequence Architecture

I.C.E. may represent alternative event sequences, including:

- Canonical sequence candidate.
- Alternate sequence.
- Unresolved partial ordering.
- Parallel events.
- Mutually exclusive sequences.
- Sequence branches.

Each sequence should preserve:

- Supporting observations.
- Assumptions.
- Dependency relationships.
- Unresolved conflicts.
- Confidence dimensions.
- Review state.
- Affected presentations.

No sequence may silently become the official narrative merely because it is visually convenient.

## 12. Duration And Rate Calculations

Future calculations may include:

- Distance per travel day.
- Pages produced per active translation day.
- Event frequency.
- Documented interruption periods.
- Manuscript production rates.
- Time between recorded events.

Every calculated value must expose:

- Input observations.
- Selected date boundaries.
- Included days.
- Excluded days.
- Interruption assumptions.
- Unit definition.
- Formula.
- Uncertainty range.
- Alternate calculations.
- Sensitivity to changed assumptions.

For Book of Mormon translation chronology, I.C.E. may present multiple calculation families under explicit assumptions, such as:

- Total elapsed-day rate.
- Estimated active-workday rate.
- Manuscript-page rate.
- Printed-page equivalent rate.
- Unknown or disputed production periods.

I.C.E. must not assert a fixed pages-per-day figure as fact unless a source explicitly supports that exact claim and the claim remains attributed. Estimates remain estimates.

## 13. Literary Structure Analysis

Future literary structure analysis may present proposed textual structures such as:

- Chiasmus.
- Parallelism.
- Inclusio.
- Repetition.
- Ring composition.
- Thematic symmetry.
- Other literary patterns.

Structure categories must distinguish:

- Directly observable textual repetition.
- Algorithmically detected candidate structure.
- Published scholarly proposal.
- Lens-based interpretation.
- Disputed pattern.
- User-created proposal.

Every proposed structure must preserve:

- Source text boundaries.
- Selected terms or concepts.
- Normalization choices.
- Omitted text.
- Matching criteria.
- Researcher attribution.
- Methodology.
- Alternate structures.
- Confidence dimensions.
- Review state.

Pattern detection alone does not prove authorship, antiquity, inspiration, fabrication, or intentional design.

## 14. Reconstruction Architecture

A Situational Reconstruction is a labeled model of what may have occurred.

Reconstruction classes may include:

- Text-constrained reconstruction.
- Historically informed reconstruction.
- Geographic reconstruction.
- Journey reconstruction.
- Chronology reconstruction.
- Social reconstruction.
- Architectural reconstruction.
- Visual scene reconstruction.

Each reconstruction must expose:

- Explicit elements.
- Inferred elements.
- Historical-context elements.
- Lens elements.
- Unresolved elements.
- Excluded alternatives.
- Confidence dimensions.
- Evidence basis.
- Assumptions.
- Review state.

A reconstruction must never overwrite the observations from which it was formed.

## 15. Possibility Architecture

Possibility records preserve evidence-supported possibilities without treating them as facts.

Each possibility should include:

- Proposition.
- Supporting observations.
- Opposing observations.
- Required assumptions.
- Source dependency.
- Historical plausibility.
- Temporal plausibility.
- Geographic plausibility.
- Known alternatives.
- Unanswered questions.
- Confidence dimensions.
- Review state.

Conceptual Jerusalem example:

- Christ may have remained in or near the Temple for part or all of the interval.
- Christ may have participated in teaching, listening, questioning, or discussion across more than one day.
- His sleeping location is unknown.
- His food intake must not be assumed because fasting, worship, and other conditions may be relevant.
- A possible association with relatives or pilgrimage-company members must remain unconfirmed.
- John, approximately six months older than Christ, could be presented only as a carefully bounded possibility if chronology, family relationship, pilgrimage practice, and expert material support considering it.

The engine must not say John was present unless a source explicitly supports that claim.

The engine may show why the question arises and what evidence would be needed to strengthen or reject it.

## 16. Practical Constraint Without Practical Assumption

I.C.E. must distinguish:

- Physical or biological constraint.
- Likely ordinary behavior.
- Undocumented action.

Examples:

- A human body has physical needs.
- That does not prove when, where, or whether a specific person ate during a particular interval.
- Fasting may be historically, culturally, or religiously relevant.
- Sleeping location may be necessary to investigate, but a specific location must not be invented.

I.C.E. may generate a research question from practical constraints without converting presumed ordinary behavior into an explicit observation.

## 17. Historical Travel And Journey Convergence

Future journey convergence may reconstruct journeys from multiple accounts.

Pioneer travel to the Salt Lake Valley is a conceptual example. Potential sources may include:

- Company rosters.
- Journals.
- Daily logs.
- Maps.
- Camp locations.
- Weather accounts.
- River crossings.
- Distance estimates.
- Deaths.
- Births.
- Livestock events.
- Supply records.
- Government records.
- Newspaper accounts.
- Later recollections.
- Route alternatives.

I.C.E. should show:

- Where sources agree.
- Where they contribute different details.
- Where they conflict.
- Which accounts are dependent.
- Where evidence is sparse.
- Which route segments are explicit, calculated, reconstructed, or unresolved.

This document does not implement pioneer data.

## 18. Book Of Mormon Translation Research Example

I.C.E. may organize research concerning the writing or translation of the Book of Mormon by separating source categories such as:

- Original manuscript evidence.
- Printer's manuscript evidence.
- Contemporary witness accounts.
- Later recollections.
- Correspondence.
- Publication records.
- Printing records.
- Travel records.
- Revelations.
- Financial records.
- Hostile reports.
- Supportive reports.
- Modern scholarship.

The architecture separates:

- Explicit documentary evidence.
- Witness recollection.
- Later interpretation.
- Timeline calculation.
- Literary analysis.
- Source dependency.
- Apologetic lens.
- Skeptical lens.
- Historical lens.
- User conclusion.

The system may permit users to see how quickly work may have occurred under different assumptions while preventing an estimated rate from being presented as an uncontested fact.

## 19. Non-Biased Presentation Architecture

Non-biased does not mean all claims receive equal evidentiary weight.

Operationally, non-biased means I.C.E.:

- Preserves provenance.
- Exposes assumptions.
- Applies the same evidence rules consistently.
- Distinguishes source classes.
- Shows meaningful alternatives.
- Identifies uncertainty.
- Allows attributed lenses.
- Does not silently privilege a desired conclusion.

I.C.E. may display stronger support, weaker support, unresolved claims, disputed claims, and unsupported claims without becoming an advocate.

## 20. Multidimensional Confidence

Confidence must be multidimensional rather than one universal percentage.

Potential dimensions include:

- Textual confidence.
- Extraction confidence.
- Source authenticity confidence.
- Source dating confidence.
- Source independence confidence.
- Identity confidence.
- Chronology confidence.
- Geographic confidence.
- Duration confidence.
- Historical-context confidence.
- Linguistic confidence.
- Literary-structure confidence.
- Reconstruction confidence.
- Convergence confidence.

Low confidence in one dimension must not automatically lower unrelated dimensions.

Example: an event may have high occurrence confidence but low sequence confidence.

## 21. Evidence Density

Evidence Density is a future descriptive metric or visualization aid.

It may indicate:

- Number of relevant observations.
- Number of source families.
- Degree of source independence.
- Coverage across dimensions.
- Chronological concentration.
- Geographic concentration.
- Unresolved conflict.

Evidence Density is not truth probability.

A heavily documented false report may have high evidence density. A true but sparsely documented event may have low evidence density.

## 22. Research Gap Generation

Convergence and temporal analysis may produce Research Question Objects.

Examples:

- Which source first introduced this detail?
- Are these accounts independent?
- Does the disagreement disappear under a different chronology?
- Are two locations being conflated?
- Is a later recollection dependent on an earlier publication?
- What date range remains possible?
- What evidence would distinguish between alternate routes?
- Does manuscript evidence support the claimed rate?
- Is a literary structure stable under alternate text boundaries?
- What information is missing regarding the Jerusalem interval?

Questions must remain questions until evidence supports a new status.

## 23. Expert Material And Approved Reference Libraries

Expert material may contribute without becoming unquestioned fact.

Sources may include:

- Approved reference libraries.
- Peer-reviewed scholarship.
- Denominational scholarship.
- Historical experts.
- Linguistic experts.
- Archaeological sources.
- User-approved sources.
- Disputed scholarship.
- Minority interpretations.

Each contribution must preserve:

- Author.
- Publication.
- Date.
- Field of expertise.
- Methodology.
- Source use.
- Viewpoint or institutional context when relevant.
- Review status.
- Scope.
- Confidence dimensions.

An expert contribution may strengthen historical plausibility but must not overwrite primary evidence.

## 24. Lens Interaction

Possible lenses for convergence and temporal reasoning include:

- Historical-critical.
- Latter-day Saint.
- Traditional Christian.
- Jewish historical.
- Linguistic.
- Archaeological.
- Skeptical.
- Literary.
- Devotional.
- Legal-evidentiary.
- User-defined.

Lenses may:

- Prioritize questions.
- Contribute interpretations.
- Suggest alternate reconstructions.
- Identify relevant scholarship.
- Produce lens-scoped convergence assessments.

Lenses may not:

- Alter source text.
- Erase observations.
- Convert interpretation into explicit evidence.
- Hide conflicting material.
- Promote lens conclusions into neutral records automatically.

## 25. Visualization And Rendering Hooks

Future visualization interfaces may include:

- Interactive timelines.
- Synchronized timelines.
- Event sequence diagrams.
- Evidence graphs.
- Source dependency graphs.
- Journey maps.
- Geographic overlays.
- Relationship diagrams.
- Literary-structure diagrams.
- Confidence overlays.
- Evidence-density views.
- AI-assisted scene reconstruction.

This document does not implement rendering.

Every rendered element should be able to identify its evidentiary status. For a future generated image or reconstructed scene, each represented item should be classifiable as:

- Explicit.
- Historically supported.
- Inferred.
- Lens-derived.
- Decorative.
- Unknown.
- Disputed.

Visualization must never become evidence.

## 26. AI And GPT Cycle Boundaries

Future AI-assisted analysis or rendering may:

- Extract candidate observations.
- Propose temporal relationships.
- Suggest source dependency.
- Generate research questions.
- Identify possible literary structures.
- Propose alternate reconstructions.
- Summarize convergence.
- Prepare visual scene instructions.

AI-assisted outputs must not silently:

- Fabricate a source.
- Invent a quotation.
- Invent a date.
- Invent a participant.
- Invent a route.
- Convert a possibility into fact.
- Conceal contradictory evidence.
- Treat a generated image or narrative as source material.

All AI-derived outputs must preserve model attribution, generation date, inputs, review state, and lineage.

## 27. Recalculation And Change Propagation

Future systems should mark affected records for recalculation when:

- New source is added.
- Date changes.
- Observation is superseded.
- Dependency relationship changes.
- Source is discredited.
- Translation is corrected.
- Merge or split occurs.
- Reviewer changes an assessment.

Affected convergence assessments, timelines, calculations, reconstructions, and visualizations must be marked for recalculation.

Prior versions must remain auditable.

This document does not implement automatic recalculation.

## 28. Review And Acceptance Boundaries

Future convergence assessments, calculations, timelines, and reconstructions may use review states such as:

- Generated.
- Unreviewed.
- Candidate.
- Reviewed.
- Accepted for workspace use.
- Disputed.
- Superseded.
- Deprecated.
- Archived.

Accepted means accepted for a defined research context or workspace.

Accepted does not mean universally proven.

## 29. Open Questions

- How should source independence be estimated?
- Should convergence ever have a numeric score?
- How should silence be represented?
- How should disputed dates be rendered?
- How should alternate chronologies be compared?
- How should literary-pattern significance be evaluated?
- How should AI-generated reconstruction elements be individually annotated?
- How should denominational and scholarly lenses be balanced in presentation?
- How should user-created claims enter review?
- What minimum provenance is required before a source enters convergence analysis?
- When should a reconstruction be recalculated automatically?
- Should evidence-density calculations be global or workspace-specific?
- How should contradictory expert assessments be represented?
- How should manuscript page counts be normalized against printed editions?

Do not resolve questions that require later architectural or implementation decisions.

## 30. Constitutional Principles

- Evidence remains attributable.
- Observations are not automatically facts.
- Source count is not source independence.
- Convergence does not erase divergence.
- Silence is not automatically contradiction.
- Calculations must expose assumptions.
- Chronology must expose uncertainty.
- Interpretation must remain attributable.
- Reconstructions must remain labeled.
- Possibility must not become fact through repetition.
- Expert authority does not replace evidence.
- Presentation is not evidence.
- Visualization is not evidence.
- Generated images are not evidence.
- AI output is reviewable and attributable.
- The engine organizes evidence; the user forms conclusions.
