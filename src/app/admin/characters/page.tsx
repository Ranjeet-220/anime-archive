import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DeleteButton } from "@/components/user/delete-button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Characters",
};

export default async function AdminCharactersPage() {
  const characters = await prisma.character.findMany({
    orderBy: { name: "asc" },
    take: 500,
    include: { anime: { select: { slug: true, title: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Characters" }]} />
          <h1 className="mt-4 font-display text-2xl text-paper">Characters</h1>
          <p className="mt-1 text-sm text-muted">{characters.length} characters (showing first 500).</p>
        </div>
        <Link
          href="/admin/characters/new"
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs tracking-wide text-paper hover:bg-crimson-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add character
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium">Role</th>
              <th className="px-3 py-2.5 font-medium">Voice actor</th>
              <th className="px-3 py-2.5 font-medium">Anime</th>
              <th className="px-3 py-2.5 font-medium w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((c) => (
              <tr key={c.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <Link href={`/character/${c.slug}`} className="text-paper hover:text-crimson-300 transition-colors">
                    {c.name}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-muted">{c.role ?? "—"}</td>
                <td className="px-3 py-2.5 text-muted">{c.voiceActorName ?? "—"}</td>
                <td className="px-3 py-2.5 text-muted">
                  {c.anime ? (
                    <Link href={`/anime/${c.anime.slug}`} className="hover:text-holo-300 transition-colors">
                      {c.anime.title}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/characters/${c.slug}`}
                      className="rounded border border-line-2 px-2 py-1 text-[11px] text-muted hover:text-paper transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      url={`/api/admin/characters/${c.id}`}
                      label="Delete"
                      confirmText={`Delete "${c.name}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}