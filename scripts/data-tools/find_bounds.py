from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Save 12 vertical slices from y=0 to y=1024, each 85px high
for i in range(12):
    y1 = i * 85
    y2 = (i + 1) * 85
    crop = img.crop((10, y1, 150, y2))
    crop.save(f'/tmp/calibrated/slice_{i}.png')

print("Saved slices 0..11")
