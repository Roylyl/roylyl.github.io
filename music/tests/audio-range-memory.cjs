'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../audio-worker.js'),'utf8');
const ctx={Response,Headers,ReadableStream,validSize:r=>Number(r.headers.get('Content-Length'))};
vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('async function cachedRange('),source.indexOf('async function storeFull(')),ctx);
const timeout=setTimeout(()=>{console.error('range test timed out');process.exit(1);},5000);
(async()=>{
  let read=0,cancelled=0;
  const stream=()=>new Response(new ReadableStream({pull(c){read++;c.enqueue(new Uint8Array(1024).fill(7));},cancel(){cancelled++;}}),{headers:{'Content-Length':String(1024*1024*256)}});
  const response=stream();response.blob=()=>{throw Error('must not materialize the whole audio');};
  const part=await ctx.cachedRange(response,'bytes=2048-3071');assert.equal(part.status,206);assert.equal((await part.arrayBuffer()).byteLength,1024);
  await new Promise(r=>setImmediate(r));assert(read<=5,'small range must not drain a 256MB song');assert.equal(cancelled,1);
  const head=await ctx.cachedRange(stream(),'bytes=0-1','HEAD');assert.equal(await head.text(),'');assert.equal(head.headers.get('Content-Length'),'2');
  for(const [range,body,status] of [['bytes=2-5','2345',206],['bytes=-3','789',206],['bytes=7-','789',206],['bytes=10-','',416],['bytes=0-1,4-5','0123456789',200]]){
    const result=await ctx.cachedRange(new Response('0123456789',{headers:{'Content-Length':'10'}}),range);
    assert.equal(result.status,status);assert.equal(await result.text(),body);
  }
  const truncated=await ctx.cachedRange(new Response('123',{headers:{'Content-Length':'10'}}),'bytes=0-9');await assert.rejects(truncated.text(),/Incomplete/);
  const stopped=await ctx.cachedRange(stream(),'bytes=0-10000');await stopped.body.cancel();assert(cancelled>=3);
  console.log('通过：256MB音频的小范围只读取少量块、取消释放、HEAD、后缀范围、越界及截断检测。');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>clearTimeout(timeout));
