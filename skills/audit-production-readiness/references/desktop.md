# DESKTOP Controls

10 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [DSK001: Packages install on declared supported OS versions](#dsk001)
- [DSK002: Check signatures and notarization for the Mac channel](#dsk002)
- [DSK003: MSIX trust and timestamps are checked](#dsk003)
- [DSK004: Linux permissions match the package format](#dsk004)
- [DSK005: Auto-update validates the source and payload](#dsk005)
- [DSK006: Interrupted updates do not destroy the program or data](#dsk006)
- [DSK007: Uninstall preserves user files and removes helpers](#dsk007)
- [DSK008: Filesystem access and helpers use least privilege](#dsk008)
- [DSK009: Offline operation and resume do not corrupt files](#dsk009)
- [DSK010: Support older versions and different update channels](#dsk010)

## DSK001

**Packages install on declared supported OS versions**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Users cannot install the app, or dependencies are missing

Applicability: Mac/Windows/Linux binaries including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document OS/architecture/package channels and the dependencies used
2. Install on a clean VM for each combination, including as a standard user
3. Launch the main task from the actual distributed package and retain its hash

Expected / acceptance: Installation and launch work without developer tools

Evidence: install matrix; package hash; clean VM log

Scenarios: clean VM; arm/x64; non-admin; legacy OS

Remediation: Bundle dependencies and narrow the support matrix to match actual support

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T07 — Signing options; T06 — Prepare for distribution; T09 — Permissions guidelines

Policy origin: recommended local release policy derived from cited principles

## DSK002

**Check signatures and notarization for the Mac channel**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Gatekeeper rejects the package or accepts a modified package

Applicability: Mac distribution outside the store including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document the Developer ID/notarization workflow and artifact chain
2. Check codesign and Gatekeeper assessment on a VM using the artifact actually downloaded
3. Test offline launch after stapling the ticket and test a package-tampering fixture

Expected / acceptance: The approved artifact launches, and modified artifacts fail validation

Evidence: signer fingerprint; notarization receipt; Gatekeeper log

Scenarios: download quarantine; offline; nested helper; tampered

Remediation: Re-sign nested code and check the ticket; do not instruct users to disable Gatekeeper

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T06 — Signing your apps for Gatekeeper; Prepare for distribution

Policy origin: recommended local release policy derived from cited principles

## DSK003

**MSIX trust and timestamps are checked**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A signed package is not trusted by the device, or its certificate expires

Applicability: Windows MSIX; other formats require a channel-appropriate equivalent method including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Check the publisher, certificate chain, and timestamp of the MSIX
2. Install on a VM without a development certificate, then test a modified package
3. Record the package-integrity policy and supported OS versions

Expected / acceptance: Trust matches the publisher, and developer mode is not needed to conceal problems

Evidence: signature verification; trust-chain log; manifest

Scenarios: expired cert; untrusted root; tampering; old Windows build

Remediation: Use a certificate trusted by the deployment and apply a timestamp

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T07 — Timestamping; Package Integrity Enforcement

Policy origin: recommended local release policy derived from cited principles

## DSK004

**Linux permissions match the package format**

Requirement: RISK · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: The app is called sandboxed but has access to all home/device/bus resources

Applicability: Linux desktop; Flatpak criteria apply only when Flatpak is used including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Check manifest permissions/repository signer for the actual package
2. Run a fixture without network/home access, then use a portal to open one file
3. Test the app attempting to read other files and call D-Bus services outside the allowlist

Expected / acceptance: Only required permissions are granted, and sandbox claims are supported by evidence

Evidence: permission diff; portal log; denial fixture

Scenarios: Flatpak; native package; full home; D-Bus denied

Remediation: Use portals/read-only access and distinguish native packages from Flatpak

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T09 — Portals; D-Bus access; Filesystem access

Policy origin: recommended local release policy derived from cited principles

## DSK005

**Auto-update validates the source and payload**

Requirement: BLOCKER · Severity: Critical · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A MITM or old endpoint supplies a forged update

Applicability: Desktop apps with an updater including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document trust for the manifest, payload, and signing key separately from TLS
2. Provide modified-manifest/payload, wrong-signer, replay, and unavailable-endpoint fixtures
3. Check effective settings after MDM/CSP overrides and fallback URIs

Expected / acceptance: Forged updates are not installed, and fallback uses equivalent trust

Evidence: updater threat model; negative fixture; effective settings

Scenarios: replay; wrong signer; fallback; managed settings

Remediation: Verify signatures/versions and constrain fallback

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T08 — Automatic updates; CSP; T07 — Package Integrity Enforcement

Policy origin: recommended local release policy derived from cited principles

## DSK006

**Interrupted updates do not destroy the program or data**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Power loss or a full disk prevents launch

Applicability: Desktop updaters and schema migrations including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Snapshot the VM before updating and prepare old-version data
2. Terminate the process during download, verification, replacement, and migration, with a disk-full fixture
3. Reopen and roll back to an allowed package, checking the data

Expected / acceptance: Either the old or new version is intact, and data is not lost

Evidence: fault-stage matrix; recovery log; data diff

Scenarios: power-loss simulation; disk full; migration; rollback

Remediation: Use atomic replacement and migration recovery

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T08 — Automatic Repair; Automatic updates

Policy origin: recommended local release policy derived from cited principles

## DSK007

**Uninstall preserves user files and removes helpers**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Secrets/services remain after uninstall, or work files are lost

Applicability: All desktop installers including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Inventory files, services, tasks, extensions, and credential entries
2. Create work files outside the app and user/admin uninstall fixtures
3. Check that helpers stop, offer a data-deletion choice, and try reinstalling

Expected / acceptance: All app components are removed without deleting user work without consent

Evidence: before/after inventory; uninstall log; reinstall result

Scenarios: shared machine; helper service; user data; reinstall

Remediation: Correct the ownership manifest and revoke local credentials

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T09 — Filesystem access; T07 — Package Integrity Enforcement

Policy origin: recommended local release policy derived from cited principles

## DSK008

**Filesystem access and helpers use least privilege**

Requirement: BLOCKER · Severity: Critical · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Paths/symlinks permit writing system files

Applicability: Apps that accept paths or have privileged helpers including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Create an allowlist of paths and helper IPC operations
2. Provide traversal, symlink-swap, UNC/removable-path, and other-account-file fixtures
3. Run as a standard user and verify that ordinary tasks do not elevate privileges

Expected / acceptance: No writes outside the permitted scope, and helpers validate callers/inputs

Evidence: path corpus; ACL/entitlement diff; helper denial

Scenarios: symlink race; traversal; different user; read-only folder

Remediation: Use safe path resolution and narrowly scoped IPC

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T09 — Filesystem access; D-Bus access; T05 — 2.5.2

Policy origin: recommended local release policy derived from cited principles

## DSK009

**Offline operation and resume do not corrupt files**

Requirement: RISK · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Sleep/network loss stalls work or causes duplicate transmission

Applicability: Desktop apps that edit files or sync including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Edit a file fixture offline and open two instances
2. Simulate sleep/resume, network flapping, and file locks
3. Check conflicts, pending state, and checksums after reconnect
4. Create a delete/update fixture: A deletes a record and retains the tombstone/version on the authoritative side while B edits the same record offline; reconnect B and replay again after restore
5. If merging uses time, simulate clock skew forward/backward and duplicate times; verify that a client timestamp is not used as authority to remove a tombstone; specify the reject/merge/manual-review policy and tombstone retention according to the supported offline interval

Expected / acceptance: Users see conflicts, and durable writes are not silently overwritten. Replay does not silently restore deleted data, and clock skew does not bypass the version/deletion policy

Evidence: file hash diff; concurrent instance log; delete/update/tombstone trace; clock-skew merge fixtures; tombstone retention rationale

Scenarios: sleep; two instances; file lock; network flap; delete vs offline update; replay after restore; client clock forward/backward; tombstone expiry

Remediation: Add atomic saves, file locking, and deduplication

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value; delete/tombstone and clock-skew fixtures are local policy; last-write-wins is not a Google requirement and needs a domain-specific rationale

Sources: T14 — Writes; Conflict resolution

Policy origin: recommended local release policy derived from cited principles

## DSK010

**Support older versions and different update channels**

Requirement: BLOCKER · Severity: High · Owner: Desktop release lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Old packages or managed users are cut off before updating

Applicability: All desktop releases with existing users including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Create a compatibility matrix of older versions, architectures, channels, and schemas
2. Simulate an old client/new service and an updater disabled by an administrator
3. Check export/manual-update/support deadlines before retiring an API

Expected / acceptance: Supported versions remain usable, and users have a migration path

Evidence: version matrix; manual update guide; support notice

Scenarios: MDM update disabled; legacy client; manual package; rolling upgrade

Remediation: Add grace-period capabilities and do not perform irreversible migrations before validation

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T08 — App Installer file; CSP; T14 — Synchronization

Policy origin: recommended local release policy derived from cited principles
