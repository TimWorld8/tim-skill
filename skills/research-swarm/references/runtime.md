# Workflow host contract

The JavaScript file is a host-evaluated asynchronous workflow body. Its `export const meta` block is metadata for the host; its final top-level `return` supplies the result. Do not execute it directly with Node.js.

The host must provide:

| Binding | Required behavior |
| --- | --- |
| `args` | Object or JSON string with the invocation fields documented in SKILL.md. |
| `agent(prompt, options)` | Asynchronously return schema-validated data or a falsey failure. Options carry `label`, `phase`, and JSON `schema`. Agents require browsing and, for experiments, isolated code execution. |
| `parallel(tasks)` | Run an array of async closures, preserving result order and returning falsey entries for failed tasks. |
| `phase(name)` | Record a workflow phase. |
| `log(message)` | Record progress without credentials or private context. |
| `budget.total` | Explicit authorized token budget, falsey if no expanded budget is approved. |
| `budget.remaining()` | Current remaining budget. |

The host is responsible for enforcing budgets, schema validation, concurrency limits, scratch isolation, network policy, and agent failure handling. Prompts are not a sandbox. The workflow does not install a host, provision tokens, or write research reports itself; SKILL.md describes report persistence.

The result includes `question`, `picture`, `conflicts`, `gaps`, `anomalies`, `stale`, `corroborated`, `findings`, `hypotheses_tested`, closed-route decisions, cascade state, `eh_reading`, `next_questions`, `recommended_next`, and `stats`. The legacy `eh_reading` identifier is preserved for compatibility; its content is English.

The English publication copy preserves source schemas and orchestration with two correctness repairs: attempted agents count against the ceiling even on failure, and a single surviving refuter cannot produce a pass when the other refuter failed. Re-synthesis also consumes a ceiling slot. Thai Unicode ranges in matching expressions remain to support Thai research input; they are code character classes, not non-English instructions.

Every dispatch reserves a ceiling slot immediately. A ceiling below the requested lens count plus synthesis fails before any dispatch. At the ceiling, the next-question phase may be skipped and is reported incomplete. All findings retain their source URLs; exact-text matches are candidate corroboration only. Failed hypothesis task slots remain indexed and undetermined. Progress logs contain counts and fixed status text rather than user-derived content.
