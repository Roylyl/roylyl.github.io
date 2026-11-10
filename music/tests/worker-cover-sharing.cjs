'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../audio-worker.js'),'utf8');
const ROOT='https://roylyl.github.io',COVERS='roylyl-music-covers-v1';
const url=(name='album',version=1)=>`https://raw.githubusercontent.com/Roylyl/Music/main/artists/${name}/cover.webp?v=${version}`;
const image=(body='cover')=>new Response(body,{headers:{'Content-Type':'image/webp','Content-Length':String(Buffer.byteLength(body)),'Access-Control-Allow-Origin':'*'}});
const defer=()=>{let resolve;const promise=new Promise(done=>resolve=done);return {resolve,promise};};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function harness(network=async()=>image()){
  const stores=new Map(),handlers={},calls=[],puts=[];let clock=100000;
  const key=value=>new URL(typeof value==='string'?value:value.url,ROOT).href;
  function cache(name){if(!stores.has(name))stores.set(name,new Map());const entries=stores.get(name);return {
    async match(request){return entries.get(key(request))?.clone();},
    async put(request,response){const bytes=await response.arrayBuffer();puts.push({name,url:key(request)});entries.set(key(request),new Response(bytes,{status:response.status,headers:response.headers}));},
    async delete(request){return entries.delete(key(request));},async keys(){return [...entries.keys()].map(address=>new Request(address));}
  };}
  class ClockDate extends Date {static now(){return clock;}}
  const context={Blob,ReadableStream,URL,Request,Response,Headers,AbortController,console,Date:ClockDate,setTimeout,clearTimeout,setInterval,clearInterval,importScripts(){},
    caches:{open:async name=>cache(name),delete:async name=>stores.delete(name),keys:async()=>[...stores.keys()]},
    fetch(request,options={}){calls.push({request,options});return network(request,options);},
    self:{location:{origin:ROOT},registration:{active:true},clients:{async matchAll(){return [];}},addEventListener:(name,fn)=>handlers[name]=fn}};
  vm.createContext(context);vm.runInContext(source,context);
  function request(address,{reload=false}={}){
    const waits=[];let response;
    handlers.fetch({request:new Request(address,{cache:reload?'reload':'default'}),clientId:'tab',respondWith:value=>response=value,waitUntil:value=>waits.push(value)});
    return {get response(){return response;},done:async()=>{for(const value of waits)await value;}};
  }
  function message(data){const waits=[],messages=[];handlers.message({data,source:{id:'tab'},ports:[{postMessage:value=>messages.push(value)}],waitUntil:value=>waits.push(value)});return {messages,done:async()=>{for(const value of waits)await value;}};}
  return {request,message,calls,puts,cache,stores,context,advance:ms=>clock+=ms};
}
async function waitFor(test){for(let n=0;n<40&&!test();n++)await tick();assert(test(),'expected asynchronous stage');}
const batch=(h,id,sources)=>h.message({type:'DOWNLOAD_ASSET_BATCH',kind:'covers',id,sources});
(async()=>{
  {
    const gate=defer(),h=harness(async()=>{await gate.promise;return image();});
    const first=h.request(url()),second=h.request(url());await waitFor(()=>h.calls.length===1);
    gate.resolve();const [a,b]=await Promise.all([first.response,second.response]);
    assert.equal(await a.text(),'cover');assert.equal(await b.text(),'cover');await Promise.all([first.done(),second.done()]);
    assert.equal(h.calls.length,1,'cold requests from multiple pages share one fetch');assert.equal(h.puts.filter(p=>p.name===COVERS).length,1,'the shared response is cached once');
    assert.equal(a.headers.get('Access-Control-Allow-Origin'),'*','CORS headers survive response cloning');
    const warm=h.request(url());assert.equal(await (await warm.response).text(),'cover');await warm.done();assert.equal(h.calls.length,1,'successful cached version never refetches');
    const revised=h.request(url('album',2));await revised.response;await revised.done();assert.equal(h.calls.length,2,'a new revision gets its own request');
    const offline=harness(async()=>{throw Error('offline');});offline.stores.set(COVERS,h.stores.get(COVERS));const old=offline.request(url());assert.equal(await (await old.response).text(),'cover');await old.done();assert.equal(offline.calls.length,0,'offline page reads persistent cover cache');
  }
  {
    const gate=defer(),h=harness(async()=>{await gate.promise;return image();});
    const page=h.request(url('shared')),otherPage=h.request(url('shared'));await waitFor(()=>h.calls.length===1);
    const downloading=batch(h,'join',[url('shared')]);await waitFor(()=>downloading.messages.some(m=>m.current===url('shared')));
    gate.resolve();assert.equal(await (await page.response).text(),'cover');assert.equal(await (await otherPage.response).text(),'cover');await Promise.all([page.done(),otherPage.done(),downloading.done()]);
    assert.equal(h.calls.length,1,'two pages and download-all share the same request');assert.equal(h.puts.filter(p=>p.name===COVERS).length,1);
    const final=downloading.messages.at(-1);assert.equal(final.status,'completed');assert.equal(final.downloaded,1);assert.equal(final.downloadedBytes,5);
    const warm=batch(h,'warm',[url('shared')]);await warm.done();assert.equal(warm.messages.at(-1).cached,1);assert.equal(h.calls.length,1);
  }
  {
    const gate=defer();let signal;const h=harness(async(_,options)=>{signal=options.signal;await gate.promise;return image();});
    const downloading=batch(h,'cancel-shared',[url('cancel')]);await waitFor(()=>h.calls.length===1);
    const page=h.request(url('cancel'));await tick();const cancel=h.message({type:'CANCEL_AUDIO_BATCH',id:'cancel-shared'});
    await Promise.all([downloading.done(),cancel.done()]);assert.equal(signal.aborted,false,'cancelling a batch cannot abort a page consumer');
    gate.resolve();assert.equal(await (await page.response).text(),'cover');await page.done();assert(await h.cache(COVERS).match(url('cancel')));
  }
  {
    let signal;const h=harness((_,options)=>{signal=options.signal;return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(Error('cancelled')),{once:true}));});
    const downloading=batch(h,'cancel-only',[url('cancel-only')]);await waitFor(()=>h.calls.length===1);
    const cancel=h.message({type:'CANCEL_AUDIO_BATCH',id:'cancel-only'});await Promise.all([downloading.done(),cancel.done()]);assert.equal(signal.aborted,true,'a batch-only request is cancelled');
  }
  {
    const gate=defer(),h=harness(async()=>{await gate.promise;return image('old');});
    const stale=h.request(url('cleared'));await waitFor(()=>h.calls.length===1);
    const clear=h.message({type:'CLEAR_ASSET_CACHE',kind:'covers'});await clear.done();gate.resolve();await stale.response;await stale.done();
    assert.equal(await h.cache(COVERS).match(url('cleared')),undefined,'a pre-clear request cannot repopulate the cover cache');
    const fresh=h.request(url('cleared'));await fresh.response;await fresh.done();assert.equal(h.calls.length,2);assert(await h.cache(COVERS).match(url('cleared')));
  }
  {
    let missing=true;const h=harness(async()=>missing?new Response('missing',{status:404}):image());
    for(let i=0;i<2;i++){const req=h.request(url('missing'));assert.equal((await req.response).status,404);await req.done();}
    assert.equal(h.calls.length,1,'404 has a short shared negative cache');
    const failed=batch(h,'missing-batch',[url('missing')]);await failed.done();assert.equal(h.calls.length,1);assert.equal(failed.messages.at(-1).failed,1);
    missing=false;const retry=h.request(url('missing'),{reload:true});assert.equal((await retry.response).status,200);await retry.done();assert.equal(h.calls.length,2,'explicit retry bypasses negative cache');
  }
  {
    const h=harness(async()=>{throw Error('offline');});
    for(let i=0;i<2;i++){const req=h.request(url('network'));await assert.rejects(req.response);await req.done();}assert.equal(h.calls.length,1,'network errors are shared briefly');
    h.advance(15001);const retry=h.request(url('network'));await assert.rejects(retry.response);await retry.done();assert.equal(h.calls.length,2,'network failures retry after expiry');
  }
  {
    let cancelled=false;
    const h=harness(async()=>new Response(new ReadableStream({cancel(){cancelled=true;}}),{status:404}));
    const missing=h.request(url('large-error'));assert.equal((await missing.response).status,404);await missing.done();assert.equal(cancelled,true,'a missing cover cancels its error body immediately');
    assert.equal(await (await missing.response).text(),'','negative cover response retains status without an error document');
    const html=harness(async()=>new Response('<html>failure</html>',{headers:{'Content-Type':'text/html'}}));
    const bad=html.request(url('html'));assert.equal((await bad.response).status,200);await bad.done();assert.equal(await html.cache(COVERS).match(url('html')),undefined,'a 200 HTML error page is not cached as artwork');
    const retry=html.request(url('html'),{reload:true});await retry.response;await retry.done();assert.equal(html.calls.length,2,'invalid 200 content stays explicitly retryable');
  }
  console.log('PASS worker cover sharing: concurrent pages/batch one request and write, revision/offline/CORS, cancellation ownership, clear generation, negative cache and retry');
})().catch(error=>{console.error(error);process.exitCode=1;});
