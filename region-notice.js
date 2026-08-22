(() => {
  const key = 'roylyl.region-notice.shown-at.v1';
  const cooldown = 60 * 60 * 1000;

  const normalizeCountry = (value) => String(value || '').trim().toUpperCase();

  function wasShownRecently() {
    try {
      const shownAt = Number(localStorage.getItem(key));
      return Number.isFinite(shownAt) && shownAt > 0 && Date.now() - shownAt < cooldown;
    } catch (_) {
      return false;
    }
  }

  function rememberShown() {
    try {
      localStorage.setItem(key, String(Date.now()));
    } catch (_) {}
  }

  const show = () => {
    if (wasShownRecently() || document.querySelector('.region-notice-backdrop')) return;
    rememberShown();
    const backdrop = document.createElement('div');
    backdrop.className = 'region-notice-backdrop';
    backdrop.innerHTML = '<section class="region-notice" role="dialog" aria-modal="true" aria-labelledby="regionNoticeTitle"><p class="region-notice-kicker">NETWORK NOTICE</p><h2 id="regionNoticeTitle">访问提示</h2><p>由于该网页服务器架设在境外，在中国大陆访问时，图片可能加载缓慢，请耐心等待。</p><button type="button" data-region-notice-close>我知道了</button></section>';
    document.body.appendChild(backdrop);
    backdrop.querySelector('[data-region-notice-close]').addEventListener('click', () => backdrop.remove());
  };

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

  const countryPromise = window.__roylylCountryPromise || detectCountry();
  countryPromise.then((country) => {
    if (normalizeCountry(country) === 'CN') show();
  });
})();
