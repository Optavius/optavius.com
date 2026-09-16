"use client";
import { AgentAvatar, AskBar, Bubble, CheckIcon, EyeIcon, Pill } from "./ui";

export type Msg = { side: "agent" | "user"; text: string; widget?: "slots" | "order" | "coverage" | "frames" | "reminder" | "lasik" };

/** Small in-chat widgets (eye-care flavoured). */
export function Widget({ kind, dark = false }: { kind: NonNullable<Msg["widget"]>; dark?: boolean }) {
  const box = dark ? "bg-white/10 text-white" : "bg-white text-gray-700 ring-1 ring-black/[0.06]";
  if (kind === "slots")
    return (
      <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 " + box}>
        <div className="mb-1.5 flex items-center justify-between text-[10px] opacity-70">
          <span>Eye exam · Thu 14 May</span>
          <EyeIcon className="h-3 w-3" />
        </div>
        <div className="grid grid-cols-4 gap-1 text-[10px]">
          {["9:00", "9:40", "10:20", "11:00"].map((t, i) => (
            <span key={t} className={"rounded-md px-1 py-1 text-center " + (i === 1 ? "bg-green-300 text-white" : dark ? "bg-white/10" : "bg-gray-100")}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded-md bg-green-500 px-2 py-1 text-[10px] text-white">
          <span>Exam booked · 9:40</span>
          <CheckIcon className="h-3 w-3" />
        </div>
      </div>
    );
  if (kind === "order")
    return (
      <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 " + box}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <EyeIcon className="h-4 w-4" />
          </span>
          <div className="text-[10.5px] leading-tight">
            <div className="font-medium">Daily contact lenses · 90 pack</div>
            <div className="opacity-60">Right −2.25 · Left −2.00</div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px]">
          <span className="opacity-60">Arrives Fri 16 May</span>
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-500">Reordered</span>
        </div>
      </div>
    );
  if (kind === "coverage")
    return (
      <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 text-[10.5px] " + box}>
        <div className="mb-1 flex justify-between"><span className="opacity-60">Vision plan</span><span>VSP Choice</span></div>
        <div className="mb-1 flex justify-between"><span className="opacity-60">Frame allowance</span><span>$180</span></div>
        <div className="mb-1 flex justify-between"><span className="opacity-60">Lens copay</span><span>$25</span></div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-150"><span className="block h-full w-[68%] rounded-full bg-green-300" /></div>
        <div className="mt-1 opacity-60">$122 of $180 allowance used</div>
      </div>
    );
  if (kind === "frames")
    return (
      <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 " + box}>
        <div className="mb-1.5 text-[10px] opacity-60">Frames in stock near you</div>
        <div className="grid grid-cols-3 gap-1.5">
          {["Round · Tortoise", "Square · Black", "Cat-eye · Rose"].map((f, i) => (
            <div key={f} className={"rounded-lg p-1.5 text-center text-[9px] " + (dark ? "bg-white/10" : "bg-gray-100")}>
              <svg viewBox="0 0 40 18" className="mx-auto mb-1 h-4 w-9" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="14" height="10" rx={i === 0 ? 5 : i === 1 ? 2 : 4} stroke="currentColor" strokeWidth="1.4" />
                <rect x="24" y="4" width="14" height="10" rx={i === 0 ? 5 : i === 1 ? 2 : 4} stroke="currentColor" strokeWidth="1.4" />
                <path d="M16 9h8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>
    );
  if (kind === "lasik")
    return (
      <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 text-[10.5px] " + box}>
        <div className="mb-1 font-medium">LASIK consultation</div>
        <div className="flex items-center justify-between"><span className="opacity-60">Dr. Amara Okafor · Downtown</span><Pill tone="ghost">Free</Pill></div>
        <div className="mt-1.5 flex items-center gap-1 text-green-500"><CheckIcon className="h-3 w-3" /> Pre-screening passed</div>
      </div>
    );
  return (
    <div className={"mt-1 max-w-[86%] rounded-[16px] rounded-tl-[4px] p-2.5 text-[10.5px] " + box}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-500"><EyeIcon className="h-4 w-4" /></span>
        <div>
          <div className="font-medium">Annual exam reminder set</div>
          <div className="opacity-60">We’ll text you 2 weeks before</div>
        </div>
      </div>
    </div>
  );
}

/** Phone frame with a chat conversation. `dark` renders the brand-dark theme. */
export default function PhoneChat({ brand = "Lumen Optics", messages, dark = false, className = "", bare = false, tint = "#f6f5f3" }: { brand?: string; messages: Msg[]; dark?: boolean; className?: string; bare?: boolean; tint?: string }) {
  const body = (
    <div className={"flex h-full w-full flex-col " + (dark ? "bg-[#1b2624] text-white" : "text-gray-700")} style={dark ? undefined : { background: tint }}>
      {!bare && (
        <div className="relative flex items-center justify-between px-4 pt-3 pb-1 text-[10px]">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black/85" />
          <span className="flex items-center gap-0.5"><span className="h-2 w-3 rounded-[2px] bg-current" /><span className="h-2 w-1 rounded-[1px] bg-current opacity-40" /></span>
        </div>
      )}
      <div className={"mx-3 mt-2 flex items-center gap-2 rounded-[14px] px-3 py-2 text-[11px] " + (dark ? "bg-white/10" : "bg-white ring-1 ring-black/[0.05]")}>
        <AgentAvatar size={20} />
        <div className="leading-tight">
          <div className="font-medium">{brand}</div>
          <div className="text-[9px] opacity-60">Vision assistant · online</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 px-3 pb-2 pt-3">
        {messages.map((m, i) => (
          <div key={i} className="phone-msg" style={{ animationDelay: `${i * 0.9}s` }}>
            <Bubble side={m.side} dark={dark} name={m.side === "agent" ? brand : undefined}>{m.text}</Bubble>
            {m.widget && <Widget kind={m.widget} dark={dark} />}
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <AskBar dark={dark} placeholder="Message…" />
      </div>
    </div>
  );
  if (bare) return <div className={"h-full w-full overflow-hidden " + className}>{body}</div>;
  return (
    <div className={"relative overflow-hidden rounded-[38px] border-[6px] border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] " + className}>
      <div className="h-full w-full overflow-hidden rounded-[32px]">{body}</div>
    </div>
  );
}
