#!/usr/bin/env python3
"""Synthetic logic regressions only; these are not product readiness results."""
import copy
import datetime as dt
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('readiness', Path(__file__).with_name('readiness.py'))
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)
NOW = dt.datetime.fromisoformat('2026-10-05T12:00:00+07:00')
STAMP = '2026-10-05T11:00:00+07:00'


def profile(modules=r.MODULES):
    return {'release_id': 'SYNTHETIC-R1', 'fingerprint': 'SYNTHETIC-FP1', 'audience': 'isolated fixture', 'impact': 'no live-system impact', 'accountable_owner': 'Fixture owner', 'intended_use': 'test logical gate semantics', 'assessment_boundary': {'environment': 'offline synthetic data', 'allowed_actions': ['local fixture validation']}, 'module_decisions': {m: {'applicable': m in modules, 'rationale': 'Fixture capability present' if m in modules else 'Fixture has no capability for ' + m, 'reviewer': 'Scope reviewer', 'reviewed_at': STAMP} for m in r.MODULES}}


def baseline(controls, modules=r.MODULES):
    p = profile(modules)
    a = r.initialize(p, controls)
    a['evidence'] = [{'id': 'E1', 'release_id': p['release_id'], 'fingerprint': p['fingerprint'], 'kind': 'observed_test', 'locator': 'fixture://isolated/test-result', 'observed_at': STAMP, 'producer': 'Fixture runner', 'tool_version': 'synthetic 1.0', 'scope': 'Synthetic declarations only, no product execution', 'result': 'PASS', 'verified': True, 'reviewer': 'Evidence reviewer', 'reviewed_at': STAMP}]
    for row in a['controls']:
        if row['status'] == 'N/A':
            continue
        row.update(status='PASS', reviewer='Control reviewer', reviewed_at=STAMP, summary='Synthetic PASS declaration for logical tests only', checks=[{'step': i, 'result': 'PASS', 'verification': 'observed_test', 'required_verification': 'observed_test', 'evidence_ids': ['E1']} for i in range(1, len(controls[row['id']]['procedure']) + 1)])
    return a


def waiver(a, cid, **changes):
    w = {'id': 'W1', 'control_id': cid, 'release_id': a['profile']['release_id'], 'fingerprint': a['profile']['fingerprint'], 'finding': 'Synthetic failure', 'reason': 'Fixture acceptance', 'impact': 'Fixture risk', 'exposure': 'Fixture only', 'owner': 'Risk owner', 'owner_authority': 'Synthetic fixture authority', 'approver': 'Approver', 'reviewer': 'Independent reviewer', 'reviewed_at': STAMP, 'remediation_owner': 'Fix owner', 'remediation_due': '2026-10-06', 'compensating_controls': ['Synthetic mitigation'], 'revocation_triggers': ['Fixture changes'], 'stop_or_rollback_triggers': ['Synthetic incident'], 'monitoring': ['Fixture alert'], 'approved_at': STAMP, 'expires_at': '2026-10-06T12:00:00+07:00', 'evidence_ids': ['E1']}
    w.update(changes)
    a['waivers'] = [w]
    row = next(x for x in a['controls'] if x['id'] == cid)
    row.update(status='WAIVED', original_status='FAIL', waiver_id='W1')
    return row


class GateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data, cls.controls = r.catalog()
        cls.risk = next(c['id'] for c in cls.controls.values() if c['requirement'] == 'RISK' and c['severity'] != 'Critical')
        cls.blocker = next(c['id'] for c in cls.controls.values() if c['requirement'] == 'BLOCKER')
        cls.critical = next(c['id'] for c in cls.controls.values() if c['severity'] == 'Critical')
        cls.recommended = cls.risk

    def setUp(self):
        self.a = baseline(self.controls)

    def outcome(self, a=None, now=NOW):
        return r.gate(a or self.a, now, self.controls)

    def row(self, cid):
        return next(x for x in self.a['controls'] if x['id'] == cid)

    def test_catalog_source_parity(self):
        self.assertTrue(r.validate_catalog(self.data, self.controls)['valid'])

    def test_review_cannot_precede_observation(self):
        early = '2026-10-05T10:00:00+07:00'
        self.a['evidence'][0]['reviewed_at'] = early
        self.assertEqual(self.outcome()['decision'], 'NO-GO')
        self.a = baseline(self.controls)
        self.row(self.blocker)['reviewed_at'] = early
        self.assertEqual(self.outcome()['decision'], 'NO-GO')
        self.a = baseline(self.controls)
        self.a['evidence'][0]['reviewed_at'] = '2026-10-05T11:30:00+07:00'
        self.assertEqual(self.outcome()['decision'], 'NO-GO')

    def test_waiver_review_cannot_precede_mitigation(self):
        waiver(self.a, self.risk, reviewed_at='2026-10-05T10:00:00+07:00')
        self.assertEqual(self.outcome()['decision'], 'NO-GO')

    def test_malformed_module_decisions_fail_safely(self):
        for module in ('CORE', 'API'):
            for invalid in (None, [], 'invalid', 1):
                a = baseline(self.controls)
                a['profile']['module_decisions'][module] = invalid
                with self.subTest(module=module, invalid=invalid):
                    self.assertEqual(self.outcome(a)['decision'], 'NO-GO')
                    with self.assertRaises(ValueError):
                        r.initialize(a['profile'], self.controls)
        p = profile()
        p['module_decisions'] = []
        with self.assertRaises(ValueError):
            r.initialize(p, self.controls)

    def test_baseline_and_three_combined_profiles(self):
        self.assertEqual(self.outcome()['decision'], 'GO')
        for modules in [('CORE', 'WEB', 'API', 'DATA'), ('CORE', 'AI', 'API', 'DATA'), ('CORE', 'MOBILE', 'API', 'DATA')]:
            with self.subTest(modules=modules):
                self.assertEqual(self.outcome(baseline(self.controls, modules))['decision'], 'GO')

    def test_critical_failure_is_veto(self):
        self.row(self.critical)['status'] = 'FAIL'
        result = self.outcome()
        self.assertEqual(result['decision'], 'NO-GO')
        self.assertIn(self.critical, [x['id'] for x in result['vetoes']])

    def test_required_unknown_missing_evidence_and_wrong_digest(self):
        for alteration in ('UNKNOWN', 'no-evidence', 'wrong-digest', 'superseded', 'unreviewed'):
            a = baseline(self.controls)
            row = next(x for x in a['controls'] if x['id'] == self.blocker)
            if alteration == 'UNKNOWN': row['status'] = 'UNKNOWN'
            elif alteration == 'no-evidence': row['checks'][0]['evidence_ids'] = []
            elif alteration == 'wrong-digest': a['evidence'][0]['fingerprint'] = 'OTHER'
            elif alteration == 'superseded': a['evidence'][0]['superseded_by'] = 'E2'
            else: a['evidence'][0]['verified'] = False
            with self.subTest(alteration=alteration): self.assertEqual(self.outcome(a)['decision'], 'NO-GO')

    def test_missing_step_and_simulation_not_observed(self):
        self.row(self.blocker)['checks'].pop()
        self.assertEqual(self.outcome()['decision'], 'NO-GO')
        self.a = baseline(self.controls)
        self.row(self.blocker)['checks'][0]['verification'] = 'simulation'
        self.assertEqual(self.outcome()['decision'], 'NO-GO')

    def test_na_rationale_and_failure_preservation(self):
        row = self.row(self.blocker)
        row.update(status='N/A', rationale='No such behavior in fixture')
        self.assertEqual(self.outcome()['decision'], 'GO')
        row['rationale'] = ''
        self.assertEqual(self.outcome()['decision'], 'NO-GO')
        row.update(rationale='No such behavior', original_status='FAIL')
        self.assertEqual(self.outcome()['decision'], 'NO-GO')

    def test_unresolved_scope_and_core_exclusion(self):
        del self.a['profile']['module_decisions']['API']
        self.assertEqual(self.outcome()['decision'], 'NO-GO')
        self.a = baseline(self.controls)
        self.a['profile']['module_decisions']['CORE']['applicable'] = False
        self.assertEqual(self.outcome()['decision'], 'NO-GO')

    def test_valid_risk_waiver_preserves_failure(self):
        waiver(self.a, self.risk)
        result = self.outcome()
        self.assertEqual(result['decision'], 'GO')
        self.assertEqual(next(x for x in result['controls'] if x['id'] == self.risk)['original_status'], 'FAIL')

    def test_blocker_critical_invalid_and_expired_waivers(self):
        cases = [(self.blocker, {}), (self.critical, {}), (self.risk, {'expires_at': NOW.isoformat()}), (self.risk, {'fingerprint': 'OTHER'}), (self.risk, {'compensating_controls': []}), (self.risk, {'reviewer': 'Risk owner'}), (self.risk, {'revoked': True}), (self.risk, {'approved_at': '2026-10-07T12:00:00+07:00'}), (self.risk, {'evidence_ids': []})]
        for cid, changes in cases:
            a = baseline(self.controls)
            waiver(a, cid, **changes)
            with self.subTest(cid=cid, changes=changes): self.assertEqual(self.outcome(a)['decision'], 'NO-GO')

    def test_date_only_inclusive_bangkok_boundary(self):
        waiver(self.a, self.risk, expires_at='', valid_through='2026-10-05', timezone='Asia/Bangkok')
        self.assertEqual(self.outcome(now=dt.datetime.fromisoformat('2026-10-05T23:59:59+07:00'))['decision'], 'GO')
        self.assertEqual(self.outcome(now=dt.datetime.fromisoformat('2026-10-06T00:00:00+07:00'))['decision'], 'NO-GO')

    def test_recommended_backlog_and_contextual_critical_veto(self):
        controls = copy.deepcopy(self.controls)
        controls[self.recommended]['requirement'] = 'RECOMMENDED'
        self.row(self.recommended)['status'] = 'FAIL'
        result = r.gate(self.a, NOW, controls)
        self.assertEqual(result['decision'], 'GO')
        self.assertIn(self.recommended, [x['id'] for x in result['recommended_backlog']])
        self.row(self.recommended)['severity'] = 'Critical'
        self.assertEqual(r.gate(self.a, NOW, controls)['decision'], 'NO-GO')

    def test_missing_duplicate_unknown_and_downgraded_controls(self):
        alterations = ('missing', 'duplicate', 'unknown', 'downgrade')
        for alteration in alterations:
            a = baseline(self.controls)
            if alteration == 'missing': a['controls'].pop()
            elif alteration == 'duplicate': a['controls'].append(copy.deepcopy(a['controls'][0]))
            elif alteration == 'unknown': a['controls'][0]['id'] = 'FAKE999'
            else: next(x for x in a['controls'] if x['id'] == self.blocker)['requirement'] = 'RECOMMENDED'
            with self.subTest(alteration=alteration): self.assertEqual(self.outcome(a)['decision'], 'NO-GO')

    def test_init_does_not_make_pass_evidence(self):
        a = r.initialize(profile(('CORE', 'AI', 'API', 'DATA')), self.controls)
        self.assertFalse(a['evidence'])
        self.assertNotIn('PASS', {x['status'] for x in a['controls']})
        self.assertEqual(self.outcome(a)['decision'], 'NO-GO')


if __name__ == '__main__':
    unittest.main(verbosity=2)
