'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const code=fs.readFileSync(require('path').join(__dirname,'../catalog-sync.js'),'utf8');
const fixture=version=>({schemaVersion:1,version,audioProperties:{},tracks:[{id:'a',title:'歌曲A',artist:'歌手',album:'专辑',src:'artists/歌手/专辑/a.mp3',cover:'artists/歌手/专辑/cover.webp'}],appleMusic:{entries:{ea:{trackId:'a',title:'歌曲A',artist:'歌手'}},favorites:['ea'],playlists:[]}});
function setup({storage=true}={}) {
  const values=new Map(),calls=[];let remote=fixture('1.0.0'),manifest='1.0.0',offline=false;
  const db={objectStoreNames:{contains:()=>true},createObjectStore(){},close(){},transaction(){
    const tx={objectStore:()=>({get(key){const req={};queueMicrotask(()=>{req.result=values.has(key)?structuredClone(values.get(key)):null;tx.oncomplete?.();});return req;},put(value,key){const req={};queueMicrotask(()=>{values.set(key,structuredClone(value));tx.oncomplete?.();});return req;}}),abort(){tx.onabort?.();}};return tx;
  }};
  const ctx={console,URL,AbortController,setTimeout,clearTimeout,navigator:{onLine:true},
    fetch:async address=>{calls.push(String(address));if(offline)throw new TypeError('offline');let body;
      if(String(address).includes('catalog-version.json'))body={schemaVersion:1,version:manifest,catalog:'catalog.json'};
      else if(String(address).startsWith('https:'))body=remote;
      else body=fixture('1.0.0');
      return new Response(JSON.stringify(body),{status:200,headers:{'Content-Type':'application/json'}});
    }};
  if(storage)ctx.indexedDB={open(){const request={result:db};queueMicrotask(()=>request.onsuccess?.());return request;}};
  vm.createContext(ctx);vm.runInContext(code,ctx);
  return {ctx,values,calls,create:()=>ctx.RoylylCatalogSync.create({fallbackUrl:'./fallback.json'}),setRemote:(version,catalog=fixture(version))=>{manifest=version;remote=catalog;},offline:()=>{offline=true;ctx.navigator.onLine=false;}};
}
(async()=>{
  let s=setup(),sync=s.create();assert.equal((await sync.load()).version,'1.0.0');assert.equal(sync.state.persisted,true);
  const next=fixture('1.1.0');next.tracks.push({...next.tracks[0],id:'b',title:'歌曲B',src:'artists/歌手/专辑/b.mp3'});next.appleMusic.entries.eb={trackId:'b',title:'歌曲B',artist:'歌手'};next.appleMusic.playlists.push({id:'new-list',name:'新增歌单',entries:['eb']});
  s.setRemote('1.1.0',next);const before=s.calls.length;const [a,b]=await Promise.all([sync.check(),sync.check()]);assert.equal(a.status,'updated');assert.equal(b.version,'1.1.0');assert.equal(sync.current.tracks.length,2);assert.equal(sync.current.appleMusic.playlists[0].name,'新增歌单');assert.equal(s.calls.length-before,2);
  const unchanged=s.calls.length;assert.equal((await sync.check()).status,'current');assert.equal(s.calls.length-unchanged,1);
  s.setRemote('1.2.0',fixture('1.1.9'));assert.equal((await sync.check()).status,'error');assert.equal(sync.current.version,'1.1.0');assert.equal(s.values.get('current').version,'1.1.0');
  const bad=fixture('1.2.0');bad.appleMusic.playlists=[{id:'broken',name:'坏歌单',entries:['unknown']}];s.setRemote('1.2.0',bad);assert.equal((await sync.check()).status,'error');assert.equal(sync.current.version,'1.1.0');
  s.offline();sync=s.create();assert.equal((await sync.load()).version,'1.1.0');assert.equal((await sync.check()).status,'offline');assert.equal(sync.current.tracks.length,2);
  const validate=s.ctx.RoylylCatalogSync.validate;
  for(const mutate of [c=>{c.tracks[0].src='../bad.mp3';},c=>{c.tracks[0].cover='artists/%2e%2e/cover.webp';},c=>{c.tracks.push({...c.tracks[0]});},c=>{c.appleMusic.playlists=[{id:'same',name:'1',entries:[]},{id:'same',name:'2',entries:[]}];},c=>{c.schemaVersion=2;}]){const invalid=fixture('1.2.0');mutate(invalid);assert.throws(()=>validate(invalid,{remote:true}));}
  s=setup({storage:false});sync=s.create();await sync.load();s.setRemote('1.1.0');assert.equal((await sync.check()).status,'updated');assert.equal(sync.state.persisted,false);assert.equal(sync.current.version,'1.1.0');
  console.log('catalog sync: cached startup, dynamic new tracks/playlists, deduplicated checks, unchanged-version lightweight request, atomic mismatch/invalid rejection, offline restart and unavailable-storage fallback passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
