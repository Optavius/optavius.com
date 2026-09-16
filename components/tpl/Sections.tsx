import Img from "./Img";
import { Fragment } from "react";
import type { Bubble, CardsSection, CTASection, FeatureSplit, HeroSection, LogoStrip, ProofSection, QuoteBand, RelatedCard, StepsSection, TilesSection, TrustSection, VideoQuote, BigQuote, AccordionItem } from "@/content/types";
import Carousel from "@/components/Carousel";
import Mock from "@/components/mockups/Mock";
import { AgentAvatar } from "@/components/mockups/ui";
import { BTN_PRIMARY, BTN_SECONDARY, BTN_OUTLINE, CenterHead, CONTAINER, FeatureItem, HEAD_GRID, LeftHead, LG, MediaFill, SM, Section, VideoBox, imgStyle, logoWhite, CallLabel } from "./ui";
import { ArrowUp, Chevron, Icon } from "./Icons";
import { BASE } from "@/lib/base";

const L = (lang: string, path: string) => (/^(https?:|mailto:|tel:|#)/.test(path) ? path : BASE + (lang === "en" ? path : `/${lang}${path === "/" ? "" : path}`));

/* ---------- Hero with big media (product / specialty pages) ---------- */
function HeroBubbles({ bubbles }: { bubbles: Bubble[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-end justify-center p-4 md:p-8">
      <div className="flex w-full max-w-[560px] flex-col gap-2 md:gap-3">
        {bubbles.map((b, i) => (
          <div key={i} className={"hero-bubble-in flex " + (b.side === "start" ? "justify-start" : "justify-end")} style={{ animationDelay: `${0.4 + i * 1.1}s` }}>
            <div className="rounded-[22px] p-4 border-glass-2xl bg-glass w-[75vw] max-w-[334px] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-label-md text-white/80">
                {b.kind === "agent" ? <AgentAvatar size={16} /> : <span className="inline-block h-4 w-4 rounded-full bg-white/60" />}
                <span>{b.kind === "agent" ? "Optavius" : b.name}</span>
              </div>
              <div className="typography-body-product text-white">{b.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHero({ hero, lang }: { hero: HeroSection; lang: string }) {
  return (
    <div>
      <div className={CONTAINER + " flex flex-col gap-3 pt-12 pb-8 md:pt-16 xl:pt-20 xl:pb-12"}>
        <div className="flex flex-col gap-y-2 md:max-w-[600px] xl:max-w-[830px]">
          <h1 className="text-headline-lg text-balance whitespace-pre-wrap text-primary">{hero.title}</h1>
          {hero.subtitle && <p className="text-headline-lg whitespace-pre-wrap text-secondary">{hero.subtitle}</p>}
        </div>
        {hero.cta && (
          <div className="mt-6 flex w-full flex-wrap gap-4 md:gap-6">
            <a className={BTN_PRIMARY + SM} href={L(lang, hero.cta.href)}>{hero.cta.label}</a>
          </div>
        )}
      </div>
      <div className="mx-auto w-full max-w-[1726px] px-container-margin">
        <div className="relative col-span-12 aspect-square w-full md:aspect-16/7 overflow-hidden rounded-2xl xl:rounded-3xl">
          {hero.media.kind === "video" ? <VideoBox src={hero.media.src} poster={hero.media.poster} light /> : hero.media.kind === "mock" && hero.media.name === "dashboard-full" ? <div className="absolute inset-0 flex items-center justify-center bg-blue-100 p-[4%]"><div className="relative h-full max-w-full" style={{ aspectRatio: "2144 / 1228" }}><MediaFill media={hero.media} /></div></div> : <div className="absolute inset-0 bg-blue-100"><MediaFill media={hero.media} /></div>}
          {hero.overlay && <HeroBubbles bubbles={hero.overlay} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Centered page header (index pages) ---------- */
export function CenterHero({ title, lede, cta, image, lang }: { title: string; lede?: string; cta?: { label: string; href: string }; image?: { src: string; alt: string }; lang: string }) {
  return (
    <header>
      <div className="mx-auto w-full max-w-[1726px] px-container-margin flex flex-col items-center py-section-padding">
        <div className="flex flex-col items-center gap-6 text-center xl:max-w-[66.67%]">
          <h1 className="text-headline-xl text-balance whitespace-pre-wrap text-black theme-tech:text-white">{title}</h1>
          {lede && <p className="max-w-xl text-body-md whitespace-pre-wrap text-gray-350 md:text-body-lg xl:text-headline-sm">{lede}</p>}
        </div>
        {cta && (
          <div className="mt-6 flex w-full flex-wrap justify-center gap-4 md:gap-6">
            <a className={BTN_PRIMARY + SM} href={L(lang, cta.href)}>{cta.label}</a>
          </div>
        )}
        {image && (
          <div className="relative mt-12 aspect-square w-full md:aspect-16/7 overflow-hidden rounded-2xl xl:rounded-3xl">
            <Img alt={image.alt} className="block h-auto w-full object-cover media-container" style={imgStyle} src={image.src} />
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Feature split ---------- */
export function FeatureSplitSection({ s, z = 3 }: { s: FeatureSplit; z?: number }) {
  const right = (s.mediaSide || "right") === "right";
  const eye = s.media.kind === "mock" && s.media.name === "eye";
  const mediaCol = eye ? "md:col-span-7 " + (right ? "md:col-start-6" : "md:col-start-1") : "md:col-span-6 xl:col-span-5 " + (right ? "md:col-start-7 xl:col-start-8" : "md:col-start-1");
  const textCol = eye ? "md:col-span-4 " + (right ? "md:col-start-1" : "md:col-start-9") : "md:col-span-5 " + (right ? "md:col-start-1" : "md:col-start-8");
  return (
    <Section theme={s.tone === "product" ? "theme-product" : "theme-base"} z={z}>
      <LeftHead title={s.title} lede={s.lede} pad={s.lede ? "pb-8 md:pb-14 xl:pb-14" : "pb-12 md:pb-20 xl:pb-14"} />
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
        <div className={"relative col-span-12 md:row-start-1 " + mediaCol}>
          <figure className={"relative aspect-square overflow-hidden rounded-2xl " + (eye ? "bg-white" : "bg-gray-200 theme-tech:bg-gray-700 theme-platform:bg-gray-100")}>
            <MediaFill media={s.media} />
          </figure>
        </div>
        <div className={"relative col-span-12 md:row-start-1 md:self-center " + textCol}>
          <ul className={"flex flex-col " + (eye ? "gap-10 xl:gap-14" : "gap-8")}>
            {s.features.map((f) => (
              <FeatureItem key={f.title} {...f} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Quote band (gray) ---------- */
export function QuoteBandSection({ q, lang }: { q: QuoteBand; lang: string }) {
  return (
    <Section theme="theme-product" z={1}>
      <div className="mx-auto max-w-[960px] rounded-3xl bg-white p-6 md:p-10 theme-tech:bg-gray-700">
        {q.logo && <Img alt={q.logoAlt} className="mb-6 block h-8 w-auto max-w-[160px] object-contain object-left" src={q.logo} />}
        <blockquote className="text-headline-sm text-primary md:text-headline-md">“{q.quote}”</blockquote>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <figcaption className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-500"><Icon name="user" className="h-5 w-5" /></span>
            <div className="flex flex-col text-label-sm">
              <p className="text-primary">{q.name}</p>
              <p className="text-secondary">{q.role}</p>
            </div>
          </figcaption>
          {q.link && (
            <a className={BTN_PRIMARY + SM} href={L(lang, q.link.href)}>
              {q.link.label}
              <Chevron className="-rotate-90 h-[1em] w-[1em]" />
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}

export function BigQuoteSection({ q }: { q: BigQuote }) {
  return (
    <Section className="py-24 md:py-24 xl:py-32" z={1}>
      <div className="flex flex-col justify-center gap-6 xl:gap-8 text-center">
        <div className="relative mx-auto max-w-sm md:max-w-2xl xl:max-w-4xl">
          <h2 className="relative max-w-prose grow text-black before:absolute theme-tech:text-white text-headline-md">“{q.quote}”</h2>
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-body-sm font-medium text-black theme-tech:text-white">{q.name}</p>
          <p className="text-label-md text-black theme-tech:text-white">{q.role}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Tiles (home S07-style) ---------- */
export function TilesSection({ s, lang, z = 3 }: { s: TilesSection; lang: string; z?: number }) {
  const cols = s.columns || (s.tiles.length <= 2 ? 2 : s.tiles.length === 3 ? 3 : 4);
  const col = cols === 2 ? "col-span-12 md:col-span-6" : cols === 3 ? "col-span-12 md:col-span-6 lg:col-span-4" : "col-span-12 md:col-span-6 lg:col-span-3";
  const tile = (t: TilesSection["tiles"][number]) => (
    <article className="group flex w-full flex-col gap-4">
      <figure className="relative aspect-square w-full shrink-0 grow overflow-hidden rounded-2xl bg-blue-100">{t.mock ? <Mock name={t.mock} /> : t.media ? <MediaFill media={t.media} /> : null}</figure>
      <div className="flex flex-col gap-2 md:pr-2">
        <h3 className="flex w-full gap-2 text-body-sm text-primary items-center justify-start">{t.title}</h3>
        <p className="max-w-[50ch] text-body-sm text-secondary">{t.text}</p>
      </div>
    </article>
  );
  return (
    <Section theme="theme-base" z={z}>
      <CenterHead title={s.title} lede={s.lede} cta={s.cta ? { ...s.cta, href: L(lang, s.cta.href) } : undefined} size="md" />
      <div className={"grid-cols-12 gap-grid-gutter gap-y-8 hidden " + (cols === 2 ? "md:grid" : "lg:grid")}>
        {s.tiles.map((t) => (
          <div key={t.title} className={col}>{tile(t)}</div>
        ))}
      </div>
      <Carousel className={"overflow-x-hidden " + (cols === 2 ? "md:hidden" : "lg:hidden")} innerClass="relative z-10 flex flex-col gap-8 xl:gap-12" container={true} wrapClass="cursor-move" trackClass="flex gap-grid-gutter mb-10 gap-0!" slideClass="relative min-w-0 select-none mx-2 flex flex-[0_0_86%] items-stretch justify-stretch first:ml-0 last:mr-0 md:flex-[0_0_calc(50%-8px)] xl:flex-[0_0_calc(25%-12px)]" slides={s.tiles.map((t, i) => <Fragment key={i}>{tile(t)}</Fragment>)} />
    </Section>
  );
}

/* ---------- Logo strip (home S01) ---------- */
export function LogoStripSection({ s, lang, compact = false }: { s: LogoStrip; lang: string; compact?: boolean }) {
  return (
    <Section className="pt-2 pb-0! md:pt-4 xl:pt-8" z={8}>
      {s.title && (
        <div className={HEAD_GRID + (compact ? " py-6 md:pb-8 xl:py-8" : " md:pb-14 py-8 xl:py-12")}>
          <h2 className={"whitespace-pre-wrap text-black theme-tech:text-white text-center text-balance col-span-12 xl:col-span-8 xl:col-start-3 " + (compact ? "text-body-md text-gray-400" : "text-headline-md")}>{s.title}</h2>
          {s.cta && (
            <div className="col-span-12 flex min-w-42.5 gap-2 pt-2 lg:pt-0 justify-center">
              <a className={BTN_PRIMARY + SM} href={L(lang, s.cta.href)}>{s.cta.label}</a>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 items-center justify-center">
        <div className="group/container relative w-full py-2">
          <div className="flex flex-nowrap">
            <ul className="mx-auto flex w-full flex-wrap justify-center *:w-[175px] md:*:w-[240px] xl:*:w-[300px]">
              {s.logos.map((l) => (
                <li key={l.alt} className="flex w-full justify-stretch">
                  <a aria-label={"Read the customer story about " + l.alt} className="group relative flex w-full items-center justify-center px-4 py-6 focus-outline md:px-0 md:py-8" href={L(lang, l.href)}>
                    <Img alt={l.alt + " Logo"} className={"block group-hover:filter-none group-focus-visible:filter-none group-active:filter-none lg:filter-uniform-30 theme-tech:filter-gray-100 h-8 w-32 object-contain md:h-10 md:w-52 " + (l.className || "")} loading="lazy" src={l.src} style={{ color: "transparent" }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- CTA (home S10) ---------- */
export function CTABlock({ c, lang }: { c: CTASection; lang: string }) {
  return (
    <Section z={1}>
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <h2 className="w-full text-center text-headline-lg text-primary">{c.title}</h2>
        <p className="mx-auto w-full max-w-prose text-center text-body-sm text-balance whitespace-pre-wrap text-secondary xl:max-w-[560px]">{c.text}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <a className={BTN_PRIMARY + LG} href={L(lang, c.primary.href)}>{c.primary.label}</a>
          {c.secondary && <a className={BTN_OUTLINE + LG} href={L(lang, c.secondary.href)}><CallLabel label={c.secondary.label} href={c.secondary.href} /></a>}
        </div>
        {c.note && <p className="text-center text-label-sm text-secondary">{c.note}</p>}
      </div>
    </Section>
  );
}

/* ---------- Trust badges (home S09) ---------- */
export function TrustBlock({ t }: { t: TrustSection }) {
  return (
    <Section z={1}>
      <CenterHead title={t.title} lede={t.text} />
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {t.badges.map((b) => (
          <div key={b.alt} className="relative aspect-square w-16">
            <Img alt={b.alt} className="block h-auto w-full" loading="lazy" src={b.src} style={{ color: "transparent" }} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Related products carousel (product S04) ---------- */
export function RelatedSection({ title, cards, lang }: { title: string; cards: RelatedCard[]; lang: string }) {
  return (
    <Section className="overflow-x-hidden" z={1}>
      <LeftHead title={title} pad="pb-12 md:pb-20 xl:pb-8" />
      <Carousel innerClass="relative z-10 flex flex-col gap-6" container={false} wrapClass="cursor-move" trackClass="flex gap-grid-gutter" slideClass="relative min-w-0 flex-[0_0_100%] select-none" controls={true} dots={true} controlsClass="flex items-center justify-between" arrowsClass="flex justify-end gap-1 md:col-span-2 md:col-start-11 md:justify-center xl:col-span-1 xl:col-start-11 xl:justify-end"
        slides={cards.map((c, i) => (
          <Fragment key={i}>
            <div className="flex h-full flex-col items-start gap-6 rounded-3xl p-4 md:p-6 xl:justify-center xl:gap-12 theme-tech bg-green-800 xl:flex-row">
              <figure className="relative aspect-square w-full max-w-[350px] shrink-0 overflow-hidden rounded-xl bg-blue-100"><div className="absolute inset-0" style={c.zoom ? { transform: `scale(${c.zoom})`, transformOrigin: "50% 45%" } : undefined}><Mock name={c.mock} /></div></figure>
              <div className="flex flex-auto flex-col justify-between gap-4 md:flex-[55%] xl:self-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-headline-md text-primary">{c.title}</h2>
                  <p className="max-w-prose text-body-md text-secondary">{c.text}</p>
                </div>
                <a className={BTN_SECONDARY + "h-10 gap-1 px-4 text-label-md flex-row place-self-start"} href={L(lang, c.href)}>
                  {c.linkLabel}
                  <ArrowUp className="rotate-90 h-[1em] w-[1em]" />
                </a>
              </div>
            </div>
          </Fragment>
        ))} />
    </Section>
  );
}

/* ---------- Tabbed cards (industry S02) ---------- */
export function CardsTabsSection({ s, id }: { s: CardsSection; id: string }) {
  const tabs = s.tabs || [];
  return (
    <Section z={1}>
      <CenterHead title={s.title} lede={s.lede} size="md" pad="pb-12 md:pb-20" />
      <div data-orientation="horizontal">
        {tabs.length > 1 && (
          <div className="mb-12 flex justify-center px-8 md:px-50">
            <div className="relative flex w-auto overflow-hidden rounded-full bg-surface-tertiary-100 p-1 xl:p-2">
              <div className="relative no-scrollbar flex gap-1 overflow-x-scroll scroll-smooth" aria-label="Content tabs" role="tablist" aria-orientation="horizontal" data-orientation="horizontal" data-tabgroup={id}>
                {tabs.map((t, i) => (
                  <div key={t.label} className="h-10 gap-1 px-4 text-label-md group relative flex cursor-pointer items-center justify-center rounded-2xl focus-outline outline-4 outline-offset-4 outline-transparent transition-[background-color] data-hovered:bg-gray-100" tabIndex={i === 0 ? 0 : -1} aria-selected={i === 0} role="tab" data-tab-index={i}>
                    <span className="contents" data-tab-state="selected" hidden={i !== 0}>
                      <h3 className="text-label-md text-nowrap transition-colors text-brand-primary">{t.label}</h3>
                      <div className="absolute top-0 right-0 z-10 h-full w-full rounded-full bg-surface-ghost-100" style={{ opacity: 1 }}></div>
                    </span>
                    <span className="contents" data-tab-state="unselected" hidden={i === 0}>
                      <h3 className="text-label-md text-nowrap text-secondary transition-colors group-hover:text-primary">{t.label}</h3>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tabs.map((t, i) => (
          <div key={t.label} tabIndex={0} role="tabpanel" className="w-full rounded-3xl focus-outline" data-tabgroup={id} data-tab-index={i} hidden={i !== 0}>
            <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
              {t.cards.map((c) => (
                <div key={c.title} className="col-span-12 flex flex-col gap-2 text-body-sm md:col-span-4 h-full rounded-lg bg-surface-tertiary-100 p-4">
                  <h3>{c.title}</h3>
                  <p className="text-secondary">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Accordion (about S02) ---------- */
export function AccordionSection({ items, id }: { items: AccordionItem[]; id: string }) {
  return (
    <Section z={1}>
      <div className="grid grid-cols-12 gap-grid-gutter">
        <div className="col-span-12 xl:col-span-8 xl:col-start-3">
          <div className="flex w-full flex-col gap-1" data-accordion-group={id}>
            {items.map((it, i) => (
              <button key={it.title} id={`${id}-${i}`} className="w-full rounded-2xl p-6 text-left focus-button transition-[color,background-color,border-radius] bg-surface-tertiary-100 text-primary not-aria-expanded:hover:text-secondary aria-expanded:bg-surface-dark-brand aria-expanded:text-white" type="button" tabIndex={0} aria-expanded="false" aria-controls={`${id}-${i}-panel`}>
                <div className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-body-md outline-hidden">
                  <span className="flex items-center gap-2">{it.icon && <Icon name={it.icon} className="h-6 w-6" />}{it.title}</span>
                  <Chevron className="h-6 w-6 transition-[rotate]" />
                </div>
                <div role="region" id={`${id}-${i}-panel`} aria-labelledby={`${id}-${i}`} className="overflow-y-clip" style={{ height: "0px" }}>
                  <div className="max-w-[75ch] pt-6 text-body-sm text-white"><p>{it.text}</p></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Proof points (before → after) ---------- */
export function ProofSectionBlock({ p }: { p: ProofSection }) {
  return (
    <Section theme="theme-product" z={2}>
      <CenterHead title={p.title} lede={p.lede} />
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-4">
        {p.outcomes.map((o) => (
          <div key={o.label} className="col-span-12 flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-green-500/15 shadow-[0_28px_60px_-44px_rgba(0,104,56,0.45)] md:col-span-6 md:p-8 xl:col-span-4 theme-tech:bg-gray-700">
            <div className="flex items-end gap-3">
              {o.before && <span className="mb-1 text-headline-sm text-gray-350 line-through decoration-gray-350 tabular-nums">{o.before}</span>}
              {o.before && <Chevron className="mb-3 h-4 w-4 -rotate-90 text-gray-350" />}
              <span className="text-headline-xl leading-none tabular-nums text-green-500">{o.after}</span>
            </div>
            <p className="text-body-md font-medium text-primary">{o.label}</p>
            <p className="text-body-sm text-secondary">{o.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-label-sm text-secondary">{p.source}</p>
    </Section>
  );
}

/* ---------- FAQ (product and specialty pages) ---------- */
export function FaqSection({ faq, id }: { faq: { title: string; items: { q: string; a: string }[] }; id: string }) {
  return (
    <Section z={1}>
      <CenterHead title={faq.title} size="md" />
      <div className="grid grid-cols-12 gap-grid-gutter">
        <div className="col-span-12 xl:col-span-8 xl:col-start-3">
          <div className="flex w-full flex-col gap-1" data-accordion-group={id}>
            {faq.items.map((it, i) => (
              <button key={it.q} id={`${id}-${i}`} className="w-full rounded-2xl p-6 text-left focus-button transition-[color,background-color,border-radius] bg-surface-tertiary-100 text-primary not-aria-expanded:hover:text-secondary aria-expanded:bg-surface-dark-brand aria-expanded:text-white" type="button" tabIndex={0} aria-expanded="false" aria-controls={`${id}-${i}-panel`}>
                <div className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-body-md outline-hidden">
                  <span className="flex items-center gap-2">{it.q}</span>
                  <Chevron className="h-6 w-6 shrink-0 transition-[rotate]" />
                </div>
                <div role="region" id={`${id}-${i}-panel`} aria-labelledby={`${id}-${i}`} className="overflow-y-clip" style={{ height: "0px" }}>
                  <div className="max-w-[75ch] pt-6 text-body-sm text-white"><p>{it.a}</p></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Values: three open columns (About) ---------- */
export function ValuesSection({ items }: { items: AccordionItem[] }) {
  return (
    <Section z={1}>
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-8">
        {items.map((it) => (
          <div key={it.title} className="col-span-12 flex flex-col gap-4 rounded-3xl bg-surface-tertiary-100 p-6 md:col-span-4 md:p-8">
            {it.icon && <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-green-500"><Icon name={it.icon} className="h-5 w-5" /></span>}
            <h3 className="text-headline-sm text-primary">{it.title}</h3>
            <p className="text-body-sm text-secondary">{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Steps (live in 48 hours) ---------- */
export function StepsBlock({ s }: { s: StepsSection }) {
  return (
    <Section theme="theme-base" z={3}>
      <CenterHead title={s.title} lede={s.lede} size="md" />
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-8">
        {s.steps.map((st, i) => (
          <div key={st.title} className="col-span-12 md:col-span-6 lg:col-span-4">
            <article className="group flex w-full flex-col gap-4">
              <figure className="relative aspect-square w-full shrink-0 grow overflow-hidden rounded-2xl bg-blue-100">
                <Mock name={st.mock} />
                <span className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-label-md text-white">{i + 1}</span>
              </figure>
              <div className="flex flex-col gap-2 md:pr-2">
                <h3 className="flex w-full gap-2 text-body-sm text-primary items-center justify-start">{st.title}</h3>
                <p className="max-w-[50ch] text-body-sm text-secondary">{st.text}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
      {s.stat && (
        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <span className="text-headline-xl leading-none tabular-nums text-green-500">{s.stat.value}</span>
          <p className="text-body-sm text-secondary">{s.stat.label}</p>
        </div>
      )}
    </Section>
  );
}

/* ---------- Quote + video cards (home S03 with the customers video cards) ---------- */
export function VideoQuotesSection({ title, lede, items, lang }: { title: string; lede?: string; items: VideoQuote[]; lang: string }) {
  return (
    <Section theme="theme-base" z={6}>
      <CenterHead title={title} lede={lede} pad="pb-12 md:pb-20" />
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-8">
        {items.map((q) => (
          <div key={q.name} className="col-span-12 md:col-span-6 lg:col-span-4">
            <article className="group relative flex h-full flex-col gap-y-6">
              <blockquote className="relative max-w-prose theme-tech:text-white text-body-md text-balance text-primary xl:min-h-[4lh]">“{q.quote}”</blockquote>
              <a className="group/card relative block overflow-hidden rounded-2xl bg-gray-700 focus-outline" href={L(lang, q.href)} aria-label={q.name + ", " + q.role}>
                <figure className="relative aspect-[4/5] w-full overflow-hidden">
                  {q.video ? <video className="absolute inset-0 h-full w-full object-cover" src={q.video + "#t=0.001"} poster={q.poster} muted loop playsInline autoPlay preload="metadata" data-autoplay="true" /> : <Img alt={q.name} className="absolute inset-0 h-full w-full object-cover object-top" src={q.poster} loading="lazy" />}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
                  <Img alt={q.logoAlt} className={"absolute top-4 left-4 h-7 w-auto max-w-[120px] object-contain " + logoWhite(q.logo).cls} src={logoWhite(q.logo).src} />
                  <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 p-5 text-center text-white">
                    <p className="text-body-sm">{q.name}</p>
                    <p className="text-label-sm text-white/80">{q.role}</p>
                  </figcaption>
                </figure>
              </a>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}
