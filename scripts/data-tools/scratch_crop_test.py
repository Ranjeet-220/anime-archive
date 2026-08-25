from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size
print(f"Image size: {W} x {H}")

# 6 rows, 10 columns
rows = 6
cols = 10

# Let's inspect spacing
col_w = W / cols
row_h = H / rows

print(f"Cell approx size: {col_w} x {row_h}")

