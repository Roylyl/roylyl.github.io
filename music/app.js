'use strict';
(() => {
  const ROOT = 'https://raw.githubusercontent.com/Roylyl/Music/main/';
  const $ = id => document.getElementById(id);
  const audio = $('audio');
  if ('ResizeObserver' in window) {
    new ResizeObserver(entries => {
      const height = Math.ceil(entries[0].target.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--player-height', height + 'px');
    }).observe(document.querySelector('.player'));
  }
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem('roy-music:' + key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem('roy-music:' + key, JSON.stringify(value)); } catch {} };
  let audioProperties = {};
  const storedFavorites = read('favorites', []);
  const favorites = new Set(Array.isArray(storedFavorites) ? storedFavorites.filter(x => typeof x === 'string') : []);
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
  function trackRows(list, inQueue = false) {
    return list.map((t, i) => `<div class="track-row${current?.id === t.id ? ' current' : ''}" data-track="${esc(t.id)}"><button class="track-no" data-play="${esc(t.id)}" aria-label="播放${esc(t.title)}">${current?.id === t.id && !audio.paused ? '♫' : String(i + 1).padStart(2, '0')}</button><button class="track-start" data-play="${esc(t.id)}"><strong>${esc(t.title)}</strong><small>${esc(t.artist)}${inQueue ? ' · ' + esc(t.album) : ''}</small></button><span class="track-album">${esc(t.album)}</span><span class="track-time">${time(t.duration)}</span><button class="icon" data-like="${esc(t.id)}" aria-label="${favorites.has(t.id) ? '取消喜欢' : '喜欢'}${esc(t.title)}" aria-pressed="${favorites.has(t.id)}">${favorites.has(t.id) ? '♥' : '♡'}</button></div>`).join('');
  }
  function render() {
    const list = filtered();
    $('fav-count').textContent = favorites.size;
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === view); b.setAttribute('aria-current', b.dataset.view === view ? 'page' : 'false'); });
    $('view-title').textContent = selected ? selected.title : ({albums:'专辑收藏',songs:'全部歌曲',favorites:'我的喜欢'})[view];
    $('albums').hidden = view !== 'albums' || !!selected;
    $('songs').hidden = view === 'albums' && !selected;
    $('album-detail').hidden = !selected;
    if (selected) {
      $('album-detail').innerHTML = `<button class="back" id="back-albums">← 返回专辑收藏</button><div class="detail-heading"><img src="${picture(selected.tracks[0])}" alt="${esc(selected.title)}封面"><div><h3>${esc(selected.title)}</h3><p>${esc(selected.artist)} · ${selected.tracks.length}首</p><button class="primary" id="play-selected">▶ 播放专辑</button></div></div>`;
      $('back-albums').onclick = () => { selected = null; render(); };
      $('play-selected').onclick = () => play(selected.tracks[0], selected.tracks);
    }
    let shown;
    if (view === 'albums' && !selected) {
      const allowed = new Set(list.map(t => t.id));
      const visible = albums.filter(a => a.tracks.some(t => allowed.has(t.id)));
      visible.sort((a,b) => $('sort').value === 'title' ? a.title.localeCompare(b.title,'zh-CN') : (compareYear(a,b) || a.title.localeCompare(b.title,'zh-CN')));
      $('albums').innerHTML = visible.map(a => `<button class="album-card" data-album="${esc(a.key)}" aria-label="查看${esc(a.title)}，${a.tracks.length}首"><div class="art"><img src="${picture(a.tracks[0])}" alt="${esc(a.title)}封面" loading="lazy" width="240" height="240"><span class="open-album" aria-hidden="true">↗</span></div><h3>${esc(a.title)}</h3><p><span class="year">${a.year || '年份待核'}</span>${esc(a.artist)}</p><p>${a.tracks.length}首 · ${a.key.startsWith('live/') ? '现场录音' : a.key.startsWith('collections/') ? '精选合集' : '专辑 / 单曲'}</p></button>`).join('');
      $('result-count').textContent = visible.length + '张专辑'; shown = visible.length;
    } else {
      const rows = selected ? list.filter(t => selected.tracks.some(s => s.id === t.id)) : [...list].sort((a,b) => $('sort').value === 'title' ? a.title.localeCompare(b.title,'zh-CN') : compareYear(a,b));
      $('songs').innerHTML = trackRows(rows); $('songs')._tracks = rows;
      $('result-count').textContent = rows.length + '首歌曲'; shown = rows.length;
    }
    $('empty').hidden = shown > 0; imageFallbacks($('content')); renderCurrent();
  }
  function renderCurrent() {
    updateFull();
    $('play').textContent = audio.paused ? '▶' : 'Ⅱ'; $('play').setAttribute('aria-label', audio.paused ? '播放' : '暂停');
    $('now-like').disabled = !current;
    $('now-like').textContent = current && favorites.has(current.id) ? '♥' : '♡';
    $('now-like').setAttribute('aria-pressed', String(!!current && favorites.has(current.id)));
    document.querySelectorAll('.track-row').forEach(el => el.classList.toggle('current', el.dataset.track === current?.id));
    if (!$('queue-panel').hidden) renderQueue();
  }
  function renderQueue() { $('queue-list').innerHTML = queue.length ? trackRows(queue, true) : '<p class="muted">播放一首歌曲后，队列会显示在这里。</p>'; }
  function like(id) { favorites.has(id) ? favorites.delete(id) : favorites.add(id); save('favorites', [...favorites]); render(); }
  function setCurrent(t) {
    current = t; $('now-cover').src = picture(t); $('now-title').textContent = t.title; $('now-artist').textContent = t.artist + ' · ' + t.album;
    $('duration').textContent = time(t.duration); $('elapsed').textContent = '0:00'; $('seek').value = 0; $('seek').disabled = true;
    if ('mediaSession' in navigator && 'MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({title:t.title,artist:t.artist,album:t.album,artwork:[{src:picture(t)}]});
    renderCurrent();
  }
  async function play(t, list = queue) {
    if (!t) return;
    const token = ++playToken;
    if (list?.length) queue = [...list];
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
  $('repeat').onclick = () => { repeat=({off:'all',all:'one',one:'off'})[repeat]; $('repeat').textContent=repeat==='one'?'↻¹':'↻'; $('repeat').classList.toggle('on',repeat!=='off'); $('repeat').setAttribute('aria-label','循环模式：'+({off:'顺序播放',all:'列表循环',one:'单曲循环'})[repeat]); updateFull(); };
  $('now-like').onclick = () => current && like(current.id);
  $('seek').oninput = () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number($('seek').value)/100*audio.duration; };
  audio.volume = .8;
  $('volume').oninput = () => { audio.volume=Number($('volume').value); };
  function toggleQueue(open) { $('queue-panel').hidden=!open; $('queue-toggle').setAttribute('aria-expanded',String(open)); if (open) { renderQueue(); $('close-queue').focus(); } else $('queue-toggle').focus(); }
  $('queue-toggle').onclick = () => toggleQueue($('queue-panel').hidden); $('close-queue').onclick=()=>toggleQueue(false);
  $('content').addEventListener('click',e=> {
    const album=e.target.closest('[data-album]'), button=e.target.closest('[data-play]'), heart=e.target.closest('[data-like]');
    if(album) { const chosen=albums.find(a=>a.key===album.dataset.album); if(e.target.closest('.art')) { play(chosen.tracks[0],chosen.tracks); openFull(); } else { selected=chosen;render(); } }
    if(button) play(get(button.dataset.play),$('songs')._tracks);
    if(heart) like(heart.dataset.like);
  });
  $('queue-list').addEventListener('click',e=> { const b=e.target.closest('[data-play]'),h=e.target.closest('[data-like]'); if(b)play(get(b.dataset.play)); if(h)like(h.dataset.like); });
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;selected=null;render();});
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
    $('full-play').textContent=audio.paused?'▶':'Ⅱ'; $('full-play').setAttribute('aria-label',audio.paused?'全屏播放':'全屏暂停');
    $('full-shuffle').setAttribute('aria-pressed',String(shuffled));
    $('full-like').textContent=favorites.has(current.id)?'♥':'♡'; $('full-like').setAttribute('aria-pressed',String(favorites.has(current.id)));
    $('full-repeat').textContent=({off:'顺序播放',all:'列表循环',one:'单曲循环'})[repeat];
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
    $('feature-play').onclick=()=>play(feature.tracks[0],feature.tracks); $('feature-full').onclick=()=>{play(feature.tracks[0],feature.tracks);openFull();};$('feature-open').onclick=()=>{view='albums';selected=feature;$('search').value='';$('artist').value='';render();$('album-detail').scrollIntoView({block:'start',behavior:'smooth'});};
    $('total').textContent=tracks.length;$('source-state').textContent=cached?'本地索引 · 音频需联网':'音乐库已连接';$('notice').hidden=!cached;$('notice').textContent=cached?'正在使用随页面保存的曲目索引，音频仍从音乐仓库播放。':'';
    if(!current){const last=read('last',{}),t=get(last?.id);if(t){queue=albums.find(a=>a.tracks.some(x=>x.id===t.id)).tracks;setCurrent(t);const restore=()=>{if(current?.id===t.id&&Number.isFinite(audio.duration)&&last.time>0)audio.currentTime=Math.min(last.time,audio.duration-1);};audio.addEventListener('loadedmetadata',restore,{once:true});}}
    imageFallbacks();render();
  }
  $('retry').onclick=load; fetch('./data/audio-properties.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{audioProperties=data;updateFull();}).catch(()=>{}); load();
})();
