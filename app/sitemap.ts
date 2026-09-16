import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { getSite } from "@/lib/content";
import { ARTICLES } from "@/components/site/Pages";

import { SITE_URL } from "@/lib/base";
export const BASE = SITE_URL;
const STATIC = ["", "product", "product/console", "product/ask-optavius", "product/agents", "product/integrations", "pricing", "specialties", "customers", "about", "resources", "careers"];

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const now = new Date();
  for (const lang of LOCALES) {
    const site = getSite(lang);
    const prefix = lang === "en" ? "" : `/${lang}`;
    const paths = [
      ...STATIC,
      ...site.specialties.pages.map((p) => "specialties/" + p.slug),
      ...site.customers.stories.map((s) => "customers/" + s.slug),
      ...(ARTICLES[lang] || ARTICLES.en).map((a) => "resources/" + a.slug),
    ];
    for (const p of paths) {
      const path = p ? `/${p}` : "";
      const languages: Record<string, string> = {};
      for (const l of LOCALES) languages[l] = `${BASE}${l === "en" ? "" : `/${l}`}${path || "/"}`;
      out.push({ url: `${BASE}${prefix}${path || "/"}`, lastModified: now, changeFrequency: p.startsWith("resources/") ? "monthly" : "weekly", priority: p === "" ? 1 : p.startsWith("resources/") ? 0.5 : p === "careers" ? 0.4 : 0.8, alternates: { languages } });
    }
  }
  return out;
}
