"""Audit static song cards against the catalog. --live checks the deployed site too."""
import json
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import quote, unquote, urlsplit

SITE = Path(__file__).resolve().parents[1]
ROOT = 'https://roylyl.github.io/music/'
MEDIA = 'https://raw.githubusercontent.com/Roylyl/Music/main/'
UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0'


def fetch(url, image=False):
    args = ['curl', '--fail', '--silent', '--show-error', '--location', '--max-time', '20', '-A', UA]
    if image:
        args += ['--range', '0-31']
    return subprocess.run(args + [url], check=True, capture_output=True).stdout


class Card(HTMLParser):
    def __init__(self):
        super().__init__()
        self.fields = {}
        self.images = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta':
            self.fields.setdefault(a.get('property', a.get('name')), []).append(a.get('content'))
        if tag == 'link':
            self.fields.setdefault(a.get('rel'), []).append(a.get('href'))
        if tag == 'img':
            self.images.append(a.get('src'))


def check(track, html):
    card = Card()
    card.feed(html)
    url = ROOT + 'share/' + quote(track['id'], safe='') + '.html'
    title = track['title'] + '－' + track['artist']
    description = '｜'.join((track['artist'], track['album'], 'Roylyl Music'))
    image, = card.fields['og:image']
    if not image.startswith(MEDIA):
        raise ValueError('封面不在曲库中')
    cover = PurePosixPath(unquote(urlsplit(image[len(MEDIA):]).path))
    if cover.with_suffix('') != PurePosixPath(track['cover']).with_suffix(''):
        raise ValueError(f'封面与曲库不符 {cover}')
    for field, expected in [('og:title', title), ('twitter:title', title), ('og:description', description), ('og:url', url), ('canonical', url), ('twitter:image', image), ('image_src', image)]:
        if card.fields.get(field) != [expected]:
            raise ValueError(f'{field}不符 {card.fields.get(field)}')
    if card.images[:1] != [image]:
        raise ValueError('首图与分享封面不符')
    return image


def audit(live):
    repo = Path(os.environ.get('ROYLYL_MUSIC_REPO', SITE.parents[1] / 'Music'))
    catalog = fetch(MEDIA + 'catalog.json') if live else (repo / 'catalog.json').read_bytes()
    tracks = json.loads(catalog)['tracks']
    ids = {t['id'] for t in tracks}
    index = fetch(ROOT + 'share-pages.js').decode() if live else (SITE / 'share-pages.js').read_text(encoding='utf-8')
    indexed = set(json.loads(index.split('new Set(', 1)[1].split(');', 1)[0]))
    if ids != indexed or (not live and ids != {p.stem for p in (SITE / 'share').glob('*.html')}):
        raise ValueError(f'曲库与分享索引或页面集合不一致，缺少{list(ids-indexed)[:5]}，多出{list(indexed-ids)[:5]}')

    def page(track):
        name = track['id'] + '.html'
        raw = fetch(ROOT + 'share/' + quote(name, safe='')) if live else (SITE / 'share' / name).read_bytes()
        return check(track, raw.decode('utf-8'))

    def image(url):
        if live:
            data = fetch(url, True)
        else:
            with (repo / unquote(url[len(MEDIA):])).open('rb') as f:
                data = f.read(32)
        if not (data.startswith((b'\xff\xd8\xff', b'\x89PNG\r\n\x1a\n')) or data[:4] == b'RIFF' and data[8:12] == b'WEBP'):
            raise ValueError('响应不是封面图片')

    def run(fn, items):
        def verify(item):
            for attempt in range(2 if live else 1):
                try:
                    return fn(item), None
                except Exception as exc:
                    error = exc
                    if live and attempt == 0:
                        time.sleep(.4)
            return None, (item['id'] if isinstance(item, dict) else item, str(error))
        with ThreadPoolExecutor(max_workers=12) as pool:
            results = list(pool.map(verify, items))
        errors = [err for _, err in results if err]
        for err in errors:
            print(*err, file=sys.stderr)
        return [value for value, err in results if not err], len(errors)

    images, page_errors = run(page, tracks)
    print(f'{len(images)}/{len(tracks)} pages OK', flush=True)
    unique = set(images)
    _, image_errors = run(image, unique)
    print(f'{len(unique)-image_errors}/{len(unique)} covers OK', flush=True)
    return page_errors + image_errors


if __name__ == '__main__':
    sys.exit(bool(audit('--live' in sys.argv)))
