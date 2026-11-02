#!/usr/bin/env node
/**
 * Interactive check of the Filmy section: routes, arrows, keys, disabled arrows, loop, links, 404,
 * mid-transition sampling (the strips glide, they don't jump), console errors, layout at 1280/1920/390.
 * Usage: node qa/filmy.check.mjs   (dev server on :5173 or BASE_URL). Writes qa/out/filmy-*.png and a video.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = new URL('./out/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1512, height: 982 }, recordVideo: { dir: OUT, size: { width: 756, height: 491 } } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

let failed = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
};
const path = () => new URL(page.url()).pathname + new URL(page.url()).search;
const go = async (p) => {
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
};
const pos = (sel) => page.$eval(sel, (el) => Number.parseFloat(getComputedStyle(el).getPropertyValue('--pos')));
const settle = () => page.waitForTimeout(2600);

// /filmy
await go('/filmy');
check('start: FILMY is the active menu item', (await page.getAttribute('[data-nav="filmy"]', 'aria-current')) === 'page');
for (const [i, href] of ['/filmy/plakaty', '/filmy/fakty', '/filmy/kraje'].entries()) {
  await go('/filmy');
  await page.locator('.filmy-start__entry').nth(i).click();
  await page.waitForURL(`**${href}`);
  check(`start: entry ${i + 1} → ${href}`, path() === href);
}
await go('/filmy');
await page.click('.filmy-start__back .goback');
await page.waitForURL(BASE + '/');
check('start: go back → /', path() === '/');

// /filmy/plakaty
await go('/filmy/plakaty');
check('plakaty: prev disabled on page 1', (await page.getAttribute('.arrow--prev', 'aria-disabled')) === 'true');
await page.click('.arrow--prev', { force: true });
await page.waitForTimeout(300);
check('plakaty: disabled prev does nothing', path() === '/filmy/plakaty' && (await pos('.filmy-carousel__track')) === 0);
await page.click('.arrow--next');
await page.waitForTimeout(350);
const mid = await pos('.filmy-carousel__track');
check('plakaty: track glides (mid value between pages)', mid > 0.02 && mid < 0.98, `--pos at 350 ms = ${mid.toFixed(3)}`);
await settle();
check('plakaty: next → ?krok=2', path() === '/filmy/plakaty?krok=2' && (await pos('.filmy-carousel__track')) === 1);
check('plakaty: next disabled on page 2', (await page.getAttribute('.arrow--next', 'aria-disabled')) === 'true');
check('plakaty: hidden page posters are inert', await page.$eval('.filmy-carousel__item', (li) => li.inert));
await page.keyboard.press('ArrowLeft');
await settle();
check('plakaty: ← returns to page 1', path() === '/filmy/plakaty');
await page.locator('.filmy-poster').first().hover();
await page.waitForTimeout(400);
check('plakaty: poster hover = grey variant', (await page.$eval('.filmy-poster img', (i) => getComputedStyle(i).filter)).includes('grayscale(1)'));
await page.locator('.filmy-poster').nth(1).click();
await page.waitForURL('**/filmy/cienie');
check('plakaty: poster → /filmy/cienie', path() === '/filmy/cienie');
await page.goBack();
await page.waitForURL('**/filmy/plakaty');
check('history back → /filmy/plakaty', path() === '/filmy/plakaty');
await page.click('.section-bar__back');
await page.waitForURL('**/filmy');
check('plakaty: go back → /filmy', path() === '/filmy');

// /filmy/fakty
await go('/filmy/fakty?krok=2');
check('fakty: ?krok=2 renders page 2 without animation', (await pos('.filmy-carousel__track')) === 1);
await page.locator('.filmy-poster').nth(5).click();
await page.waitForURL('**/filmy/fakty/aszik-kerib');
check('fakty: AK poster → /filmy/fakty/aszik-kerib', path() === '/filmy/fakty/aszik-kerib');

// film pages
await go('/filmy/aszik-kerib');
check('film: AK go back → plakaty page 2', (await page.getAttribute('.section-bar__back', 'href')) === '/filmy/plakaty?krok=2');
check('film: play is a disabled button', (await page.getAttribute('.film-slot:not([inert]) .film-play', 'aria-disabled')) === 'true');
await page.click('.film__arrow--next');
await page.waitForTimeout(200);
const midFilm = await pos('.film-track');
check('film: strips glide on loop AK → Andrijesz', midFilm > 5.05 && midFilm < 6, `--pos at 200 ms = ${midFilm.toFixed(3)}`);
await settle();
check('film: loop lands on Andrijesz (slot 0)', path() === '/filmy/andrijesz' && (await pos('.film-track')) === 0);
check('film: h1 follows', (await page.textContent('h1')) === 'Andrijesz (1954)');
check('film: go back → plakaty page 1', (await page.getAttribute('.section-bar__back', 'href')) === '/filmy/plakaty');
check('film: document title', (await page.title()).startsWith('Andrijesz (1954)'));
await page.keyboard.press('ArrowLeft');
await settle();
check('film: ← from Andrijesz → AK', path() === '/filmy/aszik-kerib' && (await pos('.film-track')) === 5);
await page.keyboard.press('ArrowRight');
await settle();
await page.keyboard.press('ArrowRight');
await settle();
check('film: → → → Cienie', path() === '/filmy/cienie');
await page.locator('.film-win--mini .film-slot:not([inert]) .film-mini').nth(2).click();
await settle();
check('film: third mini poster → Legenda (stays on the page)', path() === '/filmy/legenda' && (await page.textContent('h1')) === 'Legenda o Twierdzy Suramskiej (1984)');
await page.locator('.film-win--mini .film-slot:not([inert]) .film-mini').nth(1).click();
await settle();
check('film: mini poster across the loop → Andrijesz', path() === '/filmy/andrijesz' && (await pos('.film-track')) === 0);
const visibleTitles = await page.$$eval('.film-win--info .film-slot:not([inert]) .film-info__title', (n) => n.map((e) => e.textContent));
check('film: one visible metadata panel', visibleTitles.length === 1 && visibleTitles[0] === 'ANDRIJESZ (1954)');
await page.click('.site-nav__link[data-nav="filmy"]');
await page.waitForURL('**/filmy');
check('film: menu FILMY → /filmy', path() === '/filmy');

await go('/filmy/nie-ma-takiego');
check('film: unknown slug → 404', (await page.textContent('h1'))?.includes('Nie znaleziono') ?? false);

// widths
for (const [w, h, p] of [[1280, 800, '/filmy/plakaty'], [1920, 1080, '/filmy/plakaty'], [1280, 800, '/filmy/sajat-nowa'], [1920, 1080, '/filmy'], [390, 844, '/filmy'], [390, 844, '/filmy/fakty'], [390, 844, '/filmy/legenda']]) {
  await page.setViewportSize({ width: w, height: h });
  await go(p);
  await page.waitForTimeout(500);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  check(`layout ${w}px ${p}: no horizontal scroll`, sw <= w, `scrollWidth ${sw}`);
  await page.screenshot({ path: `${OUT}filmy-${w}${p.replaceAll('/', '-')}.png`, fullPage: true });
}

check('console is clean', errors.length === 0, errors.join(' | '));
await ctx.close();
await browser.close();
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
