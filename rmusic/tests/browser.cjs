#!/usr/bin/env node
// Targeted checks against the published R music build and native Chromium audio.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
// RMUSIC_PLAYWRIGHT_PATH can point to an existing module without installing dependencies.
function loadPlaywright() {
  if (process.env.RMUSIC_PLAYWRIGHT_PATH) return require(process.env.RMUSIC_PLAYWRIGHT_PATH);
  try { return require('playwright'); }
  catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  }
}
const { chromium } = loadPlaywright();

const root = path.resolve(__dirname, '../..');
const port = Number(process.env.RMUSIC_QA_PORT || 8765);
const base = `http://127.0.0.1:${port}/rmusic/`;
const defaultMacChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const chrome = process.env.RMUSIC_CHROME_PATH || (process.platform === 'darwin' && fs.existsSync(defaultMacChrome) ? defaultMacChrome : undefined);
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'music/data/catalog.json'), 'utf8'));
const output = '/tmp/rmusic-browser-qa.json';

function testAudio(seconds = 36) {
  const sampleRate = 22050;
  const dataBytes = sampleRate * seconds * 2;
  const wav = Buffer.alloc(44 + dataBytes);
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + dataBytes, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24); wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36);
  wav.writeUInt32LE(dataBytes, 40);
  for (let i = 0; i < sampleRate * seconds; i++) {
    wav.writeInt16LE(Math.round(0.13 * 32767 * Math.sin(2 * Math.PI * 220 * i / sampleRate)), 44 + 2 * i);
  }
  return wav;
}
const wav = testAudio();
const lrc = '[ti:浏览器验证歌词]\n[ar:测试音频]\n[00:00.00]第一行歌词舞台验证\n[00:03.00]第二行随真实音频推进\n[00:07.00]第三行验证系统定位\n[00:14.00]第四行继续播放\n[00:28.00]第五行歌词结束前';

function makeServer() {
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.wasm': 'application/wasm' };
  return http.createServer((req, res) => {
    let decoded;
    try { decoded = decodeURIComponent(new URL(req.url, base).pathname); } catch { res.writeHead(400).end(); return; }
    let target = path.resolve(root, '.' + decoded);
    if (!target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      if (fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
      const stat = fs.statSync(target);
      res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-store' });
      fs.createReadStream(target).pipe(res);
    } catch { res.writeHead(404).end(); }
  });
}

async function setupPage(browser, viewport) {
  const context = await browser.newContext({ viewport, locale: 'zh-CN', colorScheme: 'dark', serviceWorkers: 'block' });
  await context.route('https://raw.githubusercontent.com/Roylyl/Music/**', async route => {
    const url = new URL(route.request().url());
    if (/\.mp3$/i.test(url.pathname)) {
      const range = route.request().headers().range?.match(/^bytes=(\d+)-(\d*)$/);
      const start = range ? Number(range[1]) : 0;
      const end = range && range[2] ? Math.min(Number(range[2]), wav.length - 1) : wav.length - 1;
      await route.fulfill({ status: range ? 206 : 200, contentType: 'audio/wav', headers: { 'Access-Control-Allow-Origin': '*', 'Accept-Ranges': 'bytes', ...(range ? { 'Content-Range': `bytes ${start}-${end}/${wav.length}` } : {}) }, body: wav.subarray(start, end + 1) });
    } else if (/\.lrc$/i.test(url.pathname)) {
      await route.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', headers: { 'Access-Control-Allow-Origin': '*' }, body: lrc });
    } else await route.continue();
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  const warnings = [];
  page.on('pageerror', error => errors.push({ type: 'pageerror', message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') errors.push({ type: 'console', message: message.text() });
    if (message.type() === 'warning') warnings.push(message.text());
  });
  await page.addInitScript(() => {
    window.__rmusicQA = { handlers: {}, events: [], positionStates: [] };
    if ('mediaSession' in navigator) {
      const nativeHandler = navigator.mediaSession.setActionHandler.bind(navigator.mediaSession);
      navigator.mediaSession.setActionHandler = (action, handler) => {
        window.__rmusicQA.handlers[action] = handler;
        return nativeHandler(action, handler);
      };
      const nativePosition = navigator.mediaSession.setPositionState.bind(navigator.mediaSession);
      navigator.mediaSession.setPositionState = state => {
        if (state) window.__rmusicQA.positionStates.push({ ...state });
        return nativePosition(state);
      };
    }
    for (const name of ['loadedmetadata', 'playing', 'pause', 'seeking', 'seeked', 'ended', 'error']) {
      document.addEventListener(name, event => {
        if (!(event.target instanceof HTMLAudioElement)) return;
        const audio = event.target;
        window.__rmusicQA.events.push({ name, time: audio.currentTime, source: audio.currentSrc, paused: audio.paused, error: audio.error?.code || null });
      }, true);
    }
  });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'R music', exact: true }).waitFor({ timeout: 30000 });
  return { context, page, errors, warnings };
}

async function snapshot(page) {
  return page.evaluate(() => ({
    title: document.title,
    text: document.body.innerText.slice(0, 7000),
    buttons: [...document.querySelectorAll('button')].filter(b => b.getBoundingClientRect().height > 0).map(b => ({ text: b.innerText, aria: b.getAttribute('aria-label'), title: b.title, disabled: b.disabled })),
    inputs: [...document.querySelectorAll('input')].map(i => ({ placeholder: i.placeholder, type: i.type })),
    data: [...document.querySelectorAll('[data-library-surface],[data-testid],[data-visualizer],[data-folium-part]')].map(e => ({ tag: e.tagName, attrs: [...e.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value]) })),
    audio: [...document.querySelectorAll('audio')].map(a => ({ src: a.currentSrc, time: a.currentTime, duration: a.duration, paused: a.paused, readyState: a.readyState })),
    handlers: Object.entries(window.__rmusicQA.handlers).filter(([,handler]) => typeof handler === 'function').map(([name]) => name),
  }));
}

async function walkUi(page, run) {
  run.checks = [];
  const check = async (name, action) => {
    await action();
    run.checks.push(name);
    console.log(`${run.viewport.width}px: ${name}`);
  };
  if (!process.argv.includes('--playback')) {
  await check('title and populated library', async () => {
    assert.equal(await page.title(), 'R music');
    await page.locator('[data-grid3d-index]').first().waitFor();
    assert.ok(await page.locator('[data-grid3d-index]').count() > 1);
  });
  await check('fixed playlist and read-only collection', async () => {
    await page.getByRole('tab', { name: '歌单', exact: true }).click();
    const card = page.locator('[data-grid3d-index]').filter({ has: page.getByText(catalog.appleMusic.playlists[0].name, { exact: true }) }).first();
    await card.waitFor();
    await card.click();
    await page.waitForTimeout(650);
    if (!(await page.locator('[data-library-surface="collection"]').isVisible())) await card.click();
    const collection = page.locator('[data-library-surface="collection"]');
    await collection.waitFor();
    assert.ok((await collection.innerText()).includes(catalog.appleMusic.playlists[0].name));
    assert.equal(await collection.locator('[data-ponder="grid-view-edit-mode"]').count(), 0);
    run.playlist = (await snapshot(page)).text;
    await page.keyboard.press('Escape');
    await collection.waitFor({ state: 'hidden' });
  });
  await check('search results', async () => {
    const input = page.getByPlaceholder('搜索歌曲、专辑或歌手');
    await input.fill('遥远的她');
    await input.press('Enter');
    await page.getByRole('button', { name: '播放歌曲', exact: true }).first().waitFor();
    run.search = await snapshot(page);
  });
  await check('album from search', async () => {
    await page.getByRole('button', { name: 'Amour / 遥远的她', exact: true }).first().click();
    const album = page.locator('[data-library-surface="collection"]');
    await album.waitFor();
    assert.ok((await album.innerText()).includes('Amour / 遥远的她'));
    await page.keyboard.press('Escape');
    await album.waitFor({ state: 'hidden' });
  });
  await check('artist from search', async () => {
    await page.getByRole('button', { name: '张学友', exact: true }).first().click();
    const artist = page.locator('[data-library-surface="artist"]');
    await artist.waitFor();
    assert.ok((await artist.innerText()).includes('张学友'));
    await page.keyboard.press('Escape');
    await artist.waitFor({ state: 'hidden' });
  });
  } else {
    const input = page.getByPlaceholder('搜索歌曲、专辑或歌手');
    await input.fill('遥远的她');
    await input.press('Enter');
    await page.getByRole('button', { name: '播放歌曲', exact: true }).first().waitFor();
  }
  await check('native audio playback and Folia lyrics stage', async () => {
    await page.getByTitle('加入播放队列', { exact: true }).first().click();
    await page.getByTitle('加入播放队列', { exact: true }).nth(1).click();
    await page.getByRole('button', { name: '播放歌曲', exact: true }).first().click();
    await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => !a.paused && a.currentTime > 0.1 && a.readyState >= 2), null, { timeout: 15000 });
    await page.getByTestId('player-visual-surface').waitFor();
    await page.waitForFunction(() => ['第二行随真实音频推进', '第三行验证系统定位', '第四行继续播放', '第五行歌词结束前'].some(line => document.body.textContent.includes(line)), null, { timeout: 15000 });
    run.player = await snapshot(page);
    run.screenshot = `/tmp/rmusic-${run.viewport.width === 390 ? 'mobile' : 'desktop'}.png`;
    await page.screenshot({ path: run.screenshot });
  });
  await check('queue contains clicked song and next song', async () => {
    await page.getByTestId('panel-toggle').locator('button').click();
    const panel = page.getByTestId('unified-panel-surface');
    await panel.waitFor();
    await panel.locator('[data-ponder-panel-tab-button="queue"]').click();
    await panel.getByText('遥远的她', { exact: true }).waitFor();
    await panel.getByText('遥远的她 (Live)', { exact: true }).waitFor();
    run.queue = (await snapshot(page)).text;
  });
  await check('favorite action shows owner-only notice', async () => {
    const panel = page.getByTestId('unified-panel-surface');
    await panel.locator('[data-ponder-panel-tab-button="controls"]').click();
    const heart = panel.locator('button').filter({ has: page.locator('svg.lucide-heart') }).first();
    await heart.click();
    await page.getByText('你不能点击，这个按钮仅限Roylyl操作', { exact: true }).waitFor();
    await page.getByTestId('panel-toggle').locator('button').click();
  });
  await check('Media Session pause, seek and play use native audio events', async () => {
    await page.evaluate(async () => {
      for (const action of ['play', 'pause', 'previoustrack', 'nexttrack', 'seekto']) {
        if (typeof window.__rmusicQA.handlers[action] !== 'function') throw new Error(`Missing handler: ${action}`);
      }
      for (const action of ['seekbackward', 'seekforward']) {
        if (window.__rmusicQA.handlers[action] !== null) throw new Error(`Expected explicitly disabled handler: ${action}`);
      }
      window.__rmusicQA.handlers.pause({ action: 'pause' });
    });
    await page.waitForFunction(() => [...document.querySelectorAll('audio')].filter(a => a.currentSrc).every(a => a.paused));
    await page.evaluate(() => window.__rmusicQA.handlers.seekto({ action: 'seekto', seekTime: 8, fastSeek: true }));
    await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => a.paused && Math.abs(a.currentTime - 8) < 0.15));
    await page.waitForFunction(() => window.__rmusicQA.events.some(event => event.name === 'seeked' && Math.abs(event.time - 8) < 0.15));
    await page.evaluate(() => window.__rmusicQA.handlers.play({ action: 'play' }));
    await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => !a.paused && a.currentTime > 8.1));
    assert.equal(await page.evaluate(() => navigator.mediaSession.playbackState), 'playing');
  });
  await check('Media Session next and previous change the real audio source', async () => {
    const firstSource = await page.evaluate(() => [...document.querySelectorAll('audio')].find(a => !a.paused)?.currentSrc);
    await page.evaluate(() => window.__rmusicQA.handlers.nexttrack({ action: 'nexttrack' }));
    await page.waitForFunction(previous => [...document.querySelectorAll('audio')].some(a => a.currentSrc !== previous && a.currentSrc && !a.paused && a.currentTime > 0.1), firstSource);
    await page.waitForFunction(() => navigator.mediaSession.metadata?.title === '遥远的她 (Live)');
    await page.evaluate(() => window.__rmusicQA.handlers.previoustrack({ action: 'previoustrack' }));
    await page.waitForFunction(source => [...document.querySelectorAll('audio')].some(a => a.currentSrc === source && !a.paused && a.currentTime > 0.1), firstSource);
    await page.waitForFunction(() => navigator.mediaSession.metadata?.title === '遥远的她');
    run.mediaSession = await page.evaluate(() => ({ title: navigator.mediaSession.metadata?.title, artist: navigator.mediaSession.metadata?.artist, state: navigator.mediaSession.playbackState, events: window.__rmusicQA.events, positionStates: window.__rmusicQA.positionStates }));
    assert.ok(run.mediaSession.events.some(event => event.name === 'pause'));
    assert.ok(run.mediaSession.events.filter(event => event.name === 'playing').length >= 3);
    assert.ok(run.mediaSession.positionStates.some(state => state.duration === 36));
  });
}

async function smokeUi(page, run) {
  await page.locator('[data-grid3d-index]').first().waitFor();
  assert.equal(await page.title(), 'R music');
  assert.equal(await page.getByRole('button', { name: 'Navi', exact: true }).count(), 0);
  assert.equal(await page.getByTestId('online-provider-switcher').count(), 0);
  await page.locator('#app-splash').waitFor({ state: 'hidden' });
  await page.waitForTimeout(900);
  run.home = await snapshot(page);
  run.homeScreenshot = `/tmp/rmusic-${run.viewport.width < 768 ? run.viewport.width : 'desktop'}-home.png`;
  await page.screenshot({ path: run.homeScreenshot });
  if (process.argv.includes('--narrow-home')) {
    run.layout = await page.evaluate(() => {
      const brand = document.querySelector('h1');
      const source = document.querySelector('a[aria-label="查看R music源码"]');
      const search = document.querySelector('input[placeholder="搜索歌曲、专辑或歌手"]');
      const refresh = document.querySelector('button[aria-label="刷新"]');
      const categories = document.querySelector('[role="tablist"]')?.parentElement;
      const box = element => {
        const r = element.getBoundingClientRect();
        return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
      };
      return { brand: box(brand), brandLineHeight: parseFloat(getComputedStyle(brand).lineHeight), source: box(source), sourceLineHeight: parseFloat(getComputedStyle(source).lineHeight), search: box(search), refresh: box(refresh), categories: box(categories), width: innerWidth };
    });
    const layout = run.layout;
    assert.ok(layout.brand.height <= layout.brandLineHeight + 1, 'R music brand wrapped');
    assert.ok(layout.source.height <= layout.sourceLineHeight + 9, 'Source link wrapped');
    assert.ok(layout.search.y >= Math.max(layout.brand.bottom, layout.source.bottom) + 8, 'Search shares the title row');
    assert.ok(layout.search.width >= layout.width - 34, 'Search does not fill its own row');
    assert.ok(layout.categories.right <= layout.refresh.x + 0.5, 'Refresh overlaps category tabs');
    assert.ok(layout.refresh.right <= layout.width, 'Refresh extends past viewport');
  }
  if (process.argv.includes('--home')) {
    run.checks = ['fresh catalog homepage', 'R music brand without Navi/platform switcher'];
    console.log(`${run.viewport.width}px: homepage screenshot captured`);
    return;
  }
  const input = page.getByPlaceholder('搜索歌曲、专辑或歌手');
  await input.fill('遥远的她');
  await input.press('Enter');
  await page.getByRole('button', { name: '播放歌曲', exact: true }).first().click();
  await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => !a.paused && a.currentTime > 0.1 && a.readyState >= 2));
  await page.evaluate(() => window.__rmusicQA.handlers.pause({ action: 'pause' }));
  await page.waitForFunction(() => [...document.querySelectorAll('audio')].filter(a => a.currentSrc).every(a => a.paused));
  await page.evaluate(() => window.__rmusicQA.handlers.seekto({ action: 'seekto', seekTime: 8, fastSeek: true }));
  await page.waitForFunction(() => window.__rmusicQA.events.some(event => event.name === 'seeked' && Math.abs(event.time - 8) < 0.15));
  run.mediaSession = await page.evaluate(() => ({ title: navigator.mediaSession.metadata?.title, state: navigator.mediaSession.playbackState, events: window.__rmusicQA.events, positionStates: window.__rmusicQA.positionStates }));
  assert.ok(run.mediaSession.events.some(event => event.name === 'playing'));
  assert.ok(run.mediaSession.events.some(event => event.name === 'pause'));
  run.checks = ['final build fresh context', 'R music brand without Navi/platform switcher', 'native playing/pause/seeked events'];
  console.log(`${run.viewport.width}px: final build smoke passed`);
}

async function run() {
  const server = process.argv.includes('--external-server') ? null : makeServer();
  if (server) await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  if (process.argv.includes('--serve')) {
    console.log(`R music QA service: ${base}`);
    return;
  }
  const browser = await chromium.launch({ ...(chrome ? { executablePath: chrome } : {}), headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--disable-gpu'] });
  const report = { base, catalogVersion: catalog.version, fixtures: 'Non-silent WAV and LRC responses; native HTMLAudioElement methods and events', runs: [] };
  try {
    const selectedWidth = Number(process.env.RMUSIC_QA_WIDTH);
    const viewports = selectedWidth > 0 ? [{ width: selectedWidth, height: Number(process.env.RMUSIC_QA_HEIGHT) || 844 }]
      : process.argv.includes('--narrow-home') ? [{ width: 390, height: 844 }, { width: 320, height: 720 }]
      : process.argv.includes('--desktop') ? [{ width: 1440, height: 960 }]
      : process.argv.includes('--mobile') ? [{ width: 390, height: 844 }]
      : [{ width: 1440, height: 960 }, { width: 390, height: 844 }];
    for (const viewport of viewports) {
      const state = await setupPage(browser, viewport);
      const { page, context, errors, warnings } = state;
      const currentRun = { viewport, initial: await snapshot(page), errors, warnings };
      report.runs.push(currentRun);
      if (!process.argv.includes('--probe')) {
        try {
          if (process.argv.includes('--smoke') || process.argv.includes('--home')) await smokeUi(page, currentRun);
          else await walkUi(page, currentRun);
          assert.equal(errors.length, 0, 'Unexpected page or console error');
        } catch (error) {
          currentRun.failure = error.stack;
          if (!page.isClosed()) currentRun.failureState = await snapshot(page);
          process.exitCode = 1;
        }
      }
      await context.close();
    }
  } catch (error) {
    report.failure = error.stack;
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(output, JSON.stringify(report, null, 2));
    await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
  console.log(JSON.stringify(report, null, 2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
