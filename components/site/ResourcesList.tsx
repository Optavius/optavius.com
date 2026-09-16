"use client";
import { useEffect, useState } from "react";

type Item = { slug: string; kind: string; kindLabel: string; title: string; description: string; readTime: number; href: string; cover: string };

/** Resource filter and grid. The filter is read from ?kind= on the client so every page can be exported as static HTML. */
export default function ResourcesList({ filters, items, readTime }: { filters: { key: string; label: string }[]; items: Item[]; readTime: string }) {
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("kind");
    if (k && filters.some((f) => f.key === k)) setFilter(k);
  }, [filters]);
  const pick = (key: string) => {
    setFilter(key);
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("kind"); else url.searchParams.set("kind", key);
    window.history.replaceState(null, "", url.toString());
  };
  const list = items.filter((a) => filter === "all" || a.kind === filter);
  return (
    <>
      <nav aria-label="Secondary navigation" className="relative">
        <div className="relative flex w-full items-center overflow-hidden rounded-full bg-surface-tertiary-100 p-1 shadow-xs xl:p-2">
          <ul className="flex w-full items-center gap-1 overflow-x-auto no-scrollbar">
            {filters.map((f) => (
              <li key={f.key} className="flex shrink-0 list-none items-center">
                <button type="button" aria-current={f.key === filter ? "page" : undefined} onClick={() => pick(f.key)} className="h-10 gap-1 px-4 text-label-md group relative flex cursor-pointer items-center justify-center rounded-2xl focus-outline outline-4 outline-offset-4 outline-transparent transition-colors">
                  <span className={"relative z-20 text-label-md text-nowrap transition-colors " + (f.key === filter ? "text-brand-primary" : "text-secondary group-hover:text-primary")}>{f.label}</span>
                  {f.key === filter && <div className="absolute top-0 right-0 z-10 h-full w-full rounded-full bg-surface-ghost-100" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="grid grid-cols-12 gap-grid-gutter gap-y-10">
        {list.map((a) => (
          <a key={a.slug} className="group col-span-12 flex flex-col gap-4 focus-outline md:col-span-6 xl:col-span-4" href={a.href}>
            <figure className={"relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl p-6 text-white " + a.cover}>
              <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 text-label-sm ring-1 ring-white/25">{a.kindLabel}</span>
              <span className="text-headline-sm text-balance">{a.title}</span>
            </figure>
            <div className="flex flex-col gap-2">
              <p className="text-body-sm text-secondary line-clamp-2">{a.description}</p>
              <p className="text-label-sm text-secondary">{a.readTime} {readTime}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
