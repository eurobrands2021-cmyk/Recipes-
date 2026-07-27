"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryIcon } from "./category-icon";
import { CookingMode } from "./cooking-mode";
import { FavoriteButton } from "./favorite-button";
import { ReviewNote } from "./review-note";
import { ShareButton } from "./share-button";
import { SourceBadge } from "./source-badge";
import { StarRating } from "./star-rating";
import { useSettings } from "./settings-provider";
import { categoryName } from "@/lib/localized";
import { scaleIngredient, hasScalableQuantities } from "@/lib/scale";
import { ingredientEmoji, stepEmoji } from "@/lib/emoji";
import type { RecipeBundle } from "@/lib/localized";
import type { Category } from "@/lib/types";

const SCALE_OPTIONS = [
  { value: 0.5, label: "×½" },
  { value: 1, label: "×1" },
  { value: 2, label: "×2" },
  { value: 3, label: "×3" },
];

export function RecipeDetail({
  bundle,
  category,
}: {
  bundle: RecipeBundle;
  category: Category;
}) {
  const { locale, t } = useSettings();
  const [cooking, setCooking] = useState(false);
  const [scale, setScale] = useState(1);
  const c = bundle.content[locale];

  const scalable = useMemo(
    () => hasScalableQuantities(c.ingredients),
    [c.ingredients],
  );
  const shownIngredients = useMemo(
    () =>
      scale === 1
        ? c.ingredients
        : c.ingredients.map((line) => scaleIngredient(line, scale)),
    [c.ingredients, scale],
  );

  return (
    <article className="space-y-8 pt-2">
      <Link
        href={`/category/${category.slug}`}
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-700/60 transition hover:text-accent-600 dark:text-cream-100/50 dark:hover:text-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="grid h-6 w-6 place-items-center rounded-md bg-accent-500/10 text-accent-600 dark:text-accent-400">
          <CategoryIcon slug={category.slug} className="h-3.5 w-3.5" />
        </span>
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

      {/* Ingredients */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800 dark:text-cream-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 3h14l-1 7a6 6 0 0 1-12 0z" />
              <path d="M9 21h6M12 16v5" />
            </svg>
            {t("recipeIngredients")}
          </h2>
          {scalable && (
            <div
              className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-cream-50/70 p-1 dark:border-ink-700 dark:bg-ink-900/50"
              role="group"
              aria-label={t("scaleTitle")}
            >
              {SCALE_OPTIONS.map((o) => {
                const active = o.value === scale;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setScale(o.value)}
                    aria-pressed={active}
                    className={`min-h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition-all active:scale-95 ${
                      active
                        ? "bg-accent-500 text-white"
                        : "text-ink-700/70 hover:text-accent-600 dark:text-cream-100/60 dark:hover:text-accent-400"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {scalable && scale !== 1 && (
          <p className="mb-2 text-xs text-ink-700/55 dark:text-cream-100/45">
            {t("scaleHint")}
          </p>
        )}
        <ul className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50/60 dark:border-ink-800 dark:bg-ink-900/40">
          {shownIngredients.map((item, i) => {
            const emoji = ingredientEmoji(item);
            return (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-cream-200/70 px-4 py-3 last:border-b-0 dark:border-ink-800/70"
              >
                {emoji ? (
                  <span className="w-6 shrink-0 text-center text-lg leading-relaxed" aria-hidden>
                    {emoji}
                  </span>
                ) : (
                  <span className="mt-2 ms-2.5 me-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden />
                )}
                <span className="leading-relaxed text-ink-800 dark:text-cream-100/90">
                  {item}
                </span>
              </li>
            );
          })}
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
          {c.steps.map((step, i) => {
            const emoji = stepEmoji(step);
            return (
              <li
                key={i}
                className="flex gap-3 rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-500/15 font-display text-sm font-bold text-accent-600 dark:text-accent-400">
                  {i + 1}
                </span>
                <p className="pt-0.5 leading-relaxed text-ink-800 dark:text-cream-100/90">
                  {emoji && <span aria-hidden>{emoji} </span>}
                  {step}
                </p>
              </li>
            );
          })}
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
      <StarRating id={bundle.id} />

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
          ingredients={shownIngredients}
          steps={c.steps}
          notes={c.notes}
          onClose={() => setCooking(false)}
        />
      )}
    </article>
  );
}
