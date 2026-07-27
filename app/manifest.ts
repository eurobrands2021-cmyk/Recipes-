import type { MetadataRoute } from "next";
import { SITE_NAME_AR } from "@/lib/site";

// PWA web app manifest — lets the family "add to home screen" and open the
// notebook like an app. Name/colors mirror the site brand.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME_AR} — دفتر أكل العيلة`,
    short_name: SITE_NAME_AR,
    description:
      "دفتر وصفات تيتا المكتوب بخط إيدها — أكل العيلة اللي بيجمعنا، نرجعله ونطبخ منه.",
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#faf5ec",
    theme_color: "#c1734a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
