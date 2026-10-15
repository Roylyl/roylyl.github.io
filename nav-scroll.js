(() => {
  const pages = new Set(['/', '/index.html', '/soundshare.html', '/ultrasonic.html', '/philosophy.html', '/other-projects.html']);
  const pendingKey = 'roylyl.navigation-target';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTarget = (hash, smooth = true) => {
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) {}
    if (!target) return;
    window.dispatchEvent(new Event('site:close-menu'));
    target.scrollIntoView({ behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
  if (window.parent === window) {
    const initialHash = location.hash;
    const pagePath = location.pathname;
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    const savedState = history.state;
    let restorePending = true;
    let scrollTimer;
    const saveScroll = () => {
      if (restorePending || document.documentElement.classList.contains('detail-shell-open')) return;
      history.replaceState({ ...history.state, pagePath, pageScrollY: window.scrollY }, '', location.href);
    };
    history.scrollRestoration = 'manual';
    // Remember direct links before keeping the address bar free of fragments.
    if (initialHash) history.replaceState(history.state, '', location.pathname + location.search);
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) { restorePending = false; return; }
      let pending;
      try { pending = JSON.parse(sessionStorage.getItem(pendingKey)); sessionStorage.removeItem(pendingKey); } catch (_) {}
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const restoredScroll = savedState?.pagePath === pagePath ? savedState.pageScrollY
          : savedState?.detail ? savedState.detailScrollY : savedState?.homeScrollY;
        const pendingHash = navigationType !== 'reload' && pending?.path === pagePath ? pending.hash : '';
        if (initialHash || pendingHash) scrollTarget(initialHash || pendingHash, false);
        else if (['reload', 'back_forward'].includes(navigationType) && Number.isFinite(restoredScroll)) {
          window.scrollTo({ top: restoredScroll, behavior: 'instant' });
        } else window.scrollTo({ top: 0, behavior: 'instant' });
        restorePending = false;
        saveScroll();
      }));
    });
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(saveScroll, 120);
    }, { passive: true });
    window.addEventListener('pagehide', saveScroll);
    // The home shell owns its history; standalone detail documents own theirs.
    if (!document.querySelector('.site-header')) window.addEventListener('popstate', (event) => {
      if (location.hash) {
        scrollTarget(location.hash, false);
        history.replaceState(history.state, '', location.pathname + location.search);
      } else if (event.state?.pagePath === pagePath && Number.isFinite(event.state.pageScrollY)) {
        window.scrollTo({ top: event.state.pageScrollY, behavior: 'instant' });
      }
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
      if (getComputedStyle(detailToggle).display === 'none') setDetailMenu(false);
    });
    window.addEventListener('site-language-change', () => {
      detailToggle.setAttribute('aria-label', menuLabel(detailHeader.classList.contains('nav-open')));
    });
    window.addEventListener('site:close-menu', () => setDetailMenu(false));
  }
})();

// Track the reading section without changing the URL or navigation history.
(() => {
  const header = document.querySelector('.site-header, .ss-nav, .detail-nav, .p-nav');
  const links = [...(header?.querySelectorAll('nav a[href^="#"]') || [])];
  const sections = links.map(link => ({ link, section: document.getElementById(link.hash.slice(1)) })).filter(item => item.section);
  if (!sections.length) return;
  let scheduled = false;
  let visible = true;
  const update = () => {
    scheduled = false;
    if (!visible || document.hidden) return;
    const line = Math.max((header?.getBoundingClientRect().bottom || 0) + 24, innerHeight * .25);
    let current = null;
    for (const item of sections) {
      if (item.section.getBoundingClientRect().top <= line) current = item;
    }
    if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 3) current = sections.at(-1);
    for (const item of sections) {
      if (item === current) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('site-language-change', schedule);
  window.addEventListener('site:visibility-change', event => { visible = event.detail?.visible !== false; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    sections.forEach(({ section }) => observer.observe(section));
  }
  schedule();
})();
