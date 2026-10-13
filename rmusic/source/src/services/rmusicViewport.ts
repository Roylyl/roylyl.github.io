// iOS can report a shorter installed-app viewport than 100vh. Keep the canvas
// in document flow and reserve that difference for controls, not backgrounds.
let installed = false;

export const installRmusicViewport = () => {
    if (installed || typeof window === 'undefined') return;
    installed = true;
    const root = document.documentElement;
    const standalone = Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
        || matchMedia('(display-mode: standalone)').matches;
    root.dataset.rmusicStandalone = String(standalone);
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!standalone || !ios) return;

    const probe = document.createElement('div');
    probe.dataset.rmusicViewportProbe = '';
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:0;height:100vh;top:0;left:0;';
    document.body.append(probe);
    let frame = 0;
    let lastHeight = '';
    let lastGap = '';

    const sync = () => {
        frame = 0;
        const viewport = window.visualViewport;
        // Pinch zoom must retain the browser's own panning and magnification.
        const zoomed = viewport && Math.abs(viewport.scale - 1) > 0.05;
        const canvasHeight = probe.getBoundingClientRect().height || innerHeight;
        const visibleHeight = viewport && !zoomed ? viewport.height : innerHeight;
        const active = document.activeElement;
        const editing = active instanceof HTMLElement
            && (active.matches('input, textarea') || active.isContentEditable);
        const keyboardOpen = !zoomed && editing
            && canvasHeight - visibleHeight > Math.max(160, canvasHeight * 0.2);
        const height = keyboardOpen ? `${visibleHeight}px` : '100vh';
        const gap = `${zoomed || keyboardOpen ? 0 : Math.max(0, canvasHeight - visibleHeight)}px`;
        if (height === lastHeight && gap === lastGap) return;
        lastHeight = height;
        lastGap = gap;
        root.style.setProperty('--rmusic-viewport-height', height);
        root.style.setProperty('--rmusic-viewport-gap', gap);
        document.dispatchEvent(new Event('rmusic-viewportchange'));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    window.addEventListener('pageshow', schedule);
    viewportEvents(window.visualViewport, schedule);
    document.addEventListener('visibilitychange', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    sync();
};

const viewportEvents = (viewport: VisualViewport | null, listener: () => void) => {
    viewport?.addEventListener('resize', listener);
    viewport?.addEventListener('scroll', listener);
};
