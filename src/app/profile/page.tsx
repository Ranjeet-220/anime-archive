import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, canReview } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { ROLE_LABELS, ratingColor } from "@/lib/format";
import { formatDate } from "@/lib/utils";
import { CollectionsManager } from "@/components/user/collections-manager";
import { NotesList } from "@/components/user/notes-list";
import { LogoutButton } from "@/components/user/logout-button";
import {
  Heart,
  ListVideo,
  NotebookPen,
  Star,
  BookOpen,
  ArrowRight,
  Shield,
  Award,
  Landmark,
  Compass,
  Film,
  Trophy,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

const BADGE_ICONS: Record<string, LucideIcon> = {
  Landmark,
  Star,
  Film,
  Compass,
  Award,
};

export const metadata: Metadata = {
  title: "Your profile",
  description: "Your Anime Archive profile, collections, notes and ratings.",
};

export default async function ProfilePage() {
  const session = await getSessionUser();
  if (!session) redirect("/login");

  const [user, collections, notes, ratings, badges, quizAttempts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.id },
      select: { username: true, email: true, name: true, bio: true, role: true, createdAt: true },
    }),
    prisma.collection.findMany({
      where: { userId: session.id },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { items: true } },
        items: {
          orderBy: { addedAt: "desc" },
          take: 12,
          include: { anime: { select: { id: true, slug: true, title: true, year: true } } },
        },
      },
    }),
    prisma.note.findMany({
      where: { userId: session.id },
      orderBy: { updatedAt: "desc" },
      take: 50,
      include: { anime: { select: { id: true, slug: true, title: true } } },
    }),
    prisma.rating.findMany({
      where: { userId: session.id },
      orderBy: { updatedAt: "desc" },
      include: { anime: { select: { id: true, slug: true, title: true } } },
    }),
    prisma.userBadge.findMany({
      where: { userId: session.id },
      orderBy: { earnedAt: "desc" },
      include: { badge: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      include: { quiz: { select: { slug: true, title: true } } },
    }),
  ]);

  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Profile" }]} />

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-paper">{user.username}</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone={user.role === "ADMIN" ? "crimson" : user.role === "EDITOR" ? "holo" : "default"}>
              {ROLE_LABELS[user.role]}
            </Badge>
            <span className="text-xs text-faint">Member since {formatDate(user.createdAt)}</span>
          </div>
          {user.bio ? <p className="mt-3 max-w-xl text-sm text-paper-2">{user.bio}</p> : null}
        </div>
        <LogoutButton />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/favorites"
          className="inline-flex items-center gap-2 rounded border border-line-2 px-3.5 py-2 text-xs text-muted transition-colors hover:border-crimson-500 hover:text-crimson-300"
        >
          <Heart className="h-3.5 w-3.5" aria-hidden /> Favorites
        </Link>
        <Link
          href="/watchlist"
          className="inline-flex items-center gap-2 rounded border border-line-2 px-3.5 py-2 text-xs text-muted transition-colors hover:border-crimson-500 hover:text-crimson-300"
        >
          <ListVideo className="h-3.5 w-3.5" aria-hidden /> Watchlist
        </Link>
        <Link
          href="/contribute"
          className="inline-flex items-center gap-2 rounded border border-line-2 px-3.5 py-2 text-xs text-muted transition-colors hover:border-crimson-500 hover:text-crimson-300"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden /> Contribute
        </Link>
        {canReview(user.role) ? (
          <Link
            href="/admin"
          className="inline-flex items-center gap-2 rounded border border-crimson-500/40 px-3.5 py-2 text-xs text-crimson-300 transition-colors hover:bg-crimson-500/10"
          >
            <Shield className="h-3.5 w-3.5" aria-hidden /> Admin dashboard
          </Link>
        ) : null}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <NotebookPen className="h-4 w-4 text-crimson-400" aria-hidden />
          <h2 className="font-display text-xl text-paper">My collections</h2>
        </div>
        <CollectionsManager
          collections={collections.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
          }))}
        />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <NotebookPen className="h-4 w-4 text-crimson-400" aria-hidden />
          <h2 className="font-display text-xl text-paper">My notes</h2>
        </div>
        {notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            description="Notes are saved from anime detail pages."
            className="py-10"
          />
        ) : (
          <NotesList
            notes={notes.map((n) => ({
              ...n,
              createdAt: n.createdAt.toISOString(),
              updatedAt: n.updatedAt.toISOString(),
            }))}
          />
        )}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-crimson-400" aria-hidden />
          <h2 className="font-display text-xl text-paper">Achievements</h2>
        </div>
        {badges.length === 0 && quizAttempts.length === 0 ? (
          <EmptyState
            title="No achievements yet"
            description="Take a quiz in the archive's examination hall to earn your first badge."
            action={
              <Link
                href="/quizzes"
                className="mt-1 inline-flex items-center gap-2 rounded border border-line-2 px-3.5 py-2 text-xs text-muted transition-colors hover:border-crimson-500 hover:text-crimson-300"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden /> Visit the quizzes
              </Link>
            }
          />
        ) : (
          <div className="space-y-6">
            {badges.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {badges.map(({ badge, earnedAt }) => {
                  const Icon = BADGE_ICONS[badge.icon ?? ""] ?? Award;
                  return (
                    <div key={badge.id} className="surface-card flex flex-col items-center gap-2 p-4 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-crimson-500/40 bg-crimson-500/10 text-crimson-300">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <p className="font-display text-sm text-paper">{badge.name}</p>
                      {badge.description ? (
                        <p className="text-xs leading-relaxed text-muted">{badge.description}</p>
                      ) : null}
                      <p className="text-[11px] text-faint">Earned {formatDate(earnedAt)}</p>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {quizAttempts.length > 0 ? (
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-crimson-400" aria-hidden />
                  <h3 className="font-display text-base text-paper">Quiz history</h3>
                </div>
                <ul className="divide-y divide-line/60 rounded-lg border border-line bg-charcoal/60">
                  {quizAttempts.map((a) => {
                    const pct = Math.round((a.score / a.maxScore) * 100);
                    return (
                      <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                        <Link
                          href={`/quiz/${a.quiz.slug}`}
                          className="inline-flex min-w-0 items-center gap-2 text-sm text-paper transition-colors hover:text-crimson-300"
                        >
                          {a.quiz.title}
                          <ArrowRight className="h-3 w-3 shrink-0 text-faint" aria-hidden />
                        </Link>
                        <div className="flex shrink-0 items-center gap-2.5">
                          {a.passed ? (
                            <span className="inline-flex items-center gap-1 rounded border border-ok/30 bg-ok/10 px-2 py-0.5 text-[11px] font-medium tracking-wide text-ok">
                              <CheckCircle2 className="h-3 w-3" aria-hidden /> Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded border border-line-2 px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted">
                              Attempted
                            </span>
                          )}
                          <span
                            className={`font-display text-sm tabular-nums ${
                              a.passed ? "text-ok" : "text-muted"
                            }`}
                          >
                            {a.score}/{a.maxScore} · {pct}%
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 text-crimson-400" aria-hidden />
          <h2 className="font-display text-xl text-paper">My ratings</h2>
        </div>
        {ratings.length === 0 ? (
          <EmptyState
            title="No ratings yet"
            description="Rate anime you've watched to help the archive's community scores."
            className="py-10"
          />
        ) : (
          <ul className="divide-y divide-line/60 rounded-lg border border-line bg-charcoal/60">
            {ratings.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <Link
                  href={`/anime/${r.anime.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-paper hover:text-crimson-300 transition-colors"
                >
                  {r.anime.title}
                  <ArrowRight className="h-3 w-3 text-faint" aria-hidden />
                </Link>
                <span className={`font-display text-sm tabular-nums ${ratingColor(r.score)}`}>
                  {r.score}/10
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}