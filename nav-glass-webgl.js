// WebKit/Firefox adapter. Every glass surface uses the same optical map as SVG.
import { createLiquidGlassBackdrop, createWebGLSurface } from './vendor/liquid-glass/renderer.js?v=20260923-3';

let sharedScene;

function createScene() {
  const surfaces = new Map();
  const canvasOwners = new WeakMap();
  const transparency = matchMedia('(prefers-reduced-transparency: reduce)');
  const particle = document.querySelector('[data-particle-canvas]');
  let controller;
  let previousParticleHook;
  let routeVisible = !document.documentElement.classList.contains('detail-shell-open');
  let particleOpacity = 1;
  let disposed = false;

  const options = ({ lens }) => ({
    map: lens.url, scale: lens.scale,
    dispersion: -lens.scale * (lens.dispersion ?? .1),
    additiveDispersion: true, classic: false, neutralPoint: lens.neutralPoint,
    radius: lens.radius, blur: 0, saturation: 145, specular: 0
  });
  const setReady = (record) => {
    const ready = record.captureReady && record.opticalStatus === 'active';
    if (record.output) record.output.hidden = !ready;
    record.surface.classList.toggle('glass-surface--webgl', ready);
    record.surface.dataset.glassRenderer = ready ? 'webgl' : record.opticalStatus;
    if (ready) delete record.surface.dataset.glassCapture;
  };

  // The particle canvas has a single synchronous callback, before its WebGL
  // framebuffer is cleared. Copy only each visible lens's small sampling area.
  const copyParticles = (...args) => {
    if (typeof previousParticleHook === 'function') {
      try { previousParticleHook.apply(particle, args); } catch (_) {}
    }
    const source = particle.getBoundingClientRect();
    for (const record of surfaces.values()) {
      record.particleRect = undefined;
      if (!record.engine || !source.width || !source.height) continue;
      const rect = record.surface.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= innerHeight ||
          rect.right <= 0 || rect.left >= innerWidth || source.bottom < rect.top || source.top > rect.bottom) continue;
      const guard = Math.max(16, Math.ceil(Math.abs(record.lens.scale) / 2) + 2);
      const area = new DOMRect(rect.left - guard, rect.top - guard, rect.width + guard * 2, rect.height + guard * 2);
      const width = Math.ceil(area.width), height = Math.ceil(area.height);
      const frame = record.particleFrame;
      const context = record.particleContext;
      if (!context) continue;
      if (frame.width !== width || frame.height !== height) {
        frame.width = width; frame.height = height;
      } else context.clearRect(0, 0, width, height);
      const scaleX = particle.width / source.width, scaleY = particle.height / source.height;
      try {
        context.drawImage(particle,
          (area.left - source.left) * scaleX, (area.top - source.top) * scaleY,
          area.width * scaleX, area.height * scaleY, 0, 0, width, height);
        record.particleRect = area;
      } catch (_) {
        // A lost particle context must never interrupt the original draw loop.
      }
    }
  };
  const attachParticles = () => {
    if (!particle || particle.onGlassFrame === copyParticles) return;
    previousParticleHook = particle.onGlassFrame;
    particleOpacity = Number(getComputedStyle(particle).opacity);
    particle.onGlassFrame = copyParticles;
  };
  const detachParticles = () => {
    if (particle?.onGlassFrame === copyParticles) {
      if (previousParticleHook) particle.onGlassFrame = previousParticleHook;
      else delete particle.onGlassFrame;
    }
    previousParticleHook = undefined;
  };

  const ensureController = () => {
    if (controller) return;
    // Only the surfaces are excluded. Capturing their complete parent section
    // preserves the photo and its stacking order behind both floating cards.
    controller = createLiquidGlassBackdrop(document.body, {
      sections: () => [...document.querySelectorAll('body > .bg-orb, body > .noise, main > :not(script):not(style), body > footer')],
      captureMedia: false,
      maxCacheBytes: 24 * 1024 * 1024,
      fontEmbedCSS: '',
      backgroundColor: getComputedStyle(document.body).backgroundColor,
      paintBackground: (context, area) => {
        // Each registered surface has its own composition canvas but shares
        // cached section captures. Paint its corresponding particle crop once.
        const record = canvasOwners.get(context.canvas);
        const rect = record?.particleRect;
        if (!rect) return;
        context.save(); context.globalAlpha = particleOpacity;
        context.drawImage(record.particleFrame, rect.left - area.left, rect.top - area.top, rect.width, rect.height);
        context.restore();
      },
      onCaptureError: () => {
        for (const record of surfaces.values()) record.surface.dataset.glassCapture = 'unavailable';
      }
    });
  };
  const stopSurface = (record) => {
    record.generation++;
    record.engine?.destroy();
    if (record.binding) canvasOwners.delete(record.binding.canvas);
    record.binding?.release();
    record.output?.remove();
    record.engine = record.binding = record.output = undefined;
    record.particleRect = undefined;
    record.particleFrame.width = record.particleFrame.height = 0;
    record.captureReady = false;
    record.opticalStatus = 'pending';
    setReady(record);
  };
  const startSurface = (record) => {
    if (record.engine || !record.surface.isConnected) return;
    const generation = ++record.generation;
    const output = document.createElement('div');
    output.className = 'liquid-glass-webgl';
    output.setAttribute('aria-hidden', 'true');
    output.dataset.liquidGlassIgnore = '';
    output.hidden = true;
    record.surface.prepend(output);
    record.output = output;
    try {
      ensureController();
      record.binding = controller.register(record.surface, (ready) => {
        if (record.generation !== generation) return;
        record.captureReady = ready; setReady(record);
      });
      canvasOwners.set(record.binding.canvas, record);
      record.engine = createWebGLSurface(record.surface, output, record.binding.canvas, options(record), (status) => {
        if (record.generation !== generation) return;
        record.opticalStatus = status; setReady(record);
      });
      attachParticles();
    } catch (_) {
      stopSurface(record);
      record.opticalStatus = 'unavailable'; setReady(record);
    }
  };
  const stop = () => {
    detachParticles();
    for (const record of surfaces.values()) stopSurface(record);
    controller?.destroy(); controller = undefined;
  };
  const sync = () => {
    if (disposed) return;
    if (document.hidden || !routeVisible || transparency.matches) stop();
    else for (const record of surfaces.values()) startSurface(record);
  };
  const onRoute = (event) => {
    if (typeof event.detail?.visible !== 'boolean') return;
    routeVisible = event.detail.visible; sync();
  };
  const onMessage = (event) => {
    if (window.parent === window || event.source !== window.parent || event.origin !== location.origin) return;
    if (event.data?.type !== 'site:visibility' || typeof event.data.visible !== 'boolean') return;
    routeVisible = event.data.visible; sync();
  };
  const dispose = () => {
    stop(); disposed = true;
    document.removeEventListener('visibilitychange', sync);
    transparency.removeEventListener('change', sync);
    window.removeEventListener('site:visibility-change', onRoute);
    window.removeEventListener('message', onMessage);
    window.removeEventListener('pagehide', stop);
    window.removeEventListener('pageshow', sync);
    sharedScene = undefined;
  };
  document.addEventListener('visibilitychange', sync);
  transparency.addEventListener('change', sync);
  window.addEventListener('site:visibility-change', onRoute);
  window.addEventListener('message', onMessage);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', sync);

  return {
    mount(surface, lens) {
      const existing = surfaces.get(surface);
      if (existing) { existing.handle.update(lens); return existing.handle; }
      const particleFrame = document.createElement('canvas');
      const previousSurface = surface.getAttribute('data-liquid-glass-scene-surface');
      // Keep the exclusion present even while stopped; another active surface
      // must never capture this glass, its text, or its GPU output recursively.
      surface.setAttribute('data-liquid-glass-scene-surface', '');
      const record = {
        surface, lens, particleFrame, particleContext: particleFrame.getContext('2d'),
        captureReady: false, opticalStatus: 'pending', generation: 0
      };
      let released = false;
      record.handle = {
        update(nextLens) {
          if (released) return;
          record.lens = nextLens; record.engine?.update(options(record));
        },
        dispose() {
          if (released) return;
          released = true; stopSurface(record); surfaces.delete(surface);
          if (previousSurface === null) surface.removeAttribute('data-liquid-glass-scene-surface');
          else surface.setAttribute('data-liquid-glass-scene-surface', previousSurface);
          delete surface.dataset.glassRenderer;
          delete surface.dataset.glassCapture;
          if (!surfaces.size) dispose();
        }
      };
      surfaces.set(surface, record);
      sync();
      return record.handle;
    }
  };
}

export function mountGlassRenderer(surface, initialLens) {
  sharedScene ??= createScene();
  return sharedScene.mount(surface, initialLens);
}
