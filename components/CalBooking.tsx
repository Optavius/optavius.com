"use client";
import { useEffect } from "react";
import { CAL_LINKS } from "@/content/shared";
import { BASE } from "@/lib/base";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global { interface Window { Cal?: any } }

const BRAND = "#006838";
/** Booker colours (Cal.com CSS variables): green brand, white surfaces, dark text. */
const CAL_VARS = { "cal-brand": BRAND, "cal-brand-emphasis": "#00522c", "cal-brand-text": "#ffffff", "cal-bg": "#ffffff", "cal-bg-emphasis": "#f3f4f1", "cal-bg-subtle": "#f7f8f5", "cal-bg-muted": "#f3f4f1", "cal-bg-inverted": "#0f1a14", "cal-text": "#0f1a14", "cal-text-emphasis": "#0f1a14", "cal-text-subtle": "#4b5550", "cal-text-muted": "#6b746f", "cal-text-inverted": "#ffffff", "cal-border": "#d9ddd8", "cal-border-emphasis": "#b9c0bb", "cal-border-subtle": "#e6e9e4", "cal-border-booker": "#e6e9e4", "cal-border-muted": "#eef0ec", "cal-font-family": "gtAmerica, Helvetica, Arial, sans-serif" };
export const CAL_CONFIG = { layout: "month_view", theme: "light" };

/** Loads the Cal.com embed once (official loader snippet) and applies the site's colours. */
export function loadCal() {
  if (typeof window === "undefined") return;
  if (!window.Cal) {
    ((C: any, A: string, L: string) => {
      const p = (a: any, ar: any) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal; const ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || [];
          if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", { origin: "https://app.cal.com" });
    window.Cal("ui", { theme: "light", cssVarsPerTheme: { light: CAL_VARS, dark: CAL_VARS }, styles: { branding: { brandColor: BRAND } }, hideEventTypeDetails: false, layout: "month_view" });
  }
}

export function calLink(lang: string) { return CAL_LINKS[lang] || ""; }

/** Opens the booking pop-up for every link that points at the demo page, when a Cal.com link is configured. */
export default function CalBooking({ lang }: { lang: string }) {
  useEffect(() => {
    const link = calLink(lang);
    if (!link) return;
    loadCal();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const u = new URL(a.href, location.href);
      const p = BASE && u.pathname.startsWith(BASE) ? u.pathname.slice(BASE.length) : u.pathname;
      if (u.origin !== location.origin || !/^\/(nl\/|de\/)?demo\/?$/.test(p)) return;
      e.preventDefault();
      window.Cal("modal", { calLink: link, config: CAL_CONFIG });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lang]);
  return null;
}
