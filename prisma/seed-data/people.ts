import { additionalPeople } from "./people-additional";

export const people = [
  {
    slug: "osamu-tezuka",
    name: "Osamu Tezuka",
    japaneseName: "手塚 治虫",
    role: "Director · Creator · Manga artist",
    bornYear: 1928,
    diedYear: 1989,
    birthplace: "Toyonaka, Osaka Prefecture, Japan",
    biography:
      "Physician turned manga artist, Osamu Tezuka is called the 'God of Manga' for works such as Astro Boy, Kimba the White Lion, and Black Jack. In 1961 he founded Mushi Production and brought Astro Boy to television in 1963, inventing the limited-animation model that made anime an industry.",
    career:
      "Debuted professionally in 1946; created New Treasure Island (1947) and Astro Boy (1952 manga); his film-style paneling transformed manga. Founded Mushi Production (1961); produced Japan's first TV anime series Astro Boy (1963). Continued innovating with experimental works until his death in 1989.",
    majorWorks:
      "Astro Boy, Kimba the White Lion, Black Jack, Phoenix, Buddha",
    awards:
      "Shogakukan Manga Award (1962, 1974), Bungeishunjū Manga Award (1971), Kodansha Manga Award (1984), posthumous Lifetime Achievement award at the 2004 Eisner Awards",
    contribution:
      "Created the economic and artistic foundations of the anime industry; his limited-animation techniques and production model are still used worldwide.",
  },
  {
    slug: "hayao-miyazaki",
    name: "Hayao Miyazaki",
    japaneseName: "宮崎 駿",
    role: "Director · Animator · Manga artist",
    bornYear: 1941,
    birthplace: "Akebono-cho, Tokyo, Japan",
    biography:
      "Co-founder of Studio Ghibli and one of the most celebrated animation directors in the world. His films — Nausicaä, My Neighbor Totoro, Princess Mononoke, Spirited Away, The Boy and the Heron — combine hand-drawn artistry, flight, nature, and deeply humane storytelling.",
    career:
      "Joined Toei Doga in 1963; worked on Lupin III before directing his first feature, The Castle of Cagliostro (1979). Co-founded Studio Ghibli in 1985. Spirited Away (2001) won the Academy Award for Best Animated Feature (2003).",
    majorWorks:
      "Spirited Away, Princess Mononoke, My Neighbor Totoro, Nausicaä of the Valley of the Wind, The Castle of Cagliostro, Howl's Moving Castle",
    awards:
      "Academy Award for Best Animated Feature (Spirited Away, 2003), Golden Bear at Berlin (2002), Honorary Oscar (2014), Lifetime Achievement at the Venice Film Festival (2005)",
    contribution:
      "Brought Japanese animation to the pinnacle of international recognition and artistic respect.",
  },
  {
    slug: "isao-takahata",
    name: "Isao Takahata",
    japaneseName: "高畑 勲",
    role: "Director · Producer",
    bornYear: 1935,
    diedYear: 2018,
    birthplace: "Ujiyamada (now Ise), Mie Prefecture, Japan",
    biography:
      "Studio Ghibli's co-founder and the director of Grave of the Fireflies, Only Yesterday, and The Tale of the Princess Kaguya. Takahata was a mentor to Hayao Miyazaki and a master of realism and emotional restraint.",
    career:
      "Joined Toei Doga in 1959; directed the 1968 feature The Great Adventure of Horus, Prince of the Sun, a landmark of ambitious animation. Directed the beloved TV series Anne of Green Gables (1979). Co-founded Ghibli; his 2013 film The Tale of the Princess Kaguya was nominated for an Academy Award.",
    majorWorks:
      "Grave of the Fireflies, The Tale of the Princess Kaguya, Only Yesterday, Pom Poko, Anne of Green Gables",
    awards:
      "Academy Award nomination for The Tale of the Princess Kaguya (2015); Grand Prix at Annecy for Kaguya (2015)",
    contribution:
      "Championed realism, psychological depth, and literary adaptation in animation; mentored Miyazaki and generations of Ghibli artists.",
  },
  {
    slug: "satoshi-kon",
    name: "Satoshi Kon",
    japaneseName: "今 敏",
    role: "Director · Writer",
    bornYear: 1963,
    diedYear: 2010,
    birthplace: "Kushiro, Hokkaido, Japan",
    biography:
      "A manga artist turned director who died tragically young in 2010, Satoshi Kon directed four extraordinary features — Perfect Blue, Millennium Actress, Paprika, and Tokyo Godfathers — all built on seamless editing, dreams within dreams, and identity.",
    career:
      "Debuted as a manga artist in 1984; worked as a screenwriter and animator before directing Perfect Blue (1997). Paprika (2006) directly inspired elements of Hollywood films such as Inception.",
    majorWorks:
      "Perfect Blue, Millennium Actress, Tokyo Godfathers, Paprika, Paranoia Agent",
    awards:
      "Best Animation Film at Fantasia (Perfect Blue, 1998); Jury Prize at Annecy (Millennium Actress, 2001)",
    contribution:
      "Redefined the grammar of psychological anime cinema; his editing techniques influenced directors worldwide, including Christopher Nolan.",
  },
  {
    slug: "katsuhiro-otomo",
    name: "Katsuhiro Otomo",
    japaneseName: "大友 克洋",
    role: "Director · Manga artist · Writer",
    bornYear: 1954,
    birthplace: "Tome, Miyagi Prefecture, Japan",
    biography:
      "Manga artist and film director whose manga Akira (1982–1990) and its 1988 film adaptation became the emblem of anime's global breakthrough. His dense linework and cinematic storytelling redefined manga in the 1980s.",
    career:
      "Began publishing experimental manga in 1973. Akira (1988) cost an unprecedented ¥1.1 billion and required over 160,000 animation cels; its success launched anime's international expansion. Later directed Steamboy (2004).",
    majorWorks:
      "Akira (manga and film), Domu: A Child's Dream, Memories, Steamboy",
    awards:
      "Kodansha Manga Award (1983), Grand Prix at the Annecy Festival for Akira (1988), Grand Prix at Fantasia (1989)",
    contribution:
      "Proved a film could be made with feature-film craft and adult themes, opening the door for worldwide anime distribution.",
  },
  {
    slug: "mamoru-oshii",
    name: "Mamoru Oshii",
    japaneseName: "押井 守",
    role: "Director",
    bornYear: 1951,
    birthplace: "Tokyo, Japan",
    biography:
      "An idiosyncratic director of philosophical science fiction, Oshii directed Urusei Yatsura, the Patlabor films, and Ghost in the Shell (1995), whose influence on cyberpunk cinema — including The Matrix — is well documented.",
    career:
      "Joined Tatsunoko Production in 1977; moved to Studio Pierrot, then co-founded Studio Deen (1981). Ghost in the Shell (1995) became the first anime film to top Billboard's video chart in the US. Its 2004 sequel Innocence competed at Cannes.",
    majorWorks:
      "Ghost in the Shell, Innocence, Patlabor 2: The Movie, Urusei Yatsura 2: Beautiful Dreamer",
    awards:
      "Nihon SF Taisho Award special mention (1995); Innocence nominated for the Palme d'Or (2004)",
    contribution:
      "The definitive artist of anime's cyberpunk era; his visual language was directly absorbed by Hollywood.",
  },
  {
    slug: "hideaki-anno",
    name: "Hideaki Anno",
    japaneseName: "庵野 秀明",
    role: "Director · Writer · Producer",
    bornYear: 1960,
    birthplace: "Ube, Yamaguchi Prefecture, Japan",
    biography:
      "Co-founder of Gainax and creator of Neon Genesis Evangelion (1995), whose psychological deconstruction of the mecha genre changed anime forever. Anno is also a celebrated live-action director (Shin Godzilla, 2016).",
    career:
      "An animator on Nausicaä (1984) known for his mecha and explosion animation. Evangelion (1995) was a phenomenon that defined 1990s anime. Founded Studio Khara in 2006 and completed the four-film Rebuild of Evangelion series in 2021.",
    majorWorks:
      "Neon Genesis Evangelion, The End of Evangelion, Shin Godzilla, Rebuild of Evangelion series",
    awards:
      "Best Film at the Japan Academy Film Prize for Shin Godzilla (2017); numerous animation festival honors for Evangelion",
    contribution:
      "Took the mecha genre apart from the inside, turning giant robots into instruments of psychological storytelling and reshaping anime's relationship with fandom.",
  },
  {
    slug: "makoto-shinkai",
    name: "Makoto Shinkai",
    japaneseName: "新海 誠",
    role: "Director · Writer",
    bornYear: 1973,
    birthplace: "Koumi, Nagano Prefecture, Japan",
    biography:
      "A solo animator who became the most commercially successful anime director of the 2010s. His films — from the self-made short Voices of a Distant Star (2002) to Your Name (2016) and Suzume (2022) — are defined by breathtaking sky imagery and stories of distance and longing.",
    career:
      "Worked at Falcom as a game designer before independently producing Voices of a Distant Star in 2002. Your Name (2016) earned over ¥40 billion worldwide, becoming the highest-grossing anime film until Demon Slayer's 2020 film.",
    majorWorks:
      "Your Name, Weathering with You, Suzume, 5 Centimeters per Second, The Garden of Words",
    awards:
      "Grand Prize at the 59th Minister of Education Award; Your Name won Best Animated Film at the 49th Sitges Film Festival; multiple Mainichi Film Awards",
    contribution:
      "Brought a new generation of global audiences to anime cinema with visually stunning, emotionally universal stories.",
  },
  {
    slug: "yoshiyuki-tomino",
    name: "Yoshiyuki Tomino",
    japaneseName: "富野 由悠季",
    role: "Director · Writer",
    bornYear: 1941,
    birthplace: "Odawara, Kanagawa Prefecture, Japan",
    biography:
      "Creator and director of Mobile Suit Gundam (1979), the series that founded the 'real robot' genre and one of the most valuable franchises in entertainment history.",
    career:
      "Joined Mushi Production in 1963, writing and directing on Astro Boy-era shows. Directed Zambot 3 and Ideon before Gundam (1979), which initially struggled on TV but exploded on reruns and theatrical compilations, leading to the Gunpla plastic model phenomenon.",
    majorWorks:
      "Mobile Suit Gundam, Zeta Gundam, Char's Counterattack, Turn A Gundam, Ideon",
    awards:
      "Winner of the 55th Minister of Education's Art Encouragement Award (2013); Kodansha Manga Award for manga adaptation work",
    contribution:
      "Introduced realism, war, and character tragedy into the robot genre — the single most influential creative shift in anime's TV history.",
  },
  {
    slug: "leiji-matsumoto",
    name: "Leiji Matsumoto",
    japaneseName: "松本 零士",
    role: "Creator · Manga artist",
    bornYear: 1938,
    diedYear: 2023,
    birthplace: "Kurume, Fukuoka Prefecture, Japan",
    biography:
      "Manga creator of cosmic romances — Space Battleship Yamato, Galaxy Express 999, Captain Harlock — whose elegant, melancholy space operas shaped Japanese science fiction.",
    career:
      "Debuted in shōjo manga in 1953. His 1974 Space Battleship Yamato defined the space-opera era and is credited with rescuing anime from a mid-1970s downturn by attracting adult audiences to TV anime.",
    majorWorks:
      "Space Battleship Yamato, Galaxy Express 999, Captain Harlock, Queen Emeraldas",
    awards:
      "Shogakukan Manga Award (1972), Purple Ribbon Medal from the Japanese government (2012), Légion d'Honneur (2012)",
    contribution:
      "His space epics proved anime could be serialized drama for adults, directly enabling the 1980s golden age.",
  },
  {
    slug: "noboru-ishiguro",
    name: "Noboru Ishiguro",
    japaneseName: "石黒 昇",
    role: "Director",
    bornYear: 1938,
    diedYear: 2012,
    birthplace: "Tokyo, Japan",
    biography:
      "Director of Space Battleship Yamato (1974) and Macross (1982), who brought cinematic scale and dramatic pacing to television anime.",
    career:
      "Worked at Mushi Production and others in the 1960s before directing Yamato — a series credited with reviving TV anime — and Super Dimension Fortress Macross, whose love-triangle drama and idol music set the template for decades of anime.",
    majorWorks:
      "Space Battleship Yamato, Super Dimension Fortress Macross, Macross: Do You Remember Love?",
    contribution:
      "Directed the two series that defined Japanese TV science fiction in the 1970s–80s.",
  },
  {
    slug: "akira-toriyama",
    name: "Akira Toriyama",
    japaneseName: "鳥山 明",
    role: "Creator · Manga artist",
    bornYear: 1955,
    diedYear: 2024,
    birthplace: "Nagoya, Aichi Prefecture, Japan",
    biography:
      "Creator of Dr. Slump and Dragon Ball, the manga and anime that defined shōnen action worldwide for four decades. Toriyama died on March 1, 2024 at age 68.",
    career:
      "Debuted in 1978; Dr. Slump (1980) won the Shogakukan Manga Award. Dragon Ball began in 1984; its 1986 anime became a global phenomenon from Latin America to Africa to Europe.",
    majorWorks:
      "Dragon Ball, Dragon Ball Z, Dr. Slump, Sand Land, character designs for Dragon Quest and Chrono Trigger",
    awards:
      "Shogakukan Manga Award (1981), Chevalier of the Ordre des Arts et des Lettres (2019)",
    contribution:
      "His fight-manga grammar — power levels, tournaments, transformations — became the international language of action animation.",
  },
  {
    slug: "naoko-takeuchi",
    name: "Naoko Takeuchi",
    japaneseName: "武内 直子",
    role: "Creator · Manga artist",
    bornYear: 1967,
    birthplace: "Kofu, Yamanashi Prefecture, Japan",
    biography:
      "Creator of Sailor Moon, the magical-girl classic that became a global symbol of girl-power animation and a landmark of 1990s popular culture.",
    career:
      "Debuted in 1986 while studying pharmacy. Sailor Moon (1991–1997 manga) and its 1992 anime spawned a worldwide franchise of toys, musicals, and merchandise.",
    majorWorks:
      "Sailor Moon, Codename: Sailor V",
    awards:
      "Kodansha Manga Award (1993) for Sailor Moon",
    contribution:
      "Reframed the magical-girl genre around team dynamics and empowered heroines; the anime's US broadcasts in the 1990s were a gateway to anime for millions.",
  },
  {
    slug: "eiichiro-oda",
    name: "Eiichiro Oda",
    japaneseName: "尾田 栄一郎",
    role: "Creator · Manga artist",
    bornYear: 1975,
    birthplace: "Kumamoto Prefecture, Japan",
    biography:
      "Creator of One Piece, the best-selling manga in history. Its anime adaptation, running since 1999, is among the longest-running anime series ever produced.",
    career:
      "Debuted in 1997 with One Piece, which set the Guinness World Record for the most copies published of a single comic series. The anime premiered October 20, 1999 and has aired continuously since.",
    majorWorks:
      "One Piece, Romance Dawn",
    awards:
      "Guinness World Records (best-selling manga series, most copies published), Ministry of Education Award for Young Artists (2018)",
    contribution:
      "One Piece is the living bridge between classic shōnen adventure and the streaming era, with a global fanbase of hundreds of millions.",
  },
  {
    slug: "masashi-kishimoto",
    name: "Masashi Kishimoto",
    japaneseName: "岸本 斉史",
    role: "Creator · Manga artist",
    bornYear: 1974,
    birthplace: "Nagi, Okayama Prefecture, Japan",
    biography:
      "Creator of Naruto, one of the defining shōnen series of the 2000s, adapted into an anime that aired 2002–2017 and became a global phenomenon.",
    career:
      "Debuted with Karakuri in 1996; Naruto ran in Weekly Shōnen Jump from 1999 to 2014. The anime aired in over 80 countries.",
    majorWorks:
      "Naruto, Naruto: Shippuden, Boruto (story supervisor)",
    contribution:
      "His ninja-world epic carried anime's global expansion through the 2000s, especially in the Americas.",
  },
  {
    slug: "shinichiro-watanabe",
    name: "Shinichirō Watanabe",
    japaneseName: "渡辺 信一郎",
    role: "Director",
    bornYear: 1965,
    birthplace: "Kyoto Prefecture, Japan",
    biography:
      "Director of Cowboy Bebop and Samurai Champloo, who fused music, cinema, and anime into a signature style of cool, cosmopolitan storytelling.",
    career:
      "Worked at Sunrise in the late 1980s; directorial debut with Macross Plus (1994). Cowboy Bebop (1998) became one of the most internationally beloved anime series ever made.",
    majorWorks:
      "Cowboy Bebop, Samurai Champloo, Kids on the Slope, Space Dandy",
    awards:
      "Starling Award at Anime Expo (1999); several Tokyo Anime Awards for Bebop and Champloo",
    contribution:
      "Made jazz-cool, adult-toned, and musically driven anime accessible to a global audience.",
  },
  {
    slug: "tetsuro-araki",
    name: "Tetsurō Araki",
    japaneseName: "荒木 哲郎",
    role: "Director",
    bornYear: 1976,
    birthplace: "Tokyo, Japan",
    biography:
      "Director of Death Note and Attack on Titan, two of the most influential anime of the 2000s–2010s, known for theatrical action and emotional intensity.",
    career:
      "Debuted at Madhouse with Death Note (2006); directed High School of the Dead and Guilty Crown; Attack on Titan (2013) at Wit Studio became a worldwide hit.",
    majorWorks:
      "Attack on Titan, Death Note, Kabaneri of the Iron Fortress",
    contribution:
      "His blockbuster direction carried anime's streaming-era breakthrough.",
  },
  {
    slug: "koyoharu-gotouge",
    name: "Koyoharu Gotouge",
    japaneseName: "吾峠 呼世晴",
    role: "Creator · Manga artist",
    bornYear: 1989,
    birthplace: "Fukuoka Prefecture, Japan",
    biography:
      "The pen-named, famously reclusive creator of Demon Slayer: Kimetsu no Yaiba, the manga whose anime adaptation became the biggest film phenomenon in anime history.",
    career:
      "Debuted in 2016 with Demon Slayer in Weekly Shōnen Jump. The 2019 anime and 2020 film Mugen Train broke box office records worldwide, with the film surpassing Spirited Away's 22-year record in Japan.",
    majorWorks:
      "Demon Slayer: Kimetsu no Yaiba",
    contribution:
      "Demon Slayer's anime (2019–) redefined the scale of anime media-mix success in the streaming era.",
  },
  {
    slug: "minoru-okazaki",
    name: "Minoru Okazaki",
    japaneseName: "岡崎 稔",
    role: "Director",
    bornYear: 1937,
    diedYear: 2023,
    biography:
      "Series director of the original Dragon Ball anime (1986), who gave Toriyama's manga its fast, funny, tournament-driven rhythm on television.",
    career:
      "A veteran of Mushi Production and later freelance television direction, Okazaki led Dragon Ball from 1986 to 1989 before handing over to the Dragon Ball Z era.",
    majorWorks: "Dragon Ball, Magical Angel Creamy Mami, Pastel Yumi",
    contribution:
      "Set the comedic-action tone that made Dragon Ball a global television institution.",
  },
  {
    slug: "junichi-sato",
    name: "Junichi Sato",
    japaneseName: "佐藤 順一",
    role: "Director",
    bornYear: 1960,
    biography:
      "Director of Sailor Moon's first television series (1992), whose balance of comedy, romance, and ensemble magic defined the modern magical-girl genre.",
    career:
      "Joined Toei Animation in 1983, directing Sailor Moon (1992), then creating the Ojamajo Doremi franchise and directing Princess Tutu and Kaleido Star.",
    majorWorks: "Sailor Moon, Ojamajo Doremi, Princess Tutu",
    contribution:
      "Established the modern ensemble magical-girl formula that the genre still follows.",
  },
  {
    slug: "konosuke-uda",
    name: "Konosuke Uda",
    japaneseName: "宇田 鋼之介",
    role: "Director",
    bornYear: 1970,
    biography:
      "First series director of the One Piece anime (1999–2006), guiding the Straw Hats through the show's foundational decade.",
    career:
      "Joined Toei Animation in the 1990s; directed One Piece from 1999, then worked on Toriko and sports anime at Toei.",
    majorWorks: "One Piece, Toriko",
    contribution:
      "Established the visual and tonal identity of the longest-running shōnen anime of its era.",
  },
  {
    slug: "hayato-date",
    name: "Hayato Date",
    japaneseName: "伊達 勇登",
    role: "Director",
    bornYear: 1962,
    biography:
      "Series director of Naruto (2002–2007), who translated Kishimoto's ninja saga into the defining shōnen television hit of the 2000s.",
    career:
      "Directed Naruto and its Naruto: Shippuden sequel at Studio Pierrot, along with Samurai Deeper Kyo and other action series.",
    majorWorks: "Naruto, Naruto: Shippuden",
    contribution:
      "Built Naruto's television voice, one of the most-watched anime series of its generation.",
  },
  {
    slug: "hiromu-arakawa",
    name: "Hiromu Arakawa",
    japaneseName: "荒川 弘",
    role: "Creator · Manga artist",
    bornYear: 1973,
    birthplace: "Hokkaido, Japan",
    biography:
      "The farm-raised manga artist behind Fullmetal Alchemist, whose decade-long serialization ended in perfect sync with the 2009 Brotherhood adaptation — a rarity in shōnen anime.",
    career:
      "Debuted in 1999; began Fullmetal Alchemist in 2001. Its 64-episode Brotherhood adaptation (2009–10) is routinely ranked the greatest anime series of all time in polls.",
    majorWorks: "Fullmetal Alchemist, Silver Spoon",
    awards: "Shogakukan Manga Award (2011), multiple ranking polls for FMA: Brotherhood",
    contribution:
      "Wrote one of the most structurally complete shōnen manga ever, faithfully adapted to television.",
  },
  {
    slug: "yasuhiro-irie",
    name: "Yasuhiro Irie",
    japaneseName: "入江 泰浩",
    role: "Director",
    bornYear: 1971,
    biography:
      "Director of Fullmetal Alchemist: Brotherhood (2009), who coordinated the famously faithful 64-episode adaptation in parallel with the manga's conclusion.",
    career:
      "A key animator at Sunrise and Bones before directing FMA: Brotherhood, then co-founded Studio Bonzō.",
    majorWorks: "Fullmetal Alchemist: Brotherhood, Birdy the Mighty: Decode",
    contribution:
      "Delivered the benchmark faithful adaptation of the 2000s.",
  },
  {
    slug: "naoko-yamada",
    name: "Naoko Yamada",
    japaneseName: "山田 尚子",
    role: "Director",
    bornYear: 1984,
    biography:
      "Kyoto Animation's premier director, who brought K-On! (2009), A Silent Voice (2016), and Liz and the Blue Bird to life with an unmatched sensitivity to gesture and feeling.",
    career:
      "Joined Kyoto Animation in 2005; made her directorial debut with K-On! in 2009, followed by K-On!!, Tamako Market, and the acclaimed films A Silent Voice and Liz and the Blue Bird.",
    majorWorks: "K-On!, A Silent Voice, Liz and the Blue Bird, The Colors Within",
    contribution:
      "A leading voice in modern anime direction, elevating quiet human emotion into cinematic art.",
  },
  {
    slug: "kakifly",
    name: "Kakifly",
    japaneseName: "かきふらい",
    role: "Creator · Manga artist",
    biography:
      "The pen-named creator of the K-On! four-panel manga (2007–2010), whose relaxed high-school band comedy became one of the most influential works of the moe-slice-of-life genre.",
    career:
      "Published the original K-On! in Manga Time Kirara; the Kyoto Animation adaptation (2009) turned the series into a global phenomenon.",
    majorWorks: "K-On!",
    contribution:
      "Wrote the source material that inaugurated the modern slice-of-life anime boom.",
  },
  {
    slug: "hajime-isayama",
    name: "Hajime Isayama",
    japaneseName: "諫山 創",
    role: "Creator · Manga artist",
    bornYear: 1986,
    birthplace: "Oyama, Ōita Prefecture, Japan",
    biography:
      "Creator of Attack on Titan (2009–2021), the manga whose anime adaptation became the defining global phenomenon of the 2010s and one of the most argued stories in modern entertainment.",
    career:
      "Began Attack on Titan in 2009; the 2013 anime made it a worldwide sensation, ending in 2023 after ten years of appointment television.",
    majorWorks: "Attack on Titan",
    awards: "Kodansha Manga Award (2011); the anime won numerous international awards",
    contribution:
      "Wrote a decade-defining epic that proved anime could command global mainstream attention.",
  },
  {
    slug: "haruo-sotozaki",
    name: "Haruo Sotozaki",
    japaneseName: "外崎 春雄",
    role: "Director",
    bornYear: 1965,
    biography:
      "Director of Demon Slayer: Kimetsu no Yaiba (2019–), whose theatrical framing and Ufotable's digital craft produced the highest-grossing anime film in history.",
    career:
      "A long-time Ufotable director, Sotozaki helmed Demon Slayer's television seasons and films, including Mugen Train (2020).",
    majorWorks: "Demon Slayer: Kimetsu no Yaiba, Tales of Zestiria the X",
    contribution:
      "Directed the anime phenomenon that redefined the commercial ceiling of the medium.",
  },
  {
    slug: "gege-akutami",
    name: "Gege Akutami",
    japaneseName: "芥見 下々",
    role: "Creator · Manga artist",
    bornYear: 1992,
    biography:
      "The pen-named creator of Jujutsu Kaisen (2018–2024), the fastest-selling manga in history at its peak and the flagship shōnen franchise of the 2020s.",
    career:
      "Debuted with the one-shot Kamitachi no Hi in 2013; Jujutsu Kaisen began in 2018 and its 2020 anime made the franchise a global phenomenon.",
    majorWorks: "Jujutsu Kaisen",
    contribution:
      "Wrote the defining action manga of the 2020s, adapted into a landmark anime by MAPPA.",
  },
  {
    slug: "sunghoo-park",
    name: "Sunghoo Park",
    japaneseName: "朴 性厚",
    role: "Director",
    biography:
      "Korean-Japanese director of Jujutsu Kaisen's first season (2020) and the film Jujutsu Kaisen 0 (2021), whose kinetic action staging set new standards for television animation.",
    career:
      "Worked as an animator at Studio MAPPA before directing Jujutsu Kaisen; founded his own studio, E&H production, in 2021.",
    majorWorks: "Jujutsu Kaisen, Jujutsu Kaisen 0, Yuri on Ice (animation director)",
    contribution:
      "Modernized shōnen action choreography for the streaming era.",
  },
  {
    slug: "kanehito-yamada",
    name: "Kanehito Yamada",
    japaneseName: "山田 鐘人",
    role: "Creator · Writer",
    biography:
      "Writer of Frieren: Beyond Journey's End (2020–present), the post-victory fantasy that became the most acclaimed manga and anime of the early 2020s.",
    career:
      "Wrote the original Frieren story, drawn by Tsukasa Abe, in Weekly Shōnen Sunday; the 2023 anime adaptation won Anime of the Year at the Crunchyroll Anime Awards.",
    majorWorks: "Frieren: Beyond Journey's End",
    contribution:
      "Invented a contemplative new mode of fantasy storytelling that resonated globally.",
  },
  {
    slug: "keiichiro-saito",
    name: "Keiichirō Saitō",
    japaneseName: "斎藤 圭一郎",
    role: "Director",
    biography:
      "Director of Frieren: Beyond Journey's End (2023), whose restrained, literary direction made stillness itself a spectacle.",
    career:
      "An animator at Kyoto Animation, then an acclaimed episode director on Bocchi the Rock! before directing Frieren at Madhouse.",
    majorWorks: "Frieren: Beyond Journey's End, Bocchi the Rock! (series director)",
    contribution:
      "Directed the modern classic that proved quiet drama could command the anime mainstream.",
  },
  {
    slug: "masamune-shirow",
    name: "Masamune Shirow",
    japaneseName: "士郎 正宗",
    role: "Creator · Manga artist",
    bornYear: 1961,
    biography:
      "Manga artist and creator of Ghost in the Shell (1989), whose vision of cybernetic identity anticipated the networked age and defined cyberpunk's Japanese branch.",
    career:
      "Debuted in the 1980s; Ghost in the Shell (1989–1991) was adapted into the landmark 1995 film directed by Mamoru Oshii.",
    majorWorks: "Ghost in the Shell, Appleseed, Dominion: Tank Police",
    contribution:
      "Provided the source material and aesthetic foundation of anime's most influential cyberpunk works.",
  },
  {
    slug: "hiroyuki-imaishi",
    name: "Hiroyuki Imaishi",
    japaneseName: "今石 洋之",
    role: "Director · Animator",
    bornYear: 1971,
    biography:
      "Founder of Studio Trigger and one of anime's most explosive action directors, from Gurren Lagann to Cyberpunk: Edgerunners.",
    career:
      "A key Gainax animator on Evangelion and FLCL; directed Gurren Lagann (2007) and Panty & Stocking before founding Trigger in 2011.",
    majorWorks: "Gurren Lagann, Kill la Kill, Promare, Cyberpunk: Edgerunners",
    contribution:
      "Carried the maximalist, independent spirit of 1990s studio anime into the streaming era.",
  },
  {
    slug: "masao-maruyama",
    name: "Masao Maruyama",
    japaneseName: "丸山 正雄",
    role: "Producer · Founder",
    bornYear: 1941,
    biography:
      "Co-founder of Madhouse (1972) and MAPPA (2011), and the producer behind Akira, Perfect Blue, and Paprika — a kingmaker of ambitious anime.",
    career:
      "Founded Madhouse with Mushi Production colleagues; produced Otomo's and Kon's films; founded MAPPA in 2011 before stepping back to found Studio M2.",
    majorWorks: "Produced: Akira, Perfect Blue, Millennium Actress, Paprika, Yojouhan",
    contribution:
      "Championed the most artistically ambitious productions of three decades of anime.",
  },
  {
    slug: "yoshihiro-togashi",
    name: "Yoshihiro Togashi",
    japaneseName: "冨樫 義博",
    role: "Creator · Manga artist",
    bornYear: 1966,
    birthplace: "Shinjuku, Tokyo, Japan",
    biography:
      "Creator of Yu Yu Hakusho and Hunter × Hunter, Togashi is one of the most influential shōnen storytellers of his generation, known for intricate power systems and morally complex characters.",
    career:
      "Debuted in 1986; Yu Yu Hakusho (1990) became a smash hit, and Hunter × Hunter (1998) redefined shōnen depth with its Nen combat system.",
    majorWorks: "Yu Yu Hakusho, Hunter × Hunter, Level E",
    awards: "Shogakukan Manga Award (1993); Tezuka Osamu Cultural Prize nomination",
    contribution:
      "Elevated battle manga into a vehicle for psychological and tactical depth.",
  },
  {
    slug: "tite-kubo",
    name: "Tite Kubo",
    japaneseName: "久保 帯人",
    role: "Creator · Manga artist",
    bornYear: 1977,
    birthplace: "Hiroshima Prefecture, Japan",
    biography:
      "Creator of Bleach, one of the 'Big Three' of shōnen anime, known for his stylish swordsmanship, fashion-forward character design, and atmospheric urban fantasy.",
    career:
      "Debuted in 1996; Bleach (2001) ran for 15 years in Weekly Shōnen Jump and its anime spanned 366 episodes.",
    majorWorks: "Bleach, Burn the Witch",
    awards: "Shogakukan Manga Award (2004); honored for the Thousand-Year Blood War anime (2022–23)",
    contribution:
      "One of the defining voices of 2000s shōnen manga and anime.",
  },
  {
    slug: "satoshi-tajiri",
    name: "Satoshi Tajiri",
    japaneseName: "田尻 智",
    role: "Creator · Game designer",
    bornYear: 1965,
    birthplace: "Machida, Tokyo, Japan",
    biography:
      "The creator of Pokémon, whose collecting-and-trading creature concept grew into the largest media franchise in the world, with an anime series that has aired since 1997.",
    career:
      "Founded Game Freak in 1989; Pokémon Red/Green (1996) launched the franchise; the anime followed in 1997.",
    majorWorks: "Pokémon, the media franchise; founder of Game Freak",
    awards: "Recognized as one of the architects of the Pokémon phenomenon",
    contribution:
      "Created a franchise that introduced millions of children worldwide to anime and Japanese pop culture.",
  },
  {
    slug: "kohei-horikoshi",
    name: "Kōhei Horikoshi",
    japaneseName: "堀越 耕平",
    role: "Creator · Manga artist",
    bornYear: 1986,
    birthplace: "Aichi Prefecture, Japan",
    biography:
      "Creator of My Hero Academia, the flagship superhero anime of the streaming era and one of the best-selling manga of the 2010s.",
    career:
      "Debuted in 2007; My Hero Academia (2014) ran in Weekly Shōnen Jump until 2024, with a globally popular anime since 2016.",
    majorWorks: "My Hero Academia, Barrage, Oumagadoki Doubutsuen",
    awards: "Best-selling manga awards; multiple Crunchyroll Anime Award nominations",
    contribution:
      "Reinvented the superhero genre for anime, becoming a defining franchise of the 2010s–2020s.",
  },
  {
    slug: "reki-kawahara",
    name: "Reki Kawahara",
    japaneseName: "川原 礫",
    role: "Creator · Author",
    bornYear: 1974,
    birthplace: "Tochigi Prefecture, Japan",
    biography:
      "Author of Sword Art Online, the light novel series that became a worldwide phenomenon and a landmark of the isekai genre.",
    career:
      "Wrote SAO originally as a web novel (2002) before its 2009 publication; the anime began in 2012 and spawned films and a global franchise.",
    majorWorks: "Sword Art Online, Accel World, The Isolator",
    awards: "SAO is among the best-selling light novel series ever",
    contribution:
      "Helped popularize isekai and VRMMO fiction for a global audience.",
  },
  {
    slug: "sui-ishida",
    name: "Sui Ishida",
    japaneseName: "石田 スイ",
    role: "Creator · Manga artist",
    bornYear: 1986,
    birthplace: "Fukuoka Prefecture, Japan",
    biography:
      "Creator of Tokyo Ghoul, the dark urban fantasy that became a major anime hit of 2014 and a global bestseller.",
    career:
      "Debuted in 2011; Tokyo Ghoul (2011–2014) ran in Weekly Young Jump; its anime premiered in 2014.",
    majorWorks: "Tokyo Ghoul, Choujin X",
    awards: "Multiple award nominations; the franchise has sold tens of millions of volumes",
    contribution:
      "Defined the 2010s dark-fantasy aesthetic in anime and manga.",
  },
  {
    slug: "yuki-tabata",
    name: "Yūki Tabata",
    japaneseName: "田畠 裕基",
    role: "Creator · Manga artist",
    bornYear: 1984,
    birthplace: "Nagasaki Prefecture, Japan",
    biography:
      "Creator of Black Clover, the long-running fantasy battle manga whose anime became a weekly fixture from 2017 to 2021.",
    career:
      "Debuted in 2011; Black Clover (2015) ran in Weekly Shōnen Jump with a 170-episode anime.",
    majorWorks: "Black Clover, Hungry Joker",
    awards: "Shogakukan Manga Award nomination",
    contribution:
      "Carried the shōnen action tradition into the late 2010s.",
  },
  {
    slug: "hiro-mashima",
    name: "Hiro Mashima",
    japaneseName: "真島 ヒロ",
    role: "Creator · Manga artist",
    bornYear: 1977,
    birthplace: "Nagano Prefecture, Japan",
    biography:
      "Creator of Fairy Tail and Edens Zero, one of the most prolific shōnen storytellers of the 2000s–2010s.",
    career:
      "Debuted in 1998; Fairy Tail (2006) ran for a decade with a beloved 328-episode anime beginning in 2009.",
    majorWorks: "Rave Master, Fairy Tail, Edens Zero",
    awards: "Kodansha Manga Award (2009)",
    contribution:
      "Built one of the most popular friendship-and-fantasy franchises of the 2010s.",
  },
  {
    slug: "haruichi-furudate",
    name: "Haruichi Furudate",
    japaneseName: "古舘 春一",
    role: "Creator · Manga artist",
    bornYear: 1983,
    birthplace: "Iwate Prefecture, Japan",
    biography:
      "Creator of Haikyū!!, the volleyball manga whose anime (2014) became one of the most beloved sports anime of all time.",
    career:
      "Debuted in 2006; Haikyū!! (2012) ran in Weekly Shōnen Jump until 2020; the anime spawned films concluding the story in 2024.",
    majorWorks: "Haikyū!!, Kiben Gakuha",
    awards: "Shogakukan Manga Award (2016); honored for the franchise's global popularity",
    contribution:
      "Revived the sports genre and set a new standard for athletic, character-driven competition anime.",
  },
  {
    slug: "hirohiko-araki",
    name: "Hirohiko Araki",
    japaneseName: "荒木 飛呂彦",
    role: "Creator · Manga artist",
    bornYear: 1960,
    birthplace: "Sendai, Miyagi Prefecture, Japan",
    biography:
      "Creator of JoJo's Bizarre Adventure, the decades-spanning saga running since 1987 whose anime (2012) became a global cultural phenomenon.",
    career:
      "Debuted in 1980; JoJo's Bizarre Adventure (1987–present) has been adapted into six anime parts and films.",
    majorWorks: "JoJo's Bizarre Adventure, Baoh, The Lives of Eo",
    awards: "Tezuka Osamu Cultural Prize (2022); exhibited at the Louvre (2009)",
    contribution:
      "Created one of the most influential and meme-permeated manga/anime franchises of all time.",
  },
  {
    slug: "tatsuki-fujimoto",
    name: "Tatsuki Fujimoto",
    japaneseName: "藤本 タツキ",
    role: "Creator · Manga artist",
    bornYear: 1992,
    birthplace: "Nichinan, Miyazaki Prefecture, Japan",
    biography:
      "Creator of Chainsaw Man, the boundary-pushing manga whose 2022 anime adaptation by MAPPA was a global event.",
    career:
      "Debuted in 2013; Chainsaw Man (2018) ran in Weekly Shōnen Jump; its anime premiered in October 2022.",
    majorWorks: "Chainsaw Man, Fire Punch, Look Back, Goodbye, Eri",
    awards: "Harvey Award (2021); multiple 'best manga' honors",
    contribution:
      "One of the defining voices of 2020s manga and anime, known for chaotic sincerity and cinematic storytelling.",
  },
  {
    slug: "tatsuya-endo",
    name: "Tatsuya Endō",
    japaneseName: "遠藤 達哉",
    role: "Creator · Manga artist",
    bornYear: 1980,
    birthplace: "Ibaraki Prefecture, Japan",
    biography:
      "Creator of Spy × Family, the family-comedy spy manga whose anime (2022) became an immediate worldwide hit.",
    career:
      "Debuted in 2000; Spy × Family (2019) runs in Shōnen Jump+; its anime premiered in April 2022.",
    majorWorks: "Spy × Family, Tista, Gekka Bijin",
    awards: "Shogakukan Manga Award (2021); multiple Crunchyroll Anime Award wins",
    contribution:
      "Created one of the most beloved and broadly appealing anime of the 2020s.",
  },
  {
    slug: "muneyuki-kaneshiro",
    name: "Muneyuki Kaneshiro",
    japaneseName: "金城 宗幸",
    role: "Creator · Writer",
    bornYear: 1985,
    birthplace: "Osaka Prefecture, Japan",
    biography:
      "Creator of Blue Lock, the 'egoist' football manga whose anime (2022) became a worldwide sports phenomenon.",
    career:
      "Debuted in 2013; Blue Lock (2018) runs in Weekly Shōnen Magazine; the anime premiered in October 2022.",
    majorWorks: "Blue Lock, Kami-sama no Iu Toori (with Akeji Fujimura)",
    awards: "Kodansha Manga Award (2021); the franchise is among the decade's biggest sports hits",
    contribution:
      "Reinvented the sports genre around ruthless individual ambition.",
  },
  {
    slug: "makoto-yukimura",
    name: "Makoto Yukimura",
    japaneseName: "幸村 誠",
    role: "Creator · Manga artist",
    bornYear: 1976,
    birthplace: "Yokohama, Kanagawa Prefecture, Japan",
    biography:
      "Creator of Vinland Saga, the historical epic acclaimed as one of the greatest manga of its generation, adapted into a celebrated anime (2019) by WIT and MAPPA.",
    career:
      "Debuted in 1999; Planetes ran 1999–2004; Vinland Saga (2005–present) is his masterpiece.",
    majorWorks: "Vinland Saga, Planetes",
    awards: "Kodansha Manga Award (2009); Harvey and Eisner Award nominations",
    contribution:
      "Brought literary, historical depth to the shōnen seinen epic.",
  },
  {
    slug: "tappei-nagatsuki",
    name: "Tappei Nagatsuki",
    japaneseName: "長月 達平",
    role: "Creator · Author",
    bornYear: 1987,
    birthplace: "Tokyo, Japan",
    biography:
      "Author of Re:Zero − Starting Life in Another World, the isekai series whose anime (2016) became a landmark of the genre.",
    career:
      "Wrote Re:Zero as a web novel (2012) before its 2014 publication; the anime premiered in April 2016.",
    majorWorks: "Re:Zero − Starting Life in Another World",
    awards: "The series is among the best-selling isekai franchises of its era",
    contribution:
      "Brought psychological trauma and nonlinear storytelling to mainstream isekai.",
  },
  {
    slug: "rifujin-na-magonote",
    name: "Rifujin na Magonote",
    japaneseName: "理不尽な孫の手",
    role: "Creator · Author",
    biography:
      "Author of Mushoku Tensei: Jobless Reincarnation, the foundational isekai novel whose 2021 anime redefined the genre's production ambitions.",
    career:
      "Wrote Mushoku Tensei as a web novel (2012) before its 2014 publication; the anime premiered in January 2021.",
    majorWorks: "Mushoku Tensei: Jobless Reincarnation",
    awards: "The series is considered the archetypal modern isekai",
    contribution:
      "Established the modern isekai template and influenced a decade of the genre.",
  },
  {
    slug: "nakaba-suzuki",
    name: "Nakaba Suzuki",
    japaneseName: "鈴木 央",
    role: "Creator · Manga artist",
    bornYear: 1977,
    birthplace: "Sukagawa, Fukushima Prefecture, Japan",
    biography:
      "Creator of The Seven Deadly Sins, the fantasy battle manga whose anime (2014) was one of Netflix's first global anime hits.",
    career:
      "Debuted in 1994; The Seven Deadly Sins (2012) ran in Weekly Shōnen Magazine until 2020.",
    majorWorks: "The Seven Deadly Sins, Kongō Banchō, Rising Impact",
    awards: "Kodansha Manga Award (2015)",
    contribution:
      "One of the key franchises of Netflix's early anime expansion.",
  },
  {
    slug: "riichiro-inagaki",
    name: "Riichiro Inagaki",
    japaneseName: "稲垣 理一郎",
    role: "Creator · Writer",
    bornYear: 1975,
    birthplace: "Tokyo, Japan",
    biography:
      "Creator of Dr. Stone, the science-adventure manga whose anime (2019) became a beloved modern hit, and co-creator of Eyeshield 21.",
    career:
      "Debuted in 2002 with Eyeshield 21; Dr. Stone (2017) ran in Weekly Shōnen Jump until 2022.",
    majorWorks: "Eyeshield 21, Dr. Stone",
    awards: "Shogakukan Manga Award (2019)",
    contribution:
      "Made science education thrilling, a rare feat in battle manga.",
  },
  {
    slug: "fuse",
    name: "Fuse",
    japaneseName: "伏瀬",
    role: "Creator · Author",
    biography:
      "Author of That Time I Got Reincarnated as a Slime, the isekai novel whose anime (2018) became one of the most popular franchises of the decade.",
    career:
      "Wrote the series as a web novel (2013) before its 2014 publication; the anime premiered in October 2018.",
    majorWorks: "That Time I Got Reincarnated as a Slime",
    awards: "The franchise is among the best-selling light novel series in the world",
    contribution:
      "Created one of the defining isekai franchises of the 2010s–2020s.",
  },
  {
    slug: "yoshitoki-oima",
    name: "Yoshitoki Ōima",
    japaneseName: "大今 良時",
    role: "Creator · Manga artist",
    bornYear: 1989,
    birthplace: "Ōgaki, Gifu Prefecture, Japan",
    biography:
      "Creator of A Silent Voice, the acclaimed manga about bullying and redemption, adapted into Kyoto Animation's 2016 film.",
    career:
      "Debuted in 2008; A Silent Voice (2013) ran in Weekly Shōnen Magazine; the film premiered in September 2016.",
    majorWorks: "A Silent Voice, To Your Eternity",
    awards: "Kodansha Manga Award (2015); the film won the Japan Academy Prize for Animation of the Year",
    contribution:
      "One of the most sensitive and important works about disability and forgiveness in modern manga.",
  },
  {
    slug: "naoki-urasawa",
    name: "Naoki Urasawa",
    japaneseName: "浦沢 直樹",
    role: "Creator · Manga artist",
    bornYear: 1960,
    birthplace: "Fuchū, Tokyo, Japan",
    biography:
      "One of the greatest manga storytellers alive, creator of Monster, 20th Century Boys, and Pluto, acclaimed for thriller mastery and humanist depth.",
    career:
      "Debuted in 1981; Monster (1994) ran until 2001; its anime aired 2004–2005.",
    majorWorks: "Monster, 20th Century Boys, Pluto, Yawara!, Billy Bat",
    awards: "Shogakukan Manga Award (1999); Tezuka Osamu Cultural Prize (2001); multiple international awards",
    contribution:
      "Brought literary thriller storytelling to manga and anime at a level rarely seen.",
  },
  {
    slug: "kentaro-miura",
    name: "Kentaro Miura",
    japaneseName: "三浦 建太郎",
    role: "Creator · Manga artist",
    bornYear: 1966,
    diedYear: 2021,
    birthplace: "Chiba Prefecture, Japan",
    biography:
      "Creator of Berserk, the dark-fantasy masterpiece whose 1997 anime adaptation remains a landmark of the genre and whose artwork is among the most detailed in manga history.",
    career:
      "Debuted in 1985; Berserk (1989) ran until his death in 2021; the 1997 anime was produced by OLM.",
    majorWorks: "Berserk, King of Wolves, Duranki",
    awards: "Tezuka Osamu Cultural Prize nomination; Berserk is cited as an influence by creators worldwide",
    contribution:
      "Set the standard for dark fantasy in manga and anime.",
  },
  {
    slug: "chiaki-konaka",
    name: "Chiaki J. Konaka",
    japaneseName: "小中 千昭",
    role: "Writer · Screenwriter",
    bornYear: 1961,
    birthplace: "Tokyo, Japan",
    biography:
      "Screenwriter and creator of Serial Experiments Lain, the 1998 cyberpunk landmark about identity and the networked self.",
    career:
      "Wrote for Ultraman and numerous anime; Serial Experiments Lain (1998) is his defining work.",
    majorWorks: "Serial Experiments Lain, Digimon Tamers, The Big O",
    awards: "Serial Experiments Lain is a touchstone of 1990s experimental anime",
    contribution:
      "Predicted the internet's effects on identity and culture years before social media.",
  },
  {
    slug: "natsu-hyuuga",
    name: "Natsu Hyūga",
    japaneseName: "日向 夏",
    role: "Creator · Author",
    biography:
      "Author of The Apothecary Diaries, the mystery novel series whose 2023 anime became a worldwide critical and commercial hit.",
    career:
      "Wrote the series as a web novel (2011) before its 2012 publication; the anime premiered in October 2023.",
    majorWorks: "The Apothecary Diaries",
    awards: "The anime won Anime of the Year honors at multiple 2024 awards",
    contribution:
      "Revived the historical mystery genre for modern audiences.",
  },
  {
    slug: "aka-akasaka",
    name: "Aka Akasaka",
    japaneseName: "赤坂 アカ",
    role: "Creator · Manga artist",
    bornYear: 1988,
    birthplace: "Miyazaki Prefecture, Japan",
    biography:
      "Creator of Kaguya-sama: Love Is War and Oshi no Ko, two of the most acclaimed manga of the late 2010s–2020s, both adapted into major anime hits.",
    career:
      "Debuted in 2011; Kaguya-sama (2015) ran until 2022; Oshi no Ko (2020) is ongoing.",
    majorWorks: "Kaguya-sama: Love Is War, Oshi no Ko, Instant Bullet",
    awards: "Kodansha Manga Award (2020); Oshi no Ko's anime premiere set streaming records",
    contribution:
      "One of the defining comedic and dramatic voices of modern manga.",
  },
  {
    slug: "akihito-tsukushi",
    name: "Akihito Tsukushi",
    japaneseName: "つくし あきひと",
    role: "Creator · Manga artist",
    bornYear: 1979,
    birthplace: "Okayama Prefecture, Japan",
    biography:
      "Creator of Made in Abyss, the beloved dark-fantasy adventure manga adapted into an acclaimed anime (2017) by Kinema Citrus.",
    career:
      "Debuted in 2012; Made in Abyss (2012–present) is his masterpiece.",
    majorWorks: "Made in Abyss",
    awards: "The anime won multiple awards including the Crunchyroll Anime Award for Best Fantasy",
    contribution:
      "Created one of the most imaginative and emotionally devastating worlds in modern anime.",
  },
  {
    slug: "kaiu-shirai",
    name: "Kaiu Shirai",
    japaneseName: "白井 カイウ",
    role: "Creator · Writer",
    bornYear: 1988,
    birthplace: "Shizuoka Prefecture, Japan",
    biography:
      "Co-creator of The Promised Neverland, the psychological thriller manga adapted into a hit anime (2019) by CloverWorks.",
    career:
      "Debuted in 2015; The Promised Neverland (2016) ran in Weekly Shōnen Jump until 2020.",
    majorWorks: "The Promised Neverland, Tista",
    awards: "The anime won multiple 'Best Thriller' honors",
    contribution:
      "Brought tense, child-protagonist thriller storytelling to mainstream shōnen.",
  },
  {
    slug: "syougo-kinugasa",
    name: "Shōgo Kinugasa",
    japaneseName: "衣笠 彰梧",
    role: "Creator · Author",
    biography:
      "Author of Classroom of the Elite, the school thriller light novel series adapted into a major anime (2017) by Lerche.",
    career:
      "Debuted as a visual novel writer; Classroom of the Elite (2015) is his signature series.",
    majorWorks: "Classroom of the Elite",
    awards: "The franchise is among the best-selling light novel series of its decade",
    contribution:
      "Created one of the defining school-drama franchises of the 2010s–2020s.",
  },
  {
    slug: "kouta-hirano",
    name: "Kouta Hirano",
    japaneseName: "平野 耕太",
    role: "Creator · Manga artist",
    bornYear: 1973,
    birthplace: "Adachi, Tokyo, Japan",
    biography:
      "Creator of Hellsing and Drifters, known for his hyperviolent, cinematic action manga; Hellsing Ultimate (2006–2012) is a landmark of the OVA format.",
    career:
      "Debuted in 1996; Hellsing (1997) ran until 2008; the anime adaptations include the 2001 TV series and the 10-episode Hellsing Ultimate OVAs.",
    majorWorks: "Hellsing, Hellsing Ultimate, Drifters",
    awards: "Hellsing Ultimate is one of the best-selling OVA series in anime history",
    contribution:
      "Defined the ultraviolent gothic action aesthetic in anime.",
  },
  {
    slug: "one",
    name: "ONE",
    japaneseName: "ワン",
    role: "Creator · Manga artist",
    biography:
      "Creator of One-Punch Man and Mob Psycho 100, two of the most influential webcomic-born manga of the 2010s, both adapted into acclaimed anime.",
    career:
      "Self-published One-Punch Man (2009) as a webcomic; its remade manga (2012) became a global hit; Mob Psycho 100 (2012) followed.",
    majorWorks: "One-Punch Man, Mob Psycho 100",
    awards: "One-Punch Man won the 2012 Next Manga Award web division",
    contribution:
      "Proved indie webcomics could become global anime franchises.",
  },
  {
    slug: "chugong",
    name: "Chugong",
    japaneseName: "추공",
    role: "Creator · Author",
    biography:
      "Author of Solo Leveling, the South Korean web novel whose manhwa and 2024 anime adaptation (by A-1 Pictures) became a worldwide phenomenon.",
    career:
      "Published Solo Leveling (2016) as a web novel; the manhwa (2018) and anime (2024) followed.",
    majorWorks: "Solo Leveling",
    awards: "The anime's premiere set Crunchyroll viewing records",
    contribution:
      "Introduced manhwa and the 'leveling' genre to a massive global anime audience.",
  },
  {
    slug: "goro-taniguchi",
    name: "Gorō Taniguchi",
    japaneseName: "谷口 悟朗",
    role: "Director",
    bornYear: 1966,
    birthplace: "Aichi Prefecture, Japan",
    biography:
      "Director of Code Geass, the mecha-political masterpiece that became one of the most popular anime of the 2000s.",
    career:
      "Joined Sunrise in 1994; directed Code Geass (2006–2008) and later one of its film recaps.",
    majorWorks: "Code Geass, Gunparade March, Infinite Ryvius",
    awards: "Code Geass won multiple Tokyo Anime Awards",
    contribution:
      "One of the architects of the modern political-thriller mecha anime.",
  },
  {
    slug: "hiroshi-hamasaki",
    name: "Hiroshi Hamasaki",
    japaneseName: "浜崎 博嗣",
    role: "Director",
    bornYear: 1965,
    birthplace: "Tokyo, Japan",
    biography:
      "Director of Steins;Gate (2011) and Steins;Gate 0, adapting the science-fiction visual novel into one of the highest-rated anime ever made.",
    career:
      "Debuted in the 1990s; Steins;Gate is his defining work.",
    majorWorks: "Steins;Gate, Steins;Gate 0, Texhnolyze",
    awards: "Steins;Gate has ranked among the top anime on international aggregators for over a decade",
    contribution:
      "Brought visual-novel storytelling to the pinnacle of anime criticism.",
  },
  {
    slug: "ryutaro-nakamura",
    name: "Ryūtarō Nakamura",
    japaneseName: "中村 隆太郎",
    role: "Director",
    bornYear: 1955,
    diedYear: 2013,
    birthplace: "Kobe, Hyogo Prefecture, Japan",
    biography:
      "Director of Serial Experiments Lain (1998), the defining cyberpunk anime about identity and the internet.",
    career:
      "Debuted in the 1980s; Serial Experiments Lain is his most celebrated work.",
    majorWorks: "Serial Experiments Lain, Armitage III, Colorful",
    awards: "Serial Experiments Lain is a touchstone of experimental 1990s anime",
    contribution:
      "Created one of the most influential and prescient works about networked identity.",
  },
  {
    slug: "shingo-natsume",
    name: "Shingo Natsume",
    japaneseName: "夏目 真悟",
    role: "Director",
    bornYear: 1980,
    birthplace: "Fukuoka Prefecture, Japan",
    biography:
      "Director of One-Punch Man (2015) and Mob Psycho 100 (2016–2022), two of the most acclaimed action anime of the 2010s.",
    career:
      "Debuted in 2006; One-Punch Man's first season made him a star director.",
    majorWorks: "One-Punch Man, Mob Psycho 100, Space Dandy, Sonny Boy",
    awards: "Multiple Crunchyroll Anime Award wins for Mob Psycho 100",
    contribution:
      "One of the defining action directors of the streaming era.",
  },
  {
    slug: "ryu-nakayama",
    name: "Ryū Nakayama",
    japaneseName: "中山 竜",
    role: "Director",
    bornYear: 1987,
    birthplace: "Tokyo, Japan",
    biography:
      "Director of the 2022 Chainsaw Man anime, whose cinematic style and film-language storytelling made it a global event.",
    career:
      "Worked as an episode director and storyboarder before Chainsaw Man; directed the 2025 Chainsaw Man – The Movie: Reze Arc.",
    majorWorks: "Chainsaw Man, Chainsaw Man – The Movie: Reze Arc",
    awards: "Chainsaw Man won multiple Crunchyroll Anime Awards",
    contribution:
      "Brought feature-film language to television anime production.",
  },
  {
    slug: "shunsuke-nakashige",
    name: "Shunsuke Nakashige",
    japaneseName: "中重 俊祐",
    role: "Director",
    bornYear: 1980,
    birthplace: "Japan",
    biography:
      "Director of Solo Leveling (2024), the global breakout isekai-fantasy of the streaming era, produced by A-1 Pictures.",
    career:
      "Worked as an episode director and animation director before helming Solo Leveling, which became one of the most-watched anime premieres on streaming platforms.",
    majorWorks: "Solo Leveling",
    awards: "Solo Leveling won multiple Crunchyroll Anime Awards",
    contribution:
      "Directed one of the defining power-fantasy adaptations of the 2020s.",
  },
  {
    slug: "masaaki-yuasa",
    name: "Masaaki Yuasa",
    japaneseName: "湯浅 政明",
    role: "Director · Animator",
    bornYear: 1965,
    birthplace: "Fukuoka Prefecture, Japan",
    biography: "Acclaimed auteur director known for freeform, kinetic animation and bold visual storytelling across Devilman Crybaby, Keep Your Hands Off Eizouken!, Ping Pong the Animation, and The Tatami Galaxy.",
    majorWorks: "Devilman Crybaby, Keep Your Hands Off Eizouken!, Mind Game, Ping Pong the Animation",
    awards: "Annecy Cristal for Best Feature, Japan Media Arts Festival Grand Prize",
    contribution: "Pioneered expressive digital animation in Japan.",
  },
  {
    slug: "mamoru-hosoda",
    name: "Mamoru Hosoda",
    japaneseName: "細田 守",
    role: "Director · Animator",
    bornYear: 1967,
    birthplace: "Toyama Prefecture, Japan",
    biography: "Academy Award-nominated feature director and co-founder of Studio Chizu, famous for The Girl Who Leapt Through Time, Summer Wars, Wolf Children, and Belle.",
    majorWorks: "The Girl Who Leapt Through Time, Summer Wars, Wolf Children, Mirai, Belle",
    awards: "Academy Award nomination (Mirai), multiple Japan Academy Film Prizes",
    contribution: "Modern master of family, virtual worlds, and coming-of-age animation.",
  },
  {
    slug: "akiyuki-shinbo",
    name: "Akiyuki Shinbo",
    japaneseName: "新房 昭之",
    role: "Director",
    bornYear: 1961,
    birthplace: "Fukushima Prefecture, Japan",
    biography: "Chief director of Shaft, famous for creating the visual aesthetics of Puella Magi Madoka Magica, the Monogatari series, and March Comes In Like a Lion.",
    majorWorks: "Puella Magi Madoka Magica, Bakemonogatari, March Comes In Like a Lion",
    awards: "Tokyo Anime Award for Best Director, Japan Media Arts Festival Grand Prize",
    contribution: "Revolutionized avant-garde television anime direction with bold typography and theatrical framing.",
  },
  {
    slug: "rumiko-takahashi",
    name: "Rumiko Takahashi",
    japaneseName: "高橋 留美子",
    role: "Creator · Manga artist",
    bornYear: 1957,
    birthplace: "Niigata, Japan",
    biography: "One of the most successful manga artists in history, creator of Urusei Yatsura, Maison Ikkoku, Ranma 1/2, and Inuyasha.",
    majorWorks: "Inuyasha, Urusei Yatsura, Ranma 1/2, Maison Ikkoku",
    awards: "Grand Prix de la ville d'Angoulême, Shogakukan Manga Award, Eisner Hall of Fame",
    contribution: "Queen of romantic comedy and fantasy adventure manga.",
  },
  {
    slug: "takehiko-inoue",
    name: "Takehiko Inoue",
    japaneseName: "井上 雄彦",
    role: "Creator · Director",
    bornYear: 1967,
    birthplace: "Kagoshima Prefecture, Japan",
    biography: "Legendary manga artist and director behind Slam Dunk, Vagabond, and Real; directed the blockbuster film The First Slam Dunk (2022).",
    majorWorks: "Slam Dunk, The First Slam Dunk, Vagabond, Real",
    awards: "Japan Academy Film Prize for Animation of the Year, Tezuka Osamu Cultural Prize",
    contribution: "Elevated sports and historical manga to fine art.",
  },
  {
    slug: "fujiko-f-fujio",
    name: "Fujiko F. Fujio",
    japaneseName: "藤子・F・不二雄",
    role: "Creator · Manga artist",
    bornYear: 1933,
    diedYear: 1996,
    birthplace: "Toyama Prefecture, Japan",
    biography: "Legendary creator of Doraemon, Japan's national cultural ambassador character, and numerous beloved children's sci-fi manga.",
    majorWorks: "Doraemon, Perman, Ninja Hattori-kun",
    awards: "Tezuka Osamu Cultural Prize, Japanese Cartoonists Association Award",
    contribution: "Created the most iconic children's fantasy franchise in Japanese history.",
  },
  {
    slug: "monkey-punch",
    name: "Monkey Punch",
    japaneseName: "モンキー・パンチ",
    role: "Creator · Manga artist",
    bornYear: 1937,
    diedYear: 2019,
    birthplace: "Hokkaido, Japan",
    biography: "Creator of Lupin the 3rd (Lupin III), the gentleman thief franchise that influenced generations of anime creators from Miyazaki to Watanabe.",
    majorWorks: "Lupin III, Cinderella Boy",
    awards: "Tokyo Anime Award Lifetime Achievement",
    contribution: "Created Japan's most stylish and enduring crime caper franchise.",
  },
  {
    slug: "tatsuo-yoshida",
    name: "Tatsuo Yoshida",
    japaneseName: "吉田 竜夫",
    role: "Creator · Producer",
    bornYear: 1932,
    diedYear: 1977,
    birthplace: "Kyoto, Japan",
    biography: "Co-founder of Tatsunoko Production and creator of Speed Racer (Mach GoGoGo) and Science Ninja Team Gatchaman.",
    majorWorks: "Speed Racer, Gatchaman, Casshan",
    awards: "Pioneer in international anime syndication",
    contribution: "Introduced high-octane action hero storytelling to worldwide television.",
  },
  {
    slug: "kiyotaka-oshiyama",
    name: "Kiyotaka Oshiyama",
    japaneseName: "押山 清高",
    role: "Director · Animator",
    bornYear: 1982,
    birthplace: "Fukushima Prefecture, Japan",
    biography: "Visionary animator and director behind Flip Flappers and the critically acclaimed 2024 theatrical adaptation of Tatsuki Fujimoto's Look Back.",
    majorWorks: "Look Back, Flip Flappers, Devilman Crybaby (key animator)",
    awards: "Critically acclaimed at international film festivals",
    contribution: "Master animator championing independent hand-drawn theatrical craft.",
  },
  {
    slug: "jun-maeda",
    name: "Jun Maeda",
    japaneseName: "麻田 准",
    role: "Writer · Composer",
    bornYear: 1975,
    birthplace: "Mie Prefecture, Japan",
    biography: "Co-founder of Key and master of emotional 'nakige' visual novels and anime, creating Clannad, Angel Beats!, and Kanon.",
    majorWorks: "Clannad, Clannad After Story, Angel Beats!, Kanon",
    awards: "Pioneer of modern tearjerker drama in Japanese media",
    contribution: "Defined the emotional storytelling style of 2000s anime.",
  },
  {
    slug: "norihiko-naganuma",
    name: "Norihiko Naganuma",
    japaneseName: "長沼 範裕",
    role: "Director · Storyboard Artist",
    bornYear: 1974,
    birthplace: "Kanagawa Prefecture, Japan",
    biography: "Japanese animation director and series director known for helming The Ancient Magus' Bride and directing and writing series composition for The Apothecary Diaries Season 2.",
    majorWorks: "The Ancient Magus' Bride, The Apothecary Diaries Season 2, Kimi ni Todoke",
    awards: "Crunchyroll Anime Awards nominations",
    contribution: "Brought nuanced atmosphere, delicate pacing, and high emotional craft to modern narrative drama.",
  },
  {
    slug: "fuga-yamashiro",
    name: "Fuga Yamashiro",
    japaneseName: "山代 風我",
    role: "Director · Storyboard Artist",
    bornYear: 1993,
    birthplace: "Japan",
    biography: "Director and animator at Science SARU. A key protégé of Masaaki Yuasa, he made his breakout television series directorial debut with the acclaimed 2024 adaptation of DanDaDan.",
    majorWorks: "DanDaDan, Keep Your Hands Off Eizouken! (episode director), The Heike Story (episode director)",
    awards: "Emerging Director acclaim for DanDaDan",
    contribution: "Pioneering hyper-dynamic camera movement and surreal comedic rhythm in 2020s television anime.",
  },
  {
    slug: "yukinobu-tatsu",
    name: "Yukinobu Tatsu",
    japaneseName: "龍 幸伸",
    role: "Creator · Manga artist",
    bornYear: 1984,
    birthplace: "Saitama Prefecture, Japan",
    biography: "Japanese manga artist who worked as an assistant to Tatsuki Fujimoto and Yuji Kaku before achieving massive global success with his Shonen Jump+ masterpiece DanDaDan in 2021.",
    majorWorks: "DanDaDan, Fire Punch (assistant), Chainsaw Man (assistant)",
    awards: "Next Manga Award (2021), Tsutaya Comic Award (2022)",
    contribution: "Created one of the most innovative and genre-blending action-comedy manga series of the 2020s.",
  },
  {
    slug: "shigeyuki-miya",
    name: "Shigeyuki Miya",
    japaneseName: "宮 繁之",
    role: "Director · Storyboard Artist",
    bornYear: 1975,
    birthplace: "Kanagawa Prefecture, Japan",
    biography: "Veteran animator and director who directed Production I.G's explosive adaptation of Kaiju No. 8, as well as Onihei, Blood Lad, and Buzzer Beater.",
    majorWorks: "Kaiju No. 8, Onihei, Blood Lad, Buzzer Beater",
    awards: "Mainstream television action acclaim",
    contribution: "Brought cinematic scope and hard-hitting military sci-fi pacing to modern monster action anime.",
  },
  {
    slug: "naoya-matsumoto",
    name: "Naoya Matsumoto",
    japaneseName: "松本 直也",
    role: "Creator · Manga artist",
    bornYear: 1982,
    birthplace: "Hyogo Prefecture, Japan",
    biography: "Manga creator who scored a massive worldwide phenomenon with Kaiju No. 8, serialized on Shonen Jump+ and setting multiple platform readership records.",
    majorWorks: "Kaiju No. 8, Neko Wappa!, Pochi Kuro",
    awards: "Next Manga Award (2021 Web Manga category #1)",
    contribution: "Reinvented the classic Japanese kaiju genre for modern international manga and anime audiences.",
  },
  {
    slug: "yoshihiro-miyajima",
    name: "Yoshihiro Miyajima",
    japaneseName: "宮島 善博",
    role: "Director · Storyboard Artist",
    bornYear: 1984,
    birthplace: "Kanagawa Prefecture, Japan",
    biography: "Studio Trigger director who helmed the universally acclaimed 2024 adaptation of Ryoko Kui's culinary fantasy epic Delicious in Dungeon (Dungeon Meshi).",
    majorWorks: "Delicious in Dungeon, SSSS.Dynazenon (episode director), Little Witch Academia (unit director)",
    awards: "Crunchyroll Anime Awards nominee",
    contribution: "Masterminded the blend of grounded culinary realism, high fantasy adventure, and Trigger's signature expressiveness.",
  },
  {
    slug: "ryoko-kui",
    name: "Ryoko Kui",
    japaneseName: "九井 諒子",
    role: "Creator · Manga artist",
    bornYear: 1985,
    birthplace: "Tokyo, Japan",
    biography: "Critically acclaimed manga creator celebrated for her rich imagination, meticulous ecological worldbuilding, and the multi-award-winning fantasy gourmet epic Delicious in Dungeon.",
    majorWorks: "Delicious in Dungeon, Terrarium in Drawer, The Dragon's School Is on the Mountain",
    awards: "Kono Manga ga Sugoi! #1 (2016), Comic Natalie Grand Prize, Seiun Award (2024)",
    contribution: "Created a modern fantasy benchmark that revitalized worldbuilding and ecological realism in manga.",
  },
  {
    slug: "shota-goshozono",
    name: "Shota Goshozono",
    japaneseName: "御所園 翔太",
    role: "Director · Animator · Storyboard Artist",
    bornYear: 1989,
    birthplace: "Saitama Prefecture, Japan",
    biography: "Known in the industry as 'Gosso', he directed Jujutsu Kaisen Season 2 (Hidden Inventory / Shibuya Incident) at MAPPA, pioneering digital-native staging, 3D layouts, and visceral action cinema.",
    majorWorks: "Jujutsu Kaisen Season 2, Chainsaw Man (episode director), Ranking of Kings (episode director)",
    awards: "Crunchyroll Anime Award for Best Director (2024)",
    contribution: "Pioneered a new visual grammar of camera choreography and digital compositing for 2020s action television.",
  },
  {
    slug: "yuichiro-hayashi",
    name: "Yuichiro Hayashi",
    japaneseName: "林 祐一郎",
    role: "Director · Storyboard Artist",
    bornYear: 1972,
    birthplace: "Tokyo, Japan",
    biography: "Distinguished director at MAPPA who shouldered the monumental task of directing Attack on Titan: The Final Season and The Final Chapters, as well as Dorohedoro and Kakegurui.",
    majorWorks: "Attack on Titan: The Final Season, Dorohedoro, Kakegurui, Garo: The Animation",
    awards: "International critical acclaim for concluding Attack on Titan",
    contribution: "Successfully brought one of the largest and most complex global television epics to its climactic conclusion.",
  },
  {
    slug: "aki-hamaji",
    name: "Aki Hamaji",
    japaneseName: "はまじ あき",
    role: "Creator · Manga artist",
    bornYear: 1993,
    birthplace: "Miyazaki Prefecture, Japan",
    biography: "Japanese manga artist and creator of the 4-panel musical comedy phenomenon Bocchi the Rock!, exploring social anxiety, indie rock bands, and youth culture with humor and heart.",
    majorWorks: "Bocchi the Rock!, Kirari Books Meikyuutan",
    awards: "Cultural and musical impact phenomenon",
    contribution: "Created the character Hitori Gotoh and ignited a worldwide resurgence in youth rock band participation.",
  },
  ...additionalPeople,
];

export const peopleMap = Object.fromEntries(people.map((p) => [p.slug, p]));
