# Reviewer / QA Guidance

The Reviewer/QA Engine is the shared review layer. It evaluates the outputs of the other engines instead of running a parallel QA process.

- Use the SiteLab Reviewer/QA Engine to aggregate findings across factual accuracy, confirmation status, brand voice, content quality, duplicate content, SEO, AI visibility, local SEO, blog quality, industry guidance, design, accessibility, performance, responsiveness, technical integrity, security and deployment readiness, and approval gates.
- Reuse the Content Intelligence, SEO Intelligence, AI Visibility, Local SEO Intelligence, Blog Intelligence, and Industry Knowledge engines' own evaluation output. Do not recompute checks those engines already perform.
- Treat any unset or unrecorded signal as a pending human-review item, never as an automatic pass.
- Never treat a project as launch-ready while a blocking finding remains, and never let an overall score mask a blocking finding.
- Route human-review findings (design, accessibility judgment calls, responsiveness verification, deployment approvals) to an actual human reviewer. This engine does not run browsers, linters, or scanners itself — it only aggregates the signals it is given.
- Preserve the evidence log entries this engine returns so a review can be audited later.
- Do not use this engine to approve client facts, deploy, publish, or connect external services.
