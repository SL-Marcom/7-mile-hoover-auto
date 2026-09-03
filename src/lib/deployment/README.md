# Deployment / Publishing helpers

This folder contains the shared deployment-readiness layer for SiteLab.

Use the exported helpers to:
- evaluate whether a local, preview, or production deployment is ready (`evaluateDeploymentReadiness`),
- generate a descriptive, dry-run deployment plan (`buildDeploymentPlan`) and rollback plan (`buildRollbackPlan`),
- and get the static scope/checklist (`buildDeploymentBlueprint`).

This engine reuses the Reviewer/QA Engine's finding vocabulary (`QaFinding`, `QaStatus`, etc.) and the Client Intake Engine's `PermissionsAndApprovals` type directly — it does not collect a second set of approvals or run a second quality check. Production deployment is blocked outright whenever the Reviewer/QA report is present but not passing, a required permission was explicitly denied by the client, or `environmentVariables.configuredKeys` contains something shaped like a real secret rather than a variable name (see `looksLikeSecretValue`).

Nothing in this module deploys, changes DNS, installs analytics, or connects an external service. `DeploymentPlan.dryRun` is always `true`; the plan and rollback plan are data for a human (or a future orchestration layer) to act on.

`HANDOFF_EXCLUDED_PATHS` enumerates the actual internal SiteLab files that must never ship in a client handoff or white-label delivery.

See [docs/Deployment-Publishing-Engine.md](../../../docs/Deployment-Publishing-Engine.md) for the full spec.
