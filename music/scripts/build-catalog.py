#!/usr/bin/env python3
"""Package matching catalog data and stat-based audio revisions for one release."""
import json
import hashlib
import os
from pathlib import Path
from datetime import datetime, timezone
SITE=Path(__file__).resolve().parents[1]

def apply_resource_revisions(track, previous, repo):
    """Use local files when available; never carry a revision onto a new path."""
    old = previous if previous.get('src') == track['src'] else {}
    audio = repo / track['src']
    if audio.is_file():
        st = audio.stat()
        track['audioRevision'] = f'{st.st_mtime_ns}-{st.st_size}'
    else:
        track['audioRevision'] = old.get('audioRevision', 'initial')

    lyric = audio.with_suffix('.lrc')
    if lyric.is_file():
        track['lyricRevision'] = hashlib.sha256(lyric.read_bytes()).hexdigest()[:16]
    elif audio.is_file():
        # The local album is available and its lyric was removed. Keeping its old
        # immutable key would let a cached lyric survive the catalog update.
        track.pop('lyricRevision', None)
    elif old.get('lyricRevision'):
        # A checkout without music assets can still package known revisions.
        track['lyricRevision'] = old['lyricRevision']
    else:
        track.pop('lyricRevision', None)

def build():
    data=SITE/'data'
    tracks=json.loads((data/'tracks.json').read_text())
    props=json.loads((data/'audio-properties.json').read_text())
    apple=json.loads((data/'apple-music.json').read_text())
    previous=json.loads((data/'catalog.json').read_text()) if (data/'catalog.json').exists() else {}
    old={t['id']:t for t in previous.get('tracks',[])}
    candidates=[Path(os.environ['ROYLYL_MUSIC_REPO'])] if os.environ.get('ROYLYL_MUSIC_REPO') else [SITE.parent.parent/'Music',Path.home()/'Documents/GitHub/Music']
    repo=next((candidate for candidate in candidates if (candidate/'tracks.json').is_file()),candidates[0])
    for t in tracks:
        apply_resource_revisions(t, old.get(t['id'], {}), repo)
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
