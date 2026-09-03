import type { WritingStandardEvaluation } from "@/lib/content-intelligence";
import type { SeoReviewEvaluation } from "@/lib/seo/intelligence";
import type { AiVisibilityReviewEvaluation } from "@/lib/ai-visibility";
import type { LocalSeoReviewEvaluation } from "@/lib/local-seo";
import type { BlogReviewEvaluation } from "@/lib/blog-intelligence";
import type { IndustryReviewEvaluation } from "@/lib/industry-knowledge";

export type QaStatus = "pass" | "warning" | "fail" | "blocked";
export type QaSeverity = "info" | "low" | "medium" | "high" | "critical";
export type QaReviewMode = "automated" | "human-review";
export type QaApprovalStatus = "not-required" | "pending" | "approved";

export type QaArea =
  | "factual-accuracy"
  | "confirmation-status"
  | "brand-voice"
  | "content-quality"
  | "duplicate-content"
  | "seo"
  | "ai-visibility"
  | "local-seo"
  | "blog"
  | "industry-guidance"
  | "design"
  | "accessibility"
  | "performance"
  | "responsiveness"
  | "technical-integrity"
  | "security-deployment"
  | "approval-gates"
  | "intake-identity"
  | "intake-contacts"
  | "intake-services"
  | "intake-locations"
  | "intake-audience-goals"
  | "intake-brand-design"
  | "intake-external-presence"
  | "intake-trust-claims"
  | "intake-languages-competitors"
  | "intake-pages-content"
  | "intake-strategy-priorities"
  | "intake-compliance"
  | "intake-permissions"
  | "deploy-qa-gate"
  | "deploy-permissions"
  | "deploy-environment-variables"
  | "deploy-redirects-canonical"
  | "deploy-robots-sitemap"
  | "deploy-domain-dns"
  | "deploy-analytics"
  | "deploy-backups"
  | "deploy-handoff"
  | "deploy-maintenance-mode"
  | "deploy-post-launch"
  | "deploy-portability"
  | "router-capability-match"
  | "router-restrictions"
  | "router-fallback"
  | "router-approval"
  | "router-multi-model-review";

export interface QaFinding {
  id: string;
  area: QaArea;
  status: QaStatus;
  severity: QaSeverity;
  mode: QaReviewMode;
  summary: string;
  impact: string;
  recommendedAction: string;
  approvalStatus: QaApprovalStatus;
}

export interface QaEvidenceEntry {
  area: QaArea;
  source: string;
  status: QaStatus;
  score: number;
  recordedAt: string;
}

export interface DesignReviewSignals {
  usesSharedDesignTokens?: boolean;
  hasClearHierarchy?: boolean;
  hasSinglePrimaryCta?: boolean;
  hasRequiredTrustElements?: boolean;
  appearsTemplateGeneric?: boolean;
}

export interface AccessibilityReviewSignals {
  hasSingleH1?: boolean;
  usesSemanticLandmarks?: boolean;
  hasVisibleFocusStates?: boolean;
  isKeyboardOperable?: boolean;
  meetsColorContrast?: boolean;
  hasDescriptiveAltText?: boolean;
  respectsReducedMotion?: boolean;
}

export interface PerformanceReviewSignals {
  minimalClientJs?: boolean;
  imagesOptimized?: boolean;
  usesStaticOrServerRendering?: boolean;
  coreWebVitalsWithinBudget?: boolean;
}

export interface ResponsivenessReviewSignals {
  verifiedMobile?: boolean;
  verifiedTablet?: boolean;
  verifiedDesktop?: boolean;
  layoutIssues?: string[];
}

export interface TechnicalIntegrityReviewSignals {
  lintPassed?: boolean;
  buildPassed?: boolean;
  brokenLinks?: string[];
  missingAssets?: string[];
  routeErrors?: string[];
}

export interface SecurityDeploymentReviewSignals {
  noSecretsInRepo?: boolean;
  formsHandleInputSafely?: boolean;
  externalIntegrationsApproved?: boolean;
  analyticsApproved?: boolean;
  deploymentApprovalRecorded?: boolean;
}

export interface ConfirmationSignals {
  allClientFactsConfirmed?: boolean;
  unconfirmedItems?: string[];
}

export interface DuplicateContentSignals {
  overlappingPages?: string[];
  cannibalizationRisk?: boolean;
}

export interface ApprovalGateSignals {
  pendingApprovals?: string[];
  recordedApprovals?: string[];
}

export interface QaReviewContext {
  projectName?: string;
  reviewer?: string;
  reviewedAt?: string;

  contentEvaluation?: WritingStandardEvaluation;
  seoEvaluation?: SeoReviewEvaluation;
  indexabilityConfirmed?: boolean;
  aiVisibilityEvaluation?: AiVisibilityReviewEvaluation;
  localSeoEvaluation?: LocalSeoReviewEvaluation;
  blogEvaluation?: BlogReviewEvaluation;
  industryEvaluation?: IndustryReviewEvaluation;

  confirmationSignals?: ConfirmationSignals;
  duplicateContentSignals?: DuplicateContentSignals;
  design?: DesignReviewSignals;
  accessibility?: AccessibilityReviewSignals;
  performance?: PerformanceReviewSignals;
  responsiveness?: ResponsivenessReviewSignals;
  technicalIntegrity?: TechnicalIntegrityReviewSignals;
  securityAndDeployment?: SecurityDeploymentReviewSignals;
  approvalGateSignals?: ApprovalGateSignals;
}

export interface QaReviewReport {
  projectName: string;
  reviewer: string;
  reviewedAt: string;
  findings: QaFinding[];
  areaScores: { area: QaArea; score: number }[];
  overallScore: number;
  overallStatus: QaStatus;
  automatedChecks: QaFinding[];
  humanReviewChecks: QaFinding[];
  criticalFindings: QaFinding[];
  approvalDecision: {
    launchReady: boolean;
    status: "ready" | "needs-review" | "blocked";
    blockingFindings: QaFinding[];
    pendingApprovals: QaFinding[];
    summary: string;
  };
  evidenceLog: QaEvidenceEntry[];
  approvalGate: string[];
  extensionPoints: string[];
}

export interface ReviewerBlueprint {
  scope: string[];
  automatedCheckAreas: QaArea[];
  humanReviewAreas: QaArea[];
  reviewChecklist: string[];
  approvalGate: string[];
  extensionPoints: string[];
}

function mapEngineStatus(status: "ready" | "review" | "blocked"): QaStatus {
  if (status === "blocked") return "blocked";
  if (status === "review") return "warning";
  return "pass";
}

function severityForStatus(status: QaStatus): QaSeverity {
  switch (status) {
    case "blocked":
      return "critical";
    case "fail":
      return "high";
    case "warning":
      return "medium";
    default:
      return "info";
  }
}

function severityWeight(severity: QaSeverity): number {
  switch (severity) {
    case "critical":
      return 4;
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
}

function combineScores(scores: number[]): number {
  if (scores.length === 0) return 100;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

interface EngineEvaluationLike {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

function findingsFromEvaluation(
  area: QaArea,
  source: string,
  evaluation: EngineEvaluationLike | undefined,
): { findings: QaFinding[]; score: number } | null {
  if (!evaluation) return null;
  const mappedStatus = mapEngineStatus(evaluation.status);

  if (evaluation.warnings.length === 0) {
    return {
      score: evaluation.score,
      findings: [
        {
          id: `${area}-pass`,
          area,
          status: mappedStatus,
          severity: severityForStatus(mappedStatus),
          mode: "automated",
          summary: `${source} reports no outstanding warnings.`,
          impact: "No material risk identified by this check.",
          recommendedAction: "No action required. Re-check if the underlying content changes.",
          approvalStatus: "not-required",
        },
      ],
    };
  }

  return {
    score: evaluation.score,
    findings: evaluation.warnings.map((warning, index) => ({
      id: `${area}-${index}`,
      area,
      status: mappedStatus,
      severity: severityForStatus(mappedStatus),
      mode: "automated",
      summary: warning,
      impact: `Flagged by ${source} (score ${evaluation.score}/100).`,
      recommendedAction: "Resolve this item before requesting final approval.",
      approvalStatus: "pending",
    })),
  };
}

function findingsFromContentEvaluation(
  evaluation: WritingStandardEvaluation | undefined,
): { findings: QaFinding[]; score: number } | null {
  if (!evaluation) return null;
  const mappedStatus = mapEngineStatus(evaluation.status);

  if (evaluation.warnings.length === 0) {
    return {
      score: evaluation.score,
      findings: [
        {
          id: "content-quality-pass",
          area: "content-quality",
          status: mappedStatus,
          severity: severityForStatus(mappedStatus),
          mode: "automated",
          summary: "Content Intelligence reports no outstanding writing-standard warnings.",
          impact: "No material risk identified by this check.",
          recommendedAction: "No action required. Re-check if the draft changes.",
          approvalStatus: "not-required",
        },
      ],
    };
  }

  return {
    score: evaluation.score,
    findings: evaluation.warnings.map((warning, index) => {
      const lower = warning.toLowerCase();
      const area: QaArea =
        lower.includes("claim") || lower.includes("guarantee") || lower.includes("fact") || lower.includes("placeholder")
          ? "factual-accuracy"
          : lower.includes("voice") || lower.includes("tone")
            ? "brand-voice"
            : "content-quality";

      return {
        id: `content-${index}`,
        area,
        status: mappedStatus,
        severity: severityForStatus(mappedStatus),
        mode: "automated",
        summary: warning,
        impact: `Flagged by the Content Intelligence writing-standard evaluation (score ${evaluation.score}/100).`,
        recommendedAction: "Revise the draft to align with the Human Writing Standard before requesting approval.",
        approvalStatus: "pending",
      };
    }),
  };
}

interface BooleanCheckSpec {
  key: string;
  area: QaArea;
  mode: QaReviewMode;
  label: string;
  value: boolean | undefined;
  passSummary: string;
  failSummary: string;
  unknownSummary: string;
  severityOnFail: QaSeverity;
  recommendedAction: string;
  statusOnFail?: QaStatus;
}

function evaluateBooleanChecks(specs: BooleanCheckSpec[]): { findings: QaFinding[]; score: number } {
  let penalty = 0;

  const findings = specs.map((spec, index) => {
    const id = `${spec.area}-${spec.key}-${index}`;

    if (spec.value === true) {
      return {
        id,
        area: spec.area,
        status: "pass" as QaStatus,
        severity: "info" as QaSeverity,
        mode: spec.mode,
        summary: spec.passSummary,
        impact: "No material risk identified by this check.",
        recommendedAction: "No action required.",
        approvalStatus: "not-required" as QaApprovalStatus,
      };
    }

    if (spec.value === false) {
      penalty += spec.severityOnFail === "critical" ? 30 : spec.severityOnFail === "high" ? 20 : 12;
      const status = spec.statusOnFail ?? (spec.severityOnFail === "critical" ? "blocked" : "fail");
      return {
        id,
        area: spec.area,
        status,
        severity: spec.severityOnFail,
        mode: spec.mode,
        summary: spec.failSummary,
        impact: `Failed check: ${spec.label}.`,
        recommendedAction: spec.recommendedAction,
        approvalStatus: "pending" as QaApprovalStatus,
      };
    }

    penalty += 8;
    return {
      id,
      area: spec.area,
      status: "warning" as QaStatus,
      severity: "medium" as QaSeverity,
      mode: "human-review" as QaReviewMode,
      summary: spec.unknownSummary,
      impact: `Not yet verified: ${spec.label}.`,
      recommendedAction: "Verify this item and record the result before requesting approval.",
      approvalStatus: "pending" as QaApprovalStatus,
    };
  });

  return { findings, score: Math.max(20, 100 - penalty) };
}

interface ListCheckSpec {
  key: string;
  area: QaArea;
  mode: QaReviewMode;
  label: string;
  items: string[] | undefined;
  severityOnFail: QaSeverity;
  recommendedAction: string;
  statusOnFail?: QaStatus;
}

function evaluateListChecks(specs: ListCheckSpec[]): { findings: QaFinding[]; score: number } {
  let penalty = 0;

  const findings = specs.map((spec, index) => {
    const id = `${spec.area}-${spec.key}-${index}`;

    if (spec.items === undefined) {
      penalty += 8;
      return {
        id,
        area: spec.area,
        status: "warning" as QaStatus,
        severity: "medium" as QaSeverity,
        mode: "human-review" as QaReviewMode,
        summary: `${spec.label} has not been checked.`,
        impact: `Not yet verified: ${spec.label}.`,
        recommendedAction: "Run the relevant check and record the result before requesting approval.",
        approvalStatus: "pending" as QaApprovalStatus,
      };
    }

    if (spec.items.length === 0) {
      return {
        id,
        area: spec.area,
        status: "pass" as QaStatus,
        severity: "info" as QaSeverity,
        mode: spec.mode,
        summary: `${spec.label}: none found.`,
        impact: "No material risk identified by this check.",
        recommendedAction: "No action required.",
        approvalStatus: "not-required" as QaApprovalStatus,
      };
    }

    penalty += spec.severityOnFail === "critical" ? 30 : spec.severityOnFail === "high" ? 20 : 12;
    const status = spec.statusOnFail ?? (spec.severityOnFail === "critical" ? "blocked" : "fail");
    return {
      id,
      area: spec.area,
      status,
      severity: spec.severityOnFail,
      mode: spec.mode,
      summary: `${spec.label}: ${spec.items.join(", ")}.`,
      impact: `Failed check: ${spec.label}.`,
      recommendedAction: spec.recommendedAction,
      approvalStatus: "pending" as QaApprovalStatus,
    };
  });

  return { findings, score: Math.max(20, 100 - penalty) };
}

function indexabilityCheck(confirmed: boolean | undefined) {
  return evaluateBooleanChecks([
    {
      key: "indexability",
      area: "seo",
      mode: "automated",
      label: "Indexability confirmed",
      value: confirmed,
      passSummary: "The page's indexability (robots directive and sitemap inclusion) has been confirmed as intended.",
      failSummary: "The page's indexability does not match the intended robots or sitemap configuration.",
      unknownSummary: "Indexability has not been confirmed for this page.",
      severityOnFail: "high",
      recommendedAction: "Confirm the intended robots directive and sitemap inclusion for this page.",
    },
  ]);
}

function confirmationChecks(signals: ConfirmationSignals | undefined) {
  if (!signals) return null;
  const boolResult = evaluateBooleanChecks([
    {
      key: "all-confirmed",
      area: "confirmation-status",
      mode: "human-review",
      label: "All client facts confirmed",
      value: signals.allClientFactsConfirmed,
      passSummary: "All facts used in this content have been confirmed by the client.",
      failSummary: "Some facts used in this content have not been confirmed by the client.",
      unknownSummary: "Client confirmation status for the facts used has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Route the unconfirmed facts to the client for explicit approval before publishing.",
    },
  ]);
  const listResult = evaluateListChecks([
    {
      key: "unconfirmed-items",
      area: "confirmation-status",
      mode: "human-review",
      label: "Unconfirmed items",
      items: signals.unconfirmedItems,
      severityOnFail: "high",
      recommendedAction: "Confirm each item with the client or remove it before publishing.",
    },
  ]);
  return {
    findings: [...boolResult.findings, ...listResult.findings],
    score: combineScores([boolResult.score, listResult.score]),
  };
}

function duplicateContentChecks(signals: DuplicateContentSignals | undefined) {
  if (!signals) return null;
  const listResult = evaluateListChecks([
    {
      key: "overlapping-pages",
      area: "duplicate-content",
      mode: "human-review",
      label: "Overlapping pages or articles",
      items: signals.overlappingPages,
      severityOnFail: "medium",
      recommendedAction: "Differentiate the pages by audience, service, or local angle, or consolidate them.",
    },
  ]);
  const boolResult = evaluateBooleanChecks([
    {
      key: "cannibalization",
      area: "duplicate-content",
      mode: "human-review",
      label: "No keyword cannibalization risk",
      value: signals.cannibalizationRisk === undefined ? undefined : !signals.cannibalizationRisk,
      passSummary: "No keyword cannibalization risk identified.",
      failSummary: "A keyword cannibalization risk has been identified.",
      unknownSummary: "Cannibalization risk has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Differentiate the competing pages by intent, keyword focus, or audience.",
    },
  ]);
  return {
    findings: [...listResult.findings, ...boolResult.findings],
    score: combineScores([listResult.score, boolResult.score]),
  };
}

function designChecks(signals: DesignReviewSignals | undefined) {
  if (!signals) return null;
  return evaluateBooleanChecks([
    {
      key: "tokens",
      area: "design",
      mode: "human-review",
      label: "Uses shared design tokens",
      value: signals.usesSharedDesignTokens,
      passSummary: "The page uses the shared design token system.",
      failSummary: "The page does not consistently use the shared design tokens.",
      unknownSummary: "Design token usage has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Align spacing, typography, and color with the shared design tokens.",
    },
    {
      key: "hierarchy",
      area: "design",
      mode: "human-review",
      label: "Clear visual hierarchy",
      value: signals.hasClearHierarchy,
      passSummary: "The page has a clear visual hierarchy.",
      failSummary: "The page's visual hierarchy is unclear.",
      unknownSummary: "Visual hierarchy has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Revise section order and emphasis so the primary message and action are obvious.",
    },
    {
      key: "cta",
      area: "design",
      mode: "human-review",
      label: "Single clear primary CTA",
      value: signals.hasSinglePrimaryCta,
      passSummary: "The page has a single, clear primary call to action.",
      failSummary: "The page lacks a single clear primary call to action.",
      unknownSummary: "Primary CTA clarity has not been reviewed.",
      severityOnFail: "high",
      recommendedAction: "Reduce competing calls to action to one clear primary CTA.",
    },
    {
      key: "trust",
      area: "design",
      mode: "human-review",
      label: "Required trust elements present",
      value: signals.hasRequiredTrustElements,
      passSummary: "Required trust elements are present and grounded in approved details.",
      failSummary: "Required trust elements are missing or ungrounded.",
      unknownSummary: "Trust element coverage has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Add trust elements grounded in confirmed client details.",
    },
    {
      key: "originality",
      area: "design",
      mode: "human-review",
      label: "Design is not generic or template-like",
      value: signals.appearsTemplateGeneric === undefined ? undefined : !signals.appearsTemplateGeneric,
      passSummary: "The design feels custom and grounded in the client's real context.",
      failSummary: "The design reads as generic or template-like.",
      unknownSummary: "Design originality has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Revise the layout so it reflects the client's real context instead of a generic template pattern.",
    },
  ]);
}

function accessibilityChecks(signals: AccessibilityReviewSignals | undefined) {
  if (!signals) return null;
  return evaluateBooleanChecks([
    {
      key: "h1",
      area: "accessibility",
      mode: "automated",
      label: "Single clear H1",
      value: signals.hasSingleH1,
      passSummary: "The page has one clear H1.",
      failSummary: "The page is missing a single clear H1.",
      unknownSummary: "H1 usage has not been checked.",
      severityOnFail: "high",
      recommendedAction: "Add exactly one H1 that reflects the page topic.",
    },
    {
      key: "landmarks",
      area: "accessibility",
      mode: "automated",
      label: "Semantic landmarks used",
      value: signals.usesSemanticLandmarks,
      passSummary: "The page uses semantic landmarks (header, nav, main, footer).",
      failSummary: "The page is missing semantic landmarks.",
      unknownSummary: "Semantic landmark usage has not been checked.",
      severityOnFail: "medium",
      recommendedAction: "Use header, nav, main, section, and footer elements appropriately.",
    },
    {
      key: "focus",
      area: "accessibility",
      mode: "human-review",
      label: "Visible focus states",
      value: signals.hasVisibleFocusStates,
      passSummary: "Interactive elements have visible focus states.",
      failSummary: "Interactive elements are missing visible focus states.",
      unknownSummary: "Focus state visibility has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Add visible focus styles to all interactive elements.",
    },
    {
      key: "keyboard",
      area: "accessibility",
      mode: "human-review",
      label: "Keyboard operable",
      value: signals.isKeyboardOperable,
      passSummary: "All interactions are usable with the keyboard alone.",
      failSummary: "Some interactions are not usable with the keyboard alone.",
      unknownSummary: "Keyboard operability has not been reviewed.",
      severityOnFail: "high",
      recommendedAction: "Ensure every interactive element is reachable and operable by keyboard.",
    },
    {
      key: "contrast",
      area: "accessibility",
      mode: "human-review",
      label: "Sufficient color contrast",
      value: signals.meetsColorContrast,
      passSummary: "Text and controls meet sufficient color contrast.",
      failSummary: "Some text or controls do not meet sufficient color contrast.",
      unknownSummary: "Color contrast has not been reviewed.",
      severityOnFail: "medium",
      recommendedAction: "Adjust colors to meet accessible contrast ratios.",
    },
    {
      key: "alt-text",
      area: "accessibility",
      mode: "automated",
      label: "Descriptive alt text",
      value: signals.hasDescriptiveAltText,
      passSummary: "Meaningful images have descriptive alt text.",
      failSummary: "Some meaningful images are missing descriptive alt text.",
      unknownSummary: "Alt text coverage has not been checked.",
      severityOnFail: "medium",
      recommendedAction: "Add descriptive alt text for meaningful images.",
    },
    {
      key: "reduced-motion",
      area: "accessibility",
      mode: "human-review",
      label: "Respects reduced motion",
      value: signals.respectsReducedMotion,
      passSummary: "Motion respects the reduced-motion preference.",
      failSummary: "Motion does not respect the reduced-motion preference.",
      unknownSummary: "Reduced-motion behavior has not been reviewed.",
      severityOnFail: "low",
      recommendedAction: "Add a reduced-motion fallback for any animation.",
    },
  ]);
}

function performanceChecks(signals: PerformanceReviewSignals | undefined) {
  if (!signals) return null;
  return evaluateBooleanChecks([
    {
      key: "js-budget",
      area: "performance",
      mode: "automated",
      label: "Minimal client-side JavaScript",
      value: signals.minimalClientJs,
      passSummary: "Client-side JavaScript stays within budget.",
      failSummary: "Client-side JavaScript exceeds the expected budget.",
      unknownSummary: "Client-side JavaScript usage has not been checked.",
      severityOnFail: "medium",
      recommendedAction: "Reduce client-side JavaScript and prefer server-rendered approaches.",
    },
    {
      key: "images",
      area: "performance",
      mode: "automated",
      label: "Images optimized",
      value: signals.imagesOptimized,
      passSummary: "Images are optimized and appropriately sized.",
      failSummary: "Some images are not optimized.",
      unknownSummary: "Image optimization has not been checked.",
      severityOnFail: "medium",
      recommendedAction: "Optimize and correctly size images before publishing.",
    },
    {
      key: "rendering",
      area: "performance",
      mode: "automated",
      label: "Static or server rendering used where appropriate",
      value: signals.usesStaticOrServerRendering,
      passSummary: "The page uses static or server rendering where appropriate.",
      failSummary: "The page relies on client rendering where static or server rendering would be more appropriate.",
      unknownSummary: "Rendering strategy has not been checked.",
      severityOnFail: "low",
      recommendedAction: "Prefer static or server rendering for this page type.",
    },
    {
      key: "cwv",
      area: "performance",
      mode: "automated",
      label: "Core Web Vitals within budget",
      value: signals.coreWebVitalsWithinBudget,
      passSummary: "Core Web Vitals are within budget.",
      failSummary: "Core Web Vitals are outside the expected budget.",
      unknownSummary: "Core Web Vitals have not been measured.",
      severityOnFail: "high",
      recommendedAction: "Investigate and resolve the Core Web Vitals regression before launch.",
    },
  ]);
}

function responsivenessChecks(signals: ResponsivenessReviewSignals | undefined) {
  if (!signals) return null;
  const boolResult = evaluateBooleanChecks([
    {
      key: "mobile",
      area: "responsiveness",
      mode: "human-review",
      label: "Verified at mobile width",
      value: signals.verifiedMobile,
      passSummary: "The page has been verified at mobile width.",
      failSummary: "The page has not passed verification at mobile width.",
      unknownSummary: "Mobile-width verification has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Verify and fix layout issues at approximately 375px width.",
    },
    {
      key: "tablet",
      area: "responsiveness",
      mode: "human-review",
      label: "Verified at tablet width",
      value: signals.verifiedTablet,
      passSummary: "The page has been verified at tablet width.",
      failSummary: "The page has not passed verification at tablet width.",
      unknownSummary: "Tablet-width verification has not been recorded.",
      severityOnFail: "medium",
      recommendedAction: "Verify and fix layout issues at approximately 768px width.",
    },
    {
      key: "desktop",
      area: "responsiveness",
      mode: "human-review",
      label: "Verified at desktop width",
      value: signals.verifiedDesktop,
      passSummary: "The page has been verified at desktop width.",
      failSummary: "The page has not passed verification at desktop width.",
      unknownSummary: "Desktop-width verification has not been recorded.",
      severityOnFail: "medium",
      recommendedAction: "Verify and fix layout issues at approximately 1440px width.",
    },
  ]);
  const listResult = evaluateListChecks([
    {
      key: "layout-issues",
      area: "responsiveness",
      mode: "human-review",
      label: "Layout issues found",
      items: signals.layoutIssues,
      severityOnFail: "medium",
      recommendedAction: "Fix the reported layout issues before requesting approval.",
    },
  ]);
  return {
    findings: [...boolResult.findings, ...listResult.findings],
    score: combineScores([boolResult.score, listResult.score]),
  };
}

function technicalIntegrityChecks(signals: TechnicalIntegrityReviewSignals | undefined) {
  if (!signals) return null;
  const boolResult = evaluateBooleanChecks([
    {
      key: "lint",
      area: "technical-integrity",
      mode: "automated",
      label: "Lint passed",
      value: signals.lintPassed,
      passSummary: "Linting passed with no errors.",
      failSummary: "Linting failed.",
      unknownSummary: "Lint status has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Run the linter and resolve all reported issues.",
      statusOnFail: "blocked",
    },
    {
      key: "build",
      area: "technical-integrity",
      mode: "automated",
      label: "Production build passed",
      value: signals.buildPassed,
      passSummary: "The production build completed successfully.",
      failSummary: "The production build failed.",
      unknownSummary: "Build status has not been recorded.",
      severityOnFail: "critical",
      recommendedAction: "Fix the build failure before proceeding.",
      statusOnFail: "blocked",
    },
  ]);
  const listResult = evaluateListChecks([
    {
      key: "broken-links",
      area: "technical-integrity",
      mode: "automated",
      label: "Broken links",
      items: signals.brokenLinks,
      severityOnFail: "high",
      recommendedAction: "Fix or remove the broken links.",
    },
    {
      key: "missing-assets",
      area: "technical-integrity",
      mode: "automated",
      label: "Missing assets",
      items: signals.missingAssets,
      severityOnFail: "high",
      recommendedAction: "Add the missing assets or remove the references.",
    },
    {
      key: "route-errors",
      area: "technical-integrity",
      mode: "automated",
      label: "Route errors",
      items: signals.routeErrors,
      severityOnFail: "critical",
      recommendedAction: "Fix the reported route errors before proceeding.",
      statusOnFail: "blocked",
    },
  ]);
  return {
    findings: [...boolResult.findings, ...listResult.findings],
    score: combineScores([boolResult.score, listResult.score]),
  };
}

function securityDeploymentChecks(signals: SecurityDeploymentReviewSignals | undefined) {
  if (!signals) return null;
  return evaluateBooleanChecks([
    {
      key: "secrets",
      area: "security-deployment",
      mode: "automated",
      label: "No secrets committed to the repository",
      value: signals.noSecretsInRepo,
      passSummary: "No secrets or credentials were found in the repository.",
      failSummary: "Secrets or credentials were found in the repository.",
      unknownSummary: "The repository has not been scanned for secrets.",
      severityOnFail: "critical",
      recommendedAction: "Remove the secret immediately and rotate the credential.",
      statusOnFail: "blocked",
    },
    {
      key: "forms",
      area: "security-deployment",
      mode: "human-review",
      label: "Forms handle input safely",
      value: signals.formsHandleInputSafely,
      passSummary: "Forms validate and handle input safely.",
      failSummary: "Forms do not safely validate or handle input.",
      unknownSummary: "Form input handling has not been reviewed.",
      severityOnFail: "high",
      recommendedAction: "Add input validation and safe handling to the affected forms.",
    },
    {
      key: "integrations",
      area: "security-deployment",
      mode: "human-review",
      label: "External integrations approved",
      value: signals.externalIntegrationsApproved,
      passSummary: "All external integrations in use have been explicitly approved.",
      failSummary: "An external integration is in use without explicit approval.",
      unknownSummary: "External integration approval has not been confirmed.",
      severityOnFail: "critical",
      recommendedAction: "Remove the integration or obtain explicit approval before proceeding.",
      statusOnFail: "blocked",
    },
    {
      key: "analytics",
      area: "security-deployment",
      mode: "human-review",
      label: "Analytics and tracking approved",
      value: signals.analyticsApproved,
      passSummary: "Analytics and tracking, if present, are explicitly approved.",
      failSummary: "Analytics or tracking is present without explicit approval.",
      unknownSummary: "Analytics and tracking approval has not been confirmed.",
      severityOnFail: "critical",
      recommendedAction: "Remove the analytics or tracking code or obtain explicit approval.",
      statusOnFail: "blocked",
    },
    {
      key: "deployment-approval",
      area: "security-deployment",
      mode: "human-review",
      label: "Deployment approval recorded",
      value: signals.deploymentApprovalRecorded,
      passSummary: "Deployment approval has been recorded.",
      failSummary: "Deployment approval has not been recorded.",
      unknownSummary: "Deployment approval status has not been confirmed.",
      severityOnFail: "high",
      recommendedAction: "Obtain and record explicit deployment approval before launch.",
    },
  ]);
}

function approvalGateChecks(signals: ApprovalGateSignals | undefined) {
  if (!signals) return null;

  const pendingResult = evaluateListChecks([
    {
      key: "pending-approvals",
      area: "approval-gates",
      mode: "human-review",
      label: "Pending approvals",
      items: signals.pendingApprovals,
      severityOnFail: "medium",
      recommendedAction: "Collect the remaining approvals before treating the project as launch-ready.",
      statusOnFail: "warning",
    },
  ]);

  const recordedApprovals = signals.recordedApprovals ?? [];
  const recordedFinding: QaFinding = {
    id: "approval-gates-recorded",
    area: "approval-gates",
    status: "pass",
    severity: "info",
    mode: "human-review",
    summary:
      recordedApprovals.length > 0
        ? `Recorded approvals: ${recordedApprovals.join(", ")}.`
        : "No approvals have been recorded yet.",
    impact: "Informational record for the audit trail.",
    recommendedAction: "No action required.",
    approvalStatus: "not-required",
  };

  return {
    findings: [...pendingResult.findings, recordedFinding],
    score: pendingResult.score,
  };
}

export function evaluateQaReview(context: QaReviewContext): QaReviewReport {
  const projectName = context.projectName ?? "[Project Name]";
  const reviewer = context.reviewer ?? "[Reviewer Name]";
  const reviewedAt = context.reviewedAt ?? "[Review Date]";

  const areaResults: { area: QaArea; source: string; findings: QaFinding[]; score: number }[] = [];

  const contentResult = findingsFromContentEvaluation(context.contentEvaluation);
  if (contentResult) {
    areaResults.push({
      area: "content-quality",
      source: "Content Intelligence Engine (Human Writing Standard evaluation)",
      findings: contentResult.findings,
      score: contentResult.score,
    });
  }

  const seoFindings: QaFinding[] = [];
  const seoScores: number[] = [];
  const seoResult = findingsFromEvaluation("seo", "SEO Intelligence Engine", context.seoEvaluation);
  if (seoResult) {
    seoFindings.push(...seoResult.findings);
    seoScores.push(seoResult.score);
  }
  if (context.seoEvaluation !== undefined || context.indexabilityConfirmed !== undefined) {
    const indexResult = indexabilityCheck(context.indexabilityConfirmed);
    seoFindings.push(...indexResult.findings);
    seoScores.push(indexResult.score);
  }
  if (seoFindings.length > 0) {
    areaResults.push({ area: "seo", source: "SEO Intelligence Engine", findings: seoFindings, score: combineScores(seoScores) });
  }

  const aiResult = findingsFromEvaluation("ai-visibility", "AI Visibility Engine", context.aiVisibilityEvaluation);
  if (aiResult) {
    areaResults.push({ area: "ai-visibility", source: "AI Visibility Engine", findings: aiResult.findings, score: aiResult.score });
  }

  const localSeoResult = findingsFromEvaluation("local-seo", "Local SEO Intelligence Engine", context.localSeoEvaluation);
  if (localSeoResult) {
    areaResults.push({ area: "local-seo", source: "Local SEO Intelligence Engine", findings: localSeoResult.findings, score: localSeoResult.score });
  }

  const blogResult = findingsFromEvaluation("blog", "Blog Intelligence Engine", context.blogEvaluation);
  if (blogResult) {
    areaResults.push({ area: "blog", source: "Blog Intelligence Engine", findings: blogResult.findings, score: blogResult.score });
  }

  const industryResult = findingsFromEvaluation("industry-guidance", "Industry Knowledge Engine", context.industryEvaluation);
  if (industryResult) {
    areaResults.push({ area: "industry-guidance", source: "Industry Knowledge Engine", findings: industryResult.findings, score: industryResult.score });
  }

  const confirmationResult = confirmationChecks(context.confirmationSignals);
  if (confirmationResult) {
    areaResults.push({ area: "confirmation-status", source: "Manual confirmation signals", findings: confirmationResult.findings, score: confirmationResult.score });
  }

  const duplicateResult = duplicateContentChecks(context.duplicateContentSignals);
  if (duplicateResult) {
    areaResults.push({ area: "duplicate-content", source: "Duplicate content signals", findings: duplicateResult.findings, score: duplicateResult.score });
  }

  const designResult = designChecks(context.design);
  if (designResult) {
    areaResults.push({ area: "design", source: "Design review signals", findings: designResult.findings, score: designResult.score });
  }

  const accessibilityResult = accessibilityChecks(context.accessibility);
  if (accessibilityResult) {
    areaResults.push({ area: "accessibility", source: "Accessibility review signals", findings: accessibilityResult.findings, score: accessibilityResult.score });
  }

  const performanceResult = performanceChecks(context.performance);
  if (performanceResult) {
    areaResults.push({ area: "performance", source: "Performance review signals", findings: performanceResult.findings, score: performanceResult.score });
  }

  const responsivenessResult = responsivenessChecks(context.responsiveness);
  if (responsivenessResult) {
    areaResults.push({ area: "responsiveness", source: "Responsiveness review signals", findings: responsivenessResult.findings, score: responsivenessResult.score });
  }

  const technicalResult = technicalIntegrityChecks(context.technicalIntegrity);
  if (technicalResult) {
    areaResults.push({ area: "technical-integrity", source: "Technical integrity signals (lint, build, and link checks)", findings: technicalResult.findings, score: technicalResult.score });
  }

  const securityResult = securityDeploymentChecks(context.securityAndDeployment);
  if (securityResult) {
    areaResults.push({ area: "security-deployment", source: "Security and deployment signals", findings: securityResult.findings, score: securityResult.score });
  }

  const approvalResult = approvalGateChecks(context.approvalGateSignals);
  if (approvalResult) {
    areaResults.push({ area: "approval-gates", source: "Approval gate signals", findings: approvalResult.findings, score: approvalResult.score });
  }

  const findings = areaResults.flatMap((result) => result.findings);
  const areaScores = areaResults.map((result) => ({ area: result.area, score: result.score }));

  const blockingFindings = findings.filter((finding) => finding.status === "blocked");
  const criticalFindings = findings.filter((finding) => finding.severity === "critical");
  const pendingApprovals = findings.filter((finding) => finding.approvalStatus === "pending");

  const rawOverallScore = combineScores(areaScores.map((entry) => entry.score));
  const overallScore = blockingFindings.length > 0 ? Math.min(rawOverallScore, 39) : rawOverallScore;

  const overallStatus: QaStatus =
    blockingFindings.length > 0 ? "blocked" : findings.some((finding) => finding.status !== "pass") ? "warning" : "pass";

  const launchReady = findings.length > 0 && findings.every((finding) => finding.status === "pass");
  const approvalStatus: "ready" | "needs-review" | "blocked" =
    blockingFindings.length > 0 ? "blocked" : launchReady ? "ready" : "needs-review";

  const evidenceLog: QaEvidenceEntry[] = areaResults.map((result) => ({
    area: result.area,
    source: result.source,
    status: result.findings.some((finding) => finding.status === "blocked")
      ? "blocked"
      : result.findings.some((finding) => finding.status !== "pass")
        ? "warning"
        : "pass",
    score: result.score,
    recordedAt: reviewedAt,
  }));

  return {
    projectName,
    reviewer,
    reviewedAt,
    findings: [...findings].sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity)),
    areaScores,
    overallScore,
    overallStatus,
    automatedChecks: findings.filter((finding) => finding.mode === "automated"),
    humanReviewChecks: findings.filter((finding) => finding.mode === "human-review"),
    criticalFindings,
    approvalDecision: {
      launchReady,
      status: approvalStatus,
      blockingFindings,
      pendingApprovals,
      summary: launchReady
        ? "All reviewed areas passed. No material blockers remain."
        : blockingFindings.length > 0
          ? `${blockingFindings.length} blocking issue(s) must be resolved before this project can be considered launch-ready.`
          : "One or more areas require review or approval before this project can be considered launch-ready.",
    },
    evidenceLog,
    approvalGate: [
      "All automated checks reviewed",
      "All human-review checks completed and recorded",
      "No blocking findings remain",
      "Client confirmation recorded for all facts used",
      "Final Reviewer/QA sign-off recorded",
    ],
    extensionPoints: [
      "Prepared for future Client Intake integration",
      "Prepared for future Orchestration coordination",
      "Prepared for future Deployment gate integration",
      "Prepared for future Maintenance re-review cadence",
      "Prepared for the final v1.0 end-to-end testing pass",
    ],
  };
}

export function buildReviewerBlueprint(): ReviewerBlueprint {
  return {
    scope: [
      "Factual accuracy and unsupported claims — reuses the Content Intelligence Engine's Human Writing Standard evaluation.",
      "Client-confirmed versus unconfirmed information — dedicated confirmation-status signals.",
      "Brand voice and Human Writing Standard compliance — reuses the Content Intelligence Engine.",
      "Content quality and readability — reuses the Content Intelligence Engine.",
      "Duplicate content and cannibalization — dedicated duplicate-content signals.",
      "SEO metadata, headings, canonicals, internal links, schema, and indexability — reuses the SEO Intelligence Engine plus an indexability check.",
      "AI visibility, entity clarity, direct-answer structure, evidence, and freshness — reuses the AI Visibility Engine.",
      "Local SEO, NAP consistency, service areas, location pages, GBP-related facts, and local schema — reuses the Local SEO Intelligence Engine.",
      "Blog quality, topic overlap, internal linking, and freshness — reuses the Blog Intelligence Engine.",
      "Industry guidance confirmation — reuses the Industry Knowledge Engine.",
      "Design consistency, typography, spacing, hierarchy, CTAs, trust elements, and uniqueness — dedicated design signals.",
      "Accessibility: semantic HTML, keyboard use, labels, contrast, and reduced motion — dedicated accessibility signals.",
      "Performance risks, unnecessary JavaScript, image handling, and Core Web Vitals — dedicated performance signals.",
      "Mobile, tablet, and desktop responsiveness — dedicated responsiveness signals.",
      "Broken links, missing assets, route errors, and build failures — dedicated technical-integrity signals.",
      "Security, secrets, forms, external integrations, and deployment readiness — dedicated security-and-deployment signals.",
      "Approval-dependent actions and unresolved blockers — dedicated approval-gate signals.",
    ],
    automatedCheckAreas: [
      "factual-accuracy",
      "brand-voice",
      "content-quality",
      "seo",
      "ai-visibility",
      "local-seo",
      "blog",
      "industry-guidance",
      "technical-integrity",
      "performance",
    ],
    humanReviewAreas: [
      "confirmation-status",
      "duplicate-content",
      "design",
      "accessibility",
      "responsiveness",
      "security-deployment",
      "approval-gates",
    ],
    reviewChecklist: [
      "Confirm every area's underlying engine evaluation or signal input is present before treating the review as complete.",
      "Treat any unset or unknown signal as a pending human-review item, never as an automatic pass.",
      "Resolve every blocking finding before recording a launch-ready decision.",
      "Record the reviewer, review date, and evidence log for future audits.",
      "Re-run the review whenever the underlying content, design, or code changes materially.",
    ],
    approvalGate: [
      "All automated checks reviewed",
      "All human-review checks completed and recorded",
      "No blocking findings remain",
      "Client confirmation recorded for all facts used",
      "Final Reviewer/QA sign-off recorded",
    ],
    extensionPoints: [
      "Prepared for future Client Intake integration",
      "Prepared for future Orchestration coordination",
      "Prepared for future Deployment gate integration",
      "Prepared for future Maintenance re-review cadence",
      "Prepared for the final v1.0 end-to-end testing pass",
    ],
  };
}
