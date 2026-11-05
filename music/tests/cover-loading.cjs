'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const file=process.argv[2]||path.join(__dirname,'../app.js');
const source=fs.readFileSync(file,'utf8'),start=source.indexOf('  const coverRevisions='),end=source.indexOf('  const observedCovers=',start);
assert(start>=0&&end>start);
const stored=new Map(),calls=[];let blobs=0,release;
const ctx={URL:class extends URL {static createObjectURL(){return 'blob:'+(++blobs);}},coverCacheGeneration:0,COVER_CACHE:'covers',coverObserver:null,observedCovers:new Set(),
 url:relative=>'https://raw.githubusercontent.com/Roylyl/Music/main/'+relative.split('/').map(encodeURIComponent).join('/'),
 document:{querySelectorAll:()=>[]},caches:{open:async()=>({match:async key=>stored.get(key)?.clone(),put:async(key,response)=>stored.set(key,response.clone()),delete:async key=>stored.delete(key)})},
 fetch:async address=>{calls.push(address);if(release)await new Promise(resolve=>{release=resolve;});return new Response('image-bytes',{headers:{'Content-Type':'image/webp'}});}};
ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source.slice(start,end)+'\nglobalThis.api={cachedCover,coverSource,coverRevisions,coverRequests};',ctx);
(async()=>{
 const album='artists/歌手/专辑/cover.webp';ctx.api.coverRevisions.set(album,'v1');
 const results=await Promise.all(Array.from({length:12},()=>ctx.api.cachedCover(album)));
 assert.equal(calls.length,1,'same album must share one network request');assert.equal(stored.size,1);assert.equal(new Set(results).size,1,'all tracks and surfaces must reuse the same blob');assert.equal(ctx.api.coverRequests.size,0,'settled in-flight entries must be removed');
 await ctx.api.cachedCover(album);assert.equal(calls.length,1);assert.equal(blobs,1);
 ctx.api.coverRevisions.set(album,'v2');const updated=await ctx.api.cachedCover(album);assert.equal(calls.length,2);assert.equal(blobs,2);assert.notEqual(updated,results[0]);assert.match(calls[1],/v=v2$/);
 console.log(path.basename(path.dirname(file))+': same-album requests, blob/cache deduplication, settled task removal and version separation passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
