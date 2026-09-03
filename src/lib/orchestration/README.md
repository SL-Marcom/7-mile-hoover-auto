# Orchestration / Workflow helpers

This folder contains the shared coordination layer for SiteLab.

Use the exported helpers to:
- create a project and move it through the fourteen-stage workflow (`createProject`, `advanceStage`, `retryStage`, `rollbackToStage`, `pauseProject`, `resumeProject`),
- feed the existing engines' real outputs into the state (`receiveClientIntake`, `applyIndustryClassification`, `generateEngineInputs`, `receiveQaReport`, `receiveDeploymentReadiness`),
- record the bookkeeping-only stages this engine does not compute itself (`recordResearchEvidence`, `recordStrategyInputs`, `recordImplementation`, `recordDeployment`, `recordPostLaunchVerification`, `enterMaintenance`),
- record approval decisions (`recordApproval`) and complete the two pure approval-checkpoint stages that have no engine of their own (`completePreviewApproval`, `completeProductionApproval`),
- and read the project's current state (`evaluateProjectStatus` for the internal/agency view, `buildClientFacingSummary` for the client-safe view).

Every readiness decision this engine gates on is read directly from the engine that owns it — `ClientIntakeRecord.readinessDecision`, `QaReviewReport.approvalDecision`, `DeploymentReadinessReport.readinessDecision`. This engine never recomputes them, never builds pages or content itself, and never approves anything automatically. `advanceStage` is the single function that can move the workflow forward, and it refuses whenever the current stage isn't complete or a required approval gate is still pending.

All functions are pure: they take an `OrchestrationState` (and an explicit `occurredAt` timestamp, matching the no-`Date.now()` convention used throughout this codebase) and return a new state. See [docs/Orchestration-Workflow-Engine.md](../../../docs/Orchestration-Workflow-Engine.md) for the full spec.
