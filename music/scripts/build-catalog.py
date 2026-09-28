#!/usr/bin/env python3
"""Package matching catalog data and stat-based audio revisions for one release."""
import json
from pathlib import Path
from datetime import datetime, timezone
SITE=Path(__file__).resolve().parents[1]
def build():
    data=SITE/'data'
    tracks=json.loads((data/'tracks.json').read_text())
    props=json.loads((data/'audio-properties.json').read_text())
    apple=json.loads((data/'apple-music.json').read_text())
    previous=json.loads((data/'catalog.json').read_text()) if (data/'catalog.json').exists() else {}
    old={t['id']:t for t in previous.get('tracks',[])}
    repo=SITE.parent.parent/'Music'
    for t in tracks:
        audio=repo/t['src']
        if audio.is_file():
            st=audio.stat();t['audioRevision']=f'{st.st_mtime_ns}-{st.st_size}'
        else:t['audioRevision']=old.get(t['id'],{}).get('audioRevision','initial')
    releases=json.loads((data/'album-releases.json').read_text())
    for t in tracks:
        release=next((r for r in releases if r['artist']==t['src'].split('/')[1] and r['album']==t['album']),None)
        if release:t['albumYear']=release['year']
    ids={t['id'] for t in tracks}
    for entry in apple['entries'].values():
        if entry.get('trackId') and entry['trackId'] not in ids:raise ValueError('歌单引用曲库中不存在的歌曲：'+entry['trackId'])
    payload={'version':datetime.now(timezone.utc).isoformat(),'tracks':tracks,'audioProperties':props,'appleMusic':apple}
    (data/'catalog.json').write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':'))+'\n')
    print(f'已生成统一目录：{len(tracks)}首')
if __name__=='__main__':build()
