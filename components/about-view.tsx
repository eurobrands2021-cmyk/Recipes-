"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";

export function AboutView() {
  const { t } = useSettings();
  return (
    <div className="mx-auto max-w-2xl space-y-8 pt-2">
      <header className="space-y-3 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-500/12 text-accent-600 dark:text-accent-400">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 3v6M17 3v6M12 3v6M5 9h14v2a7 7 0 0 1-14 0V9z" />
            <path d="M5 21h14" />
          </svg>
        </span>
        <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
          {t("aboutTitle")}
        </h1>
        <p className="font-display text-sm text-accent-600 dark:text-accent-400">
          {t("dedicationKicker")}
        </p>
      </header>

      <section className="rounded-2xl border border-cream-200 bg-cream-50/60 p-6 text-lg leading-loose text-ink-800/90 dark:border-ink-800 dark:bg-ink-900/40 dark:text-cream-100/85">
        {/* Single shared dedication — same text as the home welcome message. */}
        <p>{t("dedicationSub")}</p>
      </section>

      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600 active:scale-[0.98]"
        >
          {t("notFoundHome")}
        </Link>
      </div>
    </div>
  );
}
