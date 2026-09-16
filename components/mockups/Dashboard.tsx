import { AgentAvatar, EyeIcon, GlassesIcon, Line, Pill } from "./ui";

const NAV = [
  { group: "Analyze", items: ["Insights", "Review", "Explorer"] },
  { group: "Build", items: ["Agent Builder", "Playbooks", "Knowledge", "Simulations", "Chat"] },
];

/** Area chart with dashed baseline and rounded end marker. */
export function AreaChart({ color = "#4faf62", className = "", points = [12, 22, 30, 44, 60, 58, 76, 90] }: { color?: string; className?: string; points?: number[] }) {
  const w = 300, h = 120;
  const pad = 6;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - 2 * pad));
  const ys = points.map((p) => pad + (h - 2 * pad) - (p / 100) * (h - 2 * pad));
  const d = xs.map((x, i) => `${i ? "L" : "M"}${x},${ys[i]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={"h-full w-full " + className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={"g" + color.replace("#", "")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#e4e0dc" strokeDasharray="3 5" />
      ))}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#g${color.replace("#", "")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="4" fill="#fff" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

/** Layer 1: the Explorer dashboard shell (sidebar + summary cards). */
export function DashboardShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-[26px] bg-white text-gray-700 ring-1 ring-blue-400/30 shadow-[0_40px_90px_-40px_rgba(15,79,138,0.25)]">
      <aside className="hidden w-[21%] shrink-0 flex-col gap-5 border-r border-blue-100 bg-blue-50 px-5 py-6 md:flex">
        <div className="flex items-center gap-2 text-[14px] font-medium tracking-wide">
          <AgentAvatar size={22} /> Lumen Optics
        </div>
        {NAV.map((g) => (
          <div key={g.group}>
            <div className="mb-2 text-[10px] uppercase tracking-widest text-gray-350">{g.group}</div>
            <ul className="flex flex-col gap-0.5">
              {g.items.map((it) => (
                <li key={it} className={"flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[12px] " + (it === "Explorer" ? "bg-white text-green-500 ring-1 ring-black/[0.05]" : "text-gray-400")}>
                  <span className={"h-1.5 w-1.5 rounded-full " + (it === "Explorer" ? "bg-green-300" : "bg-gray-250")} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/** Layer 2: question + summary + stat cards. */
export function DashboardTable({ compact = false }: { compact?: boolean }) {
  const rows = [
    ["Contact lens reorders", "6,410", "+21%", true],
    ["Eye exam bookings", "5,180", "+17%", true],
    ["Frame adjustments", "2,940", "−9%", false],
    ["Insurance coverage", "2,105", "+12%", true],
    ["Blue-light lens upgrades", "1,760", "+15%", true],
  ] as const;
  return (
    <div className="flex h-full flex-col gap-4 p-5 md:p-6">
      <div className="rounded-[18px] rounded-tl-[6px] bg-white px-4 py-3 text-[13px] ring-1 ring-black/[0.06]">Why did eye exam bookings rise this week?</div>
      <div>
        <div className="text-[11px] font-medium text-gray-400">Summary</div>
        <div className="text-[11px] text-gray-350">Bookings are up because the new online exam scheduler cut wait times and reminders went out for expiring prescriptions.</div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative rounded-[22px] bg-white p-4 ring-1 ring-black/[0.06]">
          <span className="absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full bg-green-300" />
          <div className="text-[11px] text-gray-400">Total conversations</div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-mono text-[30px] leading-none tracking-tight">92,306</span>
            <span className="text-[11px] text-green-500">+141%</span>
          </div>
          <div className="mt-4 h-[46%] min-h-[80px]"><AreaChart /></div>
        </div>
        <div className={"relative rounded-[22px] bg-white p-4 ring-1 ring-black/[0.06] " + (compact ? "hidden md:block" : "")}>
          <span className="absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full bg-blue-500" />
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Top topics</span>
            <span>Last 24h ▾</span>
          </div>
          <ul className="mt-2 divide-y divide-gray-150 text-[11px]">
            {rows.map(([name, n, d, up]) => (
              <li key={name} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{name}</span>
                <span className="flex items-center gap-4">
                  <span className={"font-mono " + (up ? "text-green-500" : "text-gray-400")}>{n}</span>
                  <span className={"w-9 text-right font-mono " + (up ? "text-green-500" : "text-gray-400")}>{d}</span>
                  <svg viewBox="0 0 40 14" className="h-3 w-9" aria-hidden="true">
                    <path d={up ? "M1 11 C10 10, 14 4, 20 6 S 32 9, 39 2" : "M1 3 C10 4, 14 10, 20 8 S 32 5, 39 12"} fill="none" stroke={up ? "#4faf62" : "#898683"} strokeWidth="1.6" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Layer 3: the follow-up input bar. */
export function DashboardInput() {
  return (
    <div className="flex h-full items-end p-5 md:p-6">
      <div className="flex w-full items-center justify-between rounded-[18px] rounded-tr-[6px] bg-white px-4 py-3 text-[12px] text-gray-350 shadow-[0_20px_40px_-24px_rgba(15,79,138,0.35)] ring-1 ring-black/[0.06]">
        <span>Ask a follow-up about your patients…</span>
        <span className="flex items-center gap-1.5">
          {["7d", "", "", ""].map((t, i) => (
            <span key={i} className="flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 text-[11px] text-gray-400 ring-1 ring-black/[0.08]">
              {t || <EyeIcon className="h-3 w-3" />}
            </span>
          ))}
          <span className="ml-1 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] text-white">Ask</span>
        </span>
      </div>
    </div>
  );
}

/** Full dashboard (used where the source shows the assembled screenshot). */
export function DashboardFull() {
  return (
    <DashboardShell>
      <div className="relative flex-1">
        <div className="absolute inset-0"><DashboardTable /></div>
      </div>
      <DashboardInput />
    </DashboardShell>
  );
}

/** Reporting card: "634 Conversations" style with bar/area chart. */
export function ReportingCard({ value = "712", label = "Eye exams booked", note = "Action required", className = "" }: { value?: string; label?: string; note?: string; className?: string }) {
  return (
    <div className={"relative flex h-full w-full flex-col justify-between rounded-[26px] bg-white p-6 ring-1 ring-blue-400/30 " + className}>
      <span className="absolute top-6 bottom-6 left-0 w-[3px] rounded-r-full bg-blue-500" />
      <div>
        <div className="font-mono text-[34px] leading-none text-gray-700">{value}</div>
        <div className="mt-1 text-[12px] text-gray-350">{label}</div>
      </div>
      <div className="h-[46%]"><AreaChart color="#4584c6" points={[30, 28, 40, 38, 52, 50, 66, 80]} /></div>
      <div className="mt-4 flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 text-[11px]">
        <span className="h-6 w-6 rounded-full bg-gray-250" />
        <span className="text-gray-700">10:10 AM · Today</span>
        <Pill tone="green" className="ml-auto">{note}</Pill>
      </div>
    </div>
  );
}

/** Experimentation card: A/B offers. */
export function RetentionCard({ className = "" }: { className?: string }) {
  return (
    <div className={"relative flex h-full w-full flex-col rounded-[26px] bg-white p-6 ring-1 ring-blue-400/30 " + className}>
      <div className="flex items-center justify-between text-[14px] font-medium text-gray-700">
        <span className="flex items-center gap-2"><GlassesIcon className="h-4 w-4 text-green-500" /> Lens renewal campaign</span>
        <span className="text-gray-350">···</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[["Offer A (Control)", "23", null], ["Offer B (Test)", "41", "+37%"]].map(([n, v, d]) => (
          <div key={n as string} className="rounded-[16px] rounded-tl-[6px] bg-gray-100 p-3">
            <div className="text-[10px] text-gray-350">{n}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-[24px] leading-none text-gray-700">{v}<span className="text-[12px]">%</span></span>
              {d && <Pill tone="green">{d}</Pill>}
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex-1 min-h-[80px]">
        <AreaChart color="#7eaee0" points={[10, 18, 26, 30, 44, 52, 60, 72]} />
        <div className="absolute inset-0"><AreaChart color="#345eb2" points={[8, 12, 20, 24, 30, 36, 40, 48]} /></div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-gray-350"><span>APR 1</span><span>JUN 30</span></div>
    </div>
  );
}

/** Small data cards (sNPS style). */
export function DataCards({ className = "" }: { className?: string }) {
  return (
    <div className={"relative h-full w-full " + className}>
      <div className="absolute top-[12%] left-[10%] w-[58%] rounded-[20px] bg-white p-4 ring-1 ring-black/[0.06] shadow-[0_18px_40px_-24px_rgba(15,79,138,0.35)]">
        <div className="text-[10px] text-gray-350">Patient satisfaction</div>
        <div className="mt-1 flex items-baseline gap-2"><span className="font-mono text-[28px] leading-none">36%</span><span className="text-[10px] text-green-500">+6 pts</span></div>
        <div className="mt-3 h-14"><AreaChart /></div>
      </div>
      <div className="absolute right-[8%] bottom-[10%] w-[52%] rounded-[20px] bg-white p-4 ring-1 ring-black/[0.06]">
        <div className="text-[10px] text-gray-350">Exams by day</div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[40, 65, 50, 85, 70, 95, 60].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-full rounded-b-[3px] bg-blue-500" style={{ height: `${h}%`, opacity: 0.55 + i * 0.06 }} />
          ))}
        </div>
        <Line w="40%" className="mt-2" />
      </div>
    </div>
  );
}
