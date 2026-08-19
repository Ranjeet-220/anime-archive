import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getQuizzes } from "@/lib/data";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Quizzes",
  description:
    "Test your knowledge of anime history — from the first shorts of 1917 to the modern masters — and earn archive badges.",
  alternates: { canonical: "/quizzes" },
};

export default async function QuizzesPage() {
  const [quizzes, session] = await Promise.all([getQuizzes(), getSessionUser()]);

  let earnedBadges = new Set<string>();
  if (session) {
    const rows = await prisma.userBadge.findMany({
      where: { userId: session.id },
      select: { badge: { select: { slug: true } } },
    });
    earnedBadges = new Set(rows.map((r) => r.badge.slug));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Quizzes" }]} />

      <div className="mt-4">
        <SectionHeading
          eyebrow="Examinations"
          title="QUIZZES — Test Your Knowledge of Anime History"
          description="The archive's curators have written short examinations on the defining eras of Japanese animation. Pass with 80% to earn a badge for your profile."
        />
      </div>

      {quizzes.length === 0 ? (
        <EmptyState
          title="No quizzes archived yet"
          description="The curators are still writing examinations. Check back soon."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const earned = quiz.badge ? earnedBadges.has(quiz.badge.slug) : false;
            return (
              <Link
                key={quiz.slug}
                href={`/quiz/${quiz.slug}`}
                className="lift group surface-card flex flex-col p-5 transition-colors hover:border-crimson-500/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <ClipboardCheck
                    className="h-5 w-5 text-crimson-400 transition-colors group-hover:text-crimson-300"
                    aria-hidden
                  />
                  {earned ? (
                    <Badge tone="ok">
                      <CheckCircle2 className="h-3 w-3" aria-hidden /> Badge earned
                    </Badge>
                  ) : quiz.badge ? (
                    <Badge tone="holo">Badge: {quiz.badge.name}</Badge>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-lg leading-snug text-paper group-hover:text-crimson-300 transition-colors">
                  {quiz.title}
                </h2>
                {quiz.description ? (
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{quiz.description}</p>
                ) : null}
                <p className="mt-4 pt-3 font-display text-[11px] uppercase tracking-[0.2em] text-faint border-t border-line">
                  {quiz.questionCount} question{quiz.questionCount === 1 ? "" : "s"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}