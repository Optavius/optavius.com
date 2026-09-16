"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import type { Bubble, Site, VideoQuote } from "@/content/types";
import { AgentAvatar } from "../mockups/ui";
import { BASE } from "@/lib/base";

const GLASS = "rounded-[22px] p-4 border-glass-2xl bg-glass mask-t-from-50% mask-t-to-90% mask-size-[auto_200%] transition-[opacity,mask-position] duration-500 w-[75vw] max-w-[334px]";
const BUBBLE_TIMES = [500, 2200, 3900, 5600, 7300];
const SLIDE_MS = 9800;
/* desktop only: zoom a clip from its left edge so the face clears the headline */
const ZOOM: Record<string, string> = {};
const BTN = "inline-flex cursor-pointer items-center justify-between rounded-full outline-hidden disabled:cursor-not-allowed motion-safe:transition-[background-color,color,border-radius] focus-button ";

function BubbleView({ b, rank, open }: { b: Bubble; rank: number; open: boolean }) {
  const state = rank <= 1 ? "mask-position-[center_100%] opacity-100" : rank === 2 ? "mask-position-[center_top] opacity-60" : "mask-position-[center_top] opacity-25";
  return (
    <div className={"grid place-self-" + b.side} style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .7s cubic-bezier(.2,.8,.2,1)" }}>
    <div className="min-h-0">
      <div className={GLASS + " flex flex-col gap-2 " + state + (open ? " hero-bubble-in" : " invisible")}>
        <div className="flex items-center gap-2 text-label-md text-white/80">
          {b.kind === "agent" ? (
            <figure className="relative aspect-square size-4 overflow-hidden"><AgentAvatar size={16} /></figure>
          ) : (
            <figure className="relative flex aspect-square size-4 items-center justify-center overflow-hidden rounded-full bg-white/70 text-[9px] font-medium text-green-800">{(b.name || "?").slice(0, 1)}</figure>
          )}
          <span>{b.kind === "agent" ? "Optavius" : b.name}</span>
        </div>
        <div className="typography-body-product text-white">{b.text}</div>
      </div>
    </div>
    </div>
  );
}

export default function Hero({ h, lang, quote, tel }: { h: Site["home"]["hero"]; lang: string; quote?: VideoQuote; tel?: string }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [bubbleH, setBubbleH] = useState(300);
  const noteRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const measure = () => { const n = noteRef.current; const hd = n?.closest("header"); if (!n || !hd) return; setBubbleH(Math.max(180, Math.round(hd.getBoundingClientRect().bottom - n.getBoundingClientRect().bottom - 6))); };
    measure(); window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure);
  }, []);
  useEffect(() => { const mq = window.matchMedia("(max-width: 767px)"); const upd = () => setNarrow(mq.matches); upd(); mq.addEventListener("change", upd); return () => mq.removeEventListener("change", upd); }, []);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const loaded = useRef<Set<number>>(new Set([0]));
  const slides = h.slides;
  if (slides[0]?.poster) preload(slides[0].poster, { as: "image", fetchPriority: "high" });
  const L = (p: string) => (/^(https?:|mailto:|tel:|#)/.test(p) ? p : BASE + (lang === "en" ? p : `/${lang}${p}`));

  useEffect(() => {
    loaded.current.add(active); loaded.current.add((active + 1) % slides.length);
    const v = videoRefs.current[active];
    if (v) { try { if (v.readyState === 0) v.load(); v.currentTime = 0; const p = v.play(); if (p) p.catch(() => {}); } catch {} }
    setShown(0);
    const timers = BUBBLE_TIMES.map((t, i) => setTimeout(() => setShown(i + 1), t));
    const next = setTimeout(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS);
    return () => { timers.forEach(clearTimeout); clearTimeout(next); };
  }, [active, slides.length, narrow]);

  return (
    <header className="relative isolate h-svh w-full md:h-[90svh] md:min-h-[820px]">
      <div className="mt-20 h-[calc(100%-(var(--spacing)*20))] md:mt-30 md:h-[calc(100%-(var(--spacing)*30))] xl:mt-56 xl:h-[calc(100%-(var(--spacing)*56))]">
        <div className="mx-auto w-full max-w-[1160px] px-container-margin relative z-10 h-full">
          <h1 className="mb-4 text-headline-xl whitespace-pre-wrap text-white md:mb-6">{h.title}</h1>
          <p className="mb-6 max-w-[46ch] text-body-md text-white/90 md:mb-8 md:text-body-lg">{h.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a className={BTN + "bg-surface-primary-500 text-white hover:bg-surface-primary-300 active:bg-green-350 h-10 gap-1 px-4 text-label-md md:h-14 md:gap-2 md:px-8 md:text-body-sm flex-row-reverse"} href={L(h.primary.href)}>{h.primary.label}</a>
            <a className={BTN + "bg-surface-tertiary-100 text-primary hover:bg-surface-tertiary-50 hover:text-brand-primary h-10 gap-1 px-4 text-label-md md:h-14 md:gap-2 md:px-8 md:text-body-sm flex-row-reverse"} href={L(h.secondary.href)}>{tel && h.secondary.href.startsWith("tel:") ? <span className="flex flex-col items-start leading-tight"><span>{h.secondary.label}</span><span className="text-label-sm font-normal opacity-80">{tel}</span></span> : h.secondary.label}</a>
          </div>
          <p ref={noteRef} className="mt-3 text-label-sm text-white/70">{h.note}</p>
          {quote && (
            <figure className="mt-6 hidden max-w-[44ch] items-start gap-3 border-l-2 border-white/40 pl-4 md:flex">
              <div className="flex flex-col gap-1">
                <blockquote className="text-body-sm text-white/90">“{quote.quote}”</blockquote>
                <figcaption className="text-label-sm text-white/70">{quote.name}, {quote.role}</figcaption>
              </div>
            </figure>
          )}
        </div>
        {slides.map((s, i) => (
          <Fragment key={i}>
            <div className="mx-auto w-full max-w-[1160px] px-container-margin relative z-10">
              {active === i && (
                <div className="absolute bottom-0 left-0 w-full min-[600px]:right-0 min-[600px]:bottom-0 min-[600px]:left-auto min-[600px]:w-auto">
                  <div className="flex w-full flex-col justify-end gap-2 overflow-y-clip px-4 pt-4 pb-4 md:pb-6 [mask-image:linear-gradient(to_bottom,transparent_0%,black_32%)] md:gap-3 min-[600px]:w-[454px] md:h-[386px] xl:pb-8" style={narrow ? { height: bubbleH } : undefined}>
                    {s.bubbles.map((b, j) => (
                      <BubbleView key={j} b={b} rank={shown - 1 - j} open={j < shown} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* the clip's own first frame sits behind it (inline thumbnail first, then the real frame), so loading and crossfades never show a flat colour */}
            <div className={"transition-opacity duration-500 absolute inset-0 " + (active === i ? "opacity-100" : "opacity-0 delay-200")} style={{ backgroundColor: "#2f2a25", backgroundImage: [s.poster && `url(${s.poster})`, s.lqip && `url(${s.lqip})`].filter(Boolean).join(", ") || undefined, backgroundSize: "cover", backgroundPosition: narrow ? "75% center" : "center" }}>
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className={"block h-full w-full pointer-events-none absolute object-cover object-[75%_center] md:object-center" + (ZOOM[(s.video.match(/hero[0-9]/) || [""])[0]] || "")}
                muted
                playsInline
                poster={s.poster || undefined}
                autoPlay={i === active}
                preload={i === active || i === (active + 1) % slides.length ? "auto" : "none"}
                src={i === active || i === (active + 1) % slides.length || loaded.current.has(i) ? (narrow ? s.video.replace(/\.mp4$/, "-720.mp4") : s.video) + "#t=0.001" : undefined}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/10" />
            </div>
          </Fragment>
        ))}
      </div>
    </header>
  );
}
