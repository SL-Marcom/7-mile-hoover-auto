import type { ContentAssetType, ContentIntelligenceBlueprint, ContentIntelligenceContext } from "@/lib/content-intelligence";
import { buildContentIntelligenceBlueprint } from "@/lib/content-intelligence";
import type { SeoIntelligenceBlueprint, SeoIntelligenceContext } from "@/lib/seo/intelligence";
import { buildSeoIntelligenceBlueprint } from "@/lib/seo/intelligence";
import type { AiVisibilityBlueprint, AiVisibilityContext } from "@/lib/ai-visibility";
import { buildAiVisibilityBlueprint } from "@/lib/ai-visibility";
import type { LocalSeoBlueprint, LocalSeoContext } from "@/lib/local-seo";
import { buildLocalSeoBlueprint } from "@/lib/local-seo";
import type { BlogIntelligenceBlueprint, BlogIntelligenceContext } from "@/lib/blog-intelligence";
import { buildBlogIntelligenceBlueprint } from "@/lib/blog-intelligence";
import type { IndustryKnowledgeBlueprint, IndustryKnowledgeContext } from "@/lib/industry-knowledge";
import { buildIndustryKnowledgeBlueprint } from "@/lib/industry-knowledge";
import type { ClientIntakeContext, ClientIntakeRecord } from "@/lib/client-intake";
import { evaluateClientIntake } from "@/lib/client-intake";
import type { QaFinding, QaEvidenceEntry, QaReviewReport, QaSeverity } from "@/lib/reviewer";
import type { DeploymentReadinessReport } from "@/lib/deployment";

export type WorkflowStage =
  | "client-intake"
  | "intake-validation"
  | "research-evidence"
  | "industry-classification"
  | "strategy-inputs"
  | "engine-generation"
  | "implementation"
  | "reviewer-qa"
  | "preview-approval"
  | "deployment-readiness"
  | "production-approval"
  | "deployment"
  | "post-launch-verification"
  | "maintenance";

export type WorkflowStageStatus = "not-started" | "in-progress" | "waiting-for-input" | "waiting-for-approval" | "blocked" | "failed" | "ready" | "completed";

export type ProjectScope = "full-site" | "single-page" | "content-only" | "blog-only" | "seo-only" | "local-seo-only" | "ai-visibility-only";

export const FULL_WORKFLOW_ORDER: WorkflowStage[] = [
  "client-intake",
  "intake-validation",
  "research-evidence",
  "industry-classification",
  "strategy-inputs",
  "engine-generation",
  "implementation",
  "reviewer-qa",
  "preview-approval",
  "deployment-readiness",
  "production-approval",
  "deployment",
  "post-launch-verification",
  "maintenance",
];

const DELIVERABLE_ONLY_ORDER: WorkflowStage[] = [
  "client-intake",
  "intake-validation",
  "research-evidence",
  "industry-classification",
  "strategy-inputs",
  "engine-generation",
  "implementation",
  "reviewer-qa",
  "maintenance",
];

export function applicableStages(scope: ProjectScope): WorkflowStage[] {
  return scope === "full-site" || scope === "single-page" ? FULL_WORKFLOW_ORDER : DELIVERABLE_ONLY_ORDER;
}

export interface ApprovalGateDefinition {
  id: string;
  label: string;
  unlocksStage: WorkflowStage;
}

/**
 * Seven gates reused verbatim from the SiteLab OS Blueprint's client approval-gate
 * sequence (§23). "Preview approval" is the one addition, required because the
 * Deployment/Publishing Engine already distinguishes preview approval from
 * production approval and the blueprint's seven gates don't cover that split.
 */
export const APPROVAL_GATE_DEFINITIONS: ApprovalGateDefinition[] = [
  { id: "intake-confirmation", label: "Intake confirmation", unlocksStage: "research-evidence" },
  { id: "sitemap-page-intent", label: "Sitemap and page intent approval", unlocksStage: "engine-generation" },
  { id: "design-direction", label: "Design direction approval", unlocksStage: "implementation" },
  { id: "content-placeholder-review", label: "Content and placeholder review approval", unlocksStage: "implementation" },
  { id: "development-completion", label: "Development completion approval", unlocksStage: "reviewer-qa" },
  { id: "qa-approval", label: "QA approval", unlocksStage: "preview-approval" },
  { id: "preview-approval-granted", label: "Preview approval", unlocksStage: "deployment-readiness" },
  { id: "launch-approval", label: "Launch approval", unlocksStage: "deployment" },
];

export interface ApprovalGateRecord extends ApprovalGateDefinition {
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  note?: string;
}

export interface ProjectHistoryEvent {
  id: string;
  timestamp: string;
  actor: string;
  eventType: "stage-entered" | "stage-completed" | "stage-blocked" | "approval-recorded" | "paused" | "resumed" | "retried" | "rolled-back";
  stage: WorkflowStage;
  detail: string;
}

export interface WorkflowBlocker {
  stage: WorkflowStage;
  severity: QaSeverity;
  summary: string;
  recommendedAction: string;
}

export interface OrchestrationState {
  projectId: string;
  projectName: string;
  clientFacingName?: string;
  scope: ProjectScope;
  createdAt: string;
  updatedAt: string;

  currentStage: WorkflowStage;
  stageStatuses: Partial<Record<WorkflowStage, WorkflowStageStatus>>;
  paused: boolean;

  approvals: ApprovalGateRecord[];

  intakeRecord?: ClientIntakeRecord;
  industryBlueprint?: IndustryKnowledgeBlueprint;
  contentBlueprint?: ContentIntelligenceBlueprint;
  seoBlueprint?: SeoIntelligenceBlueprint;
  aiVisibilityBlueprint?: AiVisibilityBlueprint;
  localSeoBlueprint?: LocalSeoBlueprint;
  blogBlueprint?: BlogIntelligenceBlueprint;
  qaReport?: QaReviewReport;
  deploymentReadinessReport?: DeploymentReadinessReport;

  findings: QaFinding[];
  evidenceLog: QaEvidenceEntry[];
  history: ProjectHistoryEvent[];
}

export function getStageStatus(state: OrchestrationState, stage: WorkflowStage): WorkflowStageStatus {
  return state.stageStatuses[stage] ?? "not-started";
}

function statusFromReadiness(status: "ready" | "needs-review" | "blocked"): WorkflowStageStatus {
  if (status === "blocked") return "blocked";
  if (status === "needs-review") return "waiting-for-input";
  return "completed";
}

function appendHistory(state: OrchestrationState, actor: string, eventType: ProjectHistoryEvent["eventType"], stage: WorkflowStage, detail: string, occurredAt: string): OrchestrationState {
  const event: ProjectHistoryEvent = {
    id: `evt-${state.history.length + 1}`,
    timestamp: occurredAt,
    actor,
    eventType,
    stage,
    detail,
  };
  return { ...state, history: [...state.history, event], updatedAt: occurredAt };
}

function mergeEngineOutput<T extends Partial<OrchestrationState>>(
  state: OrchestrationState,
  stage: WorkflowStage,
  status: WorkflowStageStatus,
  findings: QaFinding[],
  evidence: QaEvidenceEntry[],
  extra: T,
): OrchestrationState {
  return {
    ...state,
    ...extra,
    stageStatuses: { ...state.stageStatuses, [stage]: status },
    findings: [...state.findings, ...findings],
    evidenceLog: [...state.evidenceLog, ...evidence],
  };
}

// ---------------------------------------------------------------------------
// Project creation
// ---------------------------------------------------------------------------

export interface CreateProjectInput {
  projectId: string;
  projectName: string;
  clientFacingName?: string;
  scope: ProjectScope;
  createdAt: string;
}

export function createProject(input: CreateProjectInput): OrchestrationState {
  const order = applicableStages(input.scope);
  const initial: OrchestrationState = {
    projectId: input.projectId,
    projectName: input.projectName,
    clientFacingName: input.clientFacingName,
    scope: input.scope,
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
    currentStage: order[0],
    stageStatuses: { [order[0]]: "in-progress" },
    paused: false,
    approvals: [],
    findings: [],
    evidenceLog: [],
    history: [],
  };
  return appendHistory(initial, "system", "stage-entered", order[0], `Project "${input.projectName}" created and entered the ${order[0]} stage.`, input.createdAt);
}

// ---------------------------------------------------------------------------
// Stage 1-2: Client Intake and validation
// ---------------------------------------------------------------------------

export function receiveClientIntake(state: OrchestrationState, intakeContext: ClientIntakeContext, occurredAt: string): OrchestrationState {
  const record = evaluateClientIntake(intakeContext);
  const status = statusFromReadiness(record.readinessDecision.status);
  const withHistory = appendHistory(
    state,
    "system",
    status === "completed" ? "stage-completed" : status === "blocked" ? "stage-blocked" : "stage-entered",
    "client-intake",
    record.readinessDecision.summary,
    occurredAt,
  );
  return mergeEngineOutput(withHistory, "client-intake", status, record.findings, record.evidenceLog, { intakeRecord: record });
}

export function validateIntakeReadiness(state: OrchestrationState, occurredAt: string): OrchestrationState {
  if (!state.intakeRecord) {
    return appendHistory(state, "system", "stage-blocked", "intake-validation", "Cannot validate intake readiness: no intake record has been received yet.", occurredAt);
  }
  const status = statusFromReadiness(state.intakeRecord.readinessDecision.status);
  const withHistory = appendHistory(
    state,
    "system",
    status === "completed" ? "stage-completed" : status === "blocked" ? "stage-blocked" : "stage-entered",
    "intake-validation",
    `Intake validation: ${state.intakeRecord.readinessDecision.summary}`,
    occurredAt,
  );
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "intake-validation": status } };
}

// ---------------------------------------------------------------------------
// Stage 3: Research and evidence
// ---------------------------------------------------------------------------

export interface ResearchEvidenceInput {
  researchComplete: boolean;
  notes?: string[];
}

export function recordResearchEvidence(state: OrchestrationState, input: ResearchEvidenceInput, occurredAt: string): OrchestrationState {
  const status: WorkflowStageStatus = input.researchComplete ? "completed" : "in-progress";
  const researchOnlyCount = state.intakeRecord?.confirmationSummary.researchOnlyFacts.length ?? 0;
  const detail = [
    `Research and evidence ${input.researchComplete ? "completed" : "in progress"}.`,
    researchOnlyCount > 0 ? `${researchOnlyCount} research-only fact(s) from intake remain pending client confirmation.` : undefined,
    input.notes?.length ? `Notes: ${input.notes.join(" ")}` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const withHistory = appendHistory(state, "system", status === "completed" ? "stage-completed" : "stage-entered", "research-evidence", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "research-evidence": status } };
}

// ---------------------------------------------------------------------------
// Stage 4: Industry classification (always advisory, never blocking)
// ---------------------------------------------------------------------------

export function applyIndustryClassification(state: OrchestrationState, occurredAt: string, additionalContext?: Partial<IndustryKnowledgeContext>): OrchestrationState {
  const base = state.intakeRecord?.engineInputs.industryContext ?? {};
  const blueprint = buildIndustryKnowledgeBlueprint({ ...base, ...additionalContext });
  const withHistory = appendHistory(
    state,
    "system",
    "stage-completed",
    "industry-classification",
    `Industry classification: ${blueprint.industryName} (confidence: ${blueprint.classification.confidence}). This is suggestion-only context and requires client confirmation before use.`,
    occurredAt,
  );
  return { ...withHistory, industryBlueprint: blueprint, stageStatuses: { ...withHistory.stageStatuses, "industry-classification": "completed" } };
}

// ---------------------------------------------------------------------------
// Stage 5: Strategy inputs
// ---------------------------------------------------------------------------

export interface StrategyInput {
  pagePlan: string[];
  primaryCtaConfirmed: boolean;
  notes?: string;
}

export function recordStrategyInputs(state: OrchestrationState, input: StrategyInput, occurredAt: string): OrchestrationState {
  const status: WorkflowStageStatus = input.primaryCtaConfirmed && input.pagePlan.length > 0 ? "completed" : "waiting-for-input";
  const detail = input.notes ?? `Strategy inputs: ${input.pagePlan.length} page(s) planned, primary CTA ${input.primaryCtaConfirmed ? "confirmed" : "not yet confirmed"}.`;
  const withHistory = appendHistory(state, "system", status === "completed" ? "stage-completed" : "stage-entered", "strategy-inputs", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "strategy-inputs": status } };
}

// ---------------------------------------------------------------------------
// Stage 6: Content / SEO / AI Visibility / Local SEO / Blog / Design generation
// ---------------------------------------------------------------------------

export interface EngineGenerationInput {
  content?: { assetType: ContentAssetType } & Partial<Omit<ContentIntelligenceContext, "assetType">>;
  seo?: Partial<SeoIntelligenceContext>;
  aiVisibility?: Partial<AiVisibilityContext>;
  localSeo?: Partial<LocalSeoContext>;
  blog?: Partial<BlogIntelligenceContext>;
  skip?: ("content" | "seo" | "aiVisibility" | "localSeo" | "blog")[];
}

export function generateEngineInputs(state: OrchestrationState, input: EngineGenerationInput, occurredAt: string): OrchestrationState {
  const skip = new Set(input.skip ?? []);
  const derived = state.intakeRecord?.engineInputs;
  const generated: string[] = [];
  let next: OrchestrationState = state;

  if (!skip.has("content") && input.content) {
    const contentBlueprint = buildContentIntelligenceBlueprint({ ...derived?.contentContext, ...input.content });
    next = { ...next, contentBlueprint };
    generated.push("content");
  }

  if (!skip.has("seo")) {
    const seoBlueprint = buildSeoIntelligenceBlueprint({ ...derived?.seoContext, ...input.seo, contentBlueprint: next.contentBlueprint });
    next = { ...next, seoBlueprint };
    generated.push("SEO");
  }

  if (!skip.has("aiVisibility")) {
    const aiVisibilityBlueprint = buildAiVisibilityBlueprint({
      ...derived?.aiVisibilityContext,
      ...input.aiVisibility,
      contentBlueprint: next.contentBlueprint,
      seoBlueprint: next.seoBlueprint,
    });
    next = { ...next, aiVisibilityBlueprint };
    generated.push("AI visibility");
  }

  if (!skip.has("localSeo")) {
    const localSeoBlueprint = buildLocalSeoBlueprint({
      ...derived?.localSeoContext,
      ...input.localSeo,
      contentBlueprint: next.contentBlueprint,
      seoBlueprint: next.seoBlueprint,
      aiBlueprint: next.aiVisibilityBlueprint,
    });
    next = { ...next, localSeoBlueprint };
    generated.push("local SEO");
  }

  if (!skip.has("blog")) {
    const blogBlueprint = buildBlogIntelligenceBlueprint({
      ...derived?.blogContext,
      ...input.blog,
      contentBlueprint: next.contentBlueprint,
      seoBlueprint: next.seoBlueprint,
      aiBlueprint: next.aiVisibilityBlueprint,
      localSeoBlueprint: next.localSeoBlueprint,
      industryBlueprint: next.industryBlueprint,
    });
    next = { ...next, blogBlueprint };
    generated.push("blog");
  }

  const status: WorkflowStageStatus = generated.length > 0 ? "completed" : "waiting-for-input";
  const detail =
    generated.length > 0
      ? `Generated engine inputs for: ${generated.join(", ")}. Design direction is carried forward from the client's confirmed brand voice and design preferences for a human designer to apply.`
      : "No engine inputs were generated yet.";
  const withHistory = appendHistory(next, "system", status === "completed" ? "stage-completed" : "stage-entered", "engine-generation", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "engine-generation": status } };
}

// ---------------------------------------------------------------------------
// Stage 7: Implementation (bookkeeping only — this engine does not build pages)
// ---------------------------------------------------------------------------

export interface ImplementationInput {
  completed: boolean;
  notes?: string;
}

export function recordImplementation(state: OrchestrationState, input: ImplementationInput, occurredAt: string): OrchestrationState {
  const status: WorkflowStageStatus = input.completed ? "completed" : "in-progress";
  const detail = input.notes ?? (input.completed ? "Implementation completed." : "Implementation in progress.");
  const withHistory = appendHistory(state, "system", status === "completed" ? "stage-completed" : "stage-entered", "implementation", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, implementation: status } };
}

// ---------------------------------------------------------------------------
// Stage 8: Reviewer / QA
// ---------------------------------------------------------------------------

export function receiveQaReport(state: OrchestrationState, report: QaReviewReport, occurredAt: string): OrchestrationState {
  const status = statusFromReadiness(report.approvalDecision.status);
  const withHistory = appendHistory(
    state,
    "system",
    status === "completed" ? "stage-completed" : status === "blocked" ? "stage-blocked" : "stage-entered",
    "reviewer-qa",
    report.approvalDecision.summary,
    occurredAt,
  );
  return mergeEngineOutput(withHistory, "reviewer-qa", status, report.findings, report.evidenceLog, { qaReport: report });
}

// ---------------------------------------------------------------------------
// Stage 10: Deployment readiness
// ---------------------------------------------------------------------------

export function receiveDeploymentReadiness(state: OrchestrationState, report: DeploymentReadinessReport, occurredAt: string): OrchestrationState {
  const status = statusFromReadiness(report.readinessDecision.status);
  const withHistory = appendHistory(
    state,
    "system",
    status === "completed" ? "stage-completed" : status === "blocked" ? "stage-blocked" : "stage-entered",
    "deployment-readiness",
    report.readinessDecision.summary,
    occurredAt,
  );
  return mergeEngineOutput(withHistory, "deployment-readiness", status, report.findings, report.evidenceLog, { deploymentReadinessReport: report });
}

// ---------------------------------------------------------------------------
// Stages 12-14: Deployment, post-launch verification, maintenance (bookkeeping)
// ---------------------------------------------------------------------------

export interface StageCompletionInput {
  completed: boolean;
  notes?: string;
}

export function recordDeployment(state: OrchestrationState, input: StageCompletionInput, occurredAt: string): OrchestrationState {
  const status: WorkflowStageStatus = input.completed ? "completed" : "in-progress";
  const detail = input.notes ?? (input.completed ? "Deployment recorded as complete." : "Deployment in progress.");
  const withHistory = appendHistory(state, "system", status === "completed" ? "stage-completed" : "stage-entered", "deployment", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, deployment: status } };
}

export function recordPostLaunchVerification(state: OrchestrationState, input: StageCompletionInput, occurredAt: string): OrchestrationState {
  const status: WorkflowStageStatus = input.completed ? "completed" : "in-progress";
  const detail = input.notes ?? (input.completed ? "Post-launch verification completed." : "Post-launch verification in progress.");
  const withHistory = appendHistory(state, "system", status === "completed" ? "stage-completed" : "stage-entered", "post-launch-verification", detail, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "post-launch-verification": status } };
}

export function enterMaintenance(state: OrchestrationState, occurredAt: string, notes?: string): OrchestrationState {
  const withHistory = appendHistory(state, "system", "stage-entered", "maintenance", notes ?? "Project entered ongoing maintenance.", occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, maintenance: "in-progress" } };
}

// ---------------------------------------------------------------------------
// Approvals
// ---------------------------------------------------------------------------

/**
 * "preview-approval" and "production-approval" are pure approval checkpoints —
 * unlike every other stage, they have no engine to call and no other work to
 * record. Their own gate approval IS the stage's work, so a dedicated function
 * marks the stage itself complete once that gate is recorded.
 */
export function completePreviewApproval(state: OrchestrationState, occurredAt: string): OrchestrationState {
  const withHistory = appendHistory(state, "system", "stage-completed", "preview-approval", "Preview approval stage completed.", occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "preview-approval": "completed" } };
}

export function completeProductionApproval(state: OrchestrationState, occurredAt: string): OrchestrationState {
  const withHistory = appendHistory(state, "system", "stage-completed", "production-approval", "Production approval stage completed.", occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, "production-approval": "completed" } };
}

export function recordApproval(state: OrchestrationState, gateId: string, decision: "approved" | "rejected", approvedBy: string, occurredAt: string, note?: string): OrchestrationState {
  const definition = APPROVAL_GATE_DEFINITIONS.find((g) => g.id === gateId);
  const existing = state.approvals.find((a) => a.id === gateId);
  const record: ApprovalGateRecord = {
    id: gateId,
    label: definition?.label ?? existing?.label ?? gateId,
    unlocksStage: definition?.unlocksStage ?? existing?.unlocksStage ?? state.currentStage,
    status: decision,
    approvedBy,
    approvedAt: occurredAt,
    note,
  };
  const approvals = [...state.approvals.filter((a) => a.id !== gateId), record];
  return appendHistory({ ...state, approvals }, approvedBy, "approval-recorded", record.unlocksStage, `${record.label}: ${decision}${note ? ` (${note})` : ""}.`, occurredAt);
}

function gatesForStage(stage: WorkflowStage): ApprovalGateDefinition[] {
  return APPROVAL_GATE_DEFINITIONS.filter((g) => g.unlocksStage === stage);
}

function pendingGatesForStage(state: OrchestrationState, stage: WorkflowStage): ApprovalGateRecord[] {
  const definitions = gatesForStage(stage);
  return definitions.map((definition) => {
    const recorded = state.approvals.find((a) => a.id === definition.id);
    return recorded ?? { ...definition, status: "pending" as const };
  }).filter((record) => record.status !== "approved");
}

// ---------------------------------------------------------------------------
// Stage transitions and controls
// ---------------------------------------------------------------------------

export function advanceStage(state: OrchestrationState, occurredAt: string): OrchestrationState {
  const order = applicableStages(state.scope);
  const currentIndex = order.indexOf(state.currentStage);

  if (currentIndex === -1 || currentIndex === order.length - 1) {
    return appendHistory(state, "system", "stage-blocked", state.currentStage, "This is the final applicable stage for this project scope; there is nothing further to advance to.", occurredAt);
  }

  const currentStatus = getStageStatus(state, state.currentStage);
  if (currentStatus !== "completed" && currentStatus !== "ready") {
    return appendHistory(state, "system", "stage-blocked", state.currentStage, `Cannot advance: the current stage (${state.currentStage}) is not yet completed (status: ${currentStatus}).`, occurredAt);
  }

  const nextStage = order[currentIndex + 1];
  const pending = pendingGatesForStage(state, nextStage);
  if (pending.length > 0) {
    return appendHistory(state, "system", "stage-blocked", nextStage, `Cannot advance to ${nextStage}: pending approval(s) required — ${pending.map((g) => g.label).join(", ")}.`, occurredAt);
  }

  const withHistory = appendHistory(state, "system", "stage-entered", nextStage, `Advanced from ${state.currentStage} to ${nextStage}.`, occurredAt);
  return { ...withHistory, currentStage: nextStage, stageStatuses: { ...withHistory.stageStatuses, [nextStage]: "in-progress" } };
}

export function retryStage(state: OrchestrationState, occurredAt: string, reason?: string): OrchestrationState {
  const withHistory = appendHistory(state, "system", "retried", state.currentStage, reason ?? `Retrying stage ${state.currentStage}.`, occurredAt);
  return { ...withHistory, stageStatuses: { ...withHistory.stageStatuses, [state.currentStage]: "in-progress" } };
}

export function rollbackToStage(state: OrchestrationState, targetStage: WorkflowStage, occurredAt: string, reason: string): OrchestrationState {
  const order = applicableStages(state.scope);
  const targetIndex = order.indexOf(targetStage);
  const currentIndex = order.indexOf(state.currentStage);

  if (targetIndex === -1 || targetIndex >= currentIndex) {
    return appendHistory(state, "system", "stage-blocked", state.currentStage, `Cannot roll back to ${targetStage}: it is not an earlier applicable stage for this project.`, occurredAt);
  }

  const resetStatuses: Partial<Record<WorkflowStage, WorkflowStageStatus>> = {};
  for (let i = targetIndex + 1; i <= currentIndex; i++) {
    resetStatuses[order[i]] = "not-started";
  }

  const withHistory = appendHistory(state, "system", "rolled-back", targetStage, reason, occurredAt);
  return { ...withHistory, currentStage: targetStage, stageStatuses: { ...withHistory.stageStatuses, ...resetStatuses, [targetStage]: "in-progress" } };
}

export function pauseProject(state: OrchestrationState, occurredAt: string, reason?: string): OrchestrationState {
  return { ...appendHistory(state, "system", "paused", state.currentStage, reason ?? "Project paused.", occurredAt), paused: true };
}

export function resumeProject(state: OrchestrationState, occurredAt: string): OrchestrationState {
  return { ...appendHistory(state, "system", "resumed", state.currentStage, "Project resumed.", occurredAt), paused: false };
}

// ---------------------------------------------------------------------------
// Project status summary
// ---------------------------------------------------------------------------

export interface OrchestrationSummary {
  projectId: string;
  projectName: string;
  scope: ProjectScope;
  currentStage: WorkflowStage;
  currentStageStatus: WorkflowStageStatus;
  projectStatus: WorkflowStageStatus;
  nextRequiredAction: string;
  blockers: WorkflowBlocker[];
  engineBlockingFindings: QaFinding[];
  pendingApprovals: ApprovalGateRecord[];
  history: ProjectHistoryEvent[];
  evidenceLog: QaEvidenceEntry[];
  readinessDecision: {
    productionReady: boolean;
    summary: string;
  };
}

export function evaluateProjectStatus(state: OrchestrationState): OrchestrationSummary {
  const order = applicableStages(state.scope);
  const currentStatus = getStageStatus(state, state.currentStage);
  const currentIndex = order.indexOf(state.currentStage);
  const nextStage = currentIndex >= 0 && currentIndex < order.length - 1 ? order[currentIndex + 1] : undefined;

  const engineBlockingFindings = state.findings.filter((f) => f.status === "blocked" || f.status === "fail");

  const blockers: WorkflowBlocker[] = [];
  if (state.paused) {
    blockers.push({ stage: state.currentStage, severity: "medium", summary: "The project is paused.", recommendedAction: "Resume the project to continue the workflow." });
  }
  if (currentStatus === "blocked") {
    blockers.push({ stage: state.currentStage, severity: "critical", summary: `The ${state.currentStage} stage is blocked.`, recommendedAction: "Resolve the blocking findings for this stage, then retry." });
  }
  if (currentStatus === "failed") {
    blockers.push({ stage: state.currentStage, severity: "high", summary: `The ${state.currentStage} stage failed.`, recommendedAction: "Investigate the failure and retry the stage." });
  }

  const pendingApprovals = nextStage ? pendingGatesForStage(state, nextStage) : [];

  let nextRequiredAction: string;
  if (state.paused) {
    nextRequiredAction = "Resume the project to continue.";
  } else if (currentStatus === "blocked") {
    nextRequiredAction = `Resolve the blockers in the ${state.currentStage} stage.`;
  } else if (currentStatus === "failed") {
    nextRequiredAction = `Investigate and retry the ${state.currentStage} stage.`;
  } else if (currentStatus !== "completed" && currentStatus !== "ready") {
    nextRequiredAction = `Complete the ${state.currentStage} stage (current status: ${currentStatus}).`;
  } else if (pendingApprovals.length > 0) {
    nextRequiredAction = `Obtain approval: ${pendingApprovals.map((a) => a.label).join(", ")}.`;
  } else if (nextStage) {
    nextRequiredAction = `Advance to the ${nextStage} stage.`;
  } else {
    nextRequiredAction = "This project has completed every applicable stage.";
  }

  const allCompleted = order.every((stage) => {
    const s = getStageStatus(state, stage);
    return s === "completed" || s === "ready";
  });

  const projectStatus: WorkflowStageStatus = state.paused
    ? "waiting-for-input"
    : currentStatus === "blocked"
      ? "blocked"
      : currentStatus === "failed"
        ? "failed"
        : allCompleted
          ? "completed"
          : pendingApprovals.length > 0
            ? "waiting-for-approval"
            : currentStatus === "waiting-for-input"
              ? "waiting-for-input"
              : "in-progress";

  const productionReady = state.deploymentReadinessReport?.readinessDecision.deploymentReady === true;

  return {
    projectId: state.projectId,
    projectName: state.projectName,
    scope: state.scope,
    currentStage: state.currentStage,
    currentStageStatus: currentStatus,
    projectStatus,
    nextRequiredAction,
    blockers,
    engineBlockingFindings,
    pendingApprovals,
    history: state.history,
    evidenceLog: state.evidenceLog,
    readinessDecision: {
      productionReady,
      summary: productionReady
        ? "This project has a passing deployment-readiness decision and may proceed to production."
        : "This project does not yet have a passing deployment-readiness decision.",
    },
  };
}

// ---------------------------------------------------------------------------
// Client-facing summary
// ---------------------------------------------------------------------------

const STAGE_CLIENT_LABELS: Record<WorkflowStage, string> = {
  "client-intake": "Discovery",
  "intake-validation": "Discovery review",
  "research-evidence": "Research",
  "industry-classification": "Category review",
  "strategy-inputs": "Strategy",
  "engine-generation": "Content and SEO planning",
  implementation: "Build",
  "reviewer-qa": "Quality review",
  "preview-approval": "Preview review",
  "deployment-readiness": "Launch readiness",
  "production-approval": "Launch approval",
  deployment: "Launch",
  "post-launch-verification": "Post-launch check",
  maintenance: "Maintenance",
};

export interface ClientFacingSummary {
  projectName: string;
  currentStageLabel: string;
  status: WorkflowStageStatus;
  nextStep: string;
  pendingApprovals: string[];
}

export function buildClientFacingSummary(state: OrchestrationState): ClientFacingSummary {
  const summary = evaluateProjectStatus(state);
  return {
    projectName: state.clientFacingName ?? state.projectName,
    currentStageLabel: STAGE_CLIENT_LABELS[state.currentStage],
    status: summary.projectStatus,
    nextStep: summary.pendingApprovals.length > 0 ? `Awaiting your approval: ${summary.pendingApprovals.map((a) => a.label).join(", ")}.` : summary.nextRequiredAction,
    pendingApprovals: summary.pendingApprovals.map((a) => a.label),
  };
}

// ---------------------------------------------------------------------------
// Static blueprint
// ---------------------------------------------------------------------------

export interface OrchestrationBlueprint {
  stages: WorkflowStage[];
  transitionRules: string[];
  approvalGates: ApprovalGateDefinition[];
  scope: string[];
  extensionPoints: string[];
}

export function buildOrchestrationBlueprint(): OrchestrationBlueprint {
  return {
    stages: FULL_WORKFLOW_ORDER,
    transitionRules: [
      "Stages advance strictly in order; a stage cannot be entered until the previous applicable stage is completed.",
      "Strategy cannot begin until the Client Intake Engine reports a ready or resolved-enough readiness decision.",
      "Implementation cannot begin until the design direction and content/placeholder review approvals are recorded.",
      "Preview approval cannot begin until the Reviewer/QA Engine has produced a report and the QA approval gate is recorded.",
      "Deployment cannot proceed until the Deployment/Publishing Engine reports deployment-ready and the launch approval gate is recorded.",
      "A blocked stage never advances automatically; it must be retried or rolled back.",
      "Rollback resets every stage after the rollback target to not-started; it does not discard the underlying engine reports, only the workflow's position.",
    ],
    approvalGates: APPROVAL_GATE_DEFINITIONS,
    scope: [
      "Client project creation and Client Intake Engine coordination.",
      "Industry Knowledge applied as suggestion-only context, never auto-approved.",
      "Content, SEO, AI Visibility, Local SEO, and Blog Intelligence input generation, reusing each engine's own blueprint builder.",
      "Reviewer/QA and Deployment/Publishing coordination, reusing their reports directly.",
      "Pause, resume, retry, and rollback of workflow position.",
      "Project history, evidence, and a single project status summary with the next required action.",
      "Partial workflows (content-only, blog-only, SEO-only, local-SEO-only, AI-visibility-only) and full website builds (single-page or full-site).",
    ],
    extensionPoints: [
      "Prepared for future Maintenance automation (scheduled re-intake, re-review cadence).",
      "Prepared for a future mobile dashboard to drive this state machine.",
      "Prepared for a future API surface over these same functions.",
      "Prepared for future multi-LLM routing across workflow stages.",
    ],
  };
}
