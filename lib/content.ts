import type { Site } from "@/content/types";
import en from "@/content/en";
import type { Lang } from "./i18n";

const registry: Record<Lang, () => Site> = {
  en: () => en,
  nl: () => require("@/content/nl").default as Site,
  de: () => require("@/content/de").default as Site,
};

export function getSite(lang: Lang): Site {
  try {
    return registry[lang]();
  } catch {
    return en;
  }
}
