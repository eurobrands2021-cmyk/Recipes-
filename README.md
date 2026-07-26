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
- **Arabic-aware search** across titles and ingredients (folds hamza, teh-marbuta,
  alef-maqsura and diacritics so spelling variations still match).
- **Share** — per-recipe link via the Web Share API, with clipboard fallback,
  for sending into the family WhatsApp group.
- **Dark / light mode** with system-preference detection.
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
