import { recipes } from "../recipes-data";
import type { Recipe, RecipeContent } from "../types";
import { enOverrides } from "./recipes.en";
import { arEgOverrides } from "./recipes.ar-eg";
import type { Locale } from "./locales";

// Resolves a recipe's user-facing content for a given locale.
// `ar` (formal) is the base, taken straight from the recipe data. `ar-EG` and
// `en` are per-field overrides; any missing field falls back to `ar` so the
// site is always complete even while translations are being filled in.

const baseContent = (r: Recipe): RecipeContent => ({
  title: r.titleAr,
  ingredients: r.ingredients,
  steps: r.steps,
  notes: r.notes,
  sourceNote: r.sourceNote,
  reviewNote: r.reviewNote,
});

const overridesFor = (locale: Locale) =>
  locale === "en" ? enOverrides : locale === "ar-EG" ? arEgOverrides : {};

export function resolveContent(r: Recipe, locale: Locale): RecipeContent {
  const base = baseContent(r);
  if (locale === "ar") return base;
  const o = overridesFor(locale)[r.id];
  if (!o) return base;
  return {
    title: o.title ?? base.title,
    ingredients: o.ingredients ?? base.ingredients,
    steps: o.steps ?? base.steps,
    notes: o.notes ?? base.notes,
    sourceNote: o.sourceNote ?? base.sourceNote,
    reviewNote: o.reviewNote ?? base.reviewNote,
  };
}

export function allLocaleContent(
  r: Recipe,
): Record<Locale, RecipeContent> {
  return {
    "ar-EG": resolveContent(r, "ar-EG"),
    ar: resolveContent(r, "ar"),
    en: resolveContent(r, "en"),
  };
}

export const recipeById = (id: string): Recipe | undefined =>
  recipes.find((r) => r.id === id);
