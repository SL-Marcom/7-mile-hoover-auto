export type ContentAssetType =
  | "website-page"
  | "service-page"
  | "location-page"
  | "landing-page"
  | "blog"
  | "faq"
  | "gbp-post"
  | "email"
  | "social-content";

export interface ContentIntelligenceContext {
  assetType: ContentAssetType;
  primaryGoal?: string;
  audience?: string;
  brandVoice?: string;
  researchStatus?: "required" | "in-progress" | "complete";
  factVerificationStatus?: "required" | "pending" | "verified";
  trustSignals?: string[];
  internalLinks?: string[];
  seoFocus?: string[];
  aiVisibilityFocus?: string[];
  approvalGate?: string[];
}

export interface ContentIntelligenceBlueprint {
  assetType: ContentAssetType;
  primaryGoal: string;
  audience: string;
  brandVoice: string;
  researchControls: string[];
  factVerificationRules: string[];
  writingGuidance: string[];
  trustSignals: string[];
  internalLinkGuidance: string[];
  seoCompatibility: string[];
  aiVisibilityCompatibility: string[];
  approvalGate: string[];
}

export interface WritingStandardEvaluation {
  status: "ready" | "review" | "blocked";
  score: number;
  strengths: string[];
  warnings: string[];
  notes: string[];
}

export interface WritingStandardInput {
  draft: string;
  brandVoice?: string;
  audience?: string;
  assetType?: ContentAssetType;
  approvedTerminology?: string[];
}

const assetTypeGuidance: Record<ContentAssetType, { focus: string; trustSignals: string[] }> = {
  "website-page": {
    focus: "Provide a clear overview that supports navigation, trust, and conversion.",
    trustSignals: ["clear service summary", "direct contact path", "specific location or service context when confirmed"],
  },
  "service-page": {
    focus: "Explain what the service includes, who it helps, and how the visitor should proceed.",
    trustSignals: ["clear scope of service", "plain-language explanation", "direct CTA"],
  },
  "location-page": {
    focus: "Ground the page in verified location context and make directions or contact easy to find.",
    trustSignals: ["confirmed locality", "clear directions or contact path", "service-area context when approved"],
  },
  "landing-page": {
    focus: "Make the offer, value, and next action obvious without relying on filler.",
    trustSignals: ["clear offer", "single CTA", "specific proof points"],
  },
  blog: {
    focus: "Deliver useful information with clearly cited or verified context.",
    trustSignals: ["useful explanation", "clear source handling", "relevant internal links"],
  },
  faq: {
    focus: "Answer likely questions directly and avoid speculative or promotional language.",
    trustSignals: ["direct answers", "plain language", "clear next step"],
  },
  "gbp-post": {
    focus: "Share timely, accurate updates that fit the business context and local intent.",
    trustSignals: ["current and relevant information", "clear local context", "simple CTA"],
  },
  email: {
    focus: "Keep the message concise, useful, and aligned to the intended action.",
    trustSignals: ["clear purpose", "specific CTA", "natural tone"],
  },
  "social-content": {
    focus: "Make the message clear, shareable, and tailored to the audience without sounding generic.",
    trustSignals: ["clear offer", "platform-suitable voice", "scannable language"],
  },
};

export function buildContentIntelligenceBlueprint(context: ContentIntelligenceContext): ContentIntelligenceBlueprint {
  const assetGuidance = assetTypeGuidance[context.assetType];
  const primaryGoal = context.primaryGoal ?? "Support a clear visitor action";
  const audience = context.audience ?? "The intended audience for this content";
  const brandVoice = context.brandVoice ?? "clear, practical, and client-specific";

  return {
    assetType: context.assetType,
    primaryGoal,
    audience,
    brandVoice,
    researchControls: [
      "Confirm the business facts, offer, and audience before drafting.",
      "Use public information or approved client materials as the source of truth.",
      "Document missing information as placeholders rather than filling gaps with assumptions.",
      `Align the draft with the page goal: ${primaryGoal}`,
    ],
    factVerificationRules: [
      "Verify claims before including them in publish-ready copy.",
      "Prefer approved terms and client-provided details over generic market language.",
      "Flag uncertain statements and keep them unconfirmed until reviewed.",
    ],
    writingGuidance: [
      `Write in the approved brand voice: ${brandVoice}.`,
      "Favor concrete language and specific details over filler.",
      "Use natural transitions and varied sentence lengths to keep the writing readable.",
      assetGuidance.focus,
    ],
    trustSignals: context.trustSignals ?? assetGuidance.trustSignals,
    internalLinkGuidance: [
      "Link to the most relevant service, location, or contact page when the relationship is clear.",
      "Use descriptive link text that reflects the destination and user intent.",
      ...(context.internalLinks ? [`Prioritize these internal links: ${context.internalLinks.join(", ")}`] : []),
    ],
    seoCompatibility: [
      "Keep the page intent explicit so the content is easy to understand and index.",
      "Use clear headings, useful structure, and natural keyword usage.",
      ...(context.seoFocus ? [`Support these SEO priorities: ${context.seoFocus.join(", ")}`] : []),
    ],
    aiVisibilityCompatibility: [
      "Write clear entity names, service names, and page intent.",
      "Structure the content so it can be summarized without losing meaning.",
      ...(context.aiVisibilityFocus ? [`Support these AI visibility priorities: ${context.aiVisibilityFocus.join(", ")}`] : []),
    ],
    approvalGate: context.approvalGate ?? [
      "Content scope approved",
      "Fact verification complete",
      "Brand voice approved",
      "Internal links reviewed",
      "Final review before publish",
    ],
  };
}

export function evaluateWritingStandard(input: WritingStandardInput): WritingStandardEvaluation {
  const draft = input.draft.trim();
  const brandVoice = input.brandVoice ?? "clear, practical, and client-specific";
  const audience = input.audience ?? "general audience";
  const assetType = input.assetType ?? "website-page";
  const approvedTerminology = input.approvedTerminology ?? [];
  const lowerDraft = draft.toLowerCase();

  const strengths: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (draft.length > 120) {
    strengths.push("The draft is long enough to explain the topic clearly.");
  }

  if (draft.includes("—") || draft.includes("–")) {
    warnings.push("Avoid unnecessary em dashes or long dash punctuation where simpler phrasing works.");
  }

  const aiPhraseMatches = [
    "in today's fast-paced world",
    "in conclusion",
    "it is important to note",
    "unlock the potential",
    "seamless experience",
    "elevate your",
    "reimagine",
    "transform your",
    "delivering exceptional",
  ].filter((phrase) => lowerDraft.includes(phrase));

  if (aiPhraseMatches.length > 0) {
    warnings.push("Remove repetitive AI-style phrases and favor plain language instead.");
  }

  const fillerMatches = ["comprehensive solution", "world-class", "best-in-class", "exceptional service", "premium experience", "amazing results", "unparalleled"].filter((phrase) => lowerDraft.includes(phrase));
  if (fillerMatches.length > 0) {
    warnings.push("Replace generic filler with concrete, specific language.");
  }

  const exaggeratedMatches = ["guaranteed", "100%", "best", "number one", "award-winning", "trusted by thousands", "always"].filter((phrase) => lowerDraft.includes(phrase));
  if (exaggeratedMatches.length > 0) {
    warnings.push("Remove exaggerated or unsupported claims that need verification.");
  }

  if (/[\[\]]/.test(draft)) {
    warnings.push("Replace placeholder brackets with approved facts or clearly mark the content as pending review.");
  }

  if (draft.includes("lorem ipsum") || draft.includes("placeholder text")) {
    warnings.push("Remove placeholder or boilerplate text before review.");
  }

  const sentences = draft.split(/(?<=[.!?])\s+/).filter(Boolean);
  const starts = sentences.map((sentence) => sentence.split(/\s+/)[0]?.toLowerCase()).filter(Boolean);
  const repeatedStarts = starts.filter((start, index) => starts.indexOf(start) !== index);

  if (repeatedStarts.length > 0) {
    warnings.push("Vary sentence openings so the rhythm feels more natural.");
  }

  if (approvedTerminology.length > 0) {
    const usedTerminology = approvedTerminology.filter((term) => lowerDraft.includes(term.toLowerCase()));
    if (usedTerminology.length > 0) {
      strengths.push(`The draft uses approved terminology such as ${usedTerminology.join(", ")}.`);
    }
  }

  if (brandVoice) {
    strengths.push(`The draft should stay aligned with the approved brand voice: ${brandVoice}.`);
  }

  if (audience) {
    notes.push(`Write for the intended audience: ${audience}.`);
  }

  notes.push(`Adapt the copy for ${assetType.replace(/-/g, " ")} content.`);

  const score = Math.max(40, 100 - warnings.length * 12);
  const status: WritingStandardEvaluation["status"] = warnings.length > 2 ? "review" : warnings.length > 0 ? "review" : "ready";

  return {
    status,
    score,
    strengths,
    warnings,
    notes,
  };
}
