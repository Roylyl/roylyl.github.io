(() => {
  const detailPages = new Set(['/ultrasonic.html', '/soundshare.html', '/philosophy.html']);
  const isEmbedded = window.parent !== window;
  const isHome = Boolean(document.querySelector('.site-header'));

  const normalizePath = (pathname) => pathname === '/' ? '/index.html' : pathname;
  const isDetailUrl = (url) => detailPages.has(normalizePath(url.pathname));
  const isHomeUrl = (url) => normalizePath(url.pathname) === '/index.html';

  if (isEmbedded) {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (normalizePath(url.pathname) === normalizePath(location.pathname) && url.hash) return;
      if (!isDetailUrl(url) && !isHomeUrl(url)) return;
      event.preventDefault();
      window.parent.postMessage({ type: 'site:navigate', href: `${url.pathname}${url.search}${url.hash}` }, location.origin);
    }, true);
    return;
  }

  if (!isHome) return;

  let shell;
  let frame;

  function ensureShell() {
    if (shell) return;
    shell = document.createElement('div');
    shell.className = 'detail-shell';
    shell.setAttribute('aria-hidden', 'true');
    frame = document.createElement('iframe');
    frame.className = 'detail-shell-frame';
    frame.title = '项目详情';
    frame.setAttribute('allow', 'fullscreen; picture-in-picture');
    shell.appendChild(frame);
    document.body.appendChild(shell);
  }

  function embeddedHref(href) {
    const url = new URL(href, location.origin);
    url.searchParams.set('embedded', '1');
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function openDetail(href, push = true) {
    ensureShell();
    const url = new URL(href, location.origin);
    const publicHref = `${url.pathname}${url.search}${url.hash}`;
    shell.classList.add('open');
    shell.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('detail-shell-open');
    if (frame.dataset.publicHref !== publicHref) {
      frame.dataset.publicHref = publicHref;
      frame.src = embeddedHref(publicHref);
    }
    if (push) history.pushState({ detail: publicHref }, '', publicHref);
  }

  function closeDetail(href = '/index.html#projects', push = true) {
    if (shell) {
      shell.classList.remove('open');
      shell.setAttribute('aria-hidden', 'true');
    }
    document.documentElement.classList.remove('detail-shell-open');
    if (push) history.pushState({ detail: null }, '', href);
    const hash = new URL(href, location.origin).hash;
    if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !isDetailUrl(url)) return;
    event.preventDefault();
    openDetail(`${url.pathname}${url.search}${url.hash}`);
  }, true);

  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow || event.data?.type !== 'site:navigate') return;
    const url = new URL(event.data.href, location.origin);
    if (isDetailUrl(url)) openDetail(`${url.pathname}${url.search}${url.hash}`);
    else if (isHomeUrl(url)) closeDetail(`${url.pathname}${url.search}${url.hash}`);
  });

  window.addEventListener('popstate', (event) => {
    if (event.state?.detail) openDetail(event.state.detail, false);
    else closeDetail(`${location.pathname}${location.search}${location.hash}`, false);
  });

  history.replaceState({ detail: null }, '', location.href);
})();
