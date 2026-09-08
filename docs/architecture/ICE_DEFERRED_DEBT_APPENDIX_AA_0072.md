# I.C.E. Deferred-Debt Appendix

Document: ICE_DEFERRED_DEBT_APPENDIX_AA_0072
Revision: AA_0072
Status: Deferred, non-blocking
Freeze source: I.C.E._AA_0071
Baseline: `master` at `4bc57e45662d580a3e69fdcea4965b128625c2a8`

All entries below remain deferred. Each has no confirmed authority consequence and is not a reason to invalidate the controlled architecture freeze.

| ID | Domain | Short description | Class | Severity | Blocking | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GRAPH-FRESH-002 | Graph | Cross-run graph identity/reproducibility | Reproducibility | Medium | No | Deferred |
| QUEUE-AUTH-002 | Queue | Queue terminology and boundary refinement | Documentation | Low | No | Deferred |
| OBS-EVID-002 | Observation | Cross-run observation identity | Reproducibility | Medium | No | Deferred |
| OBS-EVID-003 | Observation | Variable evidence-to-observation provenance completeness | Source/parent trace | Medium | No | Deferred |
| ENT-ID-002 | Entity | Timestamp-bearing entity identifiers | Identity | Medium | No | Deferred |
| ENT-ID-003 | Entity | Entity enrichment refinement | Identity | Medium | No | Deferred |
| ENT-ID-004 | Entity | Alias/type/merge provenance completeness | Derivation trace | Medium | No | Deferred |
| CRT-AUTH-001 | Evaluation | Deferred evaluation authority refinement | Evaluation | Medium | No | Deferred |
| CRT-AUTH-002 | Evaluation | Deferred evaluation coverage/refinement | Evaluation | Medium | No | Deferred |
| CRT-AUTH-004 | Evaluation | Deferred evaluation assurance | Evaluation | Medium | No | Deferred |
| REL-VOC-001 | Relationship | Relationship vocabulary normalization | Normalization | Low | No | Deferred |
| LIFE-STOR-001 | Lifecycle | Legacy storage-family completeness | Legacy storage | Low | No | Deferred |
| LIFE-STOR-002 | Lifecycle | Same-generation stale-record distinguishability | Freshness | Medium | No | Deferred |
| LIFE-STOR-003 | Lifecycle | Partial persistence atomicity assurance | Atomicity | Medium | No | Deferred |
| REPRO-001 | Reproducibility | Timestamp-bearing derived IDs | Identity | Medium | No | Deferred |
| REPRO-002 | Reproducibility | Parent-ID-dependent observation identity | Traceability | Medium | No | Deferred |
| REPRO-003 | Reproducibility | Partial-write reconstruction assurance | Persistence | Medium | No | Deferred |
| PROV-AUD-001 | Provenance | Derivation and merge explanation completeness | Derivation trace | Medium | No | Deferred |
| PROV-AUD-002 | Provenance | Exact source-position trace incompleteness | Span | Low | No | Deferred |
| PROV-AUD-003 | Provenance | Volatile cross-run lineage identifiers | Cross-run | Medium | No | Deferred |
| PROV-AUD-004 | Provenance | Partial-write provenance completeness | Persistence | Medium | No | Deferred |

Deferred entries must not be merged, silently closed, or promoted into authority. Future work requires its own governed review and authorization.
