'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const start=source.indexOf('  function nativeHandleBack()'),end=source.indexOf('  function nativeGoHome()',start);
assert(start>=0&&end>start);
function fixture(){
  const calls=[],nodes=new Map();
  const ctx={calls,$:id=>{if(!nodes.has(id))nodes.set(id,{open:false,hidden:true,close:()=>calls.push('timer')});return nodes.get(id);},
    nativeCall:()=>false,moreMenu:{hidden:true},isFullOpen:()=>false,fullNavigationClosing:false,navigationDepth:0,view:'home',selected:null,artistContext:null,
    closeFullMore:()=>calls.push('full-menu'),closeTrackMenu:()=>calls.push('track-menu'),toggleFullQueue:()=>calls.push('full-queue'),toggleQueue:()=>calls.push('queue'),
    closeFull:()=>calls.push('player'),history:{back:()=>calls.push('back')},nativeGoHome:()=>calls.push('home'),queueMicrotask:fn=>fn(),notifyNativeNavigation(){}};
  vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);return ctx;
}
for(const scenario of ['page','root-page','timer','full-menu','track-menu','full-queue','queue','player','home']){
  const p=fixture();let expected=scenario;
  if(scenario==='page'){p.navigationDepth=2;expected='back';}
  if(scenario==='root-page'){p.view='settings';expected='home';}
  if(scenario==='timer'){p.$('sleep-dialog').open=true;p.navigationDepth=2;}
  if(scenario==='full-menu')p.$('full-more-menu').hidden=false;
  if(scenario==='track-menu')p.moreMenu.hidden=false;
  if(scenario==='full-queue')p.$('full-queue').hidden=false;
  if(scenario==='queue')p.$('queue-panel').hidden=false;
  if(scenario==='player')p.isFullOpen=()=>true;
  assert.equal(p.nativeHandleBack(),scenario!=='home',scenario);
  assert.deepEqual(p.calls,scenario==='home'?[]:[expected],scenario);
}
console.log('PASS back control: page history, root fallback and overlay priority');
