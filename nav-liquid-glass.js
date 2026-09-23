// Adapted from the publicly loaded yimingxi.art navigation glass: the RGB
// displacement map and hover highlight are scoped to this site's existing nav.
(() => {
  const header = document.querySelector('.site-header, .ss-nav, .detail-nav, .p-nav');
  const nav = header?.querySelector('nav');
  if (!header || !nav) return;

  header.classList.add('liquid-glass-header');
  header.insertAdjacentHTML('afterbegin', `
    <svg class="liquid-glass-filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <filter id="portfolio-nav-glass-filter" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
          <feImage id="portfolio-nav-glass-map" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
          <feDisplacementMap id="portfolio-nav-glass-red" in="SourceGraphic" in2="map" result="dispRed" />
          <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feDisplacementMap id="portfolio-nav-glass-green" in="SourceGraphic" in2="map" result="dispGreen" />
          <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feDisplacementMap id="portfolio-nav-glass-blue" in="SourceGraphic" in2="map" result="dispBlue" />
          <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur in="output" stdDeviation="0" />
        </filter>
      </defs>
    </svg>`);

  const svgFilter = header.querySelector('#portfolio-nav-glass-filter');
  const map = svgFilter.querySelector('#portfolio-nav-glass-map');
  const supportsSvgBackdrop = (() => {
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const test = document.createElement('div');
    test.style.backdropFilter = 'url(#portfolio-nav-glass-filter)';
    return !isWebkit && !isFirefox && test.style.backdropFilter !== '';
  })();

  if (supportsSvgBackdrop) {
    // The portfolio header is roughly twice as tall as the source site's
    // small link capsule; scale the refraction down to keep labels legible.
    const channels = [
      ['portfolio-nav-glass-red', -24],
      ['portfolio-nav-glass-green', -20],
      ['portfolio-nav-glass-blue', -16]
    ];
    for (const [id, scale] of channels) {
      const node = svgFilter.querySelector(`#${id}`);
      node.setAttribute('scale', String(scale));
      node.setAttribute('xChannelSelector', 'R');
      node.setAttribute('yChannelSelector', 'G');
    }

    let resizeFrame = 0;
    const updateMap = () => {
      resizeFrame = 0;
      const { width, height } = header.getBoundingClientRect();
      if (!width || !height) return;
      const edge = Math.min(width, height) * .035;
      const insideWidth = Math.max(width - edge * 2, 0);
      const insideHeight = Math.max(height - edge * 2, 0);
      const svg = `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nav-red-grad" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>
            <linearGradient id="nav-blue-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>
          </defs>
          <rect x="0" y="0" width="${width}" height="${height}" fill="black" />
          <rect x="0" y="0" width="${width}" height="${height}" rx="40" fill="url(#nav-red-grad)" />
          <rect x="0" y="0" width="${width}" height="${height}" rx="40" fill="url(#nav-blue-grad)" style="mix-blend-mode:difference" />
          <rect x="${edge}" y="${edge}" width="${insideWidth}" height="${insideHeight}" rx="40" fill="hsl(0 0% 50% / .93)" style="filter:blur(11px)" />
        </svg>`;
      map.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svg)}`);
    };
    const scheduleMap = () => {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(updateMap);
    };
    updateMap();
    if ('ResizeObserver' in window) new ResizeObserver(scheduleMap).observe(header);
    else window.addEventListener('resize', scheduleMap);
    window.addEventListener('site-language-change', scheduleMap);
  } else {
    header.classList.add('glass-surface--fallback');
  }

  const pill = document.createElement('span');
  pill.className = 'liquid-nav-hover';
  pill.setAttribute('aria-hidden', 'true');
  nav.prepend(pill);
  const placePill = (link) => {
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (!pill.style.opacity || pill.style.opacity === '0') {
      pill.style.transition = 'none';
      pill.style.setProperty('--pill-left', `${linkRect.left - navRect.left}px`);
      pill.style.width = `${linkRect.width}px`;
      pill.getBoundingClientRect();
      pill.style.removeProperty('transition');
    } else {
      pill.style.setProperty('--pill-left', `${linkRect.left - navRect.left}px`);
      pill.style.width = `${linkRect.width}px`;
    }
    pill.style.opacity = '1';
  };
  nav.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const link = event.target.closest('a');
    if (!link || !nav.contains(link)) return;
    placePill(link);
    const rect = pill.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pill.style.setProperty('--liquid-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    pill.style.setProperty('--liquid-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
  nav.addEventListener('pointerleave', () => { pill.style.opacity = '0'; });
  nav.addEventListener('focusin', (event) => {
    const link = event.target.closest('a');
    if (link && nav.contains(link)) placePill(link);
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) pill.style.opacity = '0';
  });
  window.addEventListener('resize', () => { pill.style.opacity = '0'; });
})();
