(() => {
  window.siteNavigationVersion = '20261015-2';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
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

  let shell, frame, returnFocus, scrollTimer, completeFrame, pendingRequest, returningEntry;
  const retiringFrames = new Set();
  let activeHref = null;
  let homeScrollY = Number.isFinite(history.state?.homeScrollY) ? history.state.homeScrollY : window.scrollY;
  let currentFramePath = '';
  let pendingScroll;
  const homeTitle = document.title;
  const background = [...document.querySelectorAll('body > header, body > main, body > footer')];
  history.replaceState({ ...history.state, siteNavigationIndex: history.state?.siteNavigationIndex || 0 }, '', location.href);
  let currentEntry = { href: location.href, state: history.state };

  function savePosition() {
    if (pendingRequest) return;
    const state = { ...history.state, detail: activeHref };
    if (activeHref && frame?.contentWindow) {
      try { state.detailScrollY = frame.contentWindow.scrollY; } catch (_) {}
    } else state.homeScrollY = window.scrollY;
    history.replaceState(state, '', location.href);
    currentEntry = { href: location.href, state };
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
    if (pendingRequest?.showFeedback) renderLoading(pendingRequest);
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
    const label = document.createElement('p');
    label.setAttribute('role', 'status');
    label.setAttribute('aria-live', 'polite');
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'button secondary';
    cancel.dataset.loadCancel = '';
    cancel.addEventListener('click', cancelNavigation);
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'button secondary';
    retry.dataset.loadRetry = '';
    retry.addEventListener('click', () => {
      if (!pendingRequest) return;
      const { href, push, scrollY, previous } = pendingRequest;
      openDetail(href, push, scrollY, previous);
    });
    const fallback = document.createElement('a');
    fallback.className = 'button secondary';
    fallback.dataset.nativeNav = '';
    loading.append(label, cancel, retry, fallback);
    shell.append(loading);
    document.body.append(shell);
  }
  function renderLoading(request) {
    if (pendingRequest !== request || !request.showFeedback) return;
    const lang = document.documentElement.lang;
    const en = lang === 'en', tw = lang === 'zh-TW';
    shell.querySelector('.detail-load-error p').textContent = request.failed
      ? en ? 'This page is taking longer to load.' : tw ? '頁面載入需要較長時間。' : '页面加载需要较长时间。'
      : en ? 'Loading page…' : tw ? '正在載入頁面…' : '正在加载页面…';
    const cancel = shell.querySelector('[data-load-cancel]');
    cancel.textContent = en ? 'Cancel and return' : tw ? '取消並返回' : '取消并返回';
    const retry = shell.querySelector('[data-load-retry]');
    retry.textContent = en ? 'Retry' : tw ? '重試' : '重试';
    retry.hidden = !request.failed;
    const fallback = shell.querySelector('[data-native-nav]');
    fallback.href = request.href;
    fallback.textContent = en ? 'Open page directly' : tw ? '直接開啟頁面' : '直接打开页面';
    fallback.hidden = !request.failed;
    const panel = shell.querySelector('.detail-load-error');
    const wasHidden = panel.hidden;
    panel.hidden = false;
    if (wasHidden) cancel.focus({ preventScroll: true });
  }
  function showLoadError(request) {
    if (pendingRequest !== request) return;
    request.failed = true;
    request.showFeedback = true;
    renderLoading(request);
  }
  function discardPending() {
    if (!pendingRequest) return;
    const request = pendingRequest;
    pendingRequest = null;
    clearTimeout(request.feedbackTimer);
    clearTimeout(request.errorTimer);
    request.frame.remove();
    frame = request.previous.frame;
    activeHref = request.previous.href;
    currentFramePath = request.previous.path;
    if (frame) {
      retiringFrames.delete(frame);
      frame.className = 'detail-shell-frame';
      frame.dataset.ready = 'true';
      frame.inert = false;
    }
    shell.querySelector('.detail-load-error').hidden = true;
    return request.previous;
  }
  function cancelNavigation() {
    const previous = discardPending();
    if (!previous) return;
    if (frame) {
      frame.contentWindow.scrollTo({ top: previous.scrollY, behavior: 'instant' });
      frame.contentWindow.postMessage({ type: 'site:visibility', visible: true }, location.origin);
    } else {
      shell.hidden = true;
      shell.classList.remove('open', 'has-page');
      setBackgroundActive(true);
      window.scrollTo({ top: previous.scrollY, behavior: 'instant' });
    }
    if (previous.focus?.isConnected) previous.focus.focus({ preventScroll: true });
    else focusContent(frame?.contentDocument || document, '');
    if (location.href !== previous.entry.href) {
      const delta = previous.entry.state?.siteNavigationIndex - history.state?.siteNavigationIndex;
      if (Number.isFinite(delta) && delta !== 0) { returningEntry = previous.entry.href; history.go(delta); }
      else history.replaceState(previous.entry.state, '', previous.entry.href);
    }
    updateTitle();
  }
  function positionFrame(url, scrollY, smooth = false) {
    const doc = frame.contentDocument;
    const target = hashTarget(doc, url.hash);
    const behavior = smooth && !reducedMotion.matches ? 'smooth' : 'instant';
    if (Number.isFinite(scrollY)) frame.contentWindow.scrollTo({ top: scrollY, behavior });
    else if (target) target.scrollIntoView({ behavior });
    else frame.contentWindow.scrollTo({ top: 0, behavior });
    focusContent(doc, url.hash);
  }
  function openDetail(href, push = true, restoredScroll, retryPrevious) {
    clearTimeout(scrollTimer);
    const url = publicUrl(href);
    const interrupted = discardPending();
    if (push && !interrupted) savePosition();
    const previous = retryPrevious || interrupted || {
      frame, href: activeHref, path: currentFramePath, entry: currentEntry,
      scrollY: frame ? frame.contentWindow.scrollY : window.scrollY,
      focus: frame ? frame.contentDocument.activeElement : document.activeElement
    };
    if (!activeHref) {
      homeScrollY = window.scrollY;
      returnFocus = previous.focus;
      window.dispatchEvent(new Event('site:close-menu'));
    }
    ensureShell();
    activeHref = hrefOf(url);
    shell.hidden = false;
    shell.classList.add('open');
    setBackgroundActive(false);
    updateTitle();
    const path = `${url.pathname}${url.search}`;
    if (frame && currentFramePath === path && frame.dataset.ready === 'true') {
      positionFrame(url, restoredScroll, push);
      savePosition();
      window.sitePreloader?.activate(frame.contentDocument);
      return;
    }
    const previousFrame = frame;
    if (previousFrame) {
      previousFrame.inert = true;
      previousFrame.dataset.ready = 'retiring';
      previousFrame.className = 'detail-shell-retiring';
      previousFrame.contentDocument?.querySelectorAll('audio,video').forEach(media => media.pause());
      previousFrame.contentWindow.postMessage({ type: 'site:visibility', visible: false }, location.origin);
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
    frame.inert = true;
    frame.dataset.ready = 'false';
    pendingScroll = restoredScroll;
    shell.querySelector('.detail-load-error').hidden = true;
    const request = { frame: nextFrame, href: activeHref, push, scrollY: restoredScroll, previous };
    pendingRequest = request;
    frame.setAttribute('aria-busy', 'true');
    request.feedbackTimer = setTimeout(() => {
      if (pendingRequest !== request) return;
      request.showFeedback = true;
      renderLoading(request);
    }, 300);
    request.errorTimer = setTimeout(() => showLoadError(request), 8000);
    completeFrame = () => {
      if (pendingRequest !== request || frame !== nextFrame) return;
      try {
        if (!frame.contentDocument?.querySelector('main') || addressOf(publicUrl(frame.contentWindow.location.href)) !== path) {
          showLoadError(request); return;
        }
        const lang = window.siteLanguage?.get();
        if (lang) frame.contentWindow.siteLanguage?.set(lang, { persist: false, broadcast: false });
      } catch (_) { showLoadError(request); return; }
      // Commit click navigation only when it is usable, so cancelling and
      // retrying never leave abandoned pages in the browser's history.
      pendingRequest = null;
      clearTimeout(request.feedbackTimer);
      clearTimeout(request.errorTimer);
      if (push && location.pathname + location.search !== addressOf(url)) {
        history.pushState({ detail: activeHref, homeScrollY, siteNavigationIndex: (history.state?.siteNavigationIndex || 0) + 1 }, '', addressOf(url));
      }
      frame.dataset.ready = 'true';
      frame.removeAttribute('aria-busy');
      shell.classList.add('has-page');
      const retired = [...retiringFrames];
      const clearRetired = () => retired.forEach(old => { old.remove(); retiringFrames.delete(old); });
      if (!reducedMotion.matches && typeof frame.animate === 'function') {
        const animation = frame.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
        animation.finished.catch(() => {}).finally(clearRetired);
      } else clearRetired();
      frame.inert = false;
      frame.contentWindow.postMessage({ type: 'site:visibility', visible: true }, location.origin);
      frame.contentWindow.addEventListener('scroll', () => schedulePosition(nextFrame), { passive: true });
      shell.querySelector('.detail-load-error').hidden = true;
      if (Number.isFinite(pendingScroll) || frame.contentWindow.scrollY === 0) {
        positionFrame(publicUrl(activeHref), pendingScroll);
      }
      pendingScroll = undefined;
      savePosition();
      updateTitle();
    };
    frame.addEventListener('load', completeFrame);
    frame.addEventListener('error', () => showLoadError(request));
    const embedded = new URL(url);
    embedded.hash = '';
    embedded.searchParams.set('embedded', '1');
    embedded.searchParams.set('nav-version', window.siteNavigationVersion);
    frame.src = hrefOf(embedded);
    shell.append(frame);
  }
  function closeDetail(href, push = true, restoredScroll) {
    clearTimeout(scrollTimer);
    const url = publicUrl(href);
    if (push) savePosition();
    discardPending();
    if (push) history.pushState({ detail: null, homeScrollY, siteNavigationIndex: (history.state?.siteNavigationIndex || 0) + 1 }, '', addressOf(url));
    frame?.remove();
    retiringFrames.forEach(old => old.remove()); retiringFrames.clear();
    frame = null;
    currentFramePath = '';
    activeHref = null;
    if (shell) { shell.classList.remove('open', 'has-page'); shell.hidden = true; }
    setBackgroundActive(true);
    if (!reducedMotion.matches) document.querySelector('main')?.animate?.([{ opacity: .4 }, { opacity: 1 }], { duration: 280, easing: 'ease-out' });
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
    if (event.data?.type !== 'site:navigate' || pendingRequest) return;
    let url;
    try { url = publicUrl(event.data.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (isDetailUrl(url)) openDetail(hrefOf(url));
    else if (isHomeUrl(url)) closeDetail(hrefOf(url));
  });
  window.addEventListener('popstate', (event) => {
    if (returningEntry === location.href) { returningEntry = null; savePosition(); return; }
    returningEntry = null;
    const url = publicUrl(location.href);
    if (isDetailUrl(url)) openDetail(hrefOf(url), false, event.state?.detailScrollY);
    else closeDetail(hrefOf(url), false, event.state?.homeScrollY ?? event.state?.pageScrollY);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && pendingRequest) { event.preventDefault(); cancelNavigation(); }
  });
  window.addEventListener('site-language-change', updateTitle);
  window.addEventListener('scroll', () => { if (!activeHref) schedulePosition(); }, { passive: true });
  window.addEventListener('pagehide', savePosition);
})();
