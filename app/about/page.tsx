import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";

const description =
  "دفتر وصفات تيتا المكتوب بخط إيدها، محفوظ لكل أفراد العائلة — أكل البيت اللي بيجمعنا.";

export const metadata: Metadata = {
  title: "عن الموقع",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "عن وصفة تيتا زينب",
    description,
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "عن وصفة تيتا زينب",
    description,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
