# MOBILE Controls

14 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [MOB001: Request permissions for the relevant action and handle denial](#mob001)
- [MOB002: Background work must stop and resume safely](#mob002)
- [MOB003: Critical journeys are usable with screen readers](#mob003)
- [MOB004: Separate store criteria from release safety](#mob004)
- [MOB005: Check SDK data collection against disclosures](#mob005)
- [MOB006: Identify stale data and offline scope](#mob006)
- [MOB007: Sync conflicts and replay do not duplicate transactions](#mob007)
- [MOB008: Push is a signal and not the source of truth](#mob008)
- [MOB009: Deep links do not bypass authorization](#mob009)
- [MOB010: Secrets are held in platform storage](#mob010)
- [MOB011: UI caches do not disclose data across accounts](#mob011)
- [MOB012: Sign releases and rotate keys without abandoning older clients](#mob012)
- [MOB013: Rolling upgrades have a version contract and an exit path](#mob013)
- [MOB014: Networking rejects invalid trust](#mob014)

## MOB001

**Request permissions for the relevant action and handle denial**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Denial causes an app crash or excessive data collection

Applicability: Android/iOS apps using the camera, microphone, location, or personal data including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Compare manifest/entitlements/purpose strings with functionality and data recipients
2. Use a simulator to deny permission, grant it once, revoke it while running, and reopen the app
3. Check the network mock for absence of data after revocation and verify that other functions remain usable

Expected / acceptance: No access outside granted permissions and no coercion to accept

Evidence: permission matrix; denial/revocation video; mock trace

Scenarios: denied; one-time; revoke; legacy OS

Remediation: Reduce scope and add alternatives to permissions

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T01 — Basic principles; One-time permissions; T05 — 5.1.1(ii–iv)

Policy origin: recommended local release policy derived from cited principles

## MOB002

**Background work must stop and resume safely**

Requirement: RISK · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: OS termination causes lost or duplicate commands

Applicability: Apps performing background work including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document the rationale for each background mode/API and its checkpoints
2. Simulate suspension, killing the app, reboot, and battery restrictions before/after commit
3. Reopen the app and compare the job id with the server mock’s result

Expected / acceptance: Critical work does not depend on uninterrupted execution that the OS does not guarantee

Evidence: state machine; kill/restart trace

Scenarios: suspend; force-stop; background permission; reboot

Remediation: Use a durable queue and idempotency

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T02 — Types of background tasks; T05 — 2.5.4

Policy origin: recommended local release policy derived from cited principles

## MOB003

**Critical journeys are usable with screen readers**

Requirement: RISK · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Users cannot complete tasks or recover

Applicability: All Android/iOS apps with a UI including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Select login, the main task, consent, error, and recovery journeys
2. Navigate with TalkBack/VoiceOver, keyboard/switch access, and text scaling
3. Check focus, button names, error announcements, and that labels do not disclose secrets

Expected / acceptance: Critical tasks can be completed without relying solely on color or gestures

Evidence: recorded journey; focus audit

Scenarios: screen reader; large text; error; secret field

Remediation: Correct semantic labels and focus

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T16 — Manual testing; Automated testing; T04 — MASVS-PLATFORM-3

Policy origin: recommended local release policy derived from cited principles

## MOB004

**Separate store criteria from release safety**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Store approval is interpreted as proof of complete safety

Applicability: Only the chosen App Store/Play or enterprise distribution channel including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Record the channel, country, target SDK, and requirements in effect on the submission date, with official links
2. Check metadata, the demo account, and the actual artifact against applicable requirements
3. The reviewer separates the channel-eligibility result from the security/offline gate

Expected / acceptance: The chosen channel permits release, and technical gates must still be passed

Evidence: channel applicability; policy snapshot; submission artifact hash

Scenarios: internal distribution; store; rolling release

Remediation: Resolve channel requirements or switch to an authorized channel

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T05 — 2.1; 2.5.1; 5.1.1; T15 — Play App Signing

Policy origin: recommended local release policy derived from cited principles

## MOB005

**Check SDK data collection against disclosures**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: An SDK transmits data beyond the privacy notice

Applicability: Apps with telemetry SDKs or accounts including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Create a data-flow inventory including SDKs and third-party AI
2. Compare the privacy notice/store disclosure with outbound fixture traces before and after consent
3. Withdraw consent/delete the account and verify that the queue does not send data afterward

Expected / acceptance: Actual data matches disclosures, and withdrawal takes effect

Evidence: SDK inventory; redacted trace; deletion receipt

Scenarios: consent off; SDK initialization; delete offline

Remediation: Disable the SDK or correct consent and deletion

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T04 — MASVS-PRIVACY-1/3/4; T05 — 5.1.1; 5.1.2

Policy origin: recommended local release policy derived from cited principles

## MOB006

**Identify stale data and offline scope**

Requirement: RISK · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: The UI shows success before commit

Applicability: Apps that read or write offline including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Define the items available offline and data age according to risk
2. Disable the network fixture, read cached data, and create commands
3. Check pending/stale states against the server mock upon reconnect

Expected / acceptance: Distinguish local acceptance from server confirmation

Evidence: offline contract; UI trace; queue snapshot

Scenarios: no network; stale cache; expired session

Remediation: Add pending states and restrict tasks that require being online

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T14 — Reads; Writes

Policy origin: recommended local release policy derived from cited principles

## MOB007

**Sync conflicts and replay do not duplicate transactions**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Two devices overwrite changes or retries create duplicate records

Applicability: Apps with mutable offline data including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Prepare two clients, current and older versions, to edit the same record version
2. Resend, reorder, and disconnect after server commit but before acknowledgement
3. Check idempotency and conflicts, and that users can see rejected changes
4. Bind every pending mutation to its actor, tenant, operation id, and resource/version at creation; simulate A writing offline → logout → B login → reconnect, and verify that the queue does not drain as B
5. Simulate revocation of A’s role/ownership before reconnect; the server checks current authorization before every commit, and the client quarantines/cancels work whose identity does not match, reporting the outcome without moving work across tenants
6. Create a delete/update fixture: A deletes a record and retains the tombstone/version on the authoritative side while B edits the same record offline; reconnect B and replay again after restore
7. If merging uses time, simulate clock skew forward/backward and duplicate times; verify that a client timestamp is not used as authority to remove a tombstone; specify the reject/merge/manual-review policy and tombstone retention according to the supported offline interval

Expected / acceptance: No silent overwrite or duplicate side effects. Pending writes do not use the new account’s credentials or previously held permissions that have been revoked; server authorization at commit is authoritative. Replay does not silently restore deleted data, and clock skew does not bypass the version/deletion policy

Evidence: concurrency fixture; transaction ids; conflict output; actor/tenant queue binding; reauthorization-at-commit trace; cancel/quarantine disposition; delete/update/tombstone trace; clock-skew merge fixtures; tombstone retention rationale

Scenarios: two writers; duplicate; out of order; old/new client; A offline write then B login; tenant switch; role revoked before reconnect; ownership changed; delete vs offline update; replay after restore; client clock forward/backward; tombstone expiry

Remediation: Use version preconditions and deduplication

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value; delete/tombstone and clock-skew fixtures are local policy; last-write-wins is not a Google requirement and needs a domain-specific rationale

Sources: T14 — Synchronization; Conflict resolution; T04 — MASVS-AUTH-1

Policy origin: recommended local release policy derived from cited principles

## MOB008

**Push is a signal and not the source of truth**

Requirement: RISK · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Push messages are lost, duplicated, or exposed on the lock screen

Applicability: Apps with push notifications including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Send duplicate, delayed, wrong-account, and rotated-token fixtures
2. Disable notifications, then open the app and check data from the server
3. Check the lock-screen payload and token binding at logout

Expected / acceptance: No secrets in push messages, and data does not depend on delivery

Evidence: payload schema; token lifecycle; mock delivery trace

Scenarios: denied; duplicate; token rotation; logout

Remediation: Use a reference id and retrieve data under authentication

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T17 — Registering to Receive Remote Notifications; Handling Remote Notifications; T05 — 4.5.4; T04 — MASVS-PLATFORM-3

Policy origin: recommended local release policy derived from cited principles

## MOB009

**Deep links do not bypass authorization**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A URL exposes another person’s data or invokes a dangerous action

Applicability: Apps with app/universal/custom links including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Check domain association and the path allowlist in the actual package
2. Provide malformed links, external redirects, another account’s record, and logged-out fixtures
3. Check server authorization and confirmation before data-changing actions
4. A Universal Link is only a navigation/intent entry point; reject malformed URLs and do not let a link directly delete data or open sensitive information; enter a flow that checks authentication and requires explicit confirmation before a side effect
5. Test cold launch, running/suspended, and scene-based delivery according to the lifecycle used by the app, using malicious/destructive link fixtures

Expected / acceptance: Association works, and links do not grant authorization. Domain association does not grant authorization; a URL does not directly start destructive actions or disclose sensitive information

Evidence: association snapshot; negative link corpus; auth trace; malformed/destructive link fixtures; cold/warm/scene route trace

Scenarios: unverified host; cross-account; logged-out; legacy association; direct delete URL; sensitive-data URL; cold launch; scene delivery

Remediation: Validate parameters and authenticate/authorize every action

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T13 — Manually verify domain associations; Review verification results; T18 — Overview — Warning; Update your app delegate to respond to a universal link; T04 — MASVS-PLATFORM-1

Policy origin: recommended local release policy derived from cited principles

## MOB010

**Secrets are held in platform storage**

Requirement: BLOCKER · Severity: Critical · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Tokens leak from files, backups, or packages

Applicability: Apps with secrets/tokens including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Trace token/key storage in packages, caches, logs, and backups using synthetic data
2. Check Keychain/Keystore usage and policies when device lock/biometrics change
3. Log out, then open with a new account and check that previous secrets are invalidated

Expected / acceptance: No hardcoded secrets or plaintext secrets in unauthorized channels

Evidence: storage inventory; backup fixture; key policy

Scenarios: backup; locked device; biometric change; logout

Remediation: Move keys and revoke leaked tokens

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T04 — MASVS-STORAGE-1/2; MASVS-CRYPTO-2; T03 — Store data safely

Policy origin: recommended local release policy derived from cited principles

## MOB011

**UI caches do not disclose data across accounts**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Snapshots, clipboard contents, or logs disclose data after logout

Applicability: Apps displaying sensitive data including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Display synthetic data, then create background screenshot, clipboard, and crash fixtures
2. Log out/log in as account B and open the same page offline
3. Check caches, the task switcher, logs, and clipboard according to the threat model
4. Bind every pending mutation to its actor, tenant, operation id, and resource/version at creation; simulate A writing offline → logout → B login → reconnect, and verify that the queue does not drain as B
5. Simulate revocation of A’s role/ownership before reconnect; the server checks current authorization before every commit, and the client quarantines/cancels work whose identity does not match, reporting the outcome without moving work across tenants

Expected / acceptance: No data from account A is visible to B. Pending writes do not use the new account’s credentials or previously held permissions that have been revoked; server authorization at commit is authoritative

Evidence: redacted UI capture; cache diff; actor/tenant queue binding; reauthorization-at-commit trace; cancel/quarantine disposition

Scenarios: task switcher; clipboard; account switch; crash; A offline write then B login; tenant switch; role revoked before reconnect; ownership changed

Remediation: Clear caches and close channels that display secrets

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T04 — MASVS-STORAGE-2; MASVS-PLATFORM-3; T04 — MASVS-AUTH-1

Policy origin: recommended local release policy derived from cited principles

## MOB012

**Sign releases and rotate keys without abandoning older clients**

Requirement: BLOCKER · Severity: Critical · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Forged updates or broken signing lineage

Applicability: Apps distributing binaries including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Check the signature/package id and separate the upload key from the app-signing key
2. Simulate updating the oldest supported version using the actual artifact and a key-rotation fixture
3. Have an unauthorized user attempt to release/sign in a CI fixture

Expected / acceptance: Only authorized parties can sign, and older versions can update

Evidence: certificate fingerprint; update matrix; CI denial

Scenarios: key rotation; old client; wrong signer; CI unprivileged

Remediation: Correct the signing lineage and store keys in an access-controlled system

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T15 — Play App Signing; Upgrade your app signing key; Secure your key

Policy origin: recommended local release policy derived from cited principles

## MOB013

**Rolling upgrades have a version contract and an exit path**

Requirement: BLOCKER · Severity: High · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A new server breaks old clients, or forced updates cause data loss

Applicability: Clients/servers released at different times including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Define the oldest supported version, schema, and API capabilities
2. Run old/new clients against old/new server fixtures, including an old offline queue
3. Simulate a forced update with pending data and a server rollback
4. Bind every pending mutation to its actor, tenant, operation id, and resource/version at creation; simulate A writing offline → logout → B login → reconnect, and verify that the queue does not drain as B
5. Simulate revocation of A’s role/ownership before reconnect; the server checks current authorization before every commit, and the client quarantines/cancels work whose identity does not match, reporting the outcome without moving work across tenants

Expected / acceptance: No data loss; unsupported status is communicated with an export/recovery path. Pending writes do not use the new account’s credentials or previously held permissions that have been revoked; server authorization at commit is authoritative

Evidence: compatibility matrix; pending migration trace; actor/tenant queue binding; reauthorization-at-commit trace; cancel/quarantine disposition

Scenarios: N-1; rolling; forced update; rollback; A offline write then B login; tenant switch; role revoked before reconnect; ownership changed

Remediation: Add negotiation and backward-compatible migration

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T04 — MASVS-CODE-1/2; T14 — Synchronization; T04 — MASVS-AUTH-1

Policy origin: recommended local release policy derived from cited principles

## MOB014

**Networking rejects invalid trust**

Requirement: BLOCKER · Severity: Critical · Owner: Mobile lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: The client is deceived by a certificate or debug configuration

Applicability: All networked apps including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Check production network configuration and debug trust
2. Mock an expired certificate, wrong hostname, untrusted CA, and HTTP redirect
3. If pinning is used, test certificate rotation with overlap without weakening validation

Expected / acceptance: Invalid trust is rejected, and rotation does not require disabling TLS

Evidence: config diff; TLS negative fixtures

Scenarios: expired cert; wrong host; debug CA; pin rotation

Remediation: Remove trust-all behavior and establish a rotation plan

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T04 — MASVS-NETWORK-1/2; T03 — Apply network security measures

Policy origin: recommended local release policy derived from cited principles
