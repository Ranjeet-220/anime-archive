export type WorldEventCategory = "Politics" | "Society" | "Technology" | "Culture";

export interface WorldEvent {
  year: number;
  title: string;
  description: string;
  category: WorldEventCategory;
}

export interface WorldDecade {
  decade: number;
  events: WorldEvent[];
}

export const WORLD_DECADES: WorldDecade[] = [
  {
    decade: 1910,
    events: [
      {
        year: 1914,
        title: "World War I breaks out",
        description:
          "Japan declares war on Germany and joins the Allied powers, seizing German holdings in the Pacific and fueling its industrial expansion.",
        category: "Politics",
      },
      {
        year: 1918,
        title: "Spanish flu reaches Japan",
        description:
          "The influenza pandemic sweeps the country, claiming hundreds of thousands of lives and straining an economy already stretched by war.",
        category: "Society",
      },
      {
        year: 1918,
        title: "The Rice Riots",
        description:
          "Mass protests over soaring rice prices erupt across cities and towns, forcing the fall of the cabinet and marking a turning point in domestic politics.",
        category: "Politics",
      },
      {
        year: 1919,
        title: "Treaty of Versailles",
        description:
          "The Great War ends and Japan is seated among the world's five great powers, taking a permanent place at the League of Nations.",
        category: "Politics",
      },
    ],
  },
  {
    decade: 1920,
    events: [
      {
        year: 1923,
        title: "Great Kanto Earthquake",
        description:
          "A magnitude 7.9 earthquake levels Tokyo and Yokohama, killing well over 100,000 people and forcing a wholesale reconstruction of the capital.",
        category: "Society",
      },
      {
        year: 1925,
        title: "Universal Manhood Suffrage",
        description:
          "All adult men gain the right to vote in the same Diet session that passes the Peace Preservation Law, criminalizing leftist movements.",
        category: "Politics",
      },
      {
        year: 1926,
        title: "The Showa era begins",
        description:
          "Emperor Hirohito ascends the throne; the Showa era opens on a decade of fragile hope and closes in catastrophe.",
        category: "Politics",
      },
      {
        year: 1929,
        title: "The Wall Street crash",
        description:
          "The global Great Depression begins, deepening unemployment and rural poverty in Japan and steering the state toward militarist remedies.",
        category: "Society",
      },
    ],
  },
  {
    decade: 1930,
    events: [
      {
        year: 1931,
        title: "The Mukden Incident",
        description:
          "Japanese army officers stage an attack on their own railway line near Mukden, providing the pretext for the invasion and occupation of Manchuria.",
        category: "Politics",
      },
      {
        year: 1936,
        title: "The February 26 Incident",
        description:
          "Young army officers mount a coup attempt in Tokyo, assassinating government officials and securing the military's grip on national politics.",
        category: "Politics",
      },
      {
        year: 1937,
        title: "War with China",
        description:
          "The Marco Polo Bridge Incident escalates into full-scale war with China, opening a brutal conflict that will consume the nation for eight years.",
        category: "Politics",
      },
      {
        year: 1938,
        title: "National Mobilization Law",
        description:
          "The Diet grants the government sweeping wartime powers over labor, industry, and information — including the young film and animation industries.",
        category: "Politics",
      },
    ],
  },
  {
    decade: 1940,
    events: [
      {
        year: 1941,
        title: "Attack on Pearl Harbor",
        description:
          "Japan strikes the U.S. Pacific Fleet at Pearl Harbor, opening the Pacific War and committing the country to total war.",
        category: "Politics",
      },
      {
        year: 1945,
        title: "Hiroshima, Nagasaki, surrender",
        description:
          "Atomic bombs fall on Hiroshima and Nagasaki; Japan surrenders and the Allied occupation begins under General Douglas MacArthur.",
        category: "Politics",
      },
      {
        year: 1945,
        title: "Postwar food crisis",
        description:
          "Defeated and demobilized, Japan enters years of hunger and black-market rationing — the hard ground from which postwar culture grows.",
        category: "Society",
      },
      {
        year: 1946,
        title: "A new constitution",
        description:
          "Japan's new constitution renounces war, declares popular sovereignty, and grants women full suffrage.",
        category: "Politics",
      },
      {
        year: 1947,
        title: "Fundamental Law of Education",
        description:
          "Postwar education reforms dismantle the wartime system, mandating democratic, compulsory schooling for the generation that will build the anime industry.",
        category: "Society",
      },
    ],
  },
  {
    decade: 1950,
    events: [
      {
        year: 1950,
        title: "The Korean War",
        description:
          "War erupts on the Korean peninsula; U.S. 'special procurement' orders ignite Japan's industrial recovery and rearmament debate.",
        category: "Politics",
      },
      {
        year: 1952,
        title: "Independence restored",
        description:
          "The San Francisco Peace Treaty ends the occupation and returns sovereignty to Japan; the U.S.–Japan Security Treaty anchors the postwar order.",
        category: "Politics",
      },
      {
        year: 1953,
        title: "NHK begins television broadcasts",
        description:
          "NHK airs the nation's first regular television programs — the box that will soon carry anime into millions of living rooms.",
        category: "Technology",
      },
      {
        year: 1954,
        title: "Godzilla",
        description:
          "Toho releases Godzilla, the kaiju film that gives form to postwar nuclear anxiety and launches Japan's global monster culture.",
        category: "Culture",
      },
      {
        year: 1956,
        title: "Japan joins the United Nations",
        description:
          "Japan is admitted to the UN, marking its formal return to the community of nations fourteen years after Pearl Harbor.",
        category: "Politics",
      },
    ],
  },
  {
    decade: 1960,
    events: [
      {
        year: 1960,
        title: "The Anpo protests",
        description:
          "Millions march against the renewed U.S.–Japan Security Treaty in the largest demonstrations in the country's history.",
        category: "Politics",
      },
      {
        year: 1964,
        title: "Tokyo Olympics and the Shinkansen",
        description:
          "The first Olympic Games in Asia open in Tokyo as the Tokaido Shinkansen debuts; color television brings both into the nation's living rooms.",
        category: "Technology",
      },
      {
        year: 1968,
        title: "The student movement",
        description:
          "University campuses erupt in protest; the new left turns radical as affluence reshapes Japanese society and family life.",
        category: "Society",
      },
      {
        year: 1969,
        title: "Apollo 11",
        description:
          "Humans walk on the Moon; the live broadcast galvanizes a generation of children who will grow up to draw space anime.",
        category: "Technology",
      },
    ],
  },
  {
    decade: 1970,
    events: [
      {
        year: 1970,
        title: "Expo '70, Osaka",
        description:
          "The World's Fair in Osaka draws 64 million visitors — the postwar dream of technology and growth made concrete and fiberglass.",
        category: "Culture",
      },
      {
        year: 1972,
        title: "Okinawa reverts to Japan",
        description:
          "The United States returns Okinawa to Japanese control after 27 years of occupation, though American bases remain.",
        category: "Politics",
      },
      {
        year: 1973,
        title: "The oil crisis",
        description:
          "The OPEC embargo triggers panic buying and inflation, making Japan's dependence on imported energy a national obsession.",
        category: "Society",
      },
      {
        year: 1973,
        title: "Minamata ruling",
        description:
          "Courts rule for victims of industrial pollution, forcing Japan to confront the environmental costs of its high-speed miracle.",
        category: "Society",
      },
    ],
  },
  {
    decade: 1980,
    events: [
      {
        year: 1982,
        title: "The Family Computer",
        description:
          "Nintendo releases the Famicom, launching home console gaming and a new kind of shared childhood built from pixels.",
        category: "Technology",
      },
      {
        year: 1985,
        title: "The Plaza Accord",
        description:
          "Major economies agree to weaken the dollar; the yen doubles in value and the assumptions of Japan's export model begin to crack.",
        category: "Politics",
      },
      {
        year: 1985,
        title: "JAL Flight 123",
        description:
          "The deadliest single-aircraft disaster in history kills 520 people, shattering confidence in technological infallibility.",
        category: "Society",
      },
      {
        year: 1989,
        title: "The bubble peaks; the Showa era ends",
        description:
          "Emperor Hirohito dies and the Heisei era begins just as asset prices reach their vertiginous peak — a portent of the decade to come.",
        category: "Politics",
      },
    ],
  },
  {
    decade: 1990,
    events: [
      {
        year: 1991,
        title: "The bubble bursts",
        description:
          "Asset prices collapse and the 'Lost Decade' begins; banks drown in bad debt and lifetime employment starts to erode.",
        category: "Society",
      },
      {
        year: 1995,
        title: "Great Hanshin Earthquake",
        description:
          "A magnitude 6.9 quake devastates Kobe, killing more than 6,000 people and exposing the limits of official disaster response.",
        category: "Society",
      },
      {
        year: 1995,
        title: "The Aum sarin attack",
        description:
          "Cult members release sarin gas on the Tokyo subway, killing 13 and wounding thousands — a blow to Japan's sense of safety.",
        category: "Society",
      },
      {
        year: 1997,
        title: "The Asian financial crisis",
        description:
          "Currency collapses ripple across Asia and into Japan, where banks and brokerages fail on a scale unseen since the war.",
        category: "Politics",
      },
      {
        year: 1999,
        title: "The Y2K scramble",
        description:
          "Engineers race to fix the millennium bug as the internet arrives at scale — a global technological anxiety dream.",
        category: "Technology",
      },
    ],
  },
  {
    decade: 2000,
    events: [
      {
        year: 2001,
        title: "Broadband arrives — NTT FLET'S",
        description:
          "NTT rolls out FTTH fiber and ADSL broadband, replacing the dial-up squeal with an always-on internet.",
        category: "Technology",
      },
      {
        year: 2003,
        title: "Digital terrestrial broadcasting",
        description:
          "Digital TV broadcasting begins in Tokyo, beginning the long transition that will end analog television a decade later.",
        category: "Technology",
      },
      {
        year: 2003,
        title: "The Iraq War",
        description:
          "Japan's Self-Defense Forces deploy to Iraq, their first armed dispatch to a war zone since 1945.",
        category: "Politics",
      },
      {
        year: 2007,
        title: "The iPhone",
        description:
          "Apple's iPhone rewires the pocket; smartphone culture begins its long march through Japanese trains and commutes.",
        category: "Technology",
      },
      {
        year: 2008,
        title: "The Lehman shock",
        description:
          "The global financial crisis hits; Japan slides into recession as export orders vanish overnight.",
        category: "Society",
      },
    ],
  },
  {
    decade: 2010,
    events: [
      {
        year: 2011,
        title: "Great East Japan Earthquake",
        description:
          "A magnitude 9.0 quake and tsunami strike Tohoku; the Fukushima nuclear disaster follows — the deepest national trauma since 1945.",
        category: "Society",
      },
      {
        year: 2013,
        title: "Tokyo wins the 2020 Olympics",
        description:
          "Tokyo is awarded the 2020 Summer Games, a bid promising recovery from disaster and a national rebirth on the world stage.",
        category: "Politics",
      },
      {
        year: 2015,
        title: "Netflix launches in Japan",
        description:
          "The streaming giant arrives, rewriting the distribution economics that studios, broadcasters, and animators have relied on for decades.",
        category: "Technology",
      },
      {
        year: 2016,
        title: "Pokémon GO",
        description:
          "Millions walk real streets hunting virtual creatures; augmented reality goes mainstream and a franchise legacy meets the smartphone.",
        category: "Culture",
      },
    ],
  },
  {
    decade: 2020,
    events: [
      {
        year: 2020,
        title: "The COVID-19 pandemic",
        description:
          "A global pandemic forces Japan into repeated states of emergency; masks, telework, and closed theaters reshape daily life.",
        category: "Society",
      },
      {
        year: 2021,
        title: "Tokyo 2020, without spectators",
        description:
          "The postponed Olympic Games are held behind closed doors — a muted celebration for a nation in retreat.",
        category: "Culture",
      },
      {
        year: 2022,
        title: "The yen at 32-year lows",
        description:
          "The currency plunges against the dollar as the Bank of Japan holds the line on ultralow interest rates.",
        category: "Politics",
      },
      {
        year: 2023,
        title: "Generative AI goes mainstream",
        description:
          "Generative AI floods the culture industries, igniting debate over labor, copyright, and the value of the handmade.",
        category: "Technology",
      },
      {
        year: 2025,
        title: "Osaka–Kansai Expo",
        description:
          "A new World's Fair opens on artificial islands in Osaka Bay — a vision of the future from an aging society.",
        category: "Culture",
      },
    ],
  },
];
