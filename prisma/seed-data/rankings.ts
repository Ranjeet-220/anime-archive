// Editorial curated rankings — the Archive's "Top 60" presented as seven
// separate categories, never one monolithic list. Each ranking explains its
// methodology so the reader understands what it measures and its limits.

export interface RankingSeed {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  methodology: string;
  items: { slug: string; note?: string }[];
}

export const rankings: RankingSeed[] = [
  {
    slug: "most-popular",
    name: "Most Popular",
    tagline: "The titles with the largest and most active fan communities",
    description:
      "Popularity is not the same as quality. This list reflects community signals — aggregation-site rankings, streaming demand, and franchise scale — that together indicate which works attract the widest audiences.",
    methodology:
      "Compiled from community and platform signals including MyAnimeList and AniList member counts, Crunchyroll/Netflix catalog prominence, social-media engagement, and franchise sales. It is a signal, not a scientific poll — popularity data varies by platform, region, and time.",
    items: [
      { slug: "attack-on-titan", note: "The global phenomenon of the 2010s." },
      { slug: "one-piece", note: "One of the longest-running and most-watched franchises ever." },
      { slug: "demon-slayer", note: "The defining mainstream hit of the streaming era." },
      { slug: "jujutsu-kaisen", note: "The flagship title of the 2020s shōnen wave." },
      { slug: "naruto", note: "A generation's gateway anime across the Americas and Asia." },
      { slug: "dragon-ball-z", note: "The anime that made anime a global cultural force." },
      { slug: "death-note", note: "The gateway thriller for millions of international fans." },
      { slug: "fullmetal-alchemist-brotherhood", note: "Consistently ranked among the greatest series ever." },
      { slug: "my-hero-academia", note: "The superhero hit that carried the late 2010s." },
      { slug: "hunter-x-hunter", note: "Widely regarded as one of the best shōnen series." },
      { slug: "solo-leveling", note: "Record-breaking modern hit with a massive global fanbase." },
      { slug: "chainsaw-man", note: "The chaotic 2022 event anime." },
      { slug: "spy-x-family", note: "The family comedy that conquered mainstream audiences." },
      { slug: "one-punch-man", note: "Saitama's deadpan power fantasy became a worldwide meme." },
      { slug: "bleach", note: "One of the 'Big Three' of 2000s shōnen." },
      { slug: "sword-art-online", note: "The isekai that launched a thousand imitators." },
      { slug: "tokyo-ghoul", note: "The dark-fantasy hit of 2014." },
      { slug: "pokemon", note: "A children's global institution since 1997." },
      { slug: "fairy-tail", note: "A beloved friendship-and-fantasy favorite for a decade." },
      { slug: "frieren-beyond-journeys-end", note: "The quiet 2020s classic that became a global hit." },
    ],
  },
  {
    slug: "most-watched",
    name: "Most Watched",
    tagline: "Estimated viewership and platform reach",
    description:
      "These are the titles with the largest cumulative viewership. No universal database of watch counts exists, so this list combines broadcast history, streaming records, and box office — clearly marked as estimates rather than verified statistics.",
    methodology:
      "Based on available signals: decades of broadcast history (Pokémon, One Piece, Dragon Ball Z), streaming premiere records (Solo Leveling, Demon Slayer), and box office (Demon Slayer's Mugen Train broke all Japanese records). Figures are directional estimates; there is no single reliable universal watch-count database.",
    items: [
      { slug: "pokemon", note: "Airing worldwide since 1997, with 1,200+ episodes." },
      { slug: "one-piece", note: "1,100+ episodes and counting since 1999." },
      { slug: "naruto", note: "Over 700 episodes across Naruto and Shippuden." },
      { slug: "dragon-ball-z", note: "A broadcast institution across the Americas for decades." },
      { slug: "demon-slayer", note: "Mugen Train became the highest-grossing anime film in history." },
      { slug: "attack-on-titan", note: "Final episodes ranked among the most-watched anime events ever." },
      { slug: "jujutsu-kaisen", note: "Streaming records and a ¥19 billion-grossing film." },
      { slug: "my-hero-academia", note: "A mainstay of global streaming catalogs since 2016." },
      { slug: "solo-leveling", note: "Set Crunchyroll premiere records in 2024." },
      { slug: "spy-x-family", note: "One of the most-watched new series of 2022." },
      { slug: "bleach", note: "366 episodes across a 2004–2012 run, plus its 2022 revival." },
      { slug: "death-note", note: "Appointment television on Adult Swim in the 2000s." },
      { slug: "blue-lock", note: "The 2022 football phenomenon with massive social reach." },
      { slug: "dr-stone", note: "A steady global streaming favorite since 2019." },
      { slug: "that-time-i-got-reincarnated-as-a-slime", note: "One of the most-streamed isekai franchises." },
    ],
  },
  {
    slug: "highest-rated",
    name: "Highest Rated",
    tagline: "Peak critical and audience ratings",
    description:
      "Rating rank is not the same as viewership. These titles score at the top of audience and critical aggregates, reflecting quality as measured by the communities and critics that rate them.",
    methodology:
      "Based on long-running placements at the top of audience aggregators (MyAnimeList, AniList, IMDb) and critical awards. Aggregate ratings skew toward dedicated fans rather than casual viewers, and scores change over time.",
    items: [
      { slug: "fullmetal-alchemist-brotherhood", note: "Routinely ranked the #1 anime on aggregation sites." },
      { slug: "frieren-beyond-journeys-end", note: "At or near the very top of 2020s rating charts." },
      { slug: "steins-gate", note: "A decade-long fixture of top-ten lists." },
      { slug: "hunter-x-hunter", note: "The 2011 remake is among the highest-rated shōnen." },
      { slug: "vinland-saga", note: "Acclaimed for its literary, character-driven storytelling." },
      { slug: "mob-psycho-100", note: "Three seasons of near-universal praise." },
      { slug: "spirited-away", note: "The Academy Award-winning masterpiece." },
      { slug: "grave-of-the-fireflies", note: "Consistently named among the greatest films ever animated." },
      { slug: "your-name", note: "A modern classic that critics and audiences adore." },
      { slug: "a-silent-voice", note: "One of the most highly regarded anime films of the 2010s." },
      { slug: "monster", note: "A benchmark of thriller storytelling." },
      { slug: "cowboy-bebop", note: "The most-praised anime of the 1990s." },
      { slug: "made-in-abyss", note: "Beloved for its worldbuilding and emotional depth." },
      { slug: "kaguya-sama", note: "The highest-rated comedy of the 2010s–2020s." },
      { slug: "ghost-in-the-shell", note: "The intellectual benchmark of cyberpunk anime." },
    ],
  },
  {
    slug: "most-influential",
    name: "Most Influential",
    tagline: "Editorial assessment of impact on the medium",
    description:
      "Influence measures how a work changed anime itself — its techniques, genres, economics, or culture — and how it shaped everything that came after. This is an editorial judgment, not a popularity count.",
    methodology:
      "Editorial assessment by the Archive based on each work's documented innovations and descendants: technical breakthroughs, genre founding, industry economics, and the acknowledgment of later creators. Influence is qualitative and open to debate.",
    items: [
      { slug: "astro-boy", note: "Invented the economic model of TV anime in 1963." },
      { slug: "mobile-suit-gundam", note: "Founded the real-robot genre and modern anime merchandising." },
      { slug: "akira", note: "The film that introduced anime to the world in 1988." },
      { slug: "neon-genesis-evangelion", note: "The most analyzed series ever made; rebuilt the mecha genre from inside." },
      { slug: "spirited-away", note: "Proved animation could be high art on the world stage." },
      { slug: "ghost-in-the-shell", note: "Its cyberpunk vision influenced The Matrix and Western sci-fi cinema." },
      { slug: "dragon-ball-z", note: "Defined the action grammar of modern shōnen anime." },
      { slug: "perfect-blue", note: "Its editing language changed how cinema represents identity." },
      { slug: "cowboy-bebop", note: "Proved anime could be pure, adult cool on television." },
      { slug: "one-piece", note: "The long-runner standard-bearer through three decades." },
      { slug: "death-note", note: "Made the intellectual-thriller a mainstream anime genre." },
      { slug: "naruto", note: "Carried anime's global expansion into new markets." },
      { slug: "attack-on-titan", note: "Showed anime could command event-level global fandom." },
      { slug: "serial-experiments-lain", note: "Predicted the internet's effect on identity before social media." },
      { slug: "sailor-moon", note: "Empowered a generation of magical-girl anime and female fandom." },
    ],
  },
  {
    slug: "global-icons",
    name: "Global Icons",
    tagline: "Recognizable far beyond anime fandom",
    description:
      "These are the works whose characters, imagery, and catchphrases crossed into global popular culture — known to people who have never watched an episode of anime.",
    methodology:
      "Editorial assessment of cross-cultural recognizability: merchandising ubiquity, mainstream media references, tourism, and whether the work's iconography is broadly identifiable outside anime communities.",
    items: [
      { slug: "pokemon", note: "Pikachu is among the most recognized characters on Earth." },
      { slug: "dragon-ball-z", note: "Goku and the Super Saiyan transformation are universal shorthand." },
      { slug: "one-piece", note: "Luffy's straw hat is a global symbol of the 2000s anime boom." },
      { slug: "naruto", note: "The headband and hand signs penetrated mainstream culture." },
      { slug: "attack-on-titan", note: "The Survey Corps wings became a worldwide emblem." },
      { slug: "spirited-away", note: "No-Face and the bathhouse are icons of world cinema." },
      { slug: "demon-slayer", note: "The 2020s boom made Tanjiro and Nezuko global faces." },
      { slug: "death-note", note: "The notebook premise is instantly recognizable worldwide." },
      { slug: "astro-boy", note: "Japan's first anime icon, known across continents since 1963." },
      { slug: "akira", note: "Kaneda's red bike and Neo-Tokyo saturate global pop culture." },
      { slug: "my-neighbor-totoro", note: "Totoro is Ghibli's mascot and a worldwide symbol of childhood." },
      { slug: "jujutsu-kaisen", note: "Gojo's eyes and 'domain expansion' flooded social media." },
      { slug: "sword-art-online", note: "The Kirito/Asuna romance became a global touchstone." },
      { slug: "neon-genesis-evangelion", note: "Unit-01's silhouette is a global anime emblem." },
      { slug: "frieren-beyond-journeys-end", note: "The 2020s' first modern global classic." },
    ],
  },
  {
    slug: "popular-in-india",
    name: "Popular in India",
    tagline: "Titles with outsized followings among Indian audiences",
    description:
      "Indian audience behavior can differ from global rankings. This list reflects community-derived signals — online discussion, Indian IMDb votes, and local streaming habits — rather than official industry statistics.",
    methodology:
      "Community-derived signals including Indian IMDb user votes, online fandom activity, and streaming popularity in India. These are signals, not authoritative statistics — Indian viewership data is not published by any single official source.",
    items: [
      { slug: "attack-on-titan", note: "Consistently cited as India's most beloved modern anime." },
      { slug: "death-note", note: "A perennial favorite of Indian anime communities." },
      { slug: "one-piece", note: "Deep and active fandom across Indian social media." },
      { slug: "naruto", note: "Naruto Shippuden is among the most-watched series in India." },
      { slug: "demon-slayer", note: "Rode the global boom into massive Indian popularity." },
      { slug: "dragon-ball-z", note: "A childhood staple for Indian cable television generations." },
      { slug: "jujutsu-kaisen", note: "The defining title of the new Indian anime generation." },
      { slug: "my-hero-academia", note: "A constant presence in Indian streaming charts." },
      { slug: "one-punch-man", note: "Its humor and action made it an Indian favorite." },
      { slug: "tokyo-ghoul", note: "A formative dark hit for Indian fans of the mid-2010s." },
      { slug: "sword-art-online", note: "An early gateway for Indian streaming audiences." },
      { slug: "spy-x-family", note: "Became a mainstream Indian family favorite in 2022." },
    ],
  },
  {
    slug: "historical-milestones",
    name: "Historical Milestones",
    tagline: "The works that mark the eras of anime history",
    description:
      "A chronological spine through a century of anime: the works that changed the medium's direction and define their era. Read top to bottom as a history of the art form.",
    methodology:
      "Editorial selection by the Archive. Each entry marks a turning point in technique, industry structure, or cultural reach, chosen for its documented historical significance rather than contemporary popularity.",
    items: [
      { slug: "astro-boy", note: "1963 — the first anime television series." },
      { slug: "mobile-suit-gundam", note: "1979 — founded the real-robot genre and anime merchandising." },
      { slug: "akira", note: "1988 — the film that launched anime worldwide." },
      { slug: "neon-genesis-evangelion", note: "1995 — the most analyzed anime ever made." },
      { slug: "one-piece", note: "1999 — the longest-running anime of the modern era." },
      { slug: "spirited-away", note: "2001 — the Academy Award that made anime a global art form." },
      { slug: "attack-on-titan", note: "2013 — the streaming-era global phenomenon." },
      { slug: "demon-slayer", note: "2019 — the record-breaking peak of the 2020s boom." },
      { slug: "jujutsu-kaisen", note: "2020 — the flagship of the new generation." },
      { slug: "frieren-beyond-journeys-end", note: "2023 — proof that literary anime can be a global hit." },
    ],
  },
];