import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminAnimeForm } from "@/components/user/admin-anime-form";
import { AdminEpisodesManager } from "@/components/user/admin-episodes-manager";

export const metadata: Metadata = {
  title: "Admin · Edit anime",
};

export default async function AdminAnimeEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [anime, studios, people, eras, genres] = await Promise.all([
    prisma.anime.findUnique({
      where: { slug },
      include: { genres: { select: { id: true } }, studio: { select: { id: true } }, director: { select: { id: true } }, creator: { select: { id: true } }, era: { select: { id: true } } },
    }),
    prisma.studio.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.person.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.era.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
    prisma.genre.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!anime) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Anime", href: "/admin/anime" }, { label: anime.title }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Edit — {anime.title}</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminAnimeForm
          mode="edit"
          initial={{
            slug: anime.slug,
            title: anime.title,
            japaneseTitle: anime.japaneseTitle,
            alternativeTitles: anime.alternativeTitles,
            synopsis: anime.synopsis,
            year: anime.year,
            format: anime.format,
            episodeCount: anime.episodeCount,
            duration: anime.duration,
            status: anime.status,
            sourceMaterial: anime.sourceMaterial,
            officialWebsite: anime.officialWebsite,
            releaseDate: anime.releaseDate ? anime.releaseDate.toISOString() : null,
            studioId: anime.studioId,
            directorId: anime.directorId,
            creatorId: anime.creatorId,
            eraId: anime.eraId,
            genreIds: anime.genres.map((g) => g.id),
          }}
          studios={studios}
          people={people}
          eras={eras}
          genres={genres}
        />
      </div>
      <div className="surface-panel p-6">
        <AdminEpisodesManager animeId={anime.id} />
      </div>
    </div>
  );
}