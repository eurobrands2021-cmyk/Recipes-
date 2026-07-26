"use client";

import { useState } from "react";
import { useRatings } from "./ratings-provider";
import { useSettings } from "./settings-provider";

function Star({
  fill,
  className = "",
}: {
  fill: number; // 0..1 portion filled
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <span className={`relative inline-block ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-full w-full text-cream-300 dark:text-ink-700" fill="currentColor">
        <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9z" />
      </svg>
      {clamped > 0 && (
        <span
          className="absolute inset-0 overflow-hidden rtl:right-0"
          style={{ width: `${clamped * 100}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full text-accent-500" fill="currentColor" preserveAspectRatio="xMinYMid meet">
            <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9z" />
          </svg>
        </span>
      )}
    </span>
  );
}

// Compact, read-only stars + numeric value. Used on cards and the detail header.
export function StarsDisplay({
  value,
  size = "sm",
}: {
  value: number;
  size?: "sm" | "md";
}) {
  if (!value) return null;
  const star = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${value} / 5`}>
      <span className="inline-flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={value - i} className={star} />
        ))}
      </span>
      <span className="text-xs font-semibold text-ink-700/70 dark:text-cream-100/60">
        {value.toFixed(1)}
      </span>
    </span>
  );
}

// Interactive rating control for the recipe detail page.
export function RecipeRating({ recipeId }: { recipeId: string }) {
  const { t } = useSettings();
  const { getRating, setRating, clearRating } = useRatings();
  const [hover, setHover] = useState(0);
  const current = getRating(recipeId);
  const shown = hover || current;

  return (
    <section className="rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-base font-bold text-ink-800 dark:text-cream-100">
          {t("ratingTitle")}
        </h2>
        {current > 0 && (
          <button
            type="button"
            onClick={() => {
              clearRating(recipeId);
              setHover(0);
            }}
            className="text-xs text-ink-700/55 underline-offset-2 transition hover:text-accent-600 hover:underline dark:text-cream-100/45 dark:hover:text-accent-400"
          >
            {t("ratingClear")}
          </button>
        )}
      </div>

      <div
        className="mt-3 flex items-center gap-1.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(recipeId, n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            aria-label={`${n} / 5`}
            aria-pressed={current === n}
            className="rounded-md p-0.5 transition-transform hover:scale-110 active:scale-95"
          >
            <Star fill={shown >= n ? 1 : 0} className="h-8 w-8" />
          </button>
        ))}
        {current > 0 && (
          <span className="ms-2 text-sm font-semibold text-ink-700/70 dark:text-cream-100/60">
            {current.toFixed(1)}
          </span>
        )}
      </div>
    </section>
  );
}
