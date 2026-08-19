import { FORMAT_LABELS } from "@/lib/format";

// ---------------------------------------------------------------------------
// Original procedural poster art.
//
// Every anime without an uploaded cover receives a deterministic, original
// "museum exhibit" poster: an era-coded palette, a seeded abstract
// composition, the Japanese title set vertically, and archival index text.
// All artwork is generated here — nothing is copied from official posters.
// ---------------------------------------------------------------------------

interface PosterPalette {
  bg: [string, string];
  accent: string;
  accentSoft: string;
  paper: string;
  frame: string;
  disk: string;
}

const ERA_PALETTES: { match: (y: number | null) => boolean; palette: PosterPalette }[] = [
  {
    match: (y) => y !== null && y < 1940,
    palette: { bg: ["#161310", "#0d0b09"], accent: "#8a6f4d", accentSoft: "#6b563c", paper: "#e8dcc8", frame: "#241d15", disk: "#a8875f" },
  },
  {
    match: (y) => y !== null && y < 1960,
    palette: { bg: ["#181512", "#0e0c0a"], accent: "#c98a3d", accentSoft: "#7c5626", paper: "#f0e2c8", frame: "#231d14", disk: "#d99e4e" },
  },
  {
    match: (y) => y !== null && y < 1970,
    palette: { bg: ["#15161a", "#0b0c0f"], accent: "#e0763a", accentSoft: "#8a4a26", paper: "#efe4d4", frame: "#1e2026", disk: "#ff8c46" },
  },
  {
    match: (y) => y !== null && y < 1980,
    palette: { bg: ["#171419", "#0d0b10"], accent: "#c8383f", accentSoft: "#7f2026", paper: "#f1ece5", frame: "#221d24", disk: "#e0525a" },
  },
  {
    match: (y) => y !== null && y < 1990,
    palette: { bg: ["#14141c", "#0a0a10"], accent: "#c8383f", accentSoft: "#5ac4d4", paper: "#f1ece5", frame: "#1d1d2b", disk: "#e0484f" },
  },
  {
    match: (y) => y !== null && y < 2000,
    palette: { bg: ["#16121e", "#0b0911"], accent: "#7a5cc8", accentSoft: "#c8383f", paper: "#f1ece5", frame: "#221a30", disk: "#8f6fd4" },
  },
  {
    match: (y) => y !== null && y < 2010,
    palette: { bg: ["#0f1a1e", "#091013"], accent: "#5ac4d4", accentSoft: "#2d7a86", paper: "#eaf2f2", frame: "#16282e", disk: "#63c8d6" },
  },
  {
    match: (y) => y !== null && y < 2020,
    palette: { bg: ["#16121c", "#0c0a11"], accent: "#5ac4d4", accentSoft: "#c8383f", paper: "#f1ece5", frame: "#201b2a", disk: "#6fd0e0" },
  },
  {
    match: () => true,
    palette: { bg: ["#1a1016", "#0e090c"], accent: "#d4487a", accentSoft: "#5ac4d4", paper: "#f4e9ec", frame: "#241319", disk: "#e05a8a" },
  },
];

function paletteFor(year: number | null): PosterPalette {
  return (ERA_PALETTES.find((p) => p.match(year)) ?? ERA_PALETTES[ERA_PALETTES.length - 1]).palette;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface AnimePosterProps {
  title: string;
  japaneseTitle?: string | null;
  year?: number | null;
  format?: string;
  slug?: string;
  className?: string;
}

/**
 * Deterministic, original poster artwork for an anime. Rendered as an
 * inline SVG (no network request, always sharp). Used only when the anime
 * has no uploaded cover image.
 */
export function AnimePoster({
  title,
  japaneseTitle,
  year,
  format,
  slug = title,
  className,
}: AnimePosterProps) {
  const seed = hash(slug);
  const p = paletteFor(year ?? null);
  const W = 300;
  const H = 400;
  const jp = (japaneseTitle ?? "").trim() || null;

  // Seeded abstract composition: disk offset, frame bands, film perforations.
  const diskX = 70 + (seed % 70);
  const diskY = 78 + ((seed >> 3) % 56);
  const diskR = 34 + ((seed >> 6) % 30);
  const bars = 3 + ((seed >> 9) % 3);
  const ring = (seed >> 12) % 3;

  const perfs = Array.from({ length: 12 }, (_, i) => ({
    y: 16 + i * 30,
    on: ((seed >> (i % 8)) & 1) === 1,
  }));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${title} poster artwork`}
      className={className}
    >
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg[0]} />
          <stop offset="100%" stopColor={p.bg[1]} />
        </linearGradient>
        <linearGradient id={`fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.bg[1]} stopOpacity="0" />
          <stop offset="100%" stopColor={p.bg[1]} stopOpacity="0.85" />
        </linearGradient>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.05" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#bg-${seed})`} />

      {/* Horizon band */}
      <rect x="0" y={150 + ((seed >> 4) % 30)} width={W} height="2" fill={p.frame} />

      {/* Vertical Japanese title column (right side) */}
      {jp ? (
        <text
          x={W - 26}
          y={60}
          fontSize="15"
          fill={p.accentSoft}
          opacity="0.9"
          fontFamily="inherit"
          textAnchor="middle"
        >
          {Array.from(jp).map((ch, i) => (
            <tspan key={i} x={W - 26} dy={i === 0 ? 0 : 17}>
              {ch}
            </tspan>
          ))}
        </text>
      ) : null}

      {/* Sun disk with ring */}
      <circle cx={diskX} cy={diskY} r={diskR} fill={p.disk} opacity="0.85" />
      <circle cx={diskX} cy={diskY} r={diskR} fill="none" stroke={p.paper} strokeOpacity="0.18" strokeWidth="1.5" />
      {ring === 1 ? (
        <circle cx={diskX} cy={diskY} r={diskR + 12} fill="none" stroke={p.accent} strokeOpacity="0.35" strokeWidth="2" />
      ) : null}

      {/* Abstract bars — skyline / horizon line */}
      {Array.from({ length: bars }, (_, i) => {
        const bw = 26 + ((seed >> (4 + i * 3)) % 34);
        const bx = 30 + ((seed >> (6 + i * 4)) % 90);
        return (
          <rect
            key={i}
            x={bx}
            y={158 + ((seed >> (3 + i * 2)) % 22) + i * 22}
            width={bw}
            height={3 + ((seed >> (8 + i)) % 6)}
            fill={p.accent}
            opacity={0.5 - i * 0.12}
          />
        );
      })}

      {/* Film-strip perforations */}
      {perfs.map((f) =>
        f.on ? (
          <rect key={f.y} x={12} y={f.y} width="4.5" height="7" rx="1" fill={p.paper} opacity="0.3" />
        ) : null
      )}

      {/* Index frame */}
      <rect x="0" y={H - 96} width={W} height="96" fill={`url(#fade-${seed})`} />
      <rect x="16" y={H - 96} width="2" height="74" fill={p.accent} />
      <rect x={W - 18} y={H - 96} width="2" height="74" fill={p.accent} opacity="0.5" />

      {/* English title */}
      <text
        x="30"
        y={H - 58}
        fontSize="17"
        fontWeight="600"
        letterSpacing="0.12em"
        fill={p.paper}
        fontFamily="inherit"
      >
        {title.length > 26 ? `${title.slice(0, 24)}…` : title}
      </text>

      {/* Index line: year · format */}
      <text x="30" y={H - 34} fontSize="10" letterSpacing="0.22em" fill={p.accentSoft} fontFamily="inherit">
        {year ? `${year} · ` : ""}
        {format ? (FORMAT_LABELS[format as keyof typeof FORMAT_LABELS] ?? format).toUpperCase() : "ANIME"}
      </text>

      {/* Film grain */}
      <rect width={W} height={H} filter={`url(#grain-${seed})`} opacity="0.5" />
    </svg>
  );
}
