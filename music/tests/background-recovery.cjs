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
  // Hidden timeupdates still save position and finish tracks without DOM work.
  let background=harness();background.loaded('a',25);background.ctx.document.hidden=true;
  background.ctx.renderPlaybackProgress=()=>{throw Error('hidden DOM work');};
  background.timeupdate();assert.equal(background.storage.get('playback').time,25);
  background.audio.currentTime=240;background.timeupdate();await settle();
  assert.equal(background.ctx.current.id,'b');

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

  // A deliberate backwards seek invalidates the old startup position baseline.
  h=stalled();h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.ctx.seekPlayback(10);h.audio.currentTime=12;
  h.flushTimer(8000);assert.equal(h.requests.length,1,'backwards seek must not trigger a source reload');

  // AbortError without a newer pause gets the same bounded recovery.
  h=stalled();promise=h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.requests[0].reject(Object.assign(Error('native start aborted'),{name:'AbortError'}));
  await settle();assert.equal(h.requests.length,2);
  h.metadata();h.audio.paused=false;h.requests[1].resolve();await promise;
  assert.equal(h.audio.currentTime,83.25);assert.equal(h.ctx.pendingTrackId,null);

  // A resolved native play promise with a frozen clock still needs recovery.
  h=stalled();promise=h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  h.audio.paused=false;h.requests[0].resolve();await promise;
  h.flushTimer(8000);assert.equal(h.requests.length,2,'resolved promise cannot suppress the frozen-clock watchdog');

  // The last timeupdate can finish a track even if ended delivery is delayed.
  h=harness();h.loaded('a',240);h.audio.paused=false;
  assert.equal(h.ctx.finishPlaybackIfEnded('timeupdate'),true);
  assert.equal(h.ctx.current.id,'b');await settle();h.metadata();
  assert.equal(h.ctx.finishPlaybackIfEnded('late-ended'),false,'late ended must not skip b');
  assert.equal(h.ctx.current.id,'b');

  // A native pause at the exact end must not block the new song.
  h=harness();h.loaded('a',240);h.audio.paused=true;h.audio.ended=false;
  h.ctx.handleAudioPause();assert.equal(h.ctx.current.id,'b');assert.equal(h.ctx.playbackBlocked,false);
  await settle();
  h=harness();h.loaded('a',239.99);h.audio.paused=true;
  h.ctx.handleAudioPause();assert.equal(h.ctx.current.id,'a');assert.equal(h.ctx.playbackBlocked,true,'never truncate the last samples or override an early pause');
  h=harness();h.loaded('a',240);h.ctx.pausePlayback();
  assert.equal(h.ctx.finishPlaybackIfEnded('timeupdate'),false,'explicit pause remains authoritative at the end');

  // Reload must happen synchronously between src assignment and native play.
  h=harness();h.loaded('a',240);const handoff=[];
  h.audio.load=()=>handoff.push('load');
  h.audio.play=async()=>{handoff.push('play');h.audio.paused=false;};
  h.ctx.setCurrent=t=>{handoff.push('ui');h.ctx.current=t;};
  h.ctx.advance(1,true);assert.deepEqual(handoff,['load','play','ui']);await settle();
  // System play on an ended recording continues the queue, never repeats it.
  h=harness();h.loaded('a',240);h.audio.ended=true;h.ctx.playbackBlocked=true;
  h.ctx.resumePlayback();await settle();assert.equal(h.ctx.current.id,'b');
  h=harness();h.loaded('a',240);h.ctx.addNext(h.ctx.get('d'));h.ctx.playbackBlocked=true;
  h.ctx.resumePlayback();await settle();assert.equal(h.ctx.current.id,'d');
  h=harness();h.loaded('a',83.25);h.audio.paused=true;h.ctx.handleAudioPause();
  let loads=0;h.audio.load=()=>{loads++;};
  await h.ctx.resumePlayback();h.metadata();assert.equal(loads,1);assert.equal(h.audio.currentTime,83.25);
  console.log('PASS: system play after end follows queue/inserts; native interruption reload preserves position.');
  console.log('PASS: resolved-but-frozen play, delayed ended, end/pause ordering, no early truncation, explicit pause, synchronous load/play handoff.');
  console.log('PASS: background visibility race, native play before rendering, bounded stalled/aborted start recovery, preserved position, pause/new-track/interruption cancellation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
