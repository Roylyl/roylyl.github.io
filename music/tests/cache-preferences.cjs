'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const code=source.slice(source.indexOf('  const legacyBudgets='),source.indexOf('  function workerMessage('));
function preferences(values={},blocked=false){
  const nodes={},context={$:id=>nodes[id]||(nodes[id]={}),localStorage:{getItem(key){if(blocked)throw Error('Storage unavailable');return values[key]??null;}}};
  vm.createContext(context);vm.runInContext(code+'\nglobalThis.api={audioBudget,preloadAllowed,formatBytes};',context);
  return {api:context.api,nodes};
}
let result=preferences();
assert.equal(result.api.audioBudget(),-1);assert.equal(result.api.preloadAllowed(),true);
assert.equal(result.nodes['audio-budget'].value,'-1');assert.equal(result.nodes['preload-next'].checked,true);
for(const budget of [-1,0,256000000,512000000,1e9,2e9,4e9,8e9]){
  const {api,nodes}=preferences({'roylyl-music-audio-budget':String(budget),'roylyl-music-preload':'false'});
  assert.equal(api.audioBudget(),budget);assert.equal(nodes['audio-budget'].value,String(budget));assert.equal(api.preloadAllowed(),false);
}
for(const [old,current] of [[268435456,256000000],[536870912,512000000],[1073741824,1e9],[2147483648,2e9]]){
  assert.equal(preferences({'roylyl-music-audio-budget':String(old)}).api.audioBudget(),current);
}
assert.equal(preferences({'roylyl-music-audio-budget':'invalid'}).api.audioBudget(),-1);
result=preferences({},true);assert.equal(result.api.audioBudget(),-1);assert.equal(result.api.preloadAllowed(),true);
for(const [bytes,text] of [[0,'0MB'],[10233642,'10.2MB'],[256e6,'256.0MB'],[1e9,'1.0GB'],[4e9,'4.0GB'],[8e9,'8.0GB']])assert.equal(result.api.formatBytes(bytes),text);
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
for(const [value,label] of [[4e9,'4GB'],[8e9,'8GB'],[-1,'无限']])assert.match(html,new RegExp(`<option value="${value}"(?: selected)?>${label}</option>`));
assert(!/MiB|GiB|KiB/.test(html+source),'Visible capacity units must use decimal MB/GB');
console.log('通过：默认无限/开启预加载、保存设置保留、旧档位迁移、4GB/8GB、存储不可用降级及十进制容量显示。');
