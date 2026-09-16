// Reframe the original hero clips to 16:9 with the person in the right third (Luma Ray 3.2 reframe, outpaints the left).
// Run from the project root with FAL_KEY set: node tooling/reframe-hero.js
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const { falRun, download, upload } = require('./fal');
const H = TMP + '/hero';
const SRC_AR = 1212 / 756, OUT_AR = 16 / 9;
const JOBS = [
  ['hero1', 'a137b179d3b526ee8affb8f4930568ab199f2fb8', 0.56, 'The same warm bedroom continues to the left: wooden panelled wall, a soft bedside lamp, the bed with white sheets, warm evening light, nothing else, static camera'],
  ['hero2', 'd7497a6df01e59704d8112a576e2590bfdbe8bab', 0.62, 'The same cosy study continues to the left: plain wall, wooden bookshelves with books, the wooden desk, warm lamp light, nothing else, static camera'],
  ['hero3', '2280befd2e1aad30dca6ffcec7f92046404a6093', 0.75, 'The same bright modern room continues to the left: plain pale wall and a large window with soft daylight, nothing else, static camera'],
];
(async () => {
  await Promise.all(JOBS.map(async ([key, hash, w]) => {
    try {
      const url = await upload(`${H}/old/${hash}-trim.mp4`);
      const h = w * OUT_AR / SRC_AR;
      const r = await falRun('luma/agent/ray/v3.2/reframe', { video_url: url, prompt: JOBS.find((j) => j[0] === key)[3], aspect_ratio: '16:9', resolution: '1080p', source_position: { x_norm: +(1 - w).toFixed(3), y_norm: +((1 - h) / 2).toFixed(3), w_norm: w, h_norm: +h.toFixed(3) } }, { timeoutMs: 1800000 });
      if (!r.video?.url) throw new Error(JSON.stringify(r).slice(0, 400));
      await download(r.video.url, `${H}/${key}-reframed.mp4`); console.log('ok', key);
    } catch (e) { console.log('ERR', key, e.message.slice(0, 500)); }
  }));
})();
