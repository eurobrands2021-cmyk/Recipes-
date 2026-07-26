"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CookingMode } from "./cooking-mode";
import { FavoriteButton } from "./favorite-button";
import { ReviewNote } from "./review-note";
import { ShareButton } from "./share-button";
import { SourceBadge } from "./source-badge";
import { RecipeRating, StarsDisplay } from "./star-rating";
import { useRatings } from "./ratings-provider";
import { useSettings } from "./settings-provider";
import {
  BASE_SERVINGS,
  MAX_SERVINGS,
  MIN_SERVINGS,
  scaleIngredients,
} from "@/lib/scale";
import { categoryName } from "@/lib/localized";
import type { RecipeBundle } from "@/lib/localized";
import type { Category } from "@/lib/types";

export function RecipeDetail({
  bundle,
  category,
}: {
  bundle: RecipeBundle;
  category: Category;
}) {
  const { locale, t } = useSettings();
  const { getRating } = useRatings();
  const [cooking, setCooking] = useState(false);
  const [servings, setServings] = useState(BASE_SERVINGS);
  const c = bundle.content[locale];
  const rating = getRating(bundle.id);

  const factor = servings / BASE_SERVINGS;
  const scaledIngredients = useMemo(
    () => scaleIngredients(c.ingredients, factor, locale),
    [c.ingredients, factor, locale],
  );

  return (
    <article className="space-y-8 pt-2">
      <Link
        href={`/category/${category.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-700/60 transition hover:text-accent-600 dark:text-cream-100/50 dark:hover:text-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {categoryName(category, locale)}
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-balance font-display text-3xl font-bold leading-tight text-ink-800 dark:text-cream-100">
            {c.title}
          </h1>
          <FavoriteButton id={bundle.id} size="lg" />
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <SourceBadge sourceType={bundle.sourceType} sourceNote={c.sourceNote} />
          {bundle.notebookPage != null && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/70 px-2.5 py-1 text-xs text-ink-700/70 dark:bg-ink-800/70 dark:text-cream-100/60">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h11l5 5v11H4z" />
                <path d="M15 4v5h5" />
              </svg>
              {t("recipePage")} {bundle.notebookPage}
            </span>
          )}
          {rating > 0 && <StarsDisplay value={rating} size="md" />}
        </div>
        {c.sourceNote && bundle.sourceType === "FRIEND_OR_RELATIVE" && (
          <p className="text-sm text-ink-700/70 dark:text-cream-100/60">
            {c.sourceNote}
          </p>
        )}
      </header>

      {/* Start Cooking */}
      <button
        type="button"
        onClick={() => setCooking(true)}
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-accent-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-accent-600 active:scale-[0.99]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M5 12a7 7 0 0 1 14 0M5 12a7 7 0 0 0 14 0" />
          <path d="M12 3v2M8 21h8" />
        </svg>
        {t("recipeStartCooking")}
      </button>

      {/* Servings scaler */}
      <section className="rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink-800 dark:text-cream-100">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
              </svg>
              {t("servingsTitle")}
            </h2>
            <p className="mt-0.5 text-xs text-ink-700/55 dark:text-cream-100/45">
              {t("servingsHint")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setServings((s) => Math.max(MIN_SERVINGS, s - 1))}
              disabled={servings <= MIN_SERVINGS}
              aria-label="-1"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream-300 bg-cream-50 text-lg font-bold text-ink-700 transition hover:border-accent-400/60 hover:text-accent-600 disabled:opacity-40 dark:border-ink-700 dark:bg-ink-900 dark:text-cream-100"
            >
              −
            </button>
            <span className="min-w-[2.5rem] text-center font-display text-2xl font-bold tabular-nums text-ink-800 dark:text-cream-100">
              {servings}
            </span>
            <button
              type="button"
              onClick={() => setServings((s) => Math.min(MAX_SERVINGS, s + 1))}
              disabled={servings >= MAX_SERVINGS}
              aria-label="+1"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream-300 bg-cream-50 text-lg font-bold text-ink-700 transition hover:border-accent-400/60 hover:text-accent-600 disabled:opacity-40 dark:border-ink-700 dark:bg-ink-900 dark:text-cream-100"
            >
              +
            </button>
          </div>
        </div>
        {servings !== BASE_SERVINGS && (
          <button
            type="button"
            onClick={() => setServings(BASE_SERVINGS)}
            className="mt-3 text-xs text-accent-600 underline-offset-2 transition hover:underline dark:text-accent-400"
          >
            {t("servingsReset")} ({BASE_SERVINGS})
          </button>
        )}
      </section>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 3h14l-1 7a6 6 0 0 1-12 0z" />
            <path d="M9 21h6M12 16v5" />
          </svg>
          {t("recipeIngredients")}
        </h2>
        <ul className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50/60 dark:border-ink-800 dark:bg-ink-900/40">
          {scaledIngredients.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 border-b border-cream-200/70 px-4 py-3 last:border-b-0 dark:border-ink-800/70"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden />
              <span className="leading-relaxed text-ink-800 dark:text-cream-100/90">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Method */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          {t("recipeMethod")}
        </h2>
        <ol className="space-y-3">
          {c.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-500/15 font-display text-sm font-bold text-accent-600 dark:text-accent-400">
                {i + 1}
              </span>
              <p className="pt-0.5 leading-relaxed text-ink-800 dark:text-cream-100/90">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Teta's notes */}
      {c.notes && (
        <section className="rounded-2xl border border-olive-500/30 bg-olive-500/5 p-4">
          <h2 className="mb-1.5 flex items-center gap-2 font-display text-base font-bold text-olive-600 dark:text-olive-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 15.6 7 18.2l1-5.5-4-3.9L9.5 8z" />
            </svg>
            {t("recipeTetaNotes")}
          </h2>
          <p className="leading-relaxed text-ink-800/90 dark:text-cream-100/80">
            {c.notes}
          </p>
        </section>
      )}

      {/* Review note */}
      {c.reviewNote && <ReviewNote note={c.reviewNote} />}

      {/* Rating */}
      <RecipeRating recipeId={bundle.id} />

      {/* Share */}
      <div className="flex items-center justify-between border-t border-cream-200/70 pt-6 dark:border-ink-800/70">
        <p className="text-xs text-ink-700/50 dark:text-cream-100/40">
          {t("recipeShareWithFamily")}
        </p>
        <ShareButton title={c.title} />
      </div>

      {cooking && (
        <CookingMode
          recipeId={bundle.id}
          title={c.title}
          ingredients={scaledIngredients}
          steps={c.steps}
          notes={c.notes}
          onClose={() => setCooking(false)}
        />
      )}
    </article>
  );
}
