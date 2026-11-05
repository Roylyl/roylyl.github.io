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
await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setBypassServiceWorker',{bypass:false});
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await send('Emulation.setTouchEmulationEnabled',{enabled:false});await send('Page.navigate',{url});await until("document.querySelector('.album-card')&&window.RoyToolsMusicApp");
assert(await run("!!document.querySelector('.sidebar')&&document.querySelector('#music-home').hidden"));
await tap('.desktop-settings');assert(await run("document.querySelector('#desktop-settings-modal').open"));
console.log('DESKTOP SETTINGS',await run("[...document.querySelectorAll('.settings-section h3')].map(x=>x.textContent)"));
for(const action of ['downloadAll','downloadLyrics','downloadCovers','openDownloads','clearAll','checkCatalog'])assert(await run("!!document.querySelector('[data-setting-action="+action+"]')"));
assert(await run("!!document.querySelector('#copy-playback-diagnostics')&&!!document.querySelector('#check-web-update')"));
for(const theme of ['light','dark']){
 await run("document.querySelector('#web-theme').value='"+theme+"';document.querySelector('#web-theme').dispatchEvent(new Event('change'))");await sleep(150);
 console.log(theme,await run("({bg:getComputedStyle(document.body).backgroundColor,blue:getComputedStyle(document.documentElement).getPropertyValue('--blue'),sidebar:document.querySelector('.sidebar').getBoundingClientRect().width,settings:document.querySelector('#desktop-settings-modal').getBoundingClientRect().toJSON()})"));
 let shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,'desktop-settings-'+theme+'.png'),Buffer.from(shot.data,'base64'));
}
await tap('[data-setting-action=openDownloads]');await until("document.querySelector('#view-title').textContent==='已下载曲目'");assert(await run("!document.querySelector('#desktop-settings-modal').open&&!document.querySelector('#desktop-download-back').hidden"));await tap('#desktop-download-back');assert(await run("document.querySelector('#desktop-settings-modal').open"));
await run("window.RoyToolsMusicApp.settings('budget',-1)");
for(const action of ['downloadAll','downloadLyrics','downloadCovers']){
 await tap('[data-setting-action='+action+']');await until("document.querySelector('#web-download').open");
 console.log('DESKTOP DOWNLOAD',action,await run("document.querySelector('#web-download-title').textContent"));
 if(await run("!document.querySelector('#web-download-cancel').disabled")){await tap('#web-download-cancel');await until("document.querySelector('#web-download-cancel').disabled");}
 await tap('#web-download-background');assert(await run("document.querySelector('#desktop-settings-modal').open"));
}
await tap('#close-settings');await sleep(200);let shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,'desktop-layout.png'),Buffer.from(shot.data,'base64'));
assert.deepEqual(errors,[]);console.log('PASS shared desktop settings and original desktop layout');ws.close();
})().catch(e=>{console.error(e);process.exit(1)});