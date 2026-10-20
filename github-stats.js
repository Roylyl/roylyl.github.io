(() => {
  const root = document.querySelector('[data-github-stats]');
  if (!root) return;
  const key = 'roylyl.github-stats.v1';
  const ttl = 6 * 60 * 60 * 1000;
  let current;
  const copy = {
    'zh-CN': ['项目总下载量', 'Star总数', 'GitHub粉丝', '公开仓库Release附件累计下载次数', '更新于', '暂时无法获取统计'],
    'zh-TW': ['項目總下載量', 'Star總數', 'GitHub粉絲', '公開倉庫Release附件累計下載次數', '更新於', '暫時無法取得統計'],
    en: ['Total downloads', 'Total stars', 'GitHub followers', 'Cumulative release asset downloads across public repositories', 'Updated', 'Statistics temporarily unavailable']
  };
  const valid = data => data && ['downloads', 'stars', 'followers'].every(k => Number.isSafeInteger(data[k]) && data[k] >= 0) && Number.isFinite(Date.parse(data.updatedAt));
  function render() {
    const lang = document.documentElement.lang;
    const words = copy[lang] || copy.en;
    root.querySelectorAll('[data-stat-label]').forEach((el, i) => { el.textContent = ['DOWNLOADS', 'STARS', 'FOLLOWERS'][i]; el.closest('a').title = words[i]; });
    if (!current) return;
    for (const field of ['downloads', 'stars', 'followers']) {
      root.querySelector(`[data-stat="${field}"]`).textContent = new Intl.NumberFormat(lang).format(current[field]);
    }
  }
  function accept(data) {
    if (valid(data) && (!current || Date.parse(data.updatedAt) > Date.parse(current.updatedAt))) current = data;
    render();
  }
  async function json(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, { signal: controller.signal, credentials: 'omit' });
      if (!response.ok) throw new Error(`Statistics HTTP ${response.status}`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  async function pages(path) {
    const rows = [];
    for (let page = 1; ; page++) {
      const batch = await json(`https://api.github.com${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
      if (!Array.isArray(batch)) throw new Error('Invalid statistics response');
      rows.push(...batch);
      if (batch.length < 100) return rows;
    }
  }
  async function refresh() {
    try { accept(JSON.parse(localStorage.getItem(key))); } catch (_) { /* Storage may be unavailable. */ }
    try { accept(await json('assets/github-stats.json')); } catch (_) { render(); }
    if (current && Date.now() - Date.parse(current.updatedAt) < ttl) return;
    try {
      const [user, repos] = await Promise.all([json('https://api.github.com/users/Roylyl'), pages('/users/Roylyl/repos?type=owner')]);
      let downloads = 0;
      let next = 0;
      // Bound concurrency and publish only after every repository succeeds.
      await Promise.all(Array.from({ length: Math.min(3, repos.length) }, async () => {
        while (next < repos.length) {
          const repo = repos[next++];
          for (const release of await pages(`/repos/${repo.full_name}/releases`)) {
            if (release.draft) continue;
            const assets = release.assets.length >= 100 ? await pages(`/repos/${repo.full_name}/releases/${release.id}/assets`) : release.assets;
            downloads += assets.reduce((total, asset) => total + asset.download_count, 0);
          }
        }
      }));
      const data = { downloads, stars: repos.reduce((total, repo) => total + repo.stargazers_count, 0), followers: user.followers, updatedAt: new Date().toISOString() };
      if (!valid(data)) throw new Error('Invalid totals');
      accept(data);
      try { localStorage.setItem(key, JSON.stringify(data)); } catch (_) { /* Keep the in-memory result. */ }
    } catch (_) { /* Preserve the last complete snapshot on network failure or rate limiting. */ }
  }
  window.addEventListener('site-language-change', render);
  if (document.readyState === 'complete') refresh();
  else window.addEventListener('load', refresh, { once: true });
})();
