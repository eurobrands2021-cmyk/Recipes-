"use client";

import Link from "next/link";
import { useSettings } from "./settings-provider";

export function NotFoundView() {
  const { t } = useSettings();
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-5xl font-bold text-accent-500/50">؟</p>
      <h1 className="font-display text-xl font-bold text-ink-800 dark:text-cream-100">
        {t("notFoundTitle")}
      </h1>
      <p className="text-sm text-ink-700/60 dark:text-cream-100/50">
        {t("notFoundBody")}
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-600"
      >
        {t("notFoundBack")}
      </Link>
    </div>
  );
}
