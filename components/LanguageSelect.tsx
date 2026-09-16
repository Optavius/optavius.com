"use client";
import { useEffect, useRef, useState } from "react";

const LANGS: { code: string; region: string; label: string }[] = [
  { code: "uk", region: "United Kingdom", label: "English" },
  { code: "es", region: "España", label: "español" },
  { code: "fr", region: "France", label: "français" },
  { code: "de", region: "Deutschland", label: "Deutsch" },
  { code: "jp", region: "日本", label: "日本語" },
  { code: "kr", region: "대한민국", label: "한국어" },
  { code: "en", region: "United States", label: "English" },
];

export function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <nav aria-label="Language switcher" className="relative flex w-full flex-1">
      <div className="flex h-full flex-col gap-2 w-full place-self-start md:w-auto" ref={ref}>
        <div className="flex flex-col sr-only">
          <span className="text-label-sm text-primary group-data-invalid:text-error">Select language</span>
        </div>
        <button
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((o) => !o)}
          data-pressed={open ? "true" : undefined}
          className="group relative flex min-w-[256px] items-center justify-between gap-6 rounded-lg border px-4 text-secondary transition-colors data-pressed:border-dark data-pressed:text-primary h-11 border-transparent bg-surface-tertiary-50 data-focus-visible:outline-4 data-focus-visible:outline-brand w-full md:w-auto"
          type="button"
        >
          <span className="text-body-sm">
            <span>
              <span className="flex items-center gap-2">
                United States<span className="font-medium">(English)</span>
              </span>
            </span>
          </span>
          <span aria-hidden="true">
            <svg className="h-6 w-6 transition-transform group-data-pressed:-rotate-180" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10L12 14L16 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
        </button>
        {open && (
          <ul role="listbox" className="absolute bottom-full left-0 z-50 mb-2 flex w-full min-w-[256px] flex-col gap-1 rounded-lg border border-primary bg-white p-2 shadow-lg md:w-auto">
            {LANGS.map((l) => (
              <li
                key={l.code}
                role="option"
                aria-selected={l.code === "en"}
                className={"cursor-pointer rounded-md px-3 py-2 text-body-sm hover:bg-surface-secondary-50 " + (l.code === "en" ? "text-primary" : "text-secondary")}
              >
                <span className="flex items-center gap-2">
                  {l.region}
                  <span className="font-medium">({l.label})</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
