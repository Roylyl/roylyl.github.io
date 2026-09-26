'use strict';
(() => {
  const ROOT = 'https://raw.githubusercontent.com/Roylyl/Music/main/';
  const $ = id => document.getElementById(id);
  const audio = $('audio');
  const shapes = {
    play:'<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause:'<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    prev:'<path d="M5 5v14m14-14L8 12l11 7Z"/>',
    next:'<path d="M19 5v14M5 5l11 7-11 7Z"/>',
    shuffle:'<path d="M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 4-3 6-6s4-6 6-6h3m-4-4 4 4-4 4"/>',
    repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
    one:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3m8-9 2-1v8"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    down:'<path d="m6 9 6 6 6-6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
    back:'<path d="m10 5-7 7 7 7M3 12h18"/>', arrow:'<path d="m9 5 7 7-7 7"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
  const setIcon = (id,name) => { $(id).innerHTML=icon(name); };
  for(const [id,name] of Object.entries({play:'play',prev:'prev',next:'next',shuffle:'shuffle',repeat:'repeat','now-like':'heart','queue-toggle':'list','close-queue':'close','close-full':'down','full-play':'play','full-prev':'prev','full-next':'next','full-shuffle':'shuffle','full-like':'heart'}))setIcon(id,name);
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
  let tracks = [], albums = [], view = 'albums', selected = null, current = null, queue = [], shuffled = false, repeat = 'off', playToken = 0, lastSaved = 0;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const time = n => { n = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0; return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); };
  const url = path => ROOT + path.split('/').map(encodeURIComponent).join('/');
  const compareYear = (a, b) => !a.year && b.year ? 1 : a.year && !b.year ? -1 : ($('sort').value === 'newest' ? -1 : 1) * (a.year - b.year);
  const normalize = s => String(s).normalize('NFKC').toLocaleLowerCase();
  const safePath = p => typeof p === 'string' && !p.startsWith('/') && !p.includes('\\') && !p.split('/').some(x => x === '..') && !/^[a-z]+:/i.test(p);
  const picture = t => url(t.cover);
  const status = text => { $('player-status').textContent = text; $('full-status').textContent = text; };
  function imageFallbacks(scope = document) { scope.querySelectorAll('img').forEach(img => { img.onerror = () => { img.onerror = null; img.src = './placeholder.svg'; }; }); }
  function filtered() {
    const q = normalize($('search').value.trim()), artist = $('artist').value;
    return tracks.filter(t => (!artist || t.artist === artist) && (!q || normalize(t.title + ' ' + t.artist + ' ' + t.album).includes(q)) && (view !== 'favorites' || favorites.has(t.id)));
  }
  const get = id => tracks.find(t => t.id === id);
  const canPlay = t => !!t?.src;
  function playlistTracks(ids) {
    return ids.map(id=>{const e=appleMusic.entries[id],t=get(e.trackId);return {...(t||{}),id:t?.id||'apple:'+id,appleId:id,title:e.title,artist:e.artist,album:e.album,duration:t?.duration||e.duration,src:t?.src||'',sourceStatus:e.sourceStatus,sourceUrl:e.sourceUrl};});
  }
  function playlistRows(list) {
    return list.map((t,i)=>canPlay(t)?trackRows([t]).replace('>01</button>', '>'+String(i+1).padStart(2,'0')+'</button>'):`<div class="track-row unavailable"><span class="track-no">${String(i+1).padStart(2,'0')}</span><div class="track-start"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}</small></div><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><span class="source-label" title="音源尚未入库">${t.sourceUrl?`<a href="${esc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t.sourceStatus==='purchasable'?'待购入':'外部收听'} ↗</a>`:'待补音源'}</span></div>`).join('');
  }
  function showPlaylist(id) {
    activePlaylist=appleMusic?.playlists.find(p=>p.id===id)||null; if(!activePlaylist)return;
    view='playlist';selected=null;$('search').value='';$('artist').value='';render();$('view-title').scrollIntoView({block:'start',behavior:'smooth'});
  }
  function trackRows(list, inQueue = false) {
    return list.map((t, i) => `<div class="track-row${current?.id === t.id ? ' current' : ''}" data-track="${esc(t.id)}"><button class="track-no" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${current?.id === t.id && !audio.paused ? '♫' : String(i + 1).padStart(2, '0')}</button><button class="track-start" data-play="${esc(t.id)}"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}${inQueue ? ' · ' + esc(t.album) : ''}</small></button><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><button class="icon" disabled title="喜欢状态来自Apple Music" data-like="${esc(t.id)}" aria-label="Apple Music${favorites.has(t.id) ? '已喜欢' : '未喜欢'}：${esc(t.title)}" aria-pressed="${favorites.has(t.id)}">${icon('heart')}</button></div>`).join('');
  }
  function render() {
    const list = filtered();
    $('fav-count').textContent = appleMusic?appleMusic.favorites.length:'—';
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === view); b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'); });
    const fixedView=view==='playlist'||view==='favorites';
    document.querySelectorAll('[data-playlist]').forEach(b=>b.classList.toggle('active',view==='playlist'&&b.dataset.playlist===activePlaylist?.id));
    $('sort').disabled=fixedView;
    $('playlist-detail').hidden=!fixedView;
    if(fixedView) {
      $('albums').hidden=true;$('songs').hidden=false;$('album-detail').hidden=true;
      $('view-title').textContent=view==='favorites'?'我喜欢':activePlaylist.name;
      if(!appleMusic){$('playlist-detail').textContent=appleError?'Apple Music歌单加载失败，请刷新页面重试。':'正在读取Apple Music歌单…';$('songs').innerHTML='';$('result-count').textContent='';$('empty').hidden=true;return;}
      const ids=view==='favorites'?appleMusic.favorites:activePlaylist.entries;
      const all=playlistTracks(ids),q=normalize($('search').value.trim()),ar=$('artist').value;
      const rows=all.filter(t=>(!ar||t.artist===ar)&&(!q||normalize(t.title+' '+t.artist+' '+t.album).includes(q)));
      const playable=all.filter(canPlay);
      $('playlist-detail').innerHTML=`<p>来自Apple Music · ${all.length}首 · ${playable.length}首可播放 · ${all.length-playable.length}首待补音源</p><button id="play-playlist" class="primary" ${playable.length?'':'disabled'}>${icon('play')}顺序播放</button><small>更新于${esc(new Date(appleMusic.updatedAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}))} · 保留原歌单曲目，播放时跳过未入库音源</small>`;
      $('play-playlist').onclick=()=>playAlbum({tracks:playable});
      $('songs').innerHTML=playlistRows(rows);$('songs')._tracks=rows.filter(canPlay);$('result-count').textContent=rows.length+'首歌曲';$('empty').hidden=rows.length>0;renderCurrent();return;
    }
    $('view-title').textContent = selected ? selected.title : ({albums:'专辑收藏',songs:'全部歌曲',favorites:'我的喜欢'})[view];
    $('albums').hidden = view !== 'albums' || !!selected;
    $('songs').hidden = view === 'albums' && !selected;
    $('album-detail').hidden = !selected;
    if (selected) {
      $('album-detail').innerHTML = `<button class="back" id="back-albums">${icon('back')}返回专辑收藏</button><div class="detail-heading"><img src="${picture(selected.tracks[0])}" alt="${esc(selected.title)}封面"><div><h3>${esc(selected.title)}</h3><p>${esc(selected.artist)} · ${selected.tracks.length}首</p><button class="primary" id="play-selected">${icon('play')}播放专辑</button></div></div>`;
      $('back-albums').onclick = () => { selected = null; render(); };
      $('play-selected').onclick = () => playAlbum(selected);
    }
    let shown;
    if (view === 'albums' && !selected) {
      const allowed = new Set(list.map(t => t.id));
      const visible = albums.filter(a => a.tracks.some(t => allowed.has(t.id)));
      visible.sort((a,b) => $('sort').value === 'title' ? a.title.localeCompare(b.title,'zh-CN') : (compareYear(a,b) || a.title.localeCompare(b.title,'zh-CN')));
      $('albums').innerHTML = visible.map(a => `<article class="album-card"><div class="art"><button class="album-cover-open" data-album="${esc(a.key)}" aria-label="查看${esc(a.title)}，${a.tracks.length}首"><img src="${picture(a.tracks[0])}" alt="${esc(a.title)}封面" loading="lazy" width="240" height="240"></button><button class="open-album" data-album-play="${esc(a.key)}" aria-label="顺序播放${esc(a.title)}">${icon('play')}</button></div><h3><button class="album-title-open" data-album="${esc(a.key)}">${esc(a.title)}</button></h3><p><span class="year">${a.year || '年份待核'}</span>${esc(a.artist)}</p><p>${a.tracks.length}首 · ${a.key.startsWith('live/') ? '现场录音' : a.key.startsWith('collections/') ? '精选合集' : '专辑 / 单曲'}</p></article>`).join('');
      $('result-count').textContent = visible.length + '张专辑'; shown = visible.length;
    } else {
      const rows = selected ? list.filter(t => selected.tracks.some(s => s.id === t.id)) : [...list].sort((a,b) => $('sort').value === 'title' ? a.title.localeCompare(b.title,'zh-CN') : compareYear(a,b));
      $('songs').innerHTML = trackRows(rows); $('songs')._tracks = rows;
      $('result-count').textContent = rows.length + '首歌曲'; shown = rows.length;
    }
    $('empty').hidden = shown > 0; imageFallbacks($('content')); renderCurrent();
  }
  function playAlbum(album) {
    if(!album?.tracks.length)return;
    shuffled=false; repeat='off';
    $('shuffle').setAttribute('aria-pressed','false');
    setIcon('repeat','repeat'); $('repeat').classList.remove('on');
    $('repeat').setAttribute('aria-label','循环模式：顺序播放');
    if(current?.id===album.tracks[0].id && audio.readyState>0)audio.currentTime=0;
    play(album.tracks[0],album.tracks);
  }
  function openAlbum(album) {
    if(!album)return; view='albums'; selected=album; $('search').value=''; $('artist').value=''; render();
    $('album-detail').scrollIntoView({block:'start',behavior:'smooth'});
    $('back-albums').focus({preventScroll:true});
  }
  function renderCurrent() {
    updateFull();
    setIcon('play',audio.paused?'play':'pause'); $('play').setAttribute('aria-label', audio.paused ? '播放' : '暂停');
    $('now-like').disabled = true; $('now-like').title='喜欢状态来自Apple Music'; $('full-like').disabled=true; $('full-like').title='喜欢状态来自Apple Music';
    setIcon('now-like','heart');
    $('now-like').setAttribute('aria-pressed', String(!!current && favorites.has(current.id)));
    $('now-like').setAttribute('aria-label','Apple Music'+(current&&favorites.has(current.id)?'已喜欢':'未喜欢'));
    $('full-like').setAttribute('aria-label','Apple Music'+(current&&favorites.has(current.id)?'已喜欢':'未喜欢'));
    document.querySelectorAll('.track-row').forEach(el => el.classList.toggle('current', el.dataset.track === current?.id));
    if (!$('queue-panel').hidden) renderQueue();
  }
  function renderQueue() { $('queue-list').innerHTML = queue.length ? trackRows(queue, true) : '<p class="muted">播放一首歌曲后，队列会显示在这里。</p>'; }
  function like() { status('喜欢状态来自Apple Music，请在Apple Music中更新后重新导入。'); }
  function setCurrent(t) {
    current = t; $('now-cover').src = picture(t); $('now-title').textContent = t.title; $('now-artist').textContent = t.artist + ' · ' + t.album;
    $('duration').textContent = time(t.duration); $('elapsed').textContent = '0:00'; $('seek').value = 0; $('seek').disabled = true;
    if ('mediaSession' in navigator && 'MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({title:t.title,artist:t.artist,album:t.album,artwork:[{src:picture(t)}]});
    renderCurrent();
  }
  async function play(t, list = queue) {
    if (!canPlay(t)) return;
    const token = ++playToken;
    if (list?.length) queue = list.filter(canPlay);
    if (!queue.some(x => x.id === t.id)) queue = [t];
    if (current?.id !== t.id || !audio.getAttribute('src')) { setCurrent(t); audio.src = url(t.src); }
    status('正在加载音频…');
    try { await audio.play(); if (token === playToken) { status(''); save('last',{id:t.id,time:audio.currentTime}); renderCurrent(); } }
    catch (e) { if (token !== playToken || e.name === 'AbortError') return; status(e.name === 'NotAllowedError' ? '请再次点击播放，允许浏览器开始播放。' : '音频暂时无法加载，请检查网络后点击播放重试。'); renderCurrent(); }
  }
  function advance(direction, ended = false) {
    if (!queue.length) return;
    if (ended && repeat === 'one') { audio.currentTime = 0; play(current); return; }
    let index = queue.findIndex(t => t.id === current?.id);
    if (shuffled && direction > 0 && queue.length > 1) { const candidates = queue.filter(t => t.id !== current?.id); play(candidates[Math.floor(Math.random()*candidates.length)]); return; }
    index += direction;
    if (ended && index >= queue.length && repeat === 'off') { renderCurrent(); status('这一轮播放结束了。'); return; }
    play(queue[(index+queue.length)%queue.length]);
  }
  $('play').onclick = () => {
    if (!audio.paused) { ++playToken; audio.pause(); return; }
    if (audio.error) { const src = current && url(current.src); if (src) { audio.src=src; audio.load(); } }
    play(current || filtered()[0], queue.length ? queue : filtered());
  };
  $('prev').onclick = () => { if (audio.currentTime > 3) audio.currentTime = 0; else advance(-1); };
  $('next').onclick = () => advance(1);
  $('shuffle').onclick = () => { shuffled=!shuffled; $('shuffle').setAttribute('aria-pressed',String(shuffled)); updateFull(); };
  $('repeat').onclick = () => { repeat=({off:'all',all:'one',one:'off'})[repeat]; setIcon('repeat',repeat==='one'?'one':'repeat'); $('repeat').classList.toggle('on',repeat!=='off'); $('repeat').setAttribute('aria-label','循环模式：'+({off:'顺序播放',all:'列表循环',one:'单曲循环'})[repeat]); updateFull(); };
  $('now-like').onclick = () => current && like(current.id);
  $('seek').oninput = () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number($('seek').value)/100*audio.duration; };
  audio.volume = .8;
  $('volume').oninput = () => { audio.volume=Number($('volume').value); };
  function toggleQueue(open) { $('queue-panel').hidden=!open; $('queue-toggle').setAttribute('aria-expanded',String(open)); if (open) { renderQueue(); $('close-queue').focus(); } else $('queue-toggle').focus(); }
  $('queue-toggle').onclick = () => toggleQueue($('queue-panel').hidden); $('close-queue').onclick=()=>toggleQueue(false);
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
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;selected=null;activePlaylist=null;render();});
  $('fixed-playlists').onclick=e=>{const b=e.target.closest('[data-playlist]');if(b)showPlaylist(b.dataset.playlist);};
  $('search').oninput=render; $('artist').onchange=render; $('sort').onchange=render;
  document.addEventListener('keydown',e=> {
    if(e.key==='Escape'&&!$('queue-panel').hidden)toggleQueue(false);
    if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)||e.target.isContentEditable)return;
    if(e.key==='/'){e.preventDefault();$('search').focus();}
    if(e.code==='Space'){e.preventDefault();$('play').click();}
  });
  audio.addEventListener('loadedmetadata',()=>{$('seek').disabled=!Number.isFinite(audio.duration);$('duration').textContent=time(audio.duration);updateFull();});
  audio.addEventListener('timeupdate',()=>{
    $('elapsed').textContent=time(audio.currentTime); $('full-elapsed').textContent=time(audio.currentTime); $('full-seek').value=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration*100:0; if(Number.isFinite(audio.duration)&&audio.duration>0)$('seek').value=audio.currentTime/audio.duration*100;
    if(current&&Date.now()-lastSaved>5000){save('last',{id:current.id,time:audio.currentTime});lastSaved=Date.now();}
    if('mediaSession'in navigator&&navigator.mediaSession.setPositionState&&Number.isFinite(audio.duration)&&audio.duration>0){try{navigator.mediaSession.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate,position:Math.min(audio.currentTime,audio.duration)});}catch{}}
  });
  ['play','pause'].forEach(event=>audio.addEventListener(event,()=>{renderCurrent();if('mediaSession'in navigator)navigator.mediaSession.playbackState=audio.paused?'paused':'playing';}));
  audio.addEventListener('waiting',()=>{if(!audio.paused)status('正在缓冲…');});
  audio.addEventListener('pause',()=>{if(['正在缓冲…','正在加载音频…'].includes($('player-status').textContent))status('');}); audio.addEventListener('playing',()=>status(''));
  audio.addEventListener('error',()=>{status('音频暂时无法加载，请检查网络后点击播放重试。');renderCurrent();});
  audio.addEventListener('ended',()=>advance(1,true));
  if('mediaSession'in navigator)for(const [name,handler] of Object.entries({play:()=>play(current || filtered()[0],queue.length ? queue : filtered()),pause:()=>audio.pause(),previoustrack:()=>advance(-1),nexttrack:()=>advance(1),seekto:e=>{if(Number.isFinite(audio.duration))audio.currentTime=Math.min(e.seekTime,audio.duration);}})){try{navigator.mediaSession.setActionHandler(name,handler);}catch{}}
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
    $('full-cover').src = picture(current); $('full-title').textContent = current.title;
    $('full-artist').textContent = current.artist; $('full-album').textContent = current.album;
    const details = [['格式',format],['码率',bitrate],['采样率',rate],...(!lossy && p.bitDepth ? [['量化位深',depth]] : []),['声道',p.channels===2?'双声道':p.channels===1?'单声道':p.channels?String(p.channels):'未记录'],['文件大小',p.fileSize?(p.fileSize/1024/1024).toFixed(1)+'MiB':'未记录']];
    $('audio-details').innerHTML=details.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
    setIcon('full-play',audio.paused?'play':'pause'); $('full-play').setAttribute('aria-label',audio.paused?'全屏播放':'全屏暂停');
    $('full-shuffle').setAttribute('aria-pressed',String(shuffled));
    setIcon('full-like','heart'); $('full-like').setAttribute('aria-pressed',String(favorites.has(current.id)));
    $('full-repeat').innerHTML=icon(repeat==='one'?'one':'repeat')+({off:'顺序播放',all:'列表循环',one:'单曲循环'})[repeat];
    $('full-duration').textContent=time(Number.isFinite(audio.duration)?audio.duration:current.duration);
    $('full-seek').disabled=!Number.isFinite(audio.duration);
    $('full-elapsed').textContent=time(audio.currentTime); $('full-status').textContent=$('player-status').textContent;
  }
  function openFull() {
    if(!current)return; updateFull();
    if(!full.open)full.showModal();
    document.body.classList.add('full-open');
    if(full.requestFullscreen&&!document.fullscreenElement)full.requestFullscreen().catch(()=>{});
  }
  function closeFull() { if(full.open)full.close(); }
  full.addEventListener('close',()=>{document.body.classList.remove('full-open');if(document.fullscreenElement===full)document.exitFullscreen().catch(()=>{});$('open-full').focus();});
  $('open-full').onclick=openFull; $('quality').onclick=openFull; $('close-full').onclick=closeFull;
  for(const [button,target] of [['full-play','play'],['full-prev','prev'],['full-next','next'],['full-shuffle','shuffle'],['full-like','now-like'],['full-repeat','repeat']])$(button).onclick=()=>$(target).click();
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
    const grouped=new Map(); for(const t of tracks){const key=t.src.slice(0,t.src.lastIndexOf('/'));if(!grouped.has(key))grouped.set(key,{key,title:t.album,artist:key.split('/')[1],year:t.year,tracks:[]});grouped.get(key).tracks.push(t);}
    albums=[...grouped.values()];albums.forEach(a=>a.tracks.sort((a,b)=>a.discNumber-b.discNumber||a.trackNumber-b.trackNumber));
    $('artist').innerHTML='<option value="">全部歌手</option>'+[...new Set(tracks.map(t=>t.artist))].sort((a,b)=>a.localeCompare(b,'zh-CN')).map(a=>`<option>${esc(a)}</option>`).join('');
    const feature=albums.find(a=>a.title==='1701')||albums[0];$('feature').hidden=false;$('feature-title').textContent=feature.title;$('feature-cover').src=picture(feature.tracks[0]);$('feature-cover').alt=feature.title+'专辑封面';$('feature-meta').textContent=feature.artist+' · '+(feature.year||'')+' · '+feature.tracks.length+'首';
    $('feature-play').onclick=()=>playAlbum(feature); $('feature-full').onclick=()=>openAlbum(feature);$('feature-open').onclick=()=>openAlbum(feature);
    $('total').textContent=tracks.length;$('source-state').textContent=cached?'本地索引 · 音频需联网':'音乐库已连接';$('notice').hidden=!cached;$('notice').textContent=cached?'正在使用随页面保存的曲目索引，音频仍从音乐仓库播放。':'';
    if(appleMusic)applyAppleMusic();
    if(!current){const last=read('last',{}),t=get(last?.id);if(t){queue=albums.find(a=>a.tracks.some(x=>x.id===t.id)).tracks;setCurrent(t);const restore=()=>{if(current?.id===t.id&&Number.isFinite(audio.duration)&&last.time>0)audio.currentTime=Math.min(last.time,audio.duration-1);};audio.addEventListener('loadedmetadata',restore,{once:true});}}
    imageFallbacks();render();
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
