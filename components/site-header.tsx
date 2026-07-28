"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "./settings-provider";
import { SurpriseButton } from "./surprise-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { t } = useSettings();
  const pathname = usePathname();

  const iconBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-cream-50/60 text-ink-700 transition-all hover:bg-cream-200 hover:text-accent-600 active:scale-90 dark:border-ink-700 dark:bg-ink-900/60 dark:text-cream-100 dark:hover:bg-ink-800";
  const active = "text-accent-600 dark:text-accent-400";

  return (
    <header className="sticky top-0 z-20 border-b border-cream-200/80 bg-cream-50/85 backdrop-blur-md dark:border-ink-800/80 dark:bg-ink-950/80">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-0 items-center gap-2.5"
          aria-label={t("navHome")}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-600 dark:text-accent-400">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 3v6M17 3v6M12 3v6M5 9h14a0 0 0 0 1 0 0v2a7 7 0 0 1-14 0V9z" />
              <path d="M5 21h14" />
            </svg>
          </span>
          {/* Wordmark stays on ONE line; on narrow phones there isn't room for
              it beside the quick-action icons, so we show the logo mark alone
              and bring the name back once it fits (never wrap/stack it). */}
          <span className="hidden min-w-0 truncate font-display text-lg font-bold tracking-tight text-ink-800 group-hover:text-accent-600 min-[500px]:block dark:text-cream-100 dark:group-hover:text-accent-400">
            {t("appName")}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1.5">
          <SurpriseButton variant="icon" />
          <Link
            href="/favorites"
            aria-label={t("navFavorites")}
            title={t("navFavorites")}
            className={`${iconBtn} ${pathname === "/favorites" ? active : ""}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={pathname === "/favorites" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </Link>
          <Link
            href="/history"
            aria-label={t("navHistory")}
            title={t("navHistory")}
            className={`${iconBtn} ${pathname === "/history" ? active : ""}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 8v4l3 2" />
              <path d="M3.05 11a9 9 0 1 1 .5 4" />
              <path d="M3 4v4h4" />
            </svg>
          </Link>
          <Link
            href="/settings"
            aria-label={t("navSettings")}
            title={t("navSettings")}
            className={`${iconBtn} ${pathname === "/settings" ? active : ""}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
