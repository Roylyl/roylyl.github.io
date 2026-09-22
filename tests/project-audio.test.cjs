const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptPath = process.env.MUSIC_SCRIPT || resolve(__dirname, '../background-music.js');
const source = readFileSync(scriptPath, 'utf8');
const storageKey = 'roylyl.background-music.v1';

class Events {
  listeners = new Map();
  addEventListener(type, callback, options = {}) {
    const entries = this.listeners.get(type) || [];
    entries.push({ callback, capture: options === true || options.capture === true });
    this.listeners.set(type, entries);
  }
  emit(type, event = {}, captureOnly = false) {
    for (const listener of this.listeners.get(type) || []) {
      if (!captureOnly || listener.capture) listener.callback(event);
    }
  }
}

function page({ savedState = null } = {}) {
  const window = new Events();
  const document = new Events();
  const mediaEvents = [];
  const storage = new Map(savedState ? [[storageKey, JSON.stringify(savedState)]] : []);

  class Media extends Events {
    constructor(project = false) {
      super();
      this.project = project;
      this.paused = true;
      this.muted = !project;
      this.currentTime = 0;
      this.duration = 240;
      this.readyState = 1;
      this.requests = [];
    }
    matches(selector) { return this.project && selector === 'audio[data-project-audio]'; }
    play() {
      if (this.paused) mediaEvents.push(() => document.emit('play', { target: this }, true));
      this.paused = false;
      // Explicit settlement also models callbacks already queued when pause is
      // called. Tests can deliver an older request after a newer user action.
      return new Promise((resolve, reject) => this.requests.push({ resolve, reject }));
    }
    pause() { this.paused = true; }
  }

  const background = new Media();
  const previews = [new Media(true), new Media(true)];
  const label = { textContent: '' };
  const attributes = new Map();
  const toggle = Object.assign(new Events(), {
    classList: { toggle() {} },
    setAttribute: (key, value) => attributes.set(key, value),
    querySelector: () => label
  });
  Object.assign(document, {
    activeElement: null,
    documentElement: { lang: 'zh-CN', classList: { contains: () => false } },
    querySelector: selector => selector === '#backgroundMusic' ? background : selector === '.music-toggle' ? toggle : null,
    querySelectorAll: selector => selector === 'audio[data-project-audio]' ? previews : []
  });
  window.parent = window;
  vm.runInNewContext(source, {
    window, document, location: { origin: 'https://example.test' },
    sessionStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) }
  }, { filename: scriptPath });

  function flushMediaEvents() {
    while (mediaEvents.length) mediaEvents.shift()();
  }
  return {
    window, document, background, previews, attributes,
    flushMediaEvents,
    state: () => JSON.parse(storage.get(storageKey) || 'null'),
    async startBackground() {
      const operation = window.siteBackgroundMusic.toggle();
      flushMediaEvents();
      background.requests.at(-1).resolve();
      await operation;
    },
    startPreview(index = 0) {
      previews[index].play();
      flushMediaEvents();
    },
    setHomeVisible(visible) {
      window.emit('site:visibility-change', { detail: { visible } });
    }
  };
}

test('native preview playback pauses background music and updates its saved state and control', async () => {
  const app = page();
  await app.startBackground();
  assert.equal(app.background.paused, false);
  assert.equal(app.attributes.get('aria-pressed'), 'true');
  app.startPreview();
  assert.equal(app.previews[0].paused, false);
  assert.equal(app.background.paused, true);
  assert.equal(app.background.muted, true);
  assert.equal(app.state().enabled, false);
  assert.equal(app.attributes.get('aria-pressed'), 'false');
});

test('turning background music back on pauses the preview without resetting its position', async () => {
  const app = page();
  app.startPreview();
  app.previews[0].currentTime = 42;
  await app.startBackground();
  assert.equal(app.previews[0].paused, true);
  assert.equal(app.previews[0].currentTime, 42);
  assert.equal(app.background.paused, false);
  assert.equal(app.state().enabled, true);
});

test('only one project preview plays, and pausing or ending it does not restart background music', () => {
  const app = page();
  app.startPreview();
  app.startPreview(1);
  assert.equal(app.previews[0].paused, true);
  assert.equal(app.previews[1].paused, false);
  app.previews[1].pause();
  app.document.emit('pause', { target: app.previews[1] }, true);
  app.document.emit('ended', { target: app.previews[1] }, true);
  assert.equal(app.background.requests.length, 0);
});

test('a queued play event from an already-paused preview cannot interrupt background music', async () => {
  const app = page();
  await app.startBackground();
  app.previews[0].play();
  app.previews[0].pause();
  app.flushMediaEvents();
  assert.equal(app.background.paused, false);
  assert.equal(app.state().enabled, true);
});

test('a queued play event from an already-paused background track cannot stop a preview', () => {
  const app = page();
  const operation = app.window.siteBackgroundMusic.toggle();
  app.background.pause();
  app.startPreview();
  app.background.requests[0].resolve();
  assert.equal(app.previews[0].paused, false);
  return operation;
});

test('opening a detail pauses previews, preserves the position, and returning never autoplays', async () => {
  const app = page();
  app.startPreview();
  app.previews[0].currentTime = 73;
  app.setHomeVisible(false);
  assert.equal(app.previews[0].paused, true);
  app.setHomeVisible(true);
  app.flushMediaEvents();
  assert.equal(app.previews[0].paused, true);
  assert.equal(app.previews[0].currentTime, 73);
  assert.equal(app.previews[0].requests.length, 1);
  assert.equal(app.background.requests.length, 0);
  await app.startBackground();
  app.setHomeVisible(false);
  assert.equal(app.background.paused, false, 'detail navigation keeps background music continuous');
});

test('preview playback arriving while the home page is hidden is stopped without muting background music', async () => {
  const app = page();
  await app.startBackground();
  app.setHomeVisible(false);
  app.startPreview();
  assert.equal(app.previews[0].paused, true);
  assert.equal(app.background.paused, false);
});

test('focusing an embedded performance video pauses the preview, while an unrelated blur does not', () => {
  const app = page();
  app.startPreview();
  app.window.emit('blur');
  assert.equal(app.previews[0].paused, false);
  app.document.activeElement = { matches: selector => selector === '.video-grid iframe' };
  app.window.emit('blur');
  assert.equal(app.previews[0].paused, true);
  assert.equal(app.background.muted, true);
  assert.equal(app.state().enabled, false);
});

test('an older resolved background play cannot re-enable its control after a preview takes over', async () => {
  const app = page();
  const oldOperation = app.window.siteBackgroundMusic.toggle();
  app.flushMediaEvents();
  app.startPreview();
  app.background.requests[0].resolve();
  await oldOperation;
  assert.equal(app.previews[0].paused, false);
  assert.equal(app.attributes.get('aria-pressed'), 'false');
  assert.equal(app.state().enabled, false);
});

test('an older rejected background play cannot cancel a newer successful user request', async () => {
  const app = page();
  const oldOperation = app.window.siteBackgroundMusic.toggle();
  app.flushMediaEvents();
  app.startPreview();
  await app.startBackground();
  app.background.requests[0].reject(new Error('Previous play was interrupted'));
  await oldOperation;
  assert.equal(app.background.paused, false);
  assert.equal(app.background.muted, false);
  assert.equal(app.attributes.get('aria-pressed'), 'true');
  assert.equal(app.state().enabled, true);
});

test('an interrupted session restore cannot mute a later explicit playback', async () => {
  const app = page({ savedState: { enabled: true, currentTime: 24, savedAt: Date.now() } });
  app.flushMediaEvents();
  app.startPreview();
  await app.startBackground();
  app.background.requests[0].reject(new Error('Session restore was interrupted'));
  await Promise.resolve();
  assert.equal(app.background.paused, false);
  assert.equal(app.background.muted, false);
  assert.equal(app.attributes.get('aria-pressed'), 'true');
});
