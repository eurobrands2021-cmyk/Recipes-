"use client";

import { useRouter } from "next/navigation";
import { useSettings } from "./settings-provider";
import { cards } from "@/lib/localized";

// Opens a random recipe from the whole archive.
export function SurpriseButton({
  variant = "icon",
}: {
  variant?: "icon" | "full";
}) {
  const router = useRouter();
  const { t } = useSettings();

  function surprise() {
    if (cards.length === 0) return;
    const pick = cards[Math.floor(Math.random() * cards.length)];
    router.push(`/recipe/${pick.id}`);
  }

  const dice = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={surprise}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-accent-400/50 bg-accent-500/10 px-5 py-3.5 font-display text-base font-bold text-accent-600 transition hover:bg-accent-500/15 active:scale-[0.99] dark:text-accent-400"
      >
        {dice}
        {t("surprise")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={surprise}
      aria-label={t("surprise")}
      title={t("surprise")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 bg-cream-50/60 text-ink-700 transition-colors hover:bg-cream-200 hover:text-accent-600 dark:border-ink-700 dark:bg-ink-900/60 dark:text-cream-100 dark:hover:bg-ink-800"
    >
      {dice}
    </button>
  );
}
