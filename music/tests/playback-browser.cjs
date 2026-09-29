const fs=require('fs'),assert=require('assert/strict');
const out=process.env.AUDIT_OUTPUT||'/tmp/roylyl-player-next-results';fs.mkdirSync(out,{recursive:true});
(async()=>{
const tabs=await(await fetch((process.env.CDP_URL||'http://127.0.0.1:9231')+'/json')).json(),ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map(),errors=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const wav=Buffer.alloc(44+8000*2*180);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(8000,24);wav.writeUInt32LE(16000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Fetch.requestPaused'){const p=m.params,range=p.request.headers.Range||p.request.headers.range;let body=wav,code=200;const headers=[{name:'Content-Type',value:'audio/wav'},{name:'Access-Control-Allow-Origin',value:'*'},{name:'Accept-Ranges',value:'bytes'}];const parts=/bytes=(\d+)-(\d*)/.exec(range||'');if(parts){const start=Number(parts[1]),end=Math.min(Number(parts[2]||wav.length-1),wav.length-1);body=wav.subarray(start,end+1);code=206;headers.push({name:'Content-Range',value:`bytes ${start}-${end}/${wav.length}`});}headers.push({name:'Content-Length',value:String(body.length)});send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:code,responseHeaders:headers,body:body.toString('base64')}).catch(e=>errors.push(String(e)));}};
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
const delay=ms=>new Promise(r=>setTimeout(r,ms));const until=async expression=>{for(let i=0;i<100;i++){if(await run(expression))return;await delay(100);}throw Error('Timeout '+expression);};
const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/'+name+'.png',Buffer.from(r.data,'base64'));};
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setBypassServiceWorker',{bypass:true});
await send('Fetch.enable',{patterns:[{urlPattern:'https://raw.githubusercontent.com/Roylyl/Music/main/*.mp3*',requestStage:'Request'}]});
await send('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('roylyl-music-audio-budget','0');localStorage.setItem('roylyl-music-preload','false');"});
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:process.env.MUSIC_URL||'http://127.0.0.1:8049/music/'});await until("document.querySelectorAll('.album-card').length>0");
await run("localStorage.removeItem('roy-music:playback');localStorage.removeItem('roy-music:last');localStorage.removeItem('roy-music:playback-log')");
await send('Page.reload');await until("document.querySelectorAll('.album-card').length>0");await run("document.querySelector('[data-view=songs]').click()");
const ids=await run("[...document.querySelectorAll('#songs [data-track]')].slice(0,3).map(n=>n.dataset.track)");assert.equal(ids.length,3);
await run("document.querySelector('#songs .track-art-play').click()");await until("!document.querySelector('#audio').paused && document.querySelector('#audio').currentTime>0");
const add=id=>run(`document.querySelector('#songs [data-next=${JSON.stringify(id)}]').click()`);
await add(ids[1]);await add(ids[2]);
const saved=await run("JSON.parse(localStorage.getItem('roy-music:playback'))");assert.deepEqual(saved.nextUp,[ids[2],ids[1]]);assert.equal(saved.id,ids[0]);
await run("document.querySelector('#queue-toggle').click()");
assert.deepEqual((await run("[...document.querySelectorAll('#queue-list [data-track]')].slice(0,3).map(n=>n.dataset.track)")),[ids[0],ids[2],ids[1]]);
await shot('desktop-queue');await run("document.querySelector('#close-queue').click();document.querySelector('#next').click()");
await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id===${JSON.stringify(ids[2])} && !document.querySelector('#audio').paused`);
await run("document.querySelector('#next').click()");await until(`JSON.parse(localStorage.getItem('roy-music:playback')).id===${JSON.stringify(ids[1])}`);
// Preserve pending insertions, shuffle mode and paused seek through reload.
await run("document.querySelector('#repeat').click()");await add(ids[0]);await add(ids[2]);
await run("document.querySelector('#play').click();document.querySelector('#seek').value=40;document.querySelector('#seek').dispatchEvent(new Event('input'))");
const before=await run("JSON.parse(localStorage.getItem('roy-music:playback'))");assert.equal(before.time,72);assert.equal(before.repeat,'shuffle');
await run("document.dispatchEvent(new Event('visibilitychange'))");assert.equal(await run("document.querySelector('#audio').currentTime"),72);
const logs=await run("JSON.parse(localStorage.getItem('roy-music:playback-log')).length");assert(logs>0);
await send('Page.reload');await until(`document.querySelector('#now-title').textContent.length>0 && document.querySelectorAll('.album-card').length>0`);
assert.equal(await run("document.querySelector('#audio').paused"),true);assert.equal(await run("document.querySelector('#audio').getAttribute('src')"),null);assert.equal(await run("document.querySelector('#elapsed').textContent"),'1:12');
assert.deepEqual(await run("JSON.parse(localStorage.getItem('roy-music:playback'))"),before);
assert((await run("JSON.parse(localStorage.getItem('roy-music:playback-log')).length"))>=logs);
await run("document.querySelector('#play').click()");await until("!document.querySelector('#audio').paused && document.querySelector('#audio').currentTime>=72");assert((await run("document.querySelector('#audio').currentTime"))<75);
// Native history must close only the fullscreen layer and restore it on forward.
await run("document.querySelector('#play').click();document.querySelector('#open-full').click()");await until("document.querySelector('#full-player').open");
await run('history.back()');await until("!document.querySelector('#full-player').open");
await run('history.forward()');await until("document.querySelector('#full-player').open");
await run("document.querySelector('#close-full').click()");await until("!document.querySelector('#full-player').open");
await run("document.querySelector('[data-view=songs]').click()");
const metrics=[];
for(const width of [1440,700,402,375,320]){
await send('Emulation.setDeviceMetricsOverride',{width,height:width>700?1000:874,deviceScaleFactor:1,mobile:width<=700});await delay(150);
await run("scrollTo(0,document.querySelector('#songs').getBoundingClientRect().top+scrollY-100)");
const m=await run(`(()=>{const row=document.querySelector('#songs [data-track]'),box=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right};};return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,row:box(row),copy:box(row.querySelector('.track-copy')),next:box(row.querySelector('[data-next]')),heart:box(row.querySelector('[data-like]')),more:box(row.querySelector('[data-more]'))}})()`);
assert.equal(m.overflow,false,width+': overflow');assert(m.next.w>=44&&m.next.h>=44);assert(m.copy.right<=m.next.x+1,width+': controls overlap copy');assert(m.next.right<=m.heart.x+1,width+': next overlaps heart');assert(m.heart.right<=m.more.x+1,width+': heart overlaps more');metrics.push(m);await shot('list-'+width);
}
// A mobile next button must not start the row, while a row blank tap still does.
await send('Emulation.setDeviceMetricsOverride',{width:402,height:874,deviceScaleFactor:1,mobile:true});await delay(100);
const playingBefore=await run("document.querySelector('#now-title').textContent");await add(ids[0]);assert.equal(await run("document.querySelector('#now-title').textContent"),playingBefore);assert(await run("document.querySelector('#audio').paused"));
await run(`document.querySelector('#songs [data-track=${JSON.stringify(ids[0])}]').click()`);await until("!document.querySelector('#audio').paused");
await run("document.querySelector('#play').click()");
assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,fixture:'180s WAV response replaces MP3 only in this browser session; tests page and native audio lifecycle, not remote MP3 availability',metrics,errors},null,2));console.log('PASS browser: real page/audio element, LIFO, insertion isolation, queue display, pause-seek, refresh context+diagnostics, fullscreen history, 5 viewport layouts.');console.log(out);ws.close();
})().catch(e=>{console.error(e);process.exitCode=1;setTimeout(()=>process.exit(1),100)});
