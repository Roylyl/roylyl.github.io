const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// PARTICLE_SCRIPT optionally points to an old revision for a regression baseline.
const scriptPath = process.env.PARTICLE_SCRIPT || resolve(__dirname, '../soundshare-particles.js');
const source = readFileSync(scriptPath, 'utf8');

class Events {
  listeners = new Map();
  addEventListener(type, callback, options = {}) {
    const entries = this.listeners.get(type) || [];
    entries.push({ callback, options });
    this.listeners.set(type, entries);
  }
  emit(type, event = {}, stoppedBelowWindow = false) {
    for (const { callback, options } of this.listeners.get(type) || []) {
      if (!options.signal?.aborted && (!stoppedBelowWindow || options.capture)) callback(event);
    }
  }
}

function page({ maxTouchPoints = 0, primaryFine = true, anyFine = primaryFine,
  reduced = false, dpr = 1, bounds } = {}) {
  const window = new Events();
  const document = new Events();
  const motion = Object.assign(new Events(), { matches: reduced });
  const frameQueue = new Map();
  const uniforms = new Map();
  let nextFrame = 0, now = 0, draws = 0;
  const gl = new Proxy({}, {
    get(_, name) {
      if (name === 'getExtension' || name === 'getShaderParameter' || name === 'getProgramParameter') return () => true;
      if (name === 'checkFramebufferStatus') return () => 'FRAMEBUFFER_COMPLETE';
      if (name === 'getUniformLocation') return (_, uniform) => uniform;
      if (name === 'uniform2f') return (uniform, x, y) => uniforms.set(uniform, [x, y]);
      if (name === 'drawArrays') return () => { draws++; };
      if (name.startsWith('create')) return () => ({});
      if (name === name.toUpperCase()) return name;
      return () => {};
    }
  });
  const surface = bounds && {
    getBoundingClientRect: () => ({ ...bounds, right: bounds.left + bounds.width, bottom: bounds.top + bounds.height })
  };
  const canvas = {
    dataset: bounds ? {} : { particleMode: 'viewport' },
    closest: () => surface,
    getContext: () => gl,
    classList: { add(name) { assert.fail(`Renderer unexpectedly entered ${name}`); } }
  };
  Object.assign(document, {
    hidden: false,
    documentElement: { classList: { contains: () => false } },
    querySelector: selector => selector.includes('canvas') || selector.includes('Canvas') ? canvas : surface
  });
  Object.assign(window, {
    innerWidth: 1000, innerHeight: 800, devicePixelRatio: dpr,
    matchMedia(query) {
      if (query.includes('reduced-motion')) return motion;
      return { matches: query.includes('any-pointer') ? anyFine : primaryFine };
    },
    requestAnimationFrame(callback) { const id = ++nextFrame; frameQueue.set(id, callback); return id; },
    cancelAnimationFrame(id) { frameQueue.delete(id); }
  });
  window.parent = window;
  class Observer { observe() {} disconnect() {} }
  Object.assign(window, { ResizeObserver: Observer, IntersectionObserver: Observer });
  vm.runInNewContext(source, {
    window, document, navigator: { maxTouchPoints }, location: { origin: 'https://example.test' },
    AbortController, MutationObserver: Observer, ResizeObserver: Observer, IntersectionObserver: Observer,
    console: { warn(...args) { assert.fail(args.join(' ')); } }
  }, { filename: scriptPath });
  return {
    canvas, window,
    pending: () => frameQueue.size,
    draws: () => draws,
    pointer(type = 'pointermove', props = {}, stoppedBelowWindow = false) {
      window.emit(type, { pointerType: 'mouse', clientX: 900, clientY: 80, ...props }, stoppedBelowWindow);
    },
    advance(count = 120) {
      for (let index = 0; index < count; index++) {
        assert.equal(frameQueue.size, 1, 'exactly one animation frame should be pending');
        const [id, callback] = frameQueue.entries().next().value;
        frameQueue.delete(id);
        callback(now += 1000 / 60);
      }
      const position = uniforms.get('uRingPosition');
      assert.ok(position, 'the real renderer must send a ring position to WebGL');
      return position;
    }
  };
}

function near(actual, expected) {
  actual.forEach((value, index) => assert.ok(Math.abs(value - expected[index]) < 0.002,
    `ring ${actual} should converge to ${expected}`));
}

test('initial animation is autonomous even when a desktop mouse is available', () => {
  const desktop = page();
  const touchOnly = page({ maxTouchPoints: 10, primaryFine: false });
  assert.deepEqual(desktop.advance(40), touchOnly.advance(40));
});

for (const [name, options] of [
  ['desktop mouse', {}],
  ['Windows hybrid touchscreen with mouse', { maxTouchPoints: 10, primaryFine: true }],
  ['mouse attached to a coarse-primary device', { maxTouchPoints: 10, primaryFine: false }]
]) {
  test(`${name} follows actual mouse events`, () => {
    const app = page(options);
    app.pointer();
    near(app.advance(), [0.8, 0.8]);
  });
}

for (const [name, extra] of [
  ['unavailable', {}],
  ['empty', { getCoalescedEvents: () => [] }],
  ['latest sample', { clientX: 100, clientY: 720,
    getCoalescedEvents: () => [{ clientX: 250, clientY: 600 }, { clientX: 900, clientY: 80 }] }]
]) {
  test(`mouse coordinates work with coalesced events ${name}`, () => {
    const app = page();
    app.pointer('pointermove', extra);
    near(app.advance(), [0.8, 0.8]);
  });
}

for (const type of ['pointermove', 'pointerdown']) {
  test(`${type} is observed before a child stops bubbling and remains passive`, () => {
    const app = page();
    app.pointer(type, {}, true);
    near(app.advance(), [0.8, 0.8]);
    assert.ok(app.window.listeners.get(type).every(entry => entry.options.passive === true));
  });
}

// Compare reset behavior to a mouse outside the surface, an independent public
// input that also selects automatic movement. This avoids copying its noise math.
for (const [name, reset] of [
  ['touch movement', app => app.pointer('pointermove', { pointerType: 'touch' })],
  ['touch contact', app => app.pointer('pointerdown', { pointerType: 'touch' })],
  ['pen movement', app => app.pointer('pointermove', { pointerType: 'pen' })],
  ['pen contact', app => app.pointer('pointerdown', { pointerType: 'pen' })],
  ['mouse leaving the window', app => app.pointer('pointerout', { relatedTarget: null })],
  ['cancelled mouse pointer', app => app.pointer('pointercancel')],
  ['window losing focus', app => app.window.emit('blur')]
]) {
  test(`${name} returns to automatic movement; a mouse can resume afterwards`, () => {
    const app = page();
    const control = page();
    for (const instance of [app, control]) { instance.pointer(); instance.advance(30); }
    reset(app);
    control.pointer('pointermove', { clientX: -1000, clientY: -1000 });
    assert.deepEqual(app.advance(60), control.advance(60));
    app.pointer('pointermove', { clientX: 100, clientY: 720 });
    near(app.advance(), [-0.8, -0.8]);
  });
}

test('moving between elements within the window keeps following the mouse', () => {
  const app = page();
  app.pointer();
  app.advance(20);
  app.pointer('pointerout', { relatedTarget: {} });
  near(app.advance(), [0.8, 0.8]);
});

test('local particle surfaces use their own offset and size for pointer coordinates', () => {
  const app = page({ bounds: { left: 200, top: 100, width: 400, height: 300 } });
  app.pointer('pointermove', { clientX: 500, clientY: 175 });
  near(app.advance(), [0.5, 0.5]);
});

for (const [anyFine, scale] of [[true, 2], [false, 1.5]]) {
  test(`rendering resolution uses any-pointer fine=${anyFine} independently of interaction`, () => {
    const app = page({ maxTouchPoints: 10, primaryFine: false, anyFine, dpr: 3 });
    assert.equal(app.canvas.width, 1000 * scale);
    assert.equal(app.canvas.height, 800 * scale);
    app.pointer();
    near(app.advance(), [0.8, 0.8]);
  });
}

test('reduced motion schedules no frames, including after mouse input', () => {
  const app = page({ reduced: true });
  assert.equal(app.pending(), 0);
  app.pointer();
  app.pointer('pointerdown');
  assert.equal(app.pending(), 0);
  assert.equal(app.draws(), 0);
});
