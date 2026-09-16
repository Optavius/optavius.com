/** Deployment base: GitHub Pages serves the site under /optavius, a custom domain serves it at the root. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.optavius.com";
/** Prefix a public asset path with the base path. */
export const asset = (p: string) => BASE + p;
