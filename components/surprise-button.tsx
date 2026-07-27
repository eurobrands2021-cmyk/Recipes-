"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { cards } from "@/lib/localized";
import { useSettings } from "./settings-provider";

function DiceIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Sends the user to a random recipe. `variant="icon"` for the header, "button"
 *  for a prominent call-to-action on the home page. */
export function SurpriseButton({
  variant = "icon",
  className = "",
}: {
  variant?: "icon" | "button";
  className?: string;
}) {
  const router = useRouter();
  const { t } = useSettings();

  const go = useCallback(() => {
    if (cards.length === 0) return;
    const pick = cards[Math.floor(Math.random() * cards.length)];
    router.push(`/recipe/${pick.id}`);
  }, [router]);

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={go}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream-300 bg-cream-50/70 px-5 py-2.5 text-sm font-semibold text-ink-700 transition-all hover:border-accent-400/60 hover:text-accent-600 active:scale-[0.98] dark:border-ink-700 dark:bg-ink-900/50 dark:text-cream-100 dark:hover:text-accent-400 ${className}`}
      >
        <DiceIcon />
        {t("navSurprise")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={go}
      aria-label={t("navSurprise")}
      title={t("navSurprise")}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-cream-50/60 text-ink-700 transition-all hover:bg-cream-200 hover:text-accent-600 active:scale-90 dark:border-ink-700 dark:bg-ink-900/60 dark:text-cream-100 dark:hover:bg-ink-800 ${className}`}
    >
      <DiceIcon />
    </button>
  );
}
