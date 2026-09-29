'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{
  const from=source.indexOf(start),to=source.indexOf(end,from);
  assert(from>=0&&to>from,`找不到测试代码段：${start}`);
  return source.slice(from,to);
};
const key='roylyl-music-navigation';
const copy=value=>JSON.parse(JSON.stringify(value));

function player({fallback=false,entries=[{other:'preserved'}],index=entries.length-1}={}){
  const tasks=[],frames=[],windowEvents={},documentEvents={},nodes=new Map();
  let focus=null,backCalls=0;
  const classList=()=>{const values=new Set();return {add:v=>values.add(v),remove:v=>values.delete(v),contains:v=>values.has(v)};};
  const node=id=>{
    if(!nodes.has(id))nodes.set(id,{value:'',hidden:true,dataset:{},classList:classList(),events:{},addEventListener(name,fn){this.events[name]=fn;},focus(){focus=id;},scrollIntoView(){ctx.scrollY=0;},setAttribute(){}});
    return nodes.get(id);
  };
  const full=node('full-player');full.open=false;
  if(!fallback){full.showModal=()=>{full.open=true;};full.close=()=>{full.open=false;tasks.push(()=>full.events.close?.());};}
  const history={entries:copy(entries),index,scrollRestoration:'auto',get state(){return this.entries[this.index];},replaceState(state){this.entries[this.index]=copy(state);},pushState(state){this.entries.splice(++this.index);this.entries.push(copy(state));},back(){backCalls++;this.go(-1);},forward(){this.go(1);},go(delta){tasks.push(()=>{const next=this.index+delta;if(next<0||next>=this.entries.length)return;this.index=next;windowEvents.popstate({state:this.state});});}};
  const albums=[{key:'album-a',tracks:[]},{key:'album-b',tracks:[]}];
  const ctx={closeFullMore(){},history,full,$:node,view:'albums',selected:null,activePlaylist:null,artistContext:null,collectionSort:['year','title','desc'],albums,appleMusic:{playlists:[{id:'playlist-a'}]},current:{id:'track-a'},scrollY:480,
    document:{body:{classList:classList()},fullscreenElement:null,addEventListener:(name,fn)=>{documentEvents[name]=fn;},exitFullscreen(){this.fullscreenElement=null;return Promise.resolve();}},
    window:{addEventListener:(name,fn)=>{windowEvents[name]=fn;},scrollTo:({top})=>{ctx.scrollY=top;}},
    requestAnimationFrame:fn=>frames.push(fn),setTimeout:()=>0,clearTimeout(){},render(){},icon:()=>'',updateFull(){},scrollActiveLyric(){},toggleFullQueue(){},closeTrackMenu(){},leaveFixedSort(){},toggleQueue(){},matchMedia:()=>({matches:false}),get:id=>({id,albumKey:'album-b'}),moreMenu:{hidden:true}};
  vm.createContext(ctx);
  vm.runInContext(section("  const navigationKey=",'  function openArtist(')+section('  function openArtist(','  function showPlaylist(')+section('  function openAlbum(','  function renderCurrent(')+section('  function isFullOpen(','  function updateFull(')+section('  function openFull(','  function toggleFullQueue(')+section("  full.addEventListener('cancel'","  for(const [button,target]")+section("  document.addEventListener('click',e=>{","  document.addEventListener('dblclick'"),ctx);
  const run=code=>vm.runInContext(code,ctx);
  const flushTasks=()=>{let count=0;while(tasks.length){assert(count++<20,'历史导航任务未收敛');tasks.shift()();}};
  const flushFrames=()=>{let count=0;while(frames.length){assert(count++<20,'动画帧任务未收敛');frames.shift()();}};
  const settle=()=>{let count=0;while(tasks.length||frames.length){assert(count++<20);flushTasks();flushFrames();}};
  const clickLink=(kind,value)=>documentEvents.click({target:{closest(selector){return selector===`[data-${kind}]`?{dataset:{[kind==='artist-link'?'artistLink':'trackAlbum']:value}}:null;}}});
  return {ctx,history,full,node,run,settle,flushTasks,flushFrames,clickLink,ready(){run('navigationReady=true;rememberNavigation();');},snapshot(){return copy(run('navigationSnapshot()'));},get focus(){return focus;},get backCalls(){return backCalls;}};
}

// A full player layer must retain all collection state and the underlying scroll.
{
  const p=player();p.ctx.view='playlist';p.ctx.activePlaylist=p.ctx.appleMusic.playlists[0];p.ctx.artistContext='歌手';
  for(const [id,value] of [['search','筛选词'],['artist','歌手'],['sort-primary','title'],['sort-secondary','year'],['sort-direction','asc']])p.node(id).value=value;
  p.ready();const base=p.snapshot();p.ctx.openFull();p.ctx.openFull();
  assert.equal(p.history.entries.length,2);assert.equal(p.history.state[key].full,true);assert.equal(p.history.state.other,'preserved');
  p.ctx.scrollY=0;p.ctx.rememberNavigation();assert.equal(p.history.state[key].scroll,480);
  p.history.back();p.settle();assert.equal(p.ctx.isFullOpen(),false);assert.deepEqual(p.snapshot(),base);
  p.history.forward();p.settle();assert.equal(p.ctx.isFullOpen(),true);assert.equal(p.history.entries.length,2);
  p.full.events.close();assert.equal(p.backCalls,1,'迟到的close事件不能关闭已重新打开的全屏');
}

// Back closes only the player, then continues to the previous collection page.
{
  const p=player();p.ready();p.ctx.openArtist('歌手');p.ctx.openAlbum(p.ctx.albums[0]);p.ctx.scrollY=325;p.node('search').value='专辑筛选';p.ctx.openFull();
  p.history.back();p.settle();assert.equal(p.ctx.selected.key,'album-a');assert.equal(p.node('search').value,'专辑筛选');assert.equal(p.ctx.scrollY,325);assert.equal(p.snapshot().depth,2);
  p.history.back();p.settle();assert.equal(p.ctx.selected,null);assert.equal(p.ctx.artistContext,'歌手');assert.equal(p.snapshot().depth,1);
}

// Close button, Escape, native dialog close and the dialog fallback consume one layer.
for(const method of ['button','escape','native','fallback']){
  const p=player({fallback:method==='fallback'});p.ready();p.ctx.openFull();
  if(method==='escape'){let prevented=false;p.full.events.cancel({preventDefault(){prevented=true;}});assert(prevented);}
  else if(method==='native')p.full.close();
  else {p.node('close-full').onclick();p.node('close-full').onclick();}
  p.settle();assert.equal(p.history.index,0,method);assert.equal(p.backCalls,1,method);assert.equal(p.ctx.isFullOpen(),false,method);assert.equal(p.ctx.document.body.classList.contains('full-open'),false,method);assert.equal(p.focus,'open-full',method);
  p.history.forward();p.settle();assert.equal(p.ctx.isFullOpen(),true,`${method}关闭后前进应恢复全屏`);
}

// A shared URL opens before load() enables navigation; bootstrap still seeds a base layer.
{
  const p=player();p.ctx.selected=p.ctx.albums[0];p.ctx.openFull();assert.equal(p.history.entries.length,1);p.ctx.scrollY=0;p.ready();
  assert.equal(p.history.entries.length,2);assert.equal(p.history.entries[0][key].full,false);assert.equal(p.history.entries[0][key].album,'album-a');assert.equal(p.history.entries[0][key].scroll,480);
  p.node('close-full').onclick();p.settle();assert.equal(p.ctx.selected.key,'album-a');assert.equal(p.ctx.scrollY,480);
}

// Artist/album links wait for asynchronous history traversal before opening the destination.
for(const kind of ['artist-link','track-album']){
  const p=player();p.ready();p.ctx.openAlbum(p.ctx.albums[0]);p.ctx.scrollY=310;p.node('search').value='原筛选';p.ctx.openFull();
  p.clickLink(kind,kind==='artist-link'?'目标歌手':'track-b');
  assert.equal(p.ctx.selected.key,'album-a','popstate之前不能切换页面');assert.equal(p.history.entries.length,3);
  p.settle();assert.equal(p.ctx.isFullOpen(),false);assert.equal(p.history.entries.length,3);assert.equal(p.history.state[key].full,false);
  if(kind==='artist-link')assert.equal(p.ctx.artistContext,'目标歌手');else assert.equal(p.ctx.selected.key,'album-b');
  assert.equal(p.focus,'back-albums','迟到的dialog close事件不能抢走目标页焦点');
  p.history.back();p.settle();assert.equal(p.ctx.selected.key,'album-a');assert.equal(p.node('search').value,'原筛选');assert.equal(p.ctx.scrollY,310);
}

// A link clicked while a shared player's close traversal is pending keeps its destination.
{
  const p=player();p.ctx.selected=p.ctx.albums[0];p.ctx.openFull();p.ready();p.ctx.closeFull();p.clickLink('artist-link','分享歌手');p.settle();
  assert.equal(p.backCalls,1);assert.equal(p.ctx.artistContext,'分享歌手');assert.equal(p.history.state[key].full,false);
  p.history.back();p.settle();assert.equal(p.ctx.selected.key,'album-a');assert.equal(p.ctx.isFullOpen(),false);
}

// Reloading a saved full-player state does not add a duplicate history entry.
{
  const original=player();original.ready();original.ctx.openFull();
  const p=player({entries:original.history.entries,index:original.history.index});p.run(`navigationReady=true;restoreNavigation(history.state[${JSON.stringify(key)}]);`);p.settle();
  assert.equal(p.ctx.isFullOpen(),true);assert.equal(p.history.entries.length,2);p.ctx.closeFull();p.settle();assert.equal(p.history.index,0);
}
console.log('通过：全屏历史层、底层筛选与滚动、前进恢复、按钮/Escape/原生/fallback退出、分享初始化、歌手/专辑跳转竞态。');
