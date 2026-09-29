'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const parser=require('../lyric-parser.js');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const segment=source.slice(source.indexOf('  let lyricRequest ='),source.indexOf('  const artistNames'));
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {promise,resolve,reject};};
const settle=async()=>{await new Promise(resolve=>setImmediate(resolve));};
const track=(id='a')=>({id,src:id+'.mp3',title:id,artist:'测试',lyricRevision:'v1'});
function harness(){
  let now=1000000,id=0,network=async()=>new Response('[00:01.00]正文');
  const entries=new Map(),calls=[],timers=new Map(),nodes=new Map(),events={};
  const node=name=>{
    if(!nodes.has(name))nodes.set(name,{innerHTML:'',textContent:'',disabled:false,clientHeight:200,scrollTop:0,events:{},scrolls:[],classList:{add(){},remove(){}},
      addEventListener(type,fn){this.events[type]=fn;},scrollTo(value){this.scrolls.push(value);this.scrollTop=value.top;},
      getBoundingClientRect(){return {top:0};},insertAdjacentHTML(_,html){this.innerHTML+=html;},
      querySelector(selector){if(selector.startsWith('[data-group=')){const n=node(name+selector);n.getBoundingClientRect=()=>({top:180});return n;}return node(name+selector);}
    });return nodes.get(name);
  };
  const faults={};
  const cache={
    async match(address){if(faults.match)throw Error('blocked match');return entries.get(address)?.clone();},
    async put(address,response){if(faults.put)throw Error('QuotaExceededError');entries.set(address,response.clone());}
  };
  const ctx={current:track(),queue:[],repeat:'all',audio:{currentTime:2,addEventListener:(type,fn)=>events[type]=fn},
    $:node,url:p=>'https://example.test/'+p,esc:s=>s,RoylylLyrics:parser,LYRIC_CACHE:'lyrics',Response,AbortController,console,
    Date:{now:()=>now},window:{caches:true,matchMedia:()=>({matches:false})},
    caches:{async open(){if(faults.open)throw Error('SecurityError');return cache;},async delete(){entries.clear();}},
    fetch:async(address,options)=>{calls.push({address,options});return network(address,options);},
    setTimeout(fn,delay){timers.set(++id,{fn,delay});return id;},clearTimeout(key){timers.delete(key);}
  };
  vm.createContext(ctx);vm.runInContext(segment+'\nglobalThis.api={loadLyrics,preloadNextLyrics,updateLyricPosition,getState:()=>lyricState,getGroups:()=>lyricGroups};',ctx);
  return {ctx,api:ctx.api,node,entries,calls,faults,events,timers,setNetwork:fn=>network=fn,advance:ms=>now+=ms,now:()=>now,
    expire(delay){for(const [key,timer] of [...timers])if(timer.delay===delay){timers.delete(key);now+=delay;timer.fn();}}};
}
(async()=>{
  for(const fault of ['open','match','put']){
    const h=harness();h.faults[fault]=true;await h.api.loadLyrics(h.ctx.current);
    assert.equal(h.api.getState(),'ready',fault+' failure must not hide available lyrics');
    assert(h.node('full-lyrics').innerHTML.includes('正文'));
  }
  let h=harness();h.setNetwork(async()=>new Response('',{status:503}));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'error');assert.equal(h.entries.size,0);
  h.setNetwork(async()=>new Response('[00:01]恢复'));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'ready');assert.equal(h.calls.length,2,'same-track failure must retry');
  h.setNetwork(async()=>new Response('[00:01]新版'));await h.api.loadLyrics(h.ctx.current,{force:true});
  assert(h.node('full-lyrics').innerHTML.includes('新版'));assert.equal(h.calls.at(-1).options.cache,'reload');
  h=harness();h.setNetwork(async()=>new Response('',{status:404}));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'not-found');await h.api.loadLyrics(h.ctx.current);assert.equal(h.calls.length,1);
  h.advance(61000);h.setNetwork(async()=>new Response('[00:01]已补全'));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'ready');assert.equal(h.calls.length,2);
  h.advance(86400001);h.setNetwork(async()=>{throw new TypeError('offline');});await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'ready');assert(h.node('full-lyrics').innerHTML.includes('已补全'));

  for(const failure of ['server','timeout','body-timeout']){
    h=harness();await h.api.loadLyrics(h.ctx.current);h.advance(86400001);
    const cachedAt=[...h.entries.values()][0].headers.get('X-Roylyl-Cached-At');
    h.setNetwork((address,{signal})=>{
      if(failure==='server')return new Response('',{status:503});
      const stalled=()=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))));
      return failure==='body-timeout'?{ok:true,status:200,text:stalled}:stalled();
    });
    const refresh=h.api.loadLyrics(h.ctx.current);await settle();
    if(failure!=='server')h.expire(10000);
    await refresh;
    assert.equal(h.api.getState(),'ready',failure+' must retain expired successful lyrics');
    assert(h.node('full-lyrics').innerHTML.includes('正文'));
    assert.equal([...h.entries.values()][0].headers.get('X-Roylyl-Cached-At'),cachedAt,'fallback must not renew the cache TTL');
    h.setNetwork(async()=>new Response('[00:01]更新成功'));await h.api.loadLyrics(h.ctx.current);
    assert.equal(h.calls.length,3,'stale fallback must allow the next request to refresh');
    assert(h.node('full-lyrics').innerHTML.includes('更新成功'));
  }
  for(const failure of ['server','timeout']){
    h=harness();await h.api.loadLyrics(h.ctx.current);h.advance(86400001);
    h.setNetwork((address,{signal})=>failure==='server'?new Response('',{status:503}):new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted')))));
    const refresh=h.api.loadLyrics(h.ctx.current,{force:true});await settle();
    if(failure==='timeout')h.expire(10000);
    await refresh;assert.equal(h.api.getState(),'error','forced '+failure+' must not restore cached lyrics');
    assert(!h.node('full-lyrics').innerHTML.includes('正文'));
  }
  h=harness();await h.api.loadLyrics(h.ctx.current);h.advance(86400001);
  h.setNetwork(async()=>new Response('',{status:404}));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'not-found','an explicit 404 must replace expired successful lyrics');
  assert.equal([...h.entries.values()][0].status,404);

  h=harness();h.advance(2*86400000);
  h.entries.set('https://example.test/a.lrc?lyricRevision=v1',new Response('[00:01]缓存',{headers:{'X-Roylyl-Cached-At':String(h.now()-86400000+1000)}}));
  await h.api.loadLyrics(h.ctx.current);assert.equal(h.calls.length,0);
  h.advance(2000);await h.api.loadLyrics(h.ctx.current);assert.equal(h.calls.length,1,'reading a cached lyric cannot extend its revalidation TTL');
  h=harness();h.setNetwork((address,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted')))));
  const timed=h.api.loadLyrics(h.ctx.current);await settle();h.expire(10000);await timed;assert.equal(h.api.getState(),'error');
  console.log('通过：缓存不可用/配额失败不影响歌词、同曲重试、强制HTTP刷新、404过期及离线/5xx/超时旧缓存。');
  h=harness();let pending=deferred();h.setNetwork(()=>pending.promise);const old=h.api.loadLyrics(h.ctx.current);await settle();
  assert.equal(h.api.getState(),'loading');assert(h.node('full-lyrics').innerHTML.includes('正在加载歌词'));
  h.ctx.current=track('b');h.setNetwork(async()=>new Response('[00:01]新曲'));await h.api.loadLyrics(h.ctx.current);
  pending.resolve(new Response('[00:01]旧曲'));await old;
  assert(h.node('full-lyrics').innerHTML.includes('新曲'));assert(![...h.entries.keys()].some(key=>key.includes('/a.lrc')));
  h=harness();pending=deferred();h.setNetwork(()=>pending.promise);const beforeClear=h.api.loadLyrics(h.ctx.current);await settle();
  h.setNetwork(async()=>new Response('[00:01]清理后'));await h.node('clear-lyric-cache').onclick();await settle();
  pending.resolve(new Response('[00:01]清理前'));await beforeClear;await settle();
  assert(h.node('full-lyrics').innerHTML.includes('清理后'));assert.equal(h.entries.size,1);
  assert((await [...h.entries.values()][0].clone().text()).includes('清理后'));
  for(const action of ['switch','clear','force']){
    h=harness();await h.api.loadLyrics(h.ctx.current);h.advance(86400001);
    h.setNetwork((address,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted')))));
    const staleRefresh=h.api.loadLyrics(h.ctx.current);await settle();
    h.setNetwork(async()=>new Response('[00:01]操作后'));
    if(action==='switch'){h.ctx.current=track('b');await h.api.loadLyrics(h.ctx.current);}
    else if(action==='clear'){await h.node('clear-lyric-cache').onclick();await settle();}
    else await h.api.loadLyrics(h.ctx.current,{force:true});
    await staleRefresh;
    assert(h.node('full-lyrics').innerHTML.includes('操作后'),action+' must not restore aborted stale lyrics');
    assert(!h.node('full-lyrics').innerHTML.includes('正文'));
  }
  console.log('通过：快速切歌和清理缓存期间旧请求不能覆盖正文或重新污染缓存。');
  h=harness();await h.api.loadLyrics(h.ctx.current);const box=h.node('full-lyrics');box.scrolls=[];
  box.events.wheel();h.api.updateLyricPosition(true);assert.equal(box.scrolls.length,0);
  h.expire(8000);assert.equal(box.scrolls.length,1,'manual hold expires even when active group is unchanged');assert.equal(box.scrolls[0].behavior,'smooth');
  box.events.touchstart();h.ctx.current=track('b');await h.api.loadLyrics(h.ctx.current);
  assert(box.scrolls.some(value=>value.top===0),'new track resets previous manual scroll');
  box.scrolls=[];h.events.seeked();assert.equal(box.scrolls.length,1);
  h=harness();h.setNetwork(async()=>new Response('词：某人\n曲：某人'));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'ready');assert(h.node('full-lyrics').innerHTML.includes('词：某人'));
  h=harness();h.setNetwork(async()=>new Response('<!doctype html><html>错误页面</html>'));await h.api.loadLyrics(h.ctx.current);
  assert.equal(h.api.getState(),'error');assert.equal(h.entries.size,0);
  console.log('通过：手动滚动恢复、切歌重置、拖动进度立即定位、纯职务元信息显示及HTML错误响应识别。');
})().catch(error=>{console.error(error);process.exitCode=1;});
