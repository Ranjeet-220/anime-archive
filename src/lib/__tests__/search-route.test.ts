import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));

const mockPrisma = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  anime: {
    findMany: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

const mockSearchAll = vi.hoisted(() => vi.fn());

vi.mock("@/lib/data", () => ({
  searchAll: mockSearchAll,
}));

import { GET } from "@/app/api/search/route";

describe("GET /api/search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 if query is missing or shorter than 2 chars", async () => {
    const req1 = new NextRequest("http://localhost:3000/api/search?q=");
    const res1 = await GET(req1);
    expect(res1.status).toBe(400);

    const req2 = new NextRequest("http://localhost:3000/api/search?q=a");
    const res2 = await GET(req2);
    expect(res2.status).toBe(400);
  });

  it("returns searchAll results and handles pg_trgm gracefully when pg_trgm fails", async () => {
    mockSearchAll.mockResolvedValue([
      {
        type: "anime",
        slug: "akira",
        title: "Akira",
        year: 1988,
        format: "MOVIE",
      },
    ]);

    // Simulate pg_trgm throwing (e.g. extension not installed)
    mockPrisma.$queryRaw.mockRejectedValue(new Error('function similarity does not exist'));

    const req = new NextRequest("http://localhost:3000/api/search?q=akira");
    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toHaveLength(1);
    expect(body.results[0].slug).toBe("akira");
  });

  it("merges pg_trgm fuzzy matches into results when available", async () => {
    mockSearchAll.mockResolvedValue([]);

    // pg_trgm returns a matching slug
    mockPrisma.$queryRaw.mockResolvedValue([{ slug: "evangelion" }]);
    mockPrisma.anime.findMany.mockResolvedValue([
      {
        slug: "evangelion",
        title: "Neon Genesis Evangelion",
        japaneseTitle: "新世紀エヴァンゲリオン",
        year: 1995,
        format: "TV",
      },
    ]);

    const req = new NextRequest("http://localhost:3000/api/search?q=evang");
    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toHaveLength(1);
    expect(body.results[0].slug).toBe("evangelion");
    expect(body.results[0].title).toBe("Neon Genesis Evangelion");
  });

  it("returns 500 when searchAll throws an unexpected error", async () => {
    mockSearchAll.mockRejectedValue(new Error("Database connection error"));

    const req = new NextRequest("http://localhost:3000/api/search?q=gundam");
    const res = await GET(req);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Internal server error.");
  });
});
