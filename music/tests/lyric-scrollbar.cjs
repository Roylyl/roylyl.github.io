'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../web-host.js'),'utf8');
const start=source.indexOf('  const scrollIdleTimers='),end=source.indexOf('  const modalStack=',start);
assert(start>=0&&end>start);
class Element {
  constructor(id){this.id=id;const values=new Set();this.classList={add:name=>values.add(name),remove:name=>values.delete(name),contains:name=>values.has(name)};}
  matches(){return ['full-lyrics','queue-list','root'].includes(this.id);}
}
const events={},timers=new Map();let timerId=0;
const document={documentElement:new Element('root'),addEventListener:(name,handler)=>events[name]=handler};
const ctx={document,Element,WeakMap,setTimeout(fn){timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id)};
vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);
const lyric=new Element('full-lyrics'),queue=new Element('queue-list');
events.scroll({target:lyric});assert(lyric.classList.contains('is-scrolling'));assert.equal(timers.size,1);
lyric.classList.add('lyric-auto-follow');events.scroll({target:lyric});
assert(!lyric.classList.contains('is-scrolling'),'automatic following clears residual manual scroll state');assert.equal(timers.size,0);
events.scroll({target:lyric});assert(!lyric.classList.contains('is-scrolling'),'every automatic scroll remains quiet');
lyric.classList.remove('lyric-auto-follow');events.scroll({target:lyric});
assert(lyric.classList.contains('is-scrolling'),'manual scroll and seek previews may display the thumb');
events.scrollend({target:lyric});assert(!lyric.classList.contains('is-scrolling'));assert.equal(timers.size,0);
events.scroll({target:queue});assert(queue.classList.contains('is-scrolling'),'queue scrolling retains its existing feedback');
for(const [id,fn] of [...timers]){timers.delete(id);fn();}
assert(!queue.classList.contains('is-scrolling'));
events.scroll({target:document});assert(document.documentElement.classList.contains('is-scrolling'));
events.scrollend({target:document});assert(!document.documentElement.classList.contains('is-scrolling'));
console.log('PASS lyric scrollbar: automatic follow hides, manual/preview scroll shows, native end and fallback clear, queues and document remain independent');
