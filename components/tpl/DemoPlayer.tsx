"use client";
import { BASE } from "@/lib/base";
import { useEffect, useRef, useState } from "react";
import type { DemoSection } from "@/content/types";
import { AgentAvatar } from "@/components/mockups/ui";
import { BTN, BTN_PRIMARY, CONTAINER, SECTION, SM, CallLabel } from "./ui";

const SRC = (lang: string) => `${BASE}/optavius/demo-call-${lang}.mp3`;

/**
 * "Hear Optavius take a real call": audio sample with a live waveform and a transcript that follows the call.
 * The audio file is uploaded separately; until it exists the transcript plays on its own timings.
 */
export default function DemoPlayer({ d, lang }: { d: DemoSection; lang: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const timer = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [hasAudio, setHasAudio] = useState<boolean | null>(null);
  const total = d.transcript[d.transcript.length - 1].at + 6;

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const ok = () => setHasAudio(true);
    const bad = () => setHasAudio(false);
    a.addEventListener("loadedmetadata", ok);
    a.addEventListener("error", bad);
    return () => { a.removeEventListener("loadedmetadata", ok); a.removeEventListener("error", bad); };
  }, []);

  useEffect(() => {
    if (!playing) { if (timer.current) cancelAnimationFrame(timer.current); return; }
    const start = performance.now() - t * 1000;
    const tick = () => {
      const a = audio.current;
      const now = hasAudio && a && !a.paused ? a.currentTime : (performance.now() - start) / 1000;
      setT(now);
      if (now >= total) { setPlaying(false); setT(0); if (a) { a.pause(); a.currentTime = 0; } return; }
      timer.current = requestAnimationFrame(tick);
    };
    timer.current = requestAnimationFrame(tick);
    return () => { if (timer.current) cancelAnimationFrame(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, hasAudio]);

  const toggle = () => {
    const a = audio.current;
    if (playing) { setPlaying(false); a?.pause(); return; }
    if (hasAudio && a) { a.currentTime = t; a.play().catch(() => {}); }
    setPlaying(true);
  };
  const current = d.transcript.reduce((acc, row, i) => (t >= row.at ? i : acc), -1);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = list.current; if (!box || current < 0) return;
    const row = box.children[current] as HTMLElement | undefined; if (!row) return;
    box.scrollTo({ top: Math.max(0, row.offsetTop - box.offsetTop - 12), behavior: "smooth" });
  }, [current]);
  const call = { label: d.call.label, href: d.call.href };
  const bars = 48;

  return (
    <section id="demo" className={"theme-base " + SECTION} style={{ zIndex: 5 }}>
      <div className={CONTAINER}>
        <div className="grid grid-cols-12 gap-grid-gutter gap-y-3 px-4 md:gap-y-4 md:px-0 xl:gap-y-6 pb-8 md:pb-14">
          <h2 className="whitespace-pre-wrap text-black theme-tech:text-white text-headline-md text-center text-balance col-span-12 xl:col-span-8 xl:col-start-3">{d.title}</h2>
          <div className="col-span-12 xl:col-span-8 xl:col-start-3">
            <p className="text-body-sm whitespace-pre-wrap text-gray-400 md:max-w-xl theme-tech:text-gray-100 mx-auto text-center text-balance">{d.lede}</p>
          </div>
        </div>
        <div className="flex h-full flex-col items-stretch gap-6 rounded-3xl p-4 md:p-6 xl:gap-12 theme-tech bg-green-800 xl:flex-row">
          <div className="flex w-full shrink-0 flex-col justify-between gap-6 rounded-2xl bg-white/5 p-5 md:p-6 xl:w-[42%]">
            <div className="flex flex-col gap-2">
              <p className="text-label-sm text-white/70">{d.sampleLabel}</p>
              <p className="text-label-md text-white">{hasAudio === false ? d.hint : d.hint}</p>
            </div>
            <div className="flex h-16 items-center gap-[3px]" aria-hidden="true">
              {Array.from({ length: bars }).map((_, i) => {
                const active = playing && i / bars <= t / total;
                const h = 6 + ((i * 37) % 23) + (playing ? Math.abs(Math.sin(t * 3 + i)) * 20 : 0);
                return <span key={i} className={"flex-1 rounded-full transition-[height,background-color] duration-150 " + (active ? "bg-green-300" : "bg-white/25")} style={{ height: Math.min(64, h) }} />;
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={toggle} className={BTN + "border border-white/70 bg-transparent text-white hover:bg-white/10 h-10 gap-2 px-4 text-label-md flex-row"} aria-pressed={playing}>
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M6 3.5C6 2.67 6.67 2 7.5 2s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S6 21.33 6 20.5v-17Zm9 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S15 21.33 15 20.5v-17Z" fill="currentColor" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M7.66 2.28C6.49 1.57 5 2.41 5 3.78v16.45c0 1.36 1.49 2.2 2.66 1.5l13.57-8.23c1.12-.68 1.12-2.31 0-2.99L7.66 2.28Z" fill="currentColor" /></svg>
                )}
                {playing ? d.stop : d.play}
                <span className="font-mono text-label-sm text-white/70">{d.duration}</span>
              </button>
              <a className={BTN_PRIMARY + SM + " h-auto! py-2"} href={call.href}><CallLabel label={call.label} href={call.href} /></a>
            </div>
            <p className="text-label-sm text-white/70">{d.note}</p>
            <audio ref={audio} src={SRC(lang)} preload="metadata" />
          </div>
          <div className="relative flex min-h-[320px] flex-1 flex-col gap-3 overflow-hidden xl:max-h-[420px]">
            <div ref={list} className="relative flex flex-col gap-3 overflow-y-auto pr-1 no-scrollbar" style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent)" }}>
              {d.transcript.map((row, i) => {
                const shown = i <= current || !playing;
                const agent = row.who === "agent";
                return (
                  <div key={i} className={"flex " + (agent ? "justify-start" : "justify-end")} style={{ opacity: shown ? (i === current ? 1 : 0.7) : 0.25, transition: "opacity .4s" }}>
                    <div className={"max-w-[86%] rounded-[22px] px-4 py-3 text-body-sm " + (agent ? "rounded-bl-[6px] bg-white text-gray-700" : "rounded-br-[6px] bg-white/15 text-white ring-1 ring-white/25")}>
                      <div className={"mb-1 flex items-center gap-1.5 text-label-sm " + (agent ? "text-gray-350" : "text-white/70")}>
                        {agent ? <AgentAvatar size={14} /> : <span className="inline-block h-3.5 w-3.5 rounded-full bg-white/60" />}
                        {agent ? "Optavius" : lang === "nl" ? "Beller" : lang === "de" ? "Anrufer" : "Caller"}
                      </div>
                      {row.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
