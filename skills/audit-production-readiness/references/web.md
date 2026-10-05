# WEB Controls

7 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [UX020: User-based browser, device and assistive-technology matrix](#ux020)
- [UX021: Responsive layout, orientation and virtual keyboard preserve task access](#ux021)
- [UX022: Clear fallbacks for unsupported capabilities](#ux022)
- [SEC009: Prevent XSS in every context](#sec009)
- [SEC010: Prove CSP and origin separation](#sec010)
- [SEC011: Prevent CSRF in state-changing operations](#sec011)
- [IDN011: Verify session cookies and scope](#idn011)

## UX020

**User-based browser, device and assistive-technology matrix**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Only the builder's device is tested while support for everyone is claimed

Applicability: WEB: web content or a webview; includes internal and customer-facing software and complete processes

### Procedure

1. Specify OS/browser/version/device/input/AT based on the audience and public information or authorized analytics
2. Select minimum-supported/current-stable versions and mobile touch/keyboard/screen-reader combinations relevant to the jobs
3. Run critical journeys on real devices at least as specified by the risk matrix; emulator use must identify gaps and an owner

Expected / acceptance: Every supported row has results or limitations; do not copy GOV.UK's 98% as a Thai population figure

Evidence: support matrix; device/version test logs

Scenarios: Safari iOS; Android low memory; enterprise managed browser

Remediation: Increase coverage or revise support promises and fallbacks

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 5.2.4; P02 — Comments by Guideline and Success Criterion: 5.2.4; P08 — Browsers to test in; Design for your audience; Testing for services that are for government use

Policy origin: recommended local release policy derived from cited principles

## UX021

**Responsive layout, orientation and virtual keyboard preserve task access**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: Phones show the submit button beneath the keyboard or lock orientation

Applicability: WEB: web content or a webview; includes internal and customer-facing software and complete processes

### Procedure

1. Test minimum/maximum widths, portrait/landscape, safe areas and the open keyboard
2. Complete dialog/form/navigation journeys with text zoom and touch
3. Check sticky controls, scroll areas, table/chart alternatives and the viewport when rotating during a draft

Expected / acceptance: Primary jobs remain accessible in every supported layout; orientation locking must be essential under the success criterion

Evidence: responsive snapshots; keyboard-open recording

Scenarios: landscape login; notch; date picker

Remediation: Fix viewport/flex/scroll behavior and move actions into accessible positions

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 1.3.4; 1.4.10; P02 — Comments by Guideline and Success Criterion: 1.3.4; 1.4.10; P08 — Design for your audience

Policy origin: recommended local release policy derived from cited principles

## UX022

**Clear fallbacks for unsupported capabilities**

Requirement: RISK · Severity: High · Owner: UI/UX owner · Reviewer: Accessibility/QA reviewer

Purpose / risk: A missing browser API breaks the entire page

Applicability: WEB: web content or a webview; includes internal and customer-facing software and complete processes

### Procedure

1. Disable or simulate unavailable storage/clipboard/camera/geolocation/cookies/fonts/JavaScript according to the architecture
2. Check feature detection and fallbacks for critical workflows
3. Test denied permissions and enterprise restrictions; specify no-JavaScript applicability rather than imposing the same rule on every SPA

Expected / acceptance: Limitations do not corrupt data; users see the next action and actual requirements

Evidence: capability-fallback table; permission-denied cases

Scenarios: storage quota; camera denied; JS bundle fails

Remediation: Add a fallback or safe explanation and remove unsupported claims

Threshold / policy notes: These release criteria are local policy; WEB must check relevant A/AA success criteria (SC) and exceptions against the actual normative text; non-web software must not claim WCAG conformance from mapping alone; N/A requires a rationale and reviewer; a RISK waiver requires an owner, expiry and compensating controls

Sources: P01 — 5.2.4; 5.2.5; P02 — Comments by Guideline and Success Criterion: 5.2.4; 5.2.5; P08 — Test for compatibility

Policy origin: recommended local release policy derived from cited principles

## SEC009

**Prevent XSS in every context**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: User data becomes script

Applicability: Web applications that display untrusted data; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify HTML, attribute, URL, DOM, Markdown, rich-text, and stored-rendering sinks
2. Use context-specific encoding and a continuously maintained sanitizer when HTML is allowed
3. Insert non-destructive payloads through create/update/import, then open every view with two roles

Expected / acceptance: No script or unsafe URL originates from user data; normal functionality still works

Evidence: sink review; browser evidence; sanitizer config

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S02 — v5.0.0-V1.2.1–1.2.3; V1.3.1; V1.3.4–1.3.5

Policy origin: recommended local release policy derived from cited principles

## SEC010

**Prove CSP and origin separation**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: The browser loads resources or sends messages beyond the permitted boundaries

Applicability: All web frontends; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Document trusted origins for scripts, frames, workers, and postMessage
2. Verify that CSP is actually enforced in every response, including errors; test inline scripts and frames from a test origin
3. Send forged postMessage messages and examine sensitive APIs from a disallowed origin

Expected / acceptance: The browser rejects untrusted content or messages without breaking approved usage paths

Evidence: headers capture; blocked-resource test; origin policy

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S04 — v5.0.0-V3.4 Browser Security Mechanism Headers; V3.5 Browser Origin Separation

Policy origin: recommended local release policy derived from cited principles

## SEC011

**Prevent CSRF in state-changing operations**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Another website acts on behalf of a logged-in user

Applicability: Web applications that use ambient credentials; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Inventory state-changing routes, including logout, upload, and administrator routes
2. From a test origin, send forms and fetch requests with missing, incorrect, or other-session tokens
3. Verify cookie SameSite and server-side protection; check that data does not change under attack

Expected / acceptance: No state change results from an unauthorized cross-site request

Evidence: route list; CSRF test; before/after state

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S04 — v5.0.0-V3.5 Browser Origin Separation

Policy origin: recommended local release policy derived from cited principles

## IDN011

**Verify session cookies and scope**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Scripts or subdomains read or overwrite sessions

Applicability: Web applications that use cookies; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Capture Set-Cookie on every path and check Secure, HttpOnly, SameSite, and host/path scope
2. Test cookies from a subdomain fixture and JavaScript attempts to read session values
3. Test login callbacks and approved cross-site use so normal operation is not broken

Expected / acceptance: Session cookies are protected and narrowly scoped to their purpose

Evidence: cookie matrix; browser tests; callback result

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S04 — v5.0.0-V3.3 Cookie Setup

Policy origin: recommended local release policy derived from cited principles
