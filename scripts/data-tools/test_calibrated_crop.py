from PIL import Image
import os

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

y_starts = [5, 172, 338, 504, 670, 836]
card_h = 160

x_starts = [int(c * 153.2 + 4) for c in range(10)]
card_w = 145

os.makedirs('/tmp/calibrated', exist_ok=True)

for r in range(6):
    for c in range(10):
        card_id = r * 10 + c + 1
        x1 = x_starts[c]
        y1 = y_starts[r]
        x2 = x1 + card_w
        y2 = y1 + card_h
        
        crop_img = img.crop((x1, y1, x2, y2))
        crop_img.save(f'/tmp/calibrated/card_{card_id}.png')

print("Saved calibrated crops")
