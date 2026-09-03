# Client Intake helpers

This folder contains the shared intake layer for SiteLab.

Use the exported helpers to:
- build the canonical intake questionnaire (`buildIntakeQuestionnaire`),
- evaluate a gathered intake into findings, a confirmation summary, follow-up questions, and a readiness decision (`evaluateClientIntake`),
- update exactly one field at a time by its stable id (`updateIntakeField`, `upsertContact`, `upsertTrustClaim`),
- and derive placeholder-safe structured inputs for the Content, SEO, AI Visibility, Local SEO, Blog, and Industry Knowledge engines, populated only from client-confirmed values.

Every substantive field is wrapped in `IntakeField<T>` and carries a stable `fieldId` from the `INTAKE_FIELD_IDS` registry (dynamic list items — contacts, trust claims — carry their own caller-assigned `id`). This is what lets a mobile app, an API, a dashboard, or a separate LLM patch one field (`{ fieldId, value, source }`) without resending the full intake record.

Findings reuse the exact `QaFinding`/`QaStatus`/`QaSeverity`/`QaReviewMode`/`QaApprovalStatus`/`QaEvidenceEntry` types from `@/lib/reviewer` — this engine does not define a parallel vocabulary. A missing or unconfirmed **required** field is a material gap (`status: "fail"`) that blocks readiness; a missing **optional** field is a non-material warning; an actual contradiction (business model vs. locations, a permission without confirmed approval authority, a confirmed claim that overlaps the client's own prohibited list) is always `status: "blocked"`.

See [docs/Client-Intake-Engine.md](../../../docs/Client-Intake-Engine.md) for the full spec.
