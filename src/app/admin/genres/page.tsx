import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GenreAddForm } from "@/components/user/genre-add-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin · Genres",
};

export default async function AdminGenresPage() {
  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { anime: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Genres" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Genres</h1>
        <p className="mt-1 text-sm text-muted">{genres.length} genres.</p>
      </div>

      <section className="max-w-lg">
        <h2 className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-muted">Add genre</h2>
        <GenreAddForm />
      </section>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium">Slug</th>
              <th className="px-3 py-2.5 font-medium text-right">Anime</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((g) => (
              <tr key={g.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <span className="text-paper">{g.name}</span>
                  {g.japaneseName ? <span className="ml-2 font-jp text-xs text-faint">{g.japaneseName}</span> : null}
                </td>
                <td className="px-3 py-2.5">
                  <Badge>{g.slug}</Badge>
                </td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{g._count.anime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}