"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings } from "./settings-provider";

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function CookingTimer({ seconds }: { seconds: number }) {
  const { t } = useSettings();
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(ref.current!);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [running]);

  if (done) {
    return (
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-olive-500/15 px-4 py-2 text-sm font-medium text-olive-600 dark:text-olive-500">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
        {t("cookingTimerDone")}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (running) {
          setRunning(false);
        } else {
          if (remaining === 0) setRemaining(seconds);
          setRunning(true);
        }
      }}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-400/50 bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-600 transition hover:bg-accent-500/20 dark:text-accent-400"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2M9 2h6" />
      </svg>
      {running ? fmt(remaining) : `${t("cookingStartTimer")} · ${fmt(remaining)}`}
    </button>
  );
}
