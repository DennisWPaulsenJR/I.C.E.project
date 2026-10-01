"use strict";
function derive(source){const t=String(source||"").trim(),l=t.toLowerCase();const mechanism=/\b(through|via|by|because of|mediated by)\b/.exec(l);return{source:t,mechanismExpressed:Boolean(mechanism),mechanismMarker:mechanism?.[1]||null,attributed:/\b(said|reported)\b/.test(l),negated:/\bnot\b/.test(l),modality:/\b(may|might|could)\b/.exec(l)?.[1]?.toUpperCase()||null,question:/\?$/.test(t),objectiveMechanism:false,objectiveCausation:false,causalProof:false,eventCreated:false,interventionSemantics:false,network:0}}
module.exports={derive};
