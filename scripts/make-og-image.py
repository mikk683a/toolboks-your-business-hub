# Generates public/og-image.png (1200x630) as an own illustration. Run: python3 scripts/make-og-image.py
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
c1, c2 = (59, 130, 246), (14, 165, 233)  # site hero gradient: hsl(217 91% 60%) to hsl(199 89% 48%)
bg = Image.new("RGB", (W, H))
px = bg.load()
for y in range(H):
    for x in range(W):
        t = (x / W + y / H) / 2
        px[x, y] = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

d = ImageDraw.Draw(bg)
font = "/usr/share/fonts/opentype/inter/"
title = ImageFont.truetype(font + "Inter-Bold.otf", 92)
sub = ImageFont.truetype(font + "Inter-Regular.otf", 38)
small = ImageFont.truetype(font + "Inter-SemiBold.otf", 30)
d.text((70, 150), "Toolboks", font=title, fill="white")
d.text((74, 275), "Admin-app til håndværkere", font=sub, fill=(235, 245, 255))
d.text((74, 325), "og servicefirmaer", font=sub, fill=(235, 245, 255))
d.rounded_rectangle((70, 440, 520, 500), radius=30, fill="white")
d.text((100, 454), "3 måneder gratis, uden kort", font=small, fill=(37, 99, 235))

# Own illustration (no screenshots, photos or third party logos): four feature rows on a white card.
cx, cy, cw, ch = 690, 95, 450, 440
d.rounded_rectangle((cx, cy, cx + cw, cy + ch), radius=28, fill="white")
rows = [
    ("Forespørgsler", (59, 130, 246)),
    ("Tilbud", (245, 158, 11)),
    ("Kalender med køretid", (34, 197, 94)),
    ("Faktura", (14, 165, 233)),
]
row_font = ImageFont.truetype(font + "Inter-SemiBold.otf", 28)
for i, (label, col) in enumerate(rows):
    y = cy + 40 + i * 98
    d.rounded_rectangle((cx + 30, y, cx + cw - 30, y + 78), radius=18, fill=(241, 245, 249))
    d.ellipse((cx + 50, y + 22, cx + 84, y + 56), fill=col)
    d.text((cx + 104, y + 21), label, font=row_font, fill=(15, 23, 42))
bg.save("public/og-image.png", "PNG", optimize=True)
