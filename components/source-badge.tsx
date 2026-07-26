"use client";

import { useSettings } from "./settings-provider";
import type { SourceType } from "@/lib/types";

const toneClasses: Record<string, string> = {
  written: "bg-olive-500/12 text-olive-600 ring-olive-500/25 dark:text-olive-500",
  inferred: "bg-accent-500/12 text-accent-600 ring-accent-500/25 dark:text-accent-400",
  friend:
    "bg-ink-700/8 text-ink-700 ring-ink-700/20 dark:bg-cream-100/10 dark:text-cream-100/80 dark:ring-cream-100/20",
};

export function SourceBadge({
  sourceType,
  sourceNote,
  className = "",
}: {
  sourceType: SourceType;
  sourceNote?: string;
  className?: string;
}) {
  const { t } = useSettings();

  const tone =
    sourceType === "GRANDMOTHER_WRITTEN"
      ? "written"
      : sourceType === "INFERRED"
        ? "inferred"
        : "friend";

  const label =
    sourceType === "GRANDMOTHER_WRITTEN"
      ? t("sourceWritten")
      : sourceType === "INFERRED"
        ? t("sourceInferred")
        : sourceNote?.trim() || t("sourceFriend");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {tone === "inferred" ? (
          <path d="M9.5 21h5M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2v.2h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
        ) : (
          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        )}
      </svg>
      {label}
    </span>
  );
}
