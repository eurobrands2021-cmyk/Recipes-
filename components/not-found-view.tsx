"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";

export function NotFoundView() {
  const { t } = useSettings();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-10 text-center">
      {/* Soft branded illustration — an empty pot, nothing cooking here. */}
      <div className="relative grid h-28 w-28 place-items-center rounded-full bg-accent-500/10">
        <svg
          viewBox="0 0 24 24"
          className="h-14 w-14 text-accent-500/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M7 3v6M17 3v6M12 3v6M5 9h14v2a7 7 0 0 1-14 0V9z" />
          <path d="M5 21h14" />
        </svg>
        <span
          className="absolute -bottom-1 -end-1 grid h-9 w-9 place-items-center rounded-full bg-cream-50 font-display text-lg font-bold text-accent-500 shadow-card dark:bg-ink-900"
          aria-hidden
        >
          ؟
        </span>
      </div>

      <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
        {t("notFoundTitle")}
      </h1>
      <p className="max-w-sm text-balance leading-relaxed text-ink-700/70 dark:text-cream-100/60">
        {t("notFoundBody")}
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600 active:scale-[0.98]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
          {t("notFoundBack")}
        </Link>
        <Link
          href="/favorites"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream-300 px-6 py-2.5 text-sm font-medium text-ink-700 transition hover:border-accent-400/60 hover:text-accent-600 dark:border-ink-700 dark:text-cream-100 dark:hover:text-accent-400"
        >
          {t("notFoundHome")}
        </Link>
      </div>
    </div>
  );
}
