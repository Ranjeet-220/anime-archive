"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, LinkButton } from "@/components/ui/button";
import { EXHIBITS } from "@/lib/membership-exhibits";

const PASSPORT_KEY = "aa-museum-passport-v1";
type Recap = {
  completed: number;
  decade: { name: string; count: number } | null;
  studio: { name: string; count: number } | null;
  genre: { name: string; count: number } | null;
};

export function MemberExperience() {
  const [selected, setSelected] = useState(0);
  const [featured, setFeatured] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [opened, setOpened] = useState(false);
  const [stamps, setStamps] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [glow, setGlow] = useState(50);
  const [speaking, setSpeaking] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [recap, setRecap] = useState<Recap | null>(null);
  const [recapStatus, setRecapStatus] = useState("Loading your watchlist recap…");
  const [signedOut, setSignedOut] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const exhibit = EXHIBITS[selected];
  const section = exhibit.chapters[chapter];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAudioAvailable("speechSynthesis" in window);
      setSelected(new Date().getMonth() % EXHIBITS.length);
      setFeatured(new Date().getMonth() % EXHIBITS.length);
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(PASSPORT_KEY) ?? "[]");
        if (Array.isArray(saved)) {
          setStamps(EXHIBITS.filter((item) => saved.includes(item.id)).map((item) => item.id));
        }
      } catch {
        setMessage("Browser storage is unavailable. You can still earn stamps during this visit.");
      }
      setReady(true);
    });
    return () => { window.cancelAnimationFrame(frame); window.speechSynthesis?.cancel(); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadRecap() {
      setRecapStatus("Loading your watchlist recap…");
      setSignedOut(false);
      try {
        const response = await fetch("/api/user/recap", { signal: controller.signal, cache: "no-store" });
        if (response.status === 401) {
          setSignedOut(true);
          setRecapStatus("Sign in to discover patterns in your completed anime.");
          return;
        }
        if (!response.ok) throw new Error("Unavailable");
        setRecap(await response.json());
        setRecapStatus("");
      } catch {
        if (!controller.signal.aborted) setRecapStatus("Your recap could not be loaded. Please try again.");
      }
    }
    void loadRecap();
    return () => controller.abort();
  }, [refresh]);

  function stopAudio() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function openExhibit(index: number) {
    stopAudio();
    setSelected(index);
    setChapter(0);
    setAnswer(null);
    setOpened(true);
  }

  function playAudio() {
    stopAudio();
    const narration = new SpeechSynthesisUtterance(`${section.title}. ${section.text}`);
    narration.lang = "en-US";
    narration.onend = () => setSpeaking(false);
    narration.onerror = () => { setSpeaking(false); setMessage("Audio is unavailable. Read the transcript below."); };
    setSpeaking(true);
    window.speechSynthesis.speak(narration);
  }

  function answerQuiz(index: number) {
    setAnswer(index);
    if (index !== exhibit.correct) return;
    let next = [...stamps];
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(PASSPORT_KEY) ?? "[]");
      if (Array.isArray(stored)) next = EXHIBITS.filter((item) => stored.includes(item.id) || next.includes(item.id)).map((item) => item.id);
      next = [...new Set([...next, exhibit.id])];
      localStorage.setItem(PASSPORT_KEY, JSON.stringify(next));
      setMessage("Stamp earned and saved in this browser.");
    } catch {
      next = [...new Set([...next, exhibit.id])];
      setMessage("Stamp earned for this visit. Your browser could not save it.");
    }
    setStamps(next);
  }

  async function downloadPassport() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) { setMessage("Your browser could not create the passport image."); return; }
    context.fillStyle = "#050607";
    context.fillRect(0, 0, 1080, 1350);
    context.fillStyle = "#ff3038";
    context.font = "bold 32px sans-serif";
    context.fillText("ANIME ARCHIVE", 80, 120);
    context.fillStyle = "#f2f2f2";
    context.font = "bold 60px sans-serif";
    context.fillText("MY MUSEUM PASSPORT", 80, 240);
    context.font = "30px sans-serif";
    context.fillText(`${stamps.length} of ${EXHIBITS.length} exhibits completed`, 80, 315);
    EXHIBITS.forEach((item, index) => {
      context.strokeStyle = stamps.includes(item.id) ? "#ff3038" : "#343840";
      context.strokeRect(80, 400 + index * 200, 920, 150);
      context.fillStyle = stamps.includes(item.id) ? "#f2f2f2" : "#818693";
      context.font = "bold 32px sans-serif";
      context.fillText(item.stamp, 115, 460 + index * 200);
      context.font = "26px sans-serif";
      context.fillText(stamps.includes(item.id) ? "STAMP EARNED" : "TO BE EXPLORED", 115, 510 + index * 200);
    });
    context.fillStyle = "#a3a6af";
    context.font = "26px sans-serif";
    context.fillText("Explore your next story at Anime Archive", 80, 1160);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) { setMessage("Your browser could not export the image. Please try again."); return; }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "anime-archive-passport.png";
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Passport image downloaded. Share it in your favourite app.");
  }

  const recommended = EXHIBITS.findIndex((item) => `${item.decade}s` === recap?.decade?.name);

  return (
    <section id="member-experience" className="mx-auto w-full max-w-[1720px] space-y-12 px-4 py-12 sm:px-8 lg:px-12">
      <div>
        <h2 className="mt-2 font-display text-3xl text-paper">Guided exhibits</h2>
        <p className="mt-3 max-w-2xl text-muted">Read or listen, then take a short quiz to earn a stamp.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {EXHIBITS.map((item, index) => (
          <article key={item.id} className="rounded-lg border border-line bg-charcoal p-6">
            {ready && featured === index && <p className="text-sm text-crimson-300">This month’s pick</p>}
            <h3 className="mt-3 font-display text-xl">{item.title}</h3>
            <p className="mb-6 mt-2 text-sm text-muted">{item.subtitle}</p>
            <Button variant="outline" onClick={() => openExhibit(index)}>{stamps.includes(item.id) ? "Revisit exhibit" : "Open exhibit"}</Button>
          </article>
        ))}
      </div>
      {opened && (
        <article aria-label={exhibit.title} className="rounded-lg border border-line bg-charcoal p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-display text-2xl">{exhibit.title}</h3>
            <Button variant="ghost" onClick={() => { stopAudio(); setOpened(false); }}>Close exhibit</Button>
          </div>
          <p className="mt-2 text-sm text-muted">Chapter {chapter + 1} of {exhibit.chapters.length}</p>
          <h4 className="mt-6 font-display text-xl">{section.title}</h4>
          <p className="mt-4 max-w-3xl leading-relaxed text-paper-2">{section.text}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {audioAvailable && <Button variant="outline" onClick={speaking ? stopAudio : playAudio}>{speaking ? "Stop audio" : "Listen in English"}</Button>}
            <Button variant="outline" disabled={chapter === 0} onClick={() => { stopAudio(); setChapter(chapter - 1); setAnswer(null); }}>Previous chapter</Button>
            <Button disabled={chapter === exhibit.chapters.length - 1} onClick={() => { stopAudio(); setChapter(chapter + 1); }}>Next chapter</Button>
          </div>
          <p className="mt-3 text-xs text-muted">Audio uses your device’s English voice.</p>
          {exhibit.id === "neo-tokyo" && chapter === 1 && (
            <div className="mt-8 max-w-xl">
              <div aria-hidden="true" className="flex h-36 items-end gap-3 overflow-hidden rounded bg-ink p-4">
                {[45, 80, 60, 100, 70, 90, 50].map((height, index) => (
                  <div key={index} className="grid flex-1 grid-cols-2 gap-2 bg-charcoal-3 p-2" style={{ height: `${height}%` }}>
                    {[0, 1, 2, 3].map((window) => <span key={window} className="bg-holo-300" style={{ opacity: glow / 100, boxShadow: `0 0 ${glow / 4}px var(--color-holo-300)` }} />)}
                  </div>
                ))}
              </div>
              <label className="mt-4 block text-sm" htmlFor="city-glow">Lighting study · Window glow {glow}%</label>
              <input id="city-glow" className="mt-3 w-full accent-crimson-500" type="range" min="0" max="100" value={glow} onChange={(event) => setGlow(Number(event.target.value))} />
              <p className="text-xs text-muted">Original schematic illustration for this viewing exercise.</p>
            </div>
          )}
          {chapter === exhibit.chapters.length - 1 && (
            <fieldset className="mt-8 rounded border border-line p-5">
              <legend className="px-2 font-display">Earn your exhibit stamp</legend>
              <p>{exhibit.question}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {exhibit.answers.map((option, index) => <Button key={option} variant={answer === index ? "primary" : "outline"} onClick={() => answerQuiz(index)}>{option}</Button>)}
              </div>
              <p aria-live="polite" className="mt-3 text-sm text-holo-300">{answer == null ? "Choose an answer to complete the exhibit." : answer === exhibit.correct ? "Correct. Your passport stamp is ready." : "Try again. Review the chapter for a clue."}</p>
            </fieldset>
          )}
          <p className="mt-6 text-xs text-muted">Film information from <a className="underline" href={exhibit.source.url} target="_blank" rel="noreferrer">{exhibit.source.label}</a>. Viewing prompts are original editorial exercises.</p>
        </article>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        <section id="passport" className="rounded-lg border border-line bg-charcoal p-6">
          <h3 className="font-display text-2xl">Your Museum Passport</h3>
          <p className="mt-2 text-sm text-muted">Your stamps are saved in this browser.</p>
          <p className="mt-4 text-holo-300">{ready ? `${stamps.length} / ${EXHIBITS.length} stamps earned` : "Loading your passport…"}</p>
          <div className="my-5 space-y-3">
            {EXHIBITS.map((item) => <div key={item.id} className={`rounded border p-3 font-display text-sm ${stamps.includes(item.id) ? "border-crimson-500 text-crimson-300" : "border-line text-muted"}`}>{item.stamp} · {stamps.includes(item.id) ? "Earned" : "Explore to unlock"}</div>)}
          </div>
          <Button onClick={downloadPassport} disabled={!ready || stamps.length === 0}>Download passport</Button>
          <p role="status" className="mt-3 text-sm text-muted">{message}</p>
        </section>
        <section className="rounded-lg border border-line bg-charcoal p-6">
          <h3 className="font-display text-2xl">Your anime recap</h3>
          <p className="mt-2 text-sm text-muted">Based on completed titles in your watchlist.</p>
          {recapStatus ? <div className="mt-5"><p role="status" className="text-muted">{recapStatus}</p><div className="mt-4">{signedOut ? <LinkButton href="/login">Sign in</LinkButton> : <Button variant="outline" onClick={() => setRefresh(refresh + 1)}>Refresh recap</Button>}</div></div> : recap && (
            <>
              <p className="mt-6 font-display text-3xl">{recap.completed} completed titles</p>
              {recap.completed === 0 ? <p className="mt-4 text-muted">Mark an anime as Completed in your watchlist to start your recap.</p> : (
                <dl className="mt-5 space-y-4">
                  {([["Top decade", recap.decade], ["Top studio", recap.studio], ["Top genre", recap.genre]] as const).map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-wide text-muted">{label}</dt><dd className="mt-1">{value ? `${value.name} · ${value.count} title${value.count === 1 ? "" : "s"}` : "Metadata not available"}</dd></div>)}
                </dl>
              )}
              {recommended >= 0 && <div className="mt-6"><p className="mb-3 text-sm text-muted">Explore a film from your most-watched decade.</p><Button variant="outline" onClick={() => { openExhibit(recommended); document.getElementById("member-experience")?.scrollIntoView({ behavior: "smooth" }); }}>{EXHIBITS[recommended].title}</Button></div>}
              <div className="mt-6 flex flex-wrap gap-4"><Link href="/watchlist" className="text-sm text-crimson-300 underline">Update watchlist</Link><Button variant="ghost" onClick={() => setRefresh(refresh + 1)}>Refresh recap</Button></div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
