from PIL import Image, ImageDraw

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

test_img = img.copy()
draw = ImageDraw.Draw(test_img)

y_starts = [6, 175, 344, 513, 682, 851]
card_h = 165

x_starts = [4, 157, 310, 463, 616, 769, 922, 1075, 1228, 1381]
card_w = 146

for x in x_starts:
    draw.line([(x, 0), (x, H)], fill="yellow", width=2)
    draw.line([(x + card_w, 0), (x + card_w, H)], fill="cyan", width=2)

for y in y_starts:
    draw.line([(0, y), (W, y)], fill="yellow", width=2)
    draw.line([(0, y + card_h), (W, y + card_h)], fill="cyan", width=2)

test_img.save('/tmp/grid_alignment_lines3.png')
print("Saved /tmp/grid_alignment_lines3.png")
