import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuizRunner, type QuizRunnerQuestion } from "@/components/user/quiz-runner";
import { getQuizBySlug } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz) return { title: "Quiz Not Found" };
  return {
    title: quiz.title,
    description: quiz.description ?? `Archive examination: ${quiz.title}.`,
    alternates: { canonical: `/quiz/${quiz.slug}` },
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  if (!quiz || !quiz.isPublished) notFound();

  const questions = Array.isArray(quiz.questions)
    ? (quiz.questions as unknown as QuizRunnerQuestion[])
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: quiz.title,
    description: quiz.description ?? undefined,
    url: `${SITE_URL}/quiz/${quiz.slug}`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Quizzes", href: "/quizzes" }, { label: quiz.title }]} />
      <div className="mt-6">
        <QuizRunner
          quiz={{
            slug: quiz.slug,
            title: quiz.title,
            description: quiz.description,
            questions,
            badge: quiz.badge,
          }}
        />
      </div>
    </div>
  );
}