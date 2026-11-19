/**
 * Curated enrichments: historical significance, director, creator, and studio links,
 * plus additional characters and episodes for classic titles.
 */

export interface AnimeEnrichment {
  historicalSignificance: string;
  director?: string;
  creator?: string;
  studio?: string;
  sourceMaterial?: string;
}

export const ANIME_ENRICHMENTS: Record<string, AnimeEnrichment> = {
  "speed-racer": {
    "historicalSignificance": "One of the earliest anime series to break through into Western broadcast syndication (as Speed Racer in 1967–1968), establishing Japanese limited-animation pacing and kinetic racing drama in American living rooms decades before 'anime' became a household word.",
    "director": "tatsuo-yoshida",
    "creator": "tatsuo-yoshida",
    "studio": "tatsunoko-production",
    "sourceMaterial": "Manga by Tatsuo Yoshida (Mach GoGoGo)"
  },
  "lupin-the-3rd": {
    "historicalSignificance": "First aimed directly at young adults rather than children, marked by Hayao Miyazaki and Isao Takahata taking over direction to create the definitive green-jacket caper formula that birthed modern anime counterculture and established Monkey Punch's gentleman thief as an enduring national icon.",
    "director": "hayao-miyazaki",
    "creator": "monkey-punch",
    "studio": "tms-entertainment",
    "sourceMaterial": "Manga by Monkey Punch (1967–1981)"
  },
  "doraemon": {
    "historicalSignificance": "Japan's foremost cultural ambassador and longest-running family franchise, appointed Japan's first official 'anime ambassador' by the Ministry of Foreign Affairs in 2008 and shaping childhood across generations in East Asia, South Asia, and the Middle East.",
    "director": "fujiko-f-fujio",
    "creator": "fujiko-f-fujio",
    "studio": "shin-ei-animation",
    "sourceMaterial": "Manga by Fujiko F. Fujio (1969–1996)"
  },
  "urusei-yatsura": {
    "historicalSignificance": "Established Rumiko Takahashi's comedic genius, popularized the 'invading alien waifu' and modern rom-com tropes, and served as the creative crucible where young Mamoru Oshii developed his surreal directorial auteur style.",
    "director": "mamoru-oshii",
    "creator": "rumiko-takahashi",
    "studio": "studio-pierrot",
    "sourceMaterial": "Manga by Rumiko Takahashi (1978–1987)"
  },
  "macross": {
    "historicalSignificance": "Redefined mecha by merging real-robot warfare with idol pop music, transforming mechanical design through Shoji Kawamori's variable fighters and sparking the golden age of 1980s sci-fi anime.",
    "director": "noboru-ishiguro",
    "creator": "shoji-kawamori",
    "studio": "tatsunoko-production",
    "sourceMaterial": "Original concept by Studio Nue and Artland"
  },
  "nausica-of-the-valley-of-the-wind": {
    "historicalSignificance": "The catalytic triumph that prompted the founding of Studio Ghibli in 1985. Miyazaki's ecological manifesto proved animated cinema could handle philosophical gravity, environmental warnings, and complex pacifism.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Manga by Hayao Miyazaki (1982–1994)"
  },
  "castle-in-the-sky": {
    "historicalSignificance": "Studio Ghibli's inaugural official feature film, pioneering the dieselpunk aesthetic and sky-island adventure archetype that profoundly inspired global video game and cinematic design from Final Fantasy to Minecraft.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Original story by Hayao Miyazaki"
  },
  "royal-space-force": {
    "historicalSignificance": "Gainax's ambitious debut feature funded by Bandai, legendary for its peerless hand-drawn technical density, bespoke fictional culture, and showcasing the raw virtuoso talents of young otaku animators like Hideaki Anno.",
    "director": "hiroyuki-yamaga",
    "creator": "hiroyuki-yamaga",
    "studio": "gainax",
    "sourceMaterial": "Original story by Hiroyuki Yamaga"
  },
  "legend-of-the-galactic-heroes": {
    "historicalSignificance": "The undisputed pinnacle of direct-to-video space opera, spanning 110 OVA episodes with zero narrative shortcuts, setting the benchmark for grand political philosophy and military strategy in animation.",
    "director": "noboru-ishiguro",
    "creator": "yoshiki-tanaka",
    "studio": "artland",
    "sourceMaterial": "Novels by Yoshiki Tanaka (1982–1987)"
  },
  "my-neighbor-totoro": {
    "historicalSignificance": "Ghibli's defining masterwork and the origin of its corporate emblem. Totoro captured Japanese pastoral nostalgia and childhood wonder, becoming one of the most universally beloved cinematic figures in history.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Original story by Hayao Miyazaki"
  },
  "kikis-delivery-service": {
    "historicalSignificance": "Studio Ghibli's first commercial box-office champion in Japan, setting the template for adolescent transition stories and proving original animated family films could outperform Hollywood blockbusters in Japan.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Children's novel by Eiko Kadono (1985)"
  },
  "yu-yu-hakusho": {
    "historicalSignificance": "Togashi's breakout masterpiece that alongside Dragon Ball Z and Slam Dunk defined Weekly Shōnen Jump's golden age, introducing tactical spirit-energy battles and dark tournament brackets copied for decades.",
    "director": "noriyuki-abe",
    "creator": "yoshihiro-togashi",
    "studio": "studio-pierrot",
    "sourceMaterial": "Manga by Yoshihiro Togashi (1990–1994)"
  },
  "crayon-shin-chan": {
    "historicalSignificance": "A seismic satirical phenomenon in Japanese family culture, subverting suburban domesticity with rebellious slapstick and becoming an untouchable multi-decade staple across Asia and worldwide.",
    "director": "mitsuru-hongo",
    "creator": "yoshito-usui",
    "studio": "shin-ei-animation",
    "sourceMaterial": "Manga by Yoshito Usui (1990–2010)"
  },
  "slam-dunk": {
    "historicalSignificance": "Ignited a real-world basketball frenzy across Japan and throughout East Asia, pushing sport manga/anime realism to new heights and solidifying Takehiko Inoue as a generational storytelling master.",
    "director": "takehiko-inoue",
    "creator": "takehiko-inoue",
    "studio": "toei-animation",
    "sourceMaterial": "Manga by Takehiko Inoue (1990–1996)"
  },
  "ninja-scroll": {
    "historicalSignificance": "Alongside Akira and Ghost in the Shell, the defining cult classic that fueled the 1990s Western anime explosion, revered by Hollywood directors like the Wachowskis for its brutal choreography and supernatural jidai-geki noir.",
    "director": "yoshiaki-kawajiri",
    "creator": "yoshiaki-kawajiri",
    "studio": "madhouse",
    "sourceMaterial": "Original story by Yoshiaki Kawajiri"
  },
  "whisper-of-the-heart": {
    "historicalSignificance": "Yoshifumi Kondo's poignant directorial masterpiece before his tragic death, capturing teenage creative anxiety with unmatched intimacy and pioneering Ghibli's use of digital compositing for background art.",
    "director": "yoshifumi-kondo",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Manga by Aoi Hiiragi (1989)"
  },
  "rurouni-kenshin": {
    "historicalSignificance": "Popularized Meiji-era historical fiction worldwide, blending romantic tragedy, historical swordsmanship, and moral redemption, laying the foundation for modern historical action shōnen.",
    "director": "kazuhiro-furuhashi",
    "creator": "kazuhiro-furuhashi",
    "studio": "studio-gallop",
    "sourceMaterial": "Manga by Nobuhiro Watsuki (1994–1999)"
  },
  "detective-conan": {
    "historicalSignificance": "One of the longest-running and highest-grossing media franchises in history, setting unprecedented Japanese box office records with its annual theatrical films and turning deductive mystery into a national pastime.",
    "director": "gosho-aoyama",
    "creator": "gosho-aoyama",
    "studio": "tms-entertainment",
    "sourceMaterial": "Manga by Gosho Aoyama (1994–present)"
  },
  "the-end-of-evangelion": {
    "historicalSignificance": "The apocalyptic, psychosexual cinematic finale that permanently transformed modern Japanese cinema and otaku philosophy, representing the zenith of Gainax's avant-garde experimental brilliance.",
    "director": "hideaki-anno",
    "creator": "hideaki-anno",
    "studio": "gainax",
    "sourceMaterial": "Original story by Hideaki Anno / Gainax"
  },
  "revolutionary-girl-utena": {
    "historicalSignificance": "A groundbreaking milestone of feminist, queer, and surrealist animation, deconstructing fairy-tale gender roles with unforgettable theatrical allegories and art direction.",
    "director": "kunihiko-ikuhara",
    "creator": "kunihiko-ikuhara",
    "studio": "j-c-staff",
    "sourceMaterial": "Original concept by Be-Papas"
  },
  "trigun": {
    "historicalSignificance": "A cornerstone of the late-90s Toonami anime revolution in the West, fusing space-western firearms action with deep pacifist philosophy in Vash the Stampede.",
    "director": "satoshi-nishimura",
    "creator": "yasuhiro-nightow",
    "studio": "madhouse",
    "sourceMaterial": "Manga by Yasuhiro Nightow (1995–2007)"
  },
  "cardcaptor-sakura": {
    "historicalSignificance": "Madhouse and CLAMP's magical-girl benchmark, celebrated for its inclusive warmth, high-tier sakuga animation, and setting a visual gold standard for shōjo adaptations.",
    "director": "morio-asaka",
    "creator": "clamp",
    "studio": "madhouse",
    "sourceMaterial": "Manga by CLAMP (1996–2000)"
  },
  "initial-d": {
    "historicalSignificance": "The definitive street racing anime that propelled drift culture and Eurobeat music into global consciousness, pioneering the integration of 3D computer graphics for automobile chases.",
    "director": "noboru-mitsusawa",
    "creator": "shuichi-shigeno",
    "studio": "studio-gallop",
    "sourceMaterial": "Manga by Shuichi Shigeno (1995–2013)"
  },
  "one-piece-1999": {
    "historicalSignificance": "The launch of the longest-running and highest-selling manga adaptation of all time, redefining worldbuilding and romantic adventure across more than a quarter-century.",
    "director": "konosuke-uda",
    "creator": "eiichiro-oda",
    "studio": "toei-animation",
    "sourceMaterial": "Manga by Eiichiro Oda (1997–present)"
  },
  "the-big-o": {
    "historicalSignificance": "A unique retro-futuristic noir mecha that gained such fervent cult fandom on Western television that Cartoon Network co-funded its second season, an early example of global co-production.",
    "director": "kazuyoshi-katayama",
    "creator": "keiichi-sato",
    "studio": "sunrise",
    "sourceMaterial": "Original concept by Keiichi Sato and Kazuyoshi Katayama"
  },
  "digimon-adventure": {
    "historicalSignificance": "Proved monster-partner anime could deliver mature existential stakes, emotional growth, and poignant coming-of-age storytelling, leaving an indelible mark on millennial youth worldwide.",
    "director": "hiroyuki-kakudou",
    "creator": "akiyoshi-hongo",
    "studio": "toei-animation",
    "sourceMaterial": "Virtual pet franchise by Bandai / WiZ"
  },
  "love-hina": {
    "historicalSignificance": "The blueprint for the modern harem rom-com boom of the 2000s, codifying multi-heroine boarding-house tropes and establishing Ken Akamatsu's influence on romantic comedy anime.",
    "director": "ken-akamatsu",
    "creator": "ken-akamatsu",
    "studio": "xebec",
    "sourceMaterial": "Manga by Ken Akamatsu (1998–2001)"
  },
  "inuyasha": {
    "historicalSignificance": "A massive international crossover triumph that introduced millions of Western and global viewers to Sengoku-period folklore, romantic drama, and feudal fantasy on late-night television.",
    "director": "rumiko-takahashi",
    "creator": "rumiko-takahashi",
    "studio": "sunrise",
    "sourceMaterial": "Manga by Rumiko Takahashi (1996–2008)"
  },
  "flcl": {
    "historicalSignificance": "An explosion of adolescent emotional chaos, experimental animation styles, and rock music by The Pillows that redefined the possibilities of the OVA medium at the turn of the millennium.",
    "director": "kazuya-tsurumaki",
    "creator": "kazuya-tsurumaki",
    "studio": "gainax",
    "sourceMaterial": "Original story by Gainax and Production I.G"
  },
  "yu-gi-oh": {
    "historicalSignificance": "Generated a multi-billion-dollar global card gaming empire and transformed anime merchandise integration, embedding iconic duel strategies and heart-of-the-cards mythology in world pop culture.",
    "director": "kazuki-takahashi",
    "creator": "kazuki-takahashi",
    "studio": "studio-gallop",
    "sourceMaterial": "Manga by Kazuki Takahashi (1996–2004)"
  },
  "hellsing": {
    "historicalSignificance": "Epitomized Gonzo's gritty early-digital gothic aesthetic and dark anti-hero action, introducing Western audiences to brutal vampire warfare and Yasushi Ishii's acid-jazz soundtrack.",
    "director": "kouta-hirano",
    "creator": "kouta-hirano",
    "studio": "gonzo",
    "sourceMaterial": "Manga by Kouta Hirano (1997–2008)"
  },
  "metropolis": {
    "historicalSignificance": "An unprecedented union of three animation titans — Tezuka's vision, Otomo's script, and Rintaro's direction — pioneering grand digital-cel hybrid cityscapes and jazz-infused retro-futurism.",
    "director": "katsuhiro-otomo",
    "creator": "osamu-tezuka",
    "studio": "madhouse",
    "sourceMaterial": "Manga by Osamu Tezuka (1949)"
  },
  "fruits-basket": {
    "historicalSignificance": "A pivotal emotional touchstone of the shōjo genre that broke international sales records, bringing mental health, generational trauma, and empathy to the forefront of romance storytelling.",
    "director": "akitaro-daichi",
    "creator": "natsuki-takaya",
    "studio": "studio-deen",
    "sourceMaterial": "Manga by Natsuki Takaya (1998–2006)"
  },
  "ghost-in-the-shell-stand-alone-complex": {
    "historicalSignificance": "The gold standard for philosophical, political television sci-fi, dissecting cybernetics, autonomous AI, and meme theory years before modern social-media dynamics materialized.",
    "director": "kenji-kamiyama",
    "creator": "masamune-shirow",
    "studio": "production-ig",
    "sourceMaterial": "Manga by Masamune Shirow (1989)"
  },
  "haibane-renmei": {
    "historicalSignificance": "Yoshitoshi ABe's melancholic spiritual allegory, celebrated as an indie masterpiece of quiet introspection, exploring guilt, redemption, and life after grief in a walled city.",
    "director": "tomokazu-tokoro",
    "creator": "yoshitoshi-abe",
    "studio": "radix",
    "sourceMaterial": "Dōjinshi by Yoshitoshi ABe (1998)"
  },
  "tokyo-godfathers": {
    "historicalSignificance": "Satoshi Kon's masterclass in humanist urban realism, turning three homeless Tokyoites into holiday heroes and showcasing world-class character acting and coincidence-driven narrative structure.",
    "director": "satoshi-kon",
    "creator": "satoshi-kon",
    "studio": "madhouse",
    "sourceMaterial": "Original story by Satoshi Kon"
  },
  "fullmetal-alchemist": {
    "historicalSignificance": "Bones' original anime adaptation became an international juggernaut, proving anime could craft a profound, darker standalone alternate storyline when diverging from ongoing manga.",
    "director": "seiji-mizushima",
    "creator": "hiromu-arakawa",
    "studio": "bones",
    "sourceMaterial": "Manga by Hiromu Arakawa (2001–2010)"
  },
  "wolfs-rain": {
    "historicalSignificance": "Keiko Nobumoto and Yoko Kanno's haunting post-apocalyptic poem of wolves seeking Paradise, an artistic monument to moody early-2000s speculative fiction and lyrical tragedy.",
    "director": "tensai-okamura",
    "creator": "tensai-okamura",
    "studio": "bones",
    "sourceMaterial": "Original story by Keiko Nobumoto and Bones"
  },
  "elfen-lied": {
    "historicalSignificance": "A controversial shockwave in mid-2000s anime fandom, combining extreme splatter horror with tragic psychological vulnerability that directly inspired Western hits like Stranger Things.",
    "director": "mamoru-kanbe",
    "creator": "lynn-okamoto",
    "studio": "arms",
    "sourceMaterial": "Manga by Lynn Okamoto (2002–2005)"
  },
  "howls-moving-castle": {
    "historicalSignificance": "Nominated for an Academy Award and one of the highest-grossing Japanese films in history, Miyazaki's visual symphony championed anti-war pacifism, aging with dignity, and unconditional love.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Novel by Diana Wynne Jones (1986)"
  },
  "the-melancholy-of-haruhi-suzumiya": {
    "historicalSignificance": "Triggered an unprecedented global otaku sensation, popularizing light-novel adaptations, viral dance crazes ('Hare Hare Yukai'), and solidifying Kyoto Animation as the premier TV studio of its generation.",
    "director": "tatsuya-ishihara",
    "creator": "tatsuya-ishihara",
    "studio": "kyoto-animation",
    "sourceMaterial": "Light novels by Nagaru Tanigawa (2003–present)"
  },
  "paprika": {
    "historicalSignificance": "Satoshi Kon's final completed feature film, a dazzling psychological exploration of dreams infiltrating reality that profoundly influenced international cinema, notably Christopher Nolan's Inception.",
    "director": "satoshi-kon",
    "creator": "satoshi-kon",
    "studio": "madhouse",
    "sourceMaterial": "Novel by Yasutaka Tsutsui (1993)"
  },
  "code-geass-r2": {
    "historicalSignificance": "Concluded one of anime's most thrilling political mecha sagas with the universally acclaimed 'Zero Requiem,' widely cited as one of the greatest series finales in television history.",
    "director": "goro-taniguchi",
    "creator": "goro-taniguchi",
    "studio": "sunrise",
    "sourceMaterial": "Original concept by Sunrise, Goro Taniguchi, and Ichiro Okouchi"
  },
  "soul-eater": {
    "historicalSignificance": "Renowned for its distinctive Tim Burton-esque gothic Halloween aesthetic, razor-sharp sakuga fights, and dynamic character designs that influenced modern shōnen aesthetics.",
    "director": "atsushi-ohkubo",
    "creator": "atsushi-ohkubo",
    "studio": "bones",
    "sourceMaterial": "Manga by Atsushi Ohkubo (2004–2013)"
  },
  "toradora": {
    "historicalSignificance": "The definitive high-school romantic drama of the late 2000s, elevating the tsundere archetype through nuanced emotional vulnerability and unforgettable ensemble character growth.",
    "director": "tatsuyuki-nagai",
    "creator": "yuyuko-takemiya",
    "studio": "j-c-staff",
    "sourceMaterial": "Light novels by Yuyuko Takemiya (2006–2009)"
  },
  "clannad-after-story": {
    "historicalSignificance": "Universally revered as one of the most emotionally impactful anime ever produced, taking high-school protagonists into adult marriage, parenthood, and existential heartbreak.",
    "director": "tatsuya-ishihara",
    "creator": "jun-maeda",
    "studio": "kyoto-animation",
    "sourceMaterial": "Visual novel by Key / Jun Maeda (2004)"
  },
  "summer-wars": {
    "historicalSignificance": "Established Mamoru Hosoda as the leading visionary family-feature director after Miyazaki, combining a traditional rural family reunion with a prophetic digital-metaverse cyber-crisis.",
    "director": "mamoru-hosoda",
    "creator": "mamoru-hosoda",
    "studio": "madhouse",
    "sourceMaterial": "Original story by Mamoru Hosoda"
  },
  "redline": {
    "historicalSignificance": "Seven years in hand-drawn production with over 100,000 cels, standing as a legendary tribute to uncompromised, hyper-kinetic 2D animation craftsmanship in the digital age.",
    "director": "takeshi-koike",
    "creator": "takeshi-koike",
    "studio": "madhouse",
    "sourceMaterial": "Original concept by Katsuhito Ishii"
  },
  "fatezero": {
    "historicalSignificance": "Catapulted Ufotable into global prominence through breathtaking digital-compositing and 3D camera wizardry, giving the Fate franchise its most philosophically complex, tragic masterwork.",
    "director": "takahiro-miura",
    "creator": "gen-urobuchi",
    "studio": "ufotable",
    "sourceMaterial": "Light novels by Gen Urobuchi / Type-Moon (2006–2007)"
  },
  "puella-magi-madoka-magica": {
    "historicalSignificance": "A cultural watershed that deconstructed the magical-girl genre into an existential Faustian tragedy, winning Japan Media Arts Grand Prize and sparking endless academic analysis.",
    "director": "akiyuki-shinbo",
    "creator": "gen-urobuchi",
    "studio": "shaft",
    "sourceMaterial": "Original concept by Magica Quartet / Gen Urobuchi"
  },
  "steinsgate": {
    "historicalSignificance": "Widely hailed as the definitive time-travel thriller in modern animation, celebrated for its ironclad scientific causality, psychological trauma, and iconic depiction of Akihabara culture.",
    "director": "hiroshi-hamasaki",
    "creator": "hiroshi-hamasaki",
    "studio": "white-fox",
    "sourceMaterial": "Visual novel by 5pb. and Nitroplus (2009)"
  },
  "anohana": {
    "historicalSignificance": "Mari Okada and the Super Peace Busters' tearjerker milestone that pioneered the contemporary emotional-drama renaissance and revitalized domestic tourism in Chichibu, Saitama.",
    "director": "tatsuyuki-nagai",
    "creator": "mari-okada",
    "studio": "a-1-pictures",
    "sourceMaterial": "Original concept by Super Peace Busters / Mari Okada"
  },
  "the-future-diary": {
    "historicalSignificance": "Codified the iconic 'yandere' archetype for a global generation through Yuno Gasai, driving the death-game survival trend of early 2010s anime and manga.",
    "director": "sakae-esuno",
    "creator": "sakae-esuno",
    "studio": "asread",
    "sourceMaterial": "Manga by Sakae Esuno (2006–2010)"
  },
  "psycho-pass": {
    "historicalSignificance": "A cyberpunk dystopian masterwork examining algorithmic surveillance, the ethics of pre-crime punishment, and the nature of free will, drawing comparisons to Orwell and Philip K. Dick.",
    "director": "naoyoshi-shiotani",
    "creator": "gen-urobuchi",
    "studio": "production-ig",
    "sourceMaterial": "Original concept by Production I.G and Gen Urobuchi"
  },
  "wolf-children": {
    "historicalSignificance": "Inaugurated Studio Chizu with an emotional tour-de-force on motherhood, nature, and identity, winning the Japan Academy Film Prize for Animation of the Year.",
    "director": "mamoru-hosoda",
    "creator": "mamoru-hosoda",
    "studio": "studio-chizu",
    "sourceMaterial": "Original story by Mamoru Hosoda"
  },
  "kill-la-kill": {
    "historicalSignificance": "Studio Trigger's inaugural television series, exploding with raw rebellious energy, cartoon exaggeration, and relentless pacing that announced Trigger as Gainax's spiritual heir.",
    "director": "hiroyuki-imaishi",
    "creator": "hiroyuki-imaishi",
    "studio": "trigger",
    "sourceMaterial": "Original story by Hiroyuki Imaishi and Kazuki Nakashima"
  },
  "the-wind-rises": {
    "historicalSignificance": "Miyazaki's deeply personal, Oscar-nominated historical meditation on aviation design, beauty, and moral responsibility during the build-up to World War II.",
    "director": "hayao-miyazaki",
    "creator": "hayao-miyazaki",
    "studio": "studio-ghibli",
    "sourceMaterial": "Manga by Hayao Miyazaki based on Tatsuo Hori's novel"
  },
  "parasyte-the-maxim": {
    "historicalSignificance": "Revived Hitoshi Iwaaki's classic 1980s sci-fi horror manga with blistering contemporary production, examining ecological morality and what it truly means to be human.",
    "director": "hitoshi-iwaaki",
    "creator": "hitoshi-iwaaki",
    "studio": "madhouse",
    "sourceMaterial": "Manga by Hitoshi Iwaaki (1988–1995)"
  },
  "no-game-no-life": {
    "historicalSignificance": "Set a new visual bar for vibrant candy-colored fantasy aesthetics and hyper-intellectual game theory battles, remaining one of the most celebrated isekai of its decade.",
    "director": "atsuko-ishizuka",
    "creator": "yuu-kamiya",
    "studio": "madhouse",
    "sourceMaterial": "Light novels by Yuu Kamiya (2012–present)"
  },
  "fatestay-night-unlimited-blade-works": {
    "historicalSignificance": "Established Ufotable's signature digital particle effects and martial choreography as the industry standard for high-budget modern fantasy adaptations.",
    "director": "takahiro-miura",
    "creator": "gen-urobuchi",
    "studio": "ufotable",
    "sourceMaterial": "Visual novel by Type-Moon / Kinoko Nasu (2004)"
  },
  "your-lie-in-april": {
    "historicalSignificance": "A defining modern tearjerker that blended classical piano performances with tender teenage romance, touching millions worldwide through its depiction of grief and artistic redemption.",
    "director": "kyohei-ishiguro",
    "creator": "naoshi-arakawa",
    "studio": "a-1-pictures",
    "sourceMaterial": "Manga by Naoshi Arakawa (2011–2015)"
  },
  "assassination-classroom": {
    "historicalSignificance": "An international comedy-drama sensation that turned a yellow tentacled alien teacher into one of anime's most inspiring educational role models and emotional finales.",
    "director": "seiji-kishi",
    "creator": "yusei-matsui",
    "studio": "lerche",
    "sourceMaterial": "Manga by Yusei Matsui (2012–2016)"
  },
  "overlord": {
    "historicalSignificance": "Pioneered the modern 'villain-protagonist' and sovereign ruler isekai wave, renowned for its intricate political worldbuilding and dark comedic power disparity.",
    "director": "naoyuki-ito",
    "creator": "kugane-maruyama",
    "studio": "madhouse",
    "sourceMaterial": "Light novels by Kugane Maruyama (2012–present)"
  },
  "rezero": {
    "historicalSignificance": "Rejuvenated the isekai genre through brutal psychological realism and the 'Return by Death' time-loop mechanic, producing iconic cultural characters and driving global streaming viewership.",
    "director": "masaharu-watanabe",
    "creator": "tappei-nagatsuki",
    "studio": "white-fox",
    "sourceMaterial": "Light novels by Tappei Nagatsuki (2014–present)"
  },
  "konosuba": {
    "historicalSignificance": "The quintessential isekai parody that captured global audiences with its unapologetic slapstick comedy, eccentric misfit party dynamics, and expressive comedic animation.",
    "director": "takaomi-kanasaki",
    "creator": "natsume-akatsuki",
    "studio": "studio-deen",
    "sourceMaterial": "Light novels by Natsume Akatsuki (2013–2020)"
  },
  "erased": {
    "historicalSignificance": "One of the most gripping mystery-suspense anime of the 2010s, utilizing time-rewind 'Revival' mechanics to tell a poignant story of child protection and personal courage.",
    "director": "tomohiko-ito",
    "creator": "kei-sanbe",
    "studio": "a-1-pictures",
    "sourceMaterial": "Manga by Kei Sanbe (2012–2016)"
  },
  "devilman-crybaby": {
    "historicalSignificance": "Netflix's first major global original anime phenomenon, reinventing Go Nagai's 1972 manga with Masaaki Yuasa's hyper-fluid psychedelic expressionism and unflinching apocalyptic tragedy.",
    "director": "masaaki-yuasa",
    "creator": "go-nagai",
    "studio": "science-saru",
    "sourceMaterial": "Manga by Go Nagai (1972–1973)"
  },
  "violet-evergarden": {
    "historicalSignificance": "A visual marvel representing the absolute pinnacle of television animation artistry, winning multiple international honors for its delicate emotional exploration of post-war trauma and love.",
    "director": "taichi-ishidate",
    "creator": "kana-akatsuki",
    "studio": "kyoto-animation",
    "sourceMaterial": "Light novel by Kana Akatsuki (2015–2020)"
  },
  "kaguya-sama-love-is-war": {
    "historicalSignificance": "Revolutionized the romantic-comedy genre through hyper-stylized psychological warfare, rapid-fire direction, and viral dance choreography that swept social media.",
    "director": "aka-akasaka",
    "creator": "aka-akasaka",
    "studio": "a-1-pictures",
    "sourceMaterial": "Manga by Aka Akasaka (2015–2022)"
  },
  "weathering-with-you": {
    "historicalSignificance": "Follow-up to Your Name and Japan's official entry for the 92nd Academy Awards, offering a poignant, climate-conscious romantic spectacle of young love in a sinking Tokyo.",
    "director": "makoto-shinkai",
    "creator": "makoto-shinkai",
    "studio": "comix-wave-films",
    "sourceMaterial": "Original story by Makoto Shinkai"
  },
  "the-promised-neverland": {
    "historicalSignificance": "Season 1 set a new standard for claustrophobic psychological horror and escape suspense in Weekly Shōnen Jump adaptations, lauded for its cinematic tension and smart plotting.",
    "director": "kaiu-shirai",
    "creator": "kaiu-shirai",
    "studio": "cloverworks",
    "sourceMaterial": "Manga by Kaiu Shirai and Posuka Demizu (2016–2020)"
  },
  "dorohedoro": {
    "historicalSignificance": "A masterclass in adapting cult underground dark fantasy, seamlessly blending expressive 3D CGI with grimy urban aesthetics and morbid, surreal humor.",
    "director": "yuichiro-hayashi",
    "creator": "q-hayashida",
    "studio": "mappa",
    "sourceMaterial": "Manga by Q Hayashida (2000–2018)"
  },
  "demon-slayer-mugen-train": {
    "historicalSignificance": "Shattered historic 19-year box office records to become the highest-grossing film of all time in Japanese cinema history and the highest-grossing film globally in 2020.",
    "director": "haruo-sotozaki",
    "creator": "koyoharu-gotouge",
    "studio": "ufotable",
    "sourceMaterial": "Manga by Koyoharu Gotouge (2016–2020)"
  },
  "keep-your-hands-off-eizouken": {
    "historicalSignificance": "A passionate love letter to the animation medium itself, named by The New York Times as one of the best television series of 2020 for celebrating boundless creative imagination.",
    "director": "masaaki-yuasa",
    "creator": "sumito-owara",
    "studio": "science-saru",
    "sourceMaterial": "Manga by Sumito Owara (2016–present)"
  },
  "great-pretender": {
    "historicalSignificance": "Wit Studio's vibrant international caper anime featuring dazzling pop-art backgrounds by Hiroshi Kato, celebrating globetrotting con artists with Hollywood cinematic flair.",
    "director": "hiro-kaburagi",
    "creator": "hiro-kaburagi",
    "studio": "wit-studio",
    "sourceMaterial": "Original concept by Ryota Kosawa and Wit Studio"
  },
  "ranking-of-kings": {
    "historicalSignificance": "A triumphant blend of classic storybook visual charm and heart-wrenching modern emotional maturity, winning widespread critical acclaim for its deaf prince protagonist, Bojji.",
    "director": "yosuke-hatta",
    "creator": "sosuke-toka",
    "studio": "wit-studio",
    "sourceMaterial": "Manga by Sosuke Toka (2017–present)"
  },
  "to-your-eternity": {
    "historicalSignificance": "Yoshitoki Oima's sweeping philosophical examination of mortality, human connection, and evolution through the eyes of an immortal shape-shifting orb.",
    "director": "yoshitoki-oima",
    "creator": "yoshitoki-oima",
    "studio": "brains-base",
    "sourceMaterial": "Manga by Yoshitoki Oima (2016–present)"
  },
  "jujutsu-kaisen-0": {
    "historicalSignificance": "One of the highest-grossing anime films worldwide, expanding Gege Akutami's dark fantasy lore through Yuta Okkotsu's tragic love curse and dazzling martial arts animation.",
    "director": "sunghoo-park",
    "creator": "gege-akutami",
    "studio": "mappa",
    "sourceMaterial": "Manga by Gege Akutami (Tokyo Metropolitan Curse Technical School, 2017)"
  },
  "86-eighty-six": {
    "historicalSignificance": "Acclaimed for its hard-hitting anti-war commentary, inventive split-screen visual storytelling, and poignant depiction of institutional oppression and military brotherhood.",
    "director": "toshimasa-ishii",
    "creator": "asato-asato",
    "studio": "a-1-pictures",
    "sourceMaterial": "Light novels by Asato Asato (2017–present)"
  },
  "tokyo-revengers": {
    "historicalSignificance": "Rekindled the classic delinquent (yankee) manga/anime phenomenon in Japan, blending youth gang melodrama with time-leap suspense to create a massive merchandise and manga sales wave.",
    "director": "koichi-hatsumi",
    "creator": "ken-wakui",
    "studio": "lidenfilms",
    "sourceMaterial": "Manga by Ken Wakui (2017–2022)"
  },
  "odd-taxi": {
    "historicalSignificance": "The sleeper mystery hit of 2021, winning Anime of the Year from international critics for its intricate Coen-brothers-style dialogue, biting modern Tokyo satire, and jaw-dropping narrative twist.",
    "director": "baku-kinoshita",
    "creator": "kazuya-konomoto",
    "studio": "olm",
    "sourceMaterial": "Original concept by P.I.C.S. and Kazuya Konomoto"
  },
  "lycoris-recoil": {
    "historicalSignificance": "The breakout original anime of summer 2022, lauded by game auteur Hideo Kojima for its John Wick-inspired tactical gunplay, delightful character chemistry, and lively café banter.",
    "director": "shingo-adachi",
    "creator": "shingo-adachi",
    "studio": "a-1-pictures",
    "sourceMaterial": "Original concept by Spider Lily / Asaura"
  },
  "bocchi-the-rock": {
    "historicalSignificance": "A surprise viral sensation that ignited real-world guitar sales across Japan, capturing severe social anxiety with surreal multi-media animation experiments and chart-topping J-rock albums.",
    "director": "keiichiro-saito",
    "creator": "aki-hamaji",
    "studio": "cloverworks",
    "sourceMaterial": "Manga by Aki Hamaji (2017–present)"
  },
  "suzume": {
    "historicalSignificance": "The first Japanese animated film to compete in the Berlin International Film Festival main competition in over two decades, earning over $320 million globally for its healing allegory of the 2011 Tōhoku earthquake.",
    "director": "makoto-shinkai",
    "creator": "makoto-shinkai",
    "studio": "comix-wave-films",
    "sourceMaterial": "Original story by Makoto Shinkai"
  },
  "the-first-slam-dunk": {
    "historicalSignificance": "Takehiko Inoue's directorial debut, achieving an unprecedented revolution in cel-shaded CGI basketball realism that broke box office records across Japan, South Korea, and East Asia.",
    "director": "takehiko-inoue",
    "creator": "takehiko-inoue",
    "studio": "toei-animation",
    "sourceMaterial": "Manga by Takehiko Inoue (1990–1996)"
  },
  "jujutsu-kaisen-s2": {
    "historicalSignificance": "Recognized by Guinness World Records as the Most In-Demand TV Show in the World in 2023, setting a new bar for kinetic 3D-camera layout and high-octane battle choreography during the Shibuya Incident.",
    "director": "shota-goshozono",
    "creator": "gege-akutami",
    "studio": "mappa",
    "sourceMaterial": "Manga by Gege Akutami (2018–2024)"
  },
  "attack-on-titan-the-final-chapters": {
    "historicalSignificance": "The monumental conclusion to a decade-defining dark-fantasy epic, drawing record-breaking global streaming server crashes and completing one of the most culturally significant narratives of the 21st century.",
    "director": "yuichiro-hayashi",
    "creator": "hajime-isayama",
    "studio": "mappa",
    "sourceMaterial": "Manga by Hajime Isayama (2009–2021)"
  },
  "the-apothecary-diaries": {
    "historicalSignificance": "A runaway critical and commercial smash that revitalized the historical court mystery genre, celebrated for its forensic herbology deduction and Maomao's fiercely independent characterization.",
    "director": "norihiko-naganuma",
    "creator": "natsu-hyuuga",
    "studio": "olm",
    "sourceMaterial": "Light novels by Natsu Hyuuga (2011–present)"
  },
  "look-back": {
    "historicalSignificance": "Kiyotaka Oshiyama's hand-animated theatrical tour-de-force adapting Tatsuki Fujimoto's celebrated one-shot, universally praised as a cinematic love letter to the sacrifices and beauty of drawing manga.",
    "director": "kiyotaka-oshiyama",
    "creator": "tatsuki-fujimoto",
    "studio": "studio-durian",
    "sourceMaterial": "Manga one-shot by Tatsuki Fujimoto (2021)"
  },
  "wind-breaker": {
    "historicalSignificance": "Reimagined high-school delinquent brawlers as protective neighborhood guardians, combining fluid CloverWorks hand-to-hand sakuga choreography with heartfelt themes of community belonging.",
    "director": "toshifumi-akai",
    "creator": "satoru-nii",
    "studio": "cloverworks",
    "sourceMaterial": "Manga by Satoru Nii (2021–present)"
  },
  "delicious-in-dungeon": {
    "historicalSignificance": "Studio Trigger's first multi-cour serialized fantasy epic, masterfully grounding high-fantasy ecology and monster biology with mouthwatering culinary preparation and rich worldbuilding.",
    "director": "yoshihiro-miyajima",
    "creator": "ryoko-kui",
    "studio": "trigger",
    "sourceMaterial": "Manga by Ryoko Kui (2014–2023)"
  },
  "kaiju-no-8": {
    "historicalSignificance": "Production I.G's explosive adaptation of the record-breaking Shonen Jump+ manga, bringing classic giant-monster tokusatsu tropes into modern anime with adult protagonist grit and military sci-fi precision.",
    "director": "shigeyuki-miya",
    "creator": "naoya-matsumoto",
    "studio": "production-ig",
    "sourceMaterial": "Manga by Naoya Matsumoto (2020–present)"
  },
  "dandadan": {
    "historicalSignificance": "Science SARU's breakout 2024 hit, delivering an intoxicating, color-saturated whirlwind of alien sci-fi, occult yokai horror, and tender adolescent romance driven by hyper-kinetic visual humor.",
    "director": "fuga-yamashiro",
    "creator": "yukinobu-tatsu",
    "studio": "science-saru",
    "sourceMaterial": "Manga by Yukinobu Tatsu (2021–present)"
  },
  "the-elusive-samurai": {
    "historicalSignificance": "An artistic masterclass in historical Nanboku-chō era adaptation, celebrated for its astonishingly inventive visual direction, painterly layouts, and subversion of samurai heroics.",
    "director": "yuta-yamazaki",
    "creator": "yusei-matsui",
    "studio": "cloverworks",
    "sourceMaterial": "Manga by Yusei Matsui (2021–present)"
  },
  "blue-box": {
    "historicalSignificance": "A rare, beautifully delicate hybrid of competitive high school badminton/basketball athletics and tender romance, praised for its grounded emotional maturity and warm visual pacing.",
    "director": "yuichiro-yano",
    "creator": "kouji-miura",
    "studio": "telecom-animation-film",
    "sourceMaterial": "Manga by Kouji Miura (2021–present)"
  },
  "demon-slayer-infinity-castle": {
    "historicalSignificance": "The commencement of Ufotable's historic theatrical trilogy concluding the Demon Slayer saga, utilizing unprecedented multidimensional 3D architectural rendering for the endless shifting fortress.",
    "director": "haruo-sotozaki",
    "creator": "koyoharu-gotouge",
    "studio": "ufotable",
    "sourceMaterial": "Manga by Koyoharu Gotouge (2016–2020)"
  },
  "the-apothecary-diaries-s2": {
    "historicalSignificance": "Solidified the franchise as one of the definitive international mystery series of the 2020s, expanding from domestic rear-palace intrigue into sweeping international political conspiracy.",
    "director": "norihiko-naganuma",
    "creator": "natsu-hyuuga",
    "studio": "olm",
    "sourceMaterial": "Light novels by Natsu Hyuuga (2011–present)"
  },
  "solo-leveling-s2": {
    "historicalSignificance": "A historic triumph for South Korean manhwa animation adaptations, breaking international concurrent streaming records and solidifying the global mainstreaming of the webtoon industry.",
    "director": "shunsuke-nakashige",
    "creator": "chugong",
    "studio": "a-1-pictures",
    "sourceMaterial": "Web novel by Chugong and webtoon by DUBU (2018–2022)"
  }
};

export const CURATED_OVERRIDES: Record<string, { director?: string; creator?: string; studio?: string }> = {
  "hellsing-ultimate": {"director":"tomokazu-tokoro","creator":"kouta-hirano"},
  "classroom-of-the-elite": {"director":"seiji-kishi","creator":"syougo-kinugasa"},
  "promised-neverland": {"director":"mamoru-kanbe","creator":"kaiu-shirai"},
  "kaguya-sama": {"director":"shinichi-omata","creator":"aka-akasaka"},
  "apothecary-diaries": {"director":"norihiko-naganuma","creator":"natsu-hyuuga"},
  "that-time-i-got-reincarnated-as-a-slime": {"director":"yasuhito-kikuchi","creator":"fuse"},
  "seven-deadly-sins": {"director":"tensai-okamura","creator":"nakaba-suzuki"},
  "re-zero": {"director":"masaharu-watanabe","creator":"tappei-nagatsuki"},
  "dragon-ball-z": {
    "director": "daisuke-nishio",
    "creator": "akira-toriyama"
  },
  "dragon-ball": {
    "director": "minoru-okazaki",
    "creator": "akira-toriyama"
  },
  "one-piece": {
    "director": "konosuke-uda",
    "creator": "eiichiro-oda"
  },
  "naruto": {
    "director": "hayato-date",
    "creator": "masashi-kishimoto"
  },
  "fullmetal-alchemist-brotherhood": {
    "director": "yasuhiro-irie",
    "creator": "hiromu-arakawa"
  },
  "sailor-moon": {
    "director": "junichi-sato",
    "creator": "naoko-takeuchi"
  },
  "death-note": {
    "director": "tetsuro-araki",
    "creator": "tsugumi-ohba"
  },
  "hunter-x-hunter": {
    "director": "hiroshi-koujina",
    "creator": "yoshihiro-togashi"
  },
  "bleach": {
    "director": "noriyuki-abe",
    "creator": "tite-kubo"
  },
  "pokemon": {
    "director": "kunihiko-yuyama",
    "creator": "satoshi-tajiri"
  },
  "my-hero-academia": {
    "director": "kenji-nagasaki",
    "creator": "kohei-horikoshi"
  },
  "sword-art-online": {
    "director": "tomohiko-ito",
    "creator": "reki-kawahara"
  },
  "tokyo-ghoul": {
    "director": "shuhei-morita",
    "creator": "sui-ishida"
  },
  "black-clover": {
    "director": "tatsuya-yoshihara",
    "creator": "yuki-tabata"
  },
  "fairy-tail": {
    "director": "shinji-ishihira",
    "creator": "hiro-mashima"
  },
  "haikyuu": {
    "director": "susumu-mitsunaka",
    "creator": "haruichi-furudate"
  },
  "jojos-bizarre-adventure": {
    "director": "naokatsu-tsuda",
    "creator": "hirohiko-araki"
  },
  "spy-x-family": {
    "director": "kazuhiro-furuhashi",
    "creator": "tatsuya-endo"
  },
  "chainsaw-man": {
    "director": "ryu-nakayama",
    "creator": "tatsuki-fujimoto"
  },
  "attack-on-titan": {
    "director": "tetsuro-araki",
    "creator": "hajime-isayama"
  },
  "demon-slayer": {
    "director": "haruo-sotozaki",
    "creator": "koyoharu-gotouge"
  },
  "jujutsu-kaisen": {
    "director": "sunghoo-park",
    "creator": "gege-akutami"
  },
  "ghost-in-the-shell": {
    "director": "mamoru-oshii",
    "creator": "masamune-shirow"
  },
  "perfect-blue": {
    "director": "satoshi-kon",
    "creator": "satoshi-kon"
  },
  "frieren-beyond-journeys-end": {
    "director": "keiichiro-saito",
    "creator": "kanehito-yamada"
  },
  "oshi-no-ko": {
    "director": "daisuke-hiramaki",
    "creator": "aka-akasaka"
  },
  "blue-lock": {
    "director": "tetsuaki-watanabe",
    "creator": "muneyuki-kaneshiro"
  },
  "mushoku-tensei": {
    "director": "manabu-okamoto",
    "creator": "rifujin-na-magonote"
  },
  "vinland-saga": {
    "director": "shuhei-yabuta",
    "creator": "makoto-yukimura"
  },
  "dr-stone": {
    "director": "shinya-iino",
    "creator": "riichiro-inagaki"
  },
  "made-in-abyss": {
    "director": "masayuki-kojima",
    "creator": "akihito-tsukushi"
  },
  "berserk": {
    "director": "naohito-takahashi",
    "creator": "kentaro-miura"
  },
  "monster": {
    "director": "masayuki-kojima",
    "creator": "naoki-urasawa"
  },
  "samurai-champloo": {
    "director": "shinichiro-watanabe",
    "creator": "shinichiro-watanabe"
  },
  "cowboy-bebop": {
    "director": "shinichiro-watanabe",
    "creator": "shinichiro-watanabe"
  },
  "neon-genesis-evangelion": {
    "director": "hideaki-anno",
    "creator": "hideaki-anno"
  },
  "gurren-lagann": {
    "director": "hiroyuki-imaishi",
    "creator": "hiroyuki-imaishi"
  },
  "code-geass": {
    "director": "goro-taniguchi",
    "creator": "goro-taniguchi"
  },
  "k-on": {
    "director": "naoko-yamada",
    "creator": "kakifly"
  },
  "steins-gate": {
    "director": "hiroshi-hamasaki",
    "creator": "hiroshi-hamasaki"
  },
  "one-punch-man": {
    "director": "shingo-natsume",
    "creator": "one"
  },
  "mob-psycho-100": {
    "director": "yuzuru-tachikawa",
    "creator": "one"
  },
  "your-name": {
    "director": "makoto-shinkai",
    "creator": "makoto-shinkai"
  },
  "namakura-gatana": {
    "director": "junichi-kouchi",
    "creator": "junichi-kouchi",
    "studio": "kobayashi-shokai"
  },
  "momotaro-divine-sea-warriors": {
    "director": "mitsuyo-seo",
    "creator": "mitsuyo-seo",
    "studio": "shochiku"
  },
  "astro-boy": {
    "director": "osamu-tezuka",
    "creator": "osamu-tezuka",
    "studio": "mushi-production"
  },
  "kimba-the-white-lion": {
    "director": "osamu-tezuka",
    "creator": "osamu-tezuka",
    "studio": "mushi-production"
  }
};

export const ADDITIONAL_CHARACTERS: Record<string, { slug: string; name: string; japaneseName: string; role: string; biography: string; voiceActor: string }[]> = {
  "namakura-gatana": [
    {
      "slug": "namakura-pedestrian",
      "name": "The Street Pedestrian",
      "japaneseName": "町人",
      "role": "Bystander · Victor",
      "biography": "The unsuspecting townsperson who easily defends himself against the clumsy samurai's dull sword, disarming and humiliating him.",
      "voiceActor": "Silent Era"
    }
  ],
  "momotaro-divine-sea-warriors": [
    {
      "slug": "momotaro-pheasant",
      "name": "Pheasant Squadron Leader",
      "japaneseName": "キジ航空隊長",
      "role": "Aerial Commander",
      "biography": "The brave pheasant aviator who commands the animal air reconnaissance unit in the South Pacific mission.",
      "voiceActor": "Historic Voice Cast"
    },
    {
      "slug": "momotaro-bear",
      "name": "Bear Paratrooper",
      "japaneseName": "クマ空挺兵",
      "role": "Heavy Infantry",
      "biography": "The powerful bear soldier participating in parachute landings and logistics construction.",
      "voiceActor": "Historic Voice Cast"
    }
  ],
  "one-piece": [
    {
      "slug": "roronoa-zoro",
      "name": "Roronoa Zoro",
      "japaneseName": "ロロノア・ゾロ",
      "role": "Swordsman · First Mate",
      "biography": "The Pirate Hunter and master of Three-Sword Style (Santoryu) who vowed to become the world's greatest swordsman in honor of his childhood friend Kuina.",
      "voiceActor": "Kazuya Nakai"
    },
    {
      "slug": "nami-op",
      "name": "Nami",
      "japaneseName": "ナミ",
      "role": "Navigator",
      "biography": "The brilliant cartographer and navigator of the Straw Hats whose climate baton and weather instincts guide the crew through the treacherous Grand Line.",
      "voiceActor": "Akemi Okamura"
    },
    {
      "slug": "sanji",
      "name": "Sanji",
      "japaneseName": "サンジ",
      "role": "Chef",
      "biography": "The Black Leg chef of the Baratie who fights exclusively with devastating kicks to protect his hands for cooking, dreaming of the legendary All Blue.",
      "voiceActor": "Hiroaki Hirata"
    }
  ],
  "naruto": [
    {
      "slug": "sasuke-uchiha",
      "name": "Sasuke Uchiha",
      "japaneseName": "うちは サスケ",
      "role": "Rival · Deuteragonist",
      "biography": "The sole survivor of the Uchiha clan massacre whose vengeance drives him toward darkness, remaining Naruto's closest bond and greatest test of brotherhood.",
      "voiceActor": "Noriaki Sugiyama"
    },
    {
      "slug": "sakura-haruno",
      "name": "Sakura Haruno",
      "japaneseName": "春野 サクラ",
      "role": "Kunoichi · Medical Ninja",
      "biography": "Team 7's intelligent kunoichi who trains under Tsunade to become a peerless medical ninja with monstrous chakra-enhanced physical strength.",
      "voiceActor": "Chie Nakamura"
    },
    {
      "slug": "kakashi-hatake",
      "name": "Kakashi Hatake",
      "japaneseName": "はたけ カカシ",
      "role": "Mentor · Sensei",
      "biography": "The famed 'Copy Ninja of the Leaf' whose mysterious Sharingan eye and laid-back exterior conceal a tragic past and unmatched tactical brilliance.",
      "voiceActor": "Kazuhiko Inoue"
    }
  ],
  "fullmetal-alchemist-brotherhood": [
    {
      "slug": "alphonse-elric",
      "name": "Alphonse Elric",
      "japaneseName": "アルフォンス・エルリック",
      "role": "Deuteragonist",
      "biography": "Edward's gentle younger brother whose entire physical body was lost in their failed human transmutation, with his soul anchored to a massive suit of steel armor.",
      "voiceActor": "Rie Kugimiya"
    },
    {
      "slug": "roy-mustang",
      "name": "Roy Mustang",
      "japaneseName": "ロイ・マスタング",
      "role": "State Alchemist · Colonel",
      "biography": "The ambitious Flame Alchemist whose spark-igniting gloves unleash incinerating fire, harboring a fierce resolve to overthrow the corrupt military junta from within.",
      "voiceActor": "Shin-ichiro Miki"
    },
    {
      "slug": "winry-rockbell",
      "name": "Winry Rockbell",
      "japaneseName": "ウィンリィ・ロックベル",
      "role": "Automail Engineer",
      "biography": "The brothers' spirited childhood friend and master mechanic from Resembool whose custom automail limbs sustain Edward throughout his journey.",
      "voiceActor": "Megumi Toyoguchi"
    }
  ],
  "dragon-ball": [
    {
      "slug": "bulma",
      "name": "Bulma",
      "japaneseName": "ブルマ",
      "role": "Inventive Companion",
      "biography": "The teenage genius daughter of Capsule Corporation's founder whose Dragon Radar invention and adventurous spirit catalyzed the entire Dragon Ball saga.",
      "voiceActor": "Hiromi Tsuru"
    },
    {
      "slug": "master-roshi",
      "name": "Master Roshi",
      "japaneseName": "亀仙人",
      "role": "Martial Arts Master",
      "biography": "The eccentric Turtle Hermit of Kame House who invented the Kamehameha wave and trained Goku and Krillin in the foundational philosophies of martial arts.",
      "voiceActor": "Kohei Miyauchi"
    },
    {
      "slug": "krillin",
      "name": "Krillin",
      "japaneseName": "クリリン",
      "role": "Best Friend · Martial Artist",
      "biography": "Goku's fierce rival turned lifelong best friend, widely recognized as the strongest pure-blooded Earthling warrior in the universe.",
      "voiceActor": "Mayumi Tanaka"
    }
  ],
  "sailor-moon": [
    {
      "slug": "ami-mizuno",
      "name": "Ami Mizuno / Sailor Mercury",
      "japaneseName": "水野 亜美",
      "role": "Sailor Guardian of Water and Wisdom",
      "biography": "The bookish genius of the Sailor Guardians with an IQ of 300, wielding analytical computers and mist/ice powers to formulate tactical battlefield strategies.",
      "voiceActor": "Aya Hisakawa"
    },
    {
      "slug": "rei-hino",
      "name": "Rei Hino / Sailor Mars",
      "japaneseName": "火野 レイ",
      "role": "Sailor Guardian of Fire and Passion",
      "biography": "A fiery Shinto miko (shrine maiden) gifted with spiritual clairvoyance, wielding sacred sutras and scorching flames to purge evil.",
      "voiceActor": "Michie Tomizawa"
    },
    {
      "slug": "mamoru-chiba",
      "name": "Mamoru Chiba / Tuxedo Mask",
      "japaneseName": "地場 衛",
      "role": "Protector · Prince Endymion",
      "biography": "The reincarnation of Earth's ancient Prince Endymion, who aids the Sailor Guardians in times of peril with throwing roses and aristocratic cane combat.",
      "voiceActor": "Toru Furuya"
    }
  ],
  "ghost-in-the-shell": [
    {
      "slug": "batou",
      "name": "Batou",
      "japaneseName": "バトー",
      "role": "Section 9 Operative",
      "biography": "The hulking cybernetic ranger with prosthetic eyes whose military experience and deep loyalty make him Major Kusanagi's most trusted second-in-command.",
      "voiceActor": "Akio Otsuka"
    },
    {
      "slug": "daisuke-aramaki",
      "name": "Daisuke Aramaki",
      "japaneseName": "荒巻 大輔",
      "role": "Chief of Section 9",
      "biography": "The fiercely principled, politically astute chief of Public Security Section 9 whose unwavering integrity protects his covert team from ministerial conspiracies.",
      "voiceActor": "Tamio Oki"
    },
    {
      "slug": "puppet-master",
      "name": "The Puppet Master",
      "japaneseName": "人形使い",
      "role": "Sentient AI · Entity",
      "biography": "A classified autonomous cyber-intelligence project that gained self-awareness in the sea of information, seeking biological synthesis and reproduction with Major Kusanagi.",
      "voiceActor": "Iemasa Kayumi"
    }
  ],
  "perfect-blue": [
    {
      "slug": "rumi-hidaka",
      "name": "Rumi Hidaka",
      "japaneseName": "日高 ルミ",
      "role": "Manager",
      "biography": "Mima's former-idol manager who vehemently opposes her transition into gritty acting, becoming an increasingly unhinged manifestation of Mima's pure idol past.",
      "voiceActor": "Emi Shinohara"
    },
    {
      "slug": "me-mania",
      "name": "Me-Mania (Mamoru Uchida)",
      "japaneseName": "内田 守",
      "role": "Stalker",
      "biography": "The grotesque, unblinking stalker obsessed with the website 'Mima's Room', serving as a terrifying physical embodiment of toxic celebrity idolatry.",
      "voiceActor": "Masaaki Okura"
    }
  ],
  "astro-boy": [
    {
      "slug": "dr-ochanomizu",
      "name": "Professor Ochanomizu",
      "japaneseName": "お茶の水博士",
      "role": "Guardian · Ministry of Science Head",
      "biography": "The large-nosed, warm-hearted head of the Ministry of Science who champions robot civil rights and acts as Astro's loving father and legal guardian.",
      "voiceActor": "Hisashi Katsuta"
    },
    {
      "slug": "dr-tenma",
      "name": "Dr. Tenma",
      "japaneseName": "天馬博士",
      "role": "Creator · Former Science Minister",
      "biography": "The grief-stricken genius scientist who created Astro Boy to replace his deceased son Tobio, before bitterly abandoning him when the robot could not grow.",
      "voiceActor": "Hisashi Yokomori"
    },
    {
      "slug": "uran",
      "name": "Uran",
      "japaneseName": "ウラン",
      "role": "Robot Sister",
      "biography": "Astro's mischievous, tomboyish younger sister robot built with 100,000 horsepower, known for getting into playful trouble and fiercely defending animals.",
      "voiceActor": "Yoko Mizugaki"
    }
  ],
  "kimba-the-white-lion": [
    {
      "slug": "danl-baboon",
      "name": "Dan'l Baboon",
      "japaneseName": "マンディ",
      "role": "Elder Mentor",
      "biography": "The wise, venerable mandrill elder who mentors Kimba in statecraft, justice, and the delicate harmony of the African wild.",
      "voiceActor": "Ryuji Saikachi"
    },
    {
      "slug": "pauley-cracker",
      "name": "Pauley Cracker",
      "japaneseName": "ココ",
      "role": "Comedic Scout",
      "biography": "Kimba's outspoken, witty green parrot companion who serves as the jungle realm's aerial lookout and messenger.",
      "voiceActor": "Kazuo Kumakura"
    }
  ],
  "serial-experiments-lain": [
    {
      "slug": "alice-mizuki",
      "name": "Alice Mizuki",
      "japaneseName": "瑞城 ありす",
      "role": "Best Friend",
      "biography": "Lain's gentle, compassionate school classmate who remains her sole tether to physical human warmth as Lain dissolves into the digital Wired.",
      "voiceActor": "Ayako Kawasumi"
    },
    {
      "slug": "yasuo-iwakura",
      "name": "Yasuo Iwakura",
      "japaneseName": "岩倉 康男",
      "role": "Father",
      "biography": "Lain's father whose fanatical multi-monitor Navi computer setup first introduces Lain to the dark depths of the global network.",
      "voiceActor": "Ryusuke Obayashi"
    }
  ]
};

export const ADDITIONAL_EPISODES: Record<string, { number: number; title: string; airDate?: string; synopsis?: string }[]> = {
  "naruto": [
    {
      "number": 1,
      "title": "Enter: Naruto Uzumaki!",
      "airDate": "2002-10-03",
      "synopsis": "A prank-loving orphan shunned by his village steals a sacred scroll and discovers the dark secret sealed inside him."
    },
    {
      "number": 19,
      "title": "The Demon in the Snow",
      "airDate": "2003-02-13",
      "synopsis": "Naruto's heartfelt words break through the cold armor of the rogue ninja Zabuza beside the fallen Haku."
    },
    {
      "number": 133,
      "title": "The Bitter End",
      "airDate": "2005-05-18",
      "synopsis": "Naruto and Sasuke clash at the Valley of the End with Nine-Tails vermilion chakra and the cursed Curse Mark."
    }
  ],
  "one-piece": [
    {
      "number": 1,
      "title": "I'm Luffy! The Man Who Will Become the Pirate King!",
      "airDate": "1999-10-20",
      "synopsis": "Monkey D. Luffy bursts from a wine barrel and rescues the timid Koby from the pirate Alvida."
    },
    {
      "number": 37,
      "title": "Luffy Rises! Breaking the Promise!",
      "airDate": "2000-08-02",
      "synopsis": "A weeping Nami stabs her Arlong tattoo until Luffy puts his treasure straw hat on her head and vows revenge."
    },
    {
      "number": 312,
      "title": "Thank You, Merry! Snow Falls on the Sea of Parting",
      "airDate": "2007-06-03",
      "synopsis": "The Straw Hats bid an emotional, fiery farewell to the spirit of their faithful ship, the Going Merry."
    }
  ],
  "fullmetal-alchemist-brotherhood": [
    {
      "number": 1,
      "title": "Fullmetal Alchemist",
      "airDate": "2009-04-05",
      "synopsis": "State Alchemists Edward and Alphonse Elric hunt the Freezing Alchemist Isaac McDougal across the snows of Central City."
    },
    {
      "number": 19,
      "title": "Death of the Undying",
      "airDate": "2009-08-09",
      "synopsis": "Colonel Roy Mustang ruthlessly burns the homunculus Lust to ash in a display of blinding pinpoint pyrotechnics."
    },
    {
      "number": 64,
      "title": "Journey's End",
      "airDate": "2010-07-04",
      "synopsis": "Edward makes the ultimate alchemical trade: sacrificing his own gate of alchemy to restore Alphonse's flesh-and-blood body."
    }
  ],
  "dragon-ball": [
    {
      "number": 1,
      "title": "The Secret of the Dragon Balls",
      "airDate": "1986-02-26",
      "synopsis": "Bulma encounters the extraordinary monkey-tailed boy Son Goku in the wilderness of Mount Paozu."
    },
    {
      "number": 28,
      "title": "The Deciding Round",
      "airDate": "1986-09-03",
      "synopsis": "Goku and the disguised Master Roshi ('Jackie Chun') wage an earth-shattering tournament final."
    },
    {
      "number": 122,
      "title": "Final Struggle!",
      "airDate": "1988-07-13",
      "synopsis": "Goku channels all his energy into a one-fist punch straight through King Piccolo's torso."
    }
  ],
  "sailor-moon": [
    {
      "number": 1,
      "title": "The Crybaby: Usagi's Beautiful Transformation",
      "airDate": "1992-03-07",
      "synopsis": "Usagi Tsukino meets the talking cat Luna and awakens as Sailor Moon, defender of love and justice."
    },
    {
      "number": 45,
      "title": "The Sailor Warriors Die! The Tragic Final Battle",
      "airDate": "1993-02-20",
      "synopsis": "One by one, the Sailor Guardians sacrifice their lives on the frozen plains of D-Point to pave Usagi's path."
    },
    {
      "number": 46,
      "title": "Usagi's Everlasting Wish! A New Reincarnation",
      "airDate": "1993-02-27",
      "synopsis": "Princess Serenity channels the Silver Crystal to defeat Queen Beryl and restore peace to the world."
    }
  ],
  "code-geass": [
    {
      "number": 1,
      "title": "The Day a New Demon Was Born",
      "airDate": "2006-10-06",
      "synopsis": "Exiled Britannian prince Lelouch Lamperouge receives the absolute power of Geass from the immortal C.C."
    },
    {
      "number": 25,
      "title": "Zero",
      "airDate": "2007-07-29",
      "synopsis": "Lelouch and Suzaku face off inside Kamine Island with guns drawn as the Black Rebellion crumbles."
    }
  ],
  "steins-gate": [
    {
      "number": 1,
      "title": "Turning Point",
      "airDate": "2011-04-06",
      "synopsis": "Rintaro Okabe discovers Makise Kurisu lying in a pool of blood, sending a test text message that alters past reality."
    },
    {
      "number": 12,
      "title": "Dogma in Event Horizon",
      "airDate": "2011-06-22",
      "synopsis": "Rounders storm the Future Gadget Lab and the pocket watch stops, triggering the nightmare of Mayuri's death."
    },
    {
      "number": 24,
      "title": "Achievement Point",
      "airDate": "2011-09-14",
      "synopsis": "Okabe deceives his past self and saves Kurisu without disrupting causality, reaching the Steins Gate worldline."
    }
  ],
  "jujutsu-kaisen": [
    {
      "number": 1,
      "title": "Ryomen Sukuna",
      "airDate": "2020-10-03",
      "synopsis": "Yuji Itadori swallows a rotted curse finger to save his occult club friends, becoming host to the King of Curses."
    },
    {
      "number": 19,
      "title": "Black Flash",
      "airDate": "2021-02-20",
      "synopsis": "Under Aoi Todo's guidance, Yuji strikes Hanami with consecutive spatial distortion impacts of Black Flash."
    },
    {
      "number": 24,
      "title": "Accomplices",
      "airDate": "2021-03-27",
      "synopsis": "Nobara Kugisaki and Yuji Itadori unleash a synchronized resonance assault against Eso and Kechizu."
    }
  ]
};

export const ADDITIONAL_RELATIONS: { animeSlug: string; relatedSlug: string; type: string }[] = [
  {
    "animeSlug": "dragon-ball",
    "relatedSlug": "dragon-ball-z",
    "type": "Sequel"
  },
  {
    "animeSlug": "dragon-ball-z",
    "relatedSlug": "dragon-ball",
    "type": "Prequel"
  },
  {
    "animeSlug": "jujutsu-kaisen",
    "relatedSlug": "jujutsu-kaisen-0",
    "type": "Prequel"
  },
  {
    "animeSlug": "jujutsu-kaisen-0",
    "relatedSlug": "jujutsu-kaisen",
    "type": "Sequel"
  },
  {
    "animeSlug": "jujutsu-kaisen",
    "relatedSlug": "jujutsu-kaisen-s2",
    "type": "Sequel"
  },
  {
    "animeSlug": "jujutsu-kaisen-s2",
    "relatedSlug": "jujutsu-kaisen",
    "type": "Prequel"
  },
  {
    "animeSlug": "attack-on-titan",
    "relatedSlug": "attack-on-titan-the-final-chapters",
    "type": "Sequel"
  },
  {
    "animeSlug": "attack-on-titan-the-final-chapters",
    "relatedSlug": "attack-on-titan",
    "type": "Prequel"
  },
  {
    "animeSlug": "demon-slayer",
    "relatedSlug": "demon-slayer-mugen-train",
    "type": "Sequel"
  },
  {
    "animeSlug": "demon-slayer-mugen-train",
    "relatedSlug": "demon-slayer",
    "type": "Prequel"
  },
  {
    "animeSlug": "demon-slayer-mugen-train",
    "relatedSlug": "demon-slayer-infinity-castle",
    "type": "Sequel"
  },
  {
    "animeSlug": "demon-slayer-infinity-castle",
    "relatedSlug": "demon-slayer-mugen-train",
    "type": "Prequel"
  },
  {
    "animeSlug": "code-geass",
    "relatedSlug": "code-geass-r2",
    "type": "Sequel"
  },
  {
    "animeSlug": "code-geass-r2",
    "relatedSlug": "code-geass",
    "type": "Prequel"
  },
  {
    "animeSlug": "the-apothecary-diaries",
    "relatedSlug": "the-apothecary-diaries-s2",
    "type": "Sequel"
  },
  {
    "animeSlug": "the-apothecary-diaries-s2",
    "relatedSlug": "the-apothecary-diaries",
    "type": "Prequel"
  },
  {
    "animeSlug": "solo-leveling",
    "relatedSlug": "solo-leveling-s2",
    "type": "Sequel"
  },
  {
    "animeSlug": "solo-leveling-s2",
    "relatedSlug": "solo-leveling",
    "type": "Prequel"
  },
  {
    "animeSlug": "clannad",
    "relatedSlug": "clannad-after-story",
    "type": "Sequel"
  },
  {
    "animeSlug": "clannad-after-story",
    "relatedSlug": "clannad",
    "type": "Prequel"
  },
  {
    "animeSlug": "fatezero",
    "relatedSlug": "fatestay-night-unlimited-blade-works",
    "type": "Sequel"
  },
  {
    "animeSlug": "fatestay-night-unlimited-blade-works",
    "relatedSlug": "fatezero",
    "type": "Prequel"
  },
  {
    "animeSlug": "neon-genesis-evangelion",
    "relatedSlug": "the-end-of-evangelion",
    "type": "Alternative version / Sequel"
  },
  {
    "animeSlug": "the-end-of-evangelion",
    "relatedSlug": "neon-genesis-evangelion",
    "type": "Parent Story"
  },
  {
    "animeSlug": "nausica-of-the-valley-of-the-wind",
    "relatedSlug": "castle-in-the-sky",
    "type": "Stylistic Predecessor"
  },
  {
    "animeSlug": "castle-in-the-sky",
    "relatedSlug": "nausica-of-the-valley-of-the-wind",
    "type": "Stylistic Successor"
  },
  {
    "animeSlug": "chainsaw-man",
    "relatedSlug": "look-back",
    "type": "Same Creator (Tatsuki Fujimoto)"
  },
  {
    "animeSlug": "look-back",
    "relatedSlug": "chainsaw-man",
    "type": "Same Creator (Tatsuki Fujimoto)"
  }
];
