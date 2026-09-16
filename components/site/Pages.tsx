import type { ProductPage as ProductPageT, Site, SpecialtyPage as SpecialtyPageT, Story } from "@/content/types";
import type { Lang } from "@/lib/i18n";
import { href as lhref } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import MeetConsole from "@/components/home/MeetConsole";
import CustomerStories from "@/components/CustomerStories";
import Mock from "@/components/mockups/Mock";
import DemoPlayer from "@/components/tpl/DemoPlayer";
import DemoBooking from "@/components/tpl/DemoBooking";
import ResourcesList from "@/components/site/ResourcesList";
import Img from "@/components/tpl/Img";
import { FAQS } from "@/content/faqs";
import PricingPage from "@/components/tpl/Pricing";
import { LegalPage, Markdown, P } from "@/components/tpl/Prose";
import { FeaturedStories, StoryCards, StoryHero } from "@/components/tpl/Stories";
import { AccordionSection, FaqSection, ValuesSection, BigQuoteSection, CTABlock, CardsTabsSection, CenterHero, FeatureSplitSection, LogoStripSection, PageHero, ProofSectionBlock, QuoteBandSection, RelatedSection, StepsBlock, TilesSection, TrustBlock, VideoQuotesSection } from "@/components/tpl/Sections";
import { BTN_PRIMARY, BTN_SECONDARY, CenterHead, CONTAINER, LeftHead, SM, Section, imgStyle, logoWhite } from "@/components/tpl/ui";
import { ArrowUp, Icon } from "@/components/tpl/Icons";
import articlesJson from "@/content/articles.json";

type Article = { slug: string; kind: string; kindLabel: string; title: string; description: string; readTime: number; body: string };
const ARTICLES = articlesJson as Record<string, Article[]>;
type Ctx = { site: Site; lang: Lang; path: string };

/* ---------- Home ---------- */
export function HomePage({ site, lang, path }: Ctx) {
  const h = site.home;
  return (
    <Shell site={site} lang={lang} path={path} navVariant="transparent">
      <Hero h={h.hero} lang={lang} tel={site.meta.telDisplay} quote={h.quotes.items.find((q) => (lang === "en" ? /north texas/i : /omc/i).test(q.logoAlt)) || h.quotes.items[0]} />
      <LogoStripSection s={h.logos} lang={lang} compact />
      <DemoPlayer d={h.demo} lang={lang} />
      <ProofSectionBlock p={h.proof} />
      <Bento title={h.bento.title} lede={h.bento.lede} cards={h.bento.cards} />
      <MeetConsole title={h.console.title} lede={h.console.lede} />
      <TilesSection s={h.agents} lang={lang} z={4} />
      <FeatureSplitSection s={site.product.sections[1]} z={3} />
      <StepsBlock s={h.live} />
      <VideoQuotesSection title={h.quotes.title} lede={h.quotes.lede} items={h.quotes.items} lang={lang} />
      <TrustBlock t={h.trust} />
      <CTABlock c={h.cta} lang={lang} />
    </Shell>
  );
}

/* ---------- Product pages ---------- */
function productBody(p: ProductPageT, lang: Lang, extra?: React.ReactNode, path?: string) {
  const faq = path ? FAQS[lang]?.[path] : undefined;
  return (
    <>
      <PageHero hero={p.hero} lang={lang} />
      {p.sections.map((s, i) => (
        <FeatureSplitSection key={s.key} s={s} z={6 - i} />
      ))}
      {extra}
      {p.quote && <QuoteBandSection q={p.quote} lang={lang} />}
      {p.trust && <TrustBlock t={p.trust} />}
      {p.pricingTeaser && (
        <Section z={1}>
          <div className="grid grid-cols-12 gap-grid-gutter isolate gap-y-6">
            <div className="col-span-12 md:row-start-1 md:col-span-5 md:col-start-1 xl:col-span-4 xl:col-start-2">
              <figure className="relative aspect-square w-full overflow-hidden rounded-2xl xl:rounded-3xl"><Mock name={p.pricingTeaser.mock} /></figure>
            </div>
            <div className="col-span-12 flex flex-auto flex-col md:row-start-1 md:max-w-[475px] md:flex-[55%] md:self-center md:col-span-7 md:col-start-6 md:pl-6 xl:col-span-4 xl:col-start-8 xl:pl-0">
              <div className="z-10 flex flex-col gap-4 md:gap-6">
                <h2 className="text-headline-md text-black theme-tech:text-white">{p.pricingTeaser.title}</h2>
                <p className="text-body-sm text-gray-350 theme-tech:text-white/80">{p.pricingTeaser.text}</p>
              </div>
              <a className={BTN_PRIMARY + SM + " mt-4 place-self-start md:mt-6"} href={lhref(lang, p.pricingTeaser.link.href)}>{p.pricingTeaser.link.label}</a>
            </div>
          </div>
        </Section>
      )}
      {p.related && <RelatedSection title={p.related.title} cards={p.related.cards} lang={lang} />}
      {faq && <FaqSection faq={faq} id="faq" />}
      <CTABlock c={p.cta} lang={lang} />
    </>
  );
}

export function ProductPage({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}>{productBody(site.product, lang, undefined, path)}</Shell>;
}
export function ConsolePage({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}>{productBody(site.consolePage, lang, undefined, path)}</Shell>;
}
export function AskPage({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}>{productBody(site.askOptavius, lang, undefined, path)}</Shell>;
}
export function AgentsPage({ site, lang, path }: Ctx) {
  const lib = site.agentsPage.library;
  const library = (
    <Section theme="theme-product" z={2}>
      <LeftHead title={lib.title} lede={lib.lede} />
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-4">
        {lib.items.map((a) => (
          <div key={a.name} className="col-span-12 flex flex-col gap-3 rounded-2xl bg-white p-5 md:col-span-6 xl:col-span-4">
            <h3 className="text-body-md text-primary">{a.name}</h3>
            <p className="text-body-sm text-secondary">{a.job}</p>
          </div>
        ))}
      </div>
    </Section>
  );
  return <Shell site={site} lang={lang} path={path}>{productBody(site.agentsPage, lang, library, path)}</Shell>;
}
export function IntegrationsPage({ site, lang, path }: Ctx) {
  const lg = site.integrations.logos;
  const logos = (
    <Section theme="theme-product" z={2}>
      <LeftHead title={lg.title} lede={lg.lede} />
      <div className="flex flex-col gap-8">
        {lg.groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-4">
            <p className="text-label-md text-secondary">{g.label}</p>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
              {g.items.map((it) => (
                <li key={it.name} className="flex h-16 items-center gap-3 rounded-xl bg-white px-4">
                  <Img alt="" src={it.src} className="h-7 w-7 rounded object-contain" loading="lazy" />
                  <span className="text-body-sm text-primary">{it.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="pt-2 text-body-sm text-secondary">{lg.more}</p>
      </div>
    </Section>
  );
  return <Shell site={site} lang={lang} path={path}>{productBody(site.integrations, lang, logos, path)}</Shell>;
}
export function PricingRoute({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}><PricingPage p={site.pricing} lang={lang} /></Shell>;
}

/* ---------- Specialties ---------- */
export function SpecialtiesIndex({ site, lang, path }: Ctx) {
  const s = site.specialties;
  return (
    <Shell site={site} lang={lang} path={path}>
      <CenterHero title={s.title} lede={s.lede} lang={lang} />
      <LogoStripSection s={s.logos} lang={lang} compact />
      <div className={CONTAINER + " py-12 md:py-16"}>
        <div className="grid grid-cols-12 gap-grid-gutter gap-8 md:gap-y-12">
          {s.pages.map((p) => (
            <a key={p.slug} className="group col-span-12 md:col-span-6" href={lhref(lang, "/specialties/" + p.slug)}>
              <div className="flex flex-col gap-4">
                <figure className="relative aspect-square overflow-hidden rounded-xl md:aspect-[4/3]">
                  {p.hero.media.kind === "video" ? <video className="block h-full w-full pointer-events-none absolute object-cover" loop muted playsInline autoPlay preload="metadata" poster={p.hero.media.poster} src={p.hero.media.src + "#t=0.001"} data-autoplay="true" /> : null}
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-headline-sm text-gray-700">{p.name}</h3>
                  <p className="text-body-sm text-gray-350 transition-colors group-hover:text-gray-700">{p.hero.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <QuoteBandSection q={s.quote} lang={lang} />
      <CTABlock c={s.cta} lang={lang} />
    </Shell>
  );
}

export function SpecialtyPage({ site, lang, path, page }: Ctx & { page: SpecialtyPageT }) {
  return (
    <Shell site={site} lang={lang} path={path}>
      <PageHero hero={page.hero} lang={lang} />
      <LogoStripSection s={page.logos} lang={lang} compact />
      <CardsTabsSection s={page.cards} id={"spec-" + page.slug} />
      <FeatureSplitSection s={page.journey} z={6} />
      <BigQuoteSection q={page.quote} />
      <TilesSection s={page.agents} lang={lang} z={3} />
      <TrustBlock t={page.trust} />
      {FAQS[lang]?.["/specialties/" + page.slug] && <FaqSection faq={FAQS[lang]["/specialties/" + page.slug]} id="faq" />}
      <CTABlock c={page.cta} lang={lang} />
    </Shell>
  );
}

/* ---------- Customers ---------- */
export function CustomersPage({ site, lang, path }: Ctx) {
  const c = site.customers;
  return (
    <Shell site={site} lang={lang} path={path}>
      <div className="pb-section-padding">
        <div className={CONTAINER + " flex flex-col gap-3 pt-12 pb-8 md:pt-16 xl:pt-20 xl:pb-12"}>
          <div className="mx-auto flex flex-col items-center justify-center gap-y-2 md:max-w-[600px] xl:max-w-[830px]">
            <h1 className="mx-auto text-center text-headline-xl text-balance whitespace-pre-wrap text-primary">{c.title}</h1>
          </div>
        </div>
        <div className="relative col-span-12 aspect-square w-full md:aspect-16/7">
          <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-y-2 md:bottom-4 md:left-4 xl:bottom-6 xl:left-6">
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-2xl xl:rounded-3xl"><Img alt={c.heroImage.alt} className="block h-full w-full object-cover" style={imgStyle} src={c.heroImage.src} /><div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" /></div>
        </div>
      </div>
      <Section z={3}>
        <CenterHead title={c.storiesTitle} pad="pb-8 md:pb-12" />
      </Section>
      <CustomerStories items={site.home.quotes.items.map((q) => ({ name: q.name, title: q.role, logo: q.logoAlt, logoSrc: logoWhite(q.logo).src, logoCls: logoWhite(q.logo).cls, poster: q.poster, href: lhref(lang, q.href), label: site.ui.common.readStory }))} />
      <FeaturedStories stories={c.stories} lang={lang} readMore={site.ui.common.readMore} />
      <StoryCards stories={c.stories} lang={lang} title={c.gridTitle} filters={[{ label: site.ui.common.allSpecialties, active: true }, ...site.specialties.pages.map((p) => ({ label: p.name }))]} />
      <CTABlock c={c.cta} lang={lang} />
    </Shell>
  );
}

export function StoryPage({ site, lang, path, story }: Ctx & { story: Story }) {
  const others = site.customers.stories.filter((s) => s.slug !== story.slug);
  return (
    <Shell site={site} lang={lang} path={path}>
      <StoryHero s={story} />
      <article className="pt-12 pb-12 md:pt-28 md:pb-16">
        <div className={CONTAINER}>
          <div className="grid grid-cols-12 gap-grid-gutter gap-y-0 md:gap-y-0 xl:gap-y-0">
            <aside className="col-span-12 translate-z-0 xl:col-span-3 xl:row-start-1 xl:col-start-1">
              <div className="sticky top-4">
                <div className="flex flex-col md:mb-6 xl:mb-0">
                  <div className="border-t border-primary py-6">
                    <h3 className="mb-4 text-body-lg text-black">{site.ui.nav.specialties}</h3>
                    <ul className="flex gap-2"><li><div className="flex items-center justify-center rounded border text-left transition focus-button h-6 px-2 text-label-sm border-blue-100 bg-blue-100 text-blue-500">{story.industry}</div></li></ul>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-span-12 grid min-w-0 [overflow-wrap:anywhere] gap-y-12 md:gap-y-16 xl:col-start-5">
              {story.body.map((b, i) => {
                if (b.type === "h2") return <div key={i} className="col-span-12 xl:col-span-8 xl:col-start-5"><h2 className="block py-2 text-headline-md whitespace-pre-wrap text-black theme-tech:text-white [p+&]:pt-12">{b.text}</h2></div>;
                if (b.type === "p") return <div key={i} className="col-span-12 xl:col-span-8 xl:col-start-5 -mt-8 md:-mt-10"><p className={P}>{b.text}</p></div>;
                if (b.type === "quote") return (
                  <div key={i} className="col-span-12 xl:col-span-8 xl:col-start-5 rounded-3xl bg-surface-tertiary-100 p-6 md:p-8">
                    <blockquote className="text-headline-sm text-primary">“{b.quote}”</blockquote>
                    <p className="mt-4 text-body-sm text-primary">{b.name}</p>
                    <p className="text-label-sm text-secondary">{b.role}</p>
                  </div>
                );
                return (
                  <figure key={i} className="relative col-span-12">
                    <div className="flex justify-center"><div className="w-full"><div className="relative overflow-hidden rounded-2xl aspect-square md:aspect-video">{b.media.kind === "mock" ? <Mock name={b.media.name} /> : b.media.kind === "image" ? <Img alt={b.media.alt || ""} className="block h-auto w-full object-cover" style={imgStyle} src={b.media.src} /> : null}</div></div></div>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </article>
      <StoryCards stories={others} lang={lang} title={site.customers.moreTitle} />
      <CTABlock c={site.customers.cta} lang={lang} />
    </Shell>
  );
}

/* ---------- About ---------- */
export function AboutPage({ site, lang, path }: Ctx) {
  const a = site.about;
  const cities = a.offices.text.split("{cities}");
  return (
    <Shell site={site} lang={lang} path={path}>
      <CenterHero title={a.title} lede={a.lede} image={a.image} lang={lang} />
      <Section z={1}>
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-3">
          <div className="col-span-12 text-black md:col-span-7 md:col-start-1 text-headline-md"><h2>{a.statement.title}</h2></div>
          <div className="col-span-12 text-gray-400 md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9 text-body-md"><p className="my-6 first:mt-0 last:mb-0">{a.statement.text}</p></div>
        </div>
      </Section>
      <ValuesSection items={a.values} />
      <Section theme="theme-tech" z={1}>
        <CenterHead title={a.founders.title} lede={a.founders.lede} />
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
          {a.founders.people.map((p) => (
            <div key={p.name} className="col-span-12 flex flex-col gap-6 rounded-3xl bg-gray-700 p-6 md:col-span-6 md:flex-row md:p-8">
              <figure className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-400"><Img alt={p.name} className="block h-full w-full object-cover" style={p.image.includes("paul") ? { transform: "scale(1.18)", objectPosition: "58% 62%" } : undefined} src={p.image} /></figure>
              <div className="flex flex-col gap-2">
                <h3 className="text-headline-sm text-white">{p.name}</h3>
                <p className="text-label-md text-gray-200">{p.role}</p>
                <p className="mt-2 text-body-sm text-gray-100">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      {false && (<Section theme="theme-base" z={4}>
        <LeftHead title="" />
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-6">
          {site.home.quotes.items.map((q) => (
            <a key={q.name} className="group relative col-span-12 flex flex-col justify-between gap-y-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 p-4 focus-outline md:col-span-4 xl:min-h-[400px] xl:p-6" href={lhref(lang, q.href)}>
              <div className="relative place-self-start rounded-xl bg-white px-6 py-2.5"><Img alt={q.logoAlt} className="block h-8 w-auto max-w-[140px] object-contain" src={q.logo} /></div>
              <div className="flex flex-col gap-y-4">
                <p className="text-body-sm text-primary">“{q.quote}”</p>
                <div className="flex flex-col"><p className="text-label-md text-primary">{q.name}</p><p className="text-label-sm text-secondary">{q.role}</p></div>
              </div>
            </a>
          ))}
        </div>
      </Section>)}
      <Section z={1}>
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-3">
          <div className="col-span-12 text-black md:col-span-3 md:col-start-1 xl:col-span-4 text-headline-lg"><h2>{a.offices.title}</h2></div>
          <div className="col-span-12 text-black md:col-span-8 md:col-start-5 xl:col-span-7 xl:col-start-6 text-headline-md">
            <p className="my-6 first:mt-0 last:mb-0">
              {cities[0]}
              {a.offices.cities.map((c, i) => (
                <span key={c}><span className="text-green-350">{c}</span>{i < a.offices.cities.length - 2 ? ", " : i === a.offices.cities.length - 2 ? (lang === "de" ? " und " : lang === "nl" ? " en " : " and ") : ""}</span>
              ))}
              {cities[1]}
            </p>
          </div>
        </div>
      </Section>
      <CTABlock c={a.cta} lang={lang} />
    </Shell>
  );
}

/* ---------- Resources ---------- */
export function ResourcesPage({ site, lang, path }: Ctx) {
  const r = site.resources;
  const cover = (a: Article, i: number) => ["bg-green-800", "bg-blue-700", "bg-purple-500", "bg-green-500"][(a.title.length + i) % 4];
  const items = (ARTICLES[lang] || ARTICLES.en).map((a, i) => ({ slug: a.slug, kind: a.kind, kindLabel: a.kindLabel, title: a.title, description: a.description, readTime: a.readTime, href: lhref(lang, "/resources/" + a.slug), cover: cover(a, i) }));
  return (
    <Shell site={site} lang={lang} path={path}>
      <section className="relative py-section-padding" style={{ zIndex: 2 }}>
        <div className={CONTAINER}><h1 className="max-w-prose text-headline-lg text-black">{r.title}</h1></div>
      </section>
      <Section className="flex flex-col gap-10 pt-10" z={1}>
        <ResourcesList filters={r.filters} items={items} readTime={r.readTime} />
      </Section>
      <CTABlock c={r.cta} lang={lang} />
    </Shell>
  );
}

export function ArticlePage({ site, lang, path, article }: Ctx & { article: Article }) {
  return (
    <Shell site={site} lang={lang} path={path}>
      <section className="relative py-section-padding" style={{ zIndex: 2 }}>
        <div className={CONTAINER}>
          <a className={BTN_SECONDARY + SM + " mb-8"} href={lhref(lang, "/resources")}>{site.resources.backLabel}</a>
          <p className="mb-4 text-label-md text-secondary">{article.kindLabel} · {article.readTime} {site.resources.readTime}</p>
          <h1 className="max-w-[24ch] text-headline-lg text-black">{article.title}</h1>
          <p className="mt-6 max-w-prose text-body-md text-gray-400">{article.description}</p>
        </div>
      </section>
      <section className="pt-6 pb-8 md:pb-16 xl:pb-18">
        <div className={CONTAINER}>
          <div className="grid grid-cols-12 gap-grid-gutter">
            <div className="col-span-12 md:col-span-9 md:col-start-2 xl:col-span-8"><Markdown body={article.body} /></div>
          </div>
        </div>
      </section>
      <CTABlock c={site.resources.cta} lang={lang} />
    </Shell>
  );
}

/* ---------- Careers ---------- */
export function CareersPage({ site, lang, path }: Ctx) {
  const c = site.careers;
  return (
    <Shell site={site} lang={lang} path={path}>
      <CenterHero title={c.title} lede={c.lede} cta={c.cta} image={c.image} lang={lang} />
      <Section z={1}>
        <div className="grid grid-cols-12 gap-grid-gutter"><div className="col-span-12 text-headline-md text-black xl:col-span-10"><p>{c.statement}</p></div></div>
      </Section>
      <AccordionSection items={c.culture} id="culture" />
      <Section z={1}>
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-3">
          <div className="col-span-12 text-black md:col-span-3 md:col-start-1 xl:col-span-4 text-headline-md"><h2>{c.interviewing.title}</h2></div>
          <div className="col-span-12 text-black md:col-span-8 md:col-start-5 xl:col-span-7 xl:col-start-6 text-body-md">{c.interviewing.paragraphs.map((p) => <p key={p} className="my-6 first:mt-0 last:mb-0">{p}</p>)}</div>
        </div>
      </Section>
      <Section theme="theme-base" z={1} id="open-roles">
        <LeftHead title={c.roles.title} lede={c.roles.lede} />
        <div className="flex flex-col gap-8">
          {c.roles.groups.map((g) => (
            <div key={g.name} className="flex flex-col gap-2">
              <h3 className="rounded-2xl bg-surface-tertiary-100 px-5 py-4 text-body-md text-primary">{g.name}</h3>
              <ul className="flex flex-col">
                {g.roles.map((r) => (
                  <li key={r.title} className="border-b border-gray-200">
                    <a className="group flex items-center justify-between gap-4 px-5 py-4 text-body-sm text-primary hover:text-brand-primary" href={r.href}>
                      <span>{r.title}</span>
                      <span className="flex items-center gap-3 text-label-md text-secondary">{r.location}<ArrowUp className="h-4 w-4 rotate-45 opacity-0 transition group-hover:opacity-100" /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CTABlock c={c.finalCta} lang={lang} />
    </Shell>
  );
}

/* ---------- Demo / legal ---------- */
export function DemoPage({ site, lang, path }: Ctx) {
  return (
    <Shell site={site} lang={lang} path={path} theme="theme-product">
      <DemoBooking d={site.demo} logos={site.home.logos.logos} lang={lang} />
    </Shell>
  );
}
const CONTENTS: Record<string, string> = { en: "Contents", nl: "Inhoud", de: "Inhalt" };
export function PrivacyPage({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}><LegalPage doc={site.legal.privacy} contentsLabel={CONTENTS[lang] || CONTENTS.en} /></Shell>;
}
export function TermsPage({ site, lang, path }: Ctx) {
  return <Shell site={site} lang={lang} path={path}><LegalPage doc={site.legal.terms} contentsLabel={CONTENTS[lang] || CONTENTS.en} /></Shell>;
}
export function NotFound({ site, lang, path }: Ctx) {
  return (
    <Shell site={site} lang={lang} path={path}>
      <Section z={1}><div className="flex flex-col items-center gap-6 py-24 text-center"><h1 className="text-headline-lg text-black">404</h1><a className={BTN_PRIMARY + SM} href={lhref(lang, "/")}>Optavius</a></div></Section>
    </Shell>
  );
}
export { ARTICLES };
