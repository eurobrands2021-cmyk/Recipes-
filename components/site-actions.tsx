"use client";

import { useState } from "react";
import { useSettings } from "./settings-provider";
import { CONTACT_EMAIL } from "@/lib/site";

// Footer action: request a specific recipe (email if a contact is configured,
// otherwise the device share sheet) or share the whole site with the family.
export function SiteActions() {
  const { t } = useSettings();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function requestRecipe() {
    const subject = t("requestRecipe");
    const body = `${t("appName")}\n\n`;
    if (CONTACT_EMAIL) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    } else {
      void shareText(subject, "");
    }
    setOpen(false);
  }

  async function shareSite() {
    const url =
      typeof window !== "undefined" ? window.location.origin : "";
    await shareText(t("appName"), url);
  }

  async function shareText(title: string, url: string) {
    const data: ShareData = url ? { title, url } : { title, text: title };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        setOpen(false);
        return;
      } catch {
        /* cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url || title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* nothing else we can safely do */
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cream-300 px-3.5 py-1.5 text-xs font-medium text-ink-700/70 transition hover:border-accent-400/60 hover:text-accent-600 dark:border-ink-700 dark:text-cream-100/60 dark:hover:text-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        {t("footerRequest")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="animate-pop-in w-full max-w-sm rounded-3xl border border-cream-200 bg-cream-50 p-5 text-start shadow-2xl dark:border-ink-800 dark:bg-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-lg font-bold text-ink-800 dark:text-cream-100">
              {t("requestTitle")}
            </h2>

            <div className="mt-4 space-y-2.5">
              <ActionRow
                onClick={requestRecipe}
                title={t("requestRecipe")}
                desc={t("requestRecipeDesc")}
                icon={
                  <path d="M12 5v14M5 12h14" />
                }
              />
              <ActionRow
                onClick={shareSite}
                title={t("requestShare")}
                desc={t("requestShareDesc")}
                icon={
                  <>
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
                  </>
                }
              />
            </div>

            {copied && (
              <p className="mt-3 text-center text-sm text-olive-600 dark:text-olive-500">
                {t("recipeShareCopied")}
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-full border border-cream-300 py-2.5 text-sm font-medium text-ink-700 transition hover:border-accent-400/60 hover:text-accent-600 dark:border-ink-700 dark:text-cream-100 dark:hover:text-accent-400"
            >
              {t("requestClose")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ActionRow({
  onClick,
  title,
  desc,
  icon,
}: {
  onClick: () => void;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/60 p-3.5 text-start transition hover:border-accent-400/60 hover:bg-white dark:border-ink-800 dark:bg-ink-900/40 dark:hover:bg-ink-800/60"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/12 text-accent-600 dark:text-accent-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block font-display font-bold text-ink-800 dark:text-cream-100">
          {title}
        </span>
        <span className="block text-xs text-ink-700/60 dark:text-cream-100/50">
          {desc}
        </span>
      </span>
    </button>
  );
}
