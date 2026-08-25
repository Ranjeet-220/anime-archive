from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')

row_y_bounds = [
    (4, 198),
    (212, 406),
    (420, 614),
    (628, 770),
    (780, 910),
    (920, 1024)
]

for i, (y1, y2) in enumerate(row_y_bounds):
    card_id = i * 10 + 1
    crop = img.crop((4, y1, 150, y2))
    crop.save(f'/tmp/perfect_card_{card_id}.png')

print("Saved perfect card crops for col 0")
