#!/usr/bin/env node
/**
 * Interactive checks for the home page (/): section selector, bio slider, hover cards,
 * museum hover, external links, scroll reveal (CLS), responsive widths.
 * Usage: node qa/home.check.mjs   (dev server on :5173 or BASE_URL)
 * Writes screenshots/videos to qa/out/home-*.
 */
import { chromium } from '@playwright/test';
import { mkdir, rename, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'qa/out');
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
await mkdir(OUT, { recursive: true });

const results = [];
const check = (name, ok, info = '') => {
  results.push({ name, ok, info });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? `  (${info})` : ''}`);
};
const near = (a, b, tol = 2) => Math.abs(a - b) <= tol;

const browser = await chromium.launch();
const videoDir = join(OUT, 'home-video');
const ctx = await browser.newContext({ viewport: { width: 1512, height: 982 }, recordVideo: { dir: videoDir, size: { width: 1512, height: 982 } } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
// the dev server reloads the page when other sections change; such runs are not meaningful
let reloads = -1;
page.on('framenavigated', (f) => f === page.mainFrame() && f.url() === BASE + '/' && reloads++);

await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// ---------- section selector ----------
const sel = page.locator('.sel');
await sel.scrollIntoViewIfNeeded();
await page.waitForTimeout(900); // reveal
const colW = () => page.$$eval('.sel__col', (cs) => cs.map((c) => Math.round(c.getBoundingClientRect().width)));
const titleOp = () => page.$$eval('.sel__title', (ts) => ts.map((t) => Number(getComputedStyle(t).opacity)));
const lineX = () => page.$$eval('.sel__col + .sel__col', (cs) => cs.map((c) => Math.round(c.getBoundingClientRect().left - 23)));
let w = await colW();
check('selector: Art Project open by default (584/394/394)', near(w[0], 584) && near(w[1], 394) && near(w[2], 394), w.join('/'));
check('selector: divider lines at x 631 / 1071', JSON.stringify(await lineX()) === JSON.stringify([631, 1071]), (await lineX()).join('/'));
check('selector: toggle hidden on the open column', await page.locator('.sel__col').nth(0).locator('.sel__toggle').isHidden());

await page.locator('.sel__col').nth(1).locator('.sel__toggle').click();
await page.waitForTimeout(150);
const mid = await colW();
const titleMid = await titleOp();
check('selector: width animates (mid-transition value)', mid[1] > 400 && mid[1] < 580, mid.join('/'));
check('selector: old title fades out (not cut)', titleMid[0] > 0 && titleMid[0] < 1, titleMid.map((o) => o.toFixed(2)).join('/'));
await page.waitForTimeout(1300);
w = await colW();
check('selector: Galeria open after click (394/584/394)', near(w[0], 394) && near(w[1], 584) && near(w[2], 394), w.join('/'));
check('selector: lines moved to x 441 / 1071', JSON.stringify(await lineX()) === JSON.stringify([441, 1071]), (await lineX()).join('/'));
let ops = await titleOp();
check('selector: title visible only on the open column', ops[0] === 0 && ops[1] === 1 && ops[2] === 0, ops.join('/'));

// keyboard: Tab to the Filmy toggle, Enter
await page.locator('.sel__col').nth(2).locator('.sel__toggle').focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(1400);
w = await colW();
check('selector: keyboard Enter opens Filmy (394/394/584)', near(w[0], 394) && near(w[1], 394) && near(w[2], 584), w.join('/'));
// Figma variant 168 has the line at 882 but the Filmy image at 905 (= 858 + 23 + 23 + 1): 1 px drift in the design
const lx = await lineX();
check('selector: lines at x 441 / 882 (±1)', near(lx[0], 441, 0) && near(lx[1], 882, 1), lx.join('/'));
const focused = await page.evaluate(() => document.activeElement?.className + ' ' + document.activeElement?.getAttribute('href'));
check('selector: focus moves to the opened column label', focused.includes('sel__label') && focused.includes('/filmy'), focused);

// title hover → gray
const filmyTitle = page.locator('.sel__col').nth(2).locator('.sel__title');
await filmyTitle.hover();
await page.waitForTimeout(250);
const tColor = await filmyTitle.evaluate((t) => getComputedStyle(t).color);
check('selector: title hover is gray #8A92A0', tColor === 'rgb(138, 146, 160)', tColor);

// click on the open column's title → /filmy
await filmyTitle.click();
await page.waitForURL('**/filmy');
check('selector: click on open title navigates to /filmy', page.url().endsWith('/filmy'));
await page.goBack();
await page.waitForURL(BASE + '/');
await page.waitForTimeout(500);

// labels
const labels = await page.$$eval('.sel__label', (as) => as.map((a) => a.getAttribute('href')));
check('selector: labels link to sections', labels.join() === '/art-project,/galeria,/filmy', labels.join());

// ---------- bio slider ----------
await page.locator('.bio').scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const active = () => page.$$eval('.bio__slide', (s) => s.findIndex((x) => x.classList.contains('is-active')));
const prev = page.locator('.bio__chev.arrow--prev');
const next = page.locator('.bio__chev.arrow--next');
check('bio: starts on slide 1, prev disabled', (await active()) === 0 && (await prev.getAttribute('aria-disabled')) === 'true');
await prev.click({ force: true });
check('bio: disabled prev does nothing', (await active()) === 0);
await next.click();
await page.waitForTimeout(120);
const fadeMid = await page.$$eval('.bio__slide', (s) => [Number(getComputedStyle(s[0]).opacity), Number(getComputedStyle(s[1]).opacity)]);
check('bio: crossfade in progress (both slides partially visible)', fadeMid[0] > 0 && fadeMid[0] < 1 && fadeMid[1] > 0 && fadeMid[1] < 1, fadeMid.join('/'));
await page.waitForTimeout(400);
check('bio: next → slide 2 (Frame 11)', (await active()) === 1);
const live = await page.locator('[data-bio-status]').textContent();
check('bio: live region announces', live === 'Slajd 2 z 5', live ?? '');
// keys while focus is inside
await next.focus();
await page.keyboard.press('ArrowRight');
await page.keyboard.press('ArrowRight');
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(400);
check('bio: → keys reach slide 5', (await active()) === 4);
check('bio: next disabled on last slide', (await next.getAttribute('aria-disabled')) === 'true');
await page.keyboard.press('ArrowRight');
await next.click({ force: true });
check('bio: → on last slide stays', (await active()) === 4);
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(400);
check('bio: ← goes back to slide 4', (await active()) === 3);
// keys outside the slider do nothing
await page.locator('.hero__author').focus();
await page.keyboard.press('ArrowLeft');
check('bio: ← outside the slider ignored', (await active()) === 3);
const textOverflow = await page.$$eval('.bio__text', (ps) =>
  ps.map((p) => Math.round(p.getBoundingClientRect().bottom - p.closest('.bio').getBoundingClientRect().top)),
);
check('bio: every slide text fits in the section (≤ 982)', textOverflow.every((b) => b <= 982), textOverflow.join('/'));

// ---------- museum ----------
const museum = page.locator('.museum__link');
await museum.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await museum.hover();
await page.waitForTimeout(450);
const mapOp = await page.locator('.museum__img--hover').evaluate((e) => Number(getComputedStyle(e).opacity));
check('museum: hover shows variant (map, gray cursor)', mapOp === 1, String(mapOp));
check(
  'museum: link → parajanovmuseum.am, new tab',
  (await museum.getAttribute('href')) === 'https://parajanovmuseum.am/' && (await museum.getAttribute('target')) === '_blank' && (await museum.getAttribute('rel')) === 'noopener',
);

// ---------- friends ----------
const card = page.locator('.friend').nth(1);
await card.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await card.hover();
await page.waitForTimeout(90);
const cMid = await card.locator('.friend__card').evaluate((e) => Number(getComputedStyle(e).opacity));
await page.waitForTimeout(400);
const cEnd = await card.locator('.friend__card').evaluate((e) => Number(getComputedStyle(e).opacity));
check('friends: hover card fades in within ~0.3s (SPEC §7a)', cMid > 0 && cMid < 1 && cEnd === 1, `${cMid.toFixed(2)} → ${cEnd}`);
await page.mouse.move(5, 5);
await page.waitForTimeout(1400);
const textFits = await page.$$eval('.friend', (fs) =>
  fs.map((f) => f.querySelector('.friend__text').getBoundingClientRect().bottom <= f.getBoundingClientRect().bottom),
);
check('friends: every hover text fits in its card', textFits.every(Boolean), textFits.join('/'));

// ---------- external links ----------
const ext = await page.$$eval('a[target="_blank"]', (as) => as.map((a) => [a.href, a.rel]));
const want = ['behance.net/valeriamalashe', 'parajanovmuseum.am', 'figma.com/design/QQ8RxQkI5wcDPCWsRXuhYA', 'linkedin.com/in/valeriia-malashevska', 'pin.it/3mS7BNqn4'];
check('links: all external targets present with rel=noopener', want.every((u) => ext.some(([h, r]) => h.includes(u) && r === 'noopener')), `${ext.length} links`);
const nav = await page.$$eval('.site-header a', (as) => as.map((a) => a.getAttribute('href')));
check('header: brand → /, menu → sections', nav.join() === '/,/art-project,/galeria,/filmy', nav.join());

// ---------- reveal + CLS ----------
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const pending = await page.$$eval('[data-reveal] > .hs__in.is-pending', (e) => e.length);
check('reveal: below-the-fold sections start hidden', pending >= 5, String(pending));
// shifts from now on (the buffered entry at boot is the dev server injecting CSS from JS)
await page.evaluate(() => {
  window.__cls = 0;
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift' });
});
const h0 = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= h0; y += 400) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(900);
const left = await page.$$eval('[data-reveal] > .hs__in', (e) => e.filter((x) => Number(getComputedStyle(x).opacity) < 1).length);
check('reveal: all sections visible after scrolling', left === 0, String(left));
const cls = await page.evaluate(() => window.__cls);
const h1 = await page.evaluate(() => document.documentElement.scrollHeight);
check('reveal: CLS = 0, page height stable (8171 − 861 + viewport-high hero)', cls === 0 && h0 === h1 && near(h1, 8171 - 861 + 982), `cls ${cls}, ${h0}→${h1}`);

check('console: no errors', errors.length === 0, errors.join(' | '));
// expected navigations: goBack from /filmy (+1) and the explicit goto before the reveal test (+1)
if (reloads > 2) console.log(`WARN  dev server reloaded the page ${reloads - 2}× during the run — rerun if checks above failed`);
await ctx.close();
const vids = await readdir(videoDir);
if (vids[0]) await rename(join(videoDir, vids[0]), join(OUT, 'home-interaction.webm'));

// ---------- reduced motion: no hidden sections ----------
const rctx = await browser.newContext({ viewport: { width: 1512, height: 982 }, reducedMotion: 'reduce' });
const rp = await rctx.newPage();
await rp.goto(BASE + '/', { waitUntil: 'networkidle' });
check('reduced motion: nothing pending', (await rp.$$eval('.is-pending', (e) => e.length)) === 0);
await rp.locator('.sel__col').nth(1).locator('.sel__toggle').click();
await rp.waitForTimeout(50);
const rw = await rp.$$eval('.sel__col', (cs) => cs.map((c) => Math.round(c.getBoundingClientRect().width)));
check('reduced motion: selector switches instantly', near(rw[1], 584), rw.join('/'));
await rctx.close();

// ---------- widths ----------
for (const width of [1280, 1920, 390]) {
  const c = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  for (const s of ['.goals', '.sel', '.bio', '.museum', '.friends', '.home-footer']) await p.locator(s).scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(`width ${width}: no horizontal scroll`, overflow === 0, `overflow ${overflow}`);
  await p.screenshot({ path: join(OUT, `home-w${width}.png`), fullPage: true });
  await c.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
