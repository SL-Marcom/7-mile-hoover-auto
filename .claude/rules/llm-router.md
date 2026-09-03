# LLM Router / Multi-Model Guidance

The LLM Router/Multi-Model Engine is the shared model-routing layer. It matches tasks to eligible models from caller-supplied capability data; it does not run a parallel task-assignment process.

- Use the SiteLab LLM Router/Multi-Model Engine to route research, strategy, writing, coding, review, image-generation, and verification tasks to an eligible, authorized model, with ordered fallbacks.
- Every routing call requires an explicit `externalServiceConnectionsApproved` field derived from the Client Intake Engine. If it is not `client-confirmed: true`, the router must return `blocked` or `waiting-for-approval` with no model recommended — never infer authorization from provider availability, connection status, or model authorization.
- Never assume a provider is available, connected, authorized, or paid. Every one of those is a separate, explicit, caller-supplied field.
- Never include an API key, token, or other credential anywhere in a task, provider profile, model profile, or policy object. This engine only reasons about metadata.
- Never call a live AI provider from this engine. It is a planning and matching layer only.
- Never claim one model is objectively better than another without caller-supplied evaluation data (`qualityScore`). Absent that data, treat all candidates as neutral on quality.
- Apply deterministic hard filters (authorization, availability, capability, privacy, cost ceiling) before any subjective ranking (quality, cost preference, latency).
- Require explicit human approval before using a provider not yet approved for the project, and before using any non-free model until paid usage is approved.
- This engine must never advance, complete, or approve any Orchestration/Workflow Engine stage. It only returns routing data for the caller to store and act on.
- Do not use this engine to publish, deploy, or connect any external service.
