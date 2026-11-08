'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a);return source.slice(a,b);};

function shortcuts(){
  const changes=[],nodes=new Map();
  const ctx={desktopShell:true,matchMedia:()=>({matches:true}),moreMenu:{hidden:true},advance:value=>changes.push(value),$:id=>{if(!nodes.has(id))nodes.set(id,{hidden:true});return nodes.get(id);}};
  vm.createContext(ctx);vm.runInContext(section('  function handleTrackShortcut(','  document.addEventListener(\'keydown\',e=> {'),ctx);
  const event=(key,options={})=>({key,target:{tagName:'BODY',isContentEditable:false,closest:()=>null},preventDefault(){this.prevented=true;},...options});
  for(const key of ['a','A','ArrowLeft','d','D','ArrowRight']){
    const e=event(key,{target:{tagName:'BUTTON',closest:()=>null}});assert.equal(ctx.handleTrackShortcut(e),true);assert.equal(e.prevented,true);
  }
  assert.deepEqual(changes,[-1,-1,-1,1,1,1]);
  for(const tagName of ['INPUT','SELECT','TEXTAREA'])assert.equal(ctx.handleTrackShortcut(event('ArrowLeft',{target:{tagName,closest:()=>null}})),false);
  for(const flag of ['repeat','defaultPrevented','ctrlKey','altKey','metaKey','isComposing'])assert.equal(ctx.handleTrackShortcut(event('d',{[flag]:true})),false);
  assert.equal(ctx.handleTrackShortcut(event('a',{target:{tagName:'DIV',isContentEditable:true}})),false);
  assert.equal(ctx.handleTrackShortcut(event('ArrowLeft',{target:{tagName:'BUTTON',closest:()=>({role:'tablist'})}})),false);
  ctx.moreMenu.hidden=false;assert.equal(ctx.handleTrackShortcut(event('d')),false);ctx.moreMenu.hidden=true;
  ctx.$('full-more-menu').hidden=false;assert.equal(ctx.handleTrackShortcut(event('a')),false);ctx.$('full-more-menu').hidden=true;
  ctx.desktopShell=false;ctx.matchMedia=()=>({matches:false});assert.equal(ctx.handleTrackShortcut(event('a')),false);
  ctx.matchMedia=()=>({matches:true});assert.equal(ctx.handleTrackShortcut(event('a')),true,'窄窗口中的电脑键盘仍可切歌');
}

function preview(){
  const nodes=new Map(),windowEvents={},commits=[];let clock=5,writes=0;
  const box={clientHeight:200,scrollTop:0,scrolls:[],events:{},addEventListener(name,fn){this.events[name]=fn;},getBoundingClientRect:()=>({top:0}),scrollTo(value){this.scrolls.push(value);this.scrollTop=value.top;}};
  const groups=[0,30,60,90].map((time,index)=>({time,lines:[String(index)],index}));
  const rows=groups.map((group,index)=>({classList:{active:false,add(){this.active=true;},remove(){this.active=false;}},getBoundingClientRect:()=>({top:index*100-box.scrollTop})}));
  box.querySelector=selector=>selector==='.lyric-group.is-active'?rows.find(row=>row.classList.active):rows[Number(selector.match(/data-group="(\d+)"/)?.[1])];
  const node=id=>{if(id==='full-lyrics')return box;if(!nodes.has(id))nodes.set(id,{value:'0',events:{},style:{setProperty(){}},attributes:{},addEventListener(name,fn){this.events[name]=fn;},setAttribute(name,value){this.attributes[name]=value;}});return nodes.get(id);};
  const audio={duration:120,get currentTime(){return clock;},set currentTime(value){clock=value;writes++;}};
  const ctx={lyricPreviewPosition:null,lyricManualUntil:0,lyricFollowTimer:null,lyricActiveIndex:-1,lyricGroups:groups,RoylylLyrics:require('../lyric-parser.js'),audio,
    seekDrag:false,pendingResumePosition:null,current:{id:'a',duration:120},loadedTrackId:'a',$:node,time:String,
    Date:{now:()=>1000},clearTimeout(){},setTimeout(){return 1;},window:{matchMedia:()=>({matches:false}),addEventListener(name,fn){windowEvents[name]=fn;}},
    seekPlayback(position){commits.push(position);audio.currentTime=position;ctx.updateLyricPosition(true,position);}};
  vm.createContext(ctx);
  vm.runInContext(section('  function scrollActiveLyric(','  audio.addEventListener(\'seeked\''),ctx);
  vm.runInContext(section('  function paintSeekProgress()','  let seekDrag='),ctx);
  vm.runInContext(section("  for(const id of ['seek','full-seek']){\n    const input=$(id);", "  audio.addEventListener('durationchange'"),ctx);
  ctx.updateLyricPosition(true);assert.equal(ctx.lyricActiveIndex,0);
  for(const id of ['seek','full-seek']){
    const input=node(id);box.events.wheel();assert(ctx.lyricManualUntil>1000);
    input.events.pointerdown();input.value='75';input.events.input();
    assert.equal(ctx.lyricActiveIndex,3);assert.equal(audio.currentTime,5);assert.equal(writes,0);assert.equal(commits.length,0);
    assert.equal(node('seek').value,'75');assert.equal(node('full-seek').value,'75');
    assert.equal(box.scrolls.at(-1).behavior,'instant','拖动预览不得排队平滑滚动');
    clock=7;ctx.renderPlaybackProgress();ctx.updateLyricPosition();
    assert.equal(ctx.lyricActiveIndex,3,'播放timeupdate不能抢回拖动时的歌词');assert.equal(input.value,'75');
    input.events.pointercancel();assert.equal(ctx.lyricPreviewPosition,null);assert.equal(ctx.lyricActiveIndex,0);assert.equal(commits.length,0);
    clock=5;
  }
  const input=node('full-seek');input.events.pointerdown();input.value='50';input.events.input();assert.equal(writes,0);
  input.events.change();assert.deepEqual(commits,[60]);assert.equal(writes,1);assert.equal(ctx.lyricActiveIndex,2);assert.equal(ctx.lyricPreviewPosition,null);
  assert.equal(ctx.seekDrag,false);
}

shortcuts();preview();
console.log('PASS keyboard/seek preview: desktop track keys respect controls, drag previews lyrics without seeking, cancellation restores and release commits once');
