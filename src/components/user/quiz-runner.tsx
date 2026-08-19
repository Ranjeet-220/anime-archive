"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Award, BookOpenCheck, LogIn, Save } from "lucide-react";

export interface QuizRunnerQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string | null;
}

interface QuizRunnerProps {
  quiz: {
    slug: string;
    title: string;
    description: string | null;
    questions: QuizRunnerQuestion[];
    badge: { slug: string; name: string; icon: string | null } | null;
  };
}

interface AttemptDto {
  score: number;
  maxScore: number;
  passed: boolean;
  createdAt: string;
}

interface SavedResultDto {
  score: number;
  maxScore: number;
  passed: boolean;
  badge: { slug: string; name: string; icon: string | null } | null;
}

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const router = useRouter();
  const total = quiz.questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [finished, setFinished] = useState(false);
  const [attempt, setAttempt] = useState<AttemptDto | null>(null);
  const [saved, setSaved] = useState<SavedResultDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/user/quiz-results?quizSlug=${encodeURIComponent(quiz.slug)}`)
      .then((res) => (res.ok ? res.json().catch(() => null) : null))
      .then((data: { attempt?: AttemptDto | null } | null) => {
        if (cancelled) return;
        if (data?.attempt) setAttempt(data.attempt);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [quiz.slug]);

  const score = useMemo(
    () => quiz.questions.reduce((n, q, i) => (answers[i] === q.correctIndex ? n + 1 : n), 0),
    [answers, quiz.questions]
  );
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = total === 0 ? 0 : (answeredCount / total) * 100;
  const current = quiz.questions[index];

  function choose(optionIndex: number) {
    if (answers[index] !== null) return;
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setAnswers(Array(total).fill(null));
    setIndex(0);
    setFinished(false);
    setSaved(null);
    setError(null);
  }

  async function saveResult() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/user/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizSlug: quiz.slug, answers }),
      });
      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(`/quiz/${quiz.slug}`)}`);
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save your result.");
        return;
      }
      setSaved(data as SavedResultDto);
    } finally {
      setSaving(false);
    }
  }

  if (total === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line-2 p-10 text-center">
        <p className="text-sm text-muted">This quiz has not been catalogued yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="font-display text-3xl text-paper text-balance">{quiz.title}</h1>
        {quiz.description ? <p className="mt-2 text-sm text-muted">{quiz.description}</p> : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="crimson">
            <BookOpenCheck className="h-3 w-3" aria-hidden />
            {total} question{total === 1 ? "" : "s"}
          </Badge>
          {quiz.badge ? (
            <Badge tone="holo">
              <Award className="h-3 w-3" aria-hidden />
              Pass with 80% to earn: {quiz.badge.name}
            </Badge>
          ) : null}
        </div>
      </header>

      {attempt && !finished ? (
        <p className="mt-6 rounded border border-holo-500/30 bg-holo-500/10 px-4 py-3 text-sm text-holo-300">
          You have already attempted this quiz — best score {Math.round((attempt.score / attempt.maxScore) * 100)}%.
          Take it again to improve your record.
        </p>
      ) : null}

      <div className="mt-6 rounded-lg border border-line bg-charcoal/60 p-5 sm:p-6">
        {!finished ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">
                Question {index + 1} of {total}
              </p>
              <p className="font-display text-xs tabular-nums text-faint">{answeredCount} answered</p>
            </div>
            <div
              className="mt-3 h-1 overflow-hidden rounded-full bg-charcoal-3"
              role="progressbar"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={total}
            >
              <div
                className="h-full rounded-full bg-crimson-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h2 className="mt-6 font-display text-xl leading-snug text-paper">{current.question}</h2>
            <ul className="mt-5 space-y-2.5" role="list">
              {current.options.map((option, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={answers[index] !== null}
                    className={cn(
                      "w-full rounded border px-4 py-3 text-left text-sm transition-colors",
                      answers[index] === i
                        ? "border-crimson-500 bg-crimson-500/10 text-crimson-300"
                        : "border-line bg-charcoal text-paper-2 hover:border-line-2 hover:text-paper disabled:opacity-60"
                    )}
                  >
                    <span className="mr-2 font-display text-xs text-faint">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-faint">
              Select an answer to advance. Answers are locked once chosen.
            </p>
          </>
        ) : (
          <div>
            <div className="text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">Final score</p>
              <p className="mt-2 font-display text-5xl text-paper tabular-nums">
                {score}
                <span className="text-2xl text-faint">/{total}</span>
              </p>
              <p className="mt-2 font-display text-sm text-muted">
                {Math.round((score / total) * 100)}% — {score === total ? "a perfect catalogue of the era" : score >= Math.ceil(total * 0.8) ? "passed" : "not passed"}
              </p>
              {saved?.badge ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded border border-ok/30 bg-ok/10 px-3 py-1.5 text-sm text-ok">
                  <Award className="h-4 w-4" aria-hidden />
                  Badge earned: {saved.badge.name}
                </p>
              ) : null}
            </div>

            <ol className="mt-8 space-y-4">
              {quiz.questions.map((q, i) => {
                const chosen = answers[i];
                const correct = chosen === q.correctIndex;
                return (
                  <li key={i} className="rounded-lg border border-line bg-charcoal p-4">
                    <p className="text-sm font-medium text-paper">
                      <span className="mr-2 font-display text-xs text-faint">{i + 1}.</span>
                      {q.question}
                    </p>
                    <p
                      className={cn(
                        "mt-2 flex items-start gap-1.5 text-sm",
                        correct ? "text-ok" : "text-danger"
                      )}
                    >
                      {correct ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      )}
                      <span>
                        {correct
                          ? `Correct — ${q.options[q.correctIndex]}`
                          : `Your answer: ${chosen !== null ? q.options[chosen] : "none"} — correct: ${q.options[q.correctIndex]}`}
                      </span>
                    </p>
                    {q.explanation ? (
                      <p className="mt-2 border-l-2 border-crimson-500/60 pl-3 text-sm text-muted">
                        {q.explanation}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" size="sm" onClick={restart} disabled={saving}>
                Retake quiz
              </Button>
              {saved ? (
                <p className="text-sm text-ok">
                  Result archived — best score {saved.score}/{saved.maxScore}.
                </p>
              ) : (
                <Button size="sm" onClick={saveResult} disabled={saving}>
                  {saving ? (
                    "Saving…"
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" aria-hidden /> Save result
                    </>
                  )}
                </Button>
              )}
            </div>
            {!saved && !checking ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-faint">
                <LogIn className="h-3 w-3" aria-hidden />
                Saving requires a signed-in account — you will be asked to sign in.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}