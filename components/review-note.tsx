"use client";

import { useSettings } from "./settings-provider";

// Subtle, collapsible review note — what was corrected/inferred and why.
export function ReviewNote({ note }: { note: string }) {
  const { t } = useSettings();
  return (
    <details className="group rounded-xl border border-cream-200 bg-cream-100/50 px-4 py-3 dark:border-ink-800 dark:bg-ink-900/40">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-ink-700/80 dark:text-cream-100/70">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M11 12h1v4h1" />
        </svg>
        {t("recipeReviewNote")}
        <svg viewBox="0 0 24 24" className="ms-auto h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <p className="mt-2 text-sm leading-relaxed text-ink-700/70 dark:text-cream-100/60">
        {note}
      </p>
    </details>
  );
}
