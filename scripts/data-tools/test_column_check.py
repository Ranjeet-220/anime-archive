from PIL import Image, ImageDraw

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Let's crop vertical strip at column 2 (x from 308 to 458)
strip = img.crop((308, 0, 458, H))
draw = ImageDraw.Draw(strip)

# Draw lines at y = 0, 170.6, 341.3, 512, 682.6, 853.3, 1024
for i in range(7):
    y = int(i * (H / 6.0))
    draw.line([(0, y), (150, y)], fill="red", width=3)
    draw.text((10, y + 5), f"Y={y}", fill="yellow")

strip.save('/tmp/column2_full_strip.png')
print("Saved /tmp/column2_full_strip.png")
