// Element-local convex refraction: shared Snell map for navigation and hero cards.
// Flat portions have no lateral shift; RGB dispersion follows the same rays.
(() => {
  const header = document.querySelector('.site-header, .ss-nav, .detail-nav, .p-nav');
  const nav = header?.querySelector('nav');
  if (!header || !nav) return;

  header.classList.add('liquid-glass-header');
  const nativeBlur = window.PortfolioGlassPlatform.usesNativeBlur(navigator);
  const surfaces = [header, ...document.querySelectorAll('.hero-floating')];
  const mountSurface = (surface, index) => {
    if (nativeBlur) {
      // No displacement map, DOM capture, or WebGL adapter on phones/tablets.
      const updateNativeSurface = () => {
        const enabled = surface === header || (
          getComputedStyle(surface).position === 'absolute' && surface.offsetWidth > 0 && surface.offsetHeight > 0
        );
        surface.classList.toggle('liquid-glass-surface', enabled);
        surface.classList.toggle('glass-surface--native-blur', enabled);
        if (enabled) surface.dataset.glassRenderer = 'native-blur';
        else delete surface.dataset.glassRenderer;
      };
      updateNativeSurface();
      if ('ResizeObserver' in window) new ResizeObserver(updateNativeSurface).observe(surface);
      window.addEventListener('resize', updateNativeSurface);
      return;
    }
    const filterId = index === 0 ? 'portfolio-nav-glass-filter' : `portfolio-card-glass-filter-${index}`;
    surface.style.setProperty('--glass-filter', `url(#${filterId})`);
    surface.insertAdjacentHTML('afterbegin', `
      <svg class="liquid-glass-filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <filter id="${filterId}" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="0" y="0">
            <feImage x="0" y="0" preserveAspectRatio="none" result="encodedMap" />
            <feColorMatrix in="encodedMap" type="matrix" values="1 0 0 0 -0.0019607843137254832  0 1 0 0 -0.0019607843137254832  0 0 1 0 0  0 0 0 1 0" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" />
          </filter>
        </defs>
      </svg>`);

    const svgFilter = surface.querySelector('filter');
    const map = svgFilter.querySelector('feImage');
    const supportsSvgBackdrop = (() => {
      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      const test = document.createElement('div');
      test.style.backdropFilter = 'url(#portfolio-nav-glass-filter)';
      return !isWebkit && !isFirefox && test.style.backdropFilter !== '';
    })();

    const passes = [...svgFilter.querySelectorAll('feDisplacementMap')];
    const mapCanvas = document.createElement('canvas');
    const mapContext = mapCanvas.getContext('2d');
    let resizeFrame = 0;
    let mapSize = '';
    let lens;
    let webgl;
    let mountWebgl;
    const updateMap = () => {
      resizeFrame = 0;
      // Only cards floating over the portrait use optical glass. In-flow
      // cards reuse .portfolio-card exactly like the experience section.
      const enabled = surface === header || (
        getComputedStyle(surface).position === 'absolute' && surface.offsetWidth > 0 && surface.offsetHeight > 0
      );
      surface.classList.toggle('liquid-glass-surface', enabled);
      if (!enabled) {
        webgl?.dispose();
        webgl = lens = undefined;
        mapSize = '';
        surface.classList.remove('glass-surface--refractive', 'glass-surface--fallback');
        delete surface.dataset.glassRenderer;
        return;
      }
      if (!supportsSvgBackdrop) surface.classList.add('glass-surface--fallback');
      const width = surface.offsetWidth;
      const height = surface.offsetHeight;
      const radius = parseFloat(getComputedStyle(surface).borderTopLeftRadius);
      const nextSize = `${width}:${height}:${radius}`;
      if (!width || !height || nextSize === mapSize) return;
      mapSize = nextSize;
      lens = window.PortfolioGlassOptics.createMap(width, height, radius);
      mapCanvas.width = lens.width;
      mapCanvas.height = lens.height;
      mapContext.putImageData(new ImageData(lens.pixels, lens.width, lens.height), 0, 0);
      lens.url = mapCanvas.toDataURL('image/png');
      for (const element of [svgFilter, map]) {
        element.setAttribute('width', String(width));
        element.setAttribute('height', String(height));
      }
      map.setAttribute('href', lens.url);
      // Red bends least, blue most. No channel can reverse or fold the image.
      const factors = [1 - lens.dispersion, 1, 1 + lens.dispersion];
      passes.forEach((pass, index) => pass.setAttribute('scale', String(lens.scale * factors[index])));
      if (webgl) webgl.update(lens);
      else if (mountWebgl) webgl = mountWebgl(surface, lens);
      if (supportsSvgBackdrop) {
        surface.classList.add('glass-surface--refractive');
        surface.dataset.glassRenderer = 'svg';
      }
    };
    const scheduleMap = () => {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(updateMap);
    };
    updateMap();
    if ('ResizeObserver' in window) new ResizeObserver(scheduleMap).observe(surface);
    window.addEventListener('resize', scheduleMap);
    window.addEventListener('site-language-change', scheduleMap);
    if (!supportsSvgBackdrop) {
      // WebKit cannot apply an SVG URL to its backdrop. It uses the same lens
      // with a small live WebGL surface and section snapshots, loaded on demand.
      import('./nav-glass-webgl.js?v=20260923-7').then(({ mountGlassRenderer }) => {
        mountWebgl = mountGlassRenderer;
        // Re-read the layout: a resize may have happened during the import.
        mapSize = '';
        updateMap();
      }).catch(() => { surface.dataset.glassRenderer = 'unavailable'; });
    }
  };
  surfaces.forEach(mountSurface);

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
