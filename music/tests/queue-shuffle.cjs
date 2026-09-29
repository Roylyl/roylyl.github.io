'use strict';
const assert = require('node:assert/strict');
const {harness, plain, settle} = require('./playback-session.cjs');
const ids = list => plain(list.map(track => track.id));
const step = async (h, direction = 1, ended = false) => { h.ctx.advance(direction, ended); await settle(); };
function shuffled(seed = 7) {
  const h = harness(); h.loaded('a', 37); h.ctx.repeat = 'shuffle';
  h.ctx.Math.random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  h.ctx.resetShuffle('a'); h.ctx.historyAnchors = [null];
  return h;
}
function future(h) {
  const list = h.ctx.displayQueue(), current = list.findIndex(track => track._queueCurrent);
  assert(current >= 0); assert.equal(list.filter(track => track._queueCurrent).length, 1);
  return ids(list.slice(current + 1));
}

(async () => {
  for (const seed of [1, 7, 31]) {
    const h = shuffled(seed), round = ['a'];
    for (let n = 0; n < 3; n++) {
      const visibleNext = future(h)[0];
      assert.equal(h.ctx.nextPreloadTrack().id, visibleNext, 'preload agrees with visible future');
      await step(h); assert.equal(h.ctx.current.id, visibleNext); round.push(h.ctx.current.id);
    }
    assert.deepEqual([...new Set(round)].sort(), ['a', 'b', 'c', 'd'], 'all tracks play once per round');
    const last = h.ctx.current.id, next = h.ctx.nextPreloadTrack().id;
    assert.notEqual(next, last, 'new round cannot immediately repeat its last track');
    assert.equal(future(h)[0], next, 'new round preview agrees with playback');
    await step(h); assert.equal(h.ctx.current.id, next);
  }
  console.log('通过：整轮随机无重复，显示/预加载/下一首一致，跨轮不立即重复。');

  let h = shuffled(), originalFuture = future(h);
  h.ctx.addNext(h.ctx.get('d')); h.ctx.addNext(h.ctx.get('b'));
  assert.deepEqual(future(h), ['b', 'd', ...originalFuture]);
  await step(h); assert.equal(h.ctx.current.id, 'b');
  await step(h); assert.equal(h.ctx.current.id, 'd');
  assert.deepEqual(future(h), originalFuture);
  for (const id of originalFuture) { await step(h); assert.equal(h.ctx.current.id, id); }
  assert.deepEqual(ids(h.ctx.queue), ['a', 'b', 'c', 'd']);

  h = shuffled(); h.ctx.addNext(h.ctx.current);
  await step(h); assert.deepEqual(plain(h.ctx.playbackHistory), ['a', 'a']);
  const following = future(h)[0]; await step(h);
  assert.deepEqual(plain(h.ctx.playbackHistory), ['a', 'a', following]);
  await step(h, -1); assert.equal(h.ctx.current.id, 'a'); assert.equal(h.ctx.historyCursor, 1);
  h.audio.currentTime = 100; await step(h, -1); assert.equal(h.ctx.historyCursor, 0); assert.equal(h.audio.currentTime, 0);
  await step(h); assert.equal(h.ctx.historyCursor, 1); assert.equal(h.ctx.current.id, 'a');
  await step(h); assert.equal(h.ctx.historyCursor, 2); assert.equal(h.ctx.current.id, following);
  console.log('通过：插队后继续剩余随机顺序，原歌曲保留，同ID播放也按真实历史逐次返回。');

  h = shuffled(); await step(h); await step(h);
  const alreadyPlayed = h.ctx.current.id; await step(h, -1);
  const pending = future(h); h.ctx.addNext(h.ctx.get('d'));
  await step(h); assert.equal(h.ctx.current.id, 'd');
  assert.deepEqual(future(h), pending, 'insertion while browsing history preserves forward path');
  await step(h); assert.equal(h.ctx.current.id, alreadyPlayed);
  h.ctx.addNext(h.ctx.get('a')); h.ctx.savePlaybackSession();
  const order = plain(h.ctx.shuffleOrder), remaining = future(h), cursor = h.ctx.shuffleCursor;
  const restored = harness(h.storage); restored.ctx.restorePlaybackSession();
  assert.deepEqual(plain(restored.ctx.shuffleOrder), order); assert.equal(restored.ctx.shuffleCursor, cursor);
  assert.deepEqual(future(restored), remaining); assert.equal(restored.calls.play, 0);
  await step(restored); assert.equal(restored.ctx.current.id, remaining[0]);
  console.log('通过：历史中插队保留前进路径，刷新保留本轮顺序、剩余歌曲和待插队歌曲。');

  h = shuffled(); const base = ids(h.ctx.queue), playing = h.ctx.current.id, position = h.audio.currentTime;
  h.ctx.addNext(h.ctx.get('b')); h.ctx.addNext(h.ctx.get('c'));
  h.ctx.cancelInsertion('b'); assert.deepEqual(plain(h.ctx.nextUp), ['c']);
  h.ctx.undoQueueChange(); assert.deepEqual(plain(h.ctx.nextUp), ['c', 'b']);
  h.ctx.clearInsertions(); assert.deepEqual(plain(h.ctx.nextUp), []);
  assert.equal(h.ctx.current.id, playing); assert.equal(h.audio.currentTime, position); assert.deepEqual(ids(h.ctx.queue), base);
  h.ctx.undoQueueChange(); assert.deepEqual(plain(h.ctx.nextUp), ['c', 'b']);
  h.ctx.addNext(h.ctx.get('d')); await step(h); assert.equal(h.ctx.current.id, 'd');
  const afterConsumption = plain(h.ctx.nextUp); h.ctx.undoQueueChange(); assert.deepEqual(plain(h.ctx.nextUp), afterConsumption);
  h.ctx.clearInsertions(); h.ctx.playAlbum({tracks: [h.ctx.get('b'), h.ctx.get('c')]}); await settle();
  h.ctx.undoQueueChange(); assert.deepEqual(plain(h.ctx.nextUp), []); assert.deepEqual(ids(h.ctx.queue), ['b', 'c']);
  h.ctx.addNext(h.ctx.get('d')); h.flushTimer(5000); h.ctx.undoQueueChange();
  assert.deepEqual(plain(h.ctx.nextUp), ['d'], 'expired undo cannot alter queue');
  console.log('通过：取消/清空及撤销只作用于插队，保留原队列和当前播放；消费、换队列和到期使撤销失效。');

  h = harness(); h.loaded('a', 82); let attempts = 0;
  h.audio.play = async () => { attempts++; h.audio.paused = true; h.audio.error = {code: 2}; throw Object.assign(Error('unavailable'), {name: 'NetworkError'}); };
  await h.ctx.play(h.ctx.current, h.ctx.queue, true, true);
  assert.equal(attempts, 1); assert.match(h.ctx.playerStatusText, /正在重试/);
  assert.equal(h.ctx.playbackControl().label, '取消重试'); assert.equal(h.ctx.pendingTrackId, 'a');
  h.ctx.handlePlaybackFailure(h.audio.error); h.flushTimer(350); await settle();
  assert.equal(attempts, 2); assert.equal(h.ctx.$('playback-recovery').hidden, false);
  assert.equal(h.ctx.retryWaiting, false); assert.equal(h.ctx.playbackControl().label, '播放');
  h.flushTimer(350); await settle(); assert.equal(attempts, 2, 'failed retry cannot retry forever');
  h.ctx.pausePlayback(); assert.equal(h.ctx.$('playback-recovery').hidden, true);

  h = harness(); h.loaded('a', 82); attempts = 0;
  h.audio.play = async () => { attempts++; throw Object.assign(Error('network'), {name: 'NetworkError'}); };
  await h.ctx.play(h.ctx.current, h.ctx.queue, true, true); h.ctx.pausePlayback();
  h.flushTimer(350); await settle(); assert.equal(attempts, 1); assert.equal(h.audio.paused, true);
  assert.equal(h.ctx.retryWaiting, false);
  h = harness(); h.loaded('a', 82); const requested = [];
  h.audio.play = async () => { requested.push(h.ctx.current.id); if(h.ctx.current.id === 'a')throw Object.assign(Error('network'), {name: 'NetworkError'}); h.audio.paused=false; };
  await h.ctx.play(h.ctx.current, h.ctx.queue, true, true);
  await h.ctx.play(h.ctx.get('b'), h.ctx.queue, false, true);
  h.flushTimer(350); await settle(); assert.deepEqual(requested, ['a', 'b']); assert.equal(h.ctx.retryWaiting, false);
  assert.equal(h.ctx.current.id, 'b');
  h = harness(); h.loaded('a', 82);
  h.audio.play = async () => { throw Object.assign(Error('network'), {name: 'NetworkError'}); };
  await h.ctx.play(h.ctx.current, h.ctx.queue, true, true); h.ctx.navigator.onLine=false;
  h.flushTimer(350); await settle(); assert.equal(h.ctx.retryWaiting, false); assert.equal(h.ctx.pendingTrackId, null);
  assert.equal(h.ctx.$('playback-recovery').hidden, false); assert.match(h.ctx.playerStatusText, /离线/);
  console.log('通过：实际播放只自动重试一次，等待期间可取消，失败/离线有恢复操作，暂停或新请求取消旧重试。');
})().catch(error => { console.error(error); process.exitCode = 1; });
