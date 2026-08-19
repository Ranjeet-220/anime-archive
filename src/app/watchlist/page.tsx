import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { WatchlistTable } from "@/components/user/watchlist-table";

export const metadata: Metadata = {
  title: "My watchlist",
  description: "Your anime watchlist, grouped by status.",
};

export default async function WatchlistPage() {
  const session = await getSessionUser();
  if (!session) redirect("/login");

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.id },
    orderBy: { updatedAt: "desc" },
    include: {
      anime: {
        select: {
          id: true,
          slug: true,
          title: true,
          year: true,
          format: true,
          averageRating: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Profile", href: "/profile" }, { label: "Watchlist" }]} />
      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl text-paper">My watchlist</h1>
        <p className="mt-2 text-sm text-muted">{items.length} title{items.length === 1 ? "" : "s"} tracked. Add anime from any detail page.</p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          description="Track what you're watching, planning, or have completed."
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
        <WatchlistTable
        items={items.map((i) => ({ ...i, updatedAt: i.updatedAt.toISOString() }))}
      />
      )}
    </div>
  );
}