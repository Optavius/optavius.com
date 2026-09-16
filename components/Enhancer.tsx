"use client";
import { useEffect } from "react";

/**
 * Progressive behaviours for statically generated sections:
 *  - accordions: button[aria-expanded][aria-controls] with a height-animated region
 *  - media play/pause buttons ("Play video" / "Pause video") controlling the nearest video
 *  - "Show more" toggles for bento paragraphs (mobile)
 */
export default function Enhancer() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const on = (el: Element, ev: string, fn: (e: Event) => void) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    // accordions
    document.querySelectorAll<HTMLButtonElement>("main button[aria-expanded][aria-controls]").forEach((btn) => {
      const region = document.getElementById(btn.getAttribute("aria-controls") || "");
      if (!region || region.getAttribute("role") !== "region") return;
      const chevron = btn.querySelector<SVGElement>('svg[aria-label="Chevron"]');
      region.style.transition = "height .35s cubic-bezier(.4,0,.2,1)";
      const setOpen = (open: boolean) => {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (chevron) chevron.classList.toggle("rotate-180", open);
        if (open) {
          region.style.height = region.scrollHeight + "px";
          const done = () => {
            if (btn.getAttribute("aria-expanded") === "true") region.style.height = "auto";
            region.removeEventListener("transitionend", done);
          };
          region.addEventListener("transitionend", done);
        } else {
          region.style.height = region.scrollHeight + "px";
          requestAnimationFrame(() => requestAnimationFrame(() => (region.style.height = "0px")));
        }
      };
      on(btn, "click", (e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        const open = btn.getAttribute("aria-expanded") !== "true";
        // exclusive within the same group
        const group = btn.parentElement;
        group?.querySelectorAll<HTMLButtonElement>('button[aria-expanded="true"][aria-controls]').forEach((other) => {
          if (other !== btn) {
            const r = document.getElementById(other.getAttribute("aria-controls") || "");
            other.setAttribute("aria-expanded", "false");
            other.querySelector('svg[aria-label="Chevron"]')?.classList.remove("rotate-180");
            if (r) {
              r.style.height = r.scrollHeight + "px";
              requestAnimationFrame(() => requestAnimationFrame(() => (r.style.height = "0px")));
            }
          }
        });
        setOpen(open);
      });
    });

    // play / pause buttons for background videos
    document.querySelectorAll<HTMLButtonElement>('main button[aria-label="Play video"], main button[aria-label="Pause video"]').forEach((btn) => {
      const scope = btn.closest(".media-container, .video-bg, figure, .relative") || btn.parentElement;
      const video = scope?.querySelector("video") || btn.closest("section")?.querySelector("video");
      if (!video) return;
      on(btn, "click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          const p = video.play();
          if (p) p.catch(() => {});
          btn.setAttribute("aria-label", "Pause video");
        } else {
          video.pause();
          btn.setAttribute("aria-label", "Play video");
        }
      });
    });

    // tabs (all panels are rendered; toggle visibility + tab visual state)
    document.querySelectorAll<HTMLElement>("main [role=tablist][data-tabgroup]").forEach((list) => {
      const gid = list.getAttribute("data-tabgroup");
      const tabs = Array.from(list.querySelectorAll<HTMLElement>("[role=tab]"));
      const panels = Array.from(document.querySelectorAll<HTMLElement>(`main [role=tabpanel][data-tabgroup="${gid}"]`));
      const select = (idx: number) => {
        tabs.forEach((t, i) => {
          const on = i === idx;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          t.querySelector<HTMLElement>('[data-tab-state="selected"]')!.hidden = !on;
          t.querySelector<HTMLElement>('[data-tab-state="unselected"]')!.hidden = on;
        });
        panels.forEach((p, i) => {
          p.hidden = i !== idx;
          if (i === idx) p.querySelectorAll<HTMLVideoElement>("video[loop][muted], video[autoplay]").forEach((v) => v.play().catch(() => {}));
          else p.querySelectorAll("video").forEach((v) => v.pause());
        });
      };
      tabs.forEach((t, i) => on(t, "click", () => select(i)));
    });

    // custom video player controls (Unmute / Fullscreen / progress slider)
    document.querySelectorAll<HTMLElement>("main [data-video-player]").forEach((wrap) => {
      const video = wrap.querySelector("video");
      const scope = wrap.closest(".media-container, .video-bg")?.parentElement || wrap.parentElement;
      if (!video || !scope) return;
      const mute = scope.querySelector<HTMLButtonElement>('button[aria-label="Unmute audio"], button[aria-label="Mute audio"]');
      const full = scope.querySelector<HTMLButtonElement>('button[aria-label="Make fullscreen"]');
      const slider = scope.querySelector<HTMLElement>("[role=slider]");
      const bar = slider?.children[1] as HTMLElement | undefined;
      const cover = scope.querySelector<HTMLButtonElement>('button[aria-hidden="true"].absolute');
      const playBtn = scope.querySelector<HTMLButtonElement>('button[aria-label="Play video"], button[aria-label="Pause video"]');
      if (mute)
        on(mute, "click", (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          mute.setAttribute("aria-label", video.muted ? "Unmute audio" : "Mute audio");
        });
      if (full)
        on(full, "click", (e) => {
          e.stopPropagation();
          (video.requestFullscreen || (video as any).webkitEnterFullscreen)?.call(video);
        });
      if (cover)
        on(cover, "click", () => {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
          playBtn?.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
        });
      if (slider) {
        on(slider, "click", (e) => {
          const r = slider.getBoundingClientRect();
          const f = Math.min(1, Math.max(0, ((e as MouseEvent).clientX - r.left) / r.width));
          if (video.duration) video.currentTime = f * video.duration;
        });
        on(video, "timeupdate", () => {
          if (!video.duration) return;
          const pct = (video.currentTime / video.duration) * 100;
          if (bar) bar.style.width = pct + "%";
          slider.setAttribute("aria-valuenow", String(video.currentTime));
          slider.setAttribute("aria-valuemax", String(video.duration));
        });
      }
    });

    // Horizon "moments" timeline: play back the recorded discrete states of the scripted animation
    document.querySelectorAll<HTMLElement>('main [role=tabpanel][data-tabgroup^="product-horizon"]').forEach((panel) => {
      const idx = panel.getAttribute("data-tab-index");
      let frames: { t: number; html: string }[] | null = null;
      let timer: ReturnType<typeof setTimeout> | null = null;
      let fi = 0;
      let paused = false;
      const wire = () => {
        const pauseBtn = panel.querySelector<HTMLButtonElement>('button[aria-label="Pause timeline"], button[aria-label="Play timeline"]');
        pauseBtn?.addEventListener("click", () => {
          paused = !paused;
          pauseBtn.setAttribute("aria-label", paused ? "Play timeline" : "Pause timeline");
          if (!paused) schedule();
        });
        const step = (dir: number) => {
          if (!frames) return;
          const n = frames.length;
          const jump = Math.max(1, Math.round(n / 4));
          show((fi + dir * jump + n) % n);
          schedule();
        };
        panel.querySelector<HTMLButtonElement>('button[aria-label="Previous moment"]')?.addEventListener("click", () => step(-1));
        panel.querySelector<HTMLButtonElement>('button[aria-label="Next moment"]')?.addEventListener("click", () => step(1));
      };
      // the original pins the timeline root to the tallest frame's height (measured per viewport width)
      let minH = 0;
      let measuredW = 0;
      const measure = () => {
        if (!frames || measuredW === panel.clientWidth) return;
        measuredW = panel.clientWidth;
        const probe = document.createElement("div");
        probe.style.cssText = `position:absolute;left:-99999px;top:0;width:${panel.clientWidth}px;visibility:hidden;pointer-events:none`;
        probe.className = panel.className;
        (panel.parentElement || document.body).appendChild(probe);
        let max = 0;
        for (const f of frames) {
          probe.innerHTML = f.html;
          const root = probe.querySelector<HTMLElement>('[style*="--moment-count"][style*="min-height"]');
          if (root) {
            root.style.minHeight = "0px";
            max = Math.max(max, root.scrollHeight);
          }
        }
        probe.remove();
        minH = max;
      };
      const applyMinH = () => {
        const root = panel.querySelector<HTMLElement>('[style*="--moment-count"][style*="min-height"]');
        if (root && minH) root.style.minHeight = minH + "px";
      };
      const show = (i: number) => {
        if (!frames) return;
        fi = i % frames.length;
        panel.innerHTML = frames[fi].html;
        applyMinH();
        wire();
      };
      let resizeT: ReturnType<typeof setTimeout> | null = null;
      const onResize = () => {
        if (resizeT) clearTimeout(resizeT);
        resizeT = setTimeout(() => {
          measure();
          applyMinH();
        }, 150);
      };
      window.addEventListener("resize", onResize);
      cleanups.push(() => window.removeEventListener("resize", onResize));
      const schedule = () => {
        if (!frames || paused || panel.hidden) return;
        const cur = frames[fi];
        const next = frames[(fi + 1) % frames.length];
        const delay = fi + 1 < frames.length ? next.t - cur.t : 2500;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          show(fi + 1);
          schedule();
        }, Math.max(150, delay));
      };
      const start = () => {
        if (frames) {
          schedule();
          return;
        }
        fetch(`/moments/horizon-${idx}.json`)
          .then((r) => r.json())
          .then((f) => {
            frames = f;
            measure();
            applyMinH();
            wire();
            schedule();
          })
          .catch(() => {});
      };
      const io = new IntersectionObserver((es) => {
        for (const e of es) {
          if (e.isIntersecting && !panel.hidden) start();
          else if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      });
      io.observe(panel);
      const mo = new MutationObserver(() => {
        if (panel.hidden) {
          if (timer) clearTimeout(timer);
          timer = null;
        } else start();
      });
      mo.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
      cleanups.push(() => {
        io.disconnect();
        mo.disconnect();
        if (timer) clearTimeout(timer);
      });
    });

    // search pills that expand on focus (blog / resources sub-nav)
    document.querySelectorAll<HTMLElement>("main [data-subnav-pill-expand-on-focus]").forEach((wrap) => {
      const box = wrap.querySelector<HTMLElement>("div.overflow-hidden.rounded-full");
      const input = wrap.querySelector<HTMLInputElement>("input[type=search]");
      const open = wrap.querySelector<HTMLButtonElement>("button[aria-label^=Search]");
      const clear = wrap.querySelector<HTMLButtonElement>('button[aria-label="Clear search"]');
      if (!box || !input) return;
      const expand = () => {
        box.style.transition = "width .3s cubic-bezier(.4,0,.2,1)";
        box.style.width = "100%";
        input.removeAttribute("inert");
        input.readOnly = false;
        input.tabIndex = 0;
        input.focus();
      };
      const collapse = () => {
        if (input.value) return;
        box.style.width = "46px";
        input.readOnly = true;
        input.tabIndex = -1;
      };
      if (open) on(open, "click", expand);
      on(input, "blur", collapse);
      on(input, "input", () => input.closest("[data-empty]")?.setAttribute("data-empty", input.value ? "false" : "true"));
      if (clear)
        on(clear, "click", () => {
          input.value = "";
          input.closest("[data-empty]")?.setAttribute("data-empty", "true");
          input.focus();
        });
    });
    // search inputs: keep the empty-state attribute in sync (shows/hides the clear button)
    document.querySelectorAll<HTMLInputElement>("main [data-empty] input[type=search]").forEach((input) => {
      on(input, "input", () => input.closest("[data-empty]")?.setAttribute("data-empty", input.value ? "false" : "true"));
      const clear = input.closest("[data-empty]")?.querySelector<HTMLButtonElement>('button[aria-label="Clear search"]');
      if (clear)
        on(clear, "click", () => {
          input.value = "";
          input.closest("[data-empty]")?.setAttribute("data-empty", "true");
          input.focus();
        });
    });

    // custom selects (react-aria style): button[aria-haspopup=listbox] + hidden native select
    document.querySelectorAll<HTMLButtonElement>("main button[aria-haspopup=listbox]").forEach((btn) => {
      const field = btn.parentElement;
      const native = field?.querySelector("select");
      const label = btn.querySelector<HTMLElement>("span[data-placeholder], span.text-body-sm");
      if (!field || !native || !label) return;
      let list: HTMLUListElement | null = null;
      const close = () => {
        list?.remove();
        list = null;
        btn.setAttribute("aria-expanded", "false");
        btn.removeAttribute("data-pressed");
      };
      on(btn, "click", (e) => {
        e.stopPropagation();
        if (list) return close();
        btn.setAttribute("aria-expanded", "true");
        btn.setAttribute("data-pressed", "true");
        list = document.createElement("ul");
        list.setAttribute("role", "listbox");
        list.className = "absolute top-full left-0 z-50 mt-2 max-h-72 w-full min-w-[256px] overflow-y-auto rounded-lg border border-primary bg-white p-2 shadow-lg";
        Array.from(native.options)
          .filter((o) => o.textContent && o.textContent.trim())
          .forEach((o) => {
            const li = document.createElement("li");
            li.setAttribute("role", "option");
            li.className = "cursor-pointer rounded-md px-3 py-2 text-body-sm text-secondary hover:bg-surface-secondary-50 hover:text-primary";
            li.textContent = o.textContent!.trim();
            li.addEventListener("click", () => {
              native.value = o.value;
              label.textContent = o.textContent!.trim();
              label.removeAttribute("data-placeholder");
              native.dispatchEvent(new Event("change", { bubbles: true }));
              close();
            });
            list!.appendChild(li);
          });
        field.style.position = "relative";
        field.appendChild(list);
        const onDoc = (ev: MouseEvent) => {
          if (!field.contains(ev.target as Node)) {
            close();
            document.removeEventListener("mousedown", onDoc);
          }
        };
        document.addEventListener("mousedown", onDoc);
      });
    });

    // "Show more" (mobile bento description toggles)
    document.querySelectorAll<HTMLButtonElement>('main button[aria-label="Show more"][aria-controls]').forEach((btn) => {
      const target = document.getElementById(btn.getAttribute("aria-controls") || "");
      if (!target) return;
      on(btn, "click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.classList.toggle("rotate-45", open);
        target.classList.toggle("opacity-0", !open);
        target.classList.toggle("opacity-100", open);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
