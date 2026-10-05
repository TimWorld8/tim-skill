// Synthetic orchestration regressions. Every non-falsey fixture validates against its dispatch schema.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../skills/research-swarm/workflows/research-swarm.js'),'utf8');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const run=new AsyncFunction('args','agent','parallel','phase','log','budget',source.replace('export const meta','const meta'));
function validate(v,s,at='$') {
 if(s.type==='object') {
  assert.ok(v && typeof v==='object' && !Array.isArray(v),at);
  for(const k of s.required||[]) assert.ok(Object.hasOwn(v,k),`${at}.${k} required`);
  if(s.additionalProperties===false) for(const k of Object.keys(v)) assert.ok(Object.hasOwn(s.properties,k),`${at}.${k} unexpected`);
  for(const [k,value] of Object.entries(v)) if(s.properties[k]) validate(value,s.properties[k],`${at}.${k}`);
 } else if(s.type==='array') {
  assert.ok(Array.isArray(v),at);
  if(s.minItems!==undefined) assert.ok(v.length>=s.minItems,`${at} minItems`);
  if(s.maxItems!==undefined) assert.ok(v.length<=s.maxItems,`${at} maxItems`);
  v.forEach((x,i)=>validate(x,s.items,`${at}[${i}]`));
 } else if(s.type==='integer') assert.ok(Number.isInteger(v),at);
 else assert.equal(typeof v,s.type,at);
 if(s.enum) assert.ok(s.enum.includes(v),`${at} enum`);
}
const finding=(claim,url)=>({claim,source_url:url,source_type:'primary',confidence:'confirmed',why_mechanism:'Synthetic mechanism',recency_check:{source_date:'2026-10',stale:false,successor:'none found'},anomaly:'none',what_would_disprove:'Contradictory measurement',revives_closed_route:'n/a'});
const hypothesis=code=>({statement:'PRIVATE_HYPOTHESIS',pass_criterion:'Measured target reached',fail_criterion:'Measured target missed',testable_in_code:code,test_plan:'Scratch fixture'});
async function fixture(o={}) {
 let calls=0,refuters=0; const logs=[],prompts=[];
 const agent=async(prompt,opts)=>{
  calls++;prompts.push(prompt);assert.ok(calls<=(o.ceiling??14),'ceiling exceeded');
  assert.ok(!/PRIVATE_/.test(opts.label),'private dispatch label');
  let v;
  if(opts.label.startsWith('lens:')) {
   if(o.allFailed || (o.failedLens && opts.label==='lens:landscape')) return null;
   v={findings:[finding(o.contradictions && opts.label==='lens:primary-source'?'Cache is not safe':'Cache is safe',`https://example.org/${opts.label}`)],lens_summary:'Synthetic'};
  } else if(opts.label==='synthesise' || opts.label.startsWith('re-synthesise:')) v={picture:'Synthetic',conflicts:[],gaps:[],hypotheses:o.twoHypotheses?[hypothesis(false),hypothesis(false)]:[hypothesis(Boolean(o.code))]};
  else if(opts.label.startsWith('refute:')) {
   refuters++;if(o.missingRefuter && refuters===2) return null;
   v={verdict:o.fail?'fail':'pass',evidence:'Synthetic',broke_where:o.fail?(o.privateBreak?'PRIVATE_BREAK':'assumption'):'n/a',revision:o.fail?'PRIVATE_REVISION':'n/a'};
  } else if(opts.label.startsWith('experiment:')) {
   if(o.failedExperiment) return null;
   v={verdict:'pass',evidence:'Synthetic',broke_where:'n/a',revision:'n/a'};
  } else v={reading:'Synthetic',questions:[],recommended_next:{question:'stop',reason:'No decision change',width:5}};
  validate(v,opts.schema);return v;
 };
 const parallel=async tasks=>{
  const values=await Promise.all(tasks.map(t=>t()));
  if(o.falseyTestTask && values[0]?.hypothesis) values[0]=null;
  return values;
 };
 try {
  const result=await run({question:'PRIVATE_QUESTION',width:o.width||5,ceiling:o.ceiling??14,maxRounds:o.maxRounds,priorLayers:o.priorLayers||[]},agent,parallel,()=>{},s=>logs.push(s),{total:o.expanded?999999:0,remaining:()=>o.expanded?999999:0});
  assert.ok(logs.every(s=>!s.includes('PRIVATE_')),'private progress log');
  return {result,calls,prompts,logs};
 } catch(error) {error.calls=calls;throw error;}
}
(async()=>{
 let f=await fixture(); assert.equal(f.result.hypotheses_tested[0].verdict,'pass');assert.equal(f.result.hypotheses_tested[0].fail_criterion,'Measured target missed');assert.equal(f.result.next_questions.length,0);assert.equal(f.result.recommended_next.question,'stop');
 f=await fixture({missingRefuter:true});assert.equal(f.result.hypotheses_tested[0].verdict,'undetermined');
 f=await fixture({failedLens:true,ceiling:8});assert.equal(f.result.hypotheses_tested[0].verdict,'untested');assert.ok(f.calls<=8);
 f=await fixture({fail:true});assert.equal(f.result.hypotheses_tested[0].verdict,'fail');assert.equal(f.result.hypotheses_tested[1].verdict,'untested');
 f=await fixture({code:true});assert.equal(f.result.hypotheses_tested[0].verdict,'pass');
 await assert.rejects(()=>fixture({allFailed:true}),/every lens failed/);
 await assert.rejects(()=>fixture({ceiling:1}),e=>/cannot fit/.test(e.message)&&e.calls===0);
 f=await fixture({width:7,ceiling:8});assert.equal(f.calls,8);assert.equal(f.result.stats.agents_dispatched,8);assert.equal(f.result.stats.next_questions_completed,false);
 f=await fixture({contradictions:true});assert.equal(f.result.findings.length,5);assert.ok(f.result.findings.some(x=>x.claim==='Cache is not safe'));assert.equal(new Set(f.result.findings.map(x=>x.source_url)).size,5);assert.ok(f.result.corroborated.every(x=>x.claim!=='Cache is not safe'));
 f=await fixture({code:true,failedExperiment:true});assert.equal(f.result.hypotheses_tested[0].verdict,'undetermined');
 f=await fixture({code:true,falseyTestTask:true});assert.equal(f.result.hypotheses_tested[0].verdict,'undetermined');assert.equal(f.result.hypotheses_tested[0].statement,'PRIVATE_HYPOTHESIS');
 f=await fixture({priorLayers:[{layer:1,question:'PREVIOUS_LAYER_ONLY',verdictSummary:'Prior evidence',openQuestions:'Gap'}]});assert.ok(f.prompts.some(x=>x.includes('PREVIOUS_LAYER_ONLY')));
 f=await fixture({fail:true,twoHypotheses:true,privateBreak:true,expanded:true});assert.ok(f.calls<=14);assert.ok(f.result.hypotheses_tested.some(x=>x.verdict==='untested'));
 f=await fixture({width:7,ceiling:8});assert.equal(f.result.stats.rounds_run,0);
 for(const maxRounds of [-1,0,4,1.5,'2',null]) {
  await assert.rejects(()=>fixture({maxRounds}),e=>/maxRounds must be an integer from 1 to 3/.test(e.message)&&e.calls===0);
 }
 for(const maxRounds of [1,2,3]) {
  f=await fixture({fail:true,expanded:true,maxRounds});assert.equal(f.result.stats.rounds_run,maxRounds);
 }
 console.log('PASS: 23 schema-validated synthetic workflow scenarios');
})().catch(e=>{console.error(e);process.exitCode=1});
