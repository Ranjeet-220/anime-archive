from PIL import Image, ImageDraw

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

test_img = img.copy()
draw = ImageDraw.Draw(test_img)

y_starts = [6, 175, 344, 513, 682, 851]
card_h = 165

for y in y_starts:
    draw.line([(0, y), (W, y)], fill="yellow", width=2)
    draw.line([(0, y + card_h), (W, y + card_h)], fill="cyan", width=2)

test_img.save('/tmp/grid_alignment_lines2.png')
print("Saved /tmp/grid_alignment_lines2.png")
