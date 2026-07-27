import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";

const description =
  "دفتر وصفات الجدة المكتوب بخط يدها، محفوظاً لكل أفراد العائلة — صدقة جارية باسمها.";

export const metadata: Metadata = {
  title: "عن المطبخ",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "عن مطبخ الجدة",
    description,
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "عن مطبخ الجدة",
    description,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
