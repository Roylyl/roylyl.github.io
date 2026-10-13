import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, readdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateSharePages} from './generate-share-pages.mjs';

const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const result=spawnSync(process.execPath,[path.join(source,'node_modules/vite/bin/vite.js'),'build'],{cwd:source,stdio:'inherit'});
if(result.status!==0)process.exit(result.status??1);
const output=path.join(source,'.build'),destination=path.dirname(source);
if(!existsSync(path.join(output,'index.html')))throw Error('R music build did not produce index.html');
// Only generated resources belong to this deployment step. The complete source,
// notices and tests remain next to the static application.
rmSync(path.join(destination,'assets'),{recursive:true,force:true});
for(const name of readdirSync(destination))if(/^workbox-.*\.js$/.test(name))rmSync(path.join(destination,name));
for(const name of readdirSync(output))cpSync(path.join(output,name),path.join(destination,name),{recursive:true});
await generateSharePages();
console.log('R music static application saved to '+destination);
