const fs=require('node:fs');const assert=require('node:assert/strict');
const path=require('node:path');
const out=path.resolve(process.env.AUDIT_OUTPUT||'/tmp/roylyl-music-browser-audit');fs.mkdirSync(out,{recursive:true});
const endpoint=process.env.CDP_URL||'http://127.0.0.1:9231';
const pageURL=process.env.MUSIC_URL||'http://127.0.0.1:8049/music/';
const statesOnly=process.argv.includes('--states-only');
let lyricCode=503;const held=[];
(async()=>{
const list=await(await fetch(endpoint+'/json')).json();const ws=new WebSocket(list.find(x=>x.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map();const errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}else if(m.method==='Fetch.requestPaused'){if(lyricCode===null)held.push(m.params.requestId);else send('Fetch.fulfillRequest',{requestId:m.params.requestId,responseCode:lyricCode,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'*'},{name:'Content-Type',value:'text/plain; charset=utf-8'}],body:''}).catch(error=>errors.push(String(error)));}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+': '+(m.params.exceptionDetails.exception?.description||''));};
const send=(method,params={})=>new Promise((resolve,reject)=>{let id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description);return r.result.value;};
const delay=ms=>new Promise(r=>setTimeout(r,ms));const until=async e=>{for(let i=0;i<50;i++){if(await run(e))return;await delay(100);}throw Error('Timed out: '+e);};
const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'));};
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
await send('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('roylyl-music-audio-budget','0');localStorage.setItem('roylyl-music-preload','false');localStorage.setItem('roylyl-music-theme','dark');"});
await send('Page.navigate',{url:pageURL});await until("document.querySelectorAll('.album-card').length>0");
// Select an actual local catalogue entry; no whole-library download.
await run("document.querySelector('#feature-play').click()");await until("document.querySelector('#audio').currentTime>0");
console.log('REAL_PLAYBACK',await run("({time:document.querySelector('#audio').currentTime,ready:document.querySelector('#audio').readyState,paused:document.querySelector('#audio').paused,status:document.querySelector('#player-status').textContent})"));
await run("document.querySelector('#play').click();document.querySelector('#open-full').click()");await until("document.querySelector('#full-lyrics .lyric-line')");
let results=[];
for(const [w,h] of (statesOnly?[]:[[320,568],[393,852],[430,932],[674,1130],[700,900],[701,900],[852,393],[1024,1366],[1366,1024],[1440,900]])){
 await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:w<=700});await delay(120);
 await run("document.querySelector('#full-cover-tab').click()");
 const layout=await run(`(()=>{const r=id=>document.querySelector(id).getBoundingClientRect().toJSON(),c=r('#full-cover'),p=r('#full-play');return {w:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,cover:c,meta:r('.full-meta'),play:p,seek:r('#full-seek'),content:r('#full-content')}})()`);
 await shot(`cover-${w}x${h}`);
 await run("document.querySelector('#full-lyrics-tab').click()");await delay(80);
 const lyrics=await run(`(()=>{const r=id=>document.querySelector(id).getBoundingClientRect().toJSON(),b=document.querySelector('.lyric-line'),c=document.querySelector('.lyric-credit');return {play:r('#full-play'),box:r('#full-lyrics'),body:getComputedStyle(b).fontSize,credit:getComputedStyle(c).fontSize,overflow:document.querySelector('#full-player').scrollWidth>innerWidth}})()`);
 await shot(`lyrics-${w}x${h}`);
 assert.equal(layout.overflow||lyrics.overflow,false,`${w}: horizontal overflow`);
 assert.ok(Math.abs(layout.play.y-lyrics.play.y)<1,`${w}: transport moved`);
 assert.equal(lyrics.body,lyrics.credit,`${w}: credit and lyric font differ`);
 assert.equal(layout.seek.height,48,`${w}: seek hit target`);
 assert.ok(layout.meta.bottom<=layout.seek.top,`${w}: metadata overlaps transport`);
 assert.ok(Math.abs(layout.play.width-layout.play.height)<1,`${w}: distorted play button`);
 if(w<=700)assert.ok(Math.abs(layout.cover.x+layout.cover.width/2-w/2)<1,`${w}: cover is not centered`);
 results.push({size:[w,h],overflow:layout.overflow||lyrics.overflow,coverCenter:layout.cover.x+layout.cover.width/2,metaBottom:layout.meta.bottom,seekTop:layout.seek.top,stable:layout.play.y===lyrics.play.y,lyricHeight:lyrics.box.height,fonts:[lyrics.body,lyrics.credit],seekHeight:layout.seek.height});
 await run("document.querySelector('#close-full').click();document.querySelector('[data-open-settings]').click()");await shot(`settings-${w}x${h}`);
 await run("document.querySelector('#close-settings').click();document.querySelector('#open-full').click()");
}
console.log('LAYOUT',JSON.stringify(results));
// Simulated long title and light theme; original catalogue metadata stays unchanged.
if(!statesOnly){
await run("document.querySelector('#close-full').click();document.querySelector('[data-open-settings]').click();document.querySelector('input[value=light]').click();document.querySelector('#close-settings').click();document.querySelector('#open-full').click()");await shot('light-desktop');
await send('Emulation.setDeviceMetricsOverride',{width:393,height:852,deviceScaleFactor:1,mobile:true});
await run("document.querySelector('#full-cover-tab').click();document.querySelector('#full-title').textContent='之乎者也 (feat. 李志) [Live]';document.querySelector('#full-album').textContent='大事发声·录音棚现场：罗大佑专场（超级版）'");await shot('long-title-mobile');
console.log('LONG',await run("({meta:document.querySelector('.full-meta').getBoundingClientRect().toJSON(),content:document.querySelector('#full-content').getBoundingClientRect().toJSON(),seek:document.querySelector('#full-seek').getBoundingClientRect().toJSON()})"));
}
// Inject HTTP errors only for LRC requests; audio continues normally.
await send('Emulation.setDeviceMetricsOverride',{width:393,height:852,deviceScaleFactor:1,mobile:true});
await run("document.querySelector('#full-lyrics-tab').click()");
const stateSizes=[[393,852],[1440,900]],playTops={};
for(const [width,height] of stateSizes){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=700});playTops[width]=await run("document.querySelector('#full-play').getBoundingClientRect().top");}
await send('Fetch.enable',{patterns:[{urlPattern:'*.lrc*'}]});
const stateResults=[];
async function inspectState(name,text){
 await until(`document.querySelector('#full-lyrics').textContent.includes(${JSON.stringify(text)})`);
 for(const [width,height] of stateSizes){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<=700});
  const metric=await run("({top:document.querySelector('#full-play').getBoundingClientRect().top,paused:document.querySelector('#audio').paused})");
  assert.ok(Math.abs(metric.top-playTops[width])<1,`${name}/${width}: transport moved`);
  assert.equal(metric.paused,false,`${name}/${width}: audio paused`);
  stateResults.push({state:name,width,playTop:metric.top,paused:metric.paused});await shot(`state-${name}-${width}`);
 }
}
await run("document.querySelector('#full-play').click()");await until("!document.querySelector('#audio').paused");
await run("document.querySelector('#clear-lyric-cache').click()");await inspectState('error','歌词加载失败');
assert.equal(await run("document.querySelector('#full-lyrics button')?.textContent"),'重试');
lyricCode=404;await run("document.querySelector('#full-lyrics button').click()");await inspectState('not-found','暂无歌词');
lyricCode=null;await run("document.querySelector('#clear-lyric-cache').click()");await inspectState('loading','正在加载歌词');
await send('Fetch.disable');await until("document.querySelector('#full-lyrics .lyric-line')");
assert.equal(await run("document.querySelector('#audio').paused"),false,'Lyric retry paused audio');
stateResults.push({state:'ready',paused:false});await shot('state-ready');
await run("document.querySelector('#full-play').click()");
assert.deepEqual(errors,[],'Browser runtime errors');
console.log('STATES',JSON.stringify(stateResults));console.log('ERRORS',errors);
fs.writeFileSync(out+'/'+(statesOnly?'browser-states.json':'browser-results.json'),JSON.stringify({results,stateResults,errors},null,2));ws.close();
})().catch(e=>{console.error(e);process.exitCode=1;setTimeout(()=>process.exit(1),100)});
