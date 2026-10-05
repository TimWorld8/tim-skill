# Assessment and Gating

## Contents
- Record model
- Verification and evidence
- Decision rules
- Waiver expiry
- Helper boundaries

## Record model

Use `readiness.py init` to create a complete 221-row ledger from the profile. The profile records the release and a combined build/config/schema/model/data fingerprint. Resolve all eight `module_decisions`; CORE must be applicable. Each module decision contains boolean `applicable`, `rationale`, `reviewer`, and `reviewed_at`. Keep the reviewer's identity/role traceable. Modules omitted from the profile are unresolved, not N/A.

Each control row has `id`, `status`, `release_id`, `fingerprint`, `owner`, `reviewer`, `summary`, and evidence links. Allowed statuses: PASS, FAIL, UNKNOWN, N/A, WAIVED. Use UNKNOWN for not run, blocked, inaccessible, or insufficient evidence. N/A additionally needs `rationale`, reviewer, and `reviewed_at`. It cannot erase `original_status: FAIL` or recorded findings. WAIVED additionally retains `original_status: FAIL` or UNKNOWN and references a waiver ID.

For PASS, `checks` must cover every ordered procedure step exactly once with `step` (1-based), `result: PASS`, `verification`, `required_verification`, and `evidence_ids`. Methods are `observed_test`, `code_inspection`, `reviewed_document`, or `simulation`. Plan the required method from the control's actual procedure. Retain expected/actual results in `summary` or referenced evidence. A weaker method cannot fulfill a planned observed test. Pure simulations cannot stand in for runtime/real-device tests. Add control-specific threshold measurements and scenario results rather than assuming step coverage proves them.

## Verification and evidence

Evidence index entries contain `id`, `release_id`, `fingerprint`, `kind`, `locator`, `observed_at`, `producer`, `tool_version`, `scope`, `result`, and `verified`. `verified: true` means a named reviewer actually accessed and examined the artifact, not that a model generated a filename. Use real durable locators and store raw logs outside this skill. Redact secrets. Expected or inferred outputs are not observed outputs. Design approval, code inspection, simulation, and observed tests are distinct evidence kinds.

The helper checks declared identity, method, result, and review fields; it does not open locators, validate signatures, run tests, decide whether each scenario is sufficient, or authenticate approvals. Reject placeholder evidence during review even when a syntactically valid locator exists. A wrong-fingerprint result is invalid; a reuse decision must explicitly rebind reviewed evidence through a documented impact analysis, never by editing its digest to look fresh.

## Decision rules

Keep original requirement and severity from the catalog. Assessors may raise severity or make a control stricter with a contextual reason; they cannot silently downgrade it. A Critical non-pass is always a veto. A BLOCKER non-pass or invalid evidence is a veto. A non-Critical RISK non-pass needs a valid waiver; otherwise it is a veto. All scope/applicability decisions must be resolved and reviewed. RECOMMENDED non-passes remain visible and do not independently veto unless Critical. Missing assessment rows, duplicates, unknown IDs, invalid N/A, stale evidence, and unreviewed scope prevent GO.

Report NO-GO as either demonstrated failure, evidence incomplete, invalid scope/ledger, or a combination. Never replace these with a pass percentage. Show raw FAIL/UNKNOWN counts alongside WAIVED and N/A. A valid waiver does not change the failed control's original result.

## Waiver expiry

Permit waivers only for non-Critical RISK. Bind control, finding, audience/exposure, release ID and fingerprint. Record risk owner and authority, approver, independent reviewer, rationale/impact, tested compensating measures/evidence, remediation owner/deadline, monitoring, revocation triggers, and stop/rollback conditions.

Choose exactly one expiry convention:
- `expires_at`: timezone-aware timestamp, exclusive. At equality the waiver is expired.
- `valid_through` plus `timezone`: inclusive calendar date until the next local midnight. The source workbook used Asia/Bangkok; retain this when carrying its date-only waivers forward. New projects may explicitly choose their own IANA timezone.

Do not guess a timezone or silently convert date-only business meaning through UTC. Record `approved_at` as an aware timestamp and evaluate at the actual release time. A waiver may not begin after the decision time. Any changed exposure, incident, build, or scope can revoke it earlier.

## Helper boundaries

The deterministic helper is a local JSON validator and conjunctive release gate. It cannot certify software, judge consent, grant authorization, prove completeness of inventory, determine professional competence, or establish evidence truth. Its GO is a mechanically eligible result that still requires substantive evidence review and the designated human release decision.

Input and output paths belong in an isolated assessment workspace. Helpers do not scan networks, change applications, or deploy. Never create project evidence or fixture reports inside the installed skill. Do not use catalog validation as a substitute for testing a product.
