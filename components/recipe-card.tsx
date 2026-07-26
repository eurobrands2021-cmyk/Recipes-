import Link from "next/link";
import { SourceBadge } from "./source-badge";
import type { RecipeWithCategory } from "@/lib/types";

export function RecipeCard({
  recipe,
  showCategory = false,
}: {
  recipe: RecipeWithCategory;
  showCategory?: boolean;
}) {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-clay-400/60 hover:bg-white dark:border-ink-800 dark:bg-ink-900/50 dark:hover:border-clay-500/50 dark:hover:bg-ink-900"
    >
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg font-bold text-ink-800 group-hover:text-clay-600 dark:text-cream-100 dark:group-hover:text-clay-400">
          {recipe.titleAr}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <SourceBadge recipe={recipe} />
          {showCategory && (
            <span className="text-xs text-ink-700/60 dark:text-cream-100/50">
              {recipe.category.nameAr}
            </span>
          )}
          {recipe.notebookPage != null && (
            <span className="text-xs text-ink-700/50 dark:text-cream-100/40">
              صفحة {recipe.notebookPage}
            </span>
          )}
        </div>
      </div>
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 -scale-x-100 text-ink-700/35 transition-transform group-hover:-translate-x-1 group-hover:text-clay-500 dark:text-cream-100/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}
