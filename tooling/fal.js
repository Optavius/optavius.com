// fal.ai helpers: image edit (keep composition, new person) and image-to-video. Node 24 (global fetch).
const fs = require('fs'); const path = require('path');
const KEY = process.env.FAL_KEY;
const sharp = require('sharp');
const TMP = (process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media'); fs.mkdirSync(TMP, { recursive: true });
let seq = 0; const tmpName = (ext) => path.join(TMP, 't' + Date.now() + '_' + (seq++) + ext);

async function falRun(model, input, { timeoutMs = 600000 } = {}) {
  // submit to queue, poll
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`submit ${model} ${sub.status} ${await sub.text()}`);
  const { request_id, status_url, response_url } = await sub.json();
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const st = await fetch(status_url, { headers: { Authorization: `Key ${KEY}` } });
    const js = await st.json();
    if (js.status === 'COMPLETED') { const r = await fetch(response_url, { headers: { Authorization: `Key ${KEY}` } }); return await r.json(); }
    if (js.status === 'FAILED' || js.error) throw new Error(`failed ${model} ${JSON.stringify(js).slice(0, 300)}`);
    await new Promise(r => setTimeout(r, 2500));
  }
  throw new Error('timeout ' + model);
}

async function upload(localPath) {
  // fal storage upload: initiate -> PUT -> file url
  const name = path.basename(localPath); const buf = fs.readFileSync(localPath);
  const ext = path.extname(name).toLowerCase(); const type = ext === '.png' ? 'image/png' : ext === '.mp4' ? 'video/mp4' : 'image/jpeg';
  const init = await fetch('https://rest.alpha.fal.ai/storage/upload/initiate?storage_type=fal-cdn-v3', { method: 'POST', headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ file_name: name, content_type: type }) });
  if (!init.ok) throw new Error('upload init ' + init.status + ' ' + await init.text());
  const { upload_url, file_url } = await init.json();
  const put = await fetch(upload_url, { method: 'PUT', headers: { 'Content-Type': type }, body: buf });
  if (!put.ok) throw new Error('upload put ' + put.status);
  return file_url;
}

async function download(url, dest) { const r = await fetch(url); if (!r.ok) throw new Error('download ' + r.status); fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer())); return dest; }

/** Edit an image keeping composition; result resized to the original's exact pixel size and format. */
async function editImage(srcPath, prompt, destPath, { model = 'fal-ai/flux-pro/kontext', guidance = 2.5 } = {}) {
  const local = tmpName(path.extname(srcPath).toLowerCase() || '.jpg'); fs.copyFileSync(srcPath, local);
  const meta = await sharp(local).metadata();
  let up = local; if (meta.width > 2048 || meta.height > 2048) { up = tmpName('.jpg'); await sharp(local).resize({ width: 2048, height: 2048, fit: 'inside' }).jpeg({ quality: 92 }).toFile(up); }
  const url = await upload(up);
  const input = model.includes('kontext') ? { prompt, image_url: url, guidance_scale: guidance, num_images: 1, safety_tolerance: '2', output_format: 'jpeg' } : { prompt, image_urls: [url], num_images: 1, output_format: 'jpeg' };
  const res = await falRun(model, input);
  const out = res.images?.[0]?.url; if (!out) throw new Error('no image ' + JSON.stringify(res).slice(0, 200));
  const tmp = tmpName('.jpg'); await download(out, tmp);
  const ext = path.extname(destPath).toLowerCase(); const fin = tmpName(ext);
  let pipe = sharp(tmp).resize(meta.width, meta.height, { fit: 'cover' });
  if (ext === '.png') pipe = pipe.png(); else if (ext === '.webp') pipe = pipe.webp({ quality: 88 }); else pipe = pipe.jpeg({ quality: 88 });
  await pipe.toFile(fin); fs.copyFileSync(fin, destPath);
  for (const f of [local, up, tmp, fin]) { try { if (f !== local || true) fs.unlinkSync(f); } catch {} }
  return destPath;
}

/** Image -> short video (mp4). */
async function imageToVideo(imagePath, prompt, destPath, { model = 'fal-ai/kling-video/v2.1/standard/image-to-video', duration = '5', aspect } = {}) {
  const local = tmpName(path.extname(imagePath).toLowerCase() || '.jpg'); fs.copyFileSync(imagePath, local);
  const url = await upload(local);
  const input = { prompt, image_url: url, duration, negative_prompt: 'blur, distort, low quality, text, watermark, extra limbs' };
  if (aspect) input.aspect_ratio = aspect;
  const res = await falRun(model, input, { timeoutMs: 900000 });
  const out = res.video?.url; if (!out) throw new Error('no video ' + JSON.stringify(res).slice(0, 200));
  const tmp = tmpName('.mp4'); await download(out, tmp); fs.copyFileSync(tmp, destPath); fs.unlinkSync(tmp); fs.unlinkSync(local); return destPath;
}

module.exports = { falRun, upload, editImage, imageToVideo, download };
