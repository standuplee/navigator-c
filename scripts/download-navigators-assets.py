"""Download sample photos from navigators-seoulc.org into public/sample/ (topic-named files
used by src/features/main-template/sampleImages.ts). Run once from the repo root:

    python3 scripts/download-navigators-assets.py

Standard library only. Existing files are skipped, so it is safe to re-run.
"""
import pathlib
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "sample"
BASE = "https://navigators-seoulc.org/images/"


def seq(prefix, remote_fmt, numbers):
    return [(remote_fmt.format(n), f"{prefix}-{i}.jpg") for i, n in enumerate(numbers, 1)]


FILES = [
    # main page
    ("slide_a_bg.png", "hero-1.png"), ("slide_b_bg.png", "hero-2.png"), ("slide_c_bg.png", "hero-3.png"),
    ("main_tab1a.png", "tab-bible-1.png"), ("main_tab1b.png", "tab-bible-2.png"),
    ("main_tab2a.png", "tab-prayer-1.png"), ("main_tab2b.png", "tab-prayer-2.png"),
    ("main_tab3a.png", "tab-disciple-1.png"), ("main_tab3b.png", "tab-disciple-2.png"),
    # sub1 — about, 비전관
    *seq("about", "sub/sub1/sub2-{}_b.jpg", [1, 2, 3, 4]),
    *seq("vision-1f", "sub/sub1/sub4-{}_b.jpg", [1, 2]),
    *seq("vision-2f", "sub/sub1/sub4-{}_b.jpg", [3, 4, 5, 6, 7, 8, 9, 10]),
    *seq("vision-34f", "sub/sub1/sub4-{}_b.jpg", [11, 12, 13, 14, 15, 16]),
    # sub2 — 사역
    *seq("bible", "sub/sub2/sub1-{}_b.jpg", [1, 2]),
    *seq("campus", "sub/sub2/sub2-{}_b.jpg", [1, 2, 3, 4]),
    *seq("missions", "sub/sub2/sub5-{}_b.jpg", [1, 2, 3, 4, 5, 7, 8]),
    *[(f"sub/sub2/church{n}.png", f"contrib-{i}.png") for i, n in enumerate([1, 2, 4, 5, 6, 7, 8, 9, 12], 1)],
    # sub3 — 활동
    ("sub/sub3/sunday.png", "sunday-1.png"), ("sub/sub3/sunday2.png", "sunday-2.png"),
    *seq("online", "sub/sub3/sub2-{}_b.jpg", [1, 2]),
    *seq("oneonone", "sub/sub3/sub3-{}_b.jpg", [1, 2, 3]),
    *seq("grace", "sub/sub3/sub4-{}_b.jpg", [1]),
    *seq("couples", "sub/sub3/sub5-{}_b.jpg", [1, 2, 3, 4, 5, 6]),
    *seq("training", "sub/sub3/sub6-{}_b.jpg", [1, 2, 3]),
    *seq("retreat", "sub/sub3/sub7-{}_b.jpg", [1, 2, 3, 4, 5, 6, 7, 8]),
    *seq("eve", "sub/sub3/sub8-{}_b.jpg", [1, 4, 6, 10, 11]),
    *seq("sports", "sub/sub3/sub9-{}_b.jpg", [1, 2]),
    *seq("enjoy", "sub/sub3/sub10-{}_b.jpg", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
]


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    ok = skipped = 0
    failed = []
    for remote, local in FILES:
        target = DEST / local
        if target.exists() and target.stat().st_size > 0:
            skipped += 1
            continue
        request = urllib.request.Request(BASE + remote, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                target.write_bytes(response.read())
            ok += 1
            print(f"  {local}")
        except Exception as error:  # noqa: BLE001 — report and continue
            failed.append(f"{remote}: {error}")
    print(f"downloaded {ok}, skipped {skipped}, failed {len(failed)} → {DEST}")
    for line in failed:
        print("  FAILED", line)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
