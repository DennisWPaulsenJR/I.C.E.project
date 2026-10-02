"use strict";
const assert=require("assert"),r=require("../causal-mechanism-evidence-runtime");let n=0;const ok=x=>{assert(x);n++};
const c={sourceId:"a",lineage:["a"],polarity:"P"},s={sourceId:"b",lineage:["b"],polarity:"P"},q={sourceId:"c",lineage:["c"],polarity:"P"},shared={sourceId:"d",lineage:["a"],polarity:"P"},neg={sourceId:"e",lineage:["e"],polarity:"N"};
const fixtures=Array.from({length:36},(_,i)=>[s,q,neg,shared][i%4]===s?[s]:[s,q,neg,shared].slice(0,(i%4)+1));
ok(fixtures.length===36);for(const evidence of fixtures){const x=r.evaluate(c,evidence);ok(!x.objectiveMechanism&&!x.mediationValidated&&!x.interventionSemantics&&!x.eventCreated&&!x.userBeliefMutated&&x.network===0)}
ok(r.evaluate(c,[s,neg]).support.length===1);ok(r.evaluate(c,[s,neg]).challenge.length===1);ok(r.evaluate(c,[]).sufficiency==="INSUFFICIENT_MECHANISM_EVIDENCE");ok(r.evaluate(c,[shared]).sufficiency==="INSUFFICIENT_MECHANISM_EVIDENCE");console.log(`causal mechanism evidence R43 QA passed ${JSON.stringify({fixtures:fixtures.length,checks:n,network:0})}`);
