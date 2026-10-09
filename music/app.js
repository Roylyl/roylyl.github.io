'use strict';
(() => {
  const APP_VERSION='20261009-pwa-38', SHELL_VERSION='roylyl-music-shell-20261009-40';
  const ROOT = 'https://raw.githubusercontent.com/Roylyl/Music/main/';
  const $ = id => document.getElementById(id);
  const themeMedia=window.matchMedia('(prefers-color-scheme: dark)');
  const themeChoice=()=>{try{return localStorage.getItem('roylyl-music-theme')||'dark';}catch{return 'dark';}};
  function applyTheme(choice) {
    const effective=choice==='system'?(themeMedia.matches?'dark':'light'):choice;
    document.documentElement.dataset.theme=effective;
    $('theme-color').content=effective==='light'?'#f6f8fb':'#05070b';
    document.querySelectorAll('input[name="theme"]').forEach(input=>{input.checked=input.value===choice;});
  }
  applyTheme(themeChoice());
  themeMedia.addEventListener('change',()=>{if(themeChoice()==='system')applyTheme('system');});
  document.querySelectorAll('[data-open-settings]').forEach(button=>button.onclick=()=>$('settings-dialog').showModal());
  $('close-settings').onclick=()=>$('settings-dialog').close();
  $('settings-dialog').addEventListener('click',event=>{if(event.target===$('settings-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
  document.querySelectorAll('input[name="theme"]').forEach(input=>input.onchange=()=>{
    try{localStorage.setItem('roylyl-music-theme',input.value);}catch{}
    applyTheme(input.value);
  });
  const audio = $('audio');
  const AUDIO_CACHE = 'roylyl-music-audio-v2';
  const COVER_CACHE = 'roylyl-music-covers-v1';
  const LYRIC_CACHE = 'roylyl-music-lyrics-v1';
  const audioCacheStatus = $('audio-cache-status'), coverCacheStatus = $('cover-cache-status'), lyricCacheStatus = $('lyric-cache-status');
  const legacyBudgets={268435456:256000000,536870912:512000000,1073741824:1000000000,2147483648:2000000000};
  const validBudgets=[-1,0,256000000,512000000,1000000000,2000000000,4000000000,8000000000];
  let sessionPreload=true,sessionBudget=-1;
  const audioBudget=()=>{try{const raw=localStorage.getItem('roylyl-music-audio-budget');const n=raw===null?-1:Number(raw),value=legacyBudgets[n]??n;return validBudgets.includes(value)?value:-1;}catch{return sessionBudget;}};
  const preloadAllowed=()=>{try{return localStorage.getItem('roylyl-music-preload')!=='false';}catch{return sessionPreload;}};
  $('audio-budget').value=String(audioBudget());$('preload-next').checked=preloadAllowed();
  const formatBytes=bytes=>bytes>=1e9?(bytes/1e9).toFixed(1)+'GB':bytes>0?(bytes/1e6).toFixed(1)+'MB':'0MB';
  function workerMessage(data,timeout=3000){const worker=navigator.serviceWorker?.controller;if(!worker)return Promise.resolve(null);return new Promise(resolve=>{const channel=new MessageChannel();const finish=value=>{clearTimeout(timer);channel.port1.close();resolve(value);};const timer=setTimeout(()=>finish(null),timeout);channel.port1.onmessage=e=>finish(e.data);try{worker.postMessage(data,[channel.port2]);}catch{finish(null);}});}
  function reportShellVersion(){navigator.serviceWorker?.controller?.postMessage({type:'SHELL_CLIENT',shell:SHELL_VERSION});}
  function sendAudioConfig(){return workerMessage({type:'AUDIO_CONFIG',budget:audioBudget(),preload:preloadAllowed(),current:current?audioSource(current):''});}
  $('audio-budget').onchange=async()=>{sessionBudget=Number($('audio-budget').value);try{localStorage.setItem('roylyl-music-audio-budget',String(sessionBudget));}catch{}if(!audioBudget())cancelPreload();await sendAudioConfig();updateCacheStatus();};
  $('preload-next').onchange=()=>{sessionPreload=$('preload-next').checked;try{localStorage.setItem('roylyl-music-preload',String(sessionPreload));}catch{}if(!preloadAllowed()){cancelPreload();releasePrepared();}sendAudioConfig();};
  let audioCacheGeneration = 0, coverCacheGeneration = 0, preloadController = null, localAudioUrl = null, persistenceRequested = false;
  async function updateCacheStatus() {
    if (!('caches' in window)) {
      audioCacheStatus.textContent = coverCacheStatus.textContent = lyricCacheStatus.textContent = '此浏览器不支持本地缓存。';
      $('clear-audio-cache').disabled = $('clear-cover-cache').disabled = $('clear-lyric-cache').disabled = true;
      return;
    }
    try {
      const [audioCache, coverCache] = await Promise.all([caches.open(AUDIO_CACHE), caches.open(COVER_CACHE)]);
      const [audioKeys, coverKeys] = await Promise.all([audioCache.keys(), coverCache.keys()]);
      const stats=await workerMessage({type:'AUDIO_STATS'});
      const fallbackBytes=stats?stats.bytes:(await Promise.all(audioKeys.map(key=>audioCache.match(key)))).reduce((sum,hit)=>sum+Number(hit?.headers.get('Content-Length')||0),0);
      audioCacheStatus.textContent = `已缓存${stats?.count??audioKeys.length}首 · ${formatBytes(fallbackBytes)}`;
      coverCacheStatus.textContent = `已缓存${coverKeys.length}张专辑封面`;
      const lyricKeys=await (await caches.open(LYRIC_CACHE)).keys();
      lyricCacheStatus.textContent = `已缓存${lyricKeys.length}份歌词`;
    } catch { audioCacheStatus.textContent = coverCacheStatus.textContent = lyricCacheStatus.textContent = '无法读取本地缓存。'; }
  }
  function cancelPreload(keep='') {
    preloadController?.abort();preloadController=null;
    navigator.serviceWorker?.controller?.postMessage({type:'CANCEL_PRELOAD',keep});
  }
  async function cacheAudio(source) {
    if(!navigator.serviceWorker?.controller || !audioBudget())return false;
    const generation=audioCacheGeneration,preload=source!==audioSource(current||{src:''});
    if(preload&&!preloadAllowed())return false;
    const result=await workerMessage({type:'CACHE_AUDIO',source,preload},120000);
    return generation===audioCacheGeneration && result?.ok===true;
  }
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('./audio-worker.js',{scope:'./'}).then(registration=>{
      if(registration.waiting)$('apply-update').hidden=false;
      registration.addEventListener('updatefound',()=>{registration.installing?.addEventListener('statechange',()=>{if(registration.waiting)$('apply-update').hidden=false;});});
      navigator.serviceWorker.ready.then(()=>{sendAudioConfig();reportShellVersion();});
    }).catch(()=>{});
    navigator.serviceWorker.addEventListener('controllerchange',()=>{sendAudioConfig();reportShellVersion();if(sessionStorage.getItem('roylyl-music-update')){sessionStorage.removeItem('roylyl-music-update');location.reload();}});
    navigator.serviceWorker.addEventListener('message',event=>{
      if(event.data?.type==='AUDIO_CACHED'){
        updateCacheStatus();refreshOpenCacheStatus();
        if(current && event.data.source===audioSource(current))preloadNext();
      }
      if(event.data?.type==='REPORT_SHELL')reportShellVersion();
      if(event.data?.type==='UPDATE_READY')$('apply-update').hidden=false;
    });
  }
  $('apply-update').onclick=async()=>{const registration=await navigator.serviceWorker.getRegistration('./');if(!registration?.waiting)return;sessionStorage.setItem('roylyl-music-update','1');registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});};
  if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)$('install-help').hidden=true;
  async function cachedAudioUrl(source) {
    if (!('caches' in window)) return null;
    try { const response = await (await caches.open(AUDIO_CACHE)).match(source); return response?.status===200 && !response.headers.has('Content-Range') ? URL.createObjectURL(await response.blob()) : null; }
    catch { return null; }
  }
  document.querySelectorAll('[data-open-settings]').forEach(button=>button.addEventListener('click',updateCacheStatus));
  for (const [buttonId,cacheName,statusElement,invalidate,done] of [
    ['clear-audio-cache',AUDIO_CACHE,audioCacheStatus,()=>{audioCacheGeneration++;cancelPreload();releasePrepared();},'音乐缓存已清理'],
    ['clear-cover-cache',COVER_CACHE,coverCacheStatus,()=>{coverCacheGeneration++;document.querySelectorAll('img[data-cover-bound]').forEach(img=>{img.src=coverSource(img.dataset.coverBound);delete img.dataset.coverBound;});for(const blob of coverUrls.values())URL.revokeObjectURL(blob);coverUrls.clear();coverRequests.clear();},'专辑封面缓存已清理'],
  ]) $(buttonId).onclick = async () => {
    invalidate();
    $(buttonId).disabled = true;
    statusElement.textContent = '正在清理…';
    try {
      if(cacheName===AUDIO_CACHE && navigator.serviceWorker?.controller){
        const result=await workerMessage({type:'CLEAR_AUDIO'},5000);
        if(result?.ok!==true)throw Error('清理失败');
      } else await caches.delete(cacheName);
      if(cacheName===AUDIO_CACHE)await caches.delete('roylyl-music-audio-v1');
      statusElement.textContent = done;if(cacheName===AUDIO_CACHE)refreshOpenCacheStatus();
    }
    catch { statusElement.textContent = '清理失败，请重试。'; }
    $(buttonId).disabled = false;
  };
  const shapes = {
    share:'<path d="M12 16V3m-4 4 4-4 4 4M8 10H5v11h14V10h-3"/>',
    remove:'<path d="M5 12h14"/>',
    clear:'<path d="M4 5h16M9 5V3h6v2M6 5l1 16h10l1-16M10 9v8m4-8v8"/>',
    timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3"/>',
    album:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    artist:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    play:'<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause:'<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    prev:'<path d="M5 5v14m14-14L8 12l11 7Z"/>',
    next:'<path d="M19 5v14M5 5l11 7-11 7Z"/>',
    shuffle:'<path d="M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 4-3 6-6s4-6 6-6h3m-4-4 4 4-4 4"/>',
    repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
    one:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3m8-9 2-1v8"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    more:'<circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/>',
    down:'<path d="m6 9 6 6 6-6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
    playNext:'<path d="M4 5h10M4 9h7M4 13h5M4 17h5M16 12v8m-4-4h8"/>',
    back:'<path d="m10 5-7 7 7 7M3 12h18"/>', arrow:'<path d="m9 5 7 7-7 7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
  const setIcon = (id,name) => { const node=$(id);if(node._iconName!==name){node.innerHTML=icon(name);node._iconName=name;} };
  function setMarkup(id,markup){const node=$(id);if(node._markup!==markup){node.innerHTML=markup;node._markup=markup;}}
  for(const [id,name] of Object.entries({play:'play',prev:'prev',next:'next',repeat:'repeat','now-like':'heart','queue-toggle':'list','mobile-queue-toggle':'list','full-more':'more','close-sleep-timer':'close','close-settings':'close','close-queue':'close','close-full':'down','full-play':'play','full-prev':'prev','full-next':'next','full-like':'heart','full-like-mobile':'heart','full-queue-toggle':'list','full-queue-close':'close'}))setIcon(id,name);
  for(const [id,name] of Object.entries({'share-track':'share','menu-album':'album','full-share-action':'share','open-sleep-timer':'timer','full-menu-album':'album','cancel-insertion':'remove','clear-insertions':'clear','full-clear-insertions':'clear'})){
    const button=$(id);button.innerHTML=icon(name)+'<span>'+button.textContent+'</span>';
  }
  $('feature-play').innerHTML=icon('play')+'播放专辑';
  $('feature-open').innerHTML='查看曲目'+icon('arrow');

  if ('ResizeObserver' in window) {
    new ResizeObserver(entries => {
      const height=Math.ceil(entries[0].target.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--player-height',height+'px');
    }).observe(document.querySelector('.player'));
    const fullTransportObserver=new ResizeObserver(()=>positionPlaybackFeedback());
    fullTransportObserver.observe(document.querySelector('.full-transport'));
    window.addEventListener('resize',positionPlaybackFeedback,{passive:true});
  }
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem('roy-music:' + key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem('roy-music:' + key, JSON.stringify(value)); } catch {} };
  let audioProperties = {};
  const favorites = new Set();
  let appleMusic=null, activePlaylist=null, appleError=false, artistContext=null;
  const preparedAudio=new Map();
  let prepareToken=0;
  function releasePrepared(){prepareToken++;for(const blob of preparedAudio.values())URL.revokeObjectURL(blob);preparedAudio.clear();}
  const failedAudioSources=new Set();
  let playbackBlocked=false, pausedPosition=null, pendingResumePosition=null, playbackRequestedAt=0, nextUp=[], insertionAnchor=null;
  let loadedTrackId=null, pendingTrackId=null, playbackHistory=[], historyCursor=-1, queueSignature='';
  let shuffleOrder=[],shuffleCursor=-1,historyAnchors=[],queueUndo=null,queueUndoTimer=null;
  const playbackRetries=RoylylPlaybackFeedback.createRetryController({isOnline:()=>true});
  let retryTicket=null,lastFailureToken=-1,retryWaiting=false;
  let tracks = [], albums = [], view = 'albums', selected = null, current = null, queue = [], repeat = 'all', playToken = 0, lastSaved = 0;
  let sleepDeadline=Number(read('sleep-deadline',0))||0,sleepTick=null;
  if(!Number.isFinite(sleepDeadline)||sleepDeadline<0)sleepDeadline=0;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const time = n => { n = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0; return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); };
  const url = path => ROOT + path.split('/').map(encodeURIComponent).join('/');
  const audioSource = track => url(track.src)+'?v='+encodeURIComponent(track.audioRevision||'initial');
  const textCollator = new Intl.Collator('zh-CN',{numeric:true});
  const compareText = (a,b) => textCollator.compare(String(a ?? ''),String(b ?? ''));
  function compareField(a,b,field,direction) {
    if (field === 'release') {
      const ay = Number(a.year)||0, by = Number(b.year)||0;
      if (!ay || !by) return !ay && !by ? 0 : !ay ? 1 : -1;
      return direction*(ay-by);
    }
    return direction*compareText(field === 'artist' ? a.artist : a.title,field === 'artist' ? b.artist : b.title);
  }
  function compareItems(a,b) {
    if($('sort-primary').value==='default')return 0;
    const direction=$('sort-direction').value==='desc'?-1:1;
    const primary=compareField(a,b,$('sort-primary').value,direction);
    if(primary)return primary;
    const secondary=$('sort-secondary').value;
    if(secondary!=='none')return compareField(a,b,secondary,direction);
    return 0;
  }
  function updateSortControls() {
    const primary=$('sort-primary').value,secondary=$('sort-secondary');
    const fixedView=view==='playlist'||view==='favorites';
    const defaultOption=$('sort-primary').querySelector('option[value="default"]');
    defaultOption.disabled=!fixedView;defaultOption.hidden=!fixedView;
    if(primary==='default'){$('sort-secondary').value='none';$('sort-direction').value='asc';}
    if(secondary.value===primary)secondary.value='none';
    for(const option of secondary.options)option.disabled=option.value===primary;
    $('sort-primary').disabled=!!selected;
    secondary.disabled=!!selected||primary==='default';
    $('sort-direction').disabled=!!selected||primary==='default';
  }
  let collectionSort={primary:'release',secondary:'none',direction:'asc'};
  const fixedSortView=()=>view==='playlist'||view==='favorites';
  function enterFixedSort() {
    if(!fixedSortView())collectionSort={primary:$('sort-primary').value,secondary:$('sort-secondary').value,direction:$('sort-direction').value};
    $('sort-primary').value='default';
  }
  function leaveFixedSort() {
    if(!fixedSortView())return;
    $('sort-primary').value=collectionSort.primary;
    $('sort-secondary').value=collectionSort.secondary;
    $('sort-direction').value=collectionSort.direction;
  }
  const normalize = s => String(s).normalize('NFKC').toLocaleLowerCase();
  const safePath = p => typeof p === 'string' && !p.startsWith('/') && !p.includes('\\') && !p.split('/').some(x => x === '..') && !/^[a-z]+:/i.test(p);
  const coverSource = path => new URL('./share-covers/' + path.replace(/\.[^/.]+$/, '.jpg').split('/').map(encodeURIComponent).join('/'), location.href).href;
  const picture = t => coverSource(t.cover);
  const coverUrls = new Map(), coverRequests = new Map();
  async function cachedCover(path) {
    if (coverUrls.has(path)) return coverUrls.get(path);
    if (coverRequests.has(path)) return coverRequests.get(path);
    const source = coverSource(path), generation = coverCacheGeneration;
    const request = (async () => {
      try {
        const cache = 'caches' in window ? await caches.open(COVER_CACHE) : null;
        let response = await cache?.match(source);
        if (!response) {
          response = await fetch(source);
          if (!response.ok) throw Error('Cover HTTP ' + response.status);
          if (cache && generation === coverCacheGeneration) {
            try {
              await cache.put(source,response.clone());
              if (generation !== coverCacheGeneration) await cache.delete(source);
            } catch {}
          }
        }
        const blob=await response.blob();
        if(generation!==coverCacheGeneration)return './placeholder.svg';
        const local = URL.createObjectURL(blob);
        coverUrls.set(path,local);
        document.querySelectorAll('img[data-cover-bound]').forEach(img => {
          if (img.dataset.coverBound === path && img.getAttribute('src') !== local) {
            coverObserver?.unobserve(img);observedCovers.delete(img);
            img.src = local;
          }
        });
        return local;
      } catch { return source; }
      finally { if(coverRequests.get(path)===request)coverRequests.delete(path); }
    })();
    coverRequests.set(path,request);
    return request;
  }
  const observedCovers=new Set();
  async function loadCoverInto(img,path) {
    observedCovers.delete(img);
    coverObserver?.unobserve(img);
    if(!img.isConnected)return;
    const source = await cachedCover(path);
    if (img.dataset.coverBound === path) img.src = source;
  }
  const coverObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const {target,isIntersecting} of entries) if (isIntersecting) loadCoverInto(target,target.dataset.coverBound);
  },{rootMargin:'300px'}) : null;
  function bindCover(img,path,eager=false) {
    if (!img || img.dataset.coverBound === path) return;
    img.dataset.coverBound = path;
    img.src = './placeholder.svg';
    if (coverUrls.has(path)) img.src = coverUrls.get(path);
    else if (eager || !coverObserver) loadCoverInto(img,path);
    else {observedCovers.add(img);coverObserver.observe(img);}
  }
  function hydrateCovers(root) {
    for(const img of observedCovers)if(!img.isConnected){coverObserver?.unobserve(img);observedCovers.delete(img);}
    root.querySelectorAll('img[data-cover-path]').forEach(img=>bindCover(img,img.dataset.coverPath));
  }
  let playerStatusText = '', statusNoticeTimer=null;
  const BUFFERING_STATUS = '正在缓冲...';
  function updateLoadingIndicator() {
    const loading = playerStatusText === BUFFERING_STATUS || !!pendingTrackId;
    for (const id of ['play','full-play']) {
      $(id).classList.toggle('is-loading', loading);
      $(id).setAttribute('aria-busy', String(loading));
    }
  }
  const status = text => {
    playerStatusText = text;
    updateLoadingIndicator();
    clearTimeout(statusNoticeTimer);
    placePlaybackFeedback();
    $('player-status').textContent = text && text!==BUFFERING_STATUS ? text : '';
    $('player-status').hidden=!text||text===BUFFERING_STATUS;
    if(text&&text!==BUFFERING_STATUS)statusNoticeTimer=setTimeout(()=>{$('player-status').hidden=true;},4000);
    $('player-status').classList.toggle('is-buffering', text === BUFFERING_STATUS);
    $('player-status').classList.toggle('is-message', !!text && text !== BUFFERING_STATUS);
    $('full-status').textContent = text && text!==BUFFERING_STATUS ? text : '';
    $('full-status').classList.toggle('is-buffering', text === BUFFERING_STATUS);
    $('full-status').classList.toggle('is-message', !!text && text !== BUFFERING_STATUS);
  };
  let lyricRequest = 0, lyricGeneration = 0, lyricController = null;
  let lyricTrackId = '', lyricKey = '', lyricState = 'idle', lyricGroups = [], lyricMetadata = [], lyricActiveIndex = -1, lyricLoadedAt = 0;
  const lyricWrites=new Set();
  let lyricManualUntil = 0, lyricFollowTimer = null;
  const lyricTtl = 24 * 60 * 60 * 1000, lyricMissingTtl = 60000;
  const lyricResource = track => {
    const path = track.src.replace(/\.[^./?]+(?:\?.*)?$/i,'.lrc');
    const revision = track.lyricRevision || 'unversioned';
    const address=url(path) + (track.lyricRevision ? '?lyricRevision=' + encodeURIComponent(revision) : '');
    return {key:address,url:address};
  };
  async function openLyricCache() {
    try { return 'caches' in window ? await caches.open(LYRIC_CACHE) : null; } catch { return null; }
  }
  async function cachedLyric(cache,address) {
    try { return await cache?.match(address); } catch { return null; }
  }
  function lyricCacheAge(response) {
    const stored=Number(response?.headers.get('X-Roylyl-Cached-At')||0);
    return stored>0 ? Math.max(0,Date.now()-stored) : Infinity;
  }
  async function storeLyric(cache,resource,body,responseStatus,controller,generation) {
    if(!cache || controller.signal.aborted || generation!==lyricGeneration)return;
    const write=(async()=>{
      try { await cache.put(resource.url,new Response(body,{status:responseStatus,headers:{'Content-Type':'text/plain; charset=utf-8','X-Roylyl-Cached-At':String(Date.now())}})); }
      catch { /* Storage restrictions and quota failures must not hide a fetched lyric. */ }
    })();
    lyricWrites.add(write);try{await write;}finally{lyricWrites.delete(write);}
  }
  function lyricMessage(message,retry=false) {
    $('full-lyrics').innerHTML = `<p class="lyrics-placeholder">${message}</p>${retry ? '<button type="button" class="secondary lyrics-retry">重试</button>' : ''}`;
    if(retry)$('full-lyrics').querySelector('button').onclick=()=>current&&loadLyrics(current,{force:true});
  }
  function renderLyrics() {
    if(!lyricGroups.length&&!lyricMetadata.length){lyricMessage('暂无歌词');return;}
    const box=$('full-lyrics');
    box.innerHTML=lyricMetadata.map(line=>`<p class="lyric-credit">${esc(line)}</p>`).join('')+lyricGroups.map((group,index)=>`<div class="lyric-group${index===lyricActiveIndex?' is-active':''}" data-group="${index}">${group.lines.map(line=>`<p class="lyric-line">${esc(line)}</p>`).join('')}</div>`).join('');
    if(!lyricGroups.some(g=>g.time!==null))box.insertAdjacentHTML('beforeend','<span class="lyrics-unsynced">无时间轴</span>');
    scrollActiveLyric(false);
  }
  function scrollActiveLyric(smooth=true){
    if(Date.now()<lyricManualUntil || lyricActiveIndex<0)return;
    const box=$('full-lyrics'),target=box.querySelector(`[data-group="${lyricActiveIndex}"]`);
    if(!target || !box.clientHeight)return;
    const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    box.scrollTo({top:box.scrollTop+target.getBoundingClientRect().top-box.getBoundingClientRect().top-box.clientHeight*.4,behavior:smooth&&!reduceMotion?'smooth':'instant'});
  }
  function pauseLyricFollow(){
    lyricManualUntil=Date.now()+8000;
    clearTimeout(lyricFollowTimer);
    lyricFollowTimer=setTimeout(()=>{lyricManualUntil=0;scrollActiveLyric(true);},8000);
  }
  for(const event of ['wheel','touchstart','touchmove','touchend','pointerdown'])$('full-lyrics').addEventListener(event,pauseLyricFollow,{passive:true});
  $('full-lyrics').addEventListener('keydown',event=>{if(/^(Arrow|Page|Home|End)/.test(event.key))pauseLyricFollow();});
  function updateLyricPosition(force=false) {
    if(!lyricGroups.some(group=>group.time!==null))return;
    const active=RoylylLyrics.currentLyricGroup(lyricGroups,audio.currentTime);
    if(active===lyricActiveIndex&&!force)return;
    $('full-lyrics').querySelector('.lyric-group.is-active')?.classList.remove('is-active');
    lyricActiveIndex=active;
    $('full-lyrics').querySelector(`[data-group="${active}"]`)?.classList.add('is-active');
    scrollActiveLyric(!force);
  }
  audio.addEventListener('seeked',()=>updateLyricPosition(true));
  async function loadLyrics(track,{force=false}={}) {
    if(!track?.src)return;
    const resource=lyricResource(track);
    const stateTtl=lyricState==='not-found'?lyricMissingTtl:lyricTtl;
    if(!force && lyricKey===resource.key && (lyricState==='loading'||((lyricState==='ready'||lyricState==='not-found')&&Date.now()-lyricLoadedAt<stateTtl)))return;
    lyricController?.abort();lyricPreloadController?.abort();
    if(force)lyricGeneration++;
    const controller=new AbortController(),request=++lyricRequest,generation=lyricGeneration;
    if(lyricTrackId!==track.id){
      clearTimeout(lyricFollowTimer);lyricManualUntil=0;$('full-lyrics').scrollTo({top:0,behavior:'instant'});
    }
    lyricController=controller;lyricTrackId=track.id;lyricKey=resource.key;lyricState='loading';lyricGroups=[];lyricMetadata=[];lyricActiveIndex=-1;
    lyricMessage('正在加载歌词…');
    const timer=setTimeout(()=>controller.abort('timeout'),10000);
    try{
      // Settle already-started prefetch writes so they cannot overwrite fresher text.
      await Promise.allSettled([...lyricWrites]);
      const cache=await openLyricCache();
      const cached=force?null:await cachedLyric(cache,resource.url);
      const age=lyricCacheAge(cached),cacheTtl=cached?.status===404?lyricMissingTtl:lyricTtl;
      let response,responseText,fromCache=false;
      if(cached && age<cacheTtl){response=cached;fromCache=true;}
      else {
        try{
          response=await fetch(resource.url,{signal:controller.signal,cache:force?'reload':'no-cache'});
          if(response.status>=500)throw Error('HTTP '+response.status);
          if(response.ok)responseText=await response.text();
          if(controller.signal.aborted)throw Error('aborted');
        }catch(error){
          if(controller.signal.aborted&&controller.signal.reason!=='timeout')throw error;
          if(cached?.ok){response=cached;fromCache=true;}else throw error;
        }
      }
      if(controller.signal.aborted&&!(fromCache&&controller.signal.reason==='timeout')){if(controller.signal.reason==='timeout')throw Error('timeout');return;}
      if(request!==lyricRequest||generation!==lyricGeneration||current?.id!==track.id)return;
      if(response.status===404){
        lyricState='not-found';lyricLoadedAt=fromCache?Date.now()-age:Date.now();lyricMessage('暂无歌词');
        if(!fromCache)await storeLyric(cache,resource,'',404,controller,generation);
        return;
      }
      if(!response.ok)throw Error('HTTP '+response.status);
      const text=fromCache?await response.text():responseText;
      if(controller.signal.aborted&&!(fromCache&&controller.signal.reason==='timeout')){if(controller.signal.reason==='timeout')throw Error('timeout');return;}
      if(request!==lyricRequest||generation!==lyricGeneration||current?.id!==track.id)return;
      if(/^\s*(?:<!doctype\s+html|<html[\s>])/i.test(text))throw Error('Expected LRC, received HTML');
      const parsed=RoylylLyrics.parseLrc(text,track.title,track.artist);
      lyricGroups=parsed.groups;lyricMetadata=parsed.metadata;
      lyricLoadedAt=fromCache?Date.now()-age:Date.now();
      lyricState=parsed.diagnostic==='empty'?'not-found':'ready';
      if(lyricState==='ready'){renderLyrics();updateLyricPosition(true);}else lyricMessage('暂无歌词');
      if(!fromCache)await storeLyric(cache,resource,text,parsed.diagnostic==='empty'?404:200,controller,generation);
    }catch(error){
      if(controller.signal.aborted && controller.signal.reason!=='timeout')return;
      if(request===lyricRequest&&generation===lyricGeneration&&current?.id===track.id){lyricState='error';lyricMessage('歌词加载失败',true);}
    }finally{clearTimeout(timer);if(lyricController===controller)lyricController=null;}
  }
  $('clear-lyric-cache').onclick=async()=>{
    lyricGeneration++;lyricPreloadController?.abort();lyricRequest++;lyricController?.abort();lyricController=null;lyricKey='';lyricState='idle';lyricGroups=[];lyricMetadata=[];lyricActiveIndex=-1;
    $('clear-lyric-cache').disabled=true;$('lyric-cache-status').textContent='正在清理…';
    try{await Promise.allSettled([...lyricWrites]);if('caches' in window)await caches.delete(LYRIC_CACHE);$('lyric-cache-status').textContent='歌词缓存已清理';}
    catch{$('lyric-cache-status').textContent='清理失败，请重试。';}
    $('clear-lyric-cache').disabled=false;
    if(current)loadLyrics(current,{force:true});
  };
  let lyricPreloadController = null;
  async function preloadNextLyrics(track) {
    lyricPreloadController?.abort();
    lyricPreloadController = null;
    if(current?.id !== track.id || !('caches' in window))return;
    const next=nextPreloadTrack();
    if(!next?.src || next.id===track.id)return;
    const controller=new AbortController(),generation=lyricGeneration,resource=lyricResource(next);
    lyricPreloadController=controller;
    const timer=setTimeout(()=>controller.abort(),10000);
    try {
      const cache=await openLyricCache();
      if(!cache)return;
      const hit=await cachedLyric(cache,resource.url);
      if(hit && lyricCacheAge(hit)<(hit.status===404?lyricMissingTtl:lyricTtl))return;
      const response=await fetch(resource.url,{signal:controller.signal,cache:'no-cache'});
      if(response.status===404){await storeLyric(cache,resource,'',404,controller,generation);return;}
      if(!response.ok)return;
      const text=await response.text();
      if(/^\s*(?:<!doctype\s+html|<html[\s>])/i.test(text))return;
      const parsed=RoylylLyrics.parseLrc(text,next.title,next.artist);
      await storeLyric(cache,resource,text,parsed.diagnostic==='empty'?404:200,controller,generation);
    }catch { /* Optional prefetch never changes current playback or lyric state. */ }
    finally {clearTimeout(timer);if(lyricPreloadController===controller)lyricPreloadController=null;}
  }
  const artistNames = value => String(value || '').split(/\s+(?:&|／|\/)\s+|[、;；]/).filter(Boolean);
  const matchesArtist = (track, artist) => !artist || track.albumArtist === artist || artistNames(track.artist).includes(artist);
  const hasViewFilters=()=>!!($('search').value.trim() || $('artist').value && $('artist').value!==artistContext);
  function filtered() {
    const q = normalize($('search').value.trim()), artist = $('artist').value;
    return tracks.filter(t => matchesArtist(t, artist) && (!q || normalize(t.title + ' ' + t.artist + ' ' + (t.albumArtist || '') + ' ' + t.album).includes(q)) && (view !== 'favorites' || favorites.has(t.id)));
  }
  const trackIndex=new Map();
  const get = id => trackIndex.get(id);
  const moreMenu = $('track-more-menu');
  let moreButton = null, moreTrackId = null;
  function closeTrackMenu(restoreFocus=false) {
    moreMenu.hidden = true;
    if (moreButton?.isConnected) {
      moreButton.setAttribute('aria-expanded','false');
      if (restoreFocus) moreButton.focus({preventScroll:true});
    }
    moreButton = null;
    moreTrackId = null;
  }
  function artistMenu(track,container) {
    const names=track?artistNames(track.artist):[];
    container.innerHTML=names.length===1?`<button type="button" role="menuitem" data-artist-link="${esc(names[0])}">${icon('artist')}<span>查看歌手</span></button>`:names.length?`<button type="button" role="menuitem" data-view-artists aria-expanded="false">${icon('artist')}<span>查看歌手</span></button><div class="artist-choices" role="group" aria-label="选择歌手" hidden>${names.map(name=>`<button type="button" role="menuitem" data-artist-link="${esc(name)}">${icon('artist')}<span>${esc(name)}</span></button>`).join('')}</div>`:'';
  }
  async function showTrackCacheStatus(track,id) {
    const node=$(id),source=track?audioSource(track):'';node.dataset.source=source;
    node.textContent='正在检查离线缓存…';
    let text='无法读取离线缓存';
    try {
      const response=source&&'caches' in window?await (await caches.open(AUDIO_CACHE)).match(source):null;
      const complete=response?.status===200&&!response.headers.has('Content-Range')&&Number(response.headers.get('Content-Length'))>0&&!failedAudioSources.has(source);
      text=complete?'已完整缓存 · 可离线播放':'未完整缓存';
    } catch {}
    if(node.dataset.source===source)node.textContent=text;
  }
  function refreshOpenCacheStatus() {
    if(!moreMenu.hidden)showTrackCacheStatus(get(moreTrackId),'menu-cache-status');
    if(!$('full-more-menu').hidden)showTrackCacheStatus(current,'full-cache-status');
  }
  function positionTrackMenu() {
    if(!moreButton)return;
    const rect=moreButton.getBoundingClientRect();
    moreMenu.style.left=`${Math.max(12,Math.min(rect.right-moreMenu.offsetWidth,innerWidth-moreMenu.offsetWidth-12))}px`;
    const menuHeight=moreMenu.offsetHeight;
    moreMenu.style.top=`${rect.bottom+menuHeight+8>innerHeight?Math.max(12,rect.top-menuHeight-8):rect.bottom+8}px`;
  }
  function openTrackMenu(button) {
    if (moreButton === button && !moreMenu.hidden) { closeTrackMenu(true); return; }
    closeTrackMenu();
    moreButton = button;
    moreTrackId = button.dataset.more;
    button.setAttribute('aria-expanded','true');
    (button.closest('#full-player') || document.body).append(moreMenu);
    moreMenu.hidden = false;
    const track=get(moreTrackId);$('menu-album').dataset.trackAlbum=moreTrackId;
    $('menu-album').disabled=!track?.albumKey;
    artistMenu(track,$('menu-artists'));
    $('cancel-insertion').hidden=button.closest('.track-row')?.dataset.queueInserted!=='true';
    $('cancel-insertion').dataset.cancelInsertion=moreTrackId;
    $('clear-insertions').hidden=!nextUp.length;
    showTrackCacheStatus(track,'menu-cache-status');positionTrackMenu();
    $('share-track').focus({preventScroll:true});
  }
  async function shareTrack(t,notify=message=>status(message)) {
    if (!t) return;
    const link = `https://roylyl.github.io/music/share/${encodeURIComponent(t.id)}.html`;
    const data = {title:`${t.title} - ${t.artist}`,text:'来自Roylyl的私人音乐仓库。',url:link};
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(link); notify('分享链接已复制'); }
    catch { window.prompt('复制歌曲分享链接',link); }
  }
  const FAVORITE_NOTICE='你不能点击，这个按钮仅限Roylyl操作';
  let favoriteNoticeTimer=null;
  const isFavorite = id => !!id && favorites.has(id);
  function syncFavoriteButtons() {
    for (const button of document.querySelectorAll('#now-like,#full-like,#full-like-mobile')) {
      const id = button.dataset.like || current?.id;
      const liked = isFavorite(id);
      button.setAttribute('aria-pressed', String(liked));
      button.setAttribute('aria-label', `${liked ? '已喜欢' : '未喜欢'}${button.dataset.like ? '：' + (get(id)?.title || '') : ''}`);
    }
  }
  const canPlay = t => !!t?.src;
  function playlistTracks(ids) {
    return ids.map(id=>{const e=appleMusic.entries[id],t=get(e.trackId);return {...(t||{}),id:t?.id||'apple:'+id,appleId:id,title:e.title,artist:e.artist,album:e.album,year:t?.year||e.year||0,duration:t?.duration||e.duration,src:t?.src||'',sourceStatus:e.sourceStatus,sourceUrl:e.sourceUrl};});
  }
  function playlistRows(list, offset=0) {
    return list.map((t,i)=>canPlay(t)?trackRows([t],false,i+offset):`<div class="track-row unavailable"><span class="track-no">${String(i+1+offset).padStart(2,'0')}</span><div class="track-start">${trackCover(t)}<span class="track-copy"><strong>${esc(t.title)}</strong><small>${artistLinks(t.artist)}</small></span></div><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><span class="source-label" title="音源尚未入库">${t.sourceUrl?`<a href="${esc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t.sourceStatus==='purchasable'?'待购入':'外部收听'} ↗</a>`:'待补音源'}</span></div>`).join('');
  }
  const navigationKey='roylyl-music-navigation';
  let navigationDepth=history.state?.[navigationKey]?.depth||0, navigationReady=false;
  let fullPageScroll=null, fullNavigationClosing=false, afterFullClose=null;
  function navigationSnapshot(){const fullOpen=isFullOpen();return {view,album:selected?.key||null,playlist:activePlaylist?.id||null,query:$('search').value,artist:$('artist').value,artistContext,sort:['sort-primary','sort-secondary','sort-direction'].map(id=>$(id).value),collectionSort,scroll:fullOpen?fullPageScroll??scrollY:scrollY,depth:navigationDepth,full:fullOpen};}
  function rememberNavigation(){
    if(!navigationReady||fullNavigationClosing)return;
    const snapshot=navigationSnapshot();
    if(snapshot.full&&!history.state?.[navigationKey]?.full){
      history.replaceState({...history.state,[navigationKey]:{...snapshot,full:false}},'');
      history.pushState({...history.state,[navigationKey]:snapshot},'');
    }else history.replaceState({...history.state,[navigationKey]:snapshot},'');
  }
  function beginNavigation(){rememberNavigation();}
  function finishNavigation(){navigationDepth++;history.pushState({[navigationKey]:navigationSnapshot()},'');if(selected || view==='albums'&&artistContext)$('back-albums').innerHTML=icon('back')+'返回上一页';}
  function restoreNavigation(state,afterRestore){
    if(!state)return;
    view=state.view||'albums';selected=albums.find(a=>a.key===state.album)||null;activePlaylist=appleMusic?.playlists.find(p=>p.id===state.playlist)||null;
    if(view==='playlist'&&!activePlaylist)view='albums';
    artistContext=state.artistContext||null;
    $('search').value=state.query||'';$('artist').value=state.artist||'';collectionSort=state.collectionSort||collectionSort;
    ['sort-primary','sort-secondary','sort-direction'].forEach((id,i)=>{if(state.sort?.[i])$(id).value=state.sort[i];});
    navigationDepth=state.depth||0;render();
    if(state.full)openFull(true);else hideFull();
    requestAnimationFrame(()=>{window.scrollTo({top:state.scroll||0,behavior:'instant'});if(afterRestore)afterRestore();});
  }
  let scrollSaveTimer;window.addEventListener('scroll',()=>{clearTimeout(scrollSaveTimer);scrollSaveTimer=setTimeout(rememberNavigation,150);},{passive:true});
  window.addEventListener('popstate',event=>{if(navigationReady){const afterRestore=afterFullClose;afterFullClose=null;fullNavigationClosing=false;restoreNavigation(event.state?.[navigationKey],afterRestore);}});
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  function openArtist(name){
    if(view==='albums'&&!selected&&artistContext===name)return;
    beginNavigation();leaveFixedSort();view='albums';selected=null;activePlaylist=null;
    artistContext=name;$('search').value='';$('artist').value=name;render();finishNavigation();
    $('back-albums').scrollIntoView({block:'start',behavior:'smooth'});$('back-albums').focus({preventScroll:true});
  }
  function showPlaylist(id) {
    if(view==='playlist'&&activePlaylist?.id===id&&!$('search').value&&!$('artist').value)return;
    beginNavigation();activePlaylist=appleMusic?.playlists.find(p=>p.id===id)||null; if(!activePlaylist)return;
    enterFixedSort();
    view='playlist';selected=null;artistContext=null;$('search').value='';$('artist').value='';render();finishNavigation();
  }
  function artistLinks(value, alwaysClickable = false) {
    if(!alwaysClickable && matchMedia('(max-width:700px)').matches)return artistNames(value).map(esc).join(' &amp; ');
    return artistNames(value).map(name=>`<button type="button" class="text-link artist-link" data-artist-link="${esc(name)}">${esc(name)}</button>`).join('<span aria-hidden="true"> &amp; </span>');
  }
  function albumLink(t, extraClass='') {
    if(matchMedia('(max-width:700px)').matches && !extraClass)return `<span>${esc(t.album)}</span>`;
    return `<button type="button" class="text-link ${extraClass}" data-track-album="${esc(t.id)}" title="打开专辑：${esc(t.album)}">${esc(t.album)}</button>`;
  }
  function trackCover(t) {
    return `<img class="track-cover" src="./placeholder.svg"${t.cover ? ` data-cover-path="${esc(t.cover)}"` : ''} alt="" width="44" height="44" loading="lazy">`;
  }
  function trackRows(list, inQueue = false, offset = 0) {
    return list.map((t, i) => {const repeated=inQueue&&!t._queueCurrent,isPlaying=current?.id===t.id&&!audio.paused&&!pendingTrackId&&!repeated;return `<div class="track-row${isPlaying ? ' current' : ''}" data-track="${esc(t.id)}"${repeated?' data-queued-repeat="true"':''}${t._queueInserted?' data-queue-inserted="true"':''}><button class="track-no" data-number="${String(i + 1 + offset).padStart(2, '0')}" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${isPlaying ? '♫' : String(i + 1 + offset).padStart(2, '0')}</button><div class="track-start"><button class="track-art-play" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${trackCover(t)}</button><div class="track-copy"><button class="track-title-play" data-play="${esc(t.id)}"><strong>${esc(t.title)}</strong></button><small>${artistLinks(t.artist)}${inQueue ? ' · ' + albumLink(t) : ''}<span class="track-inline-time"> · ${time(t.duration)}</span></small></div></div>${albumLink(t,'track-album')}<span class="track-time">${time(t.duration)}</span><button class="icon track-next" type="button" data-next="${esc(t.id)}" title="下一首播放" aria-label="下一首播放：${esc(t.title)}">${icon('playNext')}</button><button class="icon favorite-locked" title="${FAVORITE_NOTICE}" data-like="${esc(t.id)}" aria-label="Apple Music${isFavorite(t.id) ? '已喜欢' : '未喜欢'}：${esc(t.title)}" aria-pressed="${isFavorite(t.id)}">${icon('heart')}</button><button class="icon track-more" type="button" data-more="${esc(t.id)}" aria-label="${esc(t.title)}的更多选项" aria-haspopup="menu" aria-expanded="false">${icon('more')}</button></div>`;}).join('');
  }
  let songChunksObserver=null;
  // Keep the complete playback list in _tracks; create only nearby visual rows.
  function renderSongList(rows, playlist=false) {
    const root=$('songs'), chunkSize=16;
    songChunksObserver?.disconnect();
    root._tracks=playlist?rows.filter(canPlay):rows;
    const markup=(items,offset)=>playlist?playlistRows(items,offset):trackRows(items,false,offset);
    if(!('IntersectionObserver' in window)||rows.length<=chunkSize){
      root.innerHTML=markup(rows,0);hydrateCovers(root);return;
    }
    root.replaceChildren();
    const chunks=[];
    const mount=chunk=>{
      if(chunk._mounted||chunk.parentElement!==root)return;
      chunk._mounted=true;
      chunk.innerHTML=markup(rows.slice(chunk._offset,chunk._offset+chunkSize),chunk._offset);
      chunk.style.minHeight='';
      songChunksObserver?.unobserve(chunk);
      hydrateCovers(chunk);
    };
    const observer=new IntersectionObserver(entries=>{
      if(songChunksObserver!==observer)return;
      for(const entry of entries)if(entry.isIntersecting)mount(entry.target);
    },{rootMargin:'600px 0px'});
    songChunksObserver=observer;
    for(let offset=0;offset<rows.length;offset+=chunkSize){
      const chunk=document.createElement('div');chunk.className='song-chunk';chunk._offset=offset;
      root.append(chunk);chunks.push(chunk);
    }
    mount(chunks[0]);
    // Measure the current responsive row once so placeholders preserve scroll position.
    const rowHeight=chunks[0].firstElementChild.getBoundingClientRect().height;
    for(const chunk of chunks.slice(1)){
      chunk.style.minHeight=Math.min(chunkSize,rows.length-chunk._offset)*rowHeight+'px';
      songChunksObserver.observe(chunk);
    }
    // Keyboard users can continue into the next chunk without needing to scroll first.
    root._songFocusHandler=event=>{
      const chunk=event.target.closest('.song-chunk');
      if(chunk?.nextElementSibling)mount(chunk.nextElementSibling);
    };
    root.addEventListener('focusin',root._songFocusHandler);
  }
  function render() {
    closeTrackMenu();
    songChunksObserver?.disconnect();songChunksObserver=null;
    if($('songs')._songFocusHandler)$('songs').removeEventListener('focusin',$('songs')._songFocusHandler);
    $('songs')._songFocusHandler=null;
    if(view==='albums'&&!selected)$('songs').replaceChildren();
    document.body.classList.toggle('album-detail-open',view==='albums' && !!selected);
    const list = filtered();
    $('songs')._tracks=null;
    const showCollectionIntro = view === 'albums' && !selected && !$('artist').value;
    $('intro').hidden = !showCollectionIntro;
    $('feature').hidden = !showCollectionIntro || !albums.length;
    $('fav-count').textContent = appleMusic?appleMusic.favorites.length:'—';
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === view); b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'); });
    const fixedView=view==='playlist'||view==='favorites';
    $('back-albums').hidden=!(selected || view==='albums'&&artistContext) || fixedView;
    $('reset-view-filters').hidden=false;
    $('reset-view-filters').disabled=!hasViewFilters();
    $('artist').disabled=!!artistContext;
    $('reset-view-filters').title=$('reset-view-filters').disabled?'当前没有搜索或筛选条件':'清空搜索与筛选';
    $('back-albums').innerHTML=icon('back')+(navigationDepth>0?'返回上一页':'返回专辑收藏');
    document.querySelector('.filters').hidden=!!selected;
    const emptyTitle=$('empty').querySelector('h3'),emptyText=$('empty').querySelector('p');
    emptyTitle.textContent=$('search').value.trim()?'没有找到匹配的歌曲':$('artist').value?'这位歌手暂无匹配曲目':'这里还很安静';
    emptyText.textContent=hasViewFilters()?'可以清空搜索和筛选，重新查看。':artistContext||selected?'可以返回上一页，继续浏览其他歌手或专辑。':'选择其他歌单或专辑继续浏览。';
    $('clear-filters').hidden=!hasViewFilters();
    document.querySelectorAll('[data-playlist]').forEach(b=>{const active=view==='playlist'&&b.dataset.playlist===activePlaylist?.id;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false');});
    updateSortControls();
    $('playlist-detail').hidden=!fixedView;
    if(fixedView) {
      $('albums').hidden=true;$('songs').hidden=false;$('album-detail').hidden=true;
      $('view-title').textContent=view==='favorites'?'我喜欢':activePlaylist.name;
      if(!appleMusic){$('playlist-detail').textContent=appleError?'Apple Music歌单加载失败，请刷新页面重试。':'正在读取Apple Music歌单…';$('songs').innerHTML='';$('songs')._tracks=[];$('result-count').textContent='';$('empty').hidden=true;renderCurrent();return;}
      const ids=view==='favorites'?appleMusic.favorites:activePlaylist.entries;
      const all=playlistTracks(ids),q=normalize($('search').value.trim()),ar=$('artist').value;
      const ordered=$('sort-primary').value==='default'?all:[...all].sort(compareItems);
      const rows=ordered.filter(t=>matchesArtist(t,ar)&&(!q||normalize(t.title+' '+t.artist+' '+t.album).includes(q)));
      const playable=rows.filter(canPlay);
      $('playlist-detail').innerHTML=`<p>歌单来自Apple Music与本地曲库 · ${all.length}首</p><div class="playlist-play-actions"><button id="play-playlist" class="primary" ${playable.length?'':'disabled'}>${icon('play')}顺序播放</button><button id="shuffle-playlist" class="secondary" ${playable.length?'':'disabled'}>${icon('shuffle')}随机播放</button></div><small>更新于${esc(new Date(appleMusic.updatedAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}))}</small>`;
      $('play-playlist').onclick=()=>playAlbum({tracks:playable});
      $('shuffle-playlist').onclick=()=>playAlbum({tracks:playable},true);
      renderSongList(rows,true);$('result-count').textContent=rows.length+'首歌曲';$('empty').hidden=rows.length>0;renderCurrent();return;
    }
    $('view-title').textContent = selected ? selected.title : view==='albums' && artistContext ? artistContext : ({albums:'专辑收藏',songs:'全部歌曲',favorites:'我的喜欢'})[view];
    $('albums').hidden = view !== 'albums' || !!selected;
    $('songs').hidden = view === 'albums' && !selected;
    $('album-detail').hidden = !selected;
    if (selected) {
      $('album-detail').innerHTML = `<div class="detail-heading"><img src="./placeholder.svg" data-cover-path="${esc(selected.tracks[0].cover)}" alt="${esc(selected.title)}封面"><div class="detail-copy"><p class="eyebrow">专辑</p><h2>${esc(selected.title)}</h2><p class="detail-meta">${artistLinks(selected.artist,true)}${selected.year ? ' · ' + selected.year : ''} · ${selected.tracks.length}首</p><button class="primary" id="play-selected">${icon('play')}播放专辑</button></div></div>`;
      hydrateCovers($('album-detail'));
      const visibleTracks=selected.tracks.filter(t=>list.some(item=>item.id===t.id));
      $('play-selected').disabled=!visibleTracks.length;
      $('play-selected').onclick = () => playAlbum({tracks:visibleTracks});
    }
    let shown;
    if (view === 'albums' && !selected) {
      const allowed = new Set(list.map(t => t.id));
      const visible = albums.filter(a => a.tracks.some(t => allowed.has(t.id)));
      visible.sort(compareItems);
      setMarkup('albums',visible.map(a => `<article class="album-card"><div class="art"><button class="album-cover-open" data-album="${esc(a.key)}" aria-label="查看${esc(a.title)}，${a.tracks.length}首"><img src="./placeholder.svg" data-cover-path="${esc(a.tracks[0].cover)}" alt="${esc(a.title)}封面" loading="lazy" width="240" height="240"></button><button class="open-album" data-album-play="${esc(a.key)}" aria-label="顺序播放${esc(a.title)}">${icon('play')}</button></div><h3><button class="album-title-open" data-album="${esc(a.key)}">${esc(a.title)}</button></h3><p><span class="year">${a.year || '年份待核'}</span>${artistLinks(a.artist,true)}</p><p>${a.tracks.length}首 · ${a.key.startsWith('live/') ? '现场录音' : a.key.startsWith('collections/') ? '精选合集' : '专辑 / 单曲'}</p></article>`).join(''));
      hydrateCovers($('albums'));
      $('result-count').textContent = visible.length + '张专辑'; shown = visible.length;
    } else {
      const matchingIds=new Set(list.map(t=>t.id));
      const rows = selected ? selected.tracks.filter(t=>matchingIds.has(t.id)) : [...list].sort(compareItems);
      renderSongList(rows);
      $('result-count').textContent = rows.length + '首歌曲'; shown = rows.length;
    }
    $('empty').hidden = shown > 0; renderCurrent();
  }
  function playAlbum(album,shuffle=false) {
    if(!album?.tracks.length)return;
    repeat=shuffle?'shuffle':'all';updateModeControls();
    const first=album.tracks[shuffle?Math.floor(Math.random()*album.tracks.length):0];
    playbackHistory=[];historyAnchors=[];historyCursor=-1;
    if(current?.id===first.id){pendingResumePosition={id:current.id,time:0};pausedPosition=null;if(audio.readyState>0)audio.currentTime=0;}
    play(first,[...album.tracks]);
  }
  function openAlbum(album) {
    if(!album || selected?.key===album.key)return;beginNavigation();leaveFixedSort();view='albums'; artistContext=null;selected=album; $('search').value=''; $('artist').value=''; render();finishNavigation();
    $('back-albums').scrollIntoView({block:'start',behavior:'smooth'});
    $('back-albums').focus({preventScroll:true});
  }
  function renderCurrent() {
    syncPlaybackState();
    updateFull();
    $('play').disabled=!current&&!($('songs')._tracks ?? filtered()).some(canPlay);
    const control=playbackControl();
    setIcon('play',control.icon); $('play').setAttribute('aria-label',control.label);
    updateLoadingIndicator();
    for(const id of ['now-like','full-like','full-like-mobile']){const button=$(id);button.disabled=false;button.title=FAVORITE_NOTICE;button.classList.add('favorite-locked');}
    syncFavoriteButtons();
    document.querySelectorAll('.track-row').forEach(el => el.classList.toggle('current', el.dataset.track === current?.id && el.dataset.queuedRepeat!=='true' && !audio.paused && !pendingTrackId));
    if (!$('queue-panel').hidden || !$('full-queue').hidden) renderQueue();
    document.querySelectorAll('.track-row[data-track] .track-no').forEach(button=>{const row=button.closest('.track-row');button.textContent=row.dataset.track===current?.id&&row.dataset.queuedRepeat!=='true'&&!audio.paused&&!pendingTrackId?'♫':button.dataset.number||button.textContent;});
  }
  function updateQueueMarkers() {
    const pending=new Set(nextUp);
    for(const id of ['queue-list','full-queue-list'])$(id).querySelectorAll('.track-row[data-track]').forEach(row=>{
      const isCurrent=row.dataset.track===current?.id&&row.dataset.queuedRepeat!=='true';
      const inserted=row.dataset.queueInserted==='true';
      row.classList.toggle('queue-current',isCurrent);row.classList.toggle('queue-inserted',inserted);
      if(isCurrent)row.setAttribute('aria-current','true');else row.removeAttribute('aria-current');
      let badge=row.querySelector('.queue-tag');
      if(isCurrent||inserted){
        if(!badge){badge=document.createElement('span');badge.className='queue-tag';const title=row.querySelector('.track-title-play');
          let heading=title.parentElement.querySelector('.queue-title-line');
          if(!heading){heading=document.createElement('div');heading.className='queue-title-line';title.before(heading);heading.append(title);}
          heading.append(badge);}
        badge.textContent=isCurrent?'当前曲目':'插队待播';
      }else badge?.remove();
    });
  }
  function renderQueueWindow(list,force=false) {
    const items=list._queueItems||[],start=Math.min(Math.max(0,items.length-1),Math.max(0,Math.floor(list.scrollTop/72)-4));
    const end=Math.min(items.length,start+Math.ceil(list.clientHeight/72)+9);
    if(!force&&list._queueStart===start&&list._queueEnd===end)return;
    list._queueStart=start;list._queueEnd=end;
    list.querySelectorAll('img[data-cover-path]').forEach(img=>coverObserver?.unobserve(img));
    list.innerHTML=items.length?`<div aria-hidden="true" style="height:${start*72}px"></div>`+trackRows(items.slice(start,end),true,start)+`<div aria-hidden="true" style="height:${(items.length-end)*72}px"></div>`:'<p class="muted">播放一首歌曲后，队列会显示在这里。</p>';
    hydrateCovers(list);updateQueueMarkers();
  }
  function renderQueue() {
    const targets=['queue-list','full-queue-list'].map($).filter(list=>!list.parentElement.hidden);
    if(!targets.length)return;
    const displayed=displayQueue(),signature=displayed.map(t=>t.id+':'+!!t._queueCurrent+':'+!!t._queueInserted).join('\n');
    for(const list of targets){
      if(list._queueSignature!==signature||queueSignature===''){
        list._queueItems=displayed;list._queueSignature=signature;renderQueueWindow(list,true);
      }else updateQueueMarkers();
    }
    queueSignature=signature;
  }
  function positionQueue(id) {
    const list=$(id),index=(list._queueItems||[]).findIndex(t=>t._queueCurrent);
    list.scrollTop=Math.max(0,index*72-8);renderQueueWindow(list);
  }
  for(const id of ['queue-list','full-queue-list'])$(id).addEventListener('scroll',()=>{
    const list=$(id);if(list._queueFrame)return;
    list._queueFrame=requestAnimationFrame(()=>{list._queueFrame=null;renderQueueWindow(list);});
  },{passive:true});
  window.addEventListener('resize',()=>{for(const id of ['queue-list','full-queue-list']){const list=$(id);if(!list.parentElement.hidden)renderQueueWindow(list);}});
  function like() {
    clearTimeout(favoriteNoticeTimer);
    placePlaybackFeedback();
    const notice=$('favorite-notice');notice.textContent=FAVORITE_NOTICE;notice.hidden=false;
    favoriteNoticeTimer=setTimeout(()=>{notice.hidden=true;favoriteNoticeTimer=null;},2500);
  }
  function setCurrent(t) {
    current = t; bindCover($('now-cover'),t.cover,true); $('now-title').textContent = t.title; $('now-artist').textContent = t.artist + ' · ' + t.album;
    sendAudioConfig();
    const position=savedPlaybackPosition();
    $('duration').textContent = time(t.duration); $('elapsed').textContent = time(position); $('seek').value = t.duration>0?position/t.duration*100:0; $('seek').disabled = true;paintSeekProgress();
    if ('mediaSession' in navigator && 'MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({title:t.title,artist:t.artist,album:t.album,artwork:[{src:picture(t)}]});
    try { navigator.mediaSession?.setPositionState?.(); } catch {}
    registerMediaActions();
    renderCurrent();
  }
  function preloadNext() {
    if(!preloadAllowed()||!audioBudget()||!current || pendingTrackId || audio.paused)return;
    const next=nextPreloadTrack();
    if(next && next.id!==current.id){
      const source=audioSource(next),owner=current.id;
      if(preparedAudio.has(source))return;
      const token=++prepareToken,generation=audioCacheGeneration;
      cacheAudio(source).then(async ready=>{
        if(!ready||token!==prepareToken||current?.id!==owner||generation!==audioCacheGeneration)return;
        const blob=await cachedAudioUrl(source);
        if(!blob)return;
        if(token!==prepareToken||current?.id!==owner||generation!==audioCacheGeneration){URL.revokeObjectURL(blob);return;}
        for(const previous of preparedAudio.values())URL.revokeObjectURL(previous);
        preparedAudio.clear();preparedAudio.set(source,blob);
      });
    }
  }
  const playbackLog=(()=>{const events=read('playback-log',[]);return Array.isArray(events)?events.filter(e=>e&&typeof e.event==='string'&&Date.now()-Date.parse(e.at)<86400000).slice(-120):[];})();
  function tracePlayback(event,detail='') {
    playbackLog.push({at:new Date().toISOString(),version:APP_VERSION,event,detail,track:current?.id||null,position:audio.currentTime,duration:Number.isFinite(audio.duration)?audio.duration:null,ended:audio.ended,source:audio.currentSrc?.startsWith('blob:')?'blob':'network',paused:audio.paused,readyState:audio.readyState,networkState:audio.networkState,error:audio.error?.code||0,session:navigator.audioSession?.state||'unavailable',pending:pendingTrackId,blocked:playbackBlocked,hidden:document.hidden});
    while(playbackLog.length>120 || playbackLog.length && Date.now()-Date.parse(playbackLog[0].at)>86400000)playbackLog.shift();
    save('playback-log',playbackLog);
  }
  $('copy-playback-diagnostics').onclick=async()=>{
    const text=JSON.stringify({version:APP_VERSION,browser:navigator.userAgent,standalone:!!navigator.standalone||matchMedia('(display-mode: standalone)').matches,events:playbackLog},null,2);
    try{await navigator.clipboard.writeText(text);$('playback-diagnostics-status').textContent='播放诊断已复制';}
    catch{const box=$('playback-diagnostics-text');box.hidden=false;box.value=text;box.focus();box.select();$('playback-diagnostics-status').textContent='请复制下方诊断内容';}
  };
  function resetShuffle(startId=null) {
    const ids=queue.map(t=>t.id).filter(id=>id!==startId);
    for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}
    shuffleOrder=startId&&queue.some(t=>t.id===startId)?[startId,...ids]:ids;
    shuffleCursor=shuffleOrder[0]===startId?0:-1;
  }
  function ensureShuffle() {
    const ids=new Set(queue.map(t=>t.id));
    if(shuffleOrder.length!==ids.size||new Set(shuffleOrder).size!==ids.size||shuffleOrder.some(id=>!ids.has(id)))resetShuffle(insertionAnchor||current?.id);
  }
  function selectShuffleTrack(id) {
    ensureShuffle();
    const at=shuffleOrder.indexOf(id);
    if(at>shuffleCursor){shuffleOrder.splice(at,1);shuffleOrder.splice(++shuffleCursor,0,id);}
  }
  function nextShuffleTrack() {
    ensureShuffle();
    if(shuffleCursor>=shuffleOrder.length-1){
      const last=current?.id;resetShuffle();
      if(shuffleOrder.length>1&&shuffleOrder[0]===last)[shuffleOrder[0],shuffleOrder[1]]=[shuffleOrder[1],shuffleOrder[0]];
    }
    return get(shuffleOrder[shuffleCursor+1]);
  }
  function clearQueueUndo() {
    clearTimeout(queueUndoTimer);queueUndoTimer=null;queueUndo=null;$('queue-undo').hidden=true;
  }
  function positionPlaybackFeedback() {
    if(!isFullOpen())return;
    const top=document.querySelector('.full-transport').getBoundingClientRect().top;
    document.documentElement.style.setProperty('--full-feedback-offset',Math.ceil(innerHeight-top)+'px');
  }
  function placePlaybackFeedback() {
    const host=isFullOpen()?$('full-player'):document.body;
    const stack=$('feedback-stack');
    if(stack.parentElement!==host)host.append(stack);
    positionPlaybackFeedback();
    for(const id of ['player-status','full-share-status','queue-undo','playback-recovery','favorite-notice'])if($(id).parentElement!==stack)stack.append($(id));
  }
  function rememberQueueUndo(before,message) {
    clearQueueUndo();queueUndo={before,after:[...nextUp]};
    placePlaybackFeedback();$('queue-undo-text').textContent=message;$('queue-undo').hidden=false;
    queueUndoTimer=setTimeout(clearQueueUndo,5000);
  }
  function queueChanged() {
    cancelPreload();releasePrepared();savePlaybackSession();renderQueue();
    if(current)preloadNextLyrics(current);
  }
  function undoQueueChange() {
    if(!queueUndo)return;
    const snapshot=queueUndo;
    if(JSON.stringify(nextUp)!==JSON.stringify(snapshot.after)){clearQueueUndo();return;}
    nextUp=[...snapshot.before];clearQueueUndo();queueChanged();
  }
  function cancelInsertion(id) {
    const index=nextUp.indexOf(id);if(index<0)return;
    const before=[...nextUp];nextUp.splice(index,1);queueChanged();rememberQueueUndo(before,'已取消此次插队');
  }
  function clearInsertions() {
    if(!nextUp.length)return;
    const before=[...nextUp];nextUp=[];queueChanged();rememberQueueUndo(before,'已清空待插队歌曲');
  }
  function paintBufferedProgress() {
    const gradient=loadedTrackId===current?.id?RoylylPlaybackFeedback.bufferGradient(audio.buffered,audio.duration):'none';
    for(const id of ['seek','full-seek'])$(id).style.setProperty('--seek-buffer-gradient',gradient);
  }
  function clearPlaybackRecovery() { $('playback-recovery').hidden=true; }
  function cancelPlaybackRecovery() { playbackRetries.cancel();retryTicket=null;retryWaiting=false;clearPlaybackRecovery(); }
  function showPlaybackFailure(message) {
    clearQueueUndo();retryWaiting=false;pendingTrackId=null;status(message);renderCurrent();placePlaybackFeedback();
    $('playback-recovery-text').textContent=navigator.onLine===false?'当前离线，未完整缓存':message.startsWith('请点击')?'请点击重试开始播放':'播放失败';$('playback-recovery').hidden=false;
  }
  function handlePlaybackFailure(error) {
    if(!current||playbackBlocked||lastFailureToken===playToken)return;
    lastFailureToken=playToken;pendingTrackId=null;
    if(error?.name==='AbortError'||error?.code===1){status('');renderCurrent();return;}
    if(error?.name==='NotAllowedError'){showPlaybackFailure('请点击重试，允许浏览器开始播放。');return;}
    failedAudioSources.add(audioSource(current));
    const ticket=retryTicket;
    if(playbackRetries.retry(ticket,error,()=>{
      if(!playbackRetries.isCurrent(ticket)||playbackBlocked||current?.id!==ticket.trackId)return;
      retryWaiting=false;
      if(navigator.onLine===false){showPlaybackFailure('当前离线，这首歌曲尚未完整缓存。');return;}
      play(current,queue,true,true,!!insertionAnchor,{retryTicket:ticket});
    },{online:navigator.onLine!==false})){
      retryWaiting=true;pendingTrackId=current.id;status('加载失败，正在重试…');renderCurrent();return;
    }
    showPlaybackFailure(navigator.onLine===false?'当前离线，这首歌曲尚未完整缓存。':'音频仍无法加载，请重试或跳过此曲。');
  }
  function savedPlaybackPosition() {
    if(pendingResumePosition?.id===current?.id)return pendingResumePosition.time;
    return loadedTrackId===current?.id && Number.isFinite(audio.currentTime)?audio.currentTime:0;
  }
  function savePlaybackSession() {
    if(!current)return;
    const state={id:current.id,time:savedPlaybackPosition(),queue:queue.map(t=>t.id),repeat,nextUp:[...nextUp],insertionAnchor,history:playbackHistory.slice(-200),historyAnchors:historyAnchors.slice(-200),shuffleOrder:[...shuffleOrder],shuffleCursor,historyCursor:Math.max(-1,historyCursor-Math.max(0,playbackHistory.length-200))};
    save('playback',state);save('last',{id:state.id,time:state.time});
  }
  function restorePlaybackSession() {
    const state=read('playback',null)||read('last',{}),track=get(state?.id);
    if(!canPlay(track))return;
    const resolve=ids=>Array.isArray(ids)?ids.map(get).filter(canPlay):[];
    queue=[...new Map(resolve(state.queue).map(t=>[t.id,t])).values()];
    if(!queue.length)queue=albums.find(a=>a.tracks.some(t=>t.id===track.id))?.tracks.filter(canPlay)||[track];
    if(!state.insertionAnchor&&!queue.some(t=>t.id===track.id))queue.unshift(track);
    repeat=['all','shuffle','one'].includes(state.repeat)?state.repeat:'all';
    nextUp=[...new Set(resolve(state.nextUp).map(t=>t.id))];
    insertionAnchor=queue.some(t=>t.id===state.insertionAnchor)?state.insertionAnchor:null;
    playbackHistory=resolve(state.history).map(t=>t.id);
    historyCursor=Number.isInteger(state.historyCursor)&&state.historyCursor>=0&&state.historyCursor<playbackHistory.length?state.historyCursor:playbackHistory.length-1;
    if(playbackHistory[historyCursor]!==track.id){playbackHistory=[track.id];historyCursor=0;}
    historyAnchors=playbackHistory.map((id,index)=>queue.some(t=>t.id===state.historyAnchors?.[index])?state.historyAnchors[index]:null);
    if(insertionAnchor)historyAnchors[historyCursor]=insertionAnchor;
    shuffleOrder=Array.isArray(state.shuffleOrder)?state.shuffleOrder.filter(id=>queue.some(t=>t.id===id)):[];
    shuffleCursor=Number.isInteger(state.shuffleCursor)&&state.shuffleCursor>=-1&&state.shuffleCursor<shuffleOrder.length?state.shuffleCursor:-1;
    if(repeat==='shuffle')ensureShuffle();
    const position=Number.isFinite(state.time)?Math.max(0,state.time):0;
    pendingResumePosition={id:track.id,time:position};pausedPosition={id:track.id,time:position};
    setCurrent(track);
  }
  function paintSeekProgress() {
    for(const id of ['seek','full-seek']){
      const input=$(id),percent=Math.max(0,Math.min(100,Number(input.value)||0));
      input.style?.setProperty('--seek-progress',percent+'%');
    }
  }
  function seekPlayback(position) {
    if(!current||loadedTrackId!==current.id||!Number.isFinite(position)||!Number.isFinite(audio.duration))return;
    const time=Math.max(0,Math.min(position,audio.duration));
    audio.currentTime=time;pendingResumePosition=null;
    if(audio.paused||playbackBlocked)pausedPosition={id:current.id,time};
    savePlaybackSession();updateLyricPosition(true);
  }
  function restorePlaybackPosition() {
    const position=pendingResumePosition;
    if(!position||position.id!==current?.id||loadedTrackId!==position.id||!Number.isFinite(audio.duration)||audio.readyState<1)return;
    try {
      audio.currentTime=Math.max(0,Math.min(position.time,Math.max(0,audio.duration-.01)));
      if(audio.paused||playbackBlocked)pausedPosition={id:position.id,time:audio.currentTime};
      pendingResumePosition=null;
    } catch { /* Keep the position until metadata makes seeking possible. */ }
  }
  function displayQueue() {
    if(!current)return queue;
    if(repeat==='shuffle'){
      ensureShuffle();
      if(queue.length>1&&historyCursor===playbackHistory.length-1&&shuffleCursor>=shuffleOrder.length-1)nextShuffleTrack();
      const past=playbackHistory.slice(0,historyCursor+1).map(get).filter(canPlay).map((t,index)=>({...t,_queueCurrent:index===historyCursor}));
      if(!past.length)past.push({...current,_queueCurrent:true});
      const inserted=nextUp.map(get).filter(canPlay).map(t=>({...t,_queueInserted:true}));
      const future=playbackHistory.slice(historyCursor+1).map(get).filter(canPlay);
      return [...past,...inserted,...future,...shuffleOrder.slice(shuffleCursor+1).map(get).filter(canPlay)];
    }
    const anchor=insertionAnchor||current.id;
    const list=queue.map(t=>({...t,_queueCurrent:!insertionAnchor&&t.id===current.id}));
    const inserted=nextUp.map(get).filter(canPlay).map(t=>({...t,_queueInserted:true}));
    if(insertionAnchor)inserted.unshift({...current,_queueCurrent:true});
    list.splice(Math.max(0,list.findIndex(t=>t.id===anchor)+1),0,...inserted);
    return list;
  }
  function nextPreloadTrack() {
    if(nextUp.length)return get(nextUp[0]);
    if(!current||queue.length<2)return null;
    if(repeat==='shuffle'){
      if(historyCursor<playbackHistory.length-1)return get(playbackHistory[historyCursor+1]);
      return nextShuffleTrack();
    }
    if(repeat!=='all')return null;
    return queue[(queue.findIndex(t=>t.id===(insertionAnchor||current.id))+1)%queue.length];
  }
  function addNext(t) {
    if(!canPlay(t))return;
    const before=[...nextUp];
    if(!current){queue=[t,...queue.filter(item=>item.id!==t.id)];setCurrent(t);queueChanged();return;}
    nextUp=[t.id,...nextUp.filter(id=>id!==t.id)];
    queueChanged();rememberQueueUndo(before,'已添加到下一首：'+t.title);
    if(current){const owner=current.id;cachedAudioUrl(audioSource(current)).then(blob=>{if(blob){URL.revokeObjectURL(blob);if(current?.id===owner)preloadNext();}});}
  }
  function playbackControl() {
    if(retryWaiting&&!playbackBlocked)return {icon:'pause',label:'取消重试',system:'paused'};
    if(playbackBlocked||audio.error||audio.ended)return {icon:'play',label:'播放',system:current?'paused':'none'};
    if(pendingTrackId)return {icon:'pause',label:'取消加载',system:audio.paused?'paused':'playing'};
    return {icon:audio.paused?'play':'pause',label:audio.paused?'播放':'暂停',system:current?(audio.paused?'paused':'playing'):'none'};
  }
  function syncPlaybackState() {
    if('mediaSession' in navigator)navigator.mediaSession.playbackState=playbackControl().system;
  }
  function finishPlaybackIfEnded(reason) {
    if(!current||loadedTrackId!==current.id||pendingTrackId||playbackBlocked||audio.error||!queue.length)return false;
    // Use the media clock, never the catalog's rounded duration or a wall timer.
    // A late ended event from the old source must not skip the new recording.
    const atEnd=Number.isFinite(audio.duration)&&audio.duration>0&&audio.currentTime>=audio.duration;
    if(!audio.ended&&!atEnd)return false;
    tracePlayback('track-finished',reason);
    advance(1,true);
    return true;
  }
  function pausePlayback() {
    tracePlayback('pause-request');
    playbackBlocked=true;cancelPlaybackRecovery();
    rememberPausedPosition();
    ++playToken;pendingTrackId=null;audio.pause();status('');renderCurrent();
    syncPlaybackState();
  }
  function resumePlayback() {
    tracePlayback('system-play');
    // A system play action is explicit intent, not a play/pause toggle. Do not
    // let an interrupted or unresolved play promise block this new attempt.
    if(current)return play(current,queue,true,true,!!insertionAnchor);
  }
  function rememberPausedPosition() {
    if(current&&loadedTrackId===current.id&&Number.isFinite(audio.currentTime)) {
      pausedPosition={id:current.id,time:audio.currentTime};
      savePlaybackSession();
    }
  }
  function handleAudioStart() {
    if(checkSleepTimer())return false;
    if(!playbackBlocked)return true;
    // A late browser restart must not undo an interruption or explicit pause.
    audio.pause();
    if(pausedPosition?.id===current?.id&&loadedTrackId===current?.id)audio.currentTime=pausedPosition.time;
    pendingTrackId=null;status('');renderCurrent();
    syncPlaybackState();
    return false;
  }
  function handleAudioPause(event) {
    tracePlayback('audio-pause');
    // A queued pause created before the newest play request cannot revoke it.
    if(pendingTrackId && event?.timeStamp>0 && event.timeStamp<playbackRequestedAt){tracePlayback('stale-pause-ignored');return;}
    if(!audio.paused)return; // Ignore a queued pause after playback has resumed.
    if(finishPlaybackIfEnded('pause'))return;
    // Internal source replacement may be awaiting cache lookup; it is not an
    // interruption of the currently loaded recording.
    if(current&&loadedTrackId===current.id&&audio.getAttribute('src')&&!audio.error) {
      cancelPlaybackRecovery();
      if(!audio.ended){playbackBlocked=true;rememberPausedPosition();}
      ++playToken;pendingTrackId=null;
      if(playerStatusText===BUFFERING_STATUS)status('');
    }
    renderCurrent();
    syncPlaybackState();
  }
  async function play(t, list = queue, fromHistory = false, immediate = false, inserted = false, options = {}) {
    if(checkSleepTimer())return;
    if (!canPlay(t)) return;
    if(options.retryTicket&&!playbackRetries.isCurrent(options.retryTicket))return;
    retryTicket=options.retryTicket||playbackRetries.begin(t.id,audioSource(t));retryWaiting=false;clearPlaybackRecovery();
    playbackBlocked=false;
    if (!persistenceRequested && navigator.storage?.persist) { persistenceRequested = true; navigator.storage.persist().then(updateCacheStatus).catch(()=>{}); }
    const token=++playToken;playbackRequestedAt=performance.now();
    tracePlayback('play-request','target='+t.id);
    try { if(navigator.audioSession)navigator.audioSession.type='playback'; } catch {}
    const newQueue=list!==queue;
    if(newQueue){nextUp=[];insertionAnchor=null;clearQueueUndo();shuffleOrder=[];shuffleCursor=-1;}
    if(!inserted&&current?.id!==t.id)insertionAnchor=null;
    if(list?.length)queue=list.filter(canPlay);

    if(!inserted&&!queue.some(x=>x.id===t.id))queue=[t];
    if(newQueue&&repeat==='shuffle')resetShuffle(t.id);
    if(repeat==='shuffle'&&!inserted&&!fromHistory)selectShuffleTrack(t.id);
    if(!fromHistory&&(newQueue||options.newOccurrence||playbackHistory[historyCursor]!==t.id)){
      // Inserting while browsing history preserves the already-played forward path.
      if(inserted){playbackHistory.splice(historyCursor+1,0,t.id);historyAnchors.splice(historyCursor+1,0,insertionAnchor);historyCursor++;}
      else {playbackHistory=playbackHistory.slice(0,historyCursor+1);historyAnchors=historyAnchors.slice(0,historyCursor+1);playbackHistory.push(t.id);historyAnchors.push(null);historyCursor=playbackHistory.length-1;}
      const excess=Math.max(0,playbackHistory.length-200);
      if(excess){playbackHistory.splice(0,excess);historyAnchors.splice(0,excess);historyCursor-=excess;}
    }
    const source=audioSource(t),recover=failedAudioSources.has(source)&&navigator.onLine!==false;
    cancelPreload(source);
    if(recover&&!navigator.serviceWorker?.controller&&typeof caches!=='undefined')caches.open(AUDIO_CACHE).then(cache=>cache.delete(source)).catch(()=>{});
    let refreshCurrent=false;
    if(options.forceReload || recover || loadedTrackId!==t.id || !audio.getAttribute('src') || audio.error){
      const position=current?.id===t.id?savedPlaybackPosition():0;
      pendingResumePosition=position>0?{id:t.id,time:position}:null;
      if(current?.id!==t.id)pausedPosition=null;
      pendingTrackId=t.id;loadedTrackId=null;fallbackCachedId=null;
      if(!immediate){audio.pause();audio.removeAttribute('src');audio.load();}
      // Reach native play before rendering/metadata work on a background task.
      current=t;refreshCurrent=true;
      if(!immediate){setCurrent(t);status(BUFFERING_STATUS);renderCurrent();}
      // Background transitions must reach play() in the same ended/media-session task.
      let cached=preparedAudio.get(source)||null;preparedAudio.delete(source);releasePrepared();
      if(recover&&cached){URL.revokeObjectURL(cached);cached=null;}
      if(!recover && !cached && !immediate && !navigator.serviceWorker?.controller)cached=await cachedAudioUrl(source);
      if(token!==playToken){if(cached)URL.revokeObjectURL(cached);return;}
      const previousUrl=localAudioUrl;localAudioUrl=cached;
      audio.preload='auto';
      audio.src=recover?source+'&recovery='+Date.now()+'-'+token:cached||source;loadedTrackId=t.id;
      // Explicitly start source selection before play in the same native task.
      // Leaving this to a later browser task can stall a locked-screen handoff.
      audio.load();
      tracePlayback('source-load',cached?'prepared-blob':'url');
      if(previousUrl)URL.revokeObjectURL(previousUrl);
    }
    pendingTrackId=t.id;
    let startWatchdog;
    const recoverStart=()=>{
      if(token!==playToken||playbackBlocked||current?.id!==t.id)return;
      if(navigator.audioSession?.state==='interrupted'){pausePlayback();return;}
      if(options.forceReload){pausePlayback();showPlaybackFailure('播放未能恢复，请重试或跳过此曲。');return;}
      tracePlayback('start-recovery','reload once, preserve position');
      return play(t,queue,true,true,!!insertionAnchor,{forceReload:true,retryTicket});
    };
    try {
      restorePlaybackPosition();
      // Source replacement queues pause events. Record intent after replacement
      // so those events cannot cancel the new source's start.
      playbackRequestedAt=performance.now();
      const startingAt=savedPlaybackPosition();
      const started=audio.play();
      tracePlayback('native-play-called');
      if(immediate)startWatchdog=setTimeout(()=>{
        if(token!==playToken||playbackBlocked||audio.currentTime>startingAt+.1)return;
        tracePlayback('start-timeout');recoverStart();
      },8000);
      if(refreshCurrent)setCurrent(t);
      paintBufferedProgress();status(BUFFERING_STATUS);renderCurrent();
      await started;
      // A resolved play promise is not proof that the media clock is moving.
      // Keep the bounded watchdog until it can observe actual progress.
      tracePlayback('play-resolved',token===playToken?'current':'superseded');
      if(token!==playToken)return;
      failedAudioSources.delete(source);pendingTrackId=null;restorePlaybackPosition();status('');savePlaybackSession();renderCurrent();
      if(typeof preloadNextLyrics==='function')preloadNextLyrics(t);
      if(audioBudget())cacheAudio(source).then(ok=>{if(ok&&token===playToken)preloadNext();});
    } catch(error) {
      clearTimeout(startWatchdog);
      tracePlayback('play-rejected',error.name+': '+error.message);
      if(token!==playToken)return;
      if(immediate&&error.name==='AbortError'&&!playbackBlocked)return recoverStart();
      handlePlaybackFailure(error);
    }
  }
  function advance(direction, ended = false) {
    if(checkSleepTimer()||ended&&playbackBlocked||!queue.length)return;
    clearQueueUndo();
    const start=(track,fromHistory=false,inserted=false)=>{
      if(!canPlay(track))return;
      if(track.id===current?.id){audio.currentTime=0;pendingResumePosition=null;pausedPosition=null;}
      play(track,queue,fromHistory,true,inserted,{newOccurrence:true});
    };
    if(repeat==='shuffle'&&direction<0){
      if(historyCursor>0){historyCursor--;insertionAnchor=historyAnchors[historyCursor]||null;start(get(playbackHistory[historyCursor]),true,!!insertionAnchor);}return;
    }
    if(direction>0&&nextUp.length){
      const next=get(nextUp.shift());
      if(canPlay(next)){insertionAnchor=insertionAnchor||current?.id;start(next,false,true);return;}
    }
    if(repeat==='shuffle'&&direction>0&&historyCursor<playbackHistory.length-1){
      historyCursor++;insertionAnchor=historyAnchors[historyCursor]||null;start(get(playbackHistory[historyCursor]),true,!!insertionAnchor);return;
    }
    if(insertionAnchor&&direction>0){
      const anchor=insertionAnchor;insertionAnchor=null;
      start(repeat==='shuffle'?nextShuffleTrack():queue[(queue.findIndex(t=>t.id===anchor)+1)%queue.length]);return;
    }
    if(ended&&repeat==='one'){audio.currentTime=0;play(current,queue,true,true);return;}
    if(repeat==='shuffle'){start(nextShuffleTrack());return;}
    const index=queue.findIndex(t=>t.id===current?.id);start(queue[(index+direction+queue.length)%queue.length]);
  }
  function previousTrack() { advance(-1); }
  const modeLabels = {all:'列表循环',shuffle:'随机播放',one:'单曲循环'};
  function updateModeControls() {
    const glyph = repeat === 'shuffle' ? 'shuffle' : repeat === 'one' ? 'one' : 'repeat';
    for (const id of ['repeat','full-repeat']) {
      setIcon(id,glyph);
      $(id).classList.toggle('on',repeat!=='all');
      $(id).setAttribute('aria-label','播放模式：'+modeLabels[repeat]);
      $(id).setAttribute('title','播放模式：'+modeLabels[repeat]);
      $(id).setAttribute('aria-pressed',String(repeat!=='all'));
    }
  }
  $('play').onclick = () => {
    if (!audio.paused || pendingTrackId) { pausePlayback(); return; }
    const visible=$('songs')._tracks ?? filtered();
    const target=current || visible[0];
    if(target)play(target,current&&queue.length?queue:visible);
  };
  $('prev').onclick = previousTrack;
  $('next').onclick = () => advance(1);
  $('repeat').onclick = () => { repeat=({all:'shuffle',shuffle:'one',one:'all'})[repeat];if(repeat==='shuffle')resetShuffle(insertionAnchor||current?.id);cancelPreload();releasePrepared();renderQueue();savePlaybackSession();updateModeControls();if(current){preloadNextLyrics(current);cachedAudioUrl(audioSource(current)).then(blob=>{if(blob){URL.revokeObjectURL(blob);preloadNext();}});} };
  $('undo-queue-change').onclick=undoQueueChange;
  $('retry-playback').onclick=()=>current&&play(current,queue,true,true,!!insertionAnchor);
  $('skip-playback').onclick=()=>advance(1);
  $('cancel-insertion').onclick=()=>{const id=$('cancel-insertion').dataset.cancelInsertion;closeTrackMenu();cancelInsertion(id);};
  for(const id of ['clear-insertions','full-clear-insertions'])$(id).onclick=()=>{closeTrackMenu();closeFullMore();clearInsertions();};
  $('now-like').onclick = () => like();
  $('seek').oninput = () => { paintSeekProgress();seekPlayback(Number($('seek').value)/100*audio.duration); };
  const mobileVolume = matchMedia('(max-width:700px)');
  function placeLikeButton() {
    if (mobileVolume.matches) document.querySelector('.now').append($('now-like'));
    else $('next').after($('now-like'));
  }
  placeLikeButton();
  mobileVolume.addEventListener('change',()=>{placeLikeButton();queueSignature='';if(tracks.length)render();});
  const savedVolume = read('volume',1);
  const desktopVolume = typeof savedVolume === 'number' && Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1 ? savedVolume : 1;
  $('volume').value = String(desktopVolume);
  function applyVolume() { audio.volume = mobileVolume.matches ? 1 : Number($('volume').value); }
  applyVolume();
  mobileVolume.addEventListener('change',applyVolume);
  $('volume').oninput = () => { if (mobileVolume.matches) return; const value=Number($('volume').value); audio.volume=value; save('volume',value); };
  function toggleQueue(open) { $('queue-panel').hidden=!open; for(const id of ['queue-toggle','mobile-queue-toggle'])$(id).setAttribute('aria-expanded',String(open)); if (open) { renderQueue(); $('close-queue').focus({preventScroll:true});positionQueue('queue-list'); } else (matchMedia('(max-width:700px)').matches?$('mobile-queue-toggle'):$('queue-toggle')).focus(); }
  for(const id of ['queue-toggle','mobile-queue-toggle'])$(id).onclick = () => toggleQueue($('queue-panel').hidden);
  $('close-queue').onclick=()=>toggleQueue(false);
  $('content').addEventListener('click',e=> {
    const albumPlay=e.target.closest('[data-album-play]');
    const playlist=e.target.closest('[data-playlist]');if(playlist){showPlaylist(playlist.dataset.playlist);return;}
    if(albumPlay){playAlbum(albums.find(a=>a.key===albumPlay.dataset.albumPlay));return;}
    const album=e.target.closest('[data-album]'), button=e.target.closest('[data-play]'), heart=e.target.closest('[data-like]');
    if(album) openAlbum(albums.find(a=>a.key===album.dataset.album));
    if(button) play($('songs')._tracks?.find(t=>t.id===button.dataset.play)||get(button.dataset.play),$('songs')._tracks);
    if(heart) like(heart.dataset.like);
  });
  $('queue-list').addEventListener('click',e=> { const b=e.target.closest('[data-play]'),h=e.target.closest('[data-like]'); if(b)play(get(b.dataset.play)); if(h)like(h.dataset.like); });
  $('full-queue-list').addEventListener('click',e=> { const b=e.target.closest('[data-play]'),h=e.target.closest('[data-like]'); if(b)play(get(b.dataset.play)); if(h)like(h.dataset.like); });
  document.addEventListener('click',e=>{
    const nextButton=e.target.closest('[data-next]');
    if(nextButton){addNext(get(nextButton.dataset.next));closeTrackMenu();return;}
    const row=e.target.closest('.track-row[data-track]');
    if(matchMedia('(max-width:700px)').matches && row && !e.target.closest('button,a,input,select')){
      const inQueue=row.closest('#queue-list,#full-queue-list');
      play(get(row.dataset.track),inQueue?queue:$('songs')._tracks);return;
    }
    const artistChoice=e.target.closest('[data-view-artists]');
    if(artistChoice){const choices=artistChoice.nextElementSibling;choices.hidden=!choices.hidden;artistChoice.setAttribute('aria-expanded',String(!choices.hidden));if(!moreMenu.hidden)positionTrackMenu();return;}
    const artistLink=e.target.closest('[data-artist-link]'), albumLink=e.target.closest('[data-track-album]');
    if(artistLink || albumLink){
      const album=albumLink && albums.find(a=>a.key===get(albumLink.dataset.trackAlbum)?.albumKey);
      if(albumLink && !album)return;
      const navigate=()=>{
        if(!$('queue-panel').hidden)toggleQueue(false);
        closeTrackMenu();closeFullMore();
        if(album)openAlbum(album);else openArtist(artistLink.dataset.artistLink);
      };
      if(isFullOpen()||fullNavigationClosing)closeFull(navigate);else navigate();
      return;
    }
    const button=e.target.closest('[data-more]');
    if (button) { openTrackMenu(button); return; }
    if (e.target.closest('#share-track')) { const track=get(moreTrackId); closeTrackMenu(); shareTrack(track); return; }
    if (!moreMenu.hidden) closeTrackMenu();
  });
  document.addEventListener('dblclick',e=>{
    if(matchMedia('(max-width:700px)').matches)return;
    const row=e.target.closest('.track-row[data-track]');
    if(!row || e.target.closest('button,a,input,select'))return;
    const inQueue=row.closest('#queue-list,#full-queue-list');
    play(get(row.dataset.track),inQueue?queue:$('songs')._tracks);
  });
  let rowGesture=null;
  function clearRowPress(){rowGesture?.row.classList.remove('is-pressed');}
  document.addEventListener('pointerdown',e=>{
    clearRowPress();rowGesture=null;
    if(e.pointerType!=='touch'&&e.pointerType!=='pen')return;
    const row=e.target.closest('.track-row[data-track],.nav-item');
    if(!row)return;
    rowGesture={row,id:e.pointerId,x:e.clientX,y:e.clientY,moved:e.isPrimary===false,at:performance.now()};
    if(!rowGesture.moved&&!e.target.closest('a,input,select,[data-next],[data-more],[data-like],[data-track-album],[data-artist-link]'))row.classList.add('is-pressed');
  },{passive:true});
  document.addEventListener('pointermove',e=>{
    if(!rowGesture||e.pointerId!==rowGesture.id)return;
    if(Math.hypot(e.clientX-rowGesture.x,e.clientY-rowGesture.y)>8){rowGesture.moved=true;clearRowPress();}
  },{passive:true});
  document.addEventListener('pointerup',e=>{
    if(!rowGesture||e.pointerId!==rowGesture.id)return;
    if(Math.hypot(e.clientX-rowGesture.x,e.clientY-rowGesture.y)>8)rowGesture.moved=true;
    clearRowPress();
  },{passive:true});
  document.addEventListener('pointercancel',e=>{if(rowGesture&&e.pointerId===rowGesture.id){rowGesture.moved=true;clearRowPress();}},{passive:true});
  window.addEventListener('scroll',()=>{if(rowGesture){rowGesture.moved=true;clearRowPress();}}, {capture:true,passive:true});
  document.addEventListener('click',e=>{
    if(!rowGesture||e.detail===0)return;
    const gesture=rowGesture;rowGesture=null;
    if(gesture.moved&&performance.now()-gesture.at<1500&&e.target.closest('.track-row,.nav-item')===gesture.row){e.preventDefault();e.stopImmediatePropagation();}
  },true);
  moreMenu.addEventListener('keydown',event=>{
    const items=[...moreMenu.querySelectorAll('button:not(:disabled)')].filter(button=>!button.closest('[hidden]')),index=items.indexOf(document.activeElement);
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();items[(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();}
    if(event.key==='Tab')closeTrackMenu(true);
  });
  window.addEventListener('scroll',event=>{if(!moreMenu.hidden && !(event.target instanceof Node && moreMenu.contains(event.target)))closeTrackMenu();},true);
  document.querySelector('.brand').addEventListener('click',event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();document.querySelector('[data-view="albums"]').click();});
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{
    if(view===b.dataset.view&&!selected&&!$('search').value&&!$('artist').value)return;
    beginNavigation();
    if(b.dataset.view==='favorites')enterFixedSort();else leaveFixedSort();
    view=b.dataset.view;selected=null;activePlaylist=null;artistContext=null;$('search').value='';$('artist').value='';render();finishNavigation();
  });
  $('back-albums').onclick=()=>{if(navigationDepth>0){history.back();return;}selected=null;artistContext=null;$('artist').value='';$('search').value='';render();rememberNavigation();$('view-title').scrollIntoView({block:'start',behavior:'smooth'});};
  $('fixed-playlists').onclick=e=>{const b=e.target.closest('[data-playlist]');if(b)showPlaylist(b.dataset.playlist);};
  let searchTimer;
  $('search').oninput=()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{render();rememberNavigation();},120);};
  $('artist').onchange=()=>{render();rememberNavigation();};
  $('reset-view-filters').onclick=()=>{$('clear-filters').click();};
  $('clear-filters').onclick=()=>{clearTimeout(searchTimer);$('search').value='';$('artist').value=artistContext||'';render();rememberNavigation();$('search').focus({preventScroll:true});};
  for(const id of ['sort-primary','sort-secondary','sort-direction'])$(id).onchange=()=>{updateSortControls();render();rememberNavigation();};
  updateSortControls();
  document.addEventListener('keydown',e=> {
    if($('sleep-dialog').open)return;
    if(e.key==='Escape'&&!moreMenu.hidden){e.preventDefault();e.stopPropagation();closeTrackMenu(true);return;}
    if(e.key==='Escape'&&!$('full-queue').hidden){e.preventDefault();e.stopPropagation();toggleFullQueue(false);return;}
    else if(e.key==='Escape'&&!$('queue-panel').hidden)toggleQueue(false);
    if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)||e.target.isContentEditable)return;
    if($('settings-dialog').open)return;
    if(e.key==='/'&&isFullOpen())return;
    if(e.key==='/'){e.preventDefault();$('search').focus();}
    if(e.code==='Space'){e.preventDefault();$('play').click();}
  });
  audio.addEventListener('loadedmetadata',()=>{tracePlayback('loadedmetadata');paintBufferedProgress();restorePlaybackPosition();$('seek').disabled=!Number.isFinite(audio.duration);$('duration').textContent=time(audio.duration);updateFull();registerMediaActions();});
  for(const name of ['loadstart','stalled'])audio.addEventListener(name,()=>tracePlayback(name));
  audio.addEventListener('timeupdate',()=>{
    if(checkSleepTimer())return;
    if(finishPlaybackIfEnded('timeupdate'))return;
    $('elapsed').textContent=time(audio.currentTime); $('full-elapsed').textContent=time(audio.currentTime); $('full-seek').value=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration*100:0; if(Number.isFinite(audio.duration)&&audio.duration>0)$('seek').value=audio.currentTime/audio.duration*100;paintSeekProgress();
    updateLyricPosition();
    for(const id of ['seek','full-seek']){$(id).setAttribute('aria-valuetext',time(audio.currentTime)+' / '+time(Number.isFinite(audio.duration)?audio.duration:current?.duration));}
    if(current&&Date.now()-lastSaved>5000){savePlaybackSession();lastSaved=Date.now();}
    if('mediaSession'in navigator&&navigator.mediaSession.setPositionState&&Number.isFinite(audio.duration)&&audio.duration>0){try{navigator.mediaSession.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate,position:Math.min(audio.currentTime,audio.duration)});}catch{}}
  });
  audio.addEventListener('play',()=>{if(!handleAudioStart())return;renderCurrent();registerMediaActions();});
  audio.addEventListener('waiting',()=>{tracePlayback('audio-waiting');if(!audio.paused)status(BUFFERING_STATUS);});
  audio.addEventListener('pause',handleAudioPause);
  audio.addEventListener('playing',()=>{
    tracePlayback('audio-playing');
    if(!handleAudioStart())return;
    if(audio.paused)return;
    pendingTrackId=null;clearPlaybackRecovery();status('');renderCurrent();
    syncPlaybackState();
  });
  // AudioSession is optional. Never auto-resume on 'active': that could fight
  // another app or undo the user's pause. The next system play acts directly.
  navigator.audioSession?.addEventListener('statechange',()=>{
    tracePlayback('session-statechange');
    if(navigator.audioSession.state==='interrupted')pausePlayback();
  });
  audio.addEventListener('error',()=>{if(audio.getAttribute('src')&&loadedTrackId===current?.id)handlePlaybackFailure(audio.error);});
  audio.addEventListener('progress',()=>{
    paintBufferedProgress();
    if(navigator.serviceWorker?.controller || !current || !Number.isFinite(audio.duration))return;
    for(let i=0;i<audio.buffered.length;i++)if(audio.buffered.start(i)===0 && audio.buffered.end(i)>=audio.duration-.1){
      const id=current.id;if(fallbackCachedId===id)return;fallbackCachedId=id;
      cacheAudio(audioSource(current)).then(ok=>{if(ok&&current?.id===id)preloadNext();});break;
    }
  });
  let fallbackCachedId=null;
  audio.addEventListener('ended',()=>{tracePlayback('audio-ended');finishPlaybackIfEnded('ended');});
  function registerMediaActions() {
    if (!('mediaSession' in navigator)) return;
    const handlers = {
      seekbackward: null, seekforward: null,
      play: resumePlayback,
      pause: () => {tracePlayback('system-pause');pausePlayback();},
      previoustrack: () => advance(-1),
      nexttrack: () => advance(1),
      seekto: e => seekPlayback(e.seekTime)
    };
    for (const [name, handler] of Object.entries(handlers)) {
      try { navigator.mediaSession.setActionHandler(name, handler); } catch {}
    }
  }
  window.addEventListener('pagehide',()=>{savePlaybackSession();tracePlayback('pagehide');});
  document.addEventListener('visibilitychange',()=>{checkSleepTimer();if(!document.hidden)reportShellVersion();else savePlaybackSession();tracePlayback('visibilitychange');if(current){registerMediaActions();if(navigator.audioSession?.state==='interrupted')pausePlayback();else if(playbackBlocked)handleAudioStart();else if(!finishPlaybackIfEnded('visibility')&&audio.paused&&!pendingTrackId)handleAudioPause();}if(!document.hidden&&current){loadLyrics(current);updateLyricPosition(true);}});
  const full = $('full-player');
  function isFullOpen() { return Boolean(full.open || full.classList.contains('dialog-fallback-open')); }
  function updateFull() {
    $('open-full').disabled = !current; $('quality').disabled = !current;
    if (!current) return;
    const stored = audioProperties[current.id];
    const p = current.audioProperties || (stored?.src === current.src ? stored : {});
    const format = String(p.codec || current.format || '未知').toUpperCase();
    const rate = p.sampleRate ? (p.sampleRate / 1000) + 'kHz' : '未记录';
    const bitrate = p.bitRate ? Math.round(p.bitRate / 1000) + 'kbps' : '未记录';
    const lossy = /MP3|AAC|OPUS|VORBIS/.test(format);
    const depth = lossy ? '不适用（有损编码）' : p.bitDepth ? p.bitDepth + 'bit' : '未记录';
    $('quality').textContent = [format,bitrate,rate].join(' · ');
    $('quality').title = '格式：'+format+'；码率：'+bitrate+'；采样率：'+rate+(!lossy && p.bitDepth ? '；量化位深：'+depth : '');
    bindCover($('full-cover'),current.cover,true); $('full-title').textContent = current.title;
    $('full-artist').textContent = current.artist; $('full-album').textContent = current.album;
    const badges=[format,p.bitRate?bitrate:'',p.sampleRate?rate:''].filter(Boolean);
    setMarkup('quality-badges',badges.map(value=>`<span class="quality-badge">${esc(value)}</span>`).join(''));
    $('quality-badges').title=$('quality').title;
    const details=[['格式',format],['码率',p.bitRate?bitrate:'未记录'],['采样率',p.sampleRate?rate:'未记录'],...(!lossy&&p.bitDepth?[['量化位深',depth]]:[]),['声道',p.channels===2?'双声道':p.channels===1?'单声道':p.channels?String(p.channels):'未记录'],['文件大小',p.fileSize?formatBytes(p.fileSize):'未记录']];
    setMarkup('audio-details',details.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')+'<div id="sleep-indicator" hidden><dt>定时关闭</dt><dd id="sleep-countdown"></dd></div>');
    renderSleepTimer();
    const control=playbackControl();
    setIcon('full-play',control.icon); $('full-play').setAttribute('aria-label',control.label);
    updateLoadingIndicator();
    updateModeControls();
    const duration=loadedTrackId===current.id&&Number.isFinite(audio.duration)?audio.duration:current.duration;
    $('full-duration').textContent=time(duration);
    $('full-seek').disabled=loadedTrackId!==current.id||!Number.isFinite(audio.duration);
    $('full-seek').value=duration>0?savedPlaybackPosition()/duration*100:0;paintSeekProgress();
    $('full-elapsed').textContent=time(savedPlaybackPosition()); $('full-status').textContent=playerStatusText && playerStatusText!==BUFFERING_STATUS ? playerStatusText : '';
    loadLyrics(current);
  }
  function openFull(fromHistory=false) {
    if(!current||fullNavigationClosing)return; updateFull();
    if(!isFullOpen()){
      if(!fromHistory)rememberNavigation();
      fullPageScroll=fromHistory?history.state?.[navigationKey]?.scroll??scrollY:scrollY;
      if(typeof full.showModal==='function')full.showModal();
      else {full.classList.add('dialog-fallback-open');document.body.classList.add('full-open');}
      if(!fromHistory)rememberNavigation();
    }
    document.body.classList.add('full-open');placePlaybackFeedback();
    if(full.requestFullscreen&&!document.fullscreenElement)full.requestFullscreen().catch(()=>{});
    requestAnimationFrame(() => scrollActiveLyric(false));
  }
  function hideFull() {
    closeFullMore();if($('sleep-dialog').open)$('sleep-dialog').close();
    toggleFullQueue(false);
    const wasOpen=isFullOpen()||document.body.classList.contains('full-open');
    if(isFullOpen()&&typeof full.close==='function')full.close();
    full.classList.remove('dialog-fallback-open');document.body.classList.remove('full-open');closeTrackMenu();
    if(document.fullscreenElement===full)document.exitFullscreen().catch(()=>{});
    if(wasOpen)$('open-full').focus({preventScroll:true});
    fullPageScroll=null;placePlaybackFeedback();
  }
  function closeFull(afterClose) {
    const navigate=typeof afterClose==='function'?afterClose:null;
    if(navigationReady&&history.state?.[navigationKey]?.full){
      if(navigate)afterFullClose=navigate;
      if(!fullNavigationClosing){fullNavigationClosing=true;history.back();}
      return;
    }
    hideFull();if(navigate)navigate();
  }
  function toggleFullQueue(open) { const wasOpen=!$('full-queue').hidden; $('full-queue').hidden=!open; $('full-queue-toggle').setAttribute('aria-expanded',String(open)); if(open){renderQueue();$('full-queue-close').focus({preventScroll:true});positionQueue('full-queue-list');}else if(wasOpen)$('full-queue-toggle').focus(); }
  $('full-queue-toggle').onclick=()=>toggleFullQueue($('full-queue').hidden);
  function setFullView(view) {
    const shell=full.querySelector('.full-shell'); shell.dataset.mobileView=view;
    $('full-cover-tab').classList.toggle('is-active',view==='cover');
    $('full-lyrics-tab').classList.toggle('is-active',view==='lyrics');
    $('full-cover-tab').setAttribute('aria-selected',String(view==='cover'));
    $('full-lyrics-tab').setAttribute('aria-selected',String(view==='lyrics'));
    if(view==='lyrics')updateLyricPosition(true);
  }
  $('full-cover-tab').onclick=()=>setFullView('cover');
  $('full-lyrics-tab').onclick=()=>setFullView('lyrics');
  function formatSleepTime(ms) {
    const seconds=Math.max(0,Math.ceil(ms/1000));
    return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':');
  }
  function renderSleepTimer() {
    const active=sleepDeadline>0,text=active?formatSleepTime(sleepDeadline-Date.now()):'';
    if($('sleep-indicator')){$('sleep-indicator').hidden=!active;$('sleep-countdown').textContent=text;}
    $('full-more').classList.toggle('on',active);
    $('sleep-current').textContent=active?'剩余'+text:'尚未开启定时';
    $('cancel-sleep-timer').disabled=!active;
  }
  function checkSleepTimer() {
    if(!sleepDeadline)return false;
    if(Date.now()<sleepDeadline)return false;
    sleepDeadline=0;save('sleep-deadline',0);clearTimeout(sleepTick);sleepTick=null;
    pausePlayback();renderSleepTimer();status('定时已结束，播放已暂停。');
    return true;
  }
  function tickSleepTimer() {
    clearTimeout(sleepTick);sleepTick=null;
    checkSleepTimer();renderSleepTimer();
    if(sleepDeadline)sleepTick=setTimeout(tickSleepTimer,Math.min(1000,Math.max(1,sleepDeadline-Date.now())));
  }
  function setSleepTimer(minutes) {
    if(!Number.isInteger(minutes)||minutes<1||minutes>1440)return false;
    sleepDeadline=Date.now()+minutes*60000;save('sleep-deadline',sleepDeadline);tickSleepTimer();
    $('sleep-dialog').close();return true;
  }
  function closeFullMore(restoreFocus=false) {
    $('full-more-menu').hidden=true;$('full-more').setAttribute('aria-expanded','false');
    if(restoreFocus)$('full-more').focus({preventScroll:true});
  }
  $('full-more').onclick=()=>{
    const open=$('full-more-menu').hidden;
    closeTrackMenu();$('full-more-menu').hidden=!open;$('full-more').setAttribute('aria-expanded',String(open));
    if(open){
      $('full-menu-album').dataset.trackAlbum=current?.id||'';$('full-menu-album').disabled=!current?.albumKey;
      artistMenu(current,$('full-menu-artists'));$('full-clear-insertions').hidden=!nextUp.length;
      showTrackCacheStatus(current,'full-cache-status');$('full-share-action').focus({preventScroll:true});
    }
  };
  $('full-more-menu').addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeFullMore(true);}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const items=[...$('full-more-menu').querySelectorAll('button:not(:disabled)')].filter(button=>!button.closest('[hidden]')),index=items.indexOf(document.activeElement);items[(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();}
    if(e.key==='Tab')closeFullMore();
  });
  document.addEventListener('click',e=>{if(!e.target.closest('#full-more,#full-more-menu'))closeFullMore();});
  $('open-sleep-timer').onclick=()=>{closeFullMore();renderSleepTimer();$('sleep-dialog').showModal();};
  $('close-sleep-timer').onclick=()=>$('sleep-dialog').close();
  $('sleep-dialog').addEventListener('cancel',e=>e.stopPropagation());
  $('sleep-dialog').addEventListener('click',e=>{if(e.target!==$('sleep-dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();});
  $('sleep-dialog').addEventListener('close',()=>{if(isFullOpen())$('full-more').focus({preventScroll:true});});
  document.querySelectorAll('[data-sleep-minutes]').forEach(button=>button.onclick=()=>setSleepTimer(Number(button.dataset.sleepMinutes)));
  $('sleep-custom-form').onsubmit=e=>{e.preventDefault();if(e.currentTarget.reportValidity())setSleepTimer(Number($('sleep-minutes').value));};
  $('cancel-sleep-timer').onclick=()=>{sleepDeadline=0;save('sleep-deadline',0);tickSleepTimer();$('sleep-dialog').close();};
  tickSleepTimer();
  let shareNoticeTimer;
  $('full-share-action').onclick=async()=>{
    closeFullMore();
    if(!current)return;
    const button=$('full-share-action'),notice=$('full-share-status');placePlaybackFeedback();
    button.disabled=true;notice.hidden=true;clearTimeout(shareNoticeTimer);
    try{await shareTrack(current,message=>{notice.textContent=message;notice.hidden=false;shareNoticeTimer=setTimeout(()=>{notice.hidden=true;},4000);});}
    finally{button.disabled=false;}
  };
  $('full-queue-close').onclick=()=>toggleFullQueue(false);
  full.addEventListener('cancel',event=>{event.preventDefault();closeFull();});
  full.addEventListener('close',()=>{if(!isFullOpen()&&document.body.classList.contains('full-open'))closeFull();});
  $('open-full').onclick=()=>openFull(); $('quality').onclick=()=>openFull(); $('close-full').onclick=()=>closeFull();
  for(const [button,target] of [['full-play','play'],['full-prev','prev'],['full-next','next'],['full-like','now-like'],['full-like-mobile','now-like'],['full-repeat','repeat']])$(button).onclick=()=>$(target).click();
  $('full-seek').oninput=()=>{paintSeekProgress();seekPlayback(Number($('full-seek').value)/100*audio.duration);};

  async function load() {
    $('retry').hidden=true; $('notice').hidden=false; $('notice').textContent='正在载入音乐收藏…';let data;
    const catalogController=new AbortController(),catalogTimer=setTimeout(()=>catalogController.abort(),15000);
    try {
      const response=await fetch('./data/catalog.json?v='+APP_VERSION,{cache:'no-cache',signal:catalogController.signal});
      if(!response.ok)throw Error('目录加载失败');
      const catalog=await response.json();
      if(!catalog.version || !Array.isArray(catalog.tracks) || !catalog.appleMusic?.entries || !Array.isArray(catalog.appleMusic.playlists) || !Array.isArray(catalog.appleMusic.favorites))throw Error('目录格式不正确');
      data=catalog.tracks;appleMusic=catalog.appleMusic;audioProperties=catalog.audioProperties||{};
      const ids=new Set(data.map(t=>t.id));
      for(const id of [...appleMusic.favorites,...appleMusic.playlists.flatMap(p=>p.entries)]){
        const entry=appleMusic.entries[id];if(!entry || entry.trackId&&!ids.has(entry.trackId))throw Error('目录版本不一致');
      }
      for(const entry of Object.values(appleMusic.entries))if(entry.sourceUrl&&!/^https:\/\//.test(entry.sourceUrl))entry.sourceUrl='';
    } catch {
      $('notice').textContent=location.protocol==='file:'?'请通过网站地址或本地HTTP预览打开音乐页，文件预览无法读取完整曲库和缓存。':'音乐库加载失败，请检查网络后重试。';$('retry').hidden=location.protocol==='file:';return;
    } finally {clearTimeout(catalogTimer);}
    tracks=data.filter(t=>t&&typeof t.id==='string'&&typeof t.title==='string'&&safePath(t.src)&&/\.mp3$/i.test(t.src)&&safePath(t.cover)).map(t=>({...t,year:Number(t.albumYear ?? t.src.match(/\/(\d{4}) - /)?.[1])||0}));
    trackIndex.clear();for(const track of tracks)trackIndex.set(track.id,track);
    if(!tracks.length){$('notice').textContent='索引里暂时没有可播放的MP3。';$('retry').hidden=false;return;}
    // Album ownership is independent of guest performers on individual songs.
    const releaseKey=t=>t.src.split('/')[0]+'/'+t.year+'/'+normalize(t.album).trim().replace(/\s+/g,' ')+'/'+(t.releaseEdition||'');
    const owners=new Map();
    for(const t of tracks){
      const [category,owner,edition]=t.src.split('/'), release=releaseKey(t);
      if(artistNames(owner).length===1){if(!owners.has(release))owners.set(release,new Set());owners.get(release).add(owner);}
    }
    const grouped=new Map();
    for(const t of tracks){
      const [category,owner,edition]=t.src.split('/');
      const candidates=[...(owners.get(releaseKey(t))||[])].filter(name=>artistNames(owner).includes(name));
      t.albumArtist=t.albumArtist||(candidates.length===1?candidates[0]:owner);
      const key=category+'/'+t.albumArtist+'/'+releaseKey(t);
      t.albumKey=key;
      if(!grouped.has(key))grouped.set(key,{key,title:t.album,artist:t.albumArtist,year:t.year,tracks:[]});
      grouped.get(key).tracks.push(t);
    }
    albums=[...grouped.values()];albums.forEach(a=>a.tracks.sort((a,b)=>a.discNumber-b.discNumber||a.trackNumber-b.trackNumber));
    $('artist').innerHTML='<option value="">全部歌手</option>'+[...new Set(tracks.flatMap(t=>[t.albumArtist,...artistNames(t.artist)]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN')).map(a=>`<option>${esc(a)}</option>`).join('');
    const feature=albums.find(a=>a.title==='1701')||albums[0];$('feature-title').textContent=feature.title;bindCover($('feature-cover'),feature.tracks[0].cover,true);$('feature-cover').alt=feature.title+'专辑封面';$('feature-meta').innerHTML=artistLinks(feature.artist,true)+' · '+esc(feature.year||'')+' · '+feature.tracks.length+'首';
    $('feature-play').onclick=()=>playAlbum(feature); $('feature-full').onclick=()=>openAlbum(feature);$('feature-open').onclick=()=>openAlbum(feature);
    $('total').textContent=tracks.length;$('source-state').textContent='音乐库已连接';$('notice').hidden=true;$('notice').textContent='';
    if(appleMusic)applyAppleMusic();
    const shareParams = new URLSearchParams(location.search);
    const sharedId = shareParams.get('track');
    if(!current && sharedId) {
      const shared = get(sharedId), album = albums.find(a=>a.tracks.some(t=>t.id===sharedId));
      if(shared && album) {
        queue=album.tracks; selected=album; setCurrent(shared);
        if(shareParams.get('full')==='1') openFull();
        if(shareParams.get('autoplay')==='1') play(shared,album.tracks);
      }
    }
    if(!current)restorePlaybackSession();
    render();
    navigationReady=true;
    if(!sharedId && history.state?.[navigationKey])restoreNavigation(history.state[navigationKey]);
    else rememberNavigation();
  }
  function applyAppleMusic() {
    favorites.clear();for(const id of appleMusic.favorites){const e=appleMusic.entries[id];favorites.add(e.trackId||'apple:'+id);}
    $('fixed-playlists').innerHTML=appleMusic.playlists.map(p=>`<button class="nav-item" data-playlist="${esc(p.id)}">${icon('list')}<span>${esc(p.name)}</span><small>${p.entries.length}</small></button>`).join('');
    const artists=[...new Set([...tracks.flatMap(t=>[t.albumArtist,...artistNames(t.artist)]).filter(Boolean),...Object.values(appleMusic.entries).flatMap(e=>artistNames(e.artist))])].sort((a,b)=>a.localeCompare(b,'zh-CN'));
    const previous=$('artist').value;$('artist').innerHTML='<option value="">全部歌手</option>'+artists.map(a=>`<option>${esc(a)}</option>`).join('');$('artist').value=previous;
  }
  $('retry').onclick=load;load();
})();
