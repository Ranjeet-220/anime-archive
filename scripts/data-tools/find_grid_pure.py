from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Let's inspect card borders.
# Card 1 is top-left, Card 60 is bottom-right.
# Let's crop Card 1, Card 11, Card 21, Card 31, Card 41, Card 51 and check y positions.

# Let's test a refined grid formula:
# Outer padding of collage: let's test pad_top, pad_bottom, pad_left, pad_right
# gap_x, gap_y

for row in range(6):
    for col in range(10):
        # Grid parameters:
        # Total W = 1536, H = 1024
        # Column width = 1536 / 10 = 153.6
        # Row height = 1024 / 6 = 170.666
        x1 = col * 153.6
        y1 = row * 170.666
        x2 = (col + 1) * 153.6
        y2 = (row + 1) * 170.666
        
        # Add 2px inner margin to avoid border bleed
        crop_box = (int(x1 + 2), int(y1 + 2), int(x2 - 2), int(y2 - 2))
        
        card_id = row * 10 + col + 1
        cropped = img.crop(crop_box)
        if card_id in [1, 11, 21, 31, 41, 51, 60]:
            cropped.save(f'/tmp/card_{card_id}_test.png')

print("Saved sample crops for row checking")
