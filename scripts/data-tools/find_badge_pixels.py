from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
rgb = img.convert('RGB')

# Let's find badge '21' top-left corner:
# search x from 0 to 50, y from 0 to 1024
for y in range(0, 1024):
    r, g, b = rgb.getpixel((25, y))
    # look for badge red border (r > 100, g < 50, b < 50)
    if r > 120 and g < 40 and b < 40:
        print(f"Red badge pixel at y={y}")

