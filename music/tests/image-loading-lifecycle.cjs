'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../image-loading.js'),'utf8');
const deferred=()=>{let resolve;const promise=new Promise(done=>resolve=done);return {promise,resolve};};
const settle=()=>new Promise(resolve=>setImmediate(resolve));
let mutation;
class Node {
  constructor(tag='span'){
    this.tagName=tag.toUpperCase();this.nodeType=1;this.attributes=new Map();this.dataset={};this.children=[];
    this.events={};this.hidden=false;this.isConnected=true;this.style={};this.classList={add(){}};
  }
  append(node){node.parentElement=this;this.children.push(node);}
  replaceChildren(...nodes){this.children=[];nodes.forEach(node=>this.append(node));}
  remove(){this.parentElement.children=this.parentElement.children.filter(node=>node!==this);this.isConnected=false;}
  setAttribute(name,value){this.attributes.set(name,String(value));}
  getAttribute(name){return this.attributes.has(name)?this.attributes.get(name):null;}
  removeAttribute(name){this.attributes.delete(name);}
  toggleAttribute(name,enabled){enabled?this.setAttribute(name,''):this.removeAttribute(name);}
  addEventListener(name,handler){this.events[name]=handler;}
  removeEventListener(name,handler){if(this.events[name]===handler)delete this.events[name];}
  dispatchEvent(event){Object.defineProperty(event,'target',{value:this});this.events[event.type]?.(event);return !event.defaultPrevented;}
  matches(selector){return selector==='img'&&this.tagName==='IMG';}
  querySelectorAll(){return [];}
  closest(){return null;}
  getBoundingClientRect(){return {left:0,top:0,width:44,height:44,bottom:44};}
}
class Image extends Node {
  constructor(address){super('img');this.src=address;this.currentSrc=address;this.complete=false;this.naturalWidth=0;this.animations=[];this.decodeTask=null;}
  set src(value){this.setAttribute('src',value);}
  get src(){return this.getAttribute('src')||'';}
  decode(){return this.decodeTask?.promise||Promise.resolve();}
  animate(){const item={cancelled:false,cancel(){this.cancelled=true;}};this.animations.push(item);return item;}
}
const observer=class {observe(){}unobserve(){}};
const document={documentElement:{lang:'zh-CN'},body:new Node('body'),hidden:false,querySelectorAll:()=>[],addEventListener(){}};
const ctx={document,Map,Set,JSON,Event,IntersectionObserver:observer,ResizeObserver:observer,
  MutationObserver:class {constructor(fn){mutation=fn;}observe(){}},
  requestAnimationFrame(){return 1;},getComputedStyle:()=>({position:'relative'}),matchMedia:()=>({matches:false}),
  window:{addEventListener(){}},innerHeight:900};
document.createElement=tag=>new Node(tag);
vm.createContext(ctx);vm.runInContext(source,ctx);
function add(img){const host=new Node('div');host.append(img);mutation([{type:'childList',addedNodes:[img],removedNodes:[]}]);return host;}
function change(img,address){img.src=address;img.currentSrc=address;img.complete=false;img.naturalWidth=0;mutation([{type:'attributes',target:img}]);}
function loaded(img){img.complete=true;img.naturalWidth=44;img.events.load();}
function remove(img){img.isConnected=false;mutation([{type:'childList',addedNodes:[],removedNodes:[img]}]);}

(async()=>{
  const first=new Image('cover-a');add(first);loaded(first);await settle();
  assert.equal(first.dataset.imageState,'ready');assert.equal(first.animations.length,1,'first genuinely loaded source may fade in');
  first.events.load();mutation([{type:'attributes',target:first}]);await settle();
  assert.equal(first.animations.length,1,'duplicate load and identical attribute mutations do not restart a fade');
  assert.equal(first.animations[0].cancelled,false,'identical source does not cancel its current presentation');

  const rebuilt=new Image('cover-a');add(rebuilt);loaded(rebuilt);await settle();
  assert.equal(rebuilt.dataset.imageState,'ready');assert.equal(rebuilt.animations.length,0,'same source rebuilt in another surface stays stable');

  const responsive=new Image('cover-responsive');add(responsive);loaded(responsive);await settle();
  responsive.currentSrc='cover-a';responsive.events.load();await settle();
  assert.equal(responsive.animations[0].cancelled,true,'srcset candidate changes cancel the old animation even when attributes stay unchanged');
  assert.equal(responsive.animations.length,1,'an already presented responsive source does not fade again');

  change(first,'cover-b');assert.equal(first.animations[0].cancelled,true,'source change cancels old animation');
  first.decodeTask=deferred();loaded(first);const oldDecode=first.decodeTask;
  change(first,'cover-c');oldDecode.resolve();await settle();
  assert.equal(first.dataset.imageState,'loading','late decode cannot mark the replacement source ready');
  assert.equal(first.src,'cover-c');
  assert.equal(first.animations.length,1);
  first.decodeTask=null;loaded(first);await settle();
  assert.equal(first.dataset.imageState,'ready');assert.equal(first.animations.length,2,'new replacement source still receives a first presentation');
  remove(first);assert.equal(first.animations[1].cancelled,true,'detaching an image cancels its animation');
  assert.equal(first.events.load,undefined);assert.equal(first.events.error,undefined);

  const abandoned=new Image('cover-d');add(abandoned);abandoned.decodeTask=deferred();loaded(abandoned);remove(abandoned);
  abandoned.decodeTask.resolve();await settle();assert.equal(abandoned.animations.length,0,'detached decode cannot start an animation');

  const cached=new Image('cover-e');cached.complete=true;cached.naturalWidth=44;add(cached);
  assert.equal(cached.dataset.imageState,'ready');assert.equal(cached.animations.length,0,'already decoded image is immediately visible');
  const cachedCopy=new Image('cover-e');add(cachedCopy);loaded(cachedCopy);await settle();assert.equal(cachedCopy.animations.length,0);

  const retry=new Image('cover-error'),host=add(retry);retry.events.error();assert.equal(retry.dataset.imageState,'error');
  const overlay=host.children.find(node=>node.className==='image-placeholder');
  assert.equal(overlay.hidden,false);assert.equal(overlay.children[0].tagName,'BUTTON');
  overlay.children[0].events.click();assert.equal(retry.dataset.imageState,'loading');
  mutation([{type:'attributes',target:retry}]);loaded(retry);await settle();
  assert.equal(retry.dataset.imageState,'ready');assert.equal(overlay.hidden,true,'error retry still recovers normally');

  const bound=new Image('placeholder'),boundHost=add(bound);bound.dataset.coverState='error';bound.events.error();
  const boundOverlay=boundHost.children.find(node=>node.className==='image-placeholder');
  bound.addEventListener('roylyl-cover-retry',event=>{event.preventDefault();bound.dataset.coverState='loading';bound.dispatchEvent(new Event('roylyl-cover-loading'));});
  const previousAddress=bound.src;boundOverlay.children[0].events.click();
  assert.equal(bound.src,previousAddress,'bound retry must not reset src to the raw resource URL');
  assert.equal(bound.dataset.imageState,'loading');
  loaded(bound);await settle();assert.equal(bound.dataset.imageState,'loading','late placeholder load must not claim the remote cover succeeded');
  bound.dataset.coverState='error';bound.events.error();loaded(bound);await settle();
  assert.equal(bound.dataset.imageState,'error','late placeholder load must not clear the cover error');
  delete bound.dataset.coverState;change(bound,'cover-retried');loaded(bound);await settle();
  assert.equal(bound.dataset.imageState,'ready');

  console.log('PASS image lifecycle: source deduplication, cached reconstruction, duplicate events, stale decode guards, animation cancellation and retry');
})().catch(error=>{console.error(error);process.exitCode=1;});
