import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EVENT_KIND_LABELS } from "@/lib/format";

type Tone = "default" | "crimson" | "holo" | "neutral" | "ok" | "warn";

const KIND_TONES: Record<string, Tone> = {
  PREMIERE: "crimson",
  RELEASE: "holo",
  FOUNDING: "neutral",
  MILESTONE: "warn",
  INDUSTRY: "neutral",
  BIRTH: "ok",
  DEATH: "neutral",
  AWARD: "holo",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface EraEventLink {
  href: string;
  title: string;
}

export interface EraEventLinks {
  anime?: Map<string, EraEventLink>;
  studio?: Map<string, EraEventLink>;
  person?: Map<string, EraEventLink>;
}

interface EventView {
  slug: string;
  title: string;
  year: number | null;
  month: number | null;
  day: number | null;
  description: string | null;
  kind: string;
  animeId: string | null;
  studioId: string | null;
  personId: string | null;
}

function eventDate(event: EventView): string | null {
  if (!event.month) return null;
  const month = MONTHS[event.month - 1];
  if (!month) return null;
  return event.day ? `${month} ${event.day}` : month;
}

export function EraEventList({
  events,
  links,
}: {
  events: EventView[];
  links?: EraEventLinks;
}) {
  if (events.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line-2 px-4 py-6 text-sm text-muted">
        No historical events are archived for this era yet.
      </p>
    );
  }

  return (
    <ol className="relative space-y-8 border-l border-line pl-6">
      {events.map((event) => {
        const refs: { href: string; title: string }[] = [];
        if (event.animeId) {
          const link = links?.anime?.get(event.animeId);
          if (link) refs.push(link);
        }
        if (event.studioId) {
          const link = links?.studio?.get(event.studioId);
          if (link) refs.push(link);
        }
        if (event.personId) {
          const link = links?.person?.get(event.personId);
          if (link) refs.push(link);
        }
        const date = eventDate(event);
        return (
          <li key={event.slug} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full border border-crimson-500 bg-ink"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-crimson-500/30 bg-crimson-500/10 px-2 py-0.5 font-display text-xs tabular-nums text-crimson-300">
                {event.year ?? "—"}
              </span>
              {date ? <span className="text-xs text-faint">{date}</span> : null}
              <Badge tone={KIND_TONES[event.kind] ?? "default"}>
                {EVENT_KIND_LABELS[event.kind] ?? event.kind}
              </Badge>
            </div>
            <h3 className="mt-2 font-display text-sm text-paper">{event.title}</h3>
            {event.description ? (
              <p className="mt-1 text-sm leading-relaxed text-muted">{event.description}</p>
            ) : null}
            {refs.length > 0 ? (
              <p className="mt-2 text-xs text-faint">
                See:{" "}
                {refs.map((ref, i) => (
                  <span key={ref.href}>
                    {i > 0 ? ", " : null}
                    <Link
                      href={ref.href}
                      className="text-holo-400 underline underline-offset-2 transition-colors hover:text-holo-300"
                    >
                      {ref.title}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
