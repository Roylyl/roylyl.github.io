#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = fileURLToPath(new URL('../../', import.meta.url));
const siteRoot = path.dirname(appRoot);
const publicRoot = 'https://roylyl.github.io/rmusic/';
const coverRoot = 'https://roylyl.github.io/music/share-covers/';
const appCover = publicRoot + 'share-cover.png?v=3';
const encodePath = value => value.split('/').map(encodeURIComponent).join('/');
const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const scriptJson = value => JSON.stringify(value).replace(/[<\u2028\u2029]/g, char => ({ '<': '\\u003c', '\u2028': '\\u2028', '\u2029': '\\u2029' }[char]));

// Same keys and bounded color/font values as the main app's theme stores and sanitizer.
// Stored themes supply values only; stored CSS or HTML is never inserted into this page.
const themeScript = `(() => {
  const root = document.documentElement;
  const system = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: light)') : null;
  const read = key => { try { return localStorage.getItem('rmusic:' + key); } catch { return null; } };
  const color = value => typeof value === 'string' && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim()) ? value.trim() : null;
  const valid = item => item && typeof item === 'object' && typeof item.name === 'string'
    && ['backgroundColor', 'primaryColor', 'secondaryColor', 'accentColor'].every(key => color(item[key]))
    && ['sans', 'serif', 'mono'].includes(item.fontStyle)
    && ['calm', 'normal', 'chaotic'].includes(item.animationIntensity);
  const dualValid = dual => valid(dual?.light) && valid(dual?.dark);
  let savedThemes = null;
  const keys = ['follow_system_theme', 'default_theme_daylight', 'custom_dual_theme', 'custom_theme_preferred', 'last_applied_theme_pointer', 'disable_home_dynamic_background', 'enable_home_dynamic_background'];
  const apply = () => {
    const follow = read('follow_system_theme') === 'true';
    const light = follow && system ? system.matches : read('default_theme_daylight') === 'true';
    const theme = light
      ? { backgroundColor: '#f5f5f4', primaryColor: '#1c1917', secondaryColor: '#44403c', accentColor: '#ea580c', fontStyle: 'sans' }
      : { backgroundColor: '#09090b', primaryColor: '#f4f4f5', secondaryColor: '#71717a', accentColor: '#f4f4f5', fontStyle: 'sans' };
    const pointer = read('last_applied_theme_pointer');
    let selected = null;
    if (pointer === 'custom' || (!pointer && read('custom_theme_preferred') === 'true')) {
      try {
        const dual = JSON.parse(read('custom_dual_theme') || 'null');
        if (dualValid(dual)) selected = light ? dual.light : dual.dark;
      } catch {}
    }
    if (pointer === 'ai' && savedThemes) {
      if (dualValid(savedThemes.dual)) selected = light ? savedThemes.dual.light : savedThemes.dual.dark;
      else if (valid(savedThemes.legacy)) selected = savedThemes.legacy;
    }
    if (selected) {
      for (const key of ['backgroundColor', 'primaryColor', 'secondaryColor', 'accentColor']) theme[key] = color(selected[key]);
      theme.fontStyle = selected.fontStyle;
    }
    root.dataset.theme = light ? 'light' : 'dark';
    root.style.colorScheme = light ? 'light' : 'dark';
    root.style.setProperty('--bg-color', theme.backgroundColor);
    root.style.setProperty('--text-primary', theme.primaryColor);
    root.style.setProperty('--text-secondary', theme.secondaryColor);
    root.style.setProperty('--text-accent', theme.accentColor);
    root.dataset.font = theme.fontStyle;
    const disabled = read('disable_home_dynamic_background');
    root.dataset.backdrop = (disabled !== null ? disabled === 'true' : read('enable_home_dynamic_background') === 'false') ? 'off' : 'on';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.backgroundColor);
  };
  apply();
  system?.addEventListener?.('change', apply);
  window.addEventListener('storage', event => { if (!event.key || keys.some(key => event.key === 'rmusic:' + key)) apply(); });
  // Read only the two cached palette records used by the homepage. Never create or upgrade a DB.
  if (read('last_applied_theme_pointer') === 'ai' && typeof window.indexedDB?.databases === 'function') {
    (async () => {
      try {
        const databases = await window.indexedDB.databases();
        if (!databases.some(item => item.name === 'RmusicPlayerDB')) return;
        savedThemes = await new Promise(resolve => {
          let db, finished = false;
          const finish = value => { if (finished) return; finished = true; clearTimeout(timer); db?.close(); resolve(value); };
          const timer = setTimeout(() => finish(null), 1500);
          const request = window.indexedDB.open('RmusicPlayerDB');
          request.onupgradeneeded = event => { event.target.transaction?.abort(); finish(null); };
          request.onerror = () => finish(null);
          request.onblocked = () => finish(null);
          request.onsuccess = () => {
            db = request.result;
            if (finished || !db.objectStoreNames.contains('api_cache')) { db.close(); finish(null); return; }
            db.onversionchange = () => finish(null);
            try {
              const result = {};
              const transaction = db.transaction('api_cache', 'readonly');
              const store = transaction.objectStore('api_cache');
              const dual = store.get('last_dual_theme');
              const legacy = store.get('last_theme');
              dual.onsuccess = () => { result.dual = dual.result?.data; };
              legacy.onsuccess = () => { result.legacy = legacy.result?.data; };
              transaction.oncomplete = () => finish(result);
              transaction.onerror = () => finish(null);
              transaction.onabort = () => finish(null);
            } catch { finish(null); }
          };
        });
        apply();
      } catch {}
    })();
  }
})();`;

function checkTrack(track) {
    if (!track || typeof track.id !== 'string' || !track.id || /[\\/:*?"<>|\x00-\x1f]/.test(track.id)
        || /[ .]$/.test(track.id) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(track.id)) {
        throw new Error('分享页歌曲标识不适用于静态文件。');
    }
    for (const field of ['title', 'artist', 'album']) {
        if (typeof track[field] !== 'string') throw new Error('歌曲缺少分享信息：' + track.id);
    }
    if (typeof track.cover !== 'string' || !track.cover || track.cover.startsWith('/') || track.cover.includes('\\')
        || /^[a-z]+:/i.test(track.cover) || track.cover.split('/').some(part => !part || part === '..' || part === '.')
        || /[\x00-\x1f]/.test(track.cover)) throw new Error('歌曲封面路径不安全：' + track.id);
}

export function makeSharePage(track) {
    checkTrack(track);
    const songId = encodeURIComponent(track.id);
    const title = `${track.title} · ${track.artist} | R music`;
    const description = `${track.artist}的《${track.title}》，收录于《${track.album}》。在R music打开并收听。`;
    const coverPath = encodePath(track.cover.replace(/\.[^/.]+$/, '.jpg'));
    const image = coverRoot + coverPath;
    const relativeImage = '../../music/share-covers/' + coverPath;
    const canonical = publicRoot + 'share/' + songId + '.html';
    const listen = '../?track=' + songId + '#player';
    const time = Number.isFinite(track.duration) && track.duration > 0
        ? Math.floor(track.duration / 60) + ':' + String(Math.floor(track.duration % 60)).padStart(2, '0') : '';
    const payload = scriptJson({ title: `${track.title} · ${track.artist}`, text: `在R music收听《${track.title}》。`, url: canonical });
    return `<!doctype html>
<html lang="zh-CN" itemscope itemtype="https://schema.org/MusicRecording">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#09090b">
<title>${html(title)}</title>
<meta name="description" content="${html(description)}">
<meta itemprop="name" content="${html(track.title)}">
<meta itemprop="description" content="${html(description)}">
<meta itemprop="image" content="${html(image)}">
<meta name="image" content="${html(image)}">
<meta property="og:type" content="music.song">
<meta property="og:site_name" content="R music">
<meta property="og:locale" content="zh_CN">
<meta property="og:title" content="${html(track.title)} · ${html(track.artist)}">
<meta property="og:description" content="${html(description)}">
<meta property="og:url" content="${html(canonical)}">
<meta property="og:image" content="${html(image)}">
<meta property="og:image:secure_url" content="${html(image)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="${html(track.album)}专辑封面">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${html(track.title)} · ${html(track.artist)}">
<meta name="twitter:description" content="${html(description)}">
<meta name="twitter:image" content="${html(image)}">
<link rel="canonical" href="${html(canonical)}">
<link rel="image_src" href="${html(image)}">
<link rel="icon" type="image/svg+xml" href="../icon.svg?v=3">
<link rel="icon" type="image/png" sizes="32x32" href="../icons/favicon-32.png?v=3">
<link rel="icon" type="image/png" sizes="16x16" href="../icons/favicon-16.png?v=3">
<link rel="shortcut icon" href="../favicon.ico?v=3">
<link rel="apple-touch-icon" sizes="180x180" href="../icons/apple-touch-icon.png?v=3">
<script>${themeScript}</script>
<style>
:root{color-scheme:dark;--bg-color:#09090b;--text-primary:#f4f4f5;--text-secondary:#71717a;--text-accent:#f4f4f5;--page-font:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-family:var(--page-font);background:var(--bg-color);color:var(--text-primary);font-synthesis:none}
:root[data-font="serif"]{--page-font:ui-serif,Georgia,"Songti SC","Noto Serif SC",serif}:root[data-font="mono"]{--page-font:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
*{box-sizing:border-box}body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;padding:32px 16px;padding-top:max(32px,env(safe-area-inset-top));padding-bottom:max(32px,env(safe-area-inset-bottom));background:var(--bg-color);isolation:isolate;overflow-x:hidden}
.crawler-image{position:absolute;top:0;left:0;width:1px;height:1px;clip-path:inset(50%);overflow:hidden;opacity:0;pointer-events:none}.backdrop{position:fixed;inset:-70px;z-index:-2;overflow:hidden;pointer-events:none;opacity:.4}.backdrop img{width:100%;height:100%;object-fit:cover;filter:blur(64px) saturate(.65);transform:scale(1.08)}body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:color-mix(in srgb,var(--bg-color) 62%,transparent)}:root[data-theme="light"] .backdrop{opacity:.28}:root[data-backdrop="off"] .backdrop{display:none}
main{width:min(100%,428px);min-width:0;text-align:center;padding:26px 28px 20px;border-radius:28px;border:1px solid color-mix(in srgb,var(--text-primary) 12%,transparent);background:color-mix(in srgb,var(--bg-color) 85%,transparent);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 24px 72px #0003}:root[data-theme="light"] main{box-shadow:0 24px 72px #00000012}
.brand{display:inline-flex;align-items:center;gap:10px;color:var(--text-primary);text-decoration:none;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:14px;font-weight:600;letter-spacing:-.02em;margin-bottom:25px}.brand img{width:30px;height:30px;border-radius:9px;box-shadow:0 3px 10px #0001}
.art{display:block;width:min(100%,300px);height:auto;aspect-ratio:1;margin:0 auto 26px;object-fit:cover;border-radius:18px;background:color-mix(in srgb,var(--text-primary) 5%,var(--bg-color));border:1px solid color-mix(in srgb,var(--text-primary) 5%,transparent);box-shadow:0 18px 45px #0003}
h1{font-size:clamp(23px,7vw,32px);font-weight:650;letter-spacing:-.03em;line-height:1.3;overflow-wrap:anywhere;margin:0 0 10px}.artist{font-size:16px;color:color-mix(in srgb,var(--text-primary) 75%,var(--text-secondary));margin:0 0 8px;line-height:1.5;overflow-wrap:anywhere}.album{font-size:12px;color:var(--text-secondary);margin:0;line-height:1.7;overflow-wrap:anywhere}.duration{white-space:nowrap;margin-left:7px;font-variant-numeric:tabular-nums}
.actions{display:flex;gap:10px;margin-top:25px;min-width:0}button,.open{font:inherit;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:13px;font-weight:600;min-height:46px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;touch-action:manipulation;cursor:pointer;transition:background .15s,transform .15s}button{background:color-mix(in srgb,var(--text-primary) 5%,transparent);color:var(--text-primary);border:1px solid color-mix(in srgb,var(--text-primary) 12%,transparent);padding:11px 17px}.open{flex:1;min-width:0;color:var(--bg-color);background:var(--text-primary);padding:11px 17px;border:1px solid var(--text-primary)}.actions svg{width:17px;height:17px;flex:none}button:active,.open:active{transform:scale(.97)}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid var(--text-accent);outline-offset:4px}button:disabled{cursor:wait;opacity:.6}
.hint{font-size:11px;color:var(--text-secondary);margin:16px 0 0;line-height:1.7}.status{font-size:12px;color:var(--text-primary);min-height:20px;margin:14px 0 0;line-height:1.6}.copy-panel{margin-top:12px;text-align:left;border:1px solid color-mix(in srgb,var(--text-primary) 12%,transparent);padding:14px;border-radius:16px;background:color-mix(in srgb,var(--bg-color) 85%,transparent)}.copy-panel[hidden]{display:none}.copy-panel label{display:block;font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:8px}.copy-panel input{font:inherit;font-size:12px;color:var(--text-primary);background:color-mix(in srgb,var(--text-primary) 5%,transparent);border:1px solid color-mix(in srgb,var(--text-primary) 12%,transparent);border-radius:9px;width:100%;min-width:0;padding:10px;min-height:42px}.copy-panel button{margin-top:9px;width:100%;min-height:40px;font-size:12px}
@media(max-width:360px){main{padding:22px 20px 16px;border-radius:24px}.brand{margin-bottom:22px}.actions{gap:8px}.actions button,.open{padding-left:13px;padding-right:13px}}@media(hover:hover){button:hover{background:color-mix(in srgb,var(--text-primary) 10%,transparent)}.open:hover{background:color-mix(in srgb,var(--text-primary) 92%,var(--bg-color))}.brand:hover{opacity:.8}}@media(prefers-reduced-motion:reduce){button,.open{transition:none}}@supports not (background:color-mix(in srgb,#000 85%,transparent)){main{background:var(--bg-color);border-color:#ffffff20}}
</style>
</head>
<body>
<img class="crawler-image" src="${html(relativeImage)}" alt="${html(track.album)}专辑封面" width="300" height="300" aria-hidden="true">
<div class="backdrop" aria-hidden="true"><img src="${html(relativeImage)}" alt="" width="600" height="600"></div>
<main>
<a class="brand" href="../" aria-label="打开R music首页"><img src="../icon.svg?v=3" alt="" width="30" height="30">R music</a>
<img class="art" src="${html(relativeImage)}" data-fallback="${html(appCover)}" alt="${html(track.album)}专辑封面" width="600" height="600" fetchpriority="high">
<h1>${html(track.title)}</h1>
<p class="artist">${html(track.artist)}</p>
<p class="album">${html(track.album)}${time ? `<span class="duration">· ${html(time)}</span>` : ''}</p>
<div class="actions"><a class="open" href="${html(listen)}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>打开R music</a><button id="share" type="button" aria-label="分享这首歌"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V3m-4 4 4-4 4 4M8 10H5v11h14V10h-3"/></svg>分享</button></div>
<p class="hint">打开后点按播放，继续听这首歌。</p>
<p class="status" id="status" role="status" aria-live="polite"></p>
<section class="copy-panel" id="copy-panel" hidden><label for="share-link">长按或选中下面的链接，复制后即可分享。</label><input id="share-link" type="text" value="${html(canonical)}" readonly aria-label="歌曲分享链接"><button id="select-link" type="button">选中链接</button></section>
</main>
<script>
(() => {
  const data = ${payload};
  const status = document.getElementById('status');
  const button = document.getElementById('share');
  const panel = document.getElementById('copy-panel');
  const input = document.getElementById('share-link');
  const art = document.querySelector('.art');
  let statusTimer;
  const notify = text => {
    clearTimeout(statusTimer);
    status.textContent = text;
    statusTimer = setTimeout(() => { status.textContent = ''; }, 4500);
  };
  art.addEventListener('error', () => {
    if (art.dataset.fallback) {
      art.src = art.dataset.fallback;
      delete art.dataset.fallback;
    }
  });
  const selectLink = () => { input.focus(); input.select(); input.setSelectionRange(0, input.value.length); };
  document.getElementById('select-link').addEventListener('click', selectLink);
  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(data.url);
      notify('歌曲链接已复制');
    } catch {
      panel.hidden = false;
      selectLink();
      notify('请复制下面的歌曲链接');
    }
  };
  button.addEventListener('click', () => {
    if (button.disabled) return;
    status.textContent = '';
    if (typeof navigator.share !== 'function') { void copyLink(); return; }
    // Invoke during the click itself, before any asynchronous work consumes the user gesture.
    let sharing;
    try { sharing = navigator.share(data); }
    catch (error) { if (error?.name !== 'AbortError') void copyLink(); return; }
    button.disabled = true;
    Promise.resolve(sharing).catch(error => {
      if (error?.name !== 'AbortError') return copyLink();
    }).finally(() => { button.disabled = false; });
  });
})();
</script>
</body>
</html>
`;
}

export async function generateSharePages() {
    const catalog = JSON.parse(await readFile(path.join(siteRoot, 'music/data/catalog.json'), 'utf8'));
    if (!Array.isArray(catalog.tracks) || !catalog.tracks.length) throw new Error('统一曲库中没有歌曲。');
    const ids = new Set();
    // Validate everything before writing, so one malformed entry cannot leave a half-updated export.
    for (const track of catalog.tracks) {
        checkTrack(track);
        if (ids.has(track.id)) throw new Error('歌曲标识重复：' + track.id);
        ids.add(track.id);
    }
    const destination = path.join(appRoot, 'share');
    await mkdir(destination, { recursive: true });
    for (const track of catalog.tracks) await writeFile(path.join(destination, track.id + '.html'), makeSharePage(track), 'utf8');
    console.log(`已生成${ids.size}个R music歌曲分享页，复用${new Set(catalog.tracks.map(track => track.cover)).size}张专辑封面。`);
    return ids.size;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await generateSharePages();
