'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a);return source.slice(a,b);};
let hydrated=0,unobserved=0,created=0;
class Node {
  constructor(tag='div'){this.tagName=tag;this.children=[];this.parentElement=null;this.dataset={};this.style={};this.attributes={};const values=new Set();this.classList={toggle:(name,on)=>on?values.add(name):values.delete(name),contains:name=>values.has(name)};}
  get nextElementSibling(){if(!this.parentElement)return null;return this.parentElement.children[this.parentElement.children.indexOf(this)+1]||null;}
  append(...nodes){for(const node of nodes)this.insertBefore(node,null);}
  insertBefore(node,before){node.remove();const index=before?this.children.indexOf(before):this.children.length;assert(index>=0);this.children.splice(index,0,node);node.parentElement=this;}
  remove(){if(!this.parentElement)return;const list=this.parentElement.children;list.splice(list.indexOf(this),1);this.parentElement=null;}
  setAttribute(name,value){this.attributes[name]=value;}
  removeAttribute(name){delete this.attributes[name];if(name==='data-queued-repeat')delete this.dataset.queuedRepeat;if(name==='data-queue-inserted')delete this.dataset.queueInserted;}
  querySelector(selector){return selector==='.track-no'?this.number:null;}
  querySelectorAll(selector){return selector==='img[data-cover-path]'&&this.image?[this.image]:[];}
}
const document={createElement(tag){const node=new Node(tag);if(tag==='template')Object.defineProperty(node,'innerHTML',{set(markup){created++;const data=JSON.parse(markup),row=new Node();row.dataset.track=data.id;row.number=new Node('button');row.image={id:data.id,serial:created};row.title=data.title;node.content={firstElementChild:row};}});return node;}};
const ctx={document,current:{id:'a'},audio:{paused:true},pendingTrackId:null,coverObserver:{unobserve(){unobserved++;}},coverSource:path=>'https://example.test/'+path,
 trackRows:items=>JSON.stringify({id:items[0].id,title:items[0].title,cover:items[0].cover}),hydrateCovers(){hydrated++;},updateQueueMarkers(){}};
vm.createContext(ctx);vm.runInContext(section('  function renderQueueWindow(','  function renderQueue()'),ctx);
const track=(id,extra={})=>({id,title:id,cover:id+'.jpg',...extra});
const list=new Node();list.scrollTop=0;list.clientHeight=216;list._queueItems=Array.from({length:100},(_,i)=>track(String(i)));
ctx.renderQueueWindow(list);
const rows=()=>list.children.filter(row=>row._queueEntryKey),at=id=>rows().find(row=>row.dataset.track===id);
assert.equal(rows().length,12);const retained=at('8'),image=retained.image;const initialHydrated=hydrated;
list.scrollTop=6*72;ctx.renderQueueWindow(list);
assert.equal(at('8'),retained,'overlapping queue rows keep DOM identity');assert.equal(at('8').image,image,'visible artwork is not recreated during scroll');
assert.equal(hydrated-initialHydrated,2,'only the two entering rows bind artwork');assert.equal(rows().length,12);assert.equal(unobserved,2);
list.scrollTop=0;const beforeReturn=hydrated;ctx.renderQueueWindow(list);assert.equal(at('8'),retained,'scrolling back retains the overlapping visible row');assert.equal(hydrated-beforeReturn,2,'returning only binds rows that reenter the window');
list.scrollTop=6*72;ctx.renderQueueWindow(list);
const beforeForce=created;ctx.renderQueueWindow(list,true);assert.equal(created,beforeForce,'unchanged forced state does not recreate rows');assert.equal(at('8'),retained);
list._queueItems=list._queueItems.map(item=>({...item}));ctx.renderQueueWindow(list,true);assert.equal(at('8'),retained,'new catalog objects with identical content retain rows');
list._queueItems=list._queueItems.map(item=>item.id==='8'?{...item,title:'renamed'}:item);ctx.renderQueueWindow(list,true);
assert.notEqual(at('8'),retained,'changed metadata updates the corresponding row');assert.equal(at('8').title,'renamed');assert.equal(at('7').image.id,'7');
const beforeRevision=at('8');ctx.coverSource=path=>'https://example.test/'+path+(path==='8.jpg'?'?v=2':'');ctx.renderQueueWindow(list,true);
assert.notEqual(at('8'),beforeRevision,'a changed cover revision binds the fresh source even when its path is unchanged');assert.equal(at('7').image.id,'7');
list.scrollTop=0;list._queueItems=[track('a',{_queueCurrent:true}),track('a',{_queueInserted:true}),track('a'),track('a')];ctx.renderQueueWindow(list,true);
assert.equal(rows().length,4);assert.equal(new Set(rows().map(row=>row._queueEntryKey)).size,4,'current, inserted and repeated regular occurrences never collapse');
assert.equal(rows()[0].dataset.queuedRepeat,undefined);assert.equal(rows()[1].dataset.queueInserted,'true');assert.equal(rows()[2].dataset.queuedRepeat,'true');
const originalRegular=rows()[2];list._queueItems=[track('a',{_queueCurrent:true}),track('b',{_queueInserted:true}),track('a',{_queueInserted:true}),track('a'),track('a')];ctx.renderQueueWindow(list,true);
assert.equal(rows()[3],originalRegular,'inserting a row does not recreate the unchanged original occurrence');assert.equal(rows()[3].number.dataset.number,'04');
list._queueItems=[];ctx.renderQueueWindow(list,true);assert.equal(rows().length,0);assert(list._queueEmpty.parentElement===list);
list._queueItems=[track('z')];ctx.renderQueueWindow(list,true);assert.equal(rows().length,1);assert.equal(list._queueEmpty.parentElement,null,'empty state leaves no stale element');
console.log('PASS queue rendering: overlap identity, entering-only covers, metadata updates, duplicate occurrences, insertion, numbering and empty recovery');
