const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// A small deterministic browser model exercises navigation events, history and
// delayed loads without fetching media or depending on network timing.
function browser({ href = 'https://example.test/', state = null, navigationType = 'navigate', shell = true } = {}) {
  const location = new URL(href);
  let now = 0, timerId = 0;
  const timers = new Map();
  class Events {
    constructor() { this.listeners = {}; }
    addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
    dispatchEvent(event) { for (const fn of this.listeners[event.type] || []) fn(event); }
  }
  class Element extends Events {
    constructor(tag, doc) {
      super(); Object.assign(this, { tagName: tag.toUpperCase(), ownerDocument: doc, children: [], dataset: {}, attrs: {}, className: '', isConnected: true });
      this.classList = {
        contains: name => this.className.split(' ').includes(name),
        add: (...names) => { this.className = [...new Set([...this.className.split(' ').filter(Boolean), ...names])].join(' '); },
        remove: (...names) => { this.className = this.className.split(' ').filter(name => !names.includes(name)).join(' '); },
        toggle: (name, enabled) => enabled ? this.classList.add(name) : this.classList.remove(name)
      };
      if (tag === 'iframe') {
        this.contentDocument = makeDocument(false);
        this.contentWindow = this.contentDocument.defaultView;
      }
    }
    append(...nodes) { for (const node of nodes) { node.parentNode = this; this.children.push(node); } }
    remove() { this.isConnected = false; if (this.parentNode) this.parentNode.children = this.parentNode.children.filter(node => node !== this); }
    setAttribute(name, value) { this.attrs[name] = value; }
    removeAttribute(name) { delete this.attrs[name]; }
    hasAttribute(name) { return name in this.attrs; }
    focus() { this.ownerDocument.activeElement = this; }
    scrollIntoView(options) { this.scrollOptions = options; this.ownerDocument.defaultView.scrollY = this.offset || 0; }
    closest() { return this.tagName === 'A' ? this : null; }
    set src(value) { this.contentWindow.location = new URL(value, location.href); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    querySelectorAll(selector) {
      const descendants = this.children.flatMap(child => [child, ...child.querySelectorAll('__all')]);
      if (selector === '__all') return descendants;
      if (selector.includes(' ')) { const [first, ...rest] = selector.split(' '); return this.querySelector(first)?.querySelectorAll(rest.join(' ')) || []; }
      return descendants.filter(node => selector.split(',').some(part => {
        part = part.trim();
        if (part.startsWith('.')) return node.classList.contains(part.slice(1));
        if (part.startsWith('[data-')) return part.slice(6, -1).replace(/-([a-z])/g, (_, c) => c.toUpperCase()) in node.dataset;
        return node.tagName.toLowerCase() === part;
      }));
    }
  }
  function makeDocument(hasShell) {
    const doc = new Events();
    doc.documentElement = new Element('html', doc); doc.documentElement.lang = 'zh-CN';
    doc.body = new Element('body', doc); doc.title = 'Portfolio';
    doc.main = new Element('main', doc); doc.header = new Element('header', doc);
    if (hasShell) doc.header.className = 'site-header';
    doc.body.append(doc.header, doc.main, new Element('footer', doc));
    doc.activeElement = doc.body;
    doc.createElement = tag => new Element(tag, doc);
    doc.querySelector = selector => doc.body.querySelector(selector);
    doc.querySelectorAll = selector => selector.startsWith('body >') ? doc.body.children.filter(node => ['HEADER', 'MAIN', 'FOOTER'].includes(node.tagName)) : doc.body.querySelectorAll(selector);
    doc.getElementById = id => doc.body.querySelectorAll('__all').find(node => node.id === id);
    const target = new Element('section', doc); target.id = hasShell ? 'projects' : 'prototype'; target.offset = 1450; doc.main.append(target);
    const win = new Events();
    Object.assign(win, { document: doc, scrollY: 0, location: new URL(location.href), postMessage() {}, scrollTo(options) { this.scrollY = options.top; this.scrollOptions = options; } });
    doc.defaultView = win;
    return doc;
  }
  const document = makeDocument(shell), window = document.defaultView;
  window.location = location; window.parent = window;
  const entries = [{ href: location.href, state }]; let entry = 0;
  const history = {
    get state() { return entries[entry].state; },
    get length() { return entries.length; },
    replaceState(value, _, url) { location.href = new URL(url, location.href).href; entries[entry] = { href: location.href, state: value }; },
    pushState(value, _, url) { entries.splice(entry + 1); entries.push({ href: new URL(url, location.href).href, state: value }); entry++; location.href = entries[entry].href; },
    go(delta) { entry += delta; location.href = entries[entry].href; window.dispatchEvent({ type: 'popstate', state: history.state }); }
  };
  const context = vm.createContext({ window, document, history, location, URL, console,
    matchMedia: () => ({ matches: true }),
    Event: class { constructor(type) { this.type = type; } },
    CustomEvent: class { constructor(type, options) { this.type = type; Object.assign(this, options); } },
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, time: now + delay }); return id; },
    clearTimeout(id) { timers.delete(id); }, requestAnimationFrame: fn => fn(),
    performance: { getEntriesByType: () => [{ type: navigationType }] },
    sessionStorage: { getItem: () => null, removeItem() {} }
  });
  function click(href, doc = document) {
    const link = doc.createElement('a'); link.href = new URL(href, location.href).href; link.focus();
    doc.dispatchEvent({ type: 'click', target: link, button: 0, preventDefault() { this.defaultPrevented = true; } });
    return link;
  }
  return { window, document, history, location, click,
    run(file) { vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context); },
    tick(ms) { now += ms; for (const [id, timer] of [...timers]) if (timer.time <= now) { timers.delete(id); timer.fn(); } },
    frames: () => document.body.querySelectorAll('iframe'),
    panel: () => document.querySelector('.detail-load-error'),
    action(selector) { document.querySelector(selector).dispatchEvent({ type: 'click' }); },
    ready(frame) { frame.dispatchEvent({ type: 'load' }); },
    navigate(frame, href) { window.dispatchEvent({ type: 'message', origin: location.origin, source: frame.contentWindow, data: { type: 'site:navigate', href } }); }
  };
}

test('direct fragment opens its section and keeps a clean address', () => {
  const b = browser({ href: 'https://example.test/#projects' }); b.run('nav-scroll.js');
  b.window.dispatchEvent({ type: 'pageshow', persisted: false });
  assert.equal(b.location.hash, ''); assert.equal(b.window.scrollY, 1450);
});

for (const navigationType of ['reload', 'back_forward']) test(`${navigationType} restores a saved reading position`, () => {
  const b = browser({ navigationType, state: { pagePath: '/', pageScrollY: 820 } });
  b.run('continuous-navigation.js'); b.run('nav-scroll.js');
  b.window.dispatchEvent({ type: 'pageshow', persisted: false });
  assert.equal(b.window.scrollY, 820);
});

test('loading feedback appears after 300ms and cancelling restores home focus and position', () => {
  const b = browser(); b.run('continuous-navigation.js'); b.window.scrollY = 900;
  const link = b.click('/soundshare.html'), old = b.frames()[0];
  b.tick(299); assert.equal(b.panel().hidden, true); b.tick(1); assert.equal(b.panel().hidden, false);
  b.action('[data-load-cancel]');
  assert.equal(b.history.length, 1); assert.equal(b.frames().length, 0);
  assert.equal(b.window.scrollY, 900); assert.equal(b.document.activeElement, link);
  b.ready(old); assert.equal(b.frames().length, 0); assert.equal(b.location.pathname, '/');
});

test('retry replaces the pending frame, commits once, and ignores an outdated load', () => {
  const b = browser(); b.run('continuous-navigation.js'); b.click('/soundshare.html');
  const old = b.frames()[0]; b.tick(8000);
  assert.equal(b.document.querySelector('[data-load-retry]').hidden, false);
  b.action('[data-load-retry]'); const current = b.frames()[0];
  assert.notEqual(current, old); assert.equal(b.frames().length, 1); assert.equal(b.history.length, 1);
  b.ready(old); assert.equal(b.location.pathname, '/');
  b.ready(current); assert.equal(b.location.pathname, '/soundshare.html'); assert.equal(b.history.length, 2);
});

test('cross-page cancellation retains the previous detail document and keyboard focus', () => {
  const b = browser(); b.run('continuous-navigation.js'); b.click('/soundshare.html');
  const first = b.frames()[0]; b.ready(first); first.contentWindow.scrollY = 720;
  const focus = first.contentDocument.createElement('a'); focus.focus();
  b.navigate(first, '/ultrasonic.html'); b.tick(300); b.action('[data-load-cancel]');
  assert.equal(b.frames().length, 1); assert.equal(b.frames()[0], first);
  assert.equal(first.inert, false); assert.equal(first.contentWindow.scrollY, 720);
  assert.equal(first.contentDocument.activeElement, focus); assert.equal(b.history.length, 2);
});

test('cancelling a back navigation restores its original history entry without adding one', () => {
  const b = browser(); b.run('continuous-navigation.js'); b.click('/soundshare.html'); b.ready(b.frames()[0]);
  b.navigate(b.frames()[0], '/ultrasonic.html'); b.ready(b.frames().at(-1));
  const previous = b.frames()[0]; previous.contentWindow.scrollY = 650;
  b.window.dispatchEvent({ type: 'scroll' }); b.history.go(-1); b.tick(300); b.action('[data-load-cancel]');
  assert.equal(b.location.pathname, '/ultrasonic.html'); assert.equal(b.history.length, 3);
  assert.equal(b.frames()[0], previous); assert.equal(previous.contentWindow.scrollY, 650);
});

test('detail section navigation respects reduced motion and does not add history', () => {
  const b = browser(); b.run('continuous-navigation.js'); b.click('/soundshare.html'); b.ready(b.frames()[0]);
  const frame = b.frames()[0]; b.navigate(frame, '/soundshare.html#prototype');
  assert.equal(frame.contentDocument.getElementById('prototype').scrollOptions.behavior, 'instant');
  assert.equal(b.history.length, 2); assert.equal(b.location.hash, '');
});
