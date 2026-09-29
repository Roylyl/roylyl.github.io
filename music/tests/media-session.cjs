'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
function harness(){
  const handlers={},sessionEvents={},requests=[];
  const track={id:'one',src:'one.mp3'},audio={paused:true,src:'one.mp3',currentTime:83.25,error:null,
    getAttribute(){return this.src;},pause(){this.paused=true;},load(){throw Error('unexpected reload');},
    play(){this.paused=false;return new Promise((resolve,reject)=>requests.push({resolve,reject}));}};
  const ctx={playbackBlocked:false,pausedPosition:null,audio,current:track,queue:[track],loadedTrackId:track.id,pendingTrackId:track.id,playToken:0,
    playbackHistory:[track.id],historyCursor:0,persistenceRequested:true,playerStatusText:'buffering',BUFFERING_STATUS:'buffering',
    preparedAudio:new Map(),localAudioUrl:null,navigator:{onLine:true,mediaSession:{setActionHandler:(name,fn)=>handlers[name]=fn},
      audioSession:{state:'active',addEventListener:(name,fn)=>sessionEvents[name]=fn}},
    canPlay:t=>!!t?.src,audioSource:t=>t.src,cancelPreload(){},status(t){ctx.playerStatusText=t;},renderCurrent(){},
    save(){},audioBudget:()=>0,releasePrepared(){},URL:{revokeObjectURL(){}},
    cachedAudioUrl(){throw Error('system action must not await a cache read');},
    $(){throw Error('system action must not simulate a DOM click');}};
  vm.createContext(ctx);
  vm.runInContext(source.slice(source.indexOf('  function playbackControl()'),source.indexOf('  function advance(')),ctx);
  vm.runInContext(source.slice(source.indexOf('  function registerMediaActions()'),source.indexOf("  document.addEventListener('visibilitychange'")),ctx);
  vm.runInContext(source.slice(source.indexOf("  navigator.audioSession?.addEventListener('statechange'"),source.indexOf("  audio.addEventListener('error'")),ctx);
  ctx.registerMediaActions();return {ctx,audio,handlers,requests,sessionEvents};
}
(async()=>{
  let h=harness();let promise=h.handlers.play();
  assert.equal(h.requests.length,1,'stale pending flag cannot block system play');
  assert.equal(h.audio.currentTime,83.25);assert.equal(h.audio.src,'one.mp3');
  h.requests[0].resolve();await promise;assert.equal(h.ctx.pendingTrackId,null);
  assert.equal(h.ctx.playbackHistory.length,1);
  h=harness();h.audio.paused=false;promise=h.handlers.play();
  assert.equal(h.requests.length,1,'system play is not a toggle even when paused is false');h.requests[0].resolve();await promise;
  h=harness();const old=h.handlers.play();h.audio.paused=true;h.ctx.handleAudioPause();
  assert.equal(h.ctx.pendingTrackId,null);assert.equal(h.ctx.navigator.mediaSession.playbackState,'paused');
  const resumed=h.handlers.play();h.requests[0].reject(Object.assign(Error('interrupted'),{name:'AbortError'}));await old;
  assert.equal(h.ctx.pendingTrackId,'one','old rejection cannot clear the new attempt');
  h.requests[1].resolve();await resumed;assert.equal(h.ctx.playerStatusText,'');
  h=harness();promise=h.handlers.play();h.handlers.pause();h.requests[0].resolve();await promise;
  assert.equal(h.audio.paused,true);assert.equal(h.ctx.pendingTrackId,null);
  h=harness();promise=h.handlers.play();const token=h.ctx.playToken;h.ctx.handleAudioPause();
  assert.equal(h.ctx.playToken,token,'queued pause after resume must not cancel playback');h.requests[0].resolve();await promise;
  h=harness();h.ctx.loadedTrackId=null;h.ctx.handleAudioPause();assert.equal(h.ctx.pendingTrackId,'one','internal source load not cancelled');
  h=harness();promise=h.handlers.play();h.ctx.navigator.audioSession.state='interrupted';h.sessionEvents.statechange();
  assert.equal(h.audio.paused,true);assert.equal(h.ctx.pendingTrackId,null);assert.equal(h.ctx.navigator.audioSession.type,'playback');
  h.ctx.navigator.audioSession.state='active';h.sessionEvents.statechange();assert.equal(h.requests.length,1,'no automatic focus stealing');
  h.requests[0].resolve();await promise;
  delete h.ctx.navigator.audioSession;promise=h.handlers.play();h.requests[1].resolve();await promise;
  h=harness();h.audio.paused=false;h.audio.currentTime=126.75;h.audio.paused=true;h.ctx.handleAudioPause();
  assert.equal(h.ctx.playbackBlocked,true,'耳机触发音频pause后保持暂停');
  assert.equal(h.ctx.pausedPosition.time,126.75);
  h.audio.paused=false;h.audio.currentTime=127.1;assert.equal(h.ctx.handleAudioStart(),false);
  assert.equal(h.audio.paused,true,'阻止浏览器未经用户操作重新开始播放');
  assert.equal(h.audio.currentTime,126.75,'迟到的播放恢复到暂停点');
  h.ctx.handleAudioPause();promise=h.handlers.play();assert.equal(h.ctx.playbackBlocked,false);
  assert.equal(h.audio.currentTime,126.75);h.requests[0].resolve();await promise;
  h=harness();h.audio.ended=true;h.ctx.handleAudioPause();assert.equal(h.ctx.playbackBlocked,false,'自然播完不能当成用户暂停');
  h=harness();h.ctx.loadedTrackId=null;h.ctx.handleAudioPause();assert.equal(h.ctx.playbackBlocked,false,'内部换源不能锁住新歌曲');
  h=harness();h.ctx.pendingTrackId=null;h.audio.paused=false;h.ctx.syncPlaybackState();assert.equal(h.ctx.navigator.mediaSession.playbackState,'playing');assert.equal(h.ctx.playbackControl().label,'暂停');
  h.audio.error={code:2};h.ctx.syncPlaybackState();assert.equal(h.ctx.navigator.mediaSession.playbackState,'paused');assert.equal(h.ctx.playbackControl().icon,'play');
  h.audio.error=null;h.audio.paused=true;h.ctx.pendingTrackId='one';h.ctx.syncPlaybackState();assert.equal(h.ctx.navigator.mediaSession.playbackState,'paused');assert.equal(h.ctx.playbackControl().label,'取消加载');
  h.ctx.playbackBlocked=true;assert.equal(h.ctx.playbackControl().label,'播放');
  console.log('通过：统一状态映射覆盖播放、错误、加载与中断。');
  console.log('通过：耳机暂停事件、暂停点保存、迟到自动恢复拦截、用户原处续播、自然结束与内部换源区分。');
  console.log('通过：系统直接恢复、残留pending、未完成请求中断、旧请求迟到、主动暂停、保留位置/历史、无AudioSession降级及中断后不自动抢播。');
})().catch(e=>{console.error(e);process.exitCode=1;});
