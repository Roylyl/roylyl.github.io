const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

function setup() {
  let now = 0, id = 0;
  const timers = new Map(), frames = new Map(), changes = [];
  const target = () => {
    const listeners = new Map();
    return {
      listeners,
      addEventListener(type, fn, options) { listeners.set(type, { fn, options }); },
      removeEventListener(type) { listeners.delete(type); },
      emit(type, data = {}) { listeners.get(type)?.fn(data); }
    };
  };
  const view = Object.assign(target(), {
    visualViewport: target(),
    setTimeout(fn, delay) { const key = ++id; timers.set(key, { fn, at: now + delay }); return key; },
    clearTimeout(key) { timers.delete(key); },
    requestAnimationFrame(fn) { const key = ++id; frames.set(key, fn); return key; },
    cancelAnimationFrame(key) { frames.delete(key); }
  });
  const source = readFileSync(require.resolve('../nav-glass-motion.js'), 'utf8').replace('export function', 'function');
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const dispose = context.watchGlassMotion(active => changes.push(active), view);
  const advance = (ms) => {
    now += ms;
    for (const [key, timer] of [...timers]) if (timer.at <= now) { timers.delete(key); timer.fn(); }
  };
  const paint = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  return { view, changes, advance, paint, dispose, timers, frames };
}

test('hides synchronously before touch scrolling and never restores while a finger remains down', () => {
  const h = setup(); h.view.emit('touchstart', { touches: [{}] });
  assert.deepEqual(h.changes, [true]);
  h.advance(1000); h.paint(); h.paint(); assert.deepEqual(h.changes, [true]);
  h.view.emit('touchend', { touches: [] }); h.advance(179); h.paint(); assert.deepEqual(h.changes, [true]);
  h.advance(1); h.paint(); assert.deepEqual(h.changes, [true]);
  h.paint(); assert.deepEqual(h.changes, [true, false]); h.dispose();
});
test('momentum and reversals extend the quiet period without flashing old frames', () => {
  const h = setup(); h.view.emit('scroll');
  for (let i = 0; i < 20; i++) { h.advance(100); h.view.emit('scroll'); h.paint(); }
  assert.deepEqual(h.changes, [true]);
  h.advance(180); h.paint(); h.view.emit('scroll'); h.paint();
  assert.deepEqual(h.changes, [true]);
  h.advance(180); h.paint(); h.paint(); assert.deepEqual(h.changes, [true, false]); h.dispose();
});
test('wheel, resize and visual viewport movement invalidate the displayed snapshot', () => {
  for (const [which, type] of [['view','wheel'], ['view','resize'], ['viewport','scroll'], ['viewport','resize']]) {
    const h = setup(); (which === 'view' ? h.view : h.view.visualViewport).emit(type);
    assert.deepEqual(h.changes, [true]); h.advance(180); h.paint(); h.paint();
    assert.deepEqual(h.changes, [true, false]); h.dispose();
  }
});
test('multitouch and cancellation cannot resume while another contact is held', () => {
  const h = setup(); h.view.emit('touchstart', { touches: [{},{}] });
  h.view.emit('touchend', { touches: [{}] }); h.advance(200); h.paint(); h.paint();
  assert.deepEqual(h.changes, [true]);
  h.view.emit('touchcancel', { touches: [] }); h.advance(180); h.paint(); h.paint();
  assert.deepEqual(h.changes, [true, false]); h.dispose();
});
test('listeners are passive and teardown cancels all delayed restoration', () => {
  const h = setup();
  for (const { options } of h.view.listeners.values()) assert.equal(options.passive, true);
  h.view.emit('scroll'); h.advance(180); h.paint(); h.dispose(); h.paint();
  assert.equal(h.view.listeners.size, 0); assert.equal(h.view.visualViewport.listeners.size, 0);
  assert.equal(h.timers.size, 0); assert.equal(h.frames.size, 0); assert.deepEqual(h.changes, [true]);
});
