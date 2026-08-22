(() => {
  const STORAGE_KEY = 'roylyl.background-music.v1';
  const source = 'assets/你离开了南京，从此没有人和我说话.mp3';

  let audio = document.querySelector('#backgroundMusic');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'backgroundMusic';
    audio.src = source;
    audio.preload = 'metadata';
    audio.loop = true;
    document.body.appendChild(audio);
  }

  let toggle = document.querySelector('.music-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.className = 'music-toggle is-muted';
    toggle.type = 'button';
    toggle.innerHTML = `
      <span class="music-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path class="speaker-shape" d="M4 9v6h4l5 4V5L8 9H4Z"></path>
          <path class="sound-wave" d="M16 8.4a5 5 0 0 1 0 7.2M18.6 5.8a8.5 8.5 0 0 1 0 12.4"></path>
          <path class="mute-mark" d="m16.3 9.3 4.4 4.4m0-4.4-4.4 4.4"></path>
        </svg>
      </span>
      <span class="music-label"></span>`;
    const header = document.querySelector('.site-header, .ss-nav, .detail-nav, .p-nav');
    const language = header?.querySelector('.lang-switcher');
    if (header) header.insertBefore(toggle, language || null);
  }

  function readState() {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null'); } catch (_) { return null; }
  }

  function saveState(enabled = !audio.paused && !audio.muted) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        enabled,
        currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
        savedAt: Date.now()
      }));
    } catch (_) {}
  }

  function getLabel(enabled) {
    const lang = document.documentElement.lang;
    if (lang === 'en') return enabled ? 'Background music on' : 'Background music muted';
    if (lang === 'zh-TW') return enabled ? '背景音樂開啟' : '背景音樂靜音';
    return enabled ? '背景音乐打开' : '背景音乐静音';
  }

  function render(enabled) {
    const label = getLabel(enabled);
    toggle.classList.toggle('is-muted', !enabled);
    toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    const text = toggle.querySelector('.music-label');
    if (text) text.textContent = label;
  }

  if (window.parent !== window) {
    audio.remove();
    toggle.addEventListener('click', () => {
      window.parent.postMessage({ type: 'site:music-toggle' }, location.origin);
    });
    window.addEventListener('message', (event) => {
      if (event.origin === location.origin && event.source === window.parent && event.data?.type === 'site:music-state') {
        render(Boolean(event.data.enabled));
      }
    });
    window.addEventListener('site-language-change', () => {
      window.parent.postMessage({ type: 'site:music-state-request' }, location.origin);
    });
    render(false);
    window.parent.postMessage({ type: 'site:music-state-request' }, location.origin);
    return;
  }

  async function playFromState(state) {
    if (!state?.enabled) { render(false); return; }
    const elapsed = Math.max(0, (Date.now() - (state.savedAt || Date.now())) / 1000);
    const setTime = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = (Math.max(0, state.currentTime || 0) + elapsed) % audio.duration;
      }
    };
    if (audio.readyState >= 1) setTime();
    else audio.addEventListener('loadedmetadata', setTime, { once: true });
    audio.muted = false;
    try {
      await audio.play();
      render(true);
    } catch (_) {
      audio.muted = true;
      render(false);
    }
  }

  function mute() {
    audio.pause();
    audio.muted = true;
    saveState(false);
    render(false);
  }

  async function togglePlayback() {
    if (!audio.paused && !audio.muted) { mute(); return; }
    audio.muted = false;
    try {
      await audio.play();
      saveState(true);
      render(true);
    } catch (_) {
      mute();
    }
  }

  toggle.addEventListener('click', togglePlayback);

  function sendState(target) {
    target?.postMessage({ type: 'site:music-state', enabled: !audio.paused && !audio.muted }, location.origin);
  }

  window.addEventListener('message', async (event) => {
    if (event.origin !== location.origin) return;
    if (event.data?.type === 'site:music-toggle') {
      await togglePlayback();
      sendState(event.source);
    } else if (event.data?.type === 'site:music-state-request') {
      sendState(event.source);
    }
  });

  // Cross-origin players do not expose their internal controls to the parent page.
  // Focusing one of their iframes is the reliable signal that the visitor clicked it.
  window.addEventListener('blur', () => {
    if (document.activeElement?.matches('.video-grid iframe')) mute();
  });
  window.addEventListener('site-language-change', () => render(!audio.paused && !audio.muted));
  window.addEventListener('pagehide', () => saveState(), { capture: true });
  audio.addEventListener('timeupdate', () => saveState(!audio.paused && !audio.muted));

  playFromState(readState());
  window.siteBackgroundMusic = { mute, toggle: togglePlayback };
})();
