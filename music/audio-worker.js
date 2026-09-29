'use strict';
const AUDIO='roylyl-music-audio-v2',META='roylyl-music-audio-meta-v1',SHELL='roylyl-music-shell-20260929-12';
const FILES=['/music/','/music/index.html','/music/music.css?v=20260929-pwa-10','/music/app.js?v=20260929-pwa-10','/music/lyric-parser.js?v=20260929-pwa-10','/music/image-loading.css?v=20260927-1','/music/image-loading.js?v=20260927-1','/music/region-notice.css?v=20260928-1','/music/region-notice.js?v=20260928-1','/music/data/catalog.json?v=20260929-pwa-10','/music/favicon.svg','/music/placeholder.svg','/music/manifest.webmanifest','/music/icons/icon-192.png','/music/icons/icon-512.png','/music/icons/apple-touch-icon.png'];
const metaKey='/music/__audio_index__',configKey='/music/__audio_config__';
let generation=0,budget=-1,preloadEnabled=true,writeQueue=Promise.resolve(),configRevision=0,configRead,optionalEpoch=0,lastKeptSource='';
const inflight=new Map(),playingRequests=new Map(),protectedSources=new Map();
const serial=task=>{const p=writeQueue.then(task,task);writeQueue=p.catch(()=>{});return p;};
const protectedSource=source=>[...protectedSources.values()].includes(source);
const validBudget=value=>Number.isSafeInteger(value)&&value>=-1;
const exceedsBudget=bytes=>budget!==-1&&bytes>budget;
const validSize=response=>{const value=response?.headers.get('Content-Length');return /^\d+$/.test(value||'')&&Number.isSafeInteger(Number(value))?Number(value):0;};
const fullResponse=response=>response?.status===200&&!response.headers.has('Content-Range')&&validSize(response)>0;
const audioSource=source=>{try{const u=new URL(source);return u.origin==='https://raw.githubusercontent.com'&&u.pathname.startsWith('/Roylyl/Music/main/')&&u.pathname.endsWith('.mp3');}catch{return false;}};
async function ensureConfig(){
  if(configRevision>0)return;
  if(!configRead){const revision=configRevision;configRead=(async()=>{
    try{const saved=await (await caches.open(META)).match(configKey),config=await saved?.json();
      if(config&&revision===configRevision){if(validBudget(config.budget))budget=config.budget;preloadEnabled=config.preload!==false;}
    }catch{/* Cache availability must not determine whether audio plays. */}
  })();}await configRead;
}
async function saveConfig(){await (await caches.open(META)).put(configKey,new Response(JSON.stringify({budget,preload:preloadEnabled}),{headers:{'Content-Type':'application/json'}}));}
async function readIndex(){
  try{
    const saved=await (await caches.open(META)).match(metaKey);
    if(saved){const index=await saved.json();if(index&&typeof index==='object'&&!Array.isArray(index))return index;}
    // Legacy Cache.put entries were atomic complete responses. Migrate their
    // exposed sizes once; settings never reads every audio body to total usage.
    const index={},cache=await caches.open(AUDIO);
    for(const key of await cache.keys()){
      const hit=await cache.match(key),size=validSize(hit);
      if(fullResponse(hit))index[key.url]={bytes:size,used:0,version:new URL(key.url).searchParams.get('v')||'',complete:true};
      else await cache.delete(key);
    }
    await saveIndex(index);return index;
  }catch{return {};}
}
async function saveIndex(index){await (await caches.open(META)).put(metaKey,new Response(JSON.stringify(index),{headers:{'Content-Type':'application/json'}}));}
const indexBytes=index=>Object.values(index).reduce((n,x)=>n+(Number.isSafeInteger(x.bytes)&&x.bytes>0?x.bytes:0),0);
async function trimToBudget(){
  await serial(async()=>{
    if(budget===-1)return;
    const index=await readIndex(),cache=await caches.open(AUDIO);let used=indexBytes(index);
    for(const [key,item] of Object.entries(index).sort((a,b)=>(a[1].used||0)-(b[1].used||0))){
      if(!exceedsBudget(used))break;if(protectedSource(key)&&budget>0)continue;
      await cache.delete(key);used-=item.bytes;delete index[key];
    }
    await saveIndex(index);
  });
}
async function stats(port){await serial(async()=>{
  const index=await readIndex(),keys=new Set((await (await caches.open(AUDIO)).keys()).map(key=>key.url));let changed=false;
  for(const source of Object.keys(index))if(!keys.has(source)){delete index[source];changed=true;}
  if(changed)await saveIndex(index);
  port?.postMessage({type:'AUDIO_STATS',count:Object.keys(index).length,bytes:indexBytes(index)});
});}
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(SHELL);
  try{
    await cache.addAll(FILES);
    const catalog=await (await cache.match(FILES.find(file=>file.startsWith('/music/data/catalog.json')))).json();
    if(!Array.isArray(catalog?.tracks)||!catalog.tracks.length||catalog.tracks.some(track=>!track.id))throw Error('Invalid offline catalog');
  }catch(error){await caches.delete(SHELL);throw error;}
  if(!self.registration.active)await self.skipWaiting();
  else for(const c of await self.clients.matchAll())c.postMessage({type:'UPDATE_READY'});
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  // Existing tabs may still need their exact script/catalog release. Only
  // remove prior shells when no already-open music page can reference them.
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  const hasMusicPage=clients.some(client=>{try{return new URL(client.url).pathname.startsWith('/music/');}catch{return false;}});
  if(!hasMusicPage)for(const name of await caches.keys())if(/^roylyl-music-shell-\d{8}-\d+$/.test(name)&&name!==SHELL)await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{
  const data=event.data||{},port=event.ports?.[0];
  const run=task=>event.waitUntil(task.catch(()=>port?.postMessage({ok:false})));
  if(data.type==='ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());
  if(data.type==='AUDIO_CONFIG'){
    configRevision++;budget=validBudget(data.budget)?data.budget:-1;
    preloadEnabled=data.preload!==false;if(!budget||!preloadEnabled){optionalEpoch++;lastKeptSource='';}protectedSources.set(event.source?.id||'current',data.current||'');
    for(const [key,job] of inflight)if(job.optional&&(!budget||(!preloadEnabled&&job.preload)))cancelJob(key,job);
    run((async()=>{await serial(saveConfig);await trimToBudget();port?.postMessage({ok:true});})());
  }
  if(data.type==='AUDIO_STATS')run(stats(port));
  if(data.type==='CACHE_AUDIO')run((async()=>{
    await ensureConfig();const version=generation,epoch=optionalEpoch;
    if(!audioSource(data.source)||!budget||(data.preload&&!preloadEnabled)){port?.postMessage({ok:false});return;}
    const hit=await cachedFull(data.source);
    if(hit){port?.postMessage({ok:true});return;}
    // An in-progress playback Range may already be returning a full 200.
    // Wait for its headers before starting a second full download.
    const playing=playingRequests.get(data.source);if(playing)try{await playing;}catch{}
    if(version!==generation||(epoch!==optionalEpoch&&data.source!==lastKeptSource)||!budget||(data.preload&&!preloadEnabled)){port?.postMessage({ok:false});return;}
    const job=startFull(data.source,new Request(data.source),true,!!data.preload);
    port?.postMessage({ok:await job.stored});
  })());
  if(data.type==='CLEAR_AUDIO'){
    generation++;optionalEpoch++;lastKeptSource='';for(const [key,job] of inflight)if(job.optional)cancelJob(key,job);
    run((async()=>{
      // Clearing can be the first event after the Worker wakes. Restore saved
      // preferences before deleting their cache; never replace them with defaults.
      await ensureConfig();
      await serial(async()=>{await caches.delete(AUDIO);await caches.delete(META);await saveConfig();port?.postMessage({ok:true});});
    })());
  }
  if(data.type==='CANCEL_PRELOAD'){optionalEpoch++;lastKeptSource=data.keep||'';for(const [key,job] of inflight)if(job.optional&&key!==data.keep)cancelJob(key,job);}
});
function cancelJob(source,job){job.controller.abort();if(inflight.get(source)===job)inflight.delete(source);}
async function cachedFull(source){
  try{
    const response=await (await caches.open(AUDIO)).match(source);if(!fullResponse(response))return null;
    serial(async()=>{const index=await readIndex();if(index[source]){index[source].used=Date.now();await saveIndex(index);}}).catch(()=>{});
    return response;
  }catch{return null;}
}
async function cachedRange(response,range,method='GET'){
  const size=validSize(response),headers=new Headers(response.headers);headers.set('Accept-Ranges','bytes');
  const complete=()=>method==='HEAD'?new Response(null,{status:200,headers}):response;
  if(!range||!size)return complete();
  const match=/^bytes=(\d*)-(\d*)$/.exec(range);
  if(!match||(!match[1]&&!match[2]))return complete();
  let start,end;
  if(!match[1]){start=Math.max(0,size-Number(match[2]));end=size-1;}
  else{start=Number(match[1]);end=match[2]?Math.min(Number(match[2]),size-1):size-1;}
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=size||end<start){headers.set('Content-Range',`bytes */${size}`);headers.set('Content-Length','0');return new Response(null,{status:416,headers});}
  headers.set('Content-Range',`bytes ${start}-${end}/${size}`);headers.set('Content-Length',String(end-start+1));
  return new Response(method==='HEAD'?null:(await response.blob()).slice(start,end+1),{status:206,headers});
}
async function storeFull(source,response,version,signal){
  const size=validSize(response);
  if(version!==generation||signal.aborted||!fullResponse(response)||exceedsBudget(size))return false;
  try{
    // Only the optional cache copy waits for completion. The audio element gets
    // its streaming response immediately. Count actual bytes before publishing.
    const body=await response.blob();
    if(body.size!==size||version!==generation||signal.aborted)return false;
    return await serial(async()=>{
      if(version!==generation||signal.aborted||exceedsBudget(size))return false;
      const cache=await caches.open(AUDIO),index=await readIndex();
      if(index[source]&&await cache.match(source))return true;
      let used=indexBytes(index);
      for(const [key,item] of Object.entries(index).sort((a,b)=>(a[1].used||0)-(b[1].used||0))){
        if(!exceedsBudget(used+size))break;if(key===source||protectedSource(key))continue;
        await cache.delete(key);used-=item.bytes;delete index[key];
      }
      // Persist evictions even if quota or protected content prevents this write.
      await saveIndex(index);
      if(exceedsBudget(used+size))return false;
      const headers=new Headers(response.headers);headers.set('Content-Length',String(body.size));headers.set('X-Roylyl-Audio-Complete','1');
      try{await cache.put(source,new Response(body,{status:200,headers}));}
      catch{return false;}
      if(version!==generation||signal.aborted){await cache.delete(source);return false;}
      index[source]={bytes:body.size,used:Date.now(),version:new URL(source).searchParams.get('v')||'',complete:true};
      try{await saveIndex(index);}catch{await cache.delete(source);return false;}
      for(const c of await self.clients.matchAll())c.postMessage({type:'AUDIO_CACHED',source});
      return true;
    });
  }catch{return false;}
}
function startFull(source,request,optional,preload=false,providedResponse,requestGeneration=generation){
  let job=inflight.get(source);
  if(job){if(!optional)job.optional=false;return job;}
  const controller=new AbortController(),version=requestGeneration;
  const response=providedResponse?Promise.resolve(providedResponse):fetch(request,{signal:controller.signal});
  job={controller,optional,preload,response,stored:null};
  job.stored=response.then(value=>storeFull(source,value.clone(),version,controller.signal)).catch(()=>false).then(ok=>{if(!ok&&job.optional)controller.abort();return ok;}).finally(()=>{if(inflight.get(source)===job)inflight.delete(source);});
  inflight.set(source,job);return job;
}
async function audioFetch(event){
  await ensureConfig();
  const source=event.request.url,range=event.request.headers.get('Range'),method=event.request.method;
  const hit=await cachedFull(source);if(hit)return cachedRange(hit,range,method);
  if(method==='HEAD')return fetch(event.request);
  const playback=event.request.destination==='audio';
  if(playback)protectedSources.set(event.clientId||'current',source);
  if(range){
    // Network ranges stay intact. An ignored Range (200) can feed the optional
    // full cache, but a genuine 206 can never enter that cache.
    const version=generation,promise=fetch(event.request);playingRequests.set(source,promise);
    try{
      const response=await promise;
      if(fullResponse(response)&&budget)event.waitUntil(startFull(source,event.request,!playback,false,response.clone(),version).stored);
      return response;
    }finally{if(playingRequests.get(source)===promise)playingRequests.delete(source);}
  }
  const preload=!playback&&!protectedSource(source);
  const playing=playingRequests.get(source);if(playing)try{await playing;}catch{}
  const job=startFull(source,event.request,!playback,preload);event.waitUntil(job.stored);
  return (await job.response).clone();
}
async function shellResponse(request){
  try{
    const cache=await caches.open(SHELL),hit=await cache.match(request);if(hit)return hit;
    // An already-open tab can still request a prior release's versioned script.
    for(const name of (await caches.keys()).filter(name=>name.startsWith('roylyl-music-shell-')&&name!==SHELL)){
      const previous=await (await caches.open(name)).match(request);if(previous)return previous;
    }
  }catch{}
  return fetch(request);
}
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(audioSource(u.href)&&['GET','HEAD'].includes(event.request.method)){event.respondWith(audioFetch(event));return;}
  if(u.origin!==self.location.origin||!u.pathname.startsWith('/music/')||event.request.method!=='GET')return;
  if(event.request.mode==='navigate'&&(u.pathname==='/music/'||u.pathname==='/music/index.html')){
    event.respondWith((async()=>{try{const hit=await (await caches.open(SHELL)).match('/music/');if(hit)return hit;}catch{}return fetch(event.request);})());return;
  }
  if(FILES.some(file=>file.split('?')[0]===u.pathname))event.respondWith(shellResponse(event.request));
});
