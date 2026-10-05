# AI Controls

24 stable controls. Read only applicable entries; retain all criteria, evidence and source mappings.

## Contents

- [AI001: Define decision boundaries and stop authority](#ai001)
- [AI002: Bind evaluation results to the configuration actually released](#ai002)
- [AI003: Build an evaluation suite representative of real work](#ai003)
- [AI004: Separate holdout data from system tuning](#ai004)
- [AI005: Report results by group and type of harm](#ai005)
- [AI006: Verify the quality of evaluation judges](#ai006)
- [AI007: Evaluate retrieval and answers separately](#ai007)
- [AI008: Enforce tenant authorization before retrieving context](#ai008)
- [AI009: Prevent poisoned data from entering the knowledge store](#ai009)
- [AI010: Test prompt injection across multiple channels](#ai010)
- [AI011: Separate external data from privileged instructions](#ai011)
- [AI012: Have the tool gateway validate every model proposal](#ai012)
- [AI013: Minimize credential privileges by user and task](#ai013)
- [AI014: Bind approval to a verifiable action](#ai014)
- [AI015: Make cancellation stop subsequent actions](#ai015)
- [AI016: Limit loops and budgets at a shared enforcement point](#ai016)
- [AI017: Minimize and inspect PII across every transit path](#ai017)
- [AI018: Do not place secrets or authorization in prompts](#ai018)
- [AI019: Validate outputs before downstream systems use them](#ai019)
- [AI020: Abstain when evidence is insufficient](#ai020)
- [AI021: Monitor drift and interpretable feedback](#ai021)
- [AI022: Rehearse rollback of models, prompts, and indexes together](#ai022)
- [AI023: Ensure fallback does not bypass guardrails](#ai023)
- [AI024: Bind answers to retrievable provenance](#ai024)

## AI001

**Define decision boundaries and stop authority**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Users trust outputs beyond the demonstrated scope

Applicability: All ML/LLM/agent systems; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Document permitted tasks and their effects on people
2. Identify tasks that must be escalated to an expert and who has authority to stop the system
3. Have a reviewer simulate out-of-scope tasks
4. Have the owner define acceptable task error based on harm before running tests; use target users who did not build the system to perform non-leading tasks through supported keyboard/screen-reader interfaces, then explain what is known, the assumptions, what is unknown, the consequences, and action status; separate unassisted/assisted results and remediate failing scope before certifying it

Expected / acceptance: Task boundaries and the owner authorized to stop the system are explicit; users in declared supported groups understand decisions/limitations according to the predeclared criteria, and the escalation destination works in practice

Evidence: use-case card; Review record; predeclared task-error criteria; target-user unassisted/assisted comprehension record; versioned fixture manifest AI001 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Out-of-domain task that users expect to trust; Target user reads an estimate as a fact; Person without authority orders the system to stop; Escalation destination is unavailable

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — 1.2.2 Risk Tolerance; MANAGE 2.4

Policy origin: recommended local release policy derived from cited principles

## AI002

**Bind evaluation results to the configuration actually released**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: A prompt or index changes while old scores are reused

Applicability: All AI systems; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Create a candidate manifest from resolved runtime configuration: provider/model identifier and known snapshot; mark aliases/weights that cannot be frozen as unknown and state the certification boundary; include system/developer prompts, tool schemas, retrieval index/ACL, preprocessor, guardrail, fallback, environment, dataset, evaluation, and grader version
2. Run the evaluation suite on the candidate, then compare the manifest with deployment telemetry or resolved configuration read by the reviewer from the actual artifact/service; do not accept only a handwritten manifest
3. Change effective prompt/index/ACL/tool/guardrail/fallback settings after evaluation and simulate a provider alias change; the gate must invalidate old evidence until the new candidate is evaluated or the still-unproven scope is disabled

Expected / acceptance: Identity evidence matches the actual candidate and provider unknowns are disclosed; mismatched or missing identity evidence cannot be waived; judge the quality of the identity-verified candidate separately against task criteria

Evidence: runtime-resolved manifest; deployment telemetry/config capture; eval dataset/grader manifest; invalidation negative tests; versioned fixture manifest AI002 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Prompt changes after evaluation; Provider alias changes while the name stays the same; index/ACL digest mismatch; Grader version mismatch; Runtime telemetry differs from the manifest

Remediation: Block releases with mismatched identity evidence, capture resolved configuration, and evaluate the new candidate; do not claim that hashing an alias freezes weights

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A08 — Eval-driven development

Policy origin: recommended local release policy derived from cited principles

## AI003

**Build an evaluation suite representative of real work**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Demos limited to easy cases create misleading confidence in capability

Applicability: All AI systems; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Enumerate supported languages, devices, tasks, lengths, and privilege levels
2. Create synthetic or public data representing each group with expert labels
3. Review coverage gaps before using scores

Expected / acceptance: The test suite includes ordinary, boundary, and adversarial cases

Evidence: coverage matrix; Versioned dataset; versioned fixture manifest AI003 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Long Thai text/mixed Thai and English; low-role user task; Difficult-to-read document; Adversarial case not yet covered

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A08 — How to run evals

Policy origin: recommended local release policy derived from cited principles

## AI004

**Separate holdout data from system tuning**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Test results leak into tuning and produce misleading scores

Applicability: Trained models or systems tuned from examples; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Split data by time and entity before preprocessing
2. Check near-duplicates and access to the holdout
3. If the holdout is used to decide tuning changes, create a new holdout before drawing conclusions

Expected / acceptance: Test data is not used to train or select configurations

Evidence: split manifest; duplicate report; versioned fixture manifest AI004 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Near-duplicate across splits; Same entity in train and test; Preprocessor fit on holdout; Team views holdout and then edits the prompt

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A15 — 12.2; 12.2.1

Policy origin: recommended local release policy derived from cited principles

## AI005

**Report results by group and type of harm**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Averages hide vulnerable groups

Applicability: AI with multiple user or context groups; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define slices and types of false positives/negatives before running
2. Report denominators, uncertainty, and results for each group
3. Disable use for failing groups or collect more data

Expected / acceptance: Approvers can see failures for each group

Evidence: slice report; decision record; versioned fixture manifest AI005 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Rare slice fails while aggregate passes; High-harm false negative; Slice with a small denominator; Group absent from the evaluation suite

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — MEASURE 2.1–2.13

Policy origin: recommended local release policy derived from cited principles

## AI006

**Verify the quality of evaluation judges**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: A grader scores itself or disagrees with experts

Applicability: Use of LLM judges or human labels; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Create examples on which experts agree and disagree
2. Randomize answer positions and hide model names
3. Compare graders with experts and record disagreements

Expected / acceptance: Do not draw conclusions from uncalibrated graders

Evidence: rubric; blind comparison; versioned fixture manifest AI006 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Grader favors the first answer; Long but incorrect answer; Model name introduces bias; expert disagreement

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A08 — How to run evals

Policy origin: recommended local release policy derived from cited principles

## AI007

**Evaluate retrieval and answers separately**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Answers look good while retrieval fails

Applicability: RAG; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Create questions with documents that should and should not be retrieved
2. Check retrieval before grounding and answer completeness
3. Test absent documents, conflicting information, and withdrawn documents

Expected / acceptance: It is possible to distinguish retrieval errors from answer-generation errors

Evidence: retrieval trace; answer annotations; versioned fixture manifest AI007 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Correct document exists but retrieval misses it; Retrieval finds the document but the answer contradicts it; Conflicting documents; No document supports an answer

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A02 — MS-2.3-001; MS-2.5-003

Policy origin: recommended local release policy derived from cited principles

## AI008

**Enforce tenant authorization before retrieving context**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Retrieving another party's documents and filtering text afterward is too late

Applicability: Multi-tenant RAG or memory; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define authorization freshness and recheck points according to harm before testing; create A/B canaries in content, titles, metadata, citation IDs, and inspectable embedding-facing surfaces, without real data
2. Run A/B sessions concurrently; capture retrieval, reranker, context, tool output, provider payload, trace/export, and cache keys; search for B from A using similar terms and vectors
3. Control revocation before retrieval, after retrieval but before provider send, before action commit, and cached-answer replay after revocation; inspect every intermediate egress according to the freshness contract, not only the final answer
4. When a source is withdrawn or inaccessible to the user, check that fallback does not expose sensitive titles, snippets, URLs, or citation IDs; check denial versus not-found according to a policy that does not create a side channel

Expected / acceptance: Unauthorized data does not leave the mediation point for providers/tools/exports under the declared freshness contract; no stale-cache bypass

Evidence: A/B canary inventory; all-boundary redacted capture; authorization-version and revoke interleaving log; cache key/ACL test; versioned fixture manifest AI008 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: A/B concurrent vector search; Revocation after retrieval but before provider send; Cached answer after revocation; metadata/title canary egress; Authorization changes before commit

Remediation: Enforce ACLs before retrieval and recheck/fence before sensitive egress/commit; partition caches and invalidate on revocation; quarantine outputs whose authorization has changed

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A06 — Prevention and Mitigation Strategies 1

Policy origin: recommended local release policy derived from cited principles

## AI009

**Prevent poisoned data from entering the knowledge store**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Misplaced trust in documents lets outputs or tools be controlled

Applicability: RAG/fine-tuning; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Verify sources, approvers, checksums, and content changes
2. Insert test documents containing hidden instructions or claims of fake policy
3. Test quarantine and restoration of the previous index version

Expected / acceptance: Failing data is isolated and can be rolled back

Evidence: ingestion log; quarantine report; versioned fixture manifest AI009 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Document contains hidden instructions; Source checksum changes; Poisoned data enters the index; Quarantine followed by index rollback

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A06 — Prevention and Mitigation Strategies 2

Policy origin: recommended local release policy derived from cited principles

## AI010

**Test prompt injection across multiple channels**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: External text changes instructions or steals data

Applicability: LLMs receiving untrusted data; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Embed fake instructions in supported files, web pages, OCR, and tool outputs
2. Test multilingual text, split payloads, and encodings
3. Inspect side effects at the tool boundary using markers with no real data

Expected / acceptance: Payloads neither gain privileges nor send markers out

Evidence: attack corpus; tool deny logs; versioned fixture manifest AI010 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Web page instructs exfiltration of a marker; OCR injection; Payload split across multiple tool outputs; Thai/encoded payload; Injection requests increased privileges

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A03 — Types; Example Attack Scenarios 2,6,7,9

Policy origin: recommended local release policy derived from cited principles

## AI011

**Separate external data from privileged instructions**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: A template incorporates documents into developer messages

Applicability: Agent workflows; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Trace the dataflow of messages through every node
2. Place role delimiters and fake instructions in external values
3. Verify schemas and message placement using traces

Expected / acceptance: External data does not become privileged instructions

Evidence: dataflow diagram; trace; versioned fixture manifest AI011 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Role delimiter in an external variable; Tool result enters a developer template; extra enum value; Node sends a free-form command

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A09 — Don’t use untrusted variables in developer messages; Use structured outputs

Policy origin: recommended local release policy derived from cited principles

## AI012

**Have the tool gateway validate every model proposal**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Model text is used as an executable command

Applicability: Agents that call tools; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define tool allowlists and argument schemas
2. Send fake tool names, path traversal, external URLs, and extra fields
3. Verify service-side validation and authorization before execution

Expected / acceptance: Invalid proposals produce no side effects

Evidence: gateway tests; policy config; versioned fixture manifest AI012 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Tool name outside the allowlist; extra schema field; path traversal; external URL destination; retry bypass gateway

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A05 — Prevention and Mitigation Strategies

Policy origin: recommended local release policy derived from cited principles

## AI013

**Minimize credential privileges by user and task**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: An agent uses a shared account that can read or write for everyone

Applicability: Agent/tool integrations; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Enumerate tokens and actual downstream privileges by user/tenant/operation; do not rely on a model assertion as authorization
2. Have a low-role user request unauthorized reads/writes and switch accounts during a queued tool request; verify complete mediation using an operation-bound identity
3. Control revocation before tool lookup, after argument validation, before dispatch, and before action commit; check retries/child tools using the authorization generation required by the contract
4. Simulate committed-response-lost after revocation, then query status with appropriate authorization; do not replay a mutation by borrowing credentials from the new account

Expected / acceptance: Every operation uses the correct user context; revocation/interleaving does not elevate privileges or change the actor; unknown outcomes are reconciled within a limited scope

Evidence: downstream permission inventory; identity-bound operation ledger; revoke/dispatch/commit trace; cross-account negative tests; versioned fixture manifest AI013 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: low-role cross-tenant read/write; Revocation before dispatch/commit; A logs out and B logs in while work is queued; Retry uses stale identity; Commit succeeds but response is lost

Remediation: Reduce token scope, check authorization at the gateway and destination, bind actor/tenant to pending work, and reject stale authorization under the freshness contract

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A05 — Excessive Permissions

Policy origin: recommended local release policy derived from cited principles

## AI014

**Bind approval to a verifiable action**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Broad text is approved and the payload changes afterward

Applicability: Agents performing high-impact work; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Show every recipient, amounts or resources, sensitive data, destinations, and resulting changes to an authorized approver; use a task test asking who will receive data and what will happen without leading the answer
2. Bind approval to the argument digest and validity period
3. Change arguments or replay approval and verify rejection
4. Have the owner define acceptable task error based on harm before running tests; use target users who did not build the system to perform non-leading tasks through supported keyboard/screen-reader interfaces, then explain what is known, the assumptions, what is unknown, the consequences, and action status; separate unassisted/assisted results and remediate failing scope before certifying it

Expected / acceptance: Approval applies to the action shown and authorization remains valid; users in declared supported groups understand decisions/limitations according to the predeclared criteria, and the escalation destination works in practice

Evidence: approval record; mutation/replay test; predeclared task-error criteria; target-user unassisted/assisted comprehension record; versioned fixture manifest AI014 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Multiple recipients and sensitive data; low-role approval; Arguments change after approval; approval expired/replayed; keyboard/screen-reader comprehension

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A05 — Excessive Autonomy

Policy origin: recommended local release policy derived from cited principles

## AI015

**Make cancellation stop subsequent actions**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: The user cancels but the agent continues dispatching work

Applicability: Asynchronous agents; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define a point where cancel acknowledgement and dispatch reservation share a single ordering using a cancellation fence/generation or equivalent mechanism; record operation IDs for queues, child agents, and retries
2. Control interleavings: cancel while queued, reserved-not-dispatched, in-flight, committed-response-lost, and before the next chain step; inject a timeout after commit, using the sink ledger as ground truth
3. After cancellation is acknowledged, no new reservations may be created, and existing undispatched reservations must be fenced according to the contract; work already started must show committed/partial/unknown with an authorized status check or compensation. Do not retry an unknown outcome without deduplication
4. Have target users read status messages and explain which parts stopped, which already occurred, and which are unknown; separate results without assistance from results with explanation

Expected / acceptance: Cancel acknowledgement does not race into creating new work; already-started outcomes are shown according to the ledger, or as unknown with a way to check; do not promise to reverse irreversible effects

Evidence: dispatch/reservation ledger with cancel acknowledgement order; operation/child/retry IDs; sink/status/compensation trace; task-based outcome comprehension record; versioned fixture manifest AI015 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: queued cancel; reserved-before-dispatch cancel race; in-flight cancel; committed-response-lost unknown; child/retry after acknowledgement; Cancellation before a chain step

Remediation: Use a shared cancellation fence at the gateway and propagate it to workers; retain unknown outcomes and reconcile using operation IDs; do not report that everything was successfully cancelled when commit status is unknown

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — MANAGE 2.4

Policy origin: recommended local release policy derived from cited principles

## AI016

**Limit loops and budgets at a shared enforcement point**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Fan-out or retries consume the budget indefinitely

Applicability: AI with costs or limited resources; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define task, tenant, token, time, and tool-call budgets according to context
2. Simulate loops, retries, and concurrent agents using a shared budget
3. Have atomic counters reject over-allocation before reserving resources and release resources on cancellation

Expected / acceptance: Stop safely and report incomplete work

Evidence: quota config; concurrency trace; versioned fixture manifest AI016 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Fan-out agents use a shared budget; retry loop; concurrent quota reservation; Cancellation releases resources; One tenant monopolizes quota

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A07 — Resource Allocation Management; Timeouts and Throttling

Policy origin: recommended local release policy derived from cited principles

## AI017

**Minimize and inspect PII across every transit path**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: PII leaks through prompts, outputs, traces, or telemetry

Applicability: AI that may receive personal data; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Place synthetic PII and A/B markers in inputs, retrieved content, metadata/titles, and tool outputs; define necessary data and each recipient's authorization
2. Capture provider payloads, outputs, logs, traces, exports, caches, and rerankers at dataflow points; test low-role log/export reads, including concurrent A/B sessions
3. Withdraw consent/authorization before ingestion, after retrieval but before provider send, and before export; inspect old queues and fallbacks under the freshness/retention contract
4. Delete canaries according to policy, then inspect cached outputs/trace exports and restore/replay paths; accurately report copies still subject to retention and their limitations

Expected / acceptance: PII/tenant data does not leave the authorized recipient boundary; revocation and deletion have evidence at every point declared in scope

Evidence: synthetic PII/tenant canary map; provider/reranker/trace/export capture; revoke queue and cache tests; deletion/restore inventory; versioned fixture manifest AI017 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: PII canary provider payload; B title in A trace; low-role log/export denial; Revocation before provider send; Deletion followed by restore/replay; Fallback sends PII

Remediation: Minimize/redact before each egress; restrict log/export roles and clear or quarantine queues whose authorization has changed

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A04 — Sanitization; Access Controls

Policy origin: recommended local release policy derived from cited principles

## AI018

**Do not place secrets or authorization in prompts**

Requirement: BLOCKER · Severity: Critical · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Reading a prompt grants actual privileges

Applicability: All LLMs using credentials; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Inspect prompt templates and context with a local secret scanner
2. Simulate the model disclosing its prompt and calling tools
3. Verify that credentials remain in services and services enforce authorization themselves

Expected / acceptance: Prompt disclosure neither exposes secrets nor elevates privileges

Evidence: secret scan; auth test; versioned fixture manifest AI018 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: prompt disclosure; hardcoded credential fixture; Model proposes a privileged tool; Low-role user invokes a tool using prompt policy

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A03 — Prevention and Mitigation Strategies 4

Policy origin: recommended local release policy derived from cited principles

## AI019

**Validate outputs before downstream systems use them**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Answers become XSS, SQL, shell commands, or dangerous formulas

Applicability: AI outputs entering UIs/tools/databases; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Identify every sink and trust boundary: HTML, DOM, SQL, shell commands, spreadsheet formulas, and structured tool arguments; separate schema/type validation from sink sanitization/parameterization
2. Send schema-valid outputs whose strings contain HTML/SQL/shell/formula payloads, including nested/encoded values; verify sink-specific encoding, parameter binding, and allowlisted executables/arguments before use
3. Test retries, fallbacks, and exported files under the same sink policy; verify that invalid outputs cause no execution and that recovery does not disable validation

Expected / acceptance: Every sink uses context-specific handling even when the schema passes; JSON strings are not interpreted as executable code or formulas without an authorizing policy

Evidence: sink inventory; schema-valid hostile-string fixtures; parameterized/encoded execution trace; export/fallback negative tests; versioned fixture manifest AI019 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: schema-valid HTML/XSS string; parameterized SQL hostile value; shell argument injection; spreadsheet formula export; fallback sink bypass

Remediation: Fix each sink using context-appropriate encoding/parameterization/allowlisted execution; do not substitute schema validation for sanitization

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A16 — Common Examples of Vulnerability; Prevention and Mitigation Strategies; A09 — Use structured outputs to constrain data flow (structure only, not sink sanitization)

Policy origin: recommended local release policy derived from cited principles

## AI020

**Abstain when evidence is insufficient**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: The model guesses facts with real-world consequences

Applicability: AI answering knowledge questions or proposing decisions; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Define acceptable use/refusal/abstention and escalation routes that can actually be opened or receive work; separate facts, assumptions, unknowns, and action status; do not present model self-confidence as calibrated probability without calibration evidence
2. Test empty retrieval, conflicting/stale evidence, citations that exist but do not support the claim, and estimates that might be read as facts; verify that sources are not fabricated and actions do not run automatically when stopping is required
3. Have the owner set acceptable task error according to harm before running, then have target users who did not build the system decide whether to trust, escalate, or stop through the UI and supported assistive paths; record unassisted/assisted results and test escalation end to end

Expected / acceptance: Users see uncertainty and know their real options; do not guess beyond the evidence or escalate to an unusable destination; scope failing comprehension tests must be remediated or limited

Evidence: abstention/conflict/stale/citation-negative fixtures; escalation delivery proof; predeclared task-error criteria; target-user unassisted/assisted decision record; versioned fixture manifest AI020 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Empty retrieval; Conflicting or stale evidence; Citation exists but does not support the claim; Estimate understood as fact; Escalation route fails; assistive path uncertainty

Remediation: Fix refusal/uncertainty copy and the escalation workflow; restrict use cases that still mislead people and retest

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A02 — GV-3.2-003; GV-3.2-004; MEASURE 2.6; MS-3.3-002; MS-3.3-005

Policy origin: recommended local release policy derived from cited principles

## AI021

**Monitor drift and interpretable feedback**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Results change after release without a reevaluation trigger

Applicability: AI used continuously; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Record distribution and error baselines by slice while minimizing PII
2. Simulate new languages, new data, and provider behavior changes
3. Test alerts to responsible owners and rerun evaluations before expanding use

Expected / acceptance: Reevaluation triggers have known recipients and response actions

Evidence: monitor config; alert exercise; versioned fixture manifest AI021 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Drift from a new language; Provider behavior changes; Rare-slice errors increase; Alert has no recipient; Feedback triggers reevaluation

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — MANAGE 3.2; MANAGE 4.1

Policy origin: recommended local release policy derived from cited principles

## AI022

**Rehearse rollback of models, prompts, and indexes together**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Rolling back the model still leaves a new context or schema that causes failure

Applicability: AI with release changes; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Retain compatible, evaluated version sets
2. Simulate a regression and switch traffic back to the previous set
3. Inspect pending work, caches, and tool schemas after rollback

Expected / acceptance: Restore a passing version set or stop risky capabilities

Evidence: rollback trace; compatibility manifest; versioned fixture manifest AI022 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: New model incompatible with old prompt; Index rolled back but cache is new; Pending work uses old tool schema; Traffic switches during a run

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A01 — MANAGE 2.4; MANAGE 4.1

Policy origin: recommended local release policy derived from cited principles

## AI023

**Ensure fallback does not bypass guardrails**

Requirement: BLOCKER · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: A provider outage sends work through a more privileged path

Applicability: AI with fallbacks; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Identify fallbacks and their reduced-capability boundaries
2. Simulate timeouts, guardrail errors, quota exhaustion, and model unavailability
3. Verify approvals, authorization, and PII handling in fallbacks against accepted boundaries

Expected / acceptance: Fallback reports its status and gains no privileges

Evidence: fault injection; fallback contract; versioned fixture manifest AI023 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: provider timeout; guardrail execution error; quota exhausted; Fallback has broader privileges; Fallback uses an incorrect PII policy

Remediation: Disable failing paths, fix the policy enforcement point, and rerun the original and adjacent cases before release

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A02 — MS-2.6-005

Policy origin: recommended local release policy derived from cited principles

## AI024

**Bind answers to retrievable provenance**

Requirement: RISK · Severity: High · Owner: AI system owner · Reviewer: Evaluator independent of the builder and risk owner

Purpose / risk: Citations are fabricated or old documents are cited as current

Applicability: AI generating content for people; record applicability for every release; N/A requires a rationale and reviewer

### Procedure

1. Retain disclosable source IDs, versions, and retrieval times as local provenance policy; distinguish citation existence/support/user access from unknown training-data provenance
2. Verify claims against actual sources, including citations that exist but do not support the claim, conflicting evidence, and stale evidence; have target users who did not build the system interpret meaning without leading prompts under task-error criteria set before running
3. Withdraw sources/authorization before retrieval, after retrieval but before provider send, and before cached-answer replay; capture context, provider payloads, traces/exports, and answers; do not let fallback expose titles, snippets, or URLs of unauthorized sources
4. Test evidence access and escalation through keyboard/screen-reader interfaces; separate unassisted/assisted results and report denied/unavailable according to a policy that does not create a side channel

Expected / acceptance: Citations support claims and are accessible according to authorization; provenance/uncertainty is understood, and no intermediate egress after revocation violates the freshness contract

Evidence: claim/source support audit; access/revocation interleaving capture; provenance version record; target-user task/accessibility results; versioned fixture manifest AI024 with input/expected/observed/operation IDs and not-run status if not yet tested

Scenarios: Fabricated citation; Real citation does not support the claim; Stale or conflicting source; Source revoked after retrieval; Unauthorized cached title/snippet; Screen reader opens evidence

Remediation: Remove unsupported or unauthorized citations, recheck before egress and cache access; fix copy/escalation paths and repeat user testing

Threshold / policy notes: Operational requirements proposed in this work, not mandatory wording from the cited sources; numeric criteria must be set before testing according to harm and context. Do not use universal accuracy/cost/SLA values; BLOCKER cannot be waived; RISK may be waived by the risk owner with an expiry date and compensating measures; the specified fixtures and UX tests are acceptance work to perform on the real system. This research has not produced passing results for them

Sources: A02 — MS-2.5-003; MS-2.5-005 (training/TEVV provenance and grounded RAG only); MS-3.3-002; MS-3.3-005; A06 — Prevention and Mitigation Strategies 1

Policy origin: recommended local release policy derived from cited principles
