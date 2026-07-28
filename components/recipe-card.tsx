"use client";

import Link from "next/link";
import { CategoryIcon } from "./category-icon";
import { FavoriteButton } from "./favorite-button";
import { StarsInline } from "./star-rating";
import { useSettings } from "./settings-provider";
import type { LocalizedCard } from "@/lib/localized";

export function RecipeCard({
  card,
  categoryName,
  note,
}: {
  card: LocalizedCard;
  categoryName?: string;
  /** Optional small line under the title (e.g. cooking-history summary). */
  note?: string;
}) {
  const { locale } = useSettings();

  return (
    <div className="group relative flex items-center gap-2 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-400/60 hover:bg-white active:translate-y-0 active:shadow-none dark:border-ink-800 dark:bg-ink-900/50 dark:hover:border-accent-500/50 dark:hover:bg-ink-900">
      <Link
        href={`/recipe/${card.id}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        {/* Line-art category mark stands in for the missing food photo. */}
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-600 transition-transform duration-200 group-hover:scale-105 group-hover:bg-accent-500/15 dark:text-accent-400">
          <CategoryIcon slug={card.categorySlug} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold text-ink-800 group-hover:text-accent-600 dark:text-cream-100 dark:group-hover:text-accent-400">
            {card.title[locale]}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {categoryName && (
              <span className="text-xs text-ink-700/60 dark:text-cream-100/50">
                {categoryName}
              </span>
            )}
            {note && (
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400">
                {note}
              </span>
            )}
            {card.notebookPage != null && (
              <span className="inline-flex items-center gap-1 text-xs text-ink-700/45 dark:text-cream-100/35">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 4h11l5 5v11H4z" />
                  <path d="M15 4v5h5" />
                </svg>
                {card.notebookPage}
              </span>
            )}
            <StarsInline id={card.id} />
          </div>
        </div>
      </Link>
      <FavoriteButton id={card.id} size="sm" stopPropagation />
    </div>
  );
}
