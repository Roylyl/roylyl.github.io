'use strict';
// Uses the actual page and native HTMLAudioElement. Only the OS callback delivery
// is simulated: real MediaSession registrations are captured and then invoked.
// This cannot validate iPhone audio focus, lock-screen appearance or OS delivery.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const root=path.resolve(__dirname,'../..');
const duration=40;
const fixtureTracks=['a','b','c'].map((id,index)=>({id:'native-'+id,title:'Native '+id,artist:'Test',album:'Native playback',albumYear:2026,trackNumber:index+1,discNumber:1,duration,src:`artists/Test/2026 - Native playback/${id}.mp3`,cover:'artists/Test/2026 - Native playback/cover.webp',audioRevision:'fixture'}));
const catalog={version:'native-fixture',tracks:fixtureTracks,appleMusic:{entries:{},playlists:[],favorites:[]},audioProperties:{}};
const wav=Buffer.alloc(44+8000*2*duration);
wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(8000,24);wav.writeUInt32LE(16000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
for(let sample=0;sample<8000*duration;sample++)wav.writeInt16LE(Math.round(Math.sin(sample*2*Math.PI*440/8000)*2048),44+sample*2);
const output=process.env.AUDIT_OUTPUT||'/tmp/roylyl-native-playback-results';
let browser,server,activePage;
const results=[],requests=[];
function loadPlaywright(){
  if(process.env.PLAYWRIGHT_MODULE)return require(process.env.PLAYWRIGHT_MODULE);
  try{return require('playwright');}catch{}
  const bundled=path.join(process.env.HOME,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  return require(bundled);
}
function media(req,res){
  const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');
  const start=range?Number(range[1]):0,end=range?Math.min(Number(range[2]||wav.length-1),wav.length-1):wav.length-1;
  requests.push({path:req.url,range:req.headers.range||'',at:Date.now()});
  res.setHeader('Content-Type','audio/wav');res.setHeader('Accept-Ranges','bytes');
  if(start>=wav.length){res.writeHead(416,{'Content-Range':`bytes */${wav.length}`});res.end();return;}
  if(range){res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${wav.length}`);}
  res.setHeader('Content-Length',end-start+1);res.end(req.method==='HEAD'?undefined:wav.subarray(start,end+1));
}
const instrumentation=()=>{
  if(!/^https?:$/.test(location.protocol))return;
  localStorage.setItem('roylyl-music-audio-budget','0');
  localStorage.setItem('roylyl-music-preload','false');
  const test=window.__nativePlayback={handlers:{},events:[],positions:[],states:[],registrations:[]};
  const session=navigator.mediaSession;
  if(session){
    const register=session.setActionHandler.bind(session);
    session.setActionHandler=(name,handler)=>{test.handlers[name]=handler;test.registrations.push({name,enabled:typeof handler==='function'});return register(name,handler);};
    const publish=session.setPositionState.bind(session);
    session.setPositionState=state=>{test.positions.push({...state,at:performance.now()});return publish(state);};
    const descriptor=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(session),'playbackState');
    if(descriptor?.get&&descriptor?.set)Object.defineProperty(session,'playbackState',{configurable:true,get:()=>descriptor.get.call(session),set:value=>{const audio=document.querySelector('#audio');test.states.push({value,time:audio?.currentTime,at:performance.now()});descriptor.set.call(session,value);}});
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const audio=document.querySelector('#audio');
    for(const name of ['loadstart','loadedmetadata','play','playing','pause','seeking','seeked','waiting','ended','error'])audio.addEventListener(name,()=>test.events.push({name,time:audio.currentTime,seeking:audio.seeking,paused:audio.paused,readyState:audio.readyState,src:audio.currentSrc||audio.src,at:performance.now()}));
  });
};
async function snapshot(page){return page.evaluate(()=>{const a=document.querySelector('#audio'),s=JSON.parse(localStorage.getItem('roy-music:playback')||'null');return {id:s?.id,time:a.currentTime,duration:a.duration,paused:a.paused,seeking:a.seeking,ready:a.readyState,src:a.currentSrc||a.src,system:navigator.mediaSession.playbackState,events:window.__nativePlayback.events,positions:window.__nativePlayback.positions,states:window.__nativePlayback.states,diagnostics:JSON.parse(localStorage.getItem('roy-music:playback-log')||'[]')};});}
async function until(page,predicate,arg){await page.waitForFunction(predicate,arg,{timeout:7000});}
async function action(page,name,detail={}){await page.evaluate(({name,detail})=>{const callback=window.__nativePlayback.handlers[name];if(typeof callback!=='function')throw Error('Missing system handler: '+name);callback(detail);},{name,detail});}
async function seek(page,time,fast=false){
  await action(page,'seekto',{seekTime:time,...(fast?{fastSeek:true}:{})});
  await until(page,target=>{const a=document.querySelector('#audio');return !a.seeking&&Math.abs(a.currentTime-target)<.5;},time);
}
async function advances(page){const before=await page.locator('#audio').evaluate(a=>a.currentTime);await until(page,before=>{const a=document.querySelector('#audio');return !a.paused&&a.currentTime>before+.2;},before);}
async function fresh(context,url){const page=await context.newPage();activePage=page;await page.goto(url);await page.locator('#feature-play').waitFor();await until(page,()=>document.querySelectorAll('.album-card').length===1);await page.locator('#feature-play').click();await advances(page);return page;}
async function check(label,fn){await fn();results.push({label,passed:true});console.log('PASS: '+label);}
(async()=>{
  server=http.createServer((req,res)=>{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname.startsWith('/fixtures/')&&pathname.endsWith('.mp3'))return media(req,res);
    if(pathname==='/music/data/catalog.json'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(catalog));return;}
    if(pathname.startsWith('/music/share-covers/artists/Test/')){res.setHeader('Content-Type','image/svg+xml');res.end('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#557766"/></svg>');return;}
    if(pathname.endsWith('.lrc')){res.writeHead(404);res.end();return;}
    const file=path.join(root,pathname.endsWith('/')?pathname+'index.html':pathname);
    if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
    const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    let body=fs.readFileSync(file);
    // Point only the catalog/audio fixture origin at this local Range server.
    if(file===path.join(root,'music/app.js'))body=body.toString().replace("const ROOT = 'https://raw.githubusercontent.com/Roylyl/Music/main/';",`const ROOT = 'http://127.0.0.1:${server.address().port}/fixtures/';`);
    res.end(body);
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const engine=process.env.BROWSER||'chromium',playwright=loadPlaywright();
  if(!playwright[engine])throw Error('Unknown browser '+engine);
  browser=await playwright[engine].launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
  const context=await browser.newContext({serviceWorkers:'block'});
  const errors=[];context.on('page',page=>page.on('pageerror',error=>errors.push(String(error))));
  await context.addInitScript(instrumentation);
  const url=`http://127.0.0.1:${server.address().port}/music/`;
  let page=await fresh(context,url);
  await check('native audio advances and system track buttons stay enabled',async()=>{
    const controls=await page.evaluate(()=>Object.fromEntries(Object.entries(window.__nativePlayback.handlers).map(([name,value])=>[name,typeof value==='function'])));
    assert.equal(controls.nexttrack,true);assert.equal(controls.previoustrack,true);assert.equal(controls.seekforward,false);assert.equal(controls.seekbackward,false);assert.equal(controls.seekto,true);
    await until(page,()=>navigator.mediaSession.playbackState==='playing');
    assert((await snapshot(page)).states.find(s=>s.value==='playing')?.time>0,'system playing requires actual media clock progress');
  });
  await check('repeated system seeks work while playing and paused, including zero',async()=>{
    for(const time of [12,26,4,0,19]){await seek(page,time,true);await seek(page,time);await advances(page);}
    await action(page,'pause');await until(page,()=>document.querySelector('#audio').paused);
    for(const time of [30,5,0,14]){await seek(page,time);assert.equal((await snapshot(page)).paused,true);}
    const s=await snapshot(page);assert(s.events.filter(e=>e.name==='seeked').length>=9);assert.equal(s.system,'paused');assert(Math.abs(s.positions.at(-1).position-14)<.1);
  });
  await check('paused seek survives system resume with actual clock advancement',async()=>{
    await action(page,'play');await advances(page);const s=await snapshot(page);assert(s.time>=14&&s.time<17);assert.equal(s.id,'native-a');
  });
  await check('native pause then system resume retains loaded source and position',async()=>{
    await seek(page,8);await page.locator('#audio').evaluate(a=>a.pause());await until(page,()=>navigator.mediaSession.playbackState==='paused');
    const before=await snapshot(page),loads=before.events.filter(e=>e.name==='loadstart').length;
    await action(page,'play');await advances(page);const after=await snapshot(page);
    assert(after.time>=before.time&&after.time<before.time+3);assert.equal(after.src,before.src);
    assert.equal(after.events.filter(e=>e.name==='loadstart').length,loads,'a healthy paused source should resume before any reload fallback');
  });
  await check('rapid seeks keep the last target and cannot trigger a stale track end',async()=>{
    await page.evaluate(()=>{for(const time of [40,2,27,11])window.__nativePlayback.handlers.seekto({seekTime:time});});
    await until(page,()=>{const a=document.querySelector('#audio');return !a.seeking&&a.currentTime>=11&&a.currentTime<13;});
    await advances(page);assert.equal((await snapshot(page)).id,'native-a');
  });
  await check('rapid system pause cancels pending resume and cannot restart later',async()=>{
    await page.evaluate(()=>{window.__nativePlayback.handlers.pause();window.__nativePlayback.handlers.play();window.__nativePlayback.handlers.pause();});
    await page.waitForTimeout(300);const s=await snapshot(page);assert.equal(s.paused,true);assert.equal(s.system,'paused');
  });
  await check('seeking to track end while paused must not skip until explicit play',async()=>{
    await seek(page,duration);const s=await snapshot(page);assert.equal(s.id,'native-a');assert.equal(s.paused,true);
    await action(page,'play');await until(page,()=>JSON.parse(localStorage.getItem('roy-music:playback')).id==='native-b');await advances(page);
    await action(page,'previoustrack');await until(page,()=>JSON.parse(localStorage.getItem('roy-music:playback')).id==='native-a');await advances(page);
  });
  await check('natural ended hands off once and next native audio clock advances',async()=>{
    await seek(page,duration-.35);await until(page,()=>JSON.parse(localStorage.getItem('roy-music:playback')).id==='native-b');await advances(page);
    assert.equal((await snapshot(page)).id,'native-b');
  });
  await page.close();
  await context.clearCookies();
  page=await context.newPage();activePage=page;await page.goto(url);
  await page.evaluate(async tracks=>{localStorage.removeItem('roy-music:playback');localStorage.removeItem('roy-music:last');const cache=await caches.open('roylyl-music-audio-v2');for(const t of tracks){const src=location.origin+'/fixtures/'+t.src.split('/').map(encodeURIComponent).join('/')+'?v=fixture';await cache.put(src,await fetch(src));}},fixtureTracks);
  await page.reload();await until(page,()=>document.querySelectorAll('.album-card').length===1);await page.locator('#feature-play').click();await advances(page);
  await check('cached Blob survives native pause and system resume without network reload',async()=>{
    await seek(page,6);await page.locator('#audio').evaluate(a=>a.pause());await until(page,()=>navigator.mediaSession.playbackState==='paused');
    const before=await snapshot(page),requestCount=requests.length;assert.match(before.src,/^blob:/);
    await action(page,'play');await advances(page);const after=await snapshot(page);
    assert.equal(after.src,before.src);assert.equal(requests.length,requestCount);assert(after.time>=6&&after.time<9);
  });
  assert.deepEqual(errors,[]);
  fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({passed:true,engine,fixture:'40s non-silent sine WAV served locally with byte ranges; real audio methods/events, captured MediaSession callback delivery only; no iPhone/OS audio-focus or ServiceWorker validation',results,requests,last:await snapshot(page)},null,2));
  console.log(output);
})().catch(async error=>{
  fs.mkdirSync(output,{recursive:true});let state;try{if(activePage&&!activePage.isClosed())state=await snapshot(activePage);}catch{}
  fs.writeFileSync(path.join(output,'failure.json'),JSON.stringify({error:String(error),results,requests,state},null,2));console.error(error);console.error(output);process.exitCode=1;
}).finally(async()=>{await browser?.close();if(server)await new Promise(resolve=>server.close(resolve));});
