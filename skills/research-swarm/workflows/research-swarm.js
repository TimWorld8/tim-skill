export const meta = {
  name: "research-swarm",
  description:
    "Multi-lens research swarm with Next questions schema, then hypothesis → test → revise loop",
  whenToUse:
    "A research question that needs several independent angles, mechanism-level understanding, and hypotheses that get tested rather than asserted. Narrow single-fact questions belong to the researcher subagent instead.",
  phases: [
    { title: "Fan-out", detail: "independent lenses search in parallel" },
    { title: "Synthesis", detail: "one picture, gaps, falsifiable hypotheses" },
    {
      title: "Test",
      detail: "code experiment or adversarial refutation per hypothesis",
    },
    {
      title: "Next questions",
      detail: "what the decision-maker should ask next, and what deserves another layer",
    },
  ],
};

// ---------------------------------------------------------------- input

// The harness may hand `args` over as a JSON string rather than an object
// (measured 2026-08-05: typeof args === "string"). Normalise before reading it —
// without this every field below is undefined and the run dies on the next line.
let input = args;
if (typeof input === "string") {
  try {
    input = JSON.parse(input);
  } catch (e) {
    throw new Error(
      `args arrived as a string that is not JSON: ${input.slice(0, 120)}`,
    );
  }
}
if (!input || typeof input !== "object")
  throw new Error("args must be an object or a JSON string");

const question = input.question || "";
if (!question) throw new Error("args.question is required");

const contextText = input.contextText || "";
const closed = input.closed || []; // routes already measured and closed
const barred = input.barred || []; // routes forbidden by project rule
const known = input.known || []; // numbers/state already established
const width = input.width === 5 ? 5 : 7;
const maxRounds = input.maxRounds || 3;
const ROUND_COST = 120000; // rough output-token cost of one extra hypothesis round

// Cascade: which layer of the drill-down this run is, and what the layers above found.
// Layer 1 usually challenges the architecture; each next layer digs into what the
// previous layer's Next questions phase judged most worth another round.
const layer = input.layer || 1;
const priorLayers = input.priorLayers || []; // [{layer, question, verdictSummary, openQuestions}]

// Agent ceiling for the whole run. Fan-out + synthesis + tests + one Next questions agent must fit.
const CEILING = input.ceiling || 14;

// ---------------------------------------------------------------- schemas

const FINDINGS = {
  type: "object",
  additionalProperties: false,
  required: ["findings", "lens_summary"],
  properties: {
    lens_summary: {
      type: "string",
      description: "What this lens found overall, 2-3 sentences",
    },
    findings: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "claim",
          "source_url",
          "source_type",
          "confidence",
          "why_mechanism",
          "recency_check",
          "anomaly",
          "what_would_disprove",
        ],
        properties: {
          claim: { type: "string", description: "The finding in one sentence" },
          source_url: { type: "string" },
          source_type: {
            type: "string",
            enum: ["primary", "secondary"],
            description:
              "primary = paper, spec, source code, first-party doc. secondary = anything about those.",
          },
          confidence: {
            type: "string",
            enum: ["confirmed", "likely", "speculative"],
          },
          why_mechanism: {
            type: "string",
            description:
              "WHY this works or fails — the mechanism, not a restatement of the claim",
          },
          recency_check: {
            type: "object",
            additionalProperties: false,
            required: ["source_date", "stale", "successor"],
            properties: {
              source_date: {
                type: "string",
                description: "YYYY or YYYY-MM of the source",
              },
              stale: {
                type: "boolean",
                description: "true if older than ~18 months or superseded",
              },
              successor: {
                type: "string",
                description: 'Name of what replaced it, or "none found"',
              },
            },
          },
          anomaly: {
            type: "string",
            description:
              'What did not fit expectation, or contradicts another source. "none" is only acceptable after a second look.',
          },
          what_would_disprove: {
            type: "string",
            description: "Concrete evidence that would falsify this claim",
          },
          revives_closed_route: {
            type: "string",
            description:
              'Required ONLY if this claim proposes something on the CLOSED list: the new evidence that overturns the project\'s prior measurement, with its source. Otherwise the exact string "n/a".',
          },
        },
      },
    },
  },
};

const SYNTHESIS = {
  type: "object",
  additionalProperties: false,
  required: ["picture", "conflicts", "gaps", "hypotheses"],
  properties: {
    picture: {
      type: "string",
      description: "The combined answer so far, 200-400 words",
    },
    conflicts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["topic", "side_a", "side_b", "resolution"],
        properties: {
          topic: { type: "string" },
          side_a: { type: "string" },
          side_b: { type: "string" },
          resolution: {
            type: "string",
            description: 'Which holds and why, or "unresolved"',
          },
        },
      },
    },
    gaps: { type: "array", items: { type: "string" } },
    hypotheses: {
      type: "array",
      minItems: 1,
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "statement",
          "pass_criterion",
          "fail_criterion",
          "testable_in_code",
          "test_plan",
        ],
        properties: {
          statement: {
            type: "string",
            description: "A falsifiable claim about what would work here",
          },
          pass_criterion: {
            type: "string",
            description: "Written BEFORE any test runs",
          },
          fail_criterion: {
            type: "string",
            description: "What result would kill this hypothesis",
          },
          testable_in_code: {
            type: "boolean",
            description:
              "true only if a small script with no external data could actually measure it",
          },
          test_plan: { type: "string" },
        },
      },
    },
  },
};

const VERDICT = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "evidence", "broke_where", "revision"],
  properties: {
    verdict: { type: "string", enum: ["pass", "fail", "undetermined"] },
    evidence: {
      type: "string",
      description: "The actual result, numbers where they exist",
    },
    broke_where: {
      type: "string",
      description:
        'On fail: assumption / scope / measurement — which one broke, and how. Else "n/a".',
    },
    revision: {
      type: "string",
      description:
        'On fail: the revised hypothesis worth testing next. Else "n/a".',
    },
  },
};

const NEXT_QUESTIONS = {
  type: "object",
  additionalProperties: false,
  required: ["reading", "questions", "recommended_next"],
  properties: {
    reading: {
      type: "string",
      description:
        "Read this run in 3-5 English sentences: what is supported, what remains uncertain, and why.",
    },
    questions: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "question",
          "why_this_matters",
          "triggered_by",
          "depth",
          "worth_a_round",
        ],
        properties: {
          question: {
            type: "string",
            description:
              "English, one sentence, specific enough to point a swarm at",
          },
          why_this_matters: {
            type: "string",
            description:
              "Which decision changes depending on the answer. If nothing changes, do not include the question at all.",
          },
          triggered_by: {
            type: "string",
            description:
              "The exact finding, number, conflict or anomaly in THIS run that provoked it",
          },
          depth: {
            type: "string",
            enum: ["same-layer", "deeper", "higher"],
            description:
              "same-layer = a gap in this run · deeper = the mechanism under a finding · higher = challenges the architecture itself",
          },
          worth_a_round: {
            type: "boolean",
            description:
              "true = deserves its own swarm run. false = answerable by reading a local file or a single search.",
          },
        },
      },
    },
    recommended_next: {
      type: "object",
      additionalProperties: false,
      required: ["question", "reason", "width"],
      properties: {
        question: {
          type: "string",
          description:
            'The single question the next layer should run, or "stop" if another layer would not change any decision',
        },
        reason: { type: "string" },
        width: {
          type: "integer",
          description: "5 for a narrow follow-up, 7 for a broad one",
        },
      },
    },
  },
};

// ---------------------------------------------------------------- lenses

const LENSES = [
  {
    key: "landscape",
    brief:
      "Map the current state of the art. What is the field actually doing for this problem right now, and which approaches are considered live versus legacy?",
  },
  {
    key: "primary-source",
    brief:
      "Primary sources ONLY — papers, specs, source code, first-party documentation. No blog posts, no secondary write-ups, no summaries of papers. Follow every claim back to the artifact that owns it.",
  },
  {
    key: "recency",
    brief:
      "Audit currency. For each significant approach: when was it published, has it been deprecated or superseded, and by what? Anything resting on a source older than ~18 months must be flagged stale with its successor named.",
  },
  {
    key: "causal",
    brief:
      "Explain WHY, not WHAT. For each approach that works, what is the mechanism that makes it work, and under which conditions does that mechanism stop holding? Reject any claim you cannot explain the mechanism of.",
  },
  {
    key: "contrarian",
    brief:
      "Try to REFUTE the promising approaches. Hunt for counter-evidence, documented limitations, failure cases, retracted or unreproduced results, and papers that report the opposite. Your job is not to be fair — it is to find what would kill each idea.",
  },
  {
    key: "practitioner",
    brief:
      "What breaks in practice. GitHub issues, forum threads, postmortems, engineering blogs from teams that shipped this. Gaps between the paper number and the deployed number.",
  },
  {
    key: "adjacent",
    brief:
      "Look outside the obvious field. Which neighbouring domain solves the same SHAPE of problem, and what does it use that this field has not borrowed?",
  },
];

// ---------------------------------------------------------------- prompt builders

function constraintBlock() {
  if (!closed.length && !barred.length && !known.length && !contextText)
    return "";
  const parts = ["\n\n=== PROJECT CONSTRAINTS — read before searching ==="];
  if (known.length) {
    // Layer 1 is the architecture check: the current approach is evidence about
    // where the project stands, NOT a floor the answer has to beat. Anchoring on it
    // is exactly how a swarm ends up polishing the wrong road.
    parts.push(
      layer === 1
        ? "\nWHAT THE PROJECT CURRENTLY DOES — this is the thing under examination, not a baseline to beat. If the evidence says this whole approach is the wrong shape, say so plainly; that is a valid and valuable answer here:"
        : "\nALREADY ESTABLISHED (do not re-derive, treat as the current state):",
    );
    known.forEach((k) => parts.push(`  - ${k}`));
  }
  if (closed.length) {
    parts.push(
      "\nCLOSED ROUTES — already measured on this project and ruled out. Proposing any of these again is a FAILED answer:",
    );
    closed.forEach((c) => parts.push(`  - ${c}`));
  }
  if (barred.length) {
    parts.push(
      "\nBARRED BY PROJECT RULE — cannot be used no matter how well it performs elsewhere:",
    );
    barred.forEach((b) => parts.push(`  - ${b}`));
  }
  if (priorLayers.length) {
    parts.push(
      `\nWHAT THE LAYERS ABOVE THIS ONE ALREADY ESTABLISHED (this is layer ${layer} of a drill-down — do not repeat their work, build under it):`,
    );
    priorLayers.forEach((p) =>
      parts.push(
        `  - layer ${p.layer} asked: ${p.question}\n    → ${p.verdictSummary}${p.openQuestions ? `\n    still open: ${p.openQuestions}` : ""}`,
      ),
    );
  }
  if (contextText) {
    parts.push(`\nCONTEXT DOCUMENT:\n${contextText}`);
  }
  parts.push("\n=== end constraints ===");
  return parts.join("\n");
}

const CONSTRAINTS = constraintBlock();

function lensPrompt(lens) {
  return `You are the "${lens.key}" lens of a research swarm. Six other agents are searching the same question from different angles — do not try to cover theirs, go deep on yours.

QUESTION: ${question}

YOUR MANDATE: ${lens.brief}
${CONSTRAINTS}

METHOD
- Use WebSearch to find candidates, then WebFetch the promising ones. A search snippet is never sufficient for a load-bearing claim.
- Every finding needs a real URL you actually fetched. Do not cite from memory — if you did not open it in this task, do not claim it.
- For each finding, fill every schema field honestly:
  * why_mechanism must explain the MECHANISM. "It performs better" is not a mechanism. "Sigmoid loss decouples pairs so the batch does not normalise scores against each other" is.
  * recency_check must carry a real date from the source, not a guess.
  * anomaly: something that did not fit — a number that disagrees with another source, a claim nobody reproduced, a benchmark measured on a different protocol than it is quoted for. Research always disagrees with itself somewhere. Look until you find it.
  * what_would_disprove must be concrete and checkable.
- Prefer 3-6 strong findings over 8 shallow ones.

Return the structured object. Your text output IS the return value — no preamble, no sign-off.`;
}

// ---------------------------------------------------------------- phase 1: fan-out

phase("Fan-out");
log(`Question: ${question}`);
log(
  `Dispatching ${width} lenses in parallel${closed.length ? ` · CLOSED ${closed.length} routes` : ""}${barred.length ? ` · BARRED ${barred.length} items` : ""}`,
);

const lenses =
  width === 5
    ? LENSES.filter((l) => l.key !== "adjacent" && l.key !== "practitioner")
    : LENSES;

const raw = await parallel(
  lenses.map(
    (lens) => () =>
      agent(lensPrompt(lens), {
        label: `lens:${lens.key}`,
        phase: "Fan-out",
        schema: FINDINGS,
      }),
  ),
);

const lensResults = [];
lenses.forEach((lens, i) => {
  if (raw[i]) lensResults.push({ lens: lens.key, ...raw[i] });
});

if (!lensResults.length)
  throw new Error("every lens failed — nothing to synthesise");
if (lensResults.length < lenses.length) {
  log(
    `⚠ ${lenses.length - lensResults.length} lenses failed; synthesizing from ${lensResults.length} surviving lenses`,
  );
}

// ---------------------------------------------------------------- phase 2: cross-exam (script, no agent)

const allFindings = [];
lensResults.forEach((r) => {
  (r.findings || []).forEach((f) => allFindings.push({ ...f, lens: r.lens }));
});

// Kalāma downgrade: a "confirmed" claim resting on a secondary source is not confirmed.
let downgraded = 0;
allFindings.forEach((f) => {
  if (f.confidence === "confirmed" && f.source_type === "secondary") {
    f.confidence = "likely";
    f.downgrade_reason = "confirmed claim on a secondary source";
    downgraded++;
  }
});

// Sati: anything stale gets surfaced, never silently folded into the picture.
const stale = allFindings.filter(
  (f) => f.recency_check && f.recency_check.stale,
);

// Pahāna: a claim that re-proposes a CLOSED route without new evidence is dropped, not
// quietly kept. One that brings evidence overturning the measurement is kept and flagged.
const revived = [];
const rejected = [];
function proposesClosed(f) {
  if (!closed.length) return null;
  const hay = `${f.claim} ${f.why_mechanism}`.toLowerCase();
  return (
    closed.find((c) => {
      const keys = String(c)
        .toLowerCase()
        .replace(/[^a-z0-9ก-๙ ]/g, " ")
        .split(" ")
        .filter((w) => w.length > 4);
      if (keys.length < 2) return false;
      const hits = keys.filter((k) => hay.includes(k)).length;
      return hits >= Math.min(3, Math.ceil(keys.length * 0.4));
    }) || null
  );
}
for (let i = allFindings.length - 1; i >= 0; i--) {
  const f = allFindings[i];
  const hit = proposesClosed(f);
  if (!hit) continue;
  const claimsRevival =
    f.revives_closed_route &&
    f.revives_closed_route.trim().toLowerCase() !== "n/a" &&
    f.revives_closed_route.length > 20;
  if (claimsRevival) {
    revived.push({
      lens: f.lens,
      claim: f.claim,
      closed_route: hit,
      evidence: f.revives_closed_route,
    });
    f.reopens = hit;
  } else {
    rejected.push({ lens: f.lens, claim: f.claim, closed_route: hit });
    allFindings.splice(i, 1);
  }
}
if (rejected.length)
  log(
    `⛔ Dropped ${rejected.length} claims reopening closed routes without new evidence`,
  );
if (revived.length)
  log(
    `🔓 ${revived.length} claims offer evidence overturning prior measurements; synthesis must assess it`,
  );

// Next questions: collect every anomaly the lenses actually reported.
const anomalies = allFindings
  .filter((f) => f.anomaly && f.anomaly.trim().toLowerCase() !== "none")
  .map((f) => ({ lens: f.lens, claim: f.claim, anomaly: f.anomaly }));

// Cheap textual dedup — same claim seen by two lenses is corroboration, not two facts.
function normalise(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙ ]/g, "")
    .split(" ")
    .filter((w) => w.length > 3)
    .sort()
    .join(" ");
}
const seen = new Map();
allFindings.forEach((f) => {
  const k = normalise(f.claim).slice(0, 90);
  if (seen.has(k)) seen.get(k).corroborated_by.push(f.lens);
  else seen.set(k, { ...f, corroborated_by: [f.lens] });
});
const deduped = Array.from(seen.values());
const corroborated = deduped.filter((f) => f.corroborated_by.length > 1);

log(
  `Collected: ${allFindings.length} claim → ${deduped.length} after deduplication · ${corroborated.length} cross-lens matches · ${anomalies.length} Next questions · ${stale.length} stale or superseded · ${downgraded} confidence downgrades`,
);

const noAnomalyLenses = lensResults
  .filter((r) =>
    (r.findings || []).every(
      (f) => !f.anomaly || f.anomaly.trim().toLowerCase() === "none",
    ),
  )
  .map((r) => r.lens);
if (noAnomalyLenses.length)
  log(`⚠ Lenses reporting no anomalies: ${noAnomalyLenses.join(", ")}`);

// ---------------------------------------------------------------- phase 3+4: synthesis and hypotheses

phase("Synthesis");

function synthesisPrompt(prior) {
  return `You are the synthesiser of a research swarm. ${lensResults.length} independent lenses searched this question and returned structured findings. Your job: one coherent picture, the conflicts named honestly, the gaps stated, and hypotheses that can actually be killed.

QUESTION: ${question}
${CONSTRAINTS}

FINDINGS (deduplicated; corroborated_by lists which lenses saw the same thing):
${JSON.stringify(deduped, null, 1)}

ANOMALIES THE LENSES FLAGGED:
${JSON.stringify(anomalies, null, 1)}

STALE / SUPERSEDED:
${JSON.stringify(
  stale.map((f) => ({
    claim: f.claim,
    date: f.recency_check.source_date,
    successor: f.recency_check.successor,
  })),
  null,
  1,
)}

CLAIMS THAT RE-OPEN A CLOSED ROUTE (a lens says new evidence overturns the project's own prior measurement — judge each one, do not accept on the lens's word):
${JSON.stringify(revived, null, 1)}

DROPPED BEFORE YOU SAW THEM (${rejected.length} claims re-proposed a closed route with no new evidence): ${JSON.stringify(rejected.map((r) => r.claim))}
${prior}

RULES
- Where two lenses disagree, report the disagreement as a conflict with a resolution — never quietly pick one side.
- A claim resting on one secondary source is not the same as one corroborated across lenses from primary sources. Say which is which.
- Hypotheses: at most 3, each falsifiable. Write the pass AND fail criterion BEFORE any test exists. If you cannot state what result would kill it, it is an opinion — drop it and pick something else.
- Set testable_in_code=true ONLY if a small self-contained script, with no data this project does not have, could measure it. Market claims, adoption trends and "which is best in practice" are never testable_in_code.
- Every hypothesis must respect the CLOSED and BARRED lists above. A hypothesis that re-proposes a closed route is a failed hypothesis.

Return the structured object.`;
}

let synth = await agent(synthesisPrompt(""), {
  label: "synthesise",
  phase: "Synthesis",
  schema: SYNTHESIS,
});
if (!synth) throw new Error("synthesis failed");

log(
  `Hypotheses ${synth.hypotheses.length} · conflict ${synth.conflicts.length} · gap ${synth.gaps.length}`,
);

// ---------------------------------------------------------------- phase 5+6: test and revise

phase("Test");

function refutePrompt(h, angle) {
  return `Try to REFUTE this hypothesis. You are not evaluating it fairly — you are trying to kill it. Default to refuted=true when the evidence is thin.

HYPOTHESIS: ${h.statement}
PASS CRITERION (set before any test): ${h.pass_criterion}
FAIL CRITERION: ${h.fail_criterion}
ANGLE YOU MUST ATTACK FROM: ${angle}
${CONSTRAINTS}

METHOD: WebSearch + WebFetch for counter-evidence — contradicting results, failed reproductions, conditions where the mechanism does not hold, papers reporting the opposite. Cite real URLs you actually fetched.

Verdict rules:
- "fail" = you found evidence that meets the fail criterion.
- "pass" = you genuinely tried and could not refute it, AND found positive evidence meeting the pass criterion.
- "undetermined" = the evidence does not exist either way. Use this honestly rather than guessing.

On fail, broke_where must name which part broke: the assumption, the scope, or the measurement.

Return the structured object.`;
}

function experimentPrompt(h) {
  return `Run a real experiment to test this hypothesis. Write code, execute it, report what actually happened.

HYPOTHESIS: ${h.statement}
PASS CRITERION (set before the test): ${h.pass_criterion}
FAIL CRITERION: ${h.fail_criterion}
TEST PLAN: ${h.test_plan}
${CONSTRAINTS}

RULES
- Work only inside a scratch directory. Never write into the user's project directories, and never modify anything under an existing repo.
- No paid API calls, no large model downloads, no GPU assumptions. If the test genuinely needs any of those, return verdict "undetermined" and say so — do not fake it.
- Report the ACTUAL numbers your run produced. A number you did not measure is a fabrication.
- If the code fails to run, that is evidence too: report what broke and why.

Return the structured object.`;
}

const REFUTE_ANGLES = [
  "mechanism — does the causal story actually hold?",
  "evidence quality — is the supporting work reproduced, or a single unreplicated result?",
];

async function testOne(h) {
  if (h.testable_in_code) {
    const v = await agent(experimentPrompt(h), {
      label: `experiment:${h.statement.slice(0, 32)}`,
      phase: "Test",
      schema: VERDICT,
    });
    return { hypothesis: h, mode: "experiment", verdicts: v ? [v] : [] };
  }
  const votes = await parallel(
    REFUTE_ANGLES.map(
      (angle) => () =>
        agent(refutePrompt(h, angle), {
          label: `refute:${h.statement.slice(0, 26)}`,
          phase: "Test",
          schema: VERDICT,
        }),
    ),
  );
  return { hypothesis: h, mode: "refutation", verdicts: votes.filter(Boolean) };
}

function settle(r) {
  const vs = r.verdicts;
  if (!vs.length)
    return {
      ...r,
      verdict: "undetermined",
      reason: "test agents returned nothing",
    };
  if (r.mode === "experiment")
    return {
      ...r,
      verdict: vs[0].verdict,
      reason: vs[0].evidence,
      detail: vs[0],
    };
  // refutation: a single "fail" kills it — one real refutation is enough
  const failed = vs.find((v) => v.verdict === "fail");
  if (failed)
    return { ...r, verdict: "fail", reason: failed.evidence, detail: failed };
  const allPass = vs.length === REFUTE_ANGLES.length && vs.every((v) => v.verdict === "pass");
  return {
    ...r,
    verdict: allPass ? "pass" : "undetermined",
    reason: vs.map((v) => v.evidence).join(" | "),
    detail: vs[0],
  };
}

const tested = [];
let round = 1;
let hypotheses = synth.hypotheses;

// Agent budget: lenses + synthesis are already spent, one seat is reserved for the
// Next questions phase. A code hypothesis costs 1 agent, a desk hypothesis costs 2 (two refuters).
// Whatever does not fit is reported as untested — never silently dropped.
let agentsSpent = lenses.length + 1;
function fitToBudget(hs) {
  const room = CEILING - agentsSpent - 1; // -1 reserves the Next questions agent
  const kept = [];
  const dropped = [];
  let cost = 0;
  hs.forEach((h) => {
    const c = h.testable_in_code ? 1 : 2;
    if (cost + c <= room) {
      kept.push(h);
      cost += c;
    } else {
      dropped.push(h);
    }
  });
  agentsSpent += cost;
  return { kept, dropped };
}

while (round <= maxRounds) {
  const fit = fitToBudget(hypotheses);
  if (fit.dropped.length) {
    log(
      `⚠ Agent ceiling (${CEILING}): testing ${fit.kept.length} of ${hypotheses.length} hypotheses; ${fit.dropped.length} explicitly reported as untested`,
    );
    fit.dropped.forEach((h) =>
      tested.push({
        hypothesis: h,
        verdict: "untested",
        reason: `agent ceiling ${CEILING} reached before this hypothesis`,
        round,
        verdicts: [],
      }),
    );
  }
  hypotheses = fit.kept;
  if (!hypotheses.length) {
    log("No agent capacity for hypothesis tests; moving to next questions");
    break;
  }

  log(
    `Round ${round}: testing ${hypotheses.length} hypotheses (${hypotheses.filter((h) => h.testable_in_code).length} code experiments)`,
  );

  const results = (await parallel(hypotheses.map((h) => () => testOne(h))))
    .filter(Boolean)
    .map(settle);
  results.forEach((r) => tested.push({ ...r, round }));

  results.forEach((r) => {
    const mark =
      r.verdict === "pass" ? "✅" : r.verdict === "fail" ? "❌" : "⬜";
    log(
      `  ${mark} ${r.verdict.toUpperCase()} — ${r.hypothesis.statement.slice(0, 90)}`,
    );
  });

  const failures = results.filter(
    (r) =>
      r.verdict === "fail" &&
      r.detail &&
      r.detail.revision &&
      r.detail.revision !== "n/a",
  );
  if (!failures.length) {
    log("No failed hypotheses with revisions; ending loop");
    break;
  }
  if (round >= maxRounds) {
    log(`Completed ${maxRounds} rounds; stopping at the configured limit`);
    break;
  }
  if (!budget.total || budget.remaining() < ROUND_COST) {
    log(
      `⚠ Insufficient budget for round ${round + 1}; stopping at round ${round}. ${failures.length} revised hypotheses remain untested and will be reported as open questions`,
    );
    failures.forEach((f) =>
      tested.push({
        hypothesis: { statement: f.detail.revision },
        verdict: "untested",
        reason: "budget exhausted before this round",
        round: round + 1,
        verdicts: [],
      }),
    );
    break;
  }

  // Anatta: two failures breaking on the same thing means the synthesis is suspect, not the hypotheses.
  const brokeOn = failures.map((f) =>
    (f.detail.broke_where || "").toLowerCase(),
  );
  const sameBreak =
    brokeOn.length > 1 && brokeOn.every((b) => b === brokeOn[0]);
  if (sameBreak) {
    log(
      `⚠ Shared assumption: ${failures.length} hypotheses failed at ${brokeOn[0]}; reconsidering synthesis`,
    );
    if (agentsSpent + 2 > CEILING) {
      log("Agent ceiling leaves no slot for re-synthesis and next questions");
      failures.forEach((f) => tested.push({hypothesis: {statement: f.detail.revision}, verdict: "untested", reason: "agent ceiling before re-synthesis", round: round + 1, verdicts: []}));
      break;
    }
    agentsSpent++;
    const re = await agent(
      synthesisPrompt(
        `\nPREVIOUS ROUND FAILED. ${failures.length} hypotheses all broke at the same point: "${failures[0].detail.broke_where}". Evidence: ${failures.map((f) => f.reason).join(" | ")}\n\nThe shared assumption underneath them is suspect. Do NOT patch those hypotheses — re-read the findings and build a different shape from the evidence.`,
      ),
      {
        label: `re-synthesise:r${round + 1}`,
        phase: "Synthesis",
        schema: SYNTHESIS,
      },
    );
    if (!re) break;
    synth = re;
    hypotheses = re.hypotheses;
  } else {
    hypotheses = failures.map((f) => ({
      statement: f.detail.revision,
      pass_criterion: f.hypothesis.pass_criterion,
      fail_criterion: f.hypothesis.fail_criterion,
      testable_in_code: f.hypothesis.testable_in_code,
      test_plan: f.hypothesis.test_plan,
    }));
  }
  round++;
}

// ---------------------------------------------------------------- phase 7: Next questions

phase("Next questions");

const passed = tested.filter((t) => t.verdict === "pass");
const failed = tested.filter((t) => t.verdict === "fail");

log(
  `Results: pass ${passed.length} · fail ${failed.length} · undetermined or untested ${tested.length - passed.length - failed.length}`,
);

const persona = input.persona || "";

const ehPrompt = `Read this research as an evidence-focused decision-maker. Identify the next questions that could change the decision.

${
  persona ||
  `Evidence-checking disciplines:
- Never accept a bare percentage — ask how many were won AND lost.
- A number without its ruler and its caveat is not a number. Numbers measured under different protocols do not compare.
- A constant tuned on the evaluation set needs a hold-out before it means anything.
- Never trust a figure measured on the easy sample; ask whether the sample is representative.
- An anomaly is a clue, not noise — the thing that does not fit is where to look.
- Triangulate: one source is not confirmation.
- A route already measured and closed stays closed unless the new evidence overturns the measurement itself.
- Ask whether the approach is the right SHAPE, not only whether it can be tuned further.`
}

THE QUESTION THIS LAYER ASKED (layer ${layer}): ${question}

THE PICTURE:
${synth.picture}

CONFLICTS: ${JSON.stringify(synth.conflicts, null, 1)}
GAPS: ${JSON.stringify(synth.gaps, null, 1)}
ANOMALIES: ${JSON.stringify(anomalies.slice(0, 12), null, 1)}
STALE: ${JSON.stringify(
  stale.map((f) => f.claim),
  null,
  1,
)}
${revived.length ? `CLAIMS THAT TRIED TO REOPEN A CLOSED ROUTE: ${JSON.stringify(revived, null, 1)}` : ""}

HYPOTHESES AND WHAT HAPPENED:
${JSON.stringify(
  tested.map((t) => ({
    statement: t.hypothesis.statement,
    verdict: t.verdict,
    criterion: t.hypothesis.pass_criterion || "n/a",
    evidence: t.reason,
    broke_where: t.detail ? t.detail.broke_where : "n/a",
  })),
  null,
  1,
)}
${CONSTRAINTS}

RULES FOR YOUR QUESTIONS
- Every question must be provoked by something concrete IN THIS RUN — name it in triggered_by. A question you could have asked before the run started is worthless here.
- Drop any question whose answer would not change a decision.
- Do not ask what a local file already answers, and do not ask about routes the constraints above mark as closed or barred.
- Rank so that a question able to OVERTURN the current direction comes before one that would merely refine it.
- recommended_next: pick the ONE question worth spending another swarm on, or return "stop" if another layer would not change any decision. Say honestly which it is.

Write the questions in English. Return the structured object.`;

const eh = await agent(ehPrompt, {
  label: "Next questions:next-questions",
  phase: "Next questions",
  schema: NEXT_QUESTIONS,
});

if (eh) {
  log(`Next questions: ${eh.questions.length} follow-up questions`);
  eh.questions
    .filter((q) => q.worth_a_round)
    .forEach((q) => log(`  [${q.depth}] ${q.question.slice(0, 100)}`));
  log(
    eh.recommended_next.question === "stop"
      ? "  → Recommendation: stop; no further layer needed"
      : `  → Next layer should ask: ${eh.recommended_next.question.slice(0, 110)}`,
  );
} else {
  log("⚠ Next-question phase failed; no follow-up questions available");
}

return {
  question,
  picture: synth.picture,
  conflicts: synth.conflicts,
  gaps: synth.gaps,
  anomalies,
  stale: stale.map((f) => ({
    claim: f.claim,
    date: f.recency_check.source_date,
    successor: f.recency_check.successor,
  })),
  corroborated: corroborated.map((f) => ({
    claim: f.claim,
    lenses: f.corroborated_by,
    url: f.source_url,
  })),
  findings: deduped,
  hypotheses_tested: tested.map((t) => ({
    statement: t.hypothesis.statement,
    verdict: t.verdict,
    round: t.round,
    mode: t.mode || "n/a",
    pass_criterion: t.hypothesis.pass_criterion || "n/a",
    evidence: t.reason,
    broke_where: t.detail ? t.detail.broke_where : "n/a",
    revision: t.detail ? t.detail.revision : "n/a",
  })),
  reopened_closed_routes: revived,
  rejected_closed_routes: rejected,
  layer,
  eh_reading: eh ? eh.reading : "",
  next_questions: eh ? eh.questions : [],
  recommended_next: eh ? eh.recommended_next : null,
  stats: {
    lenses_run: lensResults.length,
    lenses_requested: lenses.length,
    claims_raw: allFindings.length,
    claims_deduped: deduped.length,
    downgraded_to_likely: downgraded,
    closed_route_claims_dropped: rejected.length,
    closed_route_claims_reopened: revived.length,
    rounds_run: round,
  },
};
