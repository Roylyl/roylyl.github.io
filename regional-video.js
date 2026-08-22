(() => {
  const players = [
    { bvid: 'BV1WJ596FE2u', title: '忧书 Cover 黄贯中' },
    { bvid: 'BV1GpL46TE9L', title: '《梦幻丽莎发廊》Cover 五条人' }
  ];

  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();

  function useBilibili() {
    const frames = [...document.querySelectorAll('.video-grid iframe')];
    frames.slice(0, players.length).forEach((frame, index) => {
      const video = players[index];
      frame.src = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(video.bvid)}&page=1&high_quality=1&danmaku=0&autoplay=0`;
      frame.title = video.title;
      frame.setAttribute('allowfullscreen', 'true');
      frame.setAttribute('scrolling', 'no');
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allow', 'fullscreen; picture-in-picture');
    });
    document.documentElement.dataset.videoPlatform = 'bilibili';
  }

  function useYouTube() {
    document.documentElement.dataset.videoPlatform = 'youtube';
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
    try {
      const data = await fetchWithTimeout('https://api.country.is/');
      const country = normalizeCountry(data?.country);
      if (country) return country;
    } catch (_) {}

    try {
      const text = await fetchWithTimeout('https://ipapi.co/country/', true);
      const country = normalizeCountry(text);
      if (/^[A-Z]{2}$/.test(country)) return country;
    } catch (_) {}

    return '';
  }


  // A fresh promise is created for every document load. The notice script can
  // reuse it on the home page without turning the result into persistent cache.
  const countryPromise = detectCountry();
  window.__roylylCountryPromise = countryPromise;

  async function init() {
    if (!document.querySelector('.video-grid iframe')) return;
    document.documentElement.dataset.regionCheckedAt = String(Date.now());
    const country = await countryPromise;
    if (country) document.documentElement.dataset.country = country;
    if (country === 'CN') useBilibili();
    else useYouTube();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
