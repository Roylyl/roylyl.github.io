'use strict';
(() => {
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
      navigator.serviceWorker.ready.then(sendAudioConfig);
    }).catch(()=>{});
    navigator.serviceWorker.addEventListener('controllerchange',()=>{sendAudioConfig();if(sessionStorage.getItem('roylyl-music-update')){sessionStorage.removeItem('roylyl-music-update');location.reload();}});
    navigator.serviceWorker.addEventListener('message',event=>{
      if(event.data?.type==='AUDIO_CACHED'){
        updateCacheStatus();
        if(current && event.data.source===audioSource(current))preloadNext();
      }
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
      statusElement.textContent = done;
    }
    catch { statusElement.textContent = '清理失败，请重试。'; }
    $(buttonId).disabled = false;
  };
  const shapes = {
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
    back:'<path d="m10 5-7 7 7 7M3 12h18"/>', arrow:'<path d="m9 5 7 7-7 7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
  const setIcon = (id,name) => { $(id).innerHTML=icon(name); };
  for(const [id,name] of Object.entries({play:'play',prev:'prev',next:'next',repeat:'repeat','now-like':'heart','queue-toggle':'list','mobile-queue-toggle':'list','close-queue':'close','close-full':'down','full-play':'play','full-prev':'prev','full-next':'next','full-like':'heart','full-like-mobile':'heart','full-queue-toggle':'list','full-queue-close':'close'}))setIcon(id,name);
  $('feature-play').innerHTML=icon('play')+'播放专辑';
  $('feature-open').innerHTML='查看曲目'+icon('arrow');

  if ('ResizeObserver' in window) {
    new ResizeObserver(entries => {
      const height = Math.ceil(entries[0].target.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--player-height', height + 'px');
    }).observe(document.querySelector('.player'));
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
  let playbackBlocked=false, pausedPosition=null, playbackRequestedAt=0;
  let loadedTrackId=null, pendingTrackId=null, playbackHistory=[], historyCursor=-1, queueSignature='';
  let tracks = [], albums = [], view = 'albums', selected = null, current = null, queue = [], repeat = 'all', playToken = 0, lastSaved = 0;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const time = n => { n = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0; return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); };
  const url = path => ROOT + path.split('/').map(encodeURIComponent).join('/');
  const audioSource = track => url(track.src)+'?v='+encodeURIComponent(track.audioRevision||'initial');
  const compareText = (a,b) => String(a ?? '').localeCompare(String(b ?? ''),'zh-CN',{numeric:true});
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
            coverObserver?.unobserve(img);
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
  async function loadCoverInto(img,path) {
    coverObserver?.unobserve(img);
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
    else coverObserver.observe(img);
  }
  function hydrateCovers(root) {
    root.querySelectorAll('img[data-cover-path]').forEach(img=>bindCover(img,img.dataset.coverPath));
  }
  let playerStatusText = '';
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
    $('player-status').textContent = text && text!==BUFFERING_STATUS ? ' · ' + text : '';
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
      let response,fromCache=false;
      if(cached && age<cacheTtl){response=cached;fromCache=true;}
      else {
        try{
          response=await fetch(resource.url,{signal:controller.signal,cache:force?'reload':'no-cache'});
        }catch(error){
          if(controller.signal.aborted)throw error;
          if(cached?.ok){response=cached;fromCache=true;}else throw error;
        }
      }
      if(controller.signal.aborted){if(controller.signal.reason==='timeout')throw Error('timeout');return;}
      if(request!==lyricRequest||generation!==lyricGeneration||current?.id!==track.id)return;
      if(response.status===404){
        lyricState='not-found';lyricLoadedAt=fromCache?Date.now()-age:Date.now();lyricMessage('暂无歌词');
        if(!fromCache)await storeLyric(cache,resource,'',404,controller,generation);
        return;
      }
      if(!response.ok)throw Error('HTTP '+response.status);
      const text=await response.text();
      if(controller.signal.aborted){if(controller.signal.reason==='timeout')throw Error('timeout');return;}
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
    if(repeat !== 'all' || current?.id !== track.id || !('caches' in window))return;
    const index=queue.findIndex(item=>item.id===track.id);
    const next=index>=0 && queue.length>1 ? queue[(index+1)%queue.length] : null;
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
  const get = id => tracks.find(t => t.id === id);
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
  function openTrackMenu(button) {
    if (moreButton === button && !moreMenu.hidden) { closeTrackMenu(true); return; }
    closeTrackMenu();
    moreButton = button;
    moreTrackId = button.dataset.more;
    button.setAttribute('aria-expanded','true');
    (button.closest('#full-player') || document.body).append(moreMenu);
    moreMenu.hidden = false;
    const rect = button.getBoundingClientRect();
    const track=get(moreTrackId);$('menu-album').dataset.trackAlbum=moreTrackId;
    $('menu-album').disabled=!track?.albumKey;
    $('menu-artists').innerHTML=track?artistNames(track.artist).map(name=>`<button type="button" role="menuitem" data-artist-link="${esc(name)}">查看${esc(name)}</button>`).join(''):'';
    moreMenu.style.left = `${Math.max(12,Math.min(rect.right-moreMenu.offsetWidth,innerWidth-moreMenu.offsetWidth-12))}px`;
    const menuHeight=moreMenu.offsetHeight;
    moreMenu.style.top=`${rect.bottom+menuHeight+8>innerHeight?Math.max(12,rect.top-menuHeight-8):rect.bottom+8}px`;
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
  const isFavorite = id => !!id && favorites.has(id);
  function syncFavoriteButtons() {
    for (const button of document.querySelectorAll('[data-like],#now-like,#full-like,#full-like-mobile')) {
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
  function playlistRows(list) {
    return list.map((t,i)=>canPlay(t)?trackRows([t],false,i):`<div class="track-row unavailable"><span class="track-no">${String(i+1).padStart(2,'0')}</span><div class="track-start">${trackCover(t)}<span class="track-copy"><strong>${esc(t.title)}</strong><small>${artistLinks(t.artist)}</small></span></div><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><span class="source-label" title="音源尚未入库">${t.sourceUrl?`<a href="${esc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t.sourceStatus==='purchasable'?'待购入':'外部收听'} ↗</a>`:'待补音源'}</span></div>`).join('');
  }
  const navigationKey='roylyl-music-navigation';
  let navigationDepth=history.state?.[navigationKey]?.depth||0, navigationReady=false;
  function navigationSnapshot(){return {view,album:selected?.key||null,playlist:activePlaylist?.id||null,query:$('search').value,artist:$('artist').value,artistContext,sort:['sort-primary','sort-secondary','sort-direction'].map(id=>$(id).value),collectionSort,scroll:scrollY,depth:navigationDepth};}
  function rememberNavigation(){if(navigationReady)history.replaceState({...history.state,[navigationKey]:navigationSnapshot()},'');}
  function beginNavigation(){rememberNavigation();}
  function finishNavigation(){navigationDepth++;history.pushState({[navigationKey]:navigationSnapshot()},'');if(selected || view==='albums'&&artistContext)$('back-albums').innerHTML=icon('back')+'返回上一页';}
  function restoreNavigation(state){
    if(!state)return;
    view=state.view||'albums';selected=albums.find(a=>a.key===state.album)||null;activePlaylist=appleMusic?.playlists.find(p=>p.id===state.playlist)||null;
    if(view==='playlist'&&!activePlaylist)view='albums';
    artistContext=state.artistContext||null;
    $('search').value=state.query||'';$('artist').value=state.artist||'';collectionSort=state.collectionSort||collectionSort;
    ['sort-primary','sort-secondary','sort-direction'].forEach((id,i)=>{if(state.sort?.[i])$(id).value=state.sort[i];});
    navigationDepth=state.depth||0;render();
    requestAnimationFrame(()=>window.scrollTo({top:state.scroll||0,behavior:'instant'}));
  }
  let scrollSaveTimer;window.addEventListener('scroll',()=>{clearTimeout(scrollSaveTimer);scrollSaveTimer=setTimeout(rememberNavigation,150);},{passive:true});
  window.addEventListener('popstate',event=>{if(navigationReady){if(isFullOpen())closeFull();restoreNavigation(event.state?.[navigationKey]);}});
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
    return list.map((t, i) => {const isPlaying=current?.id===t.id&&!audio.paused&&!pendingTrackId;return `<div class="track-row${isPlaying ? ' current' : ''}" data-track="${esc(t.id)}"><button class="track-no" data-number="${String(i + 1 + offset).padStart(2, '0')}" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${isPlaying ? '♫' : String(i + 1 + offset).padStart(2, '0')}</button><div class="track-start"><button class="track-art-play" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${trackCover(t)}</button><div class="track-copy"><button class="track-title-play" data-play="${esc(t.id)}"><strong>${esc(t.title)}</strong></button><small>${artistLinks(t.artist)}${inQueue ? ' · ' + albumLink(t) : ''}</small></div></div>${albumLink(t,'track-album')}<span class="track-time">${time(t.duration)}</span><button class="icon" disabled title="喜欢状态来自Apple Music" data-like="${esc(t.id)}" aria-label="Apple Music${isFavorite(t.id) ? '已喜欢' : '未喜欢'}：${esc(t.title)}" aria-pressed="${isFavorite(t.id)}">${icon('heart')}</button><button class="icon track-more" type="button" data-more="${esc(t.id)}" aria-label="${esc(t.title)}的更多选项" aria-haspopup="menu" aria-expanded="false">${icon('more')}</button></div>`;}).join('');
  }
  function render() {
    closeTrackMenu();
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
      $('playlist-detail').innerHTML=`<p>歌单来自Apple Music与本地曲库 · ${all.length}首</p><button id="play-playlist" class="primary" ${playable.length?'':'disabled'}>${icon('play')}顺序播放</button><small>更新于${esc(new Date(appleMusic.updatedAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}))}</small>`;
      $('play-playlist').onclick=()=>playAlbum({tracks:playable});
      $('songs').innerHTML=playlistRows(rows);hydrateCovers($('songs'));$('songs')._tracks=rows.filter(canPlay);$('result-count').textContent=rows.length+'首歌曲';$('empty').hidden=rows.length>0;renderCurrent();return;
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
      $('albums').innerHTML = visible.map(a => `<article class="album-card"><div class="art"><button class="album-cover-open" data-album="${esc(a.key)}" aria-label="查看${esc(a.title)}，${a.tracks.length}首"><img src="./placeholder.svg" data-cover-path="${esc(a.tracks[0].cover)}" alt="${esc(a.title)}封面" loading="lazy" width="240" height="240"></button><button class="open-album" data-album-play="${esc(a.key)}" aria-label="顺序播放${esc(a.title)}">${icon('play')}</button></div><h3><button class="album-title-open" data-album="${esc(a.key)}">${esc(a.title)}</button></h3><p><span class="year">${a.year || '年份待核'}</span>${artistLinks(a.artist,true)}</p><p>${a.tracks.length}首 · ${a.key.startsWith('live/') ? '现场录音' : a.key.startsWith('collections/') ? '精选合集' : '专辑 / 单曲'}</p></article>`).join('');
      hydrateCovers($('albums'));
      $('result-count').textContent = visible.length + '张专辑'; shown = visible.length;
    } else {
      const rows = selected ? selected.tracks.filter(t=>list.some(s=>s.id===t.id)) : [...list].sort(compareItems);
      $('songs').innerHTML = trackRows(rows); hydrateCovers($('songs')); $('songs')._tracks = rows;
      $('result-count').textContent = rows.length + '首歌曲'; shown = rows.length;
    }
    $('empty').hidden = shown > 0; renderCurrent();
  }
  function playAlbum(album) {
    if(!album?.tracks.length)return;
    repeat='all'; updateModeControls();
    if(current?.id===album.tracks[0].id && audio.readyState>0)audio.currentTime=0;
    play(album.tracks[0],album.tracks);
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
    $('now-like').disabled = true; $('now-like').title='喜欢状态来自Apple Music'; $('full-like').disabled=true; $('full-like').title='喜欢状态来自Apple Music'; $('full-like-mobile').disabled=true; $('full-like-mobile').title='喜欢状态来自Apple Music';
    syncFavoriteButtons();
    document.querySelectorAll('.track-row').forEach(el => el.classList.toggle('current', el.dataset.track === current?.id && !audio.paused && !pendingTrackId));
    if (!$('queue-panel').hidden || !$('full-queue').hidden) renderQueue();
    document.querySelectorAll('.track-row[data-track] .track-no').forEach(button=>{const row=button.closest('.track-row');button.textContent=row.dataset.track===current?.id&&!audio.paused&&!pendingTrackId?'♫':button.dataset.number||button.textContent;});
  }
  function renderQueue() { const signature=queue.map(t=>t.id).join('\n');if(queueSignature===signature && $('queue-list').childElementCount)return;queueSignature=signature;const rows = queue.length ? trackRows(queue, true) : '<p class="muted">播放一首歌曲后，队列会显示在这里。</p>'; $('queue-list').innerHTML = rows; $('full-queue-list').innerHTML = rows; hydrateCovers($('queue-list')); hydrateCovers($('full-queue-list')); }
  function like() { status('喜欢状态来自Apple Music，请在Apple Music中更新后重新导入。'); }
  function setCurrent(t) {
    current = t; bindCover($('now-cover'),t.cover,true); $('now-title').textContent = t.title; $('now-artist').textContent = t.artist + ' · ' + t.album;
    sendAudioConfig();
    $('duration').textContent = time(t.duration); $('elapsed').textContent = '0:00'; $('seek').value = 0; $('seek').disabled = true;
    if ('mediaSession' in navigator && 'MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({title:t.title,artist:t.artist,album:t.album,artwork:[{src:picture(t)}]});
    registerMediaActions();
    renderCurrent();
  }
  function preloadNext() {
    if(!preloadAllowed()||!audioBudget()||!current || pendingTrackId || repeat!=='all' || audio.paused)return;
    const index=queue.findIndex(t=>t.id===current.id), next=queue.length>1?queue[(index+1)%queue.length]:null;
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
  const playbackLog=[];
  function tracePlayback(event,detail='') {
    playbackLog.push({at:new Date().toISOString(),event,detail,track:current?.id||null,position:audio.currentTime,paused:audio.paused,readyState:audio.readyState,networkState:audio.networkState,error:audio.error?.code||0,session:navigator.audioSession?.state||'unavailable',pending:pendingTrackId,blocked:playbackBlocked,hidden:document.hidden});
    if(playbackLog.length>60)playbackLog.shift();
  }
  $('copy-playback-diagnostics').onclick=async()=>{
    const text=JSON.stringify({version:'20260929-pwa-12',browser:navigator.userAgent,standalone:!!navigator.standalone||matchMedia('(display-mode: standalone)').matches,events:playbackLog},null,2);
    try{await navigator.clipboard.writeText(text);$('playback-diagnostics-status').textContent='播放诊断已复制';}
    catch{const box=$('playback-diagnostics-text');box.hidden=false;box.value=text;box.focus();box.select();$('playback-diagnostics-status').textContent='请复制下方诊断内容';}
  };
  function playbackControl() {
    if(playbackBlocked||audio.error||audio.ended)return {icon:'play',label:'播放',system:current?'paused':'none'};
    if(pendingTrackId)return {icon:'pause',label:'取消加载',system:audio.paused?'paused':'playing'};
    return {icon:audio.paused?'play':'pause',label:audio.paused?'播放':'暂停',system:current?(audio.paused?'paused':'playing'):'none'};
  }
  function syncPlaybackState() {
    if('mediaSession' in navigator)navigator.mediaSession.playbackState=playbackControl().system;
  }
  function pausePlayback() {
    tracePlayback('pause-request');
    playbackBlocked=true;
    rememberPausedPosition();
    ++playToken;pendingTrackId=null;audio.pause();status('');renderCurrent();
    syncPlaybackState();
  }
  function resumePlayback() {
    tracePlayback('system-play');
    // A system play action is explicit intent, not a play/pause toggle. Do not
    // let an interrupted or unresolved play promise block this new attempt.
    if(current)return play(current,queue,true,true);
  }
  function rememberPausedPosition() {
    if(current&&loadedTrackId===current.id&&Number.isFinite(audio.currentTime)) {
      pausedPosition={id:current.id,time:audio.currentTime};
      save('last',pausedPosition);
    }
  }
  function handleAudioStart() {
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
    // Internal source replacement may be awaiting cache lookup; it is not an
    // interruption of the currently loaded recording.
    if(current&&loadedTrackId===current.id&&audio.getAttribute('src')) {
      if(!audio.ended){playbackBlocked=true;rememberPausedPosition();}
      ++playToken;pendingTrackId=null;
      if(playerStatusText===BUFFERING_STATUS)status('');
    }
    renderCurrent();
    syncPlaybackState();
  }
  async function play(t, list = queue, fromHistory = false, immediate = false) {
    if (!canPlay(t)) return;
    playbackBlocked=false;
    if (!persistenceRequested && navigator.storage?.persist) { persistenceRequested = true; navigator.storage.persist().then(updateCacheStatus).catch(()=>{}); }
    const token=++playToken;playbackRequestedAt=performance.now();
    tracePlayback('play-request');
    try { if(navigator.audioSession)navigator.audioSession.type='playback'; } catch {}
    if(list?.length)queue=list.filter(canPlay);
    if(!queue.some(x=>x.id===t.id))queue=[t];
    if(current?.id===t.id && typeof preloadNextLyrics === 'function')preloadNextLyrics(t);
    if(!fromHistory && playbackHistory[historyCursor]!==t.id){playbackHistory=playbackHistory.slice(0,historyCursor+1);playbackHistory.push(t.id);historyCursor=playbackHistory.length-1;}
    const source=audioSource(t),recover=failedAudioSources.has(source)&&navigator.onLine!==false;
    cancelPreload(source);
    if(recover&&!navigator.serviceWorker?.controller&&typeof caches!=='undefined')caches.open(AUDIO_CACHE).then(cache=>cache.delete(source)).catch(()=>{});
    if(recover || loadedTrackId!==t.id || !audio.getAttribute('src') || audio.error){
      pendingTrackId=t.id;loadedTrackId=null;fallbackCachedId=null;
      if(!immediate){audio.pause();audio.removeAttribute('src');audio.load();}
      setCurrent(t);status(BUFFERING_STATUS);renderCurrent();
      // Background transitions must reach play() in the same ended/media-session task.
      let cached=preparedAudio.get(source)||null;preparedAudio.delete(source);releasePrepared();
      if(recover&&cached){URL.revokeObjectURL(cached);cached=null;}
      if(!recover && !cached && !immediate && !navigator.serviceWorker?.controller)cached=await cachedAudioUrl(source);
      if(token!==playToken){if(cached)URL.revokeObjectURL(cached);return;}
      const previousUrl=localAudioUrl;localAudioUrl=cached;
      audio.src=recover?source+'&recovery='+Date.now()+'-'+token:cached||source;loadedTrackId=t.id;
      if(previousUrl)URL.revokeObjectURL(previousUrl);
    }
    pendingTrackId=t.id;status(BUFFERING_STATUS);renderCurrent();
    try {
      await audio.play();
      tracePlayback('play-resolved',token===playToken?'current':'superseded');
      if(token!==playToken)return;
      failedAudioSources.delete(source);pendingTrackId=null;status('');save('last',{id:t.id,time:audio.currentTime});renderCurrent();
      if(typeof preloadNextLyrics==='function')preloadNextLyrics(t);
      if(audioBudget())cacheAudio(source).then(ok=>{if(ok&&token===playToken)preloadNext();});
    } catch(error) {
      tracePlayback('play-rejected',error.name+': '+error.message);
      if(token!==playToken)return;
      pendingTrackId=null;
      if(!['NotAllowedError','AbortError'].includes(error.name))failedAudioSources.add(source);
      status(error.name==='NotAllowedError'?'请再次点击播放，允许浏览器开始播放。':error.name==='AbortError'?'':!navigator.onLine?'当前离线，这首歌曲尚未完整缓存。':'音频加载失败，点击播放将尝试重新读取音源。');renderCurrent();
    }
  }
  function advance(direction, ended = false) {
    if(ended&&playbackBlocked)return;
    if(!queue.length)return;
    if(ended&&repeat==='one'){audio.currentTime=0;play(current,queue,true,true);return;}
    if(repeat==='shuffle'){
      if(direction<0){if(historyCursor>0){historyCursor--;play(get(playbackHistory[historyCursor]),queue,true,true);}return;}
      if(historyCursor<playbackHistory.length-1){historyCursor++;play(get(playbackHistory[historyCursor]),queue,true,true);return;}
      const candidates=queue.filter(t=>t.id!==current?.id);play(candidates.length?candidates[Math.floor(Math.random()*candidates.length)]:current,queue,false,true);return;
    }
    const index=queue.findIndex(t=>t.id===current?.id);play(queue[(index+direction+queue.length)%queue.length],queue,false,true);
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
  $('repeat').onclick = () => { repeat=({all:'shuffle',shuffle:'one',one:'all'})[repeat];cancelPreload();updateModeControls();if(current){preloadNextLyrics(current);cachedAudioUrl(audioSource(current)).then(blob=>{if(blob){URL.revokeObjectURL(blob);preloadNext();}});} };
  $('now-like').onclick = () => current && like(current.id);
  $('seek').oninput = () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number($('seek').value)/100*audio.duration; updateLyricPosition(true); };
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
  function toggleQueue(open) { $('queue-panel').hidden=!open; for(const id of ['queue-toggle','mobile-queue-toggle'])$(id).setAttribute('aria-expanded',String(open)); if (open) { renderQueue(); $('close-queue').focus(); } else (matchMedia('(max-width:700px)').matches?$('mobile-queue-toggle'):$('queue-toggle')).focus(); }
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
    const row=e.target.closest('.track-row[data-track]');
    if(matchMedia('(max-width:700px)').matches && row && !e.target.closest('button,a,input,select')){
      const inQueue=row.closest('#queue-list,#full-queue-list');
      play(get(row.dataset.track),inQueue?queue:$('songs')._tracks);return;
    }
    const artistLink=e.target.closest('[data-artist-link]'), albumLink=e.target.closest('[data-track-album]');
    if(artistLink || albumLink){
      const album=albumLink && albums.find(a=>a.key===get(albumLink.dataset.trackAlbum)?.albumKey);
      if(albumLink && !album)return;
      if(isFullOpen())closeFull();
      if(!$('queue-panel').hidden)toggleQueue(false);
      closeTrackMenu();
      if(album)openAlbum(album);
      else {
        openArtist(artistLink.dataset.artistLink);
      }
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
  let pressedRowTimer, pressedRow=null;
  document.addEventListener('pointerdown',e=>{
    if(!matchMedia('(max-width:700px)').matches)return;
    const row=e.target.closest('.track-row[data-track]');
    if(!row||e.target.closest('a,input,select,[data-more],[data-like],[data-track-album],[data-artist-link]'))return;
    clearTimeout(pressedRowTimer);
    document.querySelectorAll('.track-row.is-pressed').forEach(item=>item.classList.remove('is-pressed'));
    pressedRow=row; row.classList.add('is-pressed');
  },{passive:true});
  const releasePressedRow=()=>{
    if(pressedRow){const row=pressedRow;pressedRow=null;clearTimeout(pressedRowTimer);pressedRowTimer=setTimeout(()=>row.classList.remove('is-pressed'),150);}
  };
  document.addEventListener('pointerup',releasePressedRow,{passive:true});
  document.addEventListener('pointercancel',releasePressedRow,{passive:true});
  moreMenu.addEventListener('keydown',event=>{
    const items=[...moreMenu.querySelectorAll('button:not(:disabled)')],index=items.indexOf(document.activeElement);
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
    if(e.key==='Escape'&&!moreMenu.hidden){e.preventDefault();e.stopPropagation();closeTrackMenu(true);return;}
    if(e.key==='Escape'&&!$('full-queue').hidden){e.preventDefault();e.stopPropagation();toggleFullQueue(false);return;}
    else if(e.key==='Escape'&&!$('queue-panel').hidden)toggleQueue(false);
    if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)||e.target.isContentEditable)return;
    if($('settings-dialog').open)return;
    if(e.key==='/'&&isFullOpen())return;
    if(e.key==='/'){e.preventDefault();$('search').focus();}
    if(e.code==='Space'){e.preventDefault();$('play').click();}
  });
  audio.addEventListener('loadedmetadata',()=>{$('seek').disabled=!Number.isFinite(audio.duration);$('duration').textContent=time(audio.duration);updateFull();registerMediaActions();});
  audio.addEventListener('timeupdate',()=>{
    $('elapsed').textContent=time(audio.currentTime); $('full-elapsed').textContent=time(audio.currentTime); $('full-seek').value=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration*100:0; if(Number.isFinite(audio.duration)&&audio.duration>0)$('seek').value=audio.currentTime/audio.duration*100;
    updateLyricPosition();
    for(const id of ['seek','full-seek']){$(id).setAttribute('aria-valuetext',time(audio.currentTime)+' / '+time(Number.isFinite(audio.duration)?audio.duration:current?.duration));}
    if(current&&Date.now()-lastSaved>5000){save('last',{id:current.id,time:audio.currentTime});lastSaved=Date.now();}
    if('mediaSession'in navigator&&navigator.mediaSession.setPositionState&&Number.isFinite(audio.duration)&&audio.duration>0){try{navigator.mediaSession.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate,position:Math.min(audio.currentTime,audio.duration)});}catch{}}
  });
  audio.addEventListener('play',()=>{if(!handleAudioStart())return;renderCurrent();registerMediaActions();});
  audio.addEventListener('waiting',()=>{if(!audio.paused)status(BUFFERING_STATUS);});
  audio.addEventListener('pause',handleAudioPause);
  audio.addEventListener('playing',()=>{
    tracePlayback('audio-playing');
    if(!handleAudioStart())return;
    if(audio.paused)return;
    pendingTrackId=null;status('');renderCurrent();
    syncPlaybackState();
  });
  // AudioSession is optional. Never auto-resume on 'active': that could fight
  // another app or undo the user's pause. The next system play acts directly.
  navigator.audioSession?.addEventListener('statechange',()=>{
    tracePlayback('session-statechange');
    if(navigator.audioSession.state==='interrupted')pausePlayback();
  });
  audio.addEventListener('error',()=>{if(!audio.getAttribute('src'))return;if(current)failedAudioSources.add(audioSource(current));pendingTrackId=null;status(!navigator.onLine?'当前离线，这首歌曲尚未完整缓存。':'音频加载失败，点击播放将尝试重新读取音源。');renderCurrent();});
  audio.addEventListener('progress',()=>{
    if(navigator.serviceWorker?.controller || !current || !Number.isFinite(audio.duration))return;
    for(let i=0;i<audio.buffered.length;i++)if(audio.buffered.start(i)===0 && audio.buffered.end(i)>=audio.duration-.1){
      const id=current.id;if(fallbackCachedId===id)return;fallbackCachedId=id;
      cacheAudio(audioSource(current)).then(ok=>{if(ok&&current?.id===id)preloadNext();});break;
    }
  });
  let fallbackCachedId=null;
  audio.addEventListener('ended',()=>advance(1,true));
  function registerMediaActions() {
    if (!('mediaSession' in navigator)) return;
    const handlers = {
      seekbackward: null, seekforward: null,
      play: resumePlayback,
      pause: () => {tracePlayback('system-pause');pausePlayback();},
      previoustrack: () => advance(-1),
      nexttrack: () => advance(1),
      seekto: e => { if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(e.seekTime, audio.duration); }
    };
    for (const [name, handler] of Object.entries(handlers)) {
      try { navigator.mediaSession.setActionHandler(name, handler); } catch {}
    }
  }
  document.addEventListener('visibilitychange',()=>{if(current){registerMediaActions();if(navigator.audioSession?.state==='interrupted')pausePlayback();else if(playbackBlocked)handleAudioStart();else if(audio.paused)handleAudioPause();}if(!document.hidden&&current){loadLyrics(current);updateLyricPosition(true);}});
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
    $('quality-badges').innerHTML=badges.map(value=>`<span class="quality-badge">${esc(value)}</span>`).join('');
    $('quality-badges').title=$('quality').title;
    const details=[['格式',format],['码率',p.bitRate?bitrate:'未记录'],['采样率',p.sampleRate?rate:'未记录'],...(!lossy&&p.bitDepth?[['量化位深',depth]]:[]),['声道',p.channels===2?'双声道':p.channels===1?'单声道':p.channels?String(p.channels):'未记录'],['文件大小',p.fileSize?formatBytes(p.fileSize):'未记录']];
    $('audio-details').innerHTML=details.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
    const control=playbackControl();
    setIcon('full-play',control.icon); $('full-play').setAttribute('aria-label',control.label);
    updateLoadingIndicator();
    syncFavoriteButtons();
    updateModeControls();
    $('full-duration').textContent=time(Number.isFinite(audio.duration)?audio.duration:current.duration);
    $('full-seek').disabled=!Number.isFinite(audio.duration);
    $('full-elapsed').textContent=time(audio.currentTime); $('full-status').textContent=playerStatusText && playerStatusText!==BUFFERING_STATUS ? playerStatusText : '';
    loadLyrics(current);
  }
  function openFull() {
    if(!current)return; updateFull();
    if(!isFullOpen()){
      if(typeof full.showModal==='function')full.showModal();
      else {full.classList.add('dialog-fallback-open');document.body.classList.add('full-open');}
    }
    document.body.classList.add('full-open');
    if(full.requestFullscreen&&!document.fullscreenElement)full.requestFullscreen().catch(()=>{});
    requestAnimationFrame(() => scrollActiveLyric(false));
  }
  function closeFull() {
    toggleFullQueue(false);
    if(!isFullOpen())return;
    if(typeof full.close==='function')full.close();
    else {full.classList.remove('dialog-fallback-open');document.body.classList.remove('full-open');closeTrackMenu();if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});$('open-full').focus();}
  }
  function toggleFullQueue(open) { const wasOpen=!$('full-queue').hidden; $('full-queue').hidden=!open; $('full-queue-toggle').setAttribute('aria-expanded',String(open)); if(open){renderQueue();$('full-queue-close').focus();}else if(wasOpen)$('full-queue-toggle').focus(); }
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
  let shareNoticeTimer;
  $('full-share').onclick=async()=>{
    if(!current)return;
    const button=$('full-share'),notice=$('full-share-status');
    button.disabled=true;notice.hidden=true;clearTimeout(shareNoticeTimer);
    try{await shareTrack(current,message=>{notice.textContent=message;notice.hidden=false;shareNoticeTimer=setTimeout(()=>{notice.hidden=true;},4000);});}
    finally{button.disabled=false;}
  };
  $('full-queue-close').onclick=()=>toggleFullQueue(false);
  full.addEventListener('close',()=>{closeTrackMenu();toggleFullQueue(false);document.body.classList.remove('full-open');if(document.fullscreenElement===full)document.exitFullscreen().catch(()=>{});$('open-full').focus();});
  $('open-full').onclick=openFull; $('quality').onclick=openFull; $('close-full').onclick=closeFull;
  for(const [button,target] of [['full-play','play'],['full-prev','prev'],['full-next','next'],['full-like','now-like'],['full-like-mobile','now-like'],['full-repeat','repeat']])$(button).onclick=()=>$(target).click();
  $('full-seek').oninput=()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number($('full-seek').value)/100*audio.duration;updateLyricPosition(true);};

  async function load() {
    $('retry').hidden=true; $('notice').hidden=false; $('notice').textContent='正在载入音乐收藏…';let data;
    const catalogController=new AbortController(),catalogTimer=setTimeout(()=>catalogController.abort(),15000);
    try {
      const response=await fetch('./data/catalog.json?v=20260929-pwa-12',{cache:'no-cache',signal:catalogController.signal});
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
    if(!current){const last=read('last',{}),t=get(last?.id);if(t){queue=albums.find(a=>a.tracks.some(x=>x.id===t.id)).tracks;setCurrent(t);const restore=()=>{if(current?.id===t.id&&Number.isFinite(audio.duration)&&last.time>0)audio.currentTime=Math.min(last.time,audio.duration-1);};audio.addEventListener('loadedmetadata',restore,{once:true});}}
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
