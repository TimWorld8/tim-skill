# Applicability

## Contents
- Module triggers
- Scope review
- Thresholds and authority

## Module triggers

| Module | Activate from actual capabilities |
|---|---|
| CORE | Every software release, including internal tools, headless services, prototypes accessing real data, and delivery/handover |
| WEB | Browser UI, webview, or web content |
| API | Programmatic boundary across processes or systems, including internal/local APIs and embedded SDKs |
| DATA | Persistent DB/local/object-store data, CRUD, pipelines, batch, or streaming |
| MOBILE | Phone or tablet software |
| DESKTOP | Native desktop app, daemon, extension, or installer |
| AI | Runtime ML/LLM inference, RAG, agents, or model-assisted decisions |
| IOT | Firmware, gateways, fleets, or effects on the physical world |

Combine modules. A mobile app with a backend, local offline storage, and runtime inference needs CORE + MOBILE + API + DATA + AI. A desktop tool exposing a local HTTP service needs API as well as DESKTOP. Vibe coding alone does not imply runtime AI. Internal enterprise software does not receive reduced authentication, privacy, data-integrity, or support scrutiny merely because it is internal.

## Scope review

Record the behavior, audience, data, privileges, platforms, integrations, environments, and intended/prohibited uses. Document unknown inventory rather than silently excluding it. Ask a reviewer other than the author of the scope to examine omitted capabilities. Record a reason, reviewer, timestamp, and reopening trigger for every module exclusion; copy this reviewed rule onto individual excluded controls in the acceptance ledger. Decide exceptional N/A within CORE control by control.

Reopen scope when an internal system becomes external, an integration or data category changes, privileges increase, a new platform appears, or physical/high-impact effects are introduced. Excluding a module is an applicability decision, not evidence of authorization or a broad safety guarantee.

## Thresholds and authority

Use product-specific targets agreed before testing. Identify whether each threshold is measured baseline, contractual/domain requirement, or explicit assumption. Record its owner, rationale, scope, units, percentile/window/denominator, supported load or device population, and stop conditions. Never import synthetic fixture numbers as recommended thresholds.

Assess regulated or high-impact domains with appropriate human/domain review. This standard does not supply legal certification or replace a competent professional's decision. No profile value can grant execution permission to mutate production, disclose sensitive data, or deploy.
