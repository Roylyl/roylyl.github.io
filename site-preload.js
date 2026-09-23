(() => {
  const paths = ['/index.html', '/soundshare.html', '/ultrasonic.html', '/philosophy.html', '/other-projects.html'];
  const resourceTypes = /\.(?:html|css|js|png|jpe?g|webp|gif|svg|avif|ico|woff2?)(?:$|\?)/i;
  let controller, generation = 0;
  const done = new Set();
  const manifests = new Map();
  const idle = () => new Promise(resolve => {
    if ('requestIdleCallback' in window) requestIdleCallback(resolve, { timeout: 2000 });
    else setTimeout(resolve, 150);
  });
  const urlFor = (value, base) => {
    try { const url = new URL(value, base); return url.origin === location.origin && resourceTypes.test(url.pathname) ? url.href : null; } catch (_) { return null; }
  };
  async function fetchResource(url, signal) {
    if (!url || signal.aborted) return null;
    if (done.has(url)) return manifests.get(url) || null;
    const response = await fetch(url, { cache: 'force-cache', priority: 'low', signal });
    if (!response.ok) return null;
    const text = /\.(html|css)(?:$|\?)/i.test(url) ? await response.text() : (await response.arrayBuffer(), null);
    done.add(url); if (text) manifests.set(url, text); return text;
  }
  async function activate(doc) {
    controller?.abort(); controller = new AbortController();
    const signal = controller.signal, run = ++generation;
    doc.documentElement.dataset.preloadState = 'waiting';
    const valid = () => !signal.aborted && run === generation && doc.defaultView && !doc.hidden;
    try {
      if (doc.readyState !== 'complete') await new Promise(resolve => {
        doc.defaultView.addEventListener('load', resolve, { once: true });
        signal.addEventListener('abort', resolve, { once: true });
      });
      if (!valid()) return;
      await doc.fonts.ready;
      // Finish this page's lazy pictures one at a time before warming other pages.
      for (const img of doc.images) {
        if (!valid()) return;
        if ((!img.getAttribute('src') && !img.getAttribute('srcset')) || img.complete) continue;
        await idle();
        await new Promise(resolve => {
          const finish = () => { clearTimeout(timer); img.removeEventListener('load', finish); img.removeEventListener('error', finish); resolve(); };
          const timer = setTimeout(finish, 20000);
          img.addEventListener('load', finish, { once: true }); img.addEventListener('error', finish, { once: true });
          signal.addEventListener('abort', finish, { once: true });
          img.loading = 'eager';
          if (img.complete) finish();
        });
      }
      if (!valid()) return;
      // An unresolved current image must not compete with background transfers.
      if ([...doc.images].some(img => (img.getAttribute('src') || img.getAttribute('srcset')) && !img.complete)) { doc.documentElement.dataset.preloadState = 'waiting-images'; return; }
      doc.documentElement.dataset.preloadState = 'loading';
      const current = doc.location.pathname === '/' ? '/index.html' : doc.location.pathname;
      const queue = paths.filter(path => path !== current).map(path => new URL(path, location.origin).href);
      const queued = new Set(queue);
      const enqueue = url => { if (url && !queued.has(url) && !done.has(url)) { queued.add(url); queue.push(url); } };
      while (queue.length && valid()) {
        await idle(); if (!valid()) return;
        const url = queue.shift();
        let text;
        try { text = await fetchResource(url, signal); } catch (error) { if (signal.aborted) return; continue; }
        if (!text) continue;
        if (/\.html(?:$|\?)/i.test(url)) {
          // Template parsing is inert: scripts, audio and third-party players never run.
          const template = document.createElement('template'); template.innerHTML = text;
          template.content.querySelectorAll('script[src],link[rel="stylesheet"][href],img[src]').forEach(el => enqueue(urlFor(el.getAttribute('src') || el.getAttribute('href'), url)));
          template.content.querySelectorAll('img[srcset],source[srcset]').forEach(el => el.getAttribute('srcset').split(',').forEach(candidate => enqueue(urlFor(candidate.trim().split(/\s+/)[0], url))));
          if (!new URL(url).search) {
            const embedded = new URL(url); embedded.searchParams.set('embedded', '1'); embedded.searchParams.set('nav-version', window.siteNavigationVersion || '20260923-25'); enqueue(embedded.href);
          }
        } else {
          for (const match of text.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) enqueue(urlFor(match[1], url));
        }
      }
      if (valid()) doc.documentElement.dataset.preloadState = 'complete';
    } catch (_) { if (!signal.aborted) doc.documentElement.dataset.preloadState = 'idle'; }
  }
  if (window.parent !== window) {
    window.parent.sitePreloader?.activate(document);
    return;
  }
  window.sitePreloader = { activate, stop: () => controller?.abort() };
  window.addEventListener('site:visibility-change', event => { if (event.detail?.visible === false) controller?.abort(); else activate(document); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) controller?.abort();
    else activate(document.querySelector('.detail-shell-frame')?.contentDocument || document);
  });
  document.addEventListener('load', () => { if (document.documentElement.dataset.preloadState === 'waiting-images') activate(document); }, true);
  window.addEventListener('pagehide', () => controller?.abort());
  activate(document);
})();
