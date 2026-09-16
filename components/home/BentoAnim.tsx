"use client";
import { useEffect, useState } from "react";
import { AgentAvatar, CheckIcon, EyeIcon, GlassesIcon } from "../mockups/ui";

function useTick(ms: number, n: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [ms, n]);
  return i;
}

/** Green card: chat messages from different eye-care brands (each with its own identity). */
export function BrandChats({ playing }: { playing: boolean }) {
  const brands = [
    { name: "Lumen Optics", color: "#e94e2a", radius: "rounded-[22px] rounded-bl-[6px]", user: "Hi, Nicholas! Ready to pick up your new frames?", agent: "Your progressive lenses are cut and fitted — we’re open until 7pm." },
    { name: "ClearSight Eye Clinic", color: "#345eb2", radius: "rounded-[10px]", user: "Can I move my eye exam to Thursday?", agent: "Done — Thursday 9:40 with Dr. Okafor. Bring your current glasses." },
    { name: "Iris & Co.", color: "#7644a6", radius: "rounded-[30px] rounded-tr-[6px]", user: "My lenses feel dry by the afternoon.", agent: "Let’s switch you to daily hydrating lenses — a trial pair ships today." },
    { name: "Focal Vision", color: "#f96205", radius: "rounded-[16px] rounded-br-[6px]", user: "Does my plan cover blue-light lenses?", agent: "Yes, as a $25 add-on. Want me to include them in your order?" },
  ];
  const i = useTick(playing ? 3600 : 1e9, brands.length);
  const b = brands[i];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div key={i} className="bento-swap w-[56%] max-w-[400px]">
        <div className={"mb-2 ml-auto w-[80%] bg-white/55 px-4 py-3 text-[13px] text-gray-700 ring-1 ring-black/[0.06] backdrop-blur-md " + b.radius}>
          <div className="mb-1 text-[10px] text-gray-400">Customer</div>
          {b.user}
        </div>
        <div className={"w-[88%] bg-white px-4 py-3 text-[13px] text-gray-700 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)] " + b.radius}>
          <div className="mb-1 flex items-center gap-1.5 text-[10px] text-gray-350"><span className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-[38%] text-white" style={{ background: b.color }}><EyeIcon className="h-2 w-2" /></span>{b.name}</div>
          {b.agent}
        </div>
      </div>
    </div>
  );
}

/** Blue card: interactive widgets — exam slot picker then lens re-order. */
export function Widgets({ playing }: { playing: boolean }) {
  const step = useTick(playing ? 2200 : 1e9, 4);
  const slots = ["9:00", "9:40", "10:20", "11:00"];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[58%] max-w-[260px] rounded-[26px] rounded-tl-[8px] bg-white/15 p-4 text-white ring-1 ring-white/25 backdrop-blur-md">
        {step < 3 ? (
          <>
            <div className="flex items-center justify-between text-[12px]"><span className="opacity-80">‹</span><span>Eye exam · May 14</span><span className="opacity-80">›</span></div>
            <div className="mt-3 grid grid-cols-4 gap-1.5 text-[11px]">
              {slots.map((s, j) => (
                <span key={s} className={"rounded-full px-1 py-1 text-center transition-colors duration-500 " + (j === Math.min(step, 2) ? "bg-green-300 text-white" : "bg-white/10")}>{s}</span>
              ))}
            </div>
            <div className={"mt-3 flex items-center justify-between rounded-[12px] bg-white px-3 py-2 text-[11px] text-gray-400 transition-opacity duration-500 " + (step >= 2 ? "opacity-100" : "opacity-40")}>
              <span>{step >= 2 ? "Exam booked" : "Choose a time"}</span>
              <CheckIcon className={"h-3.5 w-3.5 " + (step >= 2 ? "text-green-300" : "text-gray-250")} />
            </div>
          </>
        ) : (
          <div className="bento-swap">
            <div className="text-[11px] opacity-80">Contact lens re-order</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[38%] bg-white/15"><EyeIcon className="h-5 w-5" /></span>
              <div className="text-[12px]"><div>Daily lenses · 90 pack</div><div className="opacity-70">R −2.25 · L −2.00</div></div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-[12px] bg-white px-3 py-2 text-[11px] text-gray-400"><span>Ships tomorrow</span><CheckIcon className="h-3.5 w-3.5 text-green-300" /></div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Pink card: one conversation across channels (voice, chat, email, SMS, app). */
export function Channels({ playing }: { playing: boolean }) {
  const chans = [
    { icon: "☎", label: "Voice", text: "“I’d like to book a fitting for my new frames.”" },
    { icon: "▭", label: "Chat", text: "Thursday at 4pm works — see you at the Market St store." },
    { icon: "✉", label: "Email", text: "Your fitting confirmation and directions are attached." },
    { icon: "▤", label: "SMS", text: "Reminder: fitting tomorrow at 4pm. Reply C to change." },
    { icon: "◎", label: "App", text: "Frames adjusted ✓ How do they feel?" },
  ];
  const i = useTick(playing ? 2600 : 1e9, chans.length);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      <div className="flex gap-3">
        {chans.map((c, j) => (
          <span key={c.label} className={"flex h-11 w-11 items-center justify-center rounded-[38%] text-[16px] text-white ring-1 ring-white/30 transition-all duration-500 " + (j === i ? "scale-110 bg-white/30" : "bg-white/10")}>{c.icon}</span>
        ))}
      </div>
      <div key={i} className="bento-swap w-[60%] max-w-[260px] rounded-[22px] rounded-tl-[6px] bg-white px-4 py-3 text-[12px] text-gray-700 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] text-gray-350"><AgentAvatar size={13} /> Lumen Optics · {chans[i].label}</div>
        {chans[i].text}
      </div>
    </div>
  );
}

/** Orange card: rating loop (stars, hearts, thumbs). */
export function Ratings({ playing }: { playing: boolean }) {
  const i = useTick(playing ? 2400 : 1e9, 3);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
      <div className="rounded-full bg-white/15 px-4 py-1.5 text-[12px] ring-1 ring-white/25 backdrop-blur-md">How was your lens fitting?</div>
      <div key={i} className="bento-swap flex items-center gap-3">
        {i === 0 && [1, 2, 3, 4, 5].map((s) => <span key={s} className="flex h-11 w-11 items-center justify-center rounded-[38%] bg-white/15 text-[20px] ring-1 ring-white/25" style={{ opacity: s <= 4 ? 1 : 0.45 }}>★</span>)}
        {i === 1 && <span className="flex h-14 w-14 items-center justify-center rounded-[38%] bg-white/20 text-[26px] ring-1 ring-white/25">♥</span>}
        {i === 2 && <span className="flex h-14 w-14 items-center justify-center rounded-[38%] bg-white/20 text-[24px] ring-1 ring-white/25">👍</span>}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-white/80"><GlassesIcon className="h-3.5 w-3.5" /> Outcome achieved · pay only for this</div>
    </div>
  );
}

const MAP: Record<string, (p: { playing: boolean }) => React.ReactElement> = { green: BrandChats, blue: Widgets, pink: Channels, orange: Ratings };
export default function BentoAnim({ id, playing }: { id: string; playing: boolean }) {
  const C = MAP[id];
  return C ? <C playing={playing} /> : null;
}
