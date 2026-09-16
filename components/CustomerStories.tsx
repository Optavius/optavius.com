"use client";
import Img from "@/components/tpl/Img";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Story = { name: string; title: string; logo: string; logoSrc: string; logoCls: string; w: string; h: string; poster: string; href: string; label: string };

const COPIES = 3;
const GAP = 16;
const EASE = "cubic-bezier(0.22,1,0.36,1)";



/** Featured customer video carousel ("These are their stories"): looping coverflow of 9 portrait videos. */
export default function CustomerStories({ items }: { items: { name: string; title: string; logo: string; logoSrc: string; logoCls: string; poster: string; href: string; label: string }[] }) {
  const STORIES: Story[] = items.map((s) => ({ ...s, w: "200", h: "80", label: s.label + ": " + s.name + ", " + s.title }));
  const N = STORIES.length;
  const [pos, setPos] = useState(N); // virtual index into the 3x copied list, middle copy
  const [anim, setAnim] = useState(true);
  const [dims, setDims] = useState({ cw: 1440, vw: 1440 });
    const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    const measure = () => setDims({ cw: wrapRef.current?.clientWidth || window.innerWidth, vw: window.innerWidth });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = Math.min(454, 0.9 * dims.vw);
  const inactive = Math.min(360, 0.714 * dims.vw);
  const content = (active + inactive) / 2;
  const basis = content + GAP;
  const shift = (active - inactive) / 2;
  const trackX = -(pos * basis) + (dims.cw - basis) / 2;

  const go = useCallback(
    (delta: number) => {
      setAnim(true);
      setPos((p) => p + delta);
    },
    []
  );

  // after the slide animation, silently re-centre into the middle copy
  useEffect(() => {
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      if (pos < N || pos >= 2 * N) {
        setAnim(false);
        setPos(((pos % N) + N) % N + N);
      }
    }, 800);
    return () => {
      if (settle.current) clearTimeout(settle.current);
    };
  }, [pos]);

  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  const slides = [];
  for (let i = 0; i < N * COPIES; i++) {
    const s = STORIES[i % N];
    const d = i - pos;
    const near = Math.abs(d) <= 2 || Math.abs(d - N * COPIES) <= 2 || Math.abs(d + N * COPIES) <= 2;
    const offset = 0; // symmetric scaling keeps an equal gap on both sides of the active card
    const isActive = d === 0;
    slides.push(
      <div key={i} aria-label={`${(i % N) + 1} of ${N}`} aria-roledescription="slide" className="relative min-w-0 flex-[0_0_var(--fv-slide-basis)] px-[calc(var(--fv-slide-gap)/2)] select-none" role="group" {...(near ? {} : { inert: true })}>
        <div className="relative">
          <button
            aria-label={isActive ? s.label : s.name}
            className="group absolute inset-0 z-40 hidden cursor-pointer rounded-2xl focus-outline outline-none md:block"
            tabIndex={isActive ? 0 : -1}
            type="button"
            onClick={() => (isActive ? (window.location.href = s.href) : go(d))}
          >
            <span className="sr-only">{isActive ? s.label : s.name}</span>
          </button>
          <div aria-hidden="true" className="absolute inset-0 z-40 cursor-pointer md:hidden" onClick={() => (isActive ? (window.location.href = s.href) : go(d))}></div>
          <div className="will-change-transform" style={{ transform: `translate3d(${offset}px, 0, 0)`, transition: anim ? `transform .75s ${EASE}` : "none" }}>
            <div
              className="relative isolate overflow-hidden rounded-2xl bg-gray-100 will-change-transform aspect-454/614 transition-transform duration-750 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `scale(${isActive ? active / content : inactive / content})`, transition: anim ? undefined : "none" }}
            >
              <div className="absolute top-4 left-4 z-30 h-[36px] w-[112px]">
                <Img alt={s.logo} className={"block h-full w-full object-contain object-left " + s.logoCls} height={s.h} loading="lazy" src={s.logoSrc} style={{ color: "transparent" }} width={s.w} />
              </div>
              <div style={{ opacity: 1 }}>
                <div className="pointer-events-none z-0 absolute inset-0">
                  <Img alt="" className="absolute inset-0 h-full w-full object-cover object-top" src={s.poster} loading="lazy" />
                </div>
              </div>
              <div aria-hidden="true" className={"absolute inset-x-0 bottom-0 isolate z-30 py-4 transition-opacity duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] " + (isActive ? "opacity-100" : "opacity-0")}>
                <div className="absolute z-0 h-[150%] w-full -translate-y-1/2 rounded-full bg-radial from-black/80 to-transparent blur-2xl"></div>
                <div className="relative z-10 flex flex-col text-center">
                  <h3 className="text-body-lg text-white">{s.name}</h3>
                  <p className="text-body-md text-gray-200">{s.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Carousel" aria-roledescription="carousel" className="relative overflow-hidden pt-2">
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-[1990px] px-0 [--fv-active-basis:min(454px,90vw)] [--fv-inactive-basis:min(360px,71.4vw)] [--fv-slide-content-basis:calc((var(--fv-active-basis)_+_var(--fv-inactive-basis))_/_2)] [--fv-slide-basis:calc(var(--fv-slide-content-basis)_+_var(--fv-slide-gap))]"
        style={{ "--fv-slide-gap": "16px" } as React.CSSProperties}
      >
        <div className="touch-pan-y overflow-hidden [clip-path:inset(-100px_0)]"
          onPointerDown={(e) => { drag.current = { x: e.clientX, moved: false }; }}
          onPointerMove={(e) => { if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true; }}
          onPointerUp={(e) => { const d = drag.current; drag.current = null; if (!d) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
          onPointerCancel={() => { drag.current = null; }}
          onClickCapture={(e) => { if (drag.current?.moved) { e.stopPropagation(); e.preventDefault(); } }}>
          <div className="flex h-[calc(var(--fv-active-basis)*614/454)] items-center" style={{ transform: `translate3d(${trackX}px, 0px, 0px)`, transition: anim ? `transform .75s ${EASE}` : "none" }}>
            {slides}
          </div>
        </div>
      </div>
    </section>
  );
}

