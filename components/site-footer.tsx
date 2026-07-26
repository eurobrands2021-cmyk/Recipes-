"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";
import { SiteActions } from "./site-actions";

export function SiteFooter() {
  const { t } = useSettings();
  return (
    <footer className="border-t border-cream-200/70 dark:border-ink-800/70">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 text-center sm:px-6">
        <p className="font-display text-sm text-accent-600 dark:text-accent-400">
          {t("footerLine")}
        </p>
        <p className="mt-1 text-xs text-ink-700/60 dark:text-cream-100/50">
          {t("footerSub")}
        </p>

        <Link
          href="/about"
          className="mt-4 text-xs text-ink-700/60 underline-offset-4 transition hover:text-accent-600 hover:underline dark:text-cream-100/50 dark:hover:text-accent-400"
        >
          {t("aboutNav")}
        </Link>

        <SiteActions />

        {/* Quiet developer credit. */}
        <p className="mt-6 text-[0.7rem] leading-relaxed text-ink-700/40 dark:text-cream-100/30">
          {t("footerCredit")}
        </p>
      </div>
    </footer>
  );
}
