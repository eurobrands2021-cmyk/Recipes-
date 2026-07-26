import type { Locale } from "./i18n/locales";

// ─────────────────────────────────────────────────────────────────────────────
// Serving-size scaling for ingredient lines.
//
// Recipes don't record a base serving count, so we assume BASE_SERVINGS and let
// the reader pick a target; the factor = target / base is applied to every
// numeric quantity we can confidently detect in each ingredient string. Amounts
// expressed only as words with no number (e.g. "بيضتين", "كوبين") are left as-is
// because they can't be re-inflected safely.
//
// Detected quantity forms:
//   • Western / Arabic-Indic digits, decimals, and a⁄b fractions ("2", "١٫٥", "1/2")
//   • Unicode vulgar fractions, alone or mixed ("½", "1½", "٢½")   ← the notebook's style
//   • Arabic fraction words ("نص", "ربع", "تلت"…) and "N و نص" composites
//   • English fraction words ("half", "quarter", "a third"…)
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_SERVINGS = 4;
export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 16;

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toLatin = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
const toArabic = (s: string) =>
  s.replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);

// Unicode vulgar fractions → value.
const GLYPHS: Record<string, number> = {
  "½": 1 / 2,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "¼": 1 / 4,
  "¾": 3 / 4,
  "⅕": 1 / 5,
  "⅖": 2 / 5,
  "⅗": 3 / 5,
  "⅘": 4 / 5,
  "⅙": 1 / 6,
  "⅚": 5 / 6,
  "⅛": 1 / 8,
  "⅜": 3 / 8,
  "⅝": 5 / 8,
  "⅞": 7 / 8,
};
const GLYPH_SRC = "[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]";

// Fraction words → value (matched on the raw string).
const FRACTION_WORDS: { re: RegExp; value: number }[] = [
  { re: /(?:ثلاثة|تلاتة)\s*[أا]رباع/, value: 3 / 4 },
  { re: /(?:ثلثين|تلتين)/, value: 2 / 3 },
  { re: /(?:نصف|نص)/, value: 1 / 2 },
  { re: /(?:ثلث|تلت)/, value: 1 / 3 },
  { re: /ربع/, value: 1 / 4 },
  { re: /three[-\s]*quarters?/i, value: 3 / 4 },
  { re: /two[-\s]*thirds?/i, value: 2 / 3 },
  { re: /half/i, value: 1 / 2 },
  { re: /(?:one[-\s]*)?third/i, value: 1 / 3 },
  { re: /quarter/i, value: 1 / 4 },
];

// Output fractions as the notebook's own vulgar-fraction glyphs, in every
// locale, so a scaled quantity reads the same way the original was written.
const OUTPUT_LABELS: [number, string][] = [
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [1 / 2, "½"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
];

function nearestFraction(frac: number): string | null {
  if (frac < 0.06) return null;
  let best: string | null = null;
  let bestDiff = 0.07; // tolerance
  for (const [v, label] of OUTPUT_LABELS) {
    const d = Math.abs(frac - v);
    if (d < bestDiff) {
      bestDiff = d;
      best = label;
    }
  }
  return best;
}

function formatQuantity(n: number, locale: Locale): string {
  if (!Number.isFinite(n) || n <= 0) return "0";
  const arabic = locale !== "en";
  const whole = Math.floor(n + 1e-9);
  const frac = n - whole;
  const label = nearestFraction(frac);

  let out: string;
  if (label && whole > 0) out = `${whole}${label}`; // e.g. "1½"
  else if (label) out = label; // e.g. "½"
  else if (whole > 0) out = frac > 0.12 ? (Math.round(n * 10) / 10).toString() : `${whole}`;
  else out = (Math.round(n * 100) / 100).toString();

  return arabic ? toArabic(out) : out;
}

const NUM = "\\d+(?:[.,]\\d+)?(?:\\s*/\\s*\\d+)?";
const FRAC_WORD_SRC =
  "(?:ثلاثة|تلاتة)\\s*[أا]رباع|ثلثين|تلتين|نصف|نص|ثلث|تلت|ربع|three[-\\s]*quarters?|two[-\\s]*thirds?|half|(?:one[-\\s]*)?third|quarter";

function numValue(token: string): number {
  const s = token.trim();
  const slash = s.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (slash) return Number(slash[1]) / Number(slash[2]);
  return Number(s.replace(",", "."));
}

function fracValue(word: string): number {
  for (const { re, value } of FRACTION_WORDS) if (re.test(word)) return value;
  return 0;
}

// One combined matcher so each quantity is scaled exactly once. Alternatives are
// ordered most-specific first:
//   1,2 → "N½" mixed number + glyph        3,4 → "N و/and <word>" composite
//   5   → a lone glyph                      6   → a bare number
//   7   → a bare fraction word (word-bounded)
const QUANTITY = new RegExp(
  `(\\d+)\\s*(${GLYPH_SRC})` +
    `|(${NUM})\\s*(?:و|and)\\s*(${FRAC_WORD_SRC})` +
    `|(${GLYPH_SRC})` +
    `|(${NUM})` +
    `|(?<![\\p{L}\\d])(${FRAC_WORD_SRC})(?![\\p{L}])`,
  "giu",
);

// Scale every detectable quantity in one ingredient line by `factor`.
export function scaleIngredient(
  text: string,
  factor: number,
  locale: Locale,
): string {
  if (factor === 1) return text;
  const latin = toLatin(text);

  return latin.replace(
    QUANTITY,
    (
      m: string,
      mixNum: string,
      mixGlyph: string,
      cNum: string,
      cFrac: string,
      glyph: string,
      num: string,
      frac: string,
    ) => {
      if (mixNum !== undefined) {
        return formatQuantity((Number(mixNum) + (GLYPHS[mixGlyph] ?? 0)) * factor, locale);
      }
      if (cNum !== undefined) {
        return formatQuantity((numValue(cNum) + fracValue(cFrac)) * factor, locale);
      }
      if (glyph !== undefined) {
        return formatQuantity((GLYPHS[glyph] ?? 0) * factor, locale);
      }
      if (num !== undefined) {
        return formatQuantity(numValue(num) * factor, locale);
      }
      if (frac !== undefined) {
        const v = fracValue(frac);
        return v ? formatQuantity(v * factor, locale) : m;
      }
      return m;
    },
  );
}

export function scaleIngredients(
  items: string[],
  factor: number,
  locale: Locale,
): string[] {
  return items.map((i) => scaleIngredient(i, factor, locale));
}
