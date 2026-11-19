import type { AnimeFormat, AnimeStatus } from "@/generated/prisma/client";

export interface AnimeSeed {
  slug: string;
  title: string;
  japaneseTitle: string;
  altTitles: string[];
  synopsis: string;
  coverUrl?: string;
  releaseDate?: string;
  endDate?: string;
  year: number;
  format: AnimeFormat;
  episodeCount?: number;
  duration?: number;
  status: AnimeStatus;
  sourceMaterial: string;
  officialWebsite?: string;
  studio: string | null;
  creator?: string;
  director?: string;
  genreSlugs: string[];
  eraSlug: string;
  characters: { slug: string; name: string; japaneseName: string; role: string; biography: string; voiceActor: string }[];
  episodes: { number: number; title: string; airDate?: string; synopsis?: string }[];
  historicalSignificance: string;
  productionHistory: string;
  reception: string;
  awards: string;
  culturalImpact: string;
  legacy: string;
  historyTimeline: { label: string; year?: string; text: string }[];
  related: { slug: string; type: string }[];
  sources: { name: string; url: string; title: string }[];
}

export const animeEarly: AnimeSeed[] = [
  {
    slug: "namakura-gatana",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b6654-QUEjnBLm7u5s.png",
    title: "Namakura Gatana (Blunt Sword)",
    japaneseTitle: "なまくら刀",
    altTitles: ["Blunt Sword", "A Dull Blade"],
    synopsis:
      "One of the earliest surviving Japanese animated films. A clumsy samurai buys a dull sword and fails to harm a passing bystander, who then beats him and leaves with the weapon — a comedy told entirely in the short-film language of its day.",
    releaseDate: "1917-06-30",
    year: 1917,
    format: "MOVIE",
    duration: 4,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: null,
    genreSlugs: ["comedy", "historical"],
    eraSlug: "the-beginning",
    characters: [
      { slug: "namakura-samurai", name: "The Clumsy Samurai", japaneseName: "浪人武士", role: "Protagonist", biography: "A foolish samurai who purchases an extraordinarily dull sword and attempts to test it on innocent passersby with comical results.", voiceActor: "Silent Era" }
    ],
    episodes: [
      { number: 1, title: "Namakura Gatana (The Dull Sword)", airDate: "1917-06-30", synopsis: "The complete surviving 4-minute animated short film by Jun'ichi Kōuchi." }
    ],
    historicalSignificance:
      "One of the first works of Japanese animation and the earliest surviving of three shorts released in 1917, the year widely credited as the birth of anime. Created by pioneering animator Jun'ichi Kōuchi.",
    productionHistory:
      "Animated in 1917 by Jun'ichi Kōuchi during the same months Shimokawa Oten and Seitaro Kitayama released their own pioneering films. Like all early anime, it used paper and ink, predating the cel technology that followed.",
    reception:
      "Lost for decades, the film resurfaced in 2007 and is now preserved by the National Film Center of Japan, recognized as a national treasure of animation history.",
    awards: "Recognized by the National Film Archive of Japan (preserved film).",
    culturalImpact:
      "Proof that Japanese artists independently embraced moving pictures within months of their first exposure to Western animation, launching a century-long national tradition.",
    legacy:
      "Together with Kōuchi's and Kitayama's 1917 shorts, Namakura Gatana marks the formal beginning of Japanese animation history.",
    historyTimeline: [
      { label: "Creation", year: "1917", text: "Jun'ichi Kōuchi produced the short as one of Japan's first animated films." },
      { label: "Release", year: "1917", text: "Released in June 1917 to Japanese theater audiences." },
      { label: "Rediscovery", year: "2007", text: "The film was rediscovered and restored after decades presumed lost." },
      { label: "Preservation", year: "2017", text: "Preserved in the National Film Center collection, celebrated on anime's centenary." },
      { label: "Legacy", text: "Now regarded as the opening chapter of Japanese animation history." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Namakura_Gatana", title: "Namakura Gatana — Wikipedia" },
    ],
  },
  {
    slug: "momotaro-divine-sea-warriors",
    title: "Momotaro's Divine Sea Warriors",
    japaneseTitle: "桃太郎 海の神兵",
    altTitles: ["Momotarō: Umi no Shinpei"],
    synopsis:
      "The first feature-length Japanese animated film. Japan's folk hero Momotaro leads an animal squadron on a mission in the South Pacific — a wartime propaganda work that nonetheless demonstrated remarkable technical ambition for Japanese animation.",
    releaseDate: "1945-04-12",
    year: 1945,
    format: "MOVIE",
    duration: 74,
    status: "FINISHED",
    sourceMaterial: "Original (based on the folk tale)",
    studio: null,
    genreSlugs: ["adventure", "historical"],
    eraSlug: "the-beginning",
    characters: [
      { slug: "momotaro-commander", name: "Commander Momotaro", japaneseName: "桃太郎", role: "Protagonist", biography: "The legendary folk hero reimagined as a naval commander.", voiceActor: "Historical Cast" }
    ],
    episodes: [
      { number: 1, title: "Theatrical Feature Film Presentation", airDate: "1945-04-12", synopsis: "The landmark 74-minute animated feature." }
    ],
    historicalSignificance:
      "Japan's first feature-length animated film, directed by Mitsuyo Seo for the wartime Japan Motion Picture Company (Shōchiku). It demonstrated that Japanese studios could sustain full-length animation production.",
    productionHistory:
      "Produced in 1944–45 by Geijutsu Eigasha (Art Film Company) and released by Shōchiku, it mobilized top wartime talent including future Toei animator Mitsuyo Seo. The film was reportedly the favorite movie of the young Hayao Miyazaki.",
    reception:
      "A propaganda work commissioned by the wartime government, its production values remain a technical landmark even though its content reflects the era's militarism.",
    awards: "None (wartime production).",
    culturalImpact:
      "Pioneered character animation techniques in Japan — walk cycles, synchronized singing, and feature-length structure — that postwar studios would inherit.",
    legacy:
      "The bridge between 1917's shorts and the industrial feature production that Toei Animation built in the 1950s.",
    historyTimeline: [
      { label: "Development", year: "1944", text: "Commissioned as a full-length animated propaganda feature during the Pacific War." },
      { label: "Release", year: "1945", text: "Released in April 1945, months before the war's end." },
      { label: "Postwar", year: "1950s", text: "Its techniques influenced postwar animation; reportedly a favorite film of Hayao Miyazaki." },
      { label: "Legacy", text: "Preserved as the foundational feature of Japanese animation." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Momotaro%27s_Divine_Sea_Warriors", title: "Momotaro's Divine Sea Warriors — Wikipedia" },
    ],
  },
  {
    slug: "astro-boy",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/2747.jpg",
    title: "Astro Boy",
    japaneseTitle: "鉄腕アトム (Tetsuwan Atom)",
    altTitles: ["Tetsuwan Atom", "Mighty Atom"],
    synopsis:
      "In a future world of robots and flying cars, a grief-stricken scientist builds a robot boy in the image of his lost son. Abandoned, Astro is adopted by Professor Ochanomizu and uses his rocket legs, super strength, and machine guns to defend humans and robots alike — while searching for the heart he was built without.",
    releaseDate: "1963-01-01",
    endDate: "1966-12-31",
    year: 1963,
    format: "TV",
    episodeCount: 193,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Osamu Tezuka (1952–1968)",
    studio: "mushi-production",
    creator: "osamu-tezuka",
    director: "osamu-tezuka",
    genreSlugs: ["action", "adventure", "science-fiction"],
    eraSlug: "television-era",
    characters: [
      {
        slug: "astro-boy",
        name: "Astro Boy (Atom)",
        japaneseName: "アトム",
        role: "Protagonist",
        biography:
          "A super-powered robot boy built by Dr. Tenma to replace his deceased son Tobio. Astro fights for the peaceful coexistence of humans and robots, often serving as a mediator between the two worlds.",
        voiceActor: "Mariko Mukai (1963), Motoko Kumai (2003 remake)",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Birth of Astro Boy",
        airDate: "1963-01-01",
        synopsis: "Dr. Tenma creates Astro in his son's image; Astro discovers the world of humans and robots.",
      },
      { number: 2, title: "Robot Circus", airDate: "1963-01-08" },
      { number: 3, title: "Frankenstein", airDate: "1963-01-15" },
    ],
    historicalSignificance:
      "The first anime television series in history and the first Japanese TV show to be broadcast in North America (1963, NBC). Astro Boy invented the limited-animation economic model that made serialized anime possible.",
    productionHistory:
      "Tezuka Productions partnered with NBC to presell the series for North America. At ¥550,000 per episode — a fraction of what Western animation cost — Mushi Production pioneered techniques: held cels, limited motion, repeated frames, and simplified design.",
    reception:
      "Japan's children watched in record numbers; within months rival studios launched their own series. Internationally it became a phenomenon in the US and Latin America.",
    awards: "Television Japan's first animated series; honored by the Japanese government and culture ministries in retrospective events.",
    culturalImpact:
      "Astro's rocket boots and atom-powered heart made him a national icon. The character remains Japan's enduring symbol of science, technology, and peace — and the mascot of Japanese anime itself.",
    legacy:
      "Every anime series on television descends from Astro Boy's production model. Tezuka's childlike robot hero shaped Japanese pop culture and gave the world its first anime icon.",
    historyTimeline: [
      { label: "Creation", year: "1952", text: "Tezuka's manga Tetsuwan Atom debuts in Kobunsha's Shōnen magazine." },
      { label: "Development", year: "1961–62", text: "Tezuka founds Mushi Production and secures an NBC presale for a TV series." },
      { label: "Premiere", year: "1963-01-01", text: "Japan's first anime TV series airs on Fuji Television." },
      { label: "International", year: "1963-09", text: "Astro Boy becomes the first Japanese animation broadcast on US television (NBC)." },
      { label: "End of broadcast", year: "1966-12-31", text: "193 episodes complete after four years of continuous weekly production." },
      { label: "Cultural impact", text: "Established the limited-animation model that built the entire anime industry." },
      { label: "Legacy", text: "Remakes in 1980 and 2003; the character remains a Japanese cultural icon." },
    ],
    related: [{ slug: "kimba-the-white-lion", type: "Same creator" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Astro_Boy_(1963_TV_series)", title: "Astro Boy (1963 TV series) — Wikipedia" },
      { name: "Anime News Network", url: "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=557", title: "Astro Boy (TV) — ANN Encyclopedia" },
    ],
  },
  {
    slug: "kimba-the-white-lion",
    title: "Kimba the White Lion",
    japaneseTitle: "ジャングル大帝 (Janguru Taitei)",
    altTitles: ["Jungle Emperor Leo"],
    synopsis:
      "Born on the African savannah, white lion cub Kimba survives the death of his parents and is raised between two worlds — the wild animals he must lead and the humans he has learned to trust. He dreams of a peaceable kingdom where all creatures live together.",
    releaseDate: "1965-10-06",
    endDate: "1966-09-28",
    year: 1965,
    format: "TV",
    episodeCount: 52,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Osamu Tezuka (1950–1954)",
    studio: "mushi-production",
    creator: "osamu-tezuka",
    genreSlugs: ["adventure", "drama"],
    eraSlug: "television-era",
    characters: [
      {
        slug: "kimba",
        name: "Kimba (Leo)",
        japaneseName: "レオ",
        role: "Protagonist",
        biography:
          "The white lion prince who loses his parents and becomes the Jungle Emperor. Kimba is idealistic, kind, and determined to end the cycle of violence between animals and humans.",
        voiceActor: "Yoshiko Ota (1965), Yūko Mita (1997 film)",
      },
    ],
    episodes: [{ number: 1, title: "The Lion Prince" }],
    historicalSignificance:
      "Japan's first color television anime series (pilot produced in color, aired on Fuji TV). Its themes of conservation and coexistence made it an international classic across Europe, the Americas, and the Middle East.",
    productionHistory:
      "Produced by Mushi Production in 1965, following Tezuka's popular 1950 manga. It was the first Japanese TV anime to be fully produced in color.",
    reception:
      "Won the TV Directors Award and the UNESCO International Animation Festival Grand Prize; beloved in over 60 countries.",
    awards: "Grand Prize at the International Animation Film Festival; Manga Society Award (1966).",
    culturalImpact:
      "Became a template for animal-adventure storytelling and is widely regarded as an inspiration for Disney's The Lion King (1994), a connection Disney has denied but critics frequently note.",
    legacy:
      "One of the most successful early anime exports, helping establish anime's international circulation in the 1960s–70s.",
    historyTimeline: [
      { label: "Creation", year: "1950", text: "Tezuka's manga Jungle Taitei begins serialization." },
      { label: "Production", year: "1965", text: "Mushi Production produces the first color anime TV series." },
      { label: "Premiere", year: "1965-10-06", text: "Broadcast begins on Fuji Television in color." },
      { label: "International", year: "1966", text: "Broadcast across Europe, the US, and Latin America." },
      { label: "Legacy", text: "Frequently cited as an inspiration for Disney's The Lion King (1994)." },
    ],
    related: [{ slug: "astro-boy", type: "Same creator" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Kimba_the_White_Lion", title: "Kimba the White Lion — Wikipedia" },
    ],
  },
  {
    slug: "space-battleship-yamato",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx711-lZXWwNclsCxo.jpg",
    title: "Space Battleship Yamato",
    japaneseTitle: "宇宙戦艦ヤマト (Uchū Senkan Yamato)",
    altTitles: ["Star Blazers"],
    synopsis:
      "In 2199, Earth is dying under radioactive bombardment from the Gamilas empire. The battleship Yamato — raised from its World War II wreck and refitted for space — sets out on a 148,000-light-year voyage to obtain the Cosmo DNA that can save humanity, carrying the memories of the fallen with it.",
    releaseDate: "1974-10-06",
    endDate: "1975-03-30",
    year: 1974,
    format: "TV",
    episodeCount: 26,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Original (concept by Leiji Matsumoto and Yoshinobu Nishizaki)",
    studio: "office-academy",
    creator: "leiji-matsumoto",
    director: "noboru-ishiguro",
    genreSlugs: ["science-fiction", "adventure", "drama"],
    eraSlug: "television-era",
    characters: [
      { slug: "susumu-kodai", name: "Susumu Kodai", japaneseName: "古代 進", role: "Protagonist", biography: "Tactical officer of the Yamato whose fiery spirit leads humanity's desperate voyage.", voiceActor: "Kei Tomiyama" },
      { slug: "captain-juzo-okita", name: "Captain Juzo Okita", japaneseName: "沖田 十三", role: "Main Character", biography: "The wise and unwavering commander of the Yamato.", voiceActor: "Goro Naya" }
    ],
    episodes: [{ number: 1, title: "Save the Earth!" }],
    historicalSignificance:
      "The series that saved anime. In the mid-1970s, TV anime was in decline; Yamato's epic, adult-oriented space opera — with real dramatic stakes and mourning — drew millions of older viewers and revived the industry.",
    productionHistory:
      "Conceived by producer Yoshinobu Nishizaki, developed with Leiji Matsumoto's character designs, and directed by Noboru Ishiguro. Its first run on Yomiuri TV was modest, but 1977's theatrical compilation broke box office records, and two sequels followed.",
    reception:
      "Became a national event on Japanese television; the 1977 film 'Space Battleship Yamato' was one of Japan's highest-grossing films of the 1970s.",
    awards: "TV Emmy-equivalent recognition in Japan; the series is preserved in anime history retrospectives.",
    culturalImpact:
      "Introduced adult melodrama to TV anime, launched the space-opera genre in Japan, and proved anime could be serialized narrative fiction with emotional depth — the direct ancestor of Gundam and Evangelion.",
    legacy:
      "In the US as Star Blazers (1979), it seeded North American anime fandom; its creators directly inspired the next generation of directors.",
    historyTimeline: [
      { label: "Development", year: "1973", text: "Nishizaki and Matsumoto develop the series from a discarded project." },
      { label: "Premiere", year: "1974-10-06", text: "Broadcast begins on Yomiuri TV with modest ratings." },
      { label: "Breakthrough", year: "1977-08", text: "Theatrical compilation becomes a box-office phenomenon, triggering a media sensation." },
      { label: "International", year: "1979", text: "Broadcast in the US as Star Blazers, igniting early American fandom." },
      { label: "Legacy", text: "Established the space-opera template that Gundam and Evangelion would inherit." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Space_Battleship_Yamato", title: "Space Battleship Yamato — Wikipedia" },
    ],
  },
  {
    slug: "mobile-suit-gundam",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx80-pdYJ12vSTmad.jpg",
    title: "Mobile Suit Gundam",
    japaneseTitle: "機動戦士ガンダム (Kidō Senshi Gandamu)",
    altTitles: ["Gundam", "First Gundam"],
    synopsis:
      "In Universal Century 0079, the Earth Federation and the Principality of Zeon fight a total war in space and on Earth. Teenage civilian Amuro Ray stumbles into the cockpit of the Federation's prototype mobile suit, the Gundam, and becomes a reluctant ace — while both sides discover the human cost of a war neither can win.",
    releaseDate: "1979-04-07",
    endDate: "1980-01-26",
    year: 1979,
    format: "TV",
    episodeCount: 43,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: "sunrise",
    creator: "yoshiyuki-tomino",
    director: "yoshiyuki-tomino",
    genreSlugs: ["mecha", "science-fiction", "drama"],
    eraSlug: "television-era",
    characters: [
      {
        slug: "amuro-ray",
        name: "Amuro Ray",
        japaneseName: "アムロ・レイ",
        role: "Protagonist",
        biography:
          "A 15-year-old mechanic's son who becomes the Gundam's pilot. Awkward, gifted, and increasingly traumatized by combat, Amuro grows from reluctant civilian into the Federation's symbol of survival.",
        voiceActor: "Tōru Furuya",
      },
      {
        slug: "char-aznable",
        name: "Char Aznable",
        japaneseName: "シャア・アズナブル",
        role: "Antagonist",
        biography:
          "The masked 'Red Comet' ace of Zeon, piloting a red mobile suit at three times the speed of his peers. Char's charisma, tragedy, and shifting allegiances made him one of anime's most iconic characters.",
        voiceActor: "Shūichi Ikeda",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Gundam Rising",
        airDate: "1979-04-07",
        synopsis: "Amuro Ray is pulled into the cockpit of the prototype Gundam during Zeon's attack on Side 7.",
      },
      { number: 2, title: "Destruction of Garma" },
      { number: 3, title: "Char's Attack" },
    ],
    historicalSignificance:
      "Founded the 'real robot' genre: giant machines as tools of war, not superhero vehicles. Gundam brought the weight of history — Vietnam, war guilt, the cost of technology — into the robot show.",
    productionHistory:
      "Tomino originally conceived the series with a more pessimistic, adult tone than sponsors expected. The TV run struggled, but reruns and the 1981 theatrical trilogy made it a phenomenon, and the Gunpla (plastic model) line became a multi-billion-dollar industry.",
    reception:
      "Initially underrated on air, it became one of Japan's most beloved properties; theatrical compilations were massive hits in 1981–82.",
    awards: "The Gundam franchise holds the Guinness World Record for largest anime toy market share; the series is routinely voted among Japan's greatest TV anime.",
    culturalImpact:
      "Gundam defined the anti-war robot drama, spawned a universe of sequels and alternate timelines, and its model kits transformed anime merchandising into the industry's financial backbone.",
    legacy:
      "With over 50 animated titles and 40 years of Gunpla sales, Gundam is one of the most valuable franchises in entertainment history.",
    historyTimeline: [
      { label: "Creation", year: "1978", text: "Tomino develops the concept of mobile suits as war machines for Sunrise." },
      { label: "Premiere", year: "1979-04-07", text: "First broadcast on Nagoya TV (Asahi); ratings are modest." },
      { label: "Revival", year: "1981-03", text: "The theatrical trilogy opens nationwide; Gundam becomes a social phenomenon." },
      { label: "Gunpla era", year: "1980", text: "Gundam model kits begin selling in enormous numbers, founding modern anime merchandising." },
      { label: "Legacy", text: "The franchise continues with new series, films, and the monumental Gundam statue at Odaiba." },
    ],
    related: [{ slug: "neon-genesis-evangelion", type: "Spiritual successor" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Mobile_Suit_Gundam", title: "Mobile Suit Gundam — Wikipedia" },
    ],
  },
  {
    slug: "akira",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx47-4CR68arv452h.jpg",
    title: "Akira",
    japaneseTitle: "アキラ",
    altTitles: [],
    synopsis:
      "Neo-Tokyo, 2019. Thirty years after a mysterious explosion destroyed the old capital, the city is a hotbed of motorcycle gangs, political cults, and unrest. After gang leader Kaneda's friend Tetsuo awakens psychic powers, the military's secret project AKIRA — and the truth about Neo-Tokyo's birth — come crashing down on the city.",
    releaseDate: "1988-07-16",
    year: 1988,
    format: "MOVIE",
    duration: 124,
    status: "FINISHED",
    sourceMaterial: "Manga by Katsuhiro Otomo (1982–1990)",
    studio: "tms-entertainment",
    creator: "katsuhiro-otomo",
    director: "katsuhiro-otomo",
    genreSlugs: ["science-fiction", "action", "psychological"],
    eraSlug: "golden-age",
    characters: [
      {
        slug: "kaneda",
        name: "Shotaro Kaneda",
        japaneseName: "金田 正太郎",
        role: "Protagonist",
        biography:
          "Leader of the Capsules motorcycle gang and Tetsuo's oldest friend. Brash, loyal, and utterly out of his depth against powers beyond human comprehension.",
        voiceActor: "Mitsuo Iwata",
      },
      {
        slug: "tetsuo",
        name: "Tetsuo Shima",
        japaneseName: "島 鉄雄",
        role: "Antagonist",
        biography:
          "Kaneda's insecure second-in-command whose awakening psychic powers spiral beyond control. Tetsuo's transformation from bullied outsider to cosmic force is the film's emotional core.",
        voiceActor: "Nozomu Sasaki",
      },
    ],
    episodes: [
      { number: 1, title: "AKIRA (Theatrical Feature)", airDate: "1988-07-16", synopsis: "Katsuhiro Otomo's groundbreaking cyberpunk masterwork that introduced anime to the world." }
    ],
    historicalSignificance:
      "The film that announced Japanese animation to the world. Its $11 million budget, 160,000+ cels, and uncompromising cyberpunk vision stunned international audiences at its 1988 screenings and transformed anime's global image overnight.",
    productionHistory:
      "Produced over several years with a crew including future stars like Toshio Suzuki (producer) and animators who would join Studio Ghibli. The manga was still running when production began; the film was financed by a committee of publishers and studios, including TMS Entertainment.",
    reception:
      "A global phenomenon: top-grossing anime in Japan of 1988, a cult classic in the West where it opened a 1989 sci-fi festival in Hollywood, and the subject of critical acclaim from Roger Ebert to the avant-garde.",
    awards: "Grand Prix at the 1989 Fantasia Film Festival (retroactively); selected as a favorite of many critics' lists of greatest animated films.",
    culturalImpact:
      "Akira's slide whistle, red jacket, and the crumbling streets of Neo-Tokyo saturated Western pop culture — from The Matrix and Stranger Things to hip-hop album art. It opened the floodgates for anime distribution in North America.",
    legacy:
      "The definitive 1980s anime film and the primary catalyst for anime's international expansion in the 1990s.",
    historyTimeline: [
      { label: "Creation", year: "1982", text: "Otomo's manga Akira begins serialization in Young Magazine." },
      { label: "Development", year: "1984", text: "A committee led by publishers funds a feature film adaptation." },
      { label: "Production", year: "1986–88", text: "Over 160,000 cels and 700 color settings are used; production takes over two years." },
      { label: "Release", year: "1988-07-16", text: "Premieres in Japan, becoming the year's highest-grossing domestic film." },
      { label: "International", year: "1989–90", text: "Festival screenings in the West create an international cult following." },
      { label: "Cultural impact", text: "Defines cyberpunk anime and paves the way for global anime distribution." },
      { label: "Legacy", text: "A 2018 live-action adaptation (Taika Waititi attached) remains in development limbo." },
    ],
    related: [{ slug: "ghost-in-the-shell", type: "Shared cyberpunk lineage" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Akira_(1988_film)", title: "Akira (1988 film) — Wikipedia" },
    ],
  },
  {
    slug: "dragon-ball",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx223-scE5uJfXqqj8.png",
    title: "Dragon Ball",
    japaneseTitle: "ドラゴンボール (Doragon Bōru)",
    altTitles: ["Dragonball"],
    synopsis:
      "A young boy with a monkey tail, Goku, meets a clever girl named Bulma and joins her search for the seven magical Dragon Balls, which summon a wish-granting dragon. Their journey introduces martial arts masters, anthropomorphic villains, and the tournament structure that would define global action anime.",
    releaseDate: "1986-02-26",
    endDate: "1989-04-19",
    year: 1986,
    format: "TV",
    episodeCount: 153,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Akira Toriyama (1984–1995)",
    studio: "toei-animation",
    creator: "akira-toriyama",
    director: "minoru-okazaki",
    genreSlugs: ["action", "adventure", "comedy", "fantasy"],
    eraSlug: "golden-age",
    characters: [
      {
        slug: "goku",
        name: "Son Goku",
        japaneseName: "孫 悟空",
        role: "Protagonist",
        biography:
          "A Saiyan raised on Earth whose love of fighting and food propels him from village boy to the strongest warrior in the universe. Goku's optimism and obsession with battle defined the shōnen action hero for a generation.",
        voiceActor: "Masako Nozawa",
      },
    ],
    episodes: [{ number: 1, title: "The Ball of the Dragon" }],
    historicalSignificance:
      "Dragon Ball's anime made the martial-arts adventure the dominant form of shōnen anime. Its action grammar — tournament arcs, power levels, and transformation — became the template for nearly every action anime that followed.",
    productionHistory:
      "Toei Animation adapted Toriyama's manga beginning February 1986, with Minoru Okazaki directing the early arcs. Its successor, Dragon Ball Z (1989), continued the phenomenon with new production values.",
    reception:
      "A massive hit in Japan and an outright cultural takeover across Latin America, Europe, Africa, and South Asia, where it aired for decades in repeats.",
    awards: "Shogakukan Manga Award for the manga (1981 for Dr. Slump); the anime franchise is recognized worldwide for its longevity.",
    culturalImpact:
      "Goku's Super Saiyan transformation became a universal meme and the visual shorthand for power escalation; Dragon Ball's international success proved anime's global commercial ceiling was much higher than expected.",
    legacy:
      "Nearly four decades later, Dragon Ball remains one of the best-selling media franchises ever created, with new series and films still released.",
    historyTimeline: [
      { label: "Creation", year: "1984", text: "Toriyama's Dragon Ball manga debuts in Weekly Shōnen Jump." },
      { label: "Premiere", year: "1986-02-26", text: "The anime begins on Fuji TV with 153 episodes." },
      { label: "Dragon Ball Z", year: "1989-04-26", text: "The sequel series begins, escalating the franchise to new heights." },
      { label: "Global spread", year: "1990s", text: "Dragon Ball dominates broadcast television across the Americas and Europe." },
      { label: "Legacy", text: "The archetypal shōnen action franchise of all time." },
    ],
    related: [{ slug: "one-piece", type: "Successor genre" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dragon_Ball_(TV_series)", title: "Dragon Ball (TV series) — Wikipedia" },
    ],
  },
  {
    slug: "sailor-moon",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx530-O8q6KpJ244Qk.jpg",
    title: "Sailor Moon",
    japaneseTitle: "美少女戦士セーラームーン (Bishōjo Senshi Sērā Mūn)",
    altTitles: ["Pretty Soldier Sailor Moon"],
    synopsis:
      "Clumsy 14-year-old Usagi Tsukino meets a talking cat who reveals she is Sailor Moon, a reincarnated lunar princess destined to fight the forces of darkness alongside four other guardians. What begins as comic school-life fantasy grows into a story about love, identity, and the bonds between women.",
    releaseDate: "1992-03-07",
    endDate: "1997-02-08",
    year: 1992,
    format: "TV",
    episodeCount: 200,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Naoko Takeuchi (1991–1997)",
    studio: "toei-animation",
    creator: "naoko-takeuchi",
    genreSlugs: ["fantasy", "romance", "action", "drama"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "usagi-tsukino",
        name: "Usagi Tsukino / Sailor Moon",
        japaneseName: "月野 うさぎ",
        role: "Protagonist",
        biography:
          "A lazy, tearful, hamburger-loving schoolgirl who is also the leader of the Sailor Guardians and the Princess of the Moon Kingdom. Usagi's emotional honesty made her one of anime's most beloved heroines.",
        voiceActor: "Kotono Mitsuishi",
      },
    ],
    episodes: [{ number: 1, title: "The Crybaby: Usagi's Beautiful Transformation" }],
    historicalSignificance:
      "The most influential magical-girl anime of all time. Sailor Moon took the genre beyond the lone magical girl into ensemble action, giving girls a team of empowered, individualized heroines at a time when such shows were rare.",
    productionHistory:
      "Toei Animation adapted Takeuchi's manga in 1992 with Junichi Sato directing. Its five seasons ran until 1997, and the franchise added films, musicals, and endless merchandise.",
    reception:
      "A ratings hit in Japan and an international phenomenon, especially in North America, Europe, and Latin America, where the 1995 English dub became a landmark of children's television.",
    awards: "Kodansha Manga Award (1993); the franchise received the Best Anime honor at several international festivals.",
    culturalImpact:
      "Sailor Moon introduced millions of girls worldwide to anime. Its blend of girlish comedy, romance, and genuine melodrama reframed what a 'girls' show' could be, and its fandom helped build Western anime communities in the 1990s.",
    legacy:
      "Sailor Moon's formula of transformed teams and personal growth echoes in Precure, Madoka Magica, and nearly every magical-girl anime since.",
    historyTimeline: [
      { label: "Creation", year: "1991", text: "Takeuchi's Sailor Moon manga begins in Nakayoshi magazine." },
      { label: "Premiere", year: "1992-03-07", text: "The anime debuts on TV Asahi, becoming a hit with girls." },
      { label: "International", year: "1995", text: "English dub premieres in North America, becoming a generation's entry point to anime." },
      { label: "Revival", year: "2014", text: "Sailor Moon Crystal begins streaming worldwide." },
      { label: "Legacy", text: "The template for ensemble magical-girl anime for three decades." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sailor_Moon_(TV_series)", title: "Sailor Moon (TV series) — Wikipedia" },
    ],
  },
];
