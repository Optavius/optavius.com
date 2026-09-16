/**
 * Shared primitives for the eye-care product mockups. Shape language deliberately differs from the source
 * (asymmetric bubble corners, left accent bars, pill-with-dot buttons, dynamic-island phone) while colours
 * stay within the site palette.
 */
import type { CSSProperties, ReactNode } from "react";
import { Symbol } from "../Logo";

export const EyeIcon = ({ className = "h-3.5 w-3.5", style }: { className?: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const GlassesIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="7" cy="14" r="3.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17" cy="14" r="3.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.6 14h2.8M3.4 13l1.4-4.2M20.6 13l-1.4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SendIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Agent avatar: a small eye glyph inside a soft squircle (used in the product mockups). */
export const AgentAvatar = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <span className={"inline-flex shrink-0 items-center justify-center rounded-[38%] bg-green-500 text-white " + className} style={{ width: size, height: size }}>
    <Symbol className="h-[62%] w-[62%]" />
  </span>
);

/** Chat bubble with an asymmetric tail corner. */
export function Bubble({ side = "agent", name, children, className = "", style, dark = false }: { side?: "agent" | "user"; name?: string; children: ReactNode; className?: string; style?: CSSProperties; dark?: boolean }) {
  const agent = side === "agent";
  const base = agent
    ? dark
      ? "bg-white/12 text-white"
      : "bg-white text-gray-700 shadow-[0_1px_0_0_rgba(34,34,34,0.06),0_8px_20px_-12px_rgba(34,34,34,0.25)]"
    : dark
      ? "bg-green-300 text-white"
      : "bg-green-50 text-gray-700";
  const radius = agent ? "rounded-[18px] rounded-bl-[4px]" : "rounded-[18px] rounded-br-[4px]";
  return (
    <div className={"flex " + (agent ? "justify-start" : "justify-end") + " " + className} style={style}>
      <div className={"max-w-[86%] px-3.5 py-2.5 " + base + " " + radius}>
        {name && (
          <div className={"mb-1 flex items-center gap-1.5 text-[10px] " + (dark ? "text-white/70" : "text-gray-350")}>
            {agent ? <AgentAvatar size={13} /> : <span className="inline-block h-[13px] w-[13px] rounded-full bg-gray-250" />}
            {name}
          </div>
        )}
        <div className="text-[12px] leading-[16px]">{children}</div>
      </div>
    </div>
  );
}

/** Pill button with an inner dot (replaces plain pills). */
export const Pill = ({ children, tone = "green", className = "" }: { children: ReactNode; tone?: "green" | "ghost" | "blue" | "dark"; className?: string }) => (
  <span
    className={
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-medium " +
      (tone === "green" ? "bg-green-500 text-white" : tone === "blue" ? "bg-blue-600 text-white" : tone === "dark" ? "bg-gray-700 text-white" : "border border-gray-200 bg-white text-gray-700") +
      " " +
      className
    }
  >
    <span className={"h-1.5 w-1.5 rounded-full " + (tone === "ghost" ? "bg-green-300" : "bg-white/70")} />
    {children}
  </span>
);

/** Card with a left accent bar and tinted header strip. */
export function Card({ title, accent = "#4faf62", children, className = "", right, dark = false }: { title?: ReactNode; accent?: string; children: ReactNode; className?: string; right?: ReactNode; dark?: boolean }) {
  return (
    <div className={"relative overflow-hidden rounded-[22px] " + (dark ? "bg-[#1f2a2a] text-white ring-1 ring-white/10" : "bg-white text-gray-700 ring-1 ring-black/[0.06]") + " " + className}>
      <span className="absolute top-3 bottom-3 left-0 w-[3px] rounded-r-full" style={{ background: accent }} />
      {title && (
        <div className={"flex items-center justify-between px-4 pt-3 pb-2 text-[11px] font-medium " + (dark ? "text-white/80" : "text-gray-400")}>
          <span className="flex items-center gap-1.5">
            <EyeIcon className="h-3 w-3" style={{ color: accent } as CSSProperties} />
            {title}
          </span>
          {right}
        </div>
      )}
      <div className="px-4 pb-3">{children}</div>
    </div>
  );
}

/** Input bar ("Ask anything…") with a send dot-button. */
export const AskBar = ({ placeholder = "Ask Lumen Optics anything…", dark = false, className = "" }: { placeholder?: string; dark?: boolean; className?: string }) => (
  <div className={"flex items-center justify-between rounded-[16px] rounded-tr-[6px] px-3 py-2 text-[11px] " + (dark ? "bg-white/12 text-white/60" : "bg-white text-gray-350 ring-1 ring-black/[0.06]") + " " + className}>
    <span>{placeholder}</span>
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
      <SendIcon className="h-3 w-3" />
    </span>
  </div>
);

/** Skeleton line. */
export const Line = ({ w = "60%", className = "" }: { w?: string; className?: string }) => <span className={"block h-1.5 rounded-full bg-gray-200 " + className} style={{ width: w }} />;

/** Dotted grid background used by the agent-studio style mockups. */
export const dottedBg: CSSProperties = { backgroundImage: "radial-gradient(rgba(69,132,198,0.28) 1px, transparent 1.2px)", backgroundSize: "18px 18px" };
