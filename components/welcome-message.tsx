"use client";

import { useEffect, useState } from "react";
import { useSettings } from "./settings-provider";
import { WELCOME_ENTER, WELCOME_KICKER, WELCOME_MESSAGE } from "@/lib/welcome";

const LS_KEY = "teta.welcomeSeen";

// First-visit welcome card. Shows once per device (remembered in localStorage);
// the same message lives on the /about page for rereading later. All copy comes
// from lib/welcome.ts — a single editable source.
export function WelcomeMessage() {
  const { locale } = useSettings();
  // `null` = undecided (pre-mount). We only ever show after reading localStorage
  // on the client, so the first server render / hydration paints nothing.
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setOpen(localStorage.getItem(LS_KEY) !== "1");
    } catch {
      setOpen(false);
    }
  }, []);

  // Lock background scroll while the card is up.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(LS_KEY, "1");
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink-950/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-heading"
    >
      <div className="animate-pop-in relative my-auto w-full max-w-lg">
        {/* Decorative card */}
        <div className="relative overflow-hidden rounded-3xl border border-accent-500/25 bg-cream-50 bg-paper p-1.5 shadow-2xl dark:border-accent-500/25 dark:bg-ink-900">
          {/* Inner ruled frame */}
          <div className="relative rounded-[1.35rem] border border-dashed border-accent-500/35 px-6 py-9 text-center sm:px-10 sm:py-11">
            {/* Corner flourishes */}
            <span className="pointer-events-none absolute inset-x-8 top-4 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
            <span className="pointer-events-none absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

            {/* Ornament */}
            <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-accent-500/12 text-accent-600 dark:text-accent-400">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15.5H5.5A1.5 1.5 0 0 1 4 18z" />
                <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15.5h5.5A1.5 1.5 0 0 0 20 18z" />
                <path d="M12 4v15.5" />
              </svg>
            </span>

            <p className="font-display text-sm font-semibold tracking-wide text-accent-600 dark:text-accent-400">
              {WELCOME_KICKER[locale]}
            </p>

            <h2 id="welcome-heading" className="sr-only">
              {WELCOME_KICKER[locale]}
            </h2>

            <p className="mx-auto mt-4 max-w-md text-balance font-display text-lg leading-loose text-ink-800 dark:text-cream-100/90">
              {WELCOME_MESSAGE[locale]}
            </p>

            <button
              type="button"
              onClick={dismiss}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3 text-base font-bold text-white shadow-lg transition hover:bg-accent-600 active:scale-[0.98]"
            >
              {WELCOME_ENTER[locale]}
              <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
