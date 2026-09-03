# Deployment / Publishing Engine

## Purpose

This engine is the shared deployment-readiness layer for SiteLab. It evaluates whether a local, preview, or production deployment is ready to proceed, using the permissions already collected by the Client Intake Engine and the decision already produced by the Reviewer/QA Engine — it does not collect a second set of approvals or run a second quality check.

It operationalizes the existing preview/deployment, Cloudflare, and analytics sections of the [SiteLab OS Blueprint](SiteLab-OS-Blueprint.md) as reusable, typed code.

## Core operating principle

This engine only plans and evaluates. It never deploys, changes DNS, installs analytics, or connects an external service itself. Every deployment plan and rollback plan it produces is explicitly a dry run — descriptive data, not an executable action.

## Scope

The engine covers:
- local development, preview deployment, and production deployment
- the Cloudflare deployment workflow (default and only implemented provider)
- custom domains and DNS changes
- environment variables (names only — see Secret safety below)
- analytics and tracking installation
- redirects and canonical validation
- robots.txt and sitemap readiness, including mandatory noindex on preview
- deployment approvals, distinguished by environment
- launch checklists via the dry-run deployment plan
- rollback and recovery planning
- backups and version history
- client handoff and white-label delivery
- maintenance mode
- post-launch verification
- deployment logs and evidence
- multi-client project portability, including moving a project between agency and client accounts

## What this engine is not

- It is not a second permissions system. It reads `PermissionsAndApprovals` from the Client Intake Engine directly.
- It is not a second quality gate. It reads the `QaReviewReport` the Reviewer/QA Engine already produced; production deployment requires that report to be passing.
- It does not execute anything. It has no network access, runs no shell commands, and writes no deployment configuration. `buildDeploymentPlan()` and `buildRollbackPlan()` return `dryRun: true` step lists for a human (or a future orchestration layer) to carry out.
- It cannot store or transmit secret values. See below.

## Secret safety

`EnvironmentVariableSignals` has no `value` field anywhere in its type — only `requiredKeys` and `configuredKeys`, which are variable **names**. On top of that structural guarantee, every configured key is checked against a heuristic (`looksLikeSecretValue`) that flags anything shaped like a real secret (long, contains whitespace, or matches a known secret-prefix pattern) as a `blocked` finding. Secret values belong only in the hosting provider's encrypted environment variable store, never in this engine's input, this repository, or any SiteLab evidence log.

## Integration model

- **Reviewer/QA Engine**: `qaReport: QaReviewReport` is read directly. Production deployment is `blocked` if the report is present but not passing, and a material gap if no report has been supplied at all. Preview deployment treats a non-passing report as a non-blocking warning only.
- **Client Intake Engine**: `permissions: PermissionsAndApprovals` is read directly. Each of the five permissions (`publishingApproved`, `deploymentApproved`, `dnsChangesApproved`, `analyticsInstallApproved`, `externalServiceConnectionsApproved`) is only ever treated as a `pass` when its source is `client-confirmed` and its value is `true`. An explicit `client-confirmed: false` is a hard `blocked` contradiction, not a pending gap — deploying anyway would violate an explicit client decision.
- **Cloudflare manifest**: the deployment plan reads `cloudflareConfig` from `src/lib/cloudflare/manifest.ts` (build command, output directory, routes) instead of re-declaring them.

## Core operating rules

- Production deployment requires a passing Reviewer/QA decision. No exceptions.
- Preview approval and production approval are distinct. A non-passing QA report or an unconfirmed permission blocks production but only warns on preview.
- Every permission this engine checks must be explicitly and recently confirmed — never assumed, never carried over silently.
- Treat any unset or unrecorded signal as a pending human-review item, never as an automatic pass.
- Never accept, store, or log a secret value. Names only.
- Cap the overall score whenever a blocking finding exists, so a high score can never mask a blocker.
- Only mark a deployment ready when every finding across every applicable area is a pass.
- Preserve an evidence log entry per area for future audits.

## Approval gates

A deployment should not proceed until it passes:
- Reviewer/QA decision reviewed for this environment,
- all applicable permissions confirmed by the client,
- no blocking findings remain,
- deployment plan and rollback plan reviewed,
- and final deployment sign-off recorded.

## Extension points

This engine is prepared for, but does not implement:
- Orchestration coordination across the full engine set
- Vercel or other provider support (Cloudflare Pages is the only implemented provider)
- Maintenance re-deployment cadence
- a future mobile dashboard deployment experience
