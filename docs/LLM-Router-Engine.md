# LLM Router / Multi-Model Engine

## Purpose

This engine is the shared model-routing layer for SiteLab. It matches an AI task to an eligible, authorized model from caller-supplied capability data, and returns a routing decision the Orchestration/Workflow Engine (or any caller) can store and act on — it never calls a model, never duplicates another engine's logic, and never approves anything on its own.

## Core operating principle

A routing recommendation is only ever as good as the data it's given. This engine never assumes a provider is available, connected, authorized, or paid, and it never claims one model is objectively better than another without caller-supplied evaluation data (`qualityScore`). Every elimination and every ranking is traceable to an explicit input field.

## The authorization gate (checked first, independent of everything else)

Every routing call requires a `RoutingPolicy.externalServiceConnectionsApproved` field, typed directly from the Client Intake Engine's `PermissionsAndApprovals["externalServiceConnectionsApproved"]` — not a lookalike type, the actual field shape. This is evaluated **before** any provider or model is even looked at:

- `client-confirmed` and `true` → routing proceeds normally.
- `client-confirmed` and `false` → the decision is `blocked`. This is a hard stop; no model is recommended, regardless of how available, connected, or authorized every model in the catalog is.
- anything else (unset, research-only, assumption, suggestion, unknown) → the decision is `waiting-for-approval`. No model is recommended; the missing approval is named explicitly.

`primary` and `fallbacks` are `null`/`[]` in both failure cases. Provider availability, connection status, and model authorization are never used to infer this gate — they are separate, independently-checked fields.

## Hard filter order (deterministic, before any subjective ranking)

1. **External-service authorization** (above) — independent of everything else.
2. Provider `available` and `connected`; model `authorized`; provider not in `policy.blockedProviderIds`.
3. Task requirements: role support, context window, structured output, tool use, multimodal input, image generation.
4. Privacy tier (model must meet or exceed the task's `privacySensitivity`) and cost ceiling (`task.maxCostTier`).

Only candidates that survive steps 1-4 are ranked. Ranking uses caller-supplied `qualityScore` (defaults to a neutral 50 if absent — this engine never substitutes its own opinion), cost tier, and latency preference match. Two further approval triggers apply to the top-ranked candidate, independent of the authorization gate:

- its provider is not yet in `policy.approvedProviderIds` ("provider change" approval), and/or
- its cost tier is not `free` and `policy.paidUsageApproved` is not `true` ("paid usage" approval).

Either trigger moves the decision to `waiting-for-approval` (a valid candidate exists, a human just needs to say yes) rather than `blocked`.

## What this engine is not

- It is not a live AI client. It makes no network calls, has no API key field anywhere in its data model, and cannot make one — `ProviderProfile` and `ModelCapabilityProfile` only ever carry metadata, never credentials.
- It is not a second Client Intake or Orchestration engine. The authorization gate reads Client Intake's actual field type; the `WorkflowStage` tag on a task is a type-only reference to Orchestration's stage vocabulary. Neither dependency runs any of those engines' code.
- It cannot advance, complete, or approve any Orchestration workflow stage. `submitTaskToRouter()` only returns data; nothing in this module imports or calls any Orchestration function.
- It does not decide which model is "best" in the abstract. Every score comes from caller-supplied capability and evaluation data.

## Orchestration handoff contract

- `submitTaskToRouter(submission, catalog, policy, occurredAt)` is the single entry point a caller (Orchestration or otherwise) uses to submit a task and get back an `OrchestrationRoutingHandoff` — the selected provider/model, ordered fallbacks, required approvals, findings, and evidence, all in one storable, serializable object.
- `recordTaskExecution(record, evidence, occurredAt)` closes the loop later with evidence of which model actually performed the task and its outcome.
- `handleModelUnavailable(record, ...)` re-routes around a model that stopped being available, logging the failover as a history event and a finding.
- `recordRoutingApproval(record, ...)` records a human decision on a pending approval and recomputes the routing status.

## Multi-model review

`routeMultiModelReview()` reuses the same ranked candidate list (no separate matching algorithm) and returns the top N as independent reviewers. `evaluateMultiModelAgreement()` aggregates **caller-reported** verdicts and confidence scores per reviewer — this engine never runs a model itself — into a unanimous/majority/split classification, flagging disagreement (or low average confidence) for human review.

## Approval gate

A routed task should not be treated as ready to execute until:
- external-service authorization is confirmed (see above),
- the selected provider is approved for this project,
- paid usage is approved if applicable,
- and any flagged multi-model disagreement has been resolved by a human.

## Extension points

This engine is prepared for, but does not implement:
- live provider adapters (Anthropic, OpenAI, Google, and future providers)
- usage tracking and budgeting
- maintenance automation
- a future mobile dashboard and API surface
