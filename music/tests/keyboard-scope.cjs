'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const begin=source.indexOf("  document.addEventListener('keydown',e=> {"),end=source.indexOf("  audio.addEventListener('loadedmetadata'",begin);
assert(begin>=0&&end>begin);
let handler,modal=null,plays=0,focuses=0;
const ctx={document:{addEventListener:(_,fn)=>handler=fn,querySelector:selector=>{assert.equal(selector,'dialog[open]:not(#full-player)');return modal;}},
  $:id=>({hidden:true,focus:()=>focuses++,click:()=>{assert.equal(id,'play');plays++;}}),moreMenu:{hidden:true},view:'albums',isFullOpen:()=>false};
vm.createContext(ctx);vm.runInContext(source.slice(begin,end),ctx);
const event=(key,code)=>({key,code,target:{tagName:'DIV'},preventDefault(){},stopPropagation(){}});
for(const dialog of ['desktop-settings-modal','web-options','web-confirm','web-download','sleep-dialog']){
  modal={id:dialog};handler(event(' ','Space'));handler(event('/','Slash'));
}
assert.equal(plays,0,'弹窗内快捷键不得播放背景歌曲');assert.equal(focuses,0,'弹窗内快捷键不得聚焦背景搜索');
modal=null;handler(event(' ','Space'));handler(event('/','Slash'));assert.equal(plays,1);assert.equal(focuses,1);
handler({...event(' ','Space'),target:{tagName:'INPUT'}});assert.equal(plays,1);
console.log('PASS keyboard scope: five modal types isolated, collection shortcuts retained');
