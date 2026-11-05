const fs=require('fs'),assert=require('assert/strict'),path=require('path');
(async()=>{
const width=Number(process.env.MOBILE_WIDTH)||393,height=Number(process.env.MOBILE_HEIGHT)||852;
const endpoint=process.env.CDP_URL||'http://127.0.0.1:9260',url=process.env.MUSIC_URL||'http://127.0.0.1:8059/music/';
const target=await(await fetch(endpoint+'/json/new?about:blank',{method:'PUT'})).json(),ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let seq=0;const pending=new Map(),errors=[],results=[];ws.onmessage=e=>{let m=JSON.parse(e.data);if(m.id){let p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);};
const send=(method,params={})=>new Promise((resolve,reject)=>{let id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const run=async expression=>{let r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description);return r.result.value;};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const until=async e=>{for(let i=0;i<150;i++){if(await run(e))return;await sleep(100);}throw Error('Timed out: '+e);};
const out=process.env.AUDIT_OUTPUT||path.join(require('os').tmpdir(),'roytools-mobile-all-pages');fs.mkdirSync(out,{recursive:true});
async function tap(selector){await run(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);await sleep(70);let r=await run(`(()=>{let e=document.querySelector(${JSON.stringify(selector)}),r=e.getBoundingClientRect(),t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {x:r.x+r.width/2,y:r.y+r.height/2,hit:e===t||e.contains(t),target:t?.outerHTML.slice(0,150)}})()`);assert(r.hit,'blocked '+selector+' '+r.target);await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x,y:r.y}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await sleep(220);}
async function capture(label){await sleep(220);let layout=await run(`(()=>{const r=e=>e.getBoundingClientRect().toJSON();return {title:document.querySelector('#web-title')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,dialogs:[...document.querySelectorAll('dialog[open]')].map(e=>({id:e.id,...r(e)})),menus:[...document.querySelectorAll('.track-more-menu:not([hidden]),#queue-panel:not([hidden]),#full-queue:not([hidden])')].filter(e=>e.getClientRects().length).map(e=>({id:e.id,...r(e)}))}})()`);assert(!layout.overflow,label+' overflow');for(const r of [...layout.dialogs,...layout.menus]){assert(r.x>=-1&&r.right<=width+1,label+' horizontal '+r.id);assert(r.y>=-1&&r.bottom<=height+1,label+' vertical '+r.id);}let shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,label+'.png'),Buffer.from(shot.data,'base64'));results.push({label,...layout});console.log('CHECK',label,layout.title);}
async function home(){await run("window.RoyToolsMusicApp.goHome()");await sleep(220);}
await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setBypassServiceWorker',{bypass:true});await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});await send('Emulation.setTouchEmulationEnabled',{enabled:true});
await send('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('roylyl-music-preload','false');localStorage.setItem('roylyl-music-audio-budget','0');new MutationObserver(()=>{let a=document.querySelector('#audio');if(a){a.muted=true;a.volume=0;}}).observe(document,{childList:true,subtree:true});"});
await send('Page.navigate',{url});await until("!!window.RoyToolsMusicApp&&document.querySelector('#notice').hidden");await capture('01-home');
await tap('[data-music-page=songs]');await capture('02-songs');
for(const [i,id] of ['artist','sort-primary','sort-secondary','sort-direction'].entries()){await tap('#'+id+' + .roytools-select-trigger');await capture('03-filter-'+id);if(i===1)await tap('#web-option-list button:nth-child(2)');else await tap('#web-options [data-close-dialog]');}
await tap('#songs [data-more]');await capture('04-track-menu');await tap('#menu-album');await capture('05-album-from-menu');await tap('#album-detail .artist-link');await capture('06-artist');await tap('#web-back');
await home();await tap('[data-music-page=albums]');await capture('07-albums');await tap('.album-card [data-album]');await capture('08-album');
await home();await tap('[data-music-page=playlists]');await capture('09-playlists');await tap('[data-music-page=favorites]');await capture('10-favorites');await tap('#web-back');
let ids=await run("[...document.querySelectorAll('#fixed-playlists [data-playlist]')].map(e=>e.dataset.playlist)");
for(const [i,id] of ids.entries()){await tap('[data-playlist="'+id+'"]');await capture('11-playlist-'+i);await tap('#web-back');}
await tap('#fixed-playlists [data-playlist]');await tap('#songs .track-title-play');await until("document.body.classList.contains('has-current-track')");await capture('12-mini');await tap('#mobile-queue-toggle');await capture('13-queue');await tap('#close-queue');
await tap('#open-full');await capture('14-player-cover');await tap('#full-lyrics-tab');await capture('15-player-lyrics');await tap('#full-more');await capture('16-player-more');await tap('#open-sleep-timer');await capture('17-timer');await tap('[data-sleep-minutes="30"]');await tap('#full-more');await tap('#open-sleep-timer');await capture('18-timer-active');await tap('#cancel-sleep-timer');await tap('#full-queue-toggle');await capture('19-full-queue');await tap('#full-queue-close');await tap('#close-full');
await home();await tap('[data-music-page=settings]');await capture('20-settings');
for(const id of ['audio-budget','web-theme']){await tap('#'+id+' + .roytools-select-trigger');await capture('21-'+id);await tap('#web-options [data-close-dialog]');}
for(const id of ['clear-audio-cache','clear-lyric-cache','clear-cover-cache']){await tap('#'+id);await capture('22-'+id);await tap('#web-confirm [data-close-dialog]');}
await tap('[data-setting-action=clearAll]');await capture('23-clear-all');await tap('#web-confirm [data-close-dialog]');
await tap('[data-setting-action=openDownloads]');await capture('24-downloads-empty');await tap('#web-back');
await tap('#copy-playback-diagnostics');assert(await run("document.querySelector('#playback-diagnostics-status').textContent.length>0"));await capture('25-diagnostics');
await tap('#check-web-update');await capture('26-install-update');
await tap('[data-setting-action=checkCatalog]');await until("!document.querySelector('[data-setting-action=checkCatalog]').disabled");
await run("document.querySelector('#web-theme').value='dark';document.querySelector('#web-theme').dispatchEvent(new Event('change'))");await capture('27-settings-dark');
await run("document.querySelector('#audio').pause()");
assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log('PASS',results.length,'mobile page/modal states, touch hit targets, bounds and no runtime errors');ws.close();
})().catch(e=>{console.error(e);process.exit(1)});
