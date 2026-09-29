const fs=require('fs'),assert=require('assert/strict');
const out=process.env.AUDIT_OUTPUT||'/tmp/roylyl-refinements-results';fs.mkdirSync(out,{recursive:true});
(async()=>{
const tabs=await(await fetch((process.env.CDP_URL||'http://127.0.0.1:9231')+'/json')).json(),ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map(),errors=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
let failMedia=0;const mediaAttempts=[];
const wav=Buffer.alloc(44+8000*2*180);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(8000,24);wav.writeUInt32LE(16000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Fetch.requestPaused'){const p=m.params;mediaAttempts.push(p.request.url);if(failMedia){if(failMedia>0)failMedia--;send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:503,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'*'},{name:'Cache-Control',value:'no-store'}],body:''});return;}const range=p.request.headers.Range||p.request.headers.range;let body=wav,code=200;const headers=[{name:'Cache-Control',value:'no-store'},{name:'Content-Type',value:'audio/wav'},{name:'Access-Control-Allow-Origin',value:'*'},{name:'Accept-Ranges',value:'bytes'}];const parts=/bytes=(\d+)-(\d*)/.exec(range||'');if(parts){const start=Number(parts[1]),end=Math.min(Number(parts[2]||wav.length-1),wav.length-1);body=wav.subarray(start,end+1);code=206;headers.push({name:'Content-Range',value:`bytes ${start}-${end}/${wav.length}`});}headers.push({name:'Content-Length',value:String(body.length)});send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:code,responseHeaders:headers,body:body.toString('base64')}).catch(e=>errors.push(String(e)));}};
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
const delay=ms=>new Promise(r=>setTimeout(r,ms));const until=async expression=>{for(let i=0;i<100;i++){if(await run(expression))return;await delay(100);}console.error('TIMEOUT STATE',await run("({src:document.querySelector('#audio').src,paused:document.querySelector('#audio').paused,error:document.querySelector('#audio').error?.code,status:document.querySelector('#player-status').textContent,trace:JSON.parse(localStorage.getItem('roy-music:playback-log')).slice(-12)})"),mediaAttempts.slice(-6));throw Error('Timeout '+expression);};
const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));};
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});await send('Network.setBypassServiceWorker',{bypass:true});
await send('Fetch.enable',{patterns:[{urlPattern:'https://raw.githubusercontent.com/Roylyl/Music/main/*.mp3*',requestStage:'Request'}]});
await send('Page.navigate',{url:process.env.MUSIC_URL||'http://127.0.0.1:8049/music/'});await until("document.querySelectorAll('.album-card').length>0");
const tracks=await run("fetch('./data/catalog.json').then(r=>r.json()).then(c=>c.tracks.filter(t=>t.src).slice(0,4))"),ids=tracks.map(t=>t.id);
const seed={id:ids[0],time:0,queue:ids,repeat:'shuffle',shuffleOrder:ids,shuffleCursor:0,history:[ids[0]],historyAnchors:[null],historyCursor:0,nextUp:[]};
const init=await send('Page.addScriptToEvaluateOnNewDocument',{source:`localStorage.setItem('roylyl-music-audio-budget','0');localStorage.setItem('roylyl-music-preload','false');localStorage.setItem('roy-music:playback',${JSON.stringify(JSON.stringify(seed))});`});
await send('Page.reload');await until("!document.querySelector('#open-full').disabled");await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:init.identifier});
const click=selector=>run(`document.querySelector(${JSON.stringify(selector)}).click()`);
const state=()=>run("JSON.parse(localStorage.getItem('roy-music:playback'))");
const queueState=()=>run("document.querySelector('#queue-list')._queueItems.map(t=>({id:t.id,current:!!t._queueCurrent,inserted:!!t._queueInserted}))");
await send('Emulation.setDeviceMetricsOverride',{width:402,height:874,deviceScaleFactor:1,mobile:true});
await click('#play');await until("!document.querySelector('#audio').paused && document.querySelector('#audio').readyState>0");
const metrics=[],cycle=[];
if(!process.argv.includes('--recovery-only')){
await click('#mobile-queue-toggle');
assert.deepEqual((await queueState()).map(t=>t.id),ids);
await click(`#queue-list [data-next="${ids[1]}"]`);
assert.deepEqual((await state()).nextUp,[ids[1]]);assert.deepEqual((await queueState()).map(t=>t.id),[ids[0],ids[1],...ids.slice(1)]);
assert.equal(await run("document.querySelector('#queue-undo').hidden"),false);
await click('#undo-queue-change');assert.deepEqual((await state()).nextUp,[]);
await click(`#queue-list [data-next="${ids[1]}"]`);await click('#queue-list [data-queue-inserted] [data-more]');
assert.equal(await run("document.querySelector('#cancel-insertion').hidden"),false);
assert.equal(await run("document.querySelector('#menu-artists button').textContent"),'查看歌手');
await click('#cancel-insertion');assert.deepEqual((await state()).nextUp,[]);assert.deepEqual((await state()).queue,ids);
await click('#undo-queue-change');assert.deepEqual((await state()).nextUp,[ids[1]]);
await click('#queue-list [data-queue-inserted] [data-more]');await click('#clear-insertions');assert.deepEqual((await state()).nextUp,[]);
await click('#undo-queue-change');assert.deepEqual((await state()).nextUp,[ids[1]]);
for(const width of [320,360,402,700,820,1440]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<=700});
 const m=await run(`(()=>{const panel=document.querySelector('#queue-panel'),p=panel.getBoundingClientRect(),rows=[...document.querySelectorAll('#queue-list .track-row')];return {width:innerWidth,left:p.left,right:p.right,rowHeights:rows.map(r=>r.getBoundingClientRect().height),aligned:rows.every(r=>{const a=[...r.querySelectorAll('[data-next],[data-like],[data-more]')].map(b=>b.getBoundingClientRect());return a.length===3&&a.every(b=>Math.abs(b.y-a[0].y)<1)&&Math.abs((a[1].x-a[0].x)-(a[2].x-a[1].x))<1;}),overflow:document.documentElement.scrollWidth>innerWidth}})()`);
 assert(m.rowHeights.every(h=>h===72),JSON.stringify(m));assert(m.aligned,JSON.stringify(m));assert(!m.overflow,JSON.stringify(m));if(width<=900)assert(Math.abs(m.left-(width-m.right))<1,JSON.stringify(m));metrics.push(m);
}
await send('Emulation.setDeviceMetricsOverride',{width:402,height:874,deviceScaleFactor:1,mobile:true});await shot('queue-402');
// Consume inserted B, then the untouched base B, then C/D; queue order must agree.
for(const id of [ids[1],ids[1],ids[2],ids[3]]){
 const rows=await queueState(),index=rows.findIndex(r=>r.current);assert.equal(rows[index+1].id,id);
 await click('#next');await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id===${JSON.stringify(id)} && !document.querySelector('#audio').paused`);
}
assert.deepEqual((await state()).history,[ids[0],ids[1],ids[1],ids[2],ids[3]]);
await click('#prev');await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id===${JSON.stringify(ids[2])}`);
await click('#next');await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id===${JSON.stringify(ids[3])}`);
await click('#next');await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id!==${JSON.stringify(ids[3])}`);
cycle.push((await state()).id);for(let i=0;i<3;i++){await click('#next');await delay(80);cycle.push((await state()).id);}assert.equal(new Set(cycle).size,4);
await click('#close-queue');await click('#open-full');await click('#full-more');
assert.equal(await run("document.querySelector('#full-menu-album').textContent"),'查看专辑');assert.equal(await run("document.querySelector('#full-menu-artists button').textContent"),'查看歌手');
await until("!document.querySelector('#full-cache-status').textContent.includes('正在')");
await shot('full-more-402');
// A stored full response reports offline availability; removing it updates the open menu.
const now=await state(),track=tracks.find(t=>t.id===now.id),url='https://raw.githubusercontent.com/Roylyl/Music/main/'+track.src.split('/').map(encodeURIComponent).join('/')+'?v='+encodeURIComponent(track.audioRevision||'initial');
await run(`caches.open('roylyl-music-audio-v2').then(c=>c.put(${JSON.stringify(url)},new Response('abc',{headers:{'Content-Length':'3'}})))`);
await click('#full-more');await click('#full-more');await until("document.querySelector('#full-cache-status').textContent.includes('已完整缓存')");
await run(`caches.open('roylyl-music-audio-v2').then(c=>c.delete(${JSON.stringify(url)}))`);
await click('#full-more');await click('#full-more');await until("document.querySelector('#full-cache-status').textContent==='未完整缓存'");
// Menus lead to real album/artist navigation after closing the full-player layer.
await click('#full-menu-album');await until("!document.querySelector('#full-player').open && !document.querySelector('#album-detail').hidden");
await click('#open-full');await click('#full-more');await click('#full-menu-artists [data-artist-link]');await until(`!document.querySelector('#full-player').open && document.querySelector('#view-title').textContent===${JSON.stringify(track.artist)}`);
}
// Actual media request failure -> one fresh-source retry -> playable recovery.
failMedia=1;let attemptsStart=mediaAttempts.length;
await click('#next');await until("!document.querySelector('#audio').paused && document.querySelector('#audio').src.includes('recovery=')");
assert.equal(new Set(mediaAttempts.slice(attemptsStart)).size,2);assert.equal(await run("document.querySelector('#playback-recovery').hidden"),true);
// Exhaustion ends after one automatic retry, showing explicit actions.
failMedia=-1;attemptsStart=mediaAttempts.length;await click('#next');await until("!document.querySelector('#playback-recovery').hidden");
await delay(650);assert.equal(new Set(mediaAttempts.slice(attemptsStart)).size,2);assert.equal(await run("document.querySelector('#audio').paused"),true);await shot('recovery-402');
// Explicit retry starts a new attempt and clears the recovery actions.
failMedia=0;await click('#retry-playback');await until("!document.querySelector('#audio').paused");assert.equal(await run("document.querySelector('#playback-recovery').hidden"),true);
// A user cancellation during the retry delay must prevent a late restart.
failMedia=-1;attemptsStart=mediaAttempts.length;await click('#next');await until("document.querySelector('#play').getAttribute('aria-label')==='取消重试'");await click('#play');await delay(600);
assert.equal(new Set(mediaAttempts.slice(attemptsStart)).size,1);assert.equal(await run("document.querySelector('#audio').paused"),true);
assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,scope:process.argv.includes('--recovery-only')?'recovery':'all',fixture:'180s WAV media responses; 503 failures and Cache API fixtures are local browser tests',metrics,cycle,errors},null,2));console.log(process.argv.includes('--recovery-only')?'PASS browser: actual media failure, single retry, exhaustion, explicit retry and cancellation.':'PASS browser: no-repeat shuffle+history, independent insertion cancel/clear/undo, six widths, full menu routes, cache status, one retry+exhaustion+cancel.');console.log(out);ws.close();
})().catch(e=>{console.error(e);process.exitCode=1;setTimeout(()=>process.exit(1),100)});
