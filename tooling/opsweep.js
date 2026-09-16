const { chromium } = require('playwright');
const pages = ['/', '/product', '/product/console', '/product/ask-optavius', '/product/agents', '/product/integrations', '/pricing', '/specialties', '/specialties/ophthalmology', '/specialties/optometry', '/specialties/dermatology', '/specialties/veterinary', '/customers', '/customers/omc-amstelland', '/customers/north-texas-eye-specialists', '/customers/cubitts', '/about', '/resources', '/resources/omc-amstelland', '/careers', '/demo', '/privacy', '/terms', '/nl', '/nl/pricing', '/nl/specialties/veterinary', '/de', '/de/customers/cubitts'];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); let bad = 0;
  for (const p of pages) {
    const page = await ctx.newPage(); const fails = [], errs = [];
    page.on('response', r => { if (r.status() >= 400) fails.push(r.status() + ' ' + r.url().replace('http://localhost:3100', '').slice(0, 90)); });
    page.on('pageerror', e => errs.push('PAGEERROR ' + e.message.slice(0, 120))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)); });
    await page.goto('http://localhost:3100' + p, { waitUntil: 'load', timeout: 120000 }); await page.waitForTimeout(1200);
    const total = await page.evaluate(() => document.body.scrollHeight); for (let y = 0; y < total; y += 800) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(100); }
    await page.waitForTimeout(800);
    const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src').slice(0, 80)));
    if (fails.length || errs.length || broken.length) { bad++; console.log(p, '| failed:', fails.slice(0, 3).join(' ; '), '| errors:', errs.slice(0, 2).join(' ; '), '| broken imgs:', broken.slice(0, 3).join(' ; '), '| "Sierra" mentions:', sierra); }
    await page.close();
  }
  console.log(pages.length - bad, 'of', pages.length, 'pages clean'); await b.close();
})();
