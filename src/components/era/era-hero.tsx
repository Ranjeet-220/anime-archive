export interface EraHeroData {
  name: string;
  period: string;
  startYear: number;
  endYear?: number | null;
  order: number;
  description?: string | null;
}

function yearsLabel(startYear: number, endYear?: number | null): string {
  return endYear ? `${startYear}–${endYear}` : `${startYear}–present`;
}

export function EraHero({ era }: { era: EraHeroData }) {
  const room = `ROOM ${String(era.order).padStart(2, "0")}`;
  return (
    <section className="film-grain relative overflow-hidden rounded-lg border border-line">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-crimson-700/40 via-charcoal-2 to-holo-500/10"
      />
      <div aria-hidden className="vignette absolute inset-0" />
      <div className="relative px-6 py-12 sm:px-10 sm:py-16">
        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-crimson-300">
          {room} · {yearsLabel(era.startYear, era.endYear)}
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-paper text-balance sm:text-6xl lg:text-7xl">
          {era.name}
        </h1>
        <p className="mt-4 font-display text-sm uppercase tracking-[0.25em] text-holo-300">
          {era.period}
        </p>
        {era.description ? (
          <p className="editorial mt-6 max-w-3xl">{era.description}</p>
        ) : null}
      </div>
    </section>
  );
}
