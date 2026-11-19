export type AnimeFormat = "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "WEB";
export type AnimeStatus = "FINISHED" | "AIRING" | "UPCOMING" | "UNKNOWN";

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
  related?: { slug: string; type: string }[];
  sources?: { name: string; url: string; title: string }[];
}

export interface IsekaiAnimeEntry extends AnimeSeed {
  type: "TV";
}

// ---------------------------------------------------------------------------
// Batch 1 Studios
// ---------------------------------------------------------------------------

export const batch1Studios: {
  slug: string;
  name: string;
  japaneseName?: string;
  establishedYear?: number;
  about: string;
  location?: string;
}[] = [
  {
    slug: "kinema-citrus",
    name: "Kinema Citrus",
    japaneseName: "株式会社キネマシトラス",
    establishedYear: 2008,
    about:
      "Renowned boutique animation studio founded by former Production I.G and Bones staff. Celebrated for high-caliber art direction and expressive character animation on Made in Abyss, The Rising of the Shield Hero, and Revue Starlight.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "nexus",
    name: "Nexus",
    japaneseName: "株式会社Nexus",
    establishedYear: 2012,
    about:
      "High-end animation studio founded by former A-1 Pictures staff. Famous for outstanding kinetic action choreography, stylish compositing, and comedic timing in The Eminence in Shadow, Darwin's Game, and Chivalry of a Failed Knight.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "nut",
    name: "Studio NUT",
    japaneseName: "株式会社ナット",
    establishedYear: 2017,
    about:
      "Dynamic animation studio founded by former Madhouse producer Takuya Tsunoki. Acclaimed for gritty military choreography, dieselpunk aesthetics, and creative action sequences in The Saga of Tanya the Evil and Deca-Dence.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "c2c",
    name: "C2C",
    japaneseName: "株式会社C2C",
    establishedYear: 2006,
    about:
      "Prolific animation studio named 'Challenge To Challenge', known for its robust in-house key animation capacity and superb action set pieces in Tsukimichi: Moonlit Fantasy, Shangri-La Frontier, and Wandering Witch: The Journey of Elaina.",
    location: "Nishitokyo, Tokyo, Japan",
  },
  {
    slug: "asread",
    name: "Asread",
    japaneseName: "株式会社アスリード",
    establishedYear: 2003,
    about:
      "Animation studio established by former Xebec animators. Noted for action and suspense titles such as The Future Diary (Mirai Nikki), Ga-Rei: Zero, and Arifureta: From Commonplace to World's Strongest.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "white-fox",
    name: "White Fox",
    japaneseName: "株式会社ホワイトフォックス",
    establishedYear: 2007,
    about:
      "Premier Japanese animation studio founded by former OLM producer Gaku Iwasa. Celebrated for masterpieces with deep emotional intensity and worldbuilding, including Steins;Gate, Re:Zero, Cautious Hero, and The Devil Is a Part-Timer!.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "satelight",
    name: "Satelight",
    japaneseName: "株式会社サテライト",
    establishedYear: 1995,
    about:
      "Pioneering animation studio renowned for combining innovative 3D digital CG with traditional 2D animation. Renowned for the Macross franchise, Symphogear, Log Horizon, and Black Summoner.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "a-1-pictures",
    name: "A-1 Pictures",
    japaneseName: "株式会社A-1 Pictures",
    establishedYear: 2005,
    about:
      "High-profile animation subsidiary of Aniplex (Sony Music Entertainment Japan). Prolific powerhouse behind global megahits including Sword Art Online, Kaguya-sama: Love Is War, Gate, and Grimgar: Ashes and Illusions.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "diomedea",
    name: "Diomedéa",
    japaneseName: "株式会社ディオメディア",
    establishedYear: 2005,
    about:
      "Tokyo-based animation studio that emerged from Studio Barcelona. Known for high-energy supernatural and fantasy adaptations including Problem Children Are Coming from Another World, Aren't They?, Kantai Collection, and Domestic Girlfriend.",
    location: "Nerima, Tokyo, Japan",
  },
  {
    slug: "hoods-entertainment",
    name: "Hoods Entertainment",
    japaneseName: "株式会社フッズエンタテインメント",
    establishedYear: 2009,
    about:
      "Versatile animation studio known for action and supernatural works. Under its specialized Hoods Drifters Studio division, it animated Kouta Hirano's dark fantasy epic Drifters with heavy-ink styling and visceral combat.",
    location: "Suginami, Tokyo, Japan",
  },
  {
    slug: "ajia-do",
    name: "Ajia-do Animation Works",
    japaneseName: "株式会社亜細亜堂",
    establishedYear: 1978,
    about:
      "Veteran animation studio founded by legendary animators Tsutomu Shibayama and Osamu Kobayashi. Renowned for versatile animation spanning children's classics to hits like How Not to Summon a Demon Lord and Ascendance of a Bookworm.",
    location: "Musashino, Tokyo, Japan",
  },
  {
    slug: "silver-link",
    name: "Silver Link",
    japaneseName: "株式会社シルバーリンク",
    establishedYear: 2007,
    about:
      "Energetic studio founded by producer Hayato Kaneko and led by director Shin Onuma. A leading force in light novel adaptations, known for Wise Man's Grandchild, Death March to the Parallel World Rhapsody, Fate/kaleid liner Prisma Illya, and BOFURI.",
    location: "Mitaka, Tokyo, Japan",
  },
  {
    slug: "production-reed",
    name: "Production Reed",
    japaneseName: "株式会社プロダクション リード",
    establishedYear: 1975,
    about:
      "Historical animation studio formerly known as Ashi Productions. Famous for classic magical girl and mecha anime, as well as modern comfort-isekai adaptations like In Another World With My Smartphone.",
    location: "Suginami, Tokyo, Japan",
  },
];

// ---------------------------------------------------------------------------
// Batch 1 People (Directors & Creators)
// ---------------------------------------------------------------------------

export const batch1People: {
  slug: string;
  name: string;
  japaneseName?: string;
  role: string;
  biography: string;
  birthYear?: number;
  awards?: string;
  works?: string[];
}[] = [
  // Directors
  {
    slug: "takao-abo",
    name: "Takao Abo",
    japaneseName: "阿保 孝雄",
    role: "Director · Storyboard Artist",
    birthYear: 1968,
    biography:
      "Japanese animation director and storyboard artist known for his sensitive, atmosphere-rich direction. He directed The Rising of the Shield Hero Season 1 at Kinema Citrus and has contributed extensively to Macross Frontier, Eureka Seven, and Star Driver.",
    awards: "Nominated for Best Director at the Crunchyroll Anime Awards (2020)",
    works: ["The Rising of the Shield Hero", "Norn9", "Eureka Seven", "Macross Frontier"],
  },
  {
    slug: "kazuya-nakanishi",
    name: "Kazuya Nakanishi",
    japaneseName: "中西 和也",
    role: "Director · Key Animator · Character Designer",
    birthYear: 1980,
    biography:
      "Acclaimed animator and director associated with Studio Nexus. Known for his crisp, kinetic fight scenes and mastery of compositing, he made his full series directorial debut with The Eminence in Shadow and previously served as chief animation director on Darwin's Game and Re:Zero.",
    awards: "Anime Trending Best Action Direction nominee (2023)",
    works: ["The Eminence in Shadow", "Darwin's Game", "Re:Zero -Starting Life in Another World-", "Chivalry of a Failed Knight"],
  },
  {
    slug: "yutaka-uemura",
    name: "Yutaka Uemura",
    japaneseName: "上村 泰",
    role: "Director",
    birthYear: 1982,
    biography:
      "Director renowned for fast-paced, high-octane storytelling and stylized camera work. He spearheaded Studio NUT's inaugural television series The Saga of Tanya the Evil and directed Punch Line and FLCL Alternative.",
    awards: "Tokyo Anime Award Festival Nominee",
    works: ["The Saga of Tanya the Evil", "The Saga of Tanya the Evil: The Movie", "Punch Line", "FLCL Alternative", "Deca-Dence"],
  },
  {
    slug: "shinji-ishihira",
    name: "Shinji Ishihira",
    japaneseName: "石平 信司",
    role: "Director · Storyboard Artist",
    birthYear: 1968,
    biography:
      "Veteran anime director with a career spanning three decades, known for helming long-running fantasy and shonen epics including Fairy Tail, Log Horizon, Tsukimichi: Moonlit Fantasy, and Edens Zero.",
    awards: "Animage Anime Grand Prix Nominee",
    works: ["Fairy Tail", "Log Horizon", "Tsukimichi: Moonlit Fantasy", "Edens Zero", "Sasaki and Miyano"],
  },
  {
    slug: "kinji-yoshimoto",
    name: "Kinji Yoshimoto",
    japaneseName: "よしもと きんじ",
    role: "Director · Animator · Screenwriter",
    birthYear: 1966,
    biography:
      "Veteran director and animator known for high-intensity fantasy and ecchi action anime. He directed Arifureta: From Commonplace to World's Strongest Season 1, Queen's Blade, and Unbreakable Machine-Doll.",
    works: ["Arifureta: From Commonplace to World's Strongest", "Queen's Blade: The Exiled Virgin", "Unbreakable Machine-Doll", "Genshiken 2"],
  },
  {
    slug: "masayuki-sakoi",
    name: "Masayuki Sakoi",
    japaneseName: "迫井 政行",
    role: "Director · Storyboard Artist",
    birthYear: 1974,
    biography:
      "Versatile director celebrated for his work with Studio White Fox and Studio 3Hz. He directed Cautious Hero: The Hero Is Overpowered but Overly Cautious, Sword Art Online Alternative: Gun Gale Online, and Celestial Method.",
    works: ["Cautious Hero: The Hero Is Overpowered but Overly Cautious", "Sword Art Online Alternative: Gun Gale Online", "Princess Resurrection", "Needless"],
  },
  {
    slug: "ryosuke-nakamura",
    name: "Ryosuke Nakamura",
    japaneseName: "中村 亮介",
    role: "Director · Screenwriter · Sound Director",
    birthYear: 1976,
    biography:
      "Highly auteurist animation director noted for his poetic, watercolor visuals, literary sensibilities, and psychological realism. He directed Grimgar: Ashes and Illusions, Mouryou no Hako, Nerawareta Gakuen, and the celebrated music video for Eve's 'Gunjo Sanka'.",
    awards: "Special Distinction at prestigious international animation festivals",
    works: ["Grimgar: Ashes and Illusions", "Mouryou no Hako", "Nerawareta Gakuen", "Aoi Bungaku Series: Run, Melos!"],
  },
  {
    slug: "naoto-hosoda",
    name: "Naoto Hosoda",
    japaneseName: "細田 直人",
    role: "Director · Character Designer · Key Animator",
    birthYear: 1976,
    biography:
      "Prominent director and animator famous for his dynamic character expressions and suspenseful pacing. He directed the comedy landmark The Devil Is a Part-Timer!, the psychological thriller The Future Diary (Mirai Nikki), and Shuffle!.",
    works: ["The Devil Is a Part-Timer!", "The Future Diary", "Shuffle!", "Lord Marksman and Vanadis"],
  },
  {
    slug: "takahiko-kyogoku",
    name: "Takahiko Kyogoku",
    japaneseName: "京極 尚彦",
    role: "Director · Episode Director",
    birthYear: 1982,
    biography:
      "Versatile director who rose through Sunrise and A-1 Pictures. Widely celebrated for directing Love Live! School Idol Project, Land of the Lustrous (Houseki no Kuni), and the military-fantasy hit Gate.",
    awards: "VFX-JAPAN Awards Excellence Award (Land of the Lustrous)",
    works: ["Gate", "Land of the Lustrous", "Love Live! School Idol Project", "Inu-Oh"],
  },
  {
    slug: "keizou-kusakawa",
    name: "Keizou Kusakawa",
    japaneseName: "草川 啓造",
    role: "Chief Director · Director",
    birthYear: 1965,
    biography:
      "Prolific director at Seven Arcs and Diomedéa known for magical and supernatural action series. He directed or served as chief director on Magical Girl Lyrical Nanoha, Problem Children Are Coming from Another World, Aren't They?, Kantai Collection, and Fuuka.",
    works: ["Problem Children Are Coming from Another World, Aren't They?", "Magical Girl Lyrical Nanoha A's", "Kantai Collection", "Campione!"],
  },
  {
    slug: "kenichi-suzuki",
    name: "Kenichi Suzuki",
    japaneseName: "鈴木 健一",
    role: "Director · Series Director",
    birthYear: 1970,
    biography:
      "Renowned director famous for his gritty, stylized action direction and heavy ink framing. He served as series director for JoJo's Bizarre Adventure Parts 1–3 and directed Drifters, Cells at Work!, and Fairy gone.",
    works: ["Drifters", "JoJo's Bizarre Adventure (Parts 1-3)", "Cells at Work!", "Fairy gone"],
  },
  {
    slug: "yuta-murano",
    name: "Yuta Murano",
    japaneseName: "村野 佑太",
    role: "Director · Storyboard Artist",
    birthYear: 1984,
    biography:
      "Director at Ajia-do Animation Works celebrated for expressive character timing and diverse genre versatility. He directed How Not to Summon a Demon Lord, Kakushigoto, Seven Days War, and Revenger.",
    awards: "Annecy International Animated Film Festival Feature Film Nominee (Seven Days War)",
    works: ["How Not to Summon a Demon Lord", "Kakushigoto", "Seven Days War", "Revenger"],
  },
  {
    slug: "masafumi-tamura",
    name: "Masafumi Tamura",
    japaneseName: "田村 正文",
    role: "Director · Character Designer · Chief Animation Director",
    birthYear: 1974,
    biography:
      "Core creative at Silver Link recognized for slick magical combat and vivid character aesthetics. He directed Wise Man's Grandchild, The Misfit of Demon King Academy, and The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat.",
    works: ["Wise Man's Grandchild", "The Misfit of Demon King Academy", "The World's Finest Assassin", "Ange Vierge"],
  },
  {
    slug: "takeyuki-yanase",
    name: "Takeyuki Yanase",
    japaneseName: "柳瀬 雄之",
    role: "Director · Storyboard Artist",
    birthYear: 1969,
    biography:
      "Experienced animation director specializing in lighthearted fantasy and comedy anime. He directed In Another World With My Smartphone, By the Grace of the Gods, and If It's for My Daughter, I'd Even Defeat a Demon Lord.",
    works: ["In Another World With My Smartphone", "By the Grace of the Gods", "In the Land of Leadale"],
  },
  {
    slug: "shin-onuma",
    name: "Shin Onuma",
    japaneseName: "大沼 心",
    role: "Director · Visual Director",
    birthYear: 1976,
    biography:
      "A visionary director originally trained under Akiyuki Shinbo at Shaft before becoming the lead director and executive officer at Silver Link. Celebrated for inventive visual metaphors, kinetic motion graphics, and directing Baka and Test, Fate/kaleid liner Prisma Illya, BOFURI, and Death March to the Parallel World Rhapsody.",
    works: ["Death March to the Parallel World Rhapsody", "Baka and Test", "Fate/kaleid liner Prisma Illya", "BOFURI: I Don't Want to Get Hurt, so I'll Max Out My Defense.", "Kokoro Connect"],
  },
  {
    slug: "yoshimasa-hiraike",
    name: "Yoshimasa Hiraike",
    japaneseName: "平池 芳正",
    role: "Director · Sound Director",
    birthYear: 1971,
    biography:
      "Versatile director known for stellar comedic timing and crisp ensemble direction. His directorial works include Working!!, Wotakoi: Love is Hard for Otaku, AKB0048, and Black Summoner at Satelight.",
    works: ["Black Summoner", "Working!!", "Wotakoi: Love is Hard for Otaku", "AKB0048", "Amagami SS"],
  },

  // Creators
  {
    slug: "aneko-yusagi",
    name: "Aneko Yusagi",
    japaneseName: "アネコ ユサギ",
    role: "Novelist · Creator",
    biography:
      "Japanese light novelist who rose to prominence on Shōsetsuka ni Narō with The Rising of the Shield Hero. Yusagi's gritty take on the summoned hero archetype sparked an entire sub-industry of betrayed-hero stories.",
    works: ["The Rising of the Shield Hero", "The Reprise of the Spear Hero", "Dimension Wave"],
  },
  {
    slug: "daisuke-aizawa",
    name: "Daisuke Aizawa",
    japaneseName: "逢沢 大介",
    role: "Novelist · Creator",
    biography:
      "Light novel author who broke into the industry on Shōsetsuka ni Narō with The Eminence in Shadow. Aizawa's masterclass in dramatic irony and chuunibyou comedy made him one of Kadokawa's premier modern authors.",
    works: ["The Eminence in Shadow"],
  },
  {
    slug: "carlo-zen",
    name: "Carlo Zen",
    japaneseName: "カルロ・ゼン",
    role: "Novelist · Creator",
    biography:
      "Japanese author specializing in military history, political science, and alternate-reality conflicts. His debut work The Saga of Tanya the Evil became an international phenomenon, celebrated for its rigorous military doctrine.",
    works: ["The Saga of Tanya the Evil", "Yakusoku no Kuni", "Baikoku Kikan"],
  },
  {
    slug: "kei-azumi",
    name: "Kei Azumi",
    japaneseName: "あずみ 圭",
    role: "Novelist · Creator",
    biography:
      "Early pioneer of the modern web novel wave who began serializing Tsukimichi: Moonlit Fantasy in 2012. Azumi's intricate worldbuilding and merchant-state dynamics heavily influenced later fantasy novels.",
    works: ["Tsukimichi: Moonlit Fantasy"],
  },
  {
    slug: "ryo-shirakome",
    name: "Ryo Shirakome",
    japaneseName: "白米 良",
    role: "Novelist · Creator",
    biography:
      "Author who defined the modern abyss-crawler revenge archetype with Arifureta: From Commonplace to World's Strongest, accumulating hundreds of millions of web reads on Shōsetsuka ni Narō.",
    works: ["Arifureta: From Commonplace to World's Strongest", "Arifureta Zero"],
  },
  {
    slug: "light-tuchihi",
    name: "Light Tuchihi",
    japaneseName: "土日月",
    role: "Novelist · Creator",
    biography:
      "Author acclaimed for deconstructing and parodying fantasy tropes on Kakuyomu. His standout works include Cautious Hero and Full Dive: This Ultimate Next-Gen Full Dive RPG Is Even Shittier than Real Life!.",
    works: ["Cautious Hero: The Hero Is Overpowered but Overly Cautious", "Full Dive: This Ultimate Next-Gen Full Dive RPG Is Even Shittier than Real Life!"],
  },
  {
    slug: "mamare-touno",
    name: "Mamare Touno",
    japaneseName: "橙乃 ままれ",
    role: "Novelist · Creator",
    birthYear: 1970,
    biography:
      "Visionary author renowned for macro-economic fantasy and sociological worldbuilding. He gained widespread acclaim with MAOYU (Maoyuu Maou Yuusha) and Log Horizon, both starting as online text projects.",
    works: ["Log Horizon", "Maoyuu Maou Yuusha", "Hounan Gakuen Game Club"],
  },
  {
    slug: "juumonji-ao",
    name: "Juumonji Ao",
    japaneseName: "十文字 青",
    role: "Novelist · Creator",
    birthYear: 1981,
    biography:
      "Prolific author recognized for deeply atmospheric, melancholic fantasy realism. He debuted through the Sneaker Grand Prix and achieved international acclaim with Grimgar of Fantasy and Ash.",
    works: ["Grimgar: Ashes and Illusions", "Bara no Maria", "Hai to Gensou no Grimgar"],
  },
  {
    slug: "satoshi-wagahara",
    name: "Satoshi Wagahara",
    japaneseName: "和ヶ原 聡司",
    role: "Novelist · Creator",
    birthYear: 1982,
    biography:
      "Acclaimed light novel author who won the Silver Prize at the 17th Dengeki Novel Prize for The Devil Is a Part-Timer!, single-handedly popularizing the modern reverse-isekai workplace comedy genre.",
    works: ["The Devil Is a Part-Timer!", "Dracula Yakin!", "Hero's Party's Monk"],
  },
  {
    slug: "takumi-yanai",
    name: "Takumi Yanai",
    japaneseName: "柳内 たくみ",
    role: "Novelist · Creator",
    birthYear: 1970,
    biography:
      "Former officer of the Japan Self-Defense Forces who drew upon his authentic military knowledge to author Gate: Thus the JSDF Fought There!, establishing the gold standard of military isekai fiction.",
    works: ["Gate: Thus the JSDF Fought There!", "Sensha Otoko", "Gate: Season 2"],
  },
  {
    slug: "taro-tatsunoko",
    name: "Taro Tatsunoko",
    japaneseName: "竜ノ湖 太郎",
    role: "Novelist · Creator",
    birthYear: 1986,
    biography:
      "Author who debuted after winning the 14th Sneaker Award with Problem Children Are Coming from Another World, Aren't They?, celebrated for his encyclopedic knowledge of global mythologies and high-speed action battles.",
    works: ["Problem Children Are Coming from Another World, Aren't They?", "Last Embryo", "Million Crown"],
  },
  {
    slug: "kouta-hirano",
    name: "Kouta Hirano",
    japaneseName: "平野 耕太",
    role: "Manga Artist · Creator",
    birthYear: 1973,
    biography:
      "Legendary manga creator renowned for violent, hyper-stylized masterworks including Hellsing and Drifters. His art style features thick black shadows, extreme crosshatching, and darkly humorous banter amidst horrific warfare.",
    awards: "Seiun Award nominee; internationally recognized manga master",
    works: ["Drifters", "Hellsing", "Crossfire"],
  },
  {
    slug: "yukiya-murasaki",
    name: "Yukiya Murasaki",
    japaneseName: "むらさき ゆきや",
    role: "Novelist · Creator",
    biography:
      "Prolific light novelist known for blending high fantasy action with ecchi comedy and romance. Author of How Not to Summon a Demon Lord and An Archdemon's Dilemma: How to Love Your Elf Bride.",
    works: ["How Not to Summon a Demon Lord", "An Archdemon's Dilemma: How to Love Your Elf Bride", "Giniro no Goshinjin"],
  },
  {
    slug: "tsuyoshi-yoshioka",
    name: "Tsuyoshi Yoshioka",
    japaneseName: "吉岡 剛",
    role: "Novelist · Creator",
    biography:
      "Light novel author whose web novel Wise Man's Grandchild on Shōsetsuka ni Narō exploded into a massive multi-million selling franchise, popularizing science-enhanced chantless magic in isekai.",
    works: ["Wise Man's Grandchild", "Magic Stone Gourmet"],
  },
  {
    slug: "patra-fuyuhara",
    name: "Patra Fuyuhara",
    japaneseName: "冬原 パトラ",
    role: "Novelist · Creator",
    biography:
      "Novelist who created In Another World With My Smartphone on Shōsetsuka ni Narō, cementing the cozy, low-stress overpowered harem isekai subgenre as an international commercial powerhouse.",
    works: ["In Another World With My Smartphone"],
  },
  {
    slug: "hiro-ainana",
    name: "Hiro Ainana",
    japaneseName: "愛七 ひろ",
    role: "Novelist · Creator",
    biography:
      "Former system engineer whose personal experiences with corporate crunch inspired Death March to the Parallel World Rhapsody, pioneering the gourmet sightseeing fantasy lifestyle novel.",
    works: ["Death March to the Parallel World Rhapsody"],
  },
  {
    slug: "mayoi-doufuto",
    name: "Mayoi Doufuto",
    japaneseName: "迷井 豆腐",
    role: "Novelist · Creator",
    biography:
      "Light novel creator who penned Black Summoner on Shōsetsuka ni Narō, known for creating proactive, enthusiastic battle-junkie protagonists and tactical monster summon systems.",
    works: ["Black Summoner"],
  },
];

// ---------------------------------------------------------------------------
// Batch 1 Anime Entries (1 to 17)
// ---------------------------------------------------------------------------

export const isekaiBatch1: IsekaiAnimeEntry[] = [
  // 1. The Rising of the Shield Hero
  {
    slug: "the-rising-of-the-shield-hero",
    title: "The Rising of the Shield Hero",
    japaneseTitle: "盾の勇者の成り上がり",
    altTitles: [
      "Tate no Yuusha no Nariagari",
      "The Rising of the Shield Hero Season 1",
    ],
    year: 2019,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 25,
    duration: 24,
    releaseDate: "2019-01-09",
    endDate: "2019-06-26",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Aneko Yusagi",
    studio: "kinema-citrus",
    director: "takao-abo",
    creator: "aneko-yusagi",
    genreSlugs: ["isekai", "action", "adventure", "fantasy", "drama"],
    synopsis:
      "College student Naofumi Iwatani is abruptly summoned to the fantasy kingdom of Melromarc as one of four Cardinal Heroes, equipped only with a seemingly useless defensive shield. Falsely accused of assault by the kingdom's treacherous princess and stripped of his money, dignity, and reputation, Naofumi becomes a bitter pariah who must build his strength from rock bottom. Partnering with the tanuki demi-human slave Raphtalia and the giant filolial bird Filo, he battles catastrophic monster waves while navigating treacherous royal corruption.",
    historicalSignificance:
      "The Rising of the Shield Hero served as the watershed title that popularized the 'betrayed and ostracized hero' subgenre within modern isekai fiction. Premiering during Crunchyroll's aggressive co-production expansion, it proved that a darker, anti-hero narrative centered on survival, economic pragmatism, and false accusations could generate monumental international streaming viewership. Its immense overseas success demonstrated that Western anime audiences often embraced gritty redemption arcs and darker moral dilemmas far more vigorously than domestic Japanese TV ratings alone indicated.",
    productionHistory:
      "Adapted by Kinema Citrus from Aneko Yusagi's web novel and subsequent Kadokawa light novel series, the adaptation was helmed by director Takao Abo with series composition by Keigo Koyanagi. Masahiro Suwa provided character designs that captured Minami Seira's novel illustrations, while composer Kevin Penkin delivered an orchestral and electronic soundtrack that elevated the dramatic stakes. The first episode aired as an unprecedented 45-minute double-length special to fully establish Naofumi's betrayal.",
    reception:
      "The series was a massive commercial hit globally, consistently ranking among the top streamed series on Crunchyroll and Bilibili in 2019. Despite generating polarized critical discussions in Western media regarding its false accusation plot device, fan reception was overwhelmingly positive, driving massive sales for Kadokawa's light novels and manga adaptations and prompting immediate greenlighting for seasons 2 and 3.",
    awards:
      "Winner of Best Voice Actor Performance (Billy Kametz as Naofumi) and Best Girl nomination (Raphtalia) at the 4th Crunchyroll Anime Awards (2020); Kevin Penkin nominated for Best Score.",
    culturalImpact:
      "The anime established Raphtalia as one of the definitive 'best girls' of 2019 and inspired a wave of 'betrayed protagonist' light novel tropes. It popularized the meme format of Naofumi's cold, transactional pragmatism versus the delusional optimism of the Spear, Sword, and Bow heroes, firmly establishing the 'useless other heroes' trope in isekai.",
    legacy:
      "Naofumi's rise spawned a multi-season franchise, stage plays, and video game collaborations, solidifying Kinema Citrus as a premier production studio for Kadokawa's fantasy properties and paving the way for darker isekai web novel adaptations.",
    historyTimeline: [
      {
        label: "Web Novel Debut",
        year: "2012",
        text: "Aneko Yusagi begins publishing the web novel on Shōsetsuka ni Narō, followed by Kadokawa MF Books publication.",
      },
      {
        label: "Anime Premiere",
        year: "2019-01-09",
        text: "The anime premieres with an extended 45-minute episode, igniting immediate global conversation.",
      },
      {
        label: "Franchise Expansion",
        year: "2019",
        text: "Crunchyroll and Kadokawa announce seasons 2 and 3 concurrently at Crunchyroll Expo due to record overseas streaming numbers.",
      },
    ],
    characters: [
      {
        slug: "naofumi-iwatani",
        name: "Naofumi Iwatani",
        japaneseName: "岩谷 尚文",
        role: "Protagonist",
        biography:
          "Summoned as the Shield Hero, Naofumi's initial gentle demeanor turns into bitter, pragmatic mistrust after he is framed for rape. Despite his harsh cynicism, he retains an underlying moral compass, protecting the innocent while turning monster materials and trade into unassailable defensive combat power.",
        voiceActor: "Kaito Ishikawa",
      },
      {
        slug: "raphtalia",
        name: "Raphtalia",
        japaneseName: "ラフタリア",
        role: "Main Heroine",
        biography:
          "A raccoon-type demi-human girl purchased by Naofumi from a slave merchant while suffering from trauma and illness. Nurtured and trained by him, she rapidly matures into his devoted sword, serving as both his primary attacker and his emotional anchor back into humanity.",
        voiceActor: "Asami Seto",
      },
      {
        slug: "filo",
        name: "Filo",
        japaneseName: "フィーロ",
        role: "Supporting Protagonist",
        biography:
          "A Filolial hatched from an egg purchased by Naofumi who rapidly evolves into an enormous winged bird capable of pulling wagons and morphing into a winged blond-haired girl with prodigious kick-based attack power.",
        voiceActor: "Rina Hidaka",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Shield Hero",
        airDate: "2019-01-09",
        synopsis:
          "College student Naofumi Iwatani is summoned to Melromarc alongside three other heroes, only to be betrayed, framed for rape by Princess Malty, and left penniless in an unfamiliar kingdom.",
      },
      {
        number: 4,
        title: "Lullaby at Dawn",
        airDate: "2019-01-30",
        synopsis:
          "Motoyasu challenges Naofumi to a duel over Raphtalia's ownership; despite interference from Princess Malty, Raphtalia reaffirms her unwavering trust in Naofumi, restoring his faith in companionship.",
      },
      {
        number: 21,
        title: "Clear and Away",
        airDate: "2019-05-29",
        synopsis:
          "Queen Mirellia Q. Melromarc returns to strip the deceitful King Aultcray and Malty of their status, forcing them to undergo trial and officially clearing Naofumi's name before the entire realm.",
      },
    ],
    related: [],
    sources: [],
  },

  // 2. The Eminence in Shadow
  {
    slug: "the-eminence-in-shadow",
    title: "The Eminence in Shadow",
    japaneseTitle: "陰の実力者になりたくて!",
    altTitles: [
      "Kage no Jitsuryokusha ni Naritakute!",
      "Shadow Garden",
    ],
    year: 2022,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 20,
    duration: 24,
    releaseDate: "2022-10-05",
    endDate: "2023-02-15",
    eraSlug: "modern-anime",
    sourceMaterial: "Light novel series by Daisuke Aizawa",
    studio: "nexus",
    director: "kazuya-nakanishi",
    creator: "daisuke-aizawa",
    genreSlugs: ["isekai", "action", "comedy", "fantasy"],
    synopsis:
      "Obsessed with becoming a mastermind who pulls the strings from the shadows, Minoru Kageno undergoes brutal training in modern Japan before dying in an accident and reincarnating as Cid Kagenou in a magical world. Embracing his new life to play out his ultimate chuunibyou fantasy, he invents a fictional evil syndicate called the Cult of Diablos and recruits an all-female organization known as Shadow Garden. To Cid, it is all an elaborate roleplay game, completely unaware that the sinister Cult of Diablos is terrifyingly real and that his fabricated lies are literal truth.",
    historicalSignificance:
      "The Eminence in Shadow revolutionized the modern comedy-action isekai landscape through its sublime mastery of dramatic irony and chuunibyou farce. By positioning the protagonist as a blissfully oblivious agent of chaos operating on misunderstanding comedy while the rest of the cast participates in a high-stakes, hyper-serious dark fantasy narrative, the anime created a genre subversion that resonated profoundly with audiences fatigued by conventional power fantasies.",
    productionHistory:
      "Produced by Studio Nexus and directed by Kazuya Nakanishi, who previously worked as chief animation director on Darwin's Game and Re:Zero, the anime showcased remarkably fluid kinetic action choreography alongside atmospheric, cinematic lighting. Daisuke Aizawa's dry, deadpan comedic timing was adapted by scriptwriter Kanichi Katou, with Makoto Iino handling character designs that gave Shadow Garden's members sleek, memorable bodysuits and period regal wear.",
    reception:
      "The anime became a breakout phenomenon in late 2022 and early 2023, dominating streaming charts on HIDIVE and ABEMA. Fans and critics hailed its seamless balance of high-octane battle sequences and genuinely hilarious absurdity, propelling light novel sales and driving demand for an immediate 12-episode second season and an upcoming anime film.",
    awards:
      "Nominated for Best Comedy and Best Action at the 8th Crunchyroll Anime Awards (2024); ranked among the top 5 anime of Fall 2022 / Winter 2023 across international anime community polls like Anime Trending and Anime Corner.",
    culturalImpact:
      "Cid's atomic declaration — 'I... Am... Atomic...' whispered with deadpan theatrical gravitas — became an instant, viral internet meme and sound bite across TikTok, YouTube, and anime forums. The show popularized the concept of 'the misunderstanding isekai' where the protagonist's delusions accidentally unravel global conspiracies.",
    legacy:
      "The series demonstrated that Studio Nexus could execute top-tier action comedy at an elite level, and Cid Kagenou took his place alongside Kazuma Satou and Ainz Ooal Gown as one of the most uniquely entertaining protagonists in modern isekai history.",
    historyTimeline: [
      {
        label: "Light Novel Publication",
        year: "2018",
        text: "Daisuke Aizawa begins publishing the light novels with illustrations by Tōzai through Enterbrain.",
      },
      {
        label: "Anime Broadcast",
        year: "2022-10-05",
        text: "The 20-episode first season premieres on AT-X and streaming platforms, achieving instant viral buzz.",
      },
      {
        label: "Film Announcement",
        year: "2023",
        text: "Following the broadcast of Season 2, Kadokawa announces the theatrical feature film 'The Eminence in Shadow: Lost Echoes'.",
      },
    ],
    characters: [
      {
        slug: "cid-kagenou",
        name: "Cid Kagenou",
        japaneseName: "シド・カゲノー",
        role: "Protagonist",
        biography:
          "Born into a modest noble family, Cid conceals his godlike combat prowess behind a painfully generic mob persona, reserving his true strength for his alter ego 'Shadow.' Driven entirely by his chuunibyou aesthetics, he views all geopolitical conflicts as his private acting stage.",
        voiceActor: "Seiichiro Yamashita",
      },
      {
        slug: "alpha-shadow-garden",
        name: "Alpha",
        japaneseName: "アルファ",
        role: "Main Heroine / Commander",
        biography:
          "An elven maiden who was cured of demonic possession by Cid and became the first recruit and second-in-command of Shadow Garden. She possesses monstrous administrative and combat skills, fiercely dedicated to eradicating the Cult of Diablos in Shadow's name.",
        voiceActor: "Asami Seto",
      },
      {
        slug: "alexia-midgar",
        name: "Alexia Midgar",
        japaneseName: "アレクシア・ミドガル",
        role: "Supporting Character",
        biography:
          "The cynical second princess of the Midgar Kingdom who initially hires Cid as a fake boyfriend to ward off unwanted suitors. Inwardly struggling with feelings of inadequacy compared to her prodigy sister Iris, she is drawn to Shadow's mysterious appearances.",
        voiceActor: "Inori Minase",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Hated Classmate",
        airDate: "2022-10-05",
        synopsis:
          "In modern Japan, delinquent-hunting high schooler Minoru Kageno pursues godlike shadow supremacy through obsessive training before a tragic truck accident transports his soul into a new realm.",
      },
      {
        number: 5,
        title: "I Am...",
        airDate: "2022-11-02",
        synopsis:
          "Shadow confronts the monstrous Zenon Griffey in the royal capital, revealing the terrifying magnitude of his magical compression before unleashing his iconic 'I Am Atomic' attack, obliterating the district.",
      },
      {
        number: 20,
        title: "The Coming of the Demon",
        airDate: "2023-02-15",
        synopsis:
          "At the Bushin Festival, Cid unveils his identity as Shadow in front of Iris Midgar and Beatrix, fighting both warrior champions simultaneously before executing an apocalyptic sky-clearing spell.",
      },
    ],
    related: [],
    sources: [],
  },

  // 3. The Saga of Tanya the Evil
  {
    slug: "the-saga-of-tanya-the-evil",
    title: "The Saga of Tanya the Evil",
    japaneseTitle: "幼女戦記",
    altTitles: [
      "Youjo Senki",
      "The Military Chronicles of a Little Girl",
    ],
    year: 2017,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2017-01-06",
    endDate: "2017-03-31",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Carlo Zen",
    studio: "nut",
    director: "yutaka-uemura",
    creator: "carlo-zen",
    genreSlugs: ["isekai", "action", "fantasy", "historical", "military"],
    synopsis:
      "An ultra-rational, ruthless Tokyo salaryman is murdered by an employee he fired and confronts a deity he derides as 'Being X.' As punishment for his lack of faith, Being X reincarnates him as Tanya Degurechaff, an orphaned girl in an alternate 1920s imperial Europe locked in magical industrial warfare. Determined to escape the frontlines and secure an effortless desk job, Tanya enlists in the Imperial Mage Corps, but her hyper-efficient brutality and tactical genius inadvertently promote her directly to the most slaughterous battles on the continent.",
    historicalSignificance:
      "The Saga of Tanya the Evil radically shattered the mold of wish-fulfillment isekai by merging magical alternate-history World War I/II military doctrine with ruthless corporate cynicism. Rather than adventuring or saving princesses, the narrative explores totalitarian bureaucracy, the laws of war, and a philosophical grudge match between human rationalism and divine ego. It laid the foundation for the Kadokawa quartet crossover 'Isekai Quartet' alongside Konosuba, Overlord, and Re:Zero.",
    productionHistory:
      "The anime was the debut project for Studio NUT, founded by former Madhouse producer Takuya Tsunoki specifically to undertake ambitious adaptations. Directed by Yutaka Uemura with dynamic aerial choreography by Hiroyuki Katou and character designs by Yuji Hosogoe (softening Shinobu Shinotsuki's stark novel illustrations), the series gained renown for its explosive sound design, industrial dieselpunk aesthetic, and Aoi Yuuki's tour-de-force voice acting performance.",
    reception:
      "The series earned immediate critical acclaim for its mature sociopolitical commentary, razor-sharp military strategy, and unflinching anti-hero protagonist. It was a substantial commercial triumph, selling thousands of home video units and paving the way for a 2019 box-office theatrical movie and an announced second television season.",
    awards:
      "Nominated for Best Action, Best Villain (Tanya), and Best Animation at the 2nd Crunchyroll Anime Awards (2018); Aoi Yuuki's voice work won widespread praise and major seiyuu magazine recognitions.",
    culturalImpact:
      "Tanya's deranged combat smiles and diabolical legal loopholes (such as issuing evacuation warnings in a squeaky child's voice to legally destroy Dacian munitions factories) became enduring memes. Tanya proved that female-bodied anti-heroes driven by ruthless Machiavellian logic could carry a major action anime.",
    legacy:
      "Alongside Overlord, Tanya the Evil cemented Kadokawa's brand of 'dark isekai' military fiction, proving that high-concept historical military dramas could thrive in an isekai landscape otherwise saturated with high-school gaming tropes.",
    historyTimeline: [
      {
        label: "Arcadia Publication",
        year: "2011",
        text: "Carlo Zen begins writing the original web novel on the Arcadia novel hosting portal.",
      },
      {
        label: "Studio NUT Debut",
        year: "2017-01-06",
        text: "Studio NUT releases the anime adaptation as its inaugural television production to glowing reviews.",
      },
      {
        label: "Theatrical Sequel",
        year: "2019-02-08",
        text: "A direct continuation feature film releases in Japanese theaters, grossing over 400 million yen.",
      },
    ],
    characters: [
      {
        slug: "tanya-degurechaff",
        name: "Tanya Degurechaff",
        japaneseName: "ターニャ・デグレチャフ",
        role: "Protagonist",
        biography:
          "A reincarnated cold-blooded corporate bureaucrat possessing immense magical affinity trapped in the body of a petite blond girl. Guided purely by self-preservation and free-market logic, her ruthless military compliance constantly earns her combat medals instead of the peaceful rear-echelon life she desperately craves.",
        voiceActor: "Aoi Yuuki",
      },
      {
        slug: "viktoriya-ivanovna-serebryakov",
        name: "Viktoriya Ivanovna Serebryakov",
        japaneseName: "ヴィクトーリヤ・イヴァーノヴナ・セレブリャコーフ",
        role: "Supporting Protagonist",
        biography:
          "A refugee from the Russy Federation who serves as a platoon mage under Tanya's command. Sweet-natured, reliable, and deeply loyal, Visha acts as Tanya's trusted aide-de-camp and a humanizing sounding board amidst horrific military engagements.",
        voiceActor: "Saori Hayami",
      },
      {
        slug: "being-x",
        name: "Being X",
        japaneseName: "存在X",
        role: "Antagonist",
        biography:
          "The enigmatic, self-proclaimed Almighty God who refuses to let the salaryman die comfortably unless he embraces genuine faith. Being X orchestrates historical catastrophes and manipulates miracles to force Tanya to pray in desperation.",
        voiceActor: "Hideaki Tezuka",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Devil of the Rhine",
        airDate: "2017-01-06",
        synopsis:
          "Second Lieutenant Tanya Degurechaff and her Imperial mage artillery platoon slaughter Francois Republic forces along the Rhine front with terrifying mechanical efficiency.",
      },
      {
        number: 2,
        title: "Prologue",
        airDate: "2017-01-13",
        synopsis:
          "The backstory of an uncompromising Tokyo HR director who, after being pushed onto train tracks by an employee he terminated, mocks a divine being and awakens as a war orphan.",
      },
      {
        number: 12,
        title: "How to Use an Ocean",
        airDate: "2017-03-31",
        synopsis:
          "Following the Imperial victory over the Francois Republic, Tanya realizes that the Republic's armed forces have escaped overseas to wage a prolonged world war, driving her into a furious tirade against Being X.",
      },
    ],
    related: [],
    sources: [],
  },

  // 4. Tsukimichi: Moonlit Fantasy
  {
    slug: "tsukimichi-moonlit-fantasy",
    title: "Tsukimichi: Moonlit Fantasy",
    japaneseTitle: "月が導く異世界道中",
    altTitles: [
      "Tsuki ga Michibiku Isekai Douchuu",
      "Tsukimichi -Moonlit Fantasy-",
    ],
    year: 2021,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2021-07-07",
    endDate: "2021-09-22",
    eraSlug: "modern-anime",
    sourceMaterial: "Light novel series by Kei Azumi",
    studio: "c2c",
    director: "shinji-ishihira",
    creator: "kei-azumi",
    genreSlugs: ["isekai", "action", "adventure", "fantasy", "comedy"],
    synopsis:
      "Ordinary high school student Makoto Misumi is summoned to an alternate world due to a mysterious pact made by his parents years ago. However, the world's shallow Goddess deems him 'too hideous' to be her hero, strips him of his title, and banishes him to the furthest, most desolate wasteland on the planet. Bestowed with godlike magical power by the Moon God Tsukuyomi, Makoto establishes a multicultural utopian sanctuary alongside a legendary dragon and an ancient giant spider, building a peaceful civilization while humanity discriminates against him.",
    historicalSignificance:
      "Tsukimichi was one of the very earliest pioneers of the modern Shōsetsuka ni Narō web novel wave, beginning serialization in 2012 before many of the later megahits. Its 2021 adaptation was crucial for establishing the 'aesthetic discrimination' isekai trope, where human society is depicted as vain and morally corrupt while monstrous and non-human demi-humans represent honor, craftsmanship, and community building.",
    productionHistory:
      "Produced by animation studio C2C under director Shinji Ishihira (known for Fairy Tail and Log Horizon), the series featured energetic, high-frame-rate combat sequences and expressive comedic animation. Yukie Suzuki designed characters that stayed faithful to Mitsuaki Matsumoto's light novel art, while composer Yasuharu Takanashi infused the action scenes with bombastic heavy rock and traditional Japanese instrumentation.",
    reception:
      "Tsukimichi achieved surprising commercial and streaming success worldwide, becoming one of Nippon TV's most lucrative anime international licensing properties of 2021. Its widespread popularity immediately secured a 25-episode two-cour second season produced by J.C.Staff in 2024.",
    awards:
      "Ranked consistently within the Top 10 seasonal anime of Summer 2021 on Anime Corner and Anime Trending; celebrated for Yasuharu Takanashi's hard-hitting soundtrack.",
    culturalImpact:
      "The show is widely praised for the hilarious dynamic between Makoto and his two hyper-loyal, overpowered monster retainers, Tomoe (the samurai dragon obsessed with historical jidaigeki dramas) and Mio (the masochistic gourmet disaster spider). It created a popular template for merchant-state kingdom building where the protagonist remains a humble merchant.",
    legacy:
      "As an elder statesman of web novel isekai, Tsukimichi's eventual anime success proved that older Narō foundational works still hold tremendous narrative vitality, paving the way for multi-season commitments in the 2020s.",
    historyTimeline: [
      {
        label: "Web Novel Debut",
        year: "2012",
        text: "Kei Azumi begins serializing Tsukimichi on Shōsetsuka ni Narō, making it one of the early precursors of the 2010s isekai boom.",
      },
      {
        label: "First Anime Season",
        year: "2021-07-07",
        text: "Studio C2C's 12-episode anime adaptation premieres to strong international acclaim.",
      },
      {
        label: "Two-Cour Sequel",
        year: "2024",
        text: "Season 2 premieres for 25 consecutive episodes, covering Makoto's adventures at the Rotsgard Academy.",
      },
    ],
    characters: [
      {
        slug: "makoto-misumi",
        name: "Makoto Misumi",
        japaneseName: "深澄 真",
        role: "Protagonist",
        biography:
          "A mild-mannered former high school archer dumped into a wasteland by a vain goddess because of his plain face. Gifted near-infinite mana by Tsukuyomi, he can converse with all non-human creatures and easily overpower legendary deities, though he prefers trading goods as the merchant 'Kuzunoha.'",
        voiceActor: "Natsuki Hanae",
      },
      {
        slug: "tomoe-tsukimichi",
        name: "Tomoe",
        japaneseName: "巴",
        role: "Main Heroine",
        biography:
          "Formerly the terrifying Mirage Dragon Shin who ruled the wasteland fog. After Makoto effortlessly bests her, she forms a pact with him, assumes the form of a tall blue-haired swordswoman, and develops a fanatical obsession with Japanese samurai dramas and Edo period culture.",
        voiceActor: "Ayane Sakura",
      },
      {
        slug: "mio-tsukimichi",
        name: "Mio",
        japaneseName: "澪",
        role: "Main Heroine",
        biography:
          "Originally the Black Spider of Calamity, an insatiable ancient horror driven by endless hunger. Makoto feeds her his mana to subdue her, binding her into a human guise as a kimono-clad maiden with culinary obsessions and masochistic devotion to him.",
        voiceActor: "Akari Kitou",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Failed Hero",
        airDate: "2021-07-07",
        synopsis:
          "Makoto Misumi is summoned to another world only to be insulted by the Goddess and cast into the wasteland, where he rescues an orc girl and easily subdues the mythical Greater Dragon Shin.",
      },
      {
        number: 2,
        title: "Black Spider of Calamity",
        airDate: "2021-07-14",
        synopsis:
          "Shin forms a master-servant contract with Makoto and takes the name Tomoe; soon after, Makoto battles and tames the Calamity Spider, naming her Mio and founding their sub-dimensional sanctuary.",
      },
      {
        number: 12,
        title: "Moonlit Guide...",
        airDate: "2021-09-22",
        synopsis:
          "Makoto is forcibly teleported by the Goddess into a lethal war between humans and demons, unleashing an apocalyptic magic arrow that obliterates a demonic army and saves Sophia's adversaries.",
      },
    ],
    related: [],
    sources: [],
  },

  // 5. Arifureta: From Commonplace to World's Strongest
  {
    slug: "arifureta-from-commonplace-to-worlds-strongest",
    title: "Arifureta: From Commonplace to World's Strongest",
    japaneseTitle: "ありふれた職業で世界最強",
    altTitles: [
      "Arifureta Shokugyou de Sekai Saikyou",
      "Arifureta",
    ],
    year: 2019,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 13,
    duration: 24,
    releaseDate: "2019-07-08",
    endDate: "2019-10-07",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Ryo Shirakome",
    studio: "asread",
    director: "kinji-yoshimoto",
    creator: "ryo-shirakome",
    genreSlugs: ["isekai", "action", "adventure", "fantasy", "harem"],
    synopsis:
      "When an entire high school class is summoned to the fantasy world of Tortus, timid otaku Hajime Nagumo is granted the mundane utility class of 'Synergist.' Betrayed by a classmate during a dungeon expedition and plummeted into the abyssal depths of the Great Orcus Labyrinth, Hajime loses an arm and his innocence to ravenous monsters. Surviving by devouring monster flesh, synthesizing modern firearms with transmutation magic, and abandoning mercy, he rescues an imprisoned ancient vampire princess and resolves to slaughter anyone standing in his way home.",
    historicalSignificance:
      "Arifureta is the quintessential archetype of the 'edge-lord' dungeon-crawling revenge isekai. It codified tropes that became ubiquitous across light novel and webtoon adaptations: a bullied weakling falling into an abyss, undergoing a dramatic physical transformation with white hair and eyepatch, synthesizing modern weaponry (revolvers, sniper rifles, pile bunkers) using transmutation, and building an overwhelmingly loyal harem of ancient mythical beings.",
    productionHistory:
      "Produced as a joint collaboration between Studio Asread and White Fox, the anime faced a publicized production delay in 2018 when the initial director and designs were overhauled. Kinji Yoshimoto took over direction, with Chika Kojima revising Takayuki Yanase's mechanical drafts. Despite notorious early CGI monster models, the sheer charisma of its revenge power-fantasy and action set pieces captured audiences.",
    reception:
      "Arifureta was an enormous commercial juggernaut in Japan and overseas. Its light novel series crossed over 5 million copies sold, and its anime consistently ranked at the very top of Tokyo MX and AT-X streaming and broadcast ratings in Summer 2019, securing seasons 2 and 3 and multiple OVAs.",
    awards:
      "Consistently ranked as one of the top 3 best-selling light novel franchises published by Overlap; awarded top spots on streaming charts across Bilibili and Funimation in 2019.",
    culturalImpact:
      "Hajime's dual revolvers (Donner and Schlag), Humvee off-road vehicle, and unapologetic brutality became iconic symbols of over-the-top edgy power fantasy. Yue's vampire romance and Shea's hammer-wielding rabbit-girl comedy provided a beloved dynamic that spawned numerous web novel imitators.",
    legacy:
      "Arifureta proved that unabashed, fast-paced revenge fantasy combined with modern technological fusion holds an enduring, massive global fanbase, propelling Overlap into a major light novel publishing titan.",
    historyTimeline: [
      {
        label: "Shōsetsuka ni Narō Phenomenon",
        year: "2013",
        text: "Ryo Shirakome begins posting Arifureta on Narō, accumulating hundreds of millions of page views.",
      },
      {
        label: "Anime Debut",
        year: "2019-07-08",
        text: "The anime adaptation premieres, overcoming production delays to become a major streaming hit.",
      },
      {
        label: "Third Season Greenlit",
        year: "2022",
        text: "Following a triumphant Season 2, the production committee greenlights a third season produced by Asread.",
      },
    ],
    characters: [
      {
        slug: "hajime-nagumo",
        name: "Hajime Nagumo",
        japaneseName: "南雲 ハジメ",
        role: "Protagonist",
        biography:
          "Once a passive otaku, Hajime transforms into a ruthless, white-haired gunslinger after being left for dead in the labyrinth abyss. Armed with handcrafted electromagnetic firearms, prosthetic weaponry, and an iron will, he lives solely to protect his beloved companions and return to Japan.",
        voiceActor: "Toshinari Fukamachi",
      },
      {
        slug: "yue-arifureta",
        name: "Yue",
        japaneseName: "ユエ",
        role: "Main Heroine",
        biography:
          "A 300-year-old vampire princess sealed away in the deepest depths of the Orcus Labyrinth due to her monstrous regenerative abilities. Rescued by Hajime, she falls deeply in love with him, serving as his peerless magical partner and emotional sanctuary.",
        voiceActor: "Yūki Kuwahara",
      },
      {
        slug: "shea-haulia",
        name: "Shea Haulia",
        japaneseName: "シア・ハウリア",
        role: "Supporting Heroine",
        biography:
          "A rabbit-beastman girl possessing future-sight magic whose clan was hunted as taboo monsters. She enlists Hajime's protection, wielding a massive 100-ton transformation war hammer called Drucken with boundless optimism and comedic persistence.",
        voiceActor: "Minami Takahashi",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Monster of the Abyss",
        airDate: "2019-07-08",
        synopsis:
          "Betrayed by a jealous classmate, Hajime Nagumo falls into the deadly abyss of the Orcus Labyrinth, losing his left arm to a beast before resorting to eating monster flesh to survive.",
      },
      {
        number: 3,
        title: "Golden Vampire",
        airDate: "2019-07-22",
        synopsis:
          "Deep in the dungeon, Hajime unseals an immortal vampire girl whom he names Yue; together, they defeat a multi-headed scorpion guardian and pledge to escape the abyss together.",
      },
      {
        number: 13,
        title: "The Best at Being the Least",
        airDate: "2019-10-07",
        synopsis:
          "Hajime reunites with his stunned former high school classmates just as they are about to be massacred by a demonic commander, effortlessly annihilating the demon army with heavy artillery.",
      },
    ],
    related: [],
    sources: [],
  },

  // 6. Cautious Hero: The Hero Is Overpowered but Overly Cautious
  {
    slug: "cautious-hero-the-hero-is-overpowered-but-overly-cautious",
    title: "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
    japaneseTitle: "慎重勇者〜この勇者が俺TUEEEくせに慎重すぎる〜",
    altTitles: [
      "Shinchou Yuusha",
      "The Hero Is Overpowered but Overly Cautious",
    ],
    year: 2019,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2019-10-02",
    endDate: "2019-12-27",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Light Tuchihi",
    studio: "white-fox",
    director: "masayuki-sakoi",
    creator: "light-tuchihi",
    genreSlugs: ["isekai", "comedy", "fantasy", "action", "drama"],
    synopsis:
      "The novice goddess Ristarte is tasked with saving Gaeabrande, an S-rank difficulty world on the brink of total annihilation. To her relief, she summons Seiya Ryuuguuin, a Japanese youth with astronomical stats that surpass all expectations. Her joy instantly evaporates when she discovers his crippling flaw: he is ridiculously, pathologically cautious, refusing to leave the divine realm until he has trained for weeks, buying hundreds of spare armors, and nuking level 1 slimes with his ultimate apocalyptic spells until not a single speck of dust remains.",
    historicalSignificance:
      "Cautious Hero is renowned for executing one of the most brilliant tonal shifts in modern anime comedy. What begins as a hilarious, over-the-top parody of min-maxing RPG habits and expressive face-fault comedy seamlessly pivots in its final act into a devastatingly emotional tragedy, recontextualizing the hero's neurotic paranoia as profound, self-sacrificing love born from past trauma.",
    productionHistory:
      "Animated by Studio White Fox under director Masayuki Sakoi (director of Sword Art Online Alternative: Gun Gale Online), the series was elevated by character designer Mai Toda's wildly elastic and manic facial expressions for Ristarte. Kento Toya oversaw key animation, with Aki Toyosaki delivering an award-caliber voice performance that turned Ristarte's frantic internal monologues into comedic gold.",
    reception:
      "The series was a critical darling of the Fall 2019 season. Audiences initially drawn in by the gag comedy were stunned by the emotional depth of the climactic episodes, earning the show exceptional review scores and a devoted international fanbase.",
    awards:
      "Nominated for Best Comedy at the 4th Crunchyroll Anime Awards (2020); Aki Toyosaki's performance as Ristarte received universal critical praise across anime media outlets.",
    culturalImpact:
      "Ristarte's manic facial expressions and Seiya's iconic catchphrase 'Ready Perfectly' (準備は完全に整った) spawned countless reaction gifs and memes. The show cemented the 'over-preparation' RPG trope as a beloved comedic device in gaming and anime culture.",
    legacy:
      "Cautious Hero demonstrated that White Fox could handle comedy with the same emotional weight and narrative gravity they brought to Steins;Gate and Re:Zero, leaving a lasting mark as one of the best-constructed short isekai series of its era.",
    historyTimeline: [
      {
        label: "Kakuyomu Publication",
        year: "2016",
        text: "Light Tuchihi begins publishing the web novel on Kadokawa's Kakuyomu platform.",
      },
      {
        label: "White Fox Adaptation",
        year: "2019-10-02",
        text: "White Fox's 12-episode anime adaptation premieres to rave reviews for its animation and voice acting.",
      },
      {
        label: "Climactic Revelation",
        year: "2019-12-27",
        text: "The finale airs, revealing the tragic origin of Seiya's caution and cementing its cult-classic status.",
      },
    ],
    characters: [
      {
        slug: "seiya-ryuuguuin",
        name: "Seiya Ryuuguuin",
        japaneseName: "竜宮院 聖哉",
        role: "Protagonist",
        biography:
          "An exceptionally handsome hero whose stats are maxed out, but who refuses to engage in any conflict without exhaustive over-preparation. His motto is absolute caution, utilizing overkill attacks against the weakest foes to ensure zero chance of surprise defeat.",
        voiceActor: "Yuichiro Umehara",
      },
      {
        slug: "ristarte",
        name: "Ristarte",
        japaneseName: "リスタルテ",
        role: "Main Heroine",
        biography:
          "The Goddess of Healing of the Unified Divine Realm assigned to salvage the S-rank world Gaeabrande. She is hopelessly smitten by Seiya's physical looks, but constantly driven to screaming breakdowns by his insane paranoia and disrespect.",
        voiceActor: "Aki Toyosaki",
      },
      {
        slug: "mash-cautious",
        name: "Mash",
        japaneseName: "マッシュ",
        role: "Supporting Character",
        biography:
          "A young dragonkin boy who dreams of becoming a heroic dragon warrior. After joining Seiya's party, he is relegated to carrying luggage and training relentlessly under Seiya's grueling regimen.",
        voiceActor: "Kengo Kawanishi",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Hero Is Way Too Cautious",
        airDate: "2019-10-02",
        synopsis:
          "Ristarte summons the overpowered hero Seiya Ryuuguuin, who refuses to step into Gaeabrande until he has done pushups for days and completely obliterates a harmless slime with multiple inferno spells.",
      },
      {
        number: 3,
        title: "This Hero Is Too Self-Serving",
        airDate: "2019-10-23",
        synopsis:
          "Seiya trains in the Divine Realm by sparring with the God of Swords Cerceus until the god is psychologically broken, after which they confront the demon army's vanguard.",
      },
      {
        number: 12,
        title: "The Hero Is Overpowered but Overly Cautious",
        airDate: "2019-12-27",
        synopsis:
          "The tragic truth of Seiya's previous life is unveiled as he activates the forbidden suicide technique Valhalla Gate to permanently eliminate the Demon Lord, sacrificing himself to save Gaeabrande.",
      },
    ],
    related: [],
    sources: [],
  },

  // 7. Log Horizon
  {
    slug: "log-horizon",
    title: "Log Horizon",
    japaneseTitle: "ログ・ホライズン",
    altTitles: [
      "Log Horizon Season 1",
      "Database",
    ],
    year: 2013,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 25,
    duration: 24,
    releaseDate: "2013-10-05",
    endDate: "2014-03-22",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Mamare Touno",
    studio: "satelight",
    director: "shinji-ishihira",
    creator: "mamare-touno",
    genreSlugs: ["isekai", "fantasy", "adventure", "action", "mystery"],
    synopsis:
      "During the release of the twelfth expansion pack for the globally popular MMORPG Elder Tale, thirty thousand Japanese gamers find themselves trapped inside the game world in an event called the 'Catastrophe.' Unlike typical death-game stories, players respawn when killed, creating a vacuum of societal collapse, economic despair, and lawlessness. Shiroe, an introverted graduate student and legendary strategist known as the 'Villain in Glasses,' unites the guilds of Akihabara to establish municipal laws, financial systems, and diplomatic relations with the indigenous NPC population.",
    historicalSignificance:
      "Log Horizon is universally hailed as the definitive macro-economic and political world-building masterpiece of the MMORPG isekai genre. While Sword Art Online focused on individual action heroics and death-game escapes, Log Horizon explored sociological reality: how a displaced modern populace organizes democratic governance, reinvents cuisine, institutes fiat currency, and interacts ethically with native 'People of the Land.' It demonstrated that intellect, diplomacy, and game-mechanic theory could be as thrilling as physical swordplay.",
    productionHistory:
      "Produced by Satelight (with Season 2 later moving to Studio Deen) and broadcast on Japan's national public broadcaster NHK Educational TV, the adaptation was directed by Shinji Ishihira with scripts by Toshizo Nemoto. The anime is celebrated for its cerebral pacing, intricate mechanical fidelity to classic tabletop and PC raiding mechanics, and its legendary opening theme 'Database' performed by MAN WITH A MISSION featuring TAKUMA.",
    reception:
      "Log Horizon was a major critical hit, praised by gamers and literary critics alike for its intellectual rigor and mature handling of community dynamics. Its NHK broadcast garnered an unusually broad demographic of viewers, cementing its status as an essential thinking-person's fantasy.",
    awards:
      "Consistently ranked in the top tier of NHK's best-received educational anime broadcasts; nominated across multiple categories in Japanese light novel guides (Kono Light Novel ga Sugoi!).",
    culturalImpact:
      "Shiroe's habit of pushing his glasses up by the bridge before delivering a devastating political or tactical checkmate became one of the most recognized character gestures in 2010s anime. The opening anthem 'Database' achieved legendary viral status among anime fans worldwide.",
    legacy:
      "Spanning three seasons over eight years, Log Horizon set the gold standard for game-theory isekai, profoundly influencing works like Overlord and That Time I Got Reincarnated as a Slime in their depictions of statecraft and logistics.",
    historyTimeline: [
      {
        label: "Web Novel Launch",
        year: "2010",
        text: "Mamare Touno begins serializing Log Horizon on Shōsetsuka ni Narō alongside MAOYU.",
      },
      {
        label: "NHK Broadcast",
        year: "2013-10-05",
        text: "Satelight's 25-episode anime adaptation premieres on NHK Educational TV.",
      },
      {
        label: "Round Table Established",
        year: "2013",
        text: "The formation of the Round Table Council of Akiba establishes an iconic anime depiction of virtual statecraft.",
      },
    ],
    characters: [
      {
        slug: "shiroe-log-horizon",
        name: "Shiroe",
        japaneseName: "シロエ",
        role: "Protagonist",
        biography:
          "A socially reserved engineering graduate student named Kei Shirogane whose avatar is a half-alv Enchanter/Scribe. Formerly the strategist of the legendary Debauchery Tea Party, his frightening analytical intelligence and political maneuvers earn him the affectionate moniker 'Villain in Glasses.'",
        voiceActor: "Takuma Terashima",
      },
      {
        slug: "naotsugu-log-horizon",
        name: "Naotsugu",
        japaneseName: "直継",
        role: "Supporting Protagonist",
        biography:
          "Shiroe's jovial, best friend and a Guardian class tank who served alongside him in the Debauchery Tea Party. Despite his running jokes about 'open panties,' he is a steadfast, fiercely dependable shield for his comrades in battle.",
        voiceActor: "Tomoaki Maeno",
      },
      {
        slug: "akatsuki-log-horizon",
        name: "Akatsuki",
        japaneseName: "アカツキ",
        role: "Main Heroine",
        biography:
          "A petite, quiet college student playing as an Assassin class shinobi. After Shiroe grants her a potion to match her avatar to her true female gender, she pledges lifelong loyalty to him as her 'Lord,' serving as his covert bodyguard.",
        voiceActor: "Emiri Kato",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Apocalypse",
        airDate: "2013-10-05",
        synopsis:
          "Thirty thousand Japanese players log into Elder Tale's Novasphere Pioneers expansion and find themselves trapped in a hyper-realistic replica of Akihabara, confronting the shock of the Catastrophe.",
      },
      {
        number: 9,
        title: "Round Table Conference",
        airDate: "2013-11-30",
        synopsis:
          "Shiroe executes a master financial coup by covertly purchasing the Akiba Guild Building, forcing the major guild leaders to unite and establish the historic Round Table Council.",
      },
      {
        number: 20,
        title: "Contract",
        airDate: "2014-02-15",
        synopsis:
          "Shiroe uses his rare Scribe subclass magic to write a revolutionary contract that bends the fundamental world laws of Elder Tale, securing the autonomy of the People of the Land.",
      },
    ],
    related: [],
    sources: [],
  },

  // 8. Grimgar: Ashes and Illusions
  {
    slug: "grimgar-ashes-and-illusions",
    title: "Grimgar: Ashes and Illusions",
    japaneseTitle: "灰と幻想のグリムガル",
    altTitles: [
      "Hai to Gensou no Grimgar",
      "Grimgar of Fantasy and Ash",
    ],
    year: 2016,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2016-01-11",
    endDate: "2016-03-28",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Juumonji Ao",
    studio: "a-1-pictures",
    director: "ryosuke-nakamura",
    creator: "juumonji-ao",
    genreSlugs: ["isekai", "drama", "fantasy", "action", "adventure"],
    synopsis:
      "A group of strangers awaken in the foggy, mysterious realm of Grimgar with no recollection of where they came from or who they were, retaining only the faint echoes of their names. The strongest among them are immediately recruited into elite volunteer soldier parties, leaving the leftovers — Haruhiro, Manato, Ranta, Moguzo, Yume, and Shihoru — to band together as desperate novices. Struggling to kill even a single low-level goblin for a handful of copper coins, they confront the agonizing physical pain, psychological trauma, and lethal finality of survival in a grounded fantasy world.",
    historicalSignificance:
      "Grimgar: Ashes and Illusions is widely celebrated as the anti-escapist antithesis to power-fantasy isekai. By treating combat not as a video game, but as desperate, terrifying life-or-death struggles where goblins cry and fight desperately for their lives, the series introduced profound emotional realism to the genre. Its depiction of grief, party dynamics, and the economic hardship of earning enough copper coins for clean underwear remains unmatched in isekai anime.",
    productionHistory:
      "Directed by visionary filmmaker Ryosuke Nakamura (director of Mouryou no Hako and Nerawareta Gakuen) at A-1 Pictures, the anime is distinguished by its breathtaking watercolor background art direction helmed by Hidetoshi Kaneko. Character designer Mieko Hosoi delivered delicate, expressive linework, while the music collective (K)NoW_NAME provided an evocative acoustic and indie-pop soundtrack that scored the emotional contours of daily survival.",
    reception:
      "While its contemplative pacing and melancholic tone differed sharply from mainstream action anime, Grimgar garnered a passionate cult following and glowing critical praise for its artistic direction, mature handling of mortality, and atmospheric beauty. It is frequently cited as one of the most visually gorgeous and emotionally poignant fantasy anime of the 2010s.",
    awards:
      "Nominated for Best Drama and Best Background Art at the Anime Trending Awards (2017); widely acclaimed by sakuga communities for its nuanced character acting and grounded combat choreography.",
    culturalImpact:
      "The anime set a high-water mark for naturalistic fantasy realism. The desperate struggle to kill their first goblin in Episode 2 and the sudden, devastating death of their party leader Manato in Episode 4 redefined what fantasy stakes could feel like for modern anime fans.",
    legacy:
      "Grimgar remains the definitive 'low-fantasy survival' benchmark in anime, frequently contrasted against overpowered isekai to illustrate the artistic potential of treating fantasy worlds with visceral physical and psychological authenticity.",
    historyTimeline: [
      {
        label: "Novel Serialization",
        year: "2013",
        text: "Juumonji Ao publishes Grimgar of Fantasy and Ash with Overlap Bunko featuring Eiri Shirai's illustrations.",
      },
      {
        label: "Anime Premiere",
        year: "2016-01-11",
        text: "A-1 Pictures' 12-episode adaptation premieres, stunning viewers with its watercolor aesthetics.",
      },
      {
        label: "Cult Classic Legacy",
        year: "2016",
        text: "The soundtrack by (K)NoW_NAME and the series' realistic treatment of mortality establish its enduring critical prestige.",
      },
    ],
    characters: [
      {
        slug: "haruhiro-grimgar",
        name: "Haruhiro",
        japaneseName: "ハルヒロ",
        role: "Protagonist",
        biography:
          "A cautious, observant Thief who prefers keeping a low profile. Thrust into leadership following a devastating tragedy, he must overcome self-doubt and guide his struggling companions through harrowing dungeon skirmishes with quiet resilience.",
        voiceActor: "Nobuhiko Okamoto",
      },
      {
        slug: "manato-grimgar",
        name: "Manato",
        japaneseName: "マナト",
        role: "Party Leader / Priest",
        biography:
          "The compassionate, charismatic Priest who forms the party of misfits. He takes on the burden of their safety and emotional health, serving as their frontline guide and moral compass until tragedy strikes.",
        voiceActor: "Nobunaga Shimazaki",
      },
      {
        slug: "mary-grimgar",
        name: "Mary",
        japaneseName: "メリィ",
        role: "Main Heroine",
        biography:
          "A skilled Priestess who joins Haruhiro's party after Manato's death. Cold and aloof due to survivor's guilt from losing her previous party, she gradually reopens her heart as Haruhiro and his friends earn her trust.",
        voiceActor: "Chika Anzai",
      },
    ],
    episodes: [
      {
        number: 2,
        title: "Long Day of the Trainee Volunteer Soldier",
        airDate: "2016-01-18",
        synopsis:
          "Haruhiro and his party engage in a messy, desperate brawl against a single lone goblin, confronting the brutal reality that their opponents are living creatures fighting desperately for survival.",
      },
      {
        number: 4,
        title: "In His Silvery Sky",
        airDate: "2016-02-01",
        synopsis:
          "During a routine goblin hunt in the ruins of Damrow, party leader Manato is fatally shot in the back by a goblin arrow, leaving the party shattered by grief and leaderless.",
      },
      {
        number: 12,
        title: "See You Tomorrow...",
        airDate: "2016-03-28",
        synopsis:
          "Haruhiro leads his party into the depths of the Cyrene Mines to avenge Mary's fallen comrades, engaging in a lethal duel against the gargantuan kobold Death Spots.",
      },
    ],
    related: [],
    sources: [],
  },

  // 9. The Devil Is a Part-Timer!
  {
    slug: "the-devil-is-a-part-timer",
    title: "The Devil Is a Part-Timer!",
    japaneseTitle: "はたらく魔王さま!",
    altTitles: [
      "Hataraku Maou-sama!",
      "The Devil Is a Part-Timer! Season 1",
    ],
    year: 2013,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 13,
    duration: 24,
    releaseDate: "2013-04-04",
    endDate: "2013-06-27",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Satoshi Wagahara",
    studio: "white-fox",
    director: "naoto-hosoda",
    creator: "satoshi-wagahara",
    genreSlugs: ["isekai", "comedy", "supernatural", "fantasy", "slice-of-life"],
    synopsis:
      "Conquered by the Hero Emilia Justina in the fantasy realm of Ente Isla, the Demon Lord Satan and his general Alciel escape through a dimensional vortex, only to arrive in bustling modern-day Tokyo. Deprived of their magic in an un-enchanted world, the dread Lord of Darkness is forced to take the name Sadao Maou, rent a cramped six-tatami apartment, and take a minimum-wage job flipping burgers at a fast-food joint called MgRonald. Juggling fry-cooking shifts, corporate promotions, and budget groceries, Maou aims to conquer Japan one customer service smile at a time.",
    historicalSignificance:
      "The Devil Is a Part-Timer! is the undisputed pioneer and defining masterpiece of the 'reverse-isekai' subgenre. By flipping the traditional isekai journey upside down, it brought an all-powerful dark fantasy lord into the mundane, unforgiving economic grind of contemporary metropolitan life. Its ingenious blend of workplace sitcom, corporate hustle, and high-octane urban magical combat created a comedic template that dozens of subsequent series attempted to emulate.",
    productionHistory:
      "Produced by Studio White Fox during the studio's golden era of adaptations, the anime was directed by Naoto Hosoda with series composition by Masahiro Yokotani and character designs by Atsushi Ikariya. White Fox infused the mundane kitchen shifts with cinematic urgency and matched the comedic timing with fluid, sakuga-heavy magic battles whenever the characters briefly regained their supernatural powers.",
    reception:
      "The anime was an explosive critical and commercial smash hit in Spring 2013. Its sharp humor, relatable workplace satire, and charming character chemistry earned immense global popularity, keeping it at the top of fan wishlists for nearly a decade until Season 2 was finally produced in 2022.",
    awards:
      "Winner of multiple awards at the Tokyo Anime Award Festival; consistently ranked among the Top 10 Best Comedy Anime of the 2010s by Anime News Network and Crunchyroll.",
    culturalImpact:
      "Sadao Maou's fanatical corporate dedication to MgRonald's shift supervisor position, Alciel's penny-pinching household economics, and Emilia's frustrated phone-call-center employment became iconic anime parodies of Japanese working-class life.",
    legacy:
      "The show established the blueprint for reverse-isekai comedies (such as The Great Jahy Will Not Be Defeated! and Dead Mount Death Play) and remains one of the most beloved comedic properties in Dengeki Bunko's history.",
    historyTimeline: [
      {
        label: "Dengeki Novel Prize",
        year: "2010",
        text: "Satoshi Wagahara wins the Silver Prize at the 17th Dengeki Novel Prize under the original title Maoujou wa Rokujou Hitoma!.",
      },
      {
        label: "Anime Sensation",
        year: "2013-04-04",
        text: "White Fox's 13-episode anime adaptation airs, becoming an immediate worldwide comedy sensation.",
      },
      {
        label: "A Decade Later",
        year: "2022",
        text: "After nine years of ardent fan campaigns, a second season premieres to celebrate the franchise's longevity.",
      },
    ],
    characters: [
      {
        slug: "sadao-maou",
        name: "Sadao Maou / Satan Jacob",
        japaneseName: "真奥 貞夫",
        role: "Protagonist",
        biography:
          "The Demon Lord of Ente Isla who fled to Tokyo and found a new calling in fast-food retail. Highly ambitious, conscientious, and hardworking, he applies demonic efficiency to achieving shift leader promotions at MgRonald while quietly safeguarding his human neighborhood.",
        voiceActor: "Ryota Osaka",
      },
      {
        slug: "emi-yusa",
        name: "Emi Yusa / Emilia Justina",
        japaneseName: "遊佐 恵美",
        role: "Main Heroine",
        biography:
          "The half-human, half-angel Hero who pursued Satan to Tokyo to finish him off. Forced to work as a mobile phone call-center agent to pay rent, her righteous vengeance is constantly derailed by Maou's bafflingly wholesome, productive civilian behavior.",
        voiceActor: "Yoko Hikasa",
      },
      {
        slug: "shiro-ashiya",
        name: "Shiro Ashiya / Alciel",
        japaneseName: "芦屋 四郎",
        role: "Supporting Character",
        biography:
          "Satan's most trusted demonic general who becomes the obsessive househusband of Villa Rosa Sasazuka. He spends his days clipping grocery coupons, tracking the apartment budget, and researching magic restoration at the local public library.",
        voiceActor: "Yuki Ono",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Devil Arrives in Sasazuka",
        airDate: "2013-04-04",
        synopsis:
          "Defeated in Ente Isla, Demon Lord Satan and Alciel materialize in Tokyo, register as Japanese residents Sadao Maou and Shiro Ashiya, and begin their struggle with modern economics.",
      },
      {
        number: 5,
        title: "The Devil and the Hero Save Sasazuka",
        airDate: "2013-05-02",
        synopsis:
          "Rogue angel Sariel and traitorous general Lucifer trigger an earthquake in Shibuya; Maou absorbs the city's panic to temporarily regain his colossal demonic form and save the district.",
      },
      {
        number: 12,
        title: "The Devil Stays at His Post",
        airDate: "2013-06-20",
        synopsis:
          "Archangel Sariel traps Emi and Chiho in the department store tower, but Maou rushes to their rescue to protect the retail reputation of MgRonald and defeat Sariel with sheer fast-food resolve.",
      },
    ],
    related: [],
    sources: [],
  },

  // 10. Gate
  {
    slug: "gate",
    title: "Gate",
    japaneseTitle: "ゲート 自衛隊 彼の地にて、斯く戦えり",
    altTitles: [
      "Gate: Jieitai Kanochi nite, Kaku Tatakaeri",
      "GATE: Thus the JSDF Fought There!",
    ],
    year: 2015,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 24,
    duration: 24,
    releaseDate: "2015-07-04",
    endDate: "2016-03-26",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Takumi Yanai",
    studio: "a-1-pictures",
    director: "takahiko-kyogoku",
    creator: "takumi-yanai",
    genreSlugs: ["isekai", "action", "fantasy", "military", "adventure"],
    synopsis:
      "When a mysterious classical Greek gate suddenly manifests in Ginza, Tokyo, a horde of dragons, monsters, and medieval imperial legions spill forth to slaughter civilians. The Japan Ground Self-Defense Force (JGSDF) swiftly repels the invasion and establishes a fortified beachhead on the other side in a fantasy world dubbed the 'Special Region.' First Lieutenant Youji Itami, a 33-year-old otaku soldier, is tasked with leading a reconnaissance unit across the continent, bridging modern geopolitics and diplomacy with elven sorcerers, demi-gods, and medieval empires.",
    historicalSignificance:
      "Gate is the definitive modern military-fantasy isekai, pioneering the concept of asymmetrical warfare where modern combined-arms military technology (Howitzers, Type 74 tanks, F-4 Phantom fighters, and assault rifles) clashes with high-fantasy armies, wyverns, and magic. Written by a real-life ex-SDF officer, the series grounded fantasy exploration in modern international law, diplomacy, logistics, and resource diplomacy.",
    productionHistory:
      "Produced by A-1 Pictures under director Takahiko Kyogoku (celebrated for Love Live!), the production featured meticulous military consultation to accurately depict military armaments, tactical formations, and JGSDF vehicles. Jun Nakai adapted Daisuke Izuka's novel character designs, creating instantly iconic fantasy heroines: the gothic-lolita demigod Rory Mercury, elven sorceress Tuka, and mage Lelei.",
    reception:
      "The anime was a ratings and commercial smash hit, praised for its thrilling demonstration of modern military firepower versus medieval armies, as well as its political intrigue. It significantly increased public awareness and interest in the JSDF and topped international seasonal charts in 2015 and 2016.",
    awards:
      "Winner of multiple awards at the Sugoi Japan Awards 2017 in the Light Novel and Anime divisions; Rory Mercury achieved top ranks in multiple Newtype magazine character polls.",
    culturalImpact:
      "Rory Mercury, the halberd-wielding Apostle of the God of War Emroy, became a legendary figure in modern anime fandom, inspiring countless cosplays and figures. The scene of modern attack helicopters annihilating Imperial legions to the tune of Wagner's 'Ride of the Valkyries' became an indelible anime classic.",
    legacy:
      "Gate laid the groundwork for an entire wave of 'modern military versus fantasy' stories (such as Nihonkoku Shoukan), demonstrating the enduring appeal of tactical realism within fantastical settings.",
    historyTimeline: [
      {
        label: "Arcadia Debut",
        year: "2006",
        text: "Takumi Yanai, writing under the pen name Todoku Takusan, begins publishing the novel on the Arcadia portal.",
      },
      {
        label: "A-1 Pictures Broadcast",
        year: "2015-07-04",
        text: "The anime adaptation premieres on Tokyo MX, garnering widespread acclaim for its military realism.",
      },
      {
        label: "Special Region Diplomacy",
        year: "2016",
        text: "The second cour completes the imperial civil war and treaty negotiations, concluding a 24-episode saga.",
      },
    ],
    characters: [
      {
        slug: "youji-itami",
        name: "Youji Itami",
        japaneseName: "伊丹 耀司",
        role: "Protagonist",
        biography:
          "A 33-year-old JGSDF First Lieutenant and Ranger-qualified officer who openly proclaims he only works to support his otaku hobbies. Despite his slacker demeanor, he is an exceptionally cool-headed, capable commander who prioritizes human lives and diplomacy over glory.",
        voiceActor: "Junichi Suwabe",
      },
      {
        slug: "rory-mercury",
        name: "Rory Mercury",
        japaneseName: "ロゥリィ・マーキュリー",
        role: "Main Heroine",
        biography:
          "A 961-year-old Apostle of Emroy, the God of Darkness, War, and Death. Dressed in gothic lolita attire and wielding an impossibly heavy battle scythe, she experiences ecstatic spiritual arousal during combat and serves as Itami's most formidable ally.",
        voiceActor: "Risa Taneda",
      },
      {
        slug: "lelei-la-lalena",
        name: "Lelei la Lalena",
        japaneseName: "レレイ・ラ・レレーナ",
        role: "Supporting Heroine",
        biography:
          "A brilliant 15-year-old human sorceress from the Special Region who rapidly learns the Japanese language and modern scientific theory, serving as the chief translator and diplomat between the two worlds.",
        voiceActor: "Nao Toyama",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Self-Defense Force Goes to Another World",
        airDate: "2015-07-04",
        synopsis:
          "Monsters and Roman-style soldiers invade Ginza; off-duty soldier Youji Itami organizes an evacuation, prompting Japan to send the JSDF through the gate to secure the Special Region.",
      },
      {
        number: 9,
        title: "The Battle of Italica",
        airDate: "2015-08-29",
        synopsis:
          "Itami's unit and Rory Mercury assist Princess Piña Co Lada in defending the walled city of Italica against marauders, obliterating the enemy using modern claymores and helicopter gunships.",
      },
      {
        number: 18,
        title: "The Fire Dragon, Once More",
        airDate: "2016-02-13",
        synopsis:
          "Itami leads an unauthorized strike force equipped with Panzerfaust 3 anti-tank rocket launchers to slay the ancient Flame Dragon and avenge Tuka's murdered kin.",
      },
    ],
    related: [],
    sources: [],
  },

  // 11. Problem Children Are Coming from Another World, Aren't They?
  {
    slug: "problem-children-are-coming-from-another-world",
    title: "Problem Children Are Coming from Another World, Aren't They?",
    japaneseTitle: "問題児たちが異世界から来るそうですよ?",
    altTitles: [
      "Mondaiji-tachi ga Isekai kara Kuru Sou Desu yo?",
      "Mondaiji",
      "Problem Children",
    ],
    year: 2013,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 10,
    duration: 24,
    releaseDate: "2013-01-12",
    endDate: "2013-03-16",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Taro Tatsunoko",
    studio: "diomedea",
    director: "keizou-kusakawa",
    creator: "taro-tatsunoko",
    genreSlugs: ["isekai", "fantasy", "action", "supernatural", "comedy"],
    synopsis:
      "Bored by their mundane worlds due to possessing incomprehensible psychic powers, three extraordinary teenagers — Izayoi Sakamaki, Asuka Kudou, and You Kasukabe — receive letters that transport them into 'Little Garden,' an expansive mythological realm where deities, demons, and mythic communities clash in high-stakes 'Gift Games.' Recruited by the well-intentioned Black Rabbit to revive her penniless, nameless community whose pride was stolen by a Demon Lord, the trio eagerly dive into battle against ancient gods.",
    historicalSignificance:
      "Problem Children is a crucial precursor to the hyper-intellectual mythic game-world isekai wave, airing directly alongside and foreshadowing hits like No Game No Life. Rather than following an ordinary protagonist who slowly levels up, it introduced an already invincible, intellectually peerless hero who dismantles mythological deities with raw strength and esoteric trivia, creating a template for mythological battle royales.",
    productionHistory:
      "Produced by Studio Diomedéa under Chief Director Keizou Kusakawa and Director Yasutaka Yamamoto, the adaptation condensed Taro Tatsunoko's lore-heavy Sneaker Bunko light novel series. Character designs by Naomi Ide were praised for their vibrant colors and faithful rendition of Yuu Amano's illustrations, with the catchy dance ending theme 'To Be Continued?' sung by Kaori Sadohara becoming a memorable fan favorite.",
    reception:
      "Despite its brief 10-episode run, the series developed an intense cult following thanks to Izayoi's cocky charm, Black Rabbit's endearing exasperation, and the intricate mythological worldbuilding. Fans continue to champion the series as one of the most underrated isekai titles of the early 2010s.",
    awards:
      "Ranked among the top light novel adaptations in early 2013 by Sneaker Bunko; consistently featured in top recommendations for fans of high-tier power scaling and mythological fantasy.",
    culturalImpact:
      "Black Rabbit's playful bunny ears, mini-skirt aesthetic, and judge status made her an iconic mascot of early 2010s anime tropes. Izayoi kicking away water deities and breaking tectonic physics with his bare hands established the modern 'unapologetically OP chad protagonist' standard.",
    legacy:
      "The series stands as a beloved milestone in the evolution of tournament and game-logic isekai, proving that mixing mythological pantheons (Greek, Nordic, Hindu, Japanese folklore) with competitive gaming rules could sustain deeply gripping fantasy narratives.",
    historyTimeline: [
      {
        label: "Sneaker Bunko Debut",
        year: "2011",
        text: "Taro Tatsunoko's light novel series debuts with Kadokawa Sneaker Bunko.",
      },
      {
        label: "Diomedéa Anime Broadcast",
        year: "2013-01-12",
        text: "Diomedéa's animated television series premieres, instantly captivating fans of high-speed supernatural action.",
      },
      {
        label: "Franchise Milestone",
        year: "2013",
        text: "An original video animation (OVA) episode releases alongside the eighth light novel volume, cementing its cult legacy.",
      },
    ],
    characters: [
      {
        slug: "izayoi-sakamaki",
        name: "Izayoi Sakamaki",
        japaneseName: "逆廻 十六夜",
        role: "Protagonist",
        biography:
          "A supremely arrogant yet deeply erudite teenager gifted with the mysterious 'Code Unknown,' granting him the power to shatter divinity, nullify magical gifts, and pulverize mountains with a single kick while outsmarting ancient tacticians.",
        voiceActor: "Shintaro Asanuma",
      },
      {
        slug: "black-rabbit-mondaiji",
        name: "Black Rabbit",
        japaneseName: "黒ウサギ",
        role: "Main Heroine",
        biography:
          "An aristocratic Moon Rabbit who summoned the problem children to Little Garden to rebuild her fallen community, 'No Name.' Dedicated and earnest, she is constantly subjected to Izayoi's teasing and skirt-flipping antics while serving as a designated referee for Gift Games.",
        voiceActor: "Iori Nomizu",
      },
      {
        slug: "asuka-kudou",
        name: "Asuka Kudou",
        japaneseName: "久遠 飛鳥",
        role: "Supporting Protagonist",
        biography:
          "A proud, wealthy young lady from mid-20th-century Japan gifted with the authority 'Authority,' allowing her to command living beings and inanimate objects with absolute verbal sovereignty.",
        voiceActor: "Sarah Emi Bridcutt",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Problem Children Have Arrived in a Fantasy World, Haven't They?",
        airDate: "2013-01-12",
        synopsis:
          "Izayoi, Asuka, and You fall from the sky into Little Garden and immediately demonstrate their terrifying abilities by defeating the Water God Galdo Gasper in a casual wager.",
      },
      {
        number: 4,
        title: "Aren't These Problem Children Getting a Little Dark?",
        airDate: "2013-02-02",
        synopsis:
          "Izayoi challenges the Demon Lord of the Gorgon, Shirayuki-hime, effortlessly demonstrating his physical invulnerability and tactical genius to claim victory for No Name.",
      },
      {
        number: 10,
        title: "It Seems the Problem Children Are Solving the Mystery?",
        airDate: "2013-03-16",
        synopsis:
          "Izayoi, Asuka, and You confront the Demon Lord of the Pied Piper of Hamelin, breaking the ancient curse and restoring glory and pride to the community of Salamandra and No Name.",
      },
    ],
    related: [],
    sources: [],
  },

  // 12. Drifters
  {
    slug: "drifters",
    title: "Drifters",
    japaneseTitle: "ドリフターズ",
    altTitles: [
      "DRIFTERS",
      "Drifters: Battle in a Brand-New World War",
    ],
    year: 2016,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2016-10-07",
    endDate: "2016-12-23",
    eraSlug: "streaming-era",
    sourceMaterial: "Manga by Kouta Hirano",
    studio: "hoods-entertainment",
    director: "kenichi-suzuki",
    creator: "kouta-hirano",
    genreSlugs: ["isekai", "action", "historical", "fantasy", "dark-fantasy"],
    synopsis:
      "At the bloody Battle of Sekigahara in 1600, samurai Shimazu Toyohisa fatally wounds enemy commander Ii Naomasa before stumbling through a corridor of doors presided over by an enigmatic bureaucrat named Murasaki. Reborn into a fantasy continent populated by oppressed elves, dwarves, and monsters, Toyohisa forms an alliance with legendary warlord Oda Nobunaga and master archer Nasu no Yoichi. Together, they are 'Drifters' — history's greatest warriors summoned to wage an apocalyptic war of liberation against the 'Ends,' a legion of vengeful historical figures led by the mysterious Black King who seeks the total extermination of humanity.",
    historicalSignificance:
      "Drifters represents the brutal, hyper-stylized pinnacle of historical warrior isekai. Created by Kouta Hirano (the visionary author of Hellsing), the series radically rejected the wholesome RPG tropes of contemporary isekai in favor of visceral, blood-soaked total warfare, black powder firearms manufacturing, and guerilla strategy. It is universally cited for its masterclass execution of pitting real-world historical tacticians (Oda Nobunaga, Hannibal Barca, Scipio Africanus, Butch Cassidy, the Sundance Kid) against fantasy monsters.",
    productionHistory:
      "Produced by Hoods Drifters Studio (a dedicated production unit within Hoods Entertainment) and directed by Kenichi Suzuki (director of JoJo's Bizarre Adventure Parts 1–3), the anime faithfully transferred Kouta Hirano's heavy ink hatching, grotesque grimaces, and sudden chibified slapstick comedy to the screen. The pulse-pounding soundtrack by Yasushi Ishii and Hayato Matsuo delivered orchestral and industrial rock energy.",
    reception:
      "Drifters was celebrated worldwide by fans of mature, uncompromising action. Its kinetic decapitations, strategic realism, and darkly charismatic cast earned exceptional reviews, making it a staple of hardcore anime fandom and prompting continuous releases of OVA follow-ups.",
    awards:
      "Nominated for Best Action and Best Animation at the 1st Crunchyroll Anime Awards (2017); praised by IGN and Anime News Network as one of the best action series of 2016.",
    culturalImpact:
      "Shimazu Toyohisa's obsessive craving for enemy heads ('Kubi o dase!' / 'Give me your head!') and Nobunaga's gleeful discovery of using elven feces to refine black powder became legendary anime memes. Drifters set the bar for how real historical warriors should behave in fantasy settings.",
    legacy:
      "Drifters proved that historical military isekai could be visceral, darkly comedic, and artistically distinct from the flooded market of light novel adaptations, cementing Kouta Hirano's status as a master of stylized dark fantasy.",
    historyTimeline: [
      {
        label: "Young King OURs Debut",
        year: "2009",
        text: "Kouta Hirano begins publishing Drifters in Shōnen Gahōsha's Young King OURs.",
      },
      {
        label: "Anime Premiere",
        year: "2016-10-07",
        text: "Hoods Drifters Studio debuts the 12-episode television anime to critical acclaim.",
      },
      {
        label: "OVA Continuation",
        year: "2017–2018",
        text: "Episodes 13 through 15 release as direct-to-video animations expanding the war against the Black King.",
      },
    ],
    characters: [
      {
        slug: "shimazu-toyohisa",
        name: "Shimazu Toyohisa",
        japaneseName: "島津 豊久",
        role: "Protagonist",
        biography:
          "A fierce Satsuma samurai whose combat doctrine is governed entirely by the brutal honor of the battlefield and an unrelenting desire to sever enemy commanders' heads. Honest, blunt, and fearless, he becomes the spearhead of the Drifter rebellion.",
        voiceActor: "Yuichi Nakamura",
      },
      {
        slug: "oda-nobunaga-drifters",
        name: "Oda Nobunaga",
        japaneseName: "織田 信長",
        role: "Supporting Protagonist",
        biography:
          "The legendary Japanese warlord who conquered much of Japan during the Sengoku period. Aging, one-eyed, and Machiavellian, he acts as the master strategist of the Drifters, pioneering firearm logistics, scorched-earth tactics, and statecraft.",
        voiceActor: "Naoya Uchida",
      },
      {
        slug: "nasu-no-yoichi",
        name: "Nasu no Yoichi",
        japaneseName: "那須 与一",
        role: "Supporting Protagonist",
        biography:
          "An ethereal, androgynous master archer who fought in the Genpei War centuries earlier. His lethal precision with a longbow allows him to pin down enemy commanders and wyverns from hundreds of yards away.",
        voiceActor: "Mitsuki Saiga",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Fight Song",
        airDate: "2016-10-07",
        synopsis:
          "Mortally wounded during the Battle of Sekigahara in 1600, Shimazu Toyohisa is sent through a mysterious hallway of doors into a fantasy realm where he is sheltered by Oda Nobunaga and Nasu no Yoichi.",
      },
      {
        number: 3,
        title: "Army Sortie at Dawn",
        airDate: "2016-10-21",
        synopsis:
          "Toyohisa, Nobunaga, and Yoichi slaughter the brutal human soldiers of the Orte Empire occupying an elven village, rallying the oppressed elves into a violent rebellion to reclaim their lands.",
      },
      {
        number: 10,
        title: "Baba Yetu",
        airDate: "2016-12-09",
        synopsis:
          "The Black King marches his gigantic horde of orcs, dragons, and undead upon the capital of Orte, initiating an apocalyptic siege where the Ends unleash superhuman devastation.",
      },
    ],
    related: [],
    sources: [],
  },

  // 13. How Not to Summon a Demon Lord
  {
    slug: "how-not-to-summon-a-demon-lord",
    title: "How Not to Summon a Demon Lord",
    japaneseTitle: "異世界魔王と召喚少女の奴隷魔術",
    altTitles: [
      "Isekai Maou to Shoukan Shoujo no Dorei Majutsu",
      "Isekai Maou",
    ],
    year: 2018,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2018-07-05",
    endDate: "2018-09-20",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Yukiya Murasaki",
    studio: "ajia-do",
    director: "yuta-murano",
    creator: "yukiya-murasaki",
    genreSlugs: ["isekai", "comedy", "fantasy", "action", "harem"],
    synopsis:
      "Takuma Sakamoto is an introverted gaming shut-in who reigns supreme in the MMORPG Cross Reverie under the dreaded avatar 'Demon Lord Diablo.' Suddenly summoned into the fantasy world of the game by two young summoners — the pantherian girl Rem and the busty elf Shera — they perform an enslavement ritual to bind him to their will. However, Takuma's passive magic ring reflects the spell back upon them, making the two summoners his slaves instead. Paralyzed by severe social anxiety, Takuma decides to cope by roleplaying his tyrannical, bombastic Demon Lord persona while protecting his new companions.",
    historicalSignificance:
      "How Not to Summon a Demon Lord became one of the definitive ecchi-comedy isekai pillars of the late 2010s. By juxtaposing an utterly socially inept shut-in who cannot hold a normal conversation against a thundering, theatrical Demon Lord roleplay persona, the series delivered both hilarious situational comedy and surprisingly crisp, well-choreographed magic duel animations.",
    productionHistory:
      "Produced by Ajia-do Animation Works under the direction of Yuta Murano (who later directed Kakushigoto), the anime stood out for its vibrant color palette, polished comedic timing, and faithful adaptation of Takahiro Tsurusaki's distinctive character designs. The production featured an energetic opening theme 'DeCIDE' performed by the lead voice actresses under the group name SUMMONERS 2+.",
    reception:
      "The anime was an undeniable international streaming success on Crunchyroll and Funimation, generating millions of views and massive merchandise sales for figures of Rem and Shera. Its strong viewership numbers led directly to the greenlighting of a second season (Omega) in 2021.",
    awards:
      "Ranked among the top 5 most-watched anime simulcasts on Crunchyroll in Summer 2018 across multiple European and North American territories.",
    culturalImpact:
      "Diablo's grandiose, villainous speeches delivered to mask his inner panic — coupled with his absolute magic reflection ring — cemented him as one of the most endearing 'fake villain' heroes of modern isekai. The show set the standard for high-production-value ecchi fantasy.",
    legacy:
      "The series demonstrated Ajia-do's versatility outside of children's and slice-of-life animation, establishing a reliable commercial template for Kodansha's light novel adaptations.",
    historyTimeline: [
      {
        label: "Kodansha Ranobe Debut",
        year: "2014",
        text: "Yukiya Murasaki begins publishing the light novel series with illustrations by Takahiro Tsurusaki.",
      },
      {
        label: "Ajia-do Adaptation",
        year: "2018-07-05",
        text: "Season 1 premieres, achieving massive international streaming figures on Crunchyroll.",
      },
      {
        label: "Season 2: Omega",
        year: "2021",
        text: "The series returns for a second season co-produced by Tezuka Productions and Okuruto Noboru.",
      },
    ],
    characters: [
      {
        slug: "diablo-takuma-sakamoto",
        name: "Diablo / Takuma Sakamoto",
        japaneseName: "ディアブロ / 坂本 拓真",
        role: "Protagonist",
        biography:
          "A socially anxious gamer who cannot speak to girls without stuttering. To survive in another world, he adopts the arrogant, bellowing persona of his Cross Reverie game avatar, using his max-level elemental sorcery and magic reflection ring to crush all opposition.",
        voiceActor: "Masaaki Mizunaka",
      },
      {
        slug: "rem-galeu",
        name: "Rem Galeu",
        japaneseName: "レム・ガレウ",
        role: "Main Heroine",
        biography:
          "A petite Pantherian summoner who harbors the dormant soul of the Demon Lord Krebskulm sealed within her body. Serious, analytical, and brave, she binds herself to Diablo in search of power to prevent Krebskulm's resurrection.",
        voiceActor: "Azumi Waki",
      },
      {
        slug: "shera-l-greenwood",
        name: "Shera L. Greenwood",
        japaneseName: "シェラ・L・グリーンウッド",
        role: "Main Heroine",
        biography:
          "An endowed, airheaded Elven princess who fled her kingdom to live freely as an adventurer. Her cheerful clumsiness and affection for Diablo regularly spark comedic romantic chaos with Rem.",
        voiceActor: "Yū Serizawa",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Demon Lord Act",
        airDate: "2018-07-05",
        synopsis:
          "Takuma Sakamoto is summoned to the Starfall Shrine as his avatar Diablo by Rem and Shera; his Magic Reflection ring reverses their enslavement spell, forcing him to act out his Demon Lord persona.",
      },
      {
        number: 9,
        title: "Holy Knight Tale",
        airDate: "2018-08-30",
        synopsis:
          "Corrupt Paladin Saddler captures Rem and Alicia to execute them for heresy; Diablo descends upon his cathedral and unleashes catastrophic forbidden magic to dismantle Saddler's forces.",
      },
      {
        number: 12,
        title: "Battle for Legitimacy",
        airDate: "2018-09-20",
        synopsis:
          "When the true Demon Lord Krebskulm awakens into a rampaging catastrophe, Diablo risks his life in single combat, combining top-tier magic and emotional appeal to save both Klem and Rem.",
      },
    ],
    related: [],
    sources: [],
  },

  // 14. Wise Man's Grandchild
  {
    slug: "wise-mans-grandchild",
    title: "Wise Man's Grandchild",
    japaneseTitle: "賢者の孫",
    altTitles: [
      "Kenja no Mago",
      "Philosopher's Grandchild",
    ],
    year: 2019,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2019-04-10",
    endDate: "2019-06-26",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Tsuyoshi Yoshioka",
    studio: "silver-link",
    director: "masafumi-tamura",
    creator: "tsuyoshi-yoshioka",
    genreSlugs: ["isekai", "action", "fantasy", "comedy", "romance"],
    synopsis:
      "A young Japanese salaryman dies in a traffic accident and reincarnates as an infant in a fantasy world, where he is adopted by the legendary sage Merlin Walford and named Shin. Raised in deep seclusion, Shin is taught god-tier magical theory and martial arts, effortlessly augmenting his spells using his retained memories of modern atomic physics and chemistry. Upon turning fifteen, Merlin makes a shocking discovery: while Shin has become the most dangerously overpowered sorcerer in human history, he forgot to teach him a single shred of basic common sense.",
    historicalSignificance:
      "Wise Man's Grandchild stands as the quintessential 'zero-friction power fantasy' of the late 2010s isekai boom. Unapologetic about its overpowered protagonist, wholesome romance, and supportive found-family dynamics, it bypassed typical grim dark-fantasy angst in favor of infectious, breezy fun where the hero effortlessly invents hydrogen-bombs through visualization and equips his entire academy class with world-class gear.",
    productionHistory:
      "Animated by Silver Link under director Masafumi Tamura (director of The Misfit of Demon King Academy), the anime featured clean character designs by Yuki Sawairi and kinetic magical effects. The production embraced its comedic and romantic strengths, allowing Shin and main heroine Sizilien to form an earnest, mutually supportive relationship early on rather than dragging out endless harem misunderstandings.",
    reception:
      "The anime was an immense commercial success in international streaming, consistently topping Funimation and Bilibili weekly charts during Spring 2019. Its feel-good accessibility, satisfying combat spectacles, and lack of stressful drama resonated strongly with mainstream viewers.",
    awards:
      "Light novel sales exceeded 3 million copies following the anime's broadcast; nominated in multiple categories at seasonal streaming awards for best fantasy romance.",
    culturalImpact:
      "The show codified the 'protagonist lacks common sense' (常識知らず) trope into an art form, spawning countless light novels where modern scientific principles (like molecular visualization and atomic heat) are applied to fantasy magic circles.",
    legacy:
      "Wise Man's Grandchild proved that wholesome, uncomplicated power fantasies with early romantic progress have enormous commercial longevity, paving the way for similar cozy high-magic adaptations throughout the 2020s.",
    historyTimeline: [
      {
        label: "Shōsetsuka ni Narō Serialization",
        year: "2015",
        text: "Tsuyoshi Yoshioka begins publishing the web novel on Narō, followed by Kadokawa Famitsu Bunko light novel publication.",
      },
      {
        label: "Silver Link Anime Premiere",
        year: "2019-04-10",
        text: "The anime adaptation airs across Japan and international streaming platforms, becoming an instant crowd-pleaser.",
      },
      {
        label: "Franchise Milestone",
        year: "2020",
        text: "The combined print and digital circulation of the novels and manga surpasses five million copies.",
      },
    ],
    characters: [
      {
        slug: "shin-walford",
        name: "Shin Walford",
        japaneseName: "シン＝ウォルフォード",
        role: "Protagonist",
        biography:
          "A reincarnated salaryman raised by Sage Merlin and Guru Melinda. By combining his understanding of modern atomic science with magic visualization, he casts cataclysmic spells chantlessly, though he is perpetually baffled by social norms and royalty protocols.",
        voiceActor: "Yusuke Kobayashi",
      },
      {
        slug: "sizilien-von-claude",
        name: "Sizilien von Claude",
        japaneseName: "シシリー＝フォン＝クロード",
        role: "Main Heroine",
        biography:
          "A gentle, kindhearted noble girl and talented healing mage rescued by Shin from street thugs. She falls in love with Shin's genuine kindness, becoming his dedicated fiancée and magic partner.",
        voiceActor: "Rina Honnizumi",
      },
      {
        slug: "merlin-walford",
        name: "Merlin Walford",
        japaneseName: "マーリン＝ウォルフォード",
        role: "Supporting Character / Mentor",
        biography:
          "The legendary 'Sage' of the Earlshide Kingdom who saved the realm from demons decades ago. While he trained Shin into an unbeatable magical monster, he completely neglected to teach him how normal society functions.",
        voiceActor: "Hidekatsu Shibata",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "An Out-of-the-Norm Rookie",
        airDate: "2019-04-10",
        synopsis:
          "Reincarnated as an infant in a fantasy realm, Shin is raised in the forest by the legendary sage Merlin Walford, mastering world-shattering spells before realizing he lacks all common sense.",
      },
      {
        number: 3,
        title: "An Emergency Situation Arises!",
        airDate: "2019-04-24",
        synopsis:
          "Shin attends the Advanced Magic Academy entrance exams, astonishing the royal examiners by destroying the testing barriers with a single suppressed chantless fireball.",
      },
      {
        number: 12,
        title: "And So, Off into the World...",
        airDate: "2019-06-26",
        synopsis:
          "Shin and his newly formed Ultimate Magicians brigade confront the demonic army of Oliver Schtrom, unleashing synchronized nuclear-tier magic to save the Allied Kingdoms.",
      },
    ],
    related: [],
    sources: [],
  },

  // 15. In Another World With My Smartphone
  {
    slug: "in-another-world-with-my-smartphone",
    title: "In Another World With My Smartphone",
    japaneseTitle: "異世界はスマートフォンとともに。",
    altTitles: [
      "Isekai wa Smartphone to Tomo ni.",
      "Isesuma",
    ],
    year: 2017,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2017-07-11",
    endDate: "2017-09-26",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Patora Fuyuhara",
    studio: "production-reed",
    director: "takeyuki-yanase",
    creator: "patra-fuyuhara",
    genreSlugs: ["isekai", "fantasy", "comedy", "adventure", "harem"],
    synopsis:
      "After being accidentally struck by a stray lightning bolt cast by God, 15-year-old Touya Mochizuki is granted a divine apology: rebirth into a magical fantasy world, vastly enhanced physical and magical attributes, and permission to bring his modern smartphone with him. Connected to modern Earth's internet and powered by infinite magic batteries, Touya uses Google Maps, Wikipedia, and all seven elemental affinities to casually solve international political disputes, invent modern cuisine, and aid monarchies, swiftly assembling an affectionate harem of royal maidens.",
    historicalSignificance:
      "In Another World With My Smartphone is the definitive, genre-defining icon of the 'cozy low-stakes wish-fulfillment' isekai boom. Premiering in 2017, it codified the trend of protagonists living stress-free, universally adored lives unburdened by trauma, conflict, or struggle. While frequently memed for its extreme indulgence, it proved to be an unstoppable commercial titan that demonstrated the massive global appetite for pure relaxation and comfort fantasy.",
    productionHistory:
      "Produced by veteran animation studio Production Reed (formerly Ashi Productions) under director Takeyuki Yanase, the series was designed to be bright, cheerful, and unpretentious. Toshihide Masudate and Masahiro Sekiguchi adapted Eiji Usatsuka's pastel light novel illustrations into accessible, bubbly television animation with lighthearted comedic pacing.",
    reception:
      "Despite polarizing traditional critics, Smartphone was an astronomical streaming sensation worldwide, racking up staggering viewership numbers on Crunchyroll and Chinese streaming platforms. Its light novel and manga circulation soared past millions of copies, proving its commercial viability and leading to an eventual Season 2 in 2023.",
    awards:
      "Consistently ranked in Crunchyroll's Top 10 Most-Watched Anime worldwide for Summer 2017; HJ Novels' flagship best-selling property.",
    culturalImpact:
      "The show spawned the widespread 'Smartphone Isekai' moniker used as shorthand across the anime community for overpowered, low-stress reincarnation stories. Touya casually calling God on his smartphone became an iconic meme of modern isekai absurdity.",
    legacy:
      "Its runaway success unlocked the floodgates for countless light novels featuring modern everyday gadgets transported to fantasy realms, validating comfort-isekai as one of the most profitable sectors of the modern anime industry.",
    historyTimeline: [
      {
        label: "Shōsetsuka ni Narō Launch",
        year: "2013",
        text: "Patora Fuyuhara begins posting chapters on Shōsetsuka ni Narō, quickly gathering an enormous casual readership.",
      },
      {
        label: "Anime Debut",
        year: "2017-07-11",
        text: "Production Reed's anime adaptation premieres, becoming a colossal international streaming hit.",
      },
      {
        label: "Season 2 Return",
        year: "2023",
        text: "Six years after the original, Season 2 premieres by J.C.Staff, continuing Touya's kingdom-building adventures.",
      },
    ],
    characters: [
      {
        slug: "touya-mochizuki",
        name: "Touya Mochizuki",
        japaneseName: "望月 冬夜",
        role: "Protagonist",
        biography:
          "A polite, easygoing youth reincarnated by God after an accidental death. Possessing affinity for all elements, null magic spells like Gate and Slip, and a smartphone linked to Earth's search engines, he glides through life curing kings and defeating monsters without breaking a sweat.",
        voiceActor: "Katsumi Fukuhara",
      },
      {
        slug: "elsie-silhoueska",
        name: "Elsie Silhoueska",
        japaneseName: "エルゼ・シルエスカ",
        role: "Main Heroine",
        biography:
          "An energetic, brawler-class adventurer who fights using enchanted gauntlets and physical enhancement magic. She and her twin sister Linse are the first companions to join Touya on his travels.",
        voiceActor: "Maaya Uchida",
      },
      {
        slug: "linse-silhoueska",
        name: "Linse Silhoueska",
        japaneseName: "リンゼ・シルエスカ",
        role: "Main Heroine",
        biography:
          "Elsie's quiet, bookish twin sister who is an adept offensive magic user. Despite her timid demeanor, she is deeply affectionate and often the boldest when expressing romantic feelings toward Touya.",
        voiceActor: "Yui Fukuo",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Awakening, and Another World",
        airDate: "2017-07-11",
        synopsis:
          "Struck by divine lightning, Touya meets God, receives a physical upgrade and his smartphone, awakens in the Kingdom of Belfast, and rescues twin sisters Elsie and Linse from thugs.",
      },
      {
        number: 5,
        title: "Slime Castle, and New Functions",
        airDate: "2017-08-08",
        synopsis:
          "Touya investigates an ancient abandoned castle overrun by slimes that dissolve clothing, unlocking new tracking and targeting functions on his smartphone.",
      },
      {
        number: 12,
        title: "Decisions, and with My Smartphone",
        airDate: "2017-09-26",
        synopsis:
          "Touya uncovers the ancient aerial Babylon garden created by Professor Regina Babylon, who reveals prophetic visions of his nine future brides and his role in defending the world.",
      },
    ],
    related: [],
    sources: [],
  },

  // 16. Death March to the Parallel World Rhapsody
  {
    slug: "death-march-to-the-parallel-world-rhapsody",
    title: "Death March to the Parallel World Rhapsody",
    japaneseTitle: "デスマーチからはじまる異世界狂想曲",
    altTitles: [
      "Death March Kara Hajimaru Isekai Kyousoukyoku",
      "Death March",
    ],
    year: 2018,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2018-01-11",
    endDate: "2018-03-29",
    eraSlug: "streaming-era",
    sourceMaterial: "Light novel series by Hiro Ainana",
    studio: "silver-link",
    director: "shin-onuma",
    creator: "hiro-ainana",
    genreSlugs: ["isekai", "fantasy", "adventure", "slice-of-life", "harem"],
    synopsis:
      "Ichirou Suzuki is a 29-year-old veteran programmer trapped in an exhausting corporate crunch ('death march') patching two mobile MMORPGs before falling asleep at his desk. He awakens inside a hybrid fantasy world resembling the games he was debugging, appearing as a 15-year-old youth named Satou. Ambushed by an army of high-level dragon-riding lizardmen, he triggers the beginner-support spell 'Meteor Shower,' instantly obliterating the entire army along with a god-level dragon. Rocketed to level 310 with unimaginable wealth and stats, Satou decides to hide his identity and embark on a leisurely gourmet sightseeing tour of his new world.",
    historicalSignificance:
      "Death March is celebrated as the pinnacle of the 'gourmet sightseeing tourism' isekai subgenre. Rather than conquering the world or joining high-stakes wars, the narrative treats its god-tier power purely as a convenience to facilitate relaxing tourism, cooking local delicacies, adopting orphaned demi-human girls, and exploring the architectural and cultural nuances of a fantasy continent.",
    productionHistory:
      "Co-produced by Silver Link and Connect under renowned director Shin Onuma (director of Baka and Test, Fate/kaleid liner Prisma Illya), the anime showcased detailed background layouts and food animation. Character designer Shoko Takimoto captured the gentle, warm atmosphere of shri's light novel illustrations, accompanied by an uplifting soundtrack by MONACA.",
    reception:
      "The anime was an enormous streaming success during Winter 2018, appealing particularly to adult working-class viewers who related to Satou's exhaustion with modern corporate crunch and embraced the soothing, wholesome fantasy of stress-free travel. Light novel sales surged past 4 million copies.",
    awards:
      "Ranked consistently among Kadokawa's top digital and light novel revenue drivers of 2018; nominated for Best Slice of Life / Fantasy on Anime Trending Awards.",
    culturalImpact:
      "The show popularized the 'dev coding exhaustion leads to ultimate vacation' trope, with Satou's diverse adopted party (Tama, Pochi, Liza, and Arisa) becoming beloved symbols of wholesome found-family dynamics.",
    legacy:
      "Death March solidified the 'slow life / gourmet travel' fantasy genre, proving that low-tension adventures focused on cooking, craftsmanship, and sightseeing possess enormous, durable international popularity.",
    historyTimeline: [
      {
        label: "Narō Phenomenon",
        year: "2013",
        text: "Hiro Ainana begins posting Death March on Shōsetsuka ni Narō, generating hundreds of millions of views.",
      },
      {
        label: "Anime Broadcast",
        year: "2018-01-11",
        text: "Silver Link and Connect's 12-episode anime adaptation premieres to strong international streaming numbers.",
      },
      {
        label: "Multi-Million Bestseller",
        year: "2020",
        text: "The series surpasses 4.5 million copies in circulation across Kadokawa Books.",
      },
    ],
    characters: [
      {
        slug: "satou-pendragon",
        name: "Satou Pendragon / Ichirou Suzuki",
        japaneseName: "サトゥー・ペンドラゴン / 鈴木 一郎",
        role: "Protagonist",
        biography:
          "A burned-out programmer who falls asleep during a crunch shift and awakens as a teenager in a fantasy world. After an accidental Meteor Shower spell boosts him to level 310 with vast fortunes, he conceals his godlike stats to enjoy a peaceful culinary vacation as an ordinary merchant.",
        voiceActor: "Shun Horie",
      },
      {
        slug: "arisa-death-march",
        name: "Arisa",
        japaneseName: "アリサ",
        role: "Main Heroine",
        biography:
          "A fallen princess who was reincarnated from modern Earth and possesses Over-Skill psychokinesis. She is bought by Satou to save her from slavery, quickly recognizing his modern Japanese origin and becoming his outspoken, otaku-minded party strategist.",
        voiceActor: "Aoi Yuuki",
      },
      {
        slug: "liza-death-march",
        name: "Liza",
        japaneseName: "リザ",
        role: "Supporting Heroine",
        biography:
          "An orange-scale lizard-kin demi-human slave saved by Satou. Trained by him in spearmanship, she becomes a fierce, noble vanguard warrior fiercely protective of Satou and her young comrades Pochi and Tama.",
        voiceActor: "Noriko Hidaka",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "The Cataclysm that Started with a Death March",
        airDate: "2018-01-11",
        synopsis:
          "Exhausted programmer Ichirou Suzuki falls asleep at his desk and wakes in a fantasy desert; attacked by thousands of lizardmen, he launches three Meteor Shower spells, annihilating them all and hitting level 310.",
      },
      {
        number: 4,
        title: "Labyrinth Exploring that Started with a Death March",
        airDate: "2018-02-01",
        synopsis:
          "Satou enters the Seiryuu underground labyrinth to rescue enslaved demi-human girls Liza, Pochi, and Tama, feeding them warm meals and outfitting them with custom equipment.",
      },
      {
        number: 12,
        title: "A Colloquy that Started with a Death March",
        airDate: "2018-03-29",
        synopsis:
          "Satou battles a demon homunculus threatening the cradle facility, quietly saving the duchy before departing with his wagon caravan on the next leg of their gourmet world tour.",
      },
    ],
    related: [],
    sources: [],
  },

  // 17. Black Summoner
  {
    slug: "black-summoner",
    title: "Black Summoner",
    japaneseTitle: "黒の召喚士",
    altTitles: [
      "Kuro no Shoukanji",
      "The Berserker Rises from the Bottom",
    ],
    year: 2022,
    type: "TV",
    format: "TV",
    status: "FINISHED",
    episodeCount: 12,
    duration: 24,
    releaseDate: "2022-07-09",
    endDate: "2022-09-24",
    eraSlug: "modern-anime",
    sourceMaterial: "Light novel series by Mayoi Doufuto",
    studio: "satelight",
    director: "yoshimasa-hiraike",
    creator: "mayoi-doufuto",
    genreSlugs: ["isekai", "action", "fantasy", "adventure"],
    synopsis:
      "Awakening in a strange fantasy world with complete amnesia, Kelvin discovers he willingly traded away all his memories of his past life on Earth during reincarnation in exchange for astronomical skill points and the ultra-rare 'Summoner' class. What is more, he used his divine points to form a contract with Melfina, the very Goddess of Reincarnation herself, though his mana capacity is not yet high enough to materialize her physical form. Discovering his innate identity as an absolute battle junkie, Kelvin revels in fighting monstrous bosses, recruiting legendary monsters, and conquering the continent's dungeons.",
    historicalSignificance:
      "Black Summoner distinguished itself within the crowded 2020s isekai genre through its protagonist's unabashed love for combat. Rather than wanting a peaceful retirement or seeking revenge, Kelvin is an unapologetic, joyful 'battle maniac' who gets a genuine adrenaline high from fighting opponents stronger than himself. It also popularized the dynamic of having the Goddess who reincarnated the hero serve as his primary romantic summoned companion.",
    productionHistory:
      "Produced by Satelight under the veteran direction of Yoshimasa Hiraike (director of Working!! and Wotakoi: Love is Hard for Otaku), the anime surprised viewers with dynamic, 3D CGI-enhanced kinetic action sequences and punchy sound design. Miwa Oshima handled character designs that brought Kurogin's novel artwork to life, accompanied by Michiru and Yuri Habuka's driving techno-orchestral score.",
    reception:
      "A sleeper hit of Summer 2022, Black Summoner achieved strong international streaming numbers on Crunchyroll and solid home video reception in Japan. Fans praised its unpretentious, fast-paced action choreography and the infectious enthusiasm of its battle-loving protagonist.",
    awards:
      "Nominated for Best Action at seasonal community anime awards (Anime Trending Summer 2022); consistently ranked within the Top 10 weekly anime across international streaming leaderboards.",
    culturalImpact:
      "Kelvin's dark battle coat and manic grin during life-or-death duels earned him a reputation as one of the most proactive and entertaining battle-junkie protagonists of modern isekai, distinguishing him from passive harem leads.",
    legacy:
      "Black Summoner proved that a well-animated, straightforward action isekai with an enthusiastic combat-loving protagonist can carve out a loyal, high-engagement global audience.",
    historyTimeline: [
      {
        label: "Shōsetsuka ni Narō Serialization",
        year: "2014",
        text: "Mayoi Doufuto begins posting Black Summoner on Shōsetsuka ni Narō, leading to Overlap Bunko publication.",
      },
      {
        label: "Satelight Anime Debut",
        year: "2022-07-09",
        text: "Satelight's 12-episode anime adaptation premieres to enthusiastic praise for its fluid combat scenes.",
      },
      {
        label: "Franchise Milestone",
        year: "2022",
        text: "The series exceeds 2 million copies in print across light novel and manga editions.",
      },
    ],
    characters: [
      {
        slug: "kelvin-black-summoner",
        name: "Kelvin",
        japaneseName: "ケルヴィン",
        role: "Protagonist",
        biography:
          "A battle-obsessed Summoner who traded his past-life memories for maxed-out skill points. He thrives on facing lethal adversaries, utilizing his summoned spirits, high-speed magic, and tactical mind to defeat monsters and recruit them to his retinue.",
        voiceActor: "Koki Uchiyama",
      },
      {
        slug: "melfina-black-summoner",
        name: "Melfina",
        japaneseName: "メルフィーナ",
        role: "Main Heroine",
        biography:
          "The Goddess of Reincarnation who was so enchanted by Kelvin during his soul transfer that she allowed him to form a summoner contract with her. Communicating through a floating magical voice crystal until Kelvin gains enough mana to summon her physical body, she is his devoted celestial guide and tease.",
        voiceActor: "Reina Ueda",
      },
      {
        slug: "clotho-black-summoner",
        name: "Clotho",
        japaneseName: "クロト",
        role: "Summon / Companion",
        biography:
          "A high-grade blue slime contracted by Kelvin early in his adventures. Capable of consuming monster cores and evolving into a colossal, multi-tentacled combat weapon, Clotho is both an adorable pet and a lethal siege beast.",
        voiceActor: "Randi",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Memory Loss",
        airDate: "2022-07-09",
        synopsis:
          "Kelvin wakes with amnesia in Parth, discovers he traded his memories for god-tier Summoner skills and contracted the Goddess Melfina, and tames the legendary slime Clotho.",
      },
      {
        number: 3,
        title: "The Secret Knights and the Demon Castle",
        airDate: "2022-07-23",
        synopsis:
          "Kelvin challenges the Ghost Knight Gerard, engaging in a fierce, respectful duel that frees Gerard from centuries of cursed despair and recruits him as a devoted follower.",
      },
      {
        number: 12,
        title: "Summoning the Goddess",
        airDate: "2022-09-24",
        synopsis:
          "Kelvin annihilates the S-rank Archdemon and its subordinates in the Torcen Kingdom, gathering enough divine mana to finally materialize Melfina's physical form on Earth.",
      },
    ],
    related: [],
    sources: [],
  },
];

// Default and alias exports
export const animeIsekaiBatch1 = isekaiBatch1;
export default isekaiBatch1;
