"use client";
import { useEffect, useRef, useState } from "react";
import { DashboardShell, DashboardTable, DashboardInput } from "../mockups/Dashboard";

/**
 * Scroll-linked section: dotted grid parallax (desktop), heading + dashboard layers fade/scale in while in view
 * (and back out when leaving), mirroring the original framer-motion behaviour.
 */
export default function MeetConsole({ title, lede }: { title: string; lede: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const [dashIn, setDashIn] = useState(false);

  useEffect(() => {
    const sec = sectionRef.current;
    const grid = gridRef.current;
    if (!sec || !grid) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth < 768) {
        grid.style.transform = "none";
        return;
      }
      const vh = window.innerHeight;
      const rect = sec.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      const start = top - 2 * vh;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / (bottom - start)));
      grid.style.transform = `translateY(${(-150 + 350 * p).toFixed(2)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const h = headingRef.current;
    const d = dashRef.current;
    if (!h || !d) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === d) setDashIn(e.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(h);
    io.observe(d);
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(0.2, 0.7, 0.2, 1)";

  return (
    <section ref={sectionRef}>
      <div className="relative">
        <div className="mt-[-50vh]"></div>
        <div className="absolute inset-0 mt-[-50vh]">
          <div className="sticky top-0 h-screen bg-agent-studio">
            <div className="h-full w-full bg-linear-to-b from-transparent from-80% to-white to-100%"></div>
          </div>
          <div className="absolute inset-0 isolate overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-white from-75% to-transparent md:from-60%"></div>
            <div className="absolute inset-0 top-0 z-0 h-full w-full" ref={gridRef} style={{ opacity: 1, transform: "translateY(-150px)" }}>
              <div className="absolute inset-0 bg-dotted-grid"></div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-linear-to-t from-white to-transparent"></div>
          </div>
        </div>
        <div className="relative h-[75vh] md:h-[95vh] 2xl:h-[85vh]">
          <div className="sticky top-[65%] flex items-center justify-center">
            <div className="relative w-full" ref={headingRef} style={{ opacity: 1 }}>
              <div className="grid grid-cols-12 gap-grid-gutter gap-y-3 md:gap-y-4 md:px-0 xl:gap-y-6 pb-8 md:pb-14 px-4">
                <h2 className="whitespace-pre-wrap text-black theme-tech:text-white text-headline-lg text-center text-balance col-span-12 xl:col-span-8 xl:col-start-3">{title}</h2>
                <div className="col-span-12 xl:col-span-8 xl:col-start-3">
                  <p className="text-body-sm whitespace-pre-wrap text-gray-400 md:max-w-xl theme-tech:text-gray-100 mx-auto text-center text-balance">{lede}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 -mt-10 overflow-clip bg-transparent mask-b-from-90% pt-10">
          <div className="mx-auto w-full max-w-[1160px] px-container-margin">
            <div className="relative" ref={dashRef}>
              <div className="aspect-[4/5] w-full md:aspect-[2144/1228]" style={{ opacity: dashIn ? 1 : 0, transform: dashIn ? "none" : "scale(0.95)", transition: `opacity .7s ${ease}, transform .7s ${ease}` }} role="img" aria-label="Optavius console">
                <DashboardShell />
              </div>
              <div className="absolute inset-0 z-10 h-full w-full md:pl-[21%]" style={{ opacity: dashIn ? 1 : 0, transform: dashIn ? "none" : "scale(1.1)", transition: `opacity .7s ${ease}, transform .7s ${ease}` }} aria-hidden="true">
                <div className="h-[84%] w-full md:h-[82%]"><DashboardTable compact /></div>
              </div>
              <div className="absolute inset-0 z-10 h-full w-full md:pl-[21%]" style={{ opacity: dashIn ? 1 : 0, transform: dashIn ? "none" : "scale(1.4)", transition: `opacity .7s ${ease}, transform 1.1s ${ease}` }} aria-hidden="true">
                <DashboardInput />
              </div>
            </div>
          </div>
          <div className="h-24 w-full lg:h-36 2xl:h-48"></div>
        </div>
      </div>
    </section>
  );
}
