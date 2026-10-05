# CORE Controls

113 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [PRD001: Identify users and the jobs they must accomplish](#prd001)
- [PRD002: Acceptance contract with positive and negative outcomes](#prd002)
- [PRD003: Complete decision and risk ownership](#prd003)
- [PRD004: Classify job impact and usage scope](#prd004)
- [PRD005: Define user success and failure](#prd005)
- [PRD006: Tie requirement changes to impact and retesting](#prd006)
- [PRD007: Safe boundaries for sample data and user research](#prd007)
- [PRD008: Test jobs with real or target users](#prd008)
- [PRD009: Help paths and problem-reporting channels](#prd009)
- [UX001: Accessibility evaluation plan and claim boundaries](#ux001)
- [UX002: Readable names, roles, values and structure](#ux002)
- [UX003: Complete keyboard operation without traps](#ux003)
- [UX004: Visible focus not entirely obscured by sticky UI](#ux004)
- [UX005: Contrast and meaning independent of color](#ux005)
- [UX006: Text enlargement and reflow without losing task functionality](#ux006)
- [UX007: Pointer targets and alternatives to dragging](#ux007)
- [UX008: Meaningful text alternatives and complete media alternatives](#ux008)
- [UX009: Forms explain required information and allow error correction](#ux009)
- [UX010: Review and cancel risky transactions](#ux010)
- [UX011: Accessible authentication without memorization demands that lack alternatives](#ux011)
- [UX012: Announce asynchronous status without stealing focus](#ux012)
- [UX013: Control over timeouts, motion and context changes](#ux013)
- [UX014: Consistent navigation, copy and help](#ux014)
- [UX015: Visual appearance meets an owned baseline](#ux015)
- [UX016: Complete state matrix for views and commands](#ux016)
- [UX017: Prevent duplicate commands and false success](#ux017)
- [UX018: Competing requests and stale data do not overwrite newer data](#ux018)
- [UX019: Drafts, unsaved navigation and recovery](#ux019)
- [UX023: Readable Thai fonts and stacked characters](#ux023)
- [UX024: Locale and language are not inferred from time zone](#ux024)
- [UX025: Buddhist/Gregorian dates and times do not shift the date](#ux025)
- [UX026: Money, units and parsing are interpreted correctly](#ux026)
- [UX027: Names, addresses and text are not forced into Western conventions](#ux027)
- [GOV001: Delivery evidence is bound to the released build](#gov001)
- [GOV002: Exception register with expiry and release blocking](#gov002)
- [GOV003: Usable user and administrator guides](#gov003)
- [GOV004: Handover of access, knowledge and responsibility](#gov004)
- [GOV005: Change log and support promises match behavior](#gov005)
- [GOV006: Post-release review and closed feedback loop](#gov006)
- [SEC001: Define asset and trust boundaries](#sec001)
- [SEC002: Link threats to verification cases](#sec002)
- [SEC003: Identify data and its lifecycle](#sec003)
- [SEC004: Prove deletion and restoration behavior](#sec004)
- [SEC005: Isolate tenants across every data path](#sec005)
- [SEC006: Validate schemas and boundaries in the service layer](#sec006)
- [SEC007: Prevent query injection according to context](#sec007)
- [SEC008: Control command and template execution](#sec008)
- [SEC012: Block SSRF and restrict egress](#sec012)
- [SEC013: Validate files before storage and processing](#sec013)
- [SEC014: Verify authorization and paths for downloads](#sec014)
- [SEC015: Disable dangerous deserialization](#sec015)
- [SEC017: Prevent transaction and concurrency abuse](#sec017)
- [SEC021: Prove cryptography and key rotation](#sec021)
- [SEC022: Find leaked secrets and actually revoke them](#sec022)
- [SEC023: Check TLS on every path and under failure](#sec023)
- [SEC024: Log traceable events without leaking data](#sec024)
- [SEC025: Check fail-closed behavior and runtime privileges](#sec025)
- [IDN001: Define roles, permissions, and service accounts](#idn001)
- [IDN002: Enforce object and field authorization](#idn002)
- [IDN003: Verify administrator boundaries and prevent self-approval](#idn003)
- [IDN004: Revoke privileges across pending work](#idn004)
- [IDN005: Choose assurance and MFA according to authority](#idn005)
- [IDN006: Verify passwords without imposing constraints from the wrong revision](#idn006)
- [IDN007: Control login abuse without making it easy to lock out others](#idn007)
- [IDN008: Verify reset and factor recovery](#idn008)
- [IDN009: Prevent session fixation and token leakage](#idn009)
- [IDN010: Test timeouts, logout, and multiple sessions](#idn010)
- [IDN013: Verify the declared OAuth/OIDC flows](#idn013)
- [IDN014: Prove refresh replay handling and rotation](#idn014)
- [SUP001: Assign human responsibility for AI-generated diffs](#sup001)
- [SUP002: Verify AI-modified tests against independent requirements](#sup002)
- [SUP003: Limit coding-agent authority and context](#sup003)
- [SUP004: Verify that AI-proposed dependencies exist and have correct sources](#sup004)
- [SUP005: Generate an SBOM from the artifact and disclose incompleteness](#sup005)
- [SUP006: Triage vulnerabilities using current information](#sup006)
- [SUP007: Protect source and build pipelines from unreviewed changes](#sup007)
- [SUP008: Generate provenance and verify it before deployment](#sup008)
- [SUP009: Test build isolation and keep SLSA claims within the evidence](#sup009)
- [SUP010: Deliver functioning vulnerability reporting and updates](#sup010)
- [REL001: Define the service through user tasks](#rel001)
- [REL002: SLOs have a rationale and an accountable decision-maker](#rel002)
- [REL003: Error budgets affect actual release decisions](#rel003)
- [REL004: Load tests represent the actual workload mix](#rel004)
- [REL005: Overloaded systems reject work in a controlled way](#rel005)
- [REL008: Degrade honestly when dependencies fail](#rel008)
- [REL009: Isolate workloads to prevent cascading failures](#rel009)
- [REL010: Scale in time and do not abandon work during scale-in](#rel010)
- [REL011: Costs have limits and a load-reduction switch](#rel011)
- [REL014: RTO/RPO are grounded in impact and a supporting plan](#rel014)
- [REL015: Exercise the full DR path and return to the primary system](#rel015)
- [OPS001: Build and release traceable artifacts](#ops001)
- [OPS002: Recreate environments from IaC/documentation](#ops002)
- [OPS003: CI/CD fails closed when mandatory criteria fail](#ops003)
- [OPS004: Invalid configuration is detected before accepting work](#ops004)
- [OPS005: Rollouts limit harm and have a stop rule](#ops005)
- [OPS006: Rollback covers binaries, configuration, and data](#ops006)
- [OPS007: Readiness and rollout progress have meaningful semantics](#ops007)
- [OPS008: Feature flags can be disabled and have an expiry](#ops008)
- [OPS009: Correlate user outcomes with internal events](#ops009)
- [OPS010: Alerts have recipients and silence is tested too](#ops010)
- [OPS011: Handover recipients can resolve incidents using the runbook](#ops011)
- [OPS012: Incidents have clear command and communication](#ops012)
- [OPS013: Major incidents lead to verifiable prevention](#ops013)
- [GOV101: Determine scope from behavior and risk](#gov101)
- [GOV102: Stop release when required gates fail](#gov102)
- [GOV103: Check exceptions before every release](#gov103)
- [GOV104: Bind evidence to the actual release target](#gov104)
- [GOV105: Have independent reviewers inspect high-impact conclusions](#gov105)
- [GOV106: Pin source versions and status](#gov106)
- [GOV107: Hand over limitations and conditions of use](#gov107)
- [REG001: Escalate high-impact cases to specialists before release](#reg001)
- [REG002: Verify accessibility claims against actual evaluated scope](#reg002)
- [REG003: Define stop boundaries for AI with real-world effects](#reg003)

## PRD001

**Identify users and the jobs they must accomplish**

Requirement: BLOCKER · Severity: High · Owner: Product owner · Reviewer: User representative

Purpose / risk: Features match the prompt but do not solve the real problem

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Identify the persona/role, the job before starting and the final outcome of each critical journey
2. Distinguish internal users, external customers, administrators and connected systems; identify ability/device constraints
3. Have user representatives review the jobs with synthetic example data and sign off on the scope

Expected / acceptance: No critical journey lacks a user or a verifiable successful outcome

Evidence: user/job map; signed scope

Scenarios: New user; Administrator; System with no UI

Remediation: Add missing jobs and review acceptance criteria before continuing to build

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 1; 2

Policy origin: recommended local release policy derived from cited principles

## PRD002

**Acceptance contract with positive and negative outcomes**

Requirement: BLOCKER · Severity: High · Owner: Product owner · Reviewer: QA lead

Purpose / risk: Testing passes only the happy path, allowing incorrect behavior to become a feature

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Write Given/When/Then for every requirement, including inputs/outputs and an approver
2. Add unauthorized access, incomplete data, boundary values and dependency failures for critical jobs
3. Link requirement → test → actual result → release digest; have the reviewer rerun one critical job

Expected / acceptance: Every requirement has a pass/fail/N/A result with a rationale; no critical condition remains unmeasured

Evidence: traceability matrix; test transcripts

Scenarios: Wrong role; Empty data; Dependency error

Remediation: Clarify ambiguous contracts and rerun the related tests

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 10; 4

Policy origin: recommended local release policy derived from cited principles

## PRD003

**Complete decision and risk ownership**

Requirement: BLOCKER · Severity: Critical · Owner: Accountable service owner · Reviewer: Release reviewer

Purpose / risk: AI or a developer is made the final accountable party instead of the organization

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Appoint humans accountable for business outcomes, security, data and support
2. Specify go/no-go decision authority and a deputy when the owner is unavailable
3. Simulate an out-of-hours incident and verify that every escalation reaches a role with authority

Expected / acceptance: Every risk has an accountable owner and deputy who accept the responsibility

Evidence: RACI; escalation desk-test

Scenarios: Owner on leave; Approval conflict

Remediation: Assign responsible people and working contact channels before release

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 6; 14; P10 — Getting Stakeholder Agreement

Policy origin: recommended local release policy derived from cited principles

## PRD004

**Classify job impact and usage scope**

Requirement: BLOCKER · Severity: High · Owner: Product owner · Reviewer: Risk reviewer

Purpose / risk: A prototype is used with money or important data without stringent criteria

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Classify read-only/data-writing/financial/permission/physical-impact operations and the groups affected
2. Record unsupported uses, prohibited uses and assumptions that lack evidence
3. Select module controls with a rationale; have the reviewer verify that API-only software has not omitted CORE

Expected / acceptance: Scope and impact classification are complete before selecting the release gate

Evidence: impact register; module applicability matrix

Scenarios: Internal data-writing tool; Public read-only software; IoT device with no display

Remediation: Change the scope or add evidence appropriate to the potential harm

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 2; 9; 11

Policy origin: recommended local release policy derived from cited principles

## PRD005

**Define user success and failure**

Requirement: RISK · Severity: High · Owner: Product owner · Reviewer: Operations owner

Purpose / risk: Uptime dashboards look healthy while users cannot accomplish their jobs

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Select critical journeys and define success/failure/abandonment through observable events
2. Set thresholds from impact and a baseline, specifying whether each is measured or an assumption
3. Simulate a technically successful response with incorrect data and verify that the metrics count it as a failure

Expected / acceptance: Metrics do not rely solely on HTTP 200, and the owner approves the rationale for thresholds

Evidence: journey metric spec; synthetic event examples

Scenarios: HTTP 200 but the command has no effect; Delayed success; User cancellation

Remediation: Add correctness/task-outcome signals and review thresholds

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 10; P10 — Getting Stakeholder Agreement

Policy origin: recommended local release policy derived from cited principles

## PRD006

**Tie requirement changes to impact and retesting**

Requirement: BLOCKER · Severity: High · Owner: Change owner · Reviewer: QA reviewer

Purpose / risk: A last-minute prompt change invalidates the old evidence

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Record changes to requirements/UI/schema relative to the tested version
2. Create an impact list of journeys/roles/locales/platforms that must be rerun
3. Mark old evidence as superseded and certify only the results for the new candidate

Expected / acceptance: No approval cites results from before a relevant behavior change

Evidence: change-impact record; superseded evidence links

Scenarios: Copy changed after signoff; Default date changed; Role added

Remediation: Rerun the affected suite and have the reviewer inspect the new evidence

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 8; P06 — Step 1; Step 5

Policy origin: recommended local release policy derived from cited principles

## PRD007

**Safe boundaries for sample data and user research**

Requirement: BLOCKER · Severity: High · Owner: Research owner · Reviewer: Privacy/security reviewer

Purpose / risk: A demo or user test creates real transactions or exposes another person's data

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Use synthetic data and separate, resettable role-specific accounts
2. Verify that real payments, emails and devices are simulated or disabled within the test scope
3. If real data is necessary, have the owner specify consent/retention/access and the reviewer check the boundaries before starting

Expected / acceptance: No unauthorized real transaction and no personal data beyond the plan

Evidence: test-data plan; sandbox isolation check

Scenarios: Demo sends a real message; Recording contains sensitive data

Remediation: Isolate environments and delete data beyond the plan with a record of the action

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P09 — Testing with personal data; P07 — 9

Policy origin: recommended local release policy derived from cited principles

## PRD008

**Test jobs with real or target users**

Requirement: RISK · Severity: High · Owner: UX researcher · Reviewer: Product owner

Purpose / risk: Builders know where the buttons are and therefore miss barriers

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Define research questions and user groups covering beginners, accessibility constraints and critical jobs
2. Present tasks as goals without naming buttons; record assistance/errors/task completion without leading users
3. Link findings to issue severity and retest after fixes; identify gaps in groups not yet tested

Expected / acceptance: Task success is reported separately for assisted/unassisted completion; no critical error remains unaddressed

Evidence: neutral task script; anonymized observations; retest report

Scenarios: User unfamiliar with system terminology; Screen-reader use; Older phone use

Remediation: Remove barriers and arrange tests with missed user groups

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P09 — Plan the sessions; Design the tasks; Run a session

Policy origin: recommended local release policy derived from cited principles

## PRD009

**Help paths and problem-reporting channels**

Requirement: RISK · Severity: Medium · Owner: Support owner · Reviewer: UX reviewer

Purpose / risk: Users get stuck with no way to seek help

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Identify support channels, service hours and information to include without requesting secrets
2. Test whether guidance can still be found when login fails, permission is denied or the network is unavailable
3. Have someone who did not build the system follow the path to report one issue

Expected / acceptance: Users know their next action, and the support route does not depend on the failing page itself

Evidence: help route screenshots/transcript; support intake spec

Scenarios: Cannot log in; Dependency down; Account deactivated

Remediation: Create a fallback channel and case-specific instructions

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 3; 4; P01 — 3.2.6 Consistent Help

Policy origin: recommended local release policy derived from cited principles

## UX001

**Accessibility evaluation plan and claim boundaries**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Tool results for a few pages are used to make claims about the entire system

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Set WCAG 2.2 A+AA as the target for the web; for native/CLI software, specify the platform and mapping used
2. Inventory all pages, states, roles, templates and process steps; select representative and random samples without excluding checkout/authentication
3. Create a complete project A/AA criterion ledger from P01 covering every A/AA success criterion, not only those named by the grouped controls. For each criterion, record PASS/FAIL/not-present with a rationale, automated/manual/AT method, evaluated scope/complete processes, exceptions and release digest; have the reviewer check for missing rows and prohibit aggregate scores in place of per-SC results. For non-web software, maintain a separate applicability ledger based on P02/platform
4. Negative fixtures: a tooltip that disappears when the pointer enters it or cannot be dismissed while focus remains must reveal SC1.4.13 failure; a visible button label that does not match its accessible name must reveal SC2.5.3 failure even if name/role/value are complete; also check criteria not individually enumerated, such as 1.4.2, 1.4.5, 2.4.5, 2.5.1 and 2.5.4

Expected / acceptance: No claim exceeds the actual evaluated scope, and blockers preventing critical jobs must be fixed

Evidence: a11y scope; criterion ledger; sample rationale; complete A/AA criterion ledger: PASS/FAIL/not-present reasoning, method, scope, exceptions, digest; separate non-web applicability ledger

Scenarios: Scanner scores 100 but keyboard use fails; Third-party payment; Tooltip is not hoverable/dismissible; Voice-input visible label is absent from the accessible name; A/AA ledger missing a criterion

Remediation: Expand the evaluation scope or correct the claims

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls; UX001–014 are operational groupings, not a complete list of WCAG A/AA criteria; passing the grouped controls does not establish conformance; WEB conformance requires a complete ledger and P01 §5.2. A not-present result means the content/function is absent, with a rationale; it is not a waiver of a failure

Sources: P01 — 5.2.1–5.2.5; 5.3; P02 — Comments on Conformance; Guidance in This Document; Excluded from Scope; Comments on Closed Functionality; P06 — Steps 1–5

Policy origin: recommended local release policy derived from cited principles

## UX002

**Readable names, roles, values and structure**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: The page looks good but assistive technology cannot determine its meaning

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Check semantic headings/lists/tables/labels on sample pages for every template
2. Read and change control values through the accessibility tree/screen reader
3. Test custom-widget open/close/select/disabled states and compare announcements with what is visible

Expected / acceptance: Names, roles, states, values and semantic sequence match the UI

Evidence: accessibility tree snapshot; screen-reader transcript

Scenarios: table sortable; custom dropdown; icon-only button

Remediation: Use native semantics or correctly implement the platform accessibility API

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.3.1; 1.3.2; 4.1.2; P02 — Comments by Guideline and Success Criterion: 1.3.1; 1.3.2; 4.1.2

Policy origin: recommended local release policy derived from cited principles

## UX003

**Complete keyboard operation without traps**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users without a pointer cannot perform important jobs

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Set the pointer aside and use Tab/Shift+Tab/Enter/Space/Escape to complete every critical journey
2. Enter and exit menus/dialogs/date pickers and check focus order from beginning to end
3. Verify that shortcuts do not interfere with typing and can be disabled/remapped as required by the criterion

Expected / acceptance: Every critical job can be performed with a keyboard, and users can exit each component

Evidence: keyboard journey recording; focus sequence

Scenarios: modal nested; virtual list; keyboard only

Remediation: Fix events/semantics and focus return before release

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 2.1.1; 2.1.2; 2.1.4; 2.4.3; P02 — Comments by Guideline and Success Criterion: 2.1.1; 2.1.2; 2.1.4; 2.4.3

Policy origin: recommended local release policy derived from cited principles

## UX004

**Visible focus not entirely obscured by sticky UI**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Keyboard navigation reaches buttons that cannot be seen

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Tab through pages with sticky headers/cookie banners/chat overlays at every supported viewport size
2. Open validation dialogs and check focus placement and return
3. Capture the focused component relative to overlays and viewport edges

Expected / acceptance: WEB: the focus indicator is visible; author-created content does not entirely obscure the focused component, as required at AA

Evidence: focused-state screenshots; overlay test log

Scenarios: cookie banner; sticky bottom bar; dialog error

Remediation: Adjust scroll margins/layers/focus management

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 2.4.7; 2.4.11; P02 — Comments by Guideline and Success Criterion: 2.4.7; 2.4.11

Policy origin: recommended local release policy derived from cited principles

## UX005

**Contrast and meaning independent of color**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users cannot distinguish errors/status/actions

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Measure contrast of text and component states from actual rendered colors, including background images
2. Test default, hover, focus, disabled, error and selected states in light/dark themes
3. Remove color or use grayscale and verify that errors/required fields/status still have text or symbols with names

Expected / acceptance: WEB: normal text ≥4.5:1, large text ≥3:1 and relevant non-text ≥3:1, applying normative exceptions; color is not the sole signal

Evidence: contrast calculations; state screenshots

Scenarios: error border only; chart legend; dark mode

Remediation: Change color tokens/pairs and add meaningful text

Threshold / policy notes: The numbers come from the specified P01 success criteria; incidental/logotype/inactive exceptions must be recorded case by case; a release RISK waiver does not make a WCAG conformance claim pass

Sources: P01 — 1.4.1; 1.4.3; 1.4.11; P02 — Comments by Guideline and Success Criterion: 1.4.1; 1.4.3; 1.4.11

Policy origin: recommended local release policy derived from cited principles

## UX006

**Text enlargement and reflow without losing task functionality**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Low-vision users must scroll in multiple directions until the interface is unusable

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Test WEB text resizing to 200% and a 320 CSS px viewport, or the equivalent of 400% at 1280 px
2. Perform primary jobs without hiding buttons or information; check scrolling, except content that necessarily requires two dimensions
3. Apply text spacing specified by the success criterion and check word breaks/overlap; native software uses large text/platform equivalents

Expected / acceptance: No information or functionality is lost; two-directional scrolling is used only for content permitted by the criterion

Evidence: zoom/reflow screenshots; text-spacing settings

Scenarios: Table; Sidebar; Long Thai label

Remediation: Use flexible layouts and remove fixed-height containers

Threshold / policy notes: P01: 200% text; reflow at 320 CSS px width/256 height; spacing of line 1.5×, paragraph 2×, letter 0.12× and word 0.16× only for languages/scripts that support the spacing property; do not force Thai letter spacing that distorts the script

Sources: P01 — 1.4.4; 1.4.10; 1.4.12; P02 — Comments by Guideline and Success Criterion: 1.4.4; 1.4.10; 1.4.12

Policy origin: recommended local release policy derived from cited principles

## UX007

**Pointer targets and alternatives to dragging**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users with hand tremors perform the wrong transaction or cannot complete dragging

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. WEB: measure targets and spacing in CSS px. Native: use a recorded platform-defined density-independent metric, such as Android dp, iOS/macOS pt or Windows effective pixels (epx); record density/scale/runtime and mapping based on P02. Do not measure screenshot hardware pixels without a mapping
2. Test reordering/maps/sliders using single-pointer clicks/taps without dragging; test keyboard operation separately under UX003, and do not substitute it for the single-pointer result. Record essential/user-agent exceptions under the success criterion where applicable
3. Test pointer-down followed by dragging outside before release to check cancellation; for native software, change OS display scaling, remeasure the effective target and compare it with the selected policy threshold

Expected / acceptance: WEB: targets are ≥24×24 CSS px or satisfy the success criterion's exception/spacing rule; dragging has a single-pointer alternative unless essential

Evidence: target measurements; non-drag demo; native unit/density/scale/runtime mapping; single-pointer no-drag recording separate from keyboard result

Scenarios: Tiny delete icon; Drag reordering; Map gesture; Reordering works with arrow keys but not clicks/taps: fail SC2.5.7 if no exception applies; Native display scaling changes and effective targets are remeasured

Remediation: Enlarge hit areas, add move buttons and make cancellation safe

Threshold / policy notes: 24×24 is the P01 AA minimum; 44×44 is the enhanced AAA criterion. Check exceptions against the actual text; local policy may be stricter according to users. Define the native threshold's metric/mapping/effective target for the platform context before testing, relying on P02 informatively and this policy; do not claim native WCAG2ICT conformance

Sources: P01 — 2.5.2; 2.5.7; 2.5.8; P02 — Applying SC 2.5.2 Pointer Cancellation to Non-Web Documents and Software; Applying SC 2.5.7 Dragging Movements to Non-Web Documents and Software; Applying SC 2.5.8 Target Size (Minimum) to Non-Web Documents and Software; Applying CSS pixel to Non-Web Documents and Software

Policy origin: recommended local release policy derived from cited principles

## UX008

**Meaningful text alternatives and complete media alternatives**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Information in images or audio is inaccessible

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Classify images/icons/charts/audio/video by decorative/informative/control function
2. Check alt text/names and captions/transcripts/audio description under the applicable criteria
3. Use a screen reader or mute audio to complete the job from the same information and compare results

Expected / acceptance: Information and actions have equivalent access appropriate to the media type

Evidence: media inventory; caption review; alternative task result

Scenarios: Sales chart; Instructional video; Audio alert

Remediation: Add descriptions of the actual information and alternative media

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.1.1; 1.2.1–1.2.5; P02 — Comments by Guideline and Success Criterion: 1.1.1; 1.2.1–1.2.5

Policy origin: recommended local release policy derived from cited principles

## UX009

**Forms explain required information and allow error correction**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users guess meanings or correct the wrong field

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Leave required fields empty and enter invalid formats, boundary values and multiple simultaneous errors
2. Check that labels/instructions/error suggestions are associated with fields and that focus moves to errors sensibly
3. Correct some fields and resubmit; verify that valid values remain and resolved errors disappear

Expected / acceptance: Errors identify the field and correction without relying on color alone; input-purpose metadata is present where applicable

Evidence: invalid-input cases; screen-reader error transcript

Scenarios: Multiple invalid fields; Server validation; Native keyboard

Remediation: Add error mapping and safely retain data that can be corrected

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.3.5; 3.3.1–3.3.3; P02 — Comments by Guideline and Success Criterion: 1.3.5; 3.3.1–3.3.3

Policy origin: recommended local release policy derived from cited principles

## UX010

**Review and cancel risky transactions**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: A mistaken click causes a transfer, deletion or commitment

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Identify legal/financial/data-modification commands and their reversibility
2. Before committing, show the target, amount, units, impact and a way to review/correct/confirm, or provide reversibility as required by the success criterion
3. Test cancel, back and data changes after opening confirmation; verify that confirmation does not use stale data

Expected / acceptance: The committed result matches what the user confirmed; all criterion-required protections are present

Evidence: confirmation state tests; cancel/no-write evidence

Scenarios: Delete a dataset; Transfer; Two people edit a transaction

Remediation: Add review/undo and bind confirmation to the operation version

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.3.4; P02 — Comments by Guideline and Success Criterion: 3.3.4

Policy origin: recommended local release policy derived from cited principles

## UX011

**Accessible authentication without memorization demands that lack alternatives**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users are excluded by CAPTCHAs or disabled paste

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Test login/reset/MFA with password managers and paste/autofill
2. Verify that every cognitive test has an alternative/mechanism/exception actually allowed by the success criterion
3. Complete a multi-step process and verify that previously entered information can be auto-populated/selected, except where exceptions apply

Expected / acceptance: No cognitive barrier lacks an AA-permitted alternative; security protections apply exceptions with a rationale

Evidence: auth accessibility cases; redundant-entry ledger

Scenarios: OTP paste; password manager; CAPTCHA

Remediation: Allow paste/autofill and add genuinely usable alternatives

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.3.7; 3.3.8; P02 — Comments by Guideline and Success Criterion: 3.3.7; 3.3.8

Policy origin: recommended local release policy derived from cited principles

## UX012

**Announce asynchronous status without stealing focus**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users do not know whether saving completed or an error occurred

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Perform search/save/upload using a screen reader and keyboard
2. Check that busy/progress/success/error statuses are announced with appropriate importance without unnecessary focus movement
3. Test multiple concurrent requests and verify that each status corresponds to its own job, without announcing the wrong item

Expected / acceptance: Status messages covered by SC4.1.3 can be detected by assistive technology; focus remains appropriate to the task

Evidence: status announcement transcript; concurrent request cases

Scenarios: background save; upload queue; search suggestions

Remediation: Fix live regions/native notifications and operation matching

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 4.1.3; 3.2.1; 3.2.2; P02 — Comments by Guideline and Success Criterion: 4.1.3; 3.2.1; 3.2.2

Policy origin: recommended local release policy derived from cited principles

## UX013

**Control over timeouts, motion and context changes**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users cannot finish in time or experience symptoms from motion

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Check session timeouts with warnings/extensions and exceptions permitted by the criterion
2. Test pause/stop/hide controls for auto-updates and animation; check flash thresholds
3. Focusing/typing/selecting in forms must not submit/navigate without warning or a request

Expected / acceptance: Timing/motion/control meet applicable A/AA criteria; local policy additionally calls for reduced motion in general tasks

Evidence: timeout scenario; motion inventory; context-change tests

Scenarios: timer; live ticker; auto redirect

Remediation: Add warnings/extensions/pause controls and remove onchange side effects

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 2.2.1; 2.2.2; 2.3.1; 3.2.1; 3.2.2; P02 — Comments by Guideline and Success Criterion: 2.2.1; 2.2.2; 2.3.1; 3.2.1; 3.2.2

Policy origin: recommended local release policy derived from cited principles

## UX014

**Consistent navigation, copy and help**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Changes to button names or locations cause users to make mistakes

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Compare shared navigation/control names/help across every template and locale
2. Check page titles/headings/link purpose and bypassing repeated navigation
3. Open deep links/back paths and determine whether on-screen wording tells users where they are and where to go next

Expected / acceptance: Wording and sequence support predictability; links communicate their purpose in context

Evidence: navigation comparison; copy glossary

Scenarios: Report page; Multi-step form; Help changes position

Remediation: Consolidate components/copy and clarify ambiguous titles/links

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 2.4.1; 2.4.2; 2.4.4; 2.4.6; 3.2.3; 3.2.4; 3.2.6; P02 — Comments by Guideline and Success Criterion: 2.4.1; 2.4.2; 2.4.4; 2.4.6; 3.2.3; 3.2.4; 3.2.6

Policy origin: recommended local release policy derived from cited principles

## UX015

**Visual appearance meets an owned baseline**

Requirement: RISK · Severity: Medium · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: AI generates inconsistent UIs with unclear hierarchy and states

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Define references for typography, spacing, icons, button hierarchy and every control state
2. Capture empty/large-data/long-text/error screens in supported themes and widths
3. Have the UX owner review diffs, distinguishing harmless rendering variation from overlapping data, missing buttons or incorrectly emphasized commands

Expected / acceptance: No unapproved visual regression causes misunderstanding or incorrect task execution

Evidence: approved screenshots; visual diff triage

Scenarios: loading skeleton; dense table; Thai long label

Remediation: Fix shared tokens/layout and approve a new baseline for intentional changes

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.3.1; 1.4.3; P02 — Comments by Guideline and Success Criterion: 1.3.1; 1.4.3; P08 — Test for compatibility

Policy origin: recommended local release policy derived from cited principles

## UX016

**Complete state matrix for views and commands**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Empty screens or network errors are displayed as no data

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Specify initial/loading/success/empty/partial/error/permission/offline/stale states for every critical view
2. Simulate each state with controlled data and failures
3. Check messages, next-action buttons and information that remains usable; empty must differ from error/denied

Expected / acceptance: Every state has a clear expected outcome; failures are not displayed as empty data

Evidence: state matrix; controlled-failure recordings

Scenarios: no results; 403; 503; partial list

Remediation: Add a state model and copy that distinguishes causes

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls; P01/P02 support accessibility/error-prevention outcomes and do not directly prescribe this state machine, idempotency or concurrency algorithm; these procedures are local policy that the reviewer must check together with the backend

Sources: P01 — 3.3.1; 4.1.3; P02 — Comments by Guideline and Success Criterion: 3.3.1; 4.1.3

Policy origin: recommended local release policy derived from cited principles

## UX017

**Prevent duplicate commands and false success**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Double-clicking or retrying executes a transaction twice

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Double-click/repeat Enter while a request is pending and when its response times out
2. Simulate a server commit followed by a lost response; let the user check status before retrying
3. Compare the UI operation ID with the persisted result and display success only after authoritative confirmation

Expected / acceptance: A single intent does not unexpectedly increase effects; an unknown outcome is not reported as a definite failure

Evidence: duplicate-intent cases; operation-state ledger

Scenarios: payment timeout; save double click; retry after reconnect

Remediation: Add operation identity, appropriate disabling and result reconciliation together with the backend

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls; P01/P02 support accessibility/error-prevention outcomes and do not directly prescribe this state machine, idempotency or concurrency algorithm; these procedures are local policy that the reviewer must check together with the backend; source-link distinction: P01 SC3.3.4/4.1.3 and P02 support only error prevention/status accessibility; operation ID/deduplication/authoritative confirmation/version conflicts are local business-correctness policy, not a WCAG protocol; synthesis must connect platform offline/synchronization and architecture/data evidence

Sources: P01 — 3.3.4; 4.1.3; P02 — Comments by Guideline and Success Criterion: 3.3.4; 4.1.3

Policy origin: recommended local release policy derived from cited principles

## UX018

**Competing requests and stale data do not overwrite newer data**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: An older search response arrives later and overwrites newer results

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Send search A followed by B, then make A respond after B
2. Use two tabs/two roles to edit the same object version and save nearly simultaneously
3. Check cancellation/version/conflict UI and test refetching after reconnecting

Expected / acceptance: Results match the active intent; conflicts do not silently overwrite data in risky jobs

Evidence: out-of-order response log; two-tab conflict case

Scenarios: autocomplete race; two editors; stale detail

Remediation: Add request identity/version checks and allow the user to resolve conflicts

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls; P01/P02 support accessibility/error-prevention outcomes and do not directly prescribe this state machine, idempotency or concurrency algorithm; these procedures are local policy that the reviewer must check together with the backend; source-link distinction: P01 SC3.3.4/4.1.3 and P02 support only error prevention/status accessibility; operation ID/deduplication/authoritative confirmation/version conflicts are local business-correctness policy, not a WCAG protocol; synthesis must connect platform offline/synchronization and architecture/data evidence

Sources: P01 — 3.3.4; 4.1.3; P02 — Comments by Guideline and Success Criterion: 3.3.4; 4.1.3

Policy origin: recommended local release policy derived from cited principles

## UX019

**Drafts, unsaved navigation and recovery**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Users lose data or believe it has been saved

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Fill a form, then test back/refresh/close/session expiry/network disconnection
2. Check autosave/drafts/unsaved warnings against data sensitivity and retention policy
3. Reopen and verify restored values, the correct user/role, and that a draft has not become a committed record

Expected / acceptance: Users distinguish saved/draft/unsaved states and can recover as contracted

Evidence: recovery cases; draft retention spec

Scenarios: browser crash; session expiry; shared device

Remediation: Add safe warnings/drafts or clearly disclose boundaries

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls; P01/P02 support accessibility/error-prevention outcomes and do not directly prescribe this state machine, idempotency or concurrency algorithm; these procedures are local policy that the reviewer must check together with the backend

Sources: P01 — 3.3.4; 2.2.1; 4.1.3; P02 — Comments by Guideline and Success Criterion: 3.3.4; 2.2.1; 4.1.3

Policy origin: recommended local release policy derived from cited principles

## UX023

**Readable Thai fonts and stacked characters**

Requirement: RISK · Severity: Medium · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Tone marks are clipped, text appears as boxes or words break incorrectly

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Use a corpus of long Thai names, above/below vowels, tone marks, Thai numerals, Thai mixed with Latin and emoji in every text style
2. Disable webfonts/network to test fallbacks; check line-height clipping, bold, italic and selected text
3. Test wrapping/truncation/copy-paste/search/IME on real devices and have a Thai reader review it

Expected / acceptance: Characters/tone marks are not lost; truncation provides a way to read the full value where necessary

Evidence: Thai text corpus; font-fallback captures; native reader review

Scenarios: Long Thai name; Font CDN down; Thai IME

Remediation: Increase font coverage/line height and truncate using appropriate text units

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.4.4; 1.4.10; 3.1.1; P02 — Comments by Guideline and Success Criterion: 1.4.4; 1.4.10; 3.1.1; P03 — 5.1; 5.2; 6.2; 8.1; 8.4

Policy origin: recommended local release policy derived from cited principles

## UX024

**Locale and language are not inferred from time zone**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Selecting English unexpectedly changes currency or permissions

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Separate language/locale/time-zone/currency preferences and define clear fallbacks
2. Change locale during a draft and through login/logout, then check persistence and account scope
3. Check page/part language metadata, untranslated keys and mixed-language pronunciation

Expected / acceptance: Language changes presentation, not data or permissions; fallbacks are readable

Evidence: locale preference cases; translation key audit

Scenarios: th-TH; en-TH; shared account

Remediation: Separate the preference model and add metadata/translations

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.1.1; 3.1.2; P02 — Comments by Guideline and Success Criterion: 3.1.1; 3.1.2; P04 — 2 Language; P05 — Part 1 Core: Unicode Language and Locale Identifiers

Policy origin: recommended local release policy derived from cited principles

## UX025

**Buddhist/Gregorian dates and times do not shift the date**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Birth dates or due dates move to another day during UTC conversion

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Distinguish date-only/instant/local appointment/recurrence and specify calendar/time-zone semantics
2. Test 2026-10-05 at 00:30 Asia/Bangkok, which is 2026-10-04T17:30Z in UTC; date-only values must not shift the day
3. Test Buddhist Era 2569 ↔ Gregorian 2026, leap days, invalid dates and time-zone changes/DST if international use is supported

Expected / acceptance: The UI identifies the year system when ambiguous; round trips preserve data type and meaning

Evidence: date semantic contract; boundary roundtrip table

Scenarios: birth date; Bangkok midnight; DST appointment

Remediation: Separate date-only values from instants and use locale formatters with explicit time zones

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.3.2; 3.3.3; P02 — Comments by Guideline and Success Criterion: 3.3.2; 3.3.3; P04 — 10.1; 10.2; P05 — Part 4 Dates: Calendars; Date Format Patterns; Time Zone Names

Policy origin: recommended local release policy derived from cited principles

## UX026

**Money, units and parsing are interpreted correctly**

Requirement: BLOCKER · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Baht/other currencies or comma-decimal values are calculated incorrectly

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Separate numeric value/currency/unit from formatted text and define business-based rounding rules
2. Test 1,234.50, Thai numerals, negative values, zero, large amounts and ambiguous separators in supported locales
3. Compare input → stored value → display → export → import, and line-item sums against the actual total

Expected / acceptance: Currency is not guessed solely from its symbol; round-trip values are comparable under the precision contract

Evidence: money/units fixture results; rounding approval

Scenarios: THB vs USD; tax rounding; Thai digits

Remediation: Use typed amount/currency and locale-aware validation without guessing

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.3.2; 3.3.3; 3.3.4; P02 — Comments by Guideline and Success Criterion: 3.3.2; 3.3.3; 3.3.4; P04 — 10.1; Working with numbers; P05 — Part 3 Numbers: Number Format Patterns; Currencies

Policy origin: recommended local release policy derived from cited principles

## UX027

**Names, addresses and text are not forced into Western conventions**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Thai people or users with multilingual names cannot use the service

Applicability: CORE: check every release for a human-facing UI, CLI or documentation; where present, test the native/platform equivalent. WCAG criteria are normative only for the web; non-web software relies on P02 and this policy

### Procedure

1. Test names containing spaces/punctuation, short/long names and names without a surname according to the audience
2. Specify length limits in bytes/code points/graphemes and separate display/search/identity normalization
3. Save, read back, export and search using Thai and other supported-language corpora without changing the actual name

Expected / acceptance: Validation does not reject names valid under the contract; normalization does not silently change identity

Evidence: name/text corpus; roundtrip/search results

Scenarios: Name with spaces; Thai mixed with English; Apostrophe

Remediation: Adjust schema/validation and preserve the original display form

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 3.3.2; 3.3.3; P02 — Comments by Guideline and Success Criterion: 3.3.2; 3.3.3; P04 — 4 Characters; 6 Text-processing; 10.3 Working with personal names; P03 — 6.2

Policy origin: recommended local release policy derived from cited principles

## GOV001

**Delivery evidence is bound to the released build**

Requirement: BLOCKER · Severity: Critical · Owner: Release owner · Reviewer: Independent reviewer

Purpose / risk: Reports look good but describe a different build

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Create a manifest of release digest/source revision/configuration/data schema and test environment without exposing secrets
2. Link every acceptance/accessibility/platform result to the same manifest
3. Have the reviewer sample links and check result timestamps/versions; reject placeholder evidence or AI-only claims

Expected / acceptance: Evidence is traceable to the candidate being released

Evidence: release evidence manifest; review sampling record

Scenarios: rebuild after approval; report from old branch

Remediation: Test the matching candidate and invalidate results whose version cannot be identified

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P06 — Step 5; P10 — Documenting the SLO and Error Budget Policy

Policy origin: recommended local release policy derived from cited principles

## GOV002

**Exception register with expiry and release blocking**

Requirement: BLOCKER · Severity: High · Owner: Accountable owner · Reviewer: Release reviewer

Purpose / risk: A RISK waiver is reused across releases indefinitely

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Check failed controls and prohibit BLOCKER waivers
2. For RISK, specify impact, exposure, compensating controls, owner, expiry and retest triggers
3. Simulate expired waivers, absent owners and nonfunctional mitigations; the release gate must reject them

Expected / acceptance: Incomplete or expired waivers cannot approve a release; N/A is not used to evade a failure

Evidence: waiver register; gate desk-test

Scenarios: expired exception; copy-paste waiver; N/A because test failed

Remediation: Fix the control or reaccept the risk with release-specific evidence

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P10 — Establishing an Error Budget Policy; P06 — Step 5

Policy origin: recommended local release policy derived from cited principles

## GOV003

**Usable user and administrator guides**

Requirement: RISK · Severity: High · Owner: Documentation owner · Reviewer: Receiving operator

Purpose / risk: The system depends on the builder's memory and cannot be handed over

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Document prerequisites, setup/first task/permissions/error recovery and limitations that match the release
2. Have a recipient who did not help build the system perform primary jobs and recovery using the guide and synthetic data
3. Record points requiring questions to the builder, then fix the documentation and try again

Expected / acceptance: The recipient can perform the specified jobs using documentation and escalation channels

Evidence: versioned user/admin guide; handover task transcript

Scenarios: new operator; permission setup; failed import

Remediation: Add hidden steps and align documentation with the UI/API

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 4; 6; 14

Policy origin: recommended local release policy derived from cited principles

## GOV004

**Handover of access, knowledge and responsibility**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner · Reviewer: Receiving owner

Purpose / risk: The builder's personal account is the only key to production

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Inventory owners of repositories/builds/deployments/domains/vendors/support/configuration/documentation without including credentials in the report
2. Have recipients confirm role-appropriate access and test break-glass/recovery through the responsible lane
3. Specify cutover time, post-handover accountability and how to revoke the sender's access where appropriate

Expected / acceptance: The work does not depend on one person; ownership and receipt are fully signed off

Evidence: handover ownership ledger; access verification attestation

Scenarios: creator leaves; personal vendor account; access denied

Remediation: Transfer ownership to organizational accounts and complete recovery before acceptance

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 6; 14; P10 — Getting Stakeholder Agreement

Policy origin: recommended local release policy derived from cited principles

## GOV005

**Change log and support promises match behavior**

Requirement: RISK · Severity: High · Owner: Product owner · Reviewer: Support/consumer representative

Purpose / risk: Users do not know about breaking changes or migration paths

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Summarize changed/deprecated/removed behaviors and affected users
2. For breaking changes, specify the effective date, migration/rollback/fallback and authorized contact with affected recipients
3. Test previous-version guide examples against the candidate and record incompatible cases

Expected / acceptance: Recipients know the impact and migration path; support is not claimed beyond what has been tested

Evidence: release notes; compatibility/migration examples

Scenarios: old bookmark; old client; renamed field

Remediation: Fix the migration guide or postpone the contract change

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 8; 3; P08 — Adapt to changing behaviour

Policy origin: recommended local release policy derived from cited principles

## GOV006

**Post-release review and closed feedback loop**

Requirement: RISK · Severity: Medium · Owner: Service owner · Reviewer: Product/risk reviewer

Purpose / risk: Recurring findings and deteriorating evidence do not enter the plan

Applicability: CORE: all software types, every release; make a reasoned applicability decision for components with no UI or no direct users

### Procedure

1. Define review triggers for incidents and changes to audience/platform/locale/third parties, plus a regular review date
2. Link support incidents/user findings to requirements/controls and an assignee with a completion deadline
3. Review accepted risks and measure whether compensating controls still work; invalidate disproven assumptions

Expected / acceptance: An owner/timebox is defined, and feedback actually changes contracts or tests

Evidence: post-release review plan; feedback→issue→retest linkage

Scenarios: new browser release; repeat support issue; expired assumption

Remediation: Open issues with verifiable acceptance and add regression tests specific to actual failures

Threshold / policy notes: This handbook's local policy; define scope before testing and always bind results to the release digest; N/A requires a rationale and reviewer; BLOCKER cannot be waived; RISK requires owner approval, an expiry date and compensating controls

Sources: P07 — 8; 10; P08 — Adapt to changing behaviour; P10 — Documenting the SLO and Error Budget Policy

Policy origin: recommended local release policy derived from cited principles

## SEC001

**Define asset and trust boundaries**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: System entry points or privileges are overlooked

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Diagram data inputs and outputs, stores, and participants, including CLI, files, plugins, and external services
2. Identify the trust boundaries, sensitive data, and service accounts associated with each arrow
3. Compare the diagram with the release diff and have the reviewer check for overlooked entry points in at least one review pass

Expected / acceptance: No entry point or asset lacks an owner and a risk decision

Evidence: diagram version; inventory; diff review

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S25 — System Modeling

Policy origin: recommended local release policy derived from cited principles

## SEC002

**Link threats to verification cases**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Checks pass without covering real attacks

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Model external attackers, low-privilege users, administrator mistakes, and compromised dependencies
2. For each asset, record ways to steal, modify, disrupt service, and bypass process steps
3. Link each mitigation to tests and an owner; attempt to disprove the most consequential assumptions

Expected / acceptance: Important threats have verification evidence or an explicit risk decision

Evidence: threat register; test mapping; review notes

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S25 — Threat Identification; Response and Mitigations; Review and Validation

Policy origin: recommended local release policy derived from cited principles

## SEC003

**Identify data and its lifecycle**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Excessive data collection and incomplete deletion

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory fields with their sensitivity, purpose, authorized accessors, and data-owner-approved retention
2. Trace sample data through the database, cache, exports, logs, backups, and vendors
3. Verify that retaining each copy has a rationale and a deletion method or retention exception

Expected / acceptance: Each data copy has an owner, purpose, and destination that can be explained

Evidence: data map; retention decisions; sample trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S15 — v5.0.0-V14.1 Data Protection Documentation

Policy origin: recommended local release policy derived from cited principles

## SEC004

**Prove deletion and restoration behavior**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Deleted data returns during restoration

Applicability: Systems that store user data; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Request deletion or expire synthetic data, then check the database, cache, indexes, and exports
2. Restore a backup in a sandbox and reapply the deletion list before making it available to users
3. Test a simulated legal hold and record copies that cannot be deleted immediately, with restricted access

Expected / acceptance: Deleted data does not return to the service; retention exceptions are auditable

Evidence: deletion results; restore reconciliation; hold test

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S15 — v5.0.0-V14.1; V14.2 General Data Protection

Policy origin: recommended local release policy derived from cited principles

## SEC005

**Isolate tenants across every data path**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Customer data leaks through background work

Applicability: Multi-tenant systems; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Create tenants A and B with similar object IDs, then attempt cross-tenant reads, writes, searches, and exports
2. Test list/search/export, cache keys, queue jobs, signed URLs, and tenant A administrators against tenant B resources; verify tenant context in both upstream components and workers
3. Switch tenants during a session and submit forged tenant IDs; check the audit trail and verify that tenant B data remains unchanged

Expected / acceptance: Denial occurs in a trusted layer on every path; no data from another tenant is exposed

Evidence: tenant matrix; raw result redacted; DB state comparison

Scenarios: A reads B; A modifies B; A exports B; Cross-tenant jobs/caches

Remediation: Enforce tenant-aware predicates and object/field authorization in the trusted service, including cache/job/export paths; do not trust tenant IDs from clients; after fixing, rerun the cross-tenant matrix and verify that tenant B state remains unchanged before delivery

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S09 — v5.0.0-8.2.2; v5.0.0-8.2.3; v5.0.0-8.3.1; v5.0.0-8.4.1

Policy origin: recommended local release policy derived from cited principles

## SEC006

**Validate schemas and boundaries in the service layer**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Validation enforced only in the UI is bypassed

Applicability: All inputs that affect data or privileges; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define field types, sizes, ranges, allowed values, and relationships
2. Send nulls, wrong types, negative values, oversized values, boundary cases, Unicode, and unexpected fields directly to the service
3. Verify that there are no side effects and that errors do not expose confidential structure

Expected / acceptance: Inputs that violate the specification are rejected before any dangerous use

Evidence: schema/rules; negative cases; state diff

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S03 — v5.0.0-V2.1; V2.2 Input Validation

Policy origin: recommended local release policy derived from cited principles

## SEC007

**Prevent query injection according to context**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Input becomes a query command

Applicability: Systems with a query language; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory SQL, NoSQL, LDAP, and XPath construction points, including stored procedures
2. Verify parameter binding and allowlists for column names used in sorting
3. Submit quotes, operators, and multiply encoded values in a sandbox; compare results against the initial data

Expected / acceptance: Data does not change query structure, and reads or writes do not exceed authorization

Evidence: sink inventory; code review; query test

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S02 — v5.0.0-V1.2 Injection Prevention

Policy origin: recommended local release policy derived from cited principles

## SEC008

**Control command and template execution**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Commands or code execute from input

Applicability: Software that uses a shell, templates, eval, or a document compiler; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify every process invocation, template use, and dynamic evaluation point
2. Replace them with APIs that separate arguments, or fixed templates with low privileges
3. Non-destructively test separators, argument injection, and template expressions; verify that no marker file appears outside the test area

Expected / acceptance: Input has no authority to create new commands or templates

Evidence: execution inventory; argument tests; sandbox trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S02 — v5.0.0-V1.2.5; V1.3.2; V1.3.7

Policy origin: recommended local release policy derived from cited principles

## SEC012

**Block SSRF and restrict egress**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: The service is used to access metadata or internal networks

Applicability: Systems that fetch URLs or support webhooks, proxies, or image imports; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory outbound destinations and allowlist necessary protocols, hosts, and ports
2. In a sandbox, use DNS/redirect fixtures to simulate loopback, private addresses, IPv6, metadata endpoints, and an IP change after resolution
3. Check every redirect and network policy; verify that credentials are not sent to unauthorized destinations

Expected / acceptance: No request escapes the approved destinations, including through redirects and DNS changes

Evidence: egress rules; fixture trace; denied destination results

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S02 — v5.0.0-V1.3.6; V1.5.3

Policy origin: recommended local release policy derived from cited principles

## SEC013

**Validate files before storage and processing**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Uploads become executable files or exhaust resources

Applicability: Systems that receive files; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define actual file types, sizes, counts, and processing methods; do not trust client-supplied extensions or MIME types
2. In a sandbox, test traversal filenames, double extensions, polyglots, and archives whose count or size exceeds the budget
3. Quarantine files before checking them with a low-privilege parser; separate them from executable paths and the primary origin

Expected / acceptance: Dangerous files are rejected or quarantined and neither execute nor write outside their allocated area

Evidence: upload policy; fixture hashes; storage/process permissions

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S06 — v5.0.0-V5.1; V5.2 File Upload and Content; V5.3 File Storage

Policy origin: recommended local release policy derived from cited principles

## SEC014

**Verify authorization and paths for downloads**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Knowing a filename enables reading another person's data

Applicability: Systems that offer file downloads; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Use users A and B to test IDs, paths, encoded traversal, and symlink fixtures
2. Verify that signed URLs bind scope, lifetime, and authorization; try them after revocation and expiration
3. Check Content-Disposition and MIME types to prevent misinterpretation, and ensure filenames do not reveal internal structure

Expected / acceptance: Only authorized files can be read at the time specified by policy; access cannot escape the root

Evidence: download test; URL expiry test; response headers

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S06 — v5.0.0-V5.3 File Storage; V5.4 File Download

Policy origin: recommended local release policy derived from cited principles

## SEC015

**Disable dangerous deserialization**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Serialized data creates objects or reads internal files

Applicability: Systems that parse XML, objects, or file formats; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory parsers and library options used with untrusted data
2. Disable external entities and client-selected object types; use safe decoders and allowlists
3. Submit XML external references to a fixture and forged type tags; verify that no network or file read occurs

Expected / acceptance: Parsers have no unauthorized side effects, and malformed input is rejected

Evidence: parser options; malformed fixtures; network/file trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S02 — v5.0.0-V1.5 Safe Deserialization

Policy origin: recommended local release policy derived from cited principles

## SEC017

**Prevent transaction and concurrency abuse**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Race conditions allow duplicate discounts or reservations

Applicability: Systems with important business flows; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Document invariants such as one-time entitlement use, non-negative balances, and approval order
2. Use limited resource=1 and actors A and B; set a barrier so both pass the read/check before commit; submit duplicates, bypass steps, replay, and capture an orchestrated interleaving trace and the number of durable outcomes
3. Simulate a crash or response loss after commit but before responding, then retry; there must be one winner and one conflict, or a serial outcome consistent with the invariant, without duplicate business effects

Expected / acceptance: Invariants are not violated, and retries recover without creating additional entitlements

Evidence: invariant spec; concurrent trace; ledger/state comparison

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Use atomic transactions, constraints, conditional updates, or durable reconciliation according to the stack and invariant; bind deduplication to durable outcomes; rerun the barrier race and post-commit crash tests while checking the ledger and the number of consequential outcomes

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S03 — v5.0.0-2.3.1; v5.0.0-2.3.3; v5.0.0-2.3.4

Policy origin: recommended local release policy derived from cited principles

## SEC021

**Prove cryptography and key rotation**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Custom cryptography or damaged keys make data unreadable

Applicability: Software that uses encryption, hashing, signatures, or randomness; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory algorithms, libraries, key purposes, and protected data
2. Review use of maintained libraries, non-repeating nonces/IVs, and system-provided randomness; prohibit custom mechanisms without review
3. Test decryption and verification with tampered data and incorrect keys, and test key rotation including reading old data

Expected / acceptance: Tampered ciphertext or signatures are rejected; rotation neither loses data nor resumes use of revoked keys

Evidence: crypto inventory; tamper tests; rotation rehearsal

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S12 — v5.0.0-V11.1; V11.2; V11.3; V11.5 Random Values

Policy origin: recommended local release policy derived from cited principles

## SEC022

**Find leaked secrets and actually revoke them**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Files are deleted but old tokens still work

Applicability: All repositories, artifacts, configurations, and runtimes; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Check candidate source, history, artifacts, logs, and client bundles with a secret detector and manual sampling
2. Insert a synthetic secret as a canary to prove that the scanner and exclusions do not leave a detection gap
3. If a real secret is found, revoke or rotate it according to the owner's procedure; verify that the old token no longer works in a test account

Expected / acceptance: No live secret is present in published locations; findings are not closed merely because the text was deleted

Evidence: scan tool/version; canary result; revocation evidence redacted

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S14 — v5.0.0-V13.3 Secret Management

Policy origin: recommended local release policy derived from cited principles

## SEC023

**Check TLS on every path and under failure**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Forged certificates are accepted or plaintext escapes

Applicability: Systems that communicate over a network; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory client-server, service-service, vendor, and redirect paths
2. In a sandbox, use expired, wrong-host, and untrusted-CA certificates, along with plaintext paths
3. Verify connection failure and the absence of fallback that sends secrets; document justified local-loopback exceptions

Expected / acceptance: Channels carrying sensitive data authenticate peers and use encryption according to approved policy

Evidence: connection inventory; certificate fixture tests; TLS settings

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S13 — v5.0.0-V12.1; V12.2; V12.3 General Service to Service Communication Security

Policy origin: recommended local release policy derived from cited principles

## SEC024

**Log traceable events without leaking data**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: It is unclear who exercised privileges, and logs contain confidential data

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define events for login failures, authorization denials, administrator changes, exports, secret rotation, and correlation
2. Generate synthetic events containing malicious newline/Unicode text and verify log encoding
3. Check read/write permissions and retention; verify that there are no passwords, tokens, or unnecessary PII and that alerts reach the responsible person

Expected / acceptance: Important events are traceable; users cannot forge log lines or modify logs

Evidence: event matrix; redacted sample; permissions; alert receipt

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S17 — v5.0.0-V16.1–V16.4

Policy origin: recommended local release policy derived from cited principles

## SEC025

**Check fail-closed behavior and runtime privileges**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Dependency failures cause access to be allowed, or software runs as root unnecessarily

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Check runtime accounts, file, database, and network permissions, and debug features in the production configuration
2. Use fault fixtures to cause policy-service/database timeouts and missing configuration
3. Invoke operations requiring authorization during the failure; verify safe denial and that recovery does not increase privileges

Expected / acceptance: Failures do not allow operations whose authorization cannot be checked; the runtime uses only the minimum necessary privileges

Evidence: permission manifest; fault results; config review

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S16 — v5.0.0-V15.2 Security Architecture and Dependencies; V15.3 Defensive Coding

Policy origin: recommended local release policy derived from cited principles

## IDN001

**Define roles, permissions, and service accounts**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: It is unclear who has authority, or accounts are shared

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Build a matrix of subjects, roles, resources, actions, and approval conditions, including service accounts
2. Identify anonymous, normal, operator, administrator, support, and suspended users
3. Have the business owner approve the matrix before using it to create negative tests

Expected / acceptance: Every privilege has a rationale and an owner; no implicit privilege remains unchecked

Evidence: role matrix; approval; service inventory

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S09 — v5.0.0-V8.1 Authorization Documentation

Policy origin: recommended local release policy derived from cited principles

## IDN002

**Enforce object and field authorization**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Reading or modifying another person's objects or fields

Applicability: Systems with users or objects subject to distinct permissions; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Create users A and B and an administrator; invoke CRUD, list, and export operations against each other's objects
2. Submit additional owner, role, tenant, and balance fields from the client, and attempt to read confidential fields through projection
3. Check both responses and state to verify that unauthorized data is neither read nor modified
4. Have user A invoke a high-privilege service account and attempt to read B's data; downstream authorization must use the originating subject and deny access without borrowing the service's authority

Expected / acceptance: Denial in the trusted layer covers objects and fields for every operation

Evidence: negative matrix; redacted response; state diff

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Enforce object/field policy in the trusted service and pass originating-subject context downstream; do not substitute intermediary privileges for those of the caller; rerun response-and-state tests and tests through a service account

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S09 — v5.0.0-8.2.2; v5.0.0-8.2.3; v5.0.0-8.3.1; v5.0.0-8.3.3

Policy origin: recommended local release policy derived from cited principles

## IDN003

**Verify administrator boundaries and prevent self-approval**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Low-privilege users invoke high-authority functions

Applicability: Systems with administration or approval; multi-user approval applies only to high-value flows declared by the risk assessment, and does not mean that every administrator action requires two people; record applicability and N/A with a reviewer for every release

### Procedure

1. As normal/support users, invoke administrator endpoints, CLI, and job APIs directly, without going through the UI
2. Attempt to grant oneself privileges, approve one's own requests, and use a service account as a user
3. For declared high-value flows, have the requester attempt self-approval and have two approvals race at a barrier; the threshold must count distinct approvers who are actually authorized and must not be bypassed

Expected / acceptance: Unauthorized roles cannot invoke the functions, and one person cannot create a two-person approval

Evidence: function matrix; approval trace; principal comparison

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Separate requester and approver principals for declared high-value flows, and count approvals atomically while verifying distinct identities; close direct administrator routes that bypass policy and rerun self-approval and concurrent-approval tests

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S09 — v5.0.0-V8.3 Operation Level Authorization; V8.4 Other Authorization Considerations; S03 — v5.0.0-2.3.5

Policy origin: recommended local release policy derived from cited principles

## IDN004

**Revoke privileges across pending work**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Removed employees can still use tokens or jobs

Applicability: Systems with sessions, tokens, caches, or queues; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Create user sessions on multiple devices and pending user jobs
2. Reduce the role or suspend the user, then test existing sessions, tokens, caches, and WebSocket connections; pause a worker before commit, revoke authorization, and then resume to verify reauthorization at the point where consequential effects are created; measure the actual delay
3. Restore the account through the approval procedure and verify that old privileges do not return without approval

Expected / acceptance: Sensitive reads must be denied immediately upon revocation within this scope; pending consequential modifications recheck authorization before commit; if delay is accepted for other actions, detection and reversion must be proven and must not be claimed to compensate for information already leaked by a read

Evidence: revocation policy; cross-channel tests; queue trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Add invalidation or versioned authorization and recheck at sensitive reads/commits; if self-contained tokens are used, verify detection/reversion only for actions whose effects can be compensated; do not use delay to justify accepting leaked read data; rerun stale-token/cache/worker fixtures

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats; ASVS 8.3.2 specifies immediate changes; alternatives must detect/revert and cannot compensate for information leakage; a revocation window alone does not constitute conformance with this requirement; claiming a level requires proving all scoped requirements

Sources: S09 — v5.0.0-8.3.2; v5.0.0-8.3.3

Policy origin: recommended local release policy derived from cited principles

## IDN005

**Choose assurance and MFA according to authority**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: High-authority accounts are compromised through a single factor

Applicability: Authentication systems; local privileged MFA policy; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Assess impact and select assurance for each role without claiming an AAL that has not been proven
2. Enforce MFA for administrators of deployment, secrets, and high-risk data under this policy
3. Test missing factors, incorrect factors, phishing-resistant options, and recovery that does not bypass assurance

Expected / acceptance: High-authority roles cannot operate with authentication below the approved assurance

Evidence: assurance decision; MFA tests; recovery review

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S19 — 2 AALs; 3.2.5 Phishing Resistance

Policy origin: recommended local release policy derived from cited principles

## IDN006

**Verify passwords without imposing constraints from the wrong revision**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Weak passwords or plaintext storage

Applicability: Systems that authenticate with passwords; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Use a policy aligned with the risk and selected revision; check blocklists and allow password managers and pasting
2. Verify that the verifier stores salted password hashes with an approved cost, benchmarked on the actual hardware
3. Test prohibited passwords, long Unicode passwords, and a brute-force fixture; do not log passwords

Expected / acceptance: No plaintext or reversible password storage is used, and the policy does not silently truncate secrets

Evidence: password policy; hash settings; benchmark; test results

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S19 — 3.1.1 Passwords; 3.2.2 Rate Limiting

Policy origin: recommended local release policy derived from cited principles

## IDN007

**Control login abuse without making it easy to lock out others**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Credential stuffing and account enumeration

Applicability: Login, reset, and registration systems; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Test existing and nonexistent accounts using the resulting responses; include valid and invalid credentials
2. Submit incorrect attempts within the test budget from multiple simulated sources and verify account-level and service-level backoff/rate limits
3. Verify that an attacker cannot permanently lock out a victim's account and that recovery/monitoring has an owner

Expected / acceptance: Guessing and enumeration are reduced according to the threat model without opening an unacceptable denial-of-service path

Evidence: abuse budget; synthetic attempts; recovery/alert trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S07 — v5.0.0-V6.3 General Authentication Security

Policy origin: recommended local release policy derived from cited principles

## IDN008

**Verify reset and factor recovery**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Recovery is weaker than login

Applicability: Password/MFA recovery systems; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Submit incorrect, expired, reused, and other-account reset tokens; verify that tokens do not appear in logs
2. Have two reset requests use the same token concurrently and verify that only the specified number can succeed
3. After changing a factor or secret, notify the user through a trusted channel and check session termination according to policy

Expected / acceptance: Recovery does not transfer accounts or bypass verification; one-time token use is atomic

Evidence: recovery test; concurrent token use; notification fixture

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S07 — v5.0.0-V6.4 Authentication Factor Lifecycle and Recovery

Policy origin: recommended local release policy derived from cited principles

## IDN009

**Prevent session fixation and token leakage**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: An attacker's session is elevated when the victim logs in

Applicability: Systems with sessions; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Start an anonymous session, then log in and perform step-up authentication; verify that the session secret changes according to risk
2. Attempt the old secret after the change and check for tokens in URLs, referrers, error logs, and client storage
3. Verify that tokens use system-provided randomness and do not appear in telemetry

Expected / acceptance: Pre-authentication secrets cannot substitute for high-privilege sessions and do not leak through unnecessary channels

Evidence: session transition; old-token reject; leak audit

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S08 — v5.0.0-V7.2 Fundamental Session Management Security; V7.5 Defenses Against Session Abuse

Policy origin: recommended local release policy derived from cited principles

## IDN010

**Test timeouts, logout, and multiple sessions**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Logout affects only the UI while the session remains active

Applicability: Session systems, including federated login; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define idle and absolute timeouts and actions requiring reauthentication according to impact
2. Test before and after timeout, logout, password changes, and logout from all devices
3. Test two concurrent requests during logout and with an IdP session still active; clearly distinguish the RP and IdP

Expected / acceptance: Terminated sessions cannot continue operating, and silent federation does not bypass reauthentication for consequential operations

Evidence: timeout policy; multi-device tests; race trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S08 — v5.0.0-V7.3; V7.4; V7.6 Federated Re-authentication

Policy origin: recommended local release policy derived from cited principles

## IDN013

**Verify the declared OAuth/OIDC flows**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Code injection, redirect leakage, and mix-up

Applicability: OAuth/OIDC client/server systems; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory public/confidential clients, redirects, and providers; use code flow with PKCE S256 according to local policy
2. Submit incorrect redirects, incorrect state/nonce, missing verifiers, and replayed codes; swap issuers in a fixture
3. Verify that ROPC is not used and that scopes/audiences are limited; document the rationale if an RFC SHOULD differs from local policy

Expected / acceptance: Codes/tokens are bound to the transaction/client/issuer and do not leak through redirects; scoped MUST requirements pass

Evidence: flow config; adversarial callbacks; RFC mapping

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S20 — 2.1; 2.1.1; 2.3; 2.4

Policy origin: recommended local release policy derived from cited principles

## IDN014

**Prove refresh replay handling and rotation**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Stolen tokens can extend privileges indefinitely

Applicability: Refresh-token systems; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Document the sender-constraining or rotation mechanism used; public clients must use one of these according to the RFC
2. Reuse old refresh tokens and send two concurrent requests; test with a simulated attacker and legitimate user
3. Verify family revocation, alerts, reauthentication, and legitimate-user recovery without restoring stolen tokens

Expected / acceptance: Replay is detected according to policy, and recovery does not grant privileges to holders of old tokens

Evidence: token family trace; concurrency test; recovery result

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S20 — 2.2.2; 4.14 Refresh Token Protection

Policy origin: recommended local release policy derived from cited principles

## SUP001

**Assign human responsibility for AI-generated diffs**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Nobody understands security-critical code

Applicability: All AI-assisted changes; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify the human owner of the diff, the tool, and the model/version if known
2. Have someone who understands the area review control flow, authorization, cryptography, errors, and build changes; do not substitute AI approval
3. Bind approval to the commit/artifact hash and record questions investigated until understood

Expected / acceptance: Every diff has a human owner/reviewer, and approval matches the version delivered

Evidence: commit review; owner; tool metadata; artifact hash

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S24 — Section 14 Human Accountability

Policy origin: recommended local release policy derived from cited principles

## SUP002

**Verify AI-modified tests against independent requirements**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Tests pass because assertions are weakened or important behavior is mocked

Applicability: All AI-assisted test/security changes; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Examine test diffs for deletions, weakened assertions, and new mocks
2. Have the reviewer add negative cases from requirements/threats that do not rely solely on the same implementation
3. Perform a safe mutation, such as removing authorization in a fixture, verify that the test fails, then restore the code

Expected / acceptance: Tests prove invariants and detect intentionally introduced faults

Evidence: test diff review; independent case; mutation result

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S24 — Section 8 Test Fabrication and Test Deletion

Policy origin: recommended local release policy derived from cited principles

## SUP003

**Limit coding-agent authority and context**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Prompt injection steals secrets or changes policy

Applicability: Projects that use a coding agent; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Check allowlists for tools, networks, and write paths, and the data sent to the provider; use a low-privilege sandbox account
2. Insert synthetic text in an issue/log encouraging the agent to read secrets or change a release rule
3. Verify that agent actions stay within scope and that rules, CI, tests, and security configuration require human review

Expected / acceptance: Untrusted data does not change agent authority, and no secret appears in prompts

Evidence: agent permissions; prompt fixture; policy diff review

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S24 — Sections 3,5,6,9,10

Policy origin: recommended local release policy derived from cited principles

## SUP004

**Verify that AI-proposed dependencies exist and have correct sources**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Hallucinated names, typosquatting, or compromised packages

Applicability: All third-party components; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Check names, namespaces, versions, publishers, repositories, and integrity against an approved registry
2. Review dependency and install-hook diffs, including transitive dependencies and similarly named packages
3. Select continuously maintained versions and document a risk-based cooldown; urgent security fixes do not automatically wait

Expected / acceptance: Components have provenance and a selection rationale; they are not installed solely because AI proposed them

Evidence: dependency review; registry metadata; install-hook diff

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S24 — Sections 1,2,10

Policy origin: recommended local release policy derived from cited principles

## SUP005

**Generate an SBOM from the artifact and disclose incompleteness**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: The dependency inventory does not match what is released

Applicability: All releases containing components; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Generate an SBOM from the artifact, including direct/transitive dependencies, vendored components, runtimes, and base images in the selected format
2. Validate the schema and compare sample components with the lockfile/artifact digest
3. Mark composition as unknown/incomplete and assign an owner to gaps; do not claim completeness based on an absence of search results

Expected / acceptance: The SBOM is bound to the artifact and records identity, version, supplier, dependency graph, and verifiable limitations

Evidence: SBOM; schema result; artifact digest; reconciliation

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S22 — BOM Metadata; Components; Dependencies; Compositions

Policy origin: recommended local release policy derived from cited principles

## SUP006

**Triage vulnerabilities using current information**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Reports look clean because feeds are stale or exceptions are arbitrary

Applicability: All component releases; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Scan the artifact/SBOM with a timestamped feed and link findings to versions and usage
2. Have a human assess reachability, exploit prerequisites, public exposure, and root cause; do not use CVSS alone
3. Classify as BLOCKER a vulnerability demonstrably exploitable to compromise privileges or sensitive data without mitigation; residual RISK requires an owner, expiration, and compensating control

Expected / acceptance: No severe attack path remains open; suppressions have evidence rather than AI-generated assertions

Evidence: feed timestamp; triage; reproduction or mitigation; waiver register

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S18 — PW.4; RV.1; RV.2

Policy origin: recommended local release policy derived from cited principles

## SUP007

**Protect source and build pipelines from unreviewed changes**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: CI is compromised and releases something other than what was reviewed

Applicability: All release pipelines; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Restrict write/merge/release roles and protect branches, rules, and security configuration through reviewers
2. Use immutable references/digests for tools, actions, dependencies, and build inputs where possible; document exceptions
3. Simulate an untrusted PR in a sandbox and verify that it has neither deployment secrets nor write permissions

Expected / acceptance: Untrusted builds do not receive release authority, and rule changes are reviewed

Evidence: branch/rules config; build references; untrusted job permissions

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S18 — PO.5; PS.1; PO.3

Policy origin: recommended local release policy derived from cited principles

## SUP008

**Generate provenance and verify it before deployment**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: The signature is valid, but the artifact does not match the commit or builder

Applicability: All release artifacts; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Record provenance subject digest, source commit, builder identity, parameters, and resolved inputs according to the selected level
2. An independent verifier checks the signature/root of trust, subject digest, predicateType, expected repository, commit, builder identity, buildType, and externalParameters; unknown parameters must be rejected according to policy, rather than merely checking signature validity
3. Change the digest and builder/source in a fixture; verification must reject it and prevent deployment

Expected / acceptance: The deployed artifact matches the reviewed artifact and trusted build according to policy

Evidence: provenance; verification policy/result; tamper fixture

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Pin verifier roots of trust and expected source/builder/digest/buildType/parameters independently of the untrusted build; reject artifacts that do not meet expectations and run tampering fixtures before promoting the same previously verified digest

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S21 — Producer/Follow a consistent build process; Build Platform/Provenance generation; S27 — How to verify; Step 1: Check SLSA Build level; Step 2: Check expectations; Forming Expectations

Policy origin: recommended local release policy derived from cited principles

## SUP009

**Test build isolation and keep SLSA claims within the evidence**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: One job poisons caches or accesses a signing key

Applicability: Build systems with SLSA claims or high risk; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify the desired build-track level and accountable producer/platform parties; do not interpret L1 as authenticated
2. In an isolated test, run two builds concurrently and builds sequentially, attempting to read the other job's canary/cache
3. Verify that the signing key is outside user-defined builds and collect evidence for each requirement before claiming L3

Expected / acceptance: Claims match the level proven; cross-job build interference and key access are prevented

Evidence: level assessment; isolation fixture; key boundary

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S21 — Build levels; Provenance generation; Isolation strength

Policy origin: recommended local release policy derived from cited principles

## SUP010

**Deliver functioning vulnerability reporting and updates**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: After delivery, nobody is responsible for patching

Applicability: All software; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify the security contact, owner, support window, and advisory/update routes
2. Rehearse reporting a synthetic vulnerability, triaging it, notifying affected parties, and releasing a patch in a sandbox
3. Review the root cause and add regression tests; verify that those taking over the work can access the SBOM, provenance, and revocation/rotation procedures

Expected / acceptance: An accountable person is assigned, and users receive verifiable mitigations/patches throughout the support window

Evidence: contact check; tabletop timeline; patch rehearsal; handover receipt

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S18 — RV.1; RV.2; RV.3; PS.3

Policy origin: recommended local release policy derived from cited principles

## REL001

**Define the service through user tasks**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Uptime is measured while users cannot complete their tasks

Applicability: All software; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Select critical tasks, users, and usage periods
2. Define good events, including correctness/freshness appropriate to the task
3. Have the product owner and operations sign off on the metric and its scope

Expected / acceptance: User success can be measured, and blind spots are identified

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O01 — What to Measure: Using SLIs

Policy origin: recommended local release policy derived from cited principles

## REL002

**SLOs have a rationale and an accountable decision-maker**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Using the same numbers for every system or committing beyond capacity

Applicability: Every release; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Identify the harm from slowness/outages/stale data and the available baseline
2. Select the target/window in relation to costs and dependencies
3. Record assumptions, review date, and the person authorized to trade features against reliability

Expected / acceptance: Targets come from context; there is no universal SLA or p95

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O01 — Getting Stakeholder Agreement

Policy origin: recommended local release policy derived from cited principles

## REL003

**Error budgets affect actual release decisions**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: SLOs are only dashboards with no practical effect

Applicability: Every release; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Calculate allowed bad events from the SLO/window
2. Define the freeze/exception/recovery policy before an incident
3. Simulate an exhausted budget and have the release owner follow the policy

Expected / acceptance: Budget exhaustion leads to the agreed risk-reduction actions

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O01 — Establishing an Error Budget Policy

Policy origin: recommended local release policy derived from cited principles

## REL004

**Load tests represent the actual workload mix**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: High RPS is achieved while every request is lightweight

Applicability: Services or programs with multiple workload types; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Build a workload mix from forecasts without using personal data
2. Run steady/burst/heavy workloads concurrently with batch work
3. Capture CPU, RAM, I/O, queue, latency/error, and saturation points

Expected / acceptance: The capacity envelope and bottlenecks are known for the workload mix

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O03 — The Pitfalls of "Queries per Second"

Policy origin: recommended local release policy derived from cited principles

## REL005

**Overloaded systems reject work in a controlled way**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Queues grow until the entire system fails

Applicability: Systems that continuously accept work; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define queue/concurrency limits and priorities for critical work
2. Send load above the limits in a sandbox
3. Reduce the load, then check recovery and previously accepted work

Expected / acceptance: Backpressure/rejection is explicit; accepted work is not lost

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O03 — Criticality; Client-Side Throttling

Policy origin: recommended local release policy derived from cited principles

## REL008

**Degrade honestly when dependencies fail**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Fallback stale data is presented as fresh data

Applicability: All systems that depend on other services; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Classify dependencies as critical/optional
2. Inject timeout/unavailable/invalid responses in mocks
3. Check degraded mode, freshness labels, and side-effect prohibitions
4. Separate policy/identity/authorization/key-validation dependencies from optional content; inject timeout/malformed/empty responses, then sensitive reads/privileged mutations must fail closed according to scope; allow-all fallback or another tenant's cache is prohibited

Expected / acceptance: Critical functions do not produce incorrect results; users know the limitations; authorization outages neither increase privileges nor expose data; freshness labels do not compensate for unauthorized reads

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Separate content fallback from authorization decisions; deny/error when authorization cannot be established, use trusted tenant-scoped caches only under policies that do not expand privileges, and invalidate according to revocation; rerun dependency-fault exercises; BLOCKER controls cannot be exempted

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O03 — Handling Overload; O21 — 8.3.1; 8.3.2; 8.4.1; O26 — 16.5.2; 16.5.3

Policy origin: recommended local release policy derived from cited principles

## REL009

**Isolate workloads to prevent cascading failures**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: One tenant or batch monopolizes the pool

Applicability: Systems with multiple workload groups; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Identify shared pools and quotas
2. Run heavy work from group A alongside critical work from B
3. Measure B and reduce A through the isolation mechanism

Expected / acceptance: One group's load does not damage critical work beyond the approved boundary

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O03 — Criticality; per-customer quotas (lines 77–87)

Policy origin: recommended local release policy derived from cited principles

## REL010

**Scale in time and do not abandon work during scale-in**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Autoscaling is enabled but warm-up is slow or work is killed

Applicability: Systems with scaling; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Run ramp load and compare detection/provisioning/warm-up times
2. Reduce instances while requests/jobs are running
3. Check draining, backlog, and costs until steady state

Expected / acceptance: Capacity increases in time for the plan; scale-in preserves results and can release resources

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O19 — Case Study 2: When Load Shedding Attacks; Lessons learned

Policy origin: recommended local release policy derived from cited principles

## REL011

**Costs have limits and a load-reduction switch**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Retries/logging/storage drive costs beyond budget

Applicability: All systems using resources that incur costs; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Calculate costs from the resource envelope and prices with their as-of date
2. Simulate bursts, retries, retention, and outages
3. Define budget alerts/quotas and the consequences of reaching their limits
4. In fixtures, bypass SDK/client caps using a non-cooperative client and multiple tokens; check server quotas by principal/tenant/business budget and provider-stub call counts after rejection/cancellation; other tenants' data must not be exposed and their resources must not be seized

Expected / acceptance: Workload costs and load-reduction paths that do not corrupt data are known

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers; cooperative client throttling does not replace server-side enforcement against hostile clients; link SEC016/SEC017 and do not copy the multiplier K

Sources: O03 — The Pitfalls of "Queries per Second"; O25 — 2.4.1; O24 — 13.1.3

Policy origin: recommended local release policy derived from cited principles

## REL014

**RTO/RPO are grounded in impact and a supporting plan**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Recovery targets do not match business needs

Applicability: All systems; stateless systems must specify how to rebuild; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Have the task owner identify tolerable downtime and data loss
2. Compare recovery strategies, costs, and limitations
3. Select objectives with the authorized decision-maker and define the emergency path

Expected / acceptance: Recovery targets have a rationale and are not confused with availability SLOs

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O10 — REL13-BP01; REL13-BP02

Policy origin: recommended local release policy derived from cited principles

## REL015

**Exercise the full DR path and return to the primary system**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: A replica exists, but login/DNS/config do not work

Applicability: Systems with disaster-recovery plans; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Simulate primary unavailability in a sandbox
2. Recover infra/config/data and validate the critical journey
3. Test failback with writes made on the standby side and record drift

Expected / acceptance: The entire service can be recovered and returned without splitting data into two divergent sets

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O10 — REL13-BP03; REL13-BP04; REL13-BP05

Policy origin: recommended local release policy derived from cited principles

## OPS001

**Build and release traceable artifacts**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The tested artifact differs from the released artifact

Applicability: Every release; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Build from pinned commits/lockfiles
2. Record the digest and tie verification results to that same artifact
3. Promote the same digest and read the release identity from the runtime

Expected / acceptance: The artifact/config/schema actually in use are traceable

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O18 — Hermetic Builds; Building; Testing; Packaging; Deployment

Policy origin: recommended local release policy derived from cited principles

## OPS002

**Recreate environments from IaC/documentation**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The existing machine hides manual steps

Applicability: Systems with infrastructure; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Create a new sandbox from IaC or versioned procedures
2. Check the diff against the intended configuration and record manual steps
3. Repeat using the handover operator instead of the original creator

Expected / acceptance: Dependencies/config are not hidden on a developer's machine

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O18 — Deployment

Policy origin: recommended local release policy derived from cited principles

## OPS003

**CI/CD fails closed when mandatory criteria fail**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Tests are red but deployment succeeds

Applicability: Every pipeline; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Inject failure into a mandatory check on a test branch
2. Verify that the pipeline stops before promotion
3. Verify that gate bypasses are disabled or that decisions are recorded according to the control's requirement level

Expected / acceptance: Failed BLOCKER controls prevent release; RISK exceptions have an owner and expiry

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O18 — Enforcement of Policies and Procedures; Testing

Policy origin: recommended local release policy derived from cited principles

## OPS004

**Invalid configuration is detected before accepting work**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Incomplete values start the service in a dangerous state

Applicability: All systems with configuration; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define schema/defaults and dependencies between values
2. Set absent/invalid/conflicting values in a sandbox
3. Inspect startup validation and diagnostics that do not expose secrets

Expected / acceptance: Invalid critical configuration prevents accepting work; diagnostics explain how to fix it

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O12 — Configuration Asks Users Questions

Policy origin: recommended local release policy derived from cited principles

## OPS005

**Rollouts limit harm and have a stop rule**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Full rollout occurs before a regression is detected

Applicability: Services that can be rolled out group by group; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Select canary/control groups representative of critical work
2. Declare stop criteria and a traffic-based observation window
3. Inject a regression and verify stopping/reducing exposure

Expected / acceptance: Canary decisions use metrics and sufficient data; they do not rely solely on waiting a fixed time

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O11 — What Is Canarying?

Policy origin: recommended local release policy derived from cited principles

## OPS006

**Rollback covers binaries, configuration, and data**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Undoing a binary change leaves the schema unreadable

Applicability: Every release that changes the runtime; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Specify the point of no return and choose rollback/roll-forward
2. Exercise returning to the previous version after writes from the new version
3. Validate the critical journey and data invariants
4. Before reopening service after restore/rollback, reconcile deletion tombstones, account/role/session revocation, and key-rotation/revocation journals newer than the snapshot; the journal must remain outside the rollback boundary or be recoverable up to the present; if freshness cannot be proven, do not open sensitive paths
5. Use an area isolated by permissions/network and fixtures containing deleted data, suspended users, and revoked canary keys; verify that deleted data/users do not become active again, revoked identities/keys have no access, and no canary secrets appear in logs before opening the critical journey under current permissions

Expected / acceptance: A usable version is recovered; impossible data-reversal steps are explicitly identified; deleted active data, revoked privileges/sessions, or revoked keys are not returned to service

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name; Restore/rollback isolation boundary and journal checkpoint/reconciliation report; Deleted-record/suspended-user/revoked-key fixtures before and after reconciliation

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix binary/schema/config compatibility; use expansion-first migrations and defer destructive data steps; if data cannot be rolled back, prepare rehearsed roll-forward/reconciliation with traffic stops at risky points; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures; separate the durable deletion/revocation journal from the snapshot being rolled back and replay in version order; invalidate sessions and rotate/revoke secrets from current sources before opening traffic; if the journal is incomplete, quarantine sensitive paths

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers; deletion/revocation journal reconciliation is local recovery-security policy linked to SEC004/IDN004/SEC022; do not claim AWS directly provides this recipe

Sources: O05 — Rolling Back a Deployment; O21 — 8.3.2; O23 — 14.1.2; 14.2.4; 14.2.7; O24 — 13.2.2; 13.3.1; 13.3.2; 13.3.4

Policy origin: recommended local release policy derived from cited principles

## OPS007

**Readiness and rollout progress have meaningful semantics**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The process is alive but cannot accept work

Applicability: Services with health checks; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Separate liveness/readiness and startup conditions
2. Simulate readiness reported before warm-up and dependency failure
3. Check routing and stalled rollouts, including stop/rollback actions

Expected / acceptance: No traffic is sent to unready instances; failures have an accountable owner

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O05 — Failed Deployment; Progress Deadline Seconds

Policy origin: recommended local release policy derived from cited principles

## OPS008

**Feature flags can be disabled and have an expiry**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Flags create unreviewed code paths

Applicability: Systems using feature flags; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Test on/off with supported binary/schema versions
2. Disable the flag during work and check outstanding effects
3. Specify the owner/expiry and how to remove the flag

Expected / acceptance: Disabling the flag can reduce harm without corrupting data; flags are not left indefinitely without an owner

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O11 — Separating Components That Change at Different Rates

Policy origin: recommended local release policy derived from cited principles

## OPS009

**Correlate user outcomes with internal events**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Dashboards are green while customers encounter errors

Applicability: All systems; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define critical-journey probes and internal metrics
2. Inject failures before reaching the backend and after commit
3. Link request/job IDs to versions in logs/traces using synthetic data

Expected / acceptance: Actual outcomes are visible and causes can be investigated without relying on a single log

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O16 — Black-box monitoring; The Four Golden Signals

Policy origin: recommended local release policy derived from cited principles

## OPS010

**Alerts have recipients and silence is tested too**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: There are many notifications, but critical incidents are not reported

Applicability: All systems; standalone systems use an administrator-notification path; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Replay normal/error/low-traffic cases and absent telemetry
2. Measure false pages/detection/reset, then select burn windows
3. Send a test alert through an authorized path in a sandbox and verify backup recipients

Expected / acceptance: Page only for incidents requiring action; missing telemetry is not interpreted as success

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O02 — Alerting Considerations; Low-Traffic Services and Error Budget Alerting

Policy origin: recommended local release policy derived from cited principles

## OPS011

**Handover recipients can resolve incidents using the runbook**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Only the original creator can restore the system

Applicability: All systems; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Have the recipient read the runbook without hints from the creator
2. Provide a simulated incident involving invalid config, a full pool, or restoration
3. Record blockers, permissions, contacts, and time, then fix the guide

Expected / acceptance: The recipient can identify the cause, reduce harm, and escalate using actual permissions

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O07 — Putting Best Practices into Practice

Policy origin: recommended local release policy derived from cited principles

## OPS012

**Incidents have clear command and communication**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Multiple people make competing fixes and users are uninformed

Applicability: All systems; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Assign commander/operations/communications roles and backups
2. Run a tabletop exercise involving data corruption and an absent administrator
3. Capture the timeline, decisions, and sample status messages without actually sending them

Expected / acceptance: A decision-maker and support/escalation channels are available according to service hours

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O07 — Main Roles in Incident Response

Policy origin: recommended local release policy derived from cited principles

## OPS013

**Major incidents lead to verifiable prevention**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The ticket is closed but the same incident recurs

Applicability: All systems; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Declare postmortem triggers such as data loss/rollback/manual detection
2. Write a simulated incident with contributing factors and without blaming individuals
3. Assign an owner/deadline and a test confirming that the action reduces recurrence

Expected / acceptance: Actions have closure evidence and link back to the release gate

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O17 — Google’s Postmortem Philosophy; Postmortem triggers

Policy origin: recommended local release policy derived from cited principles

## GOV101

**Determine scope from behavior and risk**

Requirement: BLOCKER · Severity: High · Owner: Product owner · Reviewer: Reviewer who did not create the scope plan

Purpose / risk: Prevent selecting too few modules or claiming applicability to every software type without checking scope

Applicability: Every release, including internal work and experiments accessing real data

### Procedure

1. Identify users, data, connections, privileges, environments, and irreversible adverse consequences in the release manifest
2. Consider CORE, WEB, API, MOBILE, DESKTOP, AI, DATA, and IOT based on actual capabilities, including internal APIs or embedded SDKs
3. Give a rationale and approver for every N/A, and identify changes that would require enabling a new module
4. Have the reviewer try cases that add external users, personal data, and device commands, then verify that the correct modules are enabled

Expected / acceptance: No module has an unknown applicability status; scope and exceptions are traceable

Evidence: release manifest; Module and N/A matrix with rationale, reviewer, and time

Scenarios: Desktop exposes a local API; Internal dashboard uses employee data; AI code generation system without runtime AI

Remediation: Expand the inventory and reevaluate before release

Threshold / policy notes: Module selection is local policy, not evidence of coverage of all laws or risks

Sources: R01 — §1 applicability and shared responsibility; R08 — MP-1.1-001–003

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV001 (the stable catalog ID is GOV101)

## GOV102

**Stop release when required gates fail**

Requirement: BLOCKER · Severity: Critical · Owner: release manager · Reviewer: Person with authority and responsibility for the service

Purpose / risk: Prevent high aggregate scores from hiding severe failures

Applicability: Every release

### Procedure

1. Freeze requirement and severity before testing; classify critical security/privacy/safety/data-integrity failures as BLOCKER according to context
2. Evaluate every applicable control as PASS, FAIL, UNKNOWN, N/A, or WAIVED, retaining the original status
3. Return NO-GO when a BLOCKER fails or evidence is unusable; failing RISK controls require a valid waiver; incomplete applicability yields NO-GO
4. Separate the RECOMMENDED improvement backlog from vetoes and show actual FAIL/UNKNOWN counts
5. Run the attached desk cases and verify that adding one thousand PASS entries does not change a veto

Expected / acceptance: The decision depends on required gates, without averaging to obtain approval

Evidence: Per-control gate results; policy version; synthetic test log

Scenarios: critical fail +999 passes; recommended fail + mandatory passes; critical labelled RECOMMENDED

Remediation: Fix the gate or failure, then reevaluate the same release

Threshold / policy notes: BLOCKER/RISK/RECOMMENDED and the prohibition on waiving blockers are local policy; severity and requirement are separate axes

Sources: R01 — PO.4.1–4.2; R08 — GV-1.3-002,007

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV002 (the stable catalog ID is GOV102)

## GOV103

**Check exceptions before every release**

Requirement: BLOCKER · Severity: High · Owner: Risk owner who bears the adverse consequences · Reviewer: Release reviewer

Purpose / risk: Prevent expired waivers, waivers reused across builds, or waivers lacking compensating measures

Applicability: Every release with a failing RISK control

### Procedure

1. Verify the waiver identifies the control, failure, accepted build/configuration scope, rationale, adverse consequences, and authorized owner
2. Specify expiry representation and timezone explicitly: the workbook uses a valid-through calendar date inclusive through the end of that day in Asia/Bangkok, and its as-of date must change on reevaluation; if an exclusive expires_at timestamp is used, expiry equal to release time is already expired
3. Check evidence of compensating controls, remediation date, and revocation triggers; do not copy approval from an old release without defined scope
4. Test a waiver expired by one minute, a missing reviewer, and transfer to another build; all must be rejected

Expected / acceptance: WAIVED is clearly shown and applies only to RISK; BLOCKER has no exceptions

Evidence: waiver register; Evidence of compensating measures; Gate log at release time

Scenarios: expired waiver; blank compensating control; blocker waiver

Remediation: Eliminate the risk or request a new waiver within the permitted policy

Threshold / policy notes: Choose waiver duration according to context, without a universal number of days; waivers do not turn FAIL into PASS; the canonical workbook uses an inclusive valid-through calendar date in Bangkok, whereas the seed desk model uses an exclusive timestamp and therefore blocks at equality. This is not the same logic as the workbook date

Sources: R07 — MANAGE1.3–1.4; R08 — MG-1.3-001

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV003 (the stable catalog ID is GOV103)

## GOV104

**Bind evidence to the actual release target**

Requirement: BLOCKER · Severity: High · Owner: Build maintainer · Reviewer: Evidence reviewer

Purpose / risk: Prevent test results for an old commit/configuration/model from being used for a new one

Applicability: Every release

### Procedure

1. Retain release ID, commit, artifact digest, dependency lock, configuration fingerprint, schema, and test suite; for runtime AI, add model/prompt/retrieval versions
2. Verify test-run evidence identifies the same target or has a signed impact analysis permitting reuse
3. Check creator, time, tool/version, commands, actual results, and inspection scope; inaccessible links are UNKNOWN
4. Change the artifact digest, configuration, or schema in a copy of desk-test data and verify that old evidence cannot be used

Expected / acceptance: Evidence is reproducible and matches the release; reuse requires a rationale the reviewer can inspect

Evidence: evidence index; digest manifest; impact review; Raw logs with secrets removed

Scenarios: stale report; right code wrong configuration; right filename wrong digest

Remediation: Generate evidence for the correct target or analyze reuse

Threshold / policy notes: Evidence age alone is insufficient; also check relevance and change triggers

Sources: R06 — Step1 subject digest; Step2 expectations; R01 — PS.2, PS.3

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV004 (the stable catalog ID is GOV104)

## GOV105

**Have independent reviewers inspect high-impact conclusions**

Requirement: RISK · Severity: High · Owner: Work owner · Reviewer: Reviewer who did not perform that control

Purpose / risk: Prevent builders passing their own work with insufficient evidence

Applicability: Every release has a reviewer; add specialists according to impact

### Procedure

1. Identify the evidence creator, reviewer, and release approver, separating names from roles
2. Have the reviewer select high risks and inspect the trace from requirement to raw test results
3. Test cases where the builder is the sole reviewer and where two AI systems share the same prompt/data; record independence limitations
4. Record findings, responses, remediation, and unexamined work with responsible owners

Expected / acceptance: Independence has explicit boundaries; do not claim an independent audit merely because the same model rereads the work

Evidence: review record; conflict-of-interest record; sample evidence trace

Scenarios: solo developer; shared AI context; reviewer lacks domain competence

Remediation: Obtain additional review by a competent person or limit use until evidence exists

Threshold / policy notes: Independent cross-review in this research is document desk review, not software certification

Sources: R10 — §4.9 Independence of Review; R08 — MS-1.3-003

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV005 (the stable catalog ID is GOV105)

## GOV106

**Pin source versions and status**

Requirement: RISK · Severity: Medium · Owner: Standards maintainer · Reviewer: Document reviewer

Purpose / risk: Prevent drafts or HEAD changing requirement meaning unnoticed

Applicability: Every release citing standards

### Procedure

1. Record publisher, URL, snapshot/version, publication date, access date, section, and normative/informative classification
2. Check official current-status pages before adoption or when change triggers occur; record unavailable dates as unknown
3. Distinguish SSDF 1.1 final from 1.2 draft; SLSA 1.2 Approved; ASVS 5.0.0 stable; WCAG 2.2 Recommendation; AI RMF 1.0 revision underway
4. Perform an impact diff before changing control mappings and do not use unversioned requirement IDs

Expected / acceptance: The source ledger has no unsupported latest labels or drafts marked final

Evidence: source ledger; version diff; adoption decision

Scenarios: draft reported final; ASVS4 id with5 mapping; unversioned URL changes

Remediation: Correct status and mappings, then review affected results

Threshold / policy notes: Do not guess missing source dates; checked as of 2026-10-05 Bangkok, without guaranteeing future status

Sources: R02 — Publication status; R03 — How To Reference ASVS Requirements; R05 — Overview

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV006 (the stable catalog ID is GOV106)

## GOV107

**Hand over limitations and conditions of use**

Requirement: RISK · Severity: High · Owner: Product owner · Reviewer: Handover recipient and release reviewer

Purpose / risk: Prevent a green status being understood as safe in every context

Applicability: Every release, including handover to internal teams

### Procedure

1. Identify intended use, prohibited use, inspected modules, uninspected scope, and approved waivers in the handover
2. Show RECOMMENDED FAIL/UNKNOWN statuses and residual risks without changing them to passing
3. Identify post-release owners, incident-reporting methods, stop triggers, and changes requiring reevaluation
4. Have the recipient try scenarios using data/user groups beyond scope and locate escalation contacts in the documentation

Expected / acceptance: The recipient understands the conditions and can decide to stop or escalate

Evidence: handover receipt; risk ledger; support and escalation runbook

Scenarios: internal to external reuse; new data category; post-release critical event

Remediation: Add limitations and rehearse handover until owners can be located

Threshold / policy notes: GO is a decision based on evidence for the specified release/context, not zero vulnerabilities or certification

Sources: R01 — §1 shared responsibility; RV.2; R07 — MANAGE1.4

Policy origin: recommended local release policy derived from cited principles

Original seed identifier: GOV007 (the stable catalog ID is GOV107)

## REG001

**Escalate high-impact cases to specialists before release**

Requirement: BLOCKER · Severity: Critical · Owner: Business owner · Reviewer: Domain expert and relevant legal/compliance specialists

Purpose / risk: Prevent generic checklists replacing assurance and sector-specific requirements

Applicability: CORE: every release must be screened; activate escalation for health, safety, money, rights, employment, essential services, children, sensitive data, or sector regulation

### Procedure

1. Screen intended use, user/operating countries, data, affected people, and possible severe harms
2. If a trigger is found, identify the rule/requirement owner and required expert review; uncertainty is not N/A
3. Have specialists identify obligations, assurance, validation, and approvals required before real-world use, with evidence/rationale for applicability
4. Verify the review scope matches the release intended use; do not release while required specialist decisions remain incomplete

Expected / acceptance: Every trigger has a decision by an appropriate person; general documentation does not certify legal compliance

Evidence: screening record; specialist decision; obligation register; release-use scope

Scenarios: medical advice; industrial actuator; loan or hiring decision; unknown jurisdiction

Remediation: Restrict deployment to avoid real-world effects or complete missing specialist work before release

Threshold / policy notes: This is escalation policy, not a conclusion about which law applies; an expert must inspect current applicable law

Sources: R01 — PO.1 external requirements; R07 — GOVERN1.1; MAP1.1; R10 — Scope; §4.1–4.2

Policy origin: recommended local release policy derived from cited principles

## REG002

**Verify accessibility claims against actual evaluated scope**

Requirement: RISK · Severity: High · Owner: User experience owner · Reviewer: Competent accessibility tester

Purpose / risk: Prevent automated scans of a few passing pages becoming a whole-system WCAG claim

Applicability: Every UI requires accessibility evaluation; web/mobile web uses normative WCAG; native/non-web uses suitable guidance

### Procedure

1. Identify platforms, users, critical processes, criterion levels required by contracts or rules, and manual/assistive-technology test methods
2. For web, inspect full pages and complete processes; do not exclude in-scope checkout/login to create a claim
3. For native/desktop, use WCAG2ICT as guidance together with platform/domain requirements and record gaps
4. Try keyboard/screen-reader use through login, transaction confirmation, errors, and recovery; record the build and unsupported aspects

Expected / acceptance: Claims match scope and level; failures of applicable obligations must be escalated to BLOCKER

Evidence: accessibility scope; manual results; AT/platform versions; claim review

Scenarios: scan 10 landing pages but failing checkout; desktop accessibility gap; conformance claim unsupported

Remediation: Fix critical paths and reduce claims to match evidence before handover

Threshold / policy notes: RISK is the default under this policy; if required by contract/law or a critical user task, record it as BLOCKER before testing

Sources: R04 — §5.2.1–5.2.5; §5.3; R09 — Intent and usage; What WCAG2ICT does not do

Policy origin: recommended local release policy derived from cited principles

## REG003

**Define stop boundaries for AI with real-world effects**

Requirement: BLOCKER · Severity: Critical · Owner: Runtime AI owner · Reviewer: Independent evaluator and domain expert

Purpose / risk: Prevent good averages hiding harm to subgroups or in high-impact decisions

Applicability: CORE screening for every release; detailed work when runtime AI exists, not merely AI used to write code

### Procedure

1. Separate AI-assisted development from deployed AI and define intended/forbidden use
2. Identify unacceptable harms and thresholds by case/affected group; plan for risks that cannot be quantified
3. Test harmful edge cases and inspect worst-case/slice results before averages, with human-intervention and deactivation methods
4. If unacceptable risk is found or specialists have not decided, stop real-world use and retain remediation evidence before reevaluation

Expected / acceptance: No averaging is used to pass a defined harm boundary; unknown high-impact risks are escalated

Evidence: AI-use screening; harm and threshold register; slice evaluation; stop/escalation rehearsal

Scenarios: overall95% but unsafe minority slice; unmeasurable material harm; AI coded desktop without runtimeAI

Remediation: Reduce scope, add human control, or stop until risks are managed

Threshold / policy notes: Set thresholds from intended use/domain; do not prescribe universal accuracy or hallucination rates

Sources: R08 — GV-1.3-002,007; MP-1.1-003; MS-1.1-009; R07 — MANAGE1.1–1.3

Policy origin: recommended local release policy derived from cited principles
