# 30-Day Improvement Plan

A one-task-per-day backlog of **real** improvements to Anime Archive. Every task
is small enough to finish in a single session, has a clear definition of done,
and produces an honest commit (real change, real date).

**Rules**

- One task per day, in order unless a task is blocked.
- Every task must pass `npm run lint`, `npm run typecheck`, and `npm test` before
  committing.
- Commit message follows Conventional Commits (`feat:`, `fix:`, `chore:`, ...).
- No empty, backdated, or artificial commits.

---

## Week 1 — Quality baseline

- [x] **Day 1 — Fix lint errors + add `npm test` script**
  - Remove the six `no-explicit-any` errors in
    `prisma/seed-data/anime-isekai-consolidated.ts` with proper structural types.
  - Add the missing `test` script (`vitest run`) documented in the README.
  - Done when `npm run lint`, `npm run typecheck`, and `npm test` are green.

- [ ] **Day 2 — Add CI workflow**
  - `.github/workflows/ci.yml`: on push/PR run install, lint, typecheck, tests,
    and `next build` with a Postgres service container.
  - Cache npm downloads; upload the build log on failure.

- [ ] **Day 3 — Security headers**
  - Add `headers()` in `next.config.ts`: `X-Content-Type-Options`,
    `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, and a conservative
    CSP for the app + Three.js.
  - Verify the pages still render with no CSP violations in the console.

- [ ] **Day 4 — Auth helper tests**
  - `src/lib/__tests__/auth.test.ts`: token round-trip, tampered token, expired
    token, and password hash/verify behavior.
  - Mock `server-only` and cookies; no database required.

- [ ] **Day 5 — Seed-data integrity tests**
  - Assert unique anime/studio/person slugs, valid `eraSlug` references, unique
    anime titles, and no duplicate related links.
  - Import the seed data directly (no database).

- [ ] **Day 6 — Search indexes**
  - Prisma migration adding GIN trigram indexes on `Anime.title`, `Studio.name`,
    and `Person.name`.
  - Add an `EXPLAIN` check in the task notes to confirm the index is used.

- [ ] **Day 7 — Health endpoint**
  - `GET /api/health` returns `{ status, database, version, uptime }`.
  - Returns 503 when the DB ping fails; add a unit test for both branches.

## Week 2 — SEO and structured data

- [ ] **Day 8 — Anime JSON-LD**
  - Add `TVSeries`/`Movie` + `BreadcrumbList` JSON-LD to
    `src/app/anime/[slug]/page.tsx` (the only detail route missing it).
  - Validate with Google's Rich Results test structure.

- [ ] **Day 9 — Canonical URL audit**
  - Ensure every indexable route sets `alternates.canonical`; add a test that
    walks the route list and asserts the helper is called.

- [ ] **Day 10 — Studio OG images**
  - `src/app/studio/[slug]/opengraph-image.tsx` with studio name, years, and
    catalog size, matching the anime OG style.

- [ ] **Day 11 — Creator OG images**
  - `src/app/creator/[slug]/opengraph-image.tsx` with name, role, and major works.

- [ ] **Day 12 — Web app manifest**
  - `src/app/manifest.ts`, theme color, maskable icons, and install metadata.

- [ ] **Day 13 — RSS feed**
  - `src/app/feed.xml/route.ts` returning the 50 most recently updated anime.
  - Add the feed to the layout `<head>` and to `robots.ts`.

- [ ] **Day 14 — Sitemap coverage**
  - Add genres, collections, quizzes, and tours to `sitemap.ts`.
  - Add a test that every public static route appears.

## Week 3 — UX, accessibility, performance

- [ ] **Day 15 — Route loading skeletons**
  - `loading.tsx` for `/anime`, `/studios`, and `/creators` using the existing
    design tokens; keep the global loader as fallback.

- [ ] **Day 16 — Route error boundaries**
  - `error.tsx` for `/anime` and `/admin` with a retry action and a safe fallback.

- [ ] **Day 17 — Shortcuts help dialog**
  - `?` opens a dialog listing ⌘K, `/`, `g h`, and other shortcuts; wire it into
    the command palette and the nav.

- [ ] **Day 18 — Responsive cover art**
  - Migrate cover `<img>` usage to `next/image` with `sizes`, `quality`, and a
    blurred placeholder; keep the procedural poster fallback.
  - Measure LCP before/after in the task notes.

- [ ] **Day 19 — Random anime discovery**
  - Add a "Surprise me" action in the catalog nav that redirects to a random
    slug, with a small unit test for the selection helper.

- [ ] **Day 20 — Screen-reader announcements**
  - Add `aria-live` result counts to search and the command palette, plus
    `aria-busy` while loading.

- [ ] **Day 21 — Focus-visible audit**
  - Keyboard-only pass over nav, cards, filters, forms, and dialogs; fix any
    missing or low-contrast focus rings.

- [ ] **Day 22 — Empty-state review**
  - Audit favorites, watchlist, collections, search, and admin tables; make every
    empty state actionable (link or CTA).

## Week 4 — Infrastructure, tests, docs

- [ ] **Day 23 — Docker Compose**
  - `Dockerfile` (multi-stage, standalone output) + `compose.yml` with Postgres 16
    and the app; document `docker compose up` in the README.

- [ ] **Day 24 — DB backup/restore**
  - `scripts/db.sh backup` and `restore <file>` using `pg_dump`/`pg_restore`,
    with a guard against restoring over a running app.

- [ ] **Day 25 — Contribution diff tests**
  - Cover add/remove/change cases in `src/components/user/contribution-diff.ts`,
    including nested objects and arrays.

- [ ] **Day 26 — Auth API flow tests**
  - Register → login → me → logout with a mocked Prisma client; assert cookies,
    status codes, and rate-limit responses.

- [ ] **Day 27 — CONTRIBUTING.md**
  - Local setup, scripts, commit style, data-source rules, and PR checklist.

- [ ] **Day 28 — GitHub templates**
  - Bug report, feature request, and PR template under `.github/`.

- [ ] **Day 29 — Performance pass**
  - `font-display` review, preload the hero image, remove unused CSS, and record
    Lighthouse before/after scores.

- [ ] **Day 30 — Final QA**
  - Full `npm run build`, test suite, mobile + keyboard smoke test, refresh the
    README screenshots section, and tag `v0.2.0`.

---

## Progress log

| Day | Date | Commit | Notes |
| --- | ---- | ------ | ----- |
| 1 | 2026-11-19 | `chore: remove any casts from isekai seed consolidation` + `chore: add npm test script` | Lint/typecheck/59 tests green |
