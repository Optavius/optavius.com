"use client";
import { useState } from "react";
import type { Site } from "@/content/types";

type Calc = Site["pricing"]["calc"];

/** "What the phone is costing you": three sliders, four outputs. Recovered = missed × 50% never call back × 35% wanted to book. */
export default function Calculator({ c, lang }: { c: Calc; lang: string }) {
  const [calls, setCalls] = useState(1200);
  const [missed, setMissed] = useState(30);
  const [value, setValue] = useState(250);
  const locale = lang === "nl" ? "nl-NL" : lang === "de" ? "de-DE" : "en-US";
  const n = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v);
  const money = (v: number) => (c.currencyAfter ? `${n(v)} ${c.currency}` : `${c.currency}${n(v)}`);
  const rec = calls * (missed / 100) * 0.5 * 0.35;
  const rev = rec * value;
  const slider = (label: string, out: string, v: number, set: (x: number) => void, min: number, max: number, step: number, hint?: string) => (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between gap-4 text-body-sm text-primary"><span>{label}</span><output className="tabular-nums text-green-500">{out}</output></span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-green-500" />
      {hint && <span className="text-label-sm text-secondary">{hint}</span>}
    </label>
  );
  return (
    <div className="grid grid-cols-12 gap-grid-gutter gap-y-8">
      <div className="col-span-12 flex flex-col gap-6 md:col-span-6 xl:col-span-5">
        <h2 className="text-headline-md text-black">{c.title}</h2>
        <p className="text-body-sm text-secondary">{c.text}</p>
        <div className="flex flex-col gap-6 pt-2">
          {slider(c.calls, n(calls), calls, setCalls, 200, 6000, 50)}
          {slider(c.missed, missed + "%", missed, setMissed, 5, 50, 1, c.typical)}
          {slider(c.value, money(value), value, setValue, 80, 600, 10)}
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-6 xl:col-start-7">
        <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-green-500/15 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-2xl bg-surface-tertiary-100 p-5"><span className="text-headline-lg leading-none tabular-nums text-green-500">{n(rec)}</span><span className="text-body-sm text-secondary">{c.recovered}</span></div>
            <div className="flex flex-col gap-2 rounded-2xl bg-green-800 p-5 text-white"><span className="text-headline-lg leading-none tabular-nums">{money(rev)}</span><span className="text-body-sm text-white/80">{c.revenue}</span></div>
          </div>
          <p className="text-label-sm text-secondary">{c.note}</p>
        </div>
      </div>
    </div>
  );
}
