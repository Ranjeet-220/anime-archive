import { prisma } from "../../src/lib/prisma";
import { slugify } from "../../src/lib/utils";

const releases = [
  {
    slug: "devils-crest", title: "Devils' Crest", japaneseTitle: "デモンズ・クレスト",
    aliases: ["Demons' Crest", "Demonzu Kuresuto"], date: "2026-11-06", series: true,
    synopsis: "Yuma Ashihara and his classmates enter Actual Magic, a full-sensory online role-playing game. When its rules spill into their world, the children have to work out which dangers follow them beyond the game.",
    studio: "production-ig", director: "Kenichiro Komaya", material: "Light novel by Reki Kawahara",
    genres: ["action", "fantasy", "adventure"], website: "https://demonscrest-anime.com/",
    credits: [["Shinji Ushiro", "Chief director"], ["Reki Kawahara", "Original author"], ["Yukiko Horiguchi", "Character design"]],
    cast: [["Yuma Ashihara", "Haruka Shiraishi"], ["Sawa Ashihara", "Konomi Inagaki"]],
    art: "https://demonscrest-anime.com/core_sys/images/main/home/kv01.jpg",
  },
  {
    slug: "grotesqqque", title: "GROTESQQQUE", japaneseTitle: "グロテスク",
    aliases: ["Gurotesuku"], date: "2026-11-06",
    synopsis: "Three animated stories share a feature-length programme. A(E)LIENS, YOROSHIKU Girl and NOCTURNE: NUIT GROTESQUE each take their own approach to drawing, movement and music.",
    studio: "cloverworks", director: "Atsushi Nishigori", material: "Original anthology",
    genres: ["drama", "science-fiction"], website: "https://movie-gtq123.com/",
    trailer: "https://www.youtube.com/watch?v=s4dAQP5MlCs", art: "https://movie-gtq123.com/assets/img/ogp_1.png",
  },
  {
    slug: "resonance-from-the-heart", title: "Expelled from Paradise: Resonance from the Heart", japaneseTitle: "楽園追放 心のレゾナンス",
    aliases: ["Rakuen Tsuiho: Kokoro no Resonance", "Expelled from Paradise: Resonance"], date: "2026-11-13", duration: 128,
    synopsis: "Gabriel and other agents of DEVA are sent to Earth to investigate the Fallen. The mission returns to the divide between a digital society and the people who live outside it, first explored in the 2014 film.",
    studio: "toei-animation", director: "Seiji Mizushima", material: "Original sequel to Expelled from Paradise (2014)",
    genres: ["science-fiction", "action"], website: "https://rakuen-tsuiho-r.com/",
    credits: [["Gen Urobuchi", "Screenplay"]], cast: [["Gabriel", "Ayane Sakura"]],
    trailer: "https://www.youtube.com/watch?v=vHrQkINUAbk", art: "https://rakuen-tsuiho.com/share/images/mv_2.jpg",
  },
  {
    slug: "votoms-die-graue-hexe", title: "Armored Trooper VOTOMS: Die Graue Hexe Part 1", japaneseTitle: "装甲騎兵ボトムズ 灰色の魔女 第1部",
    aliases: ["Armored Trooper VOTOMS: The Gray Witch", "Soukou Kihei Votoms: Haiiro no Majo"], date: "2026-11-20", duration: 100,
    synopsis: "In the closing days of the Hundred Years’ War, an investigator follows the trail of a pilot in a penal unit. Again and again, the soldier known as the Gray Witch comes back from missions that destroy the rest of the squad.",
    studio: "production-ig", director: "Mamoru Oshii", material: "Armored Trooper VOTOMS franchise",
    genres: ["science-fiction", "mecha", "military"], website: "https://www.votoms-gh.com/", art: "https://www.votoms-gh.com/assets/img/top/kv3_0.webp",
  },
  {
    slug: "witch-on-the-holy-night", title: "Witch on the Holy Night", japaneseTitle: "魔法使いの夜",
    aliases: ["Mahoutsukai no Yoru", "Mahoyo"], date: "2026-11-20",
    synopsis: "High school student Aoko Aozaki studies magic at the hilltop mansion she shares with Alice Kuonji. The arrival of a young man from the countryside brings an outsider into their secretive household.",
    studio: "ufotable", director: "Masashi Takeuchi", material: "Visual novel by Kinoko Nasu and TYPE-MOON",
    genres: ["fantasy", "magic", "drama"], website: "https://mahoyo-movie.com/",
    credits: [["Hikaru Kondo", "Chief director"], ["Hideyuki Fukasawa", "Music"], ["Kinoko Nasu", "Original author"]],
    art: "https://mahoyo-movie.com/assets/img/top/kv/ph_6.webp",
  },
];

export async function addNovemberReleases() {
  let added = 0;
  for (const r of releases) {
    const created = await prisma.$transaction(async (tx) => {
      const names = [r.title, r.japaneseTitle, ...r.aliases];
      const existing = await tx.anime.findFirst({ where: { OR: [
        { slug: r.slug }, { title: { in: names, mode: "insensitive" } },
        { japaneseTitle: { in: names } }, { alternativeTitles: { hasSome: names } },
      ] }, select: { id: true } });
      if (existing) return false;
      const staff = [];
      for (const [name, role] of [[r.director, "Director"], ...(r.credits ?? [])]) {
        const person = await tx.person.upsert({ where: { slug: slugify(name) }, update: {},
          create: { name, slug: slugify(name), role } });
        staff.push({ personId: person.id, role });
      }
      const anime = await tx.anime.create({ data: {
        slug: r.slug, title: r.title, japaneseTitle: r.japaneseTitle, alternativeTitles: r.aliases,
        synopsis: r.synopsis, year: 2026, decade: 2020, releaseDate: new Date(r.date),
        format: r.series ? "ONA" : "MOVIE", status: r.series ? "AIRING" : "FINISHED",
        duration: r.duration, episodeCount: r.series ? null : 1, sourceMaterial: r.material,
        officialWebsite: r.website, trailerUrl: r.trailer, isDemoData: false,
        coverUrl: `/anime-cards/${r.slug}.webp`, studio: { connect: { slug: r.studio } },
        director: { connect: { slug: slugify(r.director) } }, staff: { createMany: { data: staff } },
        era: { connect: { slug: "modern-anime" } }, genres: { connect: r.genres.map(slug => ({ slug })) },
        characters: { create: (r.cast ?? []).map(([name, voiceActorName]) => ({
          name, voiceActorName, slug: r.slug + "-" + slugify(name),
        })) },
        historyTimeline: [{ label: "Japanese premiere", year: r.date, text: r.series ? "Streaming premiere." : "Japanese theatrical release." }],
      } });
      await tx.source.createMany({ data: [[r.website, "Official production website"], [r.art, "Official promotional artwork"]].map(([sourceUrl, sourceTitle]) => ({
        entityType: "anime", entityId: anime.id, sourceUrl, sourceName: r.title, sourceTitle,
        verificationStatus: "VERIFIED", verificationDate: new Date("2026-11-22"),
      })) });
      return true;
    });
    if (created) added++;
  }
  return added;
}
