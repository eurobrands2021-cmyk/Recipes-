"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CookingTimer } from "./cooking-timer";
import { useSettings } from "./settings-provider";
import { parseDurationSeconds, servingChecks } from "@/lib/cooking";
import { ingredientEmoji, stepEmoji } from "@/lib/emoji";
import type { Locale } from "@/lib/i18n/locales";

interface CookingState {
  phase: 0 | 1 | 2;
  ing: number[];
  stepIndex: number;
  stepsDone: number[];
  serving: number[];
  finished: boolean;
}

const emptyState: CookingState = {
  phase: 0,
  ing: [],
  stepIndex: 0,
  stepsDone: [],
  serving: [],
  finished: false,
};

const stepCounter = (i: number, n: number, locale: Locale) =>
  locale === "en" ? `Step ${i} of ${n}` : `خطوة ${i} من ${n}`;

export function CookingMode({
  recipeId,
  title,
  ingredients,
  steps,
  notes,
  onClose,
}: {
  recipeId: string;
  title: string;
  ingredients: string[];
  steps: string[];
  notes?: string;
  onClose: () => void;
}) {
  const { locale, t } = useSettings();
  const lsKey = `teta.cooking.${recipeId}`;
  const [state, setState] = useState<CookingState>(emptyState);
  // Render into <body> so the full-screen overlay escapes the page's stacking
  // context and reliably covers the sticky site header while cooking.
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  const serving = useMemo(
    () => servingChecks(steps, notes, locale),
    [steps, notes, locale],
  );

  // Load persisted progress.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(lsKey);
      if (raw) {
        const p = JSON.parse(raw);
        setState({ ...emptyState, ...p });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lsKey]);

  const update = useCallback(
    (patch: Partial<CookingState>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        try {
          localStorage.setItem(lsKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [lsKey],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(lsKey);
    } catch {}
    setState(emptyState);
  }, [lsKey]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggle = (list: number[], i: number) =>
    list.includes(i) ? list.filter((x) => x !== i) : [...list, i];

  const phaseChip = (idx: 0 | 1 | 2, label: string) => (
    <button
      type="button"
      onClick={() => update({ phase: idx })}
      className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold transition ${
        state.phase === idx
          ? "bg-accent-500 text-white"
          : "bg-cream-200/60 text-ink-700/70 dark:bg-ink-800/60 dark:text-cream-100/60"
      }`}
    >
      {label}
    </button>
  );

  const primaryBtn =
    "w-full rounded-2xl bg-accent-500 px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition active:scale-[0.98] hover:bg-accent-600";
  const ghostBtn =
    "rounded-2xl border border-cream-300 px-6 py-4 text-lg font-semibold text-ink-700 transition active:scale-[0.98] hover:bg-cream-100 dark:border-ink-700 dark:text-cream-100 dark:hover:bg-ink-800";

  const total = steps.length;
  const current = Math.min(state.stepIndex, total - 1);
  const stepDuration = parseDurationSeconds(steps[current] ?? "");

  if (!portalReady) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-cream-50 dark:bg-ink-950">
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-cream-200 px-4 py-3 dark:border-ink-800">
        <h2 className="min-w-0 flex-1 truncate font-display text-lg font-bold text-ink-800 dark:text-cream-100">
          {title}
        </h2>
        <button
          type="button"
          onClick={reset}
          className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-700/70 transition hover:bg-cream-200 dark:text-cream-100/60 dark:hover:bg-ink-800"
        >
          {t("cookingReset")}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("cookingExit")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition hover:bg-cream-200 dark:text-cream-100 dark:hover:bg-ink-800"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phase chips */}
      <div className="flex items-center gap-2 px-4 py-3">
        {phaseChip(0, t("cookingPrep"))}
        {phaseChip(1, t("cookingMethod"))}
        {phaseChip(2, t("cookingServing"))}
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-xl flex-1 overflow-y-auto px-4 pb-4">
        {state.phase === 0 && (
          <div className="animate-pop-in space-y-2">
            <h3 className="mb-3 font-display text-xl font-bold text-ink-800 dark:text-cream-100">
              {t("cookingPrep")}
            </h3>
            {ingredients.map((item, i) => {
              const done = state.ing.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  data-done={done}
                  onClick={() => update({ ing: toggle(state.ing, i) })}
                  className="strike flex w-full items-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 text-start transition active:scale-[0.99] dark:border-ink-800 dark:bg-ink-900/50"
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition ${
                      done
                        ? "border-accent-500 bg-accent-500 text-white"
                        : "border-cream-300 dark:border-ink-700"
                    }`}
                  >
                    {done && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </span>
                  <span className="strike-text text-lg leading-relaxed text-ink-800 dark:text-cream-100/90">
                    {ingredientEmoji(item) && (
                      <span aria-hidden>{ingredientEmoji(item)} </span>
                    )}
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {state.phase === 1 && (
          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink-700/70 dark:text-cream-100/60">
                <span>{stepCounter(current + 1, total, locale)}</span>
                <span>{Math.round(((current + 1) / total) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-cream-200 dark:bg-ink-800">
                <div
                  className="h-full rounded-full bg-accent-500 transition-all duration-300"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Focused step */}
            <div
              key={current}
              className="animate-pop-in rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-500/15 font-display text-lg font-bold text-accent-600 dark:text-accent-400">
                {current + 1}
              </span>
              <p className="mt-4 text-2xl font-medium leading-relaxed text-ink-800 dark:text-cream-100">
                {stepEmoji(steps[current] ?? "") && (
                  <span aria-hidden>{stepEmoji(steps[current] ?? "")} </span>
                )}
                {steps[current]}
              </p>
              {stepDuration != null && <CookingTimer seconds={stepDuration} />}
            </div>
          </div>
        )}

        {state.phase === 2 && (
          <div className="animate-pop-in space-y-2">
            <h3 className="mb-3 font-display text-xl font-bold text-ink-800 dark:text-cream-100">
              {t("cookingServing")}
            </h3>
            {serving.map((item, i) => {
              const done = state.serving.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  data-done={done}
                  onClick={() => update({ serving: toggle(state.serving, i) })}
                  className="strike flex w-full items-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4 text-start transition active:scale-[0.99] dark:border-ink-800 dark:bg-ink-900/50"
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition ${
                      done
                        ? "border-olive-500 bg-olive-500 text-white"
                        : "border-cream-300 dark:border-ink-700"
                    }`}
                  >
                    {done && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </span>
                  <span className="strike-text text-lg leading-relaxed text-ink-800 dark:text-cream-100/90">
                    {item}
                  </span>
                </button>
              );
            })}

            {state.finished && (
              <div className="mt-6 animate-pop-in rounded-3xl border border-olive-500/30 bg-olive-500/10 p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-olive-500/20 text-olive-600 dark:text-olive-500">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <p className="mt-3 font-display text-xl font-bold text-olive-600 dark:text-olive-500">
                  {t("cookingAllDone")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-cream-200 bg-cream-50/90 px-4 py-4 backdrop-blur dark:border-ink-800 dark:bg-ink-950/90">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {state.phase === 0 && (
            <button
              type="button"
              className={primaryBtn}
              onClick={() => update({ phase: 1 })}
            >
              {t("cookingStartMethod")}
            </button>
          )}

          {state.phase === 1 && (
            <>
              <button
                type="button"
                disabled={current === 0}
                onClick={() => update({ stepIndex: Math.max(0, current - 1) })}
                className={`${ghostBtn} ${current === 0 ? "opacity-40" : ""}`}
              >
                {t("cookingBack")}
              </button>
              <button
                type="button"
                className={`${primaryBtn} flex-1`}
                onClick={() => {
                  const done = state.stepsDone.includes(current)
                    ? state.stepsDone
                    : [...state.stepsDone, current];
                  if (current + 1 >= total) {
                    update({ stepsDone: done, phase: 2 });
                  } else {
                    update({ stepsDone: done, stepIndex: current + 1 });
                  }
                }}
              >
                {current + 1 >= total ? t("cookingServing") : t("cookingNext")}
              </button>
            </>
          )}

          {state.phase === 2 && (
            <>
              <button type="button" className={ghostBtn} onClick={reset}>
                {t("cookingReset")}
              </button>
              <button
                type="button"
                className={`${primaryBtn} flex-1`}
                onClick={() => {
                  if (state.finished) onClose();
                  else update({ finished: true });
                }}
              >
                {state.finished ? t("cookingExit") : t("cookingFinish")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
