# Deployment Guidance

Do not make deployment decisions or external changes without approval.

- Do not deploy, publish, or change DNS settings unless explicitly requested and approved.
- Do not add analytics IDs, marketing pixels, or external service credentials without approval.
- Keep deployment behavior simple and predictable.
- When preparing work for deployment, confirm that linting, type checking, and production build succeed first.
- Before declaring work complete, verify the result with linting, type checking, a production build, and browser-based QA.
- If deployment or publishing steps are required, pause and request explicit approval.
- Use the SiteLab Deployment/Publishing Engine for local, preview, and production deployment readiness, the Cloudflare Pages workflow, custom domains and DNS, environment variable readiness, redirects and canonical validation, robots.txt/sitemap readiness, launch checklists, rollback planning, backups, client handoff and white-label delivery, maintenance mode, post-launch verification, deployment evidence, and multi-client account portability.
- The engine reuses the Client Intake Engine's confirmed permissions and the Reviewer/QA Engine's decision directly. Do not re-collect approvals or re-run quality checks outside of those two engines.
- Production deployment always requires a passing Reviewer/QA decision. Preview deployment has a lighter, separate approval bar — never conflate the two.
- Every deployment plan and rollback plan this engine produces is a dry run only. It never deploys, changes DNS, installs analytics, or connects an external service itself.
- The Orchestration/Workflow Engine reads this engine's readiness report directly at its `deployment-readiness` stage and gates the `production-approval`/`deployment` stages on it. Do not have Orchestration re-implement deployment gating.
