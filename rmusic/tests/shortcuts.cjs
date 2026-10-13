#!/usr/bin/env node
// Focused browser checks for removed app modifier shortcuts and Ponder.
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
const report = { base, checks: [], errors: [], snapshots: [], limits: 'Chromium on macOS; no physical iPhone or native browser shortcut execution' };
const ponderSelector = '[data-testid="ponder-stage"],[data-testid="ponder-navigation"],[data-testid="ponder-hint-capsule"]';

async function state(page) {
  return page.evaluate(() => ({ url: location.href, palette: Boolean(document.querySelector('[data-testid="command-palette-panel"]')), ponder: Boolean(document.querySelector('[data-testid^="ponder-"]')), windows: document.querySelectorAll('[data-folia-keyboard-window="true"]').length, audio: [...document.querySelectorAll('audio')].map(a => ({ paused: a.paused, time: a.currentTime })) }));
}
async function check(name, action) { await action(); report.checks.push(name); console.log('PASS: ' + name); }
async function combinationKeys(page, scope) {
  const before = await state(page);
  const entries = await page.evaluate(() => {
    const target = document.activeElement === document.body ? document.body : document.activeElement;
    const results = [];
    for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey']) {
      for (const [key, code] of [['k','KeyK'],['b','KeyB'],['g','KeyG'],['s','KeyS'],['q','KeyQ'],['Enter','Enter'],['ArrowLeft','ArrowLeft'],['ArrowRight','ArrowRight'],['1','Digit1'],['Tab','Tab']]) {
        const event = new KeyboardEvent('keydown', { key, code, [modifier]: true, bubbles: true, cancelable: true });
        target.dispatchEvent(event);
        results.push({ modifier, key, prevented: event.defaultPrevented });
        target.dispatchEvent(new KeyboardEvent('keyup', { key, code, [modifier]: true, bubbles: true, cancelable: true }));
      }
    }
    return results;
  });
  assert.ok(entries.every(entry => !entry.prevented), `Application consumed a modifier key in ${scope}: ${JSON.stringify(entries.filter(e => e.prevented))}`);
  await page.waitForTimeout(100);
  assert.deepEqual(await state(page), before, `Combination changed app state in ${scope}`);
  report.snapshots.push({ scope, combinationCount: entries.length });
}
async function openContext(browser, viewport) {
  const context = await browser.newContext({ viewport, locale: 'zh-CN', serviceWorkers: 'block', colorScheme: 'dark' });
  // Only metadata is needed to prepare a paused queue; no media is played.
  const sampleRate = 22050, wav = Buffer.alloc(44 + sampleRate * 2);
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(sampleRate, 24); wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(wav.length - 44, 40);
  await context.route('https://raw.githubusercontent.com/Roylyl/Music/**', route => {
    const url = new URL(route.request().url());
    if (/\.mp3$/i.test(url.pathname)) return route.fulfill({ status: 200, contentType: 'audio/wav', headers: { 'Access-Control-Allow-Origin': '*' }, body: wav });
    if (/\.lrc$/i.test(url.pathname)) return route.fulfill({ status: 200, contentType: 'text/plain', body: '' });
    return route.continue();
  });
  await context.addInitScript(() => {
    localStorage.setItem('rmusic:custom_shortcut_letter', 'q');
    localStorage.setItem('rmusic:custom_shortcut_command', 'settings-options');
    localStorage.setItem('rmusic:grid_command_palette_hotkey', 'true');
    localStorage.setItem('rmusic:ponder_hint_visibility', 'always');
    window.__shortcutQA = { keys: [] };
    window.addEventListener('keydown', event => {
      queueMicrotask(() => window.__shortcutQA.keys.push({ key: event.key, code: event.code, prevented: event.defaultPrevented, shift: event.shiftKey, ctrl: event.ctrlKey, meta: event.metaKey, alt: event.altKey }));
    }, { capture: true });
  });
  const page = await context.newPage(); page.setDefaultTimeout(10000);
  page.on('pageerror', e => report.errors.push({ width: viewport.width, text: e.message }));
  page.on('console', m => { if (m.type() === 'error') report.errors.push({ width: viewport.width, text: m.text() }); });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('#app-splash').waitFor({ state: 'hidden' });
  await page.getByRole('heading', { name: 'R music', exact: true }).waitFor();
  return { context, page };
}
async function nativeEditingAndFocus(page) {
  const input = page.getByPlaceholder('搜索歌曲、专辑或歌手');
  await input.fill('abcdef');
  await input.press('Home'); await input.press('Shift+ArrowRight');
  assert.deepEqual(await input.evaluate(i => [i.selectionStart, i.selectionEnd]), [0, 1]);
  await input.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A'); await input.press('Backspace');
  assert.equal(await input.inputValue(), '');
  await input.press('g'); assert.equal(await input.inputValue(), 'g');
  assert.equal(await page.locator(ponderSelector).count(), 0);
  await input.fill(''); await input.focus();
  await page.keyboard.press('Tab');
  assert.equal(await input.evaluate(i => i === document.activeElement), false, 'Tab did not move focus');
  await page.keyboard.press('Shift+Tab');
  assert.equal(await input.evaluate(i => i === document.activeElement), true, 'ShiftTab did not return focus');
  const tabs = await page.evaluate(() => window.__shortcutQA.keys.filter(e => e.key === 'Tab').slice(-2));
  assert.ok(tabs.every(e => !e.prevented), 'Application consumed native Tab');
  await input.evaluate(i => i.blur());
}
async function settingsWithoutPonder(page) {
  await page.getByTitle('选项', { exact: true }).first().click();
  const settings = page.locator('[data-folia-keyboard-window="true"]').last(); await settings.waitFor();
  assert.ok(!(await settings.innerText()).includes('思索'), 'Settings still contains Ponder');
  await settings.getByRole('button', { name: '帮助', exact: true }).click();
  assert.ok(!(await settings.innerText()).includes('思索'), 'Help still contains Ponder');
  assert.equal(await page.locator(ponderSelector).count(), 0);
  await page.keyboard.press('Escape'); await settings.waitFor({ state: 'hidden' });
}
async function narrowPointerAccess(page) {
  await page.goto(new URL('?track=qq-AC%EF%BC%8FDC-Back%20In%20Black-d01-t01#player', base).href, { waitUntil: 'domcontentloaded' });
  await page.locator('#app-splash').waitFor({ state: 'hidden' });
  await page.waitForFunction(() => [...document.querySelectorAll('audio')].some(a => a.currentSrc));
  // The homepage navigation pill is desktop-only; narrow layouts keep this queue button.
  await page.getByTestId('panel-toggle').locator('button').click();
  const panel = page.getByTestId('unified-panel-surface'); await panel.waitFor();
  await panel.locator('[data-ponder-panel-tab-button="queue"]').click();
  await panel.getByRole('button', { name: '队列拼贴', exact: true }).click();
  await page.getByRole('region', { name: '队列拼贴', exact: true }).waitFor();
  await combinationKeys(page, 'narrow Lattice');
  const tools = page.getByRole('button', { name: 'Lattice工具', exact: true });
  const box = await tools.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 55, box.y + box.height / 2, { steps: 6 }); await page.mouse.up();
  const palette = page.getByTestId('command-palette-panel'); await palette.waitFor();
  assert.ok(!(await palette.innerText()).includes('思索'), 'Palette still contains Ponder');
  await combinationKeys(page, 'command palette');
  await page.keyboard.press('Escape'); await palette.waitFor({ state: 'hidden' });
  await page.keyboard.press('s'); await palette.waitFor();
  await page.keyboard.press('Escape'); await palette.waitFor({ state: 'hidden' });
  assert.equal(await page.locator(ponderSelector).count(), 0);
  assert.ok((await state(page)).audio.every(audio => audio.paused && audio.time === 0));
}
async function run() {
  const browser = await chromium.launch({ ...(executable ? { executablePath: executable } : {}), headless: true, args: ['--disable-gpu'] });
  try {
    if (!process.argv.includes('--narrow')) {
    const desktop = await openContext(browser, { width: 1440, height: 960 });
    try {
      await check('desktop combinations and stored AltQ binding do not execute or preventDefault', () => combinationKeys(desktop.page, 'home'));
      await check('real G hold does not open Ponder', async () => {
        await desktop.page.getByTitle('选项', { exact: true }).hover();
        await desktop.page.keyboard.down('g'); await desktop.page.waitForTimeout(700); await desktop.page.keyboard.up('g');
        assert.equal(await desktop.page.locator(ponderSelector).count(), 0);
        // Bare G may still belong to ordinary filtering; only the removed Ponder is forbidden.
      });
      await check('native Tab, ShiftTab and input editing remain usable', () => nativeEditingAndFocus(desktop.page));
      await check('desktop settings and help have no Ponder entry', () => settingsWithoutPonder(desktop.page));
    } finally { await desktop.context.close(); }
    }
    const narrow = await openContext(browser, { width: 390, height: 844 });
    try {
      if (!process.argv.includes('--narrow')) await check('390px settings/help have no Ponder entry', () => settingsWithoutPonder(narrow.page));
      await check('Lattice click, palette slide and bare S stay usable; combinations stay inactive', () => narrowPointerAccess(narrow.page));
    } catch (error) {
      report.narrowFailureState = await state(narrow.page);
      report.narrowFailureText = (await narrow.page.locator('body').innerText()).slice(0, 2200);
      await narrow.page.screenshot({ path: '/tmp/rmusic-shortcuts-failure.png' });
      throw error;
    } finally { await narrow.context.close(); }
    assert.equal(report.errors.length, 0, 'Unexpected page/console errors');
  } catch (error) { report.failure = error.stack; process.exitCode = 1; }
  finally { fs.writeFileSync('/tmp/rmusic-shortcuts-qa.json', JSON.stringify(report, null, 2)); await browser.close(); }
  console.log(JSON.stringify(report, null, 2));
}
run().catch(error => { console.error(error); process.exitCode = 1; });
