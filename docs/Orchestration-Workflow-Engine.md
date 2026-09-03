# Orchestration / Workflow Engine

## Purpose

This engine is the shared coordination layer for SiteLab. It sequences the existing engines from client intake through deployment readiness, enforces the correct execution order, and tracks project history — it does not recompute any engine's internal logic.

## Core operating principle

Every readiness decision this engine gates on is read directly from the engine that owns it: `ClientIntakeRecord.readinessDecision`, `QaReviewReport.approvalDecision`, `DeploymentReadinessReport.readinessDecision`. Orchestration never re-derives a fact, re-runs a check another engine already ran, or approves anything on a client's behalf.

## Workflow stages

```
client-intake → intake-validation → research-evidence → industry-classification
→ strategy-inputs → engine-generation → implementation → reviewer-qa
→ preview-approval → deployment-readiness → production-approval → deployment
→ post-launch-verification → maintenance
```

`engine-generation` is the combined Content / SEO / AI Visibility / Local SEO / Blog / Design stage from the requested workflow — one stage, because those engines are generated together from the same intake-derived inputs.

## Stage statuses

`not-started | in-progress | waiting-for-input | waiting-for-approval | blocked | failed | ready | completed`

Tracked per stage. The overall project status is derived from the current stage's status plus whether every applicable stage is complete.

## Approval gates

Seven gates are reused verbatim from the [SiteLab OS Blueprint](SiteLab-OS-Blueprint.md) §23 client approval-gate sequence. One gate ("Preview approval") is new, added specifically because the Deployment/Publishing Engine already established that preview approval and production approval must be distinct — the blueprint's seven gates don't cover that distinction on their own.

| Gate | Unlocks |
|---|---|
| Intake confirmation | `research-evidence` |
| Sitemap and page intent approval | `engine-generation` |
| Design direction approval | `implementation` |
| Content and placeholder review approval | `implementation` |
| Development completion approval | `reviewer-qa` |
| QA approval | `preview-approval` |
| Preview approval | `deployment-readiness` |
| Launch approval | `deployment` |

A stage transition is refused until every gate targeting the next stage is `approved`. No gate can be auto-approved by this engine.

## What this engine is not

- It is not a second Client Intake, Reviewer/QA, or Deployment engine. It stores and reads their reports; it never recomputes them.
- It does not build pages, write content, or generate design. `implementation` is a bookkeeping stage — the actual work happens via the build-page skill and the individual intelligence engines, outside this module.
- It cannot publish, deploy, edit external services, or approve client facts. Every approval gate requires an explicit, caller-supplied decision.
- Rolling back a workflow's *position* (this engine) is a different concept from the Deployment Engine's rollback *plan* for a live deployment. Rolling back here resets stage statuses; it never touches a live site.

## Integration model

- **Client Intake**: `evaluateClientIntake()` is called directly. `ClientIntakeRecord.engineInputs` (already placeholder-safe, already confirmed-only) feeds the `engine-generation` stage.
- **Industry Knowledge**: `buildIndustryKnowledgeBlueprint()` is called directly at the `industry-classification` stage. Its output is always advisory — this stage can never block the workflow, only inform it.
- **Content / SEO / AI Visibility / Local SEO / Blog**: each engine's real `build*Blueprint()` is called once at `engine-generation`, chained together the same way the demo pages already chain them (content → SEO → AI visibility → local SEO → blog, with the industry blueprint passed to blog).
- **Reviewer/QA**: a `QaReviewReport` is received and stored as-is; its `approvalDecision.status` drives the `reviewer-qa` stage.
- **Deployment/Publishing**: a `DeploymentReadinessReport` is received and stored as-is; its `readinessDecision` drives both the `deployment-readiness` stage and the project's final readiness decision.

## Partial and full workflows

`ProjectScope` (`full-site`, `single-page`, `content-only`, `blog-only`, `seo-only`, `local-seo-only`, `ai-visibility-only`) determines which stages are applicable. Full-site and single-page projects run all fourteen stages. Deliverable-only projects skip preview approval through post-launch verification and move directly from Reviewer/QA to Maintenance, since there is no site deployment involved.

## Client-facing separation

`buildClientFacingSummary()` translates the internal workflow into a client-safe view: internal stage ids become plain labels ("Discovery", "Build", "Launch"), and internal actors, tooling references, and finding detail are excluded. Use this function, not the internal state, for anything shown to a client.

## Extension points

This engine is prepared for, but does not implement:
- Maintenance automation (scheduled re-intake, re-review cadence)
- a future mobile dashboard driving this state machine
- a future API surface over these same functions
- future multi-LLM routing across workflow stages
