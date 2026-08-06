"""Generate themed circular avatar, favicon, and SVG assets from sachin-pic-new.jpg."""

from __future__ import annotations

import base64
import io
from pathlib import Path

import vtracer
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "pictures" / "sachin-pic-new.jpg"
OUT_PIC = ROOT / "public" / "pictures"
OUT_APP = ROOT / "app"
OUT_PUBLIC = ROOT / "public"

MBB_GREEN = (57, 181, 74)  # #39B54A
BLACK = (0, 0, 0)
BG_REF = (150, 136, 125)


def color_dist(a: tuple[int, ...], b: tuple[int, ...]) -> float:
    return sum((x - y) ** 2 for x, y in zip(a[:3], b[:3])) ** 0.5


def replace_background(
    im: Image.Image, new_bg: tuple[int, int, int] = BLACK, threshold: float = 45
) -> Image.Image:
    """Flood-fill taupe background from edges; keep subject + white sticker border."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    visited = [[False] * h for _ in range(w)]
    stack: list[tuple[int, int]] = []
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    bg_mask = Image.new("L", (w, h), 0)
    bmp = bg_mask.load()
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[x][y]:
            continue
        visited[x][y] = True
        r, g, b, _a = px[x, y]
        if r > 240 and g > 240 and b > 240:
            continue
        if color_dist((r, g, b), BG_REF) <= threshold or color_dist(
            (r, g, b), (138, 114, 86)
        ) <= 35:
            bmp[x, y] = 255
            stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    bg_mask = bg_mask.filter(ImageFilter.MaxFilter(3))
    for y in range(h):
        for x in range(w):
            r, g, b, _a = px[x, y]
            if r > 235 and g > 235 and b > 235:
                continue
            if color_dist((r, g, b), BG_REF) <= 28:
                bmp[x, y] = 255

    out = im.copy()
    black = Image.new("RGBA", (w, h), (*new_bg, 255))
    return Image.composite(black, out, bg_mask)


def circular_with_ring(
    im: Image.Image,
    size: int = 512,
    ring: int = 14,
    ring_color: tuple[int, int, int] = MBB_GREEN,
    pad: int = 8,
) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner = size - 2 * ring - 2 * pad
    src = im.convert("RGBA")
    sw, sh = src.size
    side = min(sw, sh)
    left = (sw - side) // 2
    top = max(0, (sh - side) // 2 - side // 12)
    cropped = src.crop((left, top, left + side, top + side)).resize(
        (inner, inner), Image.Resampling.LANCZOS
    )

    mask = Image.new("L", (inner, inner), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, inner - 1, inner - 1), fill=255)
    photo_layer = Image.new("RGBA", (inner, inner), (0, 0, 0, 0))
    photo_layer.paste(cropped, (0, 0), mask)

    draw = ImageDraw.Draw(canvas)
    draw.ellipse(
        (pad, pad, size - pad - 1, size - pad - 1), fill=(*ring_color, 255)
    )
    inset = pad + ring
    draw.ellipse(
        (inset, inset, size - inset - 1, size - inset - 1), fill=(0, 0, 0, 255)
    )
    canvas.paste(photo_layer, (inset, inset), photo_layer)
    return canvas


def save_png(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def save_webp(im: Image.Image, path: Path, quality: int = 84) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def save_jpeg(im: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    bg = Image.new("RGB", im.size, BLACK)
    if im.mode == "RGBA":
        bg.paste(im, mask=im.split()[-1])
    else:
        bg.paste(im.convert("RGB"))
    bg.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def make_favicon_ico(images: list[Image.Image], path: Path) -> None:
    """Write a Vista+ ICO with embedded PNG frames (crisp at 16/32/48)."""
    import struct

    path.parent.mkdir(parents=True, exist_ok=True)
    imgs = [im.convert("RGBA") if im.mode != "RGBA" else im for im in images]
    pngs: list[bytes] = []
    for im in imgs:
        buf = io.BytesIO()
        im.save(buf, "PNG", optimize=True)
        pngs.append(buf.getvalue())

    offset = 6 + 16 * len(pngs)
    entries = bytearray()
    blobs = bytearray()
    for im, png in zip(imgs, pngs):
        w = 0 if im.width >= 256 else im.width
        h = 0 if im.height >= 256 else im.height
        entries += struct.pack(
            "<BBBBHHII", w, h, 0, 0, 1, 32, len(png), offset + len(blobs)
        )
        blobs += png
    header = struct.pack("<HHH", 0, 1, len(pngs))
    path.write_bytes(header + entries + blobs)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def svg_circle_frame(href: str, size: int = 512, ring: int = 14, pad: int = 8) -> str:
    inner = size - 2 * ring - 2 * pad
    cx = cy = size / 2
    r_outer = (size - 2 * pad) / 2
    r_inner = inner / 2
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}" role="img" aria-label="Sachin Anand">
  <defs>
    <clipPath id="face">
      <circle cx="{cx}" cy="{cy}" r="{r_inner}"/>
    </clipPath>
  </defs>
  <circle cx="{cx}" cy="{cy}" r="{r_outer}" fill="#39B54A"/>
  <circle cx="{cx}" cy="{cy}" r="{r_inner}" fill="#000000"/>
  <image href="{href}" x="{pad + ring}" y="{pad + ring}" width="{inner}" height="{inner}" clip-path="url(#face)" preserveAspectRatio="xMidYMid slice"/>
</svg>
"""


def svg_embedded_circle(png_bytes: bytes, size: int = 256, ring: int = 8, pad: int = 4) -> str:
    href = f"data:image/png;base64,{base64.b64encode(png_bytes).decode('ascii')}"
    return svg_circle_frame(href, size, ring, pad)


def face_crop(themed: Image.Image) -> Image.Image:
    fw, fh = themed.size
    margin = int(fw * 0.12)
    face = themed.crop((margin, int(fh * 0.05), fw - margin, fh - int(fh * 0.18)))
    side = min(face.size)
    return ImageOps.fit(face, (side, side), centering=(0.5, 0.35))


def make_small_favicon(face: Image.Image, size: int) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).ellipse((0, 0, size - 1, size - 1), fill=255)
    resized = face.resize((size, size), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(resized, (0, 0), m)
    if size >= 32:
        ImageDraw.Draw(out).ellipse(
            (0, 0, size - 1, size - 1), outline=(*MBB_GREEN, 255), width=max(1, size // 16)
        )
    return out


def make_mono_mark(themed: Image.Image, size: int = 256) -> Image.Image:
    fitted = ImageOps.fit(themed, (size, size), centering=(0.5, 0.35))
    lum = fitted.convert("L")
    subject = lum.point(lambda p: 255 if p > 18 else 0)
    cmask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(cmask).ellipse((8, 8, size - 9, size - 9), fill=255)
    subject = ImageChops.multiply(subject, cmask)
    sil = Image.new("RGB", (size, size), BLACK)
    sil.paste(MBB_GREEN, mask=subject)
    ImageDraw.Draw(sil).ellipse((4, 4, size - 5, size - 5), outline=MBB_GREEN, width=10)
    return sil


def main() -> None:
    print("1. Retheme background to brand black...")
    themed = replace_background(Image.open(SRC))
    save_png(themed, OUT_PIC / "sachin-avatar-square.png")
    save_webp(themed, OUT_PIC / "sachin-avatar-square.webp")
    save_jpeg(themed, OUT_PIC / "sachin-avatar-square.jpg")

    print("2. Circular framed avatars...")
    for size, name in [
        (512, "sachin-avatar-circle.png"),
        (256, "sachin-avatar-circle-256.png"),
        (128, "sachin-avatar-circle-128.png"),
    ]:
        circ = circular_with_ring(themed, size=size, ring=max(8, size // 36))
        save_png(circ, OUT_PIC / name)
        if size == 512:
            save_webp(circ, OUT_PIC / "sachin-avatar-circle.webp")

    print("3. Favicons...")
    face = face_crop(themed)
    favicons: dict[int, Image.Image] = {}
    for s in (16, 32, 48, 64, 180, 192, 512):
        if s <= 48:
            out = make_small_favicon(face, s)
        else:
            out = circular_with_ring(face, size=s, ring=max(2, s // 16), pad=max(1, s // 64))
        favicons[s] = out
        save_png(out, OUT_PIC / f"sachin-favicon-{s}.png")

    save_png(favicons[32], OUT_APP / "icon.png")
    save_png(favicons[180], OUT_APP / "apple-icon.png")
    make_favicon_ico([favicons[16], favicons[32], favicons[48]], OUT_PUBLIC / "favicon.ico")

    print("4. Vector SVGs...")
    circ384 = circular_with_ring(themed, size=384, ring=12)
    flat = Image.new("RGB", circ384.size, BLACK)
    flat.paste(circ384, mask=circ384.split()[-1])
    tmp = OUT_PIC / "_tmp_circle_vec.png"
    flat.save(tmp)
    svg_out = OUT_PIC / "sachin-avatar-circle.svg"
    vtracer.convert_image_to_svg_py(
        str(tmp),
        str(svg_out),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=8,
        color_precision=6,
        layer_difference=16,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        path_precision=2,
    )
    print(f"  wrote {svg_out.relative_to(ROOT)} ({svg_out.stat().st_size:,} bytes)")

    mono = make_mono_mark(themed)
    tmp_mono = OUT_PIC / "_tmp_mono.png"
    mono.save(tmp_mono)
    svg_mono = OUT_PIC / "sachin-mark.svg"
    vtracer.convert_image_to_svg_py(
        str(tmp_mono),
        str(svg_mono),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=4,
        color_precision=4,
        layer_difference=8,
        corner_threshold=60,
        length_threshold=3.0,
        max_iterations=10,
        path_precision=2,
    )
    print(f"  wrote {svg_mono.relative_to(ROOT)} ({svg_mono.stat().st_size:,} bytes)")

    # Crisp hybrid SVG (circle geometry + PNG) — best on-site display quality
    hybrid = OUT_PIC / "sachin-avatar-circle-hybrid.svg"
    hybrid.write_text(
        svg_circle_frame("sachin-avatar-circle.png", 512, 14, 8), encoding="utf-8"
    )
    print(f"  wrote {hybrid.relative_to(ROOT)} ({hybrid.stat().st_size:,} bytes)")

    buf = io.BytesIO()
    circular_with_ring(themed, size=256, ring=8).save(buf, "PNG", optimize=True)
    embedded = OUT_PIC / "sachin-avatar-circle-embedded.svg"
    embedded.write_text(svg_embedded_circle(buf.getvalue(), 256, 8, 4), encoding="utf-8")
    print(f"  wrote {embedded.relative_to(ROOT)} ({embedded.stat().st_size:,} bytes)")

    # Public icon.svg for modern browsers
    (OUT_PUBLIC / "icon.svg").write_text(svg_mono.read_text(encoding="utf-8"), encoding="utf-8")
    print(f"  wrote {(OUT_PUBLIC / 'icon.svg').relative_to(ROOT)}")

    for t in OUT_PIC.glob("_tmp_*"):
        t.unlink()
        print(f"  cleaned {t.name}")

    print("Done.")


if __name__ == "__main__":
    main()
