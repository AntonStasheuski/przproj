// Foundation check: header + section bar geometry vs. the Art Project start reference.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1512, height: 982 } });
await p.goto('http://localhost:5173/__chrome-check', { waitUntil: 'networkidle' });
await p.evaluate(() => {
  document.querySelector('[data-nav="art"]').setAttribute('aria-current', 'page');
  document.querySelector('.section-bar__title').textContent = 'Art Project';
  document.querySelector('.not-found__main').remove();
});
await p.evaluate(() => document.fonts.ready);
// re-run underline placement (mountHeader is not called by the stub page)
await p.evaluate(() => {
  const nav = document.querySelector('.site-nav');
  const a = document.querySelector('[data-nav="art"]');
  nav.style.setProperty('--line-x', a.offsetLeft + 'px'); nav.classList.add('has-line', 'no-anim');
});
await p.waitForTimeout(300);
const shot = await p.screenshot(); await sharp(shot).toFile("qa/out/chrome-site.png");
await b.close();
const ref = 'figma/ref/all/29-88__art-project-started-page.png';
const crop = (buf, top, h) => sharp(buf).extract({ left: 0, top, width: 1512, height: h }).toBuffer();
const s = await sharp(shot).toBuffer();
const r = await sharp(ref).toBuffer();
for (const [name, top, h] of [['top', 20, 90], ['bottom', 800, 182]]) {
  const a = await crop(s, top, h), c = await crop(r, top, h);
  await sharp({ create: { width: 1512, height: h * 2 + 4, channels: 3, background: '#ff00ff' } })
    .composite([{ input: c, top: 0, left: 0 }, { input: a, top: h + 4, left: 0 }]).png().toFile(`qa/out/chrome-${name}.png`);
}
console.log('ok');
