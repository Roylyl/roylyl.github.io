#!/usr/bin/env node
// Targeted sharing, deep-link and logo checks. Native share is captured locally.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
function loadPlaywright() {
  if (process.env.RMUSIC_PLAYWRIGHT_PATH) return require(process.env.RMUSIC_PLAYWRIGHT_PATH);
  try { return require('playwright'); }
  catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  }
}
const { chromium } = loadPlaywright();
const siteRoot = path.resolve(__dirname, '../..');
const catalog = JSON.parse(fs.readFileSync(path.join(siteRoot, 'music/data/catalog.json'), 'utf8'));
const base = process.env.RMUSIC_QA_URL || `http://127.0.0.1:${process.env.RMUSIC_QA_PORT || 8766}/rmusic/`;
const publicShareRoot = 'https://roylyl.github.io/rmusic/share/';
const defaultChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executable = process.env.RMUSIC_CHROME_PATH || (process.platform === 'darwin' && fs.existsSync(defaultChrome) ? defaultChrome : undefined);
const special = catalog.tracks.find(track => track.artist === 'AC/DC');
const sameTitle = catalog.tracks.filter(track => track.title === '皇后大道东' && track.artist === '罗大佑 & 蒋志光');
const albumGroups = new Map();
for (const track of catalog.tracks) {
  const directory = track.src.slice(0, track.src.lastIndexOf('/'));
  if (!albumGroups.has(directory)) albumGroups.set(directory, []);
  albumGroups.get(directory).push(track);
}
const albumQueue = [...albumGroups.values()].find(tracks => tracks.length >= 5);
const report = { base, fixtures: 'Native share and clipboard are captured; HTMLAudioElement is unchanged; audio fixture exists only in test memory', checks: [], errors: [], runs: [] };
const output = '/tmp/rmusic-share-qa.json';
const shareUrl = track => publicShareRoot + encodeURIComponent(track.id) + '.html';
const localShareUrl = track => new URL('share/' + encodeURIComponent(track.id) + '.html', base).href;
const encodePath = value => value.split('/').map(encodeURIComponent).join('/');

function wavFixture(seconds = 12) {
  const rate = 22050, dataBytes = rate * seconds * 2, wav = Buffer.alloc(44 + dataBytes);
  wav.write('RIFF'); wav.writeUInt32LE(36 + dataBytes, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(dataBytes, 40);
  for (let i = 0; i < rate * seconds; i++) wav.writeInt16LE(Math.round(0.13 * 32767 * Math.sin(2 * Math.PI * 220 * i / rate)), 44 + i * 2);
  return wav;
}
const wav = wavFixture();
async function openContext(browser, viewport = { width: 390, height: 844 }) {
  const context = await browser.newContext({ viewport, locale: 'zh-CN', colorScheme: 'dark', serviceWorkers: 'block' });
  await context.addInitScript(() => {
    window.__shareQA = { shares: [], copies: [], shareMode: 'success', clipboardMode: 'success', audioEvents: [] };
    Object.defineProperty(navigator, 'share', { configurable: true, value(data) {
      window.__shareQA.shares.push({ data, active: navigator.userActivation?.isActive === true });
      if (window.__shareQA.shareMode === 'abort') return Promise.reject(new DOMException('User cancelled', 'AbortError'));
      if (window.__shareQA.shareMode === 'fail') return Promise.reject(new DOMException('Unavailable', 'NotAllowedError'));
      return Promise.resolve();
    } });
    window.__shareQA.nativeShare = navigator.share;
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText(text) {
      window.__shareQA.copies.push(text);
      if (window.__shareQA.clipboardMode === 'fail') return Promise.reject(new DOMException('Denied', 'NotAllowedError'));
      return Promise.resolve();
    } } });
    for (const name of ['playing', 'pause', 'loadedmetadata', 'error']) document.addEventListener(name, event => {
      if (event.target instanceof HTMLAudioElement) window.__shareQA.audioEvents.push({ name, src: event.target.currentSrc, time: event.target.currentTime });
    }, true);
  });
  await context.route('https://raw.githubusercontent.com/Roylyl/Music/**', async route => {
    const url = new URL(route.request().url());
    if (/\.mp3$/i.test(url.pathname)) {
      const range = route.request().headers().range?.match(/^bytes=(\d+)-(\d*)$/);
      const start = range ? Number(range[1]) : 0, end = range?.[2] ? Math.min(Number(range[2]), wav.length - 1) : wav.length - 1;
      await route.fulfill({ status: range ? 206 : 200, contentType: 'audio/wav', body: wav.subarray(start, end + 1), headers: { 'Access-Control-Allow-Origin': '*', 'Accept-Ranges': 'bytes', ...(range ? { 'Content-Range': `bytes ${start}-${end}/${wav.length}` } : {}) } });
    } else if (/\.lrc$/i.test(url.pathname)) await route.fulfill({ status: 200, contentType: 'text/plain', body: '' });
    else await route.continue();
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  page.on('pageerror', error => report.errors.push({ url: page.url(), type: 'pageerror', text: error.message }));
  page.on('console', message => { if (message.type() === 'error') report.errors.push({ url: page.url(), type: 'console', text: message.text() }); });
  return { context, page };
}
async function check(name, action) {
  await action(); report.checks.push(name); console.log(`PASS: ${name}`);
}
async function waitApp(page) {
  await page.locator('#app-splash').waitFor({ state: 'hidden' });
  await page.getByTestId('player-visual-surface').waitFor();
}
async function shareClick(page, button, expected) {
  const previous = await page.evaluate(() => window.__shareQA.shares.length);
  await button.click();
  await page.waitForFunction(count => window.__shareQA.shares.length === count + 1, previous);
  const entry = await page.evaluate(() => window.__shareQA.shares.at(-1));
  assert.equal(entry.data.url, shareUrl(expected));
  assert.equal(entry.active, true, 'Sharing lost user activation');
  assert.ok(entry.data.title.includes(expected.title));
  assert.ok(!('files' in entry.data), 'Share must only include the song link');
  return entry;
}
async function assertPaused(page) {
  const state = await page.evaluate(() => ({
    audio: [...document.querySelectorAll('audio')].map(audio => ({ src: audio.currentSrc, paused: audio.paused, time: audio.currentTime })),
    events: window.__shareQA.audioEvents,
    url: location.href,
  }));
  assert.ok(state.audio.every(audio => audio.paused && audio.time === 0), 'Deep link started audio');
  assert.ok(!state.events.some(event => event.name === 'playing'), 'Deep link emitted playing');
  assert.equal(new URL(state.url).searchParams.has('track'), false, 'Track query was not cleared');
  return state;
}
async function staticAssets() {
  assert.equal(fs.readdirSync(path.join(siteRoot, 'rmusic/share')).filter(name => name.endsWith('.html')).length, catalog.tracks.length);
  for (const track of [special, ...sameTitle]) {
    const html = fs.readFileSync(path.join(siteRoot, 'rmusic/share', track.id + '.html'), 'utf8');
    const canonical = shareUrl(track), image = 'https://roylyl.github.io/music/share-covers/' + encodePath(track.cover.replace(/\.[^/.]+$/, '.jpg'));
    assert.ok(html.includes(`<meta property="og:url" content="${canonical}">`));
    assert.ok(html.includes(`<meta property="og:image" content="${image}">`));
    assert.ok(html.includes(`href="../?track=${encodeURIComponent(track.id)}#player"`));
    assert.ok(fs.existsSync(path.join(siteRoot, 'music/share-covers', track.cover.replace(/\.[^/.]+$/, '.jpg'))));
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, 'rmusic/manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.id, '/rmusic/'); assert.equal(manifest.start_url, '/rmusic/'); assert.equal(manifest.scope, '/rmusic/');
  assert.ok(manifest.icons.some(icon => icon.purpose === 'maskable'));
  for (const icon of manifest.icons) assert.ok(fs.existsSync(path.join(siteRoot, 'rmusic', icon.src)));
  const sw = fs.readFileSync(path.join(siteRoot, 'rmusic/sw.js'), 'utf8');
  assert.ok(sw.includes('share'), 'SW should explicitly keep static share routes separate');
  report.static = { pages: catalog.tracks.length, samples: [special.id, ...sameTitle.map(track => track.id)], icons: manifest.icons };
}
async function headerScreenshots(browser) {
  for (const viewport of [{ width: 1440, height: 960 }, { width: 390, height: 844 }, { width: 320, height: 720 }]) {
    const { context, page } = await openContext(browser, viewport);
    try {
      await page.goto(base, { waitUntil: 'domcontentloaded' }); await waitApp(page);
      await page.getByRole('heading', { name: 'R music', exact: true }).waitFor();
      await page.waitForFunction(() => { const image = document.querySelector('h1 img'); return image?.complete && image.naturalWidth > 0; });
      const layout = await page.evaluate(() => {
        const brand = document.querySelector('h1'), source = document.querySelector('[aria-label="查看R music源码"]'), search = document.querySelector('input[placeholder="搜索歌曲、专辑或歌手"]'), refresh = document.querySelector('button[aria-label="刷新"]'), tabs = document.querySelector('[role="tablist"]')?.parentElement;
        const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, height: r.height, width: r.width }; };
        return { brand: rect(brand), source: rect(source), search: rect(search), refresh: rect(refresh), tabs: rect(tabs), brandHeight: Math.max(parseFloat(getComputedStyle(brand).lineHeight), brand.querySelector('img').getBoundingClientRect().height), sourceLine: parseFloat(getComputedStyle(source).lineHeight) };
      });
      assert.ok(layout.brand.height <= layout.brandHeight + 1, 'Logo and brand wrapped');
      assert.ok(layout.source.height <= layout.sourceLine + 9, 'Source wrapped');
      if (viewport.width < 768) {
        assert.ok(layout.search.y >= Math.max(layout.brand.bottom, layout.source.bottom) + 8);
        assert.ok(layout.search.width >= viewport.width - 34);
        assert.ok(layout.tabs.right <= layout.refresh.x + 0.5);
        assert.ok(layout.refresh.right <= viewport.width);
      }
      const screenshot = `/tmp/rmusic-logo-header-${viewport.width}.png`;
      await page.waitForTimeout(400); await page.screenshot({ path: screenshot });
      report.runs.push({ type: 'header', viewport, layout, screenshot });
    } finally { await context.close(); }
  }
}
async function sharePageScreenshots(browser) {
  for (const viewport of [{ width: 1440, height: 960 }, { width: 390, height: 844 }]) {
    const { context, page } = await openContext(browser, viewport);
    try {
      await page.goto(localShareUrl(special), { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: special.title, exact: true }).waitFor();
      await page.waitForFunction(() => { const cover = document.querySelector('.art'); return cover?.complete && cover.naturalWidth > 0; });
      const screenshot = `/tmp/rmusic-share-${viewport.width}.png`;
      await page.screenshot({ path: screenshot });
      const metadata = await page.evaluate(() => {
        const art = document.querySelector('.art').getBoundingClientRect(), action = document.querySelector('.actions').getBoundingClientRect();
        return { canonical: document.querySelector('link[rel="canonical"]').href, cover: document.querySelector('.art').currentSrc, open: document.querySelector('a.open').href, overflow: document.documentElement.scrollWidth > innerWidth, coverWidth: art.width, coverHeight: art.height, actionBottom: action.bottom, viewportHeight: innerHeight };
      });
      assert.equal(metadata.canonical, shareUrl(special)); assert.equal(metadata.overflow, false);
      assert.ok(Math.abs(metadata.coverWidth - metadata.coverHeight) < 1, 'Share cover is stretched');
      assert.ok(metadata.actionBottom <= metadata.viewportHeight, 'Share buttons are below the viewport');
      await shareClick(page, page.getByRole('button', { name: '分享这首歌', exact: true }), special);
      report.runs.push({ type: 'share-page', viewport, screenshot, metadata });
    } finally { await context.close(); }
  }
}

async function mobileSearchAndList(browser) {
  const { context, page } = await openContext(browser);
  try {
    await page.goto(base, { waitUntil: 'domcontentloaded' }); await waitApp(page);
    const input = page.getByPlaceholder('搜索歌曲、专辑或歌手');
    await input.fill(special.title); await input.press('Enter');
    const share = page.getByRole('button', { name: '分享歌曲', exact: true }).first();
    await share.waitFor();
    await shareClick(page, share, special);
    const row = await share.evaluate(button => { const r = button.parentElement.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width, viewport: innerWidth }; });
    assert.ok(row.left >= 0 && row.right <= row.viewport + 0.5, 'Mobile search row overflows horizontally');
    await assertPaused(page);

    await page.evaluate(() => { window.__shareQA.shareMode = 'abort'; });
    await shareClick(page, share, special);
    await page.waitForTimeout(120);
    assert.equal(await page.locator('dialog[open]').count(), 0, 'Cancel opened an error/copy dialog');
    assert.equal(await page.evaluate(() => window.__shareQA.copies.length), 0, 'Cancel copied a link');
    assert.ok(!(await page.locator('body').innerText()).includes('分享未完成'));

    await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable: true, value: undefined }));
    await share.click();
    await page.waitForFunction(() => window.__shareQA.copies.length === 1);
    assert.equal(await page.evaluate(() => window.__shareQA.copies.at(-1)), shareUrl(special));
    await page.getByText('已复制歌曲链接', { exact: true }).waitFor();

    await page.evaluate(() => { window.__shareQA.clipboardMode = 'fail'; });
    await share.click();
    const copyDialog = page.getByRole('dialog', { name: '分享歌曲', exact: true });
    await copyDialog.waitFor();
    assert.equal(await copyDialog.getByRole('textbox', { name: '歌曲分享链接' }).inputValue(), shareUrl(special));
    await copyDialog.getByRole('button', { name: '关闭', exact: true }).click();
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'share', { configurable: true, value: window.__shareQA.nativeShare });
      window.__shareQA.shareMode = 'success'; window.__shareQA.clipboardMode = 'success';
    });
    await page.getByRole('button', { name: special.album, exact: true }).last().click();
    const collection = page.locator('[data-library-surface="collection"]');
    await collection.waitFor();
    const collectionShare = collection.getByRole('button', { name: '分享歌曲', exact: true }).first();
    await shareClick(page, collectionShare, special);
    const shareBox = await collectionShare.boundingBox();
    assert.ok(shareBox.x >= 0 && shareBox.x + shareBox.width <= 390.5, 'Mobile song list share control is outside viewport');
    const paused = await assertPaused(page);
    report.runs.push({ type: 'mobile-search-list', row, shareBox, paused });
  } finally { await context.close(); }
}

async function mobileDeepLinks(browser) {
  // Same context intentionally checks a new URL overrides the previously prepared song.
  const { context, page } = await openContext(browser);
  try {
    for (const track of [special, ...sameTitle, albumQueue[0]]) {
      await page.goto(new URL('?track=' + encodeURIComponent(track.id) + '#player', base).href, { waitUntil: 'domcontentloaded' });
      await waitApp(page);
      await page.getByTestId('panel-toggle').locator('button').click();
      const panel = page.getByTestId('unified-panel-surface'); await panel.waitFor();
      await panel.locator('[data-ponder-panel-tab-button="cover"]').click();
      const payload = await shareClick(page, panel.getByRole('button', { name: '分享歌曲', exact: true }), track);
      assert.ok(payload.data.text.includes(track.album), 'Deep link opened a different edition');
      await panel.locator('[data-ponder-panel-tab-button="queue"]').click();
      const expectedQueue = albumGroups.get(track.src.slice(0, track.src.lastIndexOf('/')));
      await panel.getByText(`播放队列 (${expectedQueue.length})`, { exact: true }).waitFor();
      const row = panel.locator('[data-active="true"]');
      await row.getByText(track.title, { exact: true }).waitFor();
      const rowShare = row.getByRole('button', { name: '分享歌曲', exact: true });
      await shareClick(page, rowShare, track);
      const paused = await assertPaused(page);
      assert.ok(paused.audio.some(audio => decodeURIComponent(new URL(audio.src).pathname).endsWith('/' + track.src)), 'Prepared audio source does not match the exact raw ID');
      report.runs.push({ type: 'mobile-deep-link', id: track.id, album: track.album, queueLength: expectedQueue.length, payload, paused });
      if (track === albumQueue[0]) {
        await panel.getByRole('button', { name: '队列拼贴', exact: true }).click();
        const lattice = page.getByRole('region', { name: '队列拼贴', exact: true });
        await lattice.waitFor();
        const poster = lattice.locator('[data-instance-id="0:0:0"]');
        await poster.click();
        const expanded = lattice.getByRole('group', { name: `${track.title} · ${track.artist}`, exact: true });
        await expanded.waitFor();
        await shareClick(page, expanded.getByRole('button', { name: '分享歌曲', exact: true }), track);
        await assertPaused(page);
      }
    }
  } finally { await context.close(); }
  const unknown = await openContext(browser);
  try {
    await unknown.page.goto(new URL('?track=qa-unknown-track#player', base).href, { waitUntil: 'domcontentloaded' });
    await waitApp(unknown.page);
    await unknown.page.getByText('歌曲不在音乐库中，请返回音乐库', { exact: true }).waitFor();
    report.runs.push({ type: 'unknown-deep-link', paused: await assertPaused(unknown.page) });
  } finally { await unknown.context.close(); }
}

async function remainingMobile(browser) {
  if (!process.argv.includes('--unknown')) {
  const { context, page } = await openContext(browser);
  const track = albumQueue[0];
  try {
    await page.goto(new URL('?track=' + encodeURIComponent(track.id) + '#player', base).href, { waitUntil: 'domcontentloaded' });
    await waitApp(page);
    await page.getByTestId('panel-toggle').locator('button').click();
    const panel = page.getByTestId('unified-panel-surface'); await panel.waitFor();
    await panel.locator('[data-ponder-panel-tab-button="queue"]').click();
    await panel.getByRole('button', { name: '队列拼贴', exact: true }).click();
    const lattice = page.getByRole('region', { name: '队列拼贴', exact: true }); await lattice.waitFor();
    await lattice.locator('[data-instance-id="0:0:0"]').click();
    const expanded = lattice.getByRole('group', { name: `${track.title} · ${track.artist}`, exact: true }); await expanded.waitFor();
    const payload = await shareClick(page, expanded.getByRole('button', { name: '分享歌曲', exact: true }), track);
    report.runs.push({ type: 'mobile-lattice-share', payload, paused: await assertPaused(page) });
  } finally { await context.close(); }
  }
  const unknown = await openContext(browser);
  try {
    await unknown.page.goto(new URL('?track=qa-unknown-track#player', base).href, { waitUntil: 'domcontentloaded' });
    await waitApp(unknown.page);
    await unknown.page.getByText('歌曲不在音乐库中，请返回音乐库', { exact: true }).waitFor();
    report.runs.push({ type: 'unknown-deep-link', paused: await assertPaused(unknown.page) });
  } finally { await unknown.context.close(); }
}

async function run() {
  const browser = await chromium.launch({ ...(executable ? { executablePath: executable } : {}), headless: true, args: ['--disable-gpu', '--autoplay-policy=no-user-gesture-required'] });
  try {
    if (process.argv.includes('--share-pages')) {
      await check('real desktop/mobile share pages have square cover and visible actions', () => sharePageScreenshots(browser));
    } else if (process.argv.includes('--remaining') || process.argv.includes('--unknown')) {
      await check(process.argv.includes('--unknown') ? '390px unknown ID is friendly and stays paused' : '390px expanded Lattice sharing stays paused and unknown ID is friendly', () => remainingMobile(browser));
    } else {
    await check('sample static share metadata, cover paths and PWA icon assets', staticAssets);
    await check('logo header at desktop, 390px and 320px', () => headerScreenshots(browser));
    await check('real desktop/mobile song share pages and user gesture payload', () => sharePageScreenshots(browser));
    await check('390px search/list sharing, cancel and unsupported clipboard fallback', () => mobileSearchAndList(browser));
    await check('exact raw-ID deep links, same-name editions, album queue, current/queue/Lattice sharing and unknown ID', () => mobileDeepLinks(browser));
    }
    assert.equal(report.errors.length, 0, 'Unexpected page/console error');
  } catch (error) { report.failure = error.stack; process.exitCode = 1; }
  finally { fs.writeFileSync(output, JSON.stringify(report, null, 2)); await browser.close(); }
  console.log(JSON.stringify(report, null, 2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
