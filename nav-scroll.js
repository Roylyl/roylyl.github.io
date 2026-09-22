(() => {
  const pages = new Set(['/', '/index.html', '/soundshare.html', '/ultrasonic.html', '/philosophy.html', '/other-projects.html']);
  const pendingKey = 'roylyl.navigation-target';
  const scrollTarget = (hash) => {
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) {}
    if (!target) return;
    window.dispatchEvent(new Event('site:close-menu'));
    target.scrollIntoView({ behavior: 'instant' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  if (window.parent === window) {
    history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) return;
      let pending;
      try { pending = JSON.parse(sessionStorage.getItem(pendingKey)); sessionStorage.removeItem(pendingKey); } catch (_) {}
      const reload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (!reload && pending?.path === location.pathname) scrollTarget(pending.hash);
      }));
    });
  }
  // Keep section IDs for scrolling without adding fragments or history entries.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !pages.has(url.pathname) || !url.hash) return;
    event.preventDefault();
    if (url.pathname === location.pathname || (['/', '/index.html'].includes(url.pathname) && ['/', '/index.html'].includes(location.pathname))) {
      scrollTarget(url.hash);
    } else {
      try { sessionStorage.setItem(pendingKey, JSON.stringify({ path: url.pathname, hash: url.hash })); } catch (_) {}
      location.assign(url.pathname + url.search);
    }
  });

  const detailHeader = document.querySelector('.ss-nav, .detail-nav, .p-nav');
  const detailToggle = detailHeader?.querySelector('.secondary-menu-toggle');
  const detailNav = detailHeader?.querySelector('nav');

  const menuLabel = (open) => {
    const lang = document.documentElement.lang;
    if (lang === 'en') return open ? 'Close menu' : 'Open menu';
    if (lang === 'zh-TW') return open ? '關閉選單' : '開啟選單';
    return open ? '关闭菜单' : '打开菜单';
  };

  const setDetailMenu = (open) => {
    if (!detailHeader || !detailToggle || !detailNav) return;
    if (detailHeader.classList.contains('nav-open') === open) return;
    detailHeader.classList.toggle('nav-open', open);
    document.body.classList.toggle('secondary-menu-active', open);
    detailToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    detailToggle.setAttribute('aria-label', menuLabel(open));
    document.querySelectorAll('body > main, body > footer').forEach((el) => { el.inert = open; });
    if (open) detailNav.querySelector('a')?.focus();
  };

  if (detailHeader && detailToggle && detailNav) {
    detailToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setDetailMenu(!detailHeader.classList.contains('nav-open'));
    });
    detailNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setDetailMenu(false)));
    document.addEventListener('click', (event) => {
      if (!detailHeader.contains(event.target)) setDetailMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && detailHeader.classList.contains('nav-open')) {
        setDetailMenu(false);
        detailToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setDetailMenu(false);
    });
    window.addEventListener('site-language-change', () => {
      detailToggle.setAttribute('aria-label', menuLabel(detailHeader.classList.contains('nav-open')));
    });
    window.addEventListener('site:close-menu', () => setDetailMenu(false));
  }
})();
