# Industry Knowledge Engine

## Purpose

This engine gives SiteLab a shared, reusable source of general industry knowledge that Content, SEO, AI Visibility, Local SEO, Blog, and Design intelligence can draw on instead of guessing tone, terminology, or trust expectations for each client from scratch.

It extends the existing content, SEO, AI visibility, local SEO, blog, and design architectures rather than creating a parallel workflow.

## Core operating principle

This engine stores knowledge about industry *categories*, never facts about a specific client. Everything it produces is a suggestion for the team to confirm with the client, not an approved claim, service, or trust signal for any real business.

## Scope

The engine covers:
- lightweight industry classification from a business description
- reusable industry profiles (terminology, typical services, common customer questions, typical trust signals, compliance sensitivity, seasonal patterns, design tone and emphasis)
- guidance for Content, SEO, AI Visibility, Local SEO, Blog, and Design intelligence to consume as optional context
- confirmation requirements before any industry guidance is treated as client-approved
- review checklists and approval gates

## What this engine is not

- It is not a full-site preset system. It does not dictate page structure, layout, copy, or CTAs.
- It does not classify a business with certainty. Classification is a lightweight, keyword-based match with an explicit confidence level, not a determination of fact.
- It does not substitute for the Client Intelligence Engine's discovery and research workflow.

## Integration model

The Industry Knowledge Engine should consume the existing content, SEO, AI visibility, and local SEO blueprints where useful so its guidance stays aligned with page intent and approved voice. In turn, Content, SEO, AI Visibility, Local SEO, Blog, and Design intelligence may accept an `industryBlueprint` as optional context and use it to shape suggestions, never to auto-fill approved copy.

## Core operating rules

- Treat every industry profile as general category knowledge, not a fact about the current client.
- Require explicit owner/client confirmation before any industry-derived terminology, service, question, or trust signal is used in published content.
- Flag compliance-sensitive categories (for example medical and legal) so downstream engines apply extra care with claims.
- Keep classification lightweight and transparent: report the matched profile, the confidence level, and the signals that produced the match.
- If no profile matches confidently, say so rather than forcing a guess.

## Approval gates

Industry guidance should not be treated as ready to use until it passes:
- classification review (is the matched profile actually correct for this business),
- terminology and services confirmation,
- trust signal and compliance review,
- and final industry guidance approval.
