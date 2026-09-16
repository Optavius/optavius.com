import type { ReactNode } from "react";
import type { LegalDoc } from "@/content/legal";
import { CONTAINER, SECTION } from "./ui";

export const P = "mt-6 text-body-md whitespace-pre-wrap text-gray-400 first:mt-0 theme-tech:text-gray-100";
export const H2 = "block py-2 text-headline-md whitespace-pre-wrap text-black theme-tech:text-white [p+&]:pt-12";

/** Legal page: title, date and intro, then a sticky table of contents beside numbered sections with optional lists. */
export function LegalPage({ doc, contentsLabel }: { doc: LegalDoc; contentsLabel: string }) {
  return (
    <>
      <section className={SECTION + " pb-6 md:pb-8"} style={{ zIndex: 2 }}>
        <div className={CONTAINER}>
          <div className="flex max-w-[70ch] flex-col gap-4">
            <p className="text-label-md text-secondary">{doc.updated}</p>
            <h1 className="text-headline-lg text-black theme-tech:text-white">{doc.title}</h1>
            <p className="text-body-md text-gray-400">{doc.intro}</p>
          </div>
        </div>
      </section>
      <section className="pt-6 pb-8 md:pb-16 xl:pb-18">
        <div className={CONTAINER}>
          <div className="grid grid-cols-12 gap-grid-gutter">
            <nav aria-label={contentsLabel} className="col-span-12 md:col-span-4 xl:col-span-3">
              <div className="rounded-2xl bg-surface-tertiary-100 p-5 md:sticky md:top-24">
                <p className="mb-3 text-label-md text-primary">{contentsLabel}</p>
                <ol className="flex flex-col gap-1.5">
                  {doc.sections.map((s) => (
                    <li key={s.id}><a className="block rounded-lg px-2 py-1 text-body-sm text-secondary hover:bg-white hover:text-brand-primary" href={"#" + s.id}>{s.title}</a></li>
                  ))}
                </ol>
              </div>
            </nav>
            <div className="col-span-12 min-w-0 [overflow-wrap:anywhere] md:col-span-8 xl:col-span-7 xl:col-start-5">
              <div className="flex flex-col gap-10 md:gap-12">
                {doc.sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="text-headline-sm text-black theme-tech:text-white">{s.title}</h2>
                    {s.paragraphs.map((p, j) => <p key={j} className="mt-4 text-body-md text-gray-400 theme-tech:text-gray-100">{p}</p>)}
                    {s.items && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {s.items.map((it, j) => (
                          <li key={j} className="flex gap-3 text-body-md text-gray-400 theme-tech:text-gray-100"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />{it}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Minimal markdown (headings, paragraphs, lists, bold) for articles. */
export function Markdown({ body }: { body: string }) {
  const blocks = body.replace(/\r/g, "").replace(/\n(?=#{2,3} )/g, "\n\n").replace(/(^|\n)(#{2,3} [^\n]*)\n(?!\n)/g, "$1$2\n\n").split(/\n{2,}/);
  const inline = (s: string): ReactNode[] =>
    s.split(/(\*\*[^*]+\*\*)/).map((part, i) => (part.startsWith("**") ? <strong key={i} className="text-black theme-tech:text-white">{part.slice(2, -2)}</strong> : part));
  return (
    <>
      {blocks.map((b, i) => {
        const t = b.trim();
        if (/^### /.test(t)) return <h3 key={i} className="mt-10 block text-headline-sm text-black theme-tech:text-white">{inline(t.replace(/^### /, ""))}</h3>;
        if (/^## /.test(t)) return <h2 key={i} className={H2}>{inline(t.replace(/^## /, ""))}</h2>;
        if (/^(- |\* )/m.test(t)) return <ul key={i} className="mt-6 list-disc pl-6 text-body-md text-gray-400 theme-tech:text-gray-100">{t.split(/\n/).map((l, j) => <li key={j} className="mt-2">{inline(l.replace(/^(- |\* )/, ""))}</li>)}</ul>;
        if (/^\d+\. /m.test(t)) return <ol key={i} className="mt-6 list-decimal pl-6 text-body-md text-gray-400 theme-tech:text-gray-100">{t.split(/\n/).map((l, j) => <li key={j} className="mt-2">{inline(l.replace(/^\d+\. /, ""))}</li>)}</ol>;
        return <p key={i} className={P}>{inline(t)}</p>;
      })}
    </>
  );
}
