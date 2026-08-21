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
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
