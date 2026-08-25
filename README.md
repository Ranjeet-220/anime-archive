# ANIME ARCHIVE

A digital museum and historical encyclopedia of Japanese animation — from the
earliest shorts of 1917 to the streaming era. The archive blends an
interactive 3D museum (React Three Fiber) with a fast, fully server-rendered
2D encyclopedia.

> **Important**: This is an informational, non-commercial historical archive.
> It is not affiliated with any production studio, and its editorial content
> (genres, classifications, biographies) is the work of the archive's
> contributors, not of the studios themselves.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack-ready) — note: this repo
  builds with `--webpack` (`npm run build`) because the local
  `node_modules` lives on a symlinked filesystem; see "Running locally".
- **TypeScript**, **Tailwind CSS v4** (design tokens in `globals.css`)
- **PostgreSQL 16** + **Prisma 7** (driver adapters, generated client at
  `src/generated/prisma`)
- **React Three Fiber 9** + **drei** + **three** for the 3D museum,
  timeline, Hall of Legends, Studio Archive, and Genre World experiences
  (+ **@react-three/postprocessing** for era-based post FX)
- **motion** (13) for page transitions, **jose** for JWT sessions,
  **bcryptjs** for passwords, **zod** for validation
- `pg_trgm` fuzzy search with graceful fallback if the extension is absent

## Prerequisites

- Node.js ≥ 20 (developed against Node 24)
- PostgreSQL ≥ 15 running locally, reachable via `DATABASE_URL`
- npm ≥ 10

## Setup

```bash
npm install
cp .env.example .env        # then fill in DATABASE_URL, AUTH_SECRET, admin creds
npx prisma migrate deploy   # apply schema migrations
npm run seed                # idempotent demo dataset
npm run dev                 # next dev --webpack
```

Open http://localhost:3000.

### Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | HS256 secret for session JWTs — **rotate before production** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credentials used by the seed to create the admin account |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap/robots/metadata |

### Seed accounts (demo data only — change before production)

| Role | Email | Password |
| --- | --- | --- |
| ADMIN | `admin@animearchive.local` | `ChangeMe-Admin-2026!` |
| USER | `demo@animearchive.local` | `DemoUser-2026!` |

The seed contains 67 anime, 31 studios, 72 people, 116 characters, 33
historical events, 7 eras, 17 genres, 100+ documented sources, 3
quizzes, 4 achievement badges, 2 guided tours, and 7 curated rankings
(the Archive's "Top 60" across Most Popular, Most Watched, Highest
Rated, Most Influential, Global Icons, Popular in India, and Historical
Milestones). All data is demo/illustrative content; re-run `npm run seed`
at any time — it is idempotent.

## Running locally (this workspace)

This workspace's `node_modules` is a symlink to a shared install tree, which
Turbopack rejects (`Symlink [project]/node_modules is invalid`). The npm
scripts therefore run Next with the webpack bundler:

```bash
npm run dev      # next dev --webpack
npm run build    # next build --webpack
npm run start    # next start
```

If your `node_modules` is a real directory (normal clone elsewhere), you can
drop the `--webpack` flags.

### Database convenience script

```bash
./scripts/db.sh start    # start PostgreSQL (data dir from DB_DATA_DIR, default /tmp/opencode/pgdata)
./scripts/db.sh status   # is it running?
./scripts/db.sh seed     # migrate + seed
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (webpack) |
| `npm run build` | Production build (webpack) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests (`src/lib/__tests__/`, no DB needed) |
| `npm run seed` | Migrate + seed the database |

## Project layout

```
src/app/            routes: /museum /timeline /anime /movies /studios /creators
                    /characters /genres /collections /search /contribute /admin
                    /quizzes /quiz/[slug] /tours /tour/[slug] /rankings
                    + static pages, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/     ui (design system), layout, three (3D scenes + era FX +
                    minimap), anime, era, timeline (world-history comparison),
                    transitions, user (quiz runner, contribution diff)
src/lib/            data layer, auth, validation, types, device-mode,
                    world-history-data
prisma/             schema, migrations, seed (data + data files + quiz-tours +
                    rankings)
```

## Documentation & conventions

- `CONVENTIONS.md` — build contract followed by the codebase (routing,
  data access, auth, styling, 3D rules).
- `/methodology`, `/about`, `/sources`, `/copyright` — editorial policy of
  the archive itself.

## Content / legal

- All anime, studio, person, character and event records are documented for
  historical and informational purposes. Cover images and trademarks belong
  to their respective owners; no such assets are bundled.
- See `/content-removal` for takedown requests, and `/privacy` + `/terms`
  for site policy.