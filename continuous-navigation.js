(() => {
  window.siteNavigationVersion = '20260923-11';
  const detailPages = new Set(['/ultrasonic.html', '/soundshare.html', '/philosophy.html', '/other-projects.html']);
  const isHomeUrl = (url) => ['/', '/index.html'].includes(url.pathname);
  const isDetailUrl = (url) => detailPages.has(url.pathname);
  const publicUrl = (href) => {
    const url = new URL(href, location.href);
    url.searchParams.delete('embedded');
    url.searchParams.delete('nav-version');
    return url;
  };
  const hrefOf = (url) => `${url.pathname}${url.search}${url.hash}`;
  const addressOf = (url) => `${url.pathname}${url.search}`;
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
    const notifyReady = () => window.parent.postMessage({ type: 'site:detail-ready' }, location.origin);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', notifyReady, { once: true });
    else notifyReady();
    return;
  }
  if (!document.querySelector('.site-header')) {
    history.scrollRestoration = 'auto';
    return;
  }
  history.scrollRestoration = 'manual';

  let shell, frame, returnFocus, loadingTimer, scrollTimer, completeFrame;
  const retiringFrames = new Set();
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
      if (location.href !== href || sourceFrame !== (frame || null) || frame?.dataset.ready === 'false') return;
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
    loading.className = 'detail-load-error';
    loading.hidden = true;
    loading.setAttribute('role', 'status');
    const label = document.createElement('p');
    const fallback = document.createElement('a');
    fallback.className = 'button secondary';
    fallback.dataset.nativeNav = '';
    loading.append(label, fallback);
    shell.append(loading);
    document.body.append(shell);
  }
  function showLoadError() {
    const lang = document.documentElement.lang;
    const en = lang === 'en', tw = lang === 'zh-TW';
    shell.querySelector('.detail-load-error p').textContent = en ? 'This page is taking longer to load.' : tw ? '頁面載入需要較長時間。' : '页面加载需要较长时间。';
    const fallback = shell.querySelector('[data-native-nav]');
    fallback.href = activeHref;
    fallback.textContent = en ? 'Open page directly' : tw ? '直接開啟頁面' : '直接打开页面';
    shell.querySelector('.detail-load-error').hidden = false;
  }
  function positionFrame(url, scrollY, smooth = false) {
    const doc = frame.contentDocument;
    const target = hashTarget(doc, url.hash);
    const behavior = smooth ? 'smooth' : 'instant';
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
    if (push && location.pathname + location.search !== addressOf(url)) {
      history.pushState({ detail: activeHref, homeScrollY }, '', addressOf(url));
    }
    shell.hidden = false;
    shell.classList.add('open');
    setBackgroundActive(false);
    updateTitle();
    const path = `${url.pathname}${url.search}`;
    if (frame && currentFramePath === path && frame.dataset.ready === 'true') {
      positionFrame(url, restoredScroll, push);
      window.sitePreloader?.activate(frame.contentDocument);
      return;
    }
    clearTimeout(loadingTimer);
    const previousFrame = frame;
    if (previousFrame) {
      previousFrame.inert = true;
      previousFrame.dataset.ready = 'retiring';
      previousFrame.className = 'detail-shell-retiring';
      previousFrame.contentDocument?.querySelectorAll('audio,video').forEach(media => media.pause());
      retiringFrames.add(previousFrame);
    }
    // A new context's initial navigation replaces about:blank, so only the
    // parent's pushState adds history; reused iframe.src would add another entry.
    frame = document.createElement('iframe');
    const nextFrame = frame;
    currentFramePath = path;
    frame.className = 'detail-shell-frame';
    frame.title = document.title;
    frame.setAttribute('allow', 'fullscreen; picture-in-picture');
    frame.tabIndex = -1;
    frame.dataset.ready = 'false';
    pendingScroll = restoredScroll;
    shell.querySelector('.detail-load-error').hidden = true;
    loadingTimer = setTimeout(() => showLoadError(), 8000);
    completeFrame = () => {
      if (frame !== nextFrame || !activeHref || frame.dataset.ready === 'true') return;
      try {
        if (!frame.contentDocument.querySelector('main')) { showLoadError(); return; }
        const lang = window.siteLanguage?.get();
        if (lang) frame.contentWindow.siteLanguage?.set(lang, { persist: false, broadcast: false });
        frame.dataset.ready = 'true';
        shell.classList.add('has-page');
        const retired = [...retiringFrames];
        const clearRetired = () => retired.forEach(old => { old.remove(); retiringFrames.delete(old); });
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const animation = frame.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
          animation.finished.catch(() => {}).finally(clearRetired);
        } else clearRetired();
        frame.inert = false;
        frame.contentWindow.postMessage({ type: 'site:visibility', visible: true }, location.origin);
        frame.contentWindow.addEventListener('scroll', () => schedulePosition(nextFrame), { passive: true });
        clearTimeout(loadingTimer);
        shell.querySelector('.detail-load-error').hidden = true;
        // Do not pull readers back to the top if they already scrolled while
        // a nonessential resource was still loading.
        if (Number.isFinite(pendingScroll) || frame.contentWindow.scrollY === 0) {
          positionFrame(publicUrl(activeHref), pendingScroll);
        }
        pendingScroll = undefined;
        savePosition();
        updateTitle();
      } catch (_) { showLoadError(); }
    };
    frame.addEventListener('load', completeFrame);
    const embedded = new URL(url);
    embedded.hash = '';
    embedded.searchParams.set('embedded', '1');
    embedded.searchParams.set('nav-version', '20260923-11');
    frame.src = hrefOf(embedded);
    shell.append(frame);
    frame.focus({ preventScroll: true });
  }
  function closeDetail(href, push = true, restoredScroll) {
    clearTimeout(scrollTimer);
    const url = publicUrl(href);
    if (push) savePosition();
    if (push) history.pushState({ detail: null, homeScrollY }, '', addressOf(url));
    clearTimeout(loadingTimer);
    frame?.remove();
    retiringFrames.forEach(old => old.remove()); retiringFrames.clear();
    frame = null;
    currentFramePath = '';
    activeHref = null;
    if (shell) { shell.classList.remove('open', 'has-page'); shell.hidden = true; }
    setBackgroundActive(true);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelector('main')?.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 280, easing: 'ease-out' });
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
    if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
    if (event.data?.type === 'site:detail-ready') { completeFrame?.(); return; }
    if (event.data?.type !== 'site:navigate') return;
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
