#!/usr/bin/env python3
"""Look up downloadable purchases and streaming catalog sources; never treat previews as full tracks."""
import json,time,urllib.request,urllib.parse
from pathlib import Path
from import_apple_music import norm,artist
site=Path(__file__).resolve().parents[1]; path=site/'data/apple-music.json'; data=json.loads(path.read_text()); cachepath=site/'reports/source-search.json'
cache=json.loads(cachepath.read_text()) if cachepath.exists() else {}
groups={}
for e in data['entries'].values():
    if not e['trackId']: groups.setdefault((e['artist'],e['album']),[]).append(e)
for i,((ar,album),entries) in enumerate(groups.items()):
    key=ar+' | '+album
    if key not in cache:
        query=urllib.parse.urlencode({'term':ar+' '+album,'entity':'song','country':'in','limit':200})
        url='https://itunes.apple.com/search?'+query
        try:
            with urllib.request.urlopen(url,timeout=20) as r: results=json.load(r)['results']
            cache[key]={'queryUrl':url,'results':[{k:t.get(k) for k in ['trackName','artistName','collectionName','trackNumber','discNumber','trackTimeMillis','trackViewUrl','artworkUrl100','trackPrice','currency']} for t in results]}
        except Exception as ex:cache[key]={'queryUrl':url,'error':str(ex),'results':[]}
        cachepath.write_text(json.dumps(cache,ensure_ascii=False,indent=2)+'\n');time.sleep(3.2)
    for e in entries:
        matches=[t for t in cache[key]['results'] if norm(t.get('collectionName') or '')==norm(album) and norm(t.get('trackName') or '')==norm(e['title']) and abs((t.get('trackTimeMillis') or 0)/1000-e['duration'])<15]
        if len(matches)==1:
            t=matches[0];e['sourceUrl']=t['trackViewUrl'];e['sourceStatus']='purchasable' if (t.get('trackPrice') or 0)>0 else 'streaming-only';e['artworkUrl']=t['artworkUrl100'];e['sourceNote']='目录匹配；完整音频尚未获取'
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    print(f'{i+1}/{len(groups)} {key}',flush=True)
print('located',sum(bool(e['sourceUrl']) for e in data['entries'].values()),flush=True)
