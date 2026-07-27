"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSettings } from "./settings-provider";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : undefined;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t("settingsThemeLight") : t("settingsThemeDark")}
      title={isDark ? t("settingsThemeLight") : t("settingsThemeDark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-cream-50/60 text-ink-700 transition-all hover:bg-cream-200 hover:text-accent-600 active:scale-90 dark:border-ink-700 dark:bg-ink-900/60 dark:text-cream-100 dark:hover:bg-ink-800"
    >
      {!mounted ? (
        <span className="h-5 w-5" />
      ) : isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
