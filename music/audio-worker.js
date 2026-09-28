'use strict';
const CACHE='roylyl-music-audio-v2';
const active=new Map();
let clearing=Promise.resolve(),generation=0;
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
  if(event.data?.type==='CLEAR_AUDIO'){
    generation++;
    for(const job of active.values())if(job.preload)job.controller.abort();
    active.clear();
    clearing=caches.delete(CACHE);
    event.waitUntil(clearing.then(()=>event.ports[0]?.postMessage({ok:true})));
  }
  if(event.data?.type==='CANCEL_PRELOAD'){
    for(const [source,job] of active)if(source!==event.data.keep){job.clients.delete(event.source?.id);if(!job.clients.size)job.controller.abort();}
  }
});
async function cachedRange(response,range){
  if(!range)return response;
  const blob=await response.blob(),match=/^bytes=(\d*)-(\d*)$/.exec(range);
  if(!match)return new Response(blob,{headers:response.headers});
  const start=match[1]?Number(match[1]):Math.max(0,blob.size-Number(match[2]));
  const end=match[1]&&match[2]?Math.min(Number(match[2]),blob.size-1):blob.size-1;
  if(start>=blob.size||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${blob.size}`}});
  return new Response(blob.slice(start,end+1),{status:206,headers:{'Content-Type':response.headers.get('Content-Type')||'audio/mpeg','Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${blob.size}`,'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(u.origin!=='https://raw.githubusercontent.com'||!u.pathname.startsWith('/Roylyl/Music/main/')||!u.pathname.endsWith('.mp3'))return;
  let finish;const lifetime=new Promise(resolve=>finish=resolve);event.waitUntil(lifetime);
  event.respondWith((async()=>{
    await clearing;
    const source=event.request.url,cache=await caches.open(CACHE),hit=await cache.match(source);
    if(hit){finish();return cachedRange(hit,event.request.headers.get('Range'));}
    let job=active.get(source);
    if(job?.controller.signal.aborted){await job.done;job=null;}
    if(!job){
      const controller=new AbortController();job={controller,clients:new Set(),preload:event.request.destination!=='audio'};
      const version=generation;
      job.response=fetch(source,{signal:controller.signal,mode:'cors'});
      job.done=job.response.then(async response=>{
        if(!response.ok)return;
        // The player receives a streaming clone; one network request also fills the cache.
        await cache.put(source,response.clone());
        if(version!==generation)return;
        for(const client of await self.clients.matchAll())client.postMessage({type:'AUDIO_CACHED',source});
      }).catch(()=>{}).finally(()=>{if(active.get(source)===job)active.delete(source);});
      active.set(source,job);
    }
    job.clients.add(event.clientId);
    if(event.request.destination==='audio')job.preload=false;
    job.done.finally(finish);
    return (await job.response).clone();
  })().catch(error=>{finish();throw error;}));
});
