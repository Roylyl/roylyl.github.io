// Run against a local preview on port8049 and Chrome CDP on port9231.
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const tabs=await(await fetch('http://127.0.0.1:9231/json')).json(),ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let seq=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw r.exceptionDetails;return r.result.value};
 await send('Page.enable');await send('Network.enable');await send('Network.setBypassServiceWorker',{bypass:true});
 await send('Emulation.setDeviceMetricsOverride',{width:402,height:874,deviceScaleFactor:1,mobile:true});await send('Emulation.setTouchEmulationEnabled',{enabled:true});
 await send('Page.navigate',{url:'http://127.0.0.1:8049/music/'});
 for(let i=0;i<100;i++){if(await run(`document.querySelectorAll('#albums .album-card').length>10&&document.querySelectorAll('[data-playlist]').length>=2`))break;await new Promise(r=>setTimeout(r,100))}
 await send('Emulation.setCPUThrottlingRate',{rate:4});
 const selectors=['[data-view="songs"]','[data-view="favorites"]','[data-playlist]:first-child','[data-playlist]:last-child','[data-view="albums"]'];
 for(let round=0;round<Number(process.env.NAV_PERF_ROUNDS??1);round++)for(const selector of selectors){
 const result=await send('Runtime.evaluate',{expression:`new Promise(resolve=>{const t=performance.now();document.querySelector('${selector}').click();const handler=performance.now()-t;requestAnimationFrame(()=>setTimeout(()=>resolve({selector:'${selector}',handler,paint:performance.now()-t,rows:document.querySelectorAll('#songs .track-row').length}),0));})`,awaitPromise:true,returnByValue:true});
 console.log(result.result.value);await new Promise(r=>setTimeout(r,200));
 }

 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 await run(`document.querySelector('[data-view="songs"]').click()`);
 const total=await run(`document.getElementById('songs')._tracks.length`);
 assert(total>800,'complete playback data retained');
 assert(await run(`document.querySelectorAll('#songs .track-row').length`)<80,'initial visual rows are bounded');
 const scrollAndCheck=async fraction=>{
  await run(`window.scrollTo(0,document.documentElement.scrollHeight*${fraction})`);await wait(300);
  assert(await run(`(()=>{const root=document.getElementById('songs');return [...root.children].filter(n=>{const r=n.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).every(n=>n.querySelector('.track-row'))})()`),'visible chunks filled');
 };
 await scrollAndCheck(.5);await scrollAndCheck(1);
 assert.equal(await run(`document.querySelector('#songs .song-chunk:last-child .track-row:last-child').dataset.track`),await run(`document.getElementById('songs')._tracks.at(-1).id`));
 assert.equal(await run(`document.querySelector('#songs .song-chunk:last-child .track-row:last-child .track-no').dataset.number`),String(total));
 await run(`document.querySelector('[data-view="favorites"]').click();document.querySelector('[data-playlist]:first-child').click();document.querySelector('[data-playlist]:last-child').click()`);await wait(250);
 assert(await run(`(()=>{const root=document.getElementById('songs');const ids=new Set(root._tracks.map(t=>t.id));return [...root.querySelectorAll('[data-track]')].every(n=>ids.has(n.dataset.track))})()`),'rapid switching never appends stale rows');
 await run(`window.scrollTo(0,0);document.querySelector('[data-view="songs"]').click()`);
 await run(`document.querySelector('#songs .track-title-play').focus()`);
 assert(await run(`document.querySelector('#songs .song-chunk').nextElementSibling._mounted`),'keyboard focus prepares following rows');
 await run(`const search=document.getElementById('search');search.value='__no_such_track__';search.dispatchEvent(new Event('input'))`);await wait(300);
 assert.equal(await run(`document.getElementById('songs')._tracks.length`),0);
 await run(`document.getElementById('clear-filters').click()`);assert.equal(await run(`document.getElementById('songs')._tracks.length`),total);
 await scrollAndCheck(.5);
 const oldY=await run('scrollY');
 await run(`document.querySelector('[data-view="favorites"]').click()`);
 await run('history.back()');await wait(400);
 assert.equal(await run(`document.getElementById('songs')._tracks.length`),total);
 assert(Math.abs(await run('scrollY')-oldY)<100,'history restores long-list position');
 await scrollAndCheck(0);
 const point=await run(`(()=>{const r=document.querySelector('[data-view="favorites"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
 assert.equal(await run(`document.querySelector('[data-view="favorites"]').classList.contains('is-pressed')`),true);
 await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:point.x,y:point.y-70}]});
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(250);
 assert.equal(await run(`document.querySelector('[data-view="songs"]').getAttribute('aria-current')`),'page','swipe over navigation must not switch views');
 await wait(700);await run('window.scrollTo(0,0)');await wait(200);
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point]});
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(500);
 assert.equal(await run(`document.querySelector('[data-view="favorites"]').getAttribute('aria-current')`),'page');
 assert.equal(await run(`document.querySelector('[data-view="favorites"]').classList.contains('is-pressed')`),false,'press feedback clears after touch');
 console.log('PASS: bounded rendering; complete queue data; middle/end scrolling; row numbering; rapid switching; keyboard continuation; search/reset; history position; touch tap versus swipe.');
 ws.close();
})().catch(e=>{console.error(e);process.exitCode=1;setTimeout(()=>process.exit(1),100)});
