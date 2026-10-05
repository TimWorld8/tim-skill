---
name: audit-production-readiness
description: Assess production, release, delivery acceptance, or handover readiness of software using a stack-agnostic 221-control standard. Use for evidence-based go/no-go reviews of vibe-coded or conventionally developed internal enterprise and external/customer-facing software, including web, APIs, data systems, mobile, desktop, runtime AI, and IoT. Do not apply this full audit to ordinary coding questions or treat a review request as deployment authorization.
---

# Audit Production Readiness

Produce a release-bound acceptance decision with traceable findings, explicit unknowns, and an evidence index. Apply the translated production-readiness standard, not a generic checklist or a security/compliance certification.

Requires Python 3.9 or newer for the local helpers.

## 1. Establish the candidate and assessment boundary

Identify the intended users, critical jobs, internal/external audience, data categories, integrations, permissions, supported platforms, and irreversible or high-impact consequences. Identify the accountable human release owner and reviewer. Ask only for missing facts that affect the decision; continue permitted read-only inspection while waiting.

Record release ID, source revision, artifact digest, dependency lock, configuration fingerprint, schema/data versions, test environment, and, where applicable, model/prompt/retrieval versions. Use a combined candidate fingerprint that changes whenever any acceptance-relevant component changes. Record exclusions and the exact environments/targets permitted for assessment.

A skill invocation authorizes no third-party scanning, production mutation, credential changes, deployment, spending, or certification. Read-only local inspection and isolated synthetic tests may proceed within existing authorization. Obtain authorization for additional consequential actions. Never infer that a production URL is a test target. When access or authorization is missing, mark the affected checks UNKNOWN and explain the smallest next step.

## 2. Map applicability before testing

Read [references/applicability.md](references/applicability.md). Consider every module. Always assess CORE; decide individual CORE N/A from actual behavior rather than removing CORE for headless software. Runtime AI triggers AI; code generated with AI alone does not. Internal APIs, local persistence, embedded SDKs, and physical effects still trigger their relevant modules.

Use the catalog helper to inspect only relevant controls:

```bash
python3 <skill-dir>/scripts/readiness.py select --module CORE --family GOV
python3 <skill-dir>/scripts/readiness.py select --module API
python3 <skill-dir>/scripts/readiness.py select --id SEC005 --id IDN002
```

The canonical English catalog is [references/control-catalog.json](references/control-catalog.json). Preserve its 221 stable IDs, requirement levels, severity, procedures, evidence expectations, and source mappings. Read module references on demand:
- [CORE](references/core.md): product, UX/accessibility, identity/security, supply chain, reliability, operations, governance, high-impact escalation
- [WEB](references/web.md), [API](references/api.md), [DATA](references/data.md)
- [MOBILE](references/mobile.md), [DESKTOP](references/desktop.md), [AI](references/ai.md), [IOT](references/iot.md)

Use `select --family <prefix>` or `select --id <ID>` instead of loading all CORE at once. Search by stable ID, title, source ID, or scenario. A module-level exclusion may supply the same reviewed rationale to its individual controls; record the rationale and reviewer on every resulting N/A row. N/A means absent capability or genuinely irrelevant requirement, never missing access, missing evidence, inconvenience, or a failed test. Retain failed results when recording a waiver.

## 3. Plan and collect build-specific evidence

Read [references/assessment-and-gating.md](references/assessment-and-gating.md). Start from [assets/templates/profile.json](assets/templates/profile.json) and [assets/templates/assessment.json](assets/templates/assessment.json). Resolve module decisions and thresholds with the accountable owner before measuring. Keep latency, capacity, SLO, recovery, cost, accuracy, coverage, and waiver duration contextual; do not invent universal targets.

For each applicable control, retain the ordered procedure, expected outcome, applicable negative/error/edge scenarios, and planned verification method. Execute permitted tests against the candidate, including authorization/state invariants, failure paths, retries/concurrency, recovery, accessibility/manual/assistive-technology checks, and real-device/HIL checks where required. Record commands, versions, target, timestamps, actual results, reproduction details, and redacted raw evidence.

Distinguish observed tests, inspected code, reviewed documents, and simulations. A code path or AI assertion is not proof that a behavior was exercised. A toy model is not a live-product result. A document control may pass from a reviewed artifact; a behavioral procedure requiring execution needs observed execution at the specified level. A simulator cannot silently stand in for required real-device evidence. If a procedure remains untested or a link cannot be opened, keep it UNKNOWN rather than PASS.

Tie each evidence item and assessment row to release ID and fingerprint. If the candidate changes, supersede affected evidence and retest; reuse only with a reviewed impact analysis and explicit target binding. Never expose secrets or unnecessary personal data in logs or reports. Copy templates to the assessment workspace; never write project evidence into the installed skill.

## 4. Evaluate findings and permitted remediation

Keep requirement (BLOCKER/RISK/RECOMMENDED) separate from severity. Treat contextual critical security, privacy, safety, and data-integrity failures as vetoes even if mislabeled RECOMMENDED. Freeze or raise classification based on consequences before signoff; never lower it to make a release green.

Prioritize by impact, exploitability/exposure, affected journey, reproducibility, and reversibility. Give each finding a control ID, candidate fingerprint, reproducer, expected/actual result, evidence, owner, remediation, and retest criterion. Fix only within actual user authorization. Prefer reversible changes, preserve originals, run relevant regression tests, and regenerate evidence. A review request alone is not permission to silently deploy fixes.

Use [assets/templates/risk-waiver.md](assets/templates/risk-waiver.md) only for non-Critical RISK. Require the authorized human owner's acceptance, independent review, release/scope binding, tested compensating measures, explicit expiry, remediation owner/date, revocation triggers, and stop/rollback conditions. Never waive BLOCKER or Critical failures. A waiver retains FAIL/UNKNOWN and records risk acceptance; it does not convert failure into PASS or approve unrelated future releases.

## 5. Produce the decision and handover

Use [assets/templates/release-report.md](assets/templates/release-report.md) and [assets/templates/evidence-index.csv](assets/templates/evidence-index.csv). Deliver the decision first, then critical blockers, missing evidence, accepted risk, required next steps/owners, assessment coverage, detailed findings, evidence index, and handover constraints.

Generate/validate the complete control ledger with the deterministic helper:

```bash
python3 <skill-dir>/scripts/readiness.py init --profile profile.json --output assessment.json
python3 <skill-dir>/scripts/readiness.py gate --assessment assessment.json --as-of 2026-10-05T12:00:00+07:00 --output gate-result.json
python3 <skill-dir>/scripts/readiness.py validate-catalog
```

Supply the actual decision timestamp, not this example timestamp. `init` creates UNKNOWN rows and reviewed module exclusions; it never invents evidence. `gate` returns exit 0 for GO, 2 for NO-GO, and 1 for malformed input. Its checks validate declared structure and logical eligibility, not the truth or sufficiency of evidence. Independently inspect material evidence and reviewer authority.

Issue GO only when all applicable BLOCKER controls pass with valid evidence, all applicable RISK controls pass or have valid permitted waivers, every applicability decision is resolved and reviewed, and no Critical veto remains. Missing or invalid required evidence means NO-GO with evidence-incomplete reasons. Keep RECOMMENDED failures/unknowns visible as backlog unless their consequences make them Critical. Never average away a veto. State that GO is limited to this candidate, context, scope, and evidence; it is neither a zero-vulnerability guarantee nor legal/standards certification. Human release approval and any deployment remain separate actions.

## Provenance and changing standards

Read [references/provenance.md](references/provenance.md) when explaining the standard or evaluating source freshness. Use [references/source-ledger.json](references/source-ledger.json) for the original 107 source records and 96 unique URLs. This is a translation of the source snapshot dated 2026-10-05 Asia/Bangkok. Preserve cited version/status and exact sections; verify current official sources before adopting changing platform policies, legal requirements, or standard revisions. Distinguish normative requirements, informative guidance, and the handbook's proposed local release policy. Do not describe the stored snapshot as live verification.
