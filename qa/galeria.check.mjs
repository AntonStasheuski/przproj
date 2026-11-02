#!/usr/bin/env node
/**
 * Interactive check of /galeria and /galeria/:n (clicks, keys, disabled arrows, URLs, console, animation, widths).
 * Usage: node qa/galeria.check.mjs   (dev server on :5173 or BASE_URL)
 */
import { chromium } from '@playwright/test';
import { mkdir, rm, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = new URL('./out/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const errors = [];
let fails = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`);
  if (!cond) fails++;
};

const open = async (ctx, path, w = 1512, h = 982) => {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: w, height: h });
  page.on('console', (m) => m.type() === 'error' && errors.push(`${path}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${path}: ${e.message}`));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  return page;
};
const url = (p) => new URL(p.url()).pathname + new URL(p.url()).search;
const dis = (p, dir) => p.locator(`.arrow--${dir}`).getAttribute('aria-disabled');
const settle = (p) => p.waitForTimeout(2800);
const posOf = (p) => p.evaluate(() => Number(document.querySelector('.galeria').style.getPropertyValue('--pos')));

const ctx = await browser.newContext();

// ---- carousel
let p = await open(ctx, '/galeria');
ok((await dis(p, 'prev')) === 'true' && (await dis(p, 'next')) === 'false', 'carousel p1: prev disabled, next enabled');
await p.click('.arrow--prev', { force: true });
await settle(p);
ok(url(p) === '/galeria', 'prev on p1 does nothing');
await p.click('.arrow--next');
await settle(p);
ok(url(p) === '/galeria?krok=2', 'next -> ?krok=2');
ok((await dis(p, 'next')) === 'true' && (await dis(p, 'prev')) === 'false', 'carousel p2: next disabled');
await p.click('.arrow--next', { force: true });
await settle(p);
ok(url(p) === '/galeria?krok=2', 'next on p2 does nothing');
await p.keyboard.press('ArrowLeft');
await settle(p);
ok(url(p) === '/galeria', 'ArrowLeft -> page 1');
await p.keyboard.press('ArrowRight');
await settle(p);
ok(url(p) === '/galeria?krok=2', 'ArrowRight -> page 2');
await p.reload({ waitUntil: 'networkidle' });
ok(await p.evaluate(() => document.querySelector('.galeria').style.getPropertyValue('--page') === '1'), '?krok=2 renders page 2 immediately');
// hover grayscale
await p.hover('.gal-card:nth-child(4) a');
await p.waitForTimeout(500);
ok((await p.locator('.gal-card:nth-child(4) img').evaluate((e) => getComputedStyle(e).filter)) === 'grayscale(1)', 'card hover -> grayscale');
await p.click('.gal-card:nth-child(5) a');
await p.waitForURL('**/galeria/5');
await p.waitForSelector('.gal-photo');
ok(url(p) === '/galeria/5', 'click card 5 -> /galeria/5');
ok((await p.locator('.goback').getAttribute('href')) === '/galeria?krok=2', 'work 5 go back -> /galeria?krok=2');
await p.click('.goback');
await p.waitForURL('**/galeria?krok=2');
await p.waitForSelector('.gal-window');
ok(await p.evaluate(() => document.querySelector('.galeria').style.getPropertyValue('--page') === '1'), 'back lands on page 2');
await p.click('.goback');
await p.waitForURL((u) => u.pathname === '/');
ok(url(p) === '/', 'carousel go back -> /');
await p.goto(BASE + '/galeria', { waitUntil: 'networkidle' });
await p.click('.site-nav__link[data-nav="art"]');
await p.waitForURL('**/art-project');
ok(true, 'menu navigates');
await p.close();

// ---- work view
p = await open(ctx, '/galeria/1');
ok((await dis(p, 'prev')) === 'true', 'work 1: prev disabled');
await p.keyboard.press('ArrowLeft');
await settle(p);
ok(url(p) === '/galeria/1', 'ArrowLeft on work 1 does nothing');
for (let i = 2; i <= 6; i++) {
  await p.click('.arrow--next');
  await p.waitForTimeout(300);
  ok(url(p) === `/galeria/${i}`, `next -> /galeria/${i} (URL updated immediately)`);
  await settle(p);
}
ok((await dis(p, 'next')) === 'false', 'work 6: next enabled (loop)');
ok((await p.locator('.goback').getAttribute('href')) === '/galeria?krok=2', 'work 6 go back -> krok=2');
await p.click('.arrow--next');
await p.waitForTimeout(300);
ok(url(p) === '/galeria/1', 'next on 6 -> /galeria/1');
await settle(p);
ok((await posOf(p)) === 0, 'position folded back to 0 after loop');
await p.click('.arrow--next');
await settle(p);
await p.click('.arrow--prev');
await settle(p);
ok(url(p) === '/galeria/1', 'prev 2 -> 1');
// thumbnail: first visible thumb = next work
await p.click('.gal-thumb:not([inert]) >> nth=2');
await settle(p);
ok(url(p) === '/galeria/4', 'third thumb on work 1 -> work 4');
await p.click('.gal-thumb:not([inert]) >> nth=2');
await settle(p);
ok(url(p) === '/galeria/1', 'third thumb on work 4 -> work 1 (wraps forward)');
ok((await posOf(p)) === 0, 'folded to 0');
await p.keyboard.press('ArrowRight');
await settle(p);
ok(url(p) === '/galeria/2', 'ArrowRight -> work 2');
ok((await p.title()).toLowerCase().includes('gioconda'), 'document title follows the work');
await p.reload({ waitUntil: 'networkidle' });
ok(await p.locator('.gal-block:not([inert]) h2').innerText().then((t) => /GIOCONDA/.test(t)), 'reload /galeria/2 shows work 2 text');
await p.goto(BASE + '/galeria/9', { waitUntil: 'networkidle' });
ok(/nie znaleziono/i.test(await p.locator('h1').innerText()), '/galeria/9 -> 404 page');
await p.close();

// ---- animation recording (work 1 -> 2)
const vdir = join(OUT, 'galeria-video');
await rm(vdir, { recursive: true, force: true });
const vctx = await browser.newContext({ recordVideo: { dir: vdir, size: { width: 756, height: 491 } }, viewport: { width: 1512, height: 982 } });
p = await vctx.newPage();
await p.goto(BASE + '/galeria/1', { waitUntil: 'networkidle' });
await p.click('.arrow--next');
const samples = [];
for (let i = 0; i < 8; i++) {
  await p.waitForTimeout(250);
  samples.push(await posOf(p));
}
ok(samples.some((s) => s > 0.05 && s < 0.95) && samples.every((s, i) => i === 0 || s >= samples[i - 1]), `transition animates (pos samples ${samples.map((s) => s.toFixed(2)).join(' ')})`);
await vctx.close();
console.log('video:', (await readdir(vdir)).join(', '));

// ---- widths
for (const [w, h] of [[1280, 720], [1920, 1080], [390, 844]]) {
  for (const path of ['/galeria', '/galeria/2']) {
    const q = await open(ctx, path, w, h);
    const overflow = await q.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(overflow <= 0, `${w}px ${path}: no horizontal scroll`);
    await q.screenshot({ path: join(OUT, `galeria-${w}-${path.replaceAll('/', '_')}.png`), fullPage: true });
    await q.close();
  }
}

ok(errors.length === 0, `console clean ${errors.slice(0, 3).join(' | ')}`);
await browser.close();
process.exit(fails ? 1 : 0);
