-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "methodology" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingItem" (
    "id" TEXT NOT NULL,
    "rankingId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "RankingItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_slug_key" ON "Ranking"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RankingItem_rankingId_animeId_key" ON "RankingItem"("rankingId", "animeId");

-- CreateIndex
CREATE UNIQUE INDEX "RankingItem_rankingId_rank_key" ON "RankingItem"("rankingId", "rank");

-- CreateIndex
CREATE INDEX "RankingItem_animeId_idx" ON "RankingItem"("animeId");

-- AddForeignKey
ALTER TABLE "RankingItem" ADD CONSTRAINT "RankingItem_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingItem" ADD CONSTRAINT "RankingItem_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;