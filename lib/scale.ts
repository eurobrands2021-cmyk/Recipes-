// Scale the leading quantity of a free-text ingredient line by a factor.
//
// Ingredient lines are written quantity-first ("4 كوب دقيق", "1 ملعقة صغيرة
// ملح", "2-3 أكواب"). We only touch a number at the START of the line — Western
// or Arabic-Indic digits, simple fractions, and ranges — and leave the rest of
// the text untouched. Lines with no leading number are returned unchanged, so
// nothing gets corrupted. Powers the recipe "Amount" (×½ / ×1 / ×2 / ×3) control.

const AR_DIGITS: Record<string, string> = {
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

const VULGAR: Record<string, number> = {
  "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3,
  "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875,
};

const westernize = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => AR_DIGITS[d] ?? d);

// Friendly number formatting: integers stay integers, common fractions become
// vulgar glyphs (½ ¼ ⅓ …), otherwise fall back to up to two decimals.
function fmt(n: number): string {
  if (!isFinite(n) || n < 0) return "";
  const r = Math.round(n * 1000) / 1000;
  let whole = Math.floor(r + 1e-9);
  const frac = r - whole;

  const table: [number, string][] = [
    [0, ""], [0.125, "⅛"], [0.25, "¼"], [1 / 3, "⅓"], [0.375, "⅜"],
    [0.5, "½"], [0.625, "⅝"], [2 / 3, "⅔"], [0.75, "¾"], [0.875, "⅞"], [1, "+1"],
  ];
  let best = ""; let bd = Infinity;
  for (const [v, s] of table) {
    const d = Math.abs(frac - v);
    if (d < bd) { bd = d; best = s; }
  }
  if (bd <= 0.06) {
    if (best === "+1") return String(whole + 1);
    if (best === "") return String(whole);
    return whole === 0 ? best : `${whole}${best}`;
  }
  const dec = Math.round(r * 100) / 100;
  return String(dec);
}

interface NumToken {
  value: number;
  raw: string;
}

// Read a numeric token (mixed number, fraction, vulgar, or decimal) from the
// start of an already-westernized string.
function readNumber(s: string): NumToken | null {
  let m = s.match(/^(\d+)\s*([½¼¾⅓⅔⅛⅜⅝⅞])/);
  if (m) return { value: parseInt(m[1], 10) + VULGAR[m[2]], raw: m[0] };
  m = s.match(/^(\d+)\s*\/\s*(\d+)/);
  if (m) return { value: parseInt(m[1], 10) / parseInt(m[2], 10), raw: m[0] };
  m = s.match(/^([½¼¾⅓⅔⅛⅜⅝⅞])/);
  if (m) return { value: VULGAR[m[1]], raw: m[0] };
  m = s.match(/^(\d+(?:\.\d+)?)/);
  if (m) return { value: parseFloat(m[1]), raw: m[0] };
  return null;
}

export function scaleIngredient(line: string, factor: number): string {
  if (factor === 1 || !line) return line;
  const lead = line.match(/^\s*/)?.[0] ?? "";
  const rest = line.slice(lead.length);
  const w = westernize(rest); // 1:1 length with `rest`, so indices align

  const first = readNumber(w);
  if (!first) return line; // no leading quantity — leave untouched

  // Range like "2-3": scale both endpoints, keep the original separator.
  const after = w.slice(first.raw.length);
  const sep = after.match(/^\s*[-–—]\s*/);
  if (sep) {
    const second = readNumber(after.slice(sep[0].length));
    if (second) {
      const consumed = first.raw.length + sep[0].length + second.raw.length;
      return (
        lead +
        fmt(first.value * factor) +
        sep[0] +
        fmt(second.value * factor) +
        rest.slice(consumed)
      );
    }
  }

  return lead + fmt(first.value * factor) + rest.slice(first.raw.length);
}

/** True if scaling would visibly change at least one ingredient line. */
export function hasScalableQuantities(lines: string[]): boolean {
  return lines.some((l) => scaleIngredient(l, 2) !== l);
}
