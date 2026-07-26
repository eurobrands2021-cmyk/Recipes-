import type { MetadataRoute } from "next";

// PWA manifest — lets the family add Teta's Kitchen to a phone home screen and
// open it like a real app. Served at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "مطبخ الجدة — Teta's Kitchen",
    short_name: "مطبخ الجدة",
    description:
      "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    dir: "rtl",
    lang: "ar",
    background_color: "#fdfbf7",
    theme_color: "#c1734a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
