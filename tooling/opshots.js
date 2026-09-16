/* working folder for downloads and intermediates; override with MEDIA_TMP */
const TMP = process.env.MEDIA_TMP || require('os').tmpdir() + '/optavius-media';
const { chromium } = require('playwright'); const fs = require('fs');
const OUT = TMP + '/op'; fs.mkdirSync(OUT, { recursive: true });
const pages = process.argv.slice(3); const w = Number(process.argv[2] || 1440);
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, isMobile: w < 800, hasTouch: w < 800 });
  for (const p of pages) {
    const page = await ctx.newPage(); const errs = [];
    page.on('pageerror', e => errs.push('PAGEERROR ' + e.message.slice(0, 160))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
    await page.goto('http://localhost:3100' + p, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(1500);
    const total = await page.evaluate(() => document.body.scrollHeight); for (let y = 0; y < total + 900; y += 600) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(150); }
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200);
    const h = await page.evaluate(() => document.body.scrollHeight); const name = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_')) + '-' + w;
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log(name, 'h', h, 'errors', errs.length, errs.slice(0, 3).join(' || ')); await page.close();
  }
  await b.close();
})();
