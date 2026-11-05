'use strict';
(() => {
  const $=id=>document.getElementById(id);
  let navigation={},settings={},toastTimer,wakeLock=null,downloadSample=null,backgroundDownload=false,lastNotificationAt=0;
  const theme=()=>{try{return localStorage.getItem('roylyl-music-theme')||'system';}catch{return 'system';}};
  let overlayHistory=null,overlayBaseState=null;
  function openDialog(dialog){
    if(dialog.open)return;
    if(overlayHistory?.open)return;
    overlayHistory=dialog;overlayBaseState=history.state;
    dialog.showModal();
  }
  window.addEventListener('popstate',event=>{
    if(overlayHistory?.open){
      const dialog=overlayHistory;overlayHistory=null;closeDialog(dialog);
      history.pushState(overlayBaseState,'');event.stopImmediatePropagation();
    }
  },true);
  const bytes=n=>n>=1e9?(n/1e9).toFixed(2)+'GB':(n/1e6).toFixed(1)+'MB';
  function showToast(message){clearTimeout(toastTimer);$('web-toast').textContent=message;$('web-toast').hidden=false;toastTimer=setTimeout(()=>$('web-toast').hidden=true,3200);}
  function syncWakeLock(){
    const shouldLock=navigation.fullPlayerOpen&&$('keep-screen-on').checked&&!document.hidden;
    if(!shouldLock){wakeLock?.release().catch(()=>{});wakeLock=null;return;}
    if(!wakeLock&&navigator.wakeLock)navigator.wakeLock.request('screen').then(lock=>{if(!navigation.fullPlayerOpen||!$('keep-screen-on').checked||document.hidden){lock.release();return;}wakeLock=lock;lock.addEventListener('release',()=>{if(wakeLock===lock)wakeLock=null;});}).catch(()=>{});
  }
  function closeDialog(dialog){if(dialog.open)dialog.close();}
  function drawDownload(batch){
    if(!batch||batch.status==='idle')return;
    const partial=batch.currentTotalBytesKnown&&batch.currentTotalBytes>0?Math.min(.99,batch.currentBytes/batch.currentTotalBytes):0;
    const percent=batch.total?Math.min(100,(batch.processed+partial)/batch.total*100):0;
    const now=performance.now();
    if(!downloadSample||downloadSample.id!==batch.id)downloadSample={id:batch.id,at:now,bytes:batch.downloadedBytes||0,speed:0};
    if(now-downloadSample.at>=500){downloadSample.speed=Math.max(0,((batch.downloadedBytes||0)-downloadSample.bytes)/((now-downloadSample.at)/1000));downloadSample.at=now;downloadSample.bytes=batch.downloadedBytes||0;}
    $('web-download-title').textContent=batch.scope||'音乐下载';
    $('web-download-current').textContent=batch.current||({completed:'下载完成',cancelled:'下载已取消',error:'下载失败',budget:'已达到缓存上限',cancelling:'正在取消'}[batch.status]||'正在准备下载…');
    $('web-download-progress').value=percent;
    $('web-download-detail').textContent=`${batch.processed}/${batch.total} · ${Math.floor(percent)}% · ${bytes(batch.downloadedBytes||0)} · ${(downloadSample.speed/1e6).toFixed(2)}MB/s${batch.reason?' · '+batch.reason:''}`;
    $('web-download-cancel').disabled=!batch.active||batch.status==='cancelling';
    $('web-download-background').textContent=batch.active?'后台下载':'完成';
    $('web-download-tray').textContent=batch.active?`下载中 ${Math.floor(percent)}%`:'下载任务已结束';
    $('web-download-tray').hidden=!batch.active||$('web-download').open;
    if(backgroundDownload&&'Notification' in window&&Notification.permission==='granted'&&(!batch.active||now-lastNotificationAt>1500)){
      lastNotificationAt=now;
      navigator.serviceWorker.ready.then(registration=>registration.showNotification(batch.active?'音乐下载 · '+Math.floor(percent)+'%':'音乐下载已结束',{
        body:$('web-download-current').textContent+'\n'+$('web-download-detail').textContent,
        tag:'roylyl-music-download',icon:'./icons/icon-192.png',silent:true,
        data:{id:batch.id},actions:batch.active?[{action:'cancel-download',title:'取消下载'}]:[]
      })).catch(()=>{});
      if(!batch.active)backgroundDownload=false;
    }
  }
  window.RoyToolsWebHost={
    getTheme:theme,showToast,
    haptic(){},
    showMusicDownload(){backgroundDownload=false;openDialog($('web-download'));drawDownload(settings.downloadBatch);},
    onNavigationState(payload){
      navigation=JSON.parse(payload);$('web-title').textContent=navigation.title;
      $('web-back').hidden=!navigation.secondary;
      document.body.classList.toggle('web-player-open',navigation.fullPlayerOpen);
      syncWakeLock();
    },
    onPlaybackState(){},
    onSettingsState(payload){
      settings=JSON.parse(payload);
      $('web-catalog-status').textContent=`曲库版本：${settings.catalogVersion||'—'}${settings.catalogStatus?' · '+settings.catalogStatus:''}`;
      for(const button of document.querySelectorAll('[data-setting-action]'))button.disabled=settings.allBusy||(button.dataset.settingAction==='checkCatalog'?settings.catalogChecking:!settings.available);
      drawDownload(settings.downloadBatch);
    },
    chooseOption(payload){
      const {id,options,selected}=JSON.parse(payload),dialog=$('web-options');
      $('web-options-title').textContent=({artist:'歌手','sort-primary':'第一顺序','sort-secondary':'第二顺序','sort-direction':'方向'})[id];
      $('web-option-list').replaceChildren(...options.map(option=>{
        const button=document.createElement('button');button.className='web-option';button.type='button';button.setAttribute('role','radio');button.setAttribute('aria-checked',String(option.value===selected));
        const text=document.createElement('span');text.textContent=option.label;const radio=document.createElement('span');radio.className='web-radio';radio.setAttribute('aria-hidden','true');button.append(text,radio);
        button.onclick=()=>{window.RoyToolsMusicApp.chooseOption(id,option.value);dialog.close();};return button;
      }));
      openDialog(dialog);
    }
  };
  $('web-home').onclick=()=>window.RoyToolsMusicApp.goHome();
  $('web-back').onclick=()=>{const overlay=document.querySelector('#web-options[open],#web-download[open],#web-confirm[open]');if(overlay)overlay.close();else window.RoyToolsMusicApp.handleBack();};
  $('web-theme').value=theme();
  $('web-theme').onchange=()=>{try{localStorage.setItem('roylyl-music-theme',$('web-theme').value);}catch{}window.RoyToolsMusicApp.setTheme($('web-theme').value);};
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(theme()==='system')window.RoyToolsMusicApp?.setTheme('system');});
  try{$('keep-screen-on').checked=localStorage.getItem('roylyl-music-keep-screen-on')!=='false';}catch{}
  $('keep-screen-on').onchange=()=>{try{localStorage.setItem('roylyl-music-keep-screen-on',String($('keep-screen-on').checked));}catch{}syncWakeLock();};
  document.addEventListener('visibilitychange',syncWakeLock);
  document.querySelectorAll('[data-setting-action]').forEach(button=>button.onclick=()=>{
    if(button.dataset.settingAction==='clearAll'){openDialog($('web-confirm'));return;}
    if(button.dataset.settingAction==='downloadAll'&&settings.downloadBatch?.active){window.RoyToolsWebHost.showMusicDownload();return;}
    window.RoyToolsMusicApp.settings(button.dataset.settingAction);
  });
  $('web-confirm-delete').onclick=()=>{$('web-confirm').close();window.RoyToolsMusicApp.settings('clearAll');};
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.onclick=()=>button.closest('dialog').close());
  $('web-download-cancel').onclick=()=>window.RoyToolsMusicApp.settings('cancelDownload');
  $('web-download-background').onclick=()=>{
    backgroundDownload=!!settings.downloadBatch?.active;
    if(backgroundDownload&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission().then(()=>drawDownload(settings.downloadBatch)).catch(()=>{});
    $('web-download').close();drawDownload(settings.downloadBatch);
  };
  $('web-download-tray').onclick=()=>window.RoyToolsWebHost.showMusicDownload();
  $('web-download').addEventListener('close',()=>drawDownload(settings.downloadBatch));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('web-options').open)event.stopImmediatePropagation();},true);
})();
