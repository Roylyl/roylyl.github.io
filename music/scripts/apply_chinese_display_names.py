#!/usr/bin/env python3
"""Use verified Chinese release names for the fixed Apple Music playlists."""

import json
from pathlib import Path

from opencc import OpenCC


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/apple-music.json"
REPORT = ROOT / "reports/apple-localization.json"
CONVERT = OpenCC("t2s")

OVERRIDES = {
    "8AF40B65081C8670": {
        "title": "十八",
        "source": "https://music-tw.line.me/album/6245374",
    },
    "8D836E6533E0801C": {
        "title": "荒谬",
        "source": "https://music-tw.line.me/album/6245374",
    },
    "1681DA2AAAF8D219": {
        "title": "我记得",
        "album": "惊喜",
        "source": "https://music-tw.line.me/album/6245349",
    },
    "CC9F0F045DB47414": {
        "artist": "蛙池",
        "album": "蛙池 2020-2021",
        "source": "https://y.qq.com/n/ryqq_v2/albumDetail/002pAdfp4eOjoY",
    },
}


def main():
    data = json.loads(DATA.read_text())
    changed = []
    for apple_id, entry in data["entries"].items():
        original = entry.setdefault(
            "appleOriginal", {key: entry[key] for key in ("title", "artist", "album")}
        )
        before = tuple(entry[key] for key in ("title", "artist", "album"))
        for key in ("title", "artist", "album"):
            entry[key] = CONVERT.convert(entry[key])
        override = OVERRIDES.get(apple_id)
        if override:
            for key in ("title", "artist", "album"):
                if key in override:
                    entry[key] = override[key]
            entry["localizedMetadataSource"] = override["source"]
        if tuple(entry[key] for key in ("title", "artist", "album")) != before:
            changed.append(apple_id)
        assert original == entry["appleOriginal"]
    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    report = json.loads(REPORT.read_text())
    report["scriptConversion"] = "OpenCC t2s for display only; appleOriginal is retained"
    report["manualChineseNames"] = OVERRIDES
    report["changedEntries"] = sorted(set(report.get("changedEntries", [])) | set(changed))
    report["unresolved"] = [
        apple_id for apple_id in report.get("unresolved", [])
        if apple_id not in OVERRIDES and not data["entries"][apple_id].get("localizedMetadataSource")
    ]
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(f"updated {len(changed)} display entries")


if __name__ == "__main__":
    main()
