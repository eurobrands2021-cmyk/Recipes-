// Shared domain types for Teta's Cookbook.
// Mirrors the Prisma schema in prisma/schema.prisma so mock mode and DB mode
// expose the exact same shape to the UI.

export type SourceType =
  | "GRANDMOTHER_WRITTEN" // written by grandmother herself
  | "INFERRED" // logically reconstructed, not written
  | "FRIEND_OR_RELATIVE"; // originally sourced from someone else, noted in her book

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  order: number;
}

export interface Recipe {
  id: string;
  titleAr: string;
  titleEn?: string;
  notebookPage?: number;
  categorySlug: string;

  sourceType: SourceType;
  sourceNote?: string;

  ingredients: string[];
  steps: string[];

  notes?: string; // Teta's personal notes/tips
  reviewNote?: string; // What was corrected / inferred during review + why
}

export interface RecipeWithCategory extends Recipe {
  category: Category;
}

// Locale-resolved content for a single recipe (see lib/i18n).
export interface RecipeContent {
  title: string;
  ingredients: string[];
  steps: string[];
  notes?: string;
  sourceNote?: string;
  reviewNote?: string;
}

// A per-locale override: any subset of fields; missing fields fall back to the
// formal Arabic (`ar`) content derived from the base Recipe.
export type RecipeOverride = Partial<RecipeContent>;
export type OverrideMap = Record<string, RecipeOverride>;
