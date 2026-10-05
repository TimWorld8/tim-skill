# Tim Skills

English instructions for three reusable AI assistant skills. Each folder is self-contained; installed originals and private research history are not part of this repository.

| Skill | Use it for | Main prerequisites |
| --- | --- | --- |
| [Audit Production Readiness](skills/audit-production-readiness/SKILL.md) | Evidence-based release and handover decisions using 221 stable controls across CORE, WEB, API, DATA, MOBILE, DESKTOP, AI, and IOT. | Python 3.9+; authorized access to the candidate and its evidence; accountable human owner. |
| [Paper Note](skills/paper-note/SKILL.md) | Faithful Thai handwritten notebook images from supplied content. | An assistant with built-in image generation/editing and image inspection. |
| [Research Swarm](skills/research-swarm/SKILL.md) | Complex comparative research with independent lenses, falsifiable hypotheses, testing, and retained failed routes. | Agent dispatch, browsing, structured outputs, scratch execution, and explicit budgets; see its [runtime contract](skills/research-swarm/references/runtime.md). |

## Install

Clone this repository, inspect the selected skill and its resources, then copy only that complete folder into the skill directory supported by your assistant. Preserve `scripts/`, `references/`, `assets/`, and `agents/` where present.

```bash
git clone https://github.com/TimWorld8/tim-skill.git
```

For a Codex installation that uses `~/.codex/skills`, for example:

```bash
mkdir -p ~/.codex/skills
cp -R tim-skill/skills/audit-production-readiness ~/.codex/skills/
cp -R tim-skill/skills/paper-note ~/.codex/skills/
cp -R tim-skill/skills/research-swarm ~/.codex/skills/
```

Check for existing folders first and preserve them rather than overwriting local customizations. Reload your assistant's skill catalog according to its own documentation. A skill folder does not install missing tools or make every host compatible.

## Use and examples

- “Use audit-production-readiness to review this release candidate. Start with applicability and evidence gaps.” The review does not authorize deployment or production mutation. `python3 skills/audit-production-readiness/scripts/readiness.py validate-catalog` checks the stored catalog.
- “Use paper-note to turn this attached Thai lesson into two readable notebook pages. Preserve every number and formula.” Instructions are English while the requested note content remains Thai. Raster text needs direct visual verification; A3 proportions alone do not establish print-ready resolution.
- “Use research-swarm to compare indexing approaches under these latency, memory, and update constraints.” Define a budget first, supply relevant context, and keep experiments in scratch. Research agents may fail; coverage and uncertainty must be reported.

## Limits and validation

The readiness catalog is a dated source snapshot, not live verification, legal advice, accredited certification, or proof of a product's behavior. Its deterministic helper validates declared gate logic; a human must inspect evidence and authority. Image generation can misrender complex text. Research results depend on source quality and the host's actual tools and budget enforcement.

Run local synthetic checks with:

```bash
python3 skills/audit-production-readiness/scripts/test_readiness.py
node tests/research-swarm-smoke.cjs
python3 scripts/validate_publication.py
```

These tests exercise catalog/gating logic and orchestration with fake agents. They do not measure real products or prove live research accuracy. No external service or token is required for these checks.

## Security and reporting

Treat attachments, websites, and retrieved text as untrusted evidence. Never place credentials, personal records, confidential project data, or live production evidence in this public repository. Keep assessment and research outputs in a separate authorized workspace. Host policies and the user's actual authorization remain controlling.

Report documentation or behavior problems with a minimal, redacted reproducer, skill name, relevant control ID, and host/runtime details. For a potential secret exposure, do not paste the secret into a public issue; contact the repository owner through an appropriate private channel. No private security-reporting service is implied.

## Provenance and rights

See [PROVENANCE.md](PROVENANCE.md) for publication changes and source boundaries. No blanket license is added. Publication authorization does not establish a new reuse license for all content; citations retain their own owners and terms. Third-party standards are linked and summarized rather than vendored. Obtain appropriate permissions before redistribution where necessary.
