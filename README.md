# Optavius website

Marketing site for Optavius (AI voice agents for specialty care) in English, Dutch and German. Built with Next.js 16
(App Router), React and TypeScript and exported as **static HTML**: there is no server runtime, no API and no database.
Any static host can serve the `out/` folder.

Live preview: https://ppleeuw.github.io/optavius/ (GitHub Pages, deployed automatically from `main`).

## Quick start

```bash
nvm use            # Node 22 (see .nvmrc)
npm ci
npm run dev        # http://localhost:3000, hot reload
```

Production build (static export) and a local preview of exactly what gets deployed:

```bash
NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL="https://www.optavius.com" npm run build:static
NEXT_PUBLIC_BASE_PATH="" npm run preview        # http://localhost:3300
```

`build:static` runs `next build` (writes `out/`) and then `tooling/post-export.js`, which sets the `lang` attribute on
the Dutch and German pages.

## Environment variables

Both are read at build time only.

| Variable | Meaning | GitHub Pages preview | Own domain |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Folder the site lives under | `/optavius` | empty |
| `NEXT_PUBLIC_SITE_URL` | Public origin used for canonical URLs, sitemap, social images and structured data | `https://ppleeuw.github.io/optavius` | `https://www.optavius.com` |

Every internal link and asset path goes through `lib/base.ts` (`BASE`, `SITE_URL`, `asset()`), so nothing else needs to
change when the base path changes.

## Putting it on the domain

### Option A: keep GitHub Pages (simplest)

1. In the repository go to Settings > Secrets and variables > Actions > Variables and add
   `CUSTOM_DOMAIN = www.optavius.com`. The workflow then builds with an empty base path and the right site URL, and writes
   the `CNAME` file GitHub Pages needs. (`NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` can also be set explicitly.)
2. In Settings > Pages set the custom domain to `www.optavius.com` and tick "Enforce HTTPS" once the certificate is issued.
3. DNS: `www` as a CNAME to `ppleeuw.github.io`; the apex `optavius.com` as A records to GitHub's Pages IPs
   (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) so it redirects to `www`.
4. Push to `main` (or run the workflow manually). The deploy takes about two minutes.

### Option B: any other static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, nginx)

- Build command: `npm run build:static` with `NEXT_PUBLIC_BASE_PATH=""` and `NEXT_PUBLIC_SITE_URL=https://www.optavius.com`.
- Publish directory: `out`.
- Pages are folders with an `index.html` (`trailingSlash: true`), so the host must serve `/pricing/` from
  `/pricing/index.html` and redirect `/pricing` to `/pricing/`. Netlify, Vercel and Cloudflare Pages do this by default;
  for nginx use `try_files $uri $uri/ =404;`.
- Serve `.mp4` with range-request support (all the hosts above do); the hero clips rely on it.
- Long cache headers for `/_next/static/` (hashed file names), short ones for HTML.

### After the move

- Add the domain to Google Search Console and Bing Webmaster Tools; verification meta tags go in
  `app/[[...slug]]/page.tsx` (`generateMetadata`) or as DNS records.
- `public/robots.txt` and `app/sitemap.ts` pick up `NEXT_PUBLIC_SITE_URL` automatically.
- `public/llms.txt` and `public/site.webmanifest` already reference `https://www.optavius.com`.

## Where things live

- `app/[[...slug]]/page.tsx` renders every page in every language from one route (`generateStaticParams` lists them all).
  English at `/`, Dutch under `/nl`, German under `/de`. Metadata (canonical, hreflang, Open Graph images, JSON-LD) is
  built there too. `app/layout.tsx` holds the shell, `app/sitemap.ts` and `app/robots.ts` the crawler files.
- `content/en.ts`, `content/nl.ts`, `content/de.ts`: all copy and page data, typed by `content/types.ts`.
  `content/shared.ts`: asset paths and constants (phone number, e-mail, Cal.com links, logos, videos).
  `content/faqs.ts`: FAQs per page and language. `content/legal.ts`: privacy policy and terms.
  `content/articles.json`: resource articles. `content/image-sizes.json`: intrinsic image sizes (regenerate with
  `node tooling/image-sizes.js` after adding images).
- `components/site/Pages.tsx` composes every page from the templates in `components/tpl/`.
  `components/home/` holds the home-page specials: `Hero.tsx` (video hero with the call bubbles), the bento cards and the
  "Meet the console" section. `components/mockups/` holds the product mockups. `components/Nav.tsx`, the footer,
  `components/CalBooking.tsx` (Cal.com pop-up on every "Book a demo" link) and `components/tpl/DemoBooking.tsx`
  (inline calendar on `/demo`).
- `app/styles/site.css` is the compiled design-system stylesheet, `app/styles/extra.css` holds the site's own additions
  (logo font, hero bubble animation) and `app/styles/mockups.css` is generated: run `npm run css:mockups` whenever you add
  Tailwind classes to components, then rebuild. `public/fonts/` holds the self-hosted fonts.
- `public/media/`: the three hero clips (`heroN.mp4` desktop, `heroN-720.mp4` phones, `heroN-poster.jpg` first frames).
  `public/optavius/`: logos, badges, photos (WebP), generated clips (`gen/`), demo call recordings
  (`demo-call-{en,nl,de}.mp3`). `public/og/`: social images per page and language.

## Hero video

`components/home/Hero.tsx` plays three clips in turn (9.8 s each) with the chat bubbles timed in `BUBBLE_TIMES`.
Phones get the 720p variant, the next clip is preloaded during the current one, and each clip's first frame sits behind it
(inline thumbnail plus poster JPEG) so nothing flat ever shows. When replacing a clip, keep it 9.8 s, keep the person in
the right third of the frame, and regenerate the poster and the inline thumbnail (see `tooling/README.md`).

## Third parties

- **Cal.com**: booking pop-up and the `/demo` calendar. Links per language are in `content/shared.ts` (`CAL_LINKS`);
  colours and the forced light theme are in `components/CalBooking.tsx`.
- **Fonts**: GT America (Standard and Mono) from Grilli Type needs a web licence for the domain before launch; Fraunces
  (logo) is open source.
- No analytics or cookie banner yet. Adding one means a consent tool plus the script in `app/layout.tsx`.

## Checks

- `npm run check` (after `npx playwright install chromium` once) opens every page of a local preview on port 3300 and
  reports console errors, failed requests and broken images.
- `node tooling/opshots.js` screenshots every page for a visual pass.

## Repository notes

- `main` deploys automatically; work on branches and merge.
- Media generation scripts (fal.ai) live in `tooling/`; see `tooling/README.md`. They are optional and never run in the
  build.
- `out/`, `.next/` and `tsconfig.tsbuildinfo` are build artefacts and are git-ignored.
