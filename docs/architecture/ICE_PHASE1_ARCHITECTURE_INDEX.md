# I.C.E. Phase I Architecture Index

Task ID: ICE-ARCH-0019

Status: documentation only. This index consolidates approved Phase I architecture references and does not implement runtime code, APIs, executable rules, schemas, databases, services, queues, storage, UI, or deployment.

## 1. Purpose

This document is the Phase I master architecture index for I.C.E. It organizes approved architecture documents by domain, purpose, dependency, and architectural layer.

It does not redesign or replace the underlying documents.

## 2.1 Controlled Architecture Freeze

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `docs/architecture/ICE_ARCHITECTURE_FREEZE_AA_0072.md` | Controlled cross-domain authority freeze verified by AA_0071. | AA_0071 cross-domain audit | freeze baseline |
| `docs/architecture/ICE_DEFERRED_DEBT_APPENDIX_AA_0072.md` | Explicit register of deferred, non-blocking assurance and reproducibility debt. | AA_0071 and AA_0070 | deferred debt |

## 2. Governing And Coordination Layer

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `MASTER_DESIGN.md` | First-read reconstructed product and architecture overview. | durable architecture corpus | governing overview |
| `THREAD_ARCHIVE/ICE_CONSTITUTION_V2.md` | Governing constitutional rules for future work. | Constitution v1 and Phase I decisions | constitutional |
| `THREAD_ARCHIVE/ICE_CONSTITUTION_V1.md` | Historical constitutional architecture. | prior trust model | historical constitutional |
| `THREAD_ARCHIVE/ARCHITECTURE_BASELINE_V1.md` | Architecture Baseline Version 1.0 declaration. | Phase I architecture corpus | baseline declaration |
| `IMPLEMENTATION_MANIFEST.md` | Ordered implementation roadmap and GPT Review Gate standard. | approved architecture baseline | implementation planning |
| `THREAD_ARCHIVE/ARCHITECTURE_INDEX.md` | Repository architecture dependency map. | architecture corpus | index |
| `PROJECT_STATE.md` | Active operational state. | current repository truth | coordination |
| `PROJECT_LOG.md` | Historical project milestone log. | completed tasks | coordination |
| `ORCHESTRATION/README.md` | Desktop Codex / mobile GPT handoff protocol. | ICE-OPS-0001 | orchestration |

## 3. Mission, Workspace, Lens, And Knowledge Layer

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `THREAD_ARCHIVE/ICE_ARCHITECTURAL_MISSION_STATEMENT.md` | Foundational mission philosophy. | master design direction | mission |
| `THREAD_ARCHIVE/UNDERSTANDING_ENGINE_ROADMAP.md` | Long-term Understanding Engine roadmap. | mission, constitution | direction |
| `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_ARCHITECTURE.md` | Persistent Knowledge Object and Character Profile architecture. | observations, evidence, provenance | knowledge |
| `THREAD_ARCHIVE/STUDY_WORKSPACE_ARCHITECTURE.md` | Future Study Workspace architecture. | evidence, knowledge objects | workspace |
| `THREAD_ARCHIVE/STUDY_WORKSPACE_AND_RESEARCH_WORKFLOW_ARCHITECTURE.md` | Workspace orchestration and research workflow architecture. | workspace, evidence graph | workspace |
| `THREAD_ARCHIVE/LENS_ARCHITECTURE.md` | Lens, concurrent lens evaluation, convergence, and divergence architecture. | evidence, confidence, perspectives | presentation / evaluation |

## 4. Observation, Evidence, Context, And Situation Layer

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `THREAD_ARCHIVE/OBSERVATION_ENGINE_PHASE_1.md` | Current Observation Engine Phase 1 architecture. | source/candidate extraction | observation |
| `THREAD_ARCHIVE/CANONICAL_OBSERVATION_AND_RESEARCH_GAP_ARCHITECTURE.md` | Canonical observations and Research Gap Engine architecture. | observation, evidence | observation / research gap |
| `THREAD_ARCHIVE/ICE_CONTEXT_RESOLUTION_ARCHITECTURE.md` | Evidence-centered Context Resolution architecture. | observations, evidence | context |
| `THREAD_ARCHIVE/ICE_SITUATIONAL_UNDERSTANDING_MODEL.md` | Situational understanding model. | context, state | situation |
| `THREAD_ARCHIVE/ICE_STATE_MODEL.md` | Descriptive State Model. | context, evidence | state |
| `THREAD_ARCHIVE/ICE_CONTEXT_SERVICE_SPECIFICATION.md` | Conceptual Context Service boundary. | context, state, situation | service boundary |
| `docs/architecture/ICE_EVIDENCE_PROVENANCE_MODEL.md` | Evidence provenance origin and continuity. | evidence | provenance |
| `docs/architecture/ICE_EVIDENCE_IDENTITY_MODEL.md` | Conceptual evidence identity. | provenance, lineage | evidence identity |
| `docs/architecture/ICE_CHAIN_OF_CUSTODY_ARCHITECTURE.md` | Conceptual evidence custody across transformations. | provenance, identity | custody |
| `docs/architecture/ICE_TRACEABILITY_ARCHITECTURE.md` | Backward and forward reasoning traceability. | evidence, rules, confidence | traceability |
| `docs/architecture/ICE_SOURCE_RELIABILITY_MODEL.md` | Source reliability separated from evidence quality and confidence. | provenance, evidence | source reliability |
| `docs/architecture/ICE_EVIDENCE_LINEAGE_MODEL.md` | Parent, derived, aggregated, referenced, and historical evidence lineage. | identity, provenance | lineage |
| `docs/architecture/ICE_AUDIT_AND_REPRODUCIBILITY_ARCHITECTURE.md` | Auditability and reproducibility. | traceability, lineage | audit |

## 5. Confidence, Reliability, Rule, And Explanation Layer

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `THREAD_ARCHIVE/ICE_EVALUATION_RELIABILITY_ARCHITECTURE.md` | Evaluation reliability architecture. | evidence, process, limitations | reliability |
| `THREAD_ARCHIVE/ICE_CONFIDENCE_CALIBRATION_MODEL.md` | Confidence calibration model. | evidence, coverage, capability | confidence |
| `THREAD_ARCHIVE/ICE_EVALUATION_COVERAGE_MODEL.md` | Evaluation coverage model. | evidence, methods | coverage |
| `THREAD_ARCHIVE/ICE_CAPABILITY_BOUNDARY_ARCHITECTURE.md` | Capability boundary architecture. | tools, access, environment | capability |
| `THREAD_ARCHIVE/ICE_TRUST_AND_LIMITATIONS_MODEL.md` | Trust and limitations model. | reliability, confidence | trust |
| `docs/architecture/ICE_CONSTITUTIONAL_RULE_ENGINE.md` | Constitutional Rule Engine architecture. | constitution, runtime components | rule governance |
| `docs/architecture/ICE_RULE_HIERARCHY_MODEL.md` | Rule hierarchy and precedence. | constitution, rules | rule hierarchy |
| `docs/architecture/ICE_RULE_EVALUATION_SEQUENCE.md` | Deterministic conceptual rule evaluation sequence. | rule hierarchy | rule sequence |
| `docs/architecture/ICE_CONFLICT_RESOLUTION_MODEL.md` | Conceptual conflict handling. | evidence, context, rules | conflict resolution |
| `docs/architecture/ICE_CONFIDENCE_PROPAGATION_MODEL.md` | Confidence movement through reasoning. | confidence calibration | confidence propagation |
| `docs/architecture/ICE_EXPLANATION_GENERATION_MODEL.md` | Transparent explanation architecture. | evidence, rules, confidence, reliability | explanation |

## 6. Evidence Graph, Runtime, Extensions, And Consumers

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `THREAD_ARCHIVE/KNOWLEDGE_OBJECT_LIFECYCLE_AND_EVIDENCE_GRAPH_ARCHITECTURE.md` | Evidence Graph and Knowledge Object lifecycle architecture. | observations, provenance | evidence graph |
| `THREAD_ARCHIVE/EVIDENCE_CONVERGENCE_TEMPORAL_REASONING_AND_RECONSTRUCTION_ARCHITECTURE.md` | Evidence convergence, temporal reasoning, and reconstruction architecture. | evidence graph, lenses | convergence |
| `THREAD_ARCHIVE/RUNTIME_LAYER_AND_PROCESSING_PIPELINE_ARCHITECTURE.md` | Runtime layer and processing pipeline architecture. | architecture corpus | runtime direction |
| `THREAD_ARCHIVE/ICE_RUNTIME_COMPONENT_ARCHITECTURE.md` | Conceptual runtime component blueprint. | context, confidence, reliability | component blueprint |
| `THREAD_ARCHIVE/ICE_COMPONENT_RESPONSIBILITY_CATALOG.md` | Component ownership catalog. | runtime component architecture | responsibility |
| `THREAD_ARCHIVE/ICE_SERVICE_CONTRACT_MODEL.md` | Conceptual service-contract model. | component catalog | contracts |
| `THREAD_ARCHIVE/ICE_DEPENDENCY_AND_EXECUTION_GRAPH.md` | Dependency and execution graph. | service contracts | dependency |
| `THREAD_ARCHIVE/ICE_EXTENSION_FRAMEWORK_ARCHITECTURE.md` | Extension framework architecture. | components, contracts | extension |
| `THREAD_ARCHIVE/ICE_CONSUMER_INTEGRATION_BOUNDARY.md` | Consumer integration boundary. | presentation, trust, limitations | consumer |
| `docs/architecture/ICE_RUNTIME_COMPONENT_ARCHITECTURE.md` | GPT-requested runtime component packet. | prior runtime architecture | review packet |
| `docs/architecture/ICE_EXECUTION_LIFECYCLE.md` | Conceptual execution lifecycle. | runtime component packet | lifecycle |
| `docs/architecture/ICE_SERVICE_INTERACTION_MODEL.md` | Conceptual service interactions. | runtime component packet | interactions |
| `docs/architecture/ICE_DEPENDENCY_GRAPH.md` | Conceptual dependency graph. | runtime component packet | dependency |
| `docs/architecture/ICE_EXTENSION_FRAMEWORK.md` | Extension framework review packet. | extension architecture | extension |
| `docs/architecture/ICE_COMPONENT_RESPONSIBILITY_CATALOG.md` | Component responsibility packet. | runtime component packet | responsibility |

## 7. Adjacent ALIGN Platform Layer

| Document | Purpose | Depends On | Layer |
| --- | --- | --- | --- |
| `THREAD_ARCHIVE/ALIGN_PLATFORM_VISION.md` | ALIGN platform vision. | I.C.E. evidence and understanding | adjacent platform |
| `THREAD_ARCHIVE/ALIGN_ARCHITECTURE.md` | ALIGN engine architecture. | ALIGN vision | adjacent platform |
| `THREAD_ARCHIVE/ALIGN_CONSTITUTION.md` | ALIGN constitutional principles. | ALIGN vision | adjacent constitution |
| `THREAD_ARCHIVE/ALIGN_PLATFORM_ROADMAP.md` | ALIGN domain roadmap. | ALIGN architecture | roadmap |
| `THREAD_ARCHIVE/ALIGN_TERMINOLOGY.md` | ALIGN terminology. | ALIGN architecture | glossary |
| `THREAD_ARCHIVE/ALIGN_EARLY_DETECTION_ARCHITECTURE.md` | Early detection architecture. | ALIGN architecture, I.C.E. context | early detection |
| `THREAD_ARCHIVE/ALIGN_SITUATIONAL_AWARENESS_MODEL.md` | Situational awareness model. | I.C.E. context | awareness |
| `THREAD_ARCHIVE/ALIGN_IOT_AND_DEVICE_INTEGRATION_ARCHITECTURE.md` | IoT/device integration boundaries. | ALIGN, P.A.S.S. boundary | device boundary |
| `THREAD_ARCHIVE/ALIGN_CONTROLLED_ESCALATION_FRAMEWORK.md` | Controlled escalation framework. | ALIGN constitution | escalation |
| `THREAD_ARCHIVE/ALIGN_PASS_INTEGRATION_BOUNDARY.md` | P.A.S.S. integration boundary. | ALIGN, P.A.S.S. | peer boundary |
| `THREAD_ARCHIVE/ALIGN_SIGNAL_CONFIDENCE_AND_ANOMALY_MODEL.md` | Signal confidence and anomaly model. | early detection | signal confidence |

## 8. Phase I Dependency Summary

Phase I reads from constitutional and mission documents into observation/evidence/context, then into confidence/reliability/rules/explanation, then into runtime components, extension boundaries, and consumer handoff.

ALIGN remains an adjacent consumer/platform architecture. It may consume I.C.E. evidence-centered understanding, but it does not own I.C.E. reasoning.
