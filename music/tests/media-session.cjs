'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
require('../playback-feedback.js');
function harness(){
  const timers=new Map();let timerId=0;
  const setTimeout=(fn,delay)=>{timers.set(++timerId,{fn,delay});return timerId;},clearTimeout=id=>timers.delete(id);
  const handlers={},sessionEvents={},requests=[],registrations=[];
  const track={id:'one',src:'one.mp3'},audio={paused:true,src:'one.mp3',currentTime:83.25,error:null,duration:300,readyState:4,
    getAttribute(){return this.src;},pause(){this.paused=true;},load(){this.reloads=(this.reloads||0)+1;},
    play(){this.paused=false;return new Promise((resolve,reject)=>requests.push({resolve,reject}));}};
  const nodes=new Map();
  const ctx={shuffleOrder:[],shuffleCursor:-1,historyAnchors:[],queueUndo:null,queueUndoTimer:null,retryTicket:null,lastFailureToken:-1,retryWaiting:false,
    RoylylPlaybackFeedback,playbackRetries:RoylylPlaybackFeedback.createRetryController(),isFullOpen:()=>false,document:{body:{append(node){node.parentElement=this;}}},
    setTimeout,clearTimeout,insertionAnchor:null,checkSleepTimer:()=>false,window:{addEventListener(){}},nextUp:[],pendingResumePosition:null,repeat:'all',updateLyricPosition(){},read:(key,fallback)=>fallback,albums:[],get:id=>id===track.id?track:null,tracePlayback(){},performance:{now:()=>100},playbackRequestedAt:0,failedAudioSources:new Set(),playbackBlocked:false,pausedPosition:null,audio,current:track,queue:[track],loadedTrackId:track.id,pendingTrackId:track.id,playToken:0,
    playbackHistory:[track.id],historyCursor:0,persistenceRequested:true,playerStatusText:'buffering',BUFFERING_STATUS:'buffering',
    preparedAudio:new Map(),localAudioUrl:null,navigator:{onLine:true,mediaSession:{setActionHandler:(name,fn)=>{registrations.push(name);handlers[name]=fn;}},
      audioSession:{state:'active',addEventListener:(name,fn)=>sessionEvents[name]=fn}},
    canPlay:t=>!!t?.src,audioSource:t=>t.src,cancelPreload(){},status(t){ctx.playerStatusText=t;},renderCurrent(){},
    setCurrent(t){ctx.current=t;},save(){},preloadNext(){},audioBudget:()=>0,releasePrepared(){},URL:{revokeObjectURL(){}},
    cachedAudioUrl(){throw Error('system action must not await a cache read');},
    $:id=>{if(!nodes.has(id))nodes.set(id,{hidden:true,style:{setProperty(){}},click(){throw Error('system action must not simulate a DOM click');}});return nodes.get(id);}};
  vm.createContext(ctx);
  vm.runInContext(source.slice(source.indexOf('  function resetShuffle('),source.indexOf('  function advance(')),ctx);
  vm.runInContext(source.slice(source.indexOf('  function registerMediaActions()'),source.indexOf("  document.addEventListener('visibilitychange'")),ctx);
  vm.runInContext(source.slice(source.indexOf("  navigator.audioSession?.addEventListener('statechange'"),source.indexOf("  audio.addEventListener('error'")),ctx);
  ctx.registerMediaActions();return {ctx,audio,handlers,requests,sessionEvents,registrations};
}
(async()=>{
  // iPhone report: paused=false at HAVE_METADATA, while currentTime stays at 0.
  // The system must not extrapolate 37 seconds from that pending start.
  let buffering=harness(),positions=[];
  buffering.audio.currentTime=0;buffering.audio.readyState=1;
  buffering.ctx.navigator.mediaSession.setPositionState=state=>positions.push(state);
  const starting=buffering.handlers.play();buffering.ctx.syncPlaybackState();
  assert.equal(buffering.audio.paused,false);
  assert.equal(buffering.ctx.navigator.mediaSession.playbackState,'paused');
  assert.equal(positions.at(-1).position,0);
  buffering.requests[0].resolve();await starting;buffering.ctx.syncPlaybackState();
  assert.equal(buffering.ctx.navigator.mediaSession.playbackState,'paused','resolved play at readyState=1 is still buffering');
  buffering.audio.readyState=4;buffering.audio.currentTime=.25;buffering.ctx.syncPlaybackState();
  assert.equal(buffering.ctx.navigator.mediaSession.playbackState,'playing');
  assert.equal(positions.at(-1).position,.25);
  buffering.audio.currentTime=12.5;buffering.audio.readyState=2;buffering.ctx.syncPlaybackState();
  assert.equal(buffering.ctx.navigator.mediaSession.playbackState,'paused','rebuffering freezes the system timeline');
  assert.equal(positions.at(-1).position,12.5);
  console.log('通过：加载与再次缓冲时锁屏进度保持实际位置，数据可播放后恢复系统播放状态。');
  const stable=harness(),registered=stable.registrations.length;
  stable.ctx.registerMediaActions();stable.ctx.registerMediaActions();
  assert.equal(stable.registrations.length,registered,'media actions stay registered across routine updates');
  let fastTarget;
  stable.audio.fastSeek=value=>{fastTarget=value;stable.audio.currentTime=Math.floor(value);};
  stable.handlers.seekto({seekTime:42.75,fastSeek:true});assert.equal(fastTarget,42.75);
  stable.handlers.seekto({seekTime:42.75});assert.equal(stable.audio.currentTime,42.75);
  stable.handlers.seekto({seekTime:0});assert.equal(stable.audio.currentTime,0);
  Object.defineProperty(stable.ctx.navigator.mediaSession,'playbackState',{set(){throw Error('platform refused');}});
  assert.doesNotThrow(()=>stable.ctx.syncPlaybackState());

  // A blocked native player can claim playing without advancing its clock.
  let blocked=harness();blocked.ctx.playbackBlocked=true;blocked.ctx.pendingTrackId=null;
  let blockedPlay=blocked.handlers.play();assert.equal(blocked.audio.reloads,1);
  assert.equal(blocked.audio.currentTime,83.25);blocked.requests[0].resolve();await blockedPlay;
  // System scrubbing while reloading must not be discarded or resume playback.
  let seeking=harness();seeking.audio.duration=NaN;seeking.audio.readyState=0;
  seeking.ctx.playbackBlocked=true;seeking.handlers.seekto({seekTime:140});
  assert.equal(seeking.ctx.pendingResumePosition.time,140);assert.equal(seeking.requests.length,0);
  seeking.handlers.seekto({seekTime:190});seeking.ctx.rememberPausedPosition();
  assert.equal(seeking.ctx.pausedPosition.time,190);
  seeking.audio.duration=300;seeking.audio.readyState=1;seeking.ctx.restorePlaybackPosition();
  assert.equal(seeking.audio.currentTime,190);assert.equal(seeking.ctx.pendingResumePosition,null);
  seeking.handlers.seekto({seekTime:205});assert.equal(seeking.audio.currentTime,205);
  assert.equal(seeking.ctx.playbackBlocked,true);assert.equal(seeking.requests.length,0);
  let h=harness();let promise=h.handlers.play();
  assert.equal(h.requests.length,1,'stale pending flag cannot block system play');
  assert.equal(h.audio.currentTime,83.25);assert.equal(h.audio.src,'one.mp3');assert.equal(h.audio.reloads,undefined,'ordinary system resume should reuse audio');
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
  delete h.ctx.navigator.audioSession;promise=h.handlers.play();assert.equal(h.audio.reloads,1,'explicit resume after interruption must reload synchronously');assert.equal(h.audio.currentTime,83.25);h.requests[1].resolve();await promise;
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
  h=harness();h.ctx.failedAudioSources.add('one.mp3');h.audio.error={code:3};h.audio.load=()=>{};
  h.ctx.setCurrent=t=>h.ctx.current=t;
  promise=h.handlers.play();assert.match(h.audio.src,/recovery=/);assert.equal(h.ctx.localAudioUrl,null);
  h.requests[0].resolve();await promise;assert.equal(h.ctx.failedAudioSources.size,0);
  h=harness();promise=h.handlers.play();h.audio.paused=true;const activeToken=h.ctx.playToken;
  h.ctx.handleAudioPause({timeStamp:50});assert.equal(h.ctx.playToken,activeToken);assert.equal(h.ctx.pendingTrackId,'one','恢复前创建的pause不能撤销系统播放');
  h.audio.paused=false;h.requests[0].resolve();await promise;
  h=harness();promise=h.handlers.play();h.audio.paused=true;h.ctx.handleAudioPause({timeStamp:150});
  assert.equal(h.ctx.playbackBlocked,true,'恢复后的新暂停必须生效');h.requests[0].resolve();await promise;
  console.log('通过：迟到旧pause不会撤销新的系统播放，新暂停仍生效。');
  console.log('通过：失败歌曲下一次播放绕过旧缓存，系统恢复不等待缓存清理。');
  console.log('通过：统一状态映射覆盖播放、错误、加载与中断。');
  console.log('通过：耳机暂停事件、暂停点保存、迟到自动恢复拦截、用户原处续播、自然结束与内部换源区分。');
  console.log('通过：系统直接恢复、残留pending、未完成请求中断、旧请求迟到、主动暂停、保留位置/历史、无AudioSession降级及中断后不自动抢播。');
})().catch(e=>{console.error(e);process.exitCode=1;});
