with open("prisma/seed-data/studios.ts", "r") as f:
    content = f.read()

import re
slugs = re.findall(r'slug:\s*"([^"]+)"', content)
print("Total studio slugs:", len(slugs))

from collections import Counter
counts = Counter(slugs)
dups = [s for s, c in counts.items() if c > 1]
print("Duplicate studio slugs:", dups)

