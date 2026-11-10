'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const file=process.argv[2]||path.join(__dirname,'../app.js');
const source=fs.readFileSync(file,'utf8'),start=source.indexOf('  const coverRevisions='),end=source.indexOf('  const observedCovers=',start);
assert(start>=0&&end>start);
const stored=new Map(),calls=[],revoked=[],documentEvents={},boundImages=[];let blobs=0,release,clock=1000,mode='ok',cancelledBodies=0,denyStorage=false;
const ctx={URL:class extends URL {static createObjectURL(){return 'blob:'+(++blobs);}static revokeObjectURL(source){revoked.push(source);}},Date:{now:()=>clock},Event,coverCacheGeneration:0,COVER_CACHE:'covers',
 url:relative=>'https://raw.githubusercontent.com/Roylyl/Music/main/'+relative.split('/').map(encodeURIComponent).join('/'),
 document:{querySelectorAll:()=>boundImages,addEventListener:(name,handler)=>documentEvents[name]=handler},caches:{open:async()=>{if(denyStorage)throw Error('storage disabled');return {match:async key=>stored.get(key)?.clone(),put:async(key,response)=>stored.set(key,response.clone()),delete:async key=>stored.delete(key)};}},
 fetch:async(address,options)=>{calls.push({address,options});if(release)await new Promise(resolve=>{release=resolve;});
   if(mode==='network')throw Error('offline');
   if(mode==='404')return {ok:false,status:404,body:{cancel(){cancelledBodies++;return Promise.resolve();}}};
   if(mode==='html')return {ok:true,status:200,headers:new Headers({'Content-Type':'text/html; charset=utf-8'}),body:{cancel(){cancelledBodies++;return Promise.resolve();}}};
   return new Response('image-bytes',{headers:{'Content-Type':'image/webp'}});}};
ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source.slice(start,end)+'\nglobalThis.api={cachedCover,coverSource,coverRevisions,coverRequests};',ctx);
vm.runInContext(source.slice(source.indexOf('  const observedCovers='),source.indexOf('  function hydrateCovers(')),ctx);
(async()=>{
 const album='artists/歌手/专辑/cover.webp';ctx.api.coverRevisions.set(album,'v1');
 const results=await Promise.all(Array.from({length:12},()=>ctx.api.cachedCover(album)));
 assert.equal(calls.length,1,'same album must share one network request');assert.equal(stored.size,1);assert.equal(new Set(results).size,1,'all tracks and surfaces must reuse the same blob');assert.equal(ctx.api.coverRequests.size,0,'settled in-flight entries must be removed');
 await ctx.api.cachedCover(album);assert.equal(calls.length,1);assert.equal(blobs,1);
 ctx.api.coverRevisions.set(album,'v2');const updated=await ctx.api.cachedCover(album);assert.equal(calls.length,2);assert.equal(blobs,2);assert.notEqual(updated,results[0]);assert.match(calls[1].address,/v=v2$/);
 const writes=[],image={dataset:{},set src(value){writes.push(value);}};
 ctx.bindCover(image,album);assert.deepEqual(writes,[updated],'warm cover binding must never reset to a placeholder');
 ctx.bindCover(image,album);assert.deepEqual(writes,[updated],'binding the same source again must not restart image loading');
 ctx.api.coverRevisions.set(album,'v3');const revision=await ctx.api.cachedCover(album);
 ctx.bindCover(image,album);assert.deepEqual(writes,[updated,revision],'a changed cover revision must still replace the image directly');
 const beforeClear=calls.length;boundImages.push(image);ctx.invalidateCoverCache();
 assert.equal(calls.length,beforeClear);assert.deepEqual(writes,[updated,revision],'clearing cover cache must not issue raw URL requests for every visible image');
 assert.equal(image.dataset.coverBound,album,'clearing cache retains the path for an explicit retry');assert.equal(image.dataset.coverSource,undefined);assert(revoked.includes(revision));
 const persisted=await ctx.api.cachedCover(album);assert.equal(calls.length,beforeClear,'cleared in-memory cache can still reuse persistent bytes');assert.notEqual(persisted,revision);

 mode='404';const missing='artists/歌手/无封面/cover.webp',beforeMissing=calls.length;
 assert.equal(await ctx.api.cachedCover(missing),null);assert.equal(await ctx.api.cachedCover(missing),null);
 assert.equal(calls.length,beforeMissing+1);assert.equal(cancelledBodies,1,'definitive HTTP failures stop reading error bodies');
 clock+=15001;assert.equal(await ctx.api.cachedCover(missing),null);assert.equal(calls.length,beforeMissing+1,'404 has a longer bounded failure memory');
 clock+=300000;await ctx.api.cachedCover(missing);assert.equal(calls.length,beforeMissing+2,'404 retry becomes available after expiry');
 mode='ok';const retried=await ctx.api.cachedCover(missing,true);assert(retried.startsWith('blob:'));assert.equal(calls.at(-1).options.cache,'reload','explicit retry bypasses failure and stale cache');

 mode='network';const offline='artists/歌手/离线/cover.webp',beforeOffline=calls.length;
 await Promise.all(Array.from({length:8},()=>ctx.api.cachedCover(offline)));
 assert.equal(calls.length,beforeOffline+1,'concurrent network failures share one request');
 const failedImageWrites=[],failedEvents=[],failedImage={dataset:{coverBound:offline,coverSource:ctx.api.coverSource(offline)},isConnected:true,set src(value){failedImageWrites.push(value);},dispatchEvent(event){failedEvents.push(event.type);return true;}};
 await ctx.loadCoverInto(failedImage,offline);assert.deepEqual(failedImageWrites,[],'failed fetch must never hand a raw URL to img for a duplicate network attempt');assert.equal(failedImage.dataset.coverState,'error');assert.deepEqual(failedEvents,['error']);
 clock+=15001;mode='ok';await ctx.loadCoverInto(failedImage,offline);assert.equal(failedImage.dataset.coverState,undefined);assert.equal(failedImageWrites.length,1);assert(failedImageWrites[0].startsWith('blob:'));

 mode='404';const explicit='artists/歌手/重试/cover.webp';await ctx.api.cachedCover(explicit);
 const retryImg={dataset:{coverBound:explicit,coverSource:ctx.api.coverSource(explicit)},isConnected:true,dispatchEvent(){return true;},set src(value){this.lastSource=value;}};
 mode='ok';const retryEvent=new Event('roylyl-cover-retry',{cancelable:true});Object.defineProperty(retryEvent,'target',{value:retryImg});documentEvents['roylyl-cover-retry'](retryEvent);
 assert.equal(retryEvent.defaultPrevented,true);await new Promise(resolve=>setImmediate(resolve));assert(retryImg.lastSource.startsWith('blob:'));assert.equal(calls.at(-1).options.cache,'reload');
 const htmlPath='artists/歌手/错误网页/cover.webp',htmlSource=ctx.api.coverSource(htmlPath),beforeHtml=calls.length,bodiesBeforeHtml=cancelledBodies;
 mode='html';assert.equal(await ctx.api.cachedCover(htmlPath),null);assert.equal(stored.has(htmlSource),false,'200 HTML must not pollute the shared cover cache');assert.equal(cancelledBodies,bodiesBeforeHtml+1);
 await ctx.api.cachedCover(htmlPath);assert.equal(calls.length,beforeHtml+1,'invalid successful responses get short failure deduplication');
 mode='ok';assert((await ctx.api.cachedCover(htmlPath,true)).startsWith('blob:'));assert.equal(stored.get(htmlSource).headers.get('Content-Type'),'image/webp','explicit retry restores the actual image');
 const stalePath='artists/歌手/旧错误条目/cover.webp',staleSource=ctx.api.coverSource(stalePath);
 stored.set(staleSource,new Response('<html>error</html>',{headers:{'Content-Type':'text/html'}}));
 const beforeStale=calls.length;assert((await ctx.api.cachedCover(stalePath)).startsWith('blob:'));assert.equal(calls.length,beforeStale+1);assert.equal(stored.get(staleSource).headers.get('Content-Type'),'image/webp','old non-image cache entries are discarded and replaced');
 denyStorage=true;const uncached=await ctx.api.cachedCover('artists/歌手/无存储/cover.webp');assert(uncached.startsWith('blob:'),'storage denial must retain ordinary online image loading');
 console.log(path.basename(path.dirname(file))+': same-album requests, blob/cache deduplication, settled task removal and version separation passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
