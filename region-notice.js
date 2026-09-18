(() => {
  // Embedded project pages use the parent's detection and never open a second
  // modal or send another country lookup while the home page is underneath.
  if (window.parent !== window) {
    try { window.__roylylCountryPromise = window.parent.__roylylCountryPromise; } catch (_) {}
    return;
  }

  const key = 'roylyl.region-notice.shown-at.v1';
  const cooldown = 60 * 60 * 1000;
  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();
  const messages = {
    'zh-CN': {
      title: '访问提示',
      body: '由于该网页服务器架设在境外，在中国大陆访问时，图片可能加载缓慢，请耐心等待。',
      close: '我知道了'
    },
    'zh-TW': {
      title: '存取提示',
      body: '由於此網頁伺服器架設在境外，在中國大陸存取時，圖片可能載入緩慢，請耐心等候。',
      close: '我知道了'
    },
    en: {
      title: 'Access notice',
      body: 'This website is hosted outside mainland China. Images may load slowly when accessing it from mainland China. Please allow some extra time.',
      close: 'Got it'
    }
  };
  let pending = false;
  let dialog = null;

  function wasShownRecently() {
    try {
      const shownAt = Number(localStorage.getItem(key));
      return Number.isFinite(shownAt) && shownAt > 0 && Date.now() - shownAt < cooldown;
    } catch (_) {
      return false;
    }
  }

  function rememberShown() {
    try { localStorage.setItem(key, String(Date.now())); } catch (_) {}
  }

  function render() {
    if (!dialog) return;
    const copy = messages[document.documentElement.lang] || messages.en;
    dialog.querySelector('h2').textContent = copy.title;
    dialog.querySelector('[data-region-notice-body]').textContent = copy.body;
    dialog.querySelector('button').textContent = copy.close;
  }

  function showWhenVisible() {
    if (!pending) return;
    if (wasShownRecently()) { pending = false; return; }
    // A late lookup must not cover a project the visitor has already opened,
    // another active dialog, or a background browser tab.
    if (document.hidden || document.documentElement.classList.contains('detail-shell-open') || document.querySelector('dialog[open]')) return;
    pending = false;
    const returnFocus = document.activeElement;
    const notice = document.createElement('dialog');
    dialog = notice;
    notice.className = 'region-notice';
    notice.dataset.i18nStatic = '';
    notice.setAttribute('aria-labelledby', 'regionNoticeTitle');
    notice.setAttribute('aria-describedby', 'regionNoticeBody');
    notice.innerHTML = '<p class="region-notice-kicker">NETWORK NOTICE</p><h2 id="regionNoticeTitle"></h2><p id="regionNoticeBody" data-region-notice-body></p><button type="button" data-region-notice-close autofocus></button>';
    document.body.appendChild(notice);
    render();
    notice.querySelector('button').addEventListener('click', () => notice.close());
    // Escape uses the native cancel/close behavior. The native modal also keeps
    // keyboard focus inside until dismissal and makes the page inert.
    notice.addEventListener('close', () => {
      notice.remove();
      if (dialog === notice) dialog = null;
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected && !returnFocus.closest('[inert]') && returnFocus.getClientRects().length) {
        returnFocus.focus({ preventScroll: true });
      }
    }, { once: true });
    notice.showModal();
    notice.querySelector('button').focus({ preventScroll: true });
    rememberShown();
  }

  async function detectCountry() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    try {
      const response = await fetch('https://ipwho.is/', { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) return '';
      const data = await response.json();
      return data?.success ? normalizeCountry(data.country_code) : '';
    } catch (_) {
      return '';
    } finally {
      clearTimeout(timeout);
    }
  }

  window.addEventListener('site-language-change', render);
  window.addEventListener('site:visibility-change', (event) => {
    if (event.detail?.visible === false) {
      if (dialog?.open) dialog.close();
    } else showWhenVisible();
  });
  document.addEventListener('visibilitychange', showWhenVisible);
  document.addEventListener('close', () => queueMicrotask(showWhenVisible), true);

  const countryPromise = window.__roylylCountryPromise || detectCountry();
  window.__roylylCountryPromise = countryPromise;
  countryPromise.then((country) => {
    pending = normalizeCountry(country) === 'CN';
    showWhenVisible();
  }).catch(() => {});
})();
