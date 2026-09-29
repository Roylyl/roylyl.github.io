'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const workerSource=fs.readFileSync(require('node:path').join(__dirname,'../audio-worker.js'),'utf8');
const ORIGIN='https://roylyl.github.io',AUDIO='roylyl-music-audio-v2',META='roylyl-music-audio-meta-v1';
const SHELL=/SHELL='([^']+)'/.exec(workerSource)[1];
const source=name=>`https://raw.githubusercontent.com/Roylyl/Music/main/${name}.mp3?v=2`;
const bytes='012345678901234567890123456789';
const full=body=>new Response(body??bytes,{headers:{'Content-Length':'30','Content-Type':'audio/mpeg'}});
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function harness({stores=new Map(),network=async()=>full(),failAudioPut=()=>false,failRecoveryPut=()=>false,clients=[{id:'tab-a',url:ORIGIN+'/music/'}]}={}){
  const handlers={},calls=[],notifications=[],clientMessages=[];
  const key=value=>new URL(typeof value==='string'?value:value.url,ORIGIN).href;
  function cacheFor(name){if(!stores.has(name))stores.set(name,new Map());const entries=stores.get(name);return {
    async match(request){return entries.get(key(request))?.clone();},
    async put(request,response){if(name===AUDIO&&failAudioPut()||name===META&&key(request)===key('/music/__audio_recovery__')&&failRecoveryPut())throw new DOMException('Full','QuotaExceededError');const body=await response.arrayBuffer();entries.set(key(request),new Response(body,{status:response.status,headers:response.headers}));},
    async delete(request){return entries.delete(key(request));},
    async keys(){return [...entries.keys()].map(url=>new Request(url));},
    async addAll(files){for(const file of files)await this.put(file,file.split('?')[0].endsWith('catalog.json')?Response.json({tracks:[{id:'test'}]}):new Response(file));}
  };}
  const sandbox={self:{location:{origin:ORIGIN},registration:{active:true},addEventListener:(name,fn)=>handlers[name]=fn,clients:{async claim(){},async matchAll(){return clients.map(client=>({...client,postMessage:value=>{notifications.push(value);clientMessages.push({id:client.id,data:value});}}));}},async skipWaiting(){}},caches:{open:async name=>cacheFor(name),keys:async()=>[...stores.keys()],delete:async name=>stores.delete(name)},fetch:(request,options={})=>{calls.push({request,options});return network(request,options);},URL,Request,Response,Headers,AbortController,console};
  vm.createContext(sandbox);vm.runInContext(workerSource,sandbox);
  function dispatch(kind,event){const waits=[];handlers[kind]({...event,waitUntil:promise=>waits.push(promise)});return async()=>{for(let i=0;i<waits.length;i++)await waits[i];};}
  function message(data,id='tab-a'){
    let result,resolve;const reply=new Promise(r=>resolve=r);
    const done=dispatch('message',{data,source:{id},ports:[{postMessage:value=>{result=JSON.parse(JSON.stringify(value));resolve(result);}}]});
    return {done,reply,get result(){return result;}};
  }
  function request(url,{range,method='GET',destination='audio',mode}={}){
    const request=new Request(url,{method,headers:range?{Range:range}:{}});
    Object.defineProperty(request,'destination',{value:destination});if(mode)Object.defineProperty(request,'mode',{value:mode});
    let response;const done=dispatch('fetch',{request,clientId:'tab-a',respondWith:value=>response=value});
    return {done,get response(){return response;}};
  }
  const config=async(budget,current='',preload=true,id)=>{await message({type:'AUDIO_CONFIG',budget,current,preload},id).done();};
  const save=async name=>{const job=message({type:'CACHE_AUDIO',source:source(name),preload:false});await job.done();return job.result;};
  const stats=async()=>{const job=message({type:'AUDIO_STATS'});await job.done();return job.result;};
  return {stores,calls,notifications,clientMessages,cacheFor,request,message,config,save,stats,dispatch,setClients:value=>{clients=value;}};
}
(async()=>{
  {
    const h=harness();await h.config(100);await h.save('broken');await h.save('healthy');
    const req=h.request(source('broken')+'&recovery=one',{range:'bytes=0-1'});await req.response;
    assert.equal(h.calls.at(-1).options.cache,'no-store');
    assert.equal(h.calls.at(-1).request.headers.get('Range'),'bytes=0-1');
    assert.equal(await h.cacheFor(AUDIO).match(source('broken')),undefined);
    assert(await h.cacheFor(AUDIO).match(source('healthy')));
    assert.equal((await h.stats()).count,1);
    console.log('通过：单曲重试清理对应缓存和索引，保留其他歌曲，网络绕过HTTP缓存且保留Range。');
  }
  {
    const stale='x'.repeat(30),h=harness({network:async(request,options)=>request.headers.has('Range')?new Response(bytes.slice(0,2),{status:206,headers:{'Content-Length':'2','Content-Range':'bytes 0-1/30'}}):full(options.cache==='no-store'?bytes:stale)});
    await h.config(100);await h.save('recovered');
    await h.request(source('recovered')+'&recovery=fresh',{range:'bytes=0-1'}).response;
    assert.equal((await h.save('recovered')).ok,true);
    assert.equal(h.calls.at(-1).request.url,source('recovered'));
    assert.equal(h.calls.at(-1).options.cache,'no-store','恢复后原URL的完整下载必须绕过旧HTTP缓存');
    assert.equal(await (await h.cacheFor(AUDIO).match(source('recovered'))).text(),bytes);
    await h.message({type:'CLEAR_AUDIO'}).done();await h.save('recovered');
    assert.equal(await (await h.cacheFor(AUDIO).match(source('recovered'))).text(),bytes,'清理后仍不能重新读入浏览器的旧HTTP条目');
    console.log('通过：单曲恢复后的完整缓存绕过原URL旧HTTP缓存并写入新内容。');
  }
  {
    const freshKey='/music/__audio_recovery__',stale='x'.repeat(30);let h;
    const network=async(request,options)=>{
      if(new URL(request.url).searchParams.has('recovery')){
        assert.deepEqual(await (await h.cacheFor(META).match(freshKey)).json(),[source('restart-recovery')],'发出恢复请求前必须持久化原URL刷新标记');
        return new Response(bytes.slice(0,2),{status:206,headers:{'Content-Length':'2','Content-Range':'bytes 0-1/30'}});
      }
      return full(options.cache==='no-store'?bytes:stale);
    };
    h=harness({network});await h.config(100);await h.save('restart-recovery');
    await h.request(source('restart-recovery')+'&recovery=persist',{range:'bytes=0-1'}).response;
    const restarted=harness({stores:h.stores,network});await restarted.config(100);
    assert.equal((await restarted.save('restart-recovery')).ok,true);
    assert.equal(restarted.calls.at(-1).options.cache,'no-store','worker重启且先收到配置后，CACHE_AUDIO仍须恢复原URL刷新标记');
    assert.equal(await (await restarted.cacheFor(AUDIO).match(source('restart-recovery'))).text(),bytes);
    await restarted.save('unaffected');assert.equal(restarted.calls.at(-1).options.cache,undefined,'未恢复过的音源保留原有HTTP缓存逻辑');
    const cleared=harness({stores:restarted.stores,network});await cleared.message({type:'CLEAR_AUDIO'}).done();
    assert.deepEqual(await (await cleared.cacheFor(META).match(freshKey)).json(),[source('restart-recovery')],'重启后清理音频也必须保留恢复标记');
    console.log('通过：恢复标记先于网络请求持久化，worker重启后主动缓存继续绕过旧HTTP缓存，清理音频保留标记。');
  }
  {
    let failedWrites=0;const h=harness({failRecoveryPut:()=>{failedWrites++;return true;},network:async(_,options)=>full(options.cache==='no-store'?bytes:'x'.repeat(30))});
    await h.config(100);await h.save('quota-recovery');
    const response=await h.request(source('quota-recovery')+'&recovery=quota',{range:'bytes=0-1'}).response;
    assert.equal(failedWrites,1,'恢复标记写入必须命中模拟的QuotaExceededError');
    assert.equal(response.status,200);assert.equal(await response.text(),bytes,'标记写入失败后恢复网络播放仍成功');
    assert.equal(await h.cacheFor(AUDIO).match(source('quota-recovery')),undefined,'标记写入失败不能阻止删除已知坏音频');
    assert.equal((await h.stats()).count,0,'对应坏音频索引也必须清除');
    assert.equal((await h.save('quota-recovery')).ok,true);assert.equal(h.calls.at(-1).options.cache,'no-store','持久化失败后内存恢复标记仍然有效');
    console.log('通过：恢复标记写入遇到配额错误时仍清除坏音频和索引，恢复网络播放且保留内存绕过标记。');
  }
  {
    let controller,first=true;
    const h=harness({network:async()=>{if(!first)return full();first=false;return full(new ReadableStream({start(c){controller=c;}}));}});
    await h.config(100);
    const old=h.request(source('late'));await old.response;await tick();
    await h.request(source('late')+'&recovery=two',{range:'bytes=0-1'}).response;
    controller.enqueue(new TextEncoder().encode(bytes));controller.close();await old.done();
    assert.equal(await h.cacheFor(AUDIO).match(source('late')),undefined,'旧完整下载不能在单曲清理后重新写入');
    console.log('通过：重试时尚未完成的旧下载不会重新污染缓存。');
  }
  {
    let resolveOld;const h=harness({network:async(request)=>new URL(request.url).searchParams.has('recovery')?full():new Promise(resolve=>resolveOld=resolve)});
    const old=h.request(source('late-range'),{range:'bytes=0-1'});await tick();await tick();
    await h.request(source('late-range')+'&recovery=fresh',{range:'bytes=0-1'}).response;
    resolveOld(full());await old.response;await old.done();
    assert.equal(await h.cacheFor(AUDIO).match(source('late-range')),undefined,'恢复前发起、恢复后才返回响应头的旧Range不能重新写入');
  }
  {
    let controller,signal;const h=harness({network:async(_,options)=>{signal=options.signal;return full(new ReadableStream({start(c){controller=c;c.enqueue(new TextEncoder().encode(bytes.slice(0,10)));}}));}});
    await h.config(100,source('a'));
    const first=h.message({type:'CACHE_AUDIO',source:source('a')});await tick();await tick();
    const second=h.message({type:'CACHE_AUDIO',source:source('a')});await tick();
    assert.equal(h.calls.length,1,'响应头到达后仍应复用未完成的完整下载');assert.equal(first.result,undefined,'写入完成前不能回报缓存成功');
    const playback=h.request(source('a'));await playback.response;
    await h.message({type:'CANCEL_PRELOAD'}).done();assert.equal(signal.aborted,false,'播放加入下载后不能被可选缓存取消误杀');
    controller.enqueue(new TextEncoder().encode(bytes.slice(10)));controller.close();
    assert.equal(await (await playback.response).text(),bytes);await playback.done();await first.done();await second.done();
    assert.equal(first.result.ok,true);assert.equal(second.result.ok,true);assert.deepEqual(await h.stats(),{type:'AUDIO_STATS',count:1,bytes:30});
  }
  {
    let resolveHeaders;const h=harness({network:()=>new Promise(resolve=>resolveHeaders=resolve)});
    const playback=h.request(source('a'),{range:'bytes=10-19'});await tick();await tick();
    const cache=h.message({type:'CACHE_AUDIO',source:source('a')});await tick();assert.equal(h.calls.length,1);
    resolveHeaders(full());assert.equal((await playback.response).status,200);await cache.done();await playback.done();
    assert.equal(h.calls.length,1,'上游忽略Range的完整200与主动缓存不能重复下载');assert.equal(cache.result.ok,true);
  }
  {
    let resolveHeaders;const h=harness({network:()=>new Promise(resolve=>resolveHeaders=resolve)});
    const playback=h.request(source('a'),{range:'bytes=10-19'});await tick();await tick();
    await h.message({type:'CLEAR_AUDIO'}).done();resolveHeaders(full());assert.equal(await (await playback.response).text(),bytes);await playback.done();
    assert.equal((await h.stats()).count,0,'清理前的Range请求不能在清理后回填缓存');
  }
  {
    const h=harness({network:async()=>full('short')});assert.equal((await h.save('a')).ok,false);
    assert.equal((await h.stats()).count,0,'实际字节数与响应头不符必须拒绝完整缓存');
  }
  {
    let fail=false;const h=harness({failAudioPut:()=>fail});await h.config(40);assert.equal((await h.save('a')).ok,true);
    fail=true;assert.equal((await h.save('b')).ok,false);assert.deepEqual(await h.stats(),{type:'AUDIO_STATS',count:0,bytes:0},'淘汰后新写入失败不能残留旧索引');
  }
  {
    const h=harness();await h.config(100,source('a'));await h.config(100,source('b'),true,'tab-b');
    await h.save('a');await h.save('b');await h.config(60,source('a'));assert.equal((await h.save('c')).ok,false);
    assert.deepEqual(await h.stats(),{type:'AUDIO_STATS',count:2,bytes:60},'不同标签正在播放的歌曲都应受保护');
    await h.config(0,source('a'),false);
    const restarted=harness({stores:h.stores});assert.equal((await restarted.save('d')).ok,false);assert.equal(restarted.calls.length,0,'Worker休眠重启后继续尊重关闭缓存');
    const playing=restarted.request(source('d'));assert.equal(await (await playing.response).text(),bytes);await playing.done();assert.equal((await restarted.stats()).count,0,'关闭缓存仍可在线播放');
  }
  {
    for(const [budget,preload] of [[0,false],[40,true],[-1,true],[-1,false],[4000000000,true],[8000000000,false]]){
      const original=harness();await original.config(budget,'',preload);
      const restarted=harness({stores:original.stores});
      await restarted.message({type:'CLEAR_AUDIO'}).done();
      const config=await (await restarted.cacheFor(META).match('/music/__audio_config__')).json();
      assert.deepEqual(config,{budget,preload},'休眠后首个操作清理缓存必须保留原预算和预加载设置');
      if(!budget){assert.equal((await restarted.save('a')).ok,false);assert.equal(restarted.calls.length,0,'清理后仍遵守关闭缓存');}
    }
  }
  {
    const h=harness();const enabled=h.message({type:'CACHE_AUDIO',source:source('a'),preload:true});await enabled.done();assert.equal(enabled.result.ok,true);assert.equal(h.calls.length,1,'未设置时默认允许下一首预加载');
    await h.message({type:'CLEAR_AUDIO'}).done();
    const defaults=await (await h.cacheFor(META).match('/music/__audio_config__')).json();assert.deepEqual(defaults,{budget:-1,preload:true},'默认缓存无限且预加载开启');
    await h.config(100,'',false);const restarted=harness({stores:h.stores});const disabled=restarted.message({type:'CACHE_AUDIO',source:source('a'),preload:true});await disabled.done();assert.equal(disabled.result.ok,false);assert.equal(restarted.calls.length,0,'显式关闭预加载重启后不改变');
  }
  {
    const h=harness();await h.config(40);await h.save('a');
    await h.config(-1);await h.save('b');await h.save('c');
    assert.deepEqual(await h.stats(),{type:'AUDIO_STATS',count:3,bytes:90},'切换无限后不能沿用旧预算淘汰歌曲');
    const restarted=harness({stores:h.stores});await restarted.save('d');
    assert.deepEqual(await restarted.stats(),{type:'AUDIO_STATS',count:4,bytes:120},'无限预算重启后继续跳过预算淘汰');
    await restarted.config(40);assert.equal((await restarted.stats()).count,1,'从无限改回有限预算时恢复LRU清理');
  }
  {
    for(const budget of [4000000000,8000000000]){
      const h=harness();await h.config(budget);
      const saved=await (await h.cacheFor(META).match('/music/__audio_config__')).json();assert.equal(saved.budget,budget,'4GB/8GB必须按十进制字节完整保存，不能截断为32位整数');
      const restarted=harness({stores:h.stores});assert.equal((await restarted.save('a')).ok,true);
      await restarted.message({type:'CLEAR_AUDIO'}).done();
      const retained=await (await restarted.cacheFor(META).match('/music/__audio_config__')).json();assert.equal(retained.budget,budget,'4GB/8GB重启清理后保持精确预算');
    }
  }
  {
    let signal;const h=harness({network:async(_,options)=>{signal=options.signal;return full(new ReadableStream({start(controller){
      controller.enqueue(new TextEncoder().encode(bytes.slice(0,10)));
      signal.addEventListener('abort',()=>controller.error(new DOMException('Cancelled','AbortError')),{once:true});
    }}));}});
    const pending=h.message({type:'CACHE_AUDIO',source:source('a'),preload:true});await tick();await tick();
    await h.message({type:'CANCEL_PRELOAD'}).done();await pending.done();
    assert.equal(signal.aborted,true);assert.equal(pending.result.ok,false,'无限预算的可选预加载仍可安全取消');assert.equal((await h.stats()).count,0);
  }
  {
    let fail=false;const h=harness({failAudioPut:()=>fail});await h.config(-1);await h.save('a');
    fail=true;assert.equal((await h.save('b')).ok,false,'无限预算仍必须处理浏览器配额失败');
    assert.deepEqual(await h.stats(),{type:'AUDIO_STATS',count:1,bytes:30},'无限预算下配额失败不能错误淘汰已有歌曲');
  }
  {
    const h=harness();await h.save('a');
    for(const [range,status,body] of [['bytes=10-19',206,bytes.slice(10,20)],['bytes=10-',206,bytes.slice(10)],['bytes=-10',206,bytes.slice(-10)],['bytes=-100',206,bytes],['bytes=-0',416,''],['bytes=30-',416,''],['bytes=2-1',416,''],['bytes=0-1,4-5',200,bytes]]){
      const request=h.request(source('a'),{range}),response=await request.response;assert.equal(response.status,status,range);assert.equal(await response.text(),body,range);await request.done();
      const head=h.request(source('a'),{range,method:'HEAD'}),headers=await head.response;assert.equal(headers.status,status);assert.equal(await headers.text(),'');assert.equal(Number(headers.headers.get('Content-Length')),body.length);await head.done();
    }
    assert.equal(h.calls.length,1,'本地Range不额外访问音源');
    const keys=await h.cacheFor(AUDIO).keys();assert.equal(keys.length,1);
  }
  {
    const h=harness({network:async request=>new Response('abcdefghij',{status:206,headers:{'Content-Length':'10','Content-Range':'bytes 10-19/30'}})});
    const request=h.request(source('a'),{range:'bytes=10-19'}),response=await request.response;assert.equal(response.status,206);assert.equal(response.headers.get('Content-Range'),'bytes 10-19/30');await request.done();assert.equal((await h.stats()).count,0,'206片段不进入完整缓存');
  }
  {
    const h=harness();const install=h.dispatch('install',{});await install();
    const navigation=h.request(ORIGIN+'/music/?track=test',{mode:'navigate'});assert.equal(await (await navigation.response).text(),'/music/');await navigation.done();
    for(const pathname of ['/music/file.lrc','/music/file.mp3','/music/data/missing.json','/music/unknown.png','/outside/']){
      const request=h.request(ORIGIN+pathname,{mode:'navigate'});assert.equal(request.response,undefined,pathname+'不能被HTML导航兜底接管');
    }
    await h.cacheFor('roylyl-music-shell-20260929-4').put('/music/data/catalog.json?v=old',new Response('old catalog'));
    await h.cacheFor('roylyl-music-shell-20260929-4').put('/music/data/catalog.json',new Response('legacy catalog'));
    await h.cacheFor('unrelated-app-cache').put('/other',new Response('keep'));
    await h.cacheFor(AUDIO).put(source('a'),full());await h.dispatch('activate',{})();
    const older=h.request(ORIGIN+'/music/data/catalog.json?v=old');assert.equal(await (await older.response).text(),'old catalog');
    const legacy=h.request(ORIGIN+'/music/data/catalog.json');assert.equal(await (await legacy.response).text(),'legacy catalog');
    assert(h.stores.has('roylyl-music-shell-20260929-4'),'有旧页面时保留其网页壳和同版目录');
    assert(h.stores.has('unrelated-app-cache'));assert(await h.cacheFor(AUDIO).match(source('a')),'激活网页更新不能清理音频');
  }
  {
    const old='roylyl-music-shell-20260929-4',unused='roylyl-music-shell-20260929-3',waiting='roylyl-music-shell-20991231-1';
    const h=harness({clients:[{id:'tab-a',url:ORIGIN+'/music/'},{id:'tab-b',url:ORIGIN+'/music/?track=old'}]});
    for(const shell of [SHELL,old,unused,waiting,'unrelated-app-cache'])await h.cacheFor(shell).put('/music/app.js?v='+shell,new Response(shell));
    await h.message({type:'SHELL_CLIENT',shell:SHELL}).done();
    assert(h.stores.has(unused),'另一个未知版本的旧页面仍打开时保守保留旧shell');
    await h.message({type:'SHELL_CLIENT',shell:old},'tab-b').done();
    assert(h.stores.has(old),'保留仍存活旧页面上报的shell');assert(!h.stores.has(unused),'全部页面版本已知时清理无人使用的旧shell');
    assert.equal(await (await h.request(ORIGIN+'/music/app.js?v='+old).response).text(),old);
    assert(h.stores.has(waiting),'不能删掉等待激活的新worker安装的shell');assert(h.stores.has('unrelated-app-cache'));
    h.setClients([{id:'tab-a',url:ORIGIN+'/music/'},{id:'other-page',url:ORIGIN+'/portfolio/'}]);
    await h.message({type:'SHELL_CLIENT',shell:SHELL}).done();
    assert(!h.stores.has(old),'旧页面关闭后再次上报应清理其shell');assert(h.stores.has(SHELL));
    const restarted=harness({stores:h.stores});await restarted.cacheFor(old).put('/music/app.js?v=old',new Response('old'));
    await restarted.dispatch('activate',{})();assert(restarted.stores.has(old),'worker重启后尚未报告的页面仍受到保护');
    await restarted.message({type:'SHELL_CLIENT',shell:SHELL}).done();assert(!restarted.stores.has(old),'当前页面重新上报后继续清理旧shell');
    console.log('通过：按存活页面保留对应旧shell，未知旧页面保守保护，关闭后清理且不误删等待激活的新shell。');
  }
  {
    const old='roylyl-music-shell-20260929-4',clients=[{id:'tab-a',url:ORIGIN+'/music/'},{id:'tab-b',url:ORIGIN+'/music/'},{id:'outside',url:ORIGIN+'/'}],h=harness({clients});
    await h.cacheFor(old).put('/music/app.js?v=old',new Response('old'));
    await h.message({type:'SHELL_CLIENT',shell:SHELL}).done();
    assert.deepEqual(h.clientMessages.map(({id,data})=>[id,data.type]),[['tab-b','REPORT_SHELL']],'只向尚未报告的存活音乐页面询问版本');
    assert(h.stores.has(old),'未知页面回复前保留旧shell');
    await tick();assert.equal(h.clientMessages.length,1,'旧页面不回复时不能自动循环询问');
    await h.message({type:'SHELL_CLIENT',shell:SHELL},'tab-b').done();
    assert(!h.stores.has(old),'收到另一个窗口的异步回复后清理无人使用的旧shell');
    assert.equal(h.clientMessages.length,1,'所有页面已报告后不能继续询问');
    console.log('通过：仅向未报告的存活音乐页面询问shell版本，不等待旧页面回复且握手完成后继续清理。');
  }
  console.log('通过：完整下载生命周期去重、播放保护、Range共用200、清理代际、真实字节校验、配额失败索引、多标签保护、配置重启、默认无限缓存和预加载开启、显式关闭、十进制4GB/8GB、GET/HEAD范围边界、206隔离和PWA导航范围。');
})().catch(error=>{console.error(error);process.exitCode=1;});
