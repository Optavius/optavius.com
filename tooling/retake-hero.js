// Retakes with custom motion prompts. Run from the project root with FAL_KEY set: node tooling/retake-hero.js
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const { falRun, download, upload } = require('./fal');
const H = TMP + '/hero/edit';
const BASE = 'Locked-off static camera on a tripod with only a very slow, gentle handheld drift: the framing stays as in the first frame, no pan, no zoom. The person stays in the same spot. ';
const JOBS = [
  ['hero2-editlive.jpg', 'hero2-rawcalm.mp4', BASE + 'The man is on a phone call and keeps the phone pressed to his ear for the entire clip; he never lowers it, never puts it down, never takes his hand away from his ear. His expression is calm, attentive and neutral: no laughing, no big smile, at most a faint polite smile. Continuous subtle motion: he listens, speaks briefly with visible lip movement, gives small nods, shifts slightly; the free hand rests on the table and moves a little. No still frames.'],
  ['hero2-editclose.jpg', 'hero2-rawcalmc.mp4', BASE + 'Close-up: the man keeps the phone pressed to his ear for the entire clip; he never lowers it or puts it down. His expression is calm, attentive and neutral: no laughing, no big smile, at most a faint polite smile. Continuous subtle motion: listening, speaking briefly with visible lip movement, small nods, small head movements, blinks. No still frames.'],
  ['hero3-editclose2.jpg', 'hero3-rawkeepc.mp4', BASE + 'Close-up: the young woman keeps the phone pressed to her ear for the entire clip; she never lowers it, never puts it down, never takes her hand away from her ear, right to the last frame. Lively natural conversation: she talks with visible lip movement, smiles, nods, gestures a little with her free hand, shifts her weight. No still frames.'],
];
(async () => { await Promise.all(JOBS.map(async ([img, out, prompt]) => { try {
  const url = await upload(`${H}/${img}`);
  const r = await falRun('fal-ai/veo3.1/image-to-video', { prompt, image_url: url, aspect_ratio: '16:9', duration: '8s', resolution: '1080p', generate_audio: false }, { timeoutMs: 1500000 });
  if (!r.video?.url) throw new Error(JSON.stringify(r).slice(0, 300)); await download(r.video.url, `${H}/${out}`); console.log('ok', out);
} catch (e) { console.log('ERR', out, e.message.slice(0, 300)); } })); })();
