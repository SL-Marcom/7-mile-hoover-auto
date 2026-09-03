import type { ContentIntelligenceBlueprint } from "@/lib/content-intelligence";
import type { SeoIntelligenceBlueprint } from "@/lib/seo/intelligence";

export interface AiVisibilityContext {
  pageTitle?: string;
  pagePurpose?: string;
  businessEntity?: string;
  serviceEntities?: string[];
  locationEntities?: string[];
  personEntities?: string[];
  contentBlueprint?: ContentIntelligenceBlueprint;
  seoBlueprint?: SeoIntelligenceBlueprint;
  sourceNotes?: string[];
  evidenceLinks?: string[];
  faqQuestions?: string[];
  updateSignals?: string[];
}

export interface AiVisibilityBlueprint {
  pageTitle: string;
  pagePurpose: string;
  answerFirstStructure: string[];
  entityClarity: string[];
  entityRelationships: string[];
  factualContent: string[];
  sourceRequirements: string[];
  faqStrategy: string[];
  conciseSummary: string[];
  semanticCoverage: string[];
  pageStructure: string[];
  structuredDataRecommendations: string[];
  knowledgeConsistency: string[];
  freshnessSignals: string[];
  unsupportedClaimDetection: string[];
  reviewChecklist: string[];
  approvalGate: string[];
}

export interface AiVisibilityReviewEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export interface AiVisibilityReviewInput {
  summary?: string;
  facts?: string[];
  entities?: string[];
  sources?: string[];
  faqQuestions?: string[];
  updateSignals?: string[];
}

export function buildAiVisibilityBlueprint(context: AiVisibilityContext): AiVisibilityBlueprint {
  const pageTitle = context.pageTitle ?? "[Page Title]";
  const pagePurpose = context.pagePurpose ?? "Answer the user’s primary question clearly";
  const businessEntity = context.businessEntity ?? "[Business Name]";
  const locationEntities = context.locationEntities ?? ["[Location]"];
  const personEntities = context.personEntities ?? ["[Person Name]"];

  const contentGuidance = context.contentBlueprint
    ? [
        `Use the content blueprint goal: ${context.contentBlueprint.primaryGoal}`,
        `Stay aligned with the approved voice: ${context.contentBlueprint.brandVoice}`,
      ]
    : [];

  const seoGuidance = context.seoBlueprint
    ? [
        `Reuse the SEO blueprint intent: ${context.seoBlueprint.primaryKeyword}`,
        `Keep the page structure aligned with the planned heading hierarchy`,
      ]
    : [];

  return {
    pageTitle,
    pagePurpose,
    answerFirstStructure: [
      "Open with the most direct answer to the page’s main question.",
      "Keep the introduction brief and useful before expanding into supporting detail.",
      ...contentGuidance,
    ],
    entityClarity: [
      "Name the business entity clearly and consistently.",
      "Use service entities and location entities in a stable way across the page.",
      "Introduce person entities only when they are relevant and verified.",
    ],
    entityRelationships: [
      `Define the relationship between ${businessEntity} and the service entities clearly.`,
      `Link location entities such as ${locationEntities.join(", ")} to the business context when confirmed.`,
      `Use person entities such as ${personEntities.join(", ")} only when the page content supports them.`,
    ],
    factualContent: [
      "Write content that can be cited and verified without relying on speculation.",
      "Keep claims concrete and clearly tied to approved facts.",
      "Separate verified details from placeholders and pending review items.",
    ],
    sourceRequirements: [
      "Record the source or evidence behind critical claims.",
      ...(context.sourceNotes ? [`Source notes: ${context.sourceNotes.join(", ")}`] : []),
      ...(context.evidenceLinks ? [`Evidence links: ${context.evidenceLinks.join(", ")}`] : []),
    ],
    faqStrategy: [
      "Use FAQs to answer common questions directly and clearly.",
      "Prioritize questions that reflect real user intent.",
      ...(context.faqQuestions ? [`Suggested questions: ${context.faqQuestions.join(", ")}`] : []),
    ],
    conciseSummary: [
      "Provide a short summary or answer block before deeper detail when useful.",
      "Keep summaries direct and easy to quote.",
      "Avoid vague promotional language in summary sections.",
    ],
    semanticCoverage: [
      "Cover the essential topic areas that a user or AI system would expect to find.",
      "Group related information into manageable sections.",
      "Avoid leaving important questions unanswered.",
    ],
    pageStructure: [
      "Use clear headings and short sections that support skimming.",
      "Keep the page structure predictable for both users and AI systems.",
      ...seoGuidance,
    ],
    structuredDataRecommendations: [
      "Recommend schema that matches the visible page structure and content.",
      "Use structured data to reinforce clear facts rather than duplicate the content verbatim.",
      "Keep recommendations aligned with the SEO blueprint and page purpose.",
    ],
    knowledgeConsistency: [
      "Keep entity names, service names, and page topics consistent across the page.",
      "Avoid conflicting facts or alternate naming that could confuse summarization.",
      "Use the same terminology that appears in the approved content and metadata.",
    ],
    freshnessSignals: [
      "Add update signals when the topic or offer changes over time.",
      ...(context.updateSignals ? [`Update signals: ${context.updateSignals.join(", ")}`] : []),
      "Keep review dates or change notes simple and factual.",
    ],
    unsupportedClaimDetection: [
      "Flag unsupported claims, broad guarantees, and vague superiority language.",
      "Treat uncertain claims as review items rather than approved facts.",
      "Do not imply endorsements or outcomes that are not verified.",
    ],
    reviewChecklist: [
      "Confirm the page answers the main question clearly.",
      "Check that facts are supported by source notes or approved evidence.",
      "Review entity naming and relationships for consistency.",
    ],
    approvalGate: [
      "AI visibility scope approved",
      "Source evidence reviewed",
      "Entity clarity confirmed",
      "FAQ strategy reviewed",
      "Structured data recommendations reviewed",
      "Final AI visibility review before publish",
    ],
  };
}

export function evaluateAiVisibilityReview(input: AiVisibilityReviewInput): AiVisibilityReviewEvaluation {
  const summary = input.summary?.trim() ?? "";
  const facts = input.facts?.filter(Boolean) ?? [];
  const entities = input.entities?.filter(Boolean) ?? [];
  const sources = input.sources?.filter(Boolean) ?? [];
  const faqQuestions = input.faqQuestions?.filter(Boolean) ?? [];
  const updateSignals = input.updateSignals?.filter(Boolean) ?? [];

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (summary.length > 0) {
    strengths.push("A concise summary is present.");
  }

  if (facts.length > 0) {
    strengths.push("The content includes factual points that can be reviewed.");
  }

  if (entities.length > 0) {
    strengths.push("The page includes clear entity references.");
  }

  if (sources.length > 0) {
    strengths.push("The content includes source or evidence notes.");
  }

  if (faqQuestions.length > 0) {
    strengths.push("The page includes FAQ-style question coverage.");
  }

  if (updateSignals.length === 0) {
    warnings.push("Add a simple freshness or update signal if the topic may change over time.");
  }

  if (sources.length === 0) {
    warnings.push("Add source notes or evidence links for important factual claims.");
  }

  if (facts.length === 0) {
    warnings.push("Add concrete factual points that are easy to verify and summarize.");
  }

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: AiVisibilityReviewEvaluation["status"] = warnings.length > 2 ? "review" : warnings.length > 0 ? "review" : "ready";

  notes.push("Review the page as both a user experience and a machine-readable answer source.");

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
