(() => {
  const $ = s => document.querySelector(s);
  const views={home:$('#homeView'),send:$('#sendView'),receive:$('#receiveView')};
  const homeBtn=$('#homeBtn');
  function show(name){Object.values(views).forEach(v=>v.classList.remove('active'));views[name].classList.add('active');homeBtn.classList.toggle('hidden',name==='home');if(name!=='receive')stopCamera();}
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>show(b.dataset.mode));homeBtn.onclick=()=>show('home');

  const crcTable=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
  function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
  const hex32=n=>n.toString(16).padStart(8,'0');
  function b64u(bytes){let s='';for(let i=0;i<bytes.length;i+=0x8000)s+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(s).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');}
  function unb64u(s){s=s.replaceAll('-','+').replaceAll('_','/');while(s.length%4)s+='=';const bin=atob(s),out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out;}
  const utf8=s=>new TextEncoder().encode(s); const deutf8=b=>new TextDecoder().decode(b);
  async function sha256(bytes){const h=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(h),b=>b.toString(16).padStart(2,'0')).join('');}
  const fmtSize=n=>n<1024?`${n} B`:n<1048576?`${(n/1024).toFixed(1)} KB`:`${(n/1048576).toFixed(2)} MB`;
  const randomId=()=>Array.from(crypto.getRandomValues(new Uint8Array(5)),b=>b.toString(16).padStart(2,'0')).join('');

  // SEND
  let selectedFile=null, frames=[], frameIndex=0, sendTimer=null, sending=false;
  const fileInput=$('#fileInput'), dropzone=$('#dropzone'), prepareBtn=$('#prepareBtn'), qrCanvas=$('#qrCanvas');
  function acceptFile(f){if(!f)return;selectedFile=f;$('#fileInfo').classList.remove('hidden');$('#fileInfo').innerHTML=`<strong>${escapeHtml(f.name)}</strong><br>${fmtSize(f.size)} · ${escapeHtml(f.type||'application/octet-stream')}`;prepareBtn.disabled=false;stopSending();}
  fileInput.onchange=e=>acceptFile(e.target.files[0]);['dragenter','dragover'].forEach(ev=>dropzone.addEventListener(ev,e=>{e.preventDefault();dropzone.classList.add('drag')}));['dragleave','drop'].forEach(ev=>dropzone.addEventListener(ev,e=>{e.preventDefault();dropzone.classList.remove('drag')}));dropzone.addEventListener('drop',e=>acceptFile(e.dataTransfer.files[0]));
  prepareBtn.onclick=async()=>{
    if(!selectedFile)return;prepareBtn.disabled=true;prepareBtn.textContent='正在读取并校验…';
    try{
      const bytes=new Uint8Array(await selectedFile.arrayBuffer());const hash=await sha256(bytes);const id=randomId();const chunkSize=Number($('#chunkSize').value);const total=Math.ceil(bytes.length/chunkSize)||1;
      const meta={name:selectedFile.name,size:selectedFile.size,type:selectedFile.type||'application/octet-stream',sha256:hash,chunkSize,total};
      const metaBytes=utf8(JSON.stringify(meta));const metaParts=[];for(let mo=0;mo<metaBytes.length;mo+=300)metaParts.push(metaBytes.slice(mo,mo+300));if(!metaParts.length)metaParts.push(new Uint8Array());const metaFrames=metaParts.map((part,mi)=>`DQR1|${id}|M|${mi}|${metaParts.length}|${hex32(crc32(part))}|${b64u(part)}`);
      frames=[];for(let i=0;i<total;i++){const chunk=bytes.slice(i*chunkSize,Math.min(bytes.length,(i+1)*chunkSize));const payload=b64u(chunk);frames.push(`DQR1|${id}|D|${i}|${total}|${hex32(crc32(chunk))}|${payload}`);}
      // Metadata is inserted periodically so receiver can start at any point.
      const sequence=[];for(let i=0;i<frames.length;i++){if(i%18===0)sequence.push(...metaFrames);sequence.push(frames[i]);}sequence.push(...metaFrames);frames=sequence;frameIndex=0;
      $('#qrPlaceholder').classList.add('hidden');qrCanvas.classList.remove('hidden');$('#frameMeta').classList.remove('hidden');$('#toggleSendBtn').classList.remove('hidden');$('#sendStatus').classList.remove('hidden');
      $('#sendStatus').textContent=`会循环发送 ${total} 个数据分片，并周期性插入元数据帧。文件 SHA-256：${hash}`;
      sending=true;$('#toggleSendBtn').textContent='暂停';renderNext();scheduleSend();
    }catch(err){alert('生成失败：'+err.message);}finally{prepareBtn.disabled=false;prepareBtn.textContent='重新生成动态二维码';}
  };
  function renderNext(){if(!frames.length)return;const payload=frames[frameIndex];FixedQR.render(payload,qrCanvas,10,4);const parts=payload.split('|'),isMeta=parts[2]==='M',seq=Number(parts[3]),total=Number(parts[4]);$('#frameMeta').textContent=isMeta?`元数据帧 · 循环 ${frameIndex+1}/${frames.length}`:`数据帧 ${seq+1}/${total} · 循环 ${frameIndex+1}/${frames.length}`;$('#sendProgress').style.width=`${isMeta?0:((seq+1)/total*100)}%`;frameIndex=(frameIndex+1)%frames.length;}
  function scheduleSend(){clearInterval(sendTimer);sendTimer=setInterval(()=>{if(sending)renderNext();},Number($('#frameInterval').value));}
  $('#frameInterval').onchange=()=>{if(sendTimer)scheduleSend();};$('#toggleSendBtn').onclick=()=>{sending=!sending;$('#toggleSendBtn').textContent=sending?'暂停':'继续';};
  function stopSending(){clearInterval(sendTimer);sendTimer=null;sending=false;frames=[];}

  // RECEIVE
  let stream=null, scanTimer=null, detector=null, sessionId=null, meta=null, chunks=new Map(), metaChunks=new Map(), metaTotal=0, good=0,bad=0,lastRaw='';
  let downloadBlob=null;
  function resetReceive(){sessionId=null;meta=null;chunks.clear();metaChunks.clear();metaTotal=0;good=0;bad=0;lastRaw='';downloadBlob=null;$('#recvName').textContent='等待元数据';$('#recvCount').textContent='0 / 0';$('#goodFrames').textContent='0';$('#badFrames').textContent='0';$('#recvProgress').style.width='0%';$('#recvStatus').textContent='等待扫码。';$('#downloadBtn').classList.add('hidden');}
  $('#resetRecvBtn').onclick=resetReceive;
  $('#startCameraBtn').onclick=startCamera;$('#stopCameraBtn').onclick=stopCamera;
  async function startCamera(){
    $('#cameraError').classList.add('hidden');
    if(!('BarcodeDetector' in window)){showCamError('当前浏览器没有 BarcodeDetector 二维码识别接口。请使用较新的 Chrome / Edge / Android Chromium 浏览器；iPhone/iPad 若当前 Safari 不支持，可尝试最新版系统浏览器。');return;}
    try{
      detector=new BarcodeDetector({formats:['qr_code']});stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false});$('#video').srcObject=stream;await $('#video').play();$('#startCameraBtn').classList.add('hidden');$('#stopCameraBtn').classList.remove('hidden');scanTimer=setInterval(scanFrame,90);
    }catch(e){showCamError(`无法启动摄像头：${e.message}。请检查摄像头权限，并尽量通过 localhost 启动本页面。`);}
  }
  function stopCamera(){clearInterval(scanTimer);scanTimer=null;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}$('#video').srcObject=null;$('#startCameraBtn').classList.remove('hidden');$('#stopCameraBtn').classList.add('hidden');}
  function showCamError(msg){$('#cameraError').textContent=msg;$('#cameraError').classList.remove('hidden');}
  async function scanFrame(){if(!detector||!stream)return;try{const codes=await detector.detect($('#video'));if(codes.length){const raw=codes[0].rawValue;if(raw&&raw!==lastRaw){lastRaw=raw;setTimeout(()=>{if(lastRaw===raw)lastRaw='';},120);await consume(raw);}}}catch(e){/* transient detector errors ignored */}}
  async function consume(raw){
    if(!raw.startsWith('DQR1|'))return;const parts=raw.split('|');if(parts.length!==7){markBad('帧格式错误');return;}const [magic,id,type,seqS,totalS,crc,payload]=parts;const seq=Number(seqS),total=Number(totalS);
    if(sessionId&&id!==sessionId){$('#recvStatus').textContent='检测到另一份文件的二维码，已忽略。若要接收它，请先清空接收状态。';return;}
    try{
      if(type==='M'){
        if(!Number.isInteger(seq)||seq<0||seq>=total||total<1){markBad('元数据帧编号非法');return;}
        const part=unb64u(payload);if(hex32(crc32(part))!==crc){markBad('元数据 CRC 校验失败');return;}
        sessionId=id;if(metaTotal&&metaTotal!==total){markBad('元数据分片总数不一致');return;}metaTotal=total;
        if(!metaChunks.has(seq)){metaChunks.set(seq,part);good++;}
        if(metaChunks.size===metaTotal){let ml=0;for(let i=0;i<metaTotal;i++)ml+=metaChunks.get(i).length;const mb=new Uint8Array(ml);let mo=0;for(let i=0;i<metaTotal;i++){const p=metaChunks.get(i);mb.set(p,mo);mo+=p.length;}const m=JSON.parse(deutf8(mb));if(!Number.isInteger(m.total)||!m.sha256||typeof m.name!=='string')throw new Error('元数据字段非法');meta=m;$('#recvStatus').textContent=`已锁定文件：${m.name}。继续保持二维码在取景框内。`;if(chunks.size===meta.total)await finishReceive();}
        updateRecv();return;
      }
      if(type!=='D'||!Number.isInteger(seq)||seq<0||seq>=total){markBad('数据帧编号非法');return;}
      const chunk=unb64u(payload);if(hex32(crc32(chunk))!==crc){markBad(`第 ${seq+1} 帧 CRC 校验失败`);return;}
      sessionId=id;if(meta&&meta.total!==total){markBad('总帧数与元数据不一致');return;}
      if(!chunks.has(seq)){chunks.set(seq,chunk);good++;updateRecv();}
      if(meta&&chunks.size===meta.total)await finishReceive();
    }catch(e){markBad(e.message||'解析失败');}
  }
  function markBad(msg){bad++;$('#badFrames').textContent=bad;$('#recvStatus').textContent='已丢弃坏帧：'+msg;}
  function updateRecv(){if(meta){$('#recvName').textContent=`${meta.name} · ${fmtSize(meta.size)}`;$('#recvCount').textContent=`${chunks.size} / ${meta.total}`;$('#recvProgress').style.width=`${chunks.size/meta.total*100}%`;}else $('#recvCount').textContent=`${chunks.size} / ?`;$('#goodFrames').textContent=good;$('#badFrames').textContent=bad;}
  async function finishReceive(){
    $('#recvStatus').textContent='分片齐全，正在执行最终 SHA-256 校验…';let len=0;for(let i=0;i<meta.total;i++){const c=chunks.get(i);if(!c)return;len+=c.length;}const all=new Uint8Array(len);let off=0;for(let i=0;i<meta.total;i++){const c=chunks.get(i);all.set(c,off);off+=c.length;}if(all.length!==meta.size){markBad(`文件长度校验失败：期望 ${meta.size}，实际 ${all.length}`);return;}const hash=await sha256(all);if(hash!==meta.sha256){markBad('最终 SHA-256 校验失败，文件不完整或数据被破坏');return;}downloadBlob=new Blob([all],{type:meta.type});$('#recvStatus').textContent=`接收完成。CRC 与 SHA-256 校验全部通过。SHA-256：${hash}`;$('#recvProgress').style.width='100%';$('#downloadBtn').classList.remove('hidden');
  }
  $('#downloadBtn').onclick=()=>{if(!downloadBlob||!meta)return;const a=document.createElement('a');a.href=URL.createObjectURL(downloadBlob);a.download=meta.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
  function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  resetReceive();
})();
