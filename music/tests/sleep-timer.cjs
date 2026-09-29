const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
let now=100000,pauses=0,stored=0,scheduled;const nodes=new Map();
const ctx={sleepDeadline:0,sleepTick:null,Date:{now:()=>now},Math,Number,String,
 $:id=>{if(!nodes.has(id))nodes.set(id,{classList:{toggle(){}},close(){}});return nodes.get(id);},
 save:(key,value)=>stored=value,pausePlayback:()=>pauses++,status(){},clearTimeout(){},setTimeout:(fn,ms)=>{scheduled={fn,ms};return 1;}};
vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function formatSleepTime('),source.indexOf('  function closeFullMore(')),ctx);
assert.equal(ctx.formatSleepTime(3661000),'01:01:01');
for(const invalid of [0,-1,1.5,NaN,Infinity,1441])assert.equal(ctx.setSleepTimer(invalid),false);
for(const minutes of [30,60,120,180,75]){assert(ctx.setSleepTimer(minutes));assert.equal(stored,now+minutes*60000);}
now+=65000;scheduled.fn();assert.equal(ctx.$('sleep-countdown').textContent,'01:13:55');assert.equal(pauses,0);
// Simulate background throttling: the next callback arrives beyond the deadline.
now=stored+5000;scheduled.fn();assert.equal(pauses,1);assert.equal(stored,0);assert(ctx.$('sleep-indicator').hidden);
assert.equal(ctx.checkSleepTimer(),false);assert.equal(pauses,1);
// A restored expired deadline is also stopped before the next playback action.
ctx.sleepDeadline=now-1;assert(ctx.checkSleepTimer());assert.equal(pauses,2);
console.log('通过：预设/自定义、替换定时、绝对截止时间、延迟回调到期暂停、过期恢复与只触发一次。');
