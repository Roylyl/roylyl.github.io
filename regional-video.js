(() => {
  const preferenceKey = 'roylyl.video.platform';
  const platformNames = { bilibili: 'Bilibili', youtube: 'YouTube' };
  const videos = [
    {
      bvid: 'BV1WJ596FE2u', youtube: 'xj9B_D_6wDI', poster: 'assets/music-stage-1.jpg',
      titles: { 'zh-CN': '忧书 Cover 黄贯中', 'zh-TW': '憂書 Cover 黃貫中', en: 'You Shu · Paul Wong cover' }
    },
    {
      bvid: 'BV1GpL46TE9L', youtube: 'o9ygrOS12eg', poster: 'assets/music-stage-2.jpg',
      titles: { 'zh-CN': '《梦幻丽莎发廊》Cover 五条人', 'zh-TW': '《夢幻麗莎髮廊》Cover 五條人', en: 'Menghuan Lisha Falang · Wu Tiao Ren cover' }
    }
  ];
  const copy = {
    'zh-CN': {
      platform: '播放平台', ready: '点击封面播放，也可以随时切换平台。',
      play: (platform) => `在 ${platform} 播放`, open: (platform) => `在 ${platform} 打开 ↗`,
      loading: '正在加载播放器…', slow: '加载较慢，可重新加载、切换平台或在原平台打开。',
      help: '无法播放？可切换平台或在原平台打开。', error: '播放器加载失败，可重试或在原平台打开。',
      reload: '重新加载', changed: (platform) => `已切换至 ${platform}，点击封面播放。`
    },
    'zh-TW': {
      platform: '播放平台', ready: '點擊封面播放，也可以隨時切換平台。',
      play: (platform) => `在 ${platform} 播放`, open: (platform) => `在 ${platform} 開啟 ↗`,
      loading: '正在載入播放器…', slow: '載入較慢，可重新載入、切換平台或在原平台開啟。',
      help: '無法播放？可切換平台或在原平台開啟。', error: '播放器載入失敗，可重試或在原平台開啟。',
      reload: '重新載入', changed: (platform) => `已切換至 ${platform}，點擊封面播放。`
    },
    en: {
      platform: 'Video platform', ready: 'Select a cover to play. You can switch platforms at any time.',
      play: (platform) => `Play on ${platform}`, open: (platform) => `Open on ${platform} ↗`,
      loading: 'Loading player…', slow: 'Loading is taking a while. Reload, switch platforms, or open the original video.',
      help: 'Trouble playing? Switch platforms or open the original video.', error: 'The player could not load. Retry or open the original video.',
      reload: 'Reload', changed: (platform) => `Switched to ${platform}. Select a cover to play.`
    }
  };
  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();
  const currentLanguage = () => copy[document.documentElement.lang] ? document.documentElement.lang : 'en';

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

  // Shared with the home-page network notice; no third-party player loads here.
  const countryPromise = detectCountry();
  window.__roylylCountryPromise = countryPromise;

  function init() {
    const grid = document.querySelector('.video-grid');
    if (!grid) return;
    let saved = '';
    try { saved = localStorage.getItem(preferenceKey) || ''; } catch (_) {}
    let platform = platformNames[saved] ? saved : (currentLanguage() === 'zh-CN' ? 'bilibili' : 'youtube');
    let hasInteracted = Boolean(platformNames[saved]);
    let platformChanged = false;
    const players = [];
    const controls = document.createElement('div');
    controls.className = 'video-platform-controls';
    controls.dataset.i18nStatic = '';
    controls.innerHTML = '<div class="video-platform-choice" role="group"><span class="video-platform-label" id="videoPlatformLabel"></span><button type="button" data-video-platform="bilibili">Bilibili</button><button type="button" data-video-platform="youtube">YouTube</button></div><p class="video-platform-hint" aria-live="polite"></p>';
    controls.querySelector('[role="group"]').setAttribute('aria-labelledby', 'videoPlatformLabel');
    grid.before(controls);

    const externalURL = (video) => platform === 'bilibili'
      ? `https://www.bilibili.com/video/${video.bvid}/`
      : `https://www.youtube.com/watch?v=${video.youtube}`;
    const embedURL = (video) => platform === 'bilibili'
      ? `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(video.bvid)}&page=1&high_quality=1&danmaku=0&autoplay=1`
      : `https://www.youtube.com/embed/${video.youtube}?autoplay=1&playsinline=1&rel=0`;

    function renderPlayer(player) {
      const language = currentLanguage();
      const labels = copy[language];
      const title = player.video.titles[language];
      player.title.textContent = title;
      player.playLabel.textContent = labels.play(platformNames[platform]);
      player.play.setAttribute('aria-label', `${labels.play(platformNames[platform])}: ${title}`);
      player.open.textContent = labels.open(platformNames[platform]);
      player.open.href = externalURL(player.video);
      player.open.setAttribute('aria-label', `${labels.open(platformNames[platform])}: ${title}`);
      player.reload.textContent = labels.reload;
      player.reload.hidden = player.state === 'ready';
      player.status.textContent = player.state === 'ready' ? '' : labels[player.state];
      player.status.hidden = player.state === 'ready';
      if (player.frame) player.frame.title = title;
    }

    function stopPlayer(player) {
      clearTimeout(player.timeout);
      player.frame?.remove();
      player.frame = null;
      player.state = 'ready';
      player.play.hidden = false;
      player.media.removeAttribute('aria-busy');
    }

    function loadPlayer(player) {
      hasInteracted = true;
      // Keep two music clips from playing over each other.
      players.forEach((other) => {
        stopPlayer(other);
        renderPlayer(other);
      });
      window.siteBackgroundMusic?.mute();
      player.state = 'loading';
      player.play.hidden = true;
      player.media.setAttribute('aria-busy', 'true');
      const frame = document.createElement('iframe');
      player.frame = frame;
      frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.src = embedURL(player.video);
      frame.addEventListener('load', () => {
        if (player.frame !== frame) return;
        clearTimeout(player.timeout);
        player.state = 'help';
        player.media.removeAttribute('aria-busy');
        renderPlayer(player);
      });
      frame.addEventListener('error', () => {
        if (player.frame !== frame) return;
        stopPlayer(player);
        player.state = 'error';
        renderPlayer(player);
        player.play.focus({ preventScroll: true });
      });
      player.timeout = setTimeout(() => {
        if (player.frame !== frame) return;
        player.state = 'slow';
        player.media.removeAttribute('aria-busy');
        renderPlayer(player);
      }, 10000);
      player.media.appendChild(frame);
      renderPlayer(player);
      frame.focus({ preventScroll: true });
    }

    [...grid.querySelectorAll('.video-card')].slice(0, videos.length).forEach((card, index) => {
      card.classList.add('video-player');
      card.dataset.i18nStatic = '';
      card.innerHTML = '<div class="video-player-media"><button class="video-player-poster" type="button"><img alt="" loading="lazy" decoding="async"><span class="video-player-play-icon" aria-hidden="true">▶</span><span class="video-player-play-label"></span></button></div><div class="video-player-details"><h3 class="video-player-title"></h3><div class="video-player-actions"><a target="_blank" rel="noopener noreferrer"></a><button type="button" hidden></button></div><p class="video-player-status" role="status" hidden></p></div>';
      const player = {
        video: videos[index], state: 'ready', frame: null, timeout: null,
        media: card.querySelector('.video-player-media'), play: card.querySelector('.video-player-poster'),
        title: card.querySelector('.video-player-title'), playLabel: card.querySelector('.video-player-play-label'),
        open: card.querySelector('.video-player-actions a'), reload: card.querySelector('.video-player-actions button'),
        status: card.querySelector('.video-player-status')
      };
      card.querySelector('img').src = player.video.poster;
      player.play.addEventListener('click', () => loadPlayer(player));
      player.reload.addEventListener('click', () => loadPlayer(player));
      players.push(player);
    });

    function render() {
      const labels = copy[currentLanguage()];
      document.documentElement.dataset.videoPlatform = platform;
      controls.querySelector('.video-platform-label').textContent = labels.platform;
      controls.querySelector('.video-platform-hint').textContent = platformChanged ? labels.changed(platformNames[platform]) : labels.ready;
      controls.querySelectorAll('button').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.videoPlatform === platform));
      });
      players.forEach(renderPlayer);
    }

    controls.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        hasInteracted = true;
        const next = button.dataset.videoPlatform;
        try { localStorage.setItem(preferenceKey, next); } catch (_) {}
        if (next === platform) return;
        platform = next;
        platformChanged = true;
        players.forEach(stopPlayer);
        render();
      });
    });
    window.addEventListener('site-language-change', render);
    window.addEventListener('site:visibility-change', (event) => {
      if (event.detail?.visible === false) {
        players.forEach(stopPlayer);
        render();
      }
    });
    render();
    document.documentElement.dataset.regionCheckedAt = String(Date.now());
    countryPromise.then((country) => {
      if (country) document.documentElement.dataset.country = country;
      // A manual choice or playback always wins over late geolocation results.
      if (hasInteracted) return;
      if (country) platform = country === 'CN' ? 'bilibili' : 'youtube';
      render();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
