#!/usr/bin/env node
/**
 * Interaction check for /filmy/fakty/:slug. Needs the dev server (BASE_URL or :5173).
 * Covers arrows, ←/→ keys, loop 5→1, hidden «back» arrow on step 1, links, 404, console, widths,
 * a rAF frame-time probe during one transition and a video of it (qa/out/fakty-transition.webm).
 */
import { chromium } from '@playwright/test';
import { mkdir, readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = join(ROOT, 'qa/out');
await mkdir(OUT, { recursive: true });

let failed = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`);
  if (!cond) failed++;
};
const krok = (page) => new URL(page.url()).searchParams.get('krok') ?? '1';
const settle = (page) => page.waitForTimeout(2600);
const active = (page) => page.$eval('.fk-panel[data-slot="0"] .fk-num', (n) => n.textContent);
const order = (page) =>
  page.$$eval('.fk-panel', (ps) => ps.filter((p) => !p.classList.contains('fk-ghost')).sort((a, b) => Number(a.dataset.slot) - Number(b.dataset.slot)).map((p) => p.querySelector('.fk-num').textContent).join(' '));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1512, height: 982 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(`${BASE}/filmy/fakty/legenda`, { waitUntil: 'networkidle' });
ok((await page.$eval('.arrow--prev', (a) => a.hidden)) === true, 'step 1: back arrow hidden');
ok((await order(page)) === '01 02 03 04 05', `step 1 order: ${await order(page)}`);
ok((await page.$eval('.site-nav__link[data-nav="filmy"]', (a) => a.getAttribute('aria-current'))) === 'page', 'FILMY is the active menu item');

await page.click('.arrow--next');
await settle(page);
ok(krok(page) === '2' && (await active(page)) === '02', 'arrow next -> krok 2');
ok((await order(page)) === '02 03 04 05 01', `step 2 order: ${await order(page)}`);
ok((await page.$eval('.arrow--prev', (a) => a.hidden)) === false, 'step 2: back arrow visible');
ok((await page.$$('.fk-ghost')).length === 0, 'no ghost left after the transition');

for (const k of [3, 4, 5]) {
  await page.keyboard.press('ArrowRight');
  await settle(page);
  ok(krok(page) === String(k), `ArrowRight -> krok ${k}`);
}
ok((await order(page)) === '05 01 02 03 04', `step 5 order: ${await order(page)}`);
await page.keyboard.press('ArrowRight');
await settle(page);
ok(krok(page) === '1', 'loop: 5 -> 1');
await page.keyboard.press('ArrowLeft');
await settle(page);
ok(krok(page) === '5' && (await order(page)) === '05 01 02 03 04', 'ArrowLeft on step 1 loops to 5');
await page.click('.arrow--prev');
await settle(page);
ok(krok(page) === '4', 'arrow prev -> krok 4');

// rapid clicks must not leave the DOM in a broken state
await page.click('.arrow--next', { delay: 0 });
await page.click('.arrow--next');
await page.click('.arrow--next');
await settle(page);
ok(krok(page) === '2' && (await order(page)) === '02 03 04 05 01' && (await page.$$('.fk-ghost')).length === 0, `rapid clicks end in a clean state (krok ${krok(page)})`);

// ?krok=N renders immediately, without animation
await page.goto(`${BASE}/filmy/fakty/aszik-kerib?krok=3`, { waitUntil: 'networkidle' });
ok((await order(page)) === '03 04 05 01 02', 'deep link ?krok=3 renders at once');
ok((await page.textContent('.fk-panel[data-slot="0"] .fk-head')) === 'Fabula', 'deep link shows the right fact');

// links
await page.click('.section-bar__back');
await page.waitForURL('**/filmy/fakty');
ok(true, 'go back -> /filmy/fakty');
await page.goto(`${BASE}/filmy/fakty/cienie`, { waitUntil: 'networkidle' });
await page.click('.fk-filmy');
await page.waitForURL('**/filmy');
ok(true, 'FILMY footer -> /filmy');
await page.goto(`${BASE}/filmy/fakty/nie-ma`, { waitUntil: 'networkidle' });
ok((await page.textContent('h1')).includes('Nie znaleziono'), 'unknown slug -> 404');

// every film opens, all pictures load
for (const slug of ['andrijesz', 'cienie', 'kijowskie-freski', 'sajat-nowa', 'legenda', 'aszik-kerib']) {
  await page.goto(`${BASE}/filmy/fakty/${slug}`, { waitUntil: 'networkidle' });
  const broken = await page.$$eval('.fk-img img', (is) => is.filter((i) => !i.complete || i.naturalWidth === 0).length);
  ok(broken === 0, `${slug}: all 5 pictures loaded`);
}

// widths: no horizontal scroll
for (const [w, h] of [[1280, 800], [1920, 1080], [390, 844]]) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto(`${BASE}/filmy/fakty/sajat-nowa?krok=2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(overflow <= 0, `${w}px: no horizontal scroll`);
  await page.screenshot({ path: join(OUT, `fakty-${w}.png`), fullPage: w < 1024 });
}
await page.setViewportSize({ width: 1512, height: 982 });

// frame-time probe on one transition
await page.goto(`${BASE}/filmy/fakty/andrijesz`, { waitUntil: 'networkidle' });
const probe = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const dts = [];
      let last = performance.now();
      const t0 = last;
      const tick = (t) => {
        dts.push(t - last);
        last = t;
        if (t - t0 < 2400) requestAnimationFrame(tick);
        else resolve({ frames: dts.length, max: Math.max(...dts), avg: dts.reduce((a, b) => a + b, 0) / dts.length });
      };
      requestAnimationFrame(tick);
      document.querySelector('.arrow--next').click();
    }),
);
console.log(`frame probe: ${probe.frames} frames, avg ${probe.avg.toFixed(1)} ms, worst ${probe.max.toFixed(1)} ms`);
ok(probe.avg < 20, 'average frame time under 20 ms (≈60 fps)');

ok(errors.length === 0, `console is clean ${errors.join(' | ')}`);
await ctx.close();

// video of one transition
const vctx = await browser.newContext({ viewport: { width: 1512, height: 982 }, recordVideo: { dir: join(OUT, 'video'), size: { width: 1512, height: 982 } } });
const vpage = await vctx.newPage();
await vpage.goto(`${BASE}/filmy/fakty/andrijesz`, { waitUntil: 'networkidle' });
await vpage.waitForTimeout(600);
await vpage.click('.arrow--next');
await vpage.waitForTimeout(2800);
await vpage.click('.arrow--prev');
await vpage.waitForTimeout(2800);
await vctx.close();
const vids = await readdir(join(OUT, 'video'));
if (vids[0]) await rename(join(OUT, 'video', vids[0]), join(OUT, 'fakty-transition.webm'));
await browser.close();

console.log(failed ? `${failed} check(s) failed` : 'all checks passed');
process.exit(failed ? 1 : 0);
