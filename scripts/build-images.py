#!/usr/bin/env python3
"""Generate the web copy of the EKA images from the source folder.

Source:  ../shop-webP/<Folder>/*.webp   (originals, up to 3840 px)
Output:  public/images/<category>/<normalised-name>.webp  (long edge <= 1600 px)

Only webp files are generated. public/images/logos (SVG) and any file
without a source are left untouched. Run from the shop-ship-studio folder:
    python3 scripts/build-images.py
"""
import os, re
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..'))
SRC = os.path.abspath(os.path.join(ROOT, '..', 'shop-webP'))
OUT = os.path.join(ROOT, 'public', 'images')
MAX_EDGE = 1600
QUALITY = 82

CATEGORY = {
    'Gasherizon': 'jumpsuit',
    'Shorti': 'shorts',
    'Tshirts': 'tshirts',
    'Eye Pillows': 'eye-pillows',
    'Komplekti': 'sets',
    'Prilojenia': 'activities',
    'Header': 'header',
    'EM': 'em',
}

def normalise(name):
    base = name.replace('.jpg.webp', '.webp')
    m = re.match(r'SHORT_(\d+)_', base, re.I)
    if m:
        return 'short-%s-blue.webp' % m.group(1).zfill(2)
    return base.replace(' ', '-').lower()

def main():
    count = 0
    for folder, cat in CATEGORY.items():
        src_dir = os.path.join(SRC, folder)
        if not os.path.isdir(src_dir):
            print('skip (missing):', folder)
            continue
        out_dir = os.path.join(OUT, cat)
        os.makedirs(out_dir, exist_ok=True)
        for f in sorted(os.listdir(src_dir)):
            if not f.lower().endswith('.webp'):
                continue
            im = Image.open(os.path.join(src_dir, f)).convert('RGB')
            im.thumbnail((MAX_EDGE, MAX_EDGE))
            im.save(os.path.join(out_dir, normalise(f)), 'WEBP', quality=QUALITY, method=6)
            count += 1
    print('generated', count, 'images into', OUT)

if __name__ == '__main__':
    main()
