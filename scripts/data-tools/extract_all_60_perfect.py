import os
from PIL import Image

img_path = '/home/ranjeet/Downloads/WhatsApp Image 2026-08-19 at 7.21.33 PM.jpeg'
img = Image.open(img_path)

y_starts = [6, 175, 344, 513, 682, 851]
card_h = 165

x_starts = [4, 157, 310, 463, 616, 769, 922, 1075, 1228, 1381]
card_w = 146

cards_info = [
    ("attack-on-titan", "Attack on Titan"),
    ("one-piece", "One Piece"),
    ("naruto", "Naruto"),
    ("dragon-ball-z", "Dragon Ball Z"),
    ("death-note", "Death Note"),
    ("demon-slayer", "Demon Slayer"),
    ("jujutsu-kaisen", "Jujutsu Kaisen"),
    ("fullmetal-alchemist-brotherhood", "Fullmetal Alchemist: Brotherhood"),
    ("hunter-x-hunter-2011", "Hunter x Hunter (2011)"),
    ("bleach", "Bleach"),
    ("neon-genesis-evangelion", "Neon Genesis Evangelion"),
    ("pokemon", "Pokémon"),
    ("my-hero-academia", "My Hero Academia"),
    ("one-punch-man", "One Punch Man"),
    ("sword-art-online", "Sword Art Online"),
    ("tokyo-ghoul", "Tokyo Ghoul"),
    ("black-clover", "Black Clover"),
    ("fairy-tail", "Fairy Tail"),
    ("haikyuu", "Haikyuu!!"),
    ("jojos-bizarre-adventure", "JoJo's Bizarre Adventure"),
    ("chainsaw-man", "Chainsaw Man"),
    ("solo-leveling", "Solo Leveling"),
    ("spy-x-family", "Spy x Family"),
    ("blue-lock", "Blue Lock"),
    ("vinland-saga", "Vinland Saga"),
    ("rezero", "Re:Zero"),
    ("mushoku-tensei", "Mushoku Tensei"),
    ("the-seven-deadly-sins", "The Seven Deadly Sins"),
    ("dr-stone", "Dr. Stone"),
    ("that-time-i-got-reincarnated-as-a-slime", "That Time I Got Reincarnated as a Slime"),
    ("spirited-away", "Spirited Away"),
    ("your-name", "Your Name"),
    ("a-silent-voice", "A Silent Voice"),
    ("akira", "Akira"),
    ("howls-moving-castle", "Howl's Moving Castle"),
    ("princess-mononoke", "Princess Mononoke"),
    ("my-neighbor-totoro", "My Neighbor Totoro"),
    ("grave-of-the-fireflies", "Grave of the Fireflies"),
    ("weathering-with-you", "Weathering With You"),
    ("perfect-blue", "Perfect Blue"),
    ("cowboy-bebop", "Cowboy Bebop"),
    ("steins-gate", "Steins;Gate"),
    ("code-geass", "Code Geass"),
    ("monster", "Monster"),
    ("berserk-1997", "Berserk (1997)"),
    ("samurai-champloo", "Samurai Champloo"),
    ("serial-experiments-lain", "Serial Experiments Lain"),
    ("ghost-in-the-shell", "Ghost in the Shell"),
    ("mobile-suit-gundam", "Mobile Suit Gundam"),
    ("astro-boy", "Astro Boy"),
    ("frieren-beyond-journeys-end", "Frieren: Beyond Journey's End"),
    ("the-apothecary-diaries", "The Apothecary Diaries"),
    ("oshi-no-ko", "Oshi no Ko"),
    ("mob-psycho-100", "Mob Psycho 100"),
    ("kaguya-sama-love-is-war", "Kaguya-sama: Love Is War"),
    ("made-in-abyss", "Made in Abyss"),
    ("cyberpunk-edgerunners", "Cyberpunk: Edgerunners"),
    ("the-promised-neverland", "The Promised Neverland"),
    ("classroom-of-the-elite", "Classroom of the Elite"),
    ("hellsing-ultimate", "Hellsing Ultimate")
]

os.makedirs('public/anime', exist_ok=True)

for i, (slug, title) in enumerate(cards_info):
    r = i // 10
    c = i % 10
    
    y1 = y_starts[r]
    y2 = y1 + card_h
    x1 = x_starts[c]
    x2 = x1 + card_w
    
    cropped = img.crop((x1, y1, x2, y2))
    output_path = f"public/anime/{slug}.webp"
    cropped.save(output_path, "WEBP", quality=95)

print(f"Extracted all {len(cards_info)} anime images into public/anime/ successfully!")
