# IOT Controls

12 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [IOT001: Identify device-specific physical and network threats](#iot001)
- [IOT002: Secure boot has a verifiable chain of trust](#iot002)
- [IOT003: Updates must be authenticated and prevent dangerous rollback](#iot003)
- [IOT004: Power loss during flash has trusted recovery](#iot004)
- [IOT005: Identities are unique and provisioning does not expose the entire fleet](#iot005)
- [IOT006: Rotate and revoke keys without losing the fleet](#iot006)
- [IOT007: Constrain interfaces and configuration by role](#iot007)
- [IOT008: Old or duplicate commands do not misoperate actuators](#iot008)
- [IOT009: Safe state is explicit and does not depend on the cloud](#iot009)
- [IOT010: Connectivity flapping and bounded storage](#iot010)
- [IOT011: Fleet rollout and telemetry detect regressions](#iot011)
- [IOT012: End of support and ownership transfer remove trust](#iot012)

## IOT001

**Identify device-specific physical and network threats**

Requirement: BLOCKER · Severity: High · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Web-style controls overlook ports and people with physical possession

Applicability: All embedded/IoT devices including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Draw asset boundaries including debug ports, sensors, actuators, radio, gateways, and cloud
2. Create a tabletop attack tree for someone finding the device, technicians, users, and LAN/WAN attackers
3. Have the security owner confirm potential harm and the selected controls

Expected / acceptance: Threats and residual risks have owners appropriate to the context

Evidence: threat model; port inventory; risk decision

Scenarios: physical theft; local technician; LAN attacker; gateway compromise

Remediation: Reduce exposure and add tamper protection/segmentation according to the threats

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — Appendix A; T11 — §2 Table 1: Documentation

Policy origin: recommended local release policy derived from cited principles

## IOT002

**Secure boot has a verifiable chain of trust**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer and, where there is a physical hazard, a device safety/control specialist, independent of the author

Purpose / risk: Modified firmware still runs to control the device

Applicability: Devices running mutable firmware including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document the ROM root of trust, boot chain, and debug-unlock policy
2. In an emulator/model, supply firmware with an invalid signature and a modified boot stage
3. Check that actuators do not start and that the device enters signature-verifying recovery
4. For releases using real hardware, identify the artifact digest, hardware revision, bootloader/configuration, and aspects the model cannot represent; test actual devices or HIL with fidelity approved by a specialist, and add physical testing for aspects HIL cannot represent before closing the BLOCKER
5. Have an independent safety/control specialist review the hazard-specific fault plan, including brownout, boot/reset outputs, flash interruption, watchdog, and resumption of operation; record the selected test values and rationale; there is no universal fault level/time

Expected / acceptance: Unauthorized code does not start critical work. Model-only testing does not yet prove hardware/physical-hazard aspects the model cannot represent; hazard-specific device/HIL and physical evidence approved by a specialist are required before passing

Evidence: boot chain design; negative boot model; debug policy; release/hardware revision traceability; device/HIL fidelity and limitations; physical fault-test report; independent safety/control review

Scenarios: bad signature; debug unlock; stage tampering; recovery boot; brownout; reset actuator output; torn flash write; hardware watchdog; hazard-specific restart

Remediation: Correct the trust anchor and disable production bypasses

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value; hardware assurance is local threat/hazard-based policy, not NIST safety certification; HIL must have fidelity and documented limitations

Sources: T12 — §4.1.1; §4.3.1

Policy origin: recommended local release policy derived from cited principles

## IOT003

**Updates must be authenticated and prevent dangerous rollback**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Rollback to vulnerable firmware or a version for the wrong hardware

Applicability: Devices that update firmware including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Define hardware id/version/security floor from the threat/hazard; a recovery exception means a designed authenticated path for an image that remains at or above the floor, not a waiver or temporary floor reduction
2. Simulate unsigned firmware, wrong hardware, expired/revoked keys, and signed older firmware
3. Check that the version floor persists after reboot and that recovery does not lower the floor without authorization
4. Specify the signer, physical authorization when secure local recovery is used, logging, and hardware applicability; changing the floor is a new policy lifecycle requiring a separate decision and evidence, and must not be used as a checkbox permitting a vulnerable downgrade

Expected / acceptance: Forged updates and downgrades below the security boundary are rejected. A recovery exception does not waive a BLOCKER or bypass the trust/security floor

Evidence: update policy; antirollback model; signature fixtures; authorized recovery path policy

Scenarios: wrong hardware; signed vulnerable old image; reboot; recovery exception; secure local recovery authority

Remediation: Use authenticated version metadata and a secure counter

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T12 — §4.1.2; §4.2.1; T10 — §2 Table 1: Software Update

Policy origin: recommended local release policy derived from cited principles

## IOT004

**Power loss during flash has trusted recovery**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer and, where there is a physical hazard, a device safety/control specialist, independent of the author

Purpose / risk: The device is bricked or boots a partial image

Applicability: Devices writing flash/updating mutable state including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Divide erase/write/verify/activate/configuration-migration and state-persistence stages
2. Use model fault injection at every boundary, including power loss before counter commit
3. Check that boot uses a complete image and recovery does not bypass signature verification
4. For releases using real hardware, identify the artifact digest, hardware revision, bootloader/configuration, and aspects the model cannot represent; test actual devices or HIL with fidelity approved by a specialist, and add physical testing for aspects HIL cannot represent before closing the BLOCKER
5. Have an independent safety/control specialist review the hazard-specific fault plan, including brownout, boot/reset outputs, flash interruption, watchdog, and resumption of operation; record the selected test values and rationale; there is no universal fault level/time

Expected / acceptance: No state requires disabling validation to recover. Model-only testing does not yet prove hardware/physical-hazard aspects the model cannot represent; hazard-specific device/HIL and physical evidence approved by a specialist are required before passing

Evidence: fault model; boot state transitions; recovery instructions; release/hardware revision traceability; device/HIL fidelity and limitations; physical fault-test report; independent safety/control review

Scenarios: power loss; partial flash; counter ordering; config corruption; brownout; reset actuator output; torn flash write; hardware watchdog; hazard-specific restart

Remediation: Use A/B images or a recovery partition that has passed threat review

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value; hardware assurance is local threat/hazard-based policy, not NIST safety certification; HIL must have fidelity and documented limitations

Sources: T12 — §4.1.2; §4.4.1; §4.4.2

Policy origin: recommended local release policy derived from cited principles

## IOT005

**Identities are unique and provisioning does not expose the entire fleet**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: One factory secret allows takeover of every device

Applicability: Devices connected to a management system including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Define device ids, key generation, enrollment, and authentication of the provisioning party
2. In a mock, enroll duplicate ids, cloned certificates, and expired bootstrap tokens
3. Check that keys do not appear in firmware-dump fixtures or provisioning logs

Expected / acceptance: Each device has its own identity and device-scoped permissions

Evidence: provisioning sequence; duplicate denial; key inventory

Scenarios: duplicate identity; cloned certificate; factory operator; expired bootstrap

Remediation: Eliminate shared default credentials and use per-device enrollment

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Device Identification; Data Protection; Logical Access to Interfaces

Policy origin: recommended local release policy derived from cited principles

## IOT006

**Rotate and revoke keys without losing the fleet**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A key leaks but cannot be revoked, or offline devices are unaware

Applicability: Devices using credentials/update trust including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document expiry, overlap, revocation, and recovery authority separately
2. Simulate old/new keys with offline devices and stale revocation information
3. Check that revoked keys cannot control/update devices after they return online and that trust-all is not enabled

Expected / acceptance: Devices can transition trust without disabling validation

Evidence: rotation matrix; revocation trace; offline rejoin model

Scenarios: compromised key; offline during rotation; expiry; revoked signer

Remediation: Add staged trust updates and quarantine devices that are no longer trusted

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Data Protection; Software Update; T12 — §4.1.2

Policy origin: recommended local release policy derived from cited principles

## IOT007

**Constrain interfaces and configuration by role**

Requirement: BLOCKER · Severity: High · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: A debug port or configuration disables protection

Applicability: Devices with local/remote management including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Record protocols, ports, debug interfaces, and operator/admin/service permissions
2. Mock a caller unauthorized to change trust, network, and safety limits
3. Check the production debug policy and that factory reset does not enable a shared default password

Expected / acceptance: Every interface checks authorization, and there is no bypass path

Evidence: role matrix; config denial; production port policy

Scenarios: unauthorized operator; debug console; factory reset; maintenance

Remediation: Disable unused ports and constrain maintenance mode

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Device Configuration; Logical Access to Interfaces

Policy origin: recommended local release policy derived from cited principles

## IOT008

**Old or duplicate commands do not misoperate actuators**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Replay or retry repeats actions with real-world effects

Applicability: Devices receiving remote commands including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document command id, freshness, authorization, and physical effect
2. Simulate duplicate, delayed, reordered, cross-device commands, and clock skew
3. Check that stale commands are rejected and reconnect does not replay a dangerous queue

Expected / acceptance: Physical effects occur only according to authorized commands within the defined scope

Evidence: command state machine; negative trace; freshness rationale

Scenarios: replay; cross-device; clock skew; reconnect backlog

Remediation: Add sequences/windows and local interlocks

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Data Protection; Logical Access to Interfaces

Policy origin: recommended local release policy derived from cited principles

## IOT009

**Safe state is explicit and does not depend on the cloud**

Requirement: BLOCKER · Severity: Critical · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer and, where there is a physical hazard, a device safety/control specialist, independent of the author

Purpose / risk: Connectivity loss/sensor errors injure users

Applicability: Devices with actuators/physical effects including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Have the safety owner define hazards, safe states, and authorization to resume operation
2. Tabletop-simulate out-of-range sensors, stuck values, watchdog timeout, and cloud loss
3. Check that local interlocks stop operation according to hazard analysis and do not automatically resume dangerously
4. For releases using real hardware, identify the artifact digest, hardware revision, bootloader/configuration, and aspects the model cannot represent; test actual devices or HIL with fidelity approved by a specialist, and add physical testing for aspects HIL cannot represent before closing the BLOCKER
5. Have an independent safety/control specialist review the hazard-specific fault plan, including brownout, boot/reset outputs, flash interruption, watchdog, and resumption of operation; record the selected test values and rationale; there is no universal fault level/time

Expected / acceptance: Fail-safe behavior has a system-specific rationale and owner confirmation before use. Model-only testing does not yet prove hardware/physical-hazard aspects the model cannot represent; hazard-specific device/HIL and physical evidence approved by a specialist are required before passing

Evidence: hazard analysis; state transition model; safety sign-off; release/hardware revision traceability; device/HIL fidelity and limitations; physical fault-test report; independent safety/control review

Scenarios: sensor fault; network loss; watchdog; power recovery; brownout; reset actuator output; torn flash write; hardware watchdog; hazard-specific restart

Remediation: Add local interlocks; require real-hardware/safety validation before deployment according to risk

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value; hardware assurance is local threat/hazard-based policy, not NIST safety certification; HIL must have fidelity and documented limitations

Sources: T11 — §2 Table 1: Documentation

Policy origin: recommended local release policy derived from cited principles

## IOT010

**Connectivity flapping and bounded storage**

Requirement: RISK · Severity: High · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Prolonged offline periods fill queues or cause telemetry storms

Applicability: Devices with intermittent connectivity including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Set offline budgets, queue limits, retry/backoff, and priorities according to the use case
2. Simulate link flapping, a full queue, boot storms, and gateway outages
3. Check that critical data is not silently discarded and retries do not converge into a single wave

Expected / acceptance: Resource use stays within budget, and loss states are explicit

Evidence: resource budget; queue model; retry distribution

Scenarios: queue full; boot storm; gateway outage; low bandwidth

Remediation: Add jitter, bounded queues, and graceful degradation

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Cybersecurity State Awareness; T11 — §2 Table 1: Documentation

Policy origin: recommended local release policy derived from cited principles

## IOT011

**Fleet rollout and telemetry detect regressions**

Requirement: BLOCKER · Severity: High · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: Bad firmware spreads across the entire fleet before problems are detected

Applicability: Systems managing multiple devices including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Document cohorts, hardware/firmware versions, and stop rules according to hazards/health
2. Simulate a failed canary, certificate faults, and offline devices
3. Check rollout halt, isolation of quarantined cohorts, and recovery that does not downgrade the security floor

Expected / acceptance: An owner can halt rollout, and devices that have not updated are known

Evidence: fleet inventory; canary decision; halt/recovery model

Scenarios: mixed hardware; old firmware; canary failure; offline cohort

Remediation: Use staged rollout and per-version visibility

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T10 — §2 Table 1: Software Update; Cybersecurity State Awareness; T11 — §2 Table 1: Information Dissemination

Policy origin: recommended local release policy derived from cited principles

## IOT012

**End of support and ownership transfer remove trust**

Requirement: BLOCKER · Severity: High · Owner: Device/Fleet lead · Reviewer: Security/QA reviewer independent of the author

Purpose / risk: An end-of-life device remains connected to the fleet or retains a previous owner’s keys

Applicability: All devices, including legacy devices including older versions declared to be supported; N/A requires a rationale and reviewer sign-off

### Procedure

1. Define end of support, patch channels, decommissioning, and ownership transfer
2. Simulate reset, resale, identity revocation, and backup restore after decommissioning
3. Check that old credentials are unusable, data is erased appropriately for the media, and administrators are notified

Expected / acceptance: No orphan devices, and users know post-support limitations

Evidence: lifecycle policy; transfer trace; revocation record

Scenarios: end of life; resale; lost device; legacy unsupported

Remediation: Add secure erase/quarantine/export and support communication

Threshold / policy notes: These criteria are local policy; BLOCKER controls cannot be waived; RISK controls require approval from the responsible owner, an expiry date, and compensating measures; there is no universal SLA/p95 value

Sources: T11 — §2 Table 1: Documentation; Information Dissemination; Education and Awareness; T10 — §2 Table 1: Data Protection

Policy origin: recommended local release policy derived from cited principles
