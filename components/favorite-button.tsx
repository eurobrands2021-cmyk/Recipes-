"use client";

import { useFavorites } from "./favorites-provider";
import { useSettings } from "./settings-provider";

export function FavoriteButton({
  id,
  size = "md",
  stopPropagation = false,
}: {
  id: string;
  size?: "sm" | "md" | "lg";
  stopPropagation?: boolean;
}) {
  const { isFavorite, toggle, ready } = useFavorites();
  const { t } = useSettings();
  const fav = ready && isFavorite(id);

  const box =
    size === "lg" ? "h-11 w-11" : size === "sm" ? "h-10 w-10" : "h-10 w-10";
  const icon = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-5 w-5" : "h-5 w-5";

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? t("favoriteRemove") : t("favoriteAdd")}
      title={fav ? t("favoriteRemove") : t("favoriteAdd")}
      onClick={(e) => {
        if (stopPropagation) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggle(id);
      }}
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
        fav
          ? "border-accent-500/40 bg-accent-500/12 text-accent-600 dark:text-accent-400"
          : "border-cream-300 bg-cream-50/60 text-ink-700/50 hover:text-accent-500 dark:border-ink-700 dark:bg-ink-900/50 dark:text-cream-100/40"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`${icon} transition-transform ${fav ? "scale-110" : ""}`}
        fill={fav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}
