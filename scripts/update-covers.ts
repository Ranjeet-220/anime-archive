import { prisma } from "../src/lib/prisma";

const ANILIST_API = "https://graphql.anilist.co";

async function fetchAniListCover(searchTitle: string): Promise<string | null> {
  const query = `
    query ($search: String) {
      Media (search: $search, type: ANIME) {
        coverImage { extraLarge large medium }
      }
    }
  `;
  try {
    const res = await fetch(ANILIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables: { search: searchTitle } }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.Media?.coverImage?.large ?? data.data?.Media?.coverImage?.medium ?? null;
  } catch {
    return null;
  }
}

async function main() {
  console.log("Updating anime covers from AniList API...");
  const animeList = await prisma.anime.findMany({ select: { id: true, title: true, slug: true, coverUrl: true } });
  
  let updated = 0;
  for (const a of animeList) {
    const cleanTitle = a.title.replace(/\s*\(.*?\)/g, "").trim();
    console.log(`Searching cover for: ${a.title} (${cleanTitle})...`);
    const url = await fetchAniListCover(cleanTitle);
    if (url) {
      await prisma.anime.update({
        where: { id: a.id },
        data: { coverUrl: url },
      });
      console.log(`  -> SUCCESS: ${url}`);
      updated++;
    } else {
      console.log(`  -> NOT FOUND`);
    }
    // Small delay to prevent rate limits
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\nSuccessfully updated ${updated}/${animeList.length} anime covers!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
