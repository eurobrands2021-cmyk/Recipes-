"use client";

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
      </div>
    </footer>
  );
}
