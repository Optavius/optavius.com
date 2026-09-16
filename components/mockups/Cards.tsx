import { AgentAvatar, AskBar, Bubble, Card, CheckIcon, EyeIcon, GlassesIcon, Line, Pill, dottedBg } from "./ui";

const Row = ({ children, dot = "bg-green-300" }: { children: React.ReactNode; dot?: string }) => (
  <li className="flex items-start gap-2 text-[11px] leading-snug text-gray-700">
    <span className={"mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full " + dot} />
    <span>{children}</span>
  </li>
);

/** Ghostwriter builder: instruction → generated agent steps. */
export function GhostwriterBuild({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Ghostwriter" accent="#4584c6" right={<Pill tone="ghost">Merge</Pill>} className="w-full">
        <div className="rounded-[14px] rounded-tl-[4px] bg-blue-100 px-3 py-2 text-[11px] text-blue-700">Create an eye-care support agent for Lumen Optics that books exams, reorders lenses and checks vision benefits</div>
        <p className="mt-3 text-[11px] text-gray-400">
          Using <span className="text-blue-700">Journey generation</span>, <span className="text-blue-700">Test generation</span> and <span className="text-blue-700">Benefits lookup</span>
        </p>
        <p className="mt-2 text-[11px] text-gray-400">The agent is built. Running the Optician validation step so it can catch any prescription or coverage issues.</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          <Row>Updating agent · <span className="text-blue-700">View changes</span></Row>
          <Row>Researching lens brands</Row>
          <Row dot="bg-gray-250">Running booking tests</Row>
        </ul>
        <div className="mt-4"><AskBar placeholder="Describe another change…" /></div>
      </Card>
    </div>
  );
}

/** Recommendations card. */
export function Recommendations({ className = "" }: { className?: string }) {
  const items = ["Add a frame-adjustment walk-in flow for patients whose glasses feel loose", "Offer contact lens auto-reorder when a prescription has 60 days left", "Route insurance coverage questions to the benefits lookup before quoting prices"];
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Recommendations" accent="#4faf62" className="w-full">
        <ul className="flex flex-col gap-2">
          {items.map((t, i) => (
            <li key={i} className={"flex items-start gap-2 rounded-[14px] rounded-tl-[4px] px-3 py-2 text-[11px] " + (i === 1 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700")}>
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[38%] bg-white text-green-500 ring-1 ring-black/[0.06]"><EyeIcon className="h-2.5 w-2.5" /></span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2"><Pill tone="ghost">Compare findings →</Pill><Pill tone="ghost">Show all conversations →</Pill></div>
      </Card>
    </div>
  );
}

/** Trace timeline (agent trace graph). */
export function TraceTimeline({ className = "" }: { className?: string }) {
  const steps = [["Transcription", "#4584c6", 12, 30], ["Initialize", "#7644a6", 34, 18], ["Supervisor: prescription check", "#4faf62", 44, 40], ["Intent: patient asks to skip eye exam", "#e94e2a", 60, 34], ["Response", "#4faf62", 78, 20]] as const;
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Agent trace · exam booking" accent="#7644a6" className="w-full">
        <div className="relative mt-1 h-40">
          {[0, 25, 50, 75, 100].map((p) => (
            <span key={p} className="absolute top-0 bottom-0 border-l border-dashed border-gray-200" style={{ left: `${p}%` }} />
          ))}
          {steps.map(([name, color, left, w], i) => (
            <div key={name} className="absolute flex items-center gap-2" style={{ top: `${i * 20}%`, left: `${left}%`, width: `${w}%` }}>
              <span className="h-2.5 flex-1 rounded-full" style={{ background: color, opacity: 0.85 }} />
              <span className="whitespace-nowrap text-[9.5px] text-gray-400">{name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/** Report answering a question. */
export function ReportCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Explorer report" accent="#4584c6" className="w-full">
        <div className="text-[12px] font-medium text-gray-700">“Why are patients transferred to an optician?”</div>
        <div className="mt-2 text-[10px] uppercase tracking-widest text-gray-350">Conversation highlights</div>
        <p className="mt-1 text-[11px] text-gray-400">Out of 118k conversations, the top reason for a hand-off was prescriptions older than 12 months.</p>
        <div className="mt-2 rounded-[12px] rounded-tl-[4px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700">Expired prescription</div>
        <div className="mt-3 flex gap-2"><Line w="50%" /><Line w="30%" /></div>
      </Card>
    </div>
  );
}

/** Two agent greeting bubbles (tone variants). */
export function ChatBubblesCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full flex-col justify-center gap-3 bg-blue-100 p-[10%] " + className}>
      <Bubble name="Agent">Hi Priya, ready to pick up your new frames?</Bubble>
      <Bubble name="Agent" className="pl-6">Hello Priya, how are your eyes feeling this evening?</Bubble>
    </div>
  );
}

/** Reasoning panel with checkmarks. */
export function ReasoningPanel({ className = "" }: { className?: string }) {
  const rows = [["Supervisors", ["Prescription validity", "Lens compatibility"]], ["Decisions", ["Route to optician: no"]], ["Responses", ["Offer earliest exam slot"]]] as const;
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Agent reasoning" accent="#4faf62" className="w-full">
        <ul className="flex flex-col gap-3">
          {rows.map(([h, items]) => (
            <li key={h}>
              <div className="text-[11px] font-medium text-gray-700">{h}</div>
              {items.map((it) => (
                <div key={it} className="mt-1 flex items-center justify-between text-[10.5px] text-gray-400">
                  <span>{it}</span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-50 text-green-500"><CheckIcon className="h-2.5 w-2.5" /></span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Memory / patient profile card. */
export function MemoryCard({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Memory" accent="#7644a6" className="w-full">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-[38%] bg-purple-100" />
          <div className="leading-tight">
            <div className="text-[12px] font-medium text-gray-700">Priya Nair</div>
            <div className="text-[10px] text-gray-350">priya@example.com · patient since 2019</div>
          </div>
        </div>
        <ul className="mt-3 flex flex-col gap-1.5">
          <Row dot="bg-purple-600">Reason for calling: lens reorder</Row>
          <Row dot="bg-purple-600">Prescription: −2.25 / −2.00, renewed Mar 2026</Row>
          {!compact && <Row dot="bg-purple-600">Current sentiment: positive</Row>}
          {!compact && <Row dot="bg-purple-600">Prefers evening appointments</Row>}
        </ul>
      </Card>
    </div>
  );
}

/** Activity history card. */
export function HistoryCard({ className = "" }: { className?: string }) {
  const rows = [["Today", "Booked eye exam", "#4faf62"], ["Mar 12", "Reordered daily lenses", "#4584c6"], ["Feb 3", "Frame adjustment", "#7644a6"], ["Jan 20", "Vision benefits check", "#ebc247"]];
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="History" accent="#4584c6" className="w-full">
        <ul className="relative ml-2 flex flex-col gap-3 border-l border-dashed border-gray-200 pl-4">
          {rows.map(([d, t, c]) => (
            <li key={t} className="relative text-[11px]">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: c }} />
              <div className="text-[9.5px] text-gray-350">{d}</div>
              <div className="text-gray-700">{t}</div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Integrations: eye-care systems around a hub. */
export function IntegrationsCard({ className = "" }: { className?: string }) {
  const nodes = [["EHR", "#4584c6"], ["Lens lab", "#4faf62"], ["Insurance", "#7644a6"], ["POS", "#f96205"], ["CRM", "#ebc247"]];
  return (
    <div className={"relative flex h-full w-full items-center justify-center bg-blue-100 " + className} style={dottedBg}>
      <div className="relative aspect-square h-[72%] max-w-[72%]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((_, i) => { const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="50" y1="50" x2={50 + 42 * Math.cos(a)} y2={50 + 42 * Math.sin(a)} stroke="#8bbff5" strokeWidth="0.8" strokeDasharray="2 2" />; })}
        </svg>
        {nodes.map(([n, c], i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span key={n} className="absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[38%] bg-white text-[9px] font-medium ring-1 ring-black/[0.06]" style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%`, color: c }}>
              {n}
            </span>
          );
        })}
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[38%] bg-blue-600 text-white shadow-[0_18px_30px_-16px_rgba(52,94,178,0.7)]"><EyeIcon className="h-6 w-6" /></span>
      </div>
    </div>
  );
}

/** Churn / audience strategy UI. */
export function StrategyCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full flex-col justify-center gap-3 bg-blue-100 p-[8%] " + className}>
      <Card title="Audience" accent="#4584c6"><div className="text-[12px] text-gray-700">Lapsed lens wearers <span className="text-gray-350">(84k)</span></div></Card>
      <Card title="Outcome" accent="#4faf62"><div className="text-[12px] text-gray-700">Renewed prescription & reorder</div><div className="mt-2 flex gap-2"><Pill tone="green">Lifetime value</Pill><Pill tone="ghost">Retention</Pill></div></Card>
    </div>
  );
}

/** Workflow / Horizon "convert before" card. */
export function WorkflowCard({ className = "", title = "Renew before lenses run out" }: { className?: string; title?: string }) {
  const steps = [["Goal", "Renew the prescription before the last lens box is used", "#4faf62", false], ["Signals", "Lens supply ends in 10 days · exam overdue", "#4584c6", false], ["Reasoning", "Patient prefers evenings; offer Thursday 6pm slot", "#345eb2", true], ["Next actions", "Send reminder · Hold appointment · Confirm coverage", "#7644a6", false]] as const;
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title={title} accent="#4faf62" className="w-full">
        <ul className="flex flex-col gap-2">
          {steps.map(([h, t, c, hi]) => (
            <li key={h} className={"rounded-[14px] rounded-tl-[4px] px-3 py-2 " + (hi ? "bg-blue-600 text-white" : "bg-gray-100")}>
              <div className="flex items-center gap-1.5 text-[10px] font-medium" style={hi ? undefined : { color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: hi ? "#fff" : c }} />{h}</div>
              <div className={"mt-0.5 text-[10.5px] " + (hi ? "text-white/85" : "text-gray-400")}>{t}</div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Scheduled activity card (Isabel Sage style). */
export function ActivityCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Priya Nair" accent="#4584c6" right={<Pill tone="ghost">Scheduled</Pill>} className="w-full">
        <div className="text-[10px] uppercase tracking-widest text-gray-350">Upcoming activity</div>
        <div className="mt-1 flex items-center justify-between rounded-[12px] bg-blue-100 px-3 py-2 text-[11px]"><span className="text-blue-700">Callback: lens fitting follow-up</span><span className="text-gray-350">Today 4:00 PM</span></div>
        <div className="mt-3 text-[10px] uppercase tracking-widest text-gray-350">Previous activity</div>
        {[["Outbound call", "Exam reminder", "Jul 9th"], ["Inbound chat", "Reorder daily lenses", "Jul 2nd"]].map(([a, b, d]) => (
          <div key={a} className="mt-1 flex items-center justify-between rounded-[12px] bg-gray-100 px-3 py-2 text-[11px]">
            <span><span className="text-gray-700">{a}</span> <span className="text-gray-350">· {b}</span></span>
            <span className="text-gray-350">{d}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

/** Journey configuration list. */
export function JourneyList({ className = "", items = ["Book an eye exam", "Reorder contact lenses", "Check vision benefits", "Frame adjustment visit", "Prescription renewal"], active = 1 }: { className?: string; items?: string[]; active?: number }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className} style={dottedBg}>
      <Card title="Journeys" accent="#4584c6" className="w-full">
        <ul className="flex flex-col gap-1">
          {items.map((it, i) => (
            <li key={it} className={"flex items-center justify-between rounded-[12px] px-3 py-2 text-[11px] " + (i === active ? "bg-blue-600 text-white" : "text-gray-700")}>
              <span className="flex items-center gap-2"><GlassesIcon className="h-3.5 w-3.5" />{it}</span>
              <span className={"h-1.5 w-1.5 rounded-full " + (i === active ? "bg-white" : "bg-green-300")} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Knowledge base lookup. */
export function KnowledgeLookup({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className} style={dottedBg}>
      <Card title="Knowledge base lookup" accent="#4faf62" className="w-full">
        <div className="text-[10px] text-gray-350">Query</div>
        <div className="rounded-[12px] rounded-tl-[4px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700">“Can I wear daily lenses for two days?”</div>
        <div className="mt-2 text-[10px] text-gray-350">Message</div>
        <div className="rounded-[12px] rounded-tl-[4px] bg-blue-100 px-3 py-2 text-[11px] text-blue-700">“How long can I keep my daily lenses in?”</div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400"><span>3 results</span><Pill tone="ghost">Add article</Pill></div>
      </Card>
    </div>
  );
}

/** Simulations list. */
export function SimulationsList({ className = "" }: { className?: string }) {
  const rows = ["Expired prescription reorder", "Lost or broken frames", "Insurance out-of-network", "Exam reschedule same day", "Lens allergy report", "Blue-light upgrade upsell"];
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className} style={dottedBg}>
      <Card title="Simulations" accent="#7644a6" right={<span className="flex gap-1"><Pill tone="ghost">Chat</Pill><Pill tone="dark">Voice</Pill></span>} className="w-full">
        <ul className="divide-y divide-gray-150">
          {rows.map((r, i) => (
            <li key={r} className="flex items-center justify-between py-1.5 text-[11px] text-gray-700"><span>{r}</span><span className={"flex h-4 w-4 items-center justify-center rounded-full " + (i < 4 ? "bg-green-50 text-green-500" : "bg-gray-100 text-gray-300")}><CheckIcon className="h-2.5 w-2.5" /></span></li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Brand settings. */
export function BrandSettings({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className} style={dottedBg}>
      <Card title="Brand" accent="#4584c6" className="w-full">
        <div className="text-[10px] text-gray-350">Agent name</div>
        <div className="mb-2 rounded-[12px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700">Lumen Optics Vision Assistant</div>
        <div className="text-[10px] text-gray-350">Tone of voice</div>
        <div className="mb-3 rounded-[12px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700">Warm, reassuring and clear about eye health</div>
        <Pill tone="green">Save changes</Pill>
      </Card>
    </div>
  );
}

/** Dark "account details" style card (trust page). */
export function AccountCard({ className = "", title = "Patient details", lines = ["Send all of your patient’s prescription details.", "Encrypted in transit and at rest."], light = false }: { className?: string; title?: string; lines?: string[]; light?: boolean }) {
  return (
    <div className={"flex h-full w-full flex-col justify-end p-[8%] " + (light ? "bg-blue-100 text-gray-700 " : "bg-[#1b2624] text-white ") + className} style={light ? dottedBg : undefined}>
      <div className="mb-4 text-[15px] font-medium">{title}</div>
      <div className="flex flex-col gap-2">
        {lines.map((l, i) => (
          <Bubble key={l} dark={!light} side={i % 2 ? "user" : "agent"} name={i % 2 ? undefined : "Agent"}>{l}</Bubble>
        ))}
      </div>
      <div className="mt-4"><AskBar dark={!light} placeholder="Ask anything…" /></div>
    </div>
  );
}

/** Policies document illustration. */
export function PoliciesDoc({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-gray-100 " + className}>
      <div className="relative w-[78%] rounded-[22px] bg-white p-5 ring-1 ring-black/[0.06]">
        <span className="absolute top-5 bottom-5 left-0 w-[3px] rounded-r-full bg-green-300" />
        <div className="flex items-center justify-between text-[12px] text-gray-700"><span>Our eye-care policies</span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400"><EyeIcon className="h-3 w-3" /></span></div>
        <div className="mt-4 flex flex-col gap-2"><Line w="90%" /><Line w="70%" /><Line w="80%" /><Line w="40%" /></div>
      </div>
    </div>
  );
}

/** Constellation of models (dots + a highlighted node). */
export function Constellation({ className = "" }: { className?: string }) {
  const pts = [[20, 30], [38, 18], [56, 34], [74, 22], [30, 58], [50, 62], [70, 54], [86, 70]];
  return (
    <div className={"relative h-full w-full bg-blue-100 " + className} style={dottedBg}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {pts.slice(1).map((p, i) => <line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={p[0]} y2={p[1]} stroke="#8bbff5" strokeWidth="0.6" strokeDasharray="1.5 1.5" />)}
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 2.6 : 1.6} fill={i === 2 ? "#ebc247" : "#4584c6"} />)}
      </svg>
      <div className="absolute left-[42%] top-[64%] rounded-full bg-white px-3 py-1.5 text-[10px] text-gray-700 shadow-[0_10px_20px_-12px_rgba(15,79,138,0.5)] ring-1 ring-black/[0.06]">
        <span className="mr-1 text-blue-700">LLM:</span> choose lens model
      </div>
    </div>
  );
}

/** Email from the clinic. */
export function EmailCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Reschedule request" accent="#4584c6" className="w-full">
        <div className="text-[10px] text-gray-350">ClearSight Eye Clinic · to: priya@example.com</div>
        <p className="mt-2 text-[11px] leading-snug text-gray-700">Hi Priya,</p>
        <p className="mt-1 text-[11px] leading-snug text-gray-400">Happy to help reschedule your eye exam. Here are a few options that work with your vision plan:</p>
        <ul className="mt-2 flex flex-col gap-1">
          {["Option 1: Tue, May 5 at 11:30am", "Option 2: Wed, May 6 at 9:00am", "Option 3: Thu, May 7 at 2:15pm"].map((o) => (
            <li key={o} className="rounded-[10px] bg-gray-100 px-2.5 py-1.5 text-[10.5px] text-gray-700">{o}</li>
          ))}
        </ul>
        <p className="mt-2 text-[10.5px] text-gray-350">Just reply with the option that works best and we’ll take care of the rest.</p>
      </Card>
    </div>
  );
}

/** ChatGPT-style app card with product results. */
export function ChatAppCard({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Lumen Optics · in ChatGPT" accent="#4faf62" className="w-full">
        <div className="rounded-[12px] rounded-tr-[4px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700">Looking for lightweight round frames for reading</div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[["Round · Titanium", "$189"], ["Round · Acetate", "$149"], ["Half-rim · Steel", "$129"]].map(([n, p], i) => (
            <div key={n} className="rounded-[12px] bg-white p-2 ring-1 ring-black/[0.06]">
              <div className="mb-1.5 flex h-8 items-center justify-center rounded-md bg-green-50 text-green-500"><GlassesIcon className="h-5 w-5" /></div>
              <div className="text-[9px] text-gray-700">{n}</div>
              <div className="text-[9px] text-gray-350">{p}{i === 0 ? " · in stock" : ""}</div>
            </div>
          ))}
        </div>
        <div className="mt-3"><AskBar placeholder="Ask about lenses or frames…" /></div>
      </Card>
    </div>
  );
}

/** Customer service UI with patient detail sidebar. */
export function ServiceUI({ className = "" }: { className?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Patient: Priya Nair" accent="#4584c6" right={<Pill tone="ghost">Verified</Pill>} className="w-full">
        <div className="text-[10px] text-gray-350">Reason for contact</div>
        <div className="text-[11px] text-gray-700">Lens fitting appointment · Positive sentiment</div>
        <ul className="mt-2 flex flex-col gap-1.5">
          <Row>Verify patient identity and plan type</Row>
          <Row dot="bg-blue-600">Offer to book a fitting at the nearest store</Row>
          <Row dot="bg-gray-250">Confirm out-of-pocket amount</Row>
        </ul>
        <div className="mt-3 rounded-[12px] rounded-tl-[4px] bg-blue-100 px-3 py-2 text-[11px] text-blue-700">Your plan covers a fitting every 12 months — the next one is free.</div>
      </Card>
    </div>
  );
}

/** Weekly briefing pill card (explorer). */
export function BriefingCard({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      {compact ? (
        <div className="rounded-full bg-purple-100 px-4 py-2 text-[12px] text-purple-500 ring-1 ring-purple-400/40"><span className="mr-1">✦</span> Here is your weekly eye-care briefing.</div>
      ) : (
        <Card title="Weekly briefing" accent="#7644a6" className="w-full">
          <div className="text-[10px] uppercase tracking-widest text-gray-350">TL;DR</div>
          <p className="mt-1 text-[11px] text-gray-700">Exam bookings up 9% after reminder texts; lens reorders dipped 4% where stock ran low.</p>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-gray-350">Methodology</div>
          <p className="mt-1 text-[11px] text-gray-400">Reviewed 14,207 conversations across chat, voice and email, grouped by intent.</p>
          <div className="mt-2 flex flex-col gap-1.5"><Line w="80%" /><Line w="55%" /></div>
        </Card>
      )}
    </div>
  );
}

/** "Get insights from patients" query card. */
export function InsightsQuery({ className = "" }: { className?: string }) {
  const qs = ["How should we improve the agent’s lens reorder flow?", "What content should we add to the eye-health knowledge base?", "Which patient intents are rising this month?", "Find conversations where a patient mentioned dry eyes"];
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[8%] " + className}>
      <Card title="Get insights from patients" accent="#4584c6" className="w-full">
        <div className="flex items-center justify-between rounded-[12px] bg-gray-100 px-3 py-2 text-[11px] text-gray-700"><span>Why did lens reorders drop last week?</span><Pill tone="green">Explore</Pill></div>
        <ul className="mt-2 flex flex-col gap-1">
          {qs.map((q) => (
            <li key={q} className="flex items-center gap-2 rounded-[10px] bg-blue-100 px-2.5 py-1.5 text-[10.5px] text-blue-700"><span className="text-[11px]">✦</span>{q}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Ghost icon button (kept meaning: Ghostwriter pill). */
export function IconPill({ className = "", label = "Ghostwriter" }: { className?: string; label?: string }) {
  return (
    <div className={"flex h-full w-full items-center justify-center bg-[#3a4643] " + className}>
      <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[12px] text-white ring-1 ring-white/25 backdrop-blur"><AgentAvatar size={16} />{label}</span>
    </div>
  );
}

/** Pricing illustration: one monthly fee that follows results. */
export function PricingCard({ className = "" }: { className?: string }) {
  const rows: [string, string][] = [["Calls answered", "1,204"], ["Appointments booked", "212"], ["No-shows recovered", "38"], ["Order status confirmed", "156"]];
  return (
    <div className={"flex h-full w-full items-center justify-center bg-blue-100 p-[9%] " + className}>
      <Card title="Your monthly fee" accent="#006838" right={<Pill tone="ghost">Tied to results</Pill>} className="w-full">
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-[34px] leading-none tracking-tight text-gray-700">$299</span>
          <span className="text-[11px] text-gray-350">starting from, per month</span>
        </div>
        <ul className="mt-4 divide-y divide-gray-150 text-[11px]">
          {rows.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between py-2"><span className="flex items-center gap-2 text-gray-700"><CheckIcon className="h-3 w-3 text-green-500" />{k}</span><span className="font-mono text-green-500">{v}</span></li>
          ))}
        </ul>
        <div className="mt-4 rounded-[12px] bg-green-50 px-3 py-2 text-[11px] text-green-500"><span className="font-medium">No results, no fee.</span> Unlimited users and minutes.</div>
      </Card>
    </div>
  );
}
