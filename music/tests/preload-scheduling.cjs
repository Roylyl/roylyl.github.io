'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {harness,settle}=require('./playback-session.cjs');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const cacheSource=source.slice(source.indexOf('  const audioCacheJobs='),source.indexOf("  if('serviceWorker' in navigator"));
const preloadSource=source.slice(source.indexOf('  function preloadNext()'),source.indexOf('  const playbackLog='));
function setup({preload=true}={}) {
  const h=harness(),requests=[],pending=new Map();h.loaded('a',12);
  Object.assign(h.ctx,{window:h.ctx,prepareToken:0,audioCacheGeneration:0,preloadAllowed:()=>preload,audioBudget:()=>-1,
    workerMessage(data){requests.push(data.source);return new Promise(resolve=>pending.set(data.source,resolve));}});
  h.ctx.navigator.serviceWorker={controller:{}};
  vm.runInContext(cacheSource+preloadSource,h.ctx);
  return {...h,requests,complete:(name,ok=true)=>pending.get(`https://example.test/${name}.mp3?v=1`)({ok})};
}
(async()=>{
  for(const preload of [true,false]) {
    const h=setup({preload});
    await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
    assert.equal(h.audio.paused,false,'play must not wait for a cache write');
    assert.deepEqual(h.requests,['https://example.test/a.mp3?v=1'],'the playing song starts loading immediately');
    h.audio.readyState=4;h.audio.currentTime+=.3;h.timeupdate();await settle();
    assert.deepEqual(h.requests,['https://example.test/a.mp3?v=1'],'a stalled current song never permits next-song loading');
    h.complete('a');await settle();await settle();
    assert.deepEqual(h.requests,preload?['https://example.test/a.mp3?v=1','https://example.test/b.mp3?v=1']:['https://example.test/a.mp3?v=1']);
    if(preload){h.complete('b');await settle();}
  }
  {
    const h=setup();await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
    h.audio.readyState=4;h.audio.currentTime+=.3;h.timeupdate();h.complete('a',false);await settle();
    assert.deepEqual(h.requests,['https://example.test/a.mp3?v=1'],'a failed current-song save never starts the next song');
  }
  {
    const h=setup();await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
    h.audio.readyState=4;h.audio.currentTime+=.3;h.timeupdate();
    h.ctx.current=h.ctx.get('c');h.complete('a');await settle();
    assert.deepEqual(h.requests,['https://example.test/a.mp3?v=1'],'a superseded song cannot start stale preloading');
  }
  console.log('PASS: playback starts immediately; its full save starts without waiting for progress; next song waits for a successful complete save; requests deduplicate; disabled, failed and stale preloads stay stopped.');
})().catch(error=>{console.error(error);process.exitCode=1;});
