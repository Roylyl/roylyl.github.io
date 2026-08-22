(() => {
  const CACHE_KEY = 'roylyl.video-region.v1';
  const MAX_AGE = 24 * 60 * 60 * 1000;
  const players = [
    { bvid: 'BV1WJ596FE2u', title: '忧书 Cover 黄贯中' },
    { bvid: 'BV1GpL46TE9L', title: '《梦幻丽莎发廊》Cover 五条人' }
  ];

  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();

  function useBilibili() {
    document.documentElement.dataset.videoPlatform = 'bilibili';
  }

  function readCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (parsed?.country && Date.now() - parsed.time < MAX_AGE) return normalizeCountry(parsed.country);
    } catch (_) {}
    return '';
  }

  function saveCache(country) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ country, time: Date.now() })); } catch (_) {}
  }

  async function fetchWithTimeout(url, asText = false) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2800);
    try {
      const response = await fetch(url, { signal: controller.signal, cache: 'no-store', mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return asText ? await response.text() : await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function detectCountry() {
    const cached = readCache();
    if (cached) return cached;

    try {
      const data = await fetchWithTimeout('https://api.country.is/');
      const country = normalizeCountry(data?.country);
      if (country) { saveCache(country); return country; }
    } catch (_) {}

    try {
      const text = await fetchWithTimeout('https://ipapi.co/country/', true);
      const country = normalizeCountry(text);
      if (/^[A-Z]{2}$/.test(country)) { saveCache(country); return country; }
    } catch (_) {}

    return '';
  }

  async function init() {
    if (!document.querySelector('.video-load')) return;
    const country = await detectCountry();
    if (country) document.documentElement.dataset.country = country;
    if (country === 'CN') useBilibili();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
