'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a);return source.slice(a,b);};
const deferred=()=>{let resolve;const promise=new Promise(done=>{resolve=done;});return {promise,resolve};};

async function startup({shared=true,navigate=false,modal=false,goHome=false}={}){
  const catalog=deferred(),nodes=new Map(),track={id:'song-a',title:'测试曲目'},album={key:'album-a',tracks:[]};
  album.tracks=[track];
  const ctx={navigationRevision:0,navigationKey:'navigation',nativeCatalogReady:false,navigationReady:false,desktopShell:false,
    view:'home',selected:null,activePlaylist:null,artistContext:null,navigationDepth:0,current:null,albums:[album],queue:[],
    URLSearchParams,location:{search:shared?'?track=song-a&full=1&autoplay=1':''},history:{state:{},replaceState(state){this.state=state;}},
    document:{querySelector:()=>modal?{id:'desktop-settings-modal'}:null,querySelectorAll:()=>[]},catalogSync:{load:()=>catalog.promise},
    $:id=>{if(!nodes.has(id))nodes.set(id,{hidden:false,textContent:''});return nodes.get(id);},
    applyCatalog(){},get:id=>id===track.id?track:null,setCurrent(value){ctx.current=value;},
    openFull(){ctx.fullOpened=true;},play(){ctx.playRequested=true;},restorePlaybackSession(){},render(){},
    restoreNavigation(state){ctx.view=state.view;},rememberNavigation(){ctx.remembered=true;},
    nativePendingCommands:[],notifyNativeNavigation(){},notifyNativePlayback(){},checkCatalogUpdates(){},
    full:{},fullNavigationClosing:false,isFullOpen:()=>false,closeTrackMenu(){},closeFullMore(){},toggleFullQueue(){},toggleQueue(){},
    window:{scrollTo(){}},searchTimer:null,clearTimeout(){},leaveFixedSort(){},animateContentNavigation(){},
    navigationSnapshot:()=>({pageSchema:2,view:ctx.view})
  };
  vm.createContext(ctx);vm.runInContext(section('  async function load() {','  function applyAppleMusic()')+section('  function nativeGoHome() {','  function nativeCommand('),ctx);
  const pending=ctx.load();
  if(navigate){ctx.navigationRevision++;ctx.view='settings';ctx.navigationDepth=1;ctx.history.state={navigation:{pageSchema:2,view:'settings'}};}
  if(goHome)ctx.nativeGoHome();
  catalog.resolve({});await pending;
  return ctx;
}

async function deletion(){
  const oldCache=deferred(),freshCache=deferred(),track={id:'a',title:'测试曲目',src:'audio-a'},prepared=new Map([['audio-a','blob:prepared']]);
  let cacheCalls=0,paints=0;
  const ctx={view:'downloads',settingsDownloadsOpen:false,allCacheBusy:false,confirmDownloadId:'a',downloadDeletes:new Set(),
    downloadedSources:new Set(['audio-a']),downloadBatch:null,downloadBatchTitles:new Map(),current:track,prepareToken:0,
    audioCacheGeneration:0,audioBudget:()=>-1,audioSource:t=>t.src,preloadAllowed:()=>true,navigator:{serviceWorker:{controller:{}}},
    workerMessage:async data=>data.type==='DELETE_AUDIO'?{ok:true}:++cacheCalls===1?oldCache.promise:freshCache.promise,
    get:()=>track,clearDownloadConfirmation(){ctx.confirmDownloadId=null;},paintBufferedProgress(){paints++;},
    preparedAudio:prepared,URL:{revokeObjectURL(){}},render(){},updateCacheStatus(){},showSystemMessage(){}
  };
  vm.createContext(ctx);
  vm.runInContext(section('  const audioCacheJobs=','  if(\'serviceWorker\' in navigator')+section('  async function deleteDownloadedTrack(','  function trackRows('),ctx);
  const progress=vm.runInContext('audioDownloadProgress',ctx),jobs=vm.runInContext('audioCacheJobs',ctx);
  progress.set(track.src,1);
  const pending=ctx.cacheAudio(track.src);
  await ctx.deleteDownloadedTrack({dataset:{deleteDownload:'a'},disabled:false,isConnected:true});
  assert.equal(progress.has(track.src),false,'删除成功后必须清理旧的100%缓存进度');
  assert.equal(jobs.has(track.src),false,'删除成功应使旧的缓存请求失效');
  assert.equal(ctx.downloadedSources.has(track.src),false);assert.equal(prepared.has(track.src),false);
  const paintsAfterDelete=paints;assert.equal(paintsAfterDelete,1,'删除当前曲目缓存后立即重绘进度');
  oldCache.resolve({ok:true});assert.equal(await pending,false,'迟到的旧请求不能重新宣称已完成缓存');
  assert.equal(progress.has(track.src),false);assert.equal(paints,paintsAfterDelete);
  const restarted=ctx.cacheAudio(track.src);freshCache.resolve({ok:true});assert.equal(await restarted,true);
  assert.equal(progress.get(track.src),1,'删除之后的新请求仍能正常完成缓存');
}

(async()=>{
  for(const shared of [false,true]){
    const ctx=await startup({shared,navigate:true});assert.equal(ctx.view,'settings','慢网载入期间的主动导航应保留');
    assert.equal(ctx.fullOpened,undefined);assert.equal(ctx.playRequested,undefined);
  }
  const share=await startup();assert.equal(share.current.id,'song-a');assert.equal(share.fullOpened,true);assert.equal(share.playRequested,true);
  for(const navigate of [false,true]){
    const home=await startup({navigate,goHome:true});assert.equal(home.view,'home');
    assert.equal(home.fullOpened,undefined,'返回首页也应阻止迟到的分享初始化抢占页面');assert.equal(home.playRequested,undefined);
  }
  const modal=await startup({modal:true});assert.equal(modal.fullOpened,undefined,'已打开设置时，分享初始化不能在其上方打开播放页');assert.equal(modal.playRequested,undefined);
  await deletion();
  console.log('PASS startup/download state: delayed shared catalog preserves user navigation; delete invalidates progress and late cache completion');
})().catch(error=>{console.error(error);process.exitCode=1;});
