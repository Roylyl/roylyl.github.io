#!/usr/bin/env python3
"""Import a user-authorized complete recording and update both catalogues."""
import argparse,json,re,subprocess,urllib.request
from pathlib import Path
from io import BytesIO
from datetime import date
from mutagen import File
from mutagen.mp3 import MP3
from mutagen.id3 import TIT2,TPE1,TPE2,TALB,TRCK,TPOS,TDRC,APIC
from PIL import Image
import imageio_ffmpeg
from types import SimpleNamespace
SITE=Path(__file__).resolve().parents[1]
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def safe(s):
    return s.translate(str.maketrans({'/':'／','\\':'／',':':'：','*':'＊','?':'？','"':'＂','<':'＜','>':'＞','|':'｜'})).strip()
def source_info(path):
    parsed=File(path)
    if parsed is not None and parsed.info.length>0:return parsed.info
    result=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-i',str(path)],capture_output=True,text=True)
    output=result.stderr
    duration=re.search(r'Duration: (\d+):(\d+):([\d.]+)',output)
    if parsed is not None and duration:
        length=int(duration[1])*3600+int(duration[2])*60+float(duration[3])
        return SimpleNamespace(length=length,codec=getattr(parsed.info,'codec',type(parsed.info).__name__),sample_rate=parsed.info.sample_rate,channels=parsed.info.channels,bitrate=parsed.info.bitrate)
    audio=re.search(r'Audio: ([\w_]+).*?, (\d+) Hz, (mono|stereo)',output)
    bitrate=re.search(r'Duration:.*?bitrate: (\d+) kb/s',output)
    if not duration or not audio:raise ValueError(f'Unable to read audio properties: {path}')
    length=int(duration[1])*3600+int(duration[2])*60+float(duration[3])
    return SimpleNamespace(length=length,codec=audio[1],sample_rate=int(audio[2]),channels=1 if audio[3]=='mono' else 2,bitrate=int(bitrate[1])*1000 if bitrate else 0)
def main():
    ap=argparse.ArgumentParser();ap.add_argument('apple_id');ap.add_argument('source',type=Path);ap.add_argument('--repo',type=Path,default=SITE.parents[1]/'Music');ap.add_argument('--source-url',required=True);ap.add_argument('--allow-duration-mismatch',action='store_true');args=ap.parse_args()
    data=json.loads((SITE/'data/apple-music.json').read_text());e=data['entries'][args.apple_id];repo=args.repo
    before=source_info(args.source)
    if abs(before.length-e['duration'])>3 and not args.allow_duration_mismatch:raise ValueError('Recording duration does not match catalogue; review version first')
    album_title=re.sub(r' - (EP|Single)$','',e['album']);album_path=Path('artists')/safe(e['artist'])/f"{e['year']} - {safe(album_title)}";folder=repo/album_path;folder.mkdir(parents=True,exist_ok=True)
    cover=folder/'cover.jpg'
    if not cover.exists():
        artwork=e['artworkUrl'].replace('/100x100bb.jpg','/1200x1200bb.jpg')
        with urllib.request.urlopen(artwork,timeout=30) as response:im=Image.open(BytesIO(response.read())).convert('RGB')
        im.save(cover,quality=95);im.thumbnail((640,640));im.save(folder/'cover.webp',quality=86)
    elif not (folder/'cover.webp').exists():
        with Image.open(cover) as im:
            im.thumbnail((640,640));im.convert('RGB').save(folder/'cover.webp',quality=86)
    dest=folder/f"{e['discNumber']:02}-{e['trackNumber']:02} - {safe(e['title'])}.mp3"
    if dest.exists():raise FileExistsError(dest)
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-nostdin','-i',str(args.source),'-map','0:a:0','-map_metadata','-1','-map_chapters','-1','-c:a','libmp3lame','-b:a','320k','-ar','44100',str(dest)],check=True)
    audio=MP3(dest)
    if audio.tags is None:audio.add_tags()
    audio.tags.clear()
    for cls,val in [(TIT2,e['title']),(TPE1,e['artist']),(TPE2,e['artist']),(TALB,album_title),(TRCK,e['trackNumber']),(TPOS,e['discNumber']),(TDRC,e['year'])]:audio.tags.add(cls(encoding=3,text=str(val)))
    with Image.open(cover) as im:
        im.thumbnail((900,900));buf=BytesIO();im.save(buf,format='JPEG',quality=90)
    audio.tags.add(APIC(encoding=3,mime='image/jpeg',type=3,desc='Front cover',data=buf.getvalue()));audio.save(v2_version=3,v1=0)
    audio=MP3(dest);info=audio.info
    assert abs(info.length-before.length)<0.2 and audio.tags.getall('APIC')
    prop={'codec':'MP3','sampleRate':info.sample_rate,'bitDepth':None,'channels':info.channels,'duration':round(info.length,3),'fileSize':dest.stat().st_size,'bitRate':info.bitrate}
    sourcecodec=str(getattr(before,'codec',type(before).__name__))
    sourceprop={'codec':sourcecodec,'sampleRate':before.sample_rate,'channels':before.channels,'duration':round(before.length,3),'bitRate':before.bitrate,'fileSize':args.source.stat().st_size}
    lossless=any(token in sourcecodec.lower() for token in ('flac','alac','pcm','wave','aiff')) or args.source.suffix.lower() in ('.flac','.wav','.aiff','.aif')
    tid='apple-'+args.apple_id.lower();rel=str(dest.relative_to(repo))
    track={'id':tid,'artist':e['artist'],'album':album_title,'title':e['title'],'discNumber':e['discNumber'],'trackNumber':e['trackNumber'],'sequenceNumber':e['trackNumber'],'duration':prop['duration'],'sourceStatus':'available','sourceUrl':args.source_url,'format':'MP3','localPath':rel,'audioProperties':prop,'sourceAudioProperties':sourceprop,'transcodedFromLossy':not lossless,'suspected_transcode':False,'rightsStatus':'personal-copy; redistribution-unverified','redistributionAllowed':False,'notes':'MP3输出为320kbps；原始音源参数单独记录，转码未提升音质。'}
    library=json.loads((repo/'library.json').read_text());album=next((a for a in library['albums'] if a['path']==str(album_path)),None)
    if album is None:
        album={'id':'apple-album-'+args.apple_id.lower(),'artist':e['artist'],'title':album_title,'releaseDate':str(e['year']),'releaseDatePrecision':'year','year':e['year'],'type':'ep' if e['album'].endswith(' - EP') else 'studio','path':str(album_path),'cover':'cover.jpg','coverWeb':'cover.webp','tracklistCompleteness':'partial','tracks':[]};library['albums'].append(album)
    album['tracks'].append(track);album['tracks'].sort(key=lambda t:(t['discNumber'],t['trackNumber']));write(folder/'album.json',album);library['updatedAt']=str(date.today());write(repo/'library.json',library)
    playable={'id':tid,'title':e['title'],'name':e['title'],'artist':e['artist'],'album':album_title,'trackNumber':e['trackNumber'],'discNumber':e['discNumber'],'duration':prop['duration'],'src':rel,'url':rel,'cover':str(album_path/'cover.webp'),'format':'MP3','sourceStatus':'available','sourceUrl':args.source_url,'rightsStatus':track['rightsStatus'],'redistributionAllowed':False}
    for path in (repo/'tracks.json',SITE/'data/tracks.json'):
        tracks=json.loads(path.read_text());tracks.append(playable);write(path,tracks)
    props_path=SITE/'data/audio-properties.json';props=json.loads(props_path.read_text());props[tid]={'src':rel,**prop,'sourceAudioProperties':sourceprop};write(props_path,props)
    mismatch=abs(before.length-e['duration'])
    e.update(trackId=tid,sourceStatus='available',sourceUrl=args.source_url,album=album_title,sourceNote=f"完整音频已入库；源文件{sourceprop['codec']}约{round(sourceprop['bitRate']/1000)}kbps，实测{before.length:.3f}秒，与Apple时长差{mismatch:.3f}秒；输出MP3 320kbps，不代表音质提升。")
    write(SITE/'data/apple-music.json',data);write(repo/'playlists.json',data)
    print(json.dumps({'path':rel,'properties':prop,'sourceProperties':sourceprop},ensure_ascii=False))
if __name__=='__main__':main()
