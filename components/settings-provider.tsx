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
export type FontSize = "normal" | "large" | "xlarge";

const LS = {
  locale: "teta.locale",
  font: "teta.font",
  accent: "teta.accent",
  fontSize: "teta.fontSize",
} as const;

export const DEFAULT_FONT: ArabicFont = "tajawal";
export const DEFAULT_ACCENT: Accent = "terracotta";
export const DEFAULT_FONT_SIZE: FontSize = "normal";

const isFontSize = (v: unknown): v is FontSize =>
  v === "normal" || v === "large" || v === "xlarge";

interface SettingsValue {
  locale: Locale;
  font: ArabicFont;
  accent: Accent;
  fontSize: FontSize;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  setFont: (f: ArabicFont) => void;
  setAccent: (a: Accent) => void;
  setFontSize: (s: FontSize) => void;
  reset: () => void;
  t: (key: UIKey) => string;
}

const SettingsContext = createContext<SettingsValue | null>(null);

function applyToDocument(
  locale: Locale,
  font: ArabicFont,
  accent: Accent,
  fontSize: FontSize,
) {
  const el = document.documentElement;
  el.setAttribute("data-locale", locale);
  el.setAttribute("data-font", font);
  el.setAttribute("data-accent", accent);
  el.setAttribute("data-font-size", fontSize);
  el.setAttribute("dir", localeDir(locale));
  el.setAttribute("lang", localeHtmlLang(locale));
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [font, setFontState] = useState<ArabicFont>(DEFAULT_FONT);
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);
  const [fontSize, setFontSizeState] = useState<FontSize>(DEFAULT_FONT_SIZE);

  // Hydrate from localStorage on mount (the inline no-flash script already set
  // the document attributes; this syncs React state to them).
  useEffect(() => {
    try {
      const l = localStorage.getItem(LS.locale);
      const f = localStorage.getItem(LS.font);
      const a = localStorage.getItem(LS.accent);
      const s = localStorage.getItem(LS.fontSize);
      if (isLocale(l)) setLocaleState(l);
      if (f === "tajawal" || f === "cairo") setFontState(f);
      if (a === "terracotta" || a === "olive" || a === "rose") setAccentState(a);
      if (isFontSize(s)) setFontSizeState(s);
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
  const setFontSize = useCallback((s: FontSize) => {
    setFontSizeState(s);
    try {
      localStorage.setItem(LS.fontSize, s);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    setLocale(DEFAULT_LOCALE);
    setFont(DEFAULT_FONT);
    setAccent(DEFAULT_ACCENT);
    setFontSize(DEFAULT_FONT_SIZE);
  }, [setLocale, setFont, setAccent, setFontSize]);

  useEffect(() => {
    applyToDocument(locale, font, accent, fontSize);
  }, [locale, font, accent, fontSize]);

  const value = useMemo<SettingsValue>(
    () => ({
      locale,
      font,
      accent,
      fontSize,
      dir: localeDir(locale),
      setLocale,
      setFont,
      setAccent,
      setFontSize,
      reset,
      t: (key: UIKey) => translate(locale, key),
    }),
    [locale, font, accent, fontSize, setLocale, setFont, setAccent, setFontSize, reset],
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
var s=localStorage.getItem('${LS.fontSize}')||'${DEFAULT_FONT_SIZE}';
d.setAttribute('data-locale',l);
d.setAttribute('data-font',f);
d.setAttribute('data-accent',a);
d.setAttribute('data-font-size',s);
d.setAttribute('dir', l==='en'?'ltr':'rtl');
d.setAttribute('lang', l==='en'?'en':'ar');
}catch(e){}})();`;
