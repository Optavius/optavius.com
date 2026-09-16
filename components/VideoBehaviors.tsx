"use client";
import { useEffect } from "react";

/**
 * Re-creates the source site's video behaviours for statically rendered sections:
 *  - looping muted videos inside a hover "group" (industry cards, logo grids) play on hover, pause on leave
 *  - looping muted videos with autoplay play when visible
 */
export default function VideoBehaviors() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>("main video[loop]"));
    for (const v of vids) {
      if (v.closest("header")) continue; // hero handled by its own component
      v.muted = true;
      const group = v.closest("a.group, .group, article, li");
      if (!v.autoplay && group) {
        const enter = () => {
          const p = v.play();
          if (p) p.catch(() => {});
        };
        const leave = () => {
          v.pause();
        };
        group.addEventListener("mouseenter", enter);
        group.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          group.removeEventListener("mouseenter", enter);
          group.removeEventListener("mouseleave", leave);
        });
      } else if (v.autoplay) {
        const io = new IntersectionObserver((es) => {
          for (const e of es) {
            if (e.isIntersecting) {
              const p = v.play();
              if (p) p.catch(() => {});
            } else v.pause();
          }
        });
        io.observe(v);
        cleanups.push(() => io.disconnect());
      }
    }
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
