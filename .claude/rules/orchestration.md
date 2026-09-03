# Orchestration / Workflow Guidance

The Orchestration/Workflow Engine is the shared coordination layer. It sequences the existing engines from client intake through deployment readiness; it does not run a parallel process alongside them.

- Use the SiteLab Orchestration/Workflow Engine to track project stage, enforce execution order, aggregate findings and evidence from every engine, and produce one project status summary with the next required action.
- Every readiness decision this engine gates on must be read from the engine that owns it (Client Intake's readiness decision, Reviewer/QA's approval decision, Deployment's readiness decision). Never recompute or approximate those decisions inside this engine.
- `advanceStage` is the only function allowed to move a project to the next stage. Do not bypass it or hand-construct a state that skips a stage.
- Never mark an approval gate approved without an explicit, named human decision. This engine must never approve client facts, design direction, content, QA, or launch on its own.
- Treat Industry Knowledge output at the `industry-classification` stage as advisory only — it must never block the workflow and must never be treated as a confirmed client fact.
- Rolling back a project's workflow position (this engine) is not the same as the Deployment/Publishing Engine's rollback plan for a live deployment. Do not conflate the two in client-facing or agency-facing communication.
- Use `buildClientFacingSummary`, not the internal state, for anything shown to a client. Keep agency-internal stage ids, actors, and finding detail out of client-facing output.
- Do not use this engine to publish, deploy, edit external services, or perform any live action. It only tracks and gates.
