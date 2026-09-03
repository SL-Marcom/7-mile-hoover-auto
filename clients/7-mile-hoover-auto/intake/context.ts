import { INTAKE_FIELD_IDS, intakeField, type ClientIntakeContext } from "../../../src/lib/client-intake";

/**
 * 7 Mile and Hoover Auto Services — Client Intake Context.
 *
 * Facts below are tagged "client-confirmed" only where the agency/client
 * directly supplied them. Anything not supplied is left unset rather than
 * guessed — the Client Intake Engine will surface those as material gaps /
 * follow-up questions.
 *
 * Updated with Phase 2 confirmations: primary contact and approval authority
 * (SiteLab+ / Bilal Assaad), target audience, primary goal, SEO/Local
 * SEO/AI-visibility priorities, and all five permission fields. Production
 * publishing, deployment, DNS changes, analytics install, and external
 * service connections remain explicitly withheld pending separate future
 * approval — see permissions below.
 */
export const sevenMileHooverAutoIntakeContext: ClientIntakeContext = {
  intakeId: "7-mile-hoover-auto-phase-1",
  projectName: "7 Mile and Hoover Auto Services website build",
  reviewer: "SiteLab v1.0 client onboarding",
  intakeDate: "2026-08-11",

  businessIdentity: {
    brandName: intakeField(INTAKE_FIELD_IDS.identity.brandName, "7 Mile and Hoover Auto Services", "client-confirmed", {
      note: "Provided directly in the client kickoff brief.",
    }),
    // legalName, preferredPublicName, entityType: not supplied. Left unset.
  },

  contacts: {
    contacts: [
      {
        id: "contact-bilal-assaad",
        name: "Bilal Assaad",
        role: "SiteLab+ — Project Manager",
        isApprovalAuthority: true,
        contactMethod: "sitelab.br@gmail.com",
      },
    ],
    approvalAuthorityConfirmed: intakeField(INTAKE_FIELD_IDS.contacts.approvalAuthorityConfirmed, true, "client-confirmed", {
      note: "SiteLab+ (Bilal Assaad) is authorized to proceed with website strategy, design, and development. Final production launch remains a separate, later approval — see permissions.publishingApproved / permissions.deploymentApproved and the production-approval workflow stage.",
    }),
  },

  servicesAndProducts: {
    services: intakeField(
      INTAKE_FIELD_IDS.services.services,
      [
        "Brake Repair",
        "Muffler & Exhaust Repair",
        "Engine Repair",
        "Transmission Repair",
        "Oil Change & Preventive Maintenance",
        "Auto Electrical Repair",
        "Check Engine Light & Diagnostics",
        "Suspension Repair",
        "Steering Repair",
        "Wheel Alignment",
        "Radiator & Cooling System Repair",
        "AC & Heating Repair",
        "Starter & Alternator Repair",
        "General Auto Repair / Preventive Maintenance",
      ],
      "client-confirmed",
      { note: "Explicit service list from the client kickoff brief. Collision repair, body work, auto painting, and tire sales/replacement are explicitly excluded — see compliance.prohibitedClaims." },
    ),
  },

  locations: {
    businessModel: intakeField(INTAKE_FIELD_IDS.locations.businessModel, "storefront", "client-confirmed", {
      note: "Single physical full-service auto repair shop with a walk-in storefront.",
    }),
    primaryLocation: intakeField(INTAKE_FIELD_IDS.locations.primaryLocation, "11517 Seven Mile E, Detroit, MI 48234, United States", "client-confirmed", {
      note: "Provided directly in the client kickoff brief.",
    }),
    serviceAreas: intakeField(INTAKE_FIELD_IDS.locations.serviceAreas, ["Detroit, MI"], "client-confirmed", {
      note: 'Client stated primary market is "Detroit, Michigan." No broader multi-city service-area radius was confirmed.',
    }),
  },

  audienceAndGoals: {
    targetAudiences: intakeField(
      INTAKE_FIELD_IDS.audienceGoals.targetAudiences,
      [
        "Vehicle owners in Detroit and nearby communities needing reliable auto repair, maintenance, diagnostics, and mechanical repair",
        "Local searchers for: auto repair, mechanic, brake repair, muffler/exhaust repair, engine repair, transmission repair, oil changes and maintenance, diagnostics/check engine light, suspension and steering repair, wheel alignment, electrical repair, AC/heating repair, cooling system/radiator repair",
      ],
      "client-confirmed",
      { note: "Explicitly excludes collision repair, body work, painting, tire sales, and tire replacement search intent — see compliance.prohibitedClaims." },
    ),
    primaryGoal: intakeField(
      INTAKE_FIELD_IDS.audienceGoals.primaryGoal,
      "Generate qualified local auto repair leads — primarily phone calls and free quote requests — while improving organic search, Local SEO, and AI/LLM visibility.",
      "client-confirmed",
      { note: "Client confirmation." },
    ),
    conversionPriorities: intakeField(INTAKE_FIELD_IDS.audienceGoals.conversionPriorities, ["Call Now", "Get Free Quote"], "client-confirmed", {
      note: "Explicit primary CTAs from the client kickoff brief.",
    }),
  },

  brandVoiceAndDesign: {
    designPreferences: intakeField(
      INTAKE_FIELD_IDS.brandDesign.designPreferences,
      ["Primary brand colors: yellow, red, and white", 'No existing graphical logo — use a professional text-based treatment of "7 Mile and Hoover Auto Services"', "No client photos available yet"],
      "client-confirmed",
      { note: "Provided directly in the client kickoff brief." },
    ),
    // brandVoice, toneNotes, inspirationReferences: not supplied. Left unset.
  },

  externalPresence: {
    googleBusinessProfileUrl: intakeField(INTAKE_FIELD_IDS.externalPresence.googleBusinessProfileUrl, "https://maps.app.goo.gl/1FiTEZpCnaSDx6m8A", "client-confirmed", {
      note: "Provided directly in the client kickoff brief.",
    }),
    // existingWebsiteUrl: 7hautoservice.com is the target domain for this new build, not a confirmed
    // existing live site. Left unset rather than assumed live. socialProfiles, analyticsPlatforms,
    // adsPlatforms, otherPlatforms: not supplied.
  },

  trustAndClaims: {
    // No reviews, ratings, awards, credentials, or years-in-business figures were supplied.
    // Per project rules these must never be invented. Left empty.
    claims: [],
  },

  languagesAndCompetitors: {
    // Not supplied. Left unset.
  },

  pagesAndContent: {
    requiredPages: intakeField(
      INTAKE_FIELD_IDS.pagesContent.requiredPages,
      ["Home", "About Us", "Services", "Individual page per major service", "FAQ", "Blog", "Contact Us"],
      "client-confirmed",
      { note: "Explicit required site structure from the client kickoff brief." },
    ),
  },

  strategyPriorities: {
    seoPriorities: intakeField(INTAKE_FIELD_IDS.strategyPriorities.seoPriorities, ["Improve organic Google search visibility"], "client-confirmed", {
      note: "Client confirmation alongside the primary goal statement.",
    }),
    localSeoPriorities: intakeField(INTAKE_FIELD_IDS.strategyPriorities.localSeoPriorities, ["Improve Local SEO visibility for Detroit and nearby communities"], "client-confirmed", {
      note: "Client confirmation alongside the primary goal statement.",
    }),
    aiVisibilityPriorities: intakeField(INTAKE_FIELD_IDS.strategyPriorities.aiVisibilityPriorities, ["Improve AI/LLM visibility"], "client-confirmed", {
      note: "Client confirmation alongside the primary goal statement.",
    }),
    // blogPriorities, advertisingPriorities: not yet specified by the client.
  },

  compliance: {
    prohibitedClaims: intakeField(
      INTAKE_FIELD_IDS.compliance.prohibitedClaims,
      ["Collision repair", "Auto body work", "Auto painting", "Tire sales", "Tire replacement"],
      "client-confirmed",
      { note: "Explicit exclusions from the client kickoff brief — must not be advertised anywhere on the site." },
    ),
  },

  permissions: {
    publishingApproved: intakeField(INTAKE_FIELD_IDS.permissions.publishingApproved, false, "client-confirmed", {
      note: "Per the Deployment Engine, this field governs production publishing specifically. Preview publishing/sharing for review is approved (see deploymentApproved); final production publishing is explicitly withheld pending a separate future approval.",
    }),
    deploymentApproved: intakeField(INTAKE_FIELD_IDS.permissions.deploymentApproved, true, "client-confirmed", {
      note: "Development and preview deployment approved. Production deployment is additionally gated by the separate production-approval workflow stage and a passing Reviewer/QA decision — not yet granted.",
    }),
    dnsChangesApproved: intakeField(INTAKE_FIELD_IDS.permissions.dnsChangesApproved, false, "client-confirmed", {
      note: "Explicitly withheld for now. DNS changes for 7hautoservice.com will be approved separately when the site is ready for production.",
    }),
    analyticsInstallApproved: intakeField(INTAKE_FIELD_IDS.permissions.analyticsInstallApproved, false, "client-confirmed", {
      note: "Explicitly withheld for now. The site should be structured to support future GTM/GA4 installation (no hardcoded IDs, ready integration points), but actual install/connection is not approved until tracking IDs are provided and this permission is separately confirmed.",
    }),
    externalServiceConnectionsApproved: intakeField(INTAKE_FIELD_IDS.permissions.externalServiceConnectionsApproved, false, "client-confirmed", {
      note: "Explicitly withheld for now, except where specifically requested. Forms, spam protection, and other production integrations will be configured during the launch phase.",
    }),
  },
};
