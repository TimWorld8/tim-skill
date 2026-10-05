# DATA Controls

23 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [BE008: Invariants survive concurrent writes](#be008)
- [BE009: Retry transactions as the correct complete unit of work](#be009)
- [BE014: Migrations work with both old and new binaries](#be014)
- [BE015: Data changes must validate invariants and counts](#be015)
- [BE016: Events and data can be reconciled](#be016)
- [REL012: Backups cover everything needed for recovery](#rel012)
- [REL013: Prove restoration using backup copies](#rel013)
- [DAT001: Create data contracts with business meaning](#dat001)
- [DAT002: Test schemas against history that must be replayed](#dat002)
- [DAT003: Check quality before publishing downstream](#dat003)
- [DAT004: Retain dataset- and transformation-level lineage](#dat004)
- [DAT005: Separate training data from future information](#dat005)
- [DAT006: Replay without duplicating side effects](#dat006)
- [DAT007: Recover checkpoints using supported versions](#dat007)
- [DAT008: Define event ordering by semantics](#dat008)
- [DAT009: Specify late-event handling](#dat009)
- [DAT010: Prevent batch backfills from colliding with streams](#dat010)
- [DAT011: Reconcile ingestion against outputs](#dat011)
- [DAT012: Handle poison messages without infinite loops](#dat012)
- [DAT013: Set retention to support actual recovery](#dat013)
- [DAT014: Delete data from copies actually in use](#dat014)
- [DAT015: Rehearse cleanup with pending readers/writers](#dat015)
- [DAT016: Hand over replay runbooks that preserve authorization](#dat016)

## BE008

**Invariants survive concurrent writes**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Negative balances or quota overuse

Applicability: Shared data; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Write down invariants such as available >= 0
2. Use a barrier so that A/B read the same original value, then commit close together
3. Inspect the results and repeat using the isolation/locking actually employed

Expected / acceptance: Every tested interleaving preserves the invariant or explicitly aborts one operation

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Move the invariant into a constraint or use provable conditional updates/locking/isolation; abort on conflict and retry the entire decision from a new snapshot, then retest the failing interleaving; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O13 — 13.2.3 Serializable Isolation Level

Policy origin: recommended local release policy derived from cited principles

## BE009

**Retry transactions as the correct complete unit of work**

Requirement: RISK · Severity: High · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Retrying only a statement reuses an old snapshot or decision

Applicability: Transactions that may abort/deadlock; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Trigger a serialization failure or deadlock with two sessions
2. Verify that a retry starts a new transaction and recomputes the decision
3. Limit the retry count and check that external side effects are not duplicated
4. Pause after a serialization failure, then revoke the role before retrying; reread current permissions and do not commit using the old decision; use stubs for provider/email/payment and verify no duplicate effects

Expected / acceptance: The result after retry is equivalent to a complete transaction satisfying the invariants; retries do not restore revoked privileges, and external stub effects are not duplicated

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O13 — 13.2.3 Serializable Isolation Level; O21 — 8.3.2; O22 — 15.4.2

Policy origin: recommended local release policy derived from cited principles

## BE014

**Migrations work with both old and new binaries**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Rolling deployments read/write the schema differently

Applicability: Changes to persistent schemas; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Build a compatibility matrix of old/new binaries against before/after schemas
2. Test expand/backfill/contract with synthetic data, including NULL
3. Stop backfill partway through, then resume and check counts/values

Expected / acceptance: Coexisting versions read and write correctly; perform contract only after the old fields are no longer used

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Use expand-contract migrations, retaining existing fields during mixed-version operation; make backfill resumable and validate counts/invariants; remove fields after old clients leave support, with a rollback matrix; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O14 — Changing the type of fields; Removing or renaming components

Policy origin: recommended local release policy derived from cited principles

## BE015

**Data changes must validate invariants and counts**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: A migration exits successfully but corrupts data

Applicability: Transform/import/export; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Before migration, specify invariants and canonical normalization for logical checksums, including rounding/precision/timezone rules and expected rejected rows
2. Record input count, accepted/rejected counts, output count, and control totals such as totals by entity; create duplicate/orphan/NULL/precision-boundary/DST-time or differing-offset fixtures
3. Perform the migration, then check unique/not-null/check/foreign-key constraints or equivalent invariant mechanisms in the engine; reconcile totals and rejection reasons for every record
4. Compare logical checksums after normalization; differing byte serialization does not automatically mean data loss; rounding/timezone changes require an expected transform from the reviewer

Expected / acceptance: There is no silent data loss or rounding; rejections are traceable

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix mapping/canonical normalization or transform rules according to the oracle; enforce constraints/invariants supported by the engine; quarantine/reprocess rejected records and reconcile control totals before promotion; BLOCKER controls cannot be exempted

Threshold / policy notes: Constraint/logical validation supported by sources; precision/timezone/orphan fixtures, control totals and normalized checksum are original local data-quality policy. Do not claim Read Committed as a migration-validation standard; the reviewer defines tolerances before execution and does not accept silent data loss

Sources: O20 — 5.5.1; 5.5.2; 5.5.3; 5.5.5; O25 — 2.2.1; 2.2.3

Policy origin: recommended local release policy derived from cited principles

## BE016

**Events and data can be reconciled**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Commit succeeds but not all events are delivered

Applicability: Queue/event-driven backends; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define the source of truth and stable event IDs
2. Disconnect the broker after commit, send duplicate/out-of-order events, then restart
3. Run reconciliation and inspect the backlog and downstream results

Expected / acceptance: Missing/duplicate events are detected and repaired without duplicating business effects

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Add a transactional outbox or durable intent record with stable event IDs; deduplicate at the consumer and check ordering by entity version; configure reconciliation to compare the source of truth with downstream results; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O08 — Reducing client complexity

Policy origin: recommended local release policy derived from cited principles

## REL012

**Backups cover everything needed for recovery**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The database is available but files, config, or keys are missing

Applicability: Irreplaceable data; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Inventory data/app/config and recovery dependencies
2. Schedule backups according to RPO and check failures/retention
3. Check permissions and encryption keys without printing secrets
4. Include the durable deletion/revocation/key journal in the recovery inventory and recovery-operator permissions; do not restore the journal to an earlier time together with a snapshot without a source of current state

Expected / acceptance: Backups are complete and recovery operators can access them according to their permissions

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Complete the inventory of data, app/config, and recovery materials; separate backup/restore permissions and test encryption keys for the actual recovery operator; automate backups with failure alerts and retention supporting RPO; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O09 — REL09-BP01; REL09-BP02; REL09-BP03

Policy origin: recommended local release policy derived from cited principles

## REL013

**Prove restoration using backup copies**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable data owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Backup success provides false reassurance

Applicability: Data requiring backups; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Randomly select a backup point in time in an isolated area
2. Restore using the runbook and the actual recovery credentials
3. Read data/run critical tasks, check checksums, and measure time
4. Before reopening service after restore/rollback, reconcile deletion tombstones, account/role/session revocation, and key-rotation/revocation journals newer than the snapshot; the journal must remain outside the rollback boundary or be recoverable up to the present; if freshness cannot be proven, do not open sensitive paths
5. Use an area isolated by permissions/network and fixtures containing deleted data, suspended users, and revoked canary keys; verify that deleted data/users do not become active again, revoked identities/keys have no access, and no canary secrets appear in logs before opening the critical journey under current permissions

Expected / acceptance: Restoration and use succeed; actual data loss and recovery time are measured within the test boundary; deleted active data, revoked privileges/sessions, or revoked keys are not returned to service

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name; Restore/rollback isolation boundary and journal checkpoint/reconciliation report; Deleted-record/suspended-user/revoked-key fixtures before and after reconciliation

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix restore permissions/keys/format compatibility, then restore the copy again in an isolated area; compare logical checksums and the critical journey; if RTO/RPO are not met, change the strategy or revise the objectives with the business owner before release; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures; separate the durable deletion/revocation journal from the snapshot being rolled back and replay in version order; invalidate sessions and rotate/revoke secrets from current sources before opening traffic; if the journal is incomplete, quarantine sensitive paths

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers; deletion/revocation journal reconciliation is local recovery-security policy linked to SEC004/IDN004/SEC022; do not claim AWS directly provides this recipe

Sources: O09 — REL09-BP04; O21 — 8.3.2; O23 — 14.1.2; 14.2.4; 14.2.7; O24 — 13.2.2; 13.3.1; 13.3.2; 13.3.4

Policy origin: recommended local release policy derived from cited principles

## DAT001

**Create data contracts with business meaning**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Types are correct but units or semantics are wrong

Applicability: All ingestion; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Specify schema, units, timezones, null semantics, keys, and field meanings
2. Test incorrect units, incorrect timezones, nulls, and duplicate keys
3. Have producer/consumer owners confirm before accepting a new version

Expected / acceptance: Data violating the contract is rejected or quarantined

Evidence: contract; negative fixture; versioned fixture manifest DAT001 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Baht/satang use the same type; UTC/local timezone swapped; Incorrect null semantics; duplicate key; New producer with old consumer

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A11 — Schema Evolution and Compatibility

Policy origin: recommended local release policy derived from cited principles

## DAT002

**Test schemas against history that must be replayed**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: The latest version is compatible but older data cannot be read

Applicability: Data with multiple schema versions; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Enumerate versions within retention and consumers still in use
2. Run the new reader against fixtures for every version it must read
3. Test producer/consumer upgrade and rollback ordering

Expected / acceptance: Supported history can be read without relying solely on defaults

Evidence: compatibility matrix; upgrade record; versioned fixture manifest DAT002 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: New reader reads the oldest schema; Latest compatible but not transitively compatible; Producer upgrades before consumer; Schema rollback

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A11 — Backward compatibility; Transitive property

Policy origin: recommended local release policy derived from cited principles

## DAT003

**Check quality before publishing downstream**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Bad data spreads into reports or models

Applicability: Batch/stream ingestion; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define completeness, uniqueness, range, and referential-integrity rules according to the domain
2. Insert rows violating each rule and a valid sentinel
3. Verify quarantine does not unintentionally stop good data and notifies the owner

Expected / acceptance: Quality results identify the rule and affected rows

Evidence: quality report; quarantine tests; versioned fixture manifest DAT003 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: missing required key; referential orphan; Invalid range; Poison precedes valid sentinel; quality quarantine replay

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A06 — Data validation & source authentication

Policy origin: recommended local release policy derived from cited principles

## DAT004

**Retain dataset- and transformation-level lineage**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Consumers of bad data or AI evidence cannot be located

Applicability: Data that is transformed or forwarded; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Record input version, code/configuration digest, output, and run ID
2. Select one output and trace it back to source data
3. Simulate a source correction and locate downstream outputs requiring remediation or reevaluation

Expected / acceptance: Impacts can be traced and transformations reproduced

Evidence: lineage graph; reproduction log; versioned fixture manifest DAT004 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Trace output back to input version; Transformation digest differs; Source correction requires downstream reevaluation; Missing run ID

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A02 — MS-2.9-002

Policy origin: recommended local release policy derived from cited principles

## DAT005

**Separate training data from future information**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Features contain labels or data that did not exist at prediction time

Applicability: ML feature pipelines; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define available_at/event_time and prediction_time
2. Create a fixture where the label arrives after prediction
3. Verify point-in-time joins and that fitted preprocessing does not use future information

Expected / acceptance: Every feature could actually have been available at prediction time

Evidence: temporal join fixture; feature audit; versioned fixture manifest DAT005 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Label arrives after prediction; future available_at join; entity temporal leakage; preprocessor fit future

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A15 — 12.2 Data leakage

Policy origin: recommended local release policy derived from cited principles

## DAT006

**Replay without duplicating side effects**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Restart causes duplicate transfers or notifications

Applicability: Pipelines that write to destinations; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define event/run idempotency keys and commit boundaries
2. Simulate a crash after sink commit but before checkpoint
3. Replay the same data and compare effect counts and state

Expected / acceptance: Business effects are not duplicated even if delivery is duplicated

Evidence: crash/replay log; sink ledger; versioned fixture manifest DAT006 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Crash before sink commit; Sink commits, then crash before checkpoint; duplicate delivery; Concurrent replay with the same key; Idempotency key expires

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A10 — Fault Tolerance Semantics; Using Foreach and ForeachBatch

Policy origin: recommended local release policy derived from cited principles

## DAT007

**Recover checkpoints using supported versions**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Old state is incompatible with a new query

Applicability: Stateful streams; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Back up checkpoints and identify schema/state versions
2. Change grouping/source/state schemas in sandbox fixtures
3. Test approved migration or rebuilding and restoration of the previous query

Expected / acceptance: Incompatible checkpoints are not used silently

Evidence: checkpoint manifest; migration/restart trace; versioned fixture manifest DAT007 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Grouping key changes; Source count changes; State schema changes; Checkpoint restored with a different runtime; Rebuild and return to the previous query

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A10 — Recovery Semantics after Changes in a Streaming Query

Policy origin: recommended local release policy derived from cited principles

## DAT008

**Define event ordering by semantics**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Arrival order overwrites newer state with older state

Applicability: Ordered update/delete data; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define entity sequence/version and tie-breakers
2. Send newer updates before older ones and interleave deletes with updates
3. Verify conditional writes reject stale events and preserve tombstones

Expected / acceptance: Final state matches the ordering contract

Evidence: ordering fixture; state comparison; versioned fixture manifest DAT008 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Newer update before older update; Delete before delayed update; sequence tie; reordered retries; tombstone replay

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A12 — Operation semantics; Write change data into a Delta table

Policy origin: recommended local release policy derived from cited principles

## DAT009

**Specify late-event handling**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Watermarks discard data without a correction path

Applicability: Streams using event time; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define task-appropriate lateness and document its rationale
2. Send events before, at, and after the watermark boundary, including clock skew
3. Inspect dropped/quarantine counters and correction/recomputation paths

Expected / acceptance: Late data does not disappear without a trace and a correction path

Evidence: watermark test; correction report; versioned fixture manifest DAT009 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Event before/at/after watermark; source clock skew; Late correction after output; Recomputation restores the original value

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A10 — Handling Late Data and Watermarking

Policy origin: recommended local release policy derived from cited principles

## DAT010

**Prevent batch backfills from colliding with streams**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Duplicate writes or reversal of the latest data

Applicability: Batch and stream write to the same dataset; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define backfill ownership partitions or version fences
2. Run backfill and stream on the same entity in a fixture
3. Inspect duplicates, conflicts, and final state after retries

Expected / acceptance: Results match the agreed reference ordering and preserve newer updates

Evidence: concurrency log; reference state; versioned fixture manifest DAT010 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Backfill and stream on the same entity; backfill stale overwrite; duplicate merge source; concurrent retries; Delete during backfill

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A12 — Operation semantics; Data deduplication when writing into Delta tables

Policy origin: recommended local release policy derived from cited principles

## DAT011

**Reconcile ingestion against outputs**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: The job completes but rows are lost or duplicated

Applicability: Pipelines with important data; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define control totals and key inventories without exposing PII
2. Compare source, accepted, rejected, and output records by run
3. Simulate missing file parts, duplicate pages, and partial commits

Expected / acceptance: Differences are explained before publishing results

Evidence: reconciliation ledger; partial input test; versioned fixture manifest DAT011 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: One file part is missing; Duplicate page; Equal counts but missing/duplicate keys; partial commit; Accepted/rejected totals mismatch

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A10 — Fault Tolerance Semantics

Policy origin: recommended local release policy derived from cited principles

## DAT012

**Handle poison messages without infinite loops**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Bad messages block partitions and consume resources

Applicability: Queues/streams; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define retry classification and quarantine with references
2. Send a malformed record followed by a valid record
3. Verify retries do not loop indefinitely and replay after remediation creates no duplicates

Expected / acceptance: Good data continues and poison messages have an owner

Evidence: retry/quarantine trace; replay result; versioned fixture manifest DAT012 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: malformed poison message; Valid record follows; retry exhaustion; Quarantine replay after remediation; partition head-of-line blocking

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A07 — Resource Allocation Management; Timeouts and Throttling

Policy origin: recommended local release policy derived from cited principles

## DAT013

**Set retention to support actual recovery**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: VACUUM deletes data before consumers recover

Applicability: History/change-feed retention; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Measure or estimate recovery horizons, consumer lag, and long transactions
2. Check retention against required replay periods with owner sign-off
3. Simulate a consumer stopped beyond retention and test an explicitly disclosed rebuild

Expected / acceptance: Recovery does not rely on history already deleted

Evidence: retention decision; rebuild exercise; versioned fixture manifest DAT013 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Consumer lag exceeds retention; History removed by VACUUM; Rebuild from a new source; Long transaction near cleanup; Recovery horizon does not match policy

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A13 — What is the retention policy for change records?

Policy origin: recommended local release policy derived from cited principles

## DAT014

**Delete data from copies actually in use**

Requirement: BLOCKER · Severity: Critical · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: DELETE hides data while it remains in history or vectors

Applicability: Data subject to deletion requirements; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Map raw, derived, cache, vector, log, and backup copies
2. Delete a synthetic subject with a tombstone and inspect every location
3. Restore backups/replay and verify deleted data is not resurrected

Expected / acceptance: Evidence covers logical/physical deletion and backup limitations according to policy

Evidence: deletion map; restore negative test; versioned fixture manifest DAT014 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: delete raw/derived/vector/cache; Backup restore after deletion; Replay update preceding tombstone; trace export retained copy; Physical history remains

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A12 — Delete from a table

Policy origin: recommended local release policy derived from cited principles

## DAT015

**Rehearse cleanup with pending readers/writers**

Requirement: BLOCKER · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Cleanup deletes files still in use by active work

Applicability: Versioned tables/object storage; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Identify reader, writer, and stream lag that cleanup must respect
2. Run a dry-run and use a fixture with a pending transaction
3. Check safety guards and test reads after cleanup without reducing production retention guards

Expected / acceptance: Cleanup does not damage pending work or recovery boundaries

Evidence: dry-run inventory; concurrency exercise; versioned fixture manifest DAT015 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Pending reader during cleanup; writer uncommitted file; Stream lag near retention; Dry-run finds active files; Cleanup affects checkpoint directory

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A14 — Remove files no longer referenced by a Delta table (VACUUM)

Policy origin: recommended local release policy derived from cited principles

## DAT016

**Hand over replay runbooks that preserve authorization**

Requirement: RISK · Severity: High · Owner: Data platform owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: A new operator fixes data using excessive privileges or the wrong version

Applicability: All production data systems; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Have an operator who did not write the pipeline perform restore/replay using public data
2. Use a restricted role and test out-of-scope commands
3. Record decision points, checksums, times, and escalation reasons

Expected / acceptance: The recipient can follow the runbook and knows when to stop

Evidence: handover exercise; permission deny log; versioned fixture manifest DAT016 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: operator standard role restore; replay wrong version; Command outside authorization; checksum mismatch; Escalation when history is unavailable

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — MANAGE 4.1–4.3

Policy origin: recommended local release policy derived from cited principles
