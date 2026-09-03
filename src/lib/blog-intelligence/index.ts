import type { AiVisibilityBlueprint } from "@/lib/ai-visibility";
import type { ContentIntelligenceBlueprint } from "@/lib/content-intelligence";
import type { IndustryKnowledgeBlueprint } from "@/lib/industry-knowledge";
import type { LocalSeoBlueprint } from "@/lib/local-seo";
import type { SeoIntelligenceBlueprint } from "@/lib/seo/intelligence";

export type BlogContentType = "evergreen" | "timely" | "mixed";
export type BlogFunnelStage = "awareness" | "consideration" | "decision" | "retention";

export interface BlogIntelligenceContext {
  topic?: string;
  primaryGoal?: string;
  audience?: string;
  funnelStage?: BlogFunnelStage;
  pillarTopic?: string;
  supportingTopics?: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  entities?: string[];
  contentType?: BlogContentType;
  localRelevance?: boolean;
  localContext?: string;
  contentBlueprint?: ContentIntelligenceBlueprint;
  seoBlueprint?: SeoIntelligenceBlueprint;
  aiBlueprint?: AiVisibilityBlueprint;
  localSeoBlueprint?: LocalSeoBlueprint;
  industryBlueprint?: IndustryKnowledgeBlueprint;
  internalLinks?: string[];
  sourceNotes?: string[];
  evidenceLinks?: string[];
  faqQuestions?: string[];
  imageNotes?: string[];
  updateCadence?: string;
  existingArticles?: string[];
  repurposingChannels?: string[];
}

export interface BlogIntelligenceBlueprint {
  topic: string;
  primaryGoal: string;
  audience: string;
  funnelStage: BlogFunnelStage;
  contentType: BlogContentType;
  editorialStrategy: string[];
  topicClusters: string[];
  keywordAndIntentMapping: string[];
  audienceAndFunnelAlignment: string[];
  articleBrief: string[];
  titlePlanning: string[];
  articleStructure: string[];
  writingGuidance: string[];
  factVerification: string[];
  internalLinking: string[];
  schemaRecommendations: string[];
  faqOpportunities: string[];
  imageAndFeaturedImageGuidance: string[];
  metadataAndCanonical: string[];
  localRelevance: string[];
  aiVisibility: string[];
  overlapAndCannibalization: string[];
  freshnessAndUpdatePlanning: string[];
  repurposingOpportunities: string[];
  reviewChecklist: string[];
  approvalGate: string[];
  extensionPoints: string[];
}

export interface BlogReviewEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export interface BlogReviewInput {
  headline?: string;
  outline?: string[];
  sources?: string[];
  internalLinks?: string[];
  faqQuestions?: string[];
  facts?: string[];
  updateCadence?: string;
  localRelevance?: boolean;
}

export function buildBlogIntelligenceBlueprint(context: BlogIntelligenceContext): BlogIntelligenceBlueprint {
  const topic = context.topic ?? "[Blog Topic]";
  const primaryGoal = context.primaryGoal ?? "Help the reader understand a useful topic clearly";
  const audience = context.audience ?? "The intended audience for the article";
  const funnelStage = context.funnelStage ?? "awareness";
  const contentType = context.contentType ?? "evergreen";
  const primaryKeyword = context.primaryKeyword ?? "[Primary Keyword]";
  const supportingTopics = context.supportingTopics ?? ["[Supporting topic]"];
  const localRelevance = context.localRelevance ?? false;

  const contentGuidance = context.contentBlueprint
    ? [
        `Align with the content blueprint goal: ${context.contentBlueprint.primaryGoal}`,
        `Keep the approved brand voice: ${context.contentBlueprint.brandVoice}`,
      ]
    : [];

  const seoGuidance = context.seoBlueprint
    ? [
        `Use the SEO blueprint keyword intent: ${context.seoBlueprint.primaryKeyword}`,
        `Preserve the planned heading and schema structure`,
      ]
    : [];

  const aiGuidance = context.aiBlueprint
    ? [
        `Keep the article readable for both users and AI systems`,
        `Use the same entity names and evidence structure from the AI visibility plan`,
      ]
    : [];

  const localGuidance = context.localSeoBlueprint
    ? [
        `Keep local references aligned with the local SEO blueprint for ${context.localSeoBlueprint.businessName}`,
        `Do not expand service areas or locations beyond approved evidence`,
      ]
    : [];

  const industryGuidance =
    context.industryBlueprint && context.industryBlueprint.matchedProfile
      ? [
          `Consider industry-general topic angles for ${context.industryBlueprint.industryName}, pending client confirmation`,
          `Draw candidate FAQ questions from the industry knowledge blueprint's common questions before finalizing the brief`,
        ]
      : [];

  return {
    topic,
    primaryGoal,
    audience,
    funnelStage,
    contentType,
    editorialStrategy: [
      "Start with a clear reader question, problem, or decision point.",
      "Choose an editorial angle that matches the business context and the intended audience.",
      "Keep the plan grounded in research, approved terminology, and real business relevance.",
      ...contentGuidance,
    ],
    topicClusters: [
      `Position ${topic} as a pillar topic with supporting coverage around ${supportingTopics.join(", ")}.`,
      "Group related articles by topic cluster so the content ecosystem remains easy to understand.",
      "Separate evergreen guidance from timely updates so each article has a clear purpose.",
      ...industryGuidance,
    ],
    keywordAndIntentMapping: [
      `Map the primary keyword ${primaryKeyword} to the article’s main search intent.`,
      "Support the primary topic with secondary terms that answer adjacent questions.",
      "Avoid keyword stuffing and keep the language natural for the reader.",
      ...seoGuidance,
    ],
    audienceAndFunnelAlignment: [
      `Match the article to the audience ${audience} at the ${funnelStage} stage.`,
      "Use the article to inform, reassure, or guide the reader toward the next useful action.",
      "Avoid turning every article into a hard sell when a helpful explanation is more appropriate.",
    ],
    articleBrief: [
      "Create a brief that states the core question, the target reader, the evidence to include, and the intended CTA.",
      "Note the approved source material and any pending information that needs owner confirmation.",
      "Keep the brief specific enough to guide drafting without over-prescribing the final wording.",
    ],
    titlePlanning: [
      "Draft a title that reflects the article’s core question and remains specific to the topic.",
      "If the article targets a search query, keep the title aligned with the intended search intent.",
      "Avoid clickbait, unsupported claims, or dramatic phrasing that is not backed by evidence.",
    ],
    articleStructure: [
      "Open with a concise answer or summary before expanding into explanation and detail.",
      "Use a simple hierarchy with an H2 for each supporting section and an H3 when more detail is needed.",
      "End with a natural next step such as contact, service context, or a relevant related article.",
      ...seoGuidance,
    ],
    writingGuidance: [
      "Write in a natural, client-specific voice that sounds grounded and useful.",
      "Favor concrete details, plain language, and varied sentence rhythm over repetitive AI phrases.",
      "Avoid generic filler, exaggerated claims, and broad superiority language.",
      ...contentGuidance,
    ],
    factVerification: [
      "Use public research or approved client materials as the source of truth.",
      "Require owner approval before using business-specific claims, statistics, or examples.",
      "Keep placeholders for missing information instead of filling gaps with assumptions.",
      ...aiGuidance,
    ],
    internalLinking: [
      "Link to the most relevant service, location, contact, or related article page when the relationship is clear.",
      "Use descriptive anchor text that matches the destination and reader intent.",
      "Avoid over-linking or using the same generic anchor text repeatedly.",
      ...(context.internalLinks ? [`Prioritize these internal links: ${context.internalLinks.join(", ")}`] : []),
    ],
    schemaRecommendations: [
      "Recommend article or FAQ schema only when the visible content supports it.",
      "Keep schema recommendations aligned with the article’s actual sections and content.",
      "Use structured data to reinforce clear facts rather than duplicate the page content verbatim.",
      ...seoGuidance,
    ],
    faqOpportunities: [
      "Identify FAQs that answer likely reader questions before the article is published.",
      "Prioritize questions that reflect real user intent, local relevance, or common confusion.",
      ...(context.faqQuestions ? [`Suggested questions: ${context.faqQuestions.join(", ")}`] : []),
      ...(context.industryBlueprint?.commonQuestionsGuidance ?? []),
    ],
    imageAndFeaturedImageGuidance: [
      "Use featured and supporting imagery only when it adds factual or editorial value.",
      "Provide alt text that describes the real subject of the image rather than repeating the article title.",
      "Avoid generic stock imagery that does not support the article’s purpose.",
      ...(context.imageNotes ? [`Image notes: ${context.imageNotes.join(", ")}`] : []),
    ],
    metadataAndCanonical: [
      "Use a descriptive title and meta description that reflect the article’s actual content.",
      "Keep metadata focused on the article’s question, audience, and intended action.",
      "Use a canonical URL for the preferred version of the article and avoid duplicate intent.",
    ],
    localRelevance: [
      "Use local relevance only when it is supported by approved facts and the article’s purpose.",
      "If the article is local, tie it to confirmed locations, service areas, or city context only where appropriate.",
      "Avoid broad geographic claims that are not verified.",
      ...(localRelevance && context.localContext ? [`Local context: ${context.localContext}`] : []),
      ...localGuidance,
    ],
    aiVisibility: [
      "Write the article so it can be summarized clearly by AI systems without losing the core answer.",
      "Keep entity names, service names, and page intent consistent across the article.",
      "Use short sections and direct answers to make the article easier to understand and reuse.",
      ...aiGuidance,
    ],
    overlapAndCannibalization: [
      "Check whether the article overlaps too heavily with another page or article on the same topic.",
      "Differentiate the article by audience, funnel stage, service focus, or local angle where relevant.",
      "Avoid publishing near-duplicate articles without a clear reason.",
      ...(context.existingArticles ? [`Existing articles to review: ${context.existingArticles.join(", ")}`] : []),
    ],
    freshnessAndUpdatePlanning: [
      "Plan evergreen content for depth and long-term usefulness.",
      "Plan timely content with a review date, update notes, or a clear expiry plan.",
      "Keep updates factual and tied to verified changes rather than trend-chasing language.",
      ...(context.updateCadence ? [`Update cadence: ${context.updateCadence}`] : []),
    ],
    repurposingOpportunities: [
      "Turn the article into a short FAQ, social post, email, or service-page summary when the content still fits.",
      "Extract one practical insight for a newsletter or support page when appropriate.",
      ...(context.repurposingChannels ? [`Recommended channels: ${context.repurposingChannels.join(", ")}`] : []),
    ],
    reviewChecklist: [
      "Verify the article’s question, audience, angle, and CTA all match the plan.",
      "Check that facts are supported by public research or owner approval.",
      "Confirm the article structure, internal links, metadata, and FAQ strategy are coherent.",
    ],
    approvalGate: [
      "Blog strategy approved",
      "Research and source notes reviewed",
      "Fact verification complete or clearly pending",
      "Title and structure reviewed",
      "Internal links and metadata reviewed",
      "Final blog review before publish",
    ],
    extensionPoints: [
      "Prepared for future Reviewer guidance",
      "Prepared for future Client Intake workflows",
      "Prepared for future Orchestration and publishing coordination",
    ],
  };
}

export function evaluateBlogReview(input: BlogReviewInput): BlogReviewEvaluation {
  const headline = input.headline?.trim() ?? "";
  const outline = input.outline?.filter(Boolean) ?? [];
  const sources = input.sources?.filter(Boolean) ?? [];
  const internalLinks = input.internalLinks?.filter(Boolean) ?? [];
  const faqQuestions = input.faqQuestions?.filter(Boolean) ?? [];
  const facts = input.facts?.filter(Boolean) ?? [];
  const updateCadence = input.updateCadence?.trim() ?? "";
  const localRelevance = input.localRelevance ?? false;

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (headline.length > 0) {
    strengths.push("The article has a clear headline or working title.");
  }

  if (outline.length >= 2) {
    strengths.push("The article includes a usable outline with multiple sections.");
  }

  if (sources.length > 0) {
    strengths.push("The article includes source notes or evidence references.");
  }

  if (internalLinks.length > 0) {
    strengths.push("The article includes internal links for context and navigation.");
  }

  if (faqQuestions.length > 0) {
    strengths.push("The article includes FAQ-style question coverage.");
  }

  if (facts.length === 0) {
    warnings.push("Add concrete factual points that can be verified or approved before publication.");
  }

  if (sources.length === 0) {
    warnings.push("Add source notes or evidence links for important claims.");
  }

  if (updateCadence.length === 0) {
    warnings.push("Add a refresh or update plan for content that may change over time.");
  }

  if (localRelevance && internalLinks.length === 0) {
    warnings.push("Add local or service-area links when the topic is meant to support local intent.");
  }

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: BlogReviewEvaluation["status"] = warnings.length > 2 ? "review" : warnings.length > 0 ? "review" : "ready";

  notes.push("Review the article as both a user-facing explanation and a machine-readable source of truth.");

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
