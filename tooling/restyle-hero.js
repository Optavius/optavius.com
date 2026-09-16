// Restyle the hero/product clips: same person, new clothing colour/fabric and a different room (FLUX Kontext max on a frame),
// then Veo 3.1 image-to-video with the usual motion prompt. Run from the project root with FAL_KEY set:
//   node tooling/restyle-hero.js edits [key ...]   |   node tooling/restyle-hero.js videos [key ...]
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const fs = require('fs'); const { falRun, download, upload, editImage } = require('./fal');
const H = TMP + '/hero/edit'; const SUF = process.env.SUF || '';
const KEEP = ' Keep the person exactly the same: same face, hair, skin, pose, hands, expression, position in the frame and camera angle. Photorealistic, natural light, no text.';
const EDITS = {
  hero1: 'Change her pale yellow blouse into a deep bordeaux red blouse of the same cut. Put a small white wireless earbud in her visible ear. Replace the wooden panelled bedroom with a bright living room: plain off-white wall, a light grey linen sofa she is sitting on, a tall green plant and a paper floor lamp on the left.' + KEEP,
  hero2: 'Change his blue denim shirt into a dark olive green corduroy overshirt. Replace the study with a calm home office: plain sage green wall, a framed picture and a leafy plant on the left, a lighter oak desk, soft daylight from a window on the left instead of the desk lamp.' + KEEP,
  hero3: 'Change her red and white striped polo shirt into a plain navy blue polo shirt. Replace the room with a modern kitchen: light oak cabinets, a white tiled wall and a small plant on the counter, soft daylight from the left. She must stay exactly where she is in the frame, on the right-hand side, at the same size; the empty part of the frame stays on the left.' + KEEP,
  insights: 'Change her red and white striped polo shirt into a plain forest green polo shirt. Replace the cream boucle sofa and pink cushion with a terracotta velvet sofa and a plain white wall, a small plant on the left.' + KEEP,
};
const LIVELY = process.env.LIVELY ? ' Continuous, lively motion for the whole clip: the person is mid-conversation and never holds still, talking with visible lip movement, nodding, smiling, shifting weight, moving the free hand; a slow, gentle handheld camera drift throughout, so no frame is ever static. No freeze, no pause, no still frames.' : '';
const MOTION = 'Locked-off static camera on a tripod: the framing stays exactly as in the first frame for the whole clip, no pan, no reframing, no camera movement at all. The person stays in the same spot. Subtle documentary motion only: the person listens and speaks briefly on the call, small natural head movement, a smile, a blink, a small hand gesture. Natural light, realistic, no zoom, no dramatic movement, no one else enters.';
const EXTRA = { hero3: ' She keeps the phone at her ear for the whole clip and never puts it down.', hero2: ' He keeps the phone at his ear for the whole clip and never puts it down.', hero1: ' She is on a hands-free call through her earbud and holds no phone.', insights: ' She looks at her phone and smiles, occasionally glancing up.' };
(async () => {
  const [job, ...keys] = process.argv.slice(2); const list = keys.length ? keys : Object.keys(EDITS);
  await Promise.all(list.map(async (k) => { try {
    if (job === 'edits') { await editImage(`${H}/${k}-base.jpg`, EDITS[k], `${H}/${k}-edit${SUF}.jpg`, { model: 'fal-ai/flux-pro/kontext/max', guidance: 3 }); console.log('edit ok', k); }
    else { const url = await upload(`${H}/${k}-edit${SUF}.jpg`);
      const r = await falRun('fal-ai/veo3.1/image-to-video', { prompt: MOTION + (EXTRA[k] || '') + LIVELY, image_url: url, aspect_ratio: '16:9', duration: '8s', resolution: '1080p', generate_audio: false }, { timeoutMs: 1500000 });
      if (!r.video?.url) throw new Error(JSON.stringify(r).slice(0, 300)); await download(r.video.url, `${H}/${k}-raw${SUF}.mp4`); console.log('video ok', k); }
  } catch (e) { console.log('ERR', k, e.message.slice(0, 400)); } }));
})();
