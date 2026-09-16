// Hero clips: photoreal stills (FLUX 1.1 ultra, raw) with the person in the right third, then Veo 3.1 image-to-video.
// Run from the project root with FAL_KEY set: node tooling/gen-hero.js images|videos  [key ...]
const fs = require('fs'); const { falRun, download, upload } = require('./fal'); const sharp = require('sharp');
const TMP = (process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media') + '/hero'; fs.mkdirSync(TMP, { recursive: true });
const SUF = process.env.SUF || '';
const STYLE = 'Candid documentary photograph, 35mm lens, soft natural light, real skin texture, muted realistic colours, slight film grain, not staged, no text, no logos, no watermark.';
const FRAME = 'Composition: the person is placed in the right third of the frame, face in the upper right quarter, looking slightly off camera. The left two thirds of the frame are a calm, uncluttered, softly lit background with nothing important in them. Horizontal 16:9.';
const STILLS = {
  hero1: 'A young Black woman with long braids sits on the edge of her bed in a warm, tidy bedroom with wooden panelled walls. She wears a plain bordeaux red silk blouse. She is on a hands-free call through a small white wireless earbud clearly visible in her ear; she holds no phone, her hands rest relaxed in her lap, smiling warmly as she listens. The left of the frame shows the warm wooden wall and a soft bedside lamp.',
  hero2: 'A wide shot of a cosy study in the evening: a silver-haired man of about seventy with glasses sits at a wooden desk on the far right side of the room, talking on a cordless phone held to his ear, calm and attentive, seen from the chest up. He wears a dark navy wool jacket over a light shirt. Most of the frame, the whole left side, is the warm room: a glowing desk lamp and a bookshelf softly out of focus, a lot of empty space left of him.',
  hero3: 'A wide shot of a bright modern apartment: a young woman with chin-length brown hair stands at the far right edge of the frame next to a tall window, laughing while talking on her mobile phone held to her ear, seen from the waist up. She wears a plain mustard yellow knit sweater with no stripes or pattern. The left two thirds of the frame are the window and a large plain pale wall with soft daylight, completely empty.',
};
const MOTION = 'Locked-off static camera on a tripod: the framing stays exactly as in the first frame for the whole clip, no pan, no reframing, no camera movement at all. The person stays standing in the same spot on the right side of the frame, does not walk or step, keeps the phone at the ear the whole time. Subtle motion only: she listens and speaks briefly, small natural head movement, a smile, a blink, a small gesture with the free hand. Natural light, realistic, no zoom, no dramatic movement, no one else enters.';
async function still(key) {
  const res = await falRun('fal-ai/flux-pro/v1.1-ultra', { prompt: STILLS[key] + ' ' + FRAME + ' ' + STYLE, aspect_ratio: '16:9', raw: true, num_images: 1, output_format: 'jpeg', safety_tolerance: '2', enable_safety_checker: true });
  const url = res.images?.[0]?.url; if (!url) throw new Error('no image ' + JSON.stringify(res).slice(0, 200));
  await download(url, `${TMP}/${key}${SUF}-raw.jpg`); await sharp(`${TMP}/${key}${SUF}-raw.jpg`).resize(1920, 1080, { fit: 'cover' }).jpeg({ quality: 90 }).toFile(`${TMP}/${key}${SUF}.jpg`); console.log('img ok', key);
}
async function video(key) {
  const url = await upload(`${TMP}/${key}.jpg`);
  const res = await falRun('fal-ai/veo3.1/image-to-video', { prompt: MOTION, image_url: url, aspect_ratio: '16:9', duration: '8s', resolution: '1080p', generate_audio: false }, { timeoutMs: 1200000 });
  const out = res.video?.url; if (!out) throw new Error('no video ' + JSON.stringify(res).slice(0, 200));
  await download(out, `${TMP}/${key}-raw.mp4`); console.log('video ok', key);
}
(async () => {
  const [job, ...keys] = process.argv.slice(2); const list = keys.length ? keys : Object.keys(STILLS);
  await Promise.all(list.map((k) => (job === 'videos' ? video(k) : still(k)).catch((e) => console.log('ERR', k, e.message.slice(0, 300)))));
})();
