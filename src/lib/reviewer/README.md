# Reviewer / QA helpers

This folder contains the shared review layer for SiteLab.

Use the exported helpers to:
- reshape the existing engines' `evaluate*Review()` outputs (Content, SEO, AI Visibility, Local SEO, Blog, Industry Knowledge) into one common finding format (`evaluateQaReview`),
- add coverage for the areas no engine currently evaluates — design, accessibility, performance, responsiveness, technical integrity, security and deployment readiness, client-fact confirmation, duplicate content, and approval gates — via lightweight signal inputs,
- and get back a prioritized findings report, an overall score that cannot hide a blocking issue, and a launch-readiness decision.

`evaluateQaReview` never recomputes what another engine already checks — it only reads the evaluation objects those engines already produce. Any signal left unset is treated as a pending human-review item, never as an automatic pass. See [docs/Reviewer-QA-Engine.md](../../../docs/Reviewer-QA-Engine.md) for the full spec.

`buildReviewerBlueprint()` returns the static review checklist and the automated-vs-human-review area split, useful for documentation and the build-page skill.
