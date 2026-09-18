(() => {
  // A shell URL becomes a real document when refreshed. Restore its deep link
  // explicitly, including entries that inherited the shell's manual scrolling.
  if (window.parent === window && location.hash) {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) return;
      // Run after the browser's reload scroll restoration, which can otherwise
      // replace the anchor position with the former shell's scroll offset.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        let target;
        try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (_) {}
        target?.scrollIntoView({ behavior: 'instant' });
      }));
    });
  }
  const samePageHash = (link) => {
    if (link.getAttribute('href')?.startsWith('#')) return link.hash;
    const url = new URL(link.href, location.href);
    return url.pathname === location.pathname && url.search === location.search ? url.hash : '';
  };

  document.querySelectorAll('.site-header a[href*="#"], .detail-nav a[href*="#"], .ss-nav a[href*="#"], .p-nav a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = samePageHash(link);
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      if (detailHeader?.contains(link)) setDetailMenu(false);
      // Native anchors preserve shareable URLs and browser history. CSS handles
      // the sticky-header offset and reduced-motion scrolling preference.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
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
