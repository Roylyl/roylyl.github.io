(() => {
  const videos = [
    {
      bvid: 'BV1WJ596FE2u',
      titles: { 'zh-CN': '忧书Cover黄贯中', 'zh-TW': '憂書Cover黃貫中', en: 'You Shu · Paul Wong cover' }
    },
    {
      bvid: 'BV1GpL46TE9L',
      titles: { 'zh-CN': '《梦幻丽莎发廊》Cover五条人', 'zh-TW': '《夢幻麗莎髮廊》Cover五條人', en: 'Menghuan Lisha Falang · Wu Tiao Ren cover' }
    }
  ];
  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();
  const messages = {
    'zh-CN': {
      label: '视频平台', bilibili: 'B站', youtube: 'YouTube',
      unknown: '暂时无法判断访问地区，可手动切换平台。'
    },
    'zh-TW': {
      label: '影片平台', bilibili: 'B站', youtube: 'YouTube',
      unknown: '暫時無法判斷存取地區，可手動切換平台。'
    },
    en: {
      label: 'Video platform', bilibili: 'Bilibili', youtube: 'YouTube',
      unknown: 'Your region could not be determined. You can switch platforms manually.'
    }
  };

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
      frame, card: frame.parentElement, video: videos[index], youtubeURL: frame.getAttribute('src'), interacted: false
    }));
    if (!players.length) return;
    let visible = !document.documentElement.classList.contains('detail-shell-open');
    let platform = 'youtube';
    let detection = 'pending';
    let manual = false;
    let keepCurrentPlatform = false;
    const grid = players[0].card.parentElement;
    const controls = document.createElement('div');
    controls.className = 'video-platform-controls';
    controls.dataset.i18nStatic = '';
    const choices = document.createElement('div');
    choices.className = 'video-platform-options';
    choices.setAttribute('role', 'group');
    const buttons = ['bilibili', 'youtube'].map((value) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.videoPlatform = value;
      button.addEventListener('click', () => {
        manual = true;
        keepCurrentPlatform = true;
        setPlatform(value);
      });
      choices.appendChild(button);
      return button;
    });
    const status = document.createElement('p');
    status.className = 'video-platform-status';
    status.setAttribute('role', 'status');
    controls.append(choices, status);
    grid.before(controls);
    players.forEach((player) => {
      player.frame.addEventListener('focus', () => activate(player.frame));
    });

    function render() {
      const language = document.documentElement.lang;
      const copy = messages[language] || messages.en;
      choices.setAttribute('aria-label', copy.label);
      buttons.forEach((button) => {
        button.textContent = copy[button.dataset.videoPlatform];
        button.setAttribute('aria-pressed', String(button.dataset.videoPlatform === platform));
      });
      status.textContent = !manual && detection === 'unknown' ? copy.unknown : '';
      status.hidden = !status.textContent;
      players.forEach(({ frame, video }) => {
        const title = video.titles[language] || video.titles.en;
        frame.title = title;
      });
    }

    function reset(player, source) {
      // Removing the frame destroys its browsing context, stopping playback
      // without adding an iframe navigation to browser history. Cross-origin
      // players expose no exact playback state here, so progress is lost.
      player.frame.remove();
      player.interacted = false;
      if (source) player.frame.setAttribute('src', source);
      if (visible) player.card.appendChild(player.frame);
    }

    function stopAll(except = null) {
      players.forEach((player) => {
        if (player.frame !== except && player.interacted) reset(player);
      });
    }

    function activate(frame) {
      const player = players.find((entry) => entry.frame === frame);
      if (!player || !visible || !frame.isConnected) return;
      // Native cross-origin players remain directly usable. Focus/blur is only
      // a best-effort interaction signal, not a confirmed playback event, and
      // may not fire when moving directly between the two player contexts.
      keepCurrentPlatform = true;
      player.interacted = true;
      stopAll(frame);
      window.siteBackgroundMusic?.interruptForVideo();
    }

    function setPlatform(next) {
      platform = next;
      document.documentElement.dataset.videoPlatform = platform;
      players.forEach((player) => {
        const source = platform === 'bilibili'
          ? `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(player.video.bvid)}&page=1&high_quality=1&danmaku=0&autoplay=0`
          : player.youtubeURL;
        if (player.frame.getAttribute('src') !== source) reset(player, source);
      });
      render();
    }

    function setVisible(next) {
      visible = next;
      players.forEach((player) => {
        if (!visible) reset(player);
        else if (!player.frame.isConnected) player.card.appendChild(player.frame);
      });
    }

    window.siteVideoPlayers = { activate, stopAll };
    window.addEventListener('site-language-change', render);
    window.addEventListener('site:visibility-change', (event) => {
      setVisible(event.detail?.visible !== false);
    });
    setPlatform(platform);
    setVisible(visible);
    countryPromise.then((country) => {
      document.documentElement.dataset.regionCheckedAt = String(Date.now());
      document.documentElement.dataset.regionStatus = country ? 'known' : 'unknown';
      if (country) document.documentElement.dataset.country = country;
      detection = country ? 'ready' : 'unknown';
      if (!keepCurrentPlatform && country) setPlatform(country === 'CN' ? 'bilibili' : 'youtube');
      else render();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
