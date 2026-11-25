import "server-only";
import { pathToFileURL } from "node:url";
import { cached, CACHE_TTL_MS } from "@/lib/cache";

export const GLOBAL_SEARCH_MIN_LENGTH = 2;
export const GLOBAL_SEARCH_MAX_LENGTH = 100;
export const GLOBAL_SEARCH_LIMIT = 24;

interface GlobalAnimeMatch {
  id: number;
  title: string;
  format: string | null;
  year: number | null;
  matchedTitle: string | null;
  aniListId: number | null;
  malId: number | null;
}

interface ReadOnlyDatabase {
  prepare(sql: string): {
    all(params: Record<string, string | number>): unknown[];
  };
  close(): void;
}

export function isGlobalAnimeSearchEnabled() {
  return Boolean(process.env.ANIME_GLOBAL_DB_PATH?.trim());
}

export async function searchGlobalAnime(query: string): Promise<GlobalAnimeMatch[]> {
  const path = process.env.ANIME_GLOBAL_DB_PATH?.trim();
  const term = query.trim().slice(0, GLOBAL_SEARCH_MAX_LENGTH);
  if (!path || term.length < GLOBAL_SEARCH_MIN_LENGTH) return [];

  return cached(`global-anime:search:${term}`, CACHE_TTL_MS, async () => {
    const sqlite = process.getBuiltinModule("node:sqlite") as {
      DatabaseSync: new (path: URL, options: { readOnly: true }) => ReadOnlyDatabase;
    } | undefined;
    if (!sqlite) throw new Error("Global title search requires Node.js 24 or newer.");

    // The external database is a published snapshot without a WAL sidecar.
    const url = pathToFileURL(path);
    url.searchParams.set("immutable", "1");
    const db = new sqlite.DatabaseSync(url, { readOnly: true });
    try {
      const literal = term.replace(/[\\%_]/g, "\\$&");
      return db.prepare(`
        WITH matches AS (
          SELECT id AS anime_id, title, 1 AS canonical
          FROM animes
          WHERE title LIKE $contains ESCAPE '\\'
          UNION ALL
          SELECT anime_id, title, 0 AS canonical
          FROM titles_synonyms
          WHERE title LIKE $contains ESCAPE '\\'
        ),
        ranked AS (
          SELECT anime_id, title, canonical,
                 CASE
                   WHEN title = $term COLLATE NOCASE THEN 0
                   WHEN title LIKE $prefix ESCAPE '\\' THEN 1
                   ELSE 2
                 END AS rank
          FROM matches
        ),
        best AS (
          SELECT *, ROW_NUMBER() OVER (
            PARTITION BY anime_id ORDER BY rank, canonical DESC, LENGTH(title), title
          ) AS position
          FROM ranked
        )
        SELECT a.id, a.title, a.type AS format, a.year,
               CASE WHEN best.canonical = 0 AND a.title <> best.title COLLATE NOCASE
                    THEN best.title END AS matchedTitle,
               ids.anilist_id AS aniListId, ids.mal_id AS malId
        FROM best
        JOIN animes AS a ON a.id = best.anime_id
        LEFT JOIN id_crosswalks AS ids ON ids.anime_id = a.id
        WHERE best.position = 1
        ORDER BY best.rank, best.canonical DESC, LENGTH(best.title),
                 (ids.anilist_id > 0 OR ids.mal_id > 0) DESC NULLS LAST,
                 a.year ASC NULLS LAST, a.title COLLATE NOCASE, a.id
        LIMIT $limit
      `).all({ term, contains: `%${literal}%`, prefix: `${literal}%`, limit: GLOBAL_SEARCH_LIMIT }) as GlobalAnimeMatch[];
    } finally {
      db.close();
    }
  });
}
