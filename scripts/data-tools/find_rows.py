from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Let's inspect vertical column 100 px from left (x = 100)
# Print y values where there are card borders or background gaps

rgb_img = img.convert('RGB')

# Let's find Y coordinates where card 1, 11, 21, 31, 41, 51 start.
# Let's crop a thin vertical strip at x=100 from y=0 to y=H and inspect colors
strip = img.crop((50, 0, 150, H))
strip.save('/tmp/strip_left.png')

