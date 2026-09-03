# SiteLab OS Blueprint

## 1. Purpose and scope

This document defines the operating system for SiteLab: a reusable production framework for creating, reviewing, deploying, and maintaining local-business websites for direct clients and white-label agency partners.

This blueprint is intentionally practical, modular, and phased. It is designed for implementation in stages rather than as a single large release.

### What this system is
- A reusable starter system for local-business websites.
- A structured workflow for planning, content, design, development, QA, review, and handoff.
- A governance model that separates reusable starter assets from client-specific assets.
- A production discipline for using Claude Code, GitHub, Playwright, Next.js App Router, TypeScript, Tailwind CSS, and Cloudflare.

### What this system is not
- It is not a finished client website.
- It is not a place to invent business information, claims, reviews, credentials, prices, locations, service areas, guarantees, or statistics.
- It is not authorized to publish, deploy, change DNS, install analytics, connect external services, or spend budget without explicit approval.

## 2. Guiding principles

- Reuse before custom build.
- Separate starter assets from client-specific assets.
- Prefer clarity and trust over visual filler or generic AI-style layouts.
- Use placeholders whenever client facts are missing.
- Require confirmation before content, design, development, tracking, deployment, and launch decisions.
- Preserve accessibility, performance, SEO, and security as baseline requirements.
- Keep the system modular so phases can be delivered incrementally.
- Keep architecture compatible with Next.js App Router, TypeScript, Tailwind CSS, GitHub, Claude Code, Playwright, and Cloudflare.

## 3. System architecture

SiteLab should be implemented as a layered system with clear responsibility boundaries.

### Core layers
- Starter layer: reusable framework, layout primitives, design tokens, content patterns, and workflows.
- Client layer: client-specific content, pages, assets, and implementation decisions.
- Review layer: approvals, QA, staging previews, and change review.
- Delivery layer: deployment, monitoring, and handoff.

### Separation of concerns
- Starter files contain reusable system logic, templates, and infrastructure.
- Client-specific files contain business-specific content, content model decisions, imagery choices, and final copy.
- The system should prevent client-specific content from being mixed into shared starter assets without explicit review.

### Architectural stance
- Core: repository structure, documentation, design tokens, page templates, shared components, content placeholders, Git workflow, QA workflow.
- Recommended: starter content model, review checklist templates, staging workflow, white-label handoff docs.
- Optional later: advanced content management, CMS integration, built-in CRM forms, localization, multi-language support, and advanced personalization.

## 4. AI core

The AI core is the operational layer that helps create, review, and maintain sites while keeping the system grounded in repository rules and human approval.

### Responsibilities
- Interpret the repository instructions, rules, and skills.
- Build or revise pages using the repository design and content standards.
- Review work for alignment with instructions and quality thresholds.
- Help produce planning documentation, content outlines, QA notes, and handoff summaries.

### AI operating rules
- Read repository instructions and applicable rules before acting.
- Inspect existing system assets before editing.
- Never fabricate business information or claims.
- Use placeholders whenever required.
- Ask for confirmation when a decision would materially affect the client-facing product.

### Recommended AI roles
- Builder agent: implements pages and reusable components.
- Reviewer agent: checks structure, content, accessibility, SEO, and consistency.
- QA agent: runs checks and verifies behavior across viewport widths.
- Handoff agent: prepares summaries, approvals, and next-step notes.

### Cooperation model
- Skills define repeatable tasks.
- Specialist agents handle focused concerns such as content, SEO, accessibility, QA, or deployment review.
- Responsibilities must remain distinct so work is not duplicated or silently overridden.

### LLM Router / Multi-Model Engine
- Use the SiteLab LLM Router/Multi-Model Engine as the shared, provider-agnostic layer for assigning AI tasks to an eligible model. It never calls a provider itself; it only matches caller-supplied task requirements against caller-supplied capability profiles and returns a routing decision for the Orchestration/Workflow Engine (or a human) to act on.
- Every routing decision requires the Client Intake Engine's `externalServiceConnectionsApproved` permission to be explicitly client-confirmed. If it is not, the router returns `blocked` or `waiting-for-approval` with no model recommended — it never infers authorization from a provider's availability, connection status, or a model's own authorization flag.
- The router applies deterministic hard filters (authorization, availability, capability, privacy, cost) before any subjective ranking, and never claims one model is objectively better without caller-supplied evaluation data.

## 5. Client intake and confirmation system

The intake system collects only what is needed to begin safely and transparently.

### Intake inputs
- Business name and basic service description.
- Primary goal for the website.
- Preferred CTA and conversion path.
- Existing brand assets, if any.
- Content that is already approved and available.
- Locality and service context when explicitly provided.

### Confirmation rules
- No assumptions about business location, service area, credentials, reviews, or results.
- Any content that is uncertain must be marked as placeholder until confirmed.
- Any claim that could materially affect trust or compliance requires human approval.

### Required approval gates
- Intake summary approval
- Content scope approval
- Design direction approval
- Development scope approval
- Tracking and analytics approval
- Launch approval

### Client Intake Engine
- Use the SiteLab Client Intake Engine as the shared, code-level implementation of this discovery-and-confirmation workflow. It gathers, validates, classifies, and stores intake information, and produces the structured inputs the other engines consume.
- Every field carries a provenance tag (client-confirmed, public-research, assumption, suggestion, or unknown) and a stable identifier so a mobile app, an API, a dashboard, or a separate LLM can update one field at a time without rewriting the full intake record.
- The engine reuses the Reviewer/QA Engine's finding vocabulary rather than introducing a second one, and blocks strategy or implementation while a required field is unconfirmed or a contradiction remains unresolved.

## 6. Website planning workflow

The planning workflow turns intake information into a clear implementation plan before coding begins.

### Planning steps
1. Review the intake summary.
2. Identify the page map and primary conversion goals.
3. Define primary and secondary CTAs.
4. Define trust elements and required proof points.
5. Create a concise section outline for each page.
6. Identify reusable components and page templates.
7. Note any missing information as placeholders.
8. Submit for review before implementation.

### Planning outputs
- Site map
- Page intent map
- Section outline by page
- Content placeholder list
- Reusable component list
- Approval checklist

## 7. Design system

The design system should provide consistent, polished, local-business-friendly visual language without becoming generic.

### Core design system elements
- Typography scale
- Spacing scale
- Color tokens
- Radius and elevation tokens
- Motion tokens
- Component states
- Form styling patterns
- Content spacing patterns

### Design system rules
- Favor custom, grounded, brand-aware design.
- Avoid generic AI layouts made entirely of rounded cards, gradients, and repeated visual patterns.
- Keep the system flexible enough for different industries while preserving a strong editorial feel.

### Core vs later
- Core: tokens, layout primitives, typography, spacing, button styles, form controls.
- Recommended: industry-specific visual variants and section patterns.
- Optional later: theme packs and advanced motion systems.

## 8. Reusable component system

Components should be reusable, composable, and easy to configure without hard-coding client-specific content.

### Component categories
- Layout components
- Navigation and footer components
- Hero and intro components
- Trust and proof components
- CTA components
- Service and feature components
- FAQ components
- Form components
- Testimonial components
- Contact and directions components

### Component rules
- Reuse existing components before introducing new ones.
- Keep content props generic and placeholder-friendly.
- Prefer semantic HTML and clear accessibility behavior.
- Keep client-side JavaScript minimal.

### Core vs later
- Core: shared layout, hero, CTA, section, form, footer, internal-link patterns.
- Recommended: FAQ, service grid, gallery, testimonial, map, and booking components.
- Optional later: interactive review widgets, scheduling embeds, and dynamic personalization.

## 9. Page templates

Page templates should guide consistent page creation while leaving room for unique requirements.

### Recommended templates
- Home page
- Services page
- About page
- Contact page
- Booking or quote page
- Locations or directions page
- FAQ page

### Template rules
- Each template should define a clear page intent.
- Each template should include recommended sections, CTA structure, trust elements, SEO fields, and content placeholders.
- Templates should be implemented as starter assets, not as final client content.

## 10. Content system

The content system should be structured to separate reusable patterns from client-specific content.

### Content principles
- Content must be factual, safe to publish, and specific.
- Missing information must be clearly marked as placeholder.
- Content should support the visitor’s goal, not just fill space.
- Content should be reviewed through the SiteLab Content Intelligence Engine and Human Writing Standard before approval.

### Content categories
- Page copy
- Section copy
- CTA copy
- Meta titles and descriptions
- Alt text
- Structured data values
- Internal-link labels

### Core vs later
- Core: content templates, placeholder conventions, copy review checklist, content hierarchy rules, content-intelligence blueprints, and writing-standard evaluation.
- Recommended: content prompts and content brief templates for clients.
- Optional later: CMS-backed content authoring.

## 11. Technical SEO framework

Technical SEO is a required baseline for every production page.

### Requirements
- Unique title and meta description per page
- Canonical URL per page
- Open Graph title, description, and image per page
- Clean, descriptive URLs
- Internal linking between relevant pages
- Sitemap and robots configuration that reflect the live site structure
- Logical heading hierarchy with one clear H1 per page

### Core vs later
- Core: metadata patterns, canonical strategy, internal-link rules, sitemap and robots support, SEO intelligence blueprints, and SEO review checklists.
- Recommended: content-driven SEO review automation.
- Optional later: advanced schema and content scoring workflows.

## 12. Local SEO framework

Local SEO should be used only when the client’s context is real and confirmed.

### Requirements
- Only use business details that have been provided or approved.
- Use placeholders whenever details are missing.
- Keep names, addresses, phone numbers, hours, and service areas consistent across visible content and structured data.
- Avoid implying coverage or credentials that have not been confirmed.

### Core vs later
- Core: local business details model, placeholder rules, directory-safe copy conventions, local SEO intelligence blueprints, local review checklists, and local approval gates.
- Recommended: local service area page patterns.
- Optional later: location-specific landing pages and map integrations.

## 13. Blog intelligence framework

The blog system should support editorial planning and article production without becoming a separate publishing workflow.

### Requirements
- Use the blog engine to plan strategy, topic clusters, audience alignment, search intent, article briefs, title planning, article structure, FAQ opportunities, internal linking, metadata, image guidance, AI visibility, freshness planning, update planning, repurposing opportunities, overlap checks, and review checklists.
- Reuse the shared Content, SEO, AI Visibility, and Local SEO engines rather than creating a parallel content workflow.
- Keep blog planning grounded in public research and owner approval.
- Support both evergreen and timely content.
- Do not publish, deploy, schedule, or connect a CMS.

### Core vs later
- Core: blog strategy blueprints, editorial planning support, article brief generation, keyword and intent mapping, FAQ planning, metadata and canonical guidance, review checklists, and approval gates.
- Recommended: more advanced editorial calendar and repurposing workflows.
- Optional later: CMS integration, scheduling, and orchestration features.

## 14. AI visibility framework

The content should be understandable to both humans and AI systems without relying on manipulative tactics.

### Requirements
- Clear page intent and service names
- Accurate entity naming and consistent terminology
- Structured content that is easy to summarize
- No hidden text, keyword stuffing, or misleading claims

### Core vs later
- Core: clear content structure and semantic headings, AI visibility blueprints, source and evidence requirements, answer-first structure, FAQ strategy, and AI review checklists.
- Recommended: explicit entity and service taxonomies.
- Optional later: AI-specific content enrichment workflows.

## 14. Structured data framework

Structured data should be accurate and aligned with visible content.

### Supported types
- Organization
- LocalBusiness
- WebSite
- WebPage
- FAQPage
- Service
- BreadcrumbList

### Rules
- Only add structured data when the visible content supports it.
- Do not add misleading or over-broad schema.
- Keep schema values consistent with approved content.

## 15. Accessibility framework

Accessibility is a baseline requirement, not an optional layer.

### Requirements
- Semantic HTML and meaningful landmarks
- One clear H1 per page
- Keyboard-accessible controls
- Visible focus states
- Descriptive alt text
- Sufficient color contrast
- Clear labels for forms and links

### Core vs later
- Core: accessibility defaults in components and templates.
- Recommended: automated accessibility checks in QA workflows.
- Optional later: accessibility review checklists for custom client components.

## 16. Performance framework

Performance should be treated as a product requirement.

### Requirements
- Prioritize fast first render and low overhead.
- Keep client-side JavaScript minimal.
- Prefer server-rendered or static approaches where appropriate.
- Optimize assets and avoid unnecessary dependencies.

### Core vs later
- Core: performance budgets, image handling, and minimal package usage.
- Recommended: Lighthouse and Core Web Vitals review in QA.
- Optional later: advanced image optimization and edge performance strategies.

## 17. Security and privacy framework

The system must be safe by default.

### Requirements
- No deployment, DNS, analytics, or external service changes without approval.
- Keep secrets out of the repository.
- Prefer privacy-preserving implementations.
- Be careful with forms, external content, and user input.

### Core vs later
- Core: secure defaults, environment variable handling, and review process.
- Recommended: privacy notice and consent handling templates.
- Optional later: advanced threat modeling and compliance review.

## 18. Quality assurance framework

Quality assurance must be built into the workflow, not treated as a final pass.

### Required QA steps
- Linting
- Type checking
- Production build
- Browser-based QA at mobile, tablet, and desktop widths
- Content review
- Accessibility review
- SEO and metadata review

### Reviewer / QA Engine
- Use the SiteLab Reviewer/QA Engine as the shared aggregation layer for all of the above. It reuses the evaluation each existing engine already produces (Content, SEO, AI Visibility, Local SEO, Blog, Industry Knowledge) and adds coverage for design, accessibility, performance, responsiveness, technical integrity, security, and deployment readiness through explicit signal inputs rather than assumptions.
- The engine returns a prioritized findings report, an overall score that cannot hide a blocking finding, and a launch-readiness decision. A project is never launch-ready while a blocking finding remains, and an unset signal is always treated as a pending human-review item rather than a pass.

### Core vs later
- Core: QA checklist and verification steps, Reviewer/QA Engine aggregation.
- Recommended: automated UI regression checks.
- Optional later: visual diff and regression review tooling, orchestrated review runs across a full site.

## 19. Git and version-control workflow

Use GitHub as the source of truth for work and review.

### Workflow rules
- Keep starter assets and client-specific work clearly separated.
- Use branches for scoped work.
- Review changes before merge.
- Preserve a clean, documented history for handoff.

### Core vs later
- Core: branch strategy, PR review, and change logs.
- Recommended: release tags and handoff notes.
- Optional later: multi-repo or monorepo support for agency operations.

## 20. Preview and deployment workflow

Preview and deployment are controlled and approval-based.

### Workflow rules
- Preview environments may be used for review only when explicitly approved.
- Deployment must not happen without approval.
- Preview content must remain clearly labeled as non-production.

### Core vs later
- Core: local preview, staging review, and approval gates.
- Recommended: shared preview links for client review.
- Optional later: automated preview publishing for agency teams.

### Deployment / Publishing Engine
- Use the SiteLab Deployment/Publishing Engine as the shared, code-level implementation of this workflow. It evaluates local, preview, and production deployment readiness using the Client Intake Engine's confirmed permissions and the Reviewer/QA Engine's decision directly, rather than collecting a second set of approvals.
- Preview approval and production approval are distinct: production always requires a passing Reviewer/QA decision, while a non-passing report only warns on preview.
- The engine produces a dry-run deployment plan and a rollback plan. Neither one executes anything — this engine does not deploy, change DNS, install analytics, or connect an external service.

## 21. Cloudflare strategy

Cloudflare should be used as a delivery and edge layer only when approved and appropriate.

### Intended role
- Edge delivery and caching for approved production sites.
- DNS and security controls only when explicitly approved and configured by an authorized owner.

### Guardrails
- No DNS changes without approval.
- No unexpected routing or security changes without review.
- Keep configuration simple and observable.

### Core vs later
- Core: documented deployment target and environment assumptions.
- Recommended: preview and production edge configuration templates.
- Optional later: advanced edge caching, image optimization, and WAF tuning.

### Deployment / Publishing Engine
- The Deployment/Publishing Engine treats Cloudflare Pages as the default and only implemented provider, reading build command, output directory, and routes from `src/lib/cloudflare/manifest.ts` rather than redeclaring them. Vercel and other providers are declared extension points only.

## 22. Analytics and tracking controls

Analytics and tracking are tightly controlled.

### Rules
- Do not install analytics or tracking without explicit approval.
- Default to privacy-preserving implementation.
- Keep consent and privacy expectations clear.
- Avoid unnecessary third-party scripts.

### Core vs later
- Core: no-op default configuration and approval checklist.
- Recommended: tracking plan templates for approved clients.
- Optional later: consent-aware analytics and event systems.

### Deployment / Publishing Engine
- The Deployment/Publishing Engine gates analytics installation behind the Client Intake Engine's `analyticsInstallApproved` permission and a deployment-time re-confirmation. An explicit client denial blocks the deployment outright rather than being treated as a warning.

## 23. Client approval gates

Approvals are required before content, design, implementation, and launch decisions become final.

### Gate sequence
1. Intake confirmation
2. Sitemap and page intent approval
3. Design direction approval
4. Content and placeholder review approval
5. Development completion approval
6. QA approval
7. Launch approval

### Gate rule
- No final content, design, tracking, deployment, or launch should occur before the relevant approval is recorded.

### Orchestration / Workflow Engine
- Use the SiteLab Orchestration/Workflow Engine to sequence a project through Client Intake, Reviewer/QA, and Deployment/Publishing without duplicating any of their logic. It reuses this exact gate sequence, adding one additional gate ("Preview approval") to keep preview and production approval distinct, consistent with the Deployment/Publishing Engine's own rules.
- The engine enforces execution order through a single transition function: a stage can never be entered until the previous stage is complete and every approval gate targeting it has been explicitly recorded. No client fact, design direction, content, QA result, or launch decision is ever approved automatically.

## 24. White-label agency delivery workflow

The system should support white-label agency partners without compromising quality or ownership boundaries.

### Agency workflow requirements
- Provide a clean starter and clear handoff package.
- Keep agency-specific assets separate from the core starter.
- Use approval gates so the agency and client both confirm scope and content.
- Preserve the ability to hand back a maintainable codebase.

### Core vs later
- Core: shared starter, review checklist, handoff template.
- Recommended: agency-specific brand and workflow templates.
- Optional later: multi-client delivery orchestration.

## 25. Industry presets

Industry presets should help accelerate planning for common local-business verticals without forcing generic templates.

### Examples
- Home services
- Medical and wellness
- Legal services
- Salons and personal care
- Restaurants and hospitality
- Contractors and trades
- Education and tutoring

### Rules
- Presets must be adaptable and content-safe.
- They should provide structure and copy prompts, not fixed claims.
- They should never substitute for client approval.
- Use the SiteLab Industry Knowledge Engine for lightweight industry classification and reusable industry profiles (terminology, typical services, common questions, trust signals, compliance sensitivity, seasonal patterns) that other engines can draw on as suggestions requiring client confirmation.

## 26. Maintenance and updates

The system should support ongoing maintenance after launch.

### Maintenance expectations
- Update content and images when approved.
- Keep components and templates current with the starter system.
- Review for broken links, outdated info, and accessibility regressions.
- Preserve a documented change record.

### Core vs later
- Core: maintenance checklist and update workflow.
- Recommended: periodic content and QA review cadence.
- Optional later: automated monitoring and content freshness reminders.

## 27. Skills, agents, hooks, and MCP architecture

The repository should use a modular AI workflow that supports repeatable operations without over-automation.

### Skills
- Build page skill for implementing pages using system rules.
- Review page skill for QA and standards checks.
- Content planning skill for outlining sections and placeholders.
- SEO review skill for metadata and structured data checks.

### Specialist agents
- Content agent: reviews copy quality and placeholder usage.
- Design agent: checks visual hierarchy and consistency.
- SEO agent: reviews metadata, structure, and schema.
- Accessibility agent: checks semantics and keyboard support.
- QA agent: runs verification steps and reports issues through the Reviewer/QA Engine's findings report.

### Hooks
- Pre-change hooks can verify instruction compliance.
- Post-change hooks can run linting, type checks, and build verification.
- Review hooks can check for placeholder usage and approval requirements.

### MCP integration
- MCP can support retrieval of repository instructions, rule files, design tokens, and QA checklists.
- MCP should not be used to bypass human approval or override repository rules.

### Human judgment boundaries
The following decisions must remain human-led or human-approved:
- business claims and testimonials
- pricing and guarantees
- service area and coverage statements
- legal or compliance-sensitive content
- deployment and production launch
- analytics installation and third-party integrations
- budget and spending decisions

## 28. Recommended repository structure

A clear repository structure is essential for keeping the starter modular and maintainable.

```text
.github/
.claude/
  rules/
  skills/
  agents/
  hooks/
  mcp/

docs/
public/
src/
  app/
    (routes)
  components/
    ui/
    sections/
    layouts/
  content/
  lib/
  styles/
  types/
  data/
```

### Starter vs client-specific separation
- Starter assets live in shared directories and should remain reusable.
- Client-specific files should be isolated in a dedicated client workspace or clearly labeled branch-specific folder.
- Shared components should not contain hard-coded client facts.

## 29. Implementation phases

The implementation should proceed in phases with dependencies and explicit completion criteria.

### Phase 1 - Foundation
- Establish repository instruction system.
- Define design tokens and base components.
- Define content placeholder structure.
- Define QA checklist and verification workflow.

Completion criteria:
- Rules, skills, and documentation exist.
- Core starter components and page structure are accessible and documented.
- Verification commands are understood and repeatable.

### Phase 2 - Core page system
- Implement home, services, about, contact, and basic template patterns.
- Add metadata, structured data, and accessibility defaults.
- Define internal-link patterns and content scaffolding.

Completion criteria:
- Core templates exist and are reusable.
- Metadata and accessibility defaults are present.
- Pages can be adapted for clients without major rewrites.

### Phase 3 - Review and approval workflow
- Add approval checkpoints, preview workflow, and handoff documentation.
- Introduce content and QA review templates.

Completion criteria:
- Approval gates are documented and usable.
- Review workflow is repeatable and clear.

### Phase 4 - White-label readiness
- Add agency workflow docs, preset patterns, and handoff materials.
- Document how to separate starter assets from client-specific work.

Completion criteria:
- Agency partners can reuse the starter without conflating assets.
- Handoff packages are structured and consistent.

### Phase 5 - Optimization and hardening
- Improve performance, QA automation, and maintenance workflows.
- Add optional advanced integrations only after review.

Completion criteria:
- The system is stable, documented, and maintainable.
- The repository supports repeatable production work with minimal risk.

## 30. Definition of done

A phase is complete when the following are true:
- The relevant starter assets exist and are documented.
- The work adheres to repository instructions and rules.
- The implementation is accessible, performant, and SEO-conscious.
- All required approvals are recorded before launch-related actions.
- The output is reusable, not just one-off.
- Remaining placeholders are clearly documented.
- The work can be reviewed by another responsible contributor.

---

## 1. Decisions already established

- The repository is a reusable SiteLab starter for local-business websites.
- The stack is Next.js App Router, TypeScript, and Tailwind CSS.
- The system must preserve accessibility, SEO, performance, and content safety.
- Publishing, deployment, DNS changes, analytics installation, external integrations, and spending require explicit approval.
- The starter must remain a reusable system, not a finished client website.

## 2. Decisions still requiring owner approval

- Whether the starter will support direct-client delivery only or both direct-client and white-label agency delivery.
- Whether Cloudflare deployment and DNS management will be enabled in the first production phase.
- Whether analytics and tracking tools will be allowed at all, and if so, which ones and under what approval conditions.
- Whether advanced CMS or form integrations will be included in the first production phase.
- Whether the repository should eventually be split into a core starter repository plus client-specific repositories.

## 3. Risks to avoid

- Inventing business facts, claims, or statistics.
- Turning the starter into a generic AI template with no local-business grounding.
- Mixing starter assets with client-specific content without clear boundaries.
- Automating decisions that require human judgment, especially legal, trust, pricing, and launch matters.
- Shipping without approval gates for content, design, tracking, and deployment.

## 4. Recommended immediate next implementation step

Implement Phase 1 of the system by formalizing the starter foundation: instruction files, design tokens, shared component patterns, page templates, and the first QA workflow, while keeping all client-specific content and launch actions explicitly outside the starter scope.
