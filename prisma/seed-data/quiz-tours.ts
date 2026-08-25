export interface QuizQuestionSeed {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSeed {
  slug: string;
  title: string;
  description: string;
  questions: QuizQuestionSeed[];
}

export interface BadgeSeed {
  slug: string;
  name: string;
  description: string;
  icon: string;
  quizSlug?: string;
}

export interface TourStepSeed {
  order: number;
  title: string;
  description: string;
  year?: number;
  eraSlug?: string;
  animeSlug?: string;
}

export interface TourSeed {
  slug: string;
  title: string;
  description: string;
  steps: TourStepSeed[];
}

export const quizzes: QuizSeed[] = [
  {
    slug: "birth-of-anime",
    title: "The Birth of Anime (1917–1963)",
    description:
      "From the first hand-drawn shorts of 1917 to the revolutionary television era Tezuka built — a five-question examination of the medium's founding decades.",
    questions: [
      {
        question: "In which year did the first Japanese animated films reach theaters, marking the widely credited birth of anime?",
        options: ["1917", "1923", "1935", "1958"],
        correctIndex: 0,
        explanation:
          "In 1917 Jun'ichi Kōuchi, Shimokawa Oten, and Seitaro Kitayama released the first Japanese animated shorts. Kōuchi's Namakura Gatana survives as the earliest of them.",
      },
      {
        question: "What was Japan's first feature-length animated film?",
        options: ["Astro Boy", "Momotaro's Divine Sea Warriors", "Namakura Gatana", "Kimba the White Lion"],
        correctIndex: 1,
        explanation:
          "Momotaro's Divine Sea Warriors (1945), directed by Mitsuyo Seo, was the first feature-length Japanese animated film — a wartime work that proved Japanese studios could sustain full-length production.",
      },
      {
        question: "Osamu Tezuka's Astro Boy became Japan's first television anime series in which year?",
        options: ["1953", "1963", "1968", "1973"],
        correctIndex: 1,
        explanation:
          "Astro Boy premiered on Fuji Television on January 1, 1963, and ran for 193 episodes across four years, inventing the economic model of serialized TV anime.",
      },
      {
        question: "Which cost-cutting approach made serialized television anime economically possible?",
        options: ["Rotoscoping", "Full cel-by-cel animation", "Limited animation", "Early computer animation"],
        correctIndex: 2,
        explanation:
          "Mushi Production pioneered limited animation — held cels, repeated frames, and simplified designs — producing Astro Boy at a fraction of Western animation's cost.",
      },
      {
        question: "Which studio did Osamu Tezuka found to produce Astro Boy?",
        options: ["Toei Animation", "Mushi Production", "Sunrise", "Studio Ghibli"],
        correctIndex: 1,
        explanation:
          "Tezuka founded Mushi Production in 1961 after leaving Toei Animation. Its 1963 Astro Boy series launched the entire TV anime industry.",
      },
    ],
  },
  {
    slug: "golden-age-1980s",
    title: "The 1980s Golden Age",
    description:
      "The decade in which anime came of age — real robots, world-class theatrical production, and the film that announced the medium to the planet.",
    questions: [
      {
        question: "Which 1988 film — built on more than 160,000 hand-drawn cels — announced Japanese animation to the world?",
        options: ["Ghost in the Shell", "Akira", "Mobile Suit Gundam", "Nausicaä of the Valley of the Wind"],
        correctIndex: 1,
        explanation:
          "Akira's roughly $11 million budget and uncompromising cyberpunk vision stunned international audiences and transformed anime's global image overnight.",
      },
      {
        question: "Nausicaä of the Valley of the Wind (1984), the unofficial prelude to Studio Ghibli, was directed by whom?",
        options: ["Isao Takahata", "Hayao Miyazaki", "Mamoru Oshii", "Katsuhiro Otomo"],
        correctIndex: 1,
        explanation:
          "Miyazaki wrote and directed Nausicaä in 1984. Its success convinced Tokuma Shoten to fund the studio Miyazaki and Takahata would co-found in 1985.",
      },
      {
        question: "Studio Ghibli was founded in which year?",
        options: ["1975", "1980", "1985", "1990"],
        correctIndex: 2,
        explanation:
          "Ghibli was founded in June 1985 by Hayao Miyazaki, Isao Takahata, Toshio Suzuki, and Yasuyoshi Tokuma, following the success of Nausicaä.",
      },
      {
        question: "Mobile Suit Gundam (1979) is credited with founding which subgenre?",
        options: ["Super robot", "Real robot", "Magical girl", "Giant monster"],
        correctIndex: 1,
        explanation:
          "Yoshiyuki Tomino's Gundam treated giant machines as tools of war rather than superhero vehicles, founding the real-robot genre and, later, a multi-billion-dollar model-kit industry.",
      },
      {
        question: "Akira was directed by the author of its manga, who is…?",
        options: ["Mamoru Oshii", "Yoshiyuki Tomino", "Katsuhiro Otomo", "Hayao Miyazaki"],
        correctIndex: 2,
        explanation:
          "Katsuhiro Otomo both wrote the 1982–1990 manga and directed the 1988 film, bringing the density of his comics to the screen with unprecedented production values.",
      },
    ],
  },
  {
    slug: "studio-ghibli-masters",
    title: "Studio Ghibli & the Masters",
    description:
      "The house that Miyazaki built — and the partnership with Isao Takahata that defined Japanese feature animation for a generation.",
    questions: [
      {
        question: "Which Ghibli film became the first non-English-language winner of the Academy Award for Best Animated Feature?",
        options: ["Princess Mononoke", "Spirited Away", "My Neighbor Totoro", "Howl's Moving Castle"],
        correctIndex: 1,
        explanation:
          "Spirited Away (2001) won the Oscar in 2003 and became the highest-grossing film in Japanese history at the time of its release.",
      },
      {
        question: "Grave of the Fireflies (1988) was directed by…?",
        options: ["Hayao Miyazaki", "Isao Takahata", "Mamoru Oshii", "Satoshi Kon"],
        correctIndex: 1,
        explanation:
          "Isao Takahata's anti-war masterpiece opened as a double feature with My Neighbor Totoro in 1988 — an extraordinary pairing of grief and wonder.",
      },
      {
        question: "Miyazaki's 1984 film Nausicaä of the Valley of the Wind is often described as…?",
        options: [
          "The unofficial first Ghibli film",
          "A commissioned advertisement",
          "The last film of the silent era",
          "A television special",
        ],
        correctIndex: 0,
        explanation:
          "Nausicaä was produced before the studio's founding by the same core team, which is why it is treated as Ghibli's spiritual debut.",
      },
      {
        question: "Who is the producer and co-founder of Studio Ghibli who championed Nausicaä as editor of the magazine Animage?",
        options: ["Yasuyoshi Tokuma", "Toshio Suzuki", "Toru Hara", "Masao Maruyama"],
        correctIndex: 1,
        explanation:
          "Toshio Suzuki, whose advocacy at Tokuma Shoten's Animage helped bring Nausicaä to the screen, co-founded Ghibli and produced its greatest films.",
      },
      {
        question: "Miyazaki and Takahata first collaborated on which 1968 feature for Toei Animation?",
        options: ["Horus, Prince of the Sun", "Panda! Go, Panda!", "Future Boy Conan", "The Little Norse Prince"],
        correctIndex: 0,
        explanation:
          "Horus, Prince of the Sun (1968) — Takahata directing, Miyazaki animating — is regarded as the seed of Ghibli's ethos: character animation with real dramatic weight.",
      },
    ],
  },
];

export const badges: BadgeSeed[] = [
  {
    slug: "pioneer-scholar",
    name: "Pioneer Scholar",
    description: "Earned by passing “The Birth of Anime (1917–1963)” — the founding decades of the medium.",
    icon: "Landmark",
    quizSlug: "birth-of-anime",
  },
  {
    slug: "golden-age-historian",
    name: "Golden Age Historian",
    description: "Earned by passing “The 1980s Golden Age” — the decade anime came of age.",
    icon: "Star",
    quizSlug: "golden-age-1980s",
  },
  {
    slug: "ghibli-scholar",
    name: "Ghibli Scholar",
    description: "Earned by passing “Studio Ghibli & the Masters” — the house that Miyazaki built.",
    icon: "Film",
    quizSlug: "studio-ghibli-masters",
  },
  {
    slug: "archive-explorer",
    name: "Archive Explorer",
    description: "Awarded to visitors who chart their own course through the archive — from the first shorts of 1917 to the streaming era.",
    icon: "Compass",
  },
];

export const tours: TourSeed[] = [
  {
    slug: "cyberpunk-evolution",
    title: "The Evolution of Cyberpunk Anime",
    description:
      "From the ruined streets of Neo-Tokyo to the ghost in every machine — a guided walk through the genre that defined anime's global image.",
    steps: [
      {
        order: 0,
        year: 1988,
        animeSlug: "akira",
        title: "Neo-Tokyo, 2019: The Genre Is Born",
        description:
          "Katsuhiro Otomo's Akira turns 160,000 hand-drawn cels into a collapsing city and a boy becoming a god. Its release announced cyberpunk — and Japanese animation itself — to the world.",
      },
      {
        order: 1,
        year: 1995,
        animeSlug: "ghost-in-the-shell",
        title: "The Ghost in the Machine",
        description:
          "Mamoru Oshii's Ghost in the Shell asks whether a soul can survive in a networked body. Its philosophical action directly inspired The Matrix — the genre's leap into global cinema.",
      },
      {
        order: 2,
        year: 1998,
        eraSlug: "global-expansion",
        title: "The Wired Millennium",
        description:
          "As the internet reached Japanese homes, Serial Experiments Lain turned cyberpunk inward — a ghost haunting the network itself. The era that produced it ends here, on the eve of the digital millennium.",
      },
      {
        order: 3,
        year: 1998,
        animeSlug: "cowboy-bebop",
        title: "Jazz in the Void",
        description:
          "Cowboy Bebop carried cyberpunk's melancholy cool into deep space — a genre afterglow that became one of the 1990s' most beloved exports, and a gateway for a generation of fans.",
      },
      {
        order: 4,
        year: 2002,
        eraSlug: "digital-revolution",
        title: "The Genre Goes Global",
        description:
          "As the millennium turned, the aesthetics born in Neo-Tokyo spread across world cinema — from bullet-time red pills to a thousand rain-drenched megacities — while anime itself crossed into the global mainstream.",
      },
    ],
  },
  {
    slug: "pioneers-of-mecha",
    title: "Pioneers of Hand-Drawn Mecha",
    description:
      "From Tezuka's robot boy to the deconstruction of the genre — how hand-drawn machines became anime's most durable tradition.",
    steps: [
      {
        order: 0,
        year: 1963,
        animeSlug: "astro-boy",
        title: "The Robot Boy",
        description:
          "Osamu Tezuka's Astro Boy made the machine a character with a heart — Japan's first television anime and the ancestor of every robot that followed.",
      },
      {
        order: 1,
        year: 1972,
        eraSlug: "television-era",
        title: "The Super Robot",
        description:
          "Go Nagai's Mazinger Z (1972) introduced the piloted giant robot — a hero-machine of impossible proportions. Mazinger has yet to be archived; the era it defined begins here.",
      },
      {
        order: 2,
        year: 1979,
        animeSlug: "mobile-suit-gundam",
        title: "The Real Robot",
        description:
          "Yoshiyuki Tomino's Mobile Suit Gundam turned machines into weapons of war — with fuel limits, casualties, and consequences. The real-robot genre, and its model-kit empire, was born.",
      },
      {
        order: 3,
        year: 1995,
        animeSlug: "neon-genesis-evangelion",
        title: "Deconstructing the Cockpit",
        description:
          "Hideaki Anno's Neon Genesis Evangelion dismantled the genre from inside — robots as trauma machines, combat as psychological violence, and a finale that abandoned battle entirely.",
      },
      {
        order: 4,
        year: 2007,
        eraSlug: "digital-revolution",
        title: "The Hand-Drawn Rebuild",
        description:
          "Evangelion's Rebuild films proved hand-drawn mecha could still command theaters in the digital age — a century-old craft carried forward by a new generation of animators.",
      },
    ],
  },
];