(() => {
  const detailPages = new Set(['/ultrasonic.html', '/soundshare.html', '/philosophy.html']);
  const isHomeUrl = (url) => ['/', '/index.html'].includes(url.pathname);
  const isDetailUrl = (url) => detailPages.has(url.pathname);
  const publicUrl = (href) => {
    const url = new URL(href, location.href);
    url.searchParams.delete('embedded');
    url.searchParams.delete('nav-version');
    return url;
  };
  const hrefOf = (url) => `${url.pathname}${url.search}${url.hash}`;
  const plainClick = (event, link) => link && !event.defaultPrevented && event.button === 0 &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
    !link.hasAttribute('download') && (!link.target || link.target === '_self') && !link.hasAttribute('data-native-nav');
  const hashTarget = (doc, hash) => {
    try { return hash ? doc.getElementById(decodeURIComponent(hash.slice(1))) : null; }
    catch (_) { return null; }
  };
  const focusContent = (doc, hash) => {
    const target = hashTarget(doc, hash) || doc.querySelector('h1, main');
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  if (window.parent !== window) {
    // The parent owns history, including in-page links inside the detail frame.
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!plainClick(event, link)) return;
      const url = publicUrl(link.href);
      if (url.origin !== location.origin || (!isDetailUrl(url) && !isHomeUrl(url))) return;
      event.preventDefault();
      window.dispatchEvent(new Event('site:close-menu'));
      window.parent.postMessage({ type: 'site:navigate', href: hrefOf(url) }, location.origin);
    }, true);
    return;
  }
  if (!document.querySelector('.site-header')) {
    history.scrollRestoration = 'auto';
    return;
  }
  history.scrollRestoration = 'manual';

  let shell, frame, returnFocus, loadingTimer, scrollTimer;
  let activeHref = null;
  let homeScrollY = window.scrollY;
  let currentFramePath = '';
  let pendingScroll;
  const homeTitle = document.title;
  const background = [...document.querySelectorAll('body > header, body > main, body > footer')];

  function savePosition() {
    const state = { ...history.state };
    if (activeHref && frame?.contentWindow) {
      try { state.detailScrollY = frame.contentWindow.scrollY; } catch (_) {}
    } else state.homeScrollY = window.scrollY;
    history.replaceState(state, '', location.href);
  }
  function schedulePosition(sourceFrame = null) {
    clearTimeout(scrollTimer);
    const href = location.href;
    scrollTimer = setTimeout(() => {
      if (location.href !== href || sourceFrame !== frame || frame?.dataset.ready === 'false') return;
      savePosition();
    }, 120);
  }
  function updateTitle() {
    document.title = window.siteLanguage?.pageTitle(activeHref || 'index.html') || homeTitle;
    if (frame) frame.title = document.title;
  }
  function setBackgroundActive(active) {
    background.forEach((element) => { element.inert = !active; });
    document.documentElement.classList.toggle('detail-shell-open', !active);
    window.dispatchEvent(new CustomEvent('site:visibility-change', { detail: { visible: active } }));
  }
  function ensureShell() {
    if (shell) return;
    shell = document.createElement('div');
    shell.className = 'detail-shell';
    shell.hidden = true;
    const loading = document.createElement('div');
    loading.className = 'detail-loading';
    loading.setAttribute('role', 'status');
    const label = document.createElement('p');
    const fallback = document.createElement('a');
    fallback.className = 'button secondary';
    fallback.dataset.nativeNav = '';
    loading.append(label, fallback);
    shell.append(loading);
    document.body.append(shell);
  }
  function loadingState(slow = false) {
    const lang = document.documentElement.lang;
    const en = lang === 'en', tw = lang === 'zh-TW';
    shell.querySelector('.detail-loading p').textContent = slow
      ? (en ? 'This page is taking longer to load.' : tw ? '頁面載入需要較長時間。' : '页面加载需要较长时间。')
      : (en ? 'Loading…' : tw ? '載入中…' : '加载中…');
    const fallback = shell.querySelector('[data-native-nav]');
    fallback.href = activeHref;
    fallback.textContent = en ? 'Open page directly' : tw ? '直接開啟頁面' : '直接打开页面';
    shell.querySelector('.detail-loading').hidden = false;
  }
  function positionFrame(url, scrollY, smooth = false) {
    const doc = frame.contentDocument;
    const target = hashTarget(doc, url.hash);
    const behavior = smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant';
    if (Number.isFinite(scrollY)) frame.contentWindow.scrollTo({ top: scrollY, behavior });
    else if (target) target.scrollIntoView({ behavior });
    else frame.contentWindow.scrollTo({ top: 0, behavior });
    focusContent(doc, url.hash);
  }
  function openDetail(href, push = true, restoredScroll) {
    clearTimeout(scrollTimer);
    const url = publicUrl(href);
    if (push) savePosition();
    if (!activeHref) {
      homeScrollY = window.scrollY;
      returnFocus = document.activeElement;
      window.dispatchEvent(new Event('site:close-menu'));
    }
    ensureShell();
    activeHref = hrefOf(url);
    if (push && location.pathname + location.search + location.hash !== activeHref) {
      history.pushState({ detail: activeHref, homeScrollY }, '', activeHref);
    }
    shell.hidden = false;
    shell.classList.add('open');
    setBackgroundActive(false);
    updateTitle();
    const path = `${url.pathname}${url.search}`;
    if (frame && currentFramePath === path && frame.dataset.ready === 'true') {
      positionFrame(url, restoredScroll, push);
      return;
    }
    clearTimeout(loadingTimer);
    frame?.remove();
    // A new context's initial navigation replaces about:blank, so only the
    // parent's pushState adds history; reused iframe.src would add another entry.
    frame = document.createElement('iframe');
    const nextFrame = frame;
    currentFramePath = path;
    frame.className = 'detail-shell-frame';
    frame.title = document.title;
    frame.setAttribute('allow', 'fullscreen; picture-in-picture');
    frame.tabIndex = -1;
    frame.inert = true;
    frame.dataset.ready = 'false';
    pendingScroll = restoredScroll;
    loadingState();
    loadingTimer = setTimeout(() => loadingState(true), 8000);
    frame.addEventListener('load', () => {
      if (frame !== nextFrame || !activeHref) return;
      try {
        if (!frame.contentDocument.querySelector('main')) { loadingState(true); return; }
        const lang = window.siteLanguage?.get();
        if (lang) frame.contentWindow.siteLanguage?.set(lang, { persist: false, broadcast: false });
        frame.dataset.ready = 'true';
        frame.inert = false;
        frame.contentWindow.postMessage({ type: 'site:visibility', visible: true }, location.origin);
        frame.contentWindow.addEventListener('scroll', () => schedulePosition(nextFrame), { passive: true });
        clearTimeout(loadingTimer);
        shell.querySelector('.detail-loading').hidden = true;
        positionFrame(publicUrl(activeHref), pendingScroll);
        pendingScroll = undefined;
        savePosition();
        updateTitle();
      } catch (_) { loadingState(true); }
    });
    const embedded = new URL(url);
    embedded.searchParams.set('embedded', '1');
    embedded.searchParams.set('nav-version', '20260922-1');
    frame.src = hrefOf(embedded);
    shell.append(frame);
    shell.querySelector('[data-native-nav]').focus({ preventScroll: true });
  }
  function closeDetail(href, push = true, restoredScroll) {
    clearTimeout(scrollTimer);
    const url = publicUrl(href);
    if (push) savePosition();
    if (push) history.pushState({ detail: null, homeScrollY }, '', hrefOf(url));
    clearTimeout(loadingTimer);
    frame?.remove();
    frame = null;
    currentFramePath = '';
    activeHref = null;
    if (shell) { shell.classList.remove('open'); shell.hidden = true; }
    setBackgroundActive(true);
    updateTitle();
    const target = hashTarget(document, url.hash);
    if (Number.isFinite(restoredScroll)) window.scrollTo({ top: restoredScroll, behavior: 'instant' });
    else if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (returnFocus?.isConnected && (Number.isFinite(restoredScroll) || url.hash === '#projects')) returnFocus.focus({ preventScroll: true });
    else focusContent(document, url.hash);
    savePosition();
  }
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!plainClick(event, link)) return;
    const url = publicUrl(link.href);
    if (url.origin !== location.origin || !isDetailUrl(url)) return;
    event.preventDefault();
    openDetail(hrefOf(url));
  }, true);
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow || event.data?.type !== 'site:navigate') return;
    let url;
    try { url = publicUrl(event.data.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (isDetailUrl(url)) openDetail(hrefOf(url));
    else if (isHomeUrl(url)) closeDetail(hrefOf(url));
  });
  window.addEventListener('popstate', (event) => {
    const url = publicUrl(location.href);
    if (isDetailUrl(url)) openDetail(hrefOf(url), false, event.state?.detailScrollY);
    else closeDetail(hrefOf(url), false, event.state?.homeScrollY);
  });
  window.addEventListener('site-language-change', updateTitle);
  window.addEventListener('scroll', () => { if (!activeHref) schedulePosition(); }, { passive: true });
  window.addEventListener('pagehide', savePosition);
  history.replaceState({ ...history.state, detail: null, homeScrollY }, '', location.href);
})();
