'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {harness}=require('./playback-session.cjs');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
(async()=>{
  const h=harness(),live=new Set();let created=0,peak=0;
  Object.assign(h.ctx,{prepareToken:0,prepareJob:null});
  h.ctx.URL.revokeObjectURL=url=>{assert(live.delete(url),'每个拥有的音频URL只释放一次');};
  vm.runInContext(source.split('\n').find(line=>line.startsWith('  function releasePrepared()')),h.ctx);
  h.loaded('a');
  for(let i=0;i<400;i++){
    const next=h.ctx.tracks[(i+1)%4],url='blob:audio-'+(++created);
    live.add(url);peak=Math.max(peak,live.size);h.ctx.preparedAudio.set(h.ctx.audioSource(next),url);
    await h.ctx.play(next,h.ctx.queue,false,true);
    assert.equal(live.size,1,'连续切歌后仅持有正在播放的音频URL');assert.equal(h.ctx.preparedAudio.size,0);
    assert(h.ctx.playbackHistory.length<=200,'长时间播放历史有上限');
  }
  assert.equal(peak,2);assert.equal(created,400);
  h.ctx.releasePrepared();assert.equal(live.size,1,'清理预加载不能撤销当前音频');
  h.ctx.audioDownloadProgress=new Map();
  vm.runInContext(source.slice(source.indexOf('  function rememberAudioProgress('),source.indexOf('  async function cacheAudio(')),h.ctx);
  const playing=h.ctx.audioSource(h.ctx.current);h.ctx.rememberAudioProgress(playing,.75);
  for(let i=0;i<2000;i++)h.ctx.rememberAudioProgress('old-'+i,1);
  assert.equal(h.ctx.audioDownloadProgress.size,128);assert.equal(h.ctx.audioDownloadProgress.get(playing),.75);
  console.log('通过：400次切歌仅保留当前音频URL、切换峰值2份、播放历史上限200；2000条进度事件上限128且保留当前曲目。');
})().catch(error=>{console.error(error);process.exitCode=1;});
