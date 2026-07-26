"use client";

import Link from "next/link";
import { FavoriteButton } from "./favorite-button";
import { SourceBadge } from "./source-badge";
import { useSettings } from "./settings-provider";
import type { LocalizedCard } from "@/lib/localized";

export function RecipeCard({
  card,
  categoryName,
}: {
  card: LocalizedCard;
  categoryName?: string;
}) {
  const { locale } = useSettings();

  return (
    <div className="group relative flex items-center gap-2 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-400/60 hover:bg-white dark:border-ink-800 dark:bg-ink-900/50 dark:hover:border-accent-500/50 dark:hover:bg-ink-900">
      <Link
        href={`/recipe/${card.id}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold text-ink-800 group-hover:text-accent-600 dark:text-cream-100 dark:group-hover:text-accent-400">
            {card.title[locale]}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SourceBadge
              sourceType={card.sourceType}
              sourceNote={card.sourceNote[locale]}
            />
            {categoryName && (
              <span className="text-xs text-ink-700/60 dark:text-cream-100/50">
                {categoryName}
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
          </div>
        </div>
      </Link>
      <FavoriteButton id={card.id} size="sm" stopPropagation />
    </div>
  );
}
