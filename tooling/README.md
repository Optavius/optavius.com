# Tooling

Optional scripts. None of them run during the build. Media scripts talk to fal.ai and need `FAL_KEY` in the environment
(and credit on the account); screenshot scripts need Playwright (`npx playwright install chromium`). Downloads and
intermediates go to a temp folder (`MEDIA_TMP`, default `<os temp>/optavius-media`). Run everything from the project root.

## Build helpers

- `post-export.js`: sets the html `lang` attribute on the Dutch and German pages after `next build` (part of `npm run build:static`).
- `serve-out.js out /optavius 3300`: serves the exported site locally under a base path (`npm run preview`).
- `image-sizes.js`: rebuilds `content/image-sizes.json` (intrinsic width and height for every image in `public/`).
- `webp.js`: converts JPEG photos under `public/optavius/` to WebP and updates the paths in `content/shared.ts`.
- `prune-public.js`: lists and removes files in `public/` that no page references.
- `og.js`: renders the social images in `public/og/` (needs the preview server on port 3300).
- `favicon.js`: renders the favicon set from the logo mark.

## Checks

- `opsweep.js`: opens every page on the preview server and reports console errors, failed requests and broken images (`npm run check`).
- `opshots.js`: full-page screenshots of every page.

## Media (fal.ai)

- `fal.js`: helpers (queue submit and poll, upload, image edit with FLUX Kontext, image-to-video).
- `gen-round4.js`: photoreal stills (FLUX 1.1 ultra, raw) and Veo 3.1 clips for product and specialty pages.
- `gen-hero.js`: hero stills and clips from scratch.
- `restyle-hero.js`: same person, new clothing and room (FLUX Kontext on a frame), then Veo 3.1 clips. `SUF=` names a take,
  `LIVELY=1` asks for continuous motion.
- `retake-hero.js`: Veo retakes with custom prompts (phone kept at the ear, neutral expression).
- `reframe-hero.js`: Luma Ray 3.2 reframe, places a clip's person in the right third by painting more room on the left.
- `edit-video.js`, `sam-masks.js`: SAM2 masks and masked recolouring of a clip.
- `transcribe.js`: ElevenLabs speech-to-text with speaker labels for the demo call recordings.

## Rebuilding a hero clip

Each hero clip is a 4 s wide shot cut to a 5.8 s close-up of the same person, 24 fps, no audio, encoded twice:
1920x1080 with `libx264 -preset slow -tune grain -crf 24`, and 1280x720 with `-crf 27` for phones. A light temporal grain
(`noise=c0s=10:c0f=t+u:c1s=3:c1f=t:c2s=3:c2f=t`) and a slow push-in (`zoompan`) on the wide shot keep the picture alive.
Keep the person in the right third of the frame so the headline stays clear, keep the phone at the ear for the whole clip,
and avoid takes where anyone else enters the frame. Then regenerate `public/media/heroN-poster.jpg` (first frame, 1280 wide)
and the inline thumbnail in `content/shared.ts` (`lqip`: first frame at 32 px wide, blurred, base64 JPEG).
