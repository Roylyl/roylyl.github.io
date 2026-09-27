#!/usr/bin/env python3
"""Use the same Apple catalog IDs in the Hong Kong storefront for display names."""
import json,time,urllib.request,urllib.parse
from pathlib import Path
SITE=Path(__file__).resolve().parents[1]
DATA=SITE/'data/apple-music.json'
CACHE=SITE/'reports/apple-localized-catalog.json'
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
    data=json.loads(DATA.read_text());cache=json.loads(CACHE.read_text()) if CACHE.exists() else {}
    tracks={t['id']:t for t in json.loads((SITE/'data/tracks.json').read_text())}
    ids={}
    for aid,e in data['entries'].items():
        e.setdefault('appleOriginal',{k:e[k] for k in ('title','artist','album')})
        query=urllib.parse.parse_qs(urllib.parse.urlparse(e.get('sourceUrl','')).query)
        if query.get('i'):ids[aid]=query['i'][0]
    missing=sorted(set(ids.values())-set(cache))
    for start in range(0,len(missing),40):
        batch=missing[start:start+40]
        url='https://itunes.apple.com/lookup?'+urllib.parse.urlencode({'id':','.join(batch),'country':'hk','lang':'zh_hk','limit':200})
        with urllib.request.urlopen(url,timeout=30) as response:rows=json.load(response)['results']
        for row in rows:
            if row.get('kind')=='song':
                cache[str(row['trackId'])]={k:row.get(k) for k in ('trackId','artistId','trackName','artistName','collectionName','trackTimeMillis','trackViewUrl','releaseDate','trackNumber','discNumber','artworkUrl100')}
        write(CACHE,cache);print('catalog',start+len(batch),'/',len(missing),flush=True)
        time.sleep(3)
    aliases={};changed=[]
    for aid,e in data['entries'].items():
        row=cache.get(ids.get(aid,''));t=tracks.get(e.get('trackId'))
        if row and abs(row['trackTimeMillis']/1000-e['duration'])<15:
            names={'title':row['trackName'],'artist':row['artistName'],'album':row['collectionName']}
            e['localizedMetadataSource']=row['trackViewUrl']
        elif t:
            names={k:t[k] for k in ('title','artist','album')}
            e['localizedMetadataSource']='library:'+t['id']
        else:continue
        aliases[e['appleOriginal']['artist']]=names['artist']
        if any(e[k]!=v for k,v in names.items()):changed.append(aid)
        e.update(names)
    for e in data['entries'].values():
        old=e['appleOriginal']['artist']
        if not e.get('localizedMetadataSource') and old in aliases:
            e['artist']=aliases[old]
            e['localizedArtistSource']='same Apple Music artist in verified entries'
    write(DATA,data)
    write(SITE/'reports/apple-localization.json',{'method':'same catalog ID in Hong Kong storefront or matched local release; original names retained','changedEntries':changed,'unresolved':[e['appleId'] for e in data['entries'].values() if not e.get('localizedMetadataSource')]})
    print('localized',len(changed),'unresolved',sum(not e.get('localizedMetadataSource') for e in data['entries'].values()))
if __name__=='__main__':main()
