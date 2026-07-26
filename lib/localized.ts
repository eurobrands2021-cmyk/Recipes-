import { categories } from "./categories";
import { normalizeArabic } from "./normalize";
import { recipes } from "./recipes-data";
import { allLocaleContent, resolveContent } from "./i18n/recipe-content";
import type { Locale } from "./i18n/locales";
import { LOCALES } from "./i18n/locales";
import type { Category, RecipeContent, SourceType } from "./types";

// Client-safe (pure data) localized views used by list pages and cards.

export interface LocalizedCard {
  id: string;
  categorySlug: string;
  notebookPage?: number;
  sourceType: SourceType;
  title: Record<Locale, string>;
  sourceNote: Record<Locale, string | undefined>;
  search: string; // normalized haystack across all locales
}

export interface RecipeBundle {
  id: string;
  categorySlug: string;
  notebookPage?: number;
  sourceType: SourceType;
  content: Record<Locale, RecipeContent>;
}

const buildCard = (id: string): LocalizedCard => {
  const r = recipes.find((x) => x.id === id)!;
  const title = {} as Record<Locale, string>;
  const sourceNote = {} as Record<Locale, string | undefined>;
  const parts: string[] = [];
  for (const loc of LOCALES) {
    const c = resolveContent(r, loc);
    title[loc] = c.title;
    sourceNote[loc] = c.sourceNote;
    parts.push(c.title, ...c.ingredients);
  }
  return {
    id: r.id,
    categorySlug: r.categorySlug,
    notebookPage: r.notebookPage,
    sourceType: r.sourceType,
    title,
    sourceNote,
    search: normalizeArabic(parts.join(" ")),
  };
};

export const cards: LocalizedCard[] = recipes.map((r) => buildCard(r.id));

export const cardsByCategory = (slug: string): LocalizedCard[] =>
  cards
    .filter((c) => c.categorySlug === slug)
    .sort(
      (a, b) =>
        (a.notebookPage ?? Number.MAX_SAFE_INTEGER) -
        (b.notebookPage ?? Number.MAX_SAFE_INTEGER),
    );

export const cardById = (id: string): LocalizedCard | undefined =>
  cards.find((c) => c.id === id);

export function getRecipeBundle(id: string): RecipeBundle | null {
  const r = recipes.find((x) => x.id === id);
  if (!r) return null;
  return {
    id: r.id,
    categorySlug: r.categorySlug,
    notebookPage: r.notebookPage,
    sourceType: r.sourceType,
    content: allLocaleContent(r),
  };
}

export const categoryName = (cat: Category, locale: Locale): string =>
  locale === "en" ? cat.nameEn : cat.nameAr;

export const localizedCategories = (locale: Locale) =>
  [...categories]
    .sort((a, b) => a.order - b.order)
    .map((c) => ({ ...c, name: categoryName(c, locale) }));

export const categoryCounts = (): Record<string, number> =>
  recipes.reduce<Record<string, number>>((acc, r) => {
    acc[r.categorySlug] = (acc[r.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
