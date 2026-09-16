"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import type { Site } from "@/content/types";
import { LANG_META, LOCALES, href as lhref, type Lang } from "@/lib/i18n";

type MenuKey = "product" | "specialties" | "company";

const NAV_BTN =
  "cursor-pointer justify-between rounded-full outline-hidden disabled:cursor-not-allowed motion-safe:transition-[background-color,color,border-radius] focus-button bg-transparent text-secondary hover:bg-surface-ghost-100 hover:text-brand-primary focus-visible:bg-surface-ghost-100 disabled:bg-transparent disabled:text-black/20 h-10 px-4 text-label-md flex-row-reverse flex items-center gap-1 group-focus-within:bg-surface-ghost-100 group-focus-within:text-brand-primary";
const NAV_LINK =
  "inline-flex cursor-pointer items-center justify-between rounded-full outline-hidden disabled:cursor-not-allowed motion-safe:transition-[background-color,color,border-radius] focus-button bg-transparent text-secondary hover:bg-surface-ghost-100 hover:text-brand-primary focus-visible:bg-surface-ghost-100 disabled:bg-transparent disabled:text-black/20 h-10 gap-1 px-4 text-label-md flex-row-reverse";
const BTN_BASE =
  "inline-flex cursor-pointer items-center justify-between rounded-full outline-hidden disabled:cursor-not-allowed motion-safe:transition-[background-color,color,border-radius] focus-button ";
const BTN_GLASS =
  "bg-surface-quartenary-100 text-white backdrop-blur-[100px] hover:bg-surface-quartenary-200 focus-visible:bg-surface-quartenary-200 focus-visible:outline-white disabled:bg-white/5 ";
const BTN_PRIMARY =
  "bg-surface-primary-500 text-white hover:bg-surface-primary-300 focus-visible:bg-surface-primary-300 active:bg-green-350 disabled:bg-surface-disabled ";
const MOBILE_ITEM =
  "text-headline-sm group text-gray-400 flex w-full items-center justify-between gap-4 rounded-sm px-1 py-4 outline-hidden focus-text hover:text-green-500 hover:theme-tech:text-gray-300 theme-tech:text-gray-100";
const MENU_ITEM = "cursor-pointer flex w-auto flex-col rounded-lg focus-nav-link-outline text-left text-label-lg text-primary hover:bg-surface-secondary-50 active:bg-surface-secondary-100 gap-1 p-3";
const PANEL = "absolute flex flex-col gap-4 rounded-2xl bg-white px-6 pt-5 pb-6 theme-tech:bg-gray-700 before:absolute before:-top-7 before:left-0 before:h-8 before:w-full border border-primary";

function Chevron({ className }: { className: string }) {
  return (
    <svg aria-label="Chevron" className={className} fill="none" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9L12 17L4 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

export default function Nav({ variant = "default", site, lang, path }: { variant?: "default" | "transparent"; site: Site["ui"]; lang: Lang; path: string }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<MenuKey | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = site.nav;
  const H = (p: string) => lhref(lang, p);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 120);
      if (y > lastY.current && y > 120) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  const transparent = variant === "transparent" && (atTop || hidden) && !hovered && !mobileOpen;
  let bgClass = "pointer-events-auto ease-in-out motion-safe:[transition:translate_0.3s] md:motion-safe:[transition:translate_0.3s,background-color_0.5s] theme-tech:bg-black theme-product:bg-gray-100 theme-platform:bg-gray-200 ";
  if (variant === "transparent") {
    bgClass += transparent ? "theme-tech bg-transparent! " : atTop && hovered && !mobileOpen ? "theme-base " : "bg-white ";
    bgClass += "absolute top-0 left-0 w-full hover:bg-white ";
  } else bgClass += "bg-white ";
  bgClass += mobileOpen ? "h-dvh translate-y-0! bg-white" : hidden ? "-translate-y-full" : "translate-y-0";

  const openMenu = (k: MenuKey) => { if (closeTimer.current) clearTimeout(closeTimer.current); setMenu(k); setLangOpen(false); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setMenu(null), 120); };
  const ctaCls = (size: "sm" | "md") => BTN_BASE + (transparent ? BTN_GLASS : BTN_PRIMARY) + (size === "sm" ? "h-8 gap-1 px-3 text-label-sm flex-row-reverse" : "h-10 gap-1 px-4 text-label-md flex-row-reverse");

  const labels: Record<MenuKey, string> = { product: n.product, specialties: n.specialties, company: n.company };
  const mobileSubItems: Record<MenuKey, { label: string; href: string; external?: boolean }[]> = {
    product: [{ label: n.productOverview.title, href: "/product" }, ...n.productGroups.flatMap((g) => g.items.map((i) => ({ label: i.label, href: i.href })))],
    specialties: [{ label: site.common.allSpecialties, href: "/specialties" }, ...n.specialtyItems.map((i) => ({ label: i.label, href: i.href }))],
    company: n.companyItems.map((i) => ({ label: i.label, href: i.href })),
  };

  const menus: Record<MenuKey, () => React.ReactElement> = {
    product: () => (
      <div role="menu" aria-orientation="vertical" className="absolute z-50 mt-7 flex justify-center right-0 left-0 h-1 w-full theme-base">
        <div className={PANEL}>
          <a className="group/header-link flex items-center justify-between gap-2 border-b border-primary focus-nav-link-outline px-3 pb-4" role="menuitem" href={H("/product")}>
            <div className="flex flex-col gap-1">
              <p className="text-body-lg text-primary">{n.productOverview.title}</p>
              <p className="text-label-sm text-secondary group-hover/header-link:text-primary">{n.productOverview.text}</p>
            </div>
            <span className="inline-flex cursor-pointer items-center justify-between rounded-full outline-hidden focus-button bg-surface-secondary-50 text-primary h-10 gap-1 px-4 text-label-md pointer-events-none flex-row group-hover/header-link:bg-surface-secondary-100 group-hover/header-link:text-brand-primary">
              {n.productOverview.button}
              <Chevron className="-rotate-90 h-[1em] w-[1em]" />
            </span>
          </a>
          <div className="flex gap-1">
            {n.productGroups.map((g) => (
              <div key={g.label} className="flex w-[225px] shrink grow flex-col gap-4">
                <ul className="flex flex-col gap-1">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <a tabIndex={0} className={MENU_ITEM} role="menuitem" href={H(it.href)}>
                        <span className="text-body-sm text-primary">{it.label}</span>
                        <p className="text-label-sm text-secondary">{it.text}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    specialties: () => (
      <div role="menu" aria-orientation="vertical" className="absolute z-50 mt-7 flex justify-center right-0 left-0 h-1 w-full theme-base">
        <div className={PANEL}>
          <div className="flex gap-1">
            {[n.specialtyItems.slice(0, 2), n.specialtyItems.slice(2)].map((col, ci) => (
              <div key={ci} className="flex w-[225px] shrink grow flex-col gap-4">
                <ul className="flex flex-col gap-1">
                  {col.map((it) => (
                    <li key={it.href}>
                      <a tabIndex={0} className={MENU_ITEM} role="menuitem" href={H(it.href)}>
                        <span className="text-body-sm text-primary">{it.label}</span>
                        <p className="text-label-sm text-secondary">{it.text}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    company: () => (
      <div role="menu" aria-orientation="vertical" className="absolute z-50 mt-7 flex justify-start left-0 h-1 theme-base">
        <div className={PANEL}>
          <div className="flex gap-1">
            <div className="flex w-[260px] shrink grow flex-col gap-4">
              <ul className="flex flex-col gap-1">
                {n.companyItems.map((it) => (
                  <li key={it.href}>
                    <a tabIndex={0} className={MENU_ITEM} role="menuitem" href={H(it.href)}>
                      <span className="text-body-sm text-primary">{it.label}</span>
                      <p className="text-label-sm text-secondary">{it.text}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const menuItem = (k: MenuKey) => (
    <li key={k} className={"group text-body-sm focus-within:outline-hidden " + (k === "company" ? "relative" : "")} onMouseEnter={() => openMenu(k)} onMouseLeave={scheduleClose}>
      <button aria-expanded={menu === k} aria-haspopup="true" className={NAV_BTN} type="button" onClick={() => setMenu(menu === k ? null : k)}>{labels[k]}</button>
      {menu === k && <div className="nav-menu-enter contents">{menus[k]()}</div>}
    </li>
  );

  const langSwitch = (
    <li className="relative" onMouseEnter={() => { setLangOpen(true); setMenu(null); }} onMouseLeave={() => setLangOpen(false)}>
      <button aria-expanded={langOpen} aria-haspopup="true" aria-label={n.language} className={NAV_LINK} type="button" onClick={() => setLangOpen((o) => !o)}>
        {lang.toUpperCase()}
        <Chevron className="h-3 w-3" />
      </button>
      {langOpen && (
        <div className={PANEL + " right-0 z-50 mt-7 min-w-[200px] gap-1 px-2 pt-2 pb-2 theme-base nav-menu-enter"}>
          {LOCALES.map((l) => (
            <a key={l} className={"flex items-center justify-between rounded-lg px-3 py-2 text-label-md hover:bg-surface-secondary-50 " + (l === lang ? "text-brand-primary" : "text-primary")} href={lhref(l, path)} hrefLang={l} lang={l}>
              <span>{LANG_META[l].label}</span>
              <span className="text-label-sm text-secondary">{l.toUpperCase()}</span>
            </a>
          ))}
        </div>
      )}
    </li>
  );

  return (
    <nav aria-label="Main navigation" className="pointer-events-none z-50 sticky top-0">
      <div data-testid="nav-background" data-nav-variant={variant} data-nav-transparent={transparent ? "true" : undefined} className={bgClass} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setMenu(null); setLangOpen(false); }}>
        <div className="mx-auto max-w-[1160px] px-container-margin flex w-full items-center justify-between py-3 xl:py-4">
          <div className="relative flex w-full items-center justify-between gap-16 md:h-11 xl:justify-normal">
            <a tabIndex={0} aria-label="Homepage" className="invisible focus-text text-brand-primary outline-hidden transition-[background-color,color] active:text-green-300 xl:visible xl:mt-0" href={H("/")}>
              <Logo className="h-9 xl:h-10" />
            </a>
            <ul className="relative hidden grow flex-col items-center justify-center gap-1 xl:flex xl:flex-row">
              {menuItem("product")}
              {menuItem("specialties")}
              <li className="text-body-sm"><a className={NAV_LINK} href={H("/customers")}>{n.customers}</a></li>
              {menuItem("company")}
            </ul>
            <div className="absolute right-0 left-0 z-40 flex items-center justify-between xl:hidden!">
              <a aria-label="Homepage" className="block focus-text text-green-500 outline-hidden transition-[color] active:text-green-300 xl:mt-0 theme-tech:text-white" href={H("/")}>
                <Logo className="h-9 xl:h-11" />
              </a>
              <div className="z-30 flex items-center gap-2">
                <a className={ctaCls("sm")} href={H(n.cta.href)} tabIndex={mobileOpen ? 0 : -1}>{n.cta.label}</a>
                <button aria-expanded={mobileOpen} aria-label={n.menu} className="group flex h-10 w-10 flex-col items-center justify-center rounded-lg outline-hidden data-focus-visible:bg-green-800" type="button" onClick={() => { setMobileOpen((o) => !o); setMobileSub(null); }}>
                  <div className={"ease my-1 h-[2px] w-5 transform rounded-full transition group-data-focus-visible:bg-white " + (mobileOpen ? "translate-y-[5px] rotate-45 " : "") + "bg-gray-400 theme-tech:bg-gray-200"}></div>
                  <div className={"ease my-1 h-[2px] w-5 transform rounded-full transition group-data-focus-visible:bg-white " + (mobileOpen ? "translate-y-[-5px] -rotate-45 " : "") + "bg-gray-400 theme-tech:bg-gray-200"}></div>
                </button>
              </div>
              {mobileOpen && (
                <div aria-label="Mobile navigation menu" className="z-20 flex w-full flex-col justify-between gap-10 bg-white shadow-lg theme-tech:bg-black theme-product:bg-gray-100 theme-platform:bg-gray-200 fixed inset-0 top-[60px] grow overflow-y-auto px-4 py-6 origin-top-right mobile-menu-enter" role="navigation">
                  {mobileSub ? (
                    <div className="flex flex-col gap-11 md:gap-20 mobile-menu-enter">
                      <button className="group flex items-center justify-center gap-2 text-body-lg text-gray-400 focus:text-green-800 focus:outline-hidden md:gap-0 theme-tech:text-gray-200" type="button" onClick={() => setMobileSub(null)}>
                        <span className="mr-auto ml-0"><Chevron className="h-4 w-4 rotate-90" /></span>
                        <span className="mr-auto -ml-4">{labels[mobileSub]}</span>
                      </button>
                      <ul className="flex flex-col gap-1 md:items-center xl:items-start">
                        {mobileSubItems[mobileSub].map((it) => (
                          <li key={it.href}><a className={MOBILE_ITEM} href={H(it.href)} tabIndex={0}>{it.label}</a></li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-1 bg-white theme-tech:bg-black theme-product:bg-gray-100 theme-platform:bg-gray-200 opacity-1 mobile-menu-enter">
                      {(["product", "specialties"] as MenuKey[]).map((k) => (
                        <li key={k}><button className={MOBILE_ITEM} type="button" onClick={() => setMobileSub(k)}>{labels[k]}<Chevron className="h-4 w-4 -rotate-90" /></button></li>
                      ))}
                      <li><a className={MOBILE_ITEM} href={H("/customers")} tabIndex={0}>{n.customers}</a></li>
                      <li><button className={MOBILE_ITEM} type="button" onClick={() => setMobileSub("company")}>{labels.company}<Chevron className="h-4 w-4 -rotate-90" /></button></li>
                      <li className="flex gap-2 px-1 py-4">
                        {LOCALES.map((l) => (
                          <a key={l} className={"rounded-full border border-primary px-4 py-2 text-label-md " + (l === lang ? "bg-green-800 text-white" : "text-primary")} href={lhref(l, path)}>{l.toUpperCase()}</a>
                        ))}
                      </li>
                    </ul>
                  )}
                  <a className={"inline-flex cursor-pointer items-center rounded-full outline-hidden focus-button bg-surface-tertiary-100 text-primary hover:bg-surface-tertiary-50 hover:text-brand-primary h-14 gap-2 px-8 text-body-sm flex-row-reverse justify-center md:self-start" + (mobileSub ? " hidden" : "")} href={n.cta.href.startsWith("http") ? n.cta.href : "https://app.optavius.com"} rel="noopener noreferrer" target="_blank">
                    {n.signIn}
                  </a>
                </div>
              )}
            </div>
          </div>
          <ul className="hidden shrink-0 items-center gap-2 xl:flex">
            {langSwitch}
            <li><a className={NAV_LINK} href="https://app.optavius.com" rel="noopener noreferrer" target="_blank">{n.signIn}</a></li>
            <li className={transparent ? "theme-base" : undefined}><a className={ctaCls("md")} href={H(n.cta.href)} tabIndex={0}>{n.cta.label}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
