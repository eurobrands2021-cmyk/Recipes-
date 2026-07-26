import type { Locale } from "./i18n/locales";

// Parse an explicit duration mentioned in a step into seconds, for the optional
// inline countdown. Returns null if no clear single duration is found.
const AR_DIGITS: Record<string, string> = {
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

const toLatinDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => AR_DIGITS[d] ?? d);

export function parseDurationSeconds(step: string): number | null {
  const s = toLatinDigits(step);

  // Fractions of an hour (Arabic).
  if (/ربع\s*ساعة/.test(s)) return 15 * 60;
  if (/(نص|نصف)\s*ساعة/.test(s)) return 30 * 60;

  // "N minutes" — Arabic (دقيقة/دقائق) or English.
  const min =
    s.match(/(\d+)\s*(?:دقيقة|دقائق|دقيقه)/) ??
    s.match(/(\d+)\s*(?:minutes?|mins?)\b/i);
  if (min) {
    const n = parseInt(min[1], 10);
    if (n > 0 && n <= 240) return n * 60;
  }

  // A range like "7-10 دقائق" → take the upper bound.
  const range = s.match(/(\d+)\s*[-–]\s*(\d+)\s*(?:دقيقة|دقائق|minutes?)/i);
  if (range) {
    const n = parseInt(range[2], 10);
    if (n > 0 && n <= 240) return n * 60;
  }

  // "N hours".
  const hr =
    s.match(/(\d+)\s*(?:ساعات|ساعة)/) ?? s.match(/(\d+)\s*hours?\b/i);
  if (hr) {
    const n = parseInt(hr[1], 10);
    if (n > 0 && n <= 12) return n * 3600;
  }
  if (/\bساعة\b/.test(s) && !/نص|نصف|ربع/.test(s)) return 3600;

  return null;
}

// Doneness / serving cues (Phase 3). Pull the method steps that describe a
// visual/texture doneness cue; fall back to a sensible generic serving check.
const DONE_KEYWORDS = [
  "يتحمر", "تتحمر", "يحمر", "تحمر", "ذهبي", "دهبي", "يستوي", "تستوي",
  "ينضج", "تنضج", "يبرد", "تبرد", "بارد", "لونها", "لونه", "تتماسك",
  "يتماسك", "يثقل", "قوام", "تُقدم", "يُقدم", "تقدم", "golden", "brown",
  "set", "cool", "serve", "crisp", "thicken", "until",
];

const GENERIC_SERVING: Record<Locale, string[]> = {
  en: [
    "Check it's cooked through and looks right.",
    "Let it rest/cool as needed, then serve.",
  ],
  ar: [
    "تأكد أن الطعام قد نضج تماماً وأخذ مظهره المطلوب.",
    "اتركه ليرتاح أو يبرد حسب الحاجة ثم قدّمه.",
  ],
  "ar-EG": [
    "اتأكدي إن الأكل استوى وخد شكله المظبوط.",
    "سيبيه يرتاح أو يبرد على حسب الوصفة وبعدين قدّميه.",
  ],
};

export function servingChecks(
  steps: string[],
  notes: string | undefined,
  locale: Locale,
): string[] {
  const cues = steps.filter((s) => DONE_KEYWORDS.some((k) => s.includes(k)));
  const picked = cues.slice(-3);
  if (notes) picked.push(notes);
  if (picked.length === 0) return GENERIC_SERVING[locale];
  return picked;
}
