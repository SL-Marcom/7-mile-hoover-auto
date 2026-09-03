# Industry knowledge helpers

This folder contains the reusable industry-knowledge layer for SiteLab.

Use the exported helpers to:
- classify a business description against a lightweight set of reusable industry profiles (`classifyIndustry`),
- build a blueprint of category-general terminology, typical services, common questions, trust signals, compliance sensitivity, and seasonal patterns (`buildIndustryKnowledgeBlueprint`),
- and evaluate whether industry guidance has been reviewed and confirmed by the client before it is used in published content (`evaluateIndustryKnowledgeReview`).

Everything this module returns is a suggestion tied to a general industry category, never a fact about the current client. Nothing here should be treated as publish-ready until the client confirms it. See [docs/Industry-Knowledge-Engine.md](../../../docs/Industry-Knowledge-Engine.md) for the full spec.
