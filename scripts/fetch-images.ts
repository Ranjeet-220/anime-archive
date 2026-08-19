import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "AnimeArchive/1.0 (educational demo project; contact: admin@animearchive.local)";

const FREE_LICENSE = /^(public domain|cc0|cc by( |-|_|-sa)|pd-)/i;
const BLOCKED_LICENSE = /fair use|all rights|cc by-nc|noncommercial/i;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type SearchItem = {
  imageinfo?: Array<{
    thumburl?: string;
    url?: string;
    width?: number;
    extmetadata?: Record<string, { value?: string }>;
  }>;
  title?: string;
};

async function searchCommons(query: string, width = 500): Promise<SearchItem[]> {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: String(width),
    format: "json",
    origin: "*",
  });
  const res = await fetch(`${API}?${params}`, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { query?: { pages?: Record<string, SearchItem> } };
  return data.query?.pages ? Object.values(data.query.pages) : [];
}

function isFree(item: SearchItem): boolean {
  const meta = item.imageinfo?.[0]?.extmetadata;
  const name = meta?.LicenseShortName?.value ?? meta?.License?.value ?? "";
  return FREE_LICENSE.test(name) && !BLOCKED_LICENSE.test(name);
}

function pickBest(items: SearchItem[], title: string): string | null {
  const free = items.filter((it) => it.imageinfo?.[0]?.thumburl && isFree(it));
  if (free.length === 0) return null;
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  const words = t.split(" ").filter(Boolean);
  const penalty = /cosplay|convention|festival|figurine|figure|model ?kit|statue|kushida|event|costume/i;
  const scored = free.map((it) => {
    const file = it.title?.toLowerCase().replace(/[^a-z0-9]+/g, " ") ?? "";
    let score = 0;
    if (words.every((w) => file.includes(w))) score += 100;
    else if (words.slice(0, 2).every((w) => file.includes(w))) score += 60;
    if (penalty.test(file)) score -= 50;
    score += Math.min((it.imageinfo?.[0]?.width ?? 0) / 1000, 10);
    return { item: it, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0].item.imageinfo?.[0];
  return best?.thumburl ?? best?.url ?? null;
}

async function main() {
  console.log("Fetching free-licensed images from Wikimedia Commons…\n");

  const anime = await prisma.anime.findMany({ select: { id: true, title: true, coverUrl: true } });
  const studios = await prisma.studio.findMany({ select: { id: true, name: true, logoUrl: true } });

  let animeHits = 0;
  for (const a of anime) {
    if (a.coverUrl) {
      console.log(`ANIME  skip  ${a.title} (already has cover)`);
      continue;
    }
    const queries = [
      `${a.title} anime`,
      `${a.title} film`,
      `${a.title} logo`,
      `${a.title} screenshot`,
    ];
    let url: string | null = null;
    for (const q of queries) {
      const items = await searchCommons(q);
      url = pickBest(items, a.title);
      if (url) break;
      await sleep(500);
    }
    if (url) {
      await prisma.anime.update({ where: { id: a.id }, data: { coverUrl: url } });
      animeHits++;
      console.log(`ANIME  OK    ${a.title}`);
    } else {
      console.log(`ANIME  MISS  ${a.title}`);
    }
    await sleep(800);
  }

  let studioHits = 0;
  for (const s of studios) {
    if (s.logoUrl) continue;
    const queries = [`${s.name} headquarters`, `${s.name} studio logo`, `${s.name} logo`];
    let url: string | null = null;
    for (const q of queries) {
      const items = await searchCommons(q);
      url = pickBest(items, s.name);
      if (url) break;
      await sleep(500);
    }
    if (url) {
      await prisma.studio.update({ where: { id: s.id }, data: { logoUrl: url } });
      studioHits++;
      console.log(`STUDIO OK    ${s.name}`);
    } else {
      console.log(`STUDIO MISS  ${s.name}`);
    }
    await sleep(800);
  }

  console.log(`\nDone: ${animeHits}/${anime.length} anime, ${studioHits}/${studios.length} studios`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
