/** Content model for the Optavius site. One object per language, same shape. */
import type { LegalDoc } from "./legal";
export type Link = { label: string; href: string; external?: boolean };
export type Media =
  | { kind: "video"; src: string; poster?: string; alt?: string }
  | { kind: "image"; src: string; alt?: string; position?: string }
  | { kind: "mock"; name: string; alt?: string; zoom?: number };
export type Feature = { icon?: string; title: string; text: string };
export type Bubble = { side: "start" | "end"; kind: "agent" | "user"; name?: string; text: string };

export type HeroSection = { title: string; subtitle?: string; media: Media; overlay?: Bubble[]; cta?: Link; overlayKey?: string };
export type FeatureSplit = { title: string; lede?: string; features: Feature[]; media: Media; mediaSide?: "left" | "right"; tone?: "base" | "product" };
export type QuoteBand = { logo?: string; logoAlt?: string; logoHeight?: number; quote: string; name: string; role: string; link?: Link };
export type BigQuote = { quote: string; name: string; role: string };
export type Tile = { mock?: string; media?: Media; title: string; text: string; href?: string };
export type TilesSection = { title: string; lede?: string; cta?: Link; tiles: Tile[]; columns?: 2 | 3 | 4 };
export type CTASection = { title: string; text: string; primary: Link; secondary?: Link; note?: string };
export type CardsSection = { title: string; lede?: string; tabs?: { label: string; cards: { title: string; text: string }[] }[] };
export type AccordionItem = { icon?: string; title: string; text: string };
export type RelatedCard = { title: string; text: string; href: string; mock: string; linkLabel: string; zoom?: number };
export type TrustSection = { title: string; text: string; badges: { src: string; alt: string }[] };
export type LogoStrip = { title: string; cta?: Link; logos: { src: string; alt: string; href: string; height?: number; className?: string }[] };
export type Outcome = { before?: string; after: string; label: string; text: string };
export type ProofSection = { title: string; lede: string; outcomes: Outcome[]; source: string };
export type StepsSection = { title: string; lede: string; steps: { mock: string; title: string; text: string }[] };
export type VideoQuote = { quote: string; name: string; role: string; logo: string; logoAlt: string; video?: string; poster: string; href: string };
export type DemoSection = { title: string; lede: string; sampleLabel: string; duration: string; play: string; stop: string; hint: string; call: Link; note: string; transcript: { who: "agent" | "caller"; text: string; at: number }[] };

export type ProductPage = {
  meta: { title: string; description: string };
  hero: HeroSection;
  sections: (FeatureSplit & { key: string })[];
  quote?: QuoteBand;
  related?: { title: string; cards: RelatedCard[] };
  trust?: TrustSection;
  pricingTeaser?: { title: string; text: string; link: Link; mock: string };
  cta: CTASection;
};

export type SpecialtyPage = {
  slug: string;
  meta: { title: string; description: string };
  name: string;
  short: string;
  hero: HeroSection;
  logos: LogoStrip;
  cards: CardsSection;
  journey: FeatureSplit;
  quote: BigQuote;
  agents: TilesSection;
  trust: TrustSection;
  cta: CTASection;
};

export type Story = {
  slug: string;
  meta: { title: string; description: string };
  customer: string;
  logo: string;
  logoAlt: string;
  title: string;
  hero: { image: string; alt: string };
  stats: { value: string; label: string }[];
  industry: string;
  body: ({ type: "h2"; text: string } | { type: "p"; text: string } | { type: "media"; media: Media } | { type: "quote"; quote: string; name: string; role: string })[];
  card: { image: string; alt: string; stat?: { value: string; label: string } };
};

export type Site = {
  lang: string;
  meta: { name: string; titleSuffix: string; description: string; tel: string; telDisplay: string; email: string; calendly: string; linkedin: string; signIn: string };
  ui: {
    nav: {
      product: string; specialties: string; customers: string; company: string; signIn: string; cta: Link;
      productOverview: { title: string; text: string; button: string };
      productGroups: { label: string; items: { label: string; text: string; href: string }[] }[];
      specialtyItems: { label: string; text: string; href: string }[];
      companyItems: { label: string; text: string; href: string }[];
      language: string; menu: string; close: string;
    };
    footer: { groups: { title: string; items: Link[] }[]; legal: Link[]; copyright: string; tagline: string };
    common: { bookDemo: string; callDemo: string; demoNote: string; learnMore: string; readStory: string; readMore: string; discoverMore: string; fullStory: string; getStarted: string; contactSales: string; mostPopular: string; perMonth: string; playVideo: string; pauseVideo: string; customerStories: string; allSpecialties: string; openRoles: string; search: string; skip: string; bannerText?: string };
  };
  home: {
    meta: { title: string; description: string };
    hero: { title: string; subtitle: string; primary: Link; secondary: Link; note: string; slides: { video: string; poster: string; lqip?: string; bubbles: Bubble[] }[] };
    logos: LogoStrip;
    demo: DemoSection;
    bento: { title: string; lede: string; cards: { id: string; title: string; body: string; sr: string }[] };
    console: { title: string; lede: string };
    proof: ProofSection;
    agents: TilesSection;
    live: StepsSection;
    quotes: { title: string; lede: string; items: VideoQuote[] };
    trust: TrustSection;
    cta: CTASection;
  };
  product: ProductPage;
  consolePage: ProductPage;
  askOptavius: ProductPage;
  agentsPage: ProductPage & { library: { title: string; lede: string; classes: { voice: string; digital: string }; items: { name: string; job: string; cls: "voice" | "digital"; from: string }[] } };
  integrations: ProductPage & { logos: { title: string; lede: string; more: string; groups: { label: string; items: { name: string; src: string }[] }[] } };
  pricing: {
    meta: { title: string; description: string };
    title: string; lede: string; from: string;
    how: { title: string; lede: string; items: { icon: string; title: string; text: string }[] };
    stats: { title: string; items: { value: string; label: string }[] };
    calc: { title: string; text: string; calls: string; missed: string; value: string; recovered: string; revenue: string; typical: string; note: string; currency: string; currencyAfter?: boolean };
    faq: { title: string; items: { q: string; a: string }[] };
    cta: CTASection;
  };
  specialties: { meta: { title: string; description: string }; title: string; lede: string; logos: LogoStrip; quote: QuoteBand; cta: CTASection; pages: SpecialtyPage[] };
  customers: {
    meta: { title: string; description: string };
    title: string;
    heroImage: { src: string; alt: string; logo: string; logoAlt: string };
    storiesTitle: string;
    featuredTitle: string;
    gridTitle: string;
    stories: Story[];
    moreTitle: string;
    cta: CTASection;
  };
  about: {
    meta: { title: string; description: string };
    title: string; lede: string; image: { src: string; alt: string };
    statement: { title: string; text: string };
    values: AccordionItem[];
    founders: { title: string; lede: string; people: { name: string; role: string; text: string; image: string }[] };
        offices: { title: string; text: string; cities: string[] };
    cta: CTASection;
  };
  resources: { meta: { title: string; description: string }; title: string; filters: { key: string; label: string }[]; readTime: string; cta: CTASection; backLabel: string };
  careers: {
    meta: { title: string; description: string };
    title: string; lede: string; cta: Link; image: { src: string; alt: string };
    statement: string; culture: AccordionItem[];
    interviewing: { title: string; paragraphs: string[] };
    roles: { title: string; lede: string; groups: { name: string; roles: { title: string; location: string; href: string }[] }[] };
    finalCta: CTASection;
  };
  demo: {
    meta: { title: string; description: string };
    title: string; points: { icon: string; text: string }[]; trustedTitle: string;
    booking: { title: string; text: string; fallback: Link; note: string };
  };
  legal: { privacy: LegalDoc; terms: LegalDoc };
};
