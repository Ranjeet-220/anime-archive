import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ContributeForm, WorkflowDiagram } from "@/components/user/contribute-form";
import { CONTRIBUTION_TYPE_LABELS, CONTRIBUTION_STATUS_LABELS } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Contribute corrections, new entries and sources to Anime Archive.",
};

export default async function ContributePage() {
  const session = await getSessionUser();
  const myContributions = session
    ? await prisma.contribution.findMany({
        where: { userId: session.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Contribute" }]} />

      <div className="mt-6 mb-10">
        <p className="mb-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">Community</p>
        <h1 className="font-display text-3xl text-paper">Contribute to the archive</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Anime Archive is built on verified research. If you spot an error, know a missing landmark
          work, studio or creator, or have a source to share — submit it here. Every contribution is
          reviewed by an editor before it is published.
        </p>
      </div>

      <section className="surface-panel p-6">
        {session ? (
          <ContributeForm />
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-muted">
              You must be{" "}
              <a href="/login" className="text-holo-300 underline underline-offset-2 hover:text-holo-400">
                signed in
              </a>{" "}
              to contribute.
            </p>
            <p className="mt-2 text-xs text-faint">
              No account yet?{" "}
              <a href="/register" className="text-holo-300 underline underline-offset-2 hover:text-holo-400">
                Create one
              </a>
              .
            </p>
          </div>
        )}
      </section>

      <section className="mt-10">
        <WorkflowDiagram />
      </section>

      {myContributions.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl text-paper">My contributions</h2>
          <ul className="divide-y divide-line/60 rounded-lg border border-line bg-charcoal/60">
            {myContributions.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm text-paper truncate">{c.title}</p>
                  <p className="mt-0.5 text-xs text-faint">
                    {CONTRIBUTION_TYPE_LABELS[c.type] ?? c.type} ·{" "}
                    {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
                <Badge
                  tone={
                    c.status === "PUBLISHED" ? "ok" : c.status === "REJECTED" ? "crimson" : c.status === "VERIFIED" ? "warn" : "neutral"
                  }
                >
                  {CONTRIBUTION_STATUS_LABELS[c.status]}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}