"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children on a fixed design canvas (design × design px) and scales it to the container width,
 * so an illustration keeps the same composition at every tile size (548px at 1440, 266px in a 4-up grid, …).
 */
export default function Fit({ design = 560, children, className = "" }: { design?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => setS(el.clientWidth / design);
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, [design]);
  return (
    <div ref={ref} className={"absolute inset-0 overflow-hidden " + className}>
      <div className="absolute top-0 left-0" style={{ width: design, height: design, transformOrigin: "0 0", transform: `scale(${s ?? 0})`, opacity: s ? 1 : 0, transition: "opacity .2s" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Zooms its children so that px-based type and spacing scale with the container width (base = the width at which
 * the mockup renders 1:1; zoom grows with the square root of the width) while percentage-based layout still fills the whole container.
 */
export function Fill({ base = 380, min = 0.7, max = 2, children, className = "" }: { base?: number; min?: number; max?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [st, setSt] = useState<{ s: number; w: number; h: number } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => {
      const w = el.clientWidth, h = el.clientHeight;
      // sub-linear zoom: a 548px tile renders at ~1.2×, an 1100px hero at ~1.7×, a 266px tile at ~0.85×
      const s = Math.min(max, Math.max(min, Math.sqrt(w / base)));
      setSt({ s, w: w / s, h: h / s });
    };
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => ro.disconnect();
  }, [base, min, max]);
  return (
    <div ref={ref} className={"absolute inset-0 overflow-hidden " + className}>
      <div className="absolute top-0 left-0" style={st ? { width: st.w, height: st.h, transformOrigin: "0 0", transform: `scale(${st.s})` } : { width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
