import type { QaArea, QaSeverity, QaFinding, QaEvidenceEntry, QaReviewReport } from "@/lib/reviewer";
import type { PermissionsAndApprovals } from "@/lib/client-intake";
import { cloudflareConfig } from "@/lib/cloudflare/manifest";

export type DeploymentEnvironment = "local" | "preview" | "production";
export type DeploymentProvider = "cloudflare-pages" | "vercel" | "other";

/**
 * Names only, never values. There is deliberately no `value` field anywhere in
 * this module. Secret values belong only in the hosting provider's encrypted
 * environment variable store.
 */
export interface EnvironmentVariableSignals {
  requiredKeys?: string[];
  configuredKeys?: string[];
}

export interface RedirectsAndCanonicalSignals {
  redirectsValidated?: boolean;
  canonicalHostConfirmed?: boolean;
  brokenRedirects?: string[];
}

export interface RobotsAndSitemapSignals {
  robotsConfigured?: boolean;
  sitemapConfigured?: boolean;
  nonProductionNoindexConfirmed?: boolean;
}

export interface DomainAndDnsSignals {
  customDomainConfirmed?: boolean;
  dnsRecordsPlanned?: boolean;
  sslConfirmed?: boolean;
}

export interface AnalyticsInstallationSignals {
  platformsToInstall?: string[];
  installationApproved?: boolean;
}

export interface BackupAndVersionSignals {
  versionTag?: string;
  previousVersionTag?: string;
  backupRecorded?: boolean;
  rollbackTested?: boolean;
}

export interface HandoffSignals {
  handoffRequested?: boolean;
  whiteLabel?: boolean;
  siteLabBrandingRemoved?: boolean;
  internalAgencyFilesExcluded?: boolean;
  clientOwnsRepository?: boolean;
}

export interface MaintenanceModeSignals {
  enabled?: boolean;
  reason?: string;
}

export interface PostLaunchVerificationSignals {
  smokeTestPassed?: boolean;
  brokenLinksChecked?: boolean;
  formsTested?: boolean;
}

export interface PortabilitySignals {
  transferRequested?: boolean;
  sourceAccount?: string;
  targetAccount?: string;
  transferApproved?: boolean;
}

export interface DeploymentContext {
  projectName?: string;
  deploymentId?: string;
  reviewer?: string;
  evaluatedAt?: string;
  environment: DeploymentEnvironment;
  provider?: DeploymentProvider;

  qaReport?: QaReviewReport;
  permissions?: PermissionsAndApprovals;

  environmentVariables?: EnvironmentVariableSignals;
  redirectsAndCanonical?: RedirectsAndCanonicalSignals;
  robotsAndSitemap?: RobotsAndSitemapSignals;
  domainAndDns?: DomainAndDnsSignals;
  analytics?: AnalyticsInstallationSignals;
  backupsAndVersionHistory?: BackupAndVersionSignals;
  handoff?: HandoffSignals;
  maintenanceMode?: MaintenanceModeSignals;
  postLaunchVerification?: PostLaunchVerificationSignals;
  portability?: PortabilitySignals;
}

/**
 * The actual internal SiteLab system files that must never ship in a client
 * handoff or white-label delivery.
 */
export const HANDOFF_EXCLUDED_PATHS = [
  ".claude/",
  "docs/SiteLab-OS-Blueprint.md",
  "docs/Client-Intelligence-Engine.md",
  "docs/Design-Intelligence-Engine.md",
  "docs/Content-Intelligence-Engine.md",
  "docs/SEO-Intelligence-Engine.md",
  "docs/AI-Visibility-Engine.md",
  "docs/Local-SEO-Intelligence-Engine.md",
  "docs/Blog-Intelligence-Engine.md",
  "docs/Industry-Knowledge-Engine.md",
  "docs/Reviewer-QA-Engine.md",
  "docs/Client-Intake-Engine.md",
  "docs/Deployment-Publishing-Engine.md",
  "docs/Human-Writing-Standard.md",
  "src/lib/reviewer/",
  "src/lib/client-intake/",
  "src/lib/industry-knowledge/",
  "src/lib/deployment/",
  "src/app/ai-visibility-demo/",
  "src/app/blog-intelligence-demo/",
  "src/app/client-intake-demo/",
  "src/app/content-intelligence-demo/",
  "src/app/deployment-demo/",
  "src/app/industry-knowledge-demo/",
  "src/app/local-seo-demo/",
  "src/app/reviewer-demo/",
  "src/app/seo-intelligence-demo/",
] as const;

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
    impact:
      status === "fail"
        ? "This is a material gap and must be resolved before this deployment can be considered ready."
        : "This is a non-material gap. It does not block readiness, but should be resolved when convenient.",
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
    impact: "This is a hard stop and must be resolved before this deployment can proceed.",
    recommendedAction,
    approvalStatus: "pending",
  };
}

interface BooleanCheckSpec {
  id: string;
  area: QaArea;
  label: string;
  value: boolean | undefined;
  required: boolean;
  passSummary: string;
  failSummary: string;
  unknownSummary: string;
  severityOnFail: QaSeverity;
  recommendedAction: string;
  blockOnFail?: boolean;
}

function evaluateBooleanSignal(spec: BooleanCheckSpec): QaFinding {
  if (spec.value === true) {
    return passFinding(spec.id, spec.area, spec.passSummary);
  }
  if (spec.value === false) {
    if (spec.blockOnFail) {
      return blockedFinding(spec.id, spec.area, spec.failSummary, spec.recommendedAction);
    }
    return gapFinding(spec.id, spec.area, spec.failSummary, spec.required ? "fail" : "warning", spec.severityOnFail, spec.recommendedAction);
  }
  return gapFinding(spec.id, spec.area, spec.unknownSummary, spec.required ? "fail" : "warning", spec.required ? spec.severityOnFail : "low", spec.recommendedAction);
}

function scoreForFindings(findings: QaFinding[]): number {
  let penalty = 0;
  for (const finding of findings) {
    if (finding.status === "blocked") penalty += 35;
    else if (finding.status === "fail") penalty += 20;
    else if (finding.status === "warning") penalty += 8;
  }
  return Math.max(20, 100 - penalty);
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

/** A conservative heuristic: flags anything shaped like a real secret rather than a variable name. */
function looksLikeSecretValue(key: string): boolean {
  const trimmed = key.trim();
  if (trimmed.length > 24) return true;
  if (/\s/.test(trimmed)) return true;
  if (/^(sk|pk|ghp|xox|AIza|eyJ)[_-]?/i.test(trimmed)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Section evaluators
// ---------------------------------------------------------------------------

function qaGateFindings(environment: DeploymentEnvironment, qaReport: QaReviewReport | undefined): QaFinding[] {
  if (environment === "local") {
    return [passFinding("deploy-qa-gate.local", "deploy-qa-gate", "Local development does not require a Reviewer/QA pass.")];
  }

  if (!qaReport) {
    const required = environment === "production";
    return [
      gapFinding(
        "deploy-qa-gate.missing",
        "deploy-qa-gate",
        `No Reviewer/QA report has been supplied for this ${environment} deployment.`,
        required ? "fail" : "warning",
        required ? "high" : "low",
        environment === "production"
          ? "Run the Reviewer/QA Engine and supply a passing report before deploying to production."
          : "Running the Reviewer/QA Engine before a preview deployment is recommended but not required.",
      ),
    ];
  }

  if (environment === "production") {
    if (!qaReport.approvalDecision.launchReady) {
      return [
        blockedFinding(
          "deploy-qa-gate.not-passing",
          "deploy-qa-gate",
          `The Reviewer/QA report is not passing (status: ${qaReport.overallStatus}, ${qaReport.approvalDecision.blockingFindings.length} blocking finding(s)). Production deployment requires a passing Reviewer/QA decision.`,
          "Resolve the Reviewer/QA blocking findings and re-run the review before deploying to production.",
        ),
      ];
    }
    return [passFinding("deploy-qa-gate.passing", "deploy-qa-gate", "The Reviewer/QA report is passing and launch-ready.")];
  }

  if (!qaReport.approvalDecision.launchReady) {
    return [
      gapFinding(
        "deploy-qa-gate.preview-warning",
        "deploy-qa-gate",
        `The Reviewer/QA report is not yet passing (status: ${qaReport.overallStatus}). Preview deployments may proceed for review, but this must be resolved before production.`,
        "warning",
        "low",
        "Share the preview for review, and resolve the Reviewer/QA findings before promoting to production.",
      ),
    ];
  }
  return [passFinding("deploy-qa-gate.preview-passing", "deploy-qa-gate", "The Reviewer/QA report is passing.")];
}

const PERMISSION_LABELS: Record<keyof PermissionsAndApprovals, string> = {
  publishingApproved: "Publishing approval",
  deploymentApproved: "Deployment approval",
  dnsChangesApproved: "DNS changes approval",
  analyticsInstallApproved: "Analytics installation approval",
  externalServiceConnectionsApproved: "External service connections approval",
};

function permissionFindings(
  environment: DeploymentEnvironment,
  permissions: PermissionsAndApprovals | undefined,
  applicability: Record<keyof PermissionsAndApprovals, boolean>,
): QaFinding[] {
  if (environment === "local") {
    return [passFinding("deploy-permissions.local", "deploy-permissions", "Local development does not require publishing or deployment permissions.")];
  }

  const keys = Object.keys(PERMISSION_LABELS) as (keyof PermissionsAndApprovals)[];
  const findings: QaFinding[] = [];

  for (const key of keys) {
    if (!applicability[key]) continue;
    const field = permissions?.[key];
    const id = `deploy-permissions.${key}`;
    const label = PERMISSION_LABELS[key];

    if (field?.source === "client-confirmed" && field.value === true) {
      findings.push(passFinding(id, "deploy-permissions", `${label} is confirmed for this deployment.`));
      continue;
    }
    if (field?.source === "client-confirmed" && field.value === false) {
      findings.push(
        blockedFinding(
          id,
          "deploy-permissions",
          `${label} has been explicitly withheld by the client. Deploying anyway would violate that decision.`,
          `Do not proceed until the client changes ${label.toLowerCase()} to approved.`,
        ),
      );
      continue;
    }
    const required = environment === "production";
    findings.push(
      gapFinding(
        id,
        "deploy-permissions",
        `${label} has not been confirmed by the client.`,
        required ? "fail" : "warning",
        required ? "high" : "low",
        `Confirm ${label.toLowerCase()} with the client before this deployment proceeds.`,
      ),
    );
  }

  if (findings.length === 0) {
    findings.push(passFinding("deploy-permissions.none-applicable", "deploy-permissions", "No permission-gated actions apply to this deployment."));
  }

  return findings;
}

function environmentVariableFindings(environment: DeploymentEnvironment, signals: EnvironmentVariableSignals | undefined): QaFinding[] {
  const findings: QaFinding[] = [];
  const configured = signals?.configuredKeys ?? [];
  const required = signals?.requiredKeys ?? [];

  for (const key of configured) {
    if (looksLikeSecretValue(key)) {
      findings.push(
        blockedFinding(
          `deploy-environment-variables.secret-shaped.${key}`,
          "deploy-environment-variables",
          `"${key}" is recorded as a variable name but looks like a secret value, not a name.`,
          "Remove this immediately. Never commit or record secret values — store them only in the hosting provider's encrypted environment variable store, and record the variable name only.",
        ),
      );
    }
  }

  if (signals === undefined) {
    findings.push(
      gapFinding(
        "deploy-environment-variables.undocumented",
        "deploy-environment-variables",
        "Environment variable requirements have not been documented for this deployment.",
        environment === "production" ? "fail" : "warning",
        environment === "production" ? "medium" : "low",
        "Document the required environment variable names for this environment.",
      ),
    );
    return findings;
  }

  const missing = required.filter((key) => !configured.includes(key));
  if (missing.length > 0) {
    findings.push(
      gapFinding(
        "deploy-environment-variables.missing",
        "deploy-environment-variables",
        `Required environment variables are not yet configured: ${missing.join(", ")}.`,
        environment === "production" ? "fail" : "warning",
        environment === "production" ? "high" : "medium",
        "Configure the missing environment variables in the hosting provider's dashboard before deploying.",
      ),
    );
  } else if (required.length > 0) {
    findings.push(passFinding("deploy-environment-variables.satisfied", "deploy-environment-variables", `All required environment variables are configured: ${required.join(", ")}.`));
  }

  if (findings.length === 0) {
    findings.push(passFinding("deploy-environment-variables.none-required", "deploy-environment-variables", "No environment variables are required for this deployment."));
  }

  return findings;
}

function redirectsFindings(environment: DeploymentEnvironment, signals: RedirectsAndCanonicalSignals | undefined): QaFinding[] {
  if (environment === "local") {
    return [passFinding("deploy-redirects-canonical.local", "deploy-redirects-canonical", "Redirect and canonical validation is not applicable to local development.")];
  }
  const required = environment === "production";
  const findings: QaFinding[] = [
    evaluateBooleanSignal({
      id: "deploy-redirects-canonical.redirects-validated",
      area: "deploy-redirects-canonical",
      label: "Redirects validated",
      value: signals?.redirectsValidated,
      required,
      passSummary: "Redirects have been validated for this deployment.",
      failSummary: "Redirects have not been validated.",
      unknownSummary: "Redirect validation has not been recorded.",
      severityOnFail: "medium",
      recommendedAction: "Validate all configured redirects resolve correctly before deploying.",
    }),
    evaluateBooleanSignal({
      id: "deploy-redirects-canonical.canonical-host",
      area: "deploy-redirects-canonical",
      label: "Canonical host confirmed",
      value: signals?.canonicalHostConfirmed,
      required,
      passSummary: "The canonical host for this deployment has been confirmed.",
      failSummary: "The canonical host has not been confirmed.",
      unknownSummary: "Canonical host confirmation has not been recorded.",
      severityOnFail: "medium",
      recommendedAction: "Confirm the single canonical host (with or without www, and the correct scheme) before deploying.",
    }),
  ];

  const broken = signals?.brokenRedirects ?? [];
  if (broken.length > 0) {
    findings.push(
      blockedFinding(
        "deploy-redirects-canonical.broken",
        "deploy-redirects-canonical",
        `Broken redirects were found: ${broken.join(", ")}.`,
        "Fix or remove the broken redirects before deploying.",
      ),
    );
  }

  return findings;
}

function robotsAndSitemapFindings(environment: DeploymentEnvironment, signals: RobotsAndSitemapSignals | undefined): QaFinding[] {
  if (environment === "local") {
    return [passFinding("deploy-robots-sitemap.local", "deploy-robots-sitemap", "Robots and sitemap readiness is not applicable to local development.")];
  }

  if (environment === "preview") {
    return [
      evaluateBooleanSignal({
        id: "deploy-robots-sitemap.preview-noindex",
        area: "deploy-robots-sitemap",
        label: "Preview noindex",
        value: signals?.nonProductionNoindexConfirmed,
        required: true,
        passSummary: "The preview environment is confirmed to block search engine indexing.",
        failSummary: "The preview environment is not confirmed to be noindexed.",
        unknownSummary: "Preview noindex status has not been confirmed.",
        severityOnFail: "high",
        recommendedAction: "Apply a noindex directive to the preview environment before sharing the link.",
      }),
    ];
  }

  return [
    evaluateBooleanSignal({
      id: "deploy-robots-sitemap.robots",
      area: "deploy-robots-sitemap",
      label: "robots.txt configured",
      value: signals?.robotsConfigured,
      required: true,
      passSummary: "robots.txt is configured for production indexing.",
      failSummary: "robots.txt has not been confirmed for production.",
      unknownSummary: "robots.txt readiness has not been confirmed.",
      severityOnFail: "medium",
      recommendedAction: "Confirm robots.txt reflects the live production site structure.",
    }),
    evaluateBooleanSignal({
      id: "deploy-robots-sitemap.sitemap",
      area: "deploy-robots-sitemap",
      label: "Sitemap configured",
      value: signals?.sitemapConfigured,
      required: true,
      passSummary: "The sitemap is configured for production.",
      failSummary: "The sitemap has not been confirmed for production.",
      unknownSummary: "Sitemap readiness has not been confirmed.",
      severityOnFail: "medium",
      recommendedAction: "Confirm the sitemap reflects the live production site structure.",
    }),
  ];
}

function domainAndDnsFindings(environment: DeploymentEnvironment, signals: DomainAndDnsSignals | undefined, dnsChangeIntended: boolean): QaFinding[] {
  if (environment !== "production" || !dnsChangeIntended) {
    return [
      passFinding(
        "deploy-domain-dns.not-applicable",
        "deploy-domain-dns",
        "No custom domain or DNS change is intended for this deployment; the default provider subdomain will be used.",
      ),
    ];
  }

  return [
    evaluateBooleanSignal({
      id: "deploy-domain-dns.custom-domain",
      area: "deploy-domain-dns",
      label: "Custom domain confirmed",
      value: signals?.customDomainConfirmed,
      required: true,
      passSummary: "The custom domain for production has been confirmed.",
      failSummary: "The custom domain has not been confirmed.",
      unknownSummary: "Custom domain confirmation has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Confirm the exact custom domain with the client before making DNS changes.",
    }),
    evaluateBooleanSignal({
      id: "deploy-domain-dns.records-planned",
      area: "deploy-domain-dns",
      label: "DNS records planned",
      value: signals?.dnsRecordsPlanned,
      required: true,
      passSummary: "The required DNS records have been planned.",
      failSummary: "The required DNS records have not been planned.",
      unknownSummary: "DNS record planning has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Document the exact DNS records to add or change before making any DNS change.",
    }),
    evaluateBooleanSignal({
      id: "deploy-domain-dns.ssl",
      area: "deploy-domain-dns",
      label: "SSL confirmed",
      value: signals?.sslConfirmed,
      required: true,
      passSummary: "SSL/TLS for the custom domain has been confirmed.",
      failSummary: "SSL/TLS for the custom domain has not been confirmed.",
      unknownSummary: "SSL/TLS confirmation has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Confirm SSL/TLS will be active for the custom domain before cutting over DNS.",
    }),
  ];
}

function analyticsFindings(environment: DeploymentEnvironment, signals: AnalyticsInstallationSignals | undefined): QaFinding[] {
  const platforms = signals?.platformsToInstall ?? [];
  if (platforms.length === 0) {
    return [passFinding("deploy-analytics.none", "deploy-analytics", "No analytics or tracking platforms are planned for this deployment.")];
  }

  if (signals?.installationApproved === true) {
    return [passFinding("deploy-analytics.approved", "deploy-analytics", `Analytics installation is approved for this deployment: ${platforms.join(", ")}.`)];
  }
  if (signals?.installationApproved === false) {
    return [
      blockedFinding(
        "deploy-analytics.denied",
        "deploy-analytics",
        `Analytics platforms are listed (${platforms.join(", ")}) but installation has been explicitly not approved for this deployment.`,
        "Remove the analytics installation from this deployment, or obtain explicit approval first.",
      ),
    ];
  }
  return [
    gapFinding(
      "deploy-analytics.unconfirmed",
      "deploy-analytics",
      `Analytics platforms are listed (${platforms.join(", ")}) but installation approval for this specific deployment has not been confirmed.`,
      environment === "production" ? "fail" : "warning",
      environment === "production" ? "high" : "medium",
      "Confirm analytics installation is approved for this deployment before proceeding.",
    ),
  ];
}

function backupFindings(environment: DeploymentEnvironment, signals: BackupAndVersionSignals | undefined): QaFinding[] {
  if (environment !== "production") {
    return [passFinding("deploy-backups.not-applicable", "deploy-backups", "Backup and version history tracking applies at production deployment.")];
  }

  return [
    signals?.versionTag
      ? passFinding("deploy-backups.version-tag", "deploy-backups", `This deployment is tagged as ${signals.versionTag}.`)
      : gapFinding(
          "deploy-backups.version-tag",
          "deploy-backups",
          "This deployment has not been tagged with a version.",
          "fail",
          "medium",
          "Tag this deployment with a version identifier before deploying to production.",
        ),
    evaluateBooleanSignal({
      id: "deploy-backups.recorded",
      area: "deploy-backups",
      label: "Backup recorded",
      value: signals?.backupRecorded,
      required: true,
      passSummary: "A backup or restore point has been recorded before this deployment.",
      failSummary: "No backup or restore point has been recorded.",
      unknownSummary: "Backup status has not been recorded.",
      severityOnFail: "high",
      recommendedAction: "Record a backup or restore point before deploying to production.",
    }),
    evaluateBooleanSignal({
      id: "deploy-backups.rollback-tested",
      area: "deploy-backups",
      label: "Rollback tested",
      value: signals?.rollbackTested,
      required: false,
      passSummary: "The rollback path has been tested.",
      failSummary: "The rollback path has not been tested.",
      unknownSummary: "Rollback testing has not been recorded.",
      severityOnFail: "low",
      recommendedAction: "Test the rollback path so it is proven, not just planned.",
    }),
  ];
}

function handoffFindings(signals: HandoffSignals | undefined): QaFinding[] {
  if (!signals?.handoffRequested) {
    return [passFinding("deploy-handoff.not-requested", "deploy-handoff", "Client handoff has not been requested for this deployment.")];
  }

  return [
    evaluateBooleanSignal({
      id: "deploy-handoff.branding-removed",
      area: "deploy-handoff",
      label: "SiteLab branding removed",
      value: signals.siteLabBrandingRemoved,
      required: true,
      passSummary: "SiteLab branding has been removed from the handed-off project.",
      failSummary: "SiteLab branding has not been confirmed removed.",
      unknownSummary: "SiteLab branding removal has not been confirmed.",
      severityOnFail: "high",
      recommendedAction: "Remove all SiteLab branding before handing the project to the client.",
    }),
    evaluateBooleanSignal({
      id: "deploy-handoff.internal-files-excluded",
      area: "deploy-handoff",
      label: "Internal agency files excluded",
      value: signals.internalAgencyFilesExcluded,
      required: true,
      passSummary: "Internal agency files have been excluded from the handoff.",
      failSummary: "Internal agency files have not been confirmed excluded from the handoff.",
      unknownSummary: "Internal agency file exclusion has not been confirmed.",
      severityOnFail: "critical",
      recommendedAction: `Exclude the internal SiteLab files listed in HANDOFF_EXCLUDED_PATHS before handoff (for example: ${HANDOFF_EXCLUDED_PATHS.slice(0, 3).join(", ")}, and the rest of that list).`,
      blockOnFail: true,
    }),
    evaluateBooleanSignal({
      id: "deploy-handoff.client-owns-repo",
      area: "deploy-handoff",
      label: "Client owns repository",
      value: signals.clientOwnsRepository,
      required: true,
      passSummary: "Repository ownership has been transferred to the client.",
      failSummary: "Repository ownership has not been confirmed transferred.",
      unknownSummary: "Repository ownership transfer has not been confirmed.",
      severityOnFail: "medium",
      recommendedAction: "Transfer or confirm repository ownership as part of handoff.",
    }),
  ];
}

function maintenanceModeFindings(signals: MaintenanceModeSignals | undefined): QaFinding[] {
  if (!signals?.enabled) {
    return [passFinding("deploy-maintenance-mode.disabled", "deploy-maintenance-mode", "Maintenance mode is not enabled for this deployment.")];
  }
  if (signals.reason && signals.reason.trim().length > 0) {
    return [passFinding("deploy-maintenance-mode.documented", "deploy-maintenance-mode", `Maintenance mode is enabled with a documented reason: ${signals.reason}.`)];
  }
  return [
    gapFinding(
      "deploy-maintenance-mode.undocumented",
      "deploy-maintenance-mode",
      "Maintenance mode is enabled but no reason has been documented.",
      "warning",
      "low",
      "Document why maintenance mode is enabled and when it is expected to be lifted.",
    ),
  ];
}

function postLaunchFindings(signals: PostLaunchVerificationSignals | undefined): QaFinding[] {
  const checks: { key: keyof PostLaunchVerificationSignals; label: string }[] = [
    { key: "smokeTestPassed", label: "Smoke test" },
    { key: "brokenLinksChecked", label: "Broken link check" },
    { key: "formsTested", label: "Form testing" },
  ];

  return checks.map(({ key, label }) =>
    evaluateBooleanSignal({
      id: `deploy-post-launch.${key}`,
      area: "deploy-post-launch",
      label,
      value: signals?.[key],
      required: false,
      passSummary: `${label} passed after deployment.`,
      failSummary: `${label} did not pass after deployment.`,
      unknownSummary: `${label} has not been recorded yet.`,
      severityOnFail: "medium",
      recommendedAction: `Run and record ${label.toLowerCase()} after this deployment goes live.`,
    }),
  );
}

function portabilityFindings(signals: PortabilitySignals | undefined): QaFinding[] {
  if (!signals?.transferRequested) {
    return [passFinding("deploy-portability.not-requested", "deploy-portability", "No account transfer or project move has been requested.")];
  }

  const findings: QaFinding[] = [
    signals.sourceAccount
      ? passFinding("deploy-portability.source", "deploy-portability", `Source account confirmed: ${signals.sourceAccount}.`)
      : gapFinding("deploy-portability.source", "deploy-portability", "The source account has not been recorded.", "fail", "medium", "Record the source account before transferring this project."),
    signals.targetAccount
      ? passFinding("deploy-portability.target", "deploy-portability", `Target account confirmed: ${signals.targetAccount}.`)
      : gapFinding("deploy-portability.target", "deploy-portability", "The target account has not been recorded.", "fail", "medium", "Record the target account before transferring this project."),
  ];

  if (signals.transferApproved === true) {
    findings.push(passFinding("deploy-portability.approved", "deploy-portability", "The account transfer has been explicitly approved."));
  } else if (signals.transferApproved === false) {
    findings.push(
      blockedFinding(
        "deploy-portability.denied",
        "deploy-portability",
        "An account transfer was requested but has been explicitly not approved.",
        "Do not move this project between accounts until it is explicitly approved.",
      ),
    );
  } else {
    findings.push(
      gapFinding(
        "deploy-portability.unconfirmed",
        "deploy-portability",
        "The account transfer has not been explicitly approved.",
        "fail",
        "high",
        "Obtain explicit approval before moving this project between agency and client accounts.",
      ),
    );
  }

  return findings;
}

// ---------------------------------------------------------------------------
// Dry-run deployment and rollback plans
// ---------------------------------------------------------------------------

export interface DeploymentPlanStep {
  order: number;
  action: string;
  environment: DeploymentEnvironment;
  requiresApproval: boolean;
  notes?: string;
}

export interface DeploymentPlan {
  environment: DeploymentEnvironment;
  provider: DeploymentProvider;
  dryRun: true;
  steps: DeploymentPlanStep[];
  extensionNotes: string[];
}

export function buildDeploymentPlan(context: DeploymentContext): DeploymentPlan {
  const environment = context.environment;
  const provider = context.provider ?? "cloudflare-pages";
  const steps: DeploymentPlanStep[] = [];
  let order = 1;

  const push = (action: string, requiresApproval: boolean, notes?: string) => {
    steps.push({ order: order++, action, environment, requiresApproval, notes });
  };

  if (environment === "local") {
    push("Install dependencies (npm install).", false);
    push("Run the local development server (npm run dev).", false);
    push("Verify the site at http://localhost:3000.", false);
  } else if (environment === "preview") {
    push("Run npm run lint and resolve any issues.", false);
    push(`Run the configured build command (${cloudflareConfig.buildCommand}) to verify the production build succeeds.`, false);
    push("Confirm the Reviewer/QA Engine report for this environment.", false);
    push("Confirm preview deployment is explicitly approved.", true);
    push(`Deploy the build output (${cloudflareConfig.outputDirectory}) to a ${provider} preview environment.`, false);
    push("Confirm the preview URL is set to noindex so it is not publicly discoverable by search engines.", false);
    push("Share the preview link for client or internal review.", false);
  } else {
    push("Run npm run lint and resolve any issues.", false);
    push(`Run the configured build command (${cloudflareConfig.buildCommand}) to verify the production build succeeds.`, false);
    push("Confirm the Reviewer/QA Engine report is passing for production.", true);
    push("Confirm all applicable client permissions (publishing, deployment, DNS if applicable, analytics if applicable, external services).", true);
    push("Tag this deployment with a version identifier and record a backup or restore point.", false);
    push(`Deploy the build output (${cloudflareConfig.outputDirectory}) to the ${provider} production environment.`, true);
    push(
      `Apply DNS changes for the custom domain, following the routes already declared in the Cloudflare manifest (${cloudflareConfig.routes.map((route) => route.pattern).join(", ")}), only if approved.`,
      true,
    );
    push("Install analytics or tracking only if explicitly approved.", true);
    push("Verify robots.txt and the sitemap are configured for production indexing.", false);
    push("Run post-launch verification (smoke test, broken-link check, form test) and record the results.", false);
    push("Record this deployment in the evidence log for future audits.", false);

    if (context.handoff?.handoffRequested) {
      push("Prepare the client handoff package, excluding all internal SiteLab and agency files.", true, `Excluded paths: ${HANDOFF_EXCLUDED_PATHS.join(", ")}`);
    }
  }

  return {
    environment,
    provider,
    dryRun: true,
    steps,
    extensionNotes: [
      "Cloudflare Pages is the default and only implemented provider.",
      "Vercel and other providers are declared as extension points and are not implemented by this engine.",
      "This plan is descriptive only. Nothing in this module performs a network call, shell command, or file write.",
    ],
  };
}

export interface RollbackPlan {
  environment: DeploymentEnvironment;
  steps: string[];
  requiresApproval: boolean;
}

export function buildRollbackPlan(context: DeploymentContext): RollbackPlan {
  const environment = context.environment;

  if (environment === "local") {
    return {
      environment,
      steps: ["Discard local changes or check out the previous commit. No rollback approval is required for local development."],
      requiresApproval: false,
    };
  }

  const steps = ["Identify the last known-good version tag from the backup and version history record.", `Redeploy that previous version to the same ${environment} environment.`];

  if (environment === "production") {
    steps.push(
      "If DNS changes were made as part of this deployment, revert them to the previous known-good configuration.",
      "If analytics, tracking, or external services were newly connected as part of this deployment, disable or disconnect them.",
      "Notify the client and record the rollback in the deployment evidence log.",
      "Run a fresh Reviewer/QA pass and confirm it is passing before considering the environment stable again.",
    );
  } else {
    steps.push("Record the rollback in the deployment evidence log.");
  }

  return {
    environment,
    steps,
    requiresApproval: environment === "production",
  };
}

// ---------------------------------------------------------------------------
// Main evaluation
// ---------------------------------------------------------------------------

export interface DeploymentReadinessReport {
  projectName: string;
  deploymentId: string;
  reviewer: string;
  evaluatedAt: string;
  environment: DeploymentEnvironment;
  provider: DeploymentProvider;
  findings: QaFinding[];
  areaScores: { area: QaArea; score: number }[];
  overallScore: number;
  readinessDecision: {
    deploymentReady: boolean;
    status: "ready" | "needs-review" | "blocked";
    blockingFindings: QaFinding[];
    materialGaps: QaFinding[];
    summary: string;
  };
  deploymentPlan: DeploymentPlan;
  rollbackPlan: RollbackPlan;
  evidenceLog: QaEvidenceEntry[];
  approvalGate: string[];
  extensionPoints: string[];
}

export function evaluateDeploymentReadiness(context: DeploymentContext): DeploymentReadinessReport {
  const projectName = context.projectName ?? "[Project Name]";
  const deploymentId = context.deploymentId ?? "[Deployment ID]";
  const reviewer = context.reviewer ?? "[Reviewer Name]";
  const evaluatedAt = context.evaluatedAt ?? "[Evaluation Date]";
  const environment = context.environment;
  const provider = context.provider ?? "cloudflare-pages";

  const dnsChangeIntended =
    environment === "production" &&
    Boolean(
      context.domainAndDns &&
        (context.domainAndDns.customDomainConfirmed !== undefined || context.domainAndDns.dnsRecordsPlanned !== undefined || context.domainAndDns.sslConfirmed !== undefined),
    );

  const applicability: Record<keyof PermissionsAndApprovals, boolean> = {
    publishingApproved: environment === "production",
    deploymentApproved: environment === "preview" || environment === "production",
    dnsChangesApproved: dnsChangeIntended,
    analyticsInstallApproved: Boolean(context.analytics?.platformsToInstall && context.analytics.platformsToInstall.length > 0),
    externalServiceConnectionsApproved: environment === "production",
  };

  const sections: { area: QaArea; source: string; findings: QaFinding[] }[] = [
    { area: "deploy-qa-gate", source: "Reviewer/QA Engine report", findings: qaGateFindings(environment, context.qaReport) },
    { area: "deploy-permissions", source: "Client Intake Engine permissions", findings: permissionFindings(environment, context.permissions, applicability) },
    { area: "deploy-environment-variables", source: "Environment variable signals", findings: environmentVariableFindings(environment, context.environmentVariables) },
    { area: "deploy-redirects-canonical", source: "Redirect and canonical signals", findings: redirectsFindings(environment, context.redirectsAndCanonical) },
    { area: "deploy-robots-sitemap", source: "Robots and sitemap signals", findings: robotsAndSitemapFindings(environment, context.robotsAndSitemap) },
    { area: "deploy-domain-dns", source: "Domain and DNS signals", findings: domainAndDnsFindings(environment, context.domainAndDns, dnsChangeIntended) },
    { area: "deploy-analytics", source: "Analytics installation signals", findings: analyticsFindings(environment, context.analytics) },
    { area: "deploy-backups", source: "Backup and version history signals", findings: backupFindings(environment, context.backupsAndVersionHistory) },
    { area: "deploy-handoff", source: "Client handoff signals", findings: handoffFindings(context.handoff) },
    { area: "deploy-maintenance-mode", source: "Maintenance mode signals", findings: maintenanceModeFindings(context.maintenanceMode) },
    { area: "deploy-post-launch", source: "Post-launch verification signals", findings: postLaunchFindings(context.postLaunchVerification) },
    { area: "deploy-portability", source: "Portability signals", findings: portabilityFindings(context.portability) },
  ];

  const findings = sections.flatMap((s) => s.findings);
  const areaScores = sections.map((s) => ({ area: s.area, score: scoreForFindings(s.findings) }));

  const blockingFindings = findings.filter((f) => f.status === "blocked");
  const materialGaps = findings.filter((f) => f.status === "fail");

  const rawOverallScore = Math.round(areaScores.reduce((sum, entry) => sum + entry.score, 0) / Math.max(areaScores.length, 1));
  const overallScore = blockingFindings.length > 0 ? Math.min(rawOverallScore, 39) : rawOverallScore;

  const deploymentReady = blockingFindings.length === 0 && materialGaps.length === 0;
  const status: "ready" | "needs-review" | "blocked" = blockingFindings.length > 0 ? "blocked" : materialGaps.length > 0 ? "needs-review" : "ready";

  const evidenceLog: QaEvidenceEntry[] = sections.map((s) => ({
    area: s.area,
    source: s.source,
    status: s.findings.some((f) => f.status === "blocked") ? "blocked" : s.findings.some((f) => f.status !== "pass") ? "warning" : "pass",
    score: scoreForFindings(s.findings),
    recordedAt: evaluatedAt,
  }));

  return {
    projectName,
    deploymentId,
    reviewer,
    evaluatedAt,
    environment,
    provider,
    findings: [...findings].sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity)),
    areaScores,
    overallScore,
    readinessDecision: {
      deploymentReady,
      status,
      blockingFindings,
      materialGaps,
      summary: deploymentReady
        ? `This ${environment} deployment has no material gaps or blockers and may proceed.`
        : blockingFindings.length > 0
          ? `${blockingFindings.length} hard blocker(s) must be resolved before this ${environment} deployment can proceed.`
          : `${materialGaps.length} required item(s) still need to be resolved before this ${environment} deployment can proceed.`,
    },
    deploymentPlan: buildDeploymentPlan(context),
    rollbackPlan: buildRollbackPlan(context),
    evidenceLog,
    approvalGate: [
      "Reviewer/QA decision reviewed for this environment",
      "All applicable permissions confirmed by the client",
      "No blocking findings remain",
      "Deployment plan and rollback plan reviewed",
      "Final deployment sign-off recorded",
    ],
    extensionPoints: [
      "Prepared for future Orchestration coordination across the full engine set",
      "Prepared for future Vercel or other provider support",
      "Prepared for future Maintenance re-deployment cadence",
      "Prepared for a future mobile dashboard deployment experience",
    ],
  };
}

// ---------------------------------------------------------------------------
// Static blueprint
// ---------------------------------------------------------------------------

export interface DeploymentBlueprint {
  scope: string[];
  automatedCheckAreas: QaArea[];
  humanReviewAreas: QaArea[];
  reviewChecklist: string[];
  approvalGate: string[];
  extensionPoints: string[];
}

export function buildDeploymentBlueprint(): DeploymentBlueprint {
  return {
    scope: [
      "Local development, preview deployment, and production deployment readiness.",
      "Cloudflare Pages as the default and only implemented provider; Vercel and other providers are extension points only.",
      "Custom domains, DNS changes, and SSL — gated behind explicit, environment-appropriate client approval.",
      "Environment variables — names only, never values; a heuristic flags anything shaped like a pasted secret.",
      "Analytics and tracking installation — gated behind explicit approval, reusing the Client Intake Engine's permissions.",
      "Redirects, canonical host validation, and robots.txt/sitemap readiness, including mandatory noindex on preview.",
      "Deployment approvals distinguished by environment: production requires a passing Reviewer/QA report; preview does not.",
      "Dry-run deployment plan and rollback plan generation — descriptive only, no execution.",
      "Backups, version history, client handoff and white-label file exclusion, maintenance mode, post-launch verification, and multi-client account portability.",
    ],
    automatedCheckAreas: ["deploy-qa-gate", "deploy-permissions", "deploy-environment-variables", "deploy-redirects-canonical", "deploy-robots-sitemap", "deploy-backups"],
    humanReviewAreas: ["deploy-domain-dns", "deploy-analytics", "deploy-handoff", "deploy-maintenance-mode", "deploy-post-launch", "deploy-portability"],
    reviewChecklist: [
      "Confirm the Reviewer/QA report backing this deployment is current and, for production, passing.",
      "Confirm every applicable permission was explicitly answered by the client, not assumed.",
      "Treat any unset or unrecorded signal as a pending human-review item, never as an automatic pass.",
      "Never record an actual secret value anywhere in this engine's input — names only.",
      "Resolve every blocking finding before recording a deployment-ready decision.",
      "Review the dry-run deployment plan and rollback plan together before any real deployment.",
    ],
    approvalGate: [
      "Reviewer/QA decision reviewed for this environment",
      "All applicable permissions confirmed by the client",
      "No blocking findings remain",
      "Deployment plan and rollback plan reviewed",
      "Final deployment sign-off recorded",
    ],
    extensionPoints: [
      "Prepared for future Orchestration coordination across the full engine set",
      "Prepared for future Vercel or other provider support",
      "Prepared for future Maintenance re-deployment cadence",
      "Prepared for a future mobile dashboard deployment experience",
    ],
  };
}
