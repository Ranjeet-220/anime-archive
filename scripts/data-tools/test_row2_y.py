from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

# Save 5 vertical crops of Card 21 with different Y starts: 340, 360, 380, 400, 420
for y_start in [340, 360, 380, 400, 420, 440]:
    crop = img.crop((4, y_start, 150, y_start + 160))
    crop.save(f'/tmp/card21_ystart_{y_start}.png')

print("Saved card21 ystart test crops")
