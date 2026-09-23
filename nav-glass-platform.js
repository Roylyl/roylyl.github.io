// Use device identity, not viewport width: a narrow desktop window stays optical.
(function (root, factory) {
  const policy = factory();
  if (typeof module === 'object' && module.exports) module.exports = policy;
  else root.PortfolioGlassPlatform = policy;
})(typeof window === 'object' ? window : globalThis, function () {
  function usesNativeBlur(device) {
    const ua = device.userAgent || '';
    // Touch-enabled Windows laptops are still desktop devices.
    if (/Windows NT|CrOS/.test(ua)) return false;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
      device.userAgentData?.mobile === true ||
      (/Macintosh|MacIntel/.test(ua + ' ' + (device.platform || '')) && device.maxTouchPoints > 1);
  }
  return Object.freeze({ usesNativeBlur });
});
