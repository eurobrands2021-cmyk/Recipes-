"use client";

import Link from "next/link";
import { RecipeCard } from "./recipe-card";
import { useFavorites } from "./favorites-provider";
import { useSettings } from "./settings-provider";
import { cardById, localizedCategories } from "@/lib/localized";

export function FavoritesView() {
  const { favorites, ready } = useFavorites();
  const { locale, t } = useSettings();

  const catNames: Record<string, string> = {};
  for (const c of localizedCategories(locale)) catNames[c.slug] = c.name;

  const savedCards = favorites
    .map((id) => cardById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="space-y-6 pt-2">
      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/12 text-accent-600 dark:text-accent-400">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" stroke="none" aria-hidden>
            <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
            {t("favoritesTitle")}
          </h1>
          <p className="text-sm text-ink-700/55 dark:text-cream-100/45">
            {savedCards.length} {t("countRecipes")}
          </p>
        </div>
      </header>

      {ready && savedCards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 px-6 py-12 text-center dark:border-ink-800 dark:bg-ink-900/40">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-500/10 text-accent-500/70">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </div>
          <p className="mt-4 text-ink-700/70 dark:text-cream-100/60">
            {t("favoritesEmpty")}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600"
          >
            {t("favoritesBrowse")}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedCards.map((card) => (
            <RecipeCard
              key={card.id}
              card={card}
              categoryName={catNames[card.categorySlug]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
