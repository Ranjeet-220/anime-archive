-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'CONTRIBUTOR', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AnimeFormat" AS ENUM ('TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'WEB');

-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('FINISHED', 'AIRING', 'UPCOMING', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "ContributionStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'PUBLISHED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContributionType" AS ENUM ('NEW_ANIME', 'NEW_CREATOR', 'NEW_STUDIO', 'NEW_SOURCE', 'CORRECTION', 'REPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "EventKind" AS ENUM ('PREMIERE', 'RELEASE', 'FOUNDING', 'MILESTONE', 'INDUSTRY', 'BIRTH', 'DEATH', 'AWARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "japaneseTitle" TEXT,
    "alternativeTitles" TEXT[],
    "synopsis" TEXT,
    "releaseDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "year" INTEGER,
    "decade" INTEGER,
    "format" "AnimeFormat" NOT NULL DEFAULT 'TV',
    "episodeCount" INTEGER,
    "duration" INTEGER,
    "status" "AnimeStatus" NOT NULL DEFAULT 'UNKNOWN',
    "sourceMaterial" TEXT,
    "officialWebsite" TEXT,
    "trailerUrl" TEXT,
    "coverUrl" TEXT,
    "backdropUrl" TEXT,
    "historicalSignificance" TEXT,
    "productionHistory" TEXT,
    "reception" TEXT,
    "awards" TEXT,
    "culturalImpact" TEXT,
    "legacy" TEXT,
    "historyTimeline" JSONB,
    "isDemoData" BOOLEAN NOT NULL DEFAULT true,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eraId" TEXT,
    "studioId" TEXT,
    "creatorId" TEXT,
    "directorId" TEXT,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeRelation" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "relatedId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AnimeRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Era" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "order" INTEGER NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Era_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "japaneseName" TEXT,
    "foundedYear" INTEGER,
    "headquarters" TEXT,
    "founders" TEXT,
    "history" TEXT,
    "techniques" TEXT,
    "significance" TEXT,
    "status" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "japaneseName" TEXT,
    "role" TEXT,
    "bornYear" INTEGER,
    "diedYear" INTEGER,
    "birthplace" TEXT,
    "biography" TEXT,
    "career" TEXT,
    "majorWorks" TEXT,
    "awards" TEXT,
    "contribution" TEXT,
    "website" TEXT,
    "profileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonCredit" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "PersonCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudioPerson" (
    "id" TEXT NOT NULL,
    "studioId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "StudioPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "japaneseName" TEXT,
    "role" TEXT,
    "biography" TEXT,
    "imageUrl" TEXT,
    "voiceActorName" TEXT,
    "animeId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT,
    "airDate" TIMESTAMP(3),
    "synopsis" TEXT,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "japaneseName" TEXT,
    "description" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalEvent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "description" TEXT,
    "kind" "EventKind" NOT NULL DEFAULT 'MILESTONE',
    "eraId" TEXT,
    "animeId" TEXT,
    "studioId" TEXT,
    "personId" TEXT,

    CONSTRAINT "HistoricalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceTitle" TEXT,
    "author" TEXT,
    "publisher" TEXT,
    "verificationDate" TIMESTAMP(3),
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "contributorId" TEXT,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "type" "ContributionType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "payload" JSONB,
    "status" "ContributionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "reviewerNotes" TEXT,
    "userId" TEXT NOT NULL,
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'PLANNED',
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeGenres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnimeGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_slug_key" ON "Anime"("slug");

-- CreateIndex
CREATE INDEX "Anime_year_idx" ON "Anime"("year");

-- CreateIndex
CREATE INDEX "Anime_decade_idx" ON "Anime"("decade");

-- CreateIndex
CREATE INDEX "Anime_format_idx" ON "Anime"("format");

-- CreateIndex
CREATE INDEX "Anime_status_idx" ON "Anime"("status");

-- CreateIndex
CREATE INDEX "Anime_eraId_idx" ON "Anime"("eraId");

-- CreateIndex
CREATE INDEX "Anime_studioId_idx" ON "Anime"("studioId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeRelation_animeId_relatedId_type_key" ON "AnimeRelation"("animeId", "relatedId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Era_slug_key" ON "Era"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_slug_key" ON "Studio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Person_slug_key" ON "Person"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PersonCredit_animeId_personId_role_key" ON "PersonCredit"("animeId", "personId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "StudioPerson_studioId_personId_key" ON "StudioPerson"("studioId", "personId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_slug_key" ON "Character"("slug");

-- CreateIndex
CREATE INDEX "Character_animeId_idx" ON "Character"("animeId");

-- CreateIndex
CREATE INDEX "Episode_animeId_idx" ON "Episode"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_animeId_number_key" ON "Episode"("animeId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricalEvent_slug_key" ON "HistoricalEvent"("slug");

-- CreateIndex
CREATE INDEX "HistoricalEvent_year_idx" ON "HistoricalEvent"("year");

-- CreateIndex
CREATE INDEX "HistoricalEvent_month_idx" ON "HistoricalEvent"("month");

-- CreateIndex
CREATE INDEX "HistoricalEvent_day_idx" ON "HistoricalEvent"("day");

-- CreateIndex
CREATE INDEX "HistoricalEvent_eraId_idx" ON "HistoricalEvent"("eraId");

-- CreateIndex
CREATE INDEX "Source_entityType_entityId_idx" ON "Source"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Contribution_status_idx" ON "Contribution"("status");

-- CreateIndex
CREATE INDEX "Contribution_userId_idx" ON "Contribution"("userId");

-- CreateIndex
CREATE INDEX "Favorite_animeId_idx" ON "Favorite"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_animeId_key" ON "Favorite"("userId", "animeId");

-- CreateIndex
CREATE INDEX "WatchlistItem_animeId_idx" ON "WatchlistItem"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_animeId_key" ON "WatchlistItem"("userId", "animeId");

-- CreateIndex
CREATE INDEX "Rating_animeId_idx" ON "Rating"("animeId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_animeId_key" ON "Rating"("userId", "animeId");

-- CreateIndex
CREATE INDEX "Note_userId_animeId_idx" ON "Note"("userId", "animeId");

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_collectionId_animeId_key" ON "CollectionItem"("collectionId", "animeId");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "_AnimeGenres_B_index" ON "_AnimeGenres"("B");

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "Era"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeRelation" ADD CONSTRAINT "AnimeRelation_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeRelation" ADD CONSTRAINT "AnimeRelation_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonCredit" ADD CONSTRAINT "PersonCredit_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonCredit" ADD CONSTRAINT "PersonCredit_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioPerson" ADD CONSTRAINT "StudioPerson_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioPerson" ADD CONSTRAINT "StudioPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeGenres" ADD CONSTRAINT "_AnimeGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeGenres" ADD CONSTRAINT "_AnimeGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
