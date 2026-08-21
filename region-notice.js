(() => {
  const key = 'roylyl.region-notice.acknowledged';
  if (localStorage.getItem(key) === '1') return;
  const show = () => {
    if (document.querySelector('.region-notice-backdrop')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'region-notice-backdrop';
    backdrop.innerHTML = '<section class="region-notice" role="dialog" aria-modal="true" aria-labelledby="regionNoticeTitle"><p class="region-notice-kicker">NETWORK NOTICE</p><h2 id="regionNoticeTitle">访问提示</h2><p>由于该网页服务器架设在境外，在中国大陆访问时，图片可能加载缓慢，请耐心等待。</p><button type="button" data-region-notice-close>我知道了</button></section>';
    document.body.appendChild(backdrop);
    backdrop.querySelector('[data-region-notice-close]').addEventListener('click', () => { localStorage.setItem(key, '1'); backdrop.remove(); });
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  fetch('https://ipwho.is/', { signal: controller.signal, cache: 'no-store' }).then((r) => r.ok ? r.json() : null).then((data) => { if (data?.success && data?.country_code === 'CN') show(); }).catch(() => {}).finally(() => clearTimeout(timeout));
})();
