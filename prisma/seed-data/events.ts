export interface EventSeed {
  slug: string;
  title: string;
  year?: number;
  month?: number;
  day?: number;
  description: string;
  kind: string;
  eraSlug?: string;
  animeSlug?: string;
  studioSlug?: string;
  personSlug?: string;
}

export const events: EventSeed[] = [
  {
    slug: "birth-tezuka",
    title: "Birth of Osamu Tezuka",
    year: 1928,
    month: 11,
    day: 3,
    description:
      "Osamu Tezuka, the 'God of Manga' whose work founded the modern anime industry, is born in Toyonaka, Osaka Prefecture.",
    kind: "BIRTH",
    eraSlug: "the-beginning",
    personSlug: "osamu-tezuka",
  },
  {
    slug: "birth-miyazaki",
    title: "Birth of Hayao Miyazaki",
    year: 1941,
    month: 1,
    day: 5,
    description:
      "Hayao Miyazaki, future co-founder of Studio Ghibli and the world's most celebrated animation director, is born in Tokyo.",
    kind: "BIRTH",
    eraSlug: "the-beginning",
    personSlug: "hayao-miyazaki",
  },
  {
    slug: "release-momotaro",
    title: "Release of Momotaro's Divine Sea Warriors",
    year: 1945,
    month: 4,
    day: 12,
    description:
      "Japan's first feature-length animated film, directed by Mitsuyo Seo, is released — a wartime production that proved Japanese studios could sustain full-length animation.",
    kind: "RELEASE",
    eraSlug: "the-beginning",
    animeSlug: "momotaro-divine-sea-warriors",
  },
  {
    slug: "toei-doga-founding",
    title: "Toei Doga (Toei Animation) founded",
    year: 1956,
    month: 7,
    day: 23,
    description:
      "Toei Doga is established as the animation division of the Toei film studio, creating Japan's first large-scale animation studio in the Disney mold.",
    kind: "FOUNDING",
    eraSlug: "the-beginning",
    studioSlug: "toei-animation",
  },
  {
    slug: "panda-magic-serpent",
    title: "Panda and the Magic Serpent (Toei's first color feature)",
    year: 1958,
    month: 10,
    day: 22,
    description:
      "Toei Doga releases Japan's first full-color animated feature, marking the industrial maturity of Japanese theatrical animation.",
    kind: "RELEASE",
    eraSlug: "the-beginning",
    studioSlug: "toei-animation",
  },
  {
    slug: "mushi-production-founding",
    title: "Mushi Production founded",
    year: 1961,
    month: 11,
    day: 4,
    description:
      "Osamu Tezuka establishes Mushi Production, the studio that will produce the first anime television series two years later.",
    kind: "FOUNDING",
    eraSlug: "television-era",
    studioSlug: "mushi-production",
    personSlug: "osamu-tezuka",
  },
  {
    slug: "astro-boy-premiere",
    title: "Astro Boy premieres — Japan's first anime TV series",
    year: 1963,
    month: 1,
    day: 1,
    description:
      "Tetsuwan Atom (Astro Boy) begins broadcasting on Fuji TV, inventing the limited-animation production model that built the anime industry.",
    kind: "PREMIERE",
    eraSlug: "television-era",
    animeSlug: "astro-boy",
    personSlug: "osamu-tezuka",
  },
  {
    slug: "astro-boy-usa",
    title: "Astro Boy becomes the first anime on US television",
    year: 1963,
    month: 9,
    description:
      "Astro Boy airs on NBC, becoming the first Japanese animated series broadcast in North America and launching anime's international circulation.",
    kind: "MILESTONE",
    eraSlug: "television-era",
    animeSlug: "astro-boy",
  },
  {
    slug: "studio-ghibli-founding",
    title: "Studio Ghibli founded",
    year: 1985,
    month: 6,
    day: 15,
    description:
      "Hayao Miyazaki, Isao Takahata, and Toshio Suzuki found Studio Ghibli after the success of Nausicaä of the Valley of the Wind.",
    kind: "FOUNDING",
    eraSlug: "golden-age",
    studioSlug: "studio-ghibli",
  },
  {
    slug: "akira-release",
    title: "Akira released",
    year: 1988,
    month: 7,
    day: 16,
    description:
      "Katsuhiro Otomo's Akira opens in Japan, becoming the film that announces Japanese animation to the world and sparks global anime distribution.",
    kind: "RELEASE",
    eraSlug: "golden-age",
    animeSlug: "akira",
  },
  {
    slug: "tezuka-death",
    title: "Death of Osamu Tezuka",
    year: 1989,
    month: 2,
    day: 9,
    description:
      "Osamu Tezuka dies of stomach cancer at age 60. The 'God of Manga' leaves behind the creative and industrial foundations of modern anime.",
    kind: "DEATH",
    eraSlug: "golden-age",
    personSlug: "osamu-tezuka",
  },
  {
    slug: "evangelion-premiere",
    title: "Neon Genesis Evangelion premieres",
    year: 1995,
    month: 10,
    day: 4,
    description:
      "Hideaki Anno's psychological deconstruction of the mecha genre begins broadcasting, becoming the most analyzed anime series ever made.",
    kind: "PREMIERE",
    eraSlug: "global-expansion",
    animeSlug: "neon-genesis-evangelion",
  },
  {
    slug: "ghost-in-the-shell-release",
    title: "Ghost in the Shell released",
    year: 1995,
    month: 11,
    day: 18,
    description:
      "Mamoru Oshii's cyberpunk landmark opens in Japan; it becomes the first anime to top the US video charts and influences The Matrix.",
    kind: "RELEASE",
    eraSlug: "global-expansion",
    animeSlug: "ghost-in-the-shell",
  },
  {
    slug: "kon-death",
    title: "Death of Satoshi Kon",
    year: 2010,
    month: 8,
    day: 24,
    description:
      "Satoshi Kon, director of Perfect Blue, Millennium Actress, and Paprika, dies of pancreatic cancer at age 46, cutting short one of animation's most singular careers.",
    kind: "DEATH",
    eraSlug: "digital-revolution",
    personSlug: "satoshi-kon",
  },
  {
    slug: "spirited-away-release",
    title: "Spirited Away released",
    year: 2001,
    month: 7,
    day: 20,
    description:
      "Hayao Miyazaki's Spirited Away opens in Japan, beginning its record run as the highest-grossing film in Japanese history.",
    kind: "RELEASE",
    eraSlug: "digital-revolution",
    animeSlug: "spirited-away",
  },
  {
    slug: "spirited-away-oscar",
    title: "Spirited Away wins the Academy Award",
    year: 2003,
    month: 3,
    day: 23,
    description:
      "Spirited Away wins the Oscar for Best Animated Feature at the 75th Academy Awards — the first non-English-language film to win the award.",
    kind: "AWARD",
    eraSlug: "digital-revolution",
    animeSlug: "spirited-away",
  },
  {
    slug: "mappa-founding",
    title: "MAPPA founded",
    year: 2011,
    month: 6,
    day: 14,
    description:
      "Masao Maruyama, co-founder of Madhouse, establishes MAPPA — soon to become the defining studio of the streaming era.",
    kind: "FOUNDING",
    eraSlug: "streaming-era",
    studioSlug: "mappa",
  },
  {
    slug: "trigger-founding",
    title: "Studio Trigger founded",
    year: 2011,
    month: 8,
    day: 22,
    description:
      "Former Gainax staff led by Hiroyuki Imaishi found Studio Trigger, carrying the independent spirit of 1990s studio anime into the modern era.",
    kind: "FOUNDING",
    eraSlug: "streaming-era",
    studioSlug: "trigger",
  },
  {
    slug: "attack-on-titan-premiere",
    title: "Attack on Titan premieres",
    year: 2013,
    month: 4,
    day: 7,
    description:
      "The first episode of Attack on Titan airs — the beginning of the decade's defining global anime phenomenon.",
    kind: "PREMIERE",
    eraSlug: "streaming-era",
    animeSlug: "attack-on-titan",
  },
  {
    slug: "your-name-release",
    title: "Your Name released",
    year: 2016,
    month: 8,
    day: 26,
    description:
      "Makoto Shinkai's Your Name opens in Japan and becomes the highest-grossing anime film (until 2020), bringing a new generation to anime cinema worldwide.",
    kind: "RELEASE",
    eraSlug: "streaming-era",
    animeSlug: "your-name",
  },
  {
    slug: "mugen-train-record",
    title: "Demon Slayer: Mugen Train breaks all Japanese box office records",
    year: 2020,
    month: 10,
    day: 16,
    description:
      "Demon Slayer: Kimetsu no Yaiba the Movie: Mugen Train opens and goes on to earn over ¥40 billion, surpassing Spirited Away's 19-year record.",
    kind: "RELEASE",
    eraSlug: "modern-anime",
    animeSlug: "demon-slayer",
  },
  {
    slug: "jujutsu-kaisen-premiere",
    title: "Jujutsu Kaisen premieres",
    year: 2020,
    month: 10,
    day: 3,
    description:
      "MAPPA's Jujutsu Kaisen begins airing, quickly becoming the flagship shōnen anime of the 2020s and the fastest-selling manga in history at its peak.",
    kind: "PREMIERE",
    eraSlug: "modern-anime",
    animeSlug: "jujutsu-kaisen",
  },
  {
    slug: "kyoto-animation-arson",
    title: "Kyoto Animation arson attack",
    year: 2019,
    month: 7,
    day: 18,
    description:
      "An arson attack on Kyoto Animation's first studio in Fushimi kills 36 people and injures dozens — the deadliest mass killing in Japan since WWII, and one of the darkest days in animation history.",
    kind: "INDUSTRY",
    eraSlug: "streaming-era",
    studioSlug: "kyoto-animation",
  },
  {
    slug: "frieren-premiere",
    title: "Frieren: Beyond Journey's End premieres",
    year: 2023,
    month: 9,
    day: 29,
    description:
      "Madhouse's adaptation of the acclaimed fantasy manga begins airing, quickly becoming the critical touchstone of 2020s anime.",
    kind: "PREMIERE",
    eraSlug: "modern-anime",
    animeSlug: "frieren-beyond-journeys-end",
  },
  {
    slug: "one-piece-live-action",
    title: "One Piece live-action series premieres on Netflix",
    year: 2023,
    month: 8,
    day: 31,
    description:
      "Netflix's live-action adaptation of One Piece debuts, becoming the streaming platform's most-watched series of 2023 and a milestone of anime's mainstreaming.",
    kind: "INDUSTRY",
    eraSlug: "modern-anime",
    animeSlug: "one-piece",
  },
  {
    slug: "toriyama-death",
    title: "Death of Akira Toriyama",
    year: 2024,
    month: 3,
    day: 1,
    description:
      "Akira Toriyama, creator of Dragon Ball and Dr. Slump, dies at age 68, prompting a global outpouring that underscored his four-decade influence.",
    kind: "DEATH",
    eraSlug: "modern-anime",
    personSlug: "akira-toriyama",
  },
  {
    slug: "matsumoto-death",
    title: "Death of Leiji Matsumoto",
    year: 2023,
    month: 2,
    day: 13,
    description:
      "Leiji Matsumoto, creator of Space Battleship Yamato and Galaxy Express 999, dies at age 85. His space operas shaped Japanese science fiction for half a century.",
    kind: "DEATH",
    eraSlug: "streaming-era",
    personSlug: "leiji-matsumoto",
  },
  {
    slug: "sunrise-founding",
    title: "Sunrise founded",
    year: 1972,
    month: 9,
    description:
      "Former Mushi Production staff found Sunrise, the studio that will define the mecha genre with Mobile Suit Gundam in 1979.",
    kind: "FOUNDING",
    eraSlug: "television-era",
    studioSlug: "sunrise",
  },
  {
    slug: "madhouse-founding",
    title: "Madhouse founded",
    year: 1972,
    month: 10,
    day: 17,
    description:
      "Masao Maruyama and former Mushi Production colleagues found Madhouse, the future home of Satoshi Kon's films and Death Note.",
    kind: "FOUNDING",
    eraSlug: "television-era",
    studioSlug: "madhouse",
  },
  {
    slug: "production-ig-founding",
    title: "Production I.G established",
    year: 1987,
    month: 12,
    day: 15,
    description:
      "IG Tatsunoko is established by Mitsuhisa Ishikawa and Kazuchika Kise; it becomes Production I.G, the studio of Ghost in the Shell and Patlabor.",
    kind: "FOUNDING",
    eraSlug: "golden-age",
    studioSlug: "production-ig",
  },
  {
    slug: "gainax-founding",
    title: "Gainax founded",
    year: 1984,
    month: 12,
    day: 22,
    description:
      "Hideaki Anno and fellow amateur filmmakers from Daicon Film found Gainax, the future studio of Neon Genesis Evangelion.",
    kind: "FOUNDING",
    eraSlug: "golden-age",
    studioSlug: "gainax",
  },
  {
    slug: "sailor-moon-premiere",
    title: "Sailor Moon premieres",
    year: 1992,
    month: 3,
    day: 7,
    description:
      "The Sailor Moon anime begins on TV Asahi, launching the most influential magical-girl franchise in history and a global anime gateway for girls.",
    kind: "PREMIERE",
    eraSlug: "global-expansion",
    animeSlug: "sailor-moon",
  },
  {
    slug: "one-piece-premiere",
    title: "One Piece premieres",
    year: 1999,
    month: 10,
    day: 20,
    description:
      "The One Piece anime begins on Fuji TV — the start of the longest-running shōnen anime of the modern era, still airing today.",
    kind: "PREMIERE",
    eraSlug: "global-expansion",
    animeSlug: "one-piece",
  },
];
