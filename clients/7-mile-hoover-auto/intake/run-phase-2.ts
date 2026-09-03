import { evaluateClientIntake } from "../../../src/lib/client-intake";
import {
  createProject,
  receiveClientIntake,
  validateIntakeReadiness,
  recordApproval,
  advanceStage,
  recordResearchEvidence,
  applyIndustryClassification,
  recordStrategyInputs,
  generateEngineInputs,
  evaluateProjectStatus,
} from "../../../src/lib/orchestration";
import { sevenMileHooverAutoIntakeContext } from "./context";

/**
 * Phase 2: re-runs Client Intake against the updated (now-confirmed) context,
 * then advances the real Orchestration state machine through every
 * strategy/planning stage that the confirmed permissions and approval
 * authority actually unlock — client-intake -> intake-validation ->
 * research-evidence -> industry-classification -> strategy-inputs ->
 * engine-generation. It deliberately stops there: the "implementation" stage
 * (page building) requires the design-direction and content-placeholder-
 * review approval gates, which have not been granted, and no deploy/DNS/
 * analytics/external-service action is ever taken by this script.
 */

const OCCURRED_AT = "2026-08-11T00:00:00Z";
const APPROVER = "Bilal Assaad (SiteLab+) — confirmed approval authority per intake.contacts";

const intakeRecord = evaluateClientIntake(sevenMileHooverAutoIntakeContext);

let project = createProject({
  projectId: "7-mile-hoover-auto",
  projectName: "7 Mile and Hoover Auto Services website build",
  clientFacingName: "7 Mile and Hoover Auto Services",
  scope: "full-site",
  createdAt: OCCURRED_AT,
});

project = receiveClientIntake(project, sevenMileHooverAutoIntakeContext, OCCURRED_AT);
project = validateIntakeReadiness(project, OCCURRED_AT);

// client-intake -> intake-validation (no gate on this transition)
project = advanceStage(project, OCCURRED_AT);
project = validateIntakeReadiness(project, OCCURRED_AT);

// intake-validation -> research-evidence requires the "intake-confirmation" gate
project = recordApproval(project, "intake-confirmation", "approved", APPROVER, OCCURRED_AT, "Client-confirmed intake is complete and consistent (score 87/100, ready, no contradictions).");
project = advanceStage(project, OCCURRED_AT);
project = recordResearchEvidence(
  project,
  {
    researchComplete: true,
    notes: [
      "No public-research phase was needed: business identity, services, location, required pages, audience, goals, brand direction, and permissions were all supplied directly by the client.",
    ],
  },
  OCCURRED_AT,
);

// research-evidence -> industry-classification (no gate)
project = advanceStage(project, OCCURRED_AT);
project = applyIndustryClassification(project, OCCURRED_AT, {
  businessDescription:
    "Full-service mechanical auto repair shop in Detroit, MI offering brake, exhaust, engine, transmission, oil change/preventive maintenance, electrical, check engine diagnostics, suspension, steering, alignment, cooling system, AC/heating, and starter/alternator repair. Does not perform collision repair, body work, painting, or tire sales.",
});

// industry-classification -> strategy-inputs (no gate)
project = advanceStage(project, OCCURRED_AT);
project = recordStrategyInputs(
  project,
  {
    pagePlan: [
      "Home",
      "About Us",
      "Services (hub)",
      "Service: Brake Repair",
      "Service: Muffler & Exhaust Repair",
      "Service: Engine Repair",
      "Service: Transmission Repair",
      "Service: Oil Change & Preventive Maintenance",
      "Service: Auto Electrical Repair",
      "Service: Check Engine Light & Diagnostics",
      "Service: Suspension Repair",
      "Service: Steering Repair",
      "Service: Wheel Alignment",
      "Service: Radiator & Cooling System Repair",
      "Service: AC & Heating Repair",
      "Service: Starter & Alternator Repair",
      "Service: General Auto Repair / Preventive Maintenance",
      "FAQ",
      "Blog",
      "Contact Us",
    ],
    primaryCtaConfirmed: true,
    notes: "Page plan and primary CTAs (Call Now, Get Free Quote) confirmed directly from the client's required site structure and services list.",
  },
  OCCURRED_AT,
);

// strategy-inputs -> engine-generation requires the "sitemap-page-intent" gate
project = recordApproval(
  project,
  "sitemap-page-intent",
  "approved",
  APPROVER,
  OCCURRED_AT,
  "Sitemap and page intent match the client-confirmed required pages and service list exactly.",
);
project = advanceStage(project, OCCURRED_AT);
project = generateEngineInputs(project, { content: { assetType: "website-page" } }, OCCURRED_AT);

const workflowStatus = evaluateProjectStatus(project);

console.log(
  JSON.stringify(
    {
      intakeReadiness: intakeRecord.readinessDecision,
      workflowStatus,
      approvals: project.approvals,
      industryBlueprint: project.industryBlueprint,
      contentBlueprint: project.contentBlueprint,
      seoBlueprint: project.seoBlueprint,
      aiVisibilityBlueprint: project.aiVisibilityBlueprint,
      localSeoBlueprint: project.localSeoBlueprint,
      blogBlueprint: project.blogBlueprint,
    },
    null,
    2,
  ),
);
