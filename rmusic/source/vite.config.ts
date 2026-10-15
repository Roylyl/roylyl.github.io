import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import fs from 'node:fs';
import { commandPinyinPlugin } from './dev/pinyin/commandPinyinPlugin.mjs';
import { icuFoliaDataPlugin } from './dev/icuFolia/icuFoliaDataPlugin.mjs';
import { createLucideChunkSelector } from './dev/lucideChunks.mjs';

const siteRoot=path.resolve(import.meta.dirname,'../..');
const lucideChunk = createLucideChunkSelector(path.resolve(import.meta.dirname, 'src'));
const startupModules = new Set<string>();
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
    {
      name: 'r-music-startup-chunks',
      buildEnd() {
        startupModules.clear();
        const visit = (id: string) => {
          if (startupModules.has(id)) return;
          startupModules.add(id);
          this.getModuleInfo(id)?.importedIds.forEach(visit);
        };
        // bootstrap is imported after the storage scope and Buffer are installed.
        // Follow its static imports without pulling deferred dialogs into startup.
        for (const id of this.getModuleIds()) {
          if (id.endsWith('/src/bootstrap.tsx')) visit(id);
        }
      },
    },
    VitePWA({
      registerType: 'prompt', includeAssets: ['icon.svg', 'favicon.ico', 'icons/*.png', 'share-cover.png'], scope: '/rmusic/',
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
        globIgnores: ['**/optional-icons-*.js'],
        navigateFallback: '/rmusic/index.html', navigateFallbackDenylist: [/^\/music\//,/^\/rmusic\/source\//,/^\/rmusic\/share\//],
        runtimeCaching: [{urlPattern: ({url}) => url.pathname === '/music/data/catalog.json', handler: 'NetworkFirst',
          options: {cacheName:'r-music-catalog-v1',networkTimeoutSeconds:6}},
          {urlPattern: ({url, sameOrigin}) => sameOrigin && /^\/rmusic\/assets\/optional-icons-[^/]+\.js$/.test(url.pathname), handler: 'CacheFirst',
            options: {cacheName:'r-music-optional-icons-v1', expiration: {maxEntries: 3}}}]
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
  build: {outDir:'.build',emptyOutDir:true,rolldownOptions:{
    preserveEntrySignatures: false,
    output:{strictExecutionOrder: true,codeSplitting:{includeDependenciesRecursively:false,groups:[
      {name:'preload',test:id=>id.includes('preload-helper'),priority:40},
      {name:'icons',test:id=>lucideChunk(id)==='icons',priority:30},
      {name:'three',test:/node_modules\/three\//,priority:20},
      {name:'optional-icons',test:id=>lucideChunk(id)==='optional-icons',priority:10},
      // Group modules already needed at startup; keep deferred features outside.
      {name:'app-core',test:id=>startupModules.has(id) && !lucideChunk(id) && !id.includes('preload-helper') && !id.includes('/node_modules/three/'),maxSize:550_000,priority:1},
    ]}}
  }}
});
