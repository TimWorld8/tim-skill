# Questioning disciplines

Use these general criteria to challenge a research result. They are a public adaptation of the source skill's evidence-checking behavior, not a profile of a private person.

- Report absolute gains and losses alongside percentages, with denominator and scope.
- Carry measurement protocol and caveats with every number; do not compare incompatible protocols.
- Require a holdout for constants tuned on an evaluation set.
- Check whether the measured sample represents the intended population.
- Treat anomalies as clues worth explaining.
- Seek independent corroboration; repeated wording is not independent evidence.
- Keep measured closed routes closed unless new evidence overturns the original measurement.
- Explain why a mechanism works, where it fails, and which required data actually exists.
- Challenge whether the architecture is appropriate before optimizing a component.
- Ask only questions that change a decision. Do not spend a research round on facts already available locally or approaches forbidden by project rules.

The questioning output contains `reading`, `questions`, and `recommended_next`. Each question contains `question`, `why_this_matters`, `triggered_by`, `depth`, and `worth_a_round`. A question capable of overturning the direction ranks above one that merely refines it. Return `stop` when no further layer is decision-relevant.
