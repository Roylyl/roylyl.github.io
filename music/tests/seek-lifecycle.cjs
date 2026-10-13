'use strict';
const assert=require('node:assert/strict');
const {harness,settle}=require('./playback-session.cjs');

function nativeSeek(){
  const h=harness();h.loaded('a',20);h.audio.readyState=4;
  let position=20,writes=0,clock=100;
  h.ctx.performance.now=()=>clock;
  h.audio.seekable={length:1,start:()=>0,end:()=>240};
  Object.defineProperty(h.audio,'currentTime',{get:()=>position,set:value=>{writes++;position=value;h.audio.seeking=true;}});
  return {...h,get writes(){return writes;},advance(value){position=value;clock+=300;h.timeupdate();},land(value,elapsed=0){position=value;clock+=elapsed;h.audio.seeking=false;h.audioEvents.seeked();}};
}

(async()=>{
  // Metadata without ranges must not silently consume either the old or latest target.
  let h=nativeSeek();h.ctx.playbackBlocked=true;h.audio.seekable.length=0;
  h.ctx.seekPlayback(40);h.ctx.seekPlayback(51);h.metadata();
  assert.equal(h.writes,0);assert.equal(h.ctx.pendingResumePosition.time,51);
  h.audio.seekable.length=1;h.ctx.restorePlaybackPosition();
  assert.equal(h.writes,1);assert.equal(h.ctx.pendingResumePosition.time,51);
  assert.equal(h.audio.paused,true);h.land(51);assert.equal(h.ctx.pendingResumePosition,null);
  assert.equal(h.ctx.pausedPosition.time,51);assert.equal(h.calls.play,0);

  // Late completion of an older seek cannot clear a newer native seek in flight.
  h=nativeSeek();h.audio.paused=false;h.ctx.seekPlayback(53);h.ctx.seekPlayback(70);
  h.audioEvents.seeked();assert.equal(h.ctx.pendingResumePosition.time,70);
  h.land(70);assert.equal(h.ctx.pendingResumePosition,null);

  // Background seeked/timeupdate delivery can lag behind the native media clock.
  h=nativeSeek();h.audio.paused=false;h.ctx.seekPlayback(53);
  h.land(53.4,600);assert.equal(h.ctx.pendingResumePosition,null);
  assert.equal(h.writes,1,'late completion must not rewind a running recording');

  // The target can equal the duration while the browser is still seeking.
  h=nativeSeek();h.audio.paused=false;h.ctx.seekPlayback(240);
  h.timeupdate();assert.equal(h.ctx.current.id,'a');
  assert.equal(h.ctx.finishPlaybackIfEnded('seek-tail'),false);
  h.ctx.seekPlayback(10);h.land(10);assert.equal(h.ctx.current.id,'a');

  // A successful promise/event is insufficient, and seek jumps are not playback.
  h=nativeSeek();await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  assert.equal(h.ctx.playbackControl().system,'paused');
  h.ctx.seekPlayback(100);h.land(100);h.timeupdate();
  assert.equal(h.ctx.playbackControl().system,'paused');
  h.advance(100.3);assert.equal(h.ctx.playbackControl().system,'playing');
  // Buffering after an already confirmed start must clear on later progress.
  const running=harness();running.loaded('a',10);running.audio.readyState=4;
  await running.ctx.play(running.ctx.current,running.ctx.queue,true,true);
  running.audio.currentTime=10.3;running.timeupdate();
  assert.equal(running.ctx.playbackControl().system,'playing');
  running.audioEvents.waiting();assert.equal(running.ctx.playerStatusText,'buffering');
  assert.equal(running.ctx.playbackControl().system,'paused');
  running.audio.currentTime=10.6;running.timeupdate();
  assert.equal(running.ctx.playerStatusText,'');assert.equal(running.ctx.playbackControl().system,'playing');

  // A new stalled seek is still watched after a previous successful recovery.
  const recovery=harness();recovery.loaded('a',20);recovery.audio.readyState=4;
  await recovery.ctx.play(recovery.ctx.current,recovery.ctx.queue,true,true,false,{recoveryAttempt:true});
  recovery.audio.currentTime=20.3;recovery.timeupdate();
  recovery.audioEvents.waiting();recovery.flushTimer(8000);await settle();
  assert.equal(recovery.ctx.playbackBlocked,false,'a separate later stall gets its own bounded recovery');
  assert.equal(recovery.calls.source,2);
  recovery.flushTimer(8000);assert.equal(recovery.ctx.playbackBlocked,true,'one continuous stall still has a hard limit');

  // Backgrounds may deliver ended without an earlier progress notification.
  const ended=harness();ended.loaded('a');ended.audio.readyState=4;
  await ended.ctx.play(ended.ctx.current,ended.ctx.queue,true,true);
  ended.audio.currentTime=240;ended.audio.ended=true;ended.audio.paused=true;
  assert.equal(ended.ctx.finishPlaybackIfEnded('ended'),true);await settle();
  assert.equal(ended.ctx.current.id,'b');

  // A controlled PWA user click reaches native play before cache promises or rendering.
  const cold=harness(),order=[];cold.ctx.queue=[...cold.ctx.tracks];cold.ctx.navigator.serviceWorker={controller:{}};
  cold.ctx.cachedAudioUrl=()=>{throw Error('cannot await cache in the user action');};
  cold.audio.play=async()=>{order.push('play');cold.audio.paused=false;};
  cold.ctx.setCurrent=t=>{order.push('metadata');cold.ctx.current=t;};
  const request=cold.ctx.play(cold.ctx.tracks[0],cold.ctx.queue);
  assert.deepEqual(order,['play','metadata']);await request;
  // Cache lookup without a worker remains cancellable and cannot revive a cleared blob.
  const fallback=harness();fallback.loaded('a',20);fallback.audio.paused=false;
  let resolveCache;const revoked=[];
  fallback.ctx.cachedAudioUrl=()=>new Promise(resolve=>resolveCache=resolve);
  fallback.ctx.URL.revokeObjectURL=url=>revoked.push(url);
  const loading=fallback.ctx.play(fallback.ctx.get('b'),fallback.ctx.queue);
  assert.equal(fallback.audio.paused,true,'previous audio stops during a new cache lookup');
  fallback.ctx.audioCacheGeneration++;resolveCache('blob:cleared');await loading;
  assert.deepEqual(revoked,['blob:cleared']);assert.equal(fallback.audio.src,'https://example.test/b.mp3?v=1');

  console.log('PASS: empty ranges, last seek wins, delayed native completion, tail guard, clock confirmation, buffering recovery, bounded recovery episodes, synchronous cold start.');
})().catch(error=>{console.error(error);process.exitCode=1;});
