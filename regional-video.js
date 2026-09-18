(() => {
  const videos = [
    {
      bvid: 'BV1WJ596FE2u',
      titles: { 'zh-CN': '忧书 Cover 黄贯中', 'zh-TW': '憂書 Cover 黃貫中', en: 'You Shu · Paul Wong cover' }
    },
    {
      bvid: 'BV1GpL46TE9L',
      titles: { 'zh-CN': '《梦幻丽莎发廊》Cover 五条人', 'zh-TW': '《夢幻麗莎髮廊》Cover 五條人', en: 'Menghuan Lisha Falang · Wu Tiao Ren cover' }
    }
  ];
  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();

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
      if (/^[A-Z]{2}$/.test(country)) return country;
    } catch (_) {}
    try {
      const country = normalizeCountry(await fetchWithTimeout('https://ipapi.co/country/', true));
      if (/^[A-Z]{2}$/.test(country)) return country;
    } catch (_) {}
    return '';
  }

  // Share this fresh IP lookup with the home-page network notice.
  const countryPromise = detectCountry();
  window.__roylylCountryPromise = countryPromise;

  function init() {
    const players = [...document.querySelectorAll('.video-grid iframe')].slice(0, videos.length).map((frame, index) => ({
      frame, card: frame.parentElement, video: videos[index], youtubeURL: frame.getAttribute('src')
    }));
    if (!players.length) return;
    let visible = !document.documentElement.classList.contains('detail-shell-open');

    function renderTitles() {
      const language = document.documentElement.lang;
      players.forEach(({ frame, video }) => {
        frame.title = video.titles[language] || video.titles.en;
      });
    }

    function setVisible(next) {
      visible = next;
      players.forEach(({ frame, card }) => {
        // Detaching destroys the browsing context and stops playback without
        // adding an iframe navigation to the browser's back/forward history.
        if (!visible) frame.remove();
        else if (!frame.isConnected) card.appendChild(frame);
      });
    }

    window.addEventListener('site-language-change', renderTitles);
    window.addEventListener('site:visibility-change', (event) => {
      setVisible(event.detail?.visible !== false);
    });
    renderTitles();
    setVisible(visible);
    document.documentElement.dataset.regionCheckedAt = String(Date.now());
    countryPromise.then((country) => {
      if (country) document.documentElement.dataset.country = country;
      const platform = country === 'CN' ? 'bilibili' : 'youtube';
      document.documentElement.dataset.videoPlatform = platform;
      players.forEach(({ frame, video, youtubeURL }) => {
        const source = platform === 'bilibili'
          ? `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(video.bvid)}&page=1&high_quality=1&danmaku=0&autoplay=0`
          : youtubeURL;
        if (frame.getAttribute('src') !== source) frame.src = source;
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
