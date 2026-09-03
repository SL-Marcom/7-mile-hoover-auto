import type { AiVisibilityBlueprint } from "@/lib/ai-visibility";
import type { ContentIntelligenceBlueprint } from "@/lib/content-intelligence";
import type { SeoIntelligenceBlueprint } from "@/lib/seo/intelligence";

export type LocalBusinessModel = "storefront" | "service-area" | "multi-location" | "single-location";

export interface LocalSeoContext {
  businessName?: string;
  businessModel?: LocalBusinessModel;
  categories?: string[];
  primaryLocation?: string;
  serviceAreas?: string[];
  locations?: string[];
  businessFactsConfirmed?: boolean;
  ownerConfirmation?: boolean;
  contentBlueprint?: ContentIntelligenceBlueprint;
  seoBlueprint?: SeoIntelligenceBlueprint;
  aiBlueprint?: AiVisibilityBlueprint;
  reviewSignals?: string[];
  citationTargets?: string[];
}

export interface LocalSeoBlueprint {
  businessName: string;
  businessModel: LocalBusinessModel;
  categories: string[];
  primaryLocation: string;
  serviceAreas: string[];
  locations: string[];
  gbpStrategy: string[];
  businessCategoryPlanning: string[];
  napConsistency: string[];
  businessLogic: string[];
  locationPagePlanning: string[];
  localLandingPagePlanning: string[];
  localSearchIntent: string[];
  localEntityConsistency: string[];
  localSchemaRecommendations: string[];
  localInternalLinking: string[];
  localTrustSignals: string[];
  reviewAndReputationStrategy: string[];
  citationPlanning: string[];
  mapAndDirectionsGuidance: string[];
  geoTargeting: string[];
  duplicatePrevention: string[];
  localContentQualityReview: string[];
  localAiVisibility: string[];
  approvalGate: string[];
}

export interface LocalSeoReviewEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export interface LocalSeoReviewInput {
  businessName?: string;
  categories?: string[];
  location?: string;
  serviceAreas?: string[];
  hasLocationPage?: boolean;
  hasDirections?: boolean;
  hasReviewSignals?: boolean;
  hasCitationPlan?: boolean;
  confirmedFacts?: boolean;
}

export function buildLocalSeoBlueprint(context: LocalSeoContext): LocalSeoBlueprint {
  const businessName = context.businessName ?? "[Business Name]";
  const businessModel = context.businessModel ?? "storefront";
  const categories = context.categories ?? ["[Business Category]"];
  const primaryLocation = context.primaryLocation ?? "[Primary Location]";
  const serviceAreas = context.serviceAreas ?? ["[Service Area]"];
  const locations = context.locations ?? [primaryLocation];

  const contentGuidance = context.contentBlueprint
    ? [
        `Use the content blueprint goal: ${context.contentBlueprint.primaryGoal}`,
        `Keep the approved brand voice: ${context.contentBlueprint.brandVoice}`,
      ]
    : [];

  const seoGuidance = context.seoBlueprint
    ? [
        `Align with the SEO blueprint intent: ${context.seoBlueprint.primaryKeyword}`,
        `Maintain the planned heading and schema structure`,
      ]
    : [];

  const aiGuidance = context.aiBlueprint
    ? [
        `Keep entity wording aligned with the AI visibility blueprint`,
        `Preserve the same evidence and summary structure`,
      ]
    : [];

  return {
    businessName,
    businessModel,
    categories,
    primaryLocation,
    serviceAreas,
    locations,
    gbpStrategy: [
      "Use only business facts that have been publicly verified or confirmed by the owner.",
      "Keep GBP details aligned with the live website content and any approved intake materials.",
      "Do not invent categories, hours, services, or attributes.",
      ...contentGuidance,
    ],
    businessCategoryPlanning: [
      "Choose business categories from approved and verifiable information.",
      "Avoid category inflation or generic category stacking that could misrepresent the business.",
      "Prefer a clear primary category and only relevant secondary categories.",
    ],
    napConsistency: [
      "Keep name, address, and phone details consistent across website copy, schema, and any approved local references.",
      "Preserve placeholders when details are still unconfirmed.",
      "Do not assume a phone number, address, or service area if it has not been approved.",
    ],
    businessLogic: [
      "Model storefront businesses differently from service-area businesses.",
      "For service-area businesses, ensure the content clearly explains the service region without overstating coverage.",
      "For multi-location businesses, separate local pages by confirmed location and avoid duplicate content.",
    ],
    locationPagePlanning: [
      "Create location pages only when there is a verified location or a clear local intent to support them.",
      "Make each location page distinct by using confirmed details, clear service context, and local relevance.",
      "Prevent thin or repetitive location pages by keeping them useful and specific.",
    ],
    localLandingPagePlanning: [
      "Use local landing pages to support specific geographic intent when approved.",
      "Focus each landing page on one clear local topic, service, or nearby area.",
      "Avoid combining unrelated locations or services into one generic landing page.",
    ],
    localSearchIntent: [
      "Match the page to the local question the visitor is trying to answer.",
      "Support calls, directions, bookings, and contact paths clearly.",
      "Keep the page structure aligned with the local intent rather than a generic marketing pattern.",
    ],
    localEntityConsistency: [
      "Use the same business, location, and service names across visible content, metadata, and structured data.",
      "Keep the local entity names consistent with the approved content system.",
      ...aiGuidance,
    ],
    localSchemaRecommendations: [
      "Recommend local schema only when the visible content supports it.",
      "Prefer local business or service schema when location and business facts are confirmed.",
      "Avoid over-broad schema that could misrepresent the business.",
      ...seoGuidance,
    ],
    localInternalLinking: [
      "Link nearby service pages, location pages, and contact pages when the relationship is clear.",
      "Use descriptive link text that reflects the local destination.",
      "Avoid linking every page to the same generic anchor text.",
    ],
    localTrustSignals: [
      "Use clear contact paths, directions, and business context when confirmed.",
      "Support the page with verified local details, not generic claims.",
      "Keep trust signals specific and relevant to the user’s local need.",
    ],
    reviewAndReputationStrategy: [
      "Review and reputation strategy should remain factual and approved.",
      "Do not invent review content, star ratings, or reputation claims.",
      "Keep any review or reputation guidance tied to confirmed public information.",
    ],
    citationPlanning: [
      "Plan citations only as a later, approved action and never as an implementation shortcut.",
      "Keep citation planning grounded in verified business details.",
      ...(context.citationTargets ? [`Citation targets: ${context.citationTargets.join(", ")}`] : []),
    ],
    mapAndDirectionsGuidance: [
      "Provide directions or map context only when the business location is confirmed.",
      "Use neutral language that helps the visitor understand how to reach the business.",
      "Avoid implying coverage or access that has not been approved.",
    ],
    geoTargeting: [
      "Use city or neighborhood targeting only when it is supported by approved local context.",
      "Do not overextend geographic targeting beyond confirmed evidence.",
      "Keep the content specific to the intended audience and location.",
    ],
    duplicatePrevention: [
      "Prevent thin or repetitive local pages by distinguishing them by confirmed location, service, or audience need.",
      "Avoid duplicating the same page across multiple locations without meaningful differences.",
      "Use unique local context only where it is verified.",
    ],
    localContentQualityReview: [
      "Review the page for local usefulness, specificity, and clarity.",
      "Keep the content focused on the actual local visitor need.",
      "Do not rely on generic filler or repeated location names.",
    ],
    localAiVisibility: [
      "Write local content so it can be summarized clearly by AI systems.",
      "Keep local details specific, factual, and easy to understand.",
      "Avoid vague local language that could be interpreted too broadly.",
    ],
    approvalGate: [
      "Local SEO scope approved",
      "Business facts verified or clearly marked as pending",
      "Location model confirmed",
      "Service areas reviewed",
      "Local schema and internal linking reviewed",
      "Final local SEO review before publish",
    ],
  };
}

export function evaluateLocalSeoReview(input: LocalSeoReviewInput): LocalSeoReviewEvaluation {
  const businessName = input.businessName?.trim() ?? "";
  const categories = input.categories?.filter(Boolean) ?? [];
  const location = input.location?.trim() ?? "";
  const serviceAreas = input.serviceAreas?.filter(Boolean) ?? [];
  const hasLocationPage = input.hasLocationPage ?? false;
  const hasDirections = input.hasDirections ?? false;
  const hasReviewSignals = input.hasReviewSignals ?? false;
  const hasCitationPlan = input.hasCitationPlan ?? false;
  const confirmedFacts = input.confirmedFacts ?? false;

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (businessName.length > 0) {
    strengths.push("The business name is present for local planning.");
  }

  if (categories.length > 0) {
    strengths.push("Category planning is defined for the business.");
  }

  if (location.length > 0) {
    strengths.push("A primary location is available for local planning.");
  }

  if (serviceAreas.length > 0) {
    strengths.push("Service area context is included in the local plan.");
  }

  if (hasLocationPage) {
    strengths.push("The local plan includes a dedicated location page.");
  }

  if (hasDirections) {
    strengths.push("Directions or map context are part of the local plan.");
  }

  if (!confirmedFacts) {
    warnings.push("Confirm business facts before treating the local plan as ready.");
  }

  if (!hasCitationPlan) {
    warnings.push("Add a citation planning note and keep it grounded in verified details.");
  }

  if (!hasReviewSignals) {
    warnings.push("Add a review or reputation note only if public and approved information is available.");
  }

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: LocalSeoReviewEvaluation["status"] = warnings.length > 2 ? "review" : warnings.length > 0 ? "review" : "ready";

  notes.push("Keep local planning grounded in verified facts, public research, and owner confirmation.");

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
