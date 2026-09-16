// Round 4 media: photoreal stills (FLUX 1.1 ultra, raw mode) and Veo 3.1 image-to-video clips.
// Run from the project root with FAL_KEY set: node tooling/gen-round4.js [images|videos|all]
const fs = require('fs'); const path = require('path');
const { falRun, download, upload } = require('./fal');
const sharp = require('sharp');
const P = 'public/optavius';
const G = P + '/gen'; const TMP = (process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media'); fs.mkdirSync(TMP, { recursive: true });
const DONE = G + '/done4.json'; const done = fs.existsSync(DONE) ? JSON.parse(fs.readFileSync(DONE, 'utf8')) : {};
const mark = (k) => { done[k] = true; fs.writeFileSync(DONE, JSON.stringify(done)); };

const STYLE = 'Candid documentary photograph, shot on a 35mm lens, soft natural window light, real skin texture and pores, natural imperfect details, muted realistic colours, slight film grain, not staged, no text, no logos, no watermark.';
const STILLS = [
  ['product-frontdesk', 'Reception desk of a real modern eye clinic. A receptionist in her forties helps a patient in person, both looking at a form together, relaxed. In the foreground a desk phone sits quiet. Frames displayed on the wall behind, waiting area out of focus.'],
  ['spec2-ophthalmology', 'An ophthalmologist in her fifties examines a patient at a slit lamp in a real hospital eye clinic, room slightly dim, equipment lights, patient with chin on the rest, seen from the side.'],
  ['spec2-optometry', 'An optician in his thirties adjusts a pair of glasses on a customer in front of a mirror in a small independent optical store, wooden shelves of frames, daylight from the shop window.'],
  ['spec2-dermatology', 'A dermatologist wearing a plain dark blue scrub top, no coat, no name tag, examines the forearm of a seated patient with a handheld dermatoscope in a bright, plain consultation room, close and calm, seen from the side.'],
  ['spec2-veterinary', 'A veterinary clinic reception: a receptionist behind the counter talks with a dog owner holding a small terrier, another client waiting, everyday clinic, natural light.'],
  ['story-omc', 'Waiting area and reception of a modern Dutch eye clinic in the morning, a few patients seated, a receptionist behind the desk, large windows, light wood and white walls, wide shot.'],
  ['story-cubitts', 'Inside a small independent London eyewear store: a shop assistant helps a customer try on tortoiseshell frames at a mirror, wooden display shelves with spectacles, warm daylight, wide shot.'],
];
const VIDEOS = ['product-frontdesk', 'spec2-ophthalmology', 'spec2-optometry', 'spec2-dermatology', 'spec2-veterinary'];
const MOTION = 'Subtle documentary motion. The people move naturally and slightly, small hand gestures and glances, one person speaks briefly. The camera is almost still with a very slow handheld drift. Natural light, realistic, no zoom, no dramatic movement.';

async function still(key, scene) {
  if (done[key]) return;
  const res = await falRun('fal-ai/flux-pro/v1.1-ultra', { prompt: scene + ' ' + STYLE, aspect_ratio: '16:9', raw: true, num_images: 1, output_format: 'jpeg', safety_tolerance: '2', enable_safety_checker: true });
  const url = res.images?.[0]?.url; if (!url) throw new Error('no image ' + JSON.stringify(res).slice(0, 200));
  const tmp = `${TMP}/${key}-raw.jpg`; await download(url, tmp);
  await sharp(tmp).resize(1920, 1080, { fit: 'cover' }).jpeg({ quality: 88 }).toFile(`${TMP}/${key}.jpg`);
  fs.copyFileSync(`${TMP}/${key}.jpg`, `${G}/${key}.jpg`); mark(key); console.log('img ok', key);
}
async function video(key) {
  const vk = key + '-video'; if (done[vk]) return;
  const src = `${TMP}/${key}.jpg`; if (!fs.existsSync(src)) fs.copyFileSync(`${G}/${key}.jpg`, src);
  const url = await upload(src);
  const res = await falRun('fal-ai/veo3.1/image-to-video', { prompt: MOTION, image_url: url, aspect_ratio: '16:9', duration: '8s', resolution: '1080p', generate_audio: false }, { timeoutMs: 1200000 });
  const out = res.video?.url; if (!out) throw new Error('no video ' + JSON.stringify(res).slice(0, 200));
  const tmp = `${TMP}/${key}.mp4`; await download(out, tmp); fs.copyFileSync(tmp, `${G}/${key}-video.mp4`); mark(vk); console.log('video ok', key);
}
(async () => {
  const job = process.argv[2] || 'all';
  if (job === 'all' || job === 'images') for (const [k, s] of STILLS) { try { await still(k, s); } catch (e) { console.log('ERR', k, e.message.slice(0, 300)); } }
  if (job === 'all' || job === 'videos') for (const k of VIDEOS) { try { await video(k); } catch (e) { console.log('ERR', k, e.message.slice(0, 300)); } }
  console.log('done');
})();
