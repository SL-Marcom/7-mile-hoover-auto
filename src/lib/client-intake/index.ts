import type { ContentIntelligenceContext } from "@/lib/content-intelligence";
import type { SeoIntelligenceContext } from "@/lib/seo/intelligence";
import type { AiVisibilityContext } from "@/lib/ai-visibility";
import type { LocalSeoContext, LocalBusinessModel } from "@/lib/local-seo";
import type { BlogIntelligenceContext } from "@/lib/blog-intelligence";
import type { IndustryKnowledgeContext } from "@/lib/industry-knowledge";
import type { QaArea, QaSeverity, QaFinding, QaEvidenceEntry } from "@/lib/reviewer";

/**
 * Canonical, stable field-id registry. A mobile app, an API, a dashboard, or a
 * separate LLM updates one field at a time via `{ fieldId, value, source }`
 * instead of resending the full intake record.
 */
export const INTAKE_FIELD_IDS = {
  identity: {
    legalName: "identity.legal-name",
    brandName: "identity.brand-name",
    preferredPublicName: "identity.preferred-public-name",
    entityType: "identity.entity-type",
  },
  contacts: {
    approvalAuthorityConfirmed: "contacts.approval-authority-confirmed",
  },
  services: {
    services: "services.services",
    products: "services.products",
  },
  locations: {
    businessModel: "locations.business-model",
    primaryLocation: "locations.primary-location",
    additionalLocations: "locations.additional-locations",
    serviceAreas: "locations.service-areas",
  },
  audienceGoals: {
    targetAudiences: "audience-goals.target-audiences",
    primaryGoal: "audience-goals.primary-goal",
    secondaryGoals: "audience-goals.secondary-goals",
    conversionPriorities: "audience-goals.conversion-priorities",
  },
  brandDesign: {
    brandVoice: "brand-design.brand-voice",
    toneNotes: "brand-design.tone-notes",
    designPreferences: "brand-design.design-preferences",
    inspirationReferences: "brand-design.inspiration-references",
  },
  externalPresence: {
    existingWebsiteUrl: "external-presence.existing-website-url",
    googleBusinessProfileUrl: "external-presence.google-business-profile-url",
    socialProfiles: "external-presence.social-profiles",
    analyticsPlatforms: "external-presence.analytics-platforms",
    adsPlatforms: "external-presence.ads-platforms",
    otherPlatforms: "external-presence.other-platforms",
  },
  languagesCompetitors: {
    languages: "languages-competitors.languages",
    competitors: "languages-competitors.competitors",
  },
  pagesContent: {
    requiredPages: "pages-content.required-pages",
    contentPriorities: "pages-content.content-priorities",
  },
  strategyPriorities: {
    seoPriorities: "strategy-priorities.seo-priorities",
    localSeoPriorities: "strategy-priorities.local-seo-priorities",
    aiVisibilityPriorities: "strategy-priorities.ai-visibility-priorities",
    blogPriorities: "strategy-priorities.blog-priorities",
    advertisingPriorities: "strategy-priorities.advertising-priorities",
  },
  compliance: {
    prohibitedClaims: "compliance.prohibited-claims",
    complianceSensitivities: "compliance.compliance-sensitivities",
  },
  permissions: {
    publishingApproved: "permissions.publishing-approved",
    deploymentApproved: "permissions.deployment-approved",
    dnsChangesApproved: "permissions.dns-changes-approved",
    analyticsInstallApproved: "permissions.analytics-install-approved",
    externalServiceConnectionsApproved: "permissions.external-service-connections-approved",
  },
} as const;

type ExtractIds<T> = T extends string ? T : T extends Record<string, unknown> ? { [K in keyof T]: ExtractIds<T[K]> }[keyof T] : never;
export type IntakeFieldId = ExtractIds<typeof INTAKE_FIELD_IDS>;

export type EvidenceSource = "client-confirmed" | "public-research" | "assumption" | "suggestion" | "unknown";

export interface IntakeField<T> {
  fieldId: IntakeFieldId;
  value: T;
  source: EvidenceSource;
  note?: string;
  updatedAt?: string;
}

export function intakeField<T>(fieldId: IntakeFieldId, value: T, source: EvidenceSource, options?: { note?: string; updatedAt?: string }): IntakeField<T> {
  return { fieldId, value, source, note: options?.note, updatedAt: options?.updatedAt };
}

export function isClientConfirmed<T>(field: IntakeField<T> | undefined): boolean {
  return field?.source === "client-confirmed";
}

export interface BusinessIdentity {
  legalName?: IntakeField<string>;
  brandName?: IntakeField<string>;
  preferredPublicName?: IntakeField<string>;
  entityType?: IntakeField<string>;
}

export interface PrimaryContact {
  id: string;
  name: string;
  role: string;
  isApprovalAuthority: boolean;
  contactMethod?: string;
}

export interface ContactsAndAuthority {
  contacts: PrimaryContact[];
  approvalAuthorityConfirmed?: IntakeField<boolean>;
}

export interface ServicesAndProducts {
  services?: IntakeField<string[]>;
  products?: IntakeField<string[]>;
}

export type BusinessModel = LocalBusinessModel | "online-only";

export interface LocationsAndServiceAreas {
  businessModel?: IntakeField<BusinessModel>;
  primaryLocation?: IntakeField<string>;
  additionalLocations?: IntakeField<string[]>;
  serviceAreas?: IntakeField<string[]>;
}

export interface AudienceAndGoals {
  targetAudiences?: IntakeField<string[]>;
  primaryGoal?: IntakeField<string>;
  secondaryGoals?: IntakeField<string[]>;
  conversionPriorities?: IntakeField<string[]>;
}

export interface BrandVoiceAndDesign {
  brandVoice?: IntakeField<string>;
  toneNotes?: IntakeField<string[]>;
  designPreferences?: IntakeField<string[]>;
  inspirationReferences?: IntakeField<string[]>;
}

export interface ExternalPresence {
  existingWebsiteUrl?: IntakeField<string>;
  googleBusinessProfileUrl?: IntakeField<string>;
  socialProfiles?: IntakeField<string[]>;
  analyticsPlatforms?: IntakeField<string[]>;
  adsPlatforms?: IntakeField<string[]>;
  otherPlatforms?: IntakeField<string[]>;
}

export interface TrustClaim {
  id: string;
  claim: string;
  source: EvidenceSource;
  note?: string;
}

export interface TrustAndClaims {
  claims: TrustClaim[];
}

export interface LanguagesAndCompetitors {
  languages?: IntakeField<string[]>;
  competitors?: IntakeField<string[]>;
}

export interface PagesAndContentPriorities {
  requiredPages?: IntakeField<string[]>;
  contentPriorities?: IntakeField<string[]>;
}

export interface StrategyPriorities {
  seoPriorities?: IntakeField<string[]>;
  localSeoPriorities?: IntakeField<string[]>;
  aiVisibilityPriorities?: IntakeField<string[]>;
  blogPriorities?: IntakeField<string[]>;
  advertisingPriorities?: IntakeField<string[]>;
}

export interface ComplianceAndProhibitions {
  prohibitedClaims?: IntakeField<string[]>;
  complianceSensitivities?: IntakeField<string[]>;
}

export interface PermissionsAndApprovals {
  publishingApproved?: IntakeField<boolean>;
  deploymentApproved?: IntakeField<boolean>;
  dnsChangesApproved?: IntakeField<boolean>;
  analyticsInstallApproved?: IntakeField<boolean>;
  externalServiceConnectionsApproved?: IntakeField<boolean>;
}

export interface ClientIntakeContext {
  intakeId?: string;
  projectName?: string;
  reviewer?: string;
  intakeDate?: string;

  businessIdentity?: BusinessIdentity;
  contacts?: ContactsAndAuthority;
  servicesAndProducts?: ServicesAndProducts;
  locations?: LocationsAndServiceAreas;
  audienceAndGoals?: AudienceAndGoals;
  brandVoiceAndDesign?: BrandVoiceAndDesign;
  externalPresence?: ExternalPresence;
  trustAndClaims?: TrustAndClaims;
  languagesAndCompetitors?: LanguagesAndCompetitors;
  pagesAndContent?: PagesAndContentPriorities;
  strategyPriorities?: StrategyPriorities;
  compliance?: ComplianceAndProhibitions;
  permissions?: PermissionsAndApprovals;
}

// ---------------------------------------------------------------------------
// Field-level and list-item-level partial updates
// ---------------------------------------------------------------------------

type FieldSetter = (context: ClientIntakeContext, field: IntakeField<unknown>) => ClientIntakeContext;

const FIELD_SETTERS: Record<IntakeFieldId, FieldSetter> = {
  [INTAKE_FIELD_IDS.identity.legalName]: (ctx, f) => ({ ...ctx, businessIdentity: { ...ctx.businessIdentity, legalName: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.identity.brandName]: (ctx, f) => ({ ...ctx, businessIdentity: { ...ctx.businessIdentity, brandName: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.identity.preferredPublicName]: (ctx, f) => ({ ...ctx, businessIdentity: { ...ctx.businessIdentity, preferredPublicName: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.identity.entityType]: (ctx, f) => ({ ...ctx, businessIdentity: { ...ctx.businessIdentity, entityType: f as IntakeField<string> } }),

  [INTAKE_FIELD_IDS.contacts.approvalAuthorityConfirmed]: (ctx, f) => ({
    ...ctx,
    contacts: { contacts: ctx.contacts?.contacts ?? [], approvalAuthorityConfirmed: f as IntakeField<boolean> },
  }),

  [INTAKE_FIELD_IDS.services.services]: (ctx, f) => ({ ...ctx, servicesAndProducts: { ...ctx.servicesAndProducts, services: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.services.products]: (ctx, f) => ({ ...ctx, servicesAndProducts: { ...ctx.servicesAndProducts, products: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.locations.businessModel]: (ctx, f) => ({ ...ctx, locations: { ...ctx.locations, businessModel: f as IntakeField<BusinessModel> } }),
  [INTAKE_FIELD_IDS.locations.primaryLocation]: (ctx, f) => ({ ...ctx, locations: { ...ctx.locations, primaryLocation: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.locations.additionalLocations]: (ctx, f) => ({ ...ctx, locations: { ...ctx.locations, additionalLocations: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.locations.serviceAreas]: (ctx, f) => ({ ...ctx, locations: { ...ctx.locations, serviceAreas: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.audienceGoals.targetAudiences]: (ctx, f) => ({ ...ctx, audienceAndGoals: { ...ctx.audienceAndGoals, targetAudiences: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.audienceGoals.primaryGoal]: (ctx, f) => ({ ...ctx, audienceAndGoals: { ...ctx.audienceAndGoals, primaryGoal: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.audienceGoals.secondaryGoals]: (ctx, f) => ({ ...ctx, audienceAndGoals: { ...ctx.audienceAndGoals, secondaryGoals: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.audienceGoals.conversionPriorities]: (ctx, f) => ({ ...ctx, audienceAndGoals: { ...ctx.audienceAndGoals, conversionPriorities: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.brandDesign.brandVoice]: (ctx, f) => ({ ...ctx, brandVoiceAndDesign: { ...ctx.brandVoiceAndDesign, brandVoice: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.brandDesign.toneNotes]: (ctx, f) => ({ ...ctx, brandVoiceAndDesign: { ...ctx.brandVoiceAndDesign, toneNotes: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.brandDesign.designPreferences]: (ctx, f) => ({ ...ctx, brandVoiceAndDesign: { ...ctx.brandVoiceAndDesign, designPreferences: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.brandDesign.inspirationReferences]: (ctx, f) => ({ ...ctx, brandVoiceAndDesign: { ...ctx.brandVoiceAndDesign, inspirationReferences: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.externalPresence.existingWebsiteUrl]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, existingWebsiteUrl: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.externalPresence.googleBusinessProfileUrl]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, googleBusinessProfileUrl: f as IntakeField<string> } }),
  [INTAKE_FIELD_IDS.externalPresence.socialProfiles]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, socialProfiles: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.externalPresence.analyticsPlatforms]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, analyticsPlatforms: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.externalPresence.adsPlatforms]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, adsPlatforms: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.externalPresence.otherPlatforms]: (ctx, f) => ({ ...ctx, externalPresence: { ...ctx.externalPresence, otherPlatforms: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.languagesCompetitors.languages]: (ctx, f) => ({ ...ctx, languagesAndCompetitors: { ...ctx.languagesAndCompetitors, languages: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.languagesCompetitors.competitors]: (ctx, f) => ({ ...ctx, languagesAndCompetitors: { ...ctx.languagesAndCompetitors, competitors: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.pagesContent.requiredPages]: (ctx, f) => ({ ...ctx, pagesAndContent: { ...ctx.pagesAndContent, requiredPages: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.pagesContent.contentPriorities]: (ctx, f) => ({ ...ctx, pagesAndContent: { ...ctx.pagesAndContent, contentPriorities: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.strategyPriorities.seoPriorities]: (ctx, f) => ({ ...ctx, strategyPriorities: { ...ctx.strategyPriorities, seoPriorities: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.strategyPriorities.localSeoPriorities]: (ctx, f) => ({ ...ctx, strategyPriorities: { ...ctx.strategyPriorities, localSeoPriorities: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.strategyPriorities.aiVisibilityPriorities]: (ctx, f) => ({ ...ctx, strategyPriorities: { ...ctx.strategyPriorities, aiVisibilityPriorities: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.strategyPriorities.blogPriorities]: (ctx, f) => ({ ...ctx, strategyPriorities: { ...ctx.strategyPriorities, blogPriorities: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.strategyPriorities.advertisingPriorities]: (ctx, f) => ({ ...ctx, strategyPriorities: { ...ctx.strategyPriorities, advertisingPriorities: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.compliance.prohibitedClaims]: (ctx, f) => ({ ...ctx, compliance: { ...ctx.compliance, prohibitedClaims: f as IntakeField<string[]> } }),
  [INTAKE_FIELD_IDS.compliance.complianceSensitivities]: (ctx, f) => ({ ...ctx, compliance: { ...ctx.compliance, complianceSensitivities: f as IntakeField<string[]> } }),

  [INTAKE_FIELD_IDS.permissions.publishingApproved]: (ctx, f) => ({ ...ctx, permissions: { ...ctx.permissions, publishingApproved: f as IntakeField<boolean> } }),
  [INTAKE_FIELD_IDS.permissions.deploymentApproved]: (ctx, f) => ({ ...ctx, permissions: { ...ctx.permissions, deploymentApproved: f as IntakeField<boolean> } }),
  [INTAKE_FIELD_IDS.permissions.dnsChangesApproved]: (ctx, f) => ({ ...ctx, permissions: { ...ctx.permissions, dnsChangesApproved: f as IntakeField<boolean> } }),
  [INTAKE_FIELD_IDS.permissions.analyticsInstallApproved]: (ctx, f) => ({ ...ctx, permissions: { ...ctx.permissions, analyticsInstallApproved: f as IntakeField<boolean> } }),
  [INTAKE_FIELD_IDS.permissions.externalServiceConnectionsApproved]: (ctx, f) => ({ ...ctx, permissions: { ...ctx.permissions, externalServiceConnectionsApproved: f as IntakeField<boolean> } }),
};

/**
 * Updates exactly one field by its stable id, without touching the rest of the
 * intake record. This is the boundary a mobile app, API, or dashboard calls —
 * `value` is deliberately `unknown` because that is what a network payload
 * actually is; the internal typed model applies once the update is merged.
 */
export function updateIntakeField(
  context: ClientIntakeContext,
  fieldId: IntakeFieldId,
  value: unknown,
  source: EvidenceSource,
  options?: { note?: string; updatedAt?: string },
): ClientIntakeContext {
  const setter = FIELD_SETTERS[fieldId];
  if (!setter) return context;
  const field: IntakeField<unknown> = { fieldId, value, source, note: options?.note, updatedAt: options?.updatedAt };
  return setter(context, field);
}

/** Adds or replaces one contact by its own stable id, without rewriting the full contacts list. */
export function upsertContact(context: ClientIntakeContext, contact: PrimaryContact): ClientIntakeContext {
  const existing = context.contacts?.contacts ?? [];
  return {
    ...context,
    contacts: {
      approvalAuthorityConfirmed: context.contacts?.approvalAuthorityConfirmed,
      contacts: [...existing.filter((c) => c.id !== contact.id), contact],
    },
  };
}

/** Adds or replaces one trust claim by its own stable id, without rewriting the full claims list. */
export function upsertTrustClaim(context: ClientIntakeContext, claim: TrustClaim): ClientIntakeContext {
  const existing = context.trustAndClaims?.claims ?? [];
  return {
    ...context,
    trustAndClaims: { claims: [...existing.filter((c) => c.id !== claim.id), claim] },
  };
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
    impact:
      status === "fail"
        ? "This is a material gap and must be resolved before strategy or implementation begins."
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
    impact: "This is a contradiction that must be resolved before the intake can be treated as internally consistent.",
    recommendedAction,
    approvalStatus: "pending",
  };
}

function buildUnconfirmedSummary<T>(label: string, field: IntakeField<T> | undefined): string {
  if (!field) return `${label} has not been gathered yet.`;
  switch (field.source) {
    case "unknown":
      return `${label} is marked unknown and needs follow-up.`;
    case "public-research":
      return `${label} is based on public research only and has not been confirmed by the client.`;
    case "assumption":
      return `${label} is currently an assumption and needs client confirmation.`;
    case "suggestion":
      return `${label} is a suggestion pending client confirmation.`;
    default:
      return `${label} has not been confirmed.`;
  }
}

interface FieldCheckSpec<T> {
  fieldId: IntakeFieldId;
  area: QaArea;
  label: string;
  field: IntakeField<T> | undefined;
  required: boolean;
  describe: (value: T) => string;
}

function evaluateIntakeField<T>(spec: FieldCheckSpec<T>): QaFinding {
  if (spec.field && spec.field.source === "client-confirmed") {
    return passFinding(spec.fieldId, spec.area, spec.describe(spec.field.value));
  }
  const summary = buildUnconfirmedSummary(spec.label, spec.field);
  if (!spec.required) {
    return gapFinding(spec.fieldId, spec.area, summary, "warning", "low", `Confirm ${spec.label.toLowerCase()} with the client when convenient.`);
  }
  return gapFinding(spec.fieldId, spec.area, summary, "fail", "high", `Confirm ${spec.label.toLowerCase()} with the client before strategy or implementation begins.`);
}

function identityFindings(identity: BusinessIdentity | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.identity.brandName, area: "intake-identity", label: "Brand name", field: identity?.brandName, required: true, describe: (v) => `Brand name confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.identity.legalName, area: "intake-identity", label: "Legal name", field: identity?.legalName, required: false, describe: (v) => `Legal name confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.identity.preferredPublicName, area: "intake-identity", label: "Preferred public name", field: identity?.preferredPublicName, required: false, describe: (v) => `Preferred public name confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.identity.entityType, area: "intake-identity", label: "Entity type", field: identity?.entityType, required: false, describe: (v) => `Entity type confirmed as "${v}".` }),
  ];
}

function contactsFindings(contacts: ContactsAndAuthority | undefined): QaFinding[] {
  const findings: QaFinding[] = [];
  const list = contacts?.contacts ?? [];

  if (list.length === 0) {
    findings.push(gapFinding("contacts.contact", "intake-contacts", "No primary contacts have been gathered yet.", "fail", "high", "Collect at least one primary contact before proceeding."));
  } else {
    findings.push(passFinding("contacts.contact", "intake-contacts", `Primary contacts recorded: ${list.map((c) => `${c.name} (${c.role})`).join(", ")}.`));
  }

  findings.push(
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.contacts.approvalAuthorityConfirmed,
      area: "intake-contacts",
      label: "Approval authority confirmation",
      field: contacts?.approvalAuthorityConfirmed,
      required: true,
      describe: (v) => (v ? "Approval authority has been confirmed for this project." : "The client has explicitly confirmed that approval authority is not yet in place."),
    }),
  );

  const authorityField = contacts?.approvalAuthorityConfirmed;
  const hasAuthorityContact = list.some((c) => c.isApprovalAuthority);
  if (authorityField?.source === "client-confirmed" && authorityField.value === true && !hasAuthorityContact) {
    findings.push(
      blockedFinding(
        "contradiction.contacts.authority-without-contact",
        "intake-contacts",
        "Approval authority is marked confirmed, but no listed contact is flagged as holding approval authority.",
        "Identify which specific contact holds approval authority, or correct the confirmation.",
      ),
    );
  }

  return findings;
}

function servicesFindings(services: ServicesAndProducts | undefined): QaFinding[] {
  return [
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.services.services,
      area: "intake-services",
      label: "Services",
      field: services?.services,
      required: true,
      describe: (v) => (v.length ? `Services confirmed: ${v.join(", ")}.` : "The client has confirmed there are no services to list."),
    }),
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.services.products,
      area: "intake-services",
      label: "Products",
      field: services?.products,
      required: false,
      describe: (v) => (v.length ? `Products confirmed: ${v.join(", ")}.` : "The client has confirmed there are no products to list."),
    }),
  ];
}

function locationsFindings(locations: LocationsAndServiceAreas | undefined): QaFinding[] {
  const findings: QaFinding[] = [];

  findings.push(
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.locations.businessModel,
      area: "intake-locations",
      label: "Business model",
      field: locations?.businessModel,
      required: true,
      describe: (v) => `Business model confirmed as ${v}.`,
    }),
  );

  const businessModelConfirmed = locations?.businessModel?.source === "client-confirmed" ? locations.businessModel.value : undefined;
  const primaryLocationRequired = businessModelConfirmed !== "online-only";

  findings.push(
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.locations.primaryLocation,
      area: "intake-locations",
      label: "Primary location",
      field: locations?.primaryLocation,
      required: primaryLocationRequired,
      describe: (v) => `Primary location confirmed as "${v}".`,
    }),
  );

  findings.push(
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.locations.serviceAreas,
      area: "intake-locations",
      label: "Service areas",
      field: locations?.serviceAreas,
      required: false,
      describe: (v) => (v.length ? `Service areas confirmed: ${v.join(", ")}.` : "The client has confirmed there are no distinct service areas."),
    }),
  );

  findings.push(
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.locations.additionalLocations,
      area: "intake-locations",
      label: "Additional locations",
      field: locations?.additionalLocations,
      required: false,
      describe: (v) => (v.length ? `Additional locations confirmed: ${v.join(", ")}.` : "The client has confirmed there are no additional locations."),
    }),
  );

  if (businessModelConfirmed) {
    const primaryLocationConfirmed = locations?.primaryLocation?.source === "client-confirmed";
    const serviceAreasConfirmed = locations?.serviceAreas?.source === "client-confirmed" ? locations.serviceAreas.value : [];
    const additionalLocationsConfirmed = locations?.additionalLocations?.source === "client-confirmed" ? locations.additionalLocations.value : [];

    if ((businessModelConfirmed === "storefront" || businessModelConfirmed === "single-location") && !primaryLocationConfirmed) {
      findings.push(
        blockedFinding(
          "contradiction.locations.model-vs-primary-location",
          "intake-locations",
          `Business model is confirmed as ${businessModelConfirmed}, but no confirmed primary location is on record.`,
          "Confirm the primary business location before proceeding.",
        ),
      );
    }

    if (businessModelConfirmed === "service-area" && serviceAreasConfirmed.length === 0) {
      findings.push(
        blockedFinding(
          "contradiction.locations.model-vs-service-areas",
          "intake-locations",
          "Business model is confirmed as service-area, but no confirmed service areas are on record.",
          "Confirm the service areas before proceeding.",
        ),
      );
    }

    if (businessModelConfirmed === "multi-location" && additionalLocationsConfirmed.length < 1) {
      findings.push(
        blockedFinding(
          "contradiction.locations.model-vs-multi-location",
          "intake-locations",
          "Business model is confirmed as multi-location, but fewer than two confirmed locations are on record.",
          "Confirm at least two locations before proceeding.",
        ),
      );
    }

    if (businessModelConfirmed === "online-only" && serviceAreasConfirmed.length > 0) {
      findings.push(
        blockedFinding(
          "contradiction.locations.online-only-with-service-areas",
          "intake-locations",
          "Business model is confirmed as online-only, but confirmed service areas are also on record.",
          "Clarify whether this business has a physical service area or is online-only.",
        ),
      );
    }
  }

  return findings;
}

function audienceGoalsFindings(audienceGoals: AudienceAndGoals | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.audienceGoals.targetAudiences, area: "intake-audience-goals", label: "Target audiences", field: audienceGoals?.targetAudiences, required: true, describe: (v) => `Target audiences confirmed: ${v.join(", ")}.` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.audienceGoals.primaryGoal, area: "intake-audience-goals", label: "Primary goal", field: audienceGoals?.primaryGoal, required: true, describe: (v) => `Primary goal confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.audienceGoals.secondaryGoals, area: "intake-audience-goals", label: "Secondary goals", field: audienceGoals?.secondaryGoals, required: false, describe: (v) => (v.length ? `Secondary goals confirmed: ${v.join(", ")}.` : "The client has confirmed there are no secondary goals.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.audienceGoals.conversionPriorities, area: "intake-audience-goals", label: "Conversion priorities", field: audienceGoals?.conversionPriorities, required: false, describe: (v) => (v.length ? `Conversion priorities confirmed: ${v.join(", ")}.` : "No conversion priorities confirmed yet.") }),
  ];
}

function brandDesignFindings(brandDesign: BrandVoiceAndDesign | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.brandDesign.brandVoice, area: "intake-brand-design", label: "Brand voice", field: brandDesign?.brandVoice, required: false, describe: (v) => `Brand voice confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.brandDesign.toneNotes, area: "intake-brand-design", label: "Tone notes", field: brandDesign?.toneNotes, required: false, describe: (v) => (v.length ? `Tone notes confirmed: ${v.join(", ")}.` : "No tone notes confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.brandDesign.designPreferences, area: "intake-brand-design", label: "Design preferences", field: brandDesign?.designPreferences, required: false, describe: (v) => (v.length ? `Design preferences confirmed: ${v.join(", ")}.` : "No design preferences confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.brandDesign.inspirationReferences, area: "intake-brand-design", label: "Inspiration references", field: brandDesign?.inspirationReferences, required: false, describe: (v) => (v.length ? `Inspiration references confirmed: ${v.join(", ")}.` : "No inspiration references confirmed yet.") }),
  ];
}

function externalPresenceFindings(presence: ExternalPresence | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.existingWebsiteUrl, area: "intake-external-presence", label: "Existing website", field: presence?.existingWebsiteUrl, required: false, describe: (v) => `Existing website confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.googleBusinessProfileUrl, area: "intake-external-presence", label: "Google Business Profile", field: presence?.googleBusinessProfileUrl, required: false, describe: (v) => `Google Business Profile confirmed as "${v}".` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.socialProfiles, area: "intake-external-presence", label: "Social profiles", field: presence?.socialProfiles, required: false, describe: (v) => (v.length ? `Social profiles confirmed: ${v.join(", ")}.` : "No social profiles confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.analyticsPlatforms, area: "intake-external-presence", label: "Analytics platforms", field: presence?.analyticsPlatforms, required: false, describe: (v) => (v.length ? `Analytics platforms confirmed: ${v.join(", ")}.` : "No analytics platforms confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.adsPlatforms, area: "intake-external-presence", label: "Advertising platforms", field: presence?.adsPlatforms, required: false, describe: (v) => (v.length ? `Advertising platforms confirmed: ${v.join(", ")}.` : "No advertising platforms confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.externalPresence.otherPlatforms, area: "intake-external-presence", label: "Other platforms", field: presence?.otherPlatforms, required: false, describe: (v) => (v.length ? `Other platforms confirmed: ${v.join(", ")}.` : "No other platforms confirmed yet.") }),
  ];
}

function trustClaimsFindings(trust: TrustAndClaims | undefined): QaFinding[] {
  const claims = trust?.claims ?? [];
  if (claims.length === 0) {
    return [
      gapFinding(
        "trust-claims.claim",
        "intake-trust-claims",
        "No claims, credentials, awards, reviews, or guarantees have been recorded yet.",
        "warning",
        "low",
        "Collect any claims the client wants to use, each tagged with its confirmation source.",
      ),
    ];
  }
  return claims.map((claim) => {
    const id = `trust-claims.claim.${claim.id}`;
    if (claim.source === "client-confirmed") {
      return passFinding(id, "intake-trust-claims", `Confirmed for use: "${claim.claim}".`);
    }
    return gapFinding(id, "intake-trust-claims", `Not yet confirmed for use: "${claim.claim}" (source: ${claim.source}).`, "fail", "high", "Do not use this claim in published content until the client explicitly confirms it.");
  });
}

function languagesCompetitorsFindings(section: LanguagesAndCompetitors | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.languagesCompetitors.languages, area: "intake-languages-competitors", label: "Languages", field: section?.languages, required: false, describe: (v) => (v.length ? `Languages confirmed: ${v.join(", ")}.` : "No languages confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.languagesCompetitors.competitors, area: "intake-languages-competitors", label: "Competitors", field: section?.competitors, required: false, describe: (v) => (v.length ? `Competitors confirmed: ${v.join(", ")}.` : "The client has confirmed there are no known competitors to note.") }),
  ];
}

function pagesContentFindings(section: PagesAndContentPriorities | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.pagesContent.requiredPages, area: "intake-pages-content", label: "Required pages", field: section?.requiredPages, required: true, describe: (v) => `Required pages confirmed: ${v.join(", ")}.` }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.pagesContent.contentPriorities, area: "intake-pages-content", label: "Content priorities", field: section?.contentPriorities, required: false, describe: (v) => (v.length ? `Content priorities confirmed: ${v.join(", ")}.` : "No content priorities confirmed yet.") }),
  ];
}

function strategyPrioritiesFindings(section: StrategyPriorities | undefined): QaFinding[] {
  return [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.strategyPriorities.seoPriorities, area: "intake-strategy-priorities", label: "SEO priorities", field: section?.seoPriorities, required: false, describe: (v) => (v.length ? `SEO priorities confirmed: ${v.join(", ")}.` : "No SEO priorities confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.strategyPriorities.localSeoPriorities, area: "intake-strategy-priorities", label: "Local SEO priorities", field: section?.localSeoPriorities, required: false, describe: (v) => (v.length ? `Local SEO priorities confirmed: ${v.join(", ")}.` : "No local SEO priorities confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.strategyPriorities.aiVisibilityPriorities, area: "intake-strategy-priorities", label: "AI visibility priorities", field: section?.aiVisibilityPriorities, required: false, describe: (v) => (v.length ? `AI visibility priorities confirmed: ${v.join(", ")}.` : "No AI visibility priorities confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.strategyPriorities.blogPriorities, area: "intake-strategy-priorities", label: "Blog priorities", field: section?.blogPriorities, required: false, describe: (v) => (v.length ? `Blog priorities confirmed: ${v.join(", ")}.` : "No blog priorities confirmed yet.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.strategyPriorities.advertisingPriorities, area: "intake-strategy-priorities", label: "Advertising priorities", field: section?.advertisingPriorities, required: false, describe: (v) => (v.length ? `Advertising priorities confirmed: ${v.join(", ")}.` : "No advertising priorities confirmed yet.") }),
  ];
}

function complianceFindings(compliance: ComplianceAndProhibitions | undefined, trust: TrustAndClaims | undefined): QaFinding[] {
  const findings: QaFinding[] = [
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.compliance.prohibitedClaims, area: "intake-compliance", label: "Prohibited claims", field: compliance?.prohibitedClaims, required: false, describe: (v) => (v.length ? `Prohibited claims recorded: ${v.join(", ")}.` : "No prohibited claims recorded.") }),
    evaluateIntakeField({ fieldId: INTAKE_FIELD_IDS.compliance.complianceSensitivities, area: "intake-compliance", label: "Compliance sensitivities", field: compliance?.complianceSensitivities, required: false, describe: (v) => (v.length ? `Compliance sensitivities recorded: ${v.join(", ")}.` : "No compliance sensitivities recorded.") }),
  ];

  if (compliance?.prohibitedClaims?.source === "client-confirmed") {
    const prohibited = compliance.prohibitedClaims.value.map((c) => c.toLowerCase()).filter((c) => c.length > 0);
    const overlapping = (trust?.claims ?? []).filter(
      (claim) => claim.source === "client-confirmed" && prohibited.some((p) => claim.claim.toLowerCase().includes(p)),
    );
    if (overlapping.length > 0) {
      findings.push(
        blockedFinding(
          "contradiction.compliance.claim-overlaps-prohibited",
          "intake-compliance",
          `The following confirmed claims overlap with the client's own prohibited-claims list: ${overlapping.map((c) => `"${c.claim}"`).join(", ")}.`,
          "Resolve this contradiction with the client before using these claims.",
        ),
      );
    }
  }

  return findings;
}

const PERMISSION_LABELS: Record<keyof PermissionsAndApprovals, string> = {
  publishingApproved: "Publishing approval",
  deploymentApproved: "Deployment approval",
  dnsChangesApproved: "DNS changes approval",
  analyticsInstallApproved: "Analytics installation approval",
  externalServiceConnectionsApproved: "External service connections approval",
};

function permissionsFindings(permissions: PermissionsAndApprovals | undefined, contacts: ContactsAndAuthority | undefined): QaFinding[] {
  const keys = Object.keys(PERMISSION_LABELS) as (keyof PermissionsAndApprovals)[];
  const findings = keys.map((key) =>
    evaluateIntakeField({
      fieldId: INTAKE_FIELD_IDS.permissions[key],
      area: "intake-permissions",
      label: PERMISSION_LABELS[key],
      field: permissions?.[key],
      required: true,
      describe: (v) => (v ? `${PERMISSION_LABELS[key]} has been explicitly granted.` : `${PERMISSION_LABELS[key]} has been explicitly withheld.`),
    }),
  );

  const anyApprovedTrue = keys.some((key) => permissions?.[key]?.source === "client-confirmed" && permissions[key]?.value === true);
  const authorityConfirmed = contacts?.approvalAuthorityConfirmed?.source === "client-confirmed" && contacts.approvalAuthorityConfirmed.value === true;

  if (anyApprovedTrue && !authorityConfirmed) {
    findings.push(
      blockedFinding(
        "contradiction.permissions.approval-without-authority",
        "intake-permissions",
        "A publishing, deployment, DNS, analytics, or external-service permission is marked approved, but no confirmed approval authority is on record.",
        "Confirm who holds approval authority before treating any permission as granted.",
      ),
    );
  }

  return findings;
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

// ---------------------------------------------------------------------------
// Confirmation summary
// ---------------------------------------------------------------------------

export interface IntakeConfirmationSummary {
  confirmedFacts: string[];
  researchOnlyFacts: string[];
  assumptions: string[];
  suggestions: string[];
  unknowns: string[];
}

function pushFieldToSummary(summary: IntakeConfirmationSummary, label: string, field: IntakeField<unknown> | undefined) {
  if (!field) {
    summary.unknowns.push(`${label}: not yet gathered`);
    return;
  }
  const valueText = Array.isArray(field.value) ? (field.value.length ? field.value.join(", ") : "none") : String(field.value);
  const line = `${label}: ${valueText}`;
  switch (field.source) {
    case "client-confirmed":
      summary.confirmedFacts.push(line);
      break;
    case "public-research":
      summary.researchOnlyFacts.push(line);
      break;
    case "assumption":
      summary.assumptions.push(line);
      break;
    case "suggestion":
      summary.suggestions.push(line);
      break;
    case "unknown":
      summary.unknowns.push(line);
      break;
  }
}

function buildConfirmationSummary(context: ClientIntakeContext): IntakeConfirmationSummary {
  const summary: IntakeConfirmationSummary = { confirmedFacts: [], researchOnlyFacts: [], assumptions: [], suggestions: [], unknowns: [] };

  pushFieldToSummary(summary, "Legal name", context.businessIdentity?.legalName);
  pushFieldToSummary(summary, "Brand name", context.businessIdentity?.brandName);
  pushFieldToSummary(summary, "Preferred public name", context.businessIdentity?.preferredPublicName);
  pushFieldToSummary(summary, "Entity type", context.businessIdentity?.entityType);

  if (context.contacts?.contacts.length) {
    summary.confirmedFacts.push(`Contacts: ${context.contacts.contacts.map((c) => `${c.name} (${c.role})`).join(", ")}`);
  } else {
    summary.unknowns.push("Contacts: not yet gathered");
  }
  pushFieldToSummary(summary, "Approval authority confirmed", context.contacts?.approvalAuthorityConfirmed);

  pushFieldToSummary(summary, "Services", context.servicesAndProducts?.services);
  pushFieldToSummary(summary, "Products", context.servicesAndProducts?.products);

  pushFieldToSummary(summary, "Business model", context.locations?.businessModel);
  pushFieldToSummary(summary, "Primary location", context.locations?.primaryLocation);
  pushFieldToSummary(summary, "Additional locations", context.locations?.additionalLocations);
  pushFieldToSummary(summary, "Service areas", context.locations?.serviceAreas);

  pushFieldToSummary(summary, "Target audiences", context.audienceAndGoals?.targetAudiences);
  pushFieldToSummary(summary, "Primary goal", context.audienceAndGoals?.primaryGoal);
  pushFieldToSummary(summary, "Secondary goals", context.audienceAndGoals?.secondaryGoals);
  pushFieldToSummary(summary, "Conversion priorities", context.audienceAndGoals?.conversionPriorities);

  pushFieldToSummary(summary, "Brand voice", context.brandVoiceAndDesign?.brandVoice);
  pushFieldToSummary(summary, "Tone notes", context.brandVoiceAndDesign?.toneNotes);
  pushFieldToSummary(summary, "Design preferences", context.brandVoiceAndDesign?.designPreferences);
  pushFieldToSummary(summary, "Inspiration references", context.brandVoiceAndDesign?.inspirationReferences);

  pushFieldToSummary(summary, "Existing website", context.externalPresence?.existingWebsiteUrl);
  pushFieldToSummary(summary, "Google Business Profile", context.externalPresence?.googleBusinessProfileUrl);
  pushFieldToSummary(summary, "Social profiles", context.externalPresence?.socialProfiles);
  pushFieldToSummary(summary, "Analytics platforms", context.externalPresence?.analyticsPlatforms);
  pushFieldToSummary(summary, "Advertising platforms", context.externalPresence?.adsPlatforms);
  pushFieldToSummary(summary, "Other platforms", context.externalPresence?.otherPlatforms);

  for (const claim of context.trustAndClaims?.claims ?? []) {
    const line = `Claim: "${claim.claim}"`;
    switch (claim.source) {
      case "client-confirmed":
        summary.confirmedFacts.push(line);
        break;
      case "public-research":
        summary.researchOnlyFacts.push(line);
        break;
      case "assumption":
        summary.assumptions.push(line);
        break;
      case "suggestion":
        summary.suggestions.push(line);
        break;
      case "unknown":
        summary.unknowns.push(line);
        break;
    }
  }

  pushFieldToSummary(summary, "Languages", context.languagesAndCompetitors?.languages);
  pushFieldToSummary(summary, "Competitors", context.languagesAndCompetitors?.competitors);

  pushFieldToSummary(summary, "Required pages", context.pagesAndContent?.requiredPages);
  pushFieldToSummary(summary, "Content priorities", context.pagesAndContent?.contentPriorities);

  pushFieldToSummary(summary, "SEO priorities", context.strategyPriorities?.seoPriorities);
  pushFieldToSummary(summary, "Local SEO priorities", context.strategyPriorities?.localSeoPriorities);
  pushFieldToSummary(summary, "AI visibility priorities", context.strategyPriorities?.aiVisibilityPriorities);
  pushFieldToSummary(summary, "Blog priorities", context.strategyPriorities?.blogPriorities);
  pushFieldToSummary(summary, "Advertising priorities", context.strategyPriorities?.advertisingPriorities);

  pushFieldToSummary(summary, "Prohibited claims", context.compliance?.prohibitedClaims);
  pushFieldToSummary(summary, "Compliance sensitivities", context.compliance?.complianceSensitivities);

  pushFieldToSummary(summary, "Publishing approval", context.permissions?.publishingApproved);
  pushFieldToSummary(summary, "Deployment approval", context.permissions?.deploymentApproved);
  pushFieldToSummary(summary, "DNS changes approval", context.permissions?.dnsChangesApproved);
  pushFieldToSummary(summary, "Analytics installation approval", context.permissions?.analyticsInstallApproved);
  pushFieldToSummary(summary, "External service connections approval", context.permissions?.externalServiceConnectionsApproved);

  return summary;
}

// ---------------------------------------------------------------------------
// Structured inputs for the existing engines
// ---------------------------------------------------------------------------

function confirmedValue<T>(field: IntakeField<T> | undefined, fallback: T): T {
  return field?.source === "client-confirmed" ? field.value : fallback;
}

export interface DerivedEngineInputs {
  contentContext: Partial<ContentIntelligenceContext>;
  seoContext: Partial<SeoIntelligenceContext>;
  aiVisibilityContext: Partial<AiVisibilityContext>;
  localSeoContext: Partial<LocalSeoContext>;
  blogContext: Partial<BlogIntelligenceContext>;
  industryContext: Partial<IndustryKnowledgeContext>;
  unconfirmedNotes: string[];
}

function buildEngineInputs(context: ClientIntakeContext): DerivedEngineInputs {
  const brandName = confirmedValue(context.businessIdentity?.brandName, "[Business Name]");
  const services = confirmedValue(context.servicesAndProducts?.services, ["[Service]"]);
  const primaryGoal = confirmedValue(context.audienceAndGoals?.primaryGoal, "Support a clear visitor action");
  const audiences = confirmedValue(context.audienceAndGoals?.targetAudiences, ["[Target Audience]"]);
  const brandVoice = confirmedValue(context.brandVoiceAndDesign?.brandVoice, "clear, practical, and specific");
  const primaryLocation = confirmedValue(context.locations?.primaryLocation, "[Primary Location]");
  const serviceAreas = confirmedValue(context.locations?.serviceAreas, ["[Service Area]"]);
  const businessModel = context.locations?.businessModel?.source === "client-confirmed" ? context.locations.businessModel.value : undefined;
  const confirmedTrustSignals = (context.trustAndClaims?.claims ?? []).filter((c) => c.source === "client-confirmed").map((c) => c.claim);
  const internalLinks = confirmedValue(context.pagesAndContent?.requiredPages, []);

  const contentContext: Partial<ContentIntelligenceContext> = {
    primaryGoal,
    audience: audiences.join(", "),
    brandVoice,
    trustSignals: confirmedTrustSignals.length > 0 ? confirmedTrustSignals : undefined,
    internalLinks: internalLinks.length > 0 ? internalLinks : undefined,
  };

  const seoContext: Partial<SeoIntelligenceContext> = {
    entities: [brandName, ...services].filter((entity, index, all) => Boolean(entity) && all.indexOf(entity) === index),
    internalLinks: internalLinks.length > 0 ? internalLinks : undefined,
  };

  const aiVisibilityContext: Partial<AiVisibilityContext> = {
    businessEntity: brandName,
    serviceEntities: services,
    locationEntities: primaryLocation !== "[Primary Location]" ? [primaryLocation] : undefined,
  };

  const localBusinessModel: LocalBusinessModel | undefined = businessModel && businessModel !== "online-only" ? businessModel : undefined;
  const localSeoContext: Partial<LocalSeoContext> = localBusinessModel
    ? {
        businessName: brandName,
        businessModel: localBusinessModel,
        primaryLocation,
        serviceAreas,
      }
    : {};

  const blogContext: Partial<BlogIntelligenceContext> = {
    audience: audiences.join(", "),
    localRelevance: Boolean(localBusinessModel),
    localContext: localBusinessModel ? primaryLocation : undefined,
  };

  const industryContext: Partial<IndustryKnowledgeContext> = {
    businessDescription: services.filter((s) => s !== "[Service]").join(", ") || undefined,
    confirmedByOwner: false,
  };

  const unconfirmedNotes: string[] = [];
  if (context.businessIdentity?.brandName && !isClientConfirmed(context.businessIdentity.brandName)) {
    unconfirmedNotes.push("Brand name is not yet client-confirmed. Downstream engines are using a placeholder until it is confirmed.");
  }
  if (context.servicesAndProducts?.services && !isClientConfirmed(context.servicesAndProducts.services)) {
    unconfirmedNotes.push("Services are not yet client-confirmed. Downstream engines are using a placeholder until they are confirmed.");
  }
  if (context.audienceAndGoals?.primaryGoal && !isClientConfirmed(context.audienceAndGoals.primaryGoal)) {
    unconfirmedNotes.push("Primary goal is not yet client-confirmed. Downstream engines are using a default until it is confirmed.");
  }
  if (context.audienceAndGoals?.targetAudiences && !isClientConfirmed(context.audienceAndGoals.targetAudiences)) {
    unconfirmedNotes.push("Target audiences are not yet client-confirmed. Downstream engines are using a placeholder until they are confirmed.");
  }
  if (context.locations?.primaryLocation && !isClientConfirmed(context.locations.primaryLocation)) {
    unconfirmedNotes.push("Primary location is not yet client-confirmed. Downstream engines are using a placeholder until it is confirmed.");
  }
  if (!localBusinessModel && businessModel !== "online-only") {
    unconfirmedNotes.push("Business model is not yet client-confirmed. Local SEO inputs are withheld until it is confirmed.");
  }

  return { contentContext, seoContext, aiVisibilityContext, localSeoContext, blogContext, industryContext, unconfirmedNotes };
}

// ---------------------------------------------------------------------------
// Main evaluation
// ---------------------------------------------------------------------------

export interface ClientIntakeRecord {
  intakeId: string;
  projectName: string;
  reviewer: string;
  intakeDate: string;
  findings: QaFinding[];
  areaScores: { area: QaArea; score: number }[];
  overallScore: number;
  confirmationSummary: IntakeConfirmationSummary;
  followUpQuestions: string[];
  contradictions: QaFinding[];
  readinessDecision: {
    strategyReady: boolean;
    status: "ready" | "needs-review" | "blocked";
    blockingFindings: QaFinding[];
    materialGaps: QaFinding[];
    summary: string;
  };
  engineInputs: DerivedEngineInputs;
  evidenceLog: QaEvidenceEntry[];
  approvalGate: string[];
  extensionPoints: string[];
}

export function evaluateClientIntake(context: ClientIntakeContext): ClientIntakeRecord {
  const intakeId = context.intakeId ?? "[Intake ID]";
  const projectName = context.projectName ?? "[Project Name]";
  const reviewer = context.reviewer ?? "[Reviewer Name]";
  const intakeDate = context.intakeDate ?? "[Intake Date]";

  const sections: { area: QaArea; source: string; findings: QaFinding[] }[] = [
    { area: "intake-identity", source: "Business identity", findings: identityFindings(context.businessIdentity) },
    { area: "intake-contacts", source: "Contacts and approval authority", findings: contactsFindings(context.contacts) },
    { area: "intake-services", source: "Services and products", findings: servicesFindings(context.servicesAndProducts) },
    { area: "intake-locations", source: "Locations and business model", findings: locationsFindings(context.locations) },
    { area: "intake-audience-goals", source: "Audience and goals", findings: audienceGoalsFindings(context.audienceAndGoals) },
    { area: "intake-brand-design", source: "Brand voice and design preferences", findings: brandDesignFindings(context.brandVoiceAndDesign) },
    { area: "intake-external-presence", source: "Existing external presence", findings: externalPresenceFindings(context.externalPresence) },
    { area: "intake-trust-claims", source: "Approved claims and trust signals", findings: trustClaimsFindings(context.trustAndClaims) },
    { area: "intake-languages-competitors", source: "Languages and competitors", findings: languagesCompetitorsFindings(context.languagesAndCompetitors) },
    { area: "intake-pages-content", source: "Required pages and content priorities", findings: pagesContentFindings(context.pagesAndContent) },
    { area: "intake-strategy-priorities", source: "SEO, local SEO, AI visibility, blog, and advertising priorities", findings: strategyPrioritiesFindings(context.strategyPriorities) },
    { area: "intake-compliance", source: "Compliance and prohibited claims", findings: complianceFindings(context.compliance, context.trustAndClaims) },
    { area: "intake-permissions", source: "Publishing, deployment, and external-service permissions", findings: permissionsFindings(context.permissions, context.contacts) },
  ];

  const findings = sections.flatMap((s) => s.findings);
  const areaScores = sections.map((s) => ({ area: s.area, score: scoreForFindings(s.findings) }));

  const blockingFindings = findings.filter((f) => f.status === "blocked");
  const materialGaps = findings.filter((f) => f.status === "fail");

  const rawOverallScore = Math.round(areaScores.reduce((sum, entry) => sum + entry.score, 0) / Math.max(areaScores.length, 1));
  const overallScore = blockingFindings.length > 0 ? Math.min(rawOverallScore, 39) : rawOverallScore;

  const strategyReady = blockingFindings.length === 0 && materialGaps.length === 0;
  const status: "ready" | "needs-review" | "blocked" = blockingFindings.length > 0 ? "blocked" : materialGaps.length > 0 ? "needs-review" : "ready";

  const followUpQuestions = [...blockingFindings, ...materialGaps].map((f) => f.recommendedAction);

  const evidenceLog: QaEvidenceEntry[] = sections.map((s) => ({
    area: s.area,
    source: s.source,
    status: s.findings.some((f) => f.status === "blocked") ? "blocked" : s.findings.some((f) => f.status !== "pass") ? "warning" : "pass",
    score: scoreForFindings(s.findings),
    recordedAt: intakeDate,
  }));

  return {
    intakeId,
    projectName,
    reviewer,
    intakeDate,
    findings: [...findings].sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity)),
    areaScores,
    overallScore,
    confirmationSummary: buildConfirmationSummary(context),
    followUpQuestions,
    contradictions: blockingFindings,
    readinessDecision: {
      strategyReady,
      status,
      blockingFindings,
      materialGaps,
      summary: strategyReady
        ? "All required information has been confirmed and no contradictions remain. Strategy and implementation may begin."
        : blockingFindings.length > 0
          ? `${blockingFindings.length} contradiction(s) must be resolved before strategy or implementation can begin.`
          : `${materialGaps.length} required item(s) still need client confirmation before strategy or implementation can begin.`,
    },
    engineInputs: buildEngineInputs(context),
    evidenceLog,
    approvalGate: [
      "Intake summary reviewed with the client",
      "All required fields confirmed or explicitly deferred with a documented reason",
      "No contradictions remain unresolved",
      "Publishing, deployment, DNS, analytics, and external-service permissions explicitly recorded",
      "Final intake sign-off recorded before strategy or implementation begins",
    ],
    extensionPoints: [
      "Prepared for future Orchestration coordination across the full engine set",
      "Prepared for future Deployment gate integration",
      "Prepared for future Maintenance re-intake cadence",
      "Prepared for a future mobile dashboard intake experience",
    ],
  };
}

// ---------------------------------------------------------------------------
// Questionnaire
// ---------------------------------------------------------------------------

export interface IntakeQuestion {
  id: string;
  section: string;
  question: string;
  required: boolean;
  repeatable?: boolean;
}

export interface IntakeQuestionnaire {
  questions: IntakeQuestion[];
  followUpPolicy: string[];
}

export function buildIntakeQuestionnaire(): IntakeQuestionnaire {
  return {
    questions: [
      { id: INTAKE_FIELD_IDS.identity.brandName, section: "Business identity", question: "What is the business's brand name or preferred public name?", required: true },
      { id: INTAKE_FIELD_IDS.identity.legalName, section: "Business identity", question: "What is the business's legal name?", required: false },
      { id: INTAKE_FIELD_IDS.identity.preferredPublicName, section: "Business identity", question: "Is there a preferred public-facing name different from the brand name?", required: false },
      { id: INTAKE_FIELD_IDS.identity.entityType, section: "Business identity", question: "What type of legal entity is this business (for example, LLC or sole proprietor)?", required: false },
      { id: "contacts.contact", section: "Contacts", question: "Who are the primary contacts for this project, and what is each person's role?", required: true, repeatable: true },
      { id: INTAKE_FIELD_IDS.contacts.approvalAuthorityConfirmed, section: "Contacts", question: "Has approval authority been confirmed, and who holds it?", required: true },
      { id: INTAKE_FIELD_IDS.services.services, section: "Services and products", question: "What services does the business offer?", required: true },
      { id: INTAKE_FIELD_IDS.services.products, section: "Services and products", question: "What products, if any, does the business offer?", required: false },
      { id: INTAKE_FIELD_IDS.locations.businessModel, section: "Locations and business model", question: "Is this business a storefront, a single location, a service-area business, multi-location, or online-only?", required: true },
      { id: INTAKE_FIELD_IDS.locations.primaryLocation, section: "Locations and business model", question: "What is the primary business location?", required: true },
      { id: INTAKE_FIELD_IDS.locations.additionalLocations, section: "Locations and business model", question: "Are there additional locations?", required: false },
      { id: INTAKE_FIELD_IDS.locations.serviceAreas, section: "Locations and business model", question: "What service areas does the business cover?", required: false },
      { id: INTAKE_FIELD_IDS.audienceGoals.targetAudiences, section: "Audience and goals", question: "Who is the target audience for this website?", required: true },
      { id: INTAKE_FIELD_IDS.audienceGoals.primaryGoal, section: "Audience and goals", question: "What is the single primary goal for this website?", required: true },
      { id: INTAKE_FIELD_IDS.audienceGoals.secondaryGoals, section: "Audience and goals", question: "Are there secondary goals?", required: false },
      { id: INTAKE_FIELD_IDS.audienceGoals.conversionPriorities, section: "Audience and goals", question: "What conversion actions should be prioritized (call, form, booking, directions)?", required: false },
      { id: INTAKE_FIELD_IDS.brandDesign.brandVoice, section: "Brand voice and design", question: "How would you describe the brand's voice and tone?", required: false },
      { id: INTAKE_FIELD_IDS.brandDesign.toneNotes, section: "Brand voice and design", question: "Are there specific tone notes to follow or avoid?", required: false },
      { id: INTAKE_FIELD_IDS.brandDesign.designPreferences, section: "Brand voice and design", question: "Are there specific design preferences?", required: false },
      { id: INTAKE_FIELD_IDS.brandDesign.inspirationReferences, section: "Brand voice and design", question: "Are there design references or sites you like for inspiration?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.existingWebsiteUrl, section: "Existing presence", question: "Is there an existing website? If so, what is the URL?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.googleBusinessProfileUrl, section: "Existing presence", question: "Is there an existing Google Business Profile? If so, what is the URL?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.socialProfiles, section: "Existing presence", question: "What social media profiles does the business use?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.analyticsPlatforms, section: "Existing presence", question: "What analytics platforms, if any, are currently in use?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.adsPlatforms, section: "Existing presence", question: "What advertising platforms, if any, are currently in use?", required: false },
      { id: INTAKE_FIELD_IDS.externalPresence.otherPlatforms, section: "Existing presence", question: "Are there any other external platforms in use?", required: false },
      { id: "trust-claims.claim", section: "Approved claims and trust signals", question: "What credentials, awards, reviews, guarantees, or other trust signals can be confirmed for use?", required: false, repeatable: true },
      { id: INTAKE_FIELD_IDS.languagesCompetitors.languages, section: "Languages and competitors", question: "What languages should the site support?", required: false },
      { id: INTAKE_FIELD_IDS.languagesCompetitors.competitors, section: "Languages and competitors", question: "Who are the business's main competitors?", required: false },
      { id: INTAKE_FIELD_IDS.pagesContent.requiredPages, section: "Pages and content priorities", question: "What pages does the site need?", required: true },
      { id: INTAKE_FIELD_IDS.pagesContent.contentPriorities, section: "Pages and content priorities", question: "What content should be prioritized first?", required: false },
      { id: INTAKE_FIELD_IDS.strategyPriorities.seoPriorities, section: "Strategy priorities", question: "What are the SEO priorities?", required: false },
      { id: INTAKE_FIELD_IDS.strategyPriorities.localSeoPriorities, section: "Strategy priorities", question: "What are the local SEO priorities?", required: false },
      { id: INTAKE_FIELD_IDS.strategyPriorities.aiVisibilityPriorities, section: "Strategy priorities", question: "What are the AI visibility priorities?", required: false },
      { id: INTAKE_FIELD_IDS.strategyPriorities.blogPriorities, section: "Strategy priorities", question: "What are the blog priorities?", required: false },
      { id: INTAKE_FIELD_IDS.strategyPriorities.advertisingPriorities, section: "Strategy priorities", question: "What are the advertising priorities?", required: false },
      { id: INTAKE_FIELD_IDS.compliance.prohibitedClaims, section: "Compliance", question: "Are there any claims that must never be used?", required: false },
      { id: INTAKE_FIELD_IDS.compliance.complianceSensitivities, section: "Compliance", question: "Are there compliance sensitivities to be aware of (for example, medical or legal)?", required: false },
      { id: INTAKE_FIELD_IDS.permissions.publishingApproved, section: "Permissions", question: "Is publishing approved?", required: true },
      { id: INTAKE_FIELD_IDS.permissions.deploymentApproved, section: "Permissions", question: "Is deployment approved?", required: true },
      { id: INTAKE_FIELD_IDS.permissions.dnsChangesApproved, section: "Permissions", question: "Are DNS changes approved?", required: true },
      { id: INTAKE_FIELD_IDS.permissions.analyticsInstallApproved, section: "Permissions", question: "Is analytics installation approved?", required: true },
      { id: INTAKE_FIELD_IDS.permissions.externalServiceConnectionsApproved, section: "Permissions", question: "Are external service connections approved?", required: true },
    ],
    followUpPolicy: [
      "Ask every question above in one structured intake session where practical.",
      "Only return with follow-up questions for fields that are missing, unknown, or contradictory and are marked required — never for optional fields.",
      "Never ask the client to re-confirm a field that is already client-confirmed unless the underlying fact may have changed.",
      "When a required field is only supported by public research, ask the client to confirm it rather than treating the research as approved.",
    ],
  };
}
