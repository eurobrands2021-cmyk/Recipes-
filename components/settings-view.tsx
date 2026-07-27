"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  useSettings,
  type Accent,
  type ArabicFont,
  type FontSize,
} from "./settings-provider";
import { LOCALES, localeLabel, type Locale } from "@/lib/i18n/locales";

function Segmented<T extends string>({
  options,
  value,
  onChange,
  columns,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: string;
}) {
  return (
    <div className={`grid gap-2 ${columns ?? "grid-cols-3"}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`min-h-12 rounded-xl border px-3 py-3 text-center transition-all active:scale-95 ${
              active
                ? "border-accent-500 bg-accent-500/10 text-accent-600 dark:text-accent-400"
                : "border-cream-300 bg-cream-50/60 text-ink-700 hover:border-accent-400/60 dark:border-ink-700 dark:bg-ink-900/50 dark:text-cream-100/80"
            }`}
          >
            <span className="block text-sm font-semibold">{o.label}</span>
            {o.hint && (
              <span className="mt-0.5 block text-xs opacity-60">{o.hint}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const ACCENT_SWATCH: Record<Accent, string> = {
  terracotta: "#c1734a",
  olive: "#7a7c4b",
  rose: "#b06a6a",
};
const ACCENT_LABEL: Record<Accent, Record<"ar" | "en", string>> = {
  terracotta: { ar: "طوبي", en: "Terracotta" },
  olive: { ar: "زيتوني", en: "Olive" },
  rose: { ar: "وردي", en: "Dusty rose" },
};

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/40">
      <h2 className="font-display text-base font-bold text-ink-800 dark:text-cream-100">
        {title}
      </h2>
      {hint && (
        <p className="mb-3 mt-0.5 text-xs text-ink-700/55 dark:text-cream-100/45">
          {hint}
        </p>
      )}
      <div className={hint ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

export function SettingsView() {
  const {
    locale,
    font,
    accent,
    fontSize,
    setLocale,
    setFont,
    setAccent,
    setFontSize,
    reset,
    t,
  } = useSettings();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  useEffect(() => setMounted(true), []);

  const enLabel = locale === "en";

  return (
    <div className="space-y-5 pt-2">
      <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-cream-100">
        {t("settingsTitle")}
      </h1>

      <Section title={t("settingsLanguage")} hint={t("settingsLanguageHint")}>
        <Segmented<Locale>
          options={LOCALES.map((l) => ({ value: l, label: localeLabel[l] }))}
          value={locale}
          onChange={setLocale}
        />
      </Section>

      <Section title={t("settingsFont")} hint={t("settingsFontHint")}>
        <Segmented<ArabicFont>
          columns="grid-cols-2"
          options={[
            { value: "tajawal", label: "Tajawal" },
            { value: "cairo", label: "Cairo" },
          ]}
          value={font}
          onChange={setFont}
        />
      </Section>

      <Section title={t("settingsFontSize")} hint={t("settingsFontSizeHint")}>
        <Segmented<FontSize>
          options={[
            { value: "normal", label: t("settingsFontSizeNormal") },
            { value: "large", label: t("settingsFontSizeLarge") },
            { value: "xlarge", label: t("settingsFontSizeXLarge") },
          ]}
          value={fontSize}
          onChange={setFontSize}
        />
        <p
          className="mt-3 rounded-xl border border-cream-200 bg-cream-50/60 px-4 py-3 text-ink-700 dark:border-ink-800 dark:bg-ink-900/40 dark:text-cream-100/80"
          aria-hidden
        >
          {locale === "en"
            ? "The quick brown fox"
            : "بالهنا والشفا من وصفة تيتا"}
        </p>
      </Section>

      <Section title={t("settingsAccent")} hint={t("settingsAccentHint")}>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(ACCENT_SWATCH) as Accent[]).map((a) => {
            const active = a === accent;
            return (
              <button
                key={a}
                type="button"
                onClick={() => setAccent(a)}
                className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-3 transition-all active:scale-95 ${
                  active
                    ? "border-accent-500 bg-accent-500/10"
                    : "border-cream-300 bg-cream-50/60 hover:border-accent-400/60 dark:border-ink-700 dark:bg-ink-900/50"
                }`}
              >
                <span
                  className="h-5 w-5 shrink-0 rounded-full ring-2 ring-white/70 dark:ring-ink-900"
                  style={{ backgroundColor: ACCENT_SWATCH[a] }}
                  aria-hidden
                />
                <span className="text-sm font-medium text-ink-700 dark:text-cream-100/80">
                  {ACCENT_LABEL[a][enLabel ? "en" : "ar"]}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title={t("settingsTheme")}>
        <Segmented<string>
          options={[
            { value: "light", label: t("settingsThemeLight") },
            { value: "dark", label: t("settingsThemeDark") },
            { value: "system", label: t("settingsThemeSystem") },
          ]}
          value={mounted ? theme ?? "system" : "system"}
          onChange={setTheme}
        />
      </Section>

      <div className="flex items-center justify-between gap-3 pt-2">
        {resetDone && (
          <span className="text-sm text-olive-600 dark:text-olive-500">
            {t("settingsResetDone")}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            reset();
            setTheme("system");
            setResetDone(true);
            setTimeout(() => setResetDone(false), 2000);
          }}
          className="ms-auto rounded-full border border-cream-300 px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-accent-400/60 hover:text-accent-600 dark:border-ink-700 dark:text-cream-100 dark:hover:text-accent-400"
        >
          {t("settingsReset")}
        </button>
      </div>
    </div>
  );
}
