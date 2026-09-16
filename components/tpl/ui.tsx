import Img from "./Img";
import { asset } from "@/lib/base";
import { telDisplay } from "@/content/shared";
import type { CSSProperties, ReactNode } from "react";
import type { Media } from "@/content/types";
import Mock from "@/components/mockups/Mock";
import { Icon } from "./Icons";

/* Shared class strings (copied from the original DOM so the cascade is identical). */
export const BTN =
  "inline-flex cursor-pointer items-center justify-between rounded-full outline-hidden disabled:cursor-not-allowed motion-safe:transition-[background-color,color,border-radius] focus-button ";
export const BTN_PRIMARY = BTN + "bg-surface-primary-500 text-white hover:bg-surface-primary-300 focus-visible:bg-surface-primary-300 active:bg-green-350 disabled:bg-surface-disabled ";
export const BTN_SECONDARY = BTN + "bg-surface-secondary-50 text-primary hover:bg-surface-secondary-100 hover:text-brand-primary disabled:bg-gray-400/6 disabled:text-disabled ";
export const BTN_OUTLINE = BTN + "border border-boh bg-transparent text-primary hover:bg-surface-boh disabled:border-secondary disabled:text-disabled disabled:hover:bg-transparent ";
export const BTN_GLASS = BTN + "bg-surface-quartenary-100 text-white backdrop-blur-[100px] hover:bg-surface-quartenary-200 focus-visible:bg-surface-quartenary-200 focus-visible:outline-white disabled:bg-white/5 ";
export const BTN_TERTIARY = BTN + "bg-surface-tertiary-100 text-primary hover:bg-surface-tertiary-50 hover:text-brand-primary disabled:bg-gray-400/6 disabled:text-invert-disabled ";
export const SM = "h-10 gap-1 px-4 text-label-md flex-row-reverse";
export const LG = "h-14 gap-2 px-8 text-body-sm flex-row-reverse";

export const SECTION = "bg-white theme-tech:bg-black theme-tech:text-gray-100 theme-product:bg-gray-100 theme-platform:bg-gray-200 theme-brand:bg-green-800 theme-brand:text-white relative py-section-padding";
export const CONTAINER = "mx-auto w-full max-w-[1160px] px-container-margin";
export const HEAD_GRID = "grid grid-cols-12 gap-grid-gutter gap-y-3 px-4 md:gap-y-4 md:px-0 xl:gap-y-6";

export function Section({ children, theme = "", z = 1, className = "", id }: { children: ReactNode; theme?: string; z?: number; className?: string; id?: string }) {
  return (
    <section id={id} className={theme + " " + SECTION + " " + className} style={{ zIndex: z }}>
      <div className={CONTAINER}>{children}</div>
    </section>
  );
}

/** Centered section heading (headline-md or -lg) with optional lede and button. */
export function CenterHead({ title, lede, cta, size = "lg", pad = "pb-8 md:pb-14" }: { title: string; lede?: string; cta?: { label: string; href: string }; size?: "md" | "lg"; pad?: string }) {
  return (
    <div className={HEAD_GRID + " " + pad}>
      <h2 className={`whitespace-pre-wrap text-black theme-tech:text-white text-headline-${size} text-center text-balance col-span-12 xl:col-span-8 xl:col-start-3`}>{title}</h2>
      {lede && (
        <div className="col-span-12 xl:col-span-8 xl:col-start-3">
          <p className="text-body-sm whitespace-pre-wrap text-gray-400 md:max-w-xl theme-tech:text-gray-100 mx-auto text-center text-balance">{lede}</p>
        </div>
      )}
      {cta && (
        <div className="col-span-12 flex min-w-42.5 gap-2 pt-2 lg:pt-0 justify-center">
          <a className={BTN_OUTLINE + SM} href={cta.href}>{cta.label}</a>
        </div>
      )}
    </div>
  );
}

/** Left-aligned section heading. */
export function LeftHead({ title, lede, pad = "pb-8 md:pb-14 xl:pb-14", cta }: { title: string; lede?: string; pad?: string; cta?: { label: string; href: string } }) {
  return (
    <div className={HEAD_GRID + " " + pad}>
      <h2 className="whitespace-pre-wrap text-black theme-tech:text-white text-headline-lg col-span-12 xl:col-span-8">{title}</h2>
      {lede && (
        <div className="col-span-12 xl:col-span-8">
          <p className="text-body-sm whitespace-pre-wrap text-gray-400 md:max-w-xl theme-tech:text-gray-100">{lede}</p>
        </div>
      )}
      {cta && (
        <div className="col-span-12 flex min-w-42.5 gap-2 pt-2 lg:pt-0 row-start-3 xl:col-span-3 xl:col-start-10 xl:row-start-1 xl:items-end xl:justify-end xl:place-self-end">
          <a className={BTN_PRIMARY + SM} href={cta.href}>{cta.label}</a>
        </div>
      )}
    </div>
  );
}

const PLAY = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img" aria-label="Play Icon" className="fill-current h-4 w-4"><path d="M7.65703 2.27884C6.49076 1.57201 5 2.41169 5 3.77543V20.2247C5 21.5884 6.49076 22.4281 7.65703 21.7213L21.2276 13.4966C22.3516 12.8155 22.3516 11.1846 21.2276 10.5035L7.65703 2.27884Z" fill="currentColor"></path></svg>
);
const PAUSE = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current h-4 w-4"><path d="M4.75 3.75H9.25V20.25H4.75V3.75Z" stroke="currentColor" strokeWidth="2"></path><path d="M14.75 3.75H19.25V20.25H14.75V3.75Z" stroke="currentColor" strokeWidth="2"></path></svg>
);

/** Video with the original play/pause control markup (Enhancer wires the button). */
export function VideoBox({ src, poster, playing = true, light = false, controlsAlign = "justify-start" }: { src: string; poster?: string; playing?: boolean; light?: boolean; controlsAlign?: string }) {
  const btn = light ? BTN_GLASS : BTN_TERTIARY;
  return (
    <div className="video-bg overflow-hidden bg-surface-tertiary-100 absolute inset-0 media-container" style={{ contain: "layout paint" }}>
      {poster && <Img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} src={poster} />}
      <video className="absolute inset-0 h-full w-full object-cover" src={src + "#t=0.001"} poster={poster} muted loop playsInline autoPlay={playing} preload="metadata" data-autoplay={playing ? "true" : undefined} />
      <div className="group/controls absolute top-0 right-0 bottom-0 left-0 z-10 flex flex-col gap-2 px-2 pb-2 md:px-4 md:pb-4 xl:pb-6 justify-end" style={{ pointerEvents: "auto", opacity: 1 }}>
        <button type="button" className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer" tabIndex={-1} aria-hidden="true"></button>
        <div className={"pointer-events-none z-10 flex w-full items-center gap-2 " + controlsAlign}>
          <div className="flex items-center gap-2">
            <button className={"group/control pointer-events-auto z-10 items-center justify-center rounded-full p-1 focus-outline md:bottom-4 md:left-4 flex transition-opacity focus-visible:opacity-100 supports-hover:opacity-0 supports-hover:group-hover/controls:opacity-100 h-10 w-10 " + btn.replace(BTN, "")} type="button" aria-label={playing ? "Pause video" : "Play video"}>
              <span className="rounded-full p-2 transition">{playing ? PAUSE : PLAY}</span>
            </button>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
}

/** Renders any Media inside an absolutely-positioned box (parent must be relative with an aspect ratio). */
export function MediaFill({ media, light = false }: { media: Media; light?: boolean }) {
  if (media.kind === "video") return <VideoBox src={media.src} poster={media.poster} light={light} />;
  if (media.kind === "image")
    return <Img alt={media.alt || ""} loading="lazy" className="block h-auto w-full object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectPosition: media.position, color: "transparent" }} src={media.src} />;
  if (media.zoom && media.zoom !== 1) return <div className="absolute inset-0" style={{ transform: `scale(${media.zoom})`, transformOrigin: "50% 45%" }}><Mock name={media.name} /></div>;
  return <Mock name={media.name} />;
}

/** Feature list item (icon + title + text) in the original markup. */
export function FeatureItem({ icon, title, text }: { icon?: string; title: string; text: string }) {
  return (
    <li className="flex flex-col gap-1">
      <h3 className="flex gap-2 text-body-sm text-black theme-tech:text-white py-0 xl:py-0">
        {icon && <Icon name={icon} className="mt-icon-body-s h-5 w-5 shrink-0" />}
        {title}
      </h3>
      <p className="pr-4 text-body-sm whitespace-pre-line text-secondary md:pr-0">{text}</p>
    </li>
  );
}

/** Button label for the demo line: the label with the phone number in smaller type underneath. */
export function CallLabel({ label, href }: { label: string; href: string }) {
  const n = telDisplay(href);
  return n ? <span className="flex flex-col items-start leading-tight"><span>{label}</span><span className="text-label-sm font-normal opacity-80">{n}</span></span> : <>{label}</>;
}

/** Logos shown on dark photos: most invert to white, the North Texas mark has its own white file. */
export const logoWhite = (src: string) => (src.includes("logo-ntx") ? { src: asset("/optavius/logo-ntx-white.png"), cls: "" } : { src, cls: "brightness-0 invert" });

export const imgStyle: CSSProperties = { position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" };
