import type { OverrideMap } from "../types";

// English translations, keyed by recipe id. Plain home-cooking English; units
// stay as cups/tbsp/tsp (not converted to grams).
//
// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST when adding a NEW recipe to the archive:
//   1. Add the formal Arabic entry to lib/recipes-data.ts (the `ar` base).
//   2. Add an `en` override here (title, ingredients, steps, notes, sourceNote,
//      reviewNote) — a recipe must ship all three locales before going live.
//   3. Add an `ar-EG` override in lib/i18n/recipes.ar-eg.ts.
// Any field left out of an override falls back to the formal Arabic content.
// ─────────────────────────────────────────────────────────────────────────────

export const enOverrides: OverrideMap = {};
