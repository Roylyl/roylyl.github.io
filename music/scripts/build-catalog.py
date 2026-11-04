#!/usr/bin/env python3
"""Compatibility entry point; Music owns catalog generation and versioning."""
import json
import hashlib
import os
import shutil
import subprocess
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
    candidates = [Path(os.environ['ROYLYL_MUSIC_REPO'])] if os.environ.get('ROYLYL_MUSIC_REPO') else [SITE.parent.parent/'Music', Path.home()/'Documents/GitHub/Music']
    repo = next((candidate for candidate in candidates if (candidate/'scripts/publish-catalog.mjs').is_file()), None)
    if repo is None:
        raise FileNotFoundError('请将Music仓库放在网站仓库旁，或设置ROYLYL_MUSIC_REPO')
    subprocess.run(['node', str(repo/'scripts/publish-catalog.mjs')], cwd=repo, check=True)
    shutil.copyfile(repo/'catalog.json', SITE/'data/catalog.json')
    catalog = json.loads((repo/'catalog.json').read_text(encoding='utf-8'))
    print(f"已同步备用目录：版本{catalog['version']}，{len(catalog['tracks'])}首；发布曲库时只需更新Music仓库")

if __name__=='__main__':build()
