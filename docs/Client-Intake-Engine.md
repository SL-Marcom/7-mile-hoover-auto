# Client Intake Engine

## Purpose

This engine is the shared intake layer for SiteLab. It gathers, validates, classifies, and stores the information the other engines need, and produces the structured inputs those engines consume.

It operationalizes the existing [Client Intelligence Engine](Client-Intelligence-Engine.md) discovery-and-approval workflow as reusable, typed code, rather than creating a second intake process alongside it.

## Core operating principle

Every piece of intake information carries its own provenance: `client-confirmed`, `public-research`, `assumption`, `suggestion`, or `unknown`. Only `client-confirmed` information is ever treated as an approved fact. Public research, no matter how well sourced, stays pending until the client confirms it.

## Stable field identifiers

Every intake field carries a stable, namespaced identifier (for example `locations.business-model` or `permissions.publishing-approved`) drawn from a single canonical registry. This lets a mobile app, an API, a dashboard, or a separate LLM update one field at a time — `{ fieldId, value, source }` — without resending or rewriting the full intake record. Dynamic list items (contacts, trust claims) carry their own caller-assigned `id` for the same reason.

## Scope

The engine covers:
- one-time client discovery
- business identity and legal name
- brand name and preferred public name
- primary contacts and approval authority
- services and products
- locations, service areas, and business model (storefront, single-location, service-area, multi-location, or online-only)
- target audiences
- goals and conversion priorities
- brand voice and tone
- design preferences and inspiration references
- existing website, GBP, social profiles, analytics, ads, and other external platforms
- approved claims, credentials, awards, reviews, guarantees, and trust signals (each individually sourced)
- languages
- competitors
- required pages
- content priorities
- SEO, Local SEO, AI visibility, blog, and advertising priorities
- prohibited claims and compliance sensitivities
- publishing, deployment, DNS, analytics, and external-service permissions
- missing information, contradictions, unknowns, and blockers
- evidence sources and owner confirmation
- approval gates before strategy or implementation

## What this engine is not

- It is not a second QA process. Findings reuse the exact `QaFinding`, `QaStatus`, `QaSeverity`, `QaReviewMode`, `QaApprovalStatus`, and `QaEvidenceEntry` types the Reviewer/QA Engine already defines.
- It is not a fact-approval mechanism. It never promotes research, assumptions, or suggestions into confirmed facts on its own; only an explicit `client-confirmed` source does that.
- It is not a conversational agent. It processes structured answers against a fixed questionnaire; it does not decide how those answers are collected.
- It cannot publish, deploy, edit external services, or approve client facts.

## Integration model

The engine reuses the Reviewer/QA Engine's finding vocabulary directly (the `QaArea` union was extended with intake-specific areas rather than introducing a parallel type). Once a client's intake reaches `client-confirmed` status, `buildEngineInputs()` derives ready-to-use, placeholder-safe context objects for the Content Intelligence, SEO Intelligence, AI Visibility, Local SEO Intelligence, Blog Intelligence, and Industry Knowledge engines — populated only from confirmed values.

## Core operating rules

- Ask all required questions in one structured intake where practical; only return with follow-up questions for unresolved material blockers.
- Never convert public research, assumptions, or suggestions into approved client facts without explicit confirmation.
- Treat a missing or unconfirmed **required** field as a material gap that blocks strategy and implementation. Treat a missing **optional** field as a non-material gap that does not block.
- Detect internal contradictions deterministically (business model versus location data, a granted permission without confirmed approval authority, a confirmed claim that overlaps the client's own prohibited-claims list) and always block on them.
- Preserve an evidence log entry per section and a confirmation summary bucketing every fact by its source, for future audits and client approval.

## Approval gates

An intake should not be treated as ready for strategy or implementation until it passes:
- intake summary reviewed with the client,
- all required fields confirmed or explicitly deferred with a documented reason,
- no contradictions remain unresolved,
- publishing, deployment, DNS, analytics, and external-service permissions explicitly recorded,
- and final intake sign-off recorded.

## Extension points

This engine is prepared for, but does not implement:
- Orchestration coordination across the full engine set
- Deployment gate integration
- Maintenance re-intake cadence
- a future mobile dashboard intake experience
