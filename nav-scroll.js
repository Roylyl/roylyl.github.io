(() => {
  const samePageHash = (link) => {
    if (link.getAttribute('href')?.startsWith('#')) return link.hash;
    const url = new URL(link.href, location.href);
    return url.pathname === location.pathname && url.search === location.search ? url.hash : '';
  };

  document.querySelectorAll('.site-header a[href*="#"], .detail-nav a[href*="#"], .ss-nav a[href*="#"], .p-nav a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = samePageHash(link);
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      event.preventDefault();
      if (detailHeader?.contains(link)) setDetailMenu(false);
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      let targetTop = 0;
      for (let node = target; node; node = node.offsetParent) targetTop += node.offsetTop;
      window.scrollTo({ top: Math.max(0, targetTop - 92), behavior: 'smooth' });
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
    detailHeader.classList.toggle('nav-open', open);
    document.body.classList.toggle('secondary-menu-active', open);
    detailToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    detailToggle.setAttribute('aria-label', menuLabel(open));
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
      if (event.key === 'Escape') setDetailMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setDetailMenu(false);
    });
    window.addEventListener('site-language-change', () => {
      detailToggle.setAttribute('aria-label', menuLabel(detailHeader.classList.contains('nav-open')));
    });
  }
})();
