'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const begin=source.indexOf('  function installMiniPlayerSwipe() {'),end=source.indexOf('  installMiniPlayerSwipe();',begin);
assert(begin>=0&&end>begin);
const events={},nowEvents={},windowEvents={},classes=new Set(),moves=[];
let capture=null,opened=0;
const now={clientWidth:360,classList:{add:value=>classes.add(value),remove:value=>classes.delete(value)},
  style:{setProperty(){},removeProperty(){}},addEventListener:(name,fn)=>nowEvents[name]=fn,
  hasPointerCapture:id=>capture===id,setPointerCapture:id=>{capture=id;},releasePointerCapture:()=>{capture=null;}};
const control=id=>({id}),coverButton=control('open-full'),textButton=control('open-full-copy'),independentButton=control('now-like');
const target=button=>({closest:selector=>selector==='.player .now'?now:selector==='button,a,input,select'?button:null});
const cover=target(coverButton),text=target(textButton),independent=target(independentButton),outside={closest:()=>null};
const ctx={document:{querySelector:()=>now,addEventListener:(name,fn)=>events[name]=fn},
  window:{addEventListener:(name,fn)=>windowEvents[name]=fn},matchMedia:()=>({matches:false}),
  performance:{now:()=>100},current:{id:'song-a'},isFullOpen:()=>false,tracePlayback(){},nativeCall(){},advance:direction=>moves.push(direction),Math};
vm.createContext(ctx);vm.runInContext(source.slice(begin,end)+'\ninstallMiniPlayerSwipe();',ctx);
const pointer=(element,x)=>({target:element,pointerId:1,isPrimary:true,button:0,clientX:x,clientY:20,cancelable:true,preventDefault(){}});
function click(element){let blocked=false;events.click({target:element,detail:1,preventDefault(){blocked=true;},stopImmediatePropagation(){}});if(!blocked&&[cover,text].includes(element))opened++;return blocked;}
function dragstart(element){let prevented=false;nowEvents.dragstart({target:element,preventDefault(){prevented=true;}});return prevented;}
function swipe(element,start,end){events.pointerdown(pointer(element,start));events.pointermove(pointer(element,end));events.pointerup(pointer(element,end));}

assert.equal(dragstart(cover),true,'专辑图片的原生拖拽必须让位于切歌手势');
assert.equal(dragstart(text),true,'文字区域同样不能触发浏览器原生拖拽');
assert.equal(dragstart(independent),false,'独立操作按钮不应被拖拽保护接管');
assert.equal(dragstart(outside),false,'播放器以外内容不应受影响');
swipe(cover,100,200);assert.deepEqual(moves,[-1],'从封面右滑必须上一首且只触发一次');assert.equal(click(cover),true);assert.equal(opened,0);
swipe(text,200,100);assert.deepEqual(moves,[-1,1],'文字区域左滑必须下一首且只触发一次');assert.equal(click(text),true);assert.equal(opened,0);
swipe(independent,100,200);assert.deepEqual(moves,[-1,1]);assert.equal(click(independent),false,'独立按钮仍可正常点击');
events.pointerdown(pointer(cover,100));events.pointerup(pointer(cover,101));assert.equal(click(cover),false);assert.equal(opened,1,'未达到切歌阈值的普通点击仍应打开播放页');
assert.equal(classes.has('is-swiping'),false);assert.equal(capture,null);
console.log('PASS mini player swipe: album native drag suppressed; independent controls untouched; left/right advance once and suppress accidental open');
