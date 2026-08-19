import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { QuizQuestionDto } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const quizSlug = req.nextUrl.searchParams.get("quizSlug") ?? "";
    if (!quizSlug) {
      return NextResponse.json({ error: "quizSlug is required." }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({ where: { slug: quizSlug }, select: { id: true } });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const attempt = await prisma.quizAttempt.findUnique({
      where: { userId_quizId: { userId: user.id, quizId: quiz.id } },
      select: { score: true, maxScore: true, passed: true, createdAt: true },
    });
    return NextResponse.json({ attempt });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/quiz-results]", err);
    return NextResponse.json({ error: "Failed to load quiz results." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const quizSlug = typeof body?.quizSlug === "string" ? body.quizSlug.trim() : "";
    const answers = Array.isArray(body?.answers) ? (body.answers as unknown[]) : null;

    if (!quizSlug || !answers) {
      return NextResponse.json({ error: "quizSlug and answers are required." }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { slug: quizSlug },
      select: { id: true, questions: true, badge: { select: { id: true, slug: true, name: true, icon: true } } },
    });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const questions = Array.isArray(quiz.questions)
      ? (quiz.questions as unknown as QuizQuestionDto[])
      : [];
    if (questions.length === 0) {
      return NextResponse.json({ error: "Quiz has no questions." }, { status: 400 });
    }
    if (answers.length !== questions.length || answers.some((a) => typeof a !== "number")) {
      return NextResponse.json({ error: "Answers must match the question count." }, { status: 400 });
    }

    let score = 0;
    questions.forEach((q, i) => {
      const chosen = answers[i] as number;
      if (Number.isInteger(chosen) && chosen >= 0 && chosen < q.options.length && chosen === q.correctIndex) {
        score += 1;
      }
    });
    const maxScore = questions.length;
    const passed = Math.round((score / maxScore) * 100) >= 80;

    const existing = await prisma.quizAttempt.findUnique({
      where: { userId_quizId: { userId: user.id, quizId: quiz.id } },
    });
    const attempt =
      existing && existing.score >= score
        ? existing
        : existing
          ? await prisma.quizAttempt.update({
              where: { id: existing.id },
              data: { score, maxScore, passed },
            })
          : await prisma.quizAttempt.create({
              data: { userId: user.id, quizId: quiz.id, score, maxScore, passed },
            });

    let badge: { slug: string; name: string; icon: string | null } | null = null;
    if (passed && quiz.badge) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: user.id, badgeId: quiz.badge.id } },
        update: {},
        create: { userId: user.id, badgeId: quiz.badge.id },
      });
      badge = { slug: quiz.badge.slug, name: quiz.badge.name, icon: quiz.badge.icon };
    }

    return NextResponse.json({
      score: attempt.score,
      maxScore: attempt.maxScore,
      passed: attempt.passed,
      badge,
    });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/quiz-results]", err);
    return NextResponse.json({ error: "Failed to save quiz results." }, { status: 500 });
  }
}

export const runtime = "nodejs";