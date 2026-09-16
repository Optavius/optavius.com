import Img from "./Img";
import { Fragment } from "react";
import type { Story } from "@/content/types";
import Carousel from "@/components/Carousel";
import { BTN, CONTAINER, LeftHead, Section, imgStyle, logoWhite } from "./ui";
import { Chevron } from "./Icons";
import { BASE } from "@/lib/base";

const L = (lang: string, path: string) => BASE + (lang === "en" ? path : `/${lang}${path}`);

/** Grid of story cards (customers S03 / case study S02). */
export function StoryCards({ stories, lang, title, filters }: { stories: Story[]; lang: string; title?: string; filters?: { label: string; active?: boolean }[] }) {
  return (
    <Section theme="theme-base" z={1}>
      {title && (
        <div className="flex flex-col gap-8 pb-8 md:pb-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div><h2 className="whitespace-pre-wrap text-black theme-tech:text-white text-headline-lg">{title}</h2></div>
            {filters && (
              <nav aria-label="Filter customer stories by specialty">
                <ul className="inline-grid w-[350px] max-w-full grid-cols-2 gap-4 lg:w-[548px] lg:grid-cols-3">
                  {filters.map((f, i) => (
                    <li key={f.label} className={"list-none " + (i === 0 ? "col-span-full" : "")}>
                      <span className={"inline-flex items-center justify-center rounded-full text-body-sm " + (f.active ? "text-brand-primary" : "text-secondary")}>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-grid-gutter">
        {stories.map((s) => (
          <div key={s.slug} className="col-span-12 md:col-span-6 xl:col-span-4">
            <a className="group block rounded-3xl outline-hidden focus-visible:border-4 focus-visible:border-green-800 focus-visible:p-2" href={L(lang, "/customers/" + s.slug)}>
              <figure className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 after:opacity-0 after:transition-opacity group-hover:after:opacity-100">
                <Img alt={s.card.alt} loading="lazy" className="block h-auto w-full object-cover motion-safe:transition-all motion-safe:group-hover:scale-102 motion-safe:group-hover:blur-sm motion-safe:group-hover:brightness-80" style={imgStyle} src={s.card.image} />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute z-10 flex h-full w-full flex-col justify-end p-4 md:p-6">
                  <Img alt={s.logoAlt + " Logo"} loading="lazy" className={"block absolute top-1/2 left-1/2 h-14 w-auto max-w-[70%] -translate-x-1/2 -translate-y-1/2 object-contain xl:h-[72px] " + logoWhite(s.logo).cls} style={{ color: "transparent" }} src={logoWhite(s.logo).src} />
                  {s.card.stat && (
                    <div className="flex flex-col gap-1 text-white">
                      <span className="text-headline-md leading-none tabular-nums">{s.card.stat.value}</span>
                      <span className="text-label-sm">{s.card.stat.label}</span>
                    </div>
                  )}
                </div>
              </figure>
              <span className="sr-only">{s.title}</span>
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Dark featured-stories carousel (customers S02). */
export function FeaturedStories({ stories, lang, readMore }: { stories: Story[]; lang: string; readMore: string }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-[1726px] px-container-margin px-0! md:mt-16">
      <section className="relative py-0!" style={{ zIndex: 2 }}>
        <article className="theme-tech relative isolate flex min-h-[640px] flex-col overflow-hidden bg-surface-tertiary-50 px-6 py-8 text-white xl:py-20 3xl:rounded-3xl">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-green-800" />
          <div className="relative z-10 flex flex-1 flex-col gap-8 md:gap-12">
            <Carousel innerClass="relative z-10 flex flex-col flex-1 gap-8 md:gap-12" container={false} wrapClass="cursor-move flex flex-1" trackClass="flex gap-grid-gutter max-w-full gap-0" slideClass="relative min-w-0 flex-[0_0_100%] select-none flex" controls={true} dots={true} controlsClass={CONTAINER + " flex items-center justify-between"}
              slides={stories.map((s) => (
                <Fragment key={s.slug}>
                  <div className={CONTAINER + " flex flex-1"}>
                    <div className="flex w-full flex-col h-full justify-between gap-10">
                      <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <div className="flex flex-col items-start gap-4 md:gap-6 order-2 md:order-1 md:max-w-md xl:max-w-xl">
                          <Img alt={s.logoAlt + " Logo"} loading="lazy" className={"block h-10 w-auto max-w-[200px] object-contain xl:h-14 " + logoWhite(s.logo).cls} style={{ color: "transparent" }} src={logoWhite(s.logo).src} />
                          <h2 className="text-balance text-primary text-headline-lg">{s.title}</h2>
                          <a className={BTN + "hover:bg-surface-secondary-100 hover:text-brand-primary h-10 gap-1 px-4 text-label-md flex-row-reverse mt-2 mb-0 bg-gray-100 text-gray-700 md:mt-0"} href={L(lang, "/customers/" + s.slug)}>{readMore}</a>
                        </div>
                        <figure className="relative order-1 h-58 w-58 shrink-0 overflow-hidden rounded-2xl md:order-2 lg:h-90 lg:w-90">
                          <Img alt={s.card.alt} loading="lazy" className="block h-auto w-full object-cover" style={imgStyle} src={s.card.image} />
                        </figure>
                      </div>
                      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
                        {s.stats.map((st) => (
                          <li key={st.label} className="flex w-full flex-col-reverse gap-2">
                            <p className="text-gray-100 text-body-md">{st.label}</p>
                            <span className="flex items-center gap-2 leading-none tabular-nums text-white text-headline-lg">{st.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Fragment>
              ))} />
          </div>
        </article>
      </section>
    </div>
  );
}

/** Case-study hero (dark, photo behind). */
export function StoryHero({ s }: { s: Story }) {
  return (
    <header className="theme-tech relative isolate h-svh w-full bg-surface-tertiary-50 md:h-[90svh] lg:min-h-[800px] 2xl:min-h-[1117px]">
      <Img alt="" aria-hidden="true" loading="lazy" className="block h-auto w-full object-cover -z-20 opacity-100" style={imgStyle} src={s.hero.image} />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/30 to-black/20" />
      <div className={CONTAINER + " relative z-10 flex h-full items-center"}>
        <div className="flex w-full flex-col gap-16 md:gap-30">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-start gap-4 md:gap-6">
              <Img alt={s.logoAlt + " Logo"} loading="lazy" className={"block h-12 w-auto max-w-[220px] object-contain xl:h-16 " + logoWhite(s.logo).cls} style={{ color: "transparent" }} src={logoWhite(s.logo).src} />
              <h1 className="text-balance text-primary text-headline-xl">{s.title}</h1>
            </div>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {s.stats.map((st) => (
              <li key={st.label} className="flex w-full flex-col-reverse gap-2">
                <p className="text-gray-100 text-body-md">{st.label}</p>
                <span className="flex items-center gap-2 leading-none tabular-nums text-white text-headline-lg">{st.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export function StoryMoreLink({ label, href }: { label: string; href: string }) {
  return (
    <a className={BTN + "bg-surface-primary-500 text-white hover:bg-surface-primary-300 h-10 gap-1 px-4 text-label-md flex-row-reverse"} href={href}>
      {label}
      <Chevron className="-rotate-90 h-[1em] w-[1em]" />
    </a>
  );
}

export { LeftHead };
