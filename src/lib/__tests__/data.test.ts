import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock server-only
vi.mock("server-only", () => ({}));

// Hoist mock prisma
const mockPrisma = vi.hoisted(() => ({
  anime: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    groupBy: vi.fn(),
  },
  studio: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  person: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  character: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  genre: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  historicalEvent: {
    count: vi.fn(),
    findMany: vi.fn(),
  },
  quiz: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  quizAttempt: {
    findMany: vi.fn(),
  },
  tour: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  ranking: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  source: {
    findMany: vi.fn(),
  },
  era: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  $queryRaw: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

// Mock cache to directly run factory function
vi.mock("@/lib/cache", () => ({
  CACHE_TTL_MS: 300000,
  cached: vi.fn((_key: string, _ttl: number, fn: () => Promise<unknown>) => fn()),
  invalidateCacheTags: vi.fn(),
}));

import {
  getAnimeList,
  getAnimeBySlug,
  getStudioArchive,
  getRankings,
  getRankingBySlug,
  getQuizLeaderboard,
  searchAll,
} from "@/lib/data";

describe("src/lib/data.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAnimeList query building", () => {
    it("filters isMovie correctly for true and false", async () => {
      mockPrisma.anime.count.mockResolvedValue(0);
      mockPrisma.anime.findMany.mockResolvedValue([]);

      // Test isMovie: true
      await getAnimeList({ isMovie: true });
      expect(mockPrisma.anime.findMany).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ format: "MOVIE" }),
        })
      );

      // Test isMovie: false
      await getAnimeList({ isMovie: false });
      expect(mockPrisma.anime.findMany).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ format: { not: "MOVIE" } }),
        })
      );
    });

    it("handles NaN parameters safely without crashing Prisma", async () => {
      mockPrisma.anime.count.mockResolvedValue(0);
      mockPrisma.anime.findMany.mockResolvedValue([]);

      await getAnimeList({
        year: NaN,
        decade: NaN,
        minEpisodes: NaN,
        maxEpisodes: NaN,
      });

      expect(mockPrisma.anime.findMany).toHaveBeenCalled();
      const whereArg = mockPrisma.anime.findMany.mock.calls[0][0].where;
      expect(whereArg.year).toBeUndefined();
      expect(whereArg.episodeCount).toBeUndefined();
    });
  });

  describe("slug null guards", () => {
    it("returns null immediately when slug is empty or not a string", async () => {
      expect(await getAnimeBySlug("")).toBeNull();
      expect(await getAnimeBySlug(null as unknown as string)).toBeNull();
      expect(await getRankingBySlug("")).toBeNull();
      expect(mockPrisma.anime.findUnique).not.toHaveBeenCalled();
      expect(mockPrisma.ranking.findUnique).not.toHaveBeenCalled();
    });
  });

  describe("getStudioArchive", () => {
    it("uses _count.anime instead of limiting count to major works take: 4", async () => {
      mockPrisma.studio.findMany.mockResolvedValue([
        {
          id: "1",
          slug: "toei-animation",
          name: "Toei Animation",
          japaneseName: "東映アニメーション",
          foundedYear: 1948,
          history: "Pioneer",
          status: "Active",
          _count: { anime: 45 },
          anime: [
            { slug: "dragon-ball-z", title: "Dragon Ball Z", year: 1989 },
            { slug: "one-piece", title: "One Piece", year: 1999 },
          ],
        },
      ]);

      const result = await getStudioArchive();
      expect(result[0].animeCount).toBe(45);
      expect(result[0].majorWorks).toHaveLength(2);
    });
  });

  describe("getRankings", () => {
    it("filters out items where anime is null", async () => {
      mockPrisma.ranking.findMany.mockResolvedValue([
        {
          id: "r1",
          slug: "most-popular",
          name: "Most Popular",
          tagline: null,
          description: null,
          methodology: null,
          items: [
            {
              rank: 1,
              note: "Top",
              anime: { slug: "aot", title: "AoT", year: 2013, format: "TV", averageRating: 9, coverUrl: null, studio: null },
            },
            {
              rank: 2,
              note: "Missing",
              anime: null,
            },
          ],
        },
      ]);

      const result = await getRankings();
      expect(result[0].items).toHaveLength(1);
      expect(result[0].itemCount).toBe(1);
      expect(result[0].items[0].anime.slug).toBe("aot");
    });
  });

  describe("getQuizLeaderboard", () => {
    it("returns mapped user leaderboard records", async () => {
      mockPrisma.quizAttempt.findMany.mockResolvedValue([
        {
          score: 5,
          maxScore: 5,
          passed: true,
          createdAt: new Date("2026-01-01"),
          user: { username: "alice", name: "Alice" },
        },
      ]);

      const result = await getQuizLeaderboard("classic-era", 5);
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe("alice");
      expect(result[0].score).toBe(5);
      expect(result[0].passed).toBe(true);
    });
  });

  describe("searchAll", () => {
    it("returns empty array for empty or whitespace query", async () => {
      expect(await searchAll("")).toEqual([]);
      expect(await searchAll("   ")).toEqual([]);
      expect(mockPrisma.anime.findMany).not.toHaveBeenCalled();
    });

    it("clamps very long queries and limits properly", async () => {
      mockPrisma.anime.findMany.mockResolvedValue([]);
      mockPrisma.character.findMany.mockResolvedValue([]);
      mockPrisma.studio.findMany.mockResolvedValue([]);
      mockPrisma.person.findMany.mockResolvedValue([]);
      mockPrisma.historicalEvent.findMany.mockResolvedValue([]);

      mockPrisma.$queryRaw.mockResolvedValue([{ id: "alias-match" }]);
      const longQ = "a".repeat(300);
      await searchAll(longQ, 10);

      expect(mockPrisma.anime.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              { title: { contains: "a".repeat(100), mode: "insensitive" } },
              { id: { in: ["alias-match"] } },
            ]),
          }),
          take: 10,
        })
      );
    });
  });
});
