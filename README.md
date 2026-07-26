# مطبخ الجدة — Teta's Cookbook

A digital heritage archive preserving a grandmother's handwritten recipe
notebook — a lasting tribute (*sadaqah jariyah*) the family can browse, cook
from, and pass down.

> من مطبخ الجدة... صدقة جارية لها

This is a personal family project, **not** a commercial product: no accounts,
no checkout, no monetization.

## Features

- **Home / category grid** — clean, RTL, mobile-first tiles with recipe counts.
- **Recipe list per category**.
- **Recipe detail** — ingredients, numbered method, Teta's notes, a source badge
  (*بخط الجدة* / *مستنبطة* / *من صحاب الجدة*), and a subtle collapsible review note.
- **Trilingual content** — every recipe and all UI chrome in **عامية مصرية**
  (Egyptian colloquial, default), **العربية الفصحى** (formal), and **English**.
  Switch in Settings; the choice persists (localStorage) and English flips the
  whole layout to LTR. All translations are bundled — no runtime translation API.
- **Settings** (`/settings`) — language, Arabic font (Tajawal / Cairo), accent
  palette (terracotta / olive / dusty rose), light/dark/system theme, and reset.
- **Favorites** — a localStorage heart on every card and detail page, plus a
  `/favorites` page with an empty state. No login.
- **Cooking Mode** — a full-screen, phone-friendly 3-phase checklist
  (prep → focused method with a progress bar → doneness & serving), with big
  touch targets, per-recipe progress that survives leaving mid-cook, a reset,
  and optional inline countdowns for steps that state a duration.
- **Arabic-aware search** across titles and ingredients in every locale (folds
  hamza, teh-marbuta, alef-maqsura and diacritics so spelling variations match).
- **Share** — per-recipe link via the Web Share API, with clipboard fallback.
- **Mock Mode** — runs entirely on curated seed data, no database required.

## Content sourcing

Every recipe is tagged with how it came to be:

| Badge | `sourceType` | Meaning |
|---|---|---|
| بخط الجدة | `GRANDMOTHER_WRITTEN` | Written by the grandmother herself |
| مستنبطة | `INFERRED` | Method logically reconstructed where she recorded only the ingredients — a review note explains this on each such recipe |
| من صحاب الجدة | `FRIEND_OR_RELATIVE` | Originally from someone else, as noted in her book |

The curated content lives in [`lib/recipes-data.ts`](lib/recipes-data.ts) and is
the single source of truth for both Mock Mode and the database seed.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (warm cream/terracotta palette, full RTL)
- **Prisma + PostgreSQL** (optional — Mock Mode needs no DB)
- Fonts: **Tajawal** & **Cairo** (Arabic-first)

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Mock Mode is on by default, so the app works with no further setup.

## Using a live database (optional)

```bash
cp .env.example .env      # set MOCK_MODE=false and DATABASE_URL
npm run prisma:generate
npm run prisma:migrate
npm run db:seed           # loads categories + recipes from lib/recipes-data.ts
```

## Deployment

Vercel-ready. In Mock Mode no environment variables are required.

## Adding recipes

Append to `lib/recipes-data.ts` (and, if needed, a category to
`lib/categories.ts`). Set `sourceType` and, for inferred recipes, a
`reviewNote` describing what was reconstructed and why.
