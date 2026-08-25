from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Let's crop a vertical strip of 200px width showing row 0, 1, 2, 3, 4, 5 for column 0 (Cards 1, 11, 21, 31, 41, 51)
# We will draw thin white lines at candidate Y positions to see exactly where they land!

test_img = img.copy()

# Candidate Y positions for top of rows 0, 1, 2, 3, 4, 5
# Let's test y = 8, 178, 348, 518, 688, 858
candidate_y = [8, 178, 348, 518, 688, 858]

from PIL import ImageDraw
draw = ImageDraw.Draw(test_img)

for y in candidate_y:
    draw.line([(0, y), (W, y)], fill="yellow", width=2)
    draw.line([(0, y + 158), (W, y + 158)], fill="cyan", width=2)

test_img.save('/tmp/grid_alignment_lines.png')
print("Saved /tmp/grid_alignment_lines.png")
