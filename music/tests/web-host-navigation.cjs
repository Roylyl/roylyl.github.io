'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../web-host.js'),'utf8');
const begin=source.indexOf('  const modalStack='),end=source.indexOf('  const bytes=',begin);
assert(begin>=0&&end>begin);
const tasks=[],nodes=new Map(),listeners={};let backCalls=0,completed=0;
function node(id){
  if(!nodes.has(id))nodes.set(id,{id,open:false,hidden:true,parentElement:null,events:{},append(child){child.parentElement=this;},addEventListener(name,fn){this.events[name]=fn;},showModal(){this.open=true;},close(){this.open=false;tasks.push(()=>this.events.close?.());}});
  return nodes.get(id);
}
const history={entries:[{}],index:0,get state(){return this.entries[this.index];},pushState(state){this.entries.splice(++this.index);this.entries.push({...state});},back(){backCalls++;tasks.push(()=>{if(this.index>0){this.index--;listeners.popstate({state:this.state,stopImmediatePropagation(){}});}});}};
const ctx={$:node,window:{musicMobileShell:true,addEventListener:(name,fn)=>listeners[name]=fn},document:{querySelectorAll:()=>[],body:node('body')},history,queueMicrotask:fn=>tasks.push(fn)};
vm.createContext(ctx);vm.runInContext(source.slice(begin,end),ctx);
function settle(){let count=0;while(tasks.length){assert(count++<30);tasks.shift()();}}
ctx.openDialog(node('web-confirm'));ctx.dismissDialog(node('web-confirm'),()=>completed++);ctx.dismissDialog(node('web-confirm'),()=>completed++);
assert.equal(backCalls,1,'关闭尚未完成时，不得重复退回历史');settle();assert.equal(history.index,0);assert.equal(completed,1);assert.equal(node('web-confirm').open,false);
ctx.openDialog(node('desktop-settings-modal'));history.pushState({...history.state,settingsPage:'downloads'});
ctx.dismissDialog(node('desktop-settings-modal'));ctx.dismissDialog(node('desktop-settings-modal'));settle();
assert.equal(node('desktop-settings-modal').open,true,'退回设置子页时应保留窗口');assert.equal(history.state.settingsPage,undefined);
ctx.dismissDialog(node('desktop-settings-modal'));settle();assert.equal(node('desktop-settings-modal').open,false,'子页返回完成后，应允许正常关闭设置');
ctx.openDialog(node('desktop-settings-modal'));assert.equal(node('web-download-tray').parentElement,node('desktop-settings-modal'),'后台进度入口必须留在设置弹窗内');
ctx.openDialog(node('web-download'));ctx.dismissDialog(node('web-download'));settle();assert.equal(node('web-download-tray').parentElement,node('desktop-settings-modal'),'收起下载窗口后应能在设置中重新打开');
ctx.dismissDialog(node('desktop-settings-modal'));settle();assert.equal(node('web-download-tray').parentElement,node('body'),'关闭设置后，进度入口返回主页面');
node('full-player').open=true;ctx.placeDownloadTray();assert.equal(node('web-download-tray').parentElement,node('full-player'),'全屏播放时进度入口须位于播放窗口内');
console.log('PASS web host navigation: deduplicated closing, one callback and reusable parent close');
