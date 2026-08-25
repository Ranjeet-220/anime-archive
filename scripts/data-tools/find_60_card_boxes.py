from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
rgb = img.convert('RGB')
W, H = img.size

# Let's find the exact top-left and bottom-right of every card (1 to 60)
# Column x-starts:
col_w = W / 10.0

cards = []

for idx in range(60):
    r = idx // 10
    c = idx % 10
    
    x1_approx = int(c * col_w)
    x2_approx = int((c + 1) * col_w)
    
    # Search for badge top inside this column range x1_approx..x2_approx
    # Badge has red border: r > 100, g < 50, b < 50, near top-left of card
    found_y = None
    for y in range(int(r * (H/6.0) - 40), min(H - 20, int((r + 1) * (H/6.0) + 60))):
        if y < 0: continue
        # search x in x1_approx + 5 to x1_approx + 40
        for x in range(x1_approx + 5, x1_approx + 45):
            pr, pg, pb = rgb.getpixel((x, y))
            if pr > 110 and pg < 45 and pb < 45:
                found_y = y
                break
        if found_y is not None:
            break
            
    cards.append((idx + 1, r, c, found_y))

for item in cards[:25]:
    print(f"Card {item[0]} (row {item[1]}, col {item[2]}): badge_y = {item[3]}")

