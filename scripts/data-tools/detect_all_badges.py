from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
rgb = img.convert('RGB')
W, H = img.size

# Let's locate the top-left corner of the badge for each of the 60 cards
# A badge is near the top-left of each card: x_badge in [x1+5, x1+35], y_badge in [y1+5, y1+35]

# Let's inspect where badge top-left corner (red box or card border) is for each cell
row_starts = []
for r in range(6):
    # check around y_approx = r * 170
    y_min = int(r * 170.6)
    y_max = int((r + 1) * 170.6)
    
    # search for card top border in column 10..140
    border_y = None
    for y in range(y_min, min(H, y_min + 60)):
        # card border top is a line of non-black pixels around x=20..140
        count = 0
        for x in range(20, 140):
            pr, pg, pb = rgb.getpixel((x, y))
            if pr > 40 or pg > 40 or pb > 40:
                count += 1
        if count > 100:
            border_y = y
            break
    print(f"Row {r}: top border y = {border_y}")
