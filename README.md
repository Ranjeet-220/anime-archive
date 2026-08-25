# 🏛️ Anime Archive — 3D Digital Museum & Historical Encyclopedia

[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL%2016-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma%207-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

A digital museum and comprehensive historical encyclopedia of Japanese animation — chronicling over a century of artistic evolution from the pioneer silent shorts of 1917 to the modern global streaming era.

Anime Archive blends an **interactive 3D spatial museum** (built with React Three Fiber and custom post-processing shaders) with a **high-performance, fully server-rendered 2D encyclopedia** powered by Next.js 16 App Router and PostgreSQL.

---

## ✨ Key Features & Architectural Highlights

- 🏛️ **Interactive 3D Virtual Museum (`/museum`)**:
  - Chronologically curated 3D virtual rooms mapped across animation eras.
  - Multi-tier dynamic Level of Detail (LOD) & Device Modes: `IMMERSIVE`, `BALANCED`, `PERFORMANCE`.
  - Era-specific custom shader post-processing (vintage film grain, sepia, bloom, scanlines).
  - DOM-based HUD minimap teleportation and spatial navigation.
  - Graceful, fully accessible 2D fallback UI when WebGL is unavailable.

- ⏳ **Interactive Anime & World History Timeline (`/timeline`)**:
  - Dual-perspective comparison tracking landmark anime releases alongside pivotal global historical events from the 1910s to the 2020s.

- 📖 **Comprehensive Catalog & Encyclopedia**:
  - **Anime & Movies**: Deep-dive production histories, legacy notes, awards, character rosters, and staff credits.
  - **Studios & Hall of Legends (`/studios`, `/creators`)**: Lineage tracking, historical animation techniques, and visionary creator biographies.
  - **Rankings & Curated Collections (`/rankings`, `/collections`)**: Curated editorial rankings across 7 criteria (Most Popular, Most Influential, Highest Rated, Global Icons, etc.).
  - **Interactive Quizzes & Badges (`/quizzes`)**: History quizzes with automated badge rewards (≥80% score threshold).
  - **Guided Tours (`/tours`)**: Curated walkthroughs through historical milestones.

- ⚡ **High Performance & Security**:
  - Server-Side Rendering (SSR) & Server Components for near-instant first contentful paint.
  - Tag-based in-memory caching layer with automatic mutation invalidation.
  - High-speed fuzzy search powered by PostgreSQL's `pg_trgm` extension.
  - Secure stateless JWT session management (`jose`, `httpOnly` cookies) and `bcryptjs` password hashing.
  - Role-Based Access Control (`USER`, `CONTRIBUTOR`, `EDITOR`, `ADMIN`).
  - Community contribution pipeline (`/contribute`) with inline visual diff reviewer for admins (`/admin/contributions`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Components, Webpack) |
| **Frontend UI** | React 19, TypeScript, Tailwind CSS v4, Motion (v13), Lucide React |
| **3D Engine** | Three.js, React Three Fiber (R3F 9), `@react-three/drei`, `@react-three/postprocessing` |
| **Database & ORM** | PostgreSQL 16 (pg_trgm fuzzy matching), Prisma 7 (`@prisma/adapter-pg`) |
| **Auth & Security** | JWT (`jose`), `bcryptjs`, Sliding-window Rate Limiting |
| **Testing & Quality** | Vitest, ESLint 9, TypeScript Strict Mode |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 20 (developed on Node 24)
- PostgreSQL ≥ 15 (or Podman / Docker)
- npm ≥ 10

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ranjeet-220/anime-archive.git
   cd anime-archive
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   *(Update `DATABASE_URL` and `AUTH_SECRET` if needed)*

4. **Run database migrations & seed demo dataset**:
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@animearchive.local` | `ChangeMe-Admin-2026!` |
| **Demo User** | `demo@animearchive.local` | `DemoUser-2026!` |

---

## 📁 Project Structure

```
├── prisma/
│   ├── migrations/             # Database schema migrations
│   ├── schema.prisma           # Prisma data models & relations
│   ├── seed.ts                 # Idempotent seed runner
│   └── seed-data/              # Curated datasets (anime, studios, creators, quizzes, rankings)
├── public/                     # Optimized visual assets, icons, posters
├── scripts/
│   ├── db.sh                   # Local database automation helper
│   └── data-tools/             # Data extraction and calibration utilities
└── src/
    ├── app/                    # Next.js App Router (pages, layouts, API route handlers)
    ├── components/
    │   ├── anime/              # Anime cards, detail tabs, filter bars
    │   ├── layout/             # Navigation, footer, cinematic ambient backgrounds
    │   ├── three/              # 3D scenes, shaders, post-processing, minimap
    │   ├── timeline/           # Interactive timeline & historical comparisons
    │   └── ui/                 # Design system components
    └── lib/                    # Data accessors, cache, auth, rate-limit, types, utilities
```

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Compile and build for production |
| `npm run start` | Start production server |
| `npm test` | Run Vitest test suite |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed demo data into PostgreSQL |

---

## 📄 License & Disclaimer

This project is an open-source educational and historical archive created for informational purposes. All anime trademarks, characters, and related media belong to their respective creators and production studios.