"use client";
import { useState } from "react";
import BentoAnim from "./BentoAnim";

const CLS: Record<string, string> = {
  green: "aspect-4/5 md:col-span-6 xl:col-span-12 xl:aspect-1112/500 bg-bento-mint text-primary",
  blue: "aspect-4/5 md:col-span-6 xl:col-span-4 bg-bento-navy",
  pink: "aspect-4/5 md:col-span-6 xl:col-span-4 bg-bento-plum",
  orange: "aspect-4/5 md:col-span-6 xl:col-span-4 bg-bento-amber",
};
type CardT = { id: string; title: string; body: string; sr: string; cls: string };

function Card({ c }: { c: CardT }) {
  const [playing, setPlaying] = useState(true);
  const [more, setMore] = useState(false);
  const descId = `bento-desc-${c.id}`;
  const bodyId = `bento-body-${c.id}`;
  return (
    <div className={"relative isolate col-span-12 flex flex-col gap-6 overflow-hidden rounded-2xl p-6 lg:p-8 " + c.cls}>
      <h3 className={"z-10 place-self-start pr-12 text-headline-sm " + (c.id === "green" ? "text-primary" : "text-white")}>{c.title}</h3>
      <p className={"z-10 transition-opacity md:absolute md:right-8 md:bottom-8 md:left-8 md:max-w-[484px] md:opacity-100 " + (c.id === "green" ? "text-primary " : "text-white ") + (more ? "opacity-100" : "opacity-0")} id={bodyId}>
        {c.body}
      </p>
      <div className="absolute inset-0 cursor-pointer transition-opacity opacity-100">
        <div className="relative h-full w-full" role="img" aria-describedby={descId}>
          <BentoAnim id={c.id} playing={playing} />
        </div>
        <p className="sr-only" id={descId}>
          {c.sr}
        </p>
        <div className="group/controls absolute top-0 right-0 bottom-0 left-0 z-10 flex flex-col gap-2 px-2 pb-2 md:px-4 md:pb-4 xl:pb-6" style={{ pointerEvents: "auto", opacity: 1 }}>
          <button aria-hidden="true" className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer" tabIndex={-1} type="button" onClick={() => setPlaying((p) => !p)}></button>
          <div className="pointer-events-none z-10 flex items-center absolute top-5 right-6 w-auto md:top-7 md:right-8 justify-between">
            <div className="flex items-center gap-2">
              <button
                aria-label={playing ? "Pause video" : "Play video"}
                className="group/control pointer-events-auto z-10 items-center justify-center rounded-full p-1 focus-outline md:bottom-4 md:left-4 flex transition-opacity focus-visible:opacity-100 supports-hover:opacity-0 supports-hover:group-hover/controls:opacity-100 opacity-0 md:opacity-100 h-10 w-10 bg-surface-tertiary-100 text-primary hover:bg-surface-tertiary-50 hover:text-brand-primary disabled:bg-gray-400/6 disabled:text-invert-disabled"
                type="button"
                onClick={() => setPlaying((p) => !p)}
              >
                <span className="rounded-full p-2 transition">
                  {playing ? (
                    <svg aria-label="Pause Icon" className="fill-current h-4 w-4" fill="none" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5V20.5C9 21.3284 8.32843 22 7.5 22C6.67157 22 6 21.3284 6 20.5V3.5ZM15 3.5C15 2.67157 15.6716 2 16.5 2C17.3284 2 18 2.67157 18 3.5V20.5C18 21.3284 17.3284 22 16.5 22C15.6716 22 15 21.3284 15 20.5V3.5Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg aria-label="Play Icon" className="fill-current h-4 w-4" fill="none" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.65703 2.27884C6.49076 1.57201 5 2.41169 5 3.77543V20.2247C5 21.5884 6.49076 22.4281 7.65703 21.7213L21.2276 13.4966C22.3516 12.8155 22.3516 11.1846 21.2276 10.5035L7.65703 2.27884Z" fill="currentColor" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
      </div>
      <button
        aria-controls={bodyId}
        aria-expanded={more}
        aria-label={more ? "Show less" : "Show more"}
        className={"flex items-center justify-center focus-text absolute right-6 bottom-6 z-20 h-10 w-10 shrink-0 rounded-full p-2 text-white bg-glass transition-[rotate] hover:text-white md:hidden" + (more ? " rotate-45" : "")}
        onClick={() => setMore((m) => !m)}
      >
        <svg className="h-full w-full" data-icon-name="plus-small" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.25 7.66211V12.9121M12.25 12.9121V18.1621M12.25 12.9121H7M12.25 12.9121H17.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

export default function Bento({ title, lede, cards }: { title: string; lede: string; cards: { id: string; title: string; body: string; sr: string }[] }) {
  const CARDS: CardT[] = cards.map((c) => ({ ...c, cls: CLS[c.id] }));
  return (
    <section className="bg-white theme-tech:bg-black theme-tech:text-gray-100 theme-product:bg-gray-100 theme-platform:bg-gray-200 theme-brand:bg-green-800 theme-brand:text-white relative py-section-padding" style={{ zIndex: 1 }}>
      <div className="mx-auto w-full max-w-[1160px] px-container-margin">
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-3 px-4 md:gap-y-4 md:px-0 xl:gap-y-6 pb-8 md:pb-14">
          <h2 className="whitespace-pre-wrap text-black theme-tech:text-white text-headline-md text-center text-balance col-span-12 xl:col-span-8 xl:col-start-3">{title}</h2>
          <div className="col-span-12 xl:col-span-8 xl:col-start-3">
            <p className="text-body-sm whitespace-pre-wrap text-gray-400 md:max-w-xl theme-tech:text-gray-100 mx-auto text-center text-balance">{lede}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-4">
          {CARDS.map((c) => (
            <Card key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
