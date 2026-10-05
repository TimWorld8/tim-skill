# API Controls

18 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [SEC016: Limit resource use according to cost](#sec016)
- [SEC018: Control inventory and retire old endpoints](#sec018)
- [SEC019: Do not trust data from external services](#sec019)
- [SEC020: Check HTTP and protocol ambiguity](#sec020)
- [IDN012: Verify token integrity and claims](#idn012)
- [BE001: API outcome contracts validated independently of the code](#be001)
- [BE002: HTTP methods must not conceal data changes](#be002)
- [BE003: Detect updates based on stale data](#be003)
- [BE004: Duplicate requests have a business effect only once](#be004)
- [BE005: Reject reuse of a key for a different intent](#be005)
- [BE006: Late requests after deletion must not silently recreate resources](#be006)
- [BE007: Key persistence must be coupled to the side effect](#be007)
- [BE010: Long-running operations have traceable terminal states](#be010)
- [BE011: Distinguish cancellation requests from actual cancellation](#be011)
- [BE012: Partial success has a safe continuation path](#be012)
- [BE013: Supported client versions remain usable](#be013)
- [REL006: Retries have a budget across the entire chain](#rel006)
- [REL007: Deadlines and cancellation release resources](#rel007)

## SEC016

**Limit resource use according to cost**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Small requests trigger excessive CPU, memory, SMS, or billing

Applicability: APIs and services that perform expensive operations; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Have the service owner define budgets for payloads, recursion, pagination, batches, time, and cost
2. Test values at and beyond boundaries using a provider stub; include one account, multiple tokens, and anonymous access
3. Verify that rejection or cancellation does not create further work or costs and that ordinary users can still use the service

Expected / acceptance: Budgets are enforced before creating costs beyond the approved amount, without relying solely on a single IP address

Evidence: approved budgets; bounded load results; stub call counts

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S03 — v5.0.0-V2.4 Anti-automation

Policy origin: recommended local release policy derived from cited principles

## SEC018

**Control inventory and retire old endpoints**

Requirement: RISK · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Debug and old API versions escape verification

Applicability: All types of APIs; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Compare deployed routes against the contract and host/version inventory
2. Attempt old, debug, metrics, and administrator endpoints and alternate methods as an unauthorized user
3. Identify the owner, retirement date, and compatibility window; verify actual disablement in the candidate configuration

Expected / acceptance: Every endpoint has an owner and the same policy; no unknown route is enabled

Evidence: runtime route inventory; negative requests; deprecation plan

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S26 — API9:2023 Improper Inventory Management

Policy origin: recommended local release policy derived from cited principles

## SEC019

**Do not trust data from external services**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: A trusted vendor becomes an injection or privilege escalation path

Applicability: Integration APIs, webhooks, and external feeds; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define schemas, trust boundaries, timeouts, and data permissions for each vendor
2. Use a stub to send malformed and oversized responses, redirects, and forged administrator fields
3. Verify that responses are validated before storage or use in consequential operations and that failures do not increase privileges

Expected / acceptance: Vendor data does not bypass validation or authorization; failures leave a safe state

Evidence: vendor contract; stub cases; failure trace

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S26 — API10:2023 Unsafe Consumption of APIs

Policy origin: recommended local release policy derived from cited principles

## SEC020

**Check HTTP and protocol ambiguity**

Requirement: BLOCKER · Severity: High · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: The proxy and backend interpret requests differently

Applicability: APIs behind a proxy or an HTTP stack; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Identify parsers, proxies, backends, and protocol versions
2. Send ambiguous Content-Length/Transfer-Encoding and disallowed methods/content types in an isolated fixture
3. Verify consistent rejection at every layer; for GraphQL and WebSocket, test depth and sessions according to their use

Expected / acceptance: No request is split or interpreted as different operations by the frontend and backend

Evidence: stack map; fixture result; protocol config

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S05 — v5.0.0-V4.1; V4.2 HTTP Message Structure Validation; V4.3 GraphQL; V4.4 WebSocket

Policy origin: recommended local release policy derived from cited principles

## IDN012

**Verify token integrity and claims**

Requirement: BLOCKER · Severity: Critical · Owner: Development lead · Reviewer: Security reviewer who did not author this part

Purpose / risk: Forged tokens or tokens issued for another service are accepted

Applicability: Systems that use signed or self-contained tokens; record the applicability decision for every release, and any N/A determination with its rationale and reviewer

### Procedure

1. Define issuers, audiences, allowed algorithms, key sources, clock leeway, and lifetimes
2. Submit incorrect signatures, disallowed algorithms, expired and not-yet-valid tokens, incorrect issuers/audiences, and forged key IDs
3. Verify refresh/rotation behavior and that revoked keys do not cause reversion to unsafe fallback

Expected / acceptance: Every token with invalid context or integrity is rejected before authorization

Evidence: claim policy; negative token set; key rotation tests

Scenarios: Normal path; Unauthorized user or input; Errors and recovery

Remediation: Stop delivery of the affected part, correct the root cause, then rerun the failing cases and related cases on the same artifact of the new release before obtaining reviewer sign-off

Threshold / policy notes: Proposed local policy, not a new mandatory statement from the cited sources; no exceptions are allowed for BLOCKER; RISK exceptions may be granted only by the accountable risk owner, with an expiration date and compensating measures; no universal numeric threshold is set: document the scope according to the threats

Sources: S10 — v5.0.0-V9.1 Token source and integrity; V9.2 Token content

Policy origin: recommended local release policy derived from cited principles

## BE001

**API outcome contracts validated independently of the code**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The UI reports success while the backend persists incorrect data

Applicability: Systems with APIs; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Specify the request/response/error and side effects of every important operation
2. Have the reviewer build an oracle from the business rules; use empty values, boundary values, and incorrect data types
3. Call the endpoint with synthetic data, then read persistent state and compare it with the oracle

Expected / acceptance: Responses and persistent data match the contract; invalid input does not change state

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O06 — 15 Status Codes

Policy origin: recommended local release policy derived from cited principles

## BE002

**HTTP methods must not conceal data changes**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Cache/prefetch/retry calls change state

Applicability: HTTP APIs; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Inventory GET/HEAD/OPTIONS and methods declared idempotent
2. Repeat calls with simulated prefetching and inspect side effects
3. Distinguish intended effects from logging that does not change user resources
4. Include TRACE in the inventory if enabled, and test that GET?do=delete does not change resources; if ASVS is selected as the scope, disable TRACE according to 13.4.4

Expected / acceptance: Safe methods have no user-requested state-changing effects; idempotent methods conform to the meaning of idempotency

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O06 — 9.2.1 Safe Methods; 9.2.2 Idempotent Methods; O24 — 13.4.4 (TRACE disabled within adopted ASVS scope)

Policy origin: recommended local release policy derived from cited principles

## BE003

**Detect updates based on stale data**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Overwriting another user's work

Applicability: APIs that update shared data; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Read the same revision from clients A/B
2. Have A write, then have B submit the old revision
3. Check the conflict and require B to reread before updating

Expected / acceptance: There are no silent lost updates; conflicts are reported to the caller

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O06 — 13 Conditional Requests

Policy origin: recommended local release policy derived from cited principles

## BE004

**Duplicate requests have a business effect only once**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Duplicate payments or resource creation after a response is lost

Applicability: Mutations that may be retried; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Specify the per-caller key scope and retention period
2. Submit the same key concurrently in two operations, then drop the response after commit
3. Retry and inspect the resource/event/totals
4. Use a barrier so that both duplicates pass the starting point together, and retain the original receipt and idempotency record; responses must be semantically equivalent, but need not be identical byte for byte

Expected / acceptance: The business effect occurs once, and the response can describe the original operation

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Bind the per-caller intent key to a unique constraint and the business effect in an atomic transaction or durable state machine; retain the original operation's response and retest concurrent duplicates/response loss; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O08 — Reducing client complexity with idempotent API design

Policy origin: recommended local release policy derived from cited principles

## BE005

**Reject reuse of a key for a different intent**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Deduplication reports success for the wrong operation

Applicability: APIs using idempotency keys; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Declare the intent-key namespace from authenticated principal+tenant+operation+key according to the business scope; do not use a tenant from input that has not been authorized or treat the key as a credential
2. Submit caller A/tenant A/key K/payload P, then A/K/Q with a different payload: a mismatch must occur without changing the original result
3. Submit caller B/tenant B with the same string K: the operation may execute in B's namespace according to the contract, but must not read A's result or change A's data; A's token with a forged tenant B must be denied before the deduplication lookup
4. Reduce A's permissions or suspend A after the first result, then replay K; reauthorize before returning a cached response or performing a mutation, checking current object/field permissions

Expected / acceptance: Mismatch checking occurs within the same namespace; independent namespaces do not conflict solely because the string key is the same; replay neither increases privileges nor exposes cached results after revocation

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: same principal/key different payload; independent tenant same string key; forged tenant context; revoked principal replays cached response

Remediation: Use a composite dedup/cache namespace derived from trusted identity with a unique constraint; bind current object/field authorization to lookup/return and mutation; purge/redact cached results when policy disallows them; retest mismatch/cross-tenant/revoked replay; BLOCKER controls cannot be exempted

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O08 — Same client request ID, different intent; O21 — 8.2.2; 8.2.3; 8.3.1; 8.3.2; 8.4.1

Policy origin: recommended local release policy derived from cited principles

## BE006

**Late requests after deletion must not silently recreate resources**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Retries revert state or create duplicates

Applicability: Mutations whose keys expire; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Create, delete, and send the original retry before/after key expiry
2. Simulate delayed delivery up to the maximum supported delay
3. Confirm that behavior after expiry is documented for clients

Expected / acceptance: The deduplication boundary is clear; late requests do not contradict the declared intent

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O08 — Late arriving requests

Policy origin: recommended local release policy derived from cited principles

## BE007

**Key persistence must be coupled to the side effect**

Requirement: BLOCKER · Severity: Critical · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: A crash between the two steps causes duplicates or loss

Applicability: Mutations with deduplication; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Specify the atomic boundary or reconciliation mechanism
2. Stop the process after the side effect but before recording the key, and test the reverse order
3. Restart/retry, then inspect the ledger and resources

Expected / acceptance: No crash window produces duplicate or missing effects that go undetected

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Persist the key and the mutation in one atomic transaction; across systems, use a durable outbox/intent ledger with reconciliation that detects and repairs incomplete state; do not claim exactly-once behavior without a defined boundary; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner, an expiry, and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O08 — Reducing client complexity with idempotent API design

Policy origin: recommended local release policy derived from cited principles

## BE010

**Long-running operations have traceable terminal states**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Accepted is interpreted as completed

Applicability: Async/batch APIs; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Create an operation ID and simulate progress/errors
2. Disconnect the client, then return to query the same ID
3. Verify that success/failure are not interchanged and partial results identify the item ID

Expected / acceptance: Accepted does not guarantee success; the terminal outcome can be retrieved

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O15 — Guidance; Errors

Policy origin: recommended local release policy derived from cited principles

## BE011

**Distinguish cancellation requests from actual cancellation**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Users believe an operation has stopped while it still has effects

Applicability: Cancellable long-running operations; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define state transitions and the point of no return
2. Cancel before starting, during commit, and after success
3. Query the terminal state and inspect persistent effects/compensation

Expected / acceptance: An acknowledged cancellation request is not labeled cancelled until the state confirms it

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O15 — Guidance

Policy origin: recommended local release policy derived from cited principles

## BE012

**Partial success has a safe continuation path**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Retrying the whole batch repeats completed operations

Applicability: Batch/multi-step workflows; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Make item 1 succeed, item 2 fail, and item 3 remain unstarted
2. Read each item's result with the reason it is retryable
3. Retry only the relevant portion or the whole batch through deduplication, and inspect the aggregate result

Expected / acceptance: Every item has a state; continuation or compensation is possible according to the contract

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O15 — Guidance; Parallel operations

Policy origin: recommended local release policy derived from cited principles

## BE013

**Supported client versions remain usable**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: The schema passes validation but old clients break

Applicability: APIs with more than one client version in use; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Declare the support window and retain fixtures for the oldest client
2. Diff field/type/default/enum/format and pagination
3. Run old clients against the new server, including unknown enums and empty values

Expected / acceptance: No change breaks clients within the support window without a migration

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O14 — Adding components; Removing or renaming components

Policy origin: recommended local release policy derived from cited principles

## REL006

**Retries have a budget across the entire chain**

Requirement: BLOCKER · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: Retries at multiple layers multiply load

Applicability: APIs that call dependencies; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Document the number of attempts and deadline at each layer, including SDKs
2. Simulate timeouts/503/rate limits, then count downstream calls
3. Bound retries, spread their timing, and stop when the deadline expires
4. In fixtures, bypass SDK/client caps using a non-cooperative client and multiple tokens; check server quotas by principal/tenant/business budget and provider-stub call counts after rejection/cancellation; other tenants' data must not be exposed and their resources must not be seized

Expected / acceptance: Call counts and total duration do not exceed the budget; unsafe mutations are not retried

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers; cooperative client throttling does not replace server-side enforcement against hostile clients; link SEC016/SEC017 and do not copy the multiplier K

Sources: O03 — Client-Side Throttling; O25 — 2.4.1; O24 — 13.1.3

Policy origin: recommended local release policy derived from cited principles

## REL007

**Deadlines and cancellation release resources**

Requirement: RISK · Severity: High · Owner: Service owner / accountable system owner · Reviewer: Engineer independent of the implementer and the product owner

Purpose / risk: A worker continues occupying the pool after the client has given up

Applicability: APIs/workers performing I/O; CORE must be evaluated for every release, and every N/A decision must state its rationale and reviewer

### Procedure

1. Define an end-to-end deadline, including DNS/connect/read
2. Make a dependency hang, then disconnect the client
3. Inspect the pool/workers and committed state after the deadline

Expected / acceptance: Resources are released; the state of committed results remains traceable

Evidence: Record the release ID/commit/config/schema and test environment; Synthetic data, reproducible commands or procedures, actual versus expected results, and reviewer name

Scenarios: Normal path; Failure paths specified in the procedure

Remediation: Fix the cause and rerun the failing cases; BLOCKER controls cannot be exempted; RISK exemptions require the accountable owner to approve the exemption duration and compensating measures

Threshold / policy notes: This is local policy inferred from the principles in the cited sources; define the scope and risk-based pass thresholds before testing, without copying example numbers

Sources: O19 — Managing load with RPC (lines 212–217)

Policy origin: recommended local release policy derived from cited principles
