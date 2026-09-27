#!/usr/bin/env python3
"""Download matching public music releases, retaining the original audio stream.
No account cookies, protected formats, transcoding, or repository imports.
"""
import argparse,json,re,threading,unicodedata,itertools,os,shutil
from pypinyin import pinyin,Style
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
from yt_dlp import YoutubeDL
from opencc import OpenCC
CC=OpenCC('t2s');LOCK=threading.Lock();STOP=threading.Event();MATCHER_VERSION=2
OVERRIDES={'8AF40B65081C8670':{'title':'十八'},'8D836E6533E0801C':{'title':'荒謬'},'1681DA2AAAF8D219':{'title':'我記得','album':'驚喜'},'CC9F0F045DB47414':{'artist':'蛙池','album':'蛙池 2020-2021'}}
NODE=os.environ.get('MUSIC_NODE') or shutil.which('node')
def norm(s):
    s=CC.convert(unicodedata.normalize('NFKC',str(s or ''))).lower()
    s=re.sub(r' - (ep|single)$','',s)
    s=re.sub(r'[（(][^()（）]*(电影|剧集|主题曲|片尾曲)[^()（）]*[）)]','',s)
    return re.sub(r'[^\w]','',s)
def phonetic(s):
    groups=pinyin(norm(s),style=Style.NORMAL,heteronym=True,errors=lambda x:[x])
    return {''.join(parts).lower() for parts in itertools.islice(itertools.product(*groups),128)}
def names(e,key):return {norm(e.get(key)),norm(e.get('appleOriginal',{}).get(key))}-{''}
def artist_names(e):
    out=names(e,'artist')
    for s in (e['artist'],e.get('appleOriginal',{}).get('artist','')):
        out.update(norm(x.strip()) for x in re.split(r'\s*&\s*|,\s*',s))
    extra={'回春丹':'回春丹乐队','棱镜':'棱镜乐队','梅卡德尔':'梅卡德尔乐队','wachi':'蛙池'}
    out.update(norm(v) for k,v in extra.items() if norm(k) in out)
    return out-{''}
class Logger:
    def debug(self,msg):pass
    def warning(self,msg):pass
    def error(self,msg):pass
OPTIONS={'quiet':True,'no_warnings':True,'logger':Logger(),'socket_timeout':20,'retries':1,'fragment_retries':1,'noplaylist':True}
if NODE:OPTIONS['js_runtimes']={'node':{'path':NODE}}
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def run(entry,stage):
    aid=entry['appleId'];record=stage/'youtube'/f'{aid}.json';record.parent.mkdir(parents=True,exist_ok=True)
    cached=json.loads(record.read_text()) if record.exists() else {}
    if cached.get('status')=='downloaded' or cached.get('matcherVersion')==MATCHER_VERSION:return cached
    if STOP.is_set() or 'confirm you’re not a bot' in cached.get('error',''):
        return cached or {'appleId':aid,'status':'blocked','reason':'YouTube requested interactive verification'}
    entry={**entry,**OVERRIDES.get(aid,{})}
    result={'appleId':aid,'title':entry['title'],'artist':entry['artist'],'album':entry['album'],'status':'unresolved','candidates':[],'matcherVersion':MATCHER_VERSION}
    target_titles=names(entry,'title');target_artists=artist_names(entry);target_albums=names(entry,'album');target_phonetic=set().union(*(phonetic(x) for x in target_titles))
    try:
        query=entry['artist']+' '+entry['title']
        if cached.get('candidates') and aid not in OVERRIDES:
            search={'entries':cached['candidates']}
        else:
            with YoutubeDL({**OPTIONS,'extract_flat':True,'skip_download':True}) as y:
                search=y.extract_info('ytsearch7:'+query,download=False)
        candidates=[]
        for c in search.get('entries',[]):
            if not c:continue
            summary={k:c.get(k) for k in ('id','title','channel','duration','url')};result['candidates'].append(summary)
            if not c.get('duration') or abs(c['duration']-entry['duration'])>3:continue
            channel=re.sub(r' - Topic$','',c.get('channel') or '')
            channel_aliases=target_artists|{a+b for a in target_artists for b in target_artists if a!=b}
            if norm(channel) not in channel_aliases:continue
            candidates.append(c)
        verified=[]
        for c in candidates[:3]:
            with YoutubeDL({**OPTIONS,'skip_download':True}) as y:info=y.extract_info(c['url'],download=False)
            if abs(info.get('duration',0)-entry['duration'])>3:continue
            source_title=norm(info.get('track') or info['title'])
            title_exact=source_title in target_titles
            title_phonetic=source_title in target_phonetic
            if not title_exact and not title_phonetic:
                result.setdefault('reviewMetadata',[]).append({k:info.get(k) for k in ('id','title','track','artists','album','release_year','duration','webpage_url')});continue
            source_artists={norm(v.strip()) for a in info.get('artists',[]) for v in re.split(r'\s*&\s*|[,、]\s*',a)}
            if not source_artists.intersection(target_artists):continue
            album_match=norm(info.get('album')) in target_albums
            if title_phonetic and not title_exact and not album_match and info.get('release_year')!=entry.get('year'):continue
            edition=re.search(r'live|现场|演唱会|remaster|\b20\d{2} version',entry['album']+' '+entry.get('appleOriginal',{}).get('title',''),re.I)
            if edition and not album_match:continue
            verified.append((album_match,info))
        verified.sort(key=lambda x:x[0],reverse=True)
        if verified:
            album_match,info=verified[0];folder=stage/'youtube'/'audio';folder.mkdir(exist_ok=True)
            opts={**OPTIONS,'format':('140/bestaudio' if 'HTTP Error 403' in cached.get('error','') else 'bestaudio[acodec=opus]/bestaudio'),'outtmpl':str(folder/(aid+'.%(ext)s')),'postprocessors':[]}
            with YoutubeDL(opts) as y:download=y.extract_info(info['webpage_url'],download=True);raw=Path(y.prepare_filename(download))
            if not raw.exists() or raw.stat().st_size<100000:raise RuntimeError('Audio file was not saved')
            result.update(status='downloaded',rawFile=str(raw.relative_to(stage)),sourceUrl=info['webpage_url'],sourceAlbumMatches=album_match,sourceMetadata={k:info.get(k) for k in ('title','track','artists','album','release_year','duration','channel','channel_url','description')},audioProperties={k:download.get(k) for k in ('ext','acodec','asr','abr','audio_channels','duration','format_id')},fileSize=raw.stat().st_size)
    except Exception as ex:
        result.update(status='error',error=str(ex))
        if 'not a bot' in str(ex) or 'Sign in to confirm' in str(ex):STOP.set()
    write(record,result)
    with LOCK:print(json.dumps({k:result.get(k) for k in ('appleId','title','status','rawFile','error')},ensure_ascii=False),flush=True)
    return result
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',type=Path,default=Path('/Users/roylyl/Documents/Music-download-staging'));ap.add_argument('--limit',type=int);ap.add_argument('--workers',type=int,default=2);args=ap.parse_args()
    site=Path(__file__).resolve().parents[1];data=json.loads((site/'data/apple-music.json').read_text());existing=set()
    if (args.stage/'downloads.tsv').exists():existing={line.split('\t')[0] for line in (args.stage/'downloads.tsv').read_text().splitlines()}
    entries=[e for e in data['entries'].values() if not e.get('trackId') and e['appleId'] not in existing]
    if args.limit:entries=entries[:args.limit]
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        results=list(pool.map(lambda e:run(e,args.stage),entries))
    write(args.stage/'youtube-results.json',results)
    print('finished',len(results),'downloaded',sum(r['status']=='downloaded' for r in results),flush=True)
