// Recolour the shirts in the two hero videos with Luma Modify (keeps motion and scene). Run from the project root with FAL_KEY set.
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const fs = require('fs'); const { falRun, upload, download } = require('./fal');
const JOBS = [
  [TMP + '/hero1-trim.mp4', 'public/media/hero1-green.mp4', 'Change only the colour of the woman\'s cream button-up shirt to a deep forest green shirt of the same fabric and cut. Keep her face, hair, skin, the room, the lighting, the camera and every movement exactly the same.'],
  [TMP + '/hero3-trim.mp4', 'public/media/hero3-green.mp4', 'Change only the woman\'s red and white striped polo shirt into a plain soft sage green polo shirt with the same collar and fit. Keep her face, hair, the phone, the window, the lighting, the camera and every movement exactly the same.'],
];
(async () => {
  for (const [src, dst, prompt] of JOBS) {
    try { const url = await upload(src); const res = await falRun('fal-ai/luma-dream-machine/ray-2/modify', { video_url: url, prompt, mode: 'adhere_3' }, { timeoutMs: 1500000 });
      const out = res.video?.url; if (!out) throw new Error('no video ' + JSON.stringify(res).slice(0, 200)); await download(out, dst); console.log('ok', dst); }
    catch (e) { console.log('ERR', dst, e.message.slice(0, 300)); }
  }
  console.log('done');
})();
