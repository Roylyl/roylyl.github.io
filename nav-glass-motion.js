// Safari's compositor can scroll before a JavaScript background snapshot is
// painted. Never display that old snapshot during input or momentum scrolling.
export function watchGlassMotion(onChange, view = window) {
  let moving = false;
  let touches = 0;
  let timer = 0;
  let frame = 0;
  let disposed = false;
  const quietPeriod = 180;
  const cancel = () => {
    view.clearTimeout(timer);
    view.cancelAnimationFrame(frame);
    timer = frame = 0;
  };
  const settle = () => {
    cancel();
    if (touches || disposed) return;
    timer = view.setTimeout(() => {
      timer = 0;
      // Allow both scene composition and the optical renderer to paint at the
      // settled coordinates before exposing their output. No cross-fade: that
      // would itself blend two differently positioned copies of the background.
      frame = view.requestAnimationFrame(() => {
        frame = view.requestAnimationFrame(() => {
          frame = 0;
          if (disposed || touches) return;
          moving = false;
          onChange(false);
        });
      });
    }, quietPeriod);
  };
  const begin = () => {
    cancel();
    if (!moving) { moving = true; onChange(true); }
    settle();
  };
  const touchStart = (event) => { touches = event.touches.length; begin(); };
  const touchEnd = (event) => { touches = event.touches.length; settle(); };
  const listeners = [
    [view, 'scroll', begin, { passive: true, capture: true }],
    [view, 'wheel', begin, { passive: true }],
    [view, 'touchstart', touchStart, { passive: true, capture: true }],
    [view, 'touchend', touchEnd, { passive: true, capture: true }],
    [view, 'touchcancel', touchEnd, { passive: true, capture: true }],
    [view, 'resize', begin, { passive: true }],
    [view.visualViewport, 'scroll', begin, { passive: true }],
    [view.visualViewport, 'resize', begin, { passive: true }]
  ];
  for (const [target, type, listener, options] of listeners) target?.addEventListener(type, listener, options);
  return () => {
    disposed = true; cancel();
    for (const [target, type, listener, options] of listeners) target?.removeEventListener(type, listener, options);
  };
}
