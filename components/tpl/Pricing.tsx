import type { Site } from "@/content/types";
import { BTN_OUTLINE, BTN_PRIMARY, CallLabel, CenterHead, Section } from "./ui";
import { Chevron, Icon } from "./Icons";
import Calculator from "./Calculator";
import { BASE } from "@/lib/base";

const L = (lang: string, path: string) => (/^(https?:|mailto:|tel:|#)/.test(path) ? path : BASE + (lang === "en" ? path : `/${lang}${path}`));

export default function PricingPage({ p, lang }: { p: Site["pricing"]; lang: string }) {
  return (
    <>
      <header>
        <div className="mx-auto w-full max-w-[1726px] px-container-margin flex flex-col items-center pt-section-padding pb-8">
          <div className="flex flex-col items-center gap-6 text-center xl:max-w-[66.67%]">
            <h1 className="text-headline-xl text-balance whitespace-pre-wrap text-black theme-tech:text-white">{p.title}</h1>
            <p className="max-w-xl text-body-md whitespace-pre-wrap text-gray-350 md:text-body-lg xl:text-headline-sm">{p.lede}</p>
          </div>
        </div>
      </header>
      <Section z={3} className="pt-4">
        <CenterHead title={p.how.title} lede={p.how.lede} size="md" />
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
          {p.how.items.map((it) => (
            <div key={it.title} className="col-span-12 flex flex-col gap-4 rounded-3xl bg-surface-tertiary-100 p-6 text-primary md:col-span-4 md:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-green-500"><Icon name={it.icon} className="h-5 w-5" /></span>
              <h2 className="text-headline-sm">{it.title}</h2>
              <p className="text-body-sm text-secondary">{it.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section theme="theme-product" z={2}>
        <CenterHead title={p.stats.title} size="md" />
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
          {p.stats.items.map((s) => (
            <div key={s.label} className="col-span-12 flex flex-col gap-2 rounded-2xl bg-white p-6 text-center ring-1 ring-green-500/15 md:col-span-4">
              <span className="text-headline-lg leading-none tabular-nums text-green-500">{s.value}</span>
              <p className="text-body-sm text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section theme="theme-product" z={2} className="pt-0!">
        <Calculator c={p.calc} lang={lang} />
      </Section>
      <Section z={1}>
        <CenterHead title={p.faq.title} size="md" />
        <div className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 xl:col-span-8 xl:col-start-3">
            <div className="flex w-full flex-col gap-1" data-accordion-group="pricing-faq">
              {p.faq.items.map((it, i) => (
                <button key={it.q} id={`faq-${i}`} className="w-full rounded-2xl p-6 text-left focus-button transition-[color,background-color,border-radius] bg-surface-tertiary-100 text-primary not-aria-expanded:hover:text-secondary aria-expanded:bg-surface-dark-brand aria-expanded:text-white" type="button" tabIndex={0} aria-expanded="false" aria-controls={`faq-${i}-panel`}>
                  <div className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-body-md outline-hidden">
                    <span className="flex items-center gap-2">{it.q}</span>
                    <Chevron className="h-6 w-6 transition-[rotate]" />
                  </div>
                  <div role="region" id={`faq-${i}-panel`} aria-labelledby={`faq-${i}`} className="overflow-y-clip" style={{ height: "0px" }}>
                    <div className="max-w-[75ch] pt-6 text-body-sm text-white"><p>{it.a}</p></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section z={1}>
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h2 className="w-full text-center text-headline-lg text-primary">{p.cta.title}</h2>
          <p className="mx-auto w-full max-w-prose text-center text-body-sm text-balance whitespace-pre-wrap text-secondary xl:max-w-[560px]">{p.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <a className={BTN_PRIMARY + "h-14 gap-2 px-8 text-body-sm flex-row-reverse"} href={L(lang, p.cta.primary.href)}>{p.cta.primary.label}</a>
            {p.cta.secondary && <a className={BTN_OUTLINE + "h-14 gap-2 px-8 text-body-sm flex-row-reverse"} href={p.cta.secondary.href}><CallLabel label={p.cta.secondary.label} href={p.cta.secondary.href} /></a>}
          </div>
          {p.cta.note && <p className="text-center text-label-sm text-secondary">{p.cta.note}</p>}
        </div>
      </Section>
    </>
  );
}
