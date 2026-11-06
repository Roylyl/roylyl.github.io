'use strict';
(async()=>{
 const mode=window.musicMobileShell?'mobile':'desktop';
 document.documentElement.classList.add(mode+'-shell');
 const fragment=document.getElementById(mode+'-shell').content.cloneNode(true);
 document.body.replaceChildren(fragment);
 const navigationButtons=[...document.querySelectorAll('[data-open-settings],[data-music-page],button.nav-item')];
 for(const button of navigationButtons)button.disabled=true;
 const scripts=['image-loading.js?v=20261104-1','lyric-parser.js?v=20261106-web-98','playback-feedback.js?v=20261106-web-98','catalog-sync.js?v=20261106-web-98','share-pages.js?v=20261106-web-98','web-host.js?v=20261106-web-98','app.js?v=20261106-web-98'];
 for(const source of scripts)await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='./'+source;script.onload=resolve;script.onerror=reject;document.body.append(script);});
 await window.RoyToolsWebHost?.ready();
 for(const button of navigationButtons)button.disabled=false;
})().catch(()=>{const text=document.createElement('p');text.setAttribute('role','alert');text.textContent='播放器加载失败，请刷新页面重试。';document.body.append(text);});
