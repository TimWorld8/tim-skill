#!/usr/bin/env python3
"""Local catalog selection and declared-evidence release gate; no external actions."""
import argparse
import collections
import datetime as dt
import json
from pathlib import Path
import sys
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'references' / 'control-catalog.json'
MODULES = ('CORE', 'WEB', 'API', 'DATA', 'MOBILE', 'DESKTOP', 'AI', 'IOT')
METHODS = {'observed_test', 'code_inspection', 'reviewed_document', 'simulation'}
STATUSES = {'PASS', 'FAIL', 'UNKNOWN', 'N/A', 'WAIVED'}


def read_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def aware(value):
    if not nonempty(value):
        raise ValueError('A timezone-aware timestamp is required')
    value = dt.datetime.fromisoformat(value.replace('Z', '+00:00'))
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError('Naive timestamps are not allowed')
    return value


def catalog():
    data = read_json(CATALOG)
    controls = data['controls']
    ids = [c['id'] for c in controls]
    if len(controls) != 221 or len(set(ids)) != 221:
        raise ValueError('Catalog must contain exactly 221 unique controls')
    return data, {c['id']: c for c in controls}


def bound(obj, profile):
    return obj.get('release_id') == profile.get('release_id') and obj.get('fingerprint') == profile.get('fingerprint')


def reviewed(obj, now):
    if not nonempty(obj.get('reviewer')):
        return False
    try:
        return aware(obj.get('reviewed_at')) <= now
    except (ValueError, TypeError):
        return False


def evidence_errors(e, profile, now):
    problems = []
    if not bound(e, profile):
        problems.append('evidence is not bound to the candidate')
    if e.get('kind') not in METHODS:
        problems.append('invalid evidence kind')
    for field in ('id', 'locator', 'producer', 'tool_version', 'scope', 'result'):
        if not nonempty(e.get(field)):
            problems.append('missing evidence ' + field)
    if e.get('verified') is not True:
        problems.append('evidence has not been accessed and reviewed')
    if not reviewed(e, now):
        problems.append('missing or invalid evidence reviewer/time')
    try:
        observed = aware(e.get('observed_at'))
        if reviewed(e, now) and aware(e.get('reviewed_at')) < observed:
            problems.append('evidence review precedes observation')
        if observed > now:
            problems.append('evidence timestamp is in the future')
    except (ValueError, TypeError):
        problems.append('invalid evidence timestamp')
    if e.get('superseded_by'):
        problems.append('evidence is superseded')
    return problems


def waiver_errors(w, row, c, profile, evidence, now):
    problems = []
    if c['requirement'] != 'RISK' or c['severity'] == 'Critical' or row.get('severity') == 'Critical':
        problems.append('only non-Critical RISK may be waived')
    if row.get('original_status') not in ('FAIL', 'UNKNOWN'):
        problems.append('waiver must retain the original FAIL/UNKNOWN')
    if not bound(w, profile) or w.get('control_id') != c['id']:
        problems.append('waiver scope/candidate mismatch')
    for field in ('id', 'finding', 'reason', 'impact', 'exposure', 'owner', 'owner_authority', 'approver', 'reviewer', 'remediation_owner', 'remediation_due'):
        if not nonempty(w.get(field)):
            problems.append('missing waiver ' + field)
    if w.get('reviewer') in (w.get('owner'), w.get('approver')):
        problems.append('waiver reviewer is not independent')
    if not reviewed(w, now):
        problems.append('missing or invalid waiver review time')
    for field in ('compensating_controls', 'revocation_triggers', 'stop_or_rollback_triggers', 'monitoring'):
        if not isinstance(w.get(field), list) or not w[field] or not all(nonempty(x) for x in w[field]):
            problems.append('missing waiver ' + field)
    try:
        if aware(w.get('approved_at')) > now:
            problems.append('waiver is not yet approved')
    except (ValueError, TypeError):
        problems.append('invalid waiver approval timestamp')
    has_instant = nonempty(w.get('expires_at'))
    has_date = nonempty(w.get('valid_through'))
    try:
        if has_instant == has_date:
            raise ValueError('Choose exactly one expiry convention')
        if has_instant:
            expiry = aware(w['expires_at'])
        else:
            end = dt.date.fromisoformat(w['valid_through']) + dt.timedelta(days=1)
            if not nonempty(w.get('timezone')):
                raise ValueError('Date-only expiry requires IANA timezone')
            expiry = dt.datetime.combine(end, dt.time(), ZoneInfo(w['timezone']))
        if now >= expiry:
            problems.append('waiver is expired')
        if aware(w.get('approved_at')) >= expiry:
            problems.append('waiver approval is not before expiry')
    except (ValueError, TypeError, KeyError) as exc:
        problems.append('invalid waiver expiry: ' + str(exc))
    ids = w.get('evidence_ids', [])
    if not isinstance(ids, list) or not ids:
        problems.append('waiver lacks tested mitigation evidence')
    else:
        for eid in ids:
            e = evidence.get(eid)
            if not e or evidence_errors(e, profile, now) or e.get('result') != 'PASS':
                problems.append('invalid waiver mitigation evidence: ' + str(eid))
            if e:
                try:
                    if aware(w.get('reviewed_at')) < aware(e.get('observed_at')) or aware(w.get('reviewed_at')) < aware(e.get('reviewed_at')):
                        problems.append('waiver review precedes mitigation observation/review')
                except (ValueError, TypeError):
                    problems.append('invalid waiver review chronology')
        if all(evidence.get(eid, {}).get('kind') == 'simulation' for eid in ids):
            problems.append('waiver mitigation has only synthetic simulation evidence')
    try:
        due = w.get('remediation_due')
        if 'T' in due:
            aware(due)
        else:
            dt.date.fromisoformat(due)
    except (ValueError, TypeError):
        problems.append('remediation deadline must be an ISO date or aware timestamp')
    if w.get('revoked') is True:
        problems.append('waiver is revoked')
    return problems


def gate(assessment, now, controls):
    if not isinstance(assessment, dict):
        raise ValueError('assessment must be an object')
    p = assessment.get('profile', {})
    if not isinstance(p, dict):
        raise ValueError('profile must be an object')
    errors = []
    for f in ('release_id', 'fingerprint', 'audience', 'impact', 'accountable_owner', 'intended_use'):
        if not nonempty(p.get(f)):
            errors.append({'id': 'PROFILE', 'reason': 'missing profile ' + f})
    boundary = p.get('assessment_boundary')
    if not isinstance(boundary, dict) or not nonempty(boundary.get('environment')) or not isinstance(boundary.get('allowed_actions'), list):
        errors.append({'id': 'PROFILE', 'reason': 'assessment boundary/environment is incomplete'})
    decisions = p.get('module_decisions', {})
    if not isinstance(decisions, dict):
        raise ValueError('module_decisions must be an object')
    for module in MODULES:
        decision = decisions.get(module, {})
        if not isinstance(decision, dict) or type(decision.get('applicable')) is not bool or not nonempty(decision.get('rationale')) or not reviewed(decision, now):
            errors.append({'id': module, 'reason': 'unresolved or unreviewed module applicability'})
    core_decision = decisions.get('CORE')
    if not isinstance(core_decision, dict) or core_decision.get('applicable') is not True:
        errors.append({'id': 'CORE', 'reason': 'CORE must be assessed'})
    for module in decisions:
        if module not in MODULES:
            errors.append({'id': module, 'reason': 'unknown module'})

    def unique_index(items, key, kind):
        if not isinstance(items, list):
            raise ValueError(kind + ' must be an array')
        result = {}
        for item in items:
            if not isinstance(item, dict) or not nonempty(item.get(key)):
                errors.append({'id': kind, 'reason': 'invalid record ID'})
                continue
            name = item[key]
            if name in result:
                errors.append({'id': name, 'reason': 'duplicate ' + kind})
            result[name] = item
        return result

    evidence = unique_index(assessment.get('evidence', []), 'id', 'evidence')
    waivers = unique_index(assessment.get('waivers', []), 'id', 'waiver')
    rows = unique_index(assessment.get('controls', []), 'id', 'control')
    for cid in rows:
        if cid not in controls:
            errors.append({'id': cid, 'reason': 'unknown control ID'})
    results = []
    counts = collections.Counter()
    for cid, c in controls.items():
        row = rows.get(cid)
        reasons = []
        veto = False
        if row is None:
            results.append({'id': cid, 'status': 'MISSING', 'requirement': c['requirement'], 'severity': c['severity'], 'veto': True, 'reasons': ['missing control assessment']})
            counts['MISSING'] += 1
            continue
        status = row.get('status')
        counts[str(status)] += 1
        requirement = c['requirement']
        severity = c['severity']
        if row.get('requirement') and row['requirement'] != requirement:
            if row['requirement'] == 'BLOCKER':
                requirement = 'BLOCKER'
            else:
                reasons.append('catalog requirement cannot be downgraded or silently changed')
        rank = {'Low': 0, 'Medium': 1, 'High': 2, 'Critical': 3}
        if row.get('severity'):
            if row['severity'] not in rank or rank[row['severity']] < rank[severity]:
                reasons.append('catalog severity cannot be downgraded')
            else:
                severity = row['severity']
        if status not in STATUSES:
            reasons.append('invalid status')
        if not bound(row, p):
            reasons.append('assessment is not bound to candidate')
        if not nonempty(row.get('owner')) or not reviewed(row, now):
            reasons.append('missing owner or assessment review')
        module_decision = decisions.get(c['module'], {})
        active = module_decision.get('applicable') if isinstance(module_decision, dict) else None
        if active is False and status != 'N/A':
            reasons.append('assessment conflicts with excluded module')
        if status == 'N/A':
            if not nonempty(row.get('rationale')):
                reasons.append('N/A requires a substantive rationale')
            if row.get('original_status') == 'FAIL' or row.get('finding_ids'):
                reasons.append('N/A cannot erase recorded failure/findings')
        elif status == 'PASS':
            if not nonempty(row.get('summary')):
                reasons.append('PASS lacks actual-result summary')
            checks = row.get('checks', [])
            if not isinstance(checks, list):
                checks = []
            steps = [x.get('step') for x in checks if isinstance(x, dict) and type(x.get('step')) is int]
            if sorted(steps, key=str) != sorted(range(1, len(c['procedure']) + 1), key=str):
                reasons.append('PASS must cover every procedure step exactly once')
            for check in checks:
                if not isinstance(check, dict):
                    reasons.append('invalid step check')
                    continue
                method = check.get('verification')
                required = check.get('required_verification')
                if method not in METHODS or required not in METHODS or method != required:
                    reasons.append('step lacks the planned verification method')
                if check.get('result') != 'PASS':
                    reasons.append('non-pass procedure step')
                eids = check.get('evidence_ids')
                if not isinstance(eids, list) or not eids:
                    reasons.append('procedure step lacks evidence')
                    continue
                for eid in eids:
                    e = evidence.get(eid)
                    if not e:
                        reasons.append('missing evidence: ' + str(eid))
                    else:
                        reasons.extend(evidence_errors(e, p, now))
                        try:
                            if aware(row.get('reviewed_at')) < aware(e.get('observed_at')) or aware(row.get('reviewed_at')) < aware(e.get('reviewed_at')):
                                reasons.append('assessment review precedes evidence observation/review')
                        except (ValueError, TypeError):
                            reasons.append('invalid review chronology')
                        if e.get('kind') != method or e.get('result') != 'PASS':
                            reasons.append('evidence method/result does not support this PASS')
        elif status == 'WAIVED':
            w = waivers.get(row.get('waiver_id'))
            if not w:
                reasons.append('missing waiver')
            else:
                effective = dict(c, requirement=requirement, severity=severity)
                reasons.extend(waiver_errors(w, row, effective, p, evidence, now))
        elif status in ('FAIL', 'UNKNOWN'):
            if requirement in ('BLOCKER', 'RISK') or severity == 'Critical':
                veto = True
                reasons.append('required control did not pass')
        if reasons:
            veto = True
        if severity == 'Critical' and status not in ('PASS', 'N/A'):
            veto = True
        results.append({'id': cid, 'status': status, 'original_status': row.get('original_status'), 'requirement': requirement, 'severity': severity, 'veto': veto, 'reasons': sorted(set(reasons))})
    vetoes = [r for r in results if r['veto']]
    return {'decision': 'NO-GO' if errors or vetoes else 'GO', 'as_of': now.isoformat(), 'release_id': p.get('release_id'), 'fingerprint': p.get('fingerprint'), 'counts': dict(counts), 'original_outcomes': dict(collections.Counter(row.get('original_status') if row.get('status') == 'WAIVED' else row.get('status') for row in rows.values())), 'ledger_errors': errors, 'vetoes': vetoes, 'recommended_backlog': [r for r in results if r['requirement'] == 'RECOMMENDED' and r['status'] in ('FAIL', 'UNKNOWN')], 'controls': results, 'limitation': 'Declared-evidence logical eligibility only; requires substantive review and human release decision. No deployment authorization.'}


def initialize(profile, controls):
    if not isinstance(profile, dict):
        raise ValueError('profile must be an object')
    decisions = profile.get('module_decisions', {})
    if not isinstance(decisions, dict) or any(not isinstance(v, dict) for v in decisions.values()):
        raise ValueError('every module decision must be an object')
    rows = []
    for cid, c in controls.items():
        decision = decisions.get(c['module'], {})
        excluded = decision.get('applicable') is False and nonempty(decision.get('rationale')) and nonempty(decision.get('reviewer')) and nonempty(decision.get('reviewed_at'))
        row = {'id': cid, 'release_id': profile.get('release_id', ''), 'fingerprint': profile.get('fingerprint', ''), 'status': 'N/A' if excluded else 'UNKNOWN', 'owner': c['owner'], 'reviewer': decision.get('reviewer', '') if excluded else '', 'reviewed_at': decision.get('reviewed_at', '') if excluded else '', 'summary': '', 'checks': []}
        if excluded:
            row['rationale'] = decision['rationale']
        rows.append(row)
    return {'schema_version': '1.0', 'profile': profile, 'controls': rows, 'evidence': [], 'waivers': []}


def validate_catalog(data, controls):
    required = ('id', 'module', 'title', 'purpose_risk', 'applicability', 'owner', 'reviewer', 'requirement', 'severity', 'procedure', 'expected', 'evidence', 'remediation', 'sources', 'scenarios', 'threshold_notes', 'lane', 'policy_origin')
    for cid, c in controls.items():
        if any(k not in c for k in required):
            raise ValueError(cid + ': missing field')
        if c['module'] not in MODULES or c['requirement'] not in ('BLOCKER', 'RISK', 'RECOMMENDED') or c['severity'] not in ('Low', 'Medium', 'High', 'Critical'):
            raise ValueError(cid + ': invalid classification')
        if not c['procedure'] or not c['sources'] or not c['evidence']:
            raise ValueError(cid + ': incomplete procedure/source/evidence')
        if any('\u0e00' <= char <= '\u0e7f' for char in json.dumps(c, ensure_ascii=False)):
            raise ValueError(cid + ': untranslated Thai operative text')
    ledger = read_json(ROOT / 'references' / 'source-ledger.json')
    sources = {s['id']: s for s in ledger['sources']}
    if len(sources) != 107 or len({s['url'] for s in sources.values()}) != 96:
        raise ValueError('Source ledger count/parity mismatch')
    for cid, c in controls.items():
        for s in c['sources']:
            if s['source_id'] not in sources or cid not in sources[s['source_id']]['control_ids']:
                raise ValueError(cid + ': broken source mapping')
    return {'valid': True, 'controls': len(controls), 'modules': dict(collections.Counter(c['module'] for c in controls.values())), 'source_records': len(sources), 'unique_source_urls': len({s['url'] for s in sources.values()})}


def emit(data, output=None):
    text = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
    if output:
        target = Path(output).resolve()
        if target == ROOT or ROOT in target.parents:
            raise ValueError('Write project outputs outside the installed skill')
        target.write_text(text, encoding='utf-8')
    else:
        print(text, end='')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    select = sub.add_parser('select')
    select.add_argument('--module', action='append', choices=MODULES)
    select.add_argument('--family')
    select.add_argument('--id', action='append')
    select.add_argument('--summary', action='store_true')
    init = sub.add_parser('init')
    init.add_argument('--profile', required=True)
    init.add_argument('--output', required=True)
    run = sub.add_parser('gate')
    run.add_argument('--assessment', required=True)
    run.add_argument('--as-of', required=True)
    run.add_argument('--output')
    sub.add_parser('validate-catalog')
    args = parser.parse_args()
    try:
        data, controls = catalog()
        if args.command == 'select':
            if args.id and any(cid not in controls for cid in args.id):
                raise ValueError('Unknown requested control ID')
            chosen = [c for c in controls.values() if (not args.module or c['module'] in args.module) and (not args.family or c['id'].startswith(args.family)) and (not args.id or c['id'] in args.id)]
            emit([{'id': c['id'], 'module': c['module'], 'title': c['title'], 'requirement': c['requirement'], 'severity': c['severity']} for c in chosen] if args.summary else {'controls': chosen})
        elif args.command == 'init':
            emit(initialize(read_json(args.profile), controls), args.output)
        elif args.command == 'validate-catalog':
            emit(validate_catalog(data, controls))
        else:
            result = gate(read_json(args.assessment), aware(args.as_of), controls)
            emit(result, args.output)
            return 0 if result['decision'] == 'GO' else 2
        return 0
    except (ValueError, KeyError, TypeError, OSError, json.JSONDecodeError) as exc:
        print('ERROR: ' + str(exc), file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
