import { categories, categoryBySlug } from "./categories";
import { normalizeArabic } from "./normalize";
import { recipes } from "./recipes-data";
import type { Category, Recipe, RecipeWithCategory } from "./types";

export { normalizeArabic };

// ─────────────────────────────────────────────────────────────────────────────
// Data access layer.
//
// Mock Mode (PRD §7.7, §10) is the default: the app runs entirely off the
// curated seed data in lib/recipes-data.ts with no database connection, which
// keeps local preview and Vercel deploys trivially reproducible.
//
// Setting MOCK_MODE=false (and providing DATABASE_URL) can be wired to a live
// Prisma/PostgreSQL source; the query functions below are async so swapping the
// backing store never touches the UI.
// ─────────────────────────────────────────────────────────────────────────────

export const isMockMode = process.env.MOCK_MODE !== "false";

const withCategory = (recipe: Recipe): RecipeWithCategory => {
  const category = categoryBySlug(recipe.categorySlug) ?? {
    id: "cat-unknown",
    nameAr: "غير مصنّف",
    nameEn: "Uncategorized",
    slug: "uncategorized",
    order: 999,
  };
  return { ...recipe, category };
};

export async function getCategories(): Promise<Category[]> {
  return [...categories].sort((a, b) => a.order - b.order);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  return recipes.reduce<Record<string, number>>((acc, r) => {
    acc[r.categorySlug] = (acc[r.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
}

export async function getRecipesByCategory(
  slug: string,
): Promise<RecipeWithCategory[]> {
  return recipes
    .filter((r) => r.categorySlug === slug)
    .map(withCategory)
    .sort((a, b) => (a.notebookPage ?? 0) - (b.notebookPage ?? 0));
}

export async function getRecipe(
  id: string,
): Promise<RecipeWithCategory | null> {
  const recipe = recipes.find((r) => r.id === id);
  return recipe ? withCategory(recipe) : null;
}

export async function getAllRecipes(): Promise<RecipeWithCategory[]> {
  return recipes.map(withCategory);
}

// Arabic-aware search across titles and ingredients (PRD §7.4).
export async function searchRecipes(
  query: string,
): Promise<RecipeWithCategory[]> {
  const q = normalizeArabic(query);
  if (!q) return [];
  return recipes
    .filter((r) => {
      const haystack = normalizeArabic(
        [r.titleAr, r.titleEn ?? "", ...r.ingredients].join(" "),
      );
      return haystack.includes(q);
    })
    .map(withCategory);
}
