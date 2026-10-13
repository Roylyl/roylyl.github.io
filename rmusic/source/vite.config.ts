import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import fs from 'node:fs';
import { commandPinyinPlugin } from './dev/pinyin/commandPinyinPlugin.mjs';
import { icuFoliaDataPlugin } from './dev/icuFolia/icuFoliaDataPlugin.mjs';

const siteRoot=path.resolve(import.meta.dirname,'../..');
export default defineConfig({
  base: '/rmusic/',
  plugins: [
    {name:'r-music-library-preview',configureServer(server) {
      server.middlewares.use((req,res,next)=>{
        const pathname=new URL(req.url||'/', 'http://localhost').pathname;
        if(pathname!=='/music/data/catalog.json'&&!pathname.startsWith('/music/share-covers/'))return next();
        try {
          const file=path.resolve(siteRoot,'.'+decodeURIComponent(pathname));
          if(!file.startsWith(siteRoot+path.sep)||!fs.existsSync(file)){res.statusCode=404;res.end();return;}
          res.setHeader('Content-Type',file.endsWith('.json')?'application/json; charset=utf-8':'image/jpeg');
          fs.createReadStream(file).pipe(res);
        }catch{res.statusCode=400;res.end();}
      });
    }},
    commandPinyinPlugin(), icuFoliaDataPlugin(), react(),
    VitePWA({
      registerType: 'autoUpdate', includeAssets: ['icon.svg', 'favicon.ico', 'icons/*.png', 'share-cover.png'], scope: '/rmusic/',
      manifest: {
        id: '/rmusic/', name: 'R music', short_name: 'R music', description: '个人音乐库与沉浸式歌词播放器',
        start_url: '/rmusic/', scope: '/rmusic/', theme_color: '#0c171d', background_color: '#09090b', display: 'standalone',
        icons: [
          {src:'icons/icon-192.png', sizes:'192x192', type:'image/png', purpose:'any'},
          {src:'icons/icon-512.png', sizes:'512x512', type:'image/png', purpose:'any'},
          {src:'icons/icon-maskable-512.png', sizes:'512x512', type:'image/png', purpose:'maskable'},
          {src:'icon.svg', sizes:'any', type:'image/svg+xml', purpose:'any'}
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 12_000_000,
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/],
        globPatterns: ['index.html','assets/**/*.{js,css,svg,woff2}','icon.svg'],
        navigateFallback: '/rmusic/index.html', navigateFallbackDenylist: [/^\/music\//,/^\/rmusic\/source\//,/^\/rmusic\/share\//],
        runtimeCaching: [{urlPattern: ({url}) => url.pathname === '/music/data/catalog.json', handler: 'NetworkFirst',
          options: {cacheName:'r-music-catalog-v1',networkTimeoutSeconds:6}}]
      }
    })
  ],
  define: {
    __COMMIT_HASH__: JSON.stringify('R music 1.0.0'), __GIT_BRANCH__: JSON.stringify('local'),
    __BUILD_REPO__: JSON.stringify('Roylyl/roylyl.github.io'), __BUILD_COMMIT__: JSON.stringify(''),
    __BUILD_KIND__: JSON.stringify('rmusic'), __BUILD_HOST__: JSON.stringify('GitHub Pages'),
    __APP_VERSION__: JSON.stringify('1.0.0'), __APP_VERSION_LABEL__: JSON.stringify('R music 1.0.0'),
    __APP_RELEASE_CHANNEL__: JSON.stringify('stable'), __DOCKER_STACK_VERSION__: JSON.stringify('')
  },
  resolve: {alias:{'@':path.resolve(import.meta.dirname,'src')}}, worker:{format:'es'},
  server: {fs:{allow:[siteRoot]}},
  build: {outDir:'.build',emptyOutDir:true,rollupOptions:{output:{manualChunks(id) {
    if(id.includes('/node_modules/three/'))return 'three';
    if(id.includes('/node_modules/lucide-react/'))return 'icons';
  }}}}
});
