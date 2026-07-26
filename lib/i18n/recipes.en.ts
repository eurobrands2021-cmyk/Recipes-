import type { OverrideMap } from "../types";
import { enPart1 } from "./en/part1";
import { enPart2 } from "./en/part2";
import { enPart3 } from "./en/part3";
import { enPart4 } from "./en/part4";

// English translations, keyed by recipe id (assembled from parts). Plain
// home-cooking English; units stay as cups/tbsp/tsp (not converted to grams).
//
// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST when adding a NEW recipe to the archive:
//   1. Add the formal Arabic entry to lib/recipes-data.ts (the `ar` base).
//   2. Add an `en` override in the appropriate lib/i18n/en/partN.ts (title,
//      ingredients, steps, notes, sourceNote, reviewNote) — a recipe must ship
//      all three locales before going live.
//   3. Add an `ar-EG` override in lib/i18n/ar-eg/partN.ts.
// Any field left out of an override falls back to the formal Arabic content.
// ─────────────────────────────────────────────────────────────────────────────

export const enOverrides: OverrideMap = {
  ...enPart1,
  ...enPart2,
  ...enPart3,
  ...enPart4,
};
