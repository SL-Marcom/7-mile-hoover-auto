# 7 Mile and Hoover Auto Services — Client Workspace

Status: **Phase 2 — Strategy/planning complete (stage: `engine-generation`, status: `waiting-for-approval`)**

New client, new build (not a live-site replacement). Domain target: `7hautoservice.com` (not yet connected — no DNS/deployment action has occurred).

## Contents

- `intake/context.ts` — the `ClientIntakeContext`, hand-assembled from the client kickoff brief and Phase 2 confirmations (contact/approval authority, audience, goals, strategy priorities, permissions). Facts the client stated directly are tagged `client-confirmed`; anything not stated is left unset rather than guessed.
- `intake/run-phase-1.ts` — runs the Client Intake, Orchestration, and Industry Knowledge engines against the initial context.
- `intake/run-phase-2.ts` — re-runs intake against the updated context and advances the real Orchestration state machine through `intake-validation → research-evidence → industry-classification → strategy-inputs → engine-generation`, recording the two approval gates that authorize it. Stops before `implementation` (page building), which needs separate design-direction and content-placeholder-review approvals not yet granted.
- `reports/` — workflow status, missing information, and material follow-up questions.
- `assets/` — no client photos or logo file supplied yet.

## Business facts confirmed but outside the Client Intake field schema

The Client Intake Engine's typed schema does not carry phone number, hours, or literal street-address components as discrete fields (only a free-text `primaryLocation` string). These are recorded here so they aren't lost before implementation, where they will seed `src/content/business.ts` (the pattern used on `client/tk-junk-cars`) and JSON-LD/NAP data:

- **Phone:** (313) 897-8888
- **Hours:** Mon–Fri 8:30 AM–6:00 PM, Sat 8:30 AM–3:00 PM, Sun Closed
- **Target domain:** 7hautoservice.com
- **Special offers:** none currently
- **Logo:** none — use a professional text-based treatment of the business name
- **Photos:** none supplied yet

## Boundaries

- This workspace only imports from `src/lib/**`. Nothing in `src/lib` or `src/app` imports from here.
- No page has been built. No deployment, publishing, DNS, analytics, or external-service action has occurred, per `.claude/rules/deployment.md` and `.claude/rules/security.md`.
- Work is on branch `client/7-mile-hoover`, not merged to `main`.
