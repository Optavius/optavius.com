"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

function Chevron({ className }: { className: string }) {
  return (
    <svg aria-label="Chevron" className={className} fill="none" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9L12 17L4 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Draggable slide carousel mirroring the source's embla-based markup. Props carry the original class names of
 * the section / inner wrapper / track / slides so each variant lays out identically.
 */
export default function Carousel({
  slides,
  className,
  innerClass = "relative z-10 flex flex-col gap-8 xl:gap-12",
  container = true,
  wrapClass = "cursor-move",
  trackClass = "flex gap-grid-gutter mb-10 gap-0!",
  slideClass = "relative min-w-0 select-none mx-2 flex flex-[0_0_86%] items-stretch justify-stretch first:ml-0 last:mr-0 md:flex-[0_0_calc(50%-8px)] xl:flex-[0_0_calc(25%-12px)]",
  controls = false,
  controlsClass = "flex items-center justify-between",
  arrowsClass = "flex justify-end gap-1 md:col-span-2 md:col-start-11 md:justify-center xl:col-span-1 xl:col-start-11 xl:justify-end",
  dots = true,
  loop = false,
}: {
  slides: ReactNode[];
  className?: string;
  innerClass?: string;
  container?: boolean;
  wrapClass?: string;
  trackClass?: string;
  slideClass?: string;
  controls?: boolean;
  controlsClass?: string;
  arrowsClass?: string;
  dots?: boolean;
  loop?: boolean;
}) {
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", loop });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState(slides.length);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const onSelect = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    setSnaps(api.scrollSnapList().length);
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const track = (
    <div className={wrapClass} ref={ref}>
      <div aria-live="polite" className={trackClass}>
        {slides.map((s, i) => (
          <div key={i} aria-label={`${i + 1} of ${slides.length}`} aria-roledescription="slide" className={slideClass} role="group">
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-20 bg-white/0 transition-colors"></div>
            {s}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Carousel" aria-roledescription="carousel" className={className}>
      <div className={innerClass}>
        {container ? <div className="mx-auto w-full max-w-[1160px] px-container-margin">{track}</div> : track}
        {controls && snaps > 1 && (
          <div className={controlsClass}>
            <div className="flex items-center">
              {dots &&
                snaps > 1 &&
                Array.from({ length: snaps }).map((_, i) => (
                  <button key={i} aria-current={i === selected} aria-label={`Go to slide ${i + 1}`} className="group flex h-6 w-6 items-center justify-center outline-hidden focus:outline-hidden" type="button" onClick={() => api?.scrollTo(i)}>
                    <div
                      className={
                        "h-2 w-2 rounded-full transition-colors group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-brand " +
                        (i === selected ? "bg-green-300 theme-platform:bg-gray-400" : "hover:bg/black/30 bg-black/20 theme-tech:bg-gray-700 theme-platform:bg-gray-300")
                      }
                    ></div>
                  </button>
                ))}
            </div>
            <div className={arrowsClass}>
              <button
                aria-label="Previous slide"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full outline-hidden focus-button backdrop-blur-[100px] transition-colors disabled:cursor-not-allowed bg-gray-400/6 text-primary hover:bg-gray-400/10 disabled:bg-gray-400/10 disabled:opacity-50"
                disabled={!canPrev}
                type="button"
                onClick={() => api?.scrollPrev()}
              >
                <Chevron className="rotate-90 h-4 w-4" />
              </button>
              <button
                aria-label="Next slide"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full outline-hidden focus-button backdrop-blur-[100px] transition-colors disabled:cursor-not-allowed bg-gray-400/6 text-primary hover:bg-gray-400/10 disabled:bg-gray-400/10 disabled:opacity-50"
                disabled={!canNext}
                type="button"
                onClick={() => api?.scrollNext()}
              >
                <Chevron className="-rotate-90 h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
