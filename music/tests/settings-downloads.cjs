'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const section=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);assert(a>=0&&b>a);return source.slice(a,b);};
const nodes=new Map(),writes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,{value:'',get innerHTML(){return this.markup||'';},set innerHTML(value){this.markup=value;writes.set(id,(writes.get(id)||0)+1);},hidden:false,disabled:false,textContent:'',options:[]});return nodes.get(id);};
node('artist').value='背景歌手';node('artist').innerHTML='<option>背景歌手</option>';
node('search').value='背景搜索';node('sort-primary').value='release';
node('downloads-sort-primary').value='default';node('downloads-sort-secondary').value='none';node('downloads-sort-direction').value='asc';
node('downloads-sort-secondary').options=['none','release','artist','name'].map(value=>({value}));
const tracks=[{id:'a',title:'旧歌',artist:'甲',album:'专辑一',src:'a',year:2000},{id:'b',title:'新歌',artist:'乙',album:'专辑二',src:'b',year:2020},{id:'c',title:'未下载',artist:'甲',album:'专辑一',src:'c',year:2025}];
let refreshes=0;
const ctx={desktopShell:true,settingsDownloadsOpen:false,downloadsLoadState:'ready',tracks,downloadedSources:new Set(['a','b']),$:node,
  view:'albums',selected:{key:'background-album'},artistContext:'背景歌手',navigationDepth:3,
  render(){throw Error('下载管理不得重绘背景页面');},restoreNavigation(){throw Error('下载管理不得改变主页面导航');},
  refreshDownloadedTracks:()=>refreshes++,notifyNativeSettings:()=>({}),clearDownloadConfirmation(){},syncMusicSelects(){},hydrateCovers(){},
  audioSource:t=>t.src,normalize:s=>s.toLowerCase(),matchesArtist:(t,a)=>!a||t.artist===a,compareText:(a,b)=>a.localeCompare(b,'zh-CN'),downloadedRows:rows=>JSON.stringify(rows.map(t=>t.id))};
vm.createContext(ctx);vm.runInContext(source.split('\n').find(line=>line.startsWith('  function setMarkup('))+section('  function compareField(','  function compareItems(')+section('  function renderSettingsDownloads(){','  function downloadedRows(')+section("  function nativeSettings(action='sync',value)",'  function notifyNativePlayback('),ctx);
ctx.nativeSettings('openSettingsDownloads');assert.equal(refreshes,1);assert.equal(node('downloads-songs').innerHTML,'["a","b"]');assert.equal(node('downloads-count').textContent,'2首歌曲');
ctx.renderSettingsDownloads();assert.equal(writes.get('downloads-songs'),1,'相同下载列表必须保留现有歌曲和封面DOM');
node('downloads-search').value='新歌';ctx.renderSettingsDownloads();assert.equal(node('downloads-songs').innerHTML,'["b"]');
node('downloads-search').value='';node('downloads-artist').value='甲';ctx.renderSettingsDownloads();assert.equal(node('downloads-songs').innerHTML,'["a"]');
node('downloads-artist').value='';node('downloads-sort-primary').value='release';node('downloads-sort-direction').value='desc';ctx.renderSettingsDownloads();assert.equal(node('downloads-songs').innerHTML,'["b","a"]');
node('downloads-artist').value='已移除歌手';node('downloads-artist').options=[{value:''},{value:'甲'}];ctx.syncSettingsDownloadArtists();assert.equal(node('downloads-artist').value,'','曲库更新后不得保留已移除的歌手筛选');
ctx.nativeSettings('closeSettingsDownloads');assert.equal(ctx.settingsDownloadsOpen,false);
assert.equal(ctx.view,'albums');assert.equal(ctx.selected.key,'background-album');assert.equal(ctx.navigationDepth,3);assert.equal(ctx.artistContext,'背景歌手');assert.equal(node('search').value,'背景搜索');assert.equal(node('artist').value,'背景歌手');assert.equal(node('sort-primary').value,'release');
console.log('PASS settings downloads: isolated state, downloaded-only search/filter/sort and unchanged collection navigation');
