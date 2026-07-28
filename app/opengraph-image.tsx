import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/og-image";

// Default branded share card — inherited by the homepage and every page that
// doesn't define its own (favorites, settings, about).
export const alt = "وصفات تيتا زينب — دفتر أكل العيلة";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    title: "وصفات تيتا زينب",
    subtitle: "دفتر أكل العيلة المكتوب بخط إيدها — نرجعله، نطبخ منه، ونفتكرها.",
    chip: "أكل العيلة",
  });
}
