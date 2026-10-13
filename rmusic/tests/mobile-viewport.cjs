#!/usr/bin/env node
// Focused short-screen home layout and installed-player viewport regression.
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
const base = process.env.RMUSIC_QA_URL || 'http://127.0.0.1:8766/rmusic/';
const defaultChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executable = process.env.RMUSIC_CHROME_PATH || (process.platform === 'darwin' && fs.existsSync(defaultChrome) ? defaultChrome : undefined);
const catalog = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../music/data/catalog.json'), 'utf8'));
const track = catalog.tracks.find(t => t.artist === 'Beyond' && t.album === '惊喜');
assert.ok(track);
const report = { base, checks: [], failures: [], errors: [], runs: [], limits: 'Chromium touch simulation. navigator.standalone identifies the installed-app fixture while native CSS display-mode remains browser. The iPhone discrepancy fixture overrides innerHeight, visualViewport.height and documentElement.clientHeight against a real 402x874 rendered viewport. This checks DOM geometry; physical iPhone/Safari compositor clipping remains unverified.' };
const wav = Buffer.alloc(44 + 44100);
wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(22050, 24); wav.writeUInt32LE(44100, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(44100, 40);
async function check(name, action) {
  try { await action(); report.checks.push(name); console.log('PASS: ' + name); }
  catch (error) { report.failures.push({ name, error: error.stack }); console.log('FAIL: ' + name + ': ' + error.message); }
}
async function openPage(browser, fixture) {
  const context = await browser.newContext({ viewport: { width: fixture.width, height: fixture.renderHeight }, screen: { width: fixture.width, height: fixture.renderHeight }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'zh-CN', colorScheme: 'dark', serviceWorkers: 'block', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await context.addInitScript(fixture => {
    window.__viewportQA = { fixture, nativeStandalone: matchMedia('(display-mode: standalone)').matches };
    if (fixture.standalone) Object.defineProperty(navigator, 'standalone', { configurable: true, get: () => true });
    if (fixture.layoutHeight !== undefined) Object.defineProperty(window, 'innerHeight', { configurable: true, get: () => fixture.layoutHeight });
    if (fixture.visualHeight !== undefined) Object.defineProperty(window.visualViewport, 'height', { configurable: true, get: () => fixture.visualHeight });
    if (fixture.clientHeight !== undefined) {
      const original = Object.getOwnPropertyDescriptor(Element.prototype, 'clientHeight');
      Object.defineProperty(Element.prototype, 'clientHeight', { configurable: true, get() { return this === document.documentElement ? fixture.clientHeight : original.get.call(this); } });
    }
  }, fixture);
  await context.route('https://raw.githubusercontent.com/Roylyl/Music/**', async route => {
    const url = new URL(route.request().url());
    if (/\.mp3$/i.test(url.pathname)) {
      const range = route.request().headers().range?.match(/^bytes=(\d+)-(\d*)$/), start = range ? Number(range[1]) : 0, end = range?.[2] ? Math.min(Number(range[2]), wav.length - 1) : wav.length - 1;
      return route.fulfill({ status: range ? 206 : 200, contentType: 'audio/wav', headers: { 'Access-Control-Allow-Origin': '*', 'Accept-Ranges': 'bytes', ...(range ? { 'Content-Range': `bytes ${start}-${end}/${wav.length}` } : {}) }, body: wav.subarray(start, end + 1) });
    }
    if (/\.lrc$/i.test(url.pathname)) return route.fulfill({ status: 200, contentType: 'text/plain', body: '' });
    return route.continue();
  });
  const page = await context.newPage(); page.setDefaultTimeout(8000);
  page.on('pageerror', error => report.errors.push({ fixture: fixture.name, error: error.message }));
  const cdp = await context.newCDPSession(page); await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: fixture.safe });
  await page.goto(new URL('?track=' + encodeURIComponent(track.id) + '#player', base).href, { waitUntil: 'domcontentloaded' });
  await page.locator('#app-splash').waitFor({ state: 'hidden' });
  await page.locator('[data-rmusic-player-bar]').waitFor({ state: 'visible' });
  await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => a.currentSrc && a.readyState >= 1));
  await page.waitForTimeout(150);
  return { context, page };
}
async function playerGeometry(page, fixture) {
  const layout = await page.evaluate(() => {
    const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right }; };
    const shell = document.querySelector('.rmusic-app-shell');
    const surface = document.querySelector('[data-testid="player-visual-surface"]');
    const bar = document.querySelector('[data-rmusic-player-bar]');
    const back = surface.querySelector('button[aria-label="返回主页"]');
    const playerButtons = [...bar.querySelectorAll('button')].map(element => {
      const r = element.getBoundingClientRect(), hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return { label: element.getAttribute('aria-label') || element.title, rect: rect(element), reaches: hit === element || element.contains(hit) };
    });
    const visualChildren = [...surface.children].filter(e => e.getBoundingClientRect().height > 100).map(element => ({ className: element.className, rect: rect(element) }));
    return { fixture: window.__viewportQA, innerHeight, visualHeight: visualViewport.height, clientHeight: document.documentElement.clientHeight, screenHeight: screen.height, shell: rect(shell), surface: rect(surface), visualChildren, bar: rect(bar), back: back ? rect(back) : null, playerButtons, bottomHit: document.elementFromPoint(innerWidth / 2, window.__viewportQA.fixture.renderHeight - 1)?.tagName };
  });
  const screenshot = `/tmp/rmusic-viewport-${fixture.name}.png`; await page.screenshot({ path: screenshot });
  report.runs.push({ type: 'player', fixture: fixture.name, layout, screenshot });
  assert.ok(layout.surface.bottom >= fixture.renderHeight - 1 && Math.abs(layout.surface.height - fixture.renderHeight) <= 1, 'Player visual surface does not cover rendered viewport');
  assert.ok(layout.visualChildren.some(e => e.rect.y <= 1 && e.rect.bottom >= fixture.renderHeight - 1), 'No rendered visualizer layer covers the player viewport');
  assert.ok(layout.bar.height >= 90 && layout.bar.height <= 110, 'Unexpected mobile player height');
  const visibleHeight = fixture.visualHeight ?? fixture.renderHeight;
  const usableBottom = Math.min(fixture.renderHeight - fixture.safe.bottom, visibleHeight);
  assert.ok(layout.bar.y >= fixture.safe.top && layout.bar.bottom <= usableBottom - 12 + .5, 'Player bar is clipped or touches the bottom safe area');
  assert.ok(layout.playerButtons.length >= 3 && layout.playerButtons.every(b => b.reaches), 'Transport button is not hit-test reachable');
  assert.ok(layout.playerButtons.every(b => b.rect.bottom <= usableBottom), 'Transport button extends beyond usable viewport');
  assert.ok(layout.back && layout.back.y >= fixture.safe.top, 'Player back button enters the status bar');
}
async function homeGeometry(page, fixture) {
  await page.getByTestId('player-visual-surface').getByRole('button', { name: '返回主页', exact: true }).tap();
  const slider = page.locator('[data-grid3d-slider]'); await slider.waitFor({ state: 'visible' });
  await page.waitForFunction(() => document.querySelector('[data-grid3d-slider] [data-grid3d-index]'));
  await page.waitForTimeout(250);
  if (process.argv.includes('--sample-home')) {
    const samples = [];
    for (let index = 0; index < 5; index++) {
      samples.push(await page.evaluate(() => {
        const slider = document.querySelector('[data-grid3d-slider]');
        const cards = [...slider.querySelectorAll('[data-grid3d-index]')];
        const card = cards.sort((a, b) => Math.abs(a.getBoundingClientRect().x + a.getBoundingClientRect().width / 2 - innerWidth / 2) - Math.abs(b.getBoundingClientRect().x + b.getBoundingClientRect().width / 2 - innerWidth / 2))[0];
        const polaroid = card.querySelector('.theme-polaroid-card');
        const cover = polaroid?.firstElementChild;
        const caption = slider.parentElement.querySelector('[data-rmusic-home-caption]');
        const r = card.getBoundingClientRect();
        return { time: performance.now(), index: card.dataset.grid3dIndex, transform: card.style.transform, cardOffsetWidth: card.offsetWidth, cardOffsetHeight: card.offsetHeight, cardTop: r.y, cardBottom: r.bottom,
          polaroidWidth: polaroid?.offsetWidth, polaroidHeight: polaroid?.offsetHeight, coverWidth: cover?.offsetWidth, coverHeight: cover?.offsetHeight,
          scrollHeight: slider.clientHeight, scrollInlineHeight: slider.style.height, scrollLeft: slider.scrollLeft, parentHeight: slider.parentElement.clientHeight,
          captionHeight: caption?.offsetHeight, titleHeight: caption?.querySelector('h3')?.offsetHeight };
      }));
      if (index < 4) await page.waitForTimeout(150);
    }
    report.runs.push({ type: 'home-size-samples', fixture: fixture.name, samples });
  }
  const stableSizes = [];
  for (let index = 0; index < 3; index++) {
    stableSizes.push(await slider.locator('[data-grid3d-index]').first().evaluate(card => ({ width: card.offsetWidth, height: card.offsetHeight })));
    if (index < 2) await page.waitForTimeout(150);
  }
  const layout = await page.evaluate(() => {
    const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right }; };
    const slider = document.querySelector('[data-grid3d-slider]');
    const cards = [...slider.querySelectorAll('[data-grid3d-index]')];
    const focused = cards.sort((a, b) => Math.abs(a.getBoundingClientRect().x + a.getBoundingClientRect().width / 2 - innerWidth / 2) - Math.abs(b.getBoundingClientRect().x + b.getBoundingClientRect().width / 2 - innerWidth / 2))[0];
    const info = [...slider.parentElement.children].find(e => e !== slider && e.querySelector('h3'));
    return { innerHeight, visualHeight: visualViewport.height, controls: rect(document.querySelector('[data-rmusic-home-controls]')), card: rect(focused), title: rect(info.querySelector('h3')), description: rect(info.querySelector('p')), bar: rect(document.querySelector('[data-rmusic-player-bar]')), slider: rect(slider) };
  });
  const screenshot = `/tmp/rmusic-viewport-${fixture.name}-home.png`; await page.screenshot({ path: screenshot });
  report.runs.push({ type: 'home', fixture: fixture.name, stableSizes, layout, screenshot });
  assert.ok(Math.max(...stableSizes.map(s => s.width)) - Math.min(...stableSizes.map(s => s.width)) <= 1 && Math.max(...stableSizes.map(s => s.height)) - Math.min(...stableSizes.map(s => s.height)) <= 1, 'Card size keeps changing after initial layout');
  assert.ok(layout.card.y >= layout.controls.bottom + 12 - 1, 'Focused card overlaps classification controls');
  assert.ok(layout.card.bottom < layout.title.y, 'Focused card overlaps its title');
  assert.ok(layout.description.bottom <= layout.bar.y - 12 + 1, 'Card description is obscured by the player bar');
}
async function run() {
  const browser = await chromium.launch({ ...(executable ? { executablePath: executable } : {}), headless: true, args: ['--disable-gpu'] });
  // Metric-discrepancy fixtures are deliberately explicit in their saved report.
  const fixtures = [
    { name: 'browser-short', width: 390, renderHeight: 668, safe: { top: 0, bottom: 0, left: 0, right: 0 }, home: true },
    { name: 'standalone', width: 390, renderHeight: 844, safe: { top: 59, bottom: 34, left: 0, right: 0 }, standalone: true },
    { name: 'standalone-metric-gap', width: 402, renderHeight: 874, layoutHeight: 812, visualHeight: 812, clientHeight: 812, safe: { top: 62, bottom: 34, left: 0, right: 0 }, standalone: true },
  ];
  try {
    for (const fixture of fixtures.filter(f => !(process.argv.includes('--home-only') || process.argv.includes('--sample-home')) || f.home)) {
      const { context, page } = await openPage(browser, fixture);
      try {
        if (!(process.argv.includes('--home-only') || process.argv.includes('--sample-home'))) await check(`${fixture.name} player visual layer and transport stay within viewport`, () => playerGeometry(page, fixture));
        if (fixture.home) await check(`${fixture.name} card clears controls, title and player`, () => homeGeometry(page, fixture));
      } finally { await context.close(); }
    }
    if (report.errors.length || report.failures.length) process.exitCode = 1;
  } finally { fs.writeFileSync(process.argv.includes('--sample-home') ? '/tmp/rmusic-mobile-viewport-sample-qa.json' : process.argv.includes('--home-only') ? '/tmp/rmusic-mobile-viewport-home-qa.json' : '/tmp/rmusic-mobile-viewport-qa.json', JSON.stringify(report, null, 2)); await browser.close(); }
  console.log(JSON.stringify(report, null, 2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
