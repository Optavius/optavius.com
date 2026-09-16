import Nav from "./Nav";
import Footer from "./Footer";
import VideoBehaviors from "./VideoBehaviors";
import Enhancer from "./Enhancer";
import CalBooking from "./CalBooking";
import type { Site } from "@/content/types";
import type { Lang } from "@/lib/i18n";

export default function Shell({ children, site, lang, path, navVariant = "default", theme = "theme-base" }: { children: React.ReactNode; site: Site; lang: Lang; path: string; navVariant?: "default" | "transparent"; theme?: string }) {
  return (
    <div className={theme + " flex min-h-screen flex-col bg-white theme-tech:bg-black theme-product:bg-gray-100 theme-platform:bg-gray-200"}>
      <a
        href="#main"
        className="pointer-events-none absolute top-0 left-1/2 z-60 -translate-x-1/2 -translate-y-full transform rounded-lg border-2 border-green-800 bg-green-800 px-4 py-3 text-body-sm text-white opacity-0 outline-hidden transition focus:pointer-events-auto focus-visible:translate-y-4 focus-visible:opacity-100 md:px-8 md:py-2 xl:px-12 theme-tech:bg-black"
        tabIndex={0}
      >
        {site.ui.common.skip}
      </a>
      <Nav variant={navVariant} site={site.ui} lang={lang} path={path} />
      <main className="flex grow flex-col focus-outline" id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer site={site} lang={lang} path={path} />
      <VideoBehaviors />
      <Enhancer />
      <CalBooking lang={lang} />
    </div>
  );
}
