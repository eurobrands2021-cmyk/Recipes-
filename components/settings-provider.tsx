"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  localeDir,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n/locales";
import { t as translate, type UIKey } from "@/lib/i18n/ui";

export type ArabicFont = "tajawal" | "cairo";
export type Accent = "terracotta" | "olive" | "rose";

const LS = {
  locale: "teta.locale",
  font: "teta.font",
  accent: "teta.accent",
} as const;

export const DEFAULT_FONT: ArabicFont = "tajawal";
export const DEFAULT_ACCENT: Accent = "terracotta";

interface SettingsValue {
  locale: Locale;
  font: ArabicFont;
  accent: Accent;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  setFont: (f: ArabicFont) => void;
  setAccent: (a: Accent) => void;
  reset: () => void;
  t: (key: UIKey) => string;
}

const SettingsContext = createContext<SettingsValue | null>(null);

function applyToDocument(locale: Locale, font: ArabicFont, accent: Accent) {
  const el = document.documentElement;
  el.setAttribute("data-locale", locale);
  el.setAttribute("data-font", font);
  el.setAttribute("data-accent", accent);
  el.setAttribute("dir", localeDir(locale));
  el.setAttribute("lang", localeHtmlLang(locale));
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [font, setFontState] = useState<ArabicFont>(DEFAULT_FONT);
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  // Hydrate from localStorage on mount (the inline no-flash script already set
  // the document attributes; this syncs React state to them).
  useEffect(() => {
    try {
      const l = localStorage.getItem(LS.locale);
      const f = localStorage.getItem(LS.font);
      const a = localStorage.getItem(LS.accent);
      if (isLocale(l)) setLocaleState(l);
      if (f === "tajawal" || f === "cairo") setFontState(f);
      if (a === "terracotta" || a === "olive" || a === "rose") setAccentState(a);
    } catch {
      /* localStorage unavailable — use defaults */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LS.locale, l);
    } catch {}
  }, []);
  const setFont = useCallback((f: ArabicFont) => {
    setFontState(f);
    try {
      localStorage.setItem(LS.font, f);
    } catch {}
  }, []);
  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    try {
      localStorage.setItem(LS.accent, a);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    setLocale(DEFAULT_LOCALE);
    setFont(DEFAULT_FONT);
    setAccent(DEFAULT_ACCENT);
  }, [setLocale, setFont, setAccent]);

  useEffect(() => {
    applyToDocument(locale, font, accent);
  }, [locale, font, accent]);

  const value = useMemo<SettingsValue>(
    () => ({
      locale,
      font,
      accent,
      dir: localeDir(locale),
      setLocale,
      setFont,
      setAccent,
      reset,
      t: (key: UIKey) => translate(locale, key),
    }),
    [locale, font, accent, setLocale, setFont, setAccent, reset],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

// Convenience hooks.
export const useLocale = () => useSettings().locale;
export const useT = () => useSettings().t;

// Inline script string that sets document attributes before paint, preventing
// a flash of the wrong language/dir/accent. Injected in <head>.
export const settingsNoFlashScript = `(function(){try{
var d=document.documentElement;
var l=localStorage.getItem('${LS.locale}')||'${DEFAULT_LOCALE}';
var f=localStorage.getItem('${LS.font}')||'${DEFAULT_FONT}';
var a=localStorage.getItem('${LS.accent}')||'${DEFAULT_ACCENT}';
d.setAttribute('data-locale',l);
d.setAttribute('data-font',f);
d.setAttribute('data-accent',a);
d.setAttribute('dir', l==='en'?'ltr':'rtl');
d.setAttribute('lang', l==='en'?'en':'ar');
}catch(e){}})();`;
