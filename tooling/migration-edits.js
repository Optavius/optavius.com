// One-off edits for the SEO/GEO migration round (17 September 2026). Idempotent where possible. Run from the project root.
const fs = require("fs");
const R = (f) => fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n"); const W = (f, s) => fs.writeFileSync(f, s);
const must = (s, a, b, f) => { if (!s.includes(a)) throw new Error("not found in " + f + ": " + a.slice(0, 70)); return s.split(a).join(b); };
const once = (s, a, b, f) => (s.includes(b) ? s : must(s, a, b, f));

// ---- types ----
let t = R("content/legal.ts");
t = once(t, "export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };", "export type LegalDoc = { title: string; updated: string; intro: string; description?: string; sections: LegalSection[] };", "legal.ts");
W("content/legal.ts", t);
let ty = R("content/types.ts");
ty = once(ty, "legal: { privacy: LegalDoc; terms: LegalDoc };", "legal: { privacy: LegalDoc; terms: LegalDoc; cookies: LegalDoc; safety: LegalDoc };", "types");
ty = once(ty, "footer: { groups: { title: string; items: Link[] }[]; legal: Link[]; copyright: string; tagline: string };", "footer: { groups: { title: string; items: Link[] }[]; legal: Link[]; copyright: string; tagline: string; about: string };\n    consent: { text: string; accept: string; decline: string; policy: string };", "types");
W("content/types.ts", ty);

// ---- content per language ----
const L = {
  en: { legalLinks: 'legal: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }],', cookieLink: '{ label: "Cookie Policy", href: "/cookies" }', company: '{ title: "Company", items: [{ label: "About", href: "/about" },', safetyLink: '{ label: "Safety & Compliance", href: "/safety-compliance" },', lede: 'lede: "About Optavius.",',
    ledeNew: "Optavius provides AI voice agents for specialty care practices: ophthalmology, optometry, dermatology and veterinary clinics in the United States and Europe. The agent answers patient calls, books and moves appointments, gives order status and escalates urgent symptoms by the practice's own protocol.",
    about: "Optavius provides AI voice agents for specialty care practices: ophthalmology, optometry, dermatology and veterinary clinics in the United States and Europe. The agent answers patient calls, books and moves appointments, gives order status and escalates urgent symptoms by the practice's own protocol. Founded by Yves Prevoo and Paul Sabou, with offices in Houston and Amsterdam.",
    consent: { text: "We use one analytics tool (PostHog, hosted in the EU) to see which pages help visitors. It runs only if you agree. No advertising cookies.", accept: "Accept analytics", decline: "Decline", policy: "Cookie policy" } },
  nl: { legalLinks: 'legal: [{ label: "Privacybeleid", href: "/privacy" }, { label: "Algemene voorwaarden", href: "/terms" }],', cookieLink: '{ label: "Cookiebeleid", href: "/cookies" }', company: '{ title: "Bedrijf", items: [{ label: "Over ons", href: "/about" },', safetyLink: '{ label: "Veiligheid en compliance", href: "/safety-compliance" },', lede: 'lede: "Over Optavius.",',
    ledeNew: "Optavius levert AI-spraakagenten voor specialistische praktijken: oogheelkunde, optometrie, dermatologie en dierenklinieken in de Verenigde Staten en Europa. De agent beantwoordt patiëntgesprekken, plant en verzet afspraken, geeft orderstatus en escaleert urgente klachten volgens het protocol van de praktijk.",
    about: "Optavius levert AI-spraakagenten voor specialistische praktijken: oogheelkunde, optometrie, dermatologie en dierenklinieken in de Verenigde Staten en Europa. De agent beantwoordt patiëntgesprekken, plant en verzet afspraken, geeft orderstatus en escaleert urgente klachten volgens het protocol van de praktijk. Opgericht door Yves Prevoo en Paul Sabou, met kantoren in Houston en Amsterdam.",
    consent: { text: "We gebruiken één analysetool (PostHog, gehost in de EU) om te zien welke pagina's bezoekers helpen. Die draait alleen als u akkoord gaat. Geen advertentiecookies.", accept: "Analyse accepteren", decline: "Weigeren", policy: "Cookiebeleid" } },
  de: { legalLinks: 'legal: [{ label: "Datenschutz", href: "/privacy" }, { label: "AGB", href: "/terms" }],', cookieLink: '{ label: "Cookie-Richtlinie", href: "/cookies" }', company: '{ title: "Unternehmen", items: [{ label: "Über uns", href: "/about" },', safetyLink: '{ label: "Sicherheit und Compliance", href: "/safety-compliance" },', lede: 'lede: "Über Optavius.",',
    ledeNew: "Optavius bietet KI-Sprachagenten für Facharztpraxen: Augenheilkunde, Optometrie, Dermatologie und Tierkliniken in den USA und Europa. Der Agent beantwortet Patientenanrufe, bucht und verschiebt Termine, gibt Auskunft zum Bestellstatus und eskaliert dringende Beschwerden nach dem Protokoll der Praxis.",
    about: "Optavius bietet KI-Sprachagenten für Facharztpraxen: Augenheilkunde, Optometrie, Dermatologie und Tierkliniken in den USA und Europa. Der Agent beantwortet Patientenanrufe, bucht und verschiebt Termine, gibt Auskunft zum Bestellstatus und eskaliert dringende Beschwerden nach dem Protokoll der Praxis. Gegründet von Yves Prevoo und Paul Sabou, mit Büros in Houston und Amsterdam.",
    consent: { text: "Wir nutzen ein Analysetool (PostHog, in der EU gehostet), um zu sehen, welche Seiten Besuchern helfen. Es läuft nur, wenn Sie zustimmen. Keine Werbe-Cookies.", accept: "Analysen akzeptieren", decline: "Ablehnen", policy: "Cookie-Richtlinie" } },
};
for (const [lang, c] of Object.entries(L)) {
  const f = `content/${lang}.ts`; let s = R(f);
  s = once(s, 'import { LEGAL } from "./legal";', 'import { LEGAL } from "./legal";\nimport { COOKIES, SAFETY } from "./policies";', f);
  s = once(s, `legal: LEGAL.${lang},`, `legal: { ...LEGAL.${lang}, cookies: COOKIES.${lang}, safety: SAFETY.${lang} },`, f);
  s = once(s, c.legalLinks, c.legalLinks.replace("],", `, ${c.cookieLink}],`), f);
  s = once(s, c.company, c.company + " " + c.safetyLink, f);
  s = once(s, c.lede, "lede: " + JSON.stringify(c.ledeNew) + ",", f);
  if (!s.includes("\n      about: ")) { const m = s.match(/footer: \{\n(\s*)tagline: "[^"]*",/); if (!m) throw new Error("footer tagline " + f); s = s.replace(m[0], m[0] + `\n${m[1]}about: ${JSON.stringify(c.about)},`); }
  if (!s.includes("    consent: {")) { const m = s.match(/\n(\s*)common: \{/); if (!m) throw new Error("ui.common " + f); s = s.replace(m[0], `\n${m[1]}consent: ${JSON.stringify(c.consent)},` + m[0]); }
  W(f, s); console.log("content ok", lang);
}

// ---- routing, metadata, structured data ----
let p = R("app/[[...slug]]/page.tsx");
p = once(p, '"careers", "demo", "privacy", "terms"]', '"careers", "demo", "privacy", "terms", "safety-compliance", "cookies"]', "page.tsx STATIC");
p = once(p, '"/terms": { title: site.legal.terms.title + site.meta.titleSuffix, description: site.meta.description },', '"/terms": { title: site.legal.terms.title + site.meta.titleSuffix, description: site.meta.description },\n    "/safety-compliance": { title: site.legal.safety.title + site.meta.titleSuffix, description: site.legal.safety.description || site.meta.description }, "/cookies": { title: site.legal.cookies.title + site.meta.titleSuffix, description: site.legal.cookies.description || site.meta.description },', "page.tsx meta");
p = once(p, '    case "/terms": return <TermsPage {...ctx} />;', '    case "/terms": return <TermsPage {...ctx} />;\n    case "/safety-compliance": return <SafetyPage {...ctx} />;\n    case "/cookies": return <CookiesPage {...ctx} />;', "page.tsx render");
if (!/SafetyPage, CookiesPage/.test(p)) p = p.replace(/TermsPage(,| \})/, "TermsPage, SafetyPage, CookiesPage$1");
// extract the metadata lookup so structured data can reuse it
if (!p.includes("function metaFor(")) {
  const start = p.indexOf("  let m: { title: string; description: string } = site.home.meta;");
  const endMarker = 'else if (seg[0] === "resources") { const a = (ARTICLES[lang] || ARTICLES.en).find((x) => x.slug === seg[1]); if (a) m = { title: a.title + site.meta.titleSuffix, description: a.description }; }';
  const end = p.indexOf(endMarker) + endMarker.length;
  if (start < 0 || end < endMarker.length) throw new Error("metadata block not found");
  const block = p.slice(start, end);
  p = p.slice(0, start) + "  const m = metaFor(path, lang, site);" + p.slice(end);
  const fn = "\n/** Title and description for a path, shared by the metadata and the structured data. */\nfunction metaFor(path: string, lang: string, site: ReturnType<typeof getSite>) {\n  const seg = path.split(\"/\").filter(Boolean);\n" + block.replace(/^  let m/, "  let m") + "\n  return m;\n}\n";
  p = p.replace("\nexport async function generateMetadata", fn + "\nexport async function generateMetadata");
}
// organisation: description, founders, addresses; website, page, software application and founder nodes
p = once(p, 'sameAs: ["https://www.linkedin.com/company/optavius"] };',
  'sameAs: ["https://www.linkedin.com/company/optavius"], description: "Optavius provides AI voice agents for specialty care practices: ophthalmology, optometry, dermatology and veterinary clinics in the United States and Europe. The agent answers patient calls, books and moves appointments, gives order status and escalates urgent symptoms by the practice\'s own protocol.", founder: [{ "@id": `${BASE}/about#yves-prevoo` }, { "@id": `${BASE}/about#paul-sabou` }], address: [{ "@type": "PostalAddress", addressLocality: "Houston", addressRegion: "TX", addressCountry: "US" }, { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" }], areaServed: ["US", "NL", "DE", "EU"] };\n  const pageUrl = `${BASE}${lang === "en" ? "" : "/" + lang}${path === "/" ? "/" : path}`;\n  const meta = metaFor(path, lang, site);', "page.tsx org");
p = once(p, "  const graph: Record<string, unknown>[] = [org];",
  '  const website = { "@type": "WebSite", "@id": `${BASE}/#website`, url: BASE, name: "Optavius", publisher: { "@id": `${BASE}/#org` }, inLanguage: ["en", "nl", "de"] };\n  const webpage: Record<string, unknown> = { "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: meta.title, description: meta.description, inLanguage: lang, isPartOf: { "@id": `${BASE}/#website` }, about: { "@id": `${BASE}/#org` } };\n  const founders = site.about.founders.people.map((f) => ({ "@type": "Person", "@id": `${BASE}/about#${f.name.toLowerCase().replace(/\\s+/g, "-")}`, name: f.name, jobTitle: f.role, description: f.text, image: `${BASE}${f.image.src}`, worksFor: { "@id": `${BASE}/#org` }, url: `${BASE}${lang === "en" ? "" : "/" + lang}/about` }));\n  const graph: Record<string, unknown>[] = [org, website, webpage, ...founders];', "page.tsx graph");
p = once(p, 'if (seg.length) graph.push({ "@type": "BreadcrumbList", itemListElement:', 'if (seg.length) { webpage.breadcrumb = { "@id": `${pageUrl}#breadcrumb` }; }\n  if (seg.length) graph.push({ "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement:', "page.tsx breadcrumb");
p = once(p, '  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });',
  '  if (path === "/" || path.startsWith("/product") || path === "/pricing") graph.push({ "@type": "SoftwareApplication", "@id": `${BASE}/#app`, name: "Optavius", applicationCategory: "BusinessApplication", applicationSubCategory: "AI voice agent for healthcare practices", operatingSystem: "Web", url: `${BASE}${lang === "en" ? "" : "/" + lang}/product`, description: meta.description, provider: { "@id": `${BASE}/#org` }, offers: { "@type": "Offer", price: lang === "en" ? "299" : "279", priceCurrency: lang === "en" ? "USD" : "EUR", url: `${BASE}${lang === "en" ? "" : "/" + lang}/pricing`, description: site.pricing.from } });\n  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });', "page.tsx app");
W("app/[[...slug]]/page.tsx", p);
let sm = R("app/sitemap.ts"); sm = once(sm, '"resources", "careers"]', '"resources", "careers", "safety-compliance", "cookies"]', "sitemap"); W("app/sitemap.ts", sm);
let pg = R("components/site/Pages.tsx");
pg = once(pg, "export function NotFound({ site, lang, path }: Ctx) {", "export function SafetyPage({ site, lang, path }: Ctx) {\n  return <Shell site={site} lang={lang} path={path}><LegalPage doc={site.legal.safety} contentsLabel={CONTENTS[lang] || CONTENTS.en} /></Shell>;\n}\nexport function CookiesPage({ site, lang, path }: Ctx) {\n  return <Shell site={site} lang={lang} path={path}><LegalPage doc={site.legal.cookies} contentsLabel={CONTENTS[lang] || CONTENTS.en} /></Shell>;\n}\nexport function NotFound({ site, lang, path }: Ctx) {", "Pages.tsx");
W("components/site/Pages.tsx", pg);
let ft = R("components/Footer.tsx");
ft = once(ft, '<p className="max-w-[30ch] text-label-md text-secondary md:pl-2 xl:pl-0">{f.tagline}</p>', '<p className="max-w-[30ch] text-label-md text-secondary md:pl-2 xl:pl-0">{f.tagline}</p>\n            <p className="max-w-[44ch] text-body-sm text-secondary md:pl-2 xl:pl-0">{f.about}</p>', "Footer");
W("components/Footer.tsx", ft);
let sh = R("components/Shell.tsx");
sh = once(sh, 'import CalBooking from "./CalBooking";', 'import CalBooking from "./CalBooking";\nimport Consent from "./Consent";', "Shell import");
sh = once(sh, "      <CalBooking lang={lang} />", '      <CalBooking lang={lang} />\n      <Consent lang={lang} ui={site.ui.consent} policyHref={(lang === "en" ? "" : "/" + lang) + "/cookies"} />', "Shell consent");
W("components/Shell.tsx", sh);
let csv = R("docs/redirect-map.csv");
for (const u of ["/safety-compliance", "/cookies", "/nl/safety-compliance", "/nl/cookies"]) csv = csv.replace(new RegExp(`"${u}","[^"]*","redirect 301[^"]*"`), `"${u}","${u}","unchanged (page restored)"`);
W("docs/redirect-map.csv", csv);
console.log("all edits applied");
