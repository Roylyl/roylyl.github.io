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
  $('settings-dialog').addEventListener('click',event=>{if(event.target===$('settings-dialog'))$('settings-dialog').close();});
  document.querySelectorAll('input[name="theme"]').forEach(input=>input.onchange=()=>{
    try{localStorage.setItem('roylyl-music-theme',input.value);}catch{}
    applyTheme(input.value);
  });
  const audio = $('audio');
  const AUDIO_CACHE = 'roylyl-music-audio-v1';
  const COVER_CACHE = 'roylyl-music-covers-v1';
  const audioCacheStatus = $('audio-cache-status'), coverCacheStatus = $('cover-cache-status');
  let audioCacheGeneration = 0, coverCacheGeneration = 0, cacheDownload = Promise.resolve(), localAudioUrl = null, persistenceRequested = false;
  async function updateCacheStatus() {
    if (!('caches' in window)) {
      audioCacheStatus.textContent = coverCacheStatus.textContent = '此浏览器不支持本地缓存。';
      $('clear-audio-cache').disabled = $('clear-cover-cache').disabled = true;
      return;
    }
    try {
      const [audioCache, coverCache] = await Promise.all([caches.open(AUDIO_CACHE), caches.open(COVER_CACHE)]);
      const [audioKeys, coverKeys] = await Promise.all([audioCache.keys(), coverCache.keys()]);
      const persistent = await navigator.storage?.persisted?.();
      const storage = persistent ? ' · 已启用持久存储' : ' · 受浏览器存储空间限制';
      audioCacheStatus.textContent = `已缓存${audioKeys.length}首歌曲${storage}`;
      coverCacheStatus.textContent = `已缓存${coverKeys.length}张专辑封面${storage}`;
    } catch { audioCacheStatus.textContent = coverCacheStatus.textContent = '无法读取本地缓存。'; }
  }
  async function cacheAudio(source) {
    if (!('caches' in window)) return false;
    const generation = audioCacheGeneration;
    cacheDownload = cacheDownload.catch(()=>{}).then(async () => {
      const cache = await caches.open(AUDIO_CACHE);
      if (await cache.match(source)) return true;
      const response = await fetch(source);
      if (!response.ok || !response.body || response.status !== 200) return false;
      if (generation !== audioCacheGeneration) return false;
      await cache.put(source, response);
      if (generation !== audioCacheGeneration) { await caches.delete(AUDIO_CACHE); return false; }
      updateCacheStatus();
      return true;
    }).catch(() => { audioCacheStatus.textContent = '缓存未完成，播放仍可继续。'; return false; });
    return cacheDownload;
  }
  async function cachedAudioUrl(source) {
    if (!('caches' in window)) return null;
    try { const response = await (await caches.open(AUDIO_CACHE)).match(source); return response ? URL.createObjectURL(await response.blob()) : null; }
    catch { return null; }
  }
  document.querySelectorAll('[data-open-settings]').forEach(button=>button.addEventListener('click',updateCacheStatus));
  for (const [buttonId,cacheName,statusElement,invalidate,done] of [
    ['clear-audio-cache',AUDIO_CACHE,audioCacheStatus,()=>audioCacheGeneration++,'音乐缓存已清理'],
    ['clear-cover-cache',COVER_CACHE,coverCacheStatus,()=>{coverCacheGeneration++;coverUrls.clear();},'专辑封面缓存已清理']
  ]) $(buttonId).onclick = async () => {
    invalidate();
    $(buttonId).disabled = true;
    statusElement.textContent = '正在清理…';
    try { await caches.delete(cacheName); statusElement.textContent = done; }
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
  let appleMusic=null, activePlaylist=null, appleError=false;
  let tracks = [], albums = [], view = 'albums', selected = null, current = null, queue = [], repeat = 'all', playToken = 0, lastSaved = 0;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const time = n => { n = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0; return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); };
  const url = path => ROOT + path.split('/').map(encodeURIComponent).join('/');
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
        const local = URL.createObjectURL(await response.blob());
        coverUrls.set(path,local);
        document.querySelectorAll('img[data-cover-bound]').forEach(img => {
          if (img.dataset.coverBound === path && img.getAttribute('src') !== local) {
            coverObserver?.unobserve(img);
            img.src = local;
          }
        });
        return local;
      } catch { return source; }
      finally { coverRequests.delete(path); }
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
  const status = text => { playerStatusText = text; $('player-status').textContent = text ? '·' + text : ''; $('full-status').textContent = text; };
  function filtered() {
    const q = normalize($('search').value.trim()), artist = $('artist').value;
    return tracks.filter(t => (!artist || t.artist === artist) && (!q || normalize(t.title + ' ' + t.artist + ' ' + t.album).includes(q)) && (view !== 'favorites' || favorites.has(t.id)));
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
    moreMenu.style.left = `${Math.max(12,Math.min(rect.right-moreMenu.offsetWidth,innerWidth-moreMenu.offsetWidth-12))}px`;
    moreMenu.style.top = `${rect.bottom+moreMenu.offsetHeight+8>innerHeight ? Math.max(12,rect.top-moreMenu.offsetHeight-8) : rect.bottom+8}px`;
    $('share-track').focus({preventScroll:true});
  }
  async function shareTrack(t) {
    if (!t) return;
    const link = `https://roylyl.github.io/music/share/${encodeURIComponent(t.id)}.html`;
    const data = {title:`${t.title} - ${t.artist}`,text:'来自Roylyl的私人音乐仓库。',url:link};
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(link); status('分享链接已复制'); }
    catch { window.prompt('复制歌曲分享链接',link); }
  }
  const isFavorite = id => !!id && favorites.has(id);
  function syncFavoriteButtons() {
    for (const button of document.querySelectorAll('[data-like],#now-like,#full-like,#full-like-mobile')) {
      const id = button.dataset.like || current?.id;
      const liked = isFavorite(id);
      button.setAttribute('aria-pressed', String(liked));
      button.setAttribute('aria-label', `Apple Music${liked ? '已喜欢' : '未喜欢'}${button.dataset.like ? '：' + (get(id)?.title || '') : ''}`);
    }
  }
  const canPlay = t => !!t?.src;
  function playlistTracks(ids) {
    return ids.map(id=>{const e=appleMusic.entries[id],t=get(e.trackId);return {...(t||{}),id:t?.id||'apple:'+id,appleId:id,title:e.title,artist:e.artist,album:e.album,year:t?.year||e.year||0,duration:t?.duration||e.duration,src:t?.src||'',sourceStatus:e.sourceStatus,sourceUrl:e.sourceUrl};});
  }
  function playlistRows(list) {
    return list.map((t,i)=>canPlay(t)?trackRows([t]).replace('>01</button>', '>'+String(i+1).padStart(2,'0')+'</button>'):`<div class="track-row unavailable"><span class="track-no">${String(i+1).padStart(2,'0')}</span><div class="track-start"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}</small></div><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><span class="source-label" title="音源尚未入库">${t.sourceUrl?`<a href="${esc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t.sourceStatus==='purchasable'?'待购入':'外部收听'} ↗</a>`:'待补音源'}</span></div>`).join('');
  }
  function showPlaylist(id) {
    activePlaylist=appleMusic?.playlists.find(p=>p.id===id)||null; if(!activePlaylist)return;
    enterFixedSort();
    view='playlist';selected=null;$('search').value='';$('artist').value='';render();
  }
  function trackRows(list, inQueue = false) {
    return list.map((t, i) => `<div class="track-row${current?.id === t.id ? ' current' : ''}" data-track="${esc(t.id)}"><button class="track-no" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${current?.id === t.id && !audio.paused ? '♫' : String(i + 1).padStart(2, '0')}</button><button class="track-start" data-play="${esc(t.id)}"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}${inQueue ? ' · ' + esc(t.album) : ''}</small></button><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><button class="icon" disabled title="喜欢状态来自Apple Music" data-like="${esc(t.id)}" aria-label="Apple Music${isFavorite(t.id) ? '已喜欢' : '未喜欢'}：${esc(t.title)}" aria-pressed="${isFavorite(t.id)}">${icon('heart')}</button><button class="icon track-more" type="button" data-more="${esc(t.id)}" aria-label="${esc(t.title)}的更多选项" aria-haspopup="menu" aria-expanded="false">${icon('more')}</button></div>`).join('');
  }
  function render() {
    closeTrackMenu();
    const list = filtered();
    const showCollectionIntro = view === 'albums' && !selected;
    $('intro').hidden = !showCollectionIntro;
    $('feature').hidden = !showCollectionIntro || !albums.length;
    $('fav-count').textContent = appleMusic?appleMusic.favorites.length:'—';
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === view); b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'); });
    const fixedView=view==='playlist'||view==='favorites';
    document.querySelectorAll('[data-playlist]').forEach(b=>b.classList.toggle('active',view==='playlist'&&b.dataset.playlist===activePlaylist?.id));
    updateSortControls();
    $('playlist-detail').hidden=!fixedView;
    if(fixedView) {
      $('albums').hidden=true;$('songs').hidden=false;$('album-detail').hidden=true;
      $('view-title').textContent=view==='favorites'?'我喜欢':activePlaylist.name;
      if(!appleMusic){$('playlist-detail').textContent=appleError?'Apple Music歌单加载失败，请刷新页面重试。':'正在读取Apple Music歌单…';$('songs').innerHTML='';$('result-count').textContent='';$('empty').hidden=true;return;}
      const ids=view==='favorites'?appleMusic.favorites:activePlaylist.entries;
      const all=playlistTracks(ids),q=normalize($('search').value.trim()),ar=$('artist').value;
      const ordered=$('sort-primary').value==='default'?all:[...all].sort(compareItems);
      const rows=ordered.filter(t=>(!ar||t.artist===ar)&&(!q||normalize(t.title+' '+t.artist+' '+t.album).includes(q)));
      const playable=ordered.filter(canPlay);
      $('playlist-detail').innerHTML=`<p>歌单导入自Apple Music · ${all.length}首</p><button id="play-playlist" class="primary" ${playable.length?'':'disabled'}>${icon('play')}顺序播放</button><small>更新于${esc(new Date(appleMusic.updatedAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}))}</small>`;
      $('play-playlist').onclick=()=>playAlbum({tracks:playable});
      $('songs').innerHTML=playlistRows(rows);$('songs')._tracks=rows.filter(canPlay);$('result-count').textContent=rows.length+'首歌曲';$('empty').hidden=rows.length>0;renderCurrent();return;
    }
    $('view-title').textContent = selected ? selected.title : ({albums:'专辑收藏',songs:'全部歌曲',favorites:'我的喜欢'})[view];
    $('albums').hidden = view !== 'albums' || !!selected;
    $('songs').hidden = view === 'albums' && !selected;
    $('album-detail').hidden = !selected;
    if (selected) {
      $('album-detail').innerHTML = `<button class="back" id="back-albums">${icon('back')}返回专辑收藏</button><div class="detail-heading"><img src="./placeholder.svg" data-cover-path="${esc(selected.tracks[0].cover)}" alt="${esc(selected.title)}封面"><div><h3>${esc(selected.title)}</h3><p>${esc(selected.artist)} · ${selected.tracks.length}首</p><button class="primary" id="play-selected">${icon('play')}播放专辑</button></div></div>`;
      hydrateCovers($('album-detail'));
      $('back-albums').onclick = () => { selected = null; render(); };
      $('play-selected').onclick = () => playAlbum(selected);
    }
    let shown;
    if (view === 'albums' && !selected) {
      const allowed = new Set(list.map(t => t.id));
      const visible = albums.filter(a => a.tracks.some(t => allowed.has(t.id)));
      visible.sort(compareItems);
      $('albums').innerHTML = visible.map(a => `<article class="album-card"><div class="art"><button class="album-cover-open" data-album="${esc(a.key)}" aria-label="查看${esc(a.title)}，${a.tracks.length}首"><img src="./placeholder.svg" data-cover-path="${esc(a.tracks[0].cover)}" alt="${esc(a.title)}封面" loading="lazy" width="240" height="240"></button><button class="open-album" data-album-play="${esc(a.key)}" aria-label="顺序播放${esc(a.title)}">${icon('play')}</button></div><h3><button class="album-title-open" data-album="${esc(a.key)}">${esc(a.title)}</button></h3><p><span class="year">${a.year || '年份待核'}</span>${esc(a.artist)}</p><p>${a.tracks.length}首 · ${a.key.startsWith('live/') ? '现场录音' : a.key.startsWith('collections/') ? '精选合集' : '专辑 / 单曲'}</p></article>`).join('');
      hydrateCovers($('albums'));
      $('result-count').textContent = visible.length + '张专辑'; shown = visible.length;
    } else {
      const rows = selected ? selected.tracks.filter(t=>list.some(s=>s.id===t.id)) : [...list].sort(compareItems);
      $('songs').innerHTML = trackRows(rows); $('songs')._tracks = rows;
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
    if(!album)return;leaveFixedSort();view='albums'; selected=album; $('search').value=''; $('artist').value=''; render();
    $('album-detail').scrollIntoView({block:'start',behavior:'smooth'});
    $('back-albums').focus({preventScroll:true});
  }
  function renderCurrent() {
    updateFull();
    setIcon('play',audio.paused?'play':'pause'); $('play').setAttribute('aria-label', audio.paused ? '播放' : '暂停');
    $('now-like').disabled = true; $('now-like').title='喜欢状态来自Apple Music'; $('full-like').disabled=true; $('full-like').title='喜欢状态来自Apple Music'; $('full-like-mobile').disabled=true; $('full-like-mobile').title='喜欢状态来自Apple Music';
    syncFavoriteButtons();
    document.querySelectorAll('.track-row').forEach(el => el.classList.toggle('current', el.dataset.track === current?.id));
    if (!$('queue-panel').hidden || !$('full-queue').hidden) renderQueue();
  }
  function renderQueue() { const rows = queue.length ? trackRows(queue, true) : '<p class="muted">播放一首歌曲后，队列会显示在这里。</p>'; $('queue-list').innerHTML = rows; $('full-queue-list').innerHTML = rows; }
  function like() { status('喜欢状态来自Apple Music，请在Apple Music中更新后重新导入。'); }
  function setCurrent(t) {
    current = t; bindCover($('now-cover'),t.cover,true); $('now-title').textContent = t.title; $('now-artist').textContent = t.artist + ' · ' + t.album;
    $('duration').textContent = time(t.duration); $('elapsed').textContent = '0:00'; $('seek').value = 0; $('seek').disabled = true;
    if ('mediaSession' in navigator && 'MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({title:t.title,artist:t.artist,album:t.album,artwork:[{src:picture(t)}]});
    registerMediaActions();
    renderCurrent();
  }
  async function play(t, list = queue) {
    if (!canPlay(t)) return;
    if (!persistenceRequested && navigator.storage?.persist) { persistenceRequested = true; navigator.storage.persist().then(updateCacheStatus).catch(()=>{}); }
    const token = ++playToken;
    if (list?.length) queue = list.filter(canPlay);
    if (!queue.some(x => x.id === t.id)) queue = [t];
    if (current?.id !== t.id || !audio.getAttribute('src')) {
      setCurrent(t);
      const source = url(t.src), cached = await cachedAudioUrl(source);
      if (token !== playToken) { if (cached) URL.revokeObjectURL(cached); return; }
      const previousUrl = localAudioUrl;
      localAudioUrl = cached;
      audio.src = cached || source;
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      const complete = cached ? Promise.resolve(true) : cacheAudio(source);
      complete.then(ready => {
        if (!ready || token !== playToken || current?.id !== t.id || repeat === 'one' || repeat === 'shuffle') return;
        const index = queue.findIndex(item => item.id === t.id);
        const next = queue.length > 1 && index >= 0 ? queue[(index + 1) % queue.length] : null;
        if (next && next.id !== t.id) cacheAudio(url(next.src));
      });
    }
    status('正在加载音频…');
    try { await audio.play(); if (token === playToken) { status(''); save('last',{id:t.id,time:audio.currentTime}); renderCurrent(); } }
    catch (e) { if (token !== playToken || e.name === 'AbortError') return; status(e.name === 'NotAllowedError' ? '请再次点击播放，允许浏览器开始播放。' : '音频暂时无法加载，请检查网络后点击播放重试。'); renderCurrent(); }
  }
  function advance(direction, ended = false) {
    if (!queue.length) return;
    if (ended && repeat === 'one') { audio.currentTime = 0; play(current); return; }
    let index = queue.findIndex(t => t.id === current?.id);
    if (repeat === 'shuffle' && direction > 0 && queue.length > 1) { const candidates = queue.filter(t => t.id !== current?.id); play(candidates[Math.floor(Math.random()*candidates.length)]); return; }
    index += direction;
    play(queue[(index+queue.length)%queue.length]);
  }
  function previousTrack() { if (audio.currentTime > 3) audio.currentTime = 0; else advance(-1); }
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
    if (!audio.paused) { ++playToken; audio.pause(); return; }
    if (audio.error) { const src = current && url(current.src); if (src) { audio.src=src; audio.load(); } }
    play(current || filtered()[0], queue.length ? queue : filtered());
  };
  $('prev').onclick = previousTrack;
  $('next').onclick = () => advance(1);
  $('repeat').onclick = () => { repeat=({all:'shuffle',shuffle:'one',one:'all'})[repeat]; updateModeControls(); };
  $('now-like').onclick = () => current && like(current.id);
  $('seek').oninput = () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number($('seek').value)/100*audio.duration; };
  const mobileVolume = matchMedia('(max-width:700px)');
  function placeLikeButton() {
    if (mobileVolume.matches) document.querySelector('.now').append($('now-like'));
    else $('next').after($('now-like'));
  }
  placeLikeButton();
  mobileVolume.addEventListener('change',placeLikeButton);
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
    const button=e.target.closest('[data-more]');
    if (button) { openTrackMenu(button); return; }
    if (e.target.closest('#share-track')) { const track=get(moreTrackId); closeTrackMenu(); shareTrack(track); return; }
    if (!moreMenu.hidden) closeTrackMenu();
  });
  window.addEventListener('scroll',()=>{if(!moreMenu.hidden)closeTrackMenu();},true);
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{
    if(b.dataset.view==='favorites')enterFixedSort();else leaveFixedSort();
    view=b.dataset.view;selected=null;activePlaylist=null;render();
  });
  $('fixed-playlists').onclick=e=>{const b=e.target.closest('[data-playlist]');if(b)showPlaylist(b.dataset.playlist);};
  $('search').oninput=render; $('artist').onchange=render;
  for(const id of ['sort-primary','sort-secondary','sort-direction'])$(id).onchange=()=>{updateSortControls();render();};
  updateSortControls();
  document.addEventListener('keydown',e=> {
    if(e.key==='Escape'&&!moreMenu.hidden){closeTrackMenu(true);return;}
    if(e.key==='Escape'&&!$('full-queue').hidden)toggleFullQueue(false);
    else if(e.key==='Escape'&&!$('queue-panel').hidden)toggleQueue(false);
    if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)||e.target.isContentEditable)return;
    if(e.key==='/'){e.preventDefault();$('search').focus();}
    if(e.code==='Space'){e.preventDefault();$('play').click();}
  });
  audio.addEventListener('loadedmetadata',()=>{$('seek').disabled=!Number.isFinite(audio.duration);$('duration').textContent=time(audio.duration);updateFull();registerMediaActions();});
  audio.addEventListener('timeupdate',()=>{
    $('elapsed').textContent=time(audio.currentTime); $('full-elapsed').textContent=time(audio.currentTime); $('full-seek').value=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration*100:0; if(Number.isFinite(audio.duration)&&audio.duration>0)$('seek').value=audio.currentTime/audio.duration*100;
    if(current&&Date.now()-lastSaved>5000){save('last',{id:current.id,time:audio.currentTime});lastSaved=Date.now();}
    if('mediaSession'in navigator&&navigator.mediaSession.setPositionState&&Number.isFinite(audio.duration)&&audio.duration>0){try{navigator.mediaSession.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate,position:Math.min(audio.currentTime,audio.duration)});}catch{}}
  });
  ['play','pause'].forEach(event=>audio.addEventListener(event,()=>{renderCurrent();if('mediaSession'in navigator)navigator.mediaSession.playbackState=audio.paused?'paused':'playing';registerMediaActions();}));
  audio.addEventListener('waiting',()=>{if(!audio.paused)status('正在缓冲...');});
  audio.addEventListener('pause',()=>{if(['正在缓冲...','正在加载音频…'].includes(playerStatusText))status('');}); audio.addEventListener('playing',()=>status(''));
  audio.addEventListener('error',()=>{status('音频暂时无法加载，请检查网络后点击播放重试。');renderCurrent();});
  audio.addEventListener('ended',()=>advance(1,true));
  function registerMediaActions() {
    if (!('mediaSession' in navigator)) return;
    const handlers = {
      play: () => play(current || filtered()[0], queue.length ? queue : filtered()),
      pause: () => audio.pause(),
      previoustrack: () => advance(-1),
      nexttrack: () => advance(1),
      seekto: e => { if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(e.seekTime, audio.duration); }
    };
    for (const [name, handler] of Object.entries(handlers)) {
      try { navigator.mediaSession.setActionHandler(name, handler); } catch {}
    }
  }
  document.addEventListener('visibilitychange',()=>{if(current)registerMediaActions();});
  const full = $('full-player');
  function updateFull() {
    $('open-full').disabled = !current; $('quality').disabled = !current;
    if (!current) return;
    const stored = audioProperties[current.id];
    const p = current.audioProperties || (stored?.src === current.src ? stored : {});
    const format = String(p.codec || current.format || '未知').toUpperCase();
    const lossy = /MP3|AAC|OPUS|VORBIS/.test(format);
    const rate = p.sampleRate ? (p.sampleRate / 1000) + 'kHz' : '未记录';
    const bitrate = p.bitRate ? Math.round(p.bitRate / 1000) + 'kbps' : '未记录';
    const depth = lossy ? '不适用（有损编码）' : p.bitDepth ? p.bitDepth + 'bit' : '未记录';
    $('quality').textContent = [format,bitrate,rate].join(' · ');
    $('quality').title = '格式：'+format+'；码率：'+bitrate+'；采样率：'+rate+(!lossy && p.bitDepth ? '；量化位深：'+depth : '');
    bindCover($('full-cover'),current.cover,true); $('full-title').textContent = current.title;
    $('full-artist').textContent = current.artist; $('full-album').textContent = current.album;
    const details = [['格式',format],['码率',bitrate],['采样率',rate],...(!lossy && p.bitDepth ? [['量化位深',depth]] : []),['声道',p.channels===2?'双声道':p.channels===1?'单声道':p.channels?String(p.channels):'未记录'],['文件大小',p.fileSize?(p.fileSize/1024/1024).toFixed(1)+'MiB':'未记录']];
    $('audio-details').innerHTML=details.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
    setIcon('full-play',audio.paused?'play':'pause'); $('full-play').setAttribute('aria-label',audio.paused?'全屏播放':'全屏暂停');
    syncFavoriteButtons();
    updateModeControls();
    $('full-duration').textContent=time(Number.isFinite(audio.duration)?audio.duration:current.duration);
    $('full-seek').disabled=!Number.isFinite(audio.duration);
    $('full-elapsed').textContent=time(audio.currentTime); $('full-status').textContent=playerStatusText;
  }
  function openFull() {
    if(!current)return; updateFull();
    if(!full.open)full.showModal();
    document.body.classList.add('full-open');
    if(full.requestFullscreen&&!document.fullscreenElement)full.requestFullscreen().catch(()=>{});
  }
  function closeFull() { toggleFullQueue(false); if(full.open)full.close(); }
  function toggleFullQueue(open) { $('full-queue').hidden=!open; $('full-queue-toggle').setAttribute('aria-expanded',String(open)); if(open)renderQueue(); }
  $('full-queue-toggle').onclick=()=>toggleFullQueue($('full-queue').hidden);
  $('full-queue-close').onclick=()=>toggleFullQueue(false);
  full.addEventListener('close',()=>{document.body.classList.remove('full-open');if(document.fullscreenElement===full)document.exitFullscreen().catch(()=>{});$('open-full').focus();});
  $('open-full').onclick=openFull; $('quality').onclick=openFull; $('close-full').onclick=closeFull;
  for(const [button,target] of [['full-play','play'],['full-prev','prev'],['full-next','next'],['full-like','now-like'],['full-like-mobile','now-like'],['full-repeat','repeat']])$(button).onclick=()=>$(target).click();
  $('full-seek').oninput=()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number($('full-seek').value)/100*audio.duration;};

  async function request(source) {
    const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),10000);
    try{const res=await fetch(source,{signal:controller.signal});if(!res.ok)throw Error('HTTP '+res.status);const data=await res.json();if(!Array.isArray(data))throw Error('Invalid catalog');return data;}finally{clearTimeout(timer);}
  }
  async function load() {
    $('retry').hidden=true; $('notice').hidden=false; $('notice').textContent='正在载入音乐收藏…';let data, cached=false;
    try{data=await request(ROOT+'tracks.json');}catch{try{data=await request('./data/tracks.json');cached=true;}catch{$('notice').textContent='音乐库加载失败，请检查网络后重试。';$('retry').hidden=false;return;}}
    tracks=data.filter(t=>t&&typeof t.id==='string'&&typeof t.title==='string'&&safePath(t.src)&&/\.mp3$/i.test(t.src)&&safePath(t.cover)).map(t=>({...t,year:Number(t.src.match(/\/(\d{4}) - /)?.[1])||0}));
    if(!tracks.length){$('notice').textContent='索引里暂时没有可播放的MP3。';$('retry').hidden=false;return;}
    const grouped=new Map(); for(const t of tracks){const key=t.src.slice(0,t.src.lastIndexOf('/'));if(!grouped.has(key))grouped.set(key,{key,title:t.album,artist:t.artist,year:t.year,tracks:[]});grouped.get(key).tracks.push(t);}
    albums=[...grouped.values()];albums.forEach(a=>a.tracks.sort((a,b)=>a.discNumber-b.discNumber||a.trackNumber-b.trackNumber));
    $('artist').innerHTML='<option value="">全部歌手</option>'+[...new Set(tracks.map(t=>t.artist))].sort((a,b)=>a.localeCompare(b,'zh-CN')).map(a=>`<option>${esc(a)}</option>`).join('');
    const feature=albums.find(a=>a.title==='1701')||albums[0];$('feature-title').textContent=feature.title;bindCover($('feature-cover'),feature.tracks[0].cover,true);$('feature-cover').alt=feature.title+'专辑封面';$('feature-meta').textContent=feature.artist+' · '+(feature.year||'')+' · '+feature.tracks.length+'首';
    $('feature-play').onclick=()=>playAlbum(feature); $('feature-full').onclick=()=>openAlbum(feature);$('feature-open').onclick=()=>openAlbum(feature);
    $('total').textContent=tracks.length;$('source-state').textContent=cached?'本地索引 · 音频需联网':'音乐库已连接';$('notice').hidden=!cached;$('notice').textContent=cached?'正在使用随页面保存的曲目索引，音频仍从音乐仓库播放。':'';
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
  }
  function applyAppleMusic() {
    favorites.clear();for(const id of appleMusic.favorites){const e=appleMusic.entries[id];favorites.add(e.trackId||'apple:'+id);}
    $('fixed-playlists').innerHTML=appleMusic.playlists.map(p=>`<button class="nav-item" data-playlist="${esc(p.id)}">${icon('list')}<span>${esc(p.name)}</span><small>${p.entries.length}</small></button>`).join('');
    const artists=[...new Set([...tracks.map(t=>t.artist),...Object.values(appleMusic.entries).map(e=>e.artist)])].sort((a,b)=>a.localeCompare(b,'zh-CN'));
    const previous=$('artist').value;$('artist').innerHTML='<option value="">全部歌手</option>'+artists.map(a=>`<option>${esc(a)}</option>`).join('');$('artist').value=previous;
  }
  fetch('./data/apple-music.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    if(!Array.isArray(data.playlists)||!Array.isArray(data.favorites)||!data.entries)throw Error('Invalid playlists');
    for(const p of data.playlists)if(!p.entries.every(id=>data.entries[id]))throw Error('Missing playlist entry');
    if(!data.favorites.every(id=>data.entries[id]))throw Error('Missing favorite entry');
    for(const e of Object.values(data.entries))if(e.sourceUrl&&!/^https:\/\//.test(e.sourceUrl))e.sourceUrl='';
    appleMusic=data;applyAppleMusic();render();
  }).catch(()=>{appleError=true;$('fixed-playlists').textContent='歌单加载失败，请刷新重试';render();});
  $('retry').onclick=load; fetch('./data/audio-properties.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{audioProperties=data;updateFull();}).catch(()=>{}); load();
})();
