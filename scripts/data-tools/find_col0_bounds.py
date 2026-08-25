from PIL import Image, ImageDraw

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

strip = img.crop((4, 0, 150, 1024))
draw = ImageDraw.Draw(strip)

# draw horizontal lines with labels every 20px
for y in range(0, 1024, 20):
    draw.line([(0, y), (146, y)], fill="green", width=1)
    draw.text((5, y + 2), f"{y}", fill="yellow")

strip.save('/tmp/col0_strip_ruler.png')
print("Saved /tmp/col0_strip_ruler.png")
