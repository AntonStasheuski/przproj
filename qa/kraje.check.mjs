#!/usr/bin/env node
/**
 * Interactive check of /filmy/kraje and /filmy/kraje/:slug (cards, hover, steps, keys, arrows, 404, widths, animation).
 * Usage: node qa/kraje.check.mjs   (dev server on :5173 or BASE_URL)
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

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
const pos = (p) => p.evaluate(() => Number(document.querySelector('.kraj-strip').style.getPropertyValue('--pos')));
const settle = (p) => p.waitForTimeout(2800);
const ctx = await browser.newContext();

// ---- start
let p = await open(ctx, '/filmy/kraje');
ok((await p.locator('.site-nav__link[aria-current="page"]').textContent()) === 'Filmy', 'start: menu item Filmy is active');
ok((await p.locator('.country-card').evaluateAll((a) => a.map((x) => x.getAttribute('href')))).join() === '/filmy/kraje/gruzja,/filmy/kraje/ukraina,/filmy/kraje/armenia', 'start: three cards in the order of the frame');
const card = p.locator('.country-card').nth(1);
const before = await card.locator('.country-card__photo').evaluate((e) => getComputedStyle(e).opacity);
await card.hover();
await p.waitForTimeout(400);
ok(before === '1' && (await card.locator('.country-card__photo').evaluate((e) => getComputedStyle(e).opacity)) === '0', 'start: hover hides the photo');
ok((await card.locator('.country-card__name').evaluate((e) => getComputedStyle(e).color)) === 'rgb(220, 0, 0)', 'start: hover caption is #DC0000');
await p.mouse.move(5, 5);
await p.waitForTimeout(400);
ok((await card.locator('.country-card__photo').evaluate((e) => getComputedStyle(e).opacity)) === '1', 'start: photo is back after hover');
await card.click();
await p.waitForTimeout(500);
ok(url(p) === '/filmy/kraje/ukraina', 'start: card → /filmy/kraje/ukraina');
await p.goBack();
await p.waitForTimeout(500);
await p.click('.section-bar__back');
await p.waitForTimeout(500);
ok(url(p) === '/filmy', 'start: Go back → /filmy');
await p.close();

// ---- countries
for (const slug of ['ukraina', 'gruzja', 'armenia']) {
  p = await open(ctx, `/filmy/kraje/${slug}`);
  const dis = (d) => p.locator(`.arrow--${d}`).getAttribute('aria-disabled');
  const hidden = () => p.locator('.arrow--prev').evaluate((e) => e.hidden);
  ok((await hidden()) && (await dis('next')) === 'false', `${slug} 1: back arrow hidden, forward enabled`);
  await p.click('.arrow--next');
  await settle(p);
  ok(url(p) === `/filmy/kraje/${slug}?krok=2` && (await pos(p)) === 1 && !(await hidden()), `${slug}: next → ?krok=2, strip at slide 2, back arrow shown`);
  await p.keyboard.press('ArrowRight');
  await settle(p);
  await p.keyboard.press('ArrowRight');
  await settle(p);
  ok(url(p).endsWith('?krok=4') && (await dis('next')) === 'true', `${slug} 4: → ?krok=4, forward arrow disabled`);
  await p.click('.arrow--next', { force: true });
  await settle(p);
  ok(url(p).endsWith('?krok=4'), `${slug} 4: forward does nothing`);
  await p.keyboard.press('ArrowLeft');
  await settle(p);
  ok(url(p).endsWith('?krok=3'), `${slug}: ArrowLeft → krok 3`);
  await p.reload({ waitUntil: 'networkidle' });
  ok((await pos(p)) === 2, `${slug}: ?krok=3 renders slide 3 at once`);
  ok((await p.locator('[data-live]').textContent()) === 'Krok 3 z 4', `${slug}: live region says Krok 3 z 4`);
  await p.click('.section-bar__back');
  await p.waitForTimeout(500);
  ok(url(p) === '/filmy/kraje', `${slug}: Go back → /filmy/kraje`);
  await p.close();
}

// ---- unknown slug
p = await open(ctx, '/filmy/kraje/polska');
ok((await p.locator('h1').textContent())?.includes('Nie znaleziono'), 'unknown slug → 404 page');
await p.close();

// ---- external link on Gruzja 4
p = await open(ctx, '/filmy/kraje/gruzja?krok=4');
const link = p.locator('.kraj-link');
ok((await link.getAttribute('href')) === 'http://www.kaukaz.pl/gruzja/kultura_tradycje/mity_legendy/mity_i_legendy.php' && (await link.getAttribute('target')) === '_blank', 'gruzja 4: legend link href + new tab');
await p.close();

// ---- animation: the strip really moves (spring ~2 s), no jump
p = await open(ctx, '/filmy/kraje/ukraina');
await p.click('.arrow--next');
const samples = [];
for (let i = 0; i < 8; i++) {
  await p.waitForTimeout(150);
  samples.push(await pos(p));
}
ok(samples.some((v) => v > 0.05 && v < 0.95) && samples.every((v, i) => i === 0 || v >= samples[i - 1] - 1e-6), `animation: strip glides (${samples.map((v) => v.toFixed(2)).join(' ')})`);
await p.close();

// ---- widths: no horizontal scroll
for (const [w, h] of [[1280, 720], [1920, 1080], [390, 844]]) {
  for (const path of ['/filmy/kraje', '/filmy/kraje/gruzja?krok=2']) {
    p = await open(ctx, path, w, h);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    ok(sw <= w, `${path} @${w}: no horizontal scroll (${sw})`);
    await p.screenshot({ path: `${OUT}kraje-${path.includes('gruzja') ? 'gruzja' : 'start'}-${w}.png`, fullPage: w < 1024 });
    await p.close();
  }
}

ok(errors.length === 0, `console clean${errors.length ? ': ' + errors.join(' | ') : ''}`);
await browser.close();
process.exit(fails ? 1 : 0);
