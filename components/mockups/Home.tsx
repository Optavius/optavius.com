/**
 * Home-page illustrations (sections "The agent-building agent", "Use AI to improve your AI" and
 * "Turn conversations into outcomes"). Each one is laid out on a 560×560 design canvas that mirrors the
 * composition of the original illustration (zoomed-in card cropped by the tile, soft blue ground) with
 * eye-care content and a slightly different shape language (larger asymmetric radii, squircle icons,
 * dotted connectors, pill-with-dot buttons).
 */
import type { CSSProperties, ReactNode } from "react";
import Fit from "./Fit";

const GROUND = "linear-gradient(160deg, #eef6fd 0%, #f6fafe 60%, #eef5fc 100%)";
const FADE = "linear-gradient(90deg, rgba(240,247,253,0) 0%, rgba(240,247,253,0.9) 70%, #f0f7fd 100%)";

const Tile = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <Fit>
    <div className="relative h-full w-full overflow-hidden text-gray-700" style={{ background: GROUND, ...style }}>{children}</div>
  </Fit>
);

/** White card with a soft blue ring; top-left corner is squarer than the rest (shape variant). */
const Panel = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={"absolute rounded-[30px] rounded-tl-[12px] bg-white ring-1 ring-[#d9e8f6] shadow-[0_24px_60px_-36px_rgba(15,79,138,0.35)] " + className} style={style}>
    {children}
  </div>
);

const RightFade = ({ w = "34%" }: { w?: string }) => <div className="pointer-events-none absolute inset-y-0 right-0" style={{ width: w, background: FADE }} />;

/* ---------- icons ---------- */
const Sparkle = ({ className = "h-5 w-5", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z" fill={color} />
    <path d="M18.5 15c.3 2.1 1.4 3.2 3.5 3.5-2.1.3-3.2 1.4-3.5 3.5-.3-2.1-1.4-3.2-3.5-3.5 2.1-.3 3.2-1.4 3.5-3.5Z" fill={color} />
  </svg>
);
const Eye = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const Check = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5.5 12.5l4 4 9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Db = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const Chat = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const Code = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Bolt = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const Nodes = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="5.5" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="18.5" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 7.2v4.3M12 11.5 7 16.3M12 11.5l5 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const Flag = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 21V4m0 0h11l-2.5 4L17 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Atom = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-60 12 12)" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
/** Agent glyph: eye inside a squircle (stands in for the source's ghost symbol). */
const Agent = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <span className={"inline-flex shrink-0 items-center justify-center rounded-[38%] bg-blue-600 text-white " + className} style={{ width: size, height: size }}>
    <Eye className="h-[62%] w-[62%]" />
  </span>
);

/* =====================================================================
   S06 — The agent-building agent (2 large tiles, 548px)
   ===================================================================== */

/** Build: Ghostwriter conversation that assembles the agent. */
export function GwBuild() {
  const steps = [["Updating agent", "View changes", true], ["Researching lens catalog", "", true], ["Creating tests", "", true], ["Running tests", "", false]] as const;
  return (
    <Tile>
      <Panel className="top-[50px] left-[50px] w-[600px] pb-[28px]">
        <div className="flex items-center justify-between border-b border-[#e3eef8] px-[26px] py-[18px]">
          <div className="flex items-center gap-[10px] text-[21px] font-medium text-gray-700"><Agent size={26} />Ghostwriter</div>
          <span className="mr-[100px] inline-flex items-center gap-2 rounded-full border border-[#d9e8f6] px-[16px] py-[7px] text-[15px] text-gray-700"><span className="h-2 w-2 rounded-full bg-green-300" />Merge</span>
        </div>
        <div className="px-[26px] pt-[24px]">
          <div className="rounded-[20px] rounded-tr-[6px] border border-[#d6e6f7] bg-[#eaf3fc] px-[18px] py-[16px]">
            <div className="text-[16px] leading-[22px] text-blue-700">Create an eye-care support agent for Lumen Optics to book exams</div>
            <div className="mt-[12px] h-[12px] w-[92%] rounded-full bg-[#cfe2f6]" />
            <div className="mt-[8px] h-[12px] w-[70%] rounded-full bg-[#cfe2f6]" />
          </div>
          <p className="mt-[24px] whitespace-nowrap text-[16px] leading-[24px] text-gray-400">
            Using <span className="inline-flex items-center gap-1 text-blue-700"><Nodes className="h-4 w-4" />Journey generation</span>, <span className="inline-flex items-center gap-1 text-blue-700"><Bolt className="h-4 w-4" />Tool generation</span>, and <span className="inline-flex items-center gap-1 text-blue-700"><Db className="h-4 w-4" />Benefits lookup</span> to cover exams and vision plans
          </p>
          <p className="mt-[4px] whitespace-nowrap text-[16px] leading-[24px] text-gray-400">The agent is built. I’m running the Optician validation/deploy step so it can catch coverage issues</p>
          <ul className="relative mt-[18px] flex flex-col gap-[12px]">
            <span className="absolute top-[10px] bottom-[10px] left-[11px] border-l-2 border-dotted border-[#cfe2f6]" />
            {steps.map(([t, link, done]) => (
              <li key={t} className="relative flex items-center gap-[12px] text-[16px] text-gray-700">
                <span className={"flex h-[24px] w-[24px] items-center justify-center rounded-[38%] " + (done ? "bg-blue-700 text-white" : "border-2 border-dashed border-gray-250 bg-white")}>{done && <Check className="h-3.5 w-3.5" />}</span>
                <span>
                  {t}
                  {link && <span className="text-gray-350"> · </span>}
                  {link && <span className="text-blue-700">{link}</span>}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-[26px] flex items-center justify-between rounded-full border border-[#d9e8f6] py-[10px] pr-[10px] pl-[20px]">
            <span className="text-[16px] text-gray-350"><span className="mr-[2px] inline-block h-[18px] w-[1.5px] translate-y-[3px] bg-blue-700" />What can I help you with?</span>
            <span className="mr-[100px] flex h-[36px] w-[36px] items-center justify-center rounded-[38%] bg-blue-700 text-white"><Arrow className="h-4 w-4" /></span>
          </div>
        </div>
      </Panel>
    </Tile>
  );
}

/** Optimize: recommendations produced from flagged issues. */
export function GwOptimize() {
  const items = ["Build empathetic support for lens discomfort, exam anxiety, and refunds.", "Add secure prescription renewal for contact lens reorders.", "Implement all three recommendations to strengthen the reorder experience."];
  return (
    <Tile>
      <Panel className="top-[50px] left-[50px] w-[460px] px-[24px] pt-[26px] pb-[26px]">
        <div className="text-[21px] font-medium text-gray-700">Recommendations</div>
        <ul className="mt-[22px] flex flex-col gap-[8px]">
          {items.map((t, i) => (
            <li key={i} className={"flex items-start gap-[16px] px-[18px] py-[20px] text-[15.5px] leading-[22px] " + (i === 1 ? "rounded-[24px] rounded-tl-[8px] bg-[#eaf3fc] text-blue-700 ring-1 ring-[#d6e6f7]" : "rounded-[24px] rounded-tl-[8px] bg-[#f7fafd] text-gray-700 ring-1 ring-[#e3eef8]")}>
              <Agent size={24} className={i === 1 ? "" : "!bg-[#dfeefb] !text-blue-700"} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[26px] flex gap-[12px]">
          {["Compare findings", "Show all conversations"].map((b) => (
            <span key={b} className="inline-flex items-center gap-[10px] rounded-full bg-[#eaf3fc] px-[18px] py-[13px] text-[15px] text-blue-700 ring-1 ring-[#d6e6f7]"><span className="h-2 w-2 rounded-full bg-blue-600" />{b}<ArrowRight className="h-4 w-4" /></span>
          ))}
        </div>
      </Panel>
    </Tile>
  );
}

/* =====================================================================
   S07 — Use AI to improve your AI (4 tiles, 266px)
   ===================================================================== */

/** Explorer: a question answered from conversation highlights. */
export function InsExplorer() {
  return (
    <Tile>
      <Panel className="top-[50px] left-[50px] w-[640px] px-[50px] pt-[52px] pb-[50px]">
        <div className="text-[27px] leading-[36px] text-gray-700">“Why are conversations being transferred to opticians?”</div>
        <div className="mt-[52px] text-[21px] text-gray-400">Conversation highlights</div>
        <p className="mt-[24px] text-[21px] leading-[32px] text-gray-700">Out of the 118k total conversations, here are the top reasons why conversations have been transferred to opticians:</p>
        <div className="mt-[34px] inline-flex items-center gap-[12px] rounded-[18px] rounded-tl-[6px] bg-white px-[34px] py-[20px] text-[21px] text-gray-700 ring-1 ring-[#d9e8f6]"><span className="h-[10px] w-[10px] rounded-full bg-orange-600" />Prescription expired</div>
      </Panel>
      <RightFade />
    </Tile>
  );
}

/** Monitors: two overlapping metric cards. */
export function InsMonitors() {
  const bars = [[62, 100], [80, 100], [26, 60], [56, 100], [50, 100]];
  const pts = [10, 14, 12, 16, 15, 34, 40, 46, 44, 58, 62, 70, 74, 76, 84, 92];
  const W = 270, H = 150;
  const path = pts.map((p, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * W},${H - (p / 100) * H}`).join(" ");
  return (
    <Tile>
      <Panel className="top-[180px] left-[50px] h-[330px] w-[330px] rounded-[26px] rounded-tl-[26px] rounded-br-[10px] px-[30px] pt-[30px]">
        <div className="whitespace-nowrap text-[21px] text-gray-700">Total Transfers</div>
        <div className="absolute right-[26px] bottom-[28px] left-[30px] flex h-[150px] items-end gap-[12px]">
          {bars.map(([a, b], i) => (
            <div key={i} className="relative h-full flex-1">
              <span className="absolute right-0 bottom-0 left-0 rounded-t-full bg-[#e3eef8]" style={{ height: `${b}%` }} />
              <span className="absolute right-0 bottom-0 left-0 rounded-t-full bg-blue-700" style={{ height: `${a}%` }} />
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="top-[55px] left-[175px] h-[330px] w-[330px] rounded-[26px] rounded-tl-[10px] px-[30px] pt-[30px]">
        <div className="text-[21px] text-gray-700">Happy patients</div>
        <div className="mt-[14px] font-mono text-[46px] leading-none text-gray-700">32%</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute right-[30px] bottom-[26px] left-[30px] h-[150px] w-[270px]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="insMonG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4faf62" stopOpacity="0.32" />
              <stop offset="1" stopColor="#4faf62" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.2, 0.4, 0.6, 0.8].map((f) => <line key={f} x1={W * f} x2={W * f} y1="0" y2={H} stroke="#e3eef8" strokeDasharray="2 4" />)}
          <path d={`${path} L${W},${H} L0,${H} Z`} fill="url(#insMonG)" />
          <path d={path} fill="none" stroke="#3f9c52" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx={W} cy={H - (pts[pts.length - 1] / 100) * H} r="5" fill="#fff" stroke="#3f9c52" strokeWidth="2.5" />
        </svg>
      </Panel>
    </Tile>
  );
}

/** Experiments: two candidate greetings branching from one point. */
export function InsExperiments() {
  return (
    <Tile>
      <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 270 H40 M40 170 V370 M40 170 H82 M40 370 H82" fill="none" stroke="#b9d3ec" strokeWidth="2.5" strokeDasharray="4 6" />
        <circle cx="82" cy="170" r="5" fill="#fff" stroke="#8bbff5" strokeWidth="2.5" />
        <circle cx="82" cy="370" r="5" fill="#fff" stroke="#8bbff5" strokeWidth="2.5" />
      </svg>
      <Panel className="top-[90px] left-[85px] w-[420px] rounded-[28px] rounded-tl-[28px] rounded-bl-[8px] px-[34px] pt-[30px] pb-[32px]">
        <div className="flex items-center gap-[10px] text-[19px] text-gray-400"><Sparkle className="h-[18px] w-[18px]" color="#716f6c" />Agent</div>
        <div className="mt-[16px] text-[26px] leading-[36px] text-gray-700">Hey Priya, how can I help with your lenses?</div>
      </Panel>
      <Panel className="top-[276px] left-[85px] w-[420px] rounded-[28px] rounded-tl-[8px] px-[34px] pt-[30px] pb-[32px]">
        <div className="flex items-center gap-[10px] text-[19px] text-gray-400"><Sparkle className="h-[18px] w-[18px]" color="#716f6c" />Agent</div>
        <div className="mt-[16px] text-[26px] leading-[36px] text-gray-700">Hello Priya, how are your eyes feeling this evening?</div>
      </Panel>
    </Tile>
  );
}

/** Observability: the agent's reasoning trace. */
export function InsObservability() {
  const groups = [
    { icon: <Eye className="h-[22px] w-[22px]" />, name: "Supervisors", items: ["Prescription validity", "Lens compatibility"] },
    { icon: <Nodes className="h-[22px] w-[22px]" />, name: "Decisions", items: ["Journey: Exam booking"] },
    { icon: <Chat className="h-[22px] w-[22px]" />, name: "Responses", items: ["Main response"] },
  ];
  return (
    <Tile>
      <Panel className="top-[50px] left-[50px] h-[600px] w-[600px] px-[50px] pt-[58px]">
        <div className="flex items-center gap-[14px] text-[26px] text-blue-700"><Sparkle className="h-[24px] w-[24px]" color="#345eb2" />Agent reasoning</div>
        <ul className="mt-[44px] flex flex-col gap-[26px]">
          {groups.map((g) => (
            <li key={g.name}>
              <div className="flex items-center gap-[16px] text-[22px] text-gray-700"><span className="text-gray-350">{g.icon}</span>{g.name}</div>
              {g.items.map((it) => (
                <div key={it} className="mt-[8px] flex w-[420px] items-center justify-between pl-[38px] text-[22px] text-gray-300">
                  <span>{it}</span>
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[38%] bg-[#e8f5ea] text-green-300"><Check className="h-[14px] w-[14px]" /></span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </Panel>
    </Tile>
  );
}

/* =====================================================================
   S08 — Turn conversations into outcomes (4 tiles, 266px)
   ===================================================================== */

/** Long-horizon planning: signals → decision. */
export function HzPlanning() {
  return (
    <Tile>
      <Panel className="top-[50px] left-[55px] h-[600px] w-[620px] px-[48px] pt-[42px]">
        <div className="whitespace-nowrap text-[24px] text-gray-700">Renew before lenses run out</div>
        <div className="mt-[26px] flex flex-col gap-[20px]">
          <div className="w-[520px] rounded-[26px] rounded-tl-[8px] px-[34px] py-[26px] ring-1 ring-[#dbe8f4]">
            <div className="flex items-center gap-[12px] whitespace-nowrap text-[21px]"><Bolt className="h-[20px] w-[20px] text-blue-700" /><span className="text-blue-700">Start Signals</span><span className="ml-[10px] text-gray-350">Supply ends soon</span></div>
            <div className="mt-[14px] inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[#eaf3fc] px-[18px] py-[8px] text-[21px] text-blue-700"><span className="h-2 w-2 rounded-full bg-blue-600" />Insight · Loyal patient, 6 reorders</div>
          </div>
          <div className="w-[520px] rounded-[26px] rounded-tl-[8px] px-[34px] py-[26px] ring-1 ring-[#dbe8f4]">
            <div className="flex items-center gap-[12px] whitespace-nowrap text-[21px]"><Nodes className="h-[20px] w-[20px] text-blue-700" /><span className="text-blue-700">Decision</span><span className="ml-[10px] text-gray-350">Eligible for renewal</span></div>
            <div className="mt-[14px] inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[#eaf3fc] px-[18px] py-[8px] text-[21px] text-blue-700"><span className="h-2 w-2 rounded-full bg-blue-600" />Recommended · Offer exam + 15% off</div>
          </div>
        </div>
      </Panel>
      <RightFade w="30%" />
    </Tile>
  );
}

/** Customer context: the memory hub connected to eye-care systems. */
export function HzContext() {
  const nodes: [string, number, number, ReactNode][] = [
    ["EHR", 130, 130, <svg key="a" viewBox="0 0 24 24" fill="none" className="h-[38px] w-[38px]"><path d="M7 3h7l4 4v14H7V3Z" stroke="#4584c6" strokeWidth="1.8" strokeLinejoin="round" /><path d="M14 3v4h4M10.5 13h5M13 10.5v5" stroke="#4584c6" strokeWidth="1.8" strokeLinecap="round" /></svg>],
    ["Lens lab", 382, 115, <svg key="b" viewBox="0 0 24 24" fill="none" className="h-[38px] w-[38px]"><circle cx="12" cy="12" r="8" stroke="#4faf62" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.5" fill="#4faf62" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="#4faf62" strokeWidth="1.8" strokeLinecap="round" /></svg>],
    ["Insurance", 470, 290, <svg key="c" viewBox="0 0 24 24" fill="none" className="h-[38px] w-[38px]"><path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" stroke="#7644a6" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="#7644a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>],
    ["POS", 105, 390, <svg key="d" viewBox="0 0 24 24" fill="none" className="h-[38px] w-[38px]"><rect x="3" y="5.5" width="18" height="13" rx="2.5" stroke="#f96205" strokeWidth="1.8" /><path d="M3 10h18M7 14.5h4" stroke="#f96205" strokeWidth="1.8" strokeLinecap="round" /></svg>],
    ["CRM", 350, 455, <svg key="e" viewBox="0 0 24 24" fill="none" className="h-[38px] w-[38px]"><circle cx="9" cy="9" r="3.2" stroke="#e94e2a" strokeWidth="1.8" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8M15 6.5a3 3 0 0 1 0 5.6M17.5 14.6c1.8.6 2.9 2.1 3.2 4.4" stroke="#e94e2a" strokeWidth="1.8" strokeLinecap="round" /></svg>],
  ];
  return (
    <Tile>
      <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map(([n, x, y]) => <line key={n} x1="280" y1="280" x2={x} y2={y} stroke="#b9d3ec" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />)}
      </svg>
      {nodes.map(([n, x, y, icon]) => (
        <span key={n} className="absolute flex h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[30%] bg-white ring-1 ring-[#dbe8f4] shadow-[0_18px_40px_-26px_rgba(15,79,138,0.45)]" style={{ left: x, top: y }} title={n}>{icon}</span>
      ))}
      <span className="absolute top-[280px] left-[280px] flex h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[30%] bg-blue-700 text-white shadow-[0_30px_50px_-24px_rgba(52,94,178,0.7)]"><Db className="h-[52px] w-[52px]" /></span>
    </Tile>
  );
}

/** Outcome optimization: memory + decisioning feeding the agent's reply. */
export function HzOptimization() {
  return (
    <Tile>
      <Panel className="top-[70px] left-[80px] w-[560px] rounded-[30px] rounded-tl-[10px] px-[36px] pt-[32px] pb-[34px]">
        <div className="flex items-center gap-[12px] text-[23px] text-blue-700"><Db className="h-[22px] w-[22px]" />Memory</div>
        <ul className="mt-[14px] flex flex-col gap-[8px] pl-[38px] text-[23px] text-gray-400">
          <li className="flex items-center gap-[12px] whitespace-nowrap"><span className="h-[6px] w-[6px] rounded-full bg-gray-300" />Reordered lenses in March</li>
          <li className="flex items-center gap-[12px] whitespace-nowrap"><span className="h-[6px] w-[6px] rounded-full bg-gray-300" />Frequent daily-lens purchases</li>
        </ul>
        <div className="mt-[30px] flex items-center gap-[12px] text-[23px] text-blue-700"><Flag className="h-[22px] w-[22px]" />Decisioning</div>
        <div className="mt-[10px] whitespace-nowrap pl-[38px] text-[23px] text-gray-400">Looking for a lens upgrade…</div>
      </Panel>
      <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M135 356 V445 H200" fill="none" stroke="#b9d3ec" strokeWidth="2.5" strokeDasharray="4 6" />
        <circle cx="135" cy="356" r="5.5" fill="#fff" stroke="#8bbff5" strokeWidth="2.5" />
        <circle cx="200" cy="445" r="5.5" fill="#fff" stroke="#8bbff5" strokeWidth="2.5" />
      </svg>
      <Panel className="top-[380px] left-[205px] h-[220px] w-[500px] rounded-[30px] rounded-tl-[10px] px-[36px] pt-[30px]">
        <div className="flex items-center gap-[12px] text-[23px] text-blue-700"><Atom className="h-[24px] w-[24px]" />Agent</div>
        <div className="mt-[14px] whitespace-nowrap text-[23px] text-gray-400">Would you like to upgrade to hydrating daily lenses?</div>
      </Panel>
      <RightFade w="26%" />
    </Tile>
  );
}

/** Proactive engagement: signal → API → web chat. */
export function HzProactive() {
  const steps = [
    { icon: <Sparkle className="h-[18px] w-[18px]" color="#345eb2" />, label: "SIGNAL", text: "Prescription expires in 14 days", top: 52 },
    { icon: <Code className="h-[18px] w-[18px] text-blue-700" />, label: "API", text: "Check exam availability", top: 216 },
    { icon: <Chat className="h-[18px] w-[18px] text-blue-700" />, label: "Web chat", text: "Confirm eye exam", top: 380 },
  ];
  return (
    <Tile>
      <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M280 170 V216 M280 334 V380" fill="none" stroke="#8bbff5" strokeWidth="3" strokeDasharray="1 8" strokeLinecap="round" />
      </svg>
      {steps.map((s, i) => (
        <Panel key={s.label} className={"left-[55px] h-[118px] w-[450px] px-[36px] pt-[26px] " + (i % 2 ? "rounded-[32px] rounded-tr-[10px] rounded-tl-[32px]" : "rounded-[32px] rounded-tl-[10px]")} style={{ top: s.top }}>
          <div className={"flex items-center gap-[10px] text-blue-700 " + (i === 0 ? "text-[18px] font-medium tracking-[0.08em]" : "text-[20px] font-medium")}>{s.icon}{s.label}</div>
          <div className="mt-[10px] whitespace-nowrap text-[23px] text-gray-700">{s.text}</div>
        </Panel>
      ))}
    </Tile>
  );
}
