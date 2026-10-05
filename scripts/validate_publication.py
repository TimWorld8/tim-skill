#!/usr/bin/env python3
"""Validate the publication tree; heuristic privacy checks are not a guarantee."""
from pathlib import Path
import ast
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ('audit-production-readiness', 'paper-note', 'research-swarm')
errors = []
files = []
for p in sorted(ROOT.rglob('*')):
    rel = p.relative_to(ROOT)
    if '.git' in rel.parts:
        continue
    if p.is_symlink():
        errors.append(f'Symlink: {rel}')
        continue
    if not p.is_file():
        continue
    files.append(rel.as_posix())
    if p.suffix not in {'.md', '.json', '.csv', '.svg', '.yaml', '.py', '.js', '.cjs'} and p.name != '.gitignore':
        errors.append(f'Unexpected file: {rel}')
        continue
    text = p.read_text(encoding='utf-8')
    # Split literals so this validator does not match its own pattern source.
    private = [r'/'+r'Users/[^\s]+', r'/'+r'home/[^\s]+', r'-----BEGIN '+r'(?:RSA |OPENSSH |EC )?PRIVATE KEY', r'gh' + r'[opusr]_[A-Za-z0-9]{20,}', r'AK' + r'IA[0-9A-Z]{16}', r'\b[A-Za-z0-9._%+-]+@(?:gmail|hotmail|outlook)\.com\b']
    for pattern in private:
        if re.search(pattern, text):
            errors.append(f'Possible private content: {rel}')
    for n, line in enumerate(text.splitlines(), 1):
        if any('\u0e00' <= c <= '\u0e7f' for c in line) and not (p.suffix == '.js' and '.replace(/[^a-z0-9' in line):
            errors.append(f'Non-English Thai text: {rel}:{n}')
    if p.suffix == '.json':
        json.loads(text)
    if p.suffix == '.py':
        ast.parse(text, filename=str(rel))
    if p.suffix == '.md':
        for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', text):
            if '://' in target or target.startswith('#'):
                continue
            dest = (p.parent / target.split('#')[0]).resolve()
            if not dest.is_file() or not dest.is_relative_to(ROOT):
                errors.append(f'Broken or escaping reference: {rel} -> {target}')
for name in SKILLS:
    p = ROOT / 'skills' / name / 'SKILL.md'
    text = p.read_text()
    front = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not front or f'name: {name}\n' not in front.group(1)+'\n' or not re.search(r'^description: .+', front.group(1), re.M):
        errors.append(f'Invalid skill frontmatter: {name}')
actual = sorted(p.name for p in (ROOT/'skills').iterdir() if p.is_dir())
if actual != sorted(SKILLS):
    errors.append(f'Unexpected skill directories: {actual}')
print(json.dumps({'files':len(files),'skills':actual,'errors':errors}, indent=2))
sys.exit(bool(errors))
