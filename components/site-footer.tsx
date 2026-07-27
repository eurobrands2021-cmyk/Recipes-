"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";

export function SiteFooter() {
  const { t } = useSettings();
  return (
    <footer className="border-t border-cream-200/70 dark:border-ink-800/70">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 text-center sm:px-6">
        <p className="font-display text-sm text-accent-600 dark:text-accent-400">
          {t("footerLine")}
        </p>
        <p className="mt-1 text-xs text-ink-700/60 dark:text-cream-100/50">
          {t("footerSub")}
        </p>
        <Link
          href="/about"
          className="mt-3 inline-flex min-h-11 items-center rounded-full px-4 text-xs font-medium text-ink-700/70 underline-offset-4 transition hover:text-accent-600 hover:underline dark:text-cream-100/60 dark:hover:text-accent-400"
        >
          {t("navAbout")}
        </Link>
      </div>
    </footer>
  );
}
