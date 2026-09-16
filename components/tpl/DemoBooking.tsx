"use client";
import Img from "./Img";
import { useEffect } from "react";
import type { Site } from "@/content/types";
import { BTN_PRIMARY, CONTAINER, SECTION, SM } from "./ui";
import { Icon } from "./Icons";
import { calLink, loadCal , CAL_CONFIG } from "@/components/CalBooking";

/** Demo page: one job, pick a slot. Inline Cal.com calendar when a link is configured, otherwise a single button to the booking page. */
export default function DemoBooking({ d, logos, lang }: { d: Site["demo"]; logos: { src: string; alt: string }[]; lang: string }) {
  const link = calLink(lang);
  useEffect(() => {
    if (!link) return;
    loadCal();
    window.Cal("inline", { elementOrSelector: "#cal-inline", calLink: link, config: CAL_CONFIG });
  }, [link]);
  return (
    <section className={SECTION + " pb-12 md:py-16 xl:py-18"} style={{ zIndex: 1 }}>
      <div className={CONTAINER}>
        <div className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 flex flex-col gap-10 pb-10 md:col-span-10 md:col-start-2 xl:col-span-5 xl:col-start-1 xl:pt-4 xl:pb-0">
            <div>
              <h1 className="mb-7 text-headline-md text-primary md:mb-4 xl:mb-8 xl:max-w-117.5">{d.title}</h1>
              <ul className="flex flex-col gap-2 xl:max-w-105 xl:gap-4">
                {d.points.map((p) => (
                  <li key={p.text}>
                    <span className="flex gap-2 text-body-sm text-black py-0 md:py-0 xl:py-0">
                      <Icon name={p.icon} className="mt-icon-body-s h-5 w-5 shrink-0" />
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-6 block text-body-md text-gray-400">{d.trustedTitle}</p>
              <ul className="flex flex-wrap items-center gap-8 pr-10">
                {logos.map((l) => (
                  <li key={l.alt} className="relative h-9">
                    <Img alt={l.alt + " Logo"} loading="lazy" className="block h-full w-auto max-w-[140px] object-contain filter-gray-400" style={{ color: "transparent" }} src={l.src} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded-3xl bg-white px-4 py-8 md:px-10 xl:col-span-7 xl:py-10">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-headline-sm text-primary">{d.booking.title}</h2>
              <p className="mx-auto max-w-[48ch] text-body-sm text-secondary">{d.booking.text}</p>
            </div>
            {link ? (
              <div id="cal-inline" className="mt-6 min-h-[560px] w-full overflow-hidden rounded-2xl" />
            ) : (
              <div className="mt-8 flex flex-col items-center gap-3">
                <a className={BTN_PRIMARY + SM} href={d.booking.fallback.href} target="_blank" rel="noopener noreferrer">{d.booking.fallback.label}</a>
                <p className="text-label-sm text-secondary">{d.booking.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
