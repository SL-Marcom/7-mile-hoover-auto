# Client Workspaces

This directory holds per-client working data for the SiteLab Operating System: intake records, public research, generated reports, and workflow state.

## Rules

- Nothing under `clients/` is imported by `src/app/**` or shipped as part of any live site. It is agency-internal working material only.
- Files under `clients/` may only *import from* `src/lib/**` (the reusable engines). Nothing in `src/lib` or `src/app` may import from `clients/`.
- Client-specific facts, evidence, and generated reports never get written into `src/lib`, `docs`, or `.claude` — those stay generic and reusable.
- Each client gets its own subdirectory (e.g. `clients/<client-slug>/`), typically developed on a dedicated branch (`client/<client-slug>`) and not merged to `main` until explicitly approved.
- Every fact recorded in a client workspace must be tagged with its evidence source (`client-confirmed`, `public-research`, `assumption`, `suggestion`, or `unknown`) using the Client Intake Engine's own `IntakeField` type. Research alone never becomes `client-confirmed`.

See [docs/Client-Intake-Engine.md](../docs/Client-Intake-Engine.md) and [docs/Orchestration-Workflow-Engine.md](../docs/Orchestration-Workflow-Engine.md) for the engines this data is built from.
