'use strict';
(() => {
  const $=id=>document.getElementById(id);
  let navigation={},settings={},toastTimer,wakeLock=null,wakeRequest=null,downloadSample=null,backgroundDownload=false,lastNotificationAt=-Infinity,reloadAfterUpdate=false;
  const theme=()=>{try{return localStorage.getItem('roylyl-music-theme')||'system';}catch{return 'system';}};
  // Dialog focus restoration must not turn a pointer click into a keyboard ring.
  document.addEventListener('pointerdown',()=>document.documentElement.removeAttribute('data-keyboard-nav'),true);
  document.addEventListener('keydown',event=>{
    if(event.key==='Tab'||event.key.startsWith('Arrow'))document.documentElement.setAttribute('data-keyboard-nav','');
  },true);
  const scrollIdleTimers=new WeakMap();
  document.addEventListener('scroll',event=>{
    const target=event.target===document?document.documentElement:event.target;
    if(!(target instanceof Element)||!target.matches('html.music-scrollbar-auto,#full-lyrics,#queue-list,#full-queue-list,#desktop-downloads-body'))return;
    target.classList.add('is-scrolling');
    clearTimeout(scrollIdleTimers.get(target));
    scrollIdleTimers.set(target,setTimeout(()=>{target.classList.remove('is-scrolling');scrollIdleTimers.delete(target);},650));
  },{capture:true,passive:true});
  document.addEventListener('scrollend',event=>{
    const target=event.target===document?document.documentElement:event.target;
    if(!scrollIdleTimers.has(target))return;
    clearTimeout(scrollIdleTimers.get(target));scrollIdleTimers.delete(target);target.classList.remove('is-scrolling');
  },{capture:true,passive:true});
  const modalStack=[],closingDialogs=new WeakSet();
  let cleaningReloadedModals=false,finishReloadedModals=null,settingsDownloadsOpen=false,settingsScroll=0,confirmAction=()=>window.RoyToolsMusicApp.settings('clearAll');
  function placeDownloadTray(){
    const tray=$('web-download-tray');
    const settingsModal=$('desktop-settings-modal'),fullPlayer=$('full-player');
    const host=settingsModal?.open?settingsModal:fullPlayer?.open?fullPlayer:document.body;
    if(tray&&tray.parentElement!==host)host.append(tray);
  }
  function setSettingsDownloads(open){
    if(window.musicMobileShell||settingsDownloadsOpen===open)return false;
    settingsDownloadsOpen=open;
    const settingsPage=$('settings-dialog'),downloadsPage=$('desktop-downloads-page');
    if(open){
      settingsScroll=settingsPage.querySelector('.settings-body').scrollTop;
      settingsPage.hidden=true;downloadsPage.hidden=false;
      window.RoyToolsMusicApp.settings('openSettingsDownloads');
      $('desktop-downloads-body').scrollTop=0;$('settings-downloads-back').focus({preventScroll:true});
    }else{
      downloadsPage.hidden=true;settingsPage.hidden=false;
      window.RoyToolsMusicApp.settings('closeSettingsDownloads');
      settingsPage.querySelector('.settings-body').scrollTop=settingsScroll;
      settingsPage.querySelector('[data-setting-action="openDownloads"]').focus({preventScroll:true});
    }
    return true;
  }
  function openDialog(dialog){
    if(dialog.open)return;
    modalStack.push({dialog,after:null});
    history.pushState({...history.state,webModal:dialog.id},'');
    dialog.showModal();
    placeDownloadTray();
  }
  function dismissDialog(dialog,after){
    const layer=modalStack.at(-1);
    if(layer?.dialog===dialog&&history.state?.webModal===dialog.id){if(layer.closing)return;layer.closing=true;layer.after=after||null;history.back();return;}
    if(dialog.open)dialog.close();if(after)after();
  }
  for(const id of ['web-options','web-download','web-confirm','desktop-settings-modal','sleep-dialog']){
    const dialog=$(id);if(!dialog)continue;
    dialog.addEventListener('cancel',event=>{event.preventDefault();dismissDialog(dialog);});
    dialog.addEventListener('close',()=>{
      placeDownloadTray();
      if($('web-toast').parentElement===dialog&&!$('web-toast').hidden){const host=[...document.querySelectorAll('dialog[open]')].at(-1)||document.body;host.append($('web-toast'));}
      if(closingDialogs.has(dialog)){closingDialogs.delete(dialog);return;}
      if(modalStack.at(-1)?.dialog===dialog)dismissDialog(dialog);
    });
  }
  window.addEventListener('popstate',event=>{
    if(cleaningReloadedModals){if(event.state?.webModal){event.stopImmediatePropagation();history.back();return;}cleaningReloadedModals=false;finishReloadedModals?.();finishReloadedModals=null;}
    let popped=false;
    while(modalStack.length&&modalStack.at(-1).dialog.id!==event.state?.webModal){
      const layer=modalStack.pop();popped=true;
      if(layer.dialog.id==='desktop-settings-modal')setSettingsDownloads(false);
      if(layer.dialog.open){closingDialogs.add(layer.dialog);layer.dialog.close();}
      if(layer.after)queueMicrotask(layer.after);
    }
    const settingsLayer=event.state?.webModal==='desktop-settings-modal';
    const forwardDialog=event.state?.webModal&&$(event.state.webModal);
    let opened=false;
    if(forwardDialog&&!forwardDialog.open){modalStack.push({dialog:forwardDialog,after:null});forwardDialog.showModal();opened=true;}
    const changed=settingsLayer&&setSettingsDownloads(event.state?.settingsPage==='downloads');
    const remainingLayer=modalStack.at(-1);
    if(remainingLayer&&remainingLayer.dialog.id===event.state?.webModal)remainingLayer.closing=false;
    placeDownloadTray();
    if(popped||changed||opened)event.stopImmediatePropagation();
  },true);
  const bytes=n=>n>=1e9?(n/1e9).toFixed(2)+'GB':(n/1e6).toFixed(1)+'MB';
  function showToast(message){clearTimeout(toastTimer);const host=[...document.querySelectorAll('dialog[open]')].at(-1)||document.body;host.append($('web-toast'));$('web-toast').textContent=message;$('web-toast').hidden=false;toastTimer=setTimeout(()=>$('web-toast').hidden=true,3200);}
  function syncWakeLock(){
    const shouldLock=navigation.fullPlayerOpen&&$('keep-screen-on').checked&&!document.hidden;
    if(!shouldLock){wakeLock?.release().catch(()=>{});wakeLock=null;return;}
    if(!wakeLock&&!wakeRequest&&navigator.wakeLock)wakeRequest=navigator.wakeLock.request('screen').then(lock=>{if(!navigation.fullPlayerOpen||!$('keep-screen-on').checked||document.hidden){lock.release();return;}wakeLock=lock;lock.addEventListener('release',()=>{if(wakeLock===lock)wakeLock=null;});}).catch(()=>{}).finally(()=>{wakeRequest=null;});
  }
  function drawDownload(batch){
    if(!batch||batch.status==='idle')return;
    placeDownloadTray();
    const partial=batch.currentTotalBytesKnown&&batch.currentTotalBytes>0?Math.min(.99,batch.currentBytes/batch.currentTotalBytes):0;
    const percent=batch.total?Math.min(100,(batch.processed+partial)/batch.total*100):0;
    const now=performance.now();
    if(!downloadSample||downloadSample.id!==batch.id){downloadSample={id:batch.id,at:now,bytes:batch.downloadedBytes||0,speed:0};lastNotificationAt=-Infinity;}
    if(now-downloadSample.at>=500){downloadSample.speed=Math.max(0,((batch.downloadedBytes||0)-downloadSample.bytes)/((now-downloadSample.at)/1000));downloadSample.at=now;downloadSample.bytes=batch.downloadedBytes||0;}
    $('web-download-title').textContent=batch.scope||'音乐下载';
    const stateText={completed:'下载完成',cancelled:'下载已取消',error:'下载失败',budget:'已达到缓存上限',cancelling:'正在取消'}[batch.status];
    $('web-download-current').textContent=stateText?stateText+(batch.current?' · '+batch.current:''):batch.current||'正在准备下载…';
    $('web-download-progress').value=percent;
    $('web-download-detail').textContent=`${batch.processed}/${batch.total} · ${Math.floor(percent)}% · ${bytes(batch.downloadedBytes||0)} · ${(downloadSample.speed/1e6).toFixed(2)}MB/s${batch.reason?' · '+batch.reason:''}`;
    $('web-download-cancel').disabled=!batch.active||batch.status==='cancelling';
    $('web-download-background').textContent=batch.active?'后台下载':'完成';
    $('web-download-tray').textContent=batch.active?`下载中 ${Math.floor(percent)}%`:'下载任务已结束';
    $('web-download-tray').hidden=!batch.active||$('web-download').open;
    if(backgroundDownload&&'Notification' in window&&Notification.permission==='granted'&&(!batch.active||now-lastNotificationAt>=60000)){
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
    openModal(id){if(id==='sleep-dialog')openDialog($(id));},
    closeModal(id){if(id==='sleep-dialog')dismissDialog($(id));},
    ready(){
      const restored=history.state?.webModal?new Promise(resolve=>{finishReloadedModals=resolve;cleaningReloadedModals=true;history.back();}):null;
      if(!window.musicMobileShell){
        const modal=$('desktop-settings-modal');$('settings-dialog').hidden=false;
        $('close-settings').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>';
        $('close-settings').onclick=()=>dismissDialog(modal);
        document.querySelectorAll('[data-open-settings]').forEach(button=>button.onclick=()=>{openDialog(modal);window.RoyToolsMusicApp.settings('sync');});
        $('settings-downloads-back').onclick=()=>history.back();
        modal.addEventListener('close',()=>setSettingsDownloads(false));
      }
      for(const [id,title] of [['clear-audio-cache','清理音乐缓存'],['clear-lyric-cache','清理歌词缓存'],['clear-cover-cache','清理专辑封面缓存']]){
        const button=$(id),action=button.onclick;
        button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();confirmAction=()=>action();$('web-confirm-title').textContent=title+'？';$('web-confirm').querySelector('p').textContent='清理已保存的内容，下次播放或浏览时会重新获取。';openDialog($('web-confirm'));},true);
      }
      return restored;
    },
    watchUpdate(registration){
      const ready=()=>{$('apply-update').hidden=!registration.waiting;if(registration.waiting)$('web-update-status').textContent='新版界面已就绪，可刷新更新。';};
      ready();registration.addEventListener('updatefound',()=>registration.installing?.addEventListener('statechange',ready));
    },
    finishUpdate(){
      let stored=false;try{stored=!!sessionStorage.getItem('roylyl-music-update');sessionStorage.removeItem('roylyl-music-update');}catch{}
      if(reloadAfterUpdate||stored)location.reload();
    },
    haptic(){},
    showMusicDownload(){backgroundDownload=false;openDialog($('web-download'));drawDownload(settings.downloadBatch);},
    onNavigationState(payload){
      navigation=JSON.parse(payload);$('web-title').textContent=navigation.title;
      $('web-back').hidden=!navigation.secondary;
      document.body.classList.toggle('web-player-open',navigation.fullPlayerOpen);
      document.documentElement.classList.toggle('music-scrollbar-auto',!['home','playlists','settings','player'].includes(navigation.pageKey));
      placeDownloadTray();
      syncWakeLock();
    },
    onPlaybackState(){},
    onSettingsState(payload){
      settings=JSON.parse(payload);
      for(const id of ['audio-budget','web-theme']){
        const select=$(id),button=select.nextElementSibling;
        if(button?.classList.contains('roytools-select-trigger')){button.textContent=select.selectedOptions[0]?.textContent||'';button.setAttribute('aria-label',(id==='audio-budget'?'缓存上限：':'主题：')+button.textContent);}
      }
      $('web-catalog-status').textContent=`曲库版本：${settings.catalogVersion||'—'}${settings.catalogStatus?' · '+settings.catalogStatus:''}`;
      for(const button of document.querySelectorAll('[data-setting-action]'))button.disabled=settings.allBusy||(button.dataset.settingAction==='checkCatalog'?settings.catalogChecking:!settings.available);
      drawDownload(settings.downloadBatch);
    },
    chooseOption(payload){
      const {id,options,selected}=JSON.parse(payload),dialog=$('web-options');
      $('web-options-title').textContent=({artist:'歌手','sort-primary':'第一顺序','sort-secondary':'第二顺序','sort-direction':'方向','audio-budget':'缓存上限','web-theme':'主题'})[id.replace(/^downloads-/,'')];
      $('web-option-list').replaceChildren(...options.map(option=>{
        const button=document.createElement('button');button.className='web-option';button.type='button';button.setAttribute('role','radio');button.setAttribute('aria-checked',String(option.value===selected));
        const text=document.createElement('span');text.textContent=option.label;const radio=document.createElement('span');radio.className='web-radio';radio.setAttribute('aria-hidden','true');button.append(text,radio);
        button.onclick=()=>dismissDialog(dialog,()=>{if(['audio-budget','web-theme'].includes(id)){$(id).value=option.value;$(id).dispatchEvent(new Event('change',{bubbles:true}));}else window.RoyToolsMusicApp.chooseOption(id,option.value);});return button;
      }));
      openDialog(dialog);
    }
  };
  $('web-home').onclick=()=>window.RoyToolsMusicApp.goHome();
  $('web-back').onclick=()=>{const overlay=modalStack.at(-1)?.dialog;if(overlay)dismissDialog(overlay);else window.RoyToolsMusicApp.handleBack();};
  $('web-theme').value=theme();
  $('web-theme').onchange=()=>{try{localStorage.setItem('roylyl-music-theme',$('web-theme').value);}catch{}window.RoyToolsMusicApp.setTheme($('web-theme').value);};
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(theme()==='system')window.RoyToolsMusicApp?.setTheme('system');});
  try{$('keep-screen-on').checked=localStorage.getItem('roylyl-music-keep-screen-on')!=='false';}catch{}
  $('keep-screen-on').onchange=()=>{try{localStorage.setItem('roylyl-music-keep-screen-on',String($('keep-screen-on').checked));}catch{}syncWakeLock();};
  document.addEventListener('visibilitychange',syncWakeLock);
  document.querySelectorAll('[data-setting-action]').forEach(button=>button.onclick=()=>{
    if(button.dataset.settingAction==='clearAll'){confirmAction=()=>window.RoyToolsMusicApp.settings('clearAll');$('web-confirm-title').textContent='删除所有下载与缓存？';$('web-confirm').querySelector('p').textContent='已保存的音频、歌词和封面将被删除，曲库和歌单会保留。';openDialog($('web-confirm'));return;}
    if(button.dataset.settingAction==='downloadAll'&&settings.downloadBatch?.active){window.RoyToolsWebHost.showMusicDownload();return;}
    if(button.dataset.settingAction==='openDownloads'&&!window.musicMobileShell){
      if(!settingsDownloadsOpen){history.pushState({...history.state,settingsPage:'downloads'},'');setSettingsDownloads(true);}return;
    }
    window.RoyToolsMusicApp.settings(button.dataset.settingAction);
  });
  $('web-confirm-delete').onclick=()=>dismissDialog($('web-confirm'),confirmAction);
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.onclick=()=>dismissDialog(button.closest('dialog')));
  $('web-download-cancel').onclick=()=>window.RoyToolsMusicApp.settings('cancelDownload');
  $('web-download-background').onclick=()=>{
    backgroundDownload=!!settings.downloadBatch?.active;
    if(backgroundDownload&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission().then(()=>drawDownload(settings.downloadBatch)).catch(()=>{});
    dismissDialog($('web-download'),()=>drawDownload(settings.downloadBatch));
  };
  $('web-download-tray').onclick=()=>window.RoyToolsWebHost.showMusicDownload();
  $('web-download').addEventListener('close',()=>drawDownload(settings.downloadBatch));
  for(const id of ['audio-budget','web-theme']){
    const select=$(id),button=document.createElement('button');button.type='button';button.className='roytools-select-trigger';button.setAttribute('aria-haspopup','dialog');
    const sync=()=>{button.textContent=select.selectedOptions[0]?.textContent||'';button.setAttribute('aria-label',(id==='audio-budget'?'缓存上限：':'主题：')+button.textContent);};
    button.onclick=()=>window.RoyToolsWebHost.chooseOption(JSON.stringify({id,options:[...select.options].map(option=>({value:option.value,label:option.textContent})),selected:select.value}));
    select.after(button);select.hidden=true;select.addEventListener('change',sync);sync();
  }
  let installPrompt=null;
  const installed=()=>matchMedia('(display-mode: standalone)').matches||!!navigator.standalone;
  $('install-help').textContent=installed()?'已安装到主屏幕。':/iPad|iPhone|iPod/.test(navigator.userAgent)?'在Safari中选择“分享→添加到主屏幕”。':'在浏览器菜单中选择“安装应用”或“添加到主屏幕”。';
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;$('install-app').hidden=false;});
  window.addEventListener('appinstalled',()=>{installPrompt=null;$('install-app').hidden=true;$('install-help').textContent='已安装到主屏幕。';});
  $('install-app').onclick=async()=>{if(!installPrompt)return;const prompt=installPrompt;installPrompt=null;$('install-app').hidden=true;await prompt.prompt();};
  $('check-web-update').onclick=async()=>{
    const button=$('check-web-update');button.disabled=true;$('web-update-status').textContent='正在检查界面更新…';
    try{const registration=await navigator.serviceWorker?.getRegistration('./');if(!registration)throw Error();await registration.update();window.RoyToolsWebHost.watchUpdate(registration);$('web-update-status').textContent=registration.waiting?'新版界面已就绪，可刷新更新。':registration.installing?'正在准备新版界面…':'当前已是最新界面。';}
    catch{$('web-update-status').textContent='无法检查界面更新，请联网后重试。';}finally{button.disabled=false;}
  };
  $('apply-update').onclick=async()=>{
    if(settings.downloadBatch?.active){showToast('请先完成或取消下载，再刷新更新');return;}
    const registration=await navigator.serviceWorker?.getRegistration('./');
    if(!registration?.waiting){location.reload();return;}
    reloadAfterUpdate=true;try{sessionStorage.setItem('roylyl-music-update','1');}catch{}
    registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});
  };
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modalStack.at(-1)?.dialog.open)event.stopImmediatePropagation();},true);
})();
