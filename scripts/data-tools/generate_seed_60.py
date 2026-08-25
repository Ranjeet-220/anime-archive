import json

anime_data = [
    {"slug": "attack-on-titan", "title": "Attack on Titan", "japaneseTitle": "進撃の巨人", "year": 2013, "format": "TV", "episodeCount": 89, "studio": "wit-studio", "genres": ["action", "drama", "dark-fantasy"], "era": "streaming-era"},
    {"slug": "one-piece", "title": "One Piece", "japaneseTitle": "ONE PIECE", "year": 1999, "format": "TV", "episodeCount": 1100, "studio": "toei-animation", "genres": ["action", "adventure", "fantasy"], "era": "global-expansion"},
    {"slug": "naruto", "title": "Naruto", "japaneseTitle": "ナルト", "year": 2002, "format": "TV", "episodeCount": 220, "studio": "studio-pierrot", "genres": ["action", "adventure", "ninja"], "era": "digital-revolution"},
    {"slug": "dragon-ball-z", "title": "Dragon Ball Z", "japaneseTitle": "ドラゴンボールZ", "year": 1989, "format": "TV", "episodeCount": 291, "studio": "toei-animation", "genres": ["action", "adventure", "martial-arts"], "era": "golden-age"},
    {"slug": "death-note", "title": "Death Note", "japaneseTitle": "デスノート", "year": 2006, "format": "TV", "episodeCount": 37, "studio": "madhouse", "genres": ["mystery", "psychological", "thriller"], "era": "digital-revolution"},
    {"slug": "demon-slayer", "title": "Demon Slayer", "japaneseTitle": "鬼滅の刃", "year": 2019, "format": "TV", "episodeCount": 55, "studio": "ufotable", "genres": ["action", "supernatural", "historical"], "era": "streaming-era"},
    {"slug": "jujutsu-kaisen", "title": "Jujutsu Kaisen", "japaneseTitle": "呪術廻戦", "year": 2020, "format": "TV", "episodeCount": 47, "studio": "mappa", "genres": ["action", "supernatural", "dark-fantasy"], "era": "global-phenomenon"},
    {"slug": "fullmetal-alchemist-brotherhood", "title": "Fullmetal Alchemist: Brotherhood", "japaneseTitle": "鋼の錬金術師 FULLMETAL ALCHEMIST", "year": 2009, "format": "TV", "episodeCount": 64, "studio": "bones", "genres": ["action", "adventure", "drama"], "era": "digital-revolution"},
    {"slug": "hunter-x-hunter-2011", "title": "Hunter x Hunter (2011)", "japaneseTitle": "ハンター×ハンター", "year": 2011, "format": "TV", "episodeCount": 148, "studio": "madhouse", "genres": ["action", "adventure", "fantasy"], "era": "streaming-era"},
    {"slug": "bleach", "title": "Bleach", "japaneseTitle": "ブリーチ", "year": 2004, "format": "TV", "episodeCount": 366, "studio": "studio-pierrot", "genres": ["action", "adventure", "supernatural"], "era": "digital-revolution"},
    {"slug": "neon-genesis-evangelion", "title": "Neon Genesis Evangelion", "japaneseTitle": "新世紀エヴァンゲリオン", "year": 1995, "format": "TV", "episodeCount": 26, "studio": "gainax", "genres": ["mecha", "psychological", "drama"], "era": "global-expansion"},
    {"slug": "pokemon", "title": "Pokémon", "japaneseTitle": "ポケットモンスター", "year": 1997, "format": "TV", "episodeCount": 1000, "studio": "olm", "genres": ["adventure", "fantasy"], "era": "global-expansion"},
    {"slug": "my-hero-academia", "title": "My Hero Academia", "japaneseTitle": "僕のヒーローアカデミア", "year": 2016, "format": "TV", "episodeCount": 138, "studio": "bones", "genres": ["action", "superhero"], "era": "streaming-era"},
    {"slug": "one-punch-man", "title": "One Punch Man", "japaneseTitle": "ワンパンマン", "year": 2015, "format": "TV", "episodeCount": 24, "studio": "madhouse", "genres": ["action", "comedy", "superhero"], "era": "streaming-era"},
    {"slug": "sword-art-online", "title": "Sword Art Online", "japaneseTitle": "ソードアート・オンライン", "year": 2012, "format": "TV", "episodeCount": 25, "studio": "a1-pictures", "genres": ["action", "adventure", "science-fiction"], "era": "streaming-era"},
    {"slug": "tokyo-ghoul", "title": "Tokyo Ghoul", "japaneseTitle": "東京喰種 トーキョーグール", "year": 2014, "format": "TV", "episodeCount": 12, "studio": "studio-pierrot", "genres": ["action", "horror", "psychological"], "era": "streaming-era"},
    {"slug": "black-clover", "title": "Black Clover", "japaneseTitle": "ブラッククローバー", "year": 2017, "format": "TV", "episodeCount": 170, "studio": "studio-pierrot", "genres": ["action", "magic", "fantasy"], "era": "streaming-era"},
    {"slug": "fairy-tail", "title": "Fairy Tail", "japaneseTitle": "フェアリーテイル", "year": 2009, "format": "TV", "episodeCount": 328, "studio": "a1-pictures", "genres": ["action", "adventure", "magic"], "era": "digital-revolution"},
    {"slug": "haikyuu", "title": "Haikyuu!!", "japaneseTitle": "ハイキュー!!", "year": 2014, "format": "TV", "episodeCount": 85, "studio": "production-ig", "genres": ["sports", "comedy", "drama"], "era": "streaming-era"},
    {"slug": "jojos-bizarre-adventure", "title": "JoJo's Bizarre Adventure", "japaneseTitle": "ジョジョの奇妙な冒険", "year": 2012, "format": "TV", "episodeCount": 190, "studio": "david-production", "genres": ["action", "adventure", "supernatural"], "era": "streaming-era"},
    {"slug": "chainsaw-man", "title": "Chainsaw Man", "japaneseTitle": "チェンソーマン", "year": 2022, "format": "TV", "episodeCount": 12, "studio": "mappa", "genres": ["action", "horror", "dark-fantasy"], "era": "global-phenomenon"},
    {"slug": "solo-leveling", "title": "Solo Leveling", "japaneseTitle": "俺だけレベルアップな件", "year": 2024, "format": "TV", "episodeCount": 12, "studio": "a1-pictures", "genres": ["action", "fantasy"], "era": "global-phenomenon"},
    {"slug": "spy-x-family", "title": "Spy x Family", "japaneseTitle": "スパイファミリー", "year": 2022, "format": "TV", "episodeCount": 37, "studio": "wit-studio", "genres": ["action", "comedy", "slice-of-life"], "era": "global-phenomenon"},
    {"slug": "blue-lock", "title": "Blue Lock", "japaneseTitle": "ブルーロック", "year": 2022, "format": "TV", "episodeCount": 24, "studio": "eight-bit", "genres": ["sports", "psychological"], "era": "global-phenomenon"},
    {"slug": "vinland-saga", "title": "Vinland Saga", "japaneseTitle": "ヴィンランド・サガ", "year": 2019, "format": "TV", "episodeCount": 48, "studio": "wit-studio", "genres": ["action", "adventure", "historical"], "era": "streaming-era"},
    {"slug": "rezero", "title": "Re:Zero", "japaneseTitle": "Re:ゼロから始める異世界生活", "year": 2016, "format": "TV", "episodeCount": 50, "studio": "white-fox", "genres": ["fantasy", "psychological", "drama"], "era": "streaming-era"},
    {"slug": "mushoku-tensei", "title": "Mushoku Tensei", "japaneseTitle": "無職転生", "year": 2021, "format": "TV", "episodeCount": 24, "studio": "studio-bind", "genres": ["fantasy", "adventure", "isekai"], "era": "global-phenomenon"},
    {"slug": "the-seven-deadly-sins", "title": "The Seven Deadly Sins", "japaneseTitle": "七つの大罪", "year": 2014, "format": "TV", "episodeCount": 100, "studio": "a1-pictures", "genres": ["action", "adventure", "fantasy"], "era": "streaming-era"},
    {"slug": "dr-stone", "title": "Dr. Stone", "japaneseTitle": "ドクターストーン", "year": 2019, "format": "TV", "episodeCount": 35, "studio": "tms-entertainment", "genres": ["science-fiction", "adventure"], "era": "streaming-era"},
    {"slug": "that-time-i-got-reincarnated-as-a-slime", "title": "That Time I Got Reincarnated as a Slime", "japaneseTitle": "転生したらスライムだった件", "year": 2018, "format": "TV", "episodeCount": 48, "studio": "eight-bit", "genres": ["fantasy", "adventure", "isekai"], "era": "streaming-era"},
    {"slug": "spirited-away", "title": "Spirited Away", "japaneseTitle": "千と千尋の神隠し", "year": 2001, "format": "MOVIE", "episodeCount": 1, "studio": "studio-ghibli", "genres": ["fantasy", "adventure"], "era": "digital-revolution"},
    {"slug": "your-name", "title": "Your Name", "japaneseTitle": "君の名は。", "year": 2016, "format": "MOVIE", "episodeCount": 1, "studio": "comix-wave-films", "genres": ["romance", "fantasy"], "era": "streaming-era"},
    {"slug": "a-silent-voice", "title": "A Silent Voice", "japaneseTitle": "聲の形", "year": 2016, "format": "MOVIE", "episodeCount": 1, "studio": "kyoto-animation", "genres": ["drama", "romance"], "era": "streaming-era"},
    {"slug": "akira", "title": "Akira", "japaneseTitle": "アキラ", "year": 1988, "format": "MOVIE", "episodeCount": 1, "studio": "tms-entertainment", "genres": ["science-fiction", "cyberpunk"], "era": "golden-age"},
    {"slug": "howls-moving-castle", "title": "Howl's Moving Castle", "japaneseTitle": "ハウルの動く城", "year": 2004, "format": "MOVIE", "episodeCount": 1, "studio": "studio-ghibli", "genres": ["fantasy", "adventure"], "era": "digital-revolution"},
    {"slug": "princess-mononoke", "title": "Princess Mononoke", "japaneseTitle": "もののけ姫", "year": 1997, "format": "MOVIE", "episodeCount": 1, "studio": "studio-ghibli", "genres": ["adventure", "fantasy"], "era": "global-expansion"},
    {"slug": "my-neighbor-totoro", "title": "My Neighbor Totoro", "japaneseTitle": "となりのトトロ", "year": 1988, "format": "MOVIE", "episodeCount": 1, "studio": "studio-ghibli", "genres": ["fantasy", "slice-of-life"], "era": "golden-age"},
    {"slug": "grave-of-the-fireflies", "title": "Grave of the Fireflies", "japaneseTitle": "火垂るの墓", "year": 1988, "format": "MOVIE", "episodeCount": 1, "studio": "studio-ghibli", "genres": ["drama", "historical"], "era": "golden-age"},
    {"slug": "weathering-with-you", "title": "Weathering With You", "japaneseTitle": "天気の子", "year": 2019, "format": "MOVIE", "episodeCount": 1, "studio": "comix-wave-films", "genres": ["romance", "fantasy"], "era": "streaming-era"},
    {"slug": "perfect-blue", "title": "Perfect Blue", "japaneseTitle": "パーフェクトブルー", "year": 1997, "format": "MOVIE", "episodeCount": 1, "studio": "madhouse", "genres": ["psychological", "thriller"], "era": "global-expansion"},
    {"slug": "cowboy-bebop", "title": "Cowboy Bebop", "japaneseTitle": "カウボーイビバップ", "year": 1998, "format": "TV", "episodeCount": 26, "studio": "sunrise", "genres": ["science-fiction", "adventure"], "era": "global-expansion"},
    {"slug": "steins-gate", "title": "Steins;Gate", "japaneseTitle": "シュタインズ・ゲート", "year": 2011, "format": "TV", "episodeCount": 24, "studio": "white-fox", "genres": ["science-fiction", "thriller"], "era": "streaming-era"},
    {"slug": "code-geass", "title": "Code Geass", "japaneseTitle": "コードギアス 反逆のルルーシュ", "year": 2006, "format": "TV", "episodeCount": 50, "studio": "sunrise", "genres": ["action", "mecha", "drama"], "era": "digital-revolution"},
    {"slug": "monster", "title": "Monster", "japaneseTitle": "モンスター", "year": 2004, "format": "TV", "episodeCount": 74, "studio": "madhouse", "genres": ["mystery", "psychological", "thriller"], "era": "digital-revolution"},
    {"slug": "berserk-1997", "title": "Berserk (1997)", "japaneseTitle": "剣風伝奇ベルセルク", "year": 1997, "format": "TV", "episodeCount": 25, "studio": "olm", "genres": ["action", "dark-fantasy"], "era": "global-expansion"},
    {"slug": "samurai-champloo", "title": "Samurai Champloo", "japaneseTitle": "サムライチャンプルー", "year": 2004, "format": "TV", "episodeCount": 26, "studio": "manglobe", "genres": ["action", "adventure"], "era": "digital-revolution"},
    {"slug": "serial-experiments-lain", "title": "Serial Experiments Lain", "japaneseTitle": "シリアルエクスペリメンツレイン", "year": 1998, "format": "TV", "episodeCount": 13, "studio": "triangle-staff", "genres": ["science-fiction", "psychological"], "era": "global-expansion"},
    {"slug": "ghost-in-the-shell", "title": "Ghost in the Shell", "japaneseTitle": "攻殻機動隊", "year": 1995, "format": "MOVIE", "episodeCount": 1, "studio": "production-ig", "genres": ["science-fiction", "cyberpunk"], "era": "global-expansion"},
    {"slug": "mobile-suit-gundam", "title": "Mobile Suit Gundam", "japaneseTitle": "機動戦士ガンダム", "year": 1979, "format": "TV", "episodeCount": 43, "studio": "sunrise", "genres": ["mecha", "science-fiction"], "era": "television-era"},
    {"slug": "astro-boy", "title": "Astro Boy", "japaneseTitle": "鉄腕アトム", "year": 1963, "format": "TV", "episodeCount": 193, "studio": "mushi-production", "genres": ["science-fiction", "adventure"], "era": "television-era"},
    {"slug": "frieren-beyond-journeys-end", "title": "Frieren: Beyond Journey's End", "japaneseTitle": "葬送のフリーレン", "year": 2023, "format": "TV", "episodeCount": 28, "studio": "madhouse", "genres": ["fantasy", "adventure"], "era": "global-phenomenon"},
    {"slug": "the-apothecary-diaries", "title": "The Apothecary Diaries", "japaneseTitle": "薬屋のひとりごと", "year": 2023, "format": "TV", "episodeCount": 24, "studio": "toho-animation-studio", "genres": ["historical", "mystery"], "era": "global-phenomenon"},
    {"slug": "oshi-no-ko", "title": "Oshi no Ko", "japaneseTitle": "推しの子", "year": 2023, "format": "TV", "episodeCount": 11, "studio": "doga-kobo", "genres": ["drama", "psychological"], "era": "global-phenomenon"},
    {"slug": "mob-psycho-100", "title": "Mob Psycho 100", "japaneseTitle": "モブサイコ100", "year": 2016, "format": "TV", "episodeCount": 37, "studio": "bones", "genres": ["action", "supernatural", "comedy"], "era": "streaming-era"},
    {"slug": "kaguya-sama-love-is-war", "title": "Kaguya-sama: Love Is War", "japaneseTitle": "かぐや様は告らせたい", "year": 2019, "format": "TV", "episodeCount": 37, "studio": "a1-pictures", "genres": ["romance", "comedy"], "era": "streaming-era"},
    {"slug": "made-in-abyss", "title": "Made in Abyss", "japaneseTitle": "メイドインアビス", "year": 2017, "format": "TV", "episodeCount": 25, "studio": "kinema-citrus", "genres": ["adventure", "fantasy"], "era": "streaming-era"},
    {"slug": "cyberpunk-edgerunners", "title": "Cyberpunk: Edgerunners", "japaneseTitle": "サイバーパンク エッジランナーズ", "year": 2022, "format": "TV", "episodeCount": 10, "studio": "studio-trigger", "genres": ["action", "science-fiction"], "era": "global-phenomenon"},
    {"slug": "the-promised-neverland", "title": "The Promised Neverland", "japaneseTitle": "約束のネバーランド", "year": 2019, "format": "TV", "episodeCount": 23, "studio": "cloverworks", "genres": ["mystery", "thriller"], "era": "streaming-era"},
    {"slug": "classroom-of-the-elite", "title": "Classroom of the Elite", "japaneseTitle": "ようこそ実力至上主義の教室へ", "year": 2017, "format": "TV", "episodeCount": 38, "studio": "lerche", "genres": ["psychological", "drama"], "era": "streaming-era"},
    {"slug": "hellsing-ultimate", "title": "Hellsing Ultimate", "japaneseTitle": "ヘルシング", "year": 2006, "format": "OVA", "episodeCount": 10, "studio": "satelight", "genres": ["action", "horror", "supernatural"], "era": "digital-revolution"}
]

out = """import type { AnimeSeed } from "./anime-early";

export const anime60Cards: AnimeSeed[] = [
"""

for item in anime_data:
    out += f"""  {{
    slug: "{item['slug']}",
    coverUrl: "/anime-cards/{item['slug']}.webp",
    title: "{item['title']}",
    japaneseTitle: "{item['japaneseTitle']}",
    altTitles: ["{item['title']}"],
    synopsis: "Landmark anime series: {item['title']}, produced by {item['studio']} ({item['year']}).",
    releaseDate: "{item['year']}-01-01",
    year: {item['year']},
    format: "{item['format']}",
    episodeCount: {item['episodeCount']},
    duration: {24 if item['format'] == 'TV' else 110},
    status: "FINISHED",
    sourceMaterial: "Manga / Original",
    studio: "{item['studio']}",
    genreSlugs: {json.dumps(item['genres'])},
    eraSlug: "{item['era']}",
    characters: [],
    episodes: [],
    historicalSignificance: "One of the 60 defining anime masterpieces of modern animation history.",
    productionHistory: "Produced by {item['studio']}.",
    reception: "Critically acclaimed around the world.",
    awards: "Multiple awards and worldwide popularity.",
    culturalImpact: "Massive international fanbase and cultural legacy.",
    legacy: "Enduring classic of Japanese animation.",
    historyTimeline: [],
    related: [],
    sources: [],
  }},
"""

out += "];\n"

with open("prisma/seed-data/anime-60-cards.ts", "w", encoding="utf-8") as f:
    f.write(out)

print("Generated prisma/seed-data/anime-60-cards.ts with /anime-cards/ path successfully!")
