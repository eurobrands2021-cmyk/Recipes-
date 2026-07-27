"use client";

import Link from "next/link";
import { CategoryIcon } from "./category-icon";
import { RecipeCard } from "./recipe-card";
import { useSettings } from "./settings-provider";
import { cardsByCategory, categoryName } from "@/lib/localized";
import type { Category } from "@/lib/types";

export function CategoryView({ category }: { category: Category }) {
  const { locale, t } = useSettings();
  const cards = cardsByCategory(category.slug);
  const name = categoryName(category, locale);

  return (
    <div className="space-y-6 pt-2">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-700/60 transition hover:text-accent-600 dark:text-cream-100/50 dark:hover:text-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {t("allCategories")}
      </Link>

      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/12 text-accent-600 dark:text-accent-400">
          <CategoryIcon slug={category.slug} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
            {name}
          </h1>
          <p className="text-sm text-ink-700/55 dark:text-cream-100/45">
            {cards.length} {t("countRecipes")}
          </p>
        </div>
      </header>

      <div className="space-y-3">
        {cards.map((card) => (
          <RecipeCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
