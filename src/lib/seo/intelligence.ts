import type { ContentIntelligenceBlueprint } from "@/lib/content-intelligence";

export type SeoFocusArea =
  | "technical-seo"
  | "on-page-seo"
  | "search-intent"
  | "entity-optimization"
  | "semantic-structure"
  | "internal-linking"
  | "metadata"
  | "heading-hierarchy"
  | "canonical-strategy"
  | "sitemap-planning"
  | "schema-planning"
  | "image-seo"
  | "overlap-detection"
  | "review-checklist";

export interface SeoIntelligenceContext {
  pageTitle?: string;
  pageType?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  entities?: string[];
  targetAudience?: string;
  primaryGoal?: string;
  contentBlueprint?: ContentIntelligenceBlueprint;
  internalLinks?: string[];
  existingPages?: string[];
  canonicalUrl?: string;
  imageAltText?: string[];
  schemaTypes?: string[];
}

export interface SeoIntelligenceBlueprint {
  pageTitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  entities: string[];
  technicalSeo: string[];
  onPageSeo: string[];
  searchIntentAlignment: string[];
  entityOptimization: string[];
  semanticStructure: string[];
  internalLinkStrategy: string[];
  metadataStandards: string[];
  headingHierarchy: string[];
  canonicalStrategy: string[];
  sitemapPlanning: string[];
  schemaPlanning: string[];
  imageSeo: string[];
  overlapDetection: string[];
  reviewChecklist: string[];
  approvalGate: string[];
}

export interface SeoReviewEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export interface SeoReviewInput {
  title?: string;
  description?: string;
  headings?: string[];
  keywords?: string[];
  entities?: string[];
  internalLinks?: string[];
  canonicalUrl?: string;
  schemaTypes?: string[];
  imageAltText?: string[];
}

export function buildSeoIntelligenceBlueprint(context: SeoIntelligenceContext): SeoIntelligenceBlueprint {
  const pageTitle = context.pageTitle ?? "[Page Title]";
  const primaryKeyword = context.primaryKeyword ?? "[Primary Keyword]";
  const secondaryKeywords = context.secondaryKeywords ?? ["[Secondary Keyword]"];
  const entities = context.entities ?? ["[Business Name]", "[Service Name]"];
  const contentBlueprint = context.contentBlueprint;

  const inheritedGuidance = contentBlueprint
    ? [
        `Align with content blueprint goal: ${contentBlueprint.primaryGoal}`,
        `Use the approved brand voice: ${contentBlueprint.brandVoice}`,
      ]
    : [];

  return {
    pageTitle,
    primaryKeyword,
    secondaryKeywords,
    entities,
    technicalSeo: [
      "Preserve a clear URL structure and a logical page hierarchy.",
      "Ensure the page can be crawled and rendered with clean page markup.",
      "Keep the content structure consistent with the site’s navigation and page map.",
      ...inheritedGuidance,
    ],
    onPageSeo: [
      "Use the primary keyword naturally in the title, headings, intro, and body where it supports clarity.",
      "Keep the copy focused on the page’s main intent rather than forcing repetition.",
      "Make the page useful and scannable for first-time visitors.",
    ],
    searchIntentAlignment: [
      "Match the page to the intent behind the target query.",
      "Use the page structure to answer the likely user question directly.",
      "Keep the CTA aligned with the visitor’s likely next action.",
    ],
    entityOptimization: [
      "Use the business name, service names, and relevant location references consistently.",
      "Keep entity names aligned with the visible page copy and any structured data.",
      "Avoid mixing synonyms that could confuse the page’s topic.",
    ],
    semanticStructure: [
      "Use a logical heading hierarchy with one clear H1 and supporting H2/H3 sections.",
      "Group related ideas into clear sections that support skimming and summarization.",
      "Keep the content easy for both users and AI systems to understand.",
    ],
    internalLinkStrategy: [
      "Link to related service, location, or contact pages when the connection is clear.",
      "Use descriptive anchor text instead of generic phrases.",
      ...(context.internalLinks ? [`Prioritize these internal links: ${context.internalLinks.join(", ")}`] : []),
    ],
    metadataStandards: [
      "Use a descriptive title that reflects the primary keyword and page purpose.",
      "Write a concise meta description that matches the page’s actual content.",
      "Keep metadata specific and avoid filler or overstatement.",
    ],
    headingHierarchy: [
      "Start with one clear H1 that reflects the page topic.",
      "Use H2s for major sections and H3s for supporting detail where needed.",
      "Avoid skipping heading levels or using headings purely for decoration.",
    ],
    canonicalStrategy: [
      "Use a canonical URL for the preferred version of the page.",
      "Avoid creating multiple versions of the same page intent without a clear reason.",
      ...(context.canonicalUrl ? [`Preferred canonical URL: ${context.canonicalUrl}`] : []),
    ],
    sitemapPlanning: [
      "Ensure the page is included in the planned site structure if it is meant to be discoverable.",
      "Keep the site hierarchy consistent and easy to navigate.",
      ...(context.existingPages ? [`Cross-check against existing pages: ${context.existingPages.join(", ")}`] : []),
    ],
    schemaPlanning: [
      "Only add schema that matches the visible page content and the page’s purpose.",
      "Use the most relevant structured data types for the page context.",
      ...(context.schemaTypes ? [`Preferred schema types: ${context.schemaTypes.join(", ")}`] : []),
    ],
    imageSeo: [
      "Use descriptive file names and alt text that reflect the real subject of the image.",
      "Avoid decorative images without purpose or context.",
      ...(context.imageAltText ? [`Review alt text examples: ${context.imageAltText.join(", ")}`] : []),
    ],
    overlapDetection: [
      "Check whether the page overlaps too heavily with another page on the same topic.",
      "Differentiate the page by purpose, audience, or service focus.",
      "Avoid repeating nearly identical content across multiple pages without a clear reason.",
    ],
    reviewChecklist: [
      "Confirm the title, description, headings, and content all support the same intent.",
      "Review the internal links and page structure for clarity.",
      "Validate that metadata and schema remain aligned with the visible content.",
    ],
    approvalGate: [
      "SEO scope approved",
      "Primary keyword and intent confirmed",
      "Metadata reviewed",
      "Internal links reviewed",
      "Schema and page structure reviewed",
      "Final SEO review before publish",
    ],
  };
}

export function evaluateSeoReview(input: SeoReviewInput): SeoReviewEvaluation {
  const title = input.title?.trim() ?? "";
  const description = input.description?.trim() ?? "";
  const headings = input.headings?.filter(Boolean) ?? [];
  const keywords = input.keywords?.filter(Boolean) ?? [];
  const entities = input.entities?.filter(Boolean) ?? [];
  const internalLinks = input.internalLinks?.filter(Boolean) ?? [];
  const canonicalUrl = input.canonicalUrl?.trim() ?? "";
  const schemaTypes = input.schemaTypes?.filter(Boolean) ?? [];
  const imageAltText = input.imageAltText?.filter(Boolean) ?? [];

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (title.length > 0) {
    strengths.push("A title is present for the page.");
  }

  if (description.length > 0) {
    strengths.push("A meta description is present for the page.");
  }

  if (headings.length >= 2) {
    strengths.push("The page includes multiple headings to support structure.");
  }

  if (keywords.length > 0) {
    strengths.push("Keyword intent has been identified for the page.");
  }

  if (entities.length > 0) {
    strengths.push("The page includes key entities for the topic.");
  }

  if (internalLinks.length > 0) {
    strengths.push("The page includes internal links for navigation and relevance.");
  }

  if (canonicalUrl.length === 0) {
    warnings.push("Add a canonical URL to avoid ambiguity about the preferred page version.");
  }

  if (schemaTypes.length === 0) {
    warnings.push("Consider adding schema types that align with the page’s visible content.");
  }

  if (imageAltText.length === 0) {
    warnings.push("Add descriptive alt text for meaningful images to support accessibility and image SEO.");
  }

  if (headings.length === 0) {
    warnings.push("Add a clear heading hierarchy so the page structure is easy to parse.");
  }

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: SeoReviewEvaluation["status"] = warnings.length > 2 ? "review" : warnings.length > 0 ? "review" : "ready";

  notes.push("Review metadata, structure, and internal links together to preserve alignment.");

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
