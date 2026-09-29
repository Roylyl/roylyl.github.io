'use strict';
const assert = require('node:assert/strict');
require('../playback-feedback.js');
const {bufferGradient, createRetryController} = globalThis.RoylylPlaybackFeedback;
const buffered = ranges => ({length: ranges.length, start: index => ranges[index][0], end: index => ranges[index][1]});

assert.equal(bufferGradient(buffered([]), 200), 'none');
assert.equal(bufferGradient(buffered([[0, 10]]), NaN), 'none');
assert.equal(bufferGradient(buffered([[0, 10]]), Infinity), 'none');
assert.equal(bufferGradient(buffered([[0, 10]]), 0), 'none');
assert.equal(bufferGradient(buffered([[0, 20], [80, 120]]), 200),
  'linear-gradient(to right,var(--seek-buffered,#ffffff66) 0% 10%,transparent 10% 40%,var(--seek-buffered,#ffffff66) 40% 60%,transparent 60% 100%)');
assert.equal(bufferGradient(buffered([[20, 40], [0, 25], [40, 120]]), 100),
  'linear-gradient(to right,var(--seek-buffered,#ffffff66) 0% 100%)');
assert.equal(bufferGradient(buffered([[-20, 20], [90, 180]]), 100),
  'linear-gradient(to right,var(--seek-buffered,#ffffff66) 0% 20%,transparent 20% 90%,var(--seek-buffered,#ffffff66) 90% 100%)');
assert.equal(bufferGradient({length: 1, start() { throw new Error('Changed source'); }}, 100), 'none');
assert.equal(bufferGradient(buffered([[NaN, 20], [60, 40]]), 100), 'none');
console.log('通过：缓冲轨道保留间断、合并重叠、裁剪边界，未就绪或过期时间范围不产生错误填充。');

function harness() {
  const jobs = new Map();
  let serial = 0, online = true;
  const controller = createRetryController({
    setTimeout(callback, delay) { jobs.set(++serial, {callback, delay}); return serial; },
    clearTimeout(id) { jobs.delete(id); },
    isOnline: () => online,
  });
  function run() { const pending = [...jobs.values()]; jobs.clear(); for (const job of pending) job.callback(); }
  return {controller, jobs, run, offline() { online = false; }};
}

(async () => {
  let h = harness(), attempts = 0;
  const first = h.controller.begin('a', '/a.mp3?v=1');
  assert(h.controller.retry(first, {name: 'NetworkError'}, () => attempts++));
  assert.equal([...h.jobs.values()][0].delay, 350);
  assert.equal(h.controller.retry(first, {code: 2}, () => attempts++), false, 'error event and play rejection share one retry');
  h.run(); assert.equal(attempts, 1);
  assert.equal(h.controller.retry(first, {code: 3}, () => attempts++), false, 'retry failure must not create a retry loop');
  const second = h.controller.begin('a', '/a.mp3?v=1');
  assert.notEqual(second.id, first.id);
  assert(first.signal.aborted);
  assert(h.controller.retry(second, {code: 3}, () => attempts++), 'explicit new request receives a fresh allowance');
  h.run(); assert.equal(attempts, 2);

  for (const error of [{name: 'NotAllowedError'}, {name: 'AbortError'}, {code: 1}]) {
    h = harness(); const ticket = h.controller.begin('a', '/a.mp3');
    assert.equal(h.controller.retry(ticket, error, () => assert.fail('must not retry')), false);
    assert.equal(h.jobs.size, 0);
  }
  h = harness(); let ticket = h.controller.begin('a', '/a.mp3'); h.offline();
  assert.equal(h.controller.retry(ticket, {code: 2}, () => assert.fail('offline')), false);
  h = harness(); ticket = h.controller.begin('a', '/a.mp3');
  assert.equal(h.controller.retry(ticket, {code: 2}, () => assert.fail('offline'), {online: false}), false);
  assert(h.controller.retry(ticket, {code: 2}, () => assert.fail('went offline before timer')));
  h.offline(); h.run();
  console.log('通过：同次播放最多自动重试一次，主动新请求重置额度；权限拒绝、取消和离线不会自动重试。');

  for (const action of ['pause', 'track', 'source', 'new-request']) {
    h = harness(); ticket = h.controller.begin('a', '/a.mp3?v=1');
    assert(h.controller.retry(ticket, {code: 2}, () => assert.fail('stale playback resumed: ' + action)));
    const alreadyQueued = [...h.jobs.values()][0].callback;
    if (action === 'pause') h.controller.cancel();
    else h.controller.begin(action === 'track' ? 'b' : 'a', action === 'source' ? '/a.mp3?v=2' : '/a.mp3?v=1');
    assert(ticket.signal.aborted); assert.equal(h.controller.isCurrent(ticket), false);
    assert.equal(h.jobs.size, 0); alreadyQueued();
    assert.equal(h.controller.retry(ticket, {code: 2}, () => assert.fail('old request rescheduled')), false);
  }

  h = harness(); ticket = h.controller.begin('a', '/a.mp3');
  let release, task, resumed = false, aborted = false;
  const pending = new Promise(resolve => { release = resolve; });
  h.controller.retry(ticket, {code: 2}, request => {
    request.signal.addEventListener('abort', () => { aborted = true; });
    task = (async () => { await pending; if (h.controller.isCurrent(request)) resumed = true; })();
  });
  h.run(); h.controller.cancel(); release(); await task;
  assert(aborted); assert.equal(resumed, false);
  console.log('通过：暂停、切歌、换源或新请求取消待重试任务；迟到定时器和异步结果不会恢复旧播放。');
})().catch(error => { console.error(error); process.exitCode = 1; });
