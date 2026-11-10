'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a);return source.slice(a,b);};
const nodes=new Map(),writes=new Map();
function node(id){
  if(!nodes.has(id))nodes.set(id,{value:'',hidden:false,textContent:'',options:[],token:{},
    get innerHTML(){return this.markup||'';},set innerHTML(value){this.markup=value;this.token={};writes.set(id,(writes.get(id)||0)+1);},
    replaceChildren(){this.innerHTML='';},querySelector:selector=>node(id+selector)});
  return nodes.get(id);
}
const tracks=[{id:'a',title:'目标歌曲',artist:'甲',album:'专辑',src:'a.mp3',cover:'cover.webp'},{id:'b',title:'其他歌曲',artist:'乙',album:'专辑',src:'b.mp3',cover:'cover.webp'}];
const album={key:'album',title:'专辑',artist:'甲',year:2020,tracks};let visible=tracks,played;
const ctx={$:node,desktopShell:true,tracks,albums:[album],selected:album,artistContext:null,view:'albums',navigationDepth:0,
  nativeCatalogReady:true,appleError:false,appleMusic:{favorites:['a','b'],updatedAt:'2026-09-28',entries:{},playlists:[]},activePlaylist:null,
  songChunksObserver:null,document:{body:{classList:{toggle(){}}},querySelectorAll:()=>[],querySelector:node},
  clearDownloadConfirmation(){},closeTrackMenu(){},filtered:()=>visible,hasViewFilters:()=>!!node('search').value,updateSortControls(){},
  esc:value=>String(value),icon:()=>'',artistLinks:value=>value,hydrateCovers(){},renderCurrent(){},
  renderSongList(rows){node('songs')._tracks=rows;},compareItems:()=>0,normalize:s=>s,canPlay:t=>!!t.src,
  playlistTracks:()=>tracks,matchesArtist:()=>true,playAlbum:data=>played=data.tracks,downloadAll(){},
  favorites:new Set(),artistNames:value=>[value],playlistIconName:()=>'',updateCacheStatus(){}};
vm.createContext(ctx);
vm.runInContext(source.split('\n').find(line=>line.startsWith('  function setMarkup('))+section('  function render() {','  function playAlbum(')+section('  function applyAppleMusic() {','  // Android owns'),ctx);
ctx.render();const albumToken=node('album-detail').token;
ctx.render();assert.equal(node('album-detail').token,albumToken,'相同专辑详情保留大封面DOM');assert.equal(writes.get('album-detail'),1);
visible=[tracks[1]];ctx.render();assert.equal(node('album-detail').token,albumToken,'筛选结果变化不应重建相同专辑封面');
node('play-selected').onclick();assert.deepEqual(played,[tracks[1]],'保留按钮DOM后，播放操作必须使用新的筛选结果');
album.title='新版专辑';ctx.render();assert.equal(writes.get('album-detail'),2,'专辑元数据变化仍更新');
ctx.selected=null;ctx.view='favorites';node('sort-primary').value='default';visible=tracks;ctx.render();
const playlistToken=node('playlist-detail').token;ctx.render();assert.equal(node('playlist-detail').token,playlistToken,'相同歌单操作区保留DOM');
node('search').value='目标';ctx.render();assert.equal(node('playlist-detail').token,playlistToken,'非空结果之间筛选不重建相同按钮');
node('play-playlist').onclick();assert.deepEqual(played,[tracks[0]],'保留歌单按钮DOM后事件使用当前筛选结果');
ctx.appleMusic=null;ctx.render();assert.equal(node('playlist-detail')._markup,undefined,'加载状态清除旧的markup缓存');
ctx.appleMusic={favorites:['a','b'],updatedAt:'2026-09-28',entries:{a:{trackId:'a',artist:'甲'},b:{trackId:'b',artist:'乙'}},playlists:[{id:'p',name:'收藏',entries:['a']}]};
node('search').value='';ctx.render();assert.equal(writes.get('playlist-detail'),2,'加载恢复必须重建歌单操作按钮');
ctx.applyAppleMusic();const fixedToken=node('fixed-playlists').token;ctx.applyAppleMusic();assert.equal(node('fixed-playlists').token,fixedToken,'无变化曲库刷新保留歌单入口DOM');
ctx.appleMusic.playlists[0].entries.push('b');ctx.applyAppleMusic();assert.equal(writes.get('fixed-playlists'),2,'新歌曲数仍刷新歌单入口');
console.log('PASS stable pages: album/download/playlist markup guards preserve DOM, metadata refreshes and current filtered actions remain correct');
