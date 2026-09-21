"use client";
import { useEffect, useState } from "react";
import { BASE } from "@/lib/base";

/** Analytics consent. Nothing is loaded until the visitor accepts; the choice is kept in localStorage (no cookie). */
const KEY = "optavius-consent";
const POSTHOG_KEY = "phc_vXLznom5YrQsx8noMB2Cbv9tZGUTTZBnoRbSnbEwE4VK";

async function startAnalytics() {
  try {
    const { default: posthog } = await import("posthog-js");
    posthog.init(POSTHOG_KEY, { api_host: "https://eu.i.posthog.com", ui_host: "https://eu.posthog.com", person_profiles: "identified_only", capture_pageview: true, capture_pageleave: true });
  } catch { /* blocked by the browser or offline: fine */ }
}

export default function Consent({ lang, ui, policyHref }: { lang: string; ui: { text: string; accept: string; decline: string; policy: string }; policyHref: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let choice: string | null = null;
    try { choice = localStorage.getItem(KEY); } catch {}
    if (choice === "granted") { void startAnalytics(); return; }
    if (choice === "denied") return;
    /* the banner appears a moment after the page has settled (or on the first scroll), not on top of the first paint */
    let t = 0; let shown = false; const show = () => { if (shown) return; shown = true; setOpen(true); };
    const arm = () => { t = window.setTimeout(show, 2500); };
    if (document.readyState === "complete") arm(); else window.addEventListener("load", arm, { once: true });
    window.addEventListener("scroll", show, { once: true, passive: true });
    return () => { clearTimeout(t); window.removeEventListener("load", arm); window.removeEventListener("scroll", show); };
  }, []);
  const decide = (granted: boolean) => {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch {}
    setOpen(false);
    if (granted) void startAnalytics();
  };
  if (!open) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label={ui.policy} lang={lang} style={{ position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 70, maxWidth: 440, marginLeft: "auto", background: "#fff", color: "#222", border: "1px solid #e4e0dc", borderRadius: 16, boxShadow: "0 12px 40px rgba(0,0,0,.14)", padding: "18px 20px", font: "14px/1.5 gtAmerica, 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <p style={{ margin: 0 }}>{ui.text} <a href={BASE + policyHref} style={{ color: "#006838", textDecoration: "underline", textUnderlineOffset: 3 }}>{ui.policy}</a></p>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button type="button" onClick={() => decide(true)} style={{ background: "#006838", color: "#fff", border: 0, borderRadius: 999, padding: "10px 18px", font: "inherit", fontWeight: 500, cursor: "pointer" }}>{ui.accept}</button>
        <button type="button" onClick={() => decide(false)} style={{ background: "transparent", color: "#222", border: "1px solid #c1bcb7", borderRadius: 999, padding: "10px 18px", font: "inherit", fontWeight: 500, cursor: "pointer" }}>{ui.decline}</button>
      </div>
    </div>
  );
}
