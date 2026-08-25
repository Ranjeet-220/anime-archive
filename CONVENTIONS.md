# Anime Archive — Build Conventions

**Read this before writing any code.** This is a Next.js 16 App Router project (src/), TypeScript strict, Tailwind v4, Prisma 7 + PostgreSQL (running locally on port 5432), React 19.

## Critical environment notes
- `node_modules` is a SYMLINK to `/tmp/opencode/installer/node_modules` (NTFS cannot store exec bits). NEVER run `npm install` / `npx <pkg>@latest` in the project dir. Install new packages by running `npm i <pkg>` inside `/tmp/opencode/installer`, then `cp package.json package-lock.json "/mnt/data/Anime history/"`.
- DB is already migrated + seeded. To re-seed: `DATABASE_URL=... npx tsx prisma/seed.ts` (from project root). Seed is idempotent.
- `npx`-free commands: use `./node_modules/.bin/<tool>` or add `PATH="/mnt/data/Anime history/node_modules/.bin:$PATH"` prefix.
- The NTFS mount means `next dev` file-watching is unreliable; prefer `next build && next start` for verification.

## Next.js 16 specifics (breaking vs older tutorials)
- `params`/`searchParams` are **Promises** — always `const { slug } = await params`.
- `cookies()`/`headers()` are async (`const store = await cookies()`).
- Turbopack is the default bundler for dev AND build.
- `fetch` is NOT cached by default; static generation only with `export const dynamic = 'force-static'` or `revalidate`/`generateStaticParams`.
- Route handlers: `export async function GET(_req: NextRequest, ctx: RouteContext<'/api/x/[id]'>) { const { id } = await ctx.params }`.
- `next/image`: use for layout images only when you have real image assets. Our demo data has NO images — use gradient placeholder components instead (`CoverArt`). NEVER import images from remote hosts.

## Data & API layer (already built — import, don't duplicate)
- `src/lib/prisma.ts` — exported `prisma` client (PrismaPg adapter). 
- `src/lib/data.ts` — server-only data access: `getAnimeList(params)`, `getAnimeBySlug(slug)`, `getEras()`, `getEraBySlug(slug)`, `getTimelineData()`, `getMuseumData()`, `getStudioArchive()`, `getStudios()`, `getStudioBySlug(slug)`, `getHallOfLegends()`, `getCreators()`, `getPersonBySlug(slug)`, `getCharacters(q?)`, `getCharacterBySlug(slug)`, `getGenres()`, `getGenreBySlug(slug)`, `getMovies()`, `getStats()`, `getOnThisDay()`, `getRecentEvents()`, `searchAll(q)`, `getHomepageData()`, quiz/tour accessors (`getQuizzes()`, `getQuizBySlug()`, `getQuizLeaderboard()`, `getTours()`, `getTourBySlug()`), and ranking accessors (`getRankings()`, `getRankingBySlug()`). **All read functions are cached** (in-process TTL, 5 min, tag-prefixed keys via `src/lib/cache.ts`); do NOT bypass `data.ts` with raw `prisma` reads in pages.
- `src/lib/cache.ts` — `cached(key, ttlMs, fn)` + `invalidateCacheTags(tags)`. Key format `<tag>:...`; tags: `anime`, `era`, `studio`, `person`, `character`, `genre`, `event`, `stats`, `home`. **After any mutation, call `invalidateCacheTags([...])`** (see existing admin/user API routes for the per-entity tag sets). In-memory only — per-process; values are returned as-is (Date objects intact). Do not use `unstable_cache`/`use cache` — this project intentionally uses its own cache (no cacheComponents flag).
- `src/lib/rate-limit.ts` — `checkRateLimit(key, max, windowMs)`, `clientIp(req)`, `RATE` presets (login/register/contact/contribute). In-memory sliding window per process. Always rate-limit public mutation endpoints (auth, contact, contribute).
- `src/lib/types.ts` — DTO types for 3D payloads (EraDto, MuseumAnimeDto, etc.).
- `src/lib/format.ts` — label maps (FORMAT_LABELS, STATUS_LABELS, EVENT_KIND_LABELS, ratingColor).
- `src/lib/world-history-data.ts` — static `WORLD_HISTORY_EVENTS` (52 entries, 1910s–2020s) used by the timeline's "World + Anime" comparison view (`src/components/timeline/world-anime-comparison.tsx`). Client-side tab toggle lives in `src/components/timeline/history-comparison.tsx`.
- `src/components/user/contribution-diff.ts` — pure line-diff helpers (`parsePayload`, `flattenPayload`, `lineDiff` LCS, `prettyJson`) used by the admin contributions table's expandable Diff panel. Keep it framework-free (unit-testable, no React import).
- `src/lib/utils.ts` — `cn()`, `slugify()`, `formatDate()`, `truncate()`, `pluralize()`, etc.
- `src/lib/auth.ts` — server-only auth: `getSessionUser()` (cache), `requireUser()`, `requireRole()`, `hashPassword()`, `verifyPassword()`, `setSessionCookie()`, `clearSessionCookie()`, `canReview()`, `canManage()`, `PUBLIC_USER_FIELDS`. JWT session cookie `aa_session` (httpOnly). Roles: USER, CONTRIBUTOR, EDITOR, ADMIN.
- Prisma types import from `@/generated/prisma/client` (e.g. `import type { Prisma, AnimeFormat } from "@/generated/prisma/client"`).

## Design system (Tailwind v4, defined in `src/app/globals.css` @theme)
- Colors: `bg-ink` (#0a0a0c), `bg-charcoal`, `bg-charcoal-2`, `bg-charcoal-3`, `border-line`, `border-line-2`, `text-paper`, `text-paper-2`, `text-muted`, `text-faint`, crimson scale: `crimson-300/400/500/600/700`, holo cyan: `holo-300/400/500`, `text-ok`, `text-warn`, `text-danger`.
- Fonts: `font-display` (Space Grotesk — headings, buttons, labels), default sans (Inter — body), `font-jp` (Noto Sans JP for Japanese text).
- Utility classes: `surface-card`, `surface-panel`, `edge-crimson`, `film-grain`, `vignette`, `editorial` (long-form text styles), `lift` (hover), `text-balance`.
- READ globals.css before styling. Do NOT invent new colors or rounded-2xl-heavy glassy styles. Corners: rounded / rounded-lg max. Buttons: square-ish, uppercase tracking via font-display.
- Shared UI: `src/components/ui/button.tsx` (Button, ButtonLink, LinkButton), `badge.tsx` (Badge, BadgeLink), `anime-card.tsx` (AnimeCard, CoverArt — always use CoverArt, no external images), `breadcrumbs.tsx`, `pagination.tsx`, `empty-state.tsx` (EmptyState, LoadingGrid), `section-heading.tsx` (SectionHeading, Stat), `field.tsx` (Field, Input, Textarea, Select, Label).
- Icons: `lucide-react` only. Animations: `motion/react` (the `motion` package, NOT framer-motion import path).

## Route structure (all in src/app)
Already-required routes (do not change): `/`, `/museum`, `/timeline`, `/timeline/[era]`, `/anime`, `/anime/[slug]`, `/movies`, `/studios`, `/studio/[slug]`, `/creators`, `/creator/[slug]`, `/characters`, `/character/[slug]`, `/genres`, `/collections`, `/search`, `/favorites`, `/watchlist`, `/profile`, `/login`, `/register`, `/contribute`, `/about`, `/methodology`, `/sources`, `/copyright`, `/privacy`, `/terms`, `/contact`, `/content-removal`, `/admin/**`, plus `/api/**`.
Added routes: `/quizzes`, `/quiz/[slug]` (interactive quiz runner + results), `/tours`, `/tour/[slug]` (guided tours with steps), `/rankings` (seven curated editorial categories — Most Popular, Most Watched, Highest Rated, Most Influential, Global Icons, Popular in India, Historical Milestones), `/api/user/quiz-results` (POST = submit attempt, awards a badge at ≥80%; GET = best attempt). Quizzes/badges/tours are seeded by `prisma/seed-data/quiz-tours.ts`; rankings are seeded by `prisma/seed-data/rankings.ts`.
SEO URLs are slug-based: `/anime/akira`, `/studio/madhouse`, `/creator/satoshi-kon`, `/timeline/1990s` (use era slugs like `golden-age`? NO — use the real slugs from DB: the-beginning, television-era, golden-age, global-expansion, digital-revolution, streaming-era, modern-anime).

## Page conventions
- Server Components by default; `'use client'` only where needed (interactive).
- Every list page: `export const metadata`, `Breadcrumbs`, `SectionHeading`, proper empty states, `Pagination` where applicable.
- Detail pages: `generateMetadata` + JSON-LD (ld+json script tag) with BreadcrumbList/Thing schema.
- Use `await params`/`await searchParams` (Promises!).
- 3D scenes: client components in `src/components/three/`, lazy-loaded via `next/dynamic` with `ssr: false` from server page wrappers; always provide a graceful 2D fallback UI; respect `prefers-reduced-motion`; WebGL detection before mounting Canvas; device mode (IMMERSIVE/BALANCED/PERFORMANCE) via `src/lib/device-mode.ts` + localStorage.
  - Post-processing (`src/components/three/era-effects.tsx`): `EraEffects` wraps a `@react-three/postprocessing` `EffectComposer` gated by device mode — PERFORMANCE renders nothing, BALANCED only cheap effects (sepia/grain/scanlines), IMMERSIVE full bloom/SMAA/vignette. `eraVisualKind(slug)` returns the palette. Render `<EraEffects slug={eraSlug}/>` inside a scene when era tinting is wanted.
  - Minimap (`src/components/three/museum-minimap.tsx`): DOM overlay HUD (not a texture) that teleports via the scene's `focusRoom(ref)` callback. Wire it through the canvas parent so the ref passes down to the scene.
- Do not block content on the DB: if DB is unreachable, pages must render a sensible error/empty state, never crash the build.

## API routes
`/api/*` route handlers: JSON in/out, `try/catch`, status codes (400/401/403/404/500), no stack traces in responses. Auth via `getSessionUser()`/`requireUser()`.
Existing/planned: `/api/auth/register|login|logout|me`, `/api/search?q=`, `/api/user/favorites|watchlist|rating|notes|collections|quiz-results`, `/api/contribute`, `/api/admin/contributions|users|sources|events|anime`, `/api/three/museum|timeline|hall|studios|genres`, `/api/stats`.

## Open Graph images
- `src/app/opengraph-image.tsx` (site default) and `src/app/anime/[slug]/opengraph-image.tsx` (per-anime, via `generateImageMetadata`).
- Font: load the STATIC `public/fonts/SpaceGrotesk-Static.ttf` (not the variable `SpaceGrotesk.ttf`) — the bundled satori/opentype cannot parse the variable font's `fvar` table ("Cannot read properties of undefined (reading '256')"). Load it with `readFile(process.cwd() + "/public/fonts/SpaceGrotesk-Static.ttf")` — the `new URL(..., import.meta.url)` pattern breaks webpack ("Can't resolve .../public/fonts/...").
- `ImageResponse` renders lazily on body stream — errors surface during prerender, not construction.

## Verification
- Typecheck: `./node_modules/.bin/tsc --noEmit`
- Lint: `./node_modules/.bin/eslint src` (eslint 9 flat config; `@next/next/no-img-element` is allowed for cover art — we have no real image assets)
- Tests: `./node_modules/.bin/vitest run` (or `npm test`) — unit tests for pure libs (`src/lib/__tests__/`); no DB required
- Build: `./node_modules/.bin/next build` — MUST pass before the task is done.
- Smoke test: `./node_modules/.bin/next start -p 3000` + curl key pages.
