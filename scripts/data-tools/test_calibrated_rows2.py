from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

y_starts = [4, 174, 344, 514, 684, 854]
card_h = 162

x_starts = [int(c * 153.2 + 4) for c in range(10)]
card_w = 145

for r in range(6):
    card_id = r * 10 + 1
    x1 = x_starts[0]
    y1 = y_starts[r]
    x2 = x1 + card_w
    y2 = y1 + card_h
    
    crop_img = img.crop((x1, y1, x2, y2))
    crop_img.save(f'/tmp/calibrated/card_{card_id}_row.png')

print("Saved row test crops")
