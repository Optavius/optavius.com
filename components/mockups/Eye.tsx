"use client";
import { useEffect, useRef } from "react";

/**
 * The Optavius iris: thousands of points arranged on Fibonacci rays that breathe like a pupil and follow the cursor.
 * Ported from the original three.js scene to a dependency-free 2D canvas, in the site's green palette.
 */
export default function Eye({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = window.innerWidth < 700 ? 4500 : 8000, FIB = 240;
    const base = new Float32Array(N), ang = new Float32Array(N), jit = new Float32Array(N);
    const colors: string[] = [];
    const lerp = (a: number[], b: number[], t: number) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
    const cIn = dark ? [255, 255, 255] : [0, 104, 56], cMid = dark ? [126, 209, 133] : [79, 175, 98], cOut = dark ? [79, 175, 98] : [126, 209, 133], cHi = dark ? [235, 194, 71] : [48, 46, 45];
    for (let i = 0; i < N; i++) {
      const f = Math.floor(Math.random() * FIB);
      ang[i] = f * ((Math.PI * 2) / FIB) + (Math.random() - 0.5) * 0.02 + Math.sin(f * 1.7) * 0.01;
      const r = Math.pow(Math.random(), 0.8);
      base[i] = r; jit[i] = Math.random();
      let c = r < 0.12 ? cIn : r < 0.4 ? lerp(cIn, cMid, (r - 0.12) / 0.28) : r < 0.92 ? lerp(cMid, cOut, (r - 0.4) / 0.52) : lerp(cIn, cMid, 0.3);
      if (Math.random() < 0.05 && r > 0.3 && r < 0.9) c = lerp(c, cHi, 0.55);
      colors.push(`rgb(${c[0]},${c[1]},${c[2]})`);
    }
    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0, visible = true, W = 0, H = 0, dpr = 1;
    const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; };
    resize();
    const onMove = (e: MouseEvent | TouchEvent) => { const p = "touches" in e ? e.touches[0] : e; if (!p) return; tx = p.clientX / innerWidth - 0.5; ty = p.clientY / innerHeight - 0.5; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !W) return;
      const s = t * 0.001;
      let pupil = 0.22 + Math.sin(s * 0.6) * 0.06 + Math.sin(s * 2.3) * 0.015;
      if (reduce) pupil = 0.25;
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      const rz = reduce ? 0 : s * 0.05, ry = mx * 0.5, rx = my * 0.35;
      const scale = (Math.min(W, H) / 2) * 0.62;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.translate(W / 2, H / 2);
      for (let i = 0; i < N; i++) {
        const b0 = base[i];
        const r = pupil + (1.5 - pupil) * (b0 > 0.92 ? 0.92 + (b0 - 0.92) * 0.6 : b0);
        const a = ang[i] + (reduce ? 0 : Math.sin(s * 0.4 + b0 * 6) * 0.006) + rz;
        let x = Math.cos(a) * r, y = Math.sin(a) * r;
        const z = -Math.pow(b0, 2) * 0.35 + (reduce ? 0 : Math.sin(s * 1.3 + jit[i] * 6.28) * 0.012);
        // small 3D tilt: rotate around y then x, then perspective
        const x2 = x * Math.cos(ry) + z * Math.sin(ry), z2 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y2 = y * Math.cos(rx) - z2 * Math.sin(rx), z3 = y * Math.sin(rx) + z2 * Math.cos(rx);
        const p = 1 / (1 - z3 * 0.18);
        x = x2 * p; y = y2 * p;
        const size = (0.9 + (1 - b0) * 0.9) * p * (scale / 160);
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 0.55 + (1 - b0) * 0.45;
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, size, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", resize); io.disconnect(); };
  }, [dark]);
  return <canvas ref={ref} className={"block h-full w-full " + className} aria-hidden="true" />;
}
