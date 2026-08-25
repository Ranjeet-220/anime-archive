import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { FavoritesGrid } from "@/components/user/favorites-grid";

export const metadata: Metadata = {
  title: "My favorites",
  description: "Your favorite anime.",
};

export default async function FavoritesPage() {
  const session = await getSessionUser();
  if (!session) redirect("/login");

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    include: {
      anime: {
        select: {
          id: true,
          slug: true,
          title: true,
          japaneseTitle: true,
          year: true,
          coverUrl: true,
          format: true,
          averageRating: true,
          studio: { select: { slug: true, name: true } },
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-10 sm:px-8 lg:px-12">
      <Breadcrumbs items={[{ label: "Profile", href: "/profile" }, { label: "Favorites" }]} />
      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl text-paper">My favorites</h1>
        <p className="mt-2 text-sm text-muted">{favorites.length} saved title{favorites.length === 1 ? "" : "s"}.</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save anime you love from any anime detail page."
          action={
            <Link
              href="/anime"
              className="rounded border border-line-2 px-4 py-2 font-display text-xs tracking-wide text-paper transition-colors hover:border-crimson-500 hover:text-crimson-300"
            >
              Browse the archive
            </Link>
          }
        />
      ) : (
        <FavoritesGrid items={favorites} />
      )}
    </div>
  );
}