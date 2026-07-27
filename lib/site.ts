// Canonical site origin, used for metadataBase so Open Graph / Twitter image
// and canonical URLs resolve to absolute URLs (required by WhatsApp, Facebook
// and Twitter link-preview crawlers).
//
// Priority: explicit NEXT_PUBLIC_SITE_URL → Vercel-provided host → localhost.
// Set NEXT_PUBLIC_SITE_URL to your real domain in production.
export const siteUrl: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
})();

export const SITE_NAME_AR = "وصفة تيتا زينب";
