#!/usr/bin/env node
/**
 * Interactive check of /art-project and the three constructors: arrows, keys, disabled arrows,
 * «+» → facts, Esc/back from a fact, Go back, poster links, hover grayscale, 404, console,
 * a recorded transition and widths 1280/1920/390.
 * Usage: node qa/art.check.mjs   (dev server on :5173 or BASE_URL)
 */
import { chromium } from '@playwright/test';
import { mkdir, readdir, rm } from 'node:fs/promises';
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
const dis = (p, dir) => p.locator(`.art-con__${dir}`).getAttribute('aria-disabled');
const settle = (p, ms = 1600) => p.waitForTimeout(ms);
const visibleLayers = (p) =>
  p.evaluate(() => [...document.querySelectorAll('.art-poster__base')].filter((n) => n.dataset.on === '1').length);
const live = (p) => p.locator('[data-live]').textContent();

const ctx = await browser.newContext({ reducedMotion: 'reduce' });

// ---- start page
let p = await open(ctx, '/art-project');
ok((await p.locator('.art-start__card').count()) === 3, 'start: three posters');
await p.hover('.art-start__card >> nth=1');
await p.waitForTimeout(500);
const filter = await p.locator('.art-start__poster img >> nth=1').evaluate((n) => getComputedStyle(n).filter);
ok(filter.includes('grayscale(1)'), `hover poster → grayscale (${filter})`);
ok((await p.locator('.goback').count()) === 0, 'start: no Go back (as in 29:88)');
for (const slug of ['aszik-kerib', 'cienie-zapomnianych-przodkow', 'sajat-nowa']) {
  await p.click(`a[href="/art-project/${slug}"]`);
  await p.waitForURL(`**/art-project/${slug}`);
  ok(url(p) === `/art-project/${slug}`, `poster → /art-project/${slug}`);
  await p.goBack();
  await p.waitForURL('**/art-project');
}
await p.click('.site-nav__link[data-nav="galeria"]');
await p.waitForURL('**/galeria');
ok(url(p) === '/galeria', 'menu Galeria → /galeria');
await p.close();

// ---- constructors
const SERIES = { 'sajat-nowa': 9, 'cienie-zapomnianych-przodkow': 8, 'aszik-kerib': 9 };
for (const [slug, count] of Object.entries(SERIES)) {
  const base = `/art-project/${slug}`;
  p = await open(ctx, base);
  ok((await dis(p, 'prev')) === 'true' && (await dis(p, 'next')) === 'false', `${slug}: start prev disabled, next enabled`);
  ok((await visibleLayers(p)) === 1, `${slug}: start shows one layer`);
  await p.click('.art-con__prev', { force: true });
  await settle(p, 300);
  ok(url(p) === base, `${slug}: prev on start does nothing`);
  await p.click('.art-con__next');
  await settle(p, 300);
  ok(url(p) === `${base}?krok=2`, `${slug}: next → ?krok=2`);
  ok((await visibleLayers(p)) === 2, `${slug}: step adds a layer`);
  await p.keyboard.press('ArrowLeft');
  await settle(p, 300);
  ok(url(p) === base, `${slug}: ArrowLeft → start`);
  for (let i = 1; i < count; i++) await p.keyboard.press('ArrowRight');
  await settle(p, 300);
  ok(url(p) === `${base}?krok=${count}`, `${slug}: ArrowRight ×${count - 1} → final (?krok=${count})`);
  ok((await dis(p, 'next')) === 'true', `${slug}: final — next disabled`);
  await p.click('.art-con__next', { force: true });
  await p.keyboard.press('ArrowRight');
  await settle(p, 300);
  ok(url(p) === `${base}?krok=${count}`, `${slug}: next on final does nothing`);
  ok((await live(p)) === `Krok ${count} z ${count}`, `${slug}: live region "Krok ${count} z ${count}"`);

  // facts: BR, BL, TR, TL → fakt 1..4
  const plus = (i) => p.locator(`.art-poster__plus[data-fact="${i}"] button`);
  for (let i = 0; i < 4; i++) {
    await plus(i).click();
    await settle(p, 300);
    ok(url(p) === `${base}?krok=${count}&fakt=${i + 1}`, `${slug}: «+» ${i} → fakt=${i + 1}`);
    ok((await plus(i).getAttribute('aria-current')) === 'true', `${slug}: own «+» is aria-current`);
    const color = await plus(i).evaluate((n) => getComputedStyle(n).color);
    ok(color === 'rgb(138, 146, 160)', `${slug}: own «+» gray (${color})`);
  }
  await plus(3).click({ force: true });
  await settle(p, 300);
  ok(url(p).endsWith('fakt=4'), `${slug}: own «+» does nothing`);
  ok((await dis(p, 'next')) === 'true' && (await dis(p, 'prev')) === 'false', `${slug}: fact — next disabled, back enabled`);
  await p.keyboard.press('Escape');
  await settle(p, 300);
  ok(url(p) === `${base}?krok=${count}`, `${slug}: Esc → assembled poster`);
  await plus(1).click();
  await settle(p, 300);
  await p.click('.art-con__prev');
  await settle(p, 300);
  ok(url(p) === `${base}?krok=${count}`, `${slug}: back arrow from fact → assembled poster`);

  // deep link to a fact renders immediately
  await p.goto(`${BASE}${base}?fakt=3`, { waitUntil: 'networkidle' });
  ok(url(p) === `${base}?krok=${count}&fakt=3`, `${slug}: ?fakt=3 deep link → final + fact`);
  ok((await p.locator('.art-body__fact >> nth=2').evaluate((n) => getComputedStyle(n).opacity)) === '1', `${slug}: fact card visible`);
  await p.click('.art-con__back');
  await p.waitForURL('**/art-project');
  ok(url(p) === '/art-project', `${slug}: Go back → /art-project`);
  await p.close();
}

p = await open(ctx, '/art-project/nie-ma');
ok((await p.locator('.not-found').count()) === 1, 'unknown slug → 404');
await p.close();
await ctx.close();

// ---- animation: record one step and one fact transition
const vdir = join(OUT, 'art-video');
await rm(vdir, { recursive: true, force: true });
const vctx = await browser.newContext({ recordVideo: { dir: vdir, size: { width: 1512, height: 982 } } });
p = await open(vctx, '/art-project/sajat-nowa?krok=2');
const samples = [];
const sample = () =>
  p.evaluate(() => {
    const layer = document.querySelectorAll('.art-poster__base')[2];
    const track = document.querySelector('.art-body__track');
    return { opacity: Number(getComputedStyle(layer).opacity), track: getComputedStyle(track).transform };
  });
await p.click('.art-con__next');
for (let i = 0; i < 6; i++) {
  samples.push(await sample());
  await p.waitForTimeout(150);
}
const mid = samples.filter((s) => s.opacity > 0.02 && s.opacity < 0.98).length;
ok(mid >= 2, `step transition is animated (intermediate opacities: ${samples.map((s) => s.opacity.toFixed(2)).join(', ')})`);
await settle(p, 2500);
await p.goto(`${BASE}/art-project/aszik-kerib?krok=9`, { waitUntil: 'networkidle' });
await p.click('.art-poster__plus[data-fact="0"] button');
await p.waitForTimeout(2000);
await vctx.close();
ok((await readdir(vdir)).some((f) => f.endsWith('.webm')), 'video recorded (qa/out/art-video)');

// ---- widths
const wctx = await browser.newContext();
for (const [w, h, path] of [
  [1280, 800, '/art-project/sajat-nowa?krok=9'],
  [1920, 1080, '/art-project/cienie-zapomnianych-przodkow?fakt=2'],
  [390, 844, '/art-project/aszik-kerib?krok=9'],
  [390, 844, '/art-project'],
]) {
  p = await open(wctx, path, w, h);
  await p.waitForTimeout(400);
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  ok(sw <= w, `${w}px ${path}: no horizontal scroll (${sw})`);
  const name = `art-${w}-${path.replace(/[/?=&]+/g, '_')}.png`;
  await p.screenshot({ path: join(OUT, name), fullPage: true });
  await p.close();
}
await wctx.close();
await browser.close();

ok(errors.length === 0, `console clean${errors.length ? ': ' + errors.join(' | ') : ''}`);
console.log(fails ? `\n${fails} failed` : '\nall passed');
process.exit(fails ? 1 : 0);
