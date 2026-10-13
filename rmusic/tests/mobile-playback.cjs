#!/usr/bin/env node
// Focused mobile PWA layout and native-audio Media Session checks.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
function loadPlaywright() {
  if (process.env.RMUSIC_PLAYWRIGHT_PATH) return require(process.env.RMUSIC_PLAYWRIGHT_PATH);
  try { return require('playwright'); }
  catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  }
}
const { chromium } = loadPlaywright();
const base = process.env.RMUSIC_QA_URL || 'http://127.0.0.1:8766/rmusic/';
const defaultChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executable = process.env.RMUSIC_CHROME_PATH || (process.platform === 'darwin' && fs.existsSync(defaultChrome) ? defaultChrome : undefined);
const siteRoot = path.resolve(__dirname, '../..');
const catalog = JSON.parse(fs.readFileSync(path.join(siteRoot, 'music/data/catalog.json'), 'utf8'));
const tracks = catalog.tracks.filter(t => t.artist === 'Beyond' && t.album === '惊喜').sort((a,b) => a.discNumber-b.discNumber || a.trackNumber-b.trackNumber);
assert.ok(tracks.length > 1);
const report = { base, checks: [], failures: [], errors: [], runs: [], limits: 'Chromium engine with iPhone Safari user agent, touch, standalone JavaScript and real CSS env safe-area overrides. Media Session callbacks are simulated; no physical iPhone, Safari/WebKit, background or lock-screen proof.' };
const safe = { top: 59, bottom: 34, left: 0, right: 0 };
function audioFixture(seconds=30) {
  const rate=22050, dataBytes=rate*seconds*2, wav=Buffer.alloc(44+dataBytes);
  wav.write('RIFF');wav.writeUInt32LE(36+dataBytes,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);
  wav.writeUInt32LE(rate,24);wav.writeUInt32LE(rate*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(dataBytes,40);
  for(let i=0;i<rate*seconds;i++)wav.writeInt16LE(Math.round(.13*32767*Math.sin(2*Math.PI*220*i/rate)),44+i*2);
  return wav;
}
const wav=audioFixture();
async function check(name,action) { try{await action();report.checks.push(name);console.log('PASS: '+name);return true;}catch(error){report.failures.push({name,error:error.stack});console.log('FAIL: '+name+': '+error.message);return false;} }
async function openPage(browser,width,iphone=true) {
  const context=await browser.newContext({viewport:{width,height:iphone?844:960},isMobile:iphone,hasTouch:iphone,deviceScaleFactor:1,locale:'zh-CN',colorScheme:'dark',serviceWorkers:'block',...(iphone?{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'}:{})});
  await context.addInitScript(iphone=>{
    if(iphone){
    Object.defineProperty(navigator,'standalone',{configurable:true,get:()=>true});
    const match=window.matchMedia.bind(window);
    window.matchMedia=query=>{
      const result=match(query);
      if(!/display-mode\s*:\s*standalone/.test(query))return result;
      return new Proxy(result,{get(target,key){if(key==='matches')return true;const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;}});
    };
    }
    window.__mobileQA={handlers:{},events:[],positions:[],mediaElementSourceCalls:0};
    const bind=navigator.mediaSession.setActionHandler.bind(navigator.mediaSession);
    navigator.mediaSession.setActionHandler=(name,handler)=>{window.__mobileQA.handlers[name]=handler;return bind(name,handler);};
    const position=navigator.mediaSession.setPositionState.bind(navigator.mediaSession);
    navigator.mediaSession.setPositionState=value=>{if(value)window.__mobileQA.positions.push({...value});return position(value);};
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(AudioContextClass){const original=AudioContextClass.prototype.createMediaElementSource;AudioContextClass.prototype.createMediaElementSource=function(element){window.__mobileQA.mediaElementSourceCalls++;return original.call(this,element);};}
    for(const name of ['loadedmetadata','playing','pause','seeked','ended','error'])document.addEventListener(name,event=>{if(event.target instanceof HTMLAudioElement)window.__mobileQA.events.push({name,time:event.target.currentTime,src:event.target.currentSrc,error:event.target.error?.code||null});},true);
  },iphone);
  await context.route('https://raw.githubusercontent.com/Roylyl/Music/**',async route=>{
    const url=new URL(route.request().url());
    if(/\.mp3$/i.test(url.pathname)){
      const range=route.request().headers().range?.match(/^bytes=(\d+)-(\d*)$/),start=range?Number(range[1]):0,end=range?.[2]?Math.min(Number(range[2]),wav.length-1):wav.length-1;
      return route.fulfill({status:range?206:200,contentType:'audio/wav',headers:{'Access-Control-Allow-Origin':'*','Accept-Ranges':'bytes',...(range?{'Content-Range':`bytes ${start}-${end}/${wav.length}`}:{})},body:wav.subarray(start,end+1)});
    }
    if(/\.lrc$/i.test(url.pathname))return route.fulfill({status:200,contentType:'text/plain',body:''});
    return route.continue();
  });
  const page=await context.newPage();page.setDefaultTimeout(10000);
  page.on('pageerror',e=>report.errors.push({width,text:e.message}));page.on('console',m=>{if(m.type()==='error')report.errors.push({width,text:m.text()});});
  const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:safe});
  await page.goto(new URL('?track='+encodeURIComponent(tracks[0].id)+'#player',base).href,{waitUntil:'domcontentloaded'});
  await page.locator('#app-splash').waitFor({state:'hidden'});
  await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc&&a.readyState>=1));
  return{context,page};
}
async function playerLayout(page,width,measureOnly=false) {
  await page.waitForTimeout(250);
  const layout=await page.evaluate(()=>{
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
    const back=[...document.querySelectorAll('button[aria-label="返回主页"]')].find(e=>getComputedStyle(e).pointerEvents!=='none');
    const bar=document.querySelector('[data-rmusic-player-bar],[data-ponder="player-bar"]');
    const toggle=document.querySelector('[data-testid="panel-toggle"] button');
    const toast=document.querySelector('[data-rmusic-status-toast]');
    const probe=document.createElement('i');probe.style.cssText='position:fixed;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)';document.body.append(probe);
    const env={top:parseFloat(getComputedStyle(probe).paddingTop),bottom:parseFloat(getComputedStyle(probe).paddingBottom)};probe.remove();
    const visibleBars=[...document.querySelectorAll('[data-rmusic-player-bar],[data-ponder="player-bar"]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden';}).length;
    const buttonLabels=bar?[...bar.querySelectorAll('button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;}).map(e=>e.getAttribute('aria-label')||e.title||e.innerText):[];
    return{back:back?rect(back):null,bar:bar?rect(bar):null,barRadius:bar?getComputedStyle(bar).borderRadius:null,visibleBars,buttonLabels,toggle:toggle?rect(toggle):null,toast:toast?rect(toast):null,env,standalone:navigator.standalone,displayMode:matchMedia('(display-mode: standalone)').matches,touch:navigator.maxTouchPoints,viewport:{width:innerWidth,height:innerHeight},overflow:document.documentElement.scrollWidth>innerWidth};
  });
  const screenshot=`/tmp/rmusic-mobile-pwa-player-${width}.png`;await page.screenshot({path:screenshot});
  report.runs.push({type:'player-layout',width,layout,screenshot});console.log('LAYOUT: '+JSON.stringify({width,layout}));
  if(measureOnly)return;
  assert.deepEqual(layout.env,{top:safe.top,bottom:safe.bottom});assert.equal(layout.standalone,true);assert.equal(layout.displayMode,true);assert.ok(layout.touch>0);
  assert.ok(layout.back,'Touch PWA back button is hidden');assert.ok(layout.back.y>=safe.top,'Back button intrudes into status-bar safe area');
  assert.ok(layout.bar,'Missing player bar');assert.ok(layout.bar.height<=110,'Mobile player bar remains too tall');
  assert.equal(layout.visibleBars,1,'More than one mobile player bar is visible');
  assert.ok(layout.buttonLabels.some(label=>/上一/.test(label))&&layout.buttonLabels.some(label=>/下一/.test(label)),'Mobile previous/next buttons are not visible');
  assert.ok(layout.bar.bottom<=layout.viewport.height-safe.bottom+.5,'Player bar intrudes into home indicator safe area');
  assert.ok(layout.bar.x>=0&&layout.bar.right<=width+.5,'Player bar extends outside viewport');assert.equal(layout.overflow,false);
  if(layout.toast){assert.ok(layout.toast.y>=safe.top,'Toast intrudes into status-bar safe area');assert.ok(layout.toast.x>=0&&layout.toast.right<=width+.5,'Toast extends outside viewport');}
  if(layout.toggle){assert.ok(layout.toggle.x>=0&&layout.toggle.right<=width+.5,'Side-panel toggle extends outside viewport');const overlap=Math.min(layout.bar.right,layout.toggle.right)-Math.max(layout.bar.x,layout.toggle.x)>1&&Math.min(layout.bar.bottom,layout.toggle.bottom)-Math.max(layout.bar.y,layout.toggle.y)>1;assert.equal(overlap,false,'Player bar overlaps side-panel toggle');}
}
async function nativeMediaControls(page) {
  const bar=page.locator('[data-rmusic-player-bar],[data-ponder="player-bar"]').first();
  const play=bar.locator('button').filter({has:page.locator('svg.lucide-play')}).first();
  await play.tap();
  await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>.3));
  assert.equal(await page.evaluate(()=>document.querySelectorAll('audio').length),1,'iOS native path should use a single audio element');
  assert.equal(await page.evaluate(()=>window.__mobileQA.mediaElementSourceCalls),0,'iOS native audio was routed through a MediaElementSource');
  assert.ok(await page.evaluate(()=>window.__mobileQA.handlers.seekforward===null&&window.__mobileQA.handlers.seekbackward===null));
  const playingHeight=await bar.evaluate(e=>e.getBoundingClientRect().height);assert.ok(playingHeight<=110);
  const first=await page.evaluate(()=>[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentSrc);
  await page.evaluate(()=>window.__mobileQA.handlers.nexttrack({action:'nexttrack'}));
  await page.waitForFunction(src=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc&&a.currentSrc!==src&&!a.paused&&a.currentTime>.3),first);
  await page.waitForFunction(title=>navigator.mediaSession.metadata?.title===title,tracks[1].title);
  await page.evaluate(()=>window.__mobileQA.handlers.previoustrack({action:'previoustrack'}));
  await page.waitForFunction(src=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc===src&&!a.paused&&a.currentTime>.3),first);
  await page.waitForFunction(title=>navigator.mediaSession.metadata?.title===title,tracks[0].title);
  const pauseCount=await page.evaluate(()=>window.__mobileQA.events.filter(e=>e.name==='pause').length);
  await page.evaluate(()=>window.__mobileQA.handlers.pause({action:'pause'}));
  await page.waitForFunction(count=>window.__mobileQA.events.filter(e=>e.name==='pause').length>count&&navigator.mediaSession.playbackState==='paused',pauseCount);
  await page.waitForFunction(()=>[...document.querySelectorAll('audio')].filter(a=>a.currentSrc).every(a=>a.paused));
  await page.evaluate(()=>window.__mobileQA.handlers.play({action:'play'}));
  await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>.6));
  // Safari versions without this optional API must still receive track metadata.
  await page.evaluate(()=>{navigator.mediaSession.metadata=null;navigator.mediaSession.setPositionState=undefined;window.__mobileQA.handlers.nexttrack({action:'nexttrack'});});
  await page.waitForFunction(title=>navigator.mediaSession.metadata?.title===title,tracks[1].title);
  await page.waitForFunction(src=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc!==src&&!a.paused&&a.currentTime>.3),first);
  const media=await page.evaluate(()=>({title:navigator.mediaSession.metadata?.title,state:navigator.mediaSession.playbackState,events:window.__mobileQA.events,positions:window.__mobileQA.positions,mediaElementSourceCalls:window.__mobileQA.mediaElementSourceCalls,withoutSetPositionState:typeof navigator.mediaSession.setPositionState==='undefined'}));
  assert.ok(media.events.filter(e=>e.name==='playing').length>=3);assert.ok(media.events.some(e=>e.name==='pause'));assert.ok(media.events.every(e=>e.name!=='error'));
  report.runs.push({type:'native-media-session',media});
  await page.evaluate(()=>window.__mobileQA.handlers.pause({action:'pause'}));
  await page.waitForTimeout(250);const pausedHeight=await bar.evaluate(e=>e.getBoundingClientRect().height);
  assert.ok(pausedHeight<=110&&Math.abs(pausedHeight-playingHeight)<=4,'Pause expands the mobile player bar');
  report.runs.push({type:'pause-size',playingHeight,pausedHeight});
}
async function cardMetadata(page,width) {
  const back=page.getByRole('button',{name:'返回主页',exact:true}).first();await back.tap();
  const search=page.getByPlaceholder('搜索歌曲、专辑或歌手');await search.fill(tracks[0].title);await search.press('Enter');
  await page.getByRole('button',{name:tracks[0].album,exact:true}).first().tap();
  const collection=page.locator('[data-library-surface="collection"]');await collection.waitFor();
  await collection.locator('.theme-polaroid-card').first().waitFor();await page.waitForTimeout(650);
  const geometry=await collection.locator('.theme-polaroid-card').evaluateAll((cards,album)=>{
    for(const card of cards){const r=card.getBoundingClientRect();if(r.x<0||r.right>innerWidth||r.width<=0)continue;const label=[...card.querySelectorAll('span')].find(e=>e.textContent.trim()===album);if(!label)continue;const a=label.getBoundingClientRect();return{cardWidth:r.width,metadataWidth:a.width,label:label.textContent,title:card.innerText};}return null;
  },tracks[0].album);
  const screenshot=`/tmp/rmusic-mobile-pwa-cards-${width}.png`;await page.screenshot({path:screenshot});report.runs.push({type:'card-metadata',width,geometry,screenshot});
  if(!geometry)report.cardDebug=await collection.locator('.theme-polaroid-card').evaluateAll(cards=>cards.map(c=>({text:c.innerText,width:c.getBoundingClientRect().width,x:c.getBoundingClientRect().x,right:c.getBoundingClientRect().right,spans:[...c.querySelectorAll('span')].map(e=>e.textContent)})));
  assert.ok(geometry,'No visible album metadata sample');assert.ok(geometry.metadataWidth>=Math.min(120,(geometry.cardWidth-24)*.7),'Album metadata is narrowed by the action buttons');
  await page.locator('[data-rmusic-player-bar]').waitFor({state:'visible'});
  const action=await page.getByTestId('grid-list-search-button').locator('button').boundingBox();
  const transport=await page.locator('[data-rmusic-player-bar]').boundingBox();
  assert.ok(action&&transport,'Collection controls are missing');
  assert.ok(action.x>=0&&action.x+action.width<=width+.5,'Collection action extends outside viewport');
  assert.ok(action.y+action.height<=transport.y-8,'Collection action overlaps the player bar');
}
async function consecutiveNativeEnds(page) {
  await page.evaluate(()=>window.__mobileQA.handlers.play({action:'play'}));
  await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>.1));
  const steps=[];
  for(const expected of [tracks[2],tracks[3]]){
    const before=await page.evaluate(()=>({src:[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentSrc,ended:window.__mobileQA.events.filter(e=>e.name==='ended').length}));
    await page.evaluate(()=>{const audio=[...document.querySelectorAll('audio')].find(a=>!a.paused);audio.currentTime=Math.max(0,audio.duration-.1);});
    await page.waitForFunction(count=>window.__mobileQA.events.filter(e=>e.name==='ended').length>count,before.ended);
    await page.waitForFunction(src=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc&&a.currentSrc!==src&&!a.paused&&a.currentTime>.2),before.src);
    await page.waitForFunction(title=>navigator.mediaSession.metadata?.title===title,expected.title);
    steps.push(await page.evaluate(()=>({title:navigator.mediaSession.metadata?.title,src:[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentSrc,time:[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentTime,ended:window.__mobileQA.events.filter(e=>e.name==='ended').length})));
  }
  assert.notEqual(steps[0].src,steps[1].src);report.runs.push({type:'consecutive-native-ended',trigger:'Set the real audio currentTime just before duration; wait for native ended',steps});
  await page.evaluate(()=>window.__mobileQA.handlers.pause({action:'pause'}));
}
async function desktopSmoke(browser) {
  const{context,page}=await openPage(browser,1440,false);
  try{
    const play=page.locator('[data-rmusic-player-bar],[data-ponder="player-bar"]').first().locator('button').filter({has:page.locator('svg.lucide-play')}).first();await play.click();
    await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>.3));
    const first=await page.evaluate(()=>[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentSrc);
    await page.evaluate(()=>window.__mobileQA.handlers.nexttrack({action:'nexttrack'}));
    await page.waitForFunction(src=>[...document.querySelectorAll('audio')].some(a=>a.currentSrc!==src&&a.currentSrc&&!a.paused&&a.currentTime>.3),first);
    await page.waitForFunction(title=>navigator.mediaSession.metadata?.title===title,tracks[1].title);
    await page.evaluate(()=>window.__mobileQA.handlers.pause({action:'pause'}));await page.waitForFunction(()=>[...document.querySelectorAll('audio')].filter(a=>a.currentSrc).every(a=>a.paused));
    await page.evaluate(()=>window.__mobileQA.handlers.play({action:'play'}));await page.waitForFunction(()=>[...document.querySelectorAll('audio')].some(a=>!a.paused&&a.currentTime>.6));
    const media=await page.evaluate(()=>({title:navigator.mediaSession.metadata?.title,time:[...document.querySelectorAll('audio')].find(a=>!a.paused)?.currentTime,mediaElementSourceCalls:window.__mobileQA.mediaElementSourceCalls,audioCount:document.querySelectorAll('audio').length}));
    assert.ok(media.mediaElementSourceCalls>0,'Desktop did not exercise its WebAudio route');report.runs.push({type:'desktop-smoke',media});
  }finally{await context.close();}
}
async function run() {
  const browser=await chromium.launch({...(executable?{executablePath:executable}:{}),headless:true,args:['--disable-gpu']});
  try{
    for(const width of (process.argv.includes('--audio-only')?[390]:process.argv.includes('--320')?[320]:[390,320])){
      const{context,page}=await openPage(browser,width);
      try{
        if(!process.argv.includes('--cards-only')){
          if(process.argv.includes('--audio-only'))await playerLayout(page,width,true);
          else await check(`${width}px standalone/touch player safe areas and compact controls`,()=>playerLayout(page,width));
        }
        if(width===390&&!process.argv.includes('--layout-only')&&!process.argv.includes('--cards-only')){
          const nativePassed=await check('Media Session next/previous/pause/play advance real audio and update exact track without setPositionState',()=>nativeMediaControls(page));
          if(nativePassed)await check('two consecutive native ended events advance to different next songs and actually play',()=>consecutiveNativeEnds(page));
        }
        await check(`${width}px grid album metadata keeps readable width and transport remains visible`,()=>cardMetadata(page,width));
      }catch(error){report.failureState={width,url:page.url(),text:(await page.locator('body').innerText()).slice(0,1800)};await page.screenshot({path:'/tmp/rmusic-mobile-pwa-failure.png'});throw error;}
      finally{await context.close();}
    }
    if(!process.argv.includes('--cards-only')&&!process.argv.includes('--layout-only')&&!process.argv.includes('--320')&&!process.argv.includes('--mobile-only'))await check('desktop WebAudio play/system-next/pause/resume keeps real time advancing',()=>desktopSmoke(browser));
    assert.equal(report.errors.length,0,'Unexpected console/page errors');
    if(report.failures.length)process.exitCode=1;
  }catch(error){report.failure=error.stack;process.exitCode=1;}
  finally{fs.writeFileSync('/tmp/rmusic-mobile-playback-qa.json',JSON.stringify(report,null,2));await browser.close();}
  console.log(JSON.stringify(report,null,2));
}
run().catch(error=>{console.error(error);process.exitCode=1;});
