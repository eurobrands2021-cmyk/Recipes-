"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";
import { WELCOME_KICKER, WELCOME_MESSAGE } from "@/lib/welcome";

// The About page reuses the exact same heritage message as the first-visit
// Welcome card (single source: lib/welcome.ts), so the family can reread it any
// time — not just on their first visit.
export function AboutView() {
  const { locale, t } = useSettings();

  return (
    <div className="space-y-8 pt-2">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-ink-700/60 transition hover:text-accent-600 dark:text-cream-100/50 dark:hover:text-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {t("navHome")}
      </Link>

      <div className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-cream-50 bg-paper p-1.5 shadow-card dark:bg-ink-900">
        <div className="rounded-[1.35rem] border border-dashed border-accent-500/30 px-6 py-10 text-center sm:px-12 sm:py-14">
          <span className="pointer-events-none absolute inset-x-10 top-5 h-px bg-gradient-to-r from-transparent via-accent-500/25 to-transparent" />

          <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-accent-500/12 text-accent-600 dark:text-accent-400">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15.5H5.5A1.5 1.5 0 0 1 4 18z" />
              <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15.5h5.5A1.5 1.5 0 0 0 20 18z" />
              <path d="M12 4v15.5" />
            </svg>
          </span>

          <h1 className="font-display text-sm font-semibold tracking-wide text-accent-600 dark:text-accent-400">
            {WELCOME_KICKER[locale]}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance font-display text-lg leading-loose text-ink-800 dark:text-cream-100/90">
            {WELCOME_MESSAGE[locale]}
          </p>
        </div>
      </div>

      <p className="text-center font-display text-sm text-accent-600 dark:text-accent-400">
        {t("footerLine")}
      </p>
    </div>
  );
}
