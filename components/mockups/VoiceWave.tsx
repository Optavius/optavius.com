import { Symbol } from "../Logo";

/** Agent tile: a live call card. Header with the agent, a large waveform, and the last line it said as a bubble. */
export default function VoiceWave({ caption = "[Agent]: your contact lens reorder is on its way", accent = "#4584c6", bars = 30, className = "" }: { caption?: string; accent?: string; bars?: number; className?: string }) {
  const heights = Array.from({ length: bars }, (_, i) => 14 + Math.round(58 * Math.abs(Math.sin(i * 0.9 + 1)) * (i > bars * 0.2 && i < bars * 0.8 ? 1 : 0.4)));
  const m = caption.match(/^\[([^\]]+)\]:\s*(.*)$/);
  const name = m ? m[1] : "Agent";
  const text = m ? m[2] : caption;
  return (
    <div className={"flex h-full w-full flex-col justify-between gap-4 bg-white p-6 " + className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: accent }}><Symbol className="h-4 w-4" /></span>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-gray-700">{name}</span>
            <span className="text-[11px] text-gray-350">Optavius agent</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-400"><span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />On a call</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-[4px]" aria-hidden="true">
          {heights.map((h, i) => (
            <span key={i} className="voice-bar block w-[4px] rounded-full" style={{ height: h, background: accent, animationDelay: `${(i % 7) * 0.12}s`, opacity: 0.85 }} />
          ))}
        </div>
      </div>
      <div className="self-start rounded-[18px] rounded-tl-[6px] px-4 py-3 text-[13px] leading-snug text-gray-700 ring-1 ring-black/[0.06]" style={{ background: "#f6f6f4" }}>
        <span className="voice-caption">{text}</span>
      </div>
    </div>
  );
}
