#!/usr/bin/env python3
"""Build per-song share pages and public JPEG covers from the local Music checkout."""

import html
import json
import subprocess
from pathlib import Path
from urllib.parse import quote


MUSIC_SITE = Path(__file__).resolve().parents[1]
MUSIC_SOURCE = MUSIC_SITE.parents[1] / "Music"
PUBLIC_ROOT = "https://roylyl.github.io/music/"
DESCRIPTION = "来自Roylyl的私人音乐仓库。"


def page(track, image_path):
    song_id = quote(track["id"], safe="")
    title = html.escape(f'{track["title"]} - {track["artist"]}', quote=True)
    artist = html.escape(track["artist"], quote=True)
    album = html.escape(track["album"], quote=True)
    image = PUBLIC_ROOT + "share-covers/" + quote(image_path.as_posix(), safe="/")
    relative_image = "../share-covers/" + quote(image_path.as_posix(), safe="/")
    canonical = PUBLIC_ROOT + "share/" + song_id + ".html"
    listen = "../?track=" + song_id + "&amp;full=1&amp;autoplay=1"
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{DESCRIPTION}">
<meta property="og:type" content="music.song">
<meta property="og:site_name" content="Roylyl Music">
<meta property="og:locale" content="zh_CN">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{DESCRIPTION}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="{album}专辑封面">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{DESCRIPTION}">
<meta name="twitter:image" content="{image}">
<link rel="canonical" href="{canonical}">
<link rel="image_src" href="{image}">
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<style>
:root{{color-scheme:dark;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;background:#080d13;color:#f5f7fb}}
*{{box-sizing:border-box}}body{{margin:0;min-height:100dvh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 0,#173039,#080d13 65%)}}
main{{width:min(100%,460px);text-align:center}}img{{display:block;width:min(100%,360px);height:min(360px,calc(100vw - 48px));aspect-ratio:1;object-fit:cover;margin:0 auto 30px;border-radius:18px;box-shadow:0 24px 70px #0008}}
h1{{font-size:clamp(24px,6vw,36px);line-height:1.3;margin:0 0 10px}}p{{color:#aab7c4;margin:8px 0}}a{{display:inline-block;margin-top:24px;padding:13px 24px;border-radius:28px;background:#8ef0c8;color:#10221a;text-decoration:none;font-weight:650}}
</style>
</head>
<body><main><img src="../placeholder.svg" data-cover-url="{relative_image}" alt="{album}专辑封面" width="600" height="600"><h1>{title}</h1><p>{album}</p><p>{DESCRIPTION}</p><a href="{listen}">打开Roylyl Music</a></main>
<script>
(() => {{
  const img = document.querySelector('main img');
  const source = new URL(img.dataset.coverUrl, location.href).href;
  (async () => {{
    if (!('caches' in window)) {{ img.src = source; return; }}
    try {{
      const cache = await caches.open('roylyl-music-covers-v1');
      let response = await cache.match(source);
      if (!response) {{
        response = await fetch(source);
        if (!response.ok) throw new Error('Cover HTTP ' + response.status);
        try {{ await cache.put(source, response.clone()); }} catch {{}}
      }}
      img.src = URL.createObjectURL(await response.blob());
    }} catch {{ img.src = source; }}
  }})();
}})();
</script></body>
</html>
"""


def main():
    tracks = json.loads((MUSIC_SITE / "data/tracks.json").read_text())
    share_dir = MUSIC_SITE / "share"
    cover_dir = MUSIC_SITE / "share-covers"
    share_dir.mkdir(exist_ok=True)
    for cover in sorted({track["cover"] for track in tracks}):
        source = MUSIC_SOURCE / cover
        if not source.is_file():
            raise FileNotFoundError(source)
        image_path = Path(cover).with_suffix(".jpg")
        destination = cover_dir / image_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        if not destination.exists() or destination.stat().st_mtime < source.stat().st_mtime:
            subprocess.run(
                ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "78", "-Z", "600", str(source), "--out", str(destination)],
                check=True, capture_output=True,
            )
    for track in tracks:
        destination = share_dir / f'{track["id"]}.html'
        destination.write_text(page(track, Path(track["cover"]).with_suffix(".jpg")))
    print(f"已生成{len(tracks)}个歌曲分享页和{len({track['cover'] for track in tracks})}张封面")


if __name__ == "__main__":
    main()
