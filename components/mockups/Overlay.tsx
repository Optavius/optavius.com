import type { CSSProperties } from "react";
import { AgentAvatar } from "./ui";

type Line = { side: "agent" | "user"; text: string; name?: string };

const OVERLAYS: Record<string, { lines: Line[]; pos?: CSSProperties; width?: string }> = {
  "fin-hero": { lines: [{ side: "user", text: "Can I renew my lens prescription without coming in?", name: "Walter" }, { side: "agent", text: "Yes — your last exam is still valid. I’ve sent the renewal to your optician." }], pos: { right: "8%", top: "22%" } },
  "healthcare-hero": { lines: [{ side: "user", text: "Can we see the eye doctor first thing this morning?", name: "Marie" }, { side: "agent", text: "Yes, we have a 9:40 opening. Shall I book it?" }], pos: { left: "8%", top: "16%" } },
  "media-hero": { lines: [{ side: "agent", text: "I’ve updated your lens subscription. Enjoy the game!" }], pos: { left: "12%", top: "18%" }, width: "42%" },
  "retail-hero": { lines: [{ side: "agent", text: "Good news! Your new frames will arrive on Friday." }], pos: { left: "10%", top: "20%" }, width: "44%" },
  "tech-hero": { lines: [{ side: "agent", text: "I’ve just added your daughter to your vision plan." }], pos: { left: "16%", top: "24%" }, width: "40%" },
  "telecom-hero": { lines: [{ side: "agent", text: "I’ve activated your contact lens subscription for the next 12 months." }], pos: { right: "8%", top: "26%" }, width: "40%" },
  "travel-hero": { lines: [{ side: "agent", text: "Your eye exam is confirmed for Thursday at 9:40." }], pos: { right: "10%", bottom: "20%" }, width: "42%" },
  "ind-financial": { lines: [{ side: "agent", text: "Your vision benefits renew in March — want me to schedule your exam now?" }], pos: { left: "8%", top: "12%" }, width: "62%" },
  "ind-healthcare": { lines: [{ side: "agent", text: "I’ve forwarded your prescription to the lens lab. Ready in 3 days." }], pos: { left: "8%", top: "12%" }, width: "62%" },
  "ind-telecom": { lines: [{ side: "agent", text: "Your replacement lenses are on the way. Anything else?" }], pos: { right: "8%", top: "14%" }, width: "62%" },
  "channels-chat": { lines: [{ side: "agent", text: "I’ve found a lighter frame that fits your prescription. Want to see it?" }], pos: { left: "8%", top: "16%" }, width: "60%" },
  "context-sky": { lines: [{ side: "agent", text: "Hi Megan, welcome back. Are the new lenses for you or your daughter?" }, { side: "user", text: "They’re for my daughter Emma." }], pos: { left: "10%", top: "34%" }, width: "62%" },
  "context-phone": { lines: [{ side: "agent", text: "We’d hate to see you go. Let me check your lens plan — you have three months of credit left." }], pos: { left: "8%", bottom: "16%" }, width: "70%" },
  "product-hero": { lines: [{ side: "user", text: "Can you help me track my lens order?", name: "Mark" }, { side: "agent", text: "Of course — it left the lab this morning and arrives Thursday." }], pos: { left: "10%", top: "14%" }, width: "60%" },
  "product-social": { lines: [{ side: "user", text: "I see a charge for lenses I didn’t order.", name: "Remi" }, { side: "agent", text: "I’ve paused the order and refunded the charge." }], pos: { left: "8%", bottom: "18%" }, width: "70%" },
  "trust-hero": { lines: [{ side: "user", text: "My prescription is −2.25 and −2.00.", name: "Walter" }, { side: "agent", text: "Thanks — it’s stored securely and only shared with your optician." }], pos: { left: "8%", top: "18%" }, width: "44%" },
  "explorer-demo": { lines: [{ side: "agent", text: "What are the main reasons patients wait to book an eye exam?" }], pos: { left: "6%", top: "10%" }, width: "44%" },
};

/** Glass chat bubbles placed over a (regenerated) video, replacing the bubbles baked into the source videos. */
export default function Overlay({ name, className = "" }: { name: string; className?: string }) {
  if (name === "ghost-pill")
    return (
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" aria-hidden="true">
        <span className="bubble-in flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[13px] text-white ring-1 ring-white/30 backdrop-blur-xl"><AgentAvatar size={16} />Ghostwriter</span>
      </div>
    );
  const o = OVERLAYS[name];
  if (!o) return null;
  return (
    <div className={"pointer-events-none absolute z-10 flex flex-col gap-2 " + className} style={{ width: o.width || "48%", ...(o.pos || { left: "8%", top: "16%" }) }} aria-hidden="true">
      {o.lines.map((l, i) => (
        <div key={i} className={"bubble-in flex " + (l.side === "agent" ? "justify-end" : "justify-start")} style={{ animationDelay: `${0.4 + i * 1.4}s` }}>
          <div className={"max-w-[92%] rounded-[20px] border border-white/25 bg-white/15 px-4 py-3 text-[13px] leading-snug text-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl md:text-[14px] " + (l.side === "agent" ? "rounded-br-[6px]" : "rounded-bl-[6px]")}>
            <div className="mb-1 flex items-center gap-1.5 text-[10px] text-white/75">{l.side === "agent" ? <AgentAvatar size={13} /> : <span className="h-[13px] w-[13px] rounded-full bg-white/60" />}{l.name || (l.side === "agent" ? "Lumen Optics" : "Patient")}</div>
            {l.text}
          </div>
        </div>
      ))}
    </div>
  );
}
