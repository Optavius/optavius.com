import { Logo } from "./Logo";
import type { Site } from "@/content/types";
import { href as lhref, type Lang } from "@/lib/i18n";

const LINK = "cursor-pointer focus-text text-label-md text-secondary transition-colors hover:text-brand-primary active:text-primary";

export default function Footer({ site, lang, path }: { site: Site; lang: Lang; path: string }) {
  const f = site.ui.footer;
  const H = (p: string) => lhref(lang, p);
  return (
    <footer className="bg-secondary theme-tech:text-gray-100">
      <div className="mx-auto w-full max-w-[1160px] px-container-margin flex h-full flex-col justify-between gap-12 md:gap-14 xl:gap-20">
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-12 pt-6 xl:pt-14">
          <div className="col-span-12 flex flex-col gap-6 md:col-span-4">
            <a aria-label="Homepage" className="block place-self-start focus-text text-green-500 outline-hidden transition-[color] active:text-green-300 md:pl-2 xl:pl-0 theme-tech:text-white" href={H("/")}>
              <Logo className="h-9 xl:h-11" />
            </a>
            <p className="max-w-[30ch] text-label-md text-secondary md:pl-2 xl:pl-0">{f.tagline}</p>
          </div>
          <div className="col-span-12 grid grid-cols-subgrid gap-y-12 md:col-span-8">
            {f.groups.map((g) => (
              <div key={g.title} className="col-span-6 flex flex-col gap-6 md:col-span-4 xl:col-span-2">
                <h3 className="text-label-md text-primary">{g.title}</h3>
                <ul className="flex flex-col gap-3">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <a className={LINK} href={it.external ? it.href : H(it.href)} tabIndex={0} {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{it.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6 flex flex-col justify-between gap-10 text-label-md text-gray-350 md:flex-row md:items-end md:pb-6 theme-tech:text-gray-100">
          <div className="flex w-full flex-col gap-6">
                        <div className="flex w-full items-center gap-4">
              <div className="hidden md:block">{f.copyright}</div>
              <nav>
                <ul className="flex items-center gap-4">
                  {f.legal.map((l) => (
                    <li key={l.href}><a className={LINK} href={H(l.href)} tabIndex={0}>{l.label}</a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="md:hidden">{f.copyright}</div>
            <div className="flex items-center justify-end gap-3">
              <a aria-label="LinkedIn" className="flex w-5 items-center justify-center focus-text text-secondary transition-colors hover:text-brand-primary h-5 md:h-6" href={site.meta.linkedin} rel="noopener noreferrer" target="_blank">
                <svg className="h-full w-full" data-icon-name="linkedin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z" fill="currentColor"></path></svg>
              </a>
              <a aria-label="Email" className="flex w-5 items-center justify-center focus-text text-secondary transition-colors hover:text-brand-primary h-5 md:h-6" href={"mailto:" + site.meta.email}>
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4V6Zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
