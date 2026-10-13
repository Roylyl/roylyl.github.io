#!/usr/bin/env node
// Focused touch-home regression. Run against the built /rmusic/ preview.
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
const safe = { top: 59, bottom: 34, left: 0, right: 0 };
const searchOnly = process.argv.includes('--search-only');
const report = { base, checks: [], failures: [], runs: [], errors: [], limits: 'Chromium with iPhone user agent, touch and real CSS env safe-area overrides. Chromium does not emulate native standalone display-mode; the existing standalone CSS media rule is activated through a stylesheet fixture. Viewport shrinking is a resize simulation, not physical iPhone, Safari/WebKit or keyboard proof.' };
async function check(name, action) {
  try { await action(); report.checks.push(name); console.log('PASS: ' + name); }
  catch (error) { report.failures.push({ name, error: error.stack }); console.log('FAIL: ' + name + ': ' + error.message); }
}
async function hitTarget(locator, { minimum = true } = {}) {
  await locator.scrollIntoViewIfNeeded();
  const geometry = await locator.evaluate(element => {
    const r = element.getBoundingClientRect();
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return { label: element.getAttribute('aria-label') || element.innerText, x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height,
      reaches: hit === element || element.contains(hit), hit: hit?.tagName, hitClass: typeof hit?.className === 'string' ? hit.className : null };
  });
  assert.ok(geometry.reaches, 'Another layer intercepts the center touch: ' + JSON.stringify(geometry));
  assert.ok(geometry.x >= -.5 && geometry.right <= await locator.page().evaluate(() => innerWidth) + .5, 'Touch target extends outside the viewport');
  assert.ok(geometry.y >= safe.top, 'Touch target intrudes into status-bar safe area');
  if (minimum) assert.ok(geometry.height >= 44 && geometry.width >= 44, 'Touch target is smaller than 44px: ' + JSON.stringify(geometry));
  report.runs.push({ type: 'touch-target', viewportWidth: await locator.page().evaluate(() => innerWidth), geometry });
  return geometry;
}
async function viewportGeometry(page, mode, width) {
  const layout = await page.evaluate(() => {
    const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right }; };
    const shell = document.querySelector('.rmusic-app-shell');
    const home = document.querySelector('.rmusic-grid-home');
    const probe = document.createElement('i');
    probe.style.cssText = 'position:fixed;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)';
    document.body.append(probe);
    const env = { top: parseFloat(getComputedStyle(probe).paddingTop), bottom: parseFloat(getComputedStyle(probe).paddingBottom) }; probe.remove();
    return { shell: rect(shell), home: rect(home), header: rect(document.querySelector('[data-rmusic-home-header]')),
      viewport: { width: innerWidth, height: innerHeight, visualHeight: visualViewport.height }, env,
      shellBackground: getComputedStyle(shell).backgroundColor, bodyBackground: getComputedStyle(document.body).backgroundColor,
      htmlBackground: getComputedStyle(document.documentElement).backgroundColor,
      bottomCovered: [1, innerWidth / 2, innerWidth - 1].every(x => shell.contains(document.elementFromPoint(x, innerHeight - 1))),
      overflow: document.documentElement.scrollWidth > innerWidth,
      statusBar: document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.content,
      nativeStandalone: window.__homeQA.nativeStandalone, standaloneCSSFixture: window.__homeQA.standaloneCSSFixture,
      touch: navigator.maxTouchPoints };
  });
  report.runs.push({ mode, width, layout });
  assert.deepEqual(layout.env, { top: safe.top, bottom: safe.bottom });
  assert.equal(layout.overflow, false); assert.ok(layout.touch > 0);
  assert.equal(layout.statusBar, 'default');
  assert.ok(layout.header.y >= safe.top, 'Header intrudes into top safe area');
  assert.ok(Math.abs(layout.shell.height - layout.viewport.height) <= 1 && layout.shell.bottom >= layout.viewport.height - .5, 'Shell does not cover full viewport');
  assert.ok(layout.bottomCovered, 'Bottom edge is outside the shell');
  assert.equal(layout.bodyBackground, layout.shellBackground); assert.equal(layout.htmlBackground, layout.shellBackground);
  if (mode === 'standalone') assert.ok(layout.standaloneCSSFixture > 0, 'Existing standalone CSS branch was not activated');
  else assert.equal(layout.standaloneCSSFixture, 0);
}
async function headerActions(page) {
  const header = page.locator('[data-rmusic-home-header]');
  const settings = header.getByRole('button', { name: '选项', exact: true });
  await hitTarget(settings); await settings.tap();
  await page.locator('[data-ponder-page-scope="settings-page"]').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape'); await page.locator('[data-ponder-page-scope="settings-page"]').waitFor({ state: 'hidden' });
  const source = header.getByRole('link', { name: '查看R music源码', exact: true });
  await hitTarget(source, { minimum: false });
  await page.context().route('https://github.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Source target fixture</title>' }));
  const popupPromise = page.waitForEvent('popup'); await source.tap(); const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded'); assert.ok(popup.url().endsWith('/tree/main/rmusic/source')); await popup.close();
}
async function sectionActions(page) {
  const controls = page.locator('[data-rmusic-home-controls]');
  const tabs = controls.getByRole('tab');
  assert.equal(await tabs.count(), 5);
  for (const name of ['最近加入', '最近播放', '歌单', '艺术家', '专辑']) {
    const tab = controls.getByRole('tab', { name, exact: true });
    await hitTarget(tab); await tab.tap(); await page.waitForFunction(name => [...document.querySelectorAll('[data-rmusic-home-controls] [role="tab"]')].some(t => t.getAttribute('aria-label') === name && t.getAttribute('aria-selected') === 'true'), name);
  }
  const refresh = controls.getByRole('button', { name: '刷新', exact: true });
  await refresh.waitFor({ state: 'visible' }); await page.waitForFunction(() => !document.querySelector('[data-rmusic-home-controls] button[aria-label="刷新"]')?.disabled);
  await hitTarget(refresh);
  await refresh.evaluate(element => {
    window.__homeQA.refreshStates = [];
    new MutationObserver(records => { for (const r of records) if (r.attributeName === 'disabled') window.__homeQA.refreshStates.push(element.disabled); }).observe(element, { attributes: true });
  });
  await refresh.tap();
  await page.waitForFunction(() => window.__homeQA.refreshStates.includes(true));
  await page.waitForFunction(() => !document.querySelector('[data-rmusic-home-controls] button[aria-label="刷新"]')?.disabled);
  assert.ok(await page.evaluate(() => window.__homeQA.refreshStates.includes(false)));
}
async function searchAction(page) {
  const header = page.locator('[data-rmusic-home-header]');
  const input = header.locator('input[type="text"]');
  await input.tap(); await input.fill(track.title);
  const submit = header.getByRole('button', { name: '搜索', exact: true });
  await hitTarget(submit); await submit.tap();
  const search = page.locator('section').filter({ has: page.getByRole('button', { name: '返回主页', exact: true }) });
  const close = search.getByRole('button', { name: '返回主页', exact: true });
  await close.waitFor({ state: 'visible' });
  await search.getByText(track.title, { exact: true }).first().waitFor({ state: 'visible' });
  await close.tap(); await search.waitFor({ state: 'hidden' });
  await header.waitFor({ state: 'visible' });
}
async function run() {
  const browser = await chromium.launch({ ...(executable ? { executablePath: executable } : {}), headless: true, args: ['--disable-gpu'] });
  try {
    for (const mode of ['browser', 'standalone']) for (const width of [390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'zh-CN', colorScheme: 'dark', serviceWorkers: 'block', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
      await context.addInitScript(mode => {
        window.__homeQA = { nativeStandalone: matchMedia('(display-mode: standalone)').matches, standaloneCSSFixture: 0 };
        if (mode === 'standalone') Object.defineProperty(navigator, 'standalone', { configurable: true, get: () => true });
      }, mode);
      const page = await context.newPage(); page.setDefaultTimeout(8000);
      page.on('pageerror', error => report.errors.push({ mode, width, error: error.message }));
      const cdp = await context.newCDPSession(page); await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: safe });
      try {
        await page.goto(base, { waitUntil: 'domcontentloaded' }); await page.locator('#app-splash').waitFor({ state: 'hidden' });
        await page.locator('[data-rmusic-home-header]').waitFor({ state: 'visible' });
        if (mode === 'standalone') await page.evaluate(() => {
          const activate = rules => { for (const rule of rules) {
            if (rule instanceof CSSMediaRule && /display-mode\s*:\s*standalone/.test(rule.conditionText)) { rule.media.mediaText = 'all'; window.__homeQA.standaloneCSSFixture++; }
            if (rule.cssRules) activate(rule.cssRules);
          } };
          for (const sheet of document.styleSheets) { try { activate(sheet.cssRules); } catch {} }
        });
        await page.locator('[data-rmusic-home-controls] [role="tab"]').first().waitFor({ state: 'visible' });
        await page.waitForTimeout(150);
        if (!searchOnly) {
          await check(`${mode} ${width}px viewport/background/safe areas`, () => viewportGeometry(page, mode, width));
          await check(`${mode} ${width}px options and source respond to actual touch`, () => headerActions(page));
          await check(`${mode} ${width}px all Navidrome tabs and refresh respond to actual touch`, () => sectionActions(page));
        }
        await check(`${mode} ${width}px search submit responds to actual touch and returns results`, () => searchAction(page));
        if (mode === 'standalone' && width === 390) await check('standalone viewport shrink and restore retain full shell coverage', async () => {
          const input = page.locator('[data-rmusic-home-header] input'); await input.tap();
          await page.setViewportSize({ width, height: 544 }); await viewportGeometry(page, mode, width);
          await input.blur(); await page.setViewportSize({ width, height: 844 }); await viewportGeometry(page, mode, width);
        });
        const screenshot = `/tmp/rmusic-home-${mode}-${width}.png`; await page.screenshot({ path: screenshot }); report.runs.push({ mode, width, screenshot });
      } catch (error) { report.failures.push({ name: `${mode} ${width}px setup`, error: error.stack }); }
      finally { await context.close(); }
    }
    if (report.errors.length || report.failures.length) process.exitCode = 1;
  } finally { fs.writeFileSync(searchOnly ? '/tmp/rmusic-mobile-home-search-qa.json' : '/tmp/rmusic-mobile-home-qa.json', JSON.stringify(report, null, 2)); await browser.close(); }
  console.log(JSON.stringify(report, null, 2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
