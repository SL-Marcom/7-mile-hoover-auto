# Reviewer / QA Engine

## Purpose

This engine is the shared review layer for SiteLab. It evaluates the outputs of the existing intelligence engines and a small set of net-new signal inputs, then returns one prioritized findings report and one approval decision.

It extends the existing content, SEO, AI visibility, local SEO, blog, and industry knowledge architectures rather than creating a parallel QA workflow.

## Core operating principle

The Reviewer/QA Engine never recomputes what another engine already checks. It consumes the evaluation each engine already produces (`evaluate*Review()`), reshapes it into a common finding format, and adds coverage only for the areas no engine currently evaluates: design consistency, accessibility, performance, responsiveness, technical integrity, security and deployment readiness, client-fact confirmation, duplicate content, and approval gates.

## Scope

The engine covers:
- factual accuracy and unsupported claims (reused from Content Intelligence)
- client-confirmed versus unconfirmed information
- brand voice and Human Writing Standard compliance (reused from Content Intelligence)
- content quality and readability (reused from Content Intelligence)
- duplicate content and cannibalization
- SEO metadata, headings, canonicals, internal links, schema, and indexability (reused from SEO Intelligence, plus an indexability check)
- AI visibility, entity clarity, direct-answer structure, evidence, and freshness (reused from AI Visibility)
- local SEO, NAP consistency, service areas, location pages, GBP-related facts, and local schema (reused from Local SEO Intelligence)
- blog quality, topic overlap, internal linking, and freshness (reused from Blog Intelligence)
- industry guidance confirmation (reused from Industry Knowledge)
- design consistency, typography, spacing, hierarchy, CTAs, trust elements, and uniqueness
- accessibility: semantic HTML, keyboard use, labels, contrast, and reduced motion
- performance risks, unnecessary JavaScript, image handling, and Core Web Vitals
- mobile, tablet, and desktop responsiveness
- broken links, missing assets, route errors, and build failures
- security, secrets, forms, external integrations, and deployment readiness
- approval-dependent actions and unresolved blockers

## What this engine is not

- It is not a replacement for any existing engine's evaluation logic. It reads their output, it does not duplicate their checks.
- It is not an automated browser, linter, or scanner. Signal inputs for design, accessibility, performance, responsiveness, technical integrity, and security must be supplied by the caller (a human reviewer, a tool, or a CI step); the engine does not run them itself.
- It cannot approve client facts, deploy, publish, or connect external services. It only returns a report.
- An unset signal is never treated as a pass. Every check that has not been supplied a value is surfaced as a pending human-review item.

## Integration model

The Reviewer/QA Engine accepts the evaluation objects already produced by the Content Intelligence, SEO Intelligence, AI Visibility, Local SEO Intelligence, Blog Intelligence, and Industry Knowledge engines as optional context, plus lightweight signal inputs for the areas none of those engines cover. It reshapes all of this into one common finding format: status, severity, automated-or-human-review mode, impact, recommended action, and approval status.

## Core operating rules

- Reuse existing engine evaluations; never recompute what they already check.
- Treat every unresolved or unset signal as a pending human-review item, not a pass.
- Rank findings by severity so critical issues are never buried.
- Cap the overall score whenever a blocking finding exists, so a high score can never mask a blocker.
- Only mark a project launch-ready when every finding across every reviewed area is a pass.
- Preserve an evidence log entry per reviewed area so a review can be audited later.

## Approval gates

A project should not be treated as launch-ready until it passes:
- all automated checks reviewed,
- all human-review checks completed and recorded,
- no blocking findings remain,
- client confirmation recorded for all facts used,
- and final Reviewer/QA sign-off recorded.

## Extension points

This engine is prepared for, but does not implement:
- Client Intake integration (feeding intake gaps directly into confirmation-status findings)
- Orchestration coordination (running the review automatically across a set of pages)
- Deployment gate integration (blocking a deployment step on `approvalDecision.launchReady`)
- Maintenance re-review cadence (scheduled re-review after launch)
- the final v1.0 end-to-end testing pass
