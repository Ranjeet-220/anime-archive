import type { AnimeSeed } from "./anime-early";

export const animeModern: AnimeSeed[] = [
  {
    slug: "ghost-in-the-shell",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx43-Y6EjeEMM14dj.png",
    title: "Ghost in the Shell",
    japaneseTitle: "攻殻機動隊 (Kōkaku Kidōtai)",
    altTitles: ["Kōkaku Kidōtai"],
    synopsis:
      "In 2029, cyborg operative Major Motoko Kusanagi of Section 9 hunts the Puppet Master, a criminal consciousness that has invaded the network. Her pursuit forces the fundamental question: when memories can be rewritten and bodies replaced, what makes a person real?",
    releaseDate: "1995-11-18",
    year: 1995,
    format: "MOVIE",
    duration: 83,
    status: "FINISHED",
    sourceMaterial: "Manga by Masamune Shirow (1989–1991)",
    studio: "production-ig",
    director: "mamoru-oshii",
    genreSlugs: ["science-fiction", "action", "psychological"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "motoko-kusanagi",
        name: "Motoko Kusanagi",
        japaneseName: "草薙 素子",
        role: "Protagonist",
        biography:
          "The Major: a full-body cyborg commander of the covert Section 9. Brilliant, stoic, and quietly searching for a soul within her manufactured body.",
        voiceActor: "Atsuko Tanaka",
      },
    ],
    episodes: [
      { number: 1, title: "Ghost in the Shell (Theatrical Feature)", airDate: "1995-11-18", synopsis: "The landmark cyberpunk masterwork by Mamoru Oshii." }
    ],
    historicalSignificance:
      "The most intellectually ambitious anime film of the 1990s. Ghost in the Shell asked serious questions about consciousness and identity, and its vision of the network-defined self anticipated the internet age.",
    productionHistory:
      "Mamoru Oshii directed with Production I.G, combining hand-drawn cel animation with early digital compositing for city scenes. Its photorealistic backgrounds took a crew of dozens over a year to paint.",
    reception:
      "A critical and commercial success that sold over a million home videos in North America by 1996 — the first anime to top Billboard's video charts in the US.",
    awards: "Topped the Japan Academy Prize and science-fiction awards; praised by critics worldwide as among the best animated films ever made.",
    culturalImpact:
      "The Wachowskis have acknowledged its influence on The Matrix (1999). Its cyberpunk iconography — the Major's thermoptic camouflage, the shell/ghost duality — became part of global film language.",
    legacy:
      "Spawning sequels, the Stand Alone Complex TV series, and a 2017 live-action film, Ghost in the Shell remains the benchmark of serious anime science fiction.",
    historyTimeline: [
      { label: "Creation", year: "1989", text: "Shirow's manga begins serialization in Kodansha's Young Magazine." },
      { label: "Production", year: "1993–95", text: "Oshii and Production I.G adapt the manga with heavy digital compositing." },
      { label: "Release", year: "1995-11-18", text: "Premieres in Japan and becomes a global hit on home video." },
      { label: "Influence", year: "1999", text: "The Matrix acknowledges its cyberpunk lineage; the film enters film-school syllabi." },
      { label: "Legacy", text: "The definitive cyberpunk anime, with sequels, TV series, and adaptations." },
    ],
    related: [{ slug: "akira", type: "Shared cyberpunk lineage" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ghost_in_the_Shell_(1995_film)", title: "Ghost in the Shell (1995 film) — Wikipedia" },
    ],
  },
  {
    slug: "neon-genesis-evangelion",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx30-AI1zr74Dh4ye.jpg",
    title: "Neon Genesis Evangelion",
    japaneseTitle: "新世紀エヴァンゲリオン (Shin Seiki Evangerion)",
    altTitles: ["EVA", "Shin Seiki Evangelion"],
    synopsis:
      "Fifteen years after the Second Impact devastated the world, 14-year-old Shinji Ikari is summoned to the fortified city of Tokyo-3 to pilot the Evangelion Unit-01 against the mysterious Angels. Under the command of his estranged father, Shinji — and the other pilots, Rei and Asuka — confronts monsters, NERV's secrets, and the terrifying weight of human contact.",
    releaseDate: "1995-10-04",
    endDate: "1996-03-27",
    year: 1995,
    format: "TV",
    episodeCount: 26,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: "gainax",
    creator: "hideaki-anno",
    director: "hideaki-anno",
    genreSlugs: ["mecha", "psychological", "science-fiction", "drama"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "shinji-ikari",
        name: "Shinji Ikari",
        japaneseName: "碇 シンジ",
        role: "Protagonist",
        biography:
          "The reluctant pilot of Unit-01, abandoned by his father and terrified of intimacy. Shinji's psychological journey — his fear, flight, and fragile will to exist — is the series' real subject.",
        voiceActor: "Megumi Ogata",
      },
      {
        slug: "rei-ayanami",
        name: "Rei Ayanami",
        japaneseName: "綾波 レイ",
        role: "Pilot",
        biography:
          "The pale, enigmatic pilot of Unit-00, engineered as part of NERV's forbidden experiments. Rei's blankness conceals the series' deepest mysteries.",
        voiceActor: "Megumi Hayashibara",
      },
      {
        slug: "asuka-langley",
        name: "Asuka Langley Soryu",
        japaneseName: "惣流・アスカ・ラングレー",
        role: "Pilot",
        biography:
          "The German-Japanese prodigy pilot of Unit-02, brilliant, arrogant, and desperate for the approval her fractured history denied her.",
        voiceActor: "Yūko Miyamura",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Angel Attack",
        airDate: "1995-10-04",
        synopsis: "Shinji arrives in Tokyo-3 and is pressured into piloting Unit-01 against the Third Angel.",
      },
      { number: 2, title: "The Beast", airDate: "1995-10-11" },
      { number: 3, title: "A Transfer", airDate: "1995-10-18" },
      { number: 4, title: "Hedgehog's Dilemma", airDate: "1995-10-25" },
      { number: 5, title: "Rei I", airDate: "1995-11-01" },
    ],
    historicalSignificance:
      "The most analyzed anime series ever made. Evangelion dismantled the mecha genre from inside: robots as trauma machines, combat as psychological violence, and a finale that abandoned battle entirely for interiority. It made anime a medium of interpretation.",
    productionHistory:
      "Gainax's flagship production, directed by Hideaki Anno with Toshio Okada as a consultant and Sadamoto Yoshiyuki on character design. The final two episodes, animated under severe schedule pressure, pushed the series into abstract psychological territory and ignited decades of debate.",
    reception:
      "A cultural earthquake in Japan in 1995–96 and a worldwide phenomenon; the film End of Evangelion (1997) was released after fans protested the TV finale.",
    awards: "Best Animation at the 1997 Japan Media Arts Festival; honored at the 1996 Anime Grand Prix.",
    culturalImpact:
      "Evangelion proved anime could be a vehicle for authorial, formally radical art. Its imagery — Unit-01's silhouette, the Lance of Longinus, Rei's pale gaze — saturated global pop culture, and its analysis culture anticipated internet-era anime fandom.",
    legacy:
      "The Rebuild of Evangelion tetralogy (2007–2021) reframed the saga; countless series, from Madoka Magica to Darling in the Franxx, were made in its shadow.",
    historyTimeline: [
      { label: "Creation", year: "1993", text: "Anno develops the series as a deconstruction of mecha and otaku culture." },
      { label: "Premiere", year: "1995-10-04", text: "Broadcast begins on TV Tokyo; ratings rise as the series progresses." },
      { label: "Controversy", year: "1996-03", text: "The abstract finale ignites a national debate; fans demand resolution." },
      { label: "The End of Evangelion", year: "1997-07-19", text: "The theatrical ending premieres after the TV finale controversy." },
      { label: "Legacy", text: "The Rebuild tetralogy concludes in 2021; the series remains the most dissected work in anime." },
    ],
    related: [
      { slug: "mobile-suit-gundam", type: "Mecha deconstruction" },
      { slug: "cowboy-bebop", type: "1990s landmark" },
    ],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Neon_Genesis_Evangelion", title: "Neon Genesis Evangelion — Wikipedia" },
    ],
  },
  {
    slug: "perfect-blue",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx437-69NMlXKFeuse.jpg",
    title: "Perfect Blue",
    japaneseTitle: "パーフェクトブルー (Pāfekuto Burū)",
    altTitles: [],
    synopsis:
      "Pop idol Mima Kirigoe quits her singing group to become an actress. As a stalker's obsession grows and a series of murders begins, Mima's grip on reality frays — is she losing her mind, or is someone rewriting it for her?",
    releaseDate: "1997-08-29",
    year: 1997,
    format: "MOVIE",
    duration: 81,
    status: "FINISHED",
    sourceMaterial: "Novel by Yoshikazu Takeuchi",
    studio: "madhouse",
    director: "satoshi-kon",
    genreSlugs: ["psychological", "thriller", "horror", "drama"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "mima-kirigoe",
        name: "Mima Kirigoe",
        japaneseName: "霧越 未麻",
        role: "Protagonist",
        biography:
          "A pop idol transitioning into acting whose identity dissolves under the pressure of fame, a stalker, and a serial killer's shadow. Mima's descent is the film's terrifying engine.",
        voiceActor: "Junko Iwao",
      },
    ],
    episodes: [
      { number: 1, title: "Perfect Blue (Theatrical Feature)", airDate: "1997-07-12", synopsis: "Satoshi Kon's visionary psychological thriller." }
    ],
    historicalSignificance:
      "Satoshi Kon's directorial debut, and the first anime thriller built on identity disintegration. Its seamless match-cut transitions between fantasy and reality invented techniques now ubiquitous in cinema.",
    productionHistory:
      "Originally a straight-to-video thriller based on Yoshikazu Takeuchi's novel, Kon's feature debut was elevated to a theatrical release. Madhouse produced it on a modest budget with limited animation, which Kon turned into a stylistic weapon.",
    reception:
      "Won the Best Asian Film award at Fantasia 1998 and was championed by Darren Aronofsky, whose film Requiem for a Dream (2000) echoes scenes from Perfect Blue — an influence Aronofsky later licensed an anime scene from for Black Swan.",
    awards: "Best Animation Film at Fantasia Festival (1998).",
    culturalImpact:
      "Defined the 'idol horror' subgenre and the edit-as-assault visual language of modern thrillers; regularly appears on lists of the greatest animated films ever made.",
    legacy:
      "The first of four masterpieces that established Satoshi Kon as one of animation's great auteurs before his death in 2010.",
    historyTimeline: [
      { label: "Creation", year: "1991", text: "Yoshikazu Takeuchi's novel Perfect Blue is published." },
      { label: "Development", year: "1995", text: "Kon is hired to direct the adaptation at Madhouse." },
      { label: "Release", year: "1997-08-29", text: "Released theatrically in Japan after festival screenings." },
      { label: "Influence", year: "1998", text: "Fantasia Grand Prize; Aronofsky acquires rights to a scene for Black Swan." },
      { label: "Legacy", text: "Considered a landmark of psychological animation and modern editing." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Perfect_Blue", title: "Perfect Blue — Wikipedia" },
    ],
  },
  {
    slug: "cowboy-bebop",
    title: "Cowboy Bebop",
    japaneseTitle: "カウボーイビバップ (Kaubōi Bibappu)",
    altTitles: [],
    synopsis:
      "In 2071, bounty hunters Spike Spiegel and Jet Black roam the solar system aboard the spaceship Bebop, chasing criminals for pocket money. Joined by the amnesiac femme fatale Faye Valentine, the genius hacker Ed, and a corgi with a data chip, they drift through space and their own pasts — one last job, one last love, one last chance.",
    releaseDate: "1998-04-03",
    endDate: "1999-04-24",
    year: 1998,
    format: "TV",
    episodeCount: 26,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: "sunrise",
    director: "shinichiro-watanabe",
    genreSlugs: ["science-fiction", "action", "drama", "adventure"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "spike-spiegel",
        name: "Spike Spiegel",
        japaneseName: "スパイク・スピーゲル",
        role: "Protagonist",
        biography:
          "A former syndicate assassin who faked his own death. Lazy, deadly, and haunted by his last love, Spike embodies bebop: jazz-cool on the surface, elegiac underneath.",
        voiceActor: "Kōichi Yamadera",
      },
      {
        slug: "faye-valentine",
        name: "Faye Valentine",
        japaneseName: "フェイ・ヴァレンタイン",
        role: "Main character",
        biography:
          "A con woman frozen in a cryogenic accident, awake with no memory of her past and a mountain of debt. Faye's search for her own history is the series' quiet emotional anchor.",
        voiceActor: "Megumi Hayashibara",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Asteroid Blues",
        airDate: "1998-10-24",
        synopsis: "Spike and Jet hunt a drug smuggler with a stolen prototype fighter.",
      },
      { number: 2, title: "Stray Dog Strut" },
      { number: 3, title: "Honky Tonk Women" },
      { number: 4, title: "Gateway Shuffle" },
      { number: 5, title: "Ballad of Fallen Angels" },
      { number: 6, title: "Sympathy for the Devil" },
      { number: 7, title: "Heavy Metal Queen" },
      { number: 8, title: "Waltz for Venus" },
    ],
    historicalSignificance:
      "The series that proved anime could be pure, unapologetic cool. Its fusion of jazz, blues, and space noir was unprecedented on television, and its film-like episode structure influenced a generation of Western storytellers.",
    productionHistory:
      "Sunrise's in-house team led by Shinichirō Watanabe and character designer Toshihiro Kawamoto, with music by Yoko Kanno's Seatbelts. Initially broadcast late-night on WOWOW before moving to TV Tokyo.",
    reception:
      "A slow-burn hit that became an international classic; Adult Swim's 2001 US broadcast made it a defining anime of the American 2000s.",
    awards: "Japan Media Arts Festival Award (1998); widely ranked among the greatest anime series ever made.",
    culturalImpact:
      "Its opening, 'Tank!', became an internet-era anthem; the series' melancholy cool shaped the tone of countless later productions and the 2021 live-action adaptation.",
    legacy:
      "Consistently voted the greatest anime of the 1990s; Spike's final line, 'You're gonna carry that weight,' endures as pop-culture shorthand.",
    historyTimeline: [
      { label: "Development", year: "1997", text: "Watanabe and Sunrise begin work on the space noir series." },
      { label: "Premiere", year: "1998-04-03", text: "Late-night broadcast begins on WOWOW." },
      { label: "International", year: "2001", text: "Adult Swim broadcast turns Bebop into a Western anime classic." },
      { label: "Film", year: "2001-09-01", text: "Knockin' on Heaven's Door releases theatrically in Japan." },
      { label: "Legacy", text: "A benchmark of tone, music, and editing in television animation." },
    ],
    related: [{ slug: "neon-genesis-evangelion", type: "1990s landmark" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Cowboy_Bebop", title: "Cowboy Bebop — Wikipedia" },
    ],
  },
  {
    slug: "one-piece",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg",
    title: "One Piece",
    japaneseTitle: "ワンピース (Wan Pīsu)",
    altTitles: [],
    synopsis:
      "The Pirate King Gold Roger's last words set the world ablaze: 'You want my treasure? Find it! I left everything in that one place.' Twenty years later, rubber-bodied Monkey D. Luffy sets sail to become the next Pirate King, gathering the strangest, most loyal crew in the seas and chasing the legendary treasure — the One Piece.",
    releaseDate: "1999-10-20",
    year: 1999,
    format: "TV",
    episodeCount: 1122,
    duration: 24,
    status: "AIRING",
    sourceMaterial: "Manga by Eiichiro Oda (1997–present)",
    studio: "toei-animation",
    creator: "eiichiro-oda",
    genreSlugs: ["action", "adventure", "comedy", "drama", "fantasy"],
    eraSlug: "global-expansion",
    characters: [
      {
        slug: "luffy",
        name: "Monkey D. Luffy",
        japaneseName: "モンキー・D・ルフィ",
        role: "Protagonist",
        biography:
          "The rubber-bodied captain of the Straw Hat Pirates, whose grin and faith in freedom conquered the world's imagination. Luffy's unshakeable values — never abandon your crew, never give up your dream — define shōnen heroism in the 21st century.",
        voiceActor: "Mayumi Tanaka",
      },
    ],
    episodes: [{ number: 1, title: "I'm Luffy! The Man Who Will Become the Pirate King!" }],
    historicalSignificance:
      "The longest-running shōnen anime phenomenon of the modern era, airing continuously since 1999. One Piece's sustained quality and loyalty made it the standard-bearer of the long-runner format through three decades of industry change.",
    productionHistory:
      "Toei Animation has produced weekly episodes since October 1999 under a succession of series directors. The anime stayed on air through a 2024 production hiatus, returning with a modernized visual style, while Netflix's 2023 live-action adaptation brought a new generation to the story.",
    reception:
      "A perennial ratings leader in Japan and a global top-tier property; its 2023 Netflix live-action series was the streaming platform's most-watched show that year.",
    awards: "Guinness World Record for most copies of a single comic series; multiple Tokyo Anime Awards for the anime.",
    culturalImpact:
      "Luffy's straw hat and signature 'Gum-Gum' attacks are global symbols of the 2000s anime boom. One Piece has generated billions in merchandise, films, games, and live events.",
    legacy:
      "With 1,100+ episodes and counting, One Piece is the definitive document of continuous anime production — the industry's longest unbroken creative commitment.",
    historyTimeline: [
      { label: "Creation", year: "1997-07-19", text: "Oda's manga debuts in Weekly Shōnen Jump." },
      { label: "Premiere", year: "1999-10-20", text: "The anime begins on Fuji TV; it never leaves the airwaves." },
      { label: "Global era", year: "2010s", text: "Streaming and simulcasts make One Piece a worldwide weekly event." },
      { label: "Film phenomenon", year: "2022", text: "One Piece Film: Red earns over ¥19 billion, among the highest-grossing anime films." },
      { label: "Legacy", text: "The longest-running shōnen anime of its generation, still airing." },
    ],
    related: [{ slug: "dragon-ball", type: "Shōnen lineage" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/One_Piece_(TV_series)", title: "One Piece (TV series) — Wikipedia" },
    ],
  },
  {
    slug: "spirited-away",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx199-sWefXJvXkDOb.jpg",
    title: "Spirited Away",
    japaneseTitle: "千と千尋の神隠し (Sen to Chihiro no Kamikakushi)",
    altTitles: ["Sen to Chihiro no Kamikakushi"],
    synopsis:
      "Ten-year-old Chihiro's family stumbles into a deserted theme park that becomes a spirit realm at dusk. Her parents are turned into pigs, and Chihiro must survive the bathhouse of the witch Yubaba, earning her name back by working, remembering who she is, and finding the courage that was always inside her.",
    releaseDate: "2001-07-20",
    year: 2001,
    format: "MOVIE",
    duration: 125,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: "studio-ghibli",
    creator: "hayao-miyazaki",
    director: "hayao-miyazaki",
    genreSlugs: ["fantasy", "adventure", "drama"],
    eraSlug: "digital-revolution",
    characters: [
      {
        slug: "chihiro",
        name: "Chihiro Ogino / Sen",
        japaneseName: "荻野 千尋",
        role: "Protagonist",
        biography:
          "A sulky, ordinary ten-year-old who loses her name and nearly her family in the spirit world. Chihiro's quiet growth — from frightened girl to a girl who saves her world — is anime's most beloved coming-of-age story.",
        voiceActor: "Rumi Hiiragi",
      },
      {
        slug: "no-face",
        name: "No-Face",
        japaneseName: "カオナシ",
        role: "Spirit",
        biography:
          "A lonely spirit drawn to the bathhouse's greed, whose blank mask mirrors the emptiness of unchecked consumption before Chihiro's kindness restores his silence.",
        voiceActor: "Akio Nakamura",
      },
    ],
    episodes: [
      { number: 1, title: "Spirited Away (Theatrical Feature)", airDate: "2001-07-20", synopsis: "Hayao Miyazaki's Academy Award-winning fantasy masterpiece." }
    ],
    historicalSignificance:
      "The highest-grossing film in Japanese history for 19 years and the first (and still only) non-English-language film to win the Academy Award for Best Animated Feature. Spirited Away made anime a global cinematic art form.",
    productionHistory:
      "Ghibli's most elaborate production to date, hand-animated with tens of thousands of cels. Miyazaki personally supervised nearly every frame of key sequences; the bathhouse alone required months of design.",
    reception:
      "Universal critical acclaim, with Roger Ebert calling it one of the greatest films ever made. Its $30 billion-yen+ gross (over $350 million worldwide) shattered records.",
    awards: "Academy Award for Best Animated Feature (2003); Golden Bear at the 2002 Berlin Film Festival; Japan Academy Prize for Picture of the Year.",
    culturalImpact:
      "An international introduction to Japanese animation for a generation. Its images — the steam-filled bathhouse, No-Face, the sea train — became icons of world cinema, and its themes of memory and identity resonated across cultures.",
    legacy:
      "The film that transformed public perception of animation as cinema; its record stood until Demon Slayer's Mugen Train in 2020.",
    historyTimeline: [
      { label: "Development", year: "1999", text: "Miyazaki begins the story of a girl who must save her name." },
      { label: "Release", year: "2001-07-20", text: "Opens in Japan, becoming the country's highest-grossing film ever." },
      { label: "International", year: "2002", text: "Golden Bear at Berlin; worldwide distribution begins." },
      { label: "Academy Award", year: "2003-03-23", text: "Wins Best Animated Feature at the 75th Academy Awards." },
      { label: "Legacy", text: "The definitive international masterpiece of anime cinema." },
    ],
    related: [{ slug: "your-name", type: "Modern successor" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Spirited_Away", title: "Spirited Away — Wikipedia" },
    ],
  },
  {
    slug: "naruto",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-dE6UHbFFg1A5.jpg",
    title: "Naruto",
    japaneseTitle: "ナルト",
    altTitles: [],
    synopsis:
      "In the hidden ninja village of Konoha, a hyperactive orphan named Naruto Uzumaki carries the Nine-Tailed Fox sealed within him — a burden that makes his village shun him and his dream of becoming Hokage absurd. Through fights, failures, and friendships, Naruto chases the recognition that will prove he matters.",
    releaseDate: "2002-10-03",
    endDate: "2007-02-08",
    year: 2002,
    format: "TV",
    episodeCount: 220,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Masashi Kishimoto (1999–2014)",
    studio: "studio-pierrot",
    creator: "masashi-kishimoto",
    genreSlugs: ["action", "adventure", "drama"],
    eraSlug: "digital-revolution",
    characters: [
      {
        slug: "naruto-uzumaki",
        name: "Naruto Uzumaki",
        japaneseName: "うずまき ナルト",
        role: "Protagonist",
        biography:
          "The loud, loyal, ramen-addicted ninja with the Nine-Tailed Fox inside him. Naruto's refusal to accept hatred as his fate — and his ninja way of never going back on his word — made him a hero to millions.",
        voiceActor: "Junko Takeuchi",
      },
    ],
    episodes: [{ number: 1, title: "Enter: Naruto Uzumaki!" }],
    historicalSignificance:
      "The defining shōnen anime of the 2000s. Naruto carried anime's global expansion into new markets — particularly the Americas — and its ninja mythology became a generation's shared language.",
    productionHistory:
      "Studio Pierrot adapted Kishimoto's manga from 2002, adding long filler arcs that kept the series on air through 2007; its sequel Naruto: Shippuden ran 2007–2017, totaling over 700 episodes.",
    reception:
      "A worldwide phenomenon with strong ratings in Japan and dedicated fanbases in North America, Latin America, and Europe; its final chapter was a global media event.",
    awards: "Multiple Tokyo Anime Awards; the franchise has sold over 250 million copies worldwide across media.",
    culturalImpact:
      "Naruto's headband, hand signs, and catchphrases penetrated mainstream culture; its themes of loneliness and redemption resonated universally, and its 'Talk no Jutsu' even entered internet slang.",
    legacy:
      "Its successor Boruto continues the franchise; Naruto stands beside Dragon Ball and One Piece as one of the three pillars of modern shōnen anime.",
    historyTimeline: [
      { label: "Creation", year: "1999", text: "Kishimoto's manga begins in Weekly Shōnen Jump." },
      { label: "Premiere", year: "2002-10-03", text: "The anime debuts on TV Tokyo." },
      { label: "Shippuden", year: "2007-02-15", text: "The sequel series begins, airing until 2017." },
      { label: "Global era", year: "2010s", text: "The series becomes a staple of streaming and broadcast worldwide." },
      { label: "Legacy", text: "One of the best-selling manga/anime franchises ever; 700+ episodes across both series." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Naruto", title: "Naruto — Wikipedia" },
    ],
  },
  {
    slug: "death-note",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-kUgkcrfOrkUM.jpg",
    title: "Death Note",
    japaneseTitle: "デスノート (Desu Nōto)",
    altTitles: [],
    synopsis:
      "A bored genius, Light Yagami, finds a notebook dropped by a shinigami: write a name, and that person dies. Convinced he can perfect the world by erasing criminals, Light becomes 'Kira' — and finds himself in a global battle of wits with the world's greatest detective, the enigmatic L.",
    releaseDate: "2006-10-04",
    endDate: "2007-06-27",
    year: 2006,
    format: "TV",
    episodeCount: 37,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Tsugumi Ohba and Takeshi Obata (2003–2006)",
    studio: "madhouse",
    director: "tetsuro-araki",
    genreSlugs: ["mystery", "psychological", "thriller", "supernatural"],
    eraSlug: "digital-revolution",
    characters: [
      {
        slug: "light-yagami",
        name: "Light Yagami",
        japaneseName: "夜神 月",
        role: "Protagonist",
        biography:
          "Japan's brightest high-schooler, who becomes the self-appointed god of a new world. Light's charisma and descent from idealist to tyrant make Death Note one of the great moral dramas in anime.",
        voiceActor: "Mamoru Miyano",
      },
      {
        slug: "l",
        name: "L",
        japaneseName: "エル",
        role: "Rival detective",
        biography:
          "The world's greatest detective: brilliant, eccentric, and always eating sweets. L's duel with Light is the series' intellectual heart.",
        voiceActor: "Kappei Yamaguchi",
      },
    ],
    episodes: [
      { number: 1, title: "Rebirth", airDate: "2006-10-04", synopsis: "Light discovers the Death Note and begins his purge of criminals." },
      { number: 2, title: "Confrontation" },
      { number: 3, title: "Dealings" },
      { number: 4, title: "Pursuit" },
      { number: 5, title: "Tactics" },
    ],
    historicalSignificance:
      "The definitive intellectual-thriller anime. Death Note's cat-and-mouse duel between Light and L proved anime could carry high-concept, adult-skewing drama for a mass audience — and became one of the most successful anime exports of its decade.",
    productionHistory:
      "Madhouse's adaptation, directed by Tetsurō Araki, kept the manga's breakneck pacing with noir styling and a chilling score by Yoshihisa Hirano and Hideki Taniuchi.",
    reception:
      "A worldwide hit, particularly in the West, where its 2007–2009 Adult Swim airings were appointment television; its live-action Japanese films were also box-office successes.",
    awards: "Best TV series at multiple festivals; the franchise has sold over 30 million copies worldwide.",
    culturalImpact:
      "Death Note's premise became instantly iconic — the notebook, the rules, 'I'll take a potato chip... and eat it!' — and remains a fixture of internet culture and cosplay.",
    legacy:
      "Its moral architecture influenced everything from streaming thrillers to The Promised Neverland; a 2020s Netflix series followed the 2006 films and 2015 TV drama.",
    historyTimeline: [
      { label: "Creation", year: "2003-12", text: "Ohba and Obata's manga begins in Weekly Shōnen Jump." },
      { label: "Premiere", year: "2006-10-04", text: "The anime debuts on Nippon TV." },
      { label: "International", year: "2007", text: "Becomes a flagship series for Adult Swim's late-night block." },
      { label: "Live-action", year: "2006", text: "Japanese films release; the franchise expands into dramas and musicals." },
      { label: "Legacy", text: "A canon work of the psychological thriller genre in any medium." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Death_Note", title: "Death Note — Wikipedia" },
    ],
  },
  {
    slug: "fullmetal-alchemist-brotherhood",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5114-nSWCgQlmOMtj.jpg",
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST (Hagane no Renkinjutsushi)",
    altTitles: ["FMA: Brotherhood", "Hagaren"],
    synopsis:
      "After a failed human transmutation costs Edward Elric his limbs and his brother Alphonse his body, the brothers search for the Philosopher's Stone — the only way to restore themselves. Their journey uncovers a conspiracy at the heart of Amestris, the true nature of alchemy, and the price of playing god.",
    releaseDate: "2009-04-05",
    endDate: "2010-07-04",
    year: 2009,
    format: "TV",
    episodeCount: 64,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Hiromu Arakawa (2001–2010)",
    studio: "bones",
    creator: "hiromu-arakawa",
    genreSlugs: ["action", "adventure", "drama", "fantasy"],
    eraSlug: "digital-revolution",
    characters: [
      {
        slug: "edward-elric",
        name: "Edward Elric",
        japaneseName: "エドワード・エルリック",
        role: "Protagonist",
        biography:
          "The 'Fullmetal Alchemist': a genius state alchemist who traded his limbs to try to bring his mother back. Short in stature, enormous in determination, Edward carries the series' moral weight.",
        voiceActor: "Romi Park",
      },
    ],
    episodes: [{ number: 1, title: "Fullmetal Alchemist" }],
    historicalSignificance:
      "The definitive shōnen adaptation of the 2000s, famously faithful to its source: the 2009 Brotherhood aired precisely as the manga reached its endgame. It is routinely ranked the greatest anime series ever made.",
    productionHistory:
      "Bones produced Brotherhood in parallel with the manga's conclusion, consulting Arakawa directly. Its consistent 64-episode arc and cinematic set-pieces set a new standard for adaptation ambition.",
    reception:
      "Universal acclaim; it topped Japanese and international polls including the 2019 NHK survey of the greatest anime, and remains among the highest-rated series on aggregators worldwide.",
    awards: "Japan Media Arts Festival Award; multiple Tokyo Anime Awards; winner of international anime polls for over a decade.",
    culturalImpact:
      "Its law of equivalent exchange — 'to obtain, something of equal value must be lost' — became a global catchphrase and philosophical entry point into anime.",
    legacy:
      "The benchmark against which shōnen adaptations are measured; its final run of episodes is cited as among the best conclusions in serialized television.",
    historyTimeline: [
      { label: "Creation", year: "2001-07", text: "Arakawa's manga begins serialization in Monthly Shōnen Gangan." },
      { label: "First adaptation", year: "2003", text: "An earlier Bones series diverges from the still-running manga." },
      { label: "Brotherhood", year: "2009-04-05", text: "The faithful adaptation premieres on MBS, airing to 2010." },
      { label: "Legacy", text: "Consistently ranked the greatest anime series of all time in polls." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Fullmetal_Alchemist:_Brotherhood", title: "Fullmetal Alchemist: Brotherhood — Wikipedia" },
    ],
  },
  {
    slug: "k-on",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5680-r3AI3Cwfv0Aq.png",
    title: "K-On!",
    japaneseTitle: "けいおん！ (Keion!)",
    altTitles: ["Keion!"],
    synopsis:
      "To save her high school's music club from disbanding, airheaded guitarist Yui Hirasawa joins the light music club — and discovers that cake, tea, and friendship matter far more than musical proficiency. The four girls' daily life becomes anime's most beloved slice-of-life comedy.",
    releaseDate: "2009-04-03",
    endDate: "2009-06-26",
    year: 2009,
    format: "TV",
    episodeCount: 13,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Kakifly (2007–2010)",
    studio: "kyoto-animation",
    director: "naoko-yamada",
    genreSlugs: ["slice-of-life", "comedy", "drama"],
    eraSlug: "digital-revolution",
    characters: [
      { slug: "taki-tachibana", name: "Taki Tachibana", japaneseName: "立花 瀧", role: "Protagonist", biography: "A high school boy in Tokyo who works as a waiter and aspires to be an architect.", voiceActor: "Ryunosuke Kamiki" },
      { slug: "mitsuha-miyamizu", name: "Mitsuha Miyamizu", japaneseName: "宮水 三葉", role: "Protagonist", biography: "A high school girl and shrine maiden in the mountain town of Itomori.", voiceActor: "Mone Kamishiraishi" }
    ],
    episodes: [
      { number: 1, title: "Your Name (Theatrical Feature)", airDate: "2016-08-26", synopsis: "Makoto Shinkai's historic body-swapping romantic fantasy." }
    ],
    historicalSignificance:
      "The series that defined 'cute girls doing cute things' — and elevated it to art. K-On!'s delicate character acting and Kyoto Animation's in-house craft made the genre the decade's dominant commercial force.",
    productionHistory:
      "Kyoto Animation's adaptation, directed by Naoko Yamada, expanded Kakifly's four-panel manga into a masterclass of character animation — tiny hand gestures, musical timing, and expressive silhouettes.",
    reception:
      "A massive hit that spawned a second season, a film, and a merchandise empire; the Blu-ray volumes consistently topped Japanese charts.",
    awards: "Multiple Tokyo Anime Awards; K-On! was named among the decade's best anime by multiple publications.",
    culturalImpact:
      "Its band, Ho-kago Tea Time, released chart-topping albums; its concert film broke records for anime films, and 'Moe' became a mainstream cultural descriptor.",
    legacy:
      "K-On! inaugurated the modern moe-slice-of-life boom and remains Kyoto Animation's signature achievement.",
    historyTimeline: [
      { label: "Creation", year: "2007", text: "Kakifly's four-panel manga begins in Manga Time Kirara." },
      { label: "Premiere", year: "2009-04-03", text: "The anime debuts on TBS." },
      { label: "Second season", year: "2010-04-07", text: "K-On!! premieres with 26 episodes." },
      { label: "Legacy", text: "A landmark of the modern slice-of-life genre." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/K-On!", title: "K-On! — Wikipedia" },
    ],
  },
  {
    slug: "attack-on-titan",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg",
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人 (Shingeki no Kyojin)",
    altTitles: ["Shingeki no Kyojin", "AOT"],
    synopsis:
      "Humanity survives behind triple walls against the Titans — giants who devour humans. When the Colossal Titan breaches the wall, young Eren Yeager loses his mother and vows extermination. But as the walls fall and the truth of the Titans emerges, Eren's war becomes an unanswerable moral catastrophe.",
    releaseDate: "2013-04-07",
    endDate: "2023-11-05",
    year: 2013,
    format: "TV",
    episodeCount: 94,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Hajime Isayama (2009–2021)",
    studio: "wit-studio",
    creator: "hajime-isayama",
    director: "tetsuro-araki",
    genreSlugs: ["action", "drama", "fantasy", "psychological"],
    eraSlug: "streaming-era",
    characters: [
      {
        slug: "eren-yeager",
        name: "Eren Yeager",
        japaneseName: "エレン・イェーガー",
        role: "Protagonist",
        biography:
          "From rage-filled boy to world-ending force, Eren's arc is anime's most argued moral journey. His final actions turned a shōnen battle epic into a tragedy about freedom, cycles of violence, and the costs of conviction.",
        voiceActor: "Yūki Kaji",
      },
      {
        slug: "mikasa-ackerman",
        name: "Mikasa Ackerman",
        japaneseName: "ミカサ・アッカーマン",
        role: "Main character",
        biography:
          "The series' most formidable soldier, devoted to Eren since childhood. Mikasa's strength is matched only by her silent, consuming love.",
        voiceActor: "Yui Ishikawa",
      },
    ],
    episodes: [
      { number: 1, title: "To You, in 2000 Years", airDate: "2013-04-07", synopsis: "The Colossal Titan breaches Wall Maria; Eren witnesses the fall of Shiganshina." },
      { number: 2, title: "That Day" },
      { number: 3, title: "A Dim Light Amid Despair" },
      { number: 4, title: "The Night of the Closing Ceremony" },
    ],
    historicalSignificance:
      "The defining global anime of the 2010s. Attack on Titan fused prestige-TV production values with shōnen thrills, became a worldwide appointment-event on streaming, and ended its ten-year run as one of the most debated stories in modern entertainment.",
    productionHistory:
      "WIT Studio (Production I.G subsidiary) produced seasons 1–3 with cinematic direction from Tetsurō Araki; MAPPA took over for the final season (2020–2023). The production spanned two studios and a global pandemic.",
    reception:
      "Record-breaking worldwide: its final episodes were among the most-watched anime events ever, and it swept awards from anime festivals to The Game Awards' soundtrack category.",
    awards: "Multiple Tokyo Anime Awards, Crunchyroll Anime Awards, and Japanese animation festival honors; the soundtrack by Hiroyuki Sawano is among the most famous in anime.",
    culturalImpact:
      "'Shinzou wo Sasageyo!' and the Survey Corps wings became global symbols; the series drove streaming subscriptions worldwide and proved anime could command event-level Western fandom.",
    legacy:
      "Its controversial conclusion — and the discourse around it — cemented its place as the most consequential anime of its decade, demonstrating the medium's cultural reach.",
    historyTimeline: [
      { label: "Creation", year: "2009-09", text: "Isayama's manga begins in Bessatsu Shōnen Magazine." },
      { label: "Premiere", year: "2013-04-07", text: "Season 1 airs on MBS; simulcast worldwide within hours." },
      { label: "Phenomenon", year: "2013–2018", text: "Seasons 1–3 turn the series into a global appointment event." },
      { label: "Final season", year: "2020-12-06", text: "MAPPA produces the final season amid a worldwide pandemic." },
      { label: "Conclusion", year: "2023-11-05", text: "The finale airs; the series ends as a decade-defining global phenomenon." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Attack_on_Titan", title: "Attack on Titan — Wikipedia" },
    ],
  },
  {
    slug: "your-name",
    title: "Your Name",
    japaneseTitle: "君の名は。 (Kimi no Na wa.)",
    altTitles: ["Kimi no Na wa."],
    synopsis:
      "A rural high-school girl who longs for Tokyo and a Tokyo boy who can't find his place begin swapping bodies in their sleep. As their connection deepens across the divide of distance — and of something far stranger — the two must find each other before a celestial disaster separates them forever.",
    releaseDate: "2016-08-26",
    year: 2016,
    format: "MOVIE",
    duration: 106,
    status: "FINISHED",
    sourceMaterial: "Original",
    studio: "comix-wave-films",
    creator: "makoto-shinkai",
    director: "makoto-shinkai",
    genreSlugs: ["romance", "fantasy", "drama"],
    eraSlug: "streaming-era",
    characters: [
      { slug: "taki-tachibana", name: "Taki Tachibana", japaneseName: "立花 瀧", role: "Protagonist", biography: "A high school boy in Tokyo who works as a waiter and aspires to be an architect.", voiceActor: "Ryunosuke Kamiki" },
      { slug: "mitsuha-miyamizu", name: "Mitsuha Miyamizu", japaneseName: "宮水 三葉", role: "Protagonist", biography: "A high school girl and shrine maiden in the mountain town of Itomori.", voiceActor: "Mone Kamishiraishi" }
    ],
    episodes: [
      { number: 1, title: "Your Name (Theatrical Feature)", airDate: "2016-08-26", synopsis: "Makoto Shinkai's historic body-swapping romantic fantasy." }
    ],
    historicalSignificance:
      "The anime film that transcended anime. Your Name became the first anime not directed by Miyazaki to top the global box office conversation, grossing over $380 million worldwide and making Makoto Shinkai a household name.",
    productionHistory:
      "Shinkai wrote the novel and script while CoMix Wave Films assembled a crew of hundreds, with character design by Masayoshi Tanaka, animation direction by Masashi Ando, and the music of RADWIMPS. Its hyper-detailed skies and light were produced with a combination of hand painting and digital grading.",
    reception:
      "Broke Spirited Away's records in China and Japan; won the Japanese Academy Prize for Animation of the Year and received a worldwide critical reception that bordered on unanimous.",
    awards: "Japan Academy Prize for Animation of the Year (2017); Los Angeles Film Critics Association Award for Best Animated Film (2016); multiple anime festival awards.",
    culturalImpact:
      "The phrase 'kimi no na wa' (what's your name?) became a global catchphrase; the film drove a tourism boom in its Hida setting and demonstrated the international ceiling for anime films.",
    legacy:
      "Your Name redefined the scale of anime cinema outside Ghibli and set the template for the decade's romantic blockbusters, from Weathering with You to Suzume.",
    historyTimeline: [
      { label: "Development", year: "2014", text: "Shinkai begins work on the body-swapping romance concept." },
      { label: "Release", year: "2016-08-26", text: "Premieres in Japan; it becomes the year's global anime phenomenon." },
      { label: "Record run", year: "2016–17", text: "Earns over ¥40 billion worldwide; breaks long-standing box office records." },
      { label: "Legacy", text: "The most commercially successful anime film of its decade." },
    ],
    related: [{ slug: "spirited-away", type: "Record predecessor" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Your_Name", title: "Your Name — Wikipedia" },
    ],
  },
  {
    slug: "demon-slayer",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg",
    title: "Demon Slayer: Kimetsu no Yaiba",
    japaneseTitle: "鬼滅の刃 (Kimetsu no Yaiba)",
    altTitles: ["Kimetsu no Yaiba", "Demon Slayer"],
    synopsis:
      "After demons murder his family and turn his sister Nezuko into one, gentle-hearted Tanjiro Kamado takes up the sword of the Demon Slayer Corps. His quest to find a cure and avenge his family carries him into a war against the Demon King Muzan — and through the most spectacular sword fights ever animated.",
    releaseDate: "2019-04-06",
    endDate: "2019-09-28",
    year: 2019,
    format: "TV",
    episodeCount: 26,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Koyoharu Gotouge (2016–2020)",
    studio: "ufotable",
    creator: "koyoharu-gotouge",
    director: "haruo-sotozaki",
    genreSlugs: ["action", "adventure", "fantasy", "supernatural"],
    eraSlug: "streaming-era",
    characters: [
      {
        slug: "tanjiro-kamado",
        name: "Tanjiro Kamado",
        japaneseName: "竈門 炭治郎",
        role: "Protagonist",
        biography:
          "A charcoal seller whose kindness survived tragedy. Tanjiro's sense of smell, water-breathing techniques, and bottomless compassion made him the defining hero of the 2020s boom.",
        voiceActor: "Natsuki Hanae",
      },
      {
        slug: "nezuko-kamado",
        name: "Nezuko Kamado",
        japaneseName: "竈門 禰豆子",
        role: "Main character",
        biography:
          "Tanjiro's sister, turned demon but refusing to harm humans. Her bamboo muzzle and protective bond with her brother became icons of modern anime.",
        voiceActor: "Akari Kitō",
      },
    ],
    episodes: [
      { number: 1, title: "Cruelty", airDate: "2019-04-06", synopsis: "Tanjiro returns to find his family slaughtered and Nezuko turned into a demon." },
      { number: 2, title: "Trainer Sakonji Urokodaki" },
      { number: 3, title: "Sabito and Makomo" },
      { number: 4, title: "Final Selection" },
      { number: 5, title: "My Own Steel" },
    ],
    historicalSignificance:
      "The global anime phenomenon of the streaming era. Demon Slayer's 2020 film Mugen Train became the highest-grossing anime film in history and the first film to surpass ¥40 billion in Japan, dethroning Spirited Away's 19-year record.",
    productionHistory:
      "Ufotable's adaptation of Gotouge's manga paired impeccable shōnen pacing with the studio's signature 2D/3D lighting and particle effects, making each fight sequence a theatrical event.",
    reception:
      "A word-of-mouth explosion in 2019 that reached pop-culture saturation in Japan and worldwide; its final arc anime concluded in 2025.",
    awards: "Anime of the Year at the Crunchyroll Anime Awards (2020); Japanese Academy Prize for Animation of the Year (2021); Mugen Train's box office records are certified by Guinness World Records.",
    culturalImpact:
      "The phenomenon that defined the 2020s anime boom: a t-shirt meme became a fashion statement, and its theatrical model — TV season, then feature film — redefined how anime franchises release content.",
    legacy:
      "Demon Slayer proved the ceiling of anime's commercial and cultural reach, and its Infinity Castle trilogy concluded the saga in 2025–26 as global events.",
    historyTimeline: [
      { label: "Creation", year: "2016-02", text: "Gotouge's manga begins in Weekly Shōnen Jump." },
      { label: "Premiere", year: "2019-04-06", text: "The anime airs and becomes a global phenomenon." },
      { label: "Record film", year: "2020-10-16", text: "Mugen Train opens, breaking all Japanese box office records within months." },
      { label: "Global era", year: "2020–2025", text: "Each subsequent season and film is a worldwide event." },
      { label: "Legacy", text: "The defining franchise of 2020s anime, concluding with the Infinity Castle films." },
    ],
    related: [{ slug: "jujutsu-kaisen", type: "Contemporary rival" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba_(TV_series)", title: "Demon Slayer: Kimetsu no Yaiba (TV series) — Wikipedia" },
    ],
  },
  {
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    japaneseTitle: "呪術廻戦 (Jujutsu Kaisen)",
    altTitles: ["Jujutsu Kaisen"],
    synopsis:
      "To save his friends from a cursed spirit, Yuji Itadori swallows the rotting finger of the ancient demon Ryomen Sukuna and becomes his vessel. Enrolled at Tokyo's Jujutsu High, Yuji trains to exorcise curses with the sorcerers Megumi and Nobara — even as Sukuna's malevolence waits inside him.",
    releaseDate: "2020-10-03",
    endDate: "2021-03-27",
    year: 2020,
    format: "TV",
    episodeCount: 24,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Gege Akutami (2018–2024)",
    studio: "mappa",
    creator: "gege-akutami",
    director: "sunghoo-park",
    genreSlugs: ["action", "supernatural", "fantasy", "drama"],
    eraSlug: "modern-anime",
    characters: [
      {
        slug: "yuji-itadori",
        name: "Yuji Itadori",
        japaneseName: "虎杖 悠仁",
        role: "Protagonist",
        biography:
          "A superhumanly fit high-schooler who becomes the vessel of Sukuna. Yuji's cheerful strength and growing dread at his own nature make him the modern shōnen hero par excellence.",
        voiceActor: "Junya Enoki",
      },
      {
        slug: "gojo-satoru",
        name: "Satoru Gojo",
        japaneseName: "五条 悟",
        role: "Mentor",
        biography:
          "The strongest jujutsu sorcerer alive, blindfolded and flippant — until the series reveals the weight of being Japan's sole guardian against annihilation.",
        voiceActor: "Yūichi Nakamura",
      },
    ],
    episodes: [{ number: 1, title: "Ryomen Sukuna" }],
    historicalSignificance:
      "The flagship title of the 2020s shōnen wave. Jujutsu Kaisen's white-hot popularity, driven by MAPPA's kinetic action animation, made it the fastest-selling manga in history at its peak and a worldwide merchandising phenomenon.",
    productionHistory:
      "MAPPA's adaptation, directed by Sunghoo Park with cinematography by Shōichi Shigematsu, set new standards for TV action animation; the series' film, Jujutsu Kaisen 0 (2021), grossed over ¥19 billion.",
    reception:
      "A global hit on a scale rarely seen since Demon Slayer, with its second season's Shibuya arc acclaimed as a landmark of television action.",
    awards: "Multiple Crunchyroll Anime Awards including Anime of the Year (2021); its film won the Japanese Academy Prize.",
    culturalImpact:
      "Gojo's blue eyes, domain expansions, and the 'Hollow Purple' meme saturated social media; Jujutsu Kaisen became the representative franchise of Gen Z anime fandom.",
    legacy:
      "Its completion in 2024 (manga) and final anime season make it a defining document of the 2020s streaming boom.",
    historyTimeline: [
      { label: "Creation", year: "2018-03", text: "Akutami's manga begins in Weekly Shōnen Jump." },
      { label: "Premiere", year: "2020-10-03", text: "The anime debuts on MBS/TBS, becoming an immediate global hit." },
      { label: "Film record", year: "2021-12-24", text: "Jujutsu Kaisen 0 releases; the franchise solidifies its worldwide status." },
      { label: "Legacy", text: "The defining shōnen anime of the early 2020s." },
    ],
    related: [{ slug: "demon-slayer", type: "Contemporary rival" }],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jujutsu_Kaisen_(TV_series)", title: "Jujutsu Kaisen (TV series) — Wikipedia" },
    ],
  },
  {
    slug: "frieren-beyond-journeys-end",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx170068-ijY3tCP8KoWP.jpg",
    title: "Frieren: Beyond Journey's End",
    japaneseTitle: "葬送のフリーレン (Sōsō no Furīren)",
    altTitles: ["Frieren", "Sōsō no Furīren"],
    synopsis:
      "After the demon king is slain, the elf mage Frieren — who will live a thousand years — must outlive the heroes she traveled with. Her decades-later return to her old companions' graves begins a new pilgrimage through the memories of the world, and a meditation on time, grief, and what it means to truly know someone.",
    releaseDate: "2023-09-29",
    endDate: "2024-03-22",
    year: 2023,
    format: "TV",
    episodeCount: 28,
    duration: 24,
    status: "FINISHED",
    sourceMaterial: "Manga by Kanehito Yamada and Tsukasa Abe (2020–present)",
    studio: "madhouse",
    creator: "kanehito-yamada",
    director: "keiichiro-saito",
    genreSlugs: ["fantasy", "drama", "adventure", "slice-of-life"],
    eraSlug: "modern-anime",
    characters: [
      {
        slug: "frieren",
        name: "Frieren",
        japaneseName: "フリーレン",
        role: "Protagonist",
        biography:
          "An elf mage who outlived her party. Frieren's journey to understand the humans she loved — too late, and then in time — made her the most acclaimed anime protagonist of the 2020s.",
        voiceActor: "Atsumi Tanezaki",
      },
      {
        slug: "fern",
        name: "Fern",
        japaneseName: "フェルン",
        role: "Main character",
        biography:
          "The orphaned mage raised by Frieren's late party member Heiter. Precise, composed, and quietly formidable, Fern anchors Frieren's new journey.",
        voiceActor: "Kana Ichinose",
      },
    ],
    episodes: [
      { number: 1, title: "The Journey's End", airDate: "2023-09-29", synopsis: "Frieren watches the hero Himmel's funeral decades after their victory." },
      { number: 2, title: "It Didn't Have to Be Magic" },
      { number: 3, title: "Killing Magic" },
    ],
    historicalSignificance:
      "The critical darling of 2020s anime. Frieren took the post-victory fantasy premise and inverted it into a quiet, literary meditation on mortality — earning comparisons to the greatest works of the medium while becoming a genuine global hit.",
    productionHistory:
      "Madhouse's adaptation, directed by Keiichirō Saitō, preserved the manga's gentle tempo with a classical score by Evan Call, and its restraint proved that stillness could be as breathtaking as spectacle.",
    reception:
      "Won Anime of the Year at the 2024 Crunchyroll Anime Awards and was universally praised; its manga became a bestseller across Europe and the Americas.",
    awards: "Anime of the Year at the Crunchyroll Anime Awards (2024); multiple category wins across international anime awards.",
    culturalImpact:
      "Its theme of cherishing the ordinary time we have resonated globally during the streaming era; 'Frieren-style' quiet fantasy became an industry trend.",
    legacy:
      "Already cited as a modern classic, Frieren demonstrates that anime's 2020s commercial peak coexists with its most literary storytelling.",
    historyTimeline: [
      { label: "Creation", year: "2020-02", text: "Yamada and Abe's manga begins in Weekly Shōnen Sunday." },
      { label: "Premiere", year: "2023-09-29", text: "The anime debuts on Nippon TV, becoming an international critical hit." },
      { label: "Awards", year: "2024-03", text: "Wins Anime of the Year at the Crunchyroll Anime Awards." },
      { label: "Legacy", text: "A modern classic of contemplative fantasy anime." },
    ],
    related: [],
    sources: [
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Frieren:_Beyond_Journey%27s_End", title: "Frieren: Beyond Journey's End — Wikipedia" },
    ],
  },
];
