#!/usr/bin/env python3
"""Write a portable playlist manifest and sourcing report to the audio repository."""
import argparse,json,shutil
from pathlib import Path
from collections import Counter
from import_apple_music import artist,norm
ap=argparse.ArgumentParser();ap.add_argument('music_repository',type=Path);args=ap.parse_args()
site=Path(__file__).resolve().parents[1]; path=site/'data/apple-music.json';d=json.loads(path.read_text()); searches=json.loads((site/'reports/source-search.json').read_text())
# Recheck catalog matches against performer identity as well as title and album.
for e in d['entries'].values():
    if not e['trackId'] and e.get('sourceUrl'):
        results=searches.get(e['artist']+' | '+e['album'],{}).get('results',[])
        matches=[t for t in results if t['trackViewUrl']==e['sourceUrl']]
        if matches and artist(matches[0]['artistName'])!=artist(e['artist']):
            e['sourceStatus']='missing';e['sourceUrl']='';e.pop('artworkUrl',None);e['sourceNote']='搜索结果艺人名不同，需要人工确认'
# Independently inspected primary sources.
for e in d['entries'].values():
    if not e['trackId'] and e['artist']=='五条人' and e['album']=='广东姑娘':
        e.update(sourceStatus='purchasable',sourceUrl='https://badhead1.bandcamp.com/album/canton-girl',sourceNote='发行厂牌Bandcamp：整张7美元起，16bit/48kHz；未购买，未下载')
    if not e['trackId'] and e['artist']=='赞诗' and e['album']=='跳金水 - EP':
        e.update(sourceStatus='streaming-only',sourceUrl='https://music.apple.com/us/album/1817376115',sourceNote='Apple Music专辑页已核对曲目；尚无独立音频')
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
counts=[]
for p in d['playlists']+[{'name':'我喜欢',
'entries':d['favorites']}]:
    total=len(p['entries']);ready=sum(bool(d['entries'][i]['trackId']) for i in p['entries']);counts.append((p['name'],total,ready,total-ready))
lines=['# Apple Music歌单导入结果',
'',
'来源：Music.app导出的资料库XML。保留两个原歌单的全部条目及导出曲序。“mq”只在网页上改为“我🩷深圳”。',
'',
'|歌单|总曲目|已匹配音源|待补音源|',
'|---|---:|---:|---:|']
lines+=['|'+ '|'.join(map(str,c))+'|' for c in counts]
status=Counter(e['sourceStatus'] for e in d['entries'].values())
lines+=['',
'## 核对结果',
'',f'- 歌单与喜欢列表合计涉及{len(d["entries"])}首独立曲目；已匹配{status["available"]}首。',f'- 检索了{len(searches)}组艺人/专辑目录，查询地址和结果保存在网站仓库的`music/reports/source-search.json`。',f'- 来源状态：'+ '，'.join(f'{k}={v}' for k,v in status.items())+'。',
'- 本轮新增完整音频文件：0。现有可播放曲目连接原音频仓库；购买入口和流媒体入口不表示已经取得MP3。',
'- 已导出的Apple Music音频下载带有播放保护，未作为网页音源复制。',
'- “我喜欢”163首，与Music.app显示数量一致；排除已标记喜欢的1支音乐视频。成员完全来自Apple Music，排列采用资料库导出顺序。',
'- 本次为快照更新，不是实时同步。重新导出XML并运行导入脚本即可更新；没有后台同步服务。',
'- 两个固定歌单原始曲目数及顺序均保留。未匹配音源仍显示，播放时跳过。',
'- 全部MP3资源路径沿用仓库相对路径；原始XML含本地路径，仅保存在仓库外。',
'',
'## 待补曲目',
'',
'|艺人|曲名|专辑|状态|来源|',
'|---|---|---|---|---|']
def cell(s):return str(s).replace('|',
'／').replace('\n',
' ')
for e in d['entries'].values():
    if not e['trackId']:lines.append('|'+ '|'.join(cell(e.get(k,'')) for k in ['artist',
'title',
'album',
'sourceStatus',
'sourceUrl'])+'|')
report='\n'.join(lines)+'\n';(site/'reports/apple-music-import.md').write_text(report)
repo=args.music_repository
assert (repo/'tracks.json').exists(), 'Not the audio repository'
shutil.copyfile(path,repo/'playlists.json');(repo/'reports').mkdir(exist_ok=True);(repo/'reports/apple-music-import.md').write_text(report)
print(json.dumps({'playlists':counts,'status':dict(status)},ensure_ascii=False))
