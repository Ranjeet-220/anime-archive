from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size
rgb = img.convert('RGB')

# Let's find top-left red outline of badge 21, badge 31, badge 41, badge 51
# Red badge border has a distinct red color.

for card_num in range(1, 61):
    r = (card_num - 1) // 10
    c = (card_num - 1) % 10
    
    # Search region around expected cell
    search_x1 = int(c * (W / 10))
    search_y1 = int(r * (H / 6))
    search_x2 = int((c + 1) * (W / 10))
    search_y2 = int((r + 1) * (H / 6))
    
    # Let's crop cell directly based on finding card outline or ratio
    # Let's check card 21 badge y
