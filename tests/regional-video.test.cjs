const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptPath = resolve(__dirname, '../regional-video.js');
const source = readFileSync(scriptPath, 'utf8');

class Events {
  listeners = new Map();
  addEventListener(type, callback) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(callback);
    this.listeners.set(type, listeners);
  }
  emit(type, event = {}) {
    for (const callback of this.listeners.get(type) || []) callback(event);
  }
}

class Element extends Events {
  constructor(tagName = 'div') {
    super();
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.attributes = new Map();
    this.removals = 0;
    this.liveNavigations = 0;
  }
  get isConnected() { return this.root === true || Boolean(this.parentElement?.isConnected); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) {
    if (name === 'src' && this.isConnected) this.liveNavigations++;
    this.attributes.set(name, value);
  }
  append(...children) { children.forEach(child => this.appendChild(child)); }
  appendChild(child) {
    if (child.parentElement) child.parentElement.children.splice(child.parentElement.children.indexOf(child), 1);
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
  before(sibling) {
    sibling.parentElement = this.parentElement;
    this.parentElement.children.splice(this.parentElement.children.indexOf(this), 0, sibling);
  }
  remove() {
    if (this.parentElement) {
      this.removals++;
      this.parentElement.children.splice(this.parentElement.children.indexOf(this), 1);
      this.parentElement = null;
    }
  }
}

function page({ failDetection = false, hidden = false } = {}) {
  const window = new Events();
  const document = new Events();
  const body = new Element();
  body.root = true;
  const grid = body.appendChild(new Element());
  const frames = ['xj9B_D_6wDI', 'o9ygrOS12eg'].map(id => {
    const frame = new Element('iframe');
    frame.setAttribute('src', `https://www.youtube.com/embed/${id}?autoplay=0`);
    grid.appendChild(new Element()).appendChild(frame);
    return frame;
  });
  Object.assign(document, {
    readyState: 'complete',
    documentElement: { lang: 'zh-CN', dataset: {}, classList: { contains: () => hidden } },
    querySelectorAll: () => frames,
    createElement: tag => new Element(tag)
  });
  let resolveCountry;
  let interruptedAudio = 0;
  window.siteBackgroundMusic = { interruptForVideo() { interruptedAudio++; } };
  const firstResponse = new Promise(resolve => { resolveCountry = resolve; });
  vm.runInNewContext(source, {
    window, document, URL, AbortController,
    setTimeout: () => 1, clearTimeout: () => {},
    fetch: failDetection ? async () => { throw new Error('Network unavailable'); } : () => firstResponse
  }, { filename: scriptPath });
  const controls = body.children[0];
  const [choices, status] = controls.children;
  return {
    window, document, frames, grid, controls, status,
    buttons: choices.children,
    interruptions: () => interruptedAudio,
    async detected(country) {
      resolveCountry({ ok: true, json: async () => ({ country }) });
      await window.__roylylCountryPromise;
    },
    settled: () => window.__roylylCountryPromise,
    visible(value) { window.emit('site:visibility-change', { detail: { visible: value } }); },
    language(value) { document.documentElement.lang = value; window.emit('site-language-change'); }
  };
}

test('known mainland region switches native frames to Bilibili without extra controls', async () => {
  const app = page();
  await app.detected('CN');
  assert.equal(app.document.documentElement.dataset.videoPlatform, 'bilibili');
  assert.equal(app.document.documentElement.dataset.regionStatus, 'known');
  assert.ok(app.frames.every(frame => frame.getAttribute('src').startsWith('https://player.bilibili.com/')));
  assert.ok(app.frames.every(frame => frame.getAttribute('src').includes('autoplay=0')));
  assert.ok(app.frames.every(frame => frame.liveNavigations === 0));
  assert.equal(app.buttons[0].getAttribute('aria-pressed'), 'true');
  assert.equal(app.status.hidden, true);
  assert.ok(app.grid.children.every(card => card.children.length === 1 && card.children[0].tagName === 'iframe'));
});

test('failed region lookups stay explicitly unknown and offer usable platform controls', async () => {
  const app = page({ failDetection: true });
  await app.settled();
  assert.equal(app.document.documentElement.dataset.regionStatus, 'unknown');
  assert.equal(app.status.textContent, '暂时无法判断访问地区，可手动切换平台。');
  assert.equal(app.status.hidden, false);
  app.buttons[0].emit('click');
  assert.equal(app.document.documentElement.dataset.videoPlatform, 'bilibili');
  assert.equal(app.status.textContent, '');
  assert.equal(app.status.hidden, true);
});

test('late region detection cannot overwrite a manual choice in either direction', async () => {
  for (const [button, country, expected] of [[0, 'US', 'bilibili'], [1, 'CN', 'youtube']]) {
    const app = page();
    app.buttons[button].emit('click');
    const removals = app.frames.map(frame => frame.removals);
    await app.detected(country);
    assert.equal(app.document.documentElement.dataset.videoPlatform, expected);
    assert.deepEqual(app.frames.map(frame => frame.removals), removals);
  }
});

test('observed iframe focus stops other video and native audio without blocking native controls', async () => {
  const app = page();
  assert.ok(app.frames.every(frame => !frame.inert && frame.tabIndex !== -1));
  app.frames[0].emit('focus');
  assert.equal(app.frames[1].removals, 0, 'untouched players do not reload');
  await app.detected('CN');
  assert.equal(app.document.documentElement.dataset.videoPlatform, 'youtube', 'detection must not restart an interacting player');
  app.frames[1].emit('focus');
  assert.equal(app.frames[0].removals, 1);
  assert.equal(app.interruptions(), 2);
  assert.equal(app.frames[0].isConnected, true);
  assert.equal(app.frames[0].getAttribute('src'), 'https://www.youtube.com/embed/xj9B_D_6wDI?autoplay=0');
  app.window.siteVideoPlayers.stopAll();
  assert.equal(app.frames[1].removals, 1);
  app.window.siteVideoPlayers.stopAll();
  assert.equal(app.frames[1].removals, 1, 'already-stopped embeds do not reload again');
  assert.ok(app.frames.every(frame => frame.liveNavigations === 0));
});

test('opening details destroys video contexts and returning retains platform without autoplay', async () => {
  const app = page();
  app.buttons[0].emit('click');
  app.frames[0].emit('focus');
  app.visible(false);
  assert.ok(app.frames.every(frame => !frame.isConnected));
  await app.detected('US');
  app.visible(true);
  assert.ok(app.frames.every(frame => frame.isConnected));
  assert.ok(app.frames.every(frame => !frame.inert && frame.tabIndex !== -1));
  assert.ok(app.frames.every(frame => frame.getAttribute('src').includes('autoplay=0')));
  assert.equal(app.document.documentElement.dataset.videoPlatform, 'bilibili');
});

test('platform controls and unknown-region feedback update across all three languages', async () => {
  const app = page({ failDetection: true });
  await app.settled();
  app.language('en');
  assert.equal(app.buttons[0].textContent, 'Bilibili');
  assert.equal(app.status.textContent, 'Your region could not be determined. You can switch platforms manually.');
  app.language('zh-TW');
  assert.equal(app.status.textContent, '暫時無法判斷存取地區，可手動切換平台。');
  assert.match(app.frames[0].title, /憂書/);
  app.language('zh-CN');
  assert.equal(app.status.textContent, '暂时无法判断访问地区，可手动切换平台。');
});

test('changing platforms replaces native players without starting or blocking the replacement video', () => {
  const app = page();
  app.frames[0].emit('focus');
  app.buttons[0].emit('click');
  assert.ok(app.frames.every(frame => !frame.inert && frame.tabIndex !== -1));
  assert.ok(app.frames.every(frame => frame.getAttribute('src').includes('autoplay=0')));
  assert.ok(app.frames.every(frame => frame.liveNavigations === 0));
});
