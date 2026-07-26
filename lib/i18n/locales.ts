// Supported locales. Content is fully bundled (no runtime translation API);
// `ar` is the formal written data already in the archive and acts as the
// fallback for any missing `ar-EG` / `en` override.
export const LOCALES = ["ar-EG", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ar-EG";

export const localeDir = (locale: Locale): "rtl" | "ltr" =>
  locale === "en" ? "ltr" : "rtl";

export const localeHtmlLang = (locale: Locale): string =>
  locale === "en" ? "en" : "ar";

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as readonly string[]).includes(v);

export const localeLabel: Record<Locale, string> = {
  "ar-EG": "عامية مصرية",
  ar: "العربية الفصحى",
  en: "English",
};
