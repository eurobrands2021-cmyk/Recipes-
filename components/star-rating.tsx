"use client";

import { useState } from "react";
import { useRatings } from "./ratings-provider";
import { useSettings } from "./settings-provider";

function Star({ filled, className = "h-7 w-7" }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" />
    </svg>
  );
}

/** Interactive 1–5 rating for the recipe detail page. */
export function StarRating({ id }: { id: string }) {
  const { getRating, setRating, clearRating, ready } = useRatings();
  const { t } = useSettings();
  const [hover, setHover] = useState(0);

  const current = ready ? getRating(id) : 0;
  const shown = hover || current;

  return (
    <section className="rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-bold text-ink-800 dark:text-cream-100">
          {t("ratingTitle")}
        </h2>
        {current > 0 && (
          <button
            type="button"
            onClick={() => clearRating(id)}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-700/60 transition hover:text-accent-600 dark:text-cream-100/50 dark:hover:text-accent-400"
          >
            {t("ratingClear")}
          </button>
        )}
      </div>
      <div
        role="radiogroup"
        aria-label={t("ratingYours")}
        className="mt-2 flex items-center gap-1"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={current === n}
            aria-label={`${n} / 5`}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => (current === n ? clearRating(id) : setRating(id, n))}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform active:scale-90 ${
              n <= shown
                ? "text-accent-500"
                : "text-ink-700/25 hover:text-accent-400 dark:text-cream-100/20"
            }`}
          >
            <Star filled={n <= shown} />
          </button>
        ))}
      </div>
    </section>
  );
}

/** Compact, read-only star row for cards — renders nothing until rated. */
export function StarsInline({ id }: { id: string }) {
  const { getRating, ready } = useRatings();
  const rating = ready ? getRating(id) : 0;
  if (!rating) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-accent-500"
      aria-label={`${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}
