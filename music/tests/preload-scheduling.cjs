'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {harness}=require('./playback-session.cjs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');

(async()=>{
  for(const preload of [true,false]){
    const h=harness(),requests=[];
    h.loaded('a',12);
    Object.assign(h.ctx,{prepareToken:0,audioCacheGeneration:0,preloadAllowed:()=>preload,audioBudget:()=>-1,
      cacheAudio(url){requests.push(url);return new Promise(()=>{});}});
    vm.runInContext(source.slice(source.indexOf('  function preloadNext()'),source.indexOf('  const playbackLog=')),h.ctx);
    await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
    assert.equal(h.audio.paused,false,'uncached playback must not await storing any song');
    assert.deepEqual(requests,preload?['https://example.test/b.mp3?v=1','https://example.test/a.mp3?v=1']:['https://example.test/a.mp3?v=1']);
  }
  console.log('PASS: next-song preload starts independently of a stalled current-song cache write; disabled preloading stays disabled; uncached playback proceeds.');
})().catch(error=>{console.error(error);process.exitCode=1;});
