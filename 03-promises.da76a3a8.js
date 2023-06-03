var o,e;(o=2,e=1500,new Promise(((i,s)=>{Math.random()>.3?setTimeout((()=>{i({position:o,delay:e})}),e):setTimeout((()=>{s({position:o,delay:e})}),e)}))).then((({position:o,delay:e})=>{console.log(`✅ Fulfilled promise ${o} in ${e}ms`)})).catch((({position:o,delay:e})=>{console.log(`❌ Rejected promise ${o} in ${e}ms`)}));
//# sourceMappingURL=03-promises.da76a3a8.js.map
