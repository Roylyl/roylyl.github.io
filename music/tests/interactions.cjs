'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const defer=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};
function player(){
  const requests=[],audio={paused:true,src:'',error:null,currentTime:0,pause(){this.paused=true;},play(){this.paused=false;return Promise.resolve();},load(){},getAttribute(){return this.src;},removeAttribute(){this.src='';}};
  const ctx={audio,requests,preparedAudio:new Map(),prepareToken:0,audioCacheGeneration:0,releasePrepared(){ctx.prepareToken++;ctx.preparedAudio.clear();},navigator:{},window:{},URL:{revokeObjectURL(){}},current:null,queue:[],repeat:'all',playToken:0,persistenceRequested:false,loadedTrackId:null,pendingTrackId:null,playbackHistory:[],historyCursor:-1,localAudioUrl:null,BUFFERING_STATUS:'正在缓冲...',canPlay:t=>!!t?.src,audioSource:t=>t.src,cancelPreload(){},status(){},renderCurrent(){},save(){},cacheAudio(){},audioBudget:()=>0,preloadAllowed:()=>true,cachedAudioUrl(){const request=defer();requests.push(request);return request.promise;},setCurrent(t){ctx.current=t;},get(id){return ctx.queue.find(t=>t.id===id);}};
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function preloadNext()'),source.indexOf('  const modeLabels')),ctx);return ctx;
}
(async()=>{
  const a={id:'a',src:'a.mp3'},b={id:'b',src:'b.mp3'},c={id:'c',src:'c.mp3'};
  let p=player(),first=p.play(a,[a,b]),second=p.play(b,[a,b]);p.requests[1].resolve(null);await second;p.requests[0].resolve(null);await first;assert.equal(p.audio.src,b.src);assert.equal(p.current.id,'b');
  p=player();first=p.play(a,[a,b]);second=p.play(a,[a,b]);p.requests[0].resolve(null);await first;assert.equal(p.audio.src,'');p.requests[1].resolve(null);await second;assert.equal(p.audio.src,a.src);
  p=player();first=p.play(a,[a,b]);p.pausePlayback();p.requests[0].resolve(null);await first;assert(p.audio.paused);assert.equal(p.audio.src,'');assert.equal(p.pendingTrackId,null);
  p=player();first=p.play(a,[a,b,c]);p.requests[0].resolve(null);await first;second=p.play(c);p.requests[1].resolve(null);await second;p.repeat='shuffle';p.previousTrack();assert.equal(p.current.id,'a');assert.equal(p.audio.src,a.src);await new Promise(r=>setImmediate(r));p.advance(1);assert.equal(p.current.id,'c');assert.equal(p.audio.src,c.src);await new Promise(r=>setImmediate(r));
  p.repeat='all';p.audio.currentTime=42;p.previousTrack();assert.equal(p.current.id,'b');assert.equal(p.audio.src,b.src);await new Promise(r=>setImmediate(r));
  assert.equal(p.requests.length,2,'自动切歌不能等待异步缓存查询');
  p=player();first=p.play(a,[a,b]);p.requests[0].resolve(null);await first;p.preparedAudio.set(b.src,'blob:ready-next');p.advance(1,true);assert.equal(p.audio.src,'blob:ready-next');assert.equal(p.audio.paused,false);assert.equal(p.requests.length,1);
  console.log('通过：播完后同一任务内启动下一首，优先使用提前准备的缓存。');
  console.log('通过：连续切歌、同曲连点、加载中暂停、随机历史前进后退、超过3秒上一首。');
  const handlers={},stores=new Map();let network=0,ignoreRange=false;
  const cacheFor=name=>{if(!stores.has(name))stores.set(name,new Map());const entries=stores.get(name);return {
    async match(key){return entries.get(typeof key==='string'?key:key.url)?.clone();},
    async put(key,res){entries.set(typeof key==='string'?key:key.url,new Response(await res.arrayBuffer(),{status:res.status,headers:res.headers}));},
    async delete(key){return entries.delete(typeof key==='string'?key:key.url);},
    async keys(){return [...entries.keys()].map(url=>new Request(url));}
  };};
  const worker={self:{location:{origin:'https://roylyl.github.io'},addEventListener:(name,fn)=>handlers[name]=fn,clients:{claim(){},async matchAll(){return[];}},skipWaiting(){}},caches:{open:async name=>cacheFor(name),delete:async name=>stores.delete(name),keys:async()=>[...stores.keys()]},fetch:async request=>{network++;const range=request.headers?.get('Range');if(range&&!ignoreRange)return new Response('2345',{status:206,headers:{'Content-Type':'audio/mpeg','Content-Length':'4','Content-Range':'bytes 2-5/30'}});return new Response('012345678901234567890123456789',{headers:{'Content-Type':'audio/mpeg','Content-Length':'30'}});},URL,Request,Response,Headers,AbortController,console};
  vm.createContext(worker);vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../audio-worker.js'),'utf8'),worker);
  const url='https://raw.githubusercontent.com/Roylyl/Music/main/a.mp3?v=2';
  function request(range,method='GET',target=url){let response;const waits=[];handlers.fetch({request:new Request(target,{method,headers:range?{Range:range}:{}}),clientId:'test',waitUntil(p){waits.push(p);},respondWith(p){response=p;}});return {get response(){return response;},async done(){await Promise.all(waits);}};}
  const one=request(),two=request();assert.equal(await (await one.response).text(),'012345678901234567890123456789');assert.equal(await (await two.response).text(),'012345678901234567890123456789');await one.done();await two.done();assert.equal(network,1);
  for(const [range,expected] of [['bytes=2-5','2345'],['bytes=10-','01234567890123456789'],['bytes=-10','0123456789'],['bytes=10-19','0123456789'],['bytes=30-','']]){
    const result=await request(range).response;assert.equal(result.status,expected?206:416);if(expected)assert.equal(await result.text(),expected);
  }
  const invalid=await request('bytes=0-1,4-5').response;assert.equal(invalid.status,200,'多段请求明确降级为完整响应');
  const head=await request(null,'HEAD').response;assert.equal(head.status,200);assert.equal(head.headers.get('Content-Length'),'30');assert.equal(await head.text(),'');
  assert.equal(network,1,'缓存命中不访问网络');
  let cleared;handlers.message({data:{type:'CLEAR_AUDIO'},ports:[{postMessage(){}}],waitUntil(p){cleared=p;}});await cleared;assert.equal(stores.has('roylyl-music-audio-v2'),false);
  const cold=await request('bytes=2-5').response;assert.equal(cold.status,206);assert.equal(cold.headers.get('Content-Range'),'bytes 2-5/30');assert.equal(await cold.text(),'2345');assert.equal(network,2,'冷缓存Range需透传上游');
  ignoreRange=true;const ignored=await request('bytes=10-19').response;assert.equal(ignored.status,200,'上游忽略Range时必须保留200');assert.equal(ignored.headers.get('Content-Range'),null);
  ignoreRange=false;
  const config=async current=>{let done;handlers.message({data:{type:'AUDIO_CONFIG',budget:40,preload:true,current},ports:[{postMessage(){}}],waitUntil(p){done=p;}});await done;};
  await config(url);
  const currentFull=request();await (await currentFull.response).text();await currentFull.done();
  const secondUrl='https://raw.githubusercontent.com/Roylyl/Music/main/b.mp3?v=2';
  const secondFull=request(null,'GET',secondUrl);await (await secondFull.response).text();await secondFull.done();
  assert.equal((await cacheFor('roylyl-music-audio-v2').keys()).length,1,'受保护歌曲占用预算时应跳过新缓存');
  await config(secondUrl);const secondRetry=request(null,'GET',secondUrl);await (await secondRetry.response).text();await secondRetry.done();
  assert.equal((await cacheFor('roylyl-music-audio-v2').keys()).length,1,'预算满时应按LRU替换');
  assert(await cacheFor('roylyl-music-audio-v2').match(secondUrl));
  console.log('通过：完整缓存并发复用、范围切片、416、多段降级、HEAD、清理、冷Range透传及预算保护。');
})().catch(error=>{console.error(error);process.exitCode=1;});
// Exercise the actual render branch: the playlist button must use visible results.
{
  const nodes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,{value:'',hidden:false,innerHTML:'',textContent:'',querySelector:sel=>node(id+sel)});return nodes.get(id);};
  const songs=[{id:'a',title:'目标歌曲',artist:'甲',album:'专辑',src:'a.mp3'},{id:'b',title:'其他歌曲',artist:'乙',album:'专辑',src:'b.mp3'}];
  node('search').value='目标';node('sort-primary').value='default';
  let played;
  const ctx={$:node,document:{body:{classList:{toggle(){}}},querySelectorAll(){return[];},querySelector:node},closeTrackMenu(){},filtered:()=>songs,view:'favorites',selected:null,albums:[],appleMusic:{favorites:['a','b'],updatedAt:'2026-09-28'},activePlaylist:null,updateSortControls(){},playlistTracks:()=>songs,normalize:x=>x,matchesArtist:()=>true,canPlay:t=>!!t.src,compareItems:()=>0,esc:x=>x,icon:()=>'',playAlbum:x=>played=x.tracks,playlistRows:()=>'',hydrateCovers(){},renderCurrent(){},navigationDepth:0};
  ctx.artistContext=null;ctx.hasViewFilters=()=>!!(node('search').value.trim()||node('artist').value&&node('artist').value!==ctx.artistContext);
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function render()'),source.indexOf('  function playAlbum(')),ctx);ctx.render();node('play-playlist').onclick();assert.deepEqual(played,[songs[0]]);
  ctx.view='albums';node('artist').value='甲';ctx.render();assert.equal(node('back-albums').hidden,true);assert.equal(node('view-title').textContent,'专辑收藏');assert.equal(node('reset-view-filters').disabled,false);assert.equal(node('reset-view-filters').hidden,false);node('artist').value='';node('search').value='';ctx.render();assert.equal(node('back-albums').hidden,true);
  ctx.trackRows=()=>'';ctx.artistLinks=x=>x;
  for(const page of ['albums','artist','songs','favorites','playlist','album'])for(const query of ['', '没有结果']){
    ctx.view=page==='artist'||page==='album'?'albums':page;
    ctx.selected=page==='album'?{key:'a',title:'专辑',artist:'甲',tracks:songs,year:2020}:null;
    ctx.activePlaylist={id:'p',name:'测试歌单',entries:['a','b']};
    ctx.artistContext=page==='artist'?'甲':null;node('artist').value=page==='artist'?'甲':'';node('search').value=query;
    ctx.filtered=()=>query?[]:songs;ctx.render();
    assert.equal(node('reset-view-filters').hidden,false,page+'必须保留清空入口');
    assert.equal(node('reset-view-filters').disabled,!query,page+'清空按钮状态');
    if(page==='artist'&&!query)assert(!node('emptyp').textContent.includes('清空'),'歌手页不能提示点击禁用的清空按钮');
    if(page==='album'){assert.equal(node('.filters').hidden,true);assert.equal(node('back-albums').hidden,false);assert.equal(node('play-selected').disabled,!!query);}
  }
  console.log('通过：6类页面×2种搜索状态的清空入口、返回和专辑空结果播放状态。');
}
{
  const nodes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,{value:'',scrollIntoView(){},focus(){}});return nodes.get(id);};
  node('search').value='原关键词';node('artist').value='原歌手';
  node('sort-primary').value='name';node('sort-secondary').value='none';node('sort-direction').value='desc';
  const entries=[{state:null}],history={state:null,replaceState(s){this.state=s;entries[entries.length-1].state=s;},pushState(s){this.state=s;entries.push({state:s});}},handlers={};
  const ctx={$:node,history,artistContext:null,view:'songs',selected:null,activePlaylist:null,collectionSort:{primary:'name'},scrollY:420,albums:[{key:'album'}],appleMusic:{playlists:[]},window:{addEventListener:(name,fn)=>handlers[name]=fn,scrollTo:({top})=>ctx.scrollY=top},setTimeout,clearTimeout,requestAnimationFrame:fn=>fn(),render(){},leaveFixedSort(){},icon:()=>'',full:{open:false}};
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf("  const navigationKey="),source.indexOf('  function showPlaylist('))+'\nnavigationReady=true;rememberNavigation();',ctx);
  ctx.openArtist('新歌手');assert.equal(entries.length,2);assert.equal(ctx.view,'albums');
  ctx.restoreNavigation(entries[0].state['roylyl-music-navigation']);assert.equal(ctx.view,'songs');assert.equal(node('search').value,'原关键词');assert.equal(node('artist').value,'原歌手');assert.equal(ctx.scrollY,420);assert.equal(node('sort-direction').value,'desc');
  ctx.view='albums';ctx.artistContext=null;node('artist').value='新歌手';ctx.openArtist('新歌手');assert.equal(ctx.artistContext,'新歌手','手动筛选后仍可进入歌手页');const count=entries.length;ctx.openArtist('新歌手');assert.equal(entries.length,count,'重复点击当前歌手不增加历史');
  vm.runInContext(source.split('\n').find(line=>line.includes("$('back-albums').onclick=")),ctx);vm.runInContext('navigationDepth=0',ctx);node('back-albums').onclick();assert.equal(node('artist').value,'');assert.equal(node('search').value,'');
  console.log('通过：导航返回恢复状态、当前歌手重复点击、无历史时退出歌手筛选。');
}
{
  let click,doubleClick,played=0,menuOpened=0;
  const node={_tracks:[{id:'a',src:'a.mp3'}]},track=node._tracks[0];
  const ctx={document:{addEventListener(name,fn){if(name==='click')click=fn;if(name==='dblclick')doubleClick=fn;}},matchMedia:()=>({matches:true}),$:()=>node,get:()=>track,queue:[track],play(){played++;},openTrackMenu(){menuOpened++;},moreMenu:{hidden:true}};
  vm.createContext(ctx);
  const start=source.indexOf("  document.addEventListener('click',e=>{"),end=source.indexOf("  moreMenu.addEventListener('keydown'",start);
  vm.runInContext(source.slice(start,end),ctx);
  const row={dataset:{track:'a'},closest:()=>null};
  click({target:{closest(selector){return selector==='.track-row[data-track]'?row:null;}}});assert.equal(played,1);
  const more={dataset:{more:'a'}};
  click({target:{closest(selector){if(selector==='.track-row[data-track]')return row;if(selector==='button,a,input,select'||selector==='[data-more]')return more;return null;}}});assert.equal(played,1);assert.equal(menuOpened,1);
  ctx.matchMedia=()=>({matches:false});
  click({target:{closest(selector){return selector==='.track-row[data-track]'?row:null;}}});assert.equal(played,1,'桌面单击空白不能播放');
  doubleClick({target:{closest(selector){return selector==='.track-row[data-track]'?row:null;}}});assert.equal(played,2,'桌面双击空白播放');
  click({target:{closest(selector){if(selector==='.track-row[data-track]')return row;if(selector==='button,a,input,select'||selector==='[data-more]')return more;return null;}}});assert.equal(played,2);assert.equal(menuOpened,2);
  for(const control of ['button','a','input','select']){
    click({target:{closest(selector){if(selector==='.track-row[data-track]')return row;if(selector==='button,a,input,select')return {tagName:control};return null;}}});
    doubleClick({target:{closest(selector){if(selector==='.track-row[data-track]')return row;if(selector==='button,a,input,select')return {tagName:control};return null;}}});
    assert.equal(played,2,'独立控件不能触发行播放');
  }
  ctx.matchMedia=()=>({matches:true});
  doubleClick({target:{closest(selector){return selector==='.track-row[data-track]'?row:null;}}});assert.equal(played,2,'手机双击事件不重复触发播放');
  console.log('通过：桌面空白双击、手机整行单击、独立控件隔离。');
}
{
  const tracks=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../data/catalog.json'),'utf8')).tracks.map(t=>({...t,year:Number(t.albumYear??t.src.match(/\/(\d{4}) - /)?.[1])||0}));
  const code=source.slice(source.indexOf('    const releaseKey='),source.indexOf('    albums=[...grouped.values()]'));
  const group=new Function('tracks','normalize','artistNames',code+'return [...grouped.values()];');
  const albums=group(tracks,s=>s.normalize('NFKC').toLowerCase(),s=>s.split(/\s+(?:&|／|\/)\s+|[、;；]/));
  for(const title of ['Shall We Dance? Shall We Talk!','2013 陈奕迅 Music Life 精选','陈奕迅 广东精选','Start from Here','有理想','嗯','劳动之余','尘'])assert.equal(albums.filter(a=>a.title===title).length,1,title);
  assert.equal(albums.find(a=>a.title==='Shall We Dance? Shall We Talk!').tracks.length,3);
  assert.equal(albums.reduce((sum,a)=>sum+a.tracks.length,0),tracks.length);
  assert.equal(albums.filter(a=>a.title==='再想想').length,2,'未核实的2017原录音与2026版本不自动合并');
  console.log('通过：目录标点差异、六组年份修正、合作艺人归并；848首曲目全部保留。');
}

// Empty visible results must not fall through to an unrelated library song.
{
  const nodes={play:{},songs:{_tracks:[]}},calls=[];
  const ctx={$:id=>nodes[id],audio:{paused:true,error:null},pendingTrackId:null,current:null,queue:[],filtered:()=>[{id:'outside'}],play:(...args)=>calls.push(args)};
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf("  $('play').onclick ="),source.indexOf("  $('prev').onclick")),ctx);
  nodes.play.onclick();assert.equal(calls.length,0);
  nodes.songs._tracks=[{id:'visible'}];nodes.play.onclick();assert.equal(calls[0][0].id,'visible');
  ctx.current={id:'playing'};ctx.queue=[ctx.current];nodes.songs._tracks=[];nodes.play.onclick();assert.equal(calls[1][0].id,'playing');
  console.log('通过：空列表不播放库外结果，已有歌曲仍能恢复播放。');
}
{
  let scrollHandler,closed=0;
  class Node{};const inside=new Node(),outside=new Node();
  const ctx={Node,moreMenu:{hidden:false,contains:target=>target===inside},closeTrackMenu:()=>closed++,window:{addEventListener:(_,fn)=>scrollHandler=fn}};
  vm.createContext(ctx);vm.runInContext(source.split('\n').find(line=>line.includes("window.addEventListener('scroll',event=>")),ctx);
  scrollHandler({target:inside});assert.equal(closed,0);
  scrollHandler({target:outside});assert.equal(closed,1);
  console.log('通过：菜单内部滚动保留菜单，外部滚动关闭菜单。');
}
{
  const nodes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,{dataset:{},innerHTML:'',focus(){}});return nodes.get(id);};
  const menu={hidden:true,style:{},get offsetWidth(){return node('menu-artists').innerHTML?220:152;},offsetHeight:180};
  const button={dataset:{more:'a'},setAttribute(){},closest(){return null;},getBoundingClientRect(){return {right:380,top:600,bottom:640};}};
  const ctx={$:node,moreMenu:menu,moreButton:null,moreTrackId:null,closeTrackMenu(){},document:{body:{append(){}}},get:()=>({albumKey:'a',artist:'合作歌手'}),artistNames:s=>[s],esc:s=>s,innerWidth:400,innerHeight:700};
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function openTrackMenu('),source.indexOf('  async function shareTrack(')),ctx);ctx.openTrackMenu(button);
  assert.equal(menu.style.left,'160px');assert.equal(menu.style.top,'412px');
  let closeHandler,menuClosed=false,queueClosed=false,focused=false;
  const closeContext={full:{addEventListener:(_,fn)=>closeHandler=fn},closeTrackMenu:()=>menuClosed=true,toggleFullQueue:open=>queueClosed=!open,document:{body:{classList:{remove(){}}}},$:()=>({focus(){focused=true;}})};
  vm.createContext(closeContext);vm.runInContext(source.split('\n').find(line=>line.includes("full.addEventListener('close'")),closeContext);closeHandler();
  assert(menuClosed&&queueClosed&&focused);
  console.log('通过：更多菜单按最终内容定位，全屏原生退出清理菜单与队列并归还焦点。');
}
{
  const text='测试歌曲 - 测试乐队\n演唱：主唱\n词：词作者\n吉他：吉他手\n贝斯：贝斯手\n[00:01.00]第一句\n[00:03.00]第二句';
  const {metadata:credits,groups}=require('../lyric-parser.js').parseLrc(text,'测试歌曲','测试乐队');
  assert.deepEqual(credits,['演唱：主唱','词：词作者','吉他：吉他手','贝斯：贝斯手']);
  assert.deepEqual(groups.flatMap(group=>group.lines),['第一句','第二句']);
  console.log('通过：创作者和乐手位于歌词正文前，时间轴正文保持独立。');
}
