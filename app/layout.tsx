import type { Metadata, Viewport } from "next";
import { Tajawal, Cairo, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider, settingsNoFlashScript } from "@/components/settings-provider";
import { FavoritesProvider } from "@/components/favorites-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl, SITE_NAME_AR } from "@/lib/site";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها، يتصفحها ويطبخ منها أفراد العائلة.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "مطبخ الجدة — صدقة جارية",
    template: "%s · مطبخ الجدة",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME_AR,
  openGraph: {
    title: "مطبخ الجدة — صدقة جارية",
    description: "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها.",
    siteName: SITE_NAME_AR,
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مطبخ الجدة — صدقة جارية",
    description: "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      // The next/font variables (--font-tajawal / --font-cairo / --font-inter)
      // must live on the same element where globals.css declares --font-app /
      // --font-display (:root === <html>), otherwise those var() references
      // resolve against an undefined value and the whole font-family is dropped.
      className={`${tajawal.variable} ${cairo.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set locale/dir/font/accent/size before paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: settingsNoFlashScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <FavoritesProvider>
              <div className="min-h-dvh bg-paper">
                <SiteHeader />
                <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-4 sm:px-6">
                  {children}
                </main>
                <SiteFooter />
              </div>
            </FavoritesProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
