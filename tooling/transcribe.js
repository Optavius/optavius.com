// Transcribe the demo recordings with speaker labels (ElevenLabs Scribe via fal). Run from the project root with FAL_KEY set.
/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const fs = require('fs'); const { falRun, upload } = require('./fal');
(async () => {
  for (const [lang, code] of [['en', 'eng'], ['nl', 'nld']]) {
    const url = await upload(`public/optavius/demo-call-${lang}.mp3`);
    const res = await falRun('fal-ai/elevenlabs/speech-to-text', { audio_url: url, language_code: code, diarize: true, tag_audio_events: false });
    fs.writeFileSync(`${TMP}/transcript-${lang}.json`, JSON.stringify(res, null, 1));
    const words = (res.words || []).filter((w) => w.type === 'word' || !w.type);
    const lines = []; let cur = null;
    for (const w of words) { if (!cur || cur.speaker !== w.speaker_id) { cur = { speaker: w.speaker_id, at: w.start, text: w.text }; lines.push(cur); } else cur.text += ' ' + w.text; }
    console.log('=== ' + lang, 'speakers:', [...new Set(words.map((w) => w.speaker_id))].join(','));
    for (const l of lines) console.log(String(Math.round(l.at)).padStart(3), l.speaker, l.text.replace(/\s+([,.?!])/g, '$1'));
  }
})().catch((e) => console.log('ERR', e.message.slice(0, 400)));
