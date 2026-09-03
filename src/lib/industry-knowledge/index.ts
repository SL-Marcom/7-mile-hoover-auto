import type { AiVisibilityBlueprint } from "@/lib/ai-visibility";
import type { ContentIntelligenceBlueprint } from "@/lib/content-intelligence";
import type { LocalSeoBlueprint } from "@/lib/local-seo";
import type { SeoIntelligenceBlueprint } from "@/lib/seo/intelligence";

export type ComplianceSensitivity = "standard" | "elevated";

export interface IndustryProfile {
  id: string;
  name: string;
  keywords: string[];
  tone: string;
  emphasis: string;
  terminology: string[];
  typicalServices: string[];
  commonQuestions: string[];
  trustSignals: string[];
  complianceSensitivity: ComplianceSensitivity;
  seasonalPatterns: string[];
}

/**
 * Reusable industry profiles: general category knowledge only, never client facts.
 * Every field here is a suggestion for the team to confirm, not an approved claim.
 */
export const industryProfiles: Record<string, IndustryProfile> = {
  medical: {
    id: "medical",
    name: "Medical",
    keywords: ["medical", "clinic", "doctor", "physician", "health", "wellness", "patient"],
    tone: "professional",
    emphasis: "trust",
    terminology: ["patient", "provider", "appointment", "treatment", "consultation"],
    typicalServices: ["Consultations", "Treatment plans", "Follow-up care"],
    commonQuestions: ["What conditions do you treat?", "Do you accept new patients?", "What should I bring to my first visit?"],
    trustSignals: ["Clear provider credentials", "Patient privacy commitment", "Simple appointment path"],
    complianceSensitivity: "elevated",
    seasonalPatterns: ["Seasonal illness awareness", "Annual checkup reminders"],
  },
  automotive: {
    id: "automotive",
    name: "Automotive",
    keywords: ["automotive", "auto repair", "mechanic", "car repair", "vehicle"],
    tone: "confident",
    emphasis: "clarity",
    terminology: ["vehicle", "inspection", "diagnostic", "repair estimate"],
    typicalServices: ["Diagnostics", "Repairs", "Maintenance"],
    commonQuestions: ["How much will this repair cost?", "How long will it take?", "Do you work on my vehicle make?"],
    trustSignals: ["Clear estimate process", "Transparent scope of work", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal maintenance reminders", "Winter and summer vehicle prep"],
  },
  law: {
    id: "law",
    name: "Law",
    keywords: ["law", "attorney", "lawyer", "legal"],
    tone: "authoritative",
    emphasis: "credibility",
    terminology: ["client", "case", "consultation", "representation"],
    typicalServices: ["Consultations", "Case evaluation", "Representation"],
    commonQuestions: ["Do you offer a free consultation?", "What areas of law do you practice?", "What should I expect from the process?"],
    trustSignals: ["Clear practice areas", "Confidential consultation path", "Plain-language process explanation"],
    complianceSensitivity: "elevated",
    seasonalPatterns: [],
  },
  homeServices: {
    id: "homeServices",
    name: "Home Services",
    keywords: ["home services", "handyman", "cleaning", "maintenance"],
    tone: "practical",
    emphasis: "reliability",
    terminology: ["service call", "estimate", "technician", "appointment window"],
    typicalServices: ["Repairs", "Maintenance", "Installation"],
    commonQuestions: ["How soon can you come out?", "What does the service include?", "Is there a service call fee?"],
    trustSignals: ["Clear scheduling process", "Transparent pricing approach", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal maintenance reminders"],
  },
  construction: {
    id: "construction",
    name: "Construction",
    keywords: ["construction", "builder", "remodel", "renovation"],
    tone: "solid",
    emphasis: "proof",
    terminology: ["project scope", "timeline", "estimate", "permit"],
    typicalServices: ["Remodeling", "New construction", "Project consultation"],
    commonQuestions: ["How long will the project take?", "Do you handle permits?", "How is the estimate determined?"],
    trustSignals: ["Clear project scope explanation", "Transparent timeline expectations", "Direct consultation path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal project planning windows"],
  },
  restaurants: {
    id: "restaurants",
    name: "Restaurants",
    keywords: ["restaurant", "dining", "cafe", "eatery"],
    tone: "warm",
    emphasis: "experience",
    terminology: ["menu", "reservation", "hours", "cuisine"],
    typicalServices: ["Dine-in", "Takeout", "Catering"],
    commonQuestions: ["What are your hours?", "Do you take reservations?", "Do you offer takeout or delivery?"],
    trustSignals: ["Clear hours and location", "Current menu information", "Simple reservation or contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal menu updates", "Holiday hours"],
  },
  junkCars: {
    id: "junkCars",
    name: "Junk Cars",
    keywords: ["junk car", "cash for cars", "scrap car", "sell my car"],
    tone: "direct",
    emphasis: "convenience",
    terminology: ["quote", "pickup", "vehicle condition", "title"],
    typicalServices: ["Free quote", "Vehicle pickup", "Title handling guidance"],
    commonQuestions: ["How much is my car worth?", "Do you offer free pickup?", "Do I need the title?"],
    trustSignals: ["Clear quote process", "Simple pickup logistics", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: [],
  },
  dealerships: {
    id: "dealerships",
    name: "Dealerships",
    keywords: ["dealership", "car dealer", "vehicle sales", "new and used cars"],
    tone: "premium",
    emphasis: "selection",
    terminology: ["inventory", "trade-in", "financing", "test drive"],
    typicalServices: ["Vehicle sales", "Trade-in evaluation", "Financing guidance"],
    commonQuestions: ["What's in your current inventory?", "Do you offer financing?", "Can I schedule a test drive?"],
    trustSignals: ["Clear inventory access", "Transparent process explanation", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal sales events"],
  },
  roofing: {
    id: "roofing",
    name: "Roofing",
    keywords: ["roofing", "roof repair", "roof replacement", "roofer"],
    tone: "trustworthy",
    emphasis: "durability",
    terminology: ["inspection", "estimate", "materials", "warranty terms"],
    typicalServices: ["Inspection", "Repair", "Replacement"],
    commonQuestions: ["How do I know if I need a repair or replacement?", "How long does the job take?", "What does the estimate include?"],
    trustSignals: ["Clear inspection process", "Transparent estimate explanation", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Storm-season demand", "Seasonal inspection reminders"],
  },
  plumbers: {
    id: "plumbers",
    name: "Plumbers",
    keywords: ["plumbing", "plumber", "pipe repair", "drain"],
    tone: "responsive",
    emphasis: "speed",
    terminology: ["service call", "emergency response", "estimate", "technician"],
    typicalServices: ["Emergency repair", "Installation", "Maintenance"],
    commonQuestions: ["Do you offer emergency service?", "How soon can someone come out?", "What does the service call include?"],
    trustSignals: ["Clear response-time expectations", "Transparent pricing approach", "Direct contact path"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Winter pipe-freeze awareness"],
  },
  electricians: {
    id: "electricians",
    name: "Electricians",
    keywords: ["electrician", "electrical repair", "wiring", "panel upgrade"],
    tone: "precise",
    emphasis: "safety",
    terminology: ["inspection", "code compliance", "estimate", "licensed technician"],
    typicalServices: ["Inspection", "Repair", "Installation"],
    commonQuestions: ["Is this repair a safety concern?", "Are you licensed for this type of work?", "What does the estimate include?"],
    trustSignals: ["Clear licensing information when confirmed", "Transparent safety explanation", "Direct contact path"],
    complianceSensitivity: "elevated",
    seasonalPatterns: [],
  },
  salons: {
    id: "salons",
    name: "Salons",
    keywords: ["salon", "hair stylist", "spa", "beauty"],
    tone: "stylish",
    emphasis: "comfort",
    terminology: ["appointment", "stylist", "service menu", "consultation"],
    typicalServices: ["Styling", "Color", "Treatments"],
    commonQuestions: ["How do I book an appointment?", "What services do you offer?", "Do you offer consultations?"],
    trustSignals: ["Clear service menu", "Simple booking path", "Current stylist availability when confirmed"],
    complianceSensitivity: "standard",
    seasonalPatterns: ["Seasonal styling trends", "Holiday booking demand"],
  },
};

export type ClassificationConfidence = "none" | "low" | "medium" | "high";

export interface IndustryClassification {
  profileId: string | null;
  confidence: ClassificationConfidence;
  matchedKeywords: string[];
}

/**
 * Lightweight keyword-based classifier. This is a suggestion, not a determination of fact.
 * It does not use external services or heavier NLP so results stay transparent and reviewable.
 */
export function classifyIndustry(input: { businessDescription?: string; declaredIndustry?: string }): IndustryClassification {
  if (input.declaredIndustry && industryProfiles[input.declaredIndustry]) {
    return { profileId: input.declaredIndustry, confidence: "high", matchedKeywords: ["declared industry"] };
  }

  const description = input.businessDescription?.toLowerCase().trim() ?? "";
  if (description.length === 0) {
    return { profileId: null, confidence: "none", matchedKeywords: [] };
  }

  let bestProfileId: string | null = null;
  let bestMatches: string[] = [];

  for (const profile of Object.values(industryProfiles)) {
    const matches = profile.keywords.filter((keyword) => description.includes(keyword));
    if (matches.length > bestMatches.length) {
      bestProfileId = profile.id;
      bestMatches = matches;
    }
  }

  if (!bestProfileId || bestMatches.length === 0) {
    return { profileId: null, confidence: "none", matchedKeywords: [] };
  }

  const confidence: ClassificationConfidence = bestMatches.length >= 3 ? "high" : bestMatches.length === 2 ? "medium" : "low";

  return { profileId: bestProfileId, confidence, matchedKeywords: bestMatches };
}

export interface IndustryKnowledgeContext {
  businessDescription?: string;
  declaredIndustry?: string;
  customIndustryName?: string;
  confirmedByOwner?: boolean;
  contentBlueprint?: ContentIntelligenceBlueprint;
  seoBlueprint?: SeoIntelligenceBlueprint;
  aiBlueprint?: AiVisibilityBlueprint;
  localSeoBlueprint?: LocalSeoBlueprint;
}

export interface IndustryKnowledgeBlueprint {
  industryId: string | null;
  industryName: string;
  classification: IndustryClassification;
  matchedProfile: boolean;
  designTone: string[];
  terminologyGuidance: string[];
  typicalServicesGuidance: string[];
  commonQuestionsGuidance: string[];
  trustSignalGuidance: string[];
  complianceGuidance: string[];
  seasonalGuidance: string[];
  confirmationRequirement: string[];
  reviewChecklist: string[];
  approvalGate: string[];
}

export function buildIndustryKnowledgeBlueprint(context: IndustryKnowledgeContext): IndustryKnowledgeBlueprint {
  const classification = classifyIndustry({
    businessDescription: context.businessDescription,
    declaredIndustry: context.declaredIndustry,
  });

  const profile = classification.profileId ? industryProfiles[classification.profileId] : null;
  const industryName = profile?.name ?? context.customIndustryName ?? "[Unclassified industry]";
  const confirmedByOwner = context.confirmedByOwner ?? false;

  const contentGuidance = context.contentBlueprint
    ? [`Keep terminology consistent with the approved brand voice: ${context.contentBlueprint.brandVoice}`]
    : [];

  const seoGuidance = context.seoBlueprint
    ? [`Cross-check suggested terminology against the SEO blueprint entities: ${context.seoBlueprint.entities.join(", ")}`]
    : [];

  const aiGuidance = context.aiBlueprint
    ? [`Keep suggested terminology aligned with the AI visibility entity names for ${context.aiBlueprint.pageTitle}`]
    : [];

  const localGuidance = context.localSeoBlueprint
    ? [`Cross-check suggested typical services against the confirmed categories for ${context.localSeoBlueprint.businessName}`]
    : [];

  if (!profile) {
    return {
      industryId: null,
      industryName,
      classification,
      matchedProfile: false,
      designTone: ["No confident industry match. Use a neutral, practical tone until the client confirms the category."],
      terminologyGuidance: ["No industry terminology suggestions available. Confirm the business category with the client first."],
      typicalServicesGuidance: ["No typical services suggested. Use only the services the client has confirmed."],
      commonQuestionsGuidance: ["No common-question suggestions available for this category."],
      trustSignalGuidance: ["Use general trust signals: clear service explanation, direct contact path, confirmed location context."],
      complianceGuidance: ["Treat compliance sensitivity as unknown until the industry is confirmed. Default to cautious claim language."],
      seasonalGuidance: [],
      confirmationRequirement: [
        "This business could not be confidently matched to a known industry profile.",
        "Ask the client to confirm their industry category before using any industry-specific guidance.",
      ],
      reviewChecklist: [
        "Confirm the business category directly with the client.",
        "Do not apply industry-specific terminology, trust signals, or compliance handling until confirmed.",
      ],
      approvalGate: ["Industry classification pending", "Client confirmation required before any industry guidance is used"],
    };
  }

  return {
    industryId: profile.id,
    industryName: profile.name,
    classification,
    matchedProfile: true,
    designTone: [
      `Suggested tone: ${profile.tone}. Suggested emphasis: ${profile.emphasis}.`,
      "Treat this as a starting direction for the Design Intelligence Engine, not a final decision.",
    ],
    terminologyGuidance: [
      `Suggested terminology for this category: ${profile.terminology.join(", ")}.`,
      "Confirm these terms match how the client actually describes their business before using them.",
      ...contentGuidance,
      ...seoGuidance,
      ...aiGuidance,
    ],
    typicalServicesGuidance: [
      `Services typically offered in this category: ${profile.typicalServices.join(", ")}.`,
      "Do not publish any service the client has not explicitly confirmed they offer.",
      ...localGuidance,
    ],
    commonQuestionsGuidance: [
      `Questions visitors in this category commonly ask: ${profile.commonQuestions.join(", ")}.`,
      "Use these as FAQ and blog topic starting points, not as pre-written answers.",
    ],
    trustSignalGuidance: [
      `Trust signals typically expected in this category: ${profile.trustSignals.join(", ")}.`,
      "Only use a trust signal once it is grounded in a real, approved detail about this business.",
    ],
    complianceGuidance:
      profile.complianceSensitivity === "elevated"
        ? [
            "This category is compliance-sensitive. Apply extra care with claims, guarantees, and outcome language.",
            "Route any uncertain claim to the client for explicit approval before publishing.",
          ]
        : ["This category has standard compliance sensitivity. Continue to avoid unverified claims and guarantees."],
    seasonalGuidance:
      profile.seasonalPatterns.length > 0
        ? [`Typical seasonal patterns for this category: ${profile.seasonalPatterns.join(", ")}.`]
        : ["No strong seasonal pattern identified for this category."],
    confirmationRequirement: confirmedByOwner
      ? [`The client has confirmed the ${profile.name} category applies to this business.`]
      : [
          `The ${profile.name} category is a suggested match (confidence: ${classification.confidence}), not a confirmed fact.`,
          "Ask the client to confirm this category before using any of the guidance above in published content.",
        ],
    reviewChecklist: [
      "Confirm the matched industry category is actually correct for this business.",
      "Confirm which suggested services, terminology, and trust signals are actually true for this client.",
      "Check compliance guidance against the client's real regulatory context.",
    ],
    approvalGate: [
      "Industry classification reviewed",
      confirmedByOwner ? "Client confirmation recorded" : "Client confirmation pending",
      "Terminology and services confirmed",
      "Trust signal and compliance guidance reviewed",
      "Final industry guidance approval",
    ],
  };
}

export interface IndustryReviewInput {
  declaredIndustry?: string;
  confirmedByOwner?: boolean;
  usedTerminology?: string[];
  usedServices?: string[];
  usedTrustSignals?: string[];
}

export interface IndustryReviewEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export function evaluateIndustryKnowledgeReview(input: IndustryReviewInput): IndustryReviewEvaluation {
  const confirmedByOwner = input.confirmedByOwner ?? false;
  const usedTerminology = input.usedTerminology?.filter(Boolean) ?? [];
  const usedServices = input.usedServices?.filter(Boolean) ?? [];
  const usedTrustSignals = input.usedTrustSignals?.filter(Boolean) ?? [];

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (input.declaredIndustry && industryProfiles[input.declaredIndustry]) {
    strengths.push("The industry category is declared and matches a known profile.");
  } else {
    warnings.push("Confirm the industry category directly with the client before relying on category guidance.");
  }

  if (confirmedByOwner) {
    strengths.push("The client has confirmed the industry category.");
  } else {
    warnings.push("Client confirmation of the industry category is still pending.");
  }

  if (usedTerminology.length > 0) {
    strengths.push("Category terminology has been reviewed and applied.");
  }

  if (usedServices.length > 0 && !confirmedByOwner) {
    warnings.push("Do not publish suggested services until the client confirms they actually offer them.");
  }

  if (usedTrustSignals.length > 0 && !confirmedByOwner) {
    warnings.push("Do not publish suggested trust signals until they are grounded in confirmed client details.");
  }

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: IndustryReviewEvaluation["status"] = !confirmedByOwner && (usedServices.length > 0 || usedTrustSignals.length > 0) ? "blocked" : warnings.length > 0 ? "review" : "ready";

  notes.push("Treat all industry guidance as a starting suggestion. It becomes publish-ready only after client confirmation.");

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
