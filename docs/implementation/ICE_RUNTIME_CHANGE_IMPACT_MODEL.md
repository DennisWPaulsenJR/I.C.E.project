# I.C.E. Runtime Change Impact Model

**Task ID:** ICE-IMP-0007
**Status:** Change impact classification model
**Scope:** Documentation only

## Purpose

This document defines how future implementation changes are classified by impact area and scope.

## Impact Scope Classes

| Class | Definition | Review expectation |
| --- | --- | --- |
| Local | Affects one runtime owner and no durable storage or semantic output | Targeted QA and standard review |
| Cross-component | Affects multiple runtime owners or handoff boundaries | Expanded QA and ownership review |
| Cross-domain | Affects multiple architecture domains such as context plus semantics plus presentation | Architecture traceability review and broad QA |
| Repository-wide | Affects global behavior, storage policy, build/test workflow, or many files | Explicit planning task before implementation |

## Impact Areas

| Area | Impact question |
| --- | --- |
| Runtime behavior | Does user-visible or internal behavior change? |
| Storage | Are keys read, written, deleted, migrated, or reclassified? |
| Evidence | Does capture/source handling change? |
| Provenance | Does source lineage or reason-for-inclusion change? |
| Context | Does active scope, selected range, Context Lock, or generation behavior change? |
| Observation | Are observation records created, changed, or reclassified? |
| Rules | Are heuristics or constitutional rule boundaries affected? |
| Confidence | Are confidence labels, propagation, or display changed? |
| Reliability | Are QA/trust/health semantics changed? |
| Explanation | Are explainability/provenance displays changed? |
| Consumer presentation | Does popup, overlay, Study Panel, graph, or report output change? |
| Extensions | Does manifest/extension boundary change? |
| QA | Are verification assets added, removed, or changed? |
| Documentation | Are implementation or architecture docs changed? |

## Impact Escalation Rules

Escalate review if:

- Storage authority changes.
- Semantic outputs change.
- Clear All behavior changes.
- Queue behavior changes.
- `study.js` behavior changes across multiple surfaces.
- Graph behavior changes from display-only to authority-affecting.
- Diagnostics become corrective.
- Presentation/lens records become durable semantic outputs.

## Compatibility Classification

Future change reviews should classify compatibility as:

- Compatible.
- Compatible with clarification.
- Partially compatible.
- Runtime behavior requires future correction.
- Insufficient evidence.
- Not currently implemented.

## Boundary

This model classifies changes. It does not authorize or implement them.
