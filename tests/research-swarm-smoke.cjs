// Synthetic orchestration checks; no agents, browsing, or paid services run.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '../skills/research-swarm/workflows/research-swarm.js'), 'utf8');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = new AsyncFunction('args', 'agent', 'parallel', 'phase', 'log', 'budget', source.replace('export const meta', 'const meta'));
const finding = () => ({claim:'Independent structured finding', source_url:'https://example.org/source', source_type:'primary', confidence:'confirmed', why_mechanism:'A synthetic mechanism', recency_check:{source_date:'2026-10',stale:false,successor:'none found'}, anomaly:'none', what_would_disprove:'Contradictory measurement', revives_closed_route:'n/a'});
const hypothesis = (code=false) => ({statement:'Synthetic hypothesis',pass_criterion:'Measured result meets target',fail_criterion:'Measured result misses target',testable_in_code:code,test_plan:'Scratch fixture only'});
async function fixture(options={}) {
  let calls=0;
  let refuters=0;
  const agent=async (_, o) => {
    calls++;
    if (o.label.startsWith('lens:')) return options.failedLens && o.label==='lens:landscape' ? null : {findings:[finding()],lens_summary:'Synthetic'};
    if (o.label==='synthesise' || o.label.startsWith('re-synthesise:')) return {picture:'Synthetic picture',conflicts:[],gaps:[],hypotheses:[hypothesis(options.code)]};
    if (o.label.startsWith('refute:')) {
      refuters++;
      if(options.missingRefuter && refuters===2) return null;
      return {verdict:options.fail?'fail':'pass',evidence:'Synthetic evidence',broke_where:options.fail?'assumption':'n/a',revision:options.fail?'Revised hypothesis':'n/a'};
    }
    if(o.label.startsWith('experiment:')) return {verdict:'pass',evidence:'Synthetic code result',broke_where:'n/a',revision:'n/a'};
    return {reading:'Synthetic reading',questions:[],recommended_next:{question:'stop',reason:'Fixture complete',width:5}};
  };
  const result=await run({question:'Synthetic test',width:5,ceiling:options.ceiling||14}, agent, tasks=>Promise.all(tasks.map(t=>t())),()=>{},()=>{}, {total:0,remaining:()=>0});
  return {result,calls};
}
(async()=>{
  let f=await fixture();
  assert.equal(f.result.hypotheses_tested[0].verdict,'pass');
  assert.equal(f.result.stats.lenses_run,5);
  f=await fixture({missingRefuter:true});
  assert.equal(f.result.hypotheses_tested[0].verdict,'undetermined');
  f=await fixture({failedLens:true,ceiling:8});
  assert.equal(f.result.hypotheses_tested[0].verdict,'untested');
  assert.ok(f.calls<=8);
  f=await fixture({fail:true});
  assert.equal(f.result.hypotheses_tested[0].verdict,'fail');
  assert.equal(f.result.hypotheses_tested[1].verdict,'untested');
  assert.equal(f.result.stats.rounds_run,1);
  f=await fixture({code:true});
  assert.equal(f.result.hypotheses_tested[0].mode,'experiment');
  assert.equal(f.result.hypotheses_tested[0].verdict,'pass');
  await assert.rejects(()=>run({question:'x'},async()=>null,tasks=>Promise.all(tasks.map(t=>t())),()=>{},()=>{},{total:0,remaining:()=>0}),/every lens failed/);
  console.log('PASS: 6 synthetic workflow scenarios, including failure accounting and incomplete refutation');
})().catch(e=>{console.error(e);process.exitCode=1});
