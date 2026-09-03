import type { QaArea, QaStatus, QaSeverity, QaFinding, QaEvidenceEntry } from "@/lib/reviewer";
import type { PermissionsAndApprovals } from "@/lib/client-intake";
import { INTAKE_FIELD_IDS } from "@/lib/client-intake";
import type { WorkflowStage } from "@/lib/orchestration";

export type TaskRole = "research" | "strategy" | "writing" | "coding" | "review" | "image-generation" | "verification";
export type OutputFormat = "plain-text" | "markdown" | "json" | "code" | "image" | "structured-data";
export type PrivacySensitivity = "standard" | "elevated" | "restricted";
export type LatencyPreference = "fast" | "standard" | "slow";
export type QualityPreference = "cost-optimized" | "balanced" | "quality-optimized";
export type CostTier = "free" | "low" | "medium" | "high";

export interface TaskDefinition {
  taskId: string;
  role: TaskRole;
  outputFormat: OutputFormat;
  relatedStage?: WorkflowStage;
  requiredContextWindowTokens?: number;
  requiresStructuredOutput?: boolean;
  requiresToolUse?: boolean;
  requiresMultimodalInput?: boolean;
  requiresImageGeneration?: boolean;
  privacySensitivity: PrivacySensitivity;
  latencyPreference?: LatencyPreference;
  qualityPreference?: QualityPreference;
  maxCostTier?: CostTier;
  notes?: string;
}

/** Metadata only — never a credential. No field here can ever hold a key or secret. */
export interface ProviderProfile {
  providerId: string;
  displayName: string;
  available: boolean;
  connected: boolean;
  note?: string;
}

/** Metadata only — never a credential. No field here can ever hold a key or secret. */
export interface ModelCapabilityProfile {
  modelId: string;
  providerId: string;
  displayName: string;
  authorized: boolean;
  supportsRoles: TaskRole[];
  contextWindowTokens: number;
  supportsStructuredOutput: boolean;
  supportsToolUse: boolean;
  supportsMultimodalInput: boolean;
  supportsImageGeneration: boolean;
  costTier: CostTier;
  typicalLatency: LatencyPreference;
  /** Caller-supplied evaluation data only. This engine never invents a quality opinion. */
  qualityScore?: number;
  privacyTier: PrivacySensitivity;
  note?: string;
}

export interface ModelCatalog {
  providers: ProviderProfile[];
  models: ModelCapabilityProfile[];
}

/**
 * The exact field shape Client Intake uses for this permission — derived via
 * indexed access, not a lookalike type, so this stays in sync automatically.
 */
export type ExternalServiceAuthorization = NonNullable<PermissionsAndApprovals["externalServiceConnectionsApproved"]>;

export interface RoutingPolicy {
  /**
   * Required. Derived from the Client Intake Engine. Checked before anything
   * else, independent of provider availability, connection, or model
   * authorization. See docs/LLM-Router-Engine.md.
   */
  externalServiceConnectionsApproved: ExternalServiceAuthorization;
  approvedProviderIds: string[];
  blockedProviderIds?: string[];
  paidUsageApproved: boolean;
}

export interface ModelSelection {
  modelId: string;
  providerId: string;
  displayName: string;
  matchedCapabilities: string[];
  score: number;
}

export interface RouterApprovalRecord {
  id: string;
  label: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: string;
  note?: string;
}

export type RoutingStatus = "routed" | "waiting-for-approval" | "blocked";

export interface RoutingDecision {
  taskId: string;
  role: TaskRole;
  status: RoutingStatus;
  primary: ModelSelection | null;
  fallbacks: ModelSelection[];
  findings: QaFinding[];
  approvalsRequired: RouterApprovalRecord[];
  evidenceLog: QaEvidenceEntry[];
  summary: string;
  evaluatedAt: string;
}

export interface RoutingHistoryEvent {
  id: string;
  timestamp: string;
  actor: string;
  eventType: "task-received" | "model-selected" | "fallback-selected" | "awaiting-approval" | "blocked" | "approval-recorded" | "reviewers-selected" | "execution-recorded";
  detail: string;
}

export interface TaskExecutionEvidence {
  taskId: string;
  modelId: string;
  providerId: string;
  startedAt: string;
  completedAt?: string;
  outcome: "success" | "failure" | "partial";
  note?: string;
}

export interface TaskRoutingRecord {
  taskId: string;
  history: RoutingHistoryEvent[];
  decisions: RoutingDecision[];
  currentDecision: RoutingDecision;
  executions: TaskExecutionEvidence[];
}

// ---------------------------------------------------------------------------
// Findings
// ---------------------------------------------------------------------------

function passFinding(id: string, area: QaArea, summary: string): QaFinding {
  return {
    id,
    area,
    status: "pass",
    severity: "info",
    mode: "automated",
    summary,
    impact: "No material risk identified by this check.",
    recommendedAction: "No action required.",
    approvalStatus: "not-required",
  };
}

function gapFinding(id: string, area: QaArea, summary: string, status: "warning" | "fail", severity: QaSeverity, recommendedAction: string): QaFinding {
  return {
    id,
    area,
    status,
    severity,
    mode: "human-review",
    summary,
    impact: status === "fail" ? "This is a material gap and must be resolved before this task can be routed." : "This is a non-material note and does not block routing.",
    recommendedAction,
    approvalStatus: "pending",
  };
}

function blockedFinding(id: string, area: QaArea, summary: string, recommendedAction: string): QaFinding {
  return {
    id,
    area,
    status: "blocked",
    severity: "critical",
    mode: "automated",
    summary,
    impact: "This is a hard stop and must be resolved before this task can be routed to any model.",
    recommendedAction,
    approvalStatus: "pending",
  };
}

function statusToQaStatus(status: RoutingStatus): QaStatus {
  if (status === "routed") return "pass";
  if (status === "waiting-for-approval") return "warning";
  return "blocked";
}

function routingEvidenceEntry(status: RoutingStatus, recordedAt: string): QaEvidenceEntry {
  return {
    area: "router-capability-match",
    source: "LLM Router task-to-model matching",
    status: statusToQaStatus(status),
    score: status === "routed" ? 100 : status === "waiting-for-approval" ? 60 : 20,
    recordedAt,
  };
}

// ---------------------------------------------------------------------------
// Authorization gate — checked first, independent of everything else
// ---------------------------------------------------------------------------

interface AuthorizationResult {
  ok: boolean;
  status: RoutingStatus;
  finding: QaFinding;
  approval: RouterApprovalRecord | null;
  summary: string;
}

function evaluateExternalServiceAuthorization(authorization: ExternalServiceAuthorization): AuthorizationResult {
  const gateId = "external-service-authorization";
  const label = `Client authorization for external AI service connections (Client Intake: ${INTAKE_FIELD_IDS.permissions.externalServiceConnectionsApproved})`;

  if (authorization.source === "client-confirmed" && authorization.value === true) {
    return {
      ok: true,
      status: "routed",
      finding: passFinding("router-authorization.confirmed", "router-restrictions", "External-service connection authorization is client-confirmed."),
      approval: null,
      summary: "External-service authorization confirmed.",
    };
  }

  if (authorization.source === "client-confirmed" && authorization.value === false) {
    return {
      ok: false,
      status: "blocked",
      finding: blockedFinding(
        "router-authorization.denied",
        "router-restrictions",
        "The client has explicitly withheld authorization for external AI service connections. No routing decision can be made until this is approved.",
        "Do not use any external AI provider until the client explicitly approves external service connections in the Client Intake Engine.",
      ),
      approval: { id: gateId, label, status: "rejected", note: authorization.note },
      summary: "Blocked: external-service authorization has been explicitly withheld by the client.",
    };
  }

  return {
    ok: false,
    status: "waiting-for-approval",
    finding: gapFinding(
      "router-authorization.unconfirmed",
      "router-restrictions",
      `External-service connection authorization has not been client-confirmed (current source: ${authorization.source}). Routing cannot proceed until this is explicitly approved.`,
      "fail",
      "high",
      "Confirm externalServiceConnectionsApproved with the client via the Client Intake Engine before routing any task to an external AI provider.",
    ),
    approval: { id: gateId, label, status: "pending" },
    summary: "Waiting for approval: external-service authorization has not been client-confirmed.",
  };
}

// ---------------------------------------------------------------------------
// Hard filters and scoring
// ---------------------------------------------------------------------------

const PRIVACY_RANK: Record<PrivacySensitivity, number> = { standard: 0, elevated: 1, restricted: 2 };
const COST_RANK: Record<CostTier, number> = { free: 0, low: 1, medium: 2, high: 3 };

function passesHardFilters(model: ModelCapabilityProfile, provider: ProviderProfile | undefined, task: TaskDefinition, policy: RoutingPolicy): boolean {
  if (!provider || !provider.available || !provider.connected) return false;
  if (!model.authorized) return false;
  if (policy.blockedProviderIds?.includes(model.providerId)) return false;
  if (!model.supportsRoles.includes(task.role)) return false;
  if (task.requiredContextWindowTokens !== undefined && model.contextWindowTokens < task.requiredContextWindowTokens) return false;
  if (task.requiresStructuredOutput && !model.supportsStructuredOutput) return false;
  if (task.requiresToolUse && !model.supportsToolUse) return false;
  if (task.requiresMultimodalInput && !model.supportsMultimodalInput) return false;
  if (task.requiresImageGeneration && !model.supportsImageGeneration) return false;
  if (PRIVACY_RANK[model.privacyTier] < PRIVACY_RANK[task.privacySensitivity]) return false;
  if (task.maxCostTier && COST_RANK[model.costTier] > COST_RANK[task.maxCostTier]) return false;
  return true;
}

function exclusionReasons(model: ModelCapabilityProfile, provider: ProviderProfile | undefined, task: TaskDefinition, policy: RoutingPolicy): { reasons: string[]; dueToRestriction: boolean } {
  const reasons: string[] = [];
  let dueToRestriction = false;

  if (!provider) {
    reasons.push(`No provider profile was supplied for "${model.providerId}".`);
  } else {
    if (!provider.available) reasons.push(`Provider "${provider.displayName}" is not marked available.`);
    if (!provider.connected) reasons.push(`Provider "${provider.displayName}" is not marked connected.`);
  }
  if (!model.authorized) reasons.push("This model is not marked authorized for use.");
  if (policy.blockedProviderIds?.includes(model.providerId)) {
    reasons.push(`Provider "${model.providerId}" is restricted for this project.`);
    dueToRestriction = true;
  }
  if (!model.supportsRoles.includes(task.role)) reasons.push(`This model does not support the "${task.role}" role.`);
  if (task.requiredContextWindowTokens !== undefined && model.contextWindowTokens < task.requiredContextWindowTokens) {
    reasons.push(`Context window (${model.contextWindowTokens.toLocaleString()} tokens) is below the required ${task.requiredContextWindowTokens.toLocaleString()} tokens.`);
  }
  if (task.requiresStructuredOutput && !model.supportsStructuredOutput) reasons.push("This model does not support structured output.");
  if (task.requiresToolUse && !model.supportsToolUse) reasons.push("This model does not support tool use.");
  if (task.requiresMultimodalInput && !model.supportsMultimodalInput) reasons.push("This model does not support multimodal input.");
  if (task.requiresImageGeneration && !model.supportsImageGeneration) reasons.push("This model does not support image generation.");
  if (PRIVACY_RANK[model.privacyTier] < PRIVACY_RANK[task.privacySensitivity]) {
    reasons.push(`This model's privacy tier (${model.privacyTier}) does not meet the required ${task.privacySensitivity} tier.`);
  }
  if (task.maxCostTier && COST_RANK[model.costTier] > COST_RANK[task.maxCostTier]) {
    reasons.push(`This model's cost tier (${model.costTier}) exceeds the task's maximum (${task.maxCostTier}).`);
  }

  return { reasons, dueToRestriction };
}

function scoreCandidate(model: ModelCapabilityProfile, task: TaskDefinition): number {
  const quality = model.qualityScore ?? 50;
  const costScore = (3 - COST_RANK[model.costTier]) * 25;

  let score: number;
  if (task.qualityPreference === "quality-optimized") score = quality * 2 + costScore * 0.5;
  else if (task.qualityPreference === "cost-optimized") score = costScore * 2 + quality * 0.5;
  else score = quality + costScore;

  if (task.latencyPreference && model.typicalLatency === task.latencyPreference) score += 20;

  return Math.round(score);
}

function describeMatchedCapabilities(model: ModelCapabilityProfile): string[] {
  const caps = [
    `Supports roles: ${model.supportsRoles.join(", ")}`,
    `${model.contextWindowTokens.toLocaleString()}-token context window`,
    `Cost tier: ${model.costTier}`,
    `Typical latency: ${model.typicalLatency}`,
    `Privacy tier: ${model.privacyTier}`,
  ];
  if (model.supportsStructuredOutput) caps.push("Structured output");
  if (model.supportsToolUse) caps.push("Tool use");
  if (model.supportsMultimodalInput) caps.push("Multimodal input");
  if (model.supportsImageGeneration) caps.push("Image generation");
  if (model.qualityScore !== undefined) caps.push(`Caller-supplied quality score: ${model.qualityScore}`);
  return caps;
}

function toSelection(model: ModelCapabilityProfile, score: number): ModelSelection {
  return {
    modelId: model.modelId,
    providerId: model.providerId,
    displayName: model.displayName,
    matchedCapabilities: describeMatchedCapabilities(model),
    score,
  };
}

// ---------------------------------------------------------------------------
// Core routing decision
// ---------------------------------------------------------------------------

function computeRoutingDecision(task: TaskDefinition, catalog: ModelCatalog, policy: RoutingPolicy, evaluatedAt: string): RoutingDecision {
  const authResult = evaluateExternalServiceAuthorization(policy.externalServiceConnectionsApproved);

  if (!authResult.ok) {
    return {
      taskId: task.taskId,
      role: task.role,
      status: authResult.status,
      primary: null,
      fallbacks: [],
      findings: [authResult.finding],
      approvalsRequired: authResult.approval ? [authResult.approval] : [],
      evidenceLog: [routingEvidenceEntry(authResult.status, evaluatedAt)],
      summary: authResult.summary,
      evaluatedAt,
    };
  }

  const providerById = new Map(catalog.providers.map((p) => [p.providerId, p]));
  const findings: QaFinding[] = [authResult.finding];
  const eligible: ModelCapabilityProfile[] = [];

  for (const model of catalog.models) {
    const provider = providerById.get(model.providerId);
    if (passesHardFilters(model, provider, task, policy)) {
      eligible.push(model);
    } else {
      const { reasons, dueToRestriction } = exclusionReasons(model, provider, task, policy);
      findings.push(
        gapFinding(
          `router-exclusion.${model.modelId}`,
          dueToRestriction ? "router-restrictions" : "router-capability-match",
          `${model.displayName} was not selected: ${reasons.join(" ")}`,
          "warning",
          "low",
          "No action required unless this model was expected to be eligible.",
        ),
      );
    }
  }

  if (eligible.length === 0) {
    findings.push(
      blockedFinding(
        "router-capability-match.no-eligible-model",
        "router-capability-match",
        `No authorized, connected, and capable model was found for the "${task.role}" task.`,
        "Review the model catalog and provider connections, or adjust the task requirements.",
      ),
    );
    return {
      taskId: task.taskId,
      role: task.role,
      status: "blocked",
      primary: null,
      fallbacks: [],
      findings,
      approvalsRequired: [],
      evidenceLog: [routingEvidenceEntry("blocked", evaluatedAt)],
      summary: `No eligible model was found for this ${task.role} task.`,
      evaluatedAt,
    };
  }

  const ranked = eligible.map((model) => ({ model, score: scoreCandidate(model, task) })).sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const primary = toSelection(top.model, top.score);
  const fallbacks = ranked.slice(1, 4).map(({ model, score }) => toSelection(model, score));

  const approvalsRequired: RouterApprovalRecord[] = [];
  if (!policy.approvedProviderIds.includes(top.model.providerId)) {
    approvalsRequired.push({ id: `provider-change:${top.model.providerId}`, label: `Approve using "${top.model.providerId}" as a provider for this project`, status: "pending" });
    findings.push(
      gapFinding(
        `router-approval.provider-change.${top.model.providerId}`,
        "router-approval",
        `The top-ranked model uses provider "${top.model.providerId}", which is not yet approved for this project.`,
        "warning",
        "medium",
        "Obtain explicit approval before using this provider.",
      ),
    );
  }
  if (top.model.costTier !== "free" && !policy.paidUsageApproved) {
    approvalsRequired.push({ id: `paid-usage:${top.model.modelId}`, label: `Approve paid usage of "${top.model.displayName}" (cost tier: ${top.model.costTier})`, status: "pending" });
    findings.push(
      gapFinding(
        `router-approval.paid-usage.${top.model.modelId}`,
        "router-approval",
        `The top-ranked model "${top.model.displayName}" has a ${top.model.costTier} cost tier and paid usage has not been approved.`,
        "warning",
        "medium",
        "Obtain explicit approval before using a paid model.",
      ),
    );
  }

  const status: RoutingStatus = approvalsRequired.length > 0 ? "waiting-for-approval" : "routed";

  return {
    taskId: task.taskId,
    role: task.role,
    status,
    primary,
    fallbacks,
    findings,
    approvalsRequired,
    evidenceLog: [routingEvidenceEntry(status, evaluatedAt)],
    summary:
      status === "routed"
        ? `Routed to ${primary.displayName} (${primary.providerId}).`
        : `${primary.displayName} (${primary.providerId}) is the top candidate but requires approval: ${approvalsRequired.map((a) => a.label).join(", ")}.`,
    evaluatedAt,
  };
}

// ---------------------------------------------------------------------------
// Public routing functions
// ---------------------------------------------------------------------------

export function routeTask(task: TaskDefinition, catalog: ModelCatalog, policy: RoutingPolicy, occurredAt: string): TaskRoutingRecord {
  const decision = computeRoutingDecision(task, catalog, policy, occurredAt);
  const history: RoutingHistoryEvent[] = [
    { id: "evt-1", timestamp: occurredAt, actor: "system", eventType: "task-received", detail: `Task ${task.taskId} (${task.role}) received for routing.` },
    {
      id: "evt-2",
      timestamp: occurredAt,
      actor: "system",
      eventType: decision.status === "blocked" ? "blocked" : decision.status === "waiting-for-approval" ? "awaiting-approval" : "model-selected",
      detail: decision.summary,
    },
  ];
  return { taskId: task.taskId, history, decisions: [decision], currentDecision: decision, executions: [] };
}

export function handleModelUnavailable(record: TaskRoutingRecord, task: TaskDefinition, catalog: ModelCatalog, policy: RoutingPolicy, unavailableModelId: string, occurredAt: string): TaskRoutingRecord {
  const filteredCatalog: ModelCatalog = { providers: catalog.providers, models: catalog.models.filter((m) => m.modelId !== unavailableModelId) };
  const rerouted = computeRoutingDecision(task, filteredCatalog, policy, occurredAt);

  const fallbackFinding = rerouted.primary
    ? passFinding(
        "router-fallback.selected",
        "router-fallback",
        `Fallback selected after "${unavailableModelId}" became unavailable: ${rerouted.primary.displayName} (${rerouted.primary.providerId}).`,
      )
    : blockedFinding(
        "router-fallback.exhausted",
        "router-fallback",
        `No eligible fallback was found after "${unavailableModelId}" became unavailable.`,
        "Expand the model catalog, add an authorized provider, or adjust the task requirements.",
      );

  const newDecision: RoutingDecision = { ...rerouted, findings: [...rerouted.findings, fallbackFinding] };
  const event: RoutingHistoryEvent = {
    id: `evt-${record.history.length + 1}`,
    timestamp: occurredAt,
    actor: "system",
    eventType: newDecision.primary ? "fallback-selected" : "blocked",
    detail: fallbackFinding.summary,
  };

  return { ...record, history: [...record.history, event], decisions: [...record.decisions, newDecision], currentDecision: newDecision };
}

export function recordRoutingApproval(record: TaskRoutingRecord, approvalId: string, decision: "approved" | "rejected", approvedBy: string, occurredAt: string, note?: string): TaskRoutingRecord {
  const updatedApprovals = record.currentDecision.approvalsRequired.map((a) => (a.id === approvalId ? { ...a, status: decision, approvedBy, approvedAt: occurredAt, note } : a));
  const stillPending = updatedApprovals.some((a) => a.status === "pending");
  const anyRejected = updatedApprovals.some((a) => a.status === "rejected");
  const newStatus: RoutingStatus = anyRejected ? "blocked" : stillPending ? "waiting-for-approval" : "routed";

  const updatedDecision: RoutingDecision = {
    ...record.currentDecision,
    approvalsRequired: updatedApprovals,
    status: newStatus,
    primary: anyRejected ? null : record.currentDecision.primary,
    fallbacks: anyRejected ? [] : record.currentDecision.fallbacks,
    summary: anyRejected
      ? "Blocked: a required approval was rejected."
      : newStatus === "routed"
        ? `Routed to ${record.currentDecision.primary?.displayName ?? "the selected model"} after approval.`
        : record.currentDecision.summary,
  };

  const event: RoutingHistoryEvent = {
    id: `evt-${record.history.length + 1}`,
    timestamp: occurredAt,
    actor: approvedBy,
    eventType: "approval-recorded",
    detail: `${approvalId}: ${decision}${note ? ` (${note})` : ""}.`,
  };

  return { ...record, history: [...record.history, event], decisions: [...record.decisions, updatedDecision], currentDecision: updatedDecision };
}

export function recordTaskExecution(record: TaskRoutingRecord, evidence: TaskExecutionEvidence, occurredAt: string): TaskRoutingRecord {
  const event: RoutingHistoryEvent = {
    id: `evt-${record.history.length + 1}`,
    timestamp: occurredAt,
    actor: "system",
    eventType: "execution-recorded",
    detail: `Execution recorded for ${evidence.modelId} (${evidence.providerId}): ${evidence.outcome}.`,
  };
  return { ...record, history: [...record.history, event], executions: [...record.executions, evidence] };
}

// ---------------------------------------------------------------------------
// Multi-model review
// ---------------------------------------------------------------------------

export function routeMultiModelReview(task: TaskDefinition, catalog: ModelCatalog, policy: RoutingPolicy, reviewerCount: number, occurredAt: string): TaskRoutingRecord & { reviewers: ModelSelection[] } {
  const record = routeTask(task, catalog, policy, occurredAt);
  const reviewers = [record.currentDecision.primary, ...record.currentDecision.fallbacks].filter((s): s is ModelSelection => s !== null).slice(0, reviewerCount);
  const event: RoutingHistoryEvent = {
    id: `evt-${record.history.length + 1}`,
    timestamp: occurredAt,
    actor: "system",
    eventType: "reviewers-selected",
    detail: `Selected ${reviewers.length} reviewer(s) for multi-model review: ${reviewers.map((r) => r.displayName).join(", ") || "none eligible"}.`,
  };
  return { ...record, history: [...record.history, event], reviewers };
}

export interface ModelReviewResult {
  modelId: string;
  verdict: "pass" | "warning" | "fail" | "blocked";
  confidence: number;
  note?: string;
}

export interface MultiModelAgreement {
  status: "unanimous" | "majority" | "split";
  averageConfidence: number;
  consensusVerdict: ModelReviewResult["verdict"] | null;
  disagreementFlagged: boolean;
  findings: QaFinding[];
}

export function evaluateMultiModelAgreement(results: ModelReviewResult[]): MultiModelAgreement {
  if (results.length === 0) {
    return {
      status: "split",
      averageConfidence: 0,
      consensusVerdict: null,
      disagreementFlagged: true,
      findings: [gapFinding("router-multi-model-review.no-results", "router-multi-model-review", "No review results were supplied.", "fail", "high", "Supply at least one model review result.")],
    };
  }

  const tally = new Map<ModelReviewResult["verdict"], number>();
  for (const result of results) tally.set(result.verdict, (tally.get(result.verdict) ?? 0) + 1);
  const [topVerdict, topCount] = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
  const averageConfidence = Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length);

  const status: MultiModelAgreement["status"] = topCount === results.length ? "unanimous" : topCount > results.length / 2 ? "majority" : "split";
  const disagreementFlagged = status !== "unanimous" || averageConfidence < 60;

  const findings: QaFinding[] = disagreementFlagged
    ? [
        gapFinding(
          "router-multi-model-review.disagreement",
          "router-multi-model-review",
          `Model reviewers reached a ${status} verdict (${topVerdict}, ${topCount}/${results.length}) with an average confidence of ${averageConfidence}.`,
          "warning",
          "medium",
          "Route this task for human review before treating the result as final.",
        ),
      ]
    : [passFinding("router-multi-model-review.agreement", "router-multi-model-review", `Model reviewers reached a unanimous ${topVerdict} verdict with an average confidence of ${averageConfidence}.`)];

  return { status, averageConfidence, consensusVerdict: topVerdict, disagreementFlagged, findings };
}

// ---------------------------------------------------------------------------
// Orchestration handoff contract
// ---------------------------------------------------------------------------

export interface OrchestrationTaskSubmission {
  taskId: string;
  relatedStage?: WorkflowStage;
  requestedBy: string;
  task: TaskDefinition;
}

export interface OrchestrationRoutingHandoff {
  taskId: string;
  relatedStage?: WorkflowStage;
  routingRecord: TaskRoutingRecord;
  requiresHumanApproval: boolean;
  summary: string;
}

/**
 * The single entry point the Orchestration/Workflow Engine (or any caller)
 * should use to submit a task. This function never advances, completes, or
 * approves any orchestration stage — it only returns data for the caller to
 * store and act on.
 */
export function submitTaskToRouter(submission: OrchestrationTaskSubmission, catalog: ModelCatalog, policy: RoutingPolicy, occurredAt: string): OrchestrationRoutingHandoff {
  const task: TaskDefinition = { ...submission.task, relatedStage: submission.task.relatedStage ?? submission.relatedStage };
  const routingRecord = routeTask(task, catalog, policy, occurredAt);
  return {
    taskId: submission.taskId,
    relatedStage: submission.relatedStage,
    routingRecord,
    requiresHumanApproval: routingRecord.currentDecision.status !== "routed",
    summary: routingRecord.currentDecision.summary,
  };
}

// ---------------------------------------------------------------------------
// Static blueprint
// ---------------------------------------------------------------------------

export interface RouterBlueprint {
  scope: string[];
  hardFilterOrder: string[];
  automatedDecisions: string[];
  humanApprovals: string[];
  approvalGate: string[];
  extensionPoints: string[];
}

export function buildRouterBlueprint(): RouterBlueprint {
  return {
    scope: [
      "Model-agnostic task definitions across research, strategy, writing, coding, review, image generation, and verification roles.",
      "Provider and model capability profiles for Anthropic, OpenAI, Google, and future providers — provider ids are open strings, never a closed list.",
      "Deterministic task-to-model matching with a primary recommendation and ordered fallbacks.",
      "Context window, structured-output, tool-use, multimodal, image, privacy, and cost-tier requirement matching.",
      "Retry and fallback routing when a model becomes unavailable.",
      "Multi-model review with caller-reported confidence and disagreement handling.",
      "Task-execution evidence, routing history, and an explicit Orchestration handoff contract.",
    ],
    hardFilterOrder: [
      "0. Project-level external-service authorization, derived from the Client Intake Engine's externalServiceConnectionsApproved permission. Checked first and independently of every other signal.",
      "1. Provider availability and connection, model authorization, provider restriction list.",
      "2. Task role support, context window, structured output, tool use, multimodal input, image generation.",
      "3. Privacy tier and cost ceiling.",
      "4. (Subjective, applied only to candidates that already passed 0-3) Caller-supplied quality score, cost tier, and latency preference.",
    ],
    automatedDecisions: [
      "Every hard-filter elimination and the reason for it.",
      "Ranking and scoring among eligible candidates using only caller-supplied data.",
      "Fallback re-routing when a model becomes unavailable.",
      "Multi-model agreement tallying (unanimous, majority, split).",
    ],
    humanApprovals: [
      "External-service connection authorization (Client Intake).",
      "Using a provider not yet approved for this project.",
      "Using a model with a non-free cost tier before paid usage is approved.",
      "Resolving flagged multi-model disagreement.",
    ],
    approvalGate: [
      "External-service authorization confirmed",
      "Selected provider approved for this project",
      "Paid usage approved if applicable",
      "Multi-model disagreement, if any, resolved by a human",
    ],
    extensionPoints: [
      "Prepared for live provider adapters (Anthropic, OpenAI, Google, and future providers)",
      "Prepared for usage tracking and budgeting",
      "Prepared for maintenance automation",
      "Prepared for a future mobile dashboard and API surface",
    ],
  };
}
