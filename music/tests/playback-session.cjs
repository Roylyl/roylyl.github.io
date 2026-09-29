'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const segment=source.slice(source.indexOf('  function savedPlaybackPosition()'),source.indexOf('  function previousTrack()'));
const listener=name=>source.split('\n').find(line=>line.startsWith(name));
const plain=value=>JSON.parse(JSON.stringify(value));
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function harness(storage=new Map()){
  const tracks=['a','b','c','d'].map(id=>({id,src:id+'.mp3',title:id,duration:240}));
  const nodes=new Map(),events={},audioEvents={},calls={play:0,source:0};
  const audio={paused:true,currentTime:0,duration:NaN,readyState:0,error:null,ended:false,_src:'',
    get src(){return this._src;},set src(value){this._src=value;this.currentTime=0;this.duration=NaN;this.readyState=0;this.error=null;this.ended=false;calls.source++;},
    getAttribute(){return this._src;},removeAttribute(){this.src='';},load(){},pause(){this.paused=true;},
    async play(){calls.play++;this.paused=false;},addEventListener(name,fn){audioEvents[name]=fn;}};
  const ctx={insertionAnchor:null,checkSleepTimer:()=>false,setTimeout:()=>0,audio,tracks,albums:[{tracks}],current:null,queue:[],repeat:'all',nextUp:[],playbackHistory:[],historyCursor:-1,
    loadedTrackId:null,pendingTrackId:null,playbackBlocked:false,pausedPosition:null,pendingResumePosition:null,
    playbackRequestedAt:0,playToken:0,persistenceRequested:true,failedAudioSources:new Set(),preparedAudio:new Map(),localAudioUrl:null,fallbackCachedId:null,
    playerStatusText:'',BUFFERING_STATUS:'buffering',navigator:{onLine:true,mediaSession:{}},performance:{now:()=>100},
    document:{hidden:false,addEventListener(name,fn){events[name]=fn;}},URL:{revokeObjectURL(){}},
    get:id=>tracks.find(t=>t.id===id),canPlay:t=>!!t?.src,audioSource:t=>'https://example.test/'+t.src+'?v=1',
    read:(key,fallback)=>storage.has(key)?plain(storage.get(key)):fallback,save:(key,value)=>storage.set(key,plain(value)),
    setCurrent:t=>ctx.current=t,status:value=>ctx.playerStatusText=value,tracePlayback(){},renderCurrent(){},renderQueue(){},
    cancelPreload(){},releasePrepared(){ctx.preparedAudio.clear();},cachedAudioUrl:async()=>null,audioBudget:()=>0,
    preloadNextLyrics(){},preloadNext(){},updateLyricPosition(){},loadLyrics(){},updateFull(){},updateModeControls(){},registerMediaActions(){},reportShellVersion(){},
    time:String,$:id=>{if(!nodes.has(id))nodes.set(id,{});return nodes.get(id);}
  };
  vm.createContext(ctx);vm.runInContext(segment,ctx);
  vm.runInContext(source.slice(source.indexOf('  function playAlbum('),source.indexOf('  function openAlbum(')),ctx);
  vm.runInContext(listener("  audio.addEventListener('loadedmetadata'"),ctx);
  vm.runInContext(listener("  document.addEventListener('visibilitychange'"),ctx);
  const metadata=(duration=240)=>{audio.duration=duration;audio.readyState=1;audioEvents.loadedmetadata();};
  const loaded=(id='a',time=0)=>{
    ctx.current=ctx.get(id);ctx.queue=[...tracks];ctx.loadedTrackId=id;ctx.playbackHistory=[id];ctx.historyCursor=0;
    audio.src=ctx.audioSource(ctx.current);metadata();audio.currentTime=time;
  };
  return {ctx,audio,storage,calls,events,metadata,loaded};
}
(async()=>{
  let h=harness();h.loaded('b',87.25);h.ctx.repeat='shuffle';h.ctx.nextUp=['d','c'];
  h.ctx.playbackHistory=['a','c','b'];h.ctx.historyCursor=2;h.ctx.savePlaybackSession();
  const saved=plain(h.storage.get('playback'));
  h=harness(h.storage);h.ctx.restorePlaybackSession();
  assert.equal(h.ctx.current.id,'b');assert.equal(h.ctx.repeat,'shuffle');
  assert.deepEqual(plain(h.ctx.queue.map(t=>t.id)),saved.queue);assert.deepEqual(plain(h.ctx.nextUp),['d','c']);
  assert.deepEqual(plain(h.ctx.playbackHistory),['a','c','b']);assert.equal(h.ctx.historyCursor,2);
  assert.equal(h.ctx.savedPlaybackPosition(),87.25);assert.equal(h.calls.play,0,'refresh must restore without autoplay');
  assert.equal(h.audio.src,'');assert.equal(h.audio.paused,true);
  await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  assert.equal(h.ctx.pendingResumePosition.time,87.25,'saved position must survive source replacement before metadata');
  h.metadata();assert.equal(h.audio.currentTime,87.25);assert.equal(h.ctx.pendingResumePosition,null);
  h.ctx.nextUp=[];h.ctx.advance(-1);await settle();assert.equal(h.ctx.current.id,'c');assert.equal(h.ctx.historyCursor,1);
  h.ctx.advance(1);await settle();assert.equal(h.ctx.current.id,'b');assert.equal(h.ctx.historyCursor,2);
  console.log('通过：刷新恢复队列、模式、待播、随机历史及进度，不自动播放，metadata后续播。');
  h=harness(new Map([['playback',{id:'a',time:120,queue:['a','b']}]]));h.ctx.restorePlaybackSession();h.ctx.playAlbum(h.ctx.albums[0]);await settle();h.metadata();assert.equal(h.audio.currentTime,0,'播放整张专辑应清除首曲保存的续播位置');

  h=harness();h.loaded('a',126.75);h.audio.error={code:3};h.ctx.failedAudioSources.add(h.ctx.audioSource(h.ctx.current));
  await h.ctx.play(h.ctx.current,h.ctx.queue,true,true);
  assert.match(h.audio.src,/recovery=/);assert.equal(h.audio.currentTime,0);
  assert.equal(h.ctx.pendingResumePosition.time,126.75);assert.equal(h.storage.get('playback').time,126.75);
  h.metadata();assert.equal(h.audio.currentTime,126.75,'retry must resume after new-source metadata');
  h=harness();h.loaded('a',126.75);h.ctx.pendingResumePosition={id:'a',time:126.75};
  await h.ctx.play(h.ctx.get('b'),h.ctx.queue,false,true);h.metadata();
  assert.equal(h.audio.currentTime,0,'switching tracks must discard the old track position');assert.equal(h.ctx.pendingResumePosition,null);
  h=harness();h.loaded('a',120);h.audio.readyState=0;h.audio.error={code:3};h.ctx.playAlbum(h.ctx.albums[0]);await settle();h.metadata();assert.equal(h.audio.currentTime,0,'无metadata的失败首曲点击播放专辑仍应从头开始');
  console.log('通过：错误重试换源保留进度，切歌不会应用上一首进度。');

  h=harness();h.loaded('a',40);h.audio.paused=false;h.ctx.pausePlayback();h.ctx.seekPlayback(93.5);
  assert.equal(h.ctx.pausedPosition.time,93.5);assert.equal(h.storage.get('playback').time,93.5);
  h.events.visibilitychange();assert.equal(h.audio.currentTime,93.5,'visibility must preserve a seek made while paused');
  h.audio.paused=false;h.audio.currentTime=94;assert.equal(h.ctx.handleAudioStart(),false);
  assert.equal(h.audio.currentTime,93.5);assert.equal(h.audio.paused,true);assert.equal(h.calls.play,0);
  console.log('通过：暂停拖动进度后切换页面可见性和迟到play事件不会退回原暂停点。');

  for(const mode of ['all','shuffle','one']){
    h=harness();h.loaded('a',51);h.ctx.repeat=mode;
    h.ctx.addNext(h.ctx.get('b'));h.ctx.addNext(h.ctx.get('c'));
    assert.deepEqual(plain(h.ctx.nextUp),['c','b'],mode+': newly added track must precede earlier requests');
    h.ctx.addNext(h.ctx.get('b'));
    assert.deepEqual(plain(h.ctx.nextUp),['b','c'],mode+': last requested track must play next without duplicates');
    assert.equal(h.ctx.queue.length,4);assert.equal(h.ctx.nextPreloadTrack().id,'b');
    assert.deepEqual(plain(h.ctx.displayQueue().map(t=>t.id)),['a','b','c','b','c','d']);
    h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'b',mode+': explicit next must override playback mode');
    assert.deepEqual(plain(h.ctx.nextUp),['c']);
    h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'c');assert.deepEqual(plain(h.ctx.nextUp),[]);
    h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'b','return to untouched base queue after inserted tracks');
    h=harness();h.loaded('a',76);h.ctx.repeat=mode;h.ctx.addNext(h.ctx.current);h.ctx.addNext(h.ctx.current);
    assert.deepEqual(plain(h.ctx.nextUp),['a']);assert.deepEqual(plain(h.ctx.displayQueue().map(t=>t.id)),['a','a','b','c','d']);
    h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'a');assert.equal(h.audio.currentTime,0);
    assert.deepEqual(plain(h.ctx.nextUp),[]);assert.equal(h.ctx.queue.length,4,'repeating current track must not duplicate its base queue entry');
  }
  h=harness();h.loaded('a',42);h.ctx.addNext(h.ctx.get('b'));
  assert.deepEqual(plain(h.ctx.displayQueue().map(t=>t.id)),['a','b','b','c','d']);
  h.ctx.advance(1,true);await settle();h.metadata();h.audio.currentTime=120;
  h.ctx.savePlaybackSession();const restored=harness(h.storage);restored.ctx.restorePlaybackSession();
  assert.equal(restored.ctx.insertionAnchor,'a');
  h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'b');assert.equal(h.audio.currentTime,0);
  h.ctx.advance(1,true);await settle();assert.equal(h.ctx.current.id,'c');
  assert.deepEqual(plain(h.ctx.queue.map(t=>t.id)),['a','b','c','d']);
  console.log('通过：A→插队B→原B→C，原B从头播放，刷新保留插队返回位置。');
  h=harness();h.loaded('a',42);h.ctx.playAlbum({tracks:[h.ctx.get('c'),h.ctx.get('d')]},true);await settle();
  assert.equal(h.ctx.repeat,'shuffle');assert(['c','d'].includes(h.ctx.current.id));
  assert.deepEqual(plain(h.ctx.queue.map(t=>t.id)),['c','d']);
  h.ctx.playAlbum({tracks:[h.ctx.get('c'),h.ctx.get('d')]});await settle();
  assert.equal(h.ctx.repeat,'all');assert.equal(h.ctx.current.id,'c');
  console.log('通过：随机播放只选当前结果，顺序播放恢复列表模式。');
  console.log('通过：下一首按最近添加优先，重复添加去重，覆盖列表/随机/单曲模式，并支持当前曲重复下一次。');
})().catch(error=>{console.error(error);process.exitCode=1;});
// Diagnostic retention survives refresh without growing local storage forever.
{
  const now=Date.now(),fresh=Array.from({length:140},(_,i)=>({at:new Date(now-1000*(140-i)).toISOString(),event:'old-'+i}));
  let stored=[{at:new Date(now-90000000).toISOString(),event:'expired'},...fresh];
  const context={read:()=>stored,save:(key,events)=>stored=plain(events),audio:{currentTime:0,paused:true},current:null,pendingTrackId:null,playbackBlocked:false,navigator:{},document:{hidden:false}};
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('  const playbackLog='),source.indexOf("  $('copy-playback-diagnostics')")),context);
  context.tracePlayback('new-page');assert.equal(stored.length,120);assert.equal(stored.at(-1).event,'new-page');assert(!stored.some(e=>e.event==='expired'));assert(stored.some(e=>e.event==='old-139'));
  console.log('通过：诊断跨刷新续存，仅保留24小时内最多120条事件。');
}
