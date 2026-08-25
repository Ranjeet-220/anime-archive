from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
rgb = img.convert('RGB')
W, H = img.size

# Let's inspect column x=20 (inside card column 0) for badge outline or card border
# Card 1, 11, 21, 31, 41, 51

print("Y pixels where card border / badge starts for column 0:")
for y in range(0, H):
    # Check pixel x=15, y=y
    r, g, b = rgb.getpixel((15, y))
    # Red badge 1 box border is red r>100, g<40, b<40 or card border
    if r > 100 and g < 50 and b < 50:
        print(f"y={y}: r={r}, g={g}, b={b}")

