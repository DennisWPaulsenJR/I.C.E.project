# 2026-05 Project Architecture Notes

Compact architecture summary for recovery/context. This is not a raw transcript.

## Semantic Graph Foundation

I.C.E. is moving from page formatting into source-grounded semantic comprehension. Current graph layers include semantic events, semantic flow chains, entity registry, relationship graph, canonical identities, actor timelines, interactions, scenes, principles, prophecy links, and source metadata.

## Entity / Mention Distinction

Canonical entities are stable graph nodes. Mentions are surface references that may or may not become canonical entities. The Mention Index tracks named entities, role/title words, group collectives, lineage persons, pronouns, divine titles, objects, places, and symbolic references without over-promoting every word.

## DOM Ingestion

DOM Semantic Hints capture optional source markup when available. For churchofjesuschrist.org scripture pages, hints include verse scopes, `data-eng-ref`, deity markup, uppercase title spans, study-note references, and separate I.C.E. render diagnostics. Plain text fallback remains required.

## Adapter Architecture

Source adapters provide progressive enrichment. Current adapters are LDS scripture, generic HTML, and plain text. Adapters detect semantic capabilities rather than replacing extraction. Future adapters may support BibleGateway, conference talks, PDFs, EPUB, Wikipedia, and academic papers.

## Scope-Aware Future Direction

ScopePath integrity positions items in a source hierarchy such as `scripture.nt.matthew.1.verse.20`. Future work should support source/time/doctrine scope, AI_Actor time-position awareness, cross-reference graphs, commentary anchors, original-language references, and Alpha-to-Omega source mapping.