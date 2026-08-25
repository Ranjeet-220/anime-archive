from PIL import Image

img = Image.open('/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg')
W, H = img.size

# Let's crop row 0 (Attack on Titan to Bleach), row 1 (Evangelion to Jojo), row 2 (Chainsaw to Slime), etc.
# Let's measure exact y coordinates of borders by scanning pixel rows.

import numpy as np

arr = np.array(img.convert('L'))
# Average horizontal line intensity
row_means = arr.mean(axis=1)
col_means = arr.mean(axis=0)

print("Row means shape:", row_means.shape)
print("Col means shape:", col_means.shape)

# Let's inspect where rows 0..5 start and end
# Total H = 1024. 6 rows means each row is approx 170.6 px tall.
# Let's check row boundaries:
for r in range(6):
    approx_top = r * (H / 6)
    approx_bottom = (r + 1) * (H / 6)
    print(f"Row {r}: approx_top={approx_top:.1f}, approx_bottom={approx_bottom:.1f}")

