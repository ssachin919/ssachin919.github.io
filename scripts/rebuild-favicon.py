"""Rebuild favicon.ico + clean public/icon.svg from generated PNGs."""

from __future__ import annotations

import base64
import io
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PIC = ROOT / "public" / "pictures"


def main() -> None:
    sizes = [16, 32, 48]
    imgs = [
        Image.open(PIC / f"sachin-favicon-{s}.png").convert("RGBA") for s in sizes
    ]
    out = ROOT / "public" / "favicon.ico"
    imgs[0].save(out, format="ICO", sizes=[(s, s) for s in sizes])
    print(f"favicon.ico {out.stat().st_size}")

    face = Image.open(PIC / "sachin-favicon-64.png").convert("RGBA")
    buf = io.BytesIO()
    face.save(buf, "PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">'
        '<defs><clipPath id="c"><circle cx="32" cy="32" r="30"/></clipPath></defs>'
        '<circle cx="32" cy="32" r="32" fill="#39B54A"/>'
        f'<image href="data:image/png;base64,{b64}" width="64" height="64" clip-path="url(#c)"/>'
        "</svg>\n"
    )
    icon = ROOT / "public" / "icon.svg"
    icon.write_text(svg, encoding="utf-8")
    print(f"icon.svg {icon.stat().st_size}")


if __name__ == "__main__":
    main()
