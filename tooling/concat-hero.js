// Merges the three home-hero clips into one file per size, with a 0.5 s cross-fade between them, because iOS only reliably
// plays a single video per page. Run from the project root after a clip changes:
//   node tooling/concat-hero.js [path-to-ffmpeg]
// Inputs: public/media/hero1.mp4, hero2.mp4, hero3.mp4 (1920x1080, 24 fps, 9.792 s) and the -720 variants.
// Outputs: public/media/hero.mp4 and hero-720.mp4 (28.417 s). If the clip length or the fade changes, update SEGMENTS,
// BUBBLE_TIMES and TOTAL in components/home/Hero.tsx: a conversation starts at the middle of its cross-fade.
const { execFileSync } = require("child_process");
const ffmpeg = process.argv[2] || "ffmpeg";
const FADE = 0.5, LEN = 9.792;
const o1 = (LEN - FADE).toFixed(3), o2 = (2 * LEN - 2 * FADE).toFixed(3);
const filter = `[0:v][1:v]xfade=transition=fade:duration=${FADE}:offset=${o1}[v01];[v01][2:v]xfade=transition=fade:duration=${FADE}:offset=${o2},format=yuv420p[v]`;
for (const [suffix, crf, level] of [["", 24, "4.0"], ["-720", 27, "3.1"]]) {
  const ins = [1, 2, 3].flatMap((i) => ["-i", `public/media/hero${i}${suffix}.mp4`]);
  execFileSync(ffmpeg, ["-y", "-v", "error", ...ins, "-filter_complex", filter, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-tune", "grain", "-crf", String(crf), "-profile:v", "high", "-level", level, "-g", "48", "-keyint_min", "48", "-sc_threshold", "0", "-movflags", "+faststart", `public/media/hero${suffix}.mp4`], { stdio: "inherit" });
  console.log("wrote public/media/hero" + suffix + ".mp4");
}
console.log(`segments start at 0, ${(Number(o1) + FADE / 2).toFixed(3)}, ${(Number(o2) + FADE / 2).toFixed(3)} s`);
