import re

with open("prisma/seed-data/studios.ts", "r") as f:
    lines = f.readlines()

# Deduplicate studios by slug
slug_seen = set()
new_lines = []
in_object = False
current_obj = []
current_slug = None

for line in lines:
    m = re.search(r'slug:\s*"([^"]+)"', line)
    if m:
        current_slug = m.group(1)
    
    current_obj.append(line)
    
    if "}," in line or "}" in line:
        if current_slug:
            if current_slug not in slug_seen:
                slug_seen.add(current_slug)
                new_lines.extend(current_obj)
            else:
                print(f"Removed duplicate studio: {current_slug}")
            current_slug = None
            current_obj = []
        else:
            new_lines.extend(current_obj)
            current_obj = []

if current_obj:
    new_lines.extend(current_obj)

with open("prisma/seed-data/studios.ts", "w") as f:
    f.writelines(new_lines)

print("Deduplicated studios.ts successfully!")
