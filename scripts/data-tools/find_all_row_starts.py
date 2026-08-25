from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
rgb = img.convert('RGB')
W, H = img.size

# Search for badge background / border (black box with red outline, containing white digits)
# Column 0 has cards 1, 11, 21, 31, 41, 51

row_y_starts = []

for y in range(0, H - 30):
    # Check pixel x=15, y=y for red badge border (r > 100, g < 40, b < 40)
    pr, pg, pb = rgb.getpixel((15, y))
    pr_prev, pg_prev, pb_prev = rgb.getpixel((15, y-1)) if y > 0 else (0,0,0)
    if (pr > 100 and pg < 50 and pb < 50) and not (pr_prev > 100 and pg_prev < 50 and pb_prev < 50):
        # top edge of a badge!
        # card border is ~5px above badge top!
        card_top = max(0, y - 5)
        row_y_starts.append((y, card_top))

print("Found badge top Y positions and estimated card top Y:")
for b_y, c_top in row_y_starts:
    print(f"Badge Y: {b_y} -> Card top Y: {c_top}")

