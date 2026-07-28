import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// ─────────────────────────────────────────────────────────────────────────────
// Branded Open Graph / social-share image renderer.
//
// Recipes have no real photos, so every share preview is a generated, warm,
// intentional card in the site's palette (cream + terracotta, Cairo/Tajawal).
// Rendered by Satori (next/og), which needs the actual font bytes bundled — see
// lib/og/fonts. Used by the opengraph-image / twitter-image route conventions.
// ─────────────────────────────────────────────────────────────────────────────

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontDir = join(process.cwd(), "lib/og/fonts");
const cairoExtraBold = readFileSync(join(fontDir, "Cairo-ExtraBold.ttf"));
const cairoBold = readFileSync(join(fontDir, "Cairo-Bold.ttf"));
const tajawalMedium = readFileSync(join(fontDir, "Tajawal-Medium.ttf"));

// Per-category warm tint so category/recipe cards feel varied but on-brand.
const CATEGORY_TINT: Record<string, string> = {
  sweets: "#b06a6a", // dusty rose
  savory: "#c1734a", // terracotta
  "bread-dough": "#b3803f", // warm amber
  pickles: "#7a7c4b", // olive
  spices: "#a95c37", // deep clay
  household: "#8a6d4a", // taupe
};
const DEFAULT_TINT = "#c1734a";

const tintFor = (slug?: string) =>
  (slug && CATEGORY_TINT[slug]) || DEFAULT_TINT;

const clamp = (s: string, max: number) =>
  s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;

// Minimalist line-art per category (mirrors components/category-icon).
function categoryPath(slug?: string): string[] {
  switch (slug) {
    case "sweets":
      return ["M12 3c2 2 2 4 0 6s-2 4 0 6", "M5 21a7 7 0 0 1 14 0z"];
    case "savory":
      return ["M4 11h16a8 8 0 0 1-16 0z", "M12 11V4M9 6c0-1 3-1 3 0M2 21h20"];
    case "pickles":
      return [
        "M8 3h8M9 3v2.5L7.5 8A3 3 0 0 0 7 9.7V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9.7a3 3 0 0 0-.5-1.7L15 5.5V3",
        "M7 13h10",
      ];
    case "spices":
      return [
        "M10 2h4l-1 4h-2z",
        "M8 6h8l1 6a5 5 0 0 1-5 5 5 5 0 0 1-5-5z",
        "M9 22h6",
      ];
    case "bread-dough":
      return [
        "M4 13a4 4 0 0 1 3-3.9 4 4 0 0 1 4-3.1 4 4 0 0 1 4 0 4 4 0 0 1 4 3.1A4 4 0 0 1 22 13c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2z",
        "M8 15l1 4M12 15v4M16 15l-1 4",
      ];
    case "household":
      return [
        "M6 9a6 3 0 0 0 12 0v8a6 3 0 0 1-12 0z",
        "M6 9a6 3 0 0 1 12 0",
        "M9 3v3M15 3v3",
      ];
    default:
      // Teta's pot (site mark).
      return ["M7 3v6M17 3v6M12 3v6M5 9h14v2a7 7 0 0 1-14 0V9z", "M5 21h14"];
  }
}

function LineIcon({
  slug,
  size,
  color,
}: {
  slug?: string;
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {categoryPath(slug).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export interface OgImageOptions {
  /** Small line above the title, e.g. the dedication kicker. */
  eyebrow?: string;
  /** Main heading (recipe name / page title). */
  title: string;
  /** Supporting line (short excerpt). */
  subtitle?: string;
  /** Pill label at the bottom (category name). */
  chip?: string;
  /** Category slug — picks the tint + line-art icon. */
  slug?: string;
}

export function renderOgImage({
  eyebrow = "دفتر أكل العيلة · بخط يدها",
  title,
  subtitle,
  chip,
  slug,
}: OgImageOptions) {
  const tint = tintFor(slug);
  const safeTitle = clamp(title, 46);
  const safeSubtitle = subtitle ? clamp(subtitle, 92) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          direction: "rtl",
          padding: "72px 80px",
          backgroundColor: "#faf5ec",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, " +
            tint +
            "26 0%, rgba(250,245,236,0) 42%), radial-gradient(circle at 6% 96%, " +
            tint +
            "1f 0%, rgba(250,245,236,0) 38%)",
          fontFamily: "Tajawal",
          position: "relative",
        }}
      >
        {/* thin top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: tint,
          }}
        />

        {/* Header: brand mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 78,
              height: 78,
              borderRadius: 24,
              backgroundColor: tint + "1f",
            }}
          >
            <LineIcon size={44} color={tint} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Cairo",
                fontWeight: 700,
                fontSize: 40,
                color: "#2a251f",
                lineHeight: 1.1,
              }}
            >
              وصفات تيتا زينب
            </div>
            <div style={{ fontSize: 24, color: tint, marginTop: 4 }}>
              {eyebrow}
            </div>
          </div>
        </div>

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "Cairo",
              fontWeight: 800,
              fontSize: safeTitle.length > 24 ? 82 : 100,
              lineHeight: 1.12,
              color: "#2a251f",
            }}
          >
            {safeTitle}
          </div>
          {safeSubtitle && (
            <div
              style={{
                fontSize: 36,
                lineHeight: 1.4,
                color: "#3a332ccc",
                maxWidth: 940,
              }}
            >
              {safeSubtitle}
            </div>
          )}
        </div>

        {/* Footer: category chip + dedication */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 26px 14px 22px",
              borderRadius: 9999,
              backgroundColor: "#ffffffcc",
              border: "2px solid " + tint + "33",
            }}
          >
            <LineIcon size={30} color={tint} slug={slug} />
            <div style={{ fontSize: 30, color: "#3a332c", fontWeight: 500 }}>
              {chip ?? "من دفتر وصفاتها"}
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#8a7a68" }}>
            الله يرحمها ويسكنها فسيح جناته
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cairo", data: cairoExtraBold, weight: 800, style: "normal" },
        { name: "Cairo", data: cairoBold, weight: 700, style: "normal" },
        { name: "Tajawal", data: tajawalMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
