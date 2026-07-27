import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/og-image";

// Default branded share card — inherited by the homepage and every page that
// doesn't define its own (favorites, settings, about).
export const alt = "مطبخ الجدة — صدقة جارية";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    title: "من مطبخ الجدة",
    subtitle: "دفتر وصفاتها المكتوب بخط يدها — نتصفحه، نطبخ منه، ونذكرها بدعوة خير.",
    chip: "صدقة جارية",
  });
}
