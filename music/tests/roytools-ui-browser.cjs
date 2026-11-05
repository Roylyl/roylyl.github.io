const fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const pages=await(await fetch((process.env.CDP_URL||'http://127.0.0.1:9231')+'/json')).json();
 const fresh=await(await fetch((process.env.CDP_URL||'http://127.0.0.1:9231')+'/json/new?about:blank',{method:'PUT'})).json();const ws=new WebSocket(fresh.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
 let seq=0;const pending=new Map(),errors=[];
 ws.onmessage=e=>{let m=JSON.parse(e.data);if(m.id){let p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);};
 const send=(method,params={})=>new Promise((resolve,reject)=>{let id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const run=async expression=>{let r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description);return r.result.value;};
 const until=async expression=>{for(let i=0;i<100;i++){if(await run(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('roylyl-music-preload','false');localStorage.setItem('roylyl-music-audio-budget','0');document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#audio').muted=true;document.querySelector('#audio').volume=0;});"});
 await send('Emulation.setDeviceMetricsOverride',{width:393,height:852,deviceScaleFactor:1,mobile:true});
 await send('Page.navigate',{url:process.env.MUSIC_URL||'http://127.0.0.1:8037/music/'});
 await until("!!window.RoyToolsMusicApp && document.querySelector('#music-home:not([hidden])')");
 await until("document.querySelector('#notice').hidden");
 console.log('HOME',await run("({entries:[...document.querySelectorAll('#music-home strong')].map(x=>x.textContent),theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>innerWidth})"));
 await run("document.querySelector('[data-music-page=songs]').click()");await until("document.querySelectorAll('.track-row').length>0");
 await run("document.querySelector('.roytools-select-trigger').click()");
 assert(await run("document.querySelector('#web-options').open"));
 await run("document.querySelector('#web-options [data-close-dialog]').click()");
 await run("document.querySelector('[data-more]').click()");assert(await run("!document.querySelector('#track-more-menu').hidden"));
 console.log('SONGS',await run("({rows:document.querySelectorAll('.track-row').length,menu:document.querySelector('#track-more-menu').textContent,overflow:document.documentElement.scrollWidth>innerWidth})"));
 await run("document.querySelector('#web-back').click();document.querySelector('#web-home').click();document.querySelector('[data-music-page=settings]').click()");
 await until("!document.querySelector('#settings-dialog').hidden");
 console.log('SETTINGS',await run("({headings:[...document.querySelectorAll('.settings-section h3')].map(x=>x.textContent),overflow:document.documentElement.scrollWidth>innerWidth})"));
 const out=process.env.AUDIT_OUTPUT||require('path').join(require('os').tmpdir(),'roytools-web-parity');fs.mkdirSync(out,{recursive:true});
 for(const width of [320,393,700,1024,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<=700});
  for(const theme of ['light','dark']){
   await run(`document.querySelector('#web-theme').value='${theme}';document.querySelector('#web-theme').dispatchEvent(new Event('change'))`);
   assert.equal(await run('document.documentElement.scrollWidth>innerWidth'),false,'settings overflow '+width);
   const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${out}/settings-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
  }
 }
 
 await send('Emulation.setDeviceMetricsOverride',{width:393,height:852,deviceScaleFactor:1,mobile:true});
 await run("document.querySelector('#web-home').click();document.querySelector('[data-music-page=playlists]').click()");
 await until("document.querySelector('#fixed-playlists [data-playlist]')");
 await run("document.querySelector('#fixed-playlists [data-playlist]').click()");
 await until("document.querySelector('#songs .track-title-play')");
 await run("document.querySelector('#audio').muted=true;document.querySelector('#audio').volume=0;document.querySelector('#songs .track-title-play').click();document.querySelector('#open-full').click()");
 await until("document.querySelector('#full-player').open");
 console.log('FIRST_TRACK',await run("({duration:document.querySelector('#full-duration').textContent,disabled:document.querySelector('#full-seek').disabled})"));
 assert.equal(await run("document.querySelector('#full-seek').disabled"),false);
 await until("document.querySelector('#audio').currentTime>0");
 const baseline=await run("document.querySelector('#audio').currentTime"),targetFraction=baseline>100?.2:.65;
 const seek=await run("document.querySelector('#full-seek').getBoundingClientRect().toJSON()");
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:seek.x+20,y:seek.y+seek.height/2,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:seek.x+seek.width*targetFraction,y:seek.y+seek.height/2,button:'left',buttons:1});
 const drag=await run("({position:document.querySelector('#audio').currentTime,duration:document.querySelector('#audio').duration,preview:document.querySelector('#full-elapsed').textContent,value:Number(document.querySelector('#full-seek').value)})");
 console.log('DRAG_PREVIEW',drag);assert(Math.abs(drag.position-baseline)<3);assert(Math.abs(drag.value-targetFraction*100)<3);
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:seek.x+seek.width*targetFraction,y:seek.y+seek.height/2,button:'left',clickCount:1});
 await until("Math.abs(document.querySelector('#audio').currentTime-document.querySelector('#audio').duration*"+(drag.value/100)+")<8");
 console.log('RELEASE',await run("({position:document.querySelector('#audio').currentTime,preview:document.querySelector('#full-elapsed').textContent})"));
 await run("document.querySelector('#audio').pause();document.querySelector('#close-full').click()");
 await until("!document.querySelector('#full-player').open");
 const before=await run("document.querySelector('.player').getBoundingClientRect().toJSON()");
 await run("document.querySelector('#web-back').click()");
 const during=await run("document.querySelector('.player').getBoundingClientRect().toJSON()");assert.equal(before.y,during.y);assert.equal(before.x,during.x);
 await run("document.querySelector('#web-home').click();document.querySelector('[data-music-page=settings]').click();document.querySelector('[data-setting-action=openDownloads]').click()");
 await until("document.querySelector('#web-title').textContent==='已下载曲目'");
 await run("document.querySelector('#web-back').click()");await until("document.querySelector('#web-title').textContent==='音乐设置'");
 assert.deepEqual(errors,[]);console.log('PASS responsive settings, themes, home, songs, filters, track menus; no JS errors');ws.close();
})().catch(e=>{console.error(e);process.exit(1)});
