// Step 1: shirt masks with SAM 2 (point prompts on frame 0, 1212x756 video). Run from the project root with FAL_KEY set.
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const fs = require('fs'); const { falRun, upload, download } = require('./fal');
const S = TMP;
const JOBS = [
  ['hero3', [[505, 580, 1], [303, 606, 1], [707, 593, 1], [505, 700, 1], [400, 470, 1], [600, 470, 1], [505, 455, 1], [543, 303, 0], [757, 379, 0], [400, 380, 0]]],
];
(async () => {
  for (const [k, pts] of JOBS) {
    try {
      const url = await upload(`${S}/${k}-trim.mp4`);
      const res = await falRun('fal-ai/sam2/video', { video_url: url, prompts: pts.map(([x, y, label]) => ({ x, y, label, frame_index: 0 })), apply_mask: false }, { timeoutMs: 1500000 });
      const out = res.video?.url; if (!out) throw new Error('no video ' + JSON.stringify(res).slice(0, 300));
      await download(out, `${S}/${k}-mask.mp4`); fs.writeFileSync(`${S}/${k}-mask.url`, out); console.log('mask ok', k, out);
    } catch (e) { console.log('ERR', k, e.message.slice(0, 300)); }
  }
  console.log('done');
})();
