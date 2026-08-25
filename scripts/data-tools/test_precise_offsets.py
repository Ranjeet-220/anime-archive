from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

y_starts = [8, 178, 348, 518, 688, 858]
card_h = 156

x_starts = [6, 159, 312, 465, 618, 771, 924, 1077, 1230, 1383]
card_w = 142

for r in range(6):
    card_num = r * 10 + 1
    y1 = y_starts[r]
    y2 = y1 + card_h
    x1 = x_starts[0]
    x2 = x1 + card_w
    
    crop = img.crop((x1, y1, x2, y2))
    crop.save(f'/tmp/precise_card_{card_num}.png')

print("Saved precise card crops")
