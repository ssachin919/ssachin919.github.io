"""Generate avatar / favicon / SVG assets from the polished circular base portrait."""

from __future__ import annotations

import base64
import io
import struct
from pathlib import Path

import vtracer
from PIL import Image, ImageChops, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[1]
# Prefer the curated circular base; fall back to public copy.
CURATED = Path(
    r"C:\Users\ssach\.cursor\projects\d-codes-sachin-anand-mbb\assets"
    r"\c__Users_ssach_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"52449776e1c0974a4c5521e932e98f47_images_"
    r"sachin-anand-mbb-pic-7030383f-89ef-4bd1-aa1f-abf1d46a4b4e.png"
)
SRC = ROOT / "public" / "pictures" / "sachin-avatar-base.jpg"
OUT_PIC = ROOT / "public" / "pictures"
OUT_APP = ROOT / "app"
OUT_PUBLIC = ROOT / "public"

MBB_GREEN = (57, 181, 74)  # #39B54A
BLACK = (0, 0, 0)


def color_dist(a: tuple[int, ...], b: tuple[int, ...]) -> float:
    return sum((x - y) ** 2 for x, y in zip(a[:3], b[:3])) ** 0.5


def load_base() -> Image.Image:
    """Load curated source, copy into public/, return RGBA with transparent corners."""
    src_path = CURATED if CURATED.exists() else SRC
    raw = Image.open(src_path).convert("RGB")
    SRC.parent.mkdir(parents=True, exist_ok=True)
    # Lean canonical master (JPEG); transparent variants are derived.
    raw.save(SRC, "JPEG", quality=93, optimize=True, progressive=True)
    return punch_circle_alpha(raw)


def punch_circle_alpha(im: Image.Image) -> Image.Image:
    """Make pixels outside the green ring transparent (replace white canvas)."""
    rgba = im.convert("RGBA")
    w, h = rgba.size
    cx, cy = w / 2, h / 2
    # Radius to outer green edge — leave a 1px inset so the ring stays crisp.
    r = min(w, h) / 2 - 1
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse(
        (cx - r, cy - r, cx + r, cy + r), fill=255
    )
    # Soften ring antialias: also clear near-white corner pixels.
    px = rgba.load()
    m = mask.load()
    for y in range(h):
        for x in range(w):
            if m[x, y] == 0:
                px[x, y] = (0, 0, 0, 0)
            else:
                r_, g_, b_, _ = px[x, y]
                # Kill residual white fringe outside the ring (near corners of bbox).
                dx, dy = x - cx, y - cy
                dist = (dx * dx + dy * dy) ** 0.5
                if dist > r - 0.5 and color_dist((r_, g_, b_), (255, 255, 255)) < 40:
                    px[x, y] = (0, 0, 0, 0)
    rgba.putalpha(mask)
    return rgba


def resize_circle(im: Image.Image, size: int) -> Image.Image:
    return im.resize((size, size), Image.Resampling.LANCZOS)


def save_png(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def save_webp(im: Image.Image, path: Path, quality: int = 88) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def save_jpeg_on_black(im: Image.Image, path: Path, quality: int = 90) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    bg = Image.new("RGB", im.size, BLACK)
    if im.mode == "RGBA":
        bg.paste(im, mask=im.split()[-1])
    else:
        bg.paste(im.convert("RGB"))
    bg.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  wrote {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


def make_favicon_ico(images: list[Image.Image], path: Path) -> None:
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


def svg_circle_frame(href: str, size: int = 512) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" '
        f'viewBox="0 0 {size} {size}" role="img" aria-label="Sachin Anand">\n'
        f'  <image href="{href}" width="{size}" height="{size}" '
        'preserveAspectRatio="xMidYMid meet"/>\n'
        "</svg>\n"
    )


def make_mono_mark(circle: Image.Image, size: int = 256) -> Image.Image:
    """High-contrast green silhouette mark for tiny favicon / brand mark."""
    fitted = resize_circle(circle, size).convert("RGBA")
    # Subject = non-transparent, non-near-black, non-green-ring pixels approximated by luminance.
    lum = fitted.convert("L")
    alpha = fitted.split()[-1]
    # Keep face/hair (brighter than pure black bg) inside circle.
    subject = lum.point(lambda p: 255 if p > 22 else 0)
    subject = ImageChops.multiply(subject, alpha)
    # Knock out the green ring band: sample outer annulus as non-subject for silhouette fill.
    sil = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # Draw green disc ring + silhouette
    draw = ImageDraw.Draw(sil)
    draw.ellipse((2, 2, size - 3, size - 3), fill=(*MBB_GREEN, 255))
    inner = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    pad = max(6, size // 14)
    mask_inner = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask_inner).ellipse(
        (pad, pad, size - pad - 1, size - pad - 1), fill=255
    )
    sil.paste(inner, mask=mask_inner)
    # Paste green subject silhouette
    green = Image.new("RGBA", (size, size), (*MBB_GREEN, 255))
    sil.paste(green, mask=subject)
    return sil


def main() -> None:
    print("1. Load curated circular base + transparent corners...")
    base = load_base()
    # Working transparent master at 1024 kept only as derived circle sizes below.
    print(f"  wrote {SRC.relative_to(ROOT)} ({SRC.stat().st_size:,} bytes)")

    print("2. Circular sizes (no re-framing - ring already in source)...")
    for size, stem in [
        (512, "sachin-avatar-circle"),
        (256, "sachin-avatar-circle-256"),
        (128, "sachin-avatar-circle-128"),
    ]:
        circ = resize_circle(base, size)
        save_png(circ, OUT_PIC / f"{stem}.png")
        if size == 512:
            save_webp(circ, OUT_PIC / "sachin-avatar-circle.webp", quality=90)
            save_jpeg_on_black(circ, OUT_PIC / "sachin-avatar-circle.jpg", quality=92)

    # Square on black at 512 for opaque contexts.
    circ512 = resize_circle(base, 512)
    sq = Image.new("RGBA", circ512.size, (*BLACK, 255))
    sq.paste(circ512, mask=circ512.split()[-1])
    save_png(sq.convert("RGB").convert("RGBA"), OUT_PIC / "sachin-avatar-square.png")
    save_webp(sq, OUT_PIC / "sachin-avatar-square.webp", quality=88)
    save_jpeg_on_black(sq, OUT_PIC / "sachin-avatar-square.jpg", quality=90)

    print("3. Favicons (direct downscales of the circle)...")
    favicons: dict[int, Image.Image] = {}
    for s in (16, 32, 48, 64, 180, 192, 512):
        fav = resize_circle(base, s)
        favicons[s] = fav
        save_png(fav, OUT_PIC / f"sachin-favicon-{s}.png")

    save_png(favicons[32], OUT_APP / "icon.png")
    save_png(favicons[180], OUT_APP / "apple-icon.png")
    make_favicon_ico(
        [favicons[16], favicons[32], favicons[48]], OUT_PUBLIC / "favicon.ico"
    )

    print("4. Vector SVGs...")
    # Full-color trace from mid-res flatten on black.
    flat = Image.new("RGB", (384, 384), BLACK)
    mid = resize_circle(base, 384)
    flat.paste(mid, mask=mid.split()[-1])
    tmp = OUT_PIC / "_tmp_circle_vec.png"
    flat.save(tmp)
    svg_out = OUT_PIC / "sachin-avatar-circle.svg"
    vtracer.convert_image_to_svg_py(
        str(tmp),
        str(svg_out),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=6,
        color_precision=6,
        layer_difference=12,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        path_precision=2,
    )
    print(f"  wrote {svg_out.relative_to(ROOT)} ({svg_out.stat().st_size:,} bytes)")

    mono = make_mono_mark(base, 256)
    tmp_mono = OUT_PIC / "_tmp_mono.png"
    flat_mono = Image.new("RGB", mono.size, BLACK)
    flat_mono.paste(mono, mask=mono.split()[-1])
    flat_mono.save(tmp_mono)
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

    hybrid = OUT_PIC / "sachin-avatar-circle-hybrid.svg"
    hybrid.write_text(svg_circle_frame("sachin-avatar-circle.png", 512), encoding="utf-8")
    print(f"  wrote {hybrid.relative_to(ROOT)} ({hybrid.stat().st_size:,} bytes)")

    buf = io.BytesIO()
    resize_circle(base, 256).save(buf, "PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    embedded = OUT_PIC / "sachin-avatar-circle-embedded.svg"
    embedded.write_text(
        svg_circle_frame(f"data:image/png;base64,{b64}", 256), encoding="utf-8"
    )
    print(f"  wrote {embedded.relative_to(ROOT)} ({embedded.stat().st_size:,} bytes)")

    # Browser icon.svg: photo circle at 64px (readable in tab) as data-URI SVG.
    fav64 = resize_circle(base, 64)
    buf64 = io.BytesIO()
    fav64.save(buf64, "PNG", optimize=True)
    b64_64 = base64.b64encode(buf64.getvalue()).decode("ascii")
    icon_svg = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">\n'
        f'  <image href="data:image/png;base64,{b64_64}" width="64" height="64"/>\n'
        "</svg>\n"
    )
    (OUT_PUBLIC / "icon.svg").write_text(icon_svg, encoding="utf-8")
    print(f"  wrote {(OUT_PUBLIC / 'icon.svg').relative_to(ROOT)}")

    for t in OUT_PIC.glob("_tmp_*"):
        t.unlink()
        print(f"  cleaned {t.name}")

    print("Done.")


if __name__ == "__main__":
    main()
