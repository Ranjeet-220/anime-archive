from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

# Grid parameters
# 1536 x 1024
# 10 columns, 6 rows

margin_x = 0
margin_y = 0
cell_w = 153.6
cell_h = 170.66666

# Let's crop Card 1 (row 0, col 0), Card 2 (row 0, col 1), Card 11 (row 1, col 0)
for r in range(6):
    for c in range(10):
        index = r * 10 + c + 1
        x1 = c * cell_w
        y1 = r * cell_h
        x2 = (c + 1) * cell_w
        y2 = (r + 1) * cell_h
        
        # crop full cell
        cell_img = img.crop((int(x1), int(y1), int(x2), int(y2)))
        cell_img.save(f'/tmp/card_{index}_full.png')

print("Saved sample full cards to /tmp/")
