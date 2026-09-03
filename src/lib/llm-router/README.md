# LLM Router / Multi-Model helpers

This folder contains the shared model-routing layer for SiteLab.

Use the exported helpers to:
- route a task to an eligible model (`routeTask`), reusing the exact `PermissionsAndApprovals["externalServiceConnectionsApproved"]` field type from `@/lib/client-intake` as a **required** input — routing is blocked or waiting-for-approval, with no model recommended, whenever that field isn't `client-confirmed: true`,
- re-route around a model that becomes unavailable (`handleModelUnavailable`),
- record a human decision on a pending approval (`recordRoutingApproval`),
- record evidence of which model actually performed a task (`recordTaskExecution`),
- select and evaluate a multi-model review (`routeMultiModelReview`, `evaluateMultiModelAgreement`),
- and hand a task off from the Orchestration/Workflow Engine (`submitTaskToRouter`, `OrchestrationTaskSubmission`, `OrchestrationRoutingHandoff`).

No field in this module can ever hold an API key or secret — `ProviderProfile` and `ModelCapabilityProfile` carry metadata only (availability, connection status, authorization, capabilities, cost tier, caller-supplied quality score). Nothing here makes a network call. Provider ids are open strings, not a closed list — Anthropic, OpenAI, and Google are examples, not hardcoded options.

This engine never advances, completes, or approves any Orchestration workflow stage; `submitTaskToRouter` only returns data for the caller to store and act on. See [docs/LLM-Router-Engine.md](../../../docs/LLM-Router-Engine.md) for the full spec, including the exact hard-filter order.
