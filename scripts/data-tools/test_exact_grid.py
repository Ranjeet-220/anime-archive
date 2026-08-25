from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

cell_w = W / 10.0
cell_h = H / 6.0

for r in range(6):
    card_id = r * 10 + 1
    x1 = int(0 * cell_w + 3)
    y1 = int(r * cell_h + 3)
    x2 = int(1 * cell_w - 3)
    y2 = int((r + 1) * cell_h - 3)
    
    crop_img = img.crop((x1, y1, x2, y2))
    crop_img.save(f'/tmp/calibrated/card_{card_id}_exact.png')

print("Saved exact grid crops")
