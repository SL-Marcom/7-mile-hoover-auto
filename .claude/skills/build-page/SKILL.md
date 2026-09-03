---
name: build-page
description: Build or rebuild a production-ready local-business website page using the repository’s design, SEO, accessibility, performance, and content standards.
---

# Build Page

Use this skill when creating or rebuilding a production-ready page for a local-business website in this repository.

## Before coding

1. Read [CLAUDE.md](../../../CLAUDE.md) and all applicable rule files in [.claude/rules](../../../.claude/rules) first.
2. Confirm the SiteLab Client Intake Engine's readiness decision for this client is `ready` (or `needs-review` with an explicitly accepted, documented gap). Do not start design direction, copy, or implementation while it reports `blocked`. When this page is part of a larger project being tracked by the Orchestration/Workflow Engine, pull the content, SEO, AI visibility, and local SEO inputs from its `engine-generation` stage output instead of regenerating them.
3. Inspect the current design system, components, routes, and existing content before editing anything.
4. Identify the page’s primary visitor intent.
5. Define the primary CTA, secondary CTA, trust elements, and internal-link requirements before implementation.
6. Create a concise section outline before coding.

## Implementation requirements

- Reuse existing components where appropriate.
- Never invent client facts, reviews, credentials, awards, prices, guarantees, locations, or service areas.
- Use clearly marked placeholders when information is missing.
- Build mobile-first and verify at approximately 375px, 768px, and 1440px widths.
- Require one clear H1.
- Add unique metadata, a canonical URL, Open Graph data, useful internal links, descriptive alt text, and relevant JSON-LD when supported by visible content.
- Use semantic HTML and accessible controls.
- Minimize client-side JavaScript.
- Avoid generic AI layouts made entirely of rounded cards, gradients, and repeated visual patterns.
- Apply the SiteLab Content Intelligence Engine, Human Writing Standard, SEO Intelligence Engine, AI Visibility Engine, Local SEO Intelligence Engine, Blog Intelligence Engine, and Industry Knowledge Engine to the page copy, structure, and review plan.
- Treat Industry Knowledge Engine output as suggestions only; confirm any industry-derived terminology, service, question, or trust signal with the client before using it.
- Confirm research, fact verification, trust signals, internal links, SEO compatibility, AI visibility compatibility, local relevance, blog strategy, industry guidance confirmation, and approval gates before treating the content as ready.
- Do not deploy or publish.
- If any sub-task on this page is delegated to a model (for example a drafting or review pass), route that assignment through the SiteLab LLM Router/Multi-Model Engine rather than picking a model ad hoc.

## Quality bar

- Keep the page focused on one primary purpose: call, form, booking, directions, or information.
- Favor custom, polished, local-business-appropriate design over template-like layouts.
- Ensure content is factual, specific, and safe to publish.
- Verify the page with linting, type checking, a production build, and browser-based QA before completion.
- Run the final quality pass through the SiteLab Reviewer/QA Engine instead of a separate ad hoc checklist. Record real signals for the areas it can't infer on its own (design, accessibility, performance, responsiveness, technical integrity, security and deployment) rather than assuming a pass.
- Do not report the page as complete while the Reviewer/QA Engine reports a blocking finding or a `needs-review` approval status without a documented plan to resolve it.

## Completion summary

When the work is complete, return a concise summary with:

1. Files changed
2. Tests run
3. Reviewer/QA Engine result (overall status, blocking findings if any, launch-ready decision)
4. Remaining placeholders
5. Items requiring approval
