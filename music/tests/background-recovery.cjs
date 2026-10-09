'use strict';
const assert=require('node:assert/strict');
const {harness,settle}=require('./playback-session.cjs');

function stalled(){
  const h=harness(),requests=[];
  h.loaded('a',83.25);
  h.audio.play=()=>new Promise((resolve,reject)=>requests.push({resolve,reject}));
  return {...h,requests};
}

(async()=>{
  // Visibility changes can arrive while native play has not yet unpaused.
  let h=stalled(),promise=h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.ctx.document.hidden=true;h.events.visibilitychange();
  assert.equal(h.ctx.playbackBlocked,false);
  assert.equal(h.ctx.pendingTrackId,'a');
  h.audio.paused=false;h.requests[0].resolve();await promise;

  // Native playback must be requested before UI/metadata work for a new track.
  h=harness();h.loaded('a',240);h.audio.ended=true;
  const order=[];
  h.audio.play=async()=>{order.push('play');h.audio.paused=false;};
  h.ctx.setCurrent=t=>{order.push('metadata');h.ctx.current=t;};
  h.ctx.renderCurrent=()=>order.push('render');
  h.ctx.advance(1,true);await settle();
  assert.equal(h.ctx.current.id,'b');assert.equal(order[0],'play');

  // One stuck native request gets one reload, then exposes manual recovery.
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.flushTimer(8000);assert.equal(h.requests.length,2);
  assert.equal(h.ctx.pendingResumePosition.time,83.25);
  h.metadata();assert.equal(h.audio.currentTime,83.25);
  // The restored seek is not evidence that the reloaded audio actually played.
  h.flushTimer(8000);assert.equal(h.requests.length,2);
  assert.equal(h.ctx.playbackBlocked,true);assert.equal(h.ctx.$('playback-recovery').hidden,false);

  // Explicit pause / new track revoke the older watchdog's authority.
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);h.ctx.pausePlayback();
  h.flushTimer(8000);assert.equal(h.requests.length,1);
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.ctx.play(h.ctx.get('b'),h.ctx.queue,false,true);
  h.audio.currentTime=2;h.flushTimer(8000);assert.equal(h.requests.length,2);
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.ctx.navigator.audioSession={state:'interrupted'};
  h.flushTimer(8000);assert.equal(h.requests.length,1);assert.equal(h.ctx.playbackBlocked,true);

  // An unresolved promise must not reload audio that is already progressing.
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.audio.currentTime=85;h.flushTimer(8000);assert.equal(h.requests.length,1);

  // AbortError without a newer pause gets the same bounded recovery.
  h=stalled();promise=h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.requests[0].reject(Object.assign(Error('native start aborted'),{name:'AbortError'}));
  await settle();assert.equal(h.requests.length,2);
  h.metadata();h.audio.paused=false;h.requests[1].resolve();await promise;
  assert.equal(h.audio.currentTime,83.25);assert.equal(h.ctx.pendingTrackId,null);
  console.log('PASS: background visibility race, native play before rendering, bounded stalled/aborted start recovery, preserved position, pause/new-track/interruption cancellation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
