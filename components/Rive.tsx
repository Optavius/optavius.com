"use client";
import { useEffect, useRef, useState } from "react";

let wasmConfigured = false;

/** Plays an original .riv animation into a canvas sized to its parent (like the source site). */
export default function RiveCanvas({ src, describedBy, playing = true }: { src: string; describedBy?: string; playing?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const riveRef = useRef<any>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) }));
    ro.observe(el);
    setSize({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("@rive-app/webgl2");
      if (cancelled || !canvasRef.current) return;
      if (!wasmConfigured) {
        mod.RuntimeLoader.setWasmUrl("/rive.wasm");
        wasmConfigured = true;
      }
      const r = new mod.Rive({
        src,
        canvas: canvasRef.current,
        autoplay: true,
        autoBind: true,
        layout: new mod.Layout({ fit: mod.Fit.Cover, alignment: mod.Alignment.Center }),
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
          try {
            const sms = r.stateMachineNames;
            if (sms && sms.length) r.play(sms[0]);
          } catch {}
        },
      });
      riveRef.current = r;
      (canvasRef.current as any).__rive = r;
    })();
    return () => {
      cancelled = true;
      try {
        riveRef.current?.cleanup();
      } catch {}
      riveRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const r = riveRef.current;
    if (!r) return;
    try {
      r.resizeDrawingSurfaceToCanvas();
    } catch {}
  }, [size]);

  useEffect(() => {
    const r = riveRef.current;
    if (!r) return;
    try {
      if (playing) r.play();
      else r.pause();
    } catch {}
  }, [playing]);

  return (
    <div className="relative h-full w-full" ref={wrapRef}>
      <canvas ref={canvasRef} aria-describedby={describedBy} role="img" width={size.w} height={size.h} style={{ verticalAlign: "top", width: size.w ? size.w + "px" : "100%", height: size.h ? size.h + "px" : "100%" }} />
    </div>
  );
}
