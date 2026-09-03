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
 * Phase 3: records the client's Design Direction and Content/Placeholder
 * Review approvals (the two gates that unlock "implementation") and advances
 * the real Orchestration state machine into that stage. Replays the Phase 2
 * sequence first since OrchestrationState is not persisted between scripts.
 */

const OCCURRED_AT = "2026-08-11T00:00:00Z";
const APPROVER = "Bilal Assaad (SiteLab+) — confirmed approval authority per intake.contacts";

let project = createProject({
  projectId: "7-mile-hoover-auto",
  projectName: "7 Mile and Hoover Auto Services website build",
  clientFacingName: "7 Mile and Hoover Auto Services",
  scope: "full-site",
  createdAt: OCCURRED_AT,
});

project = receiveClientIntake(project, sevenMileHooverAutoIntakeContext, OCCURRED_AT);
project = validateIntakeReadiness(project, OCCURRED_AT);
project = advanceStage(project, OCCURRED_AT);
project = validateIntakeReadiness(project, OCCURRED_AT);
project = recordApproval(project, "intake-confirmation", "approved", APPROVER, OCCURRED_AT, "Client-confirmed intake is ready (score 87/100, no contradictions).");
project = advanceStage(project, OCCURRED_AT);
project = recordResearchEvidence(project, { researchComplete: true, notes: ["All facts supplied directly by the client; no public-research phase needed."] }, OCCURRED_AT);
project = advanceStage(project, OCCURRED_AT);
project = applyIndustryClassification(project, OCCURRED_AT, {
  businessDescription:
    "Full-service mechanical auto repair shop in Detroit, MI offering brake, exhaust, engine, transmission, oil change/preventive maintenance, electrical, check engine diagnostics, suspension, steering, alignment, cooling system, AC/heating, and starter/alternator repair. Does not perform collision repair, body work, painting, or tire sales.",
});
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

// --- Phase 3 additions: the two approvals that unlock implementation ---
project = recordApproval(
  project,
  "design-direction",
  "approved",
  APPROVER,
  OCCURRED_AT,
  "Design direction approved: yellow/red/white brand palette with dark charcoal used sparingly for contrast/typography/footer; professional text-based wordmark (no icon mark); clean, modern, trustworthy, conversion-focused, mobile-first, not corporate/futuristic/generic-AI/template-like.",
);
project = recordApproval(
  project,
  "content-placeholder-review",
  "approved",
  APPROVER,
  OCCURRED_AT,
  "Content/placeholder approach approved: client-confirmed facts, confirmed services, approved strategy, and general automotive/SEO/Local SEO/AI-visibility best practice only — no invented years-in-business, certifications, warranties, guarantees, credentials, review counts, awards, offers, financing, or superlative claims. No client photos yet; tasteful non-photographic placeholder imagery only, clearly not presented as real shop/staff/customer photos, structured for easy replacement.",
);
project = advanceStage(project, OCCURRED_AT);

const workflowStatus = evaluateProjectStatus(project);

console.log(
  JSON.stringify(
    {
      currentStage: project.currentStage,
      stageStatuses: project.stageStatuses,
      approvals: project.approvals,
      workflowStatus,
    },
    null,
    2,
  ),
);
