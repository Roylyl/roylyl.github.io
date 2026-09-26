#!/usr/bin/env python3
"""Import a Music.app XML export. Requires opencc-python-reimplemented.
Raw XML stays outside the repository: contains account/local file metadata.
"""
import argparse,json,plistlib,re,unicodedata
from pathlib import Path
from datetime import datetime,timezone
from opencc import OpenCC
cc=OpenCC('t2s')
def norm(s):
    return re.sub(r'[^\w]', '', cc.convert(unicodedata.normalize('NFKC',s)).lower())
def base(s): return norm(re.split(r'[（(]| - (?=20\d\d)',s)[0])
ALIASES={'Li Zhi':'李志','Eason Chan':'陳奕迅','Paul Wong':'黃貫中','Kimberley Chen':'陳芳語','Denise Ho':'何韻詩','Lo Ta-You':'羅大佑'}
ALBUMS={'Goomusic Collection 2004-2008':'Goomusic Collection 2004-2008'}
def artist(s): return norm(ALIASES.get(s,s))
def main():
    ap=argparse.ArgumentParser();ap.add_argument('xml',type=Path);ap.add_argument('--site',type=Path,default=Path(__file__).resolve().parents[1]);args=ap.parse_args()
    doc=plistlib.loads(args.xml.read_bytes()); library=doc['Tracks']; catalog=json.loads((args.site/'data/tracks.json').read_text()); entries={};matches=[]
    for t in library.values():
        aid=t['Persistent ID']; title=t['Name']; al=t.get('Album',''); ar=t.get('Artist',''); dur=t.get('Total Time',0)/1000
        candidates=[x for x in catalog if norm(x['album'])==norm(ALBUMS.get(al,al)) and (artist(x['artist'])==artist(ar) or (ar.startswith('Li Zhi,') and x['artist']=='李志')) and base(x['title'])==base({'Snow in June':'六月飛霜'}.get(title,title))]
        exact=[x for x in candidates if norm(x['title'])==norm(title)]
        if exact:candidates=exact
        # Version identity is constrained by album, not just the song title.
        match=candidates[0] if len(candidates)==1 else None
        if match and abs(match['duration']-dur)>20: match=None
        entries[aid]={'appleId':aid,'title':title,'artist':ar,'album':al,'duration':dur,'year':t.get('Year',0),'trackNumber':t.get('Track Number',0),'discNumber':t.get('Disc Number',1),'trackId':match['id'] if match else None,'sourceStatus':'available' if match else 'missing','sourceUrl':'','musicVideo':bool(t.get('Music Video'))}
        if match: matches.append({'appleTitle':title,'appleAlbum':al,'trackId':match['id'],'durationDifference':round(match['duration']-dur,2)})
    playlists=[]
    for name,slug,display in [('鹿','deer','鹿'),('mq','shenzhen','我🩷深圳')]:
        p=next(p for p in doc['Playlists'] if p['Name']==name)
        ids=[library[str(i['Track ID'])]['Persistent ID'] for i in p['Playlist Items']]
        playlists.append({'id':slug,'name':display,'sourceName':name,'sourceId':p['Playlist Persistent ID'],'entries':ids})
    favorites=[t['Persistent ID'] for t in library.values() if (t.get('Loved') or t.get('Favorited')) and not t.get('Music Video')]
    used=set(favorites)
    for p in playlists:used.update(p['entries'])
    out={'schemaVersion':1,'source':'Apple Music XML export','updatedAt':datetime.fromtimestamp(args.xml.stat().st_mtime,timezone.utc).isoformat(),'syncMode':'export-snapshot','playlists':playlists,'favorites':favorites,'entries':{k:v for k,v in entries.items() if k in used}}
    oldpath=args.site/'data/apple-music.json'
    if oldpath.exists():
        old=json.loads(oldpath.read_text()).get('entries',{})
        for aid,e in out['entries'].items():
            previous=old.get(aid,{})
            if not e['trackId'] and all(e[k]==previous.get(k) for k in ['title','artist','album']):
                for k in ['sourceStatus','sourceUrl','sourceNote','artworkUrl']:
                    if k in previous:e[k]=previous[k]
    (args.site/'data/apple-music.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
    (args.site/'reports/apple-music-matches.json').write_text(json.dumps(matches,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'playlists':[(p['name'],len(p['entries'])) for p in playlists],'favorites':len(favorites),'unique':len(used),'matched':sum(bool(entries[i]['trackId']) for i in used)},ensure_ascii=False))
if __name__=='__main__': main()
