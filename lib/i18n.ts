import { BASE } from "./base";

export const LOCALES = ["en", "nl", "de"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_META: Record<Lang, { label: string; region: string; html: string }> = {
  en: { label: "English", region: "International", html: "en" },
  nl: { label: "Nederlands", region: "Nederland", html: "nl" },
  de: { label: "Deutsch", region: "Deutschland", html: "de" },
};
export function isLang(x: string | undefined): x is Lang {
  return !!x && (LOCALES as readonly string[]).includes(x);
}
/** Build a localized href: English lives at the root, other languages under /nl and /de. */
export function href(lang: Lang, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path === "/" ? "" : path;
  return BASE + (lang === DEFAULT_LANG ? p || "/" : `/${lang}${p}`);
}
/** Split a URL path into language and language-less path. */
export function splitPath(segments: string[]): { lang: Lang; path: string } {
  const [first, ...rest] = segments;
  if (isLang(first) && first !== DEFAULT_LANG) return { lang: first, path: "/" + rest.join("/") };
  return { lang: DEFAULT_LANG, path: "/" + segments.join("/") };
}
