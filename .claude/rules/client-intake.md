# Client Intake Guidance

The Client Intake Engine is the shared intake layer. It gathers, validates, classifies, and stores the information the other engines need, instead of each engine collecting its own facts separately.

- Use the SiteLab Client Intake Engine for business identity, contacts and approval authority, services and products, locations and business model, audience and goals, brand voice and design preferences, existing external presence, approved claims and trust signals, languages, competitors, required pages, content priorities, SEO/Local SEO/AI-visibility/blog/advertising priorities, compliance sensitivities, and publishing/deployment/DNS/analytics/external-service permissions.
- Every field carries a provenance tag: client-confirmed, public-research, assumption, suggestion, or unknown. Never treat public research, an assumption, or a suggestion as an approved client fact — only an explicit client confirmation does that.
- Treat a missing or unconfirmed required field as a material gap that blocks strategy and implementation. A missing optional field does not block.
- Contradictions (business model vs. location data, a permission granted without confirmed approval authority, a confirmed claim that overlaps the client's own prohibited-claims list) always block, regardless of anything else in the intake.
- Ask all required questions in one structured intake where practical. Only return with follow-up questions for unresolved material gaps or contradictions, never for optional fields.
- Every field has a stable id from the shared field registry. Update one field at a time through that id instead of re-authoring the full intake record.
- Do not begin strategy, design direction, content drafting, or implementation while the Client Intake Engine reports a `blocked` or `needs-review` readiness status without an explicitly accepted reason.
- This engine reuses the Reviewer/QA Engine's finding types directly. Do not introduce a second review vocabulary for intake findings.
- Do not use this engine to publish, deploy, edit external services, or approve client facts automatically.
- The Deployment/Publishing Engine reads the five permission fields (`publishingApproved`, `deploymentApproved`, `dnsChangesApproved`, `analyticsInstallApproved`, `externalServiceConnectionsApproved`) from this engine directly. Keep them current — an explicit `client-confirmed: false` on any of them blocks deployment outright.
- The Orchestration/Workflow Engine calls this engine directly at its `client-intake` stage and reads `readinessDecision`/`engineInputs` from the result. Do not have Orchestration re-collect or re-derive intake facts.
- The LLM Router/Multi-Model Engine requires the `externalServiceConnectionsApproved` permission field from this engine, typed directly (not a lookalike), as a required routing input. Keep it current — routing is blocked or waiting-for-approval, with no model recommended, whenever it is not `client-confirmed: true`.
