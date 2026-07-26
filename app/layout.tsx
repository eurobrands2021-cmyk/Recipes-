import type { Metadata, Viewport } from "next";
import { Tajawal, Cairo } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

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

export const metadata: Metadata = {
  title: {
    default: "مطبخ الجدة — صدقة جارية",
    template: "%s · مطبخ الجدة",
  },
  description:
    "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها، يتصفحها ويطبخ منها أفراد العائلة.",
  openGraph: {
    title: "مطبخ الجدة — صدقة جارية",
    description:
      "أرشيف رقمي لوصفات الجدة المكتوبة بخط يدها — صدقة جارية لها.",
    type: "website",
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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${tajawal.variable} ${cairo.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-dvh bg-paper">
            <SiteHeader />
            <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-4 sm:px-6">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-cream-200/80 bg-cream-50/85 backdrop-blur-md dark:border-ink-800/80 dark:bg-ink-950/80">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5"
          aria-label="الصفحة الرئيسية — مطبخ الجدة"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-500/15 text-clay-600 dark:text-clay-400">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 3v6M17 3v6M12 3v6M5 9h14a0 0 0 0 1 0 0v2a7 7 0 0 1-14 0V9z" />
              <path d="M5 21h14" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-800 group-hover:text-clay-600 dark:text-cream-100 dark:group-hover:text-clay-400">
            مطبخ الجدة
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-cream-200/70 dark:border-ink-800/70">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 text-center sm:px-6">
        <p className="font-display text-sm text-clay-600 dark:text-clay-400">
          من مطبخ الجدة... صدقة جارية لها
        </p>
        <p className="mt-1 text-xs text-ink-700/60 dark:text-cream-100/50">
          اللهم اجعله في ميزان حسناتها
        </p>
      </div>
    </footer>
  );
}
