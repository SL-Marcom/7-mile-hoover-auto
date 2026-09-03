import { evaluateClientIntake } from "../../../src/lib/client-intake";
import { createProject, receiveClientIntake, validateIntakeReadiness, evaluateProjectStatus } from "../../../src/lib/orchestration";
import { classifyIndustry, buildIndustryKnowledgeBlueprint } from "../../../src/lib/industry-knowledge";
import { sevenMileHooverAutoIntakeContext } from "./context";

/**
 * Runs the real Client Intake, Orchestration, and Industry Knowledge engines
 * against ./context.ts and prints their actual output as JSON. No network
 * calls, no writes outside this process's stdout, no live LLM calls, and no
 * deploy/publish action of any kind.
 */

const OCCURRED_AT = "2026-08-11T00:00:00Z";

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
const workflowStatus = evaluateProjectStatus(project);

const industryDescription =
  "Full-service mechanical auto repair shop in Detroit, MI offering brake, exhaust, engine, transmission, oil change/preventive maintenance, electrical, check engine diagnostics, suspension, steering, alignment, cooling system, AC/heating, and starter/alternator repair. Does not perform collision repair, body work, painting, or tire sales.";
const industryClassification = classifyIndustry({ businessDescription: industryDescription });
const industryBlueprint = buildIndustryKnowledgeBlueprint({ businessDescription: industryDescription });

console.log(
  JSON.stringify(
    {
      intakeRecord,
      workflowStatus,
      industryClassification,
      industryBlueprint,
    },
    null,
    2,
  ),
);
