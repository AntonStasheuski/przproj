#!/usr/bin/env node
/**
 * One-off helper: for every fact finds the --b (bottom offset) value that best matches the Figma
 * reference (text layers sit at slightly different heights per frame); results go into data.ts.
 * Usage: node qa/fakty.fit-widths.mjs  (dev server on :5173)
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const refs = await readdir(join(ROOT, 'figma/ref/all'));
const FILMS = {
  andrijesz: ['211-227', '217-278', '217-317', '217-396', '217-448'],
  cienie: ['235-631', '235-677', '235-1230', '235-1288', '235-1349'],
  'kijowskie-freski': ['235-1419', '237-1550', '237-1606', '237-1664', '240-1726'],
  'sajat-nowa': ['240-1863', '241-1980', '243-2052', '243-2112', '243-2174'],
  legenda: ['244-2241', '245-2319', '245-2374', '245-2432', '245-2493'],
  'aszik-kerib': ['245-2568', '247-2644', '247-2699', '248-2758', '248-2819'],
};
const CROP = { left: 26, top: 300, width: 700, height: 440 };
/** bright text pixels only: the pictures differ by a few px in the reference, the glyphs do not */
const mask = (buf) => Uint8Array.from({ length: buf.length / 4 }, (_, i) => (buf[i * 4] > 235 && buf[i * 4 + 1] > 235 && buf[i * 4 + 2] > 235 ? 1 : 0));
const xor = (a, b) => a.reduce((n, v, i) => n + (v ^ b[i]), 0);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 982 }, reducedMotion: 'reduce' });
for (const [slug, ids] of Object.entries(FILMS)) {
  for (let k = 2; k <= 5; k++) {
    const refFile = refs.find((f) => f.startsWith(ids[k - 1] + '__'));
    const ref = await sharp(await readFile(join(ROOT, 'figma/ref/all', refFile))).extract(CROP).ensureAlpha().raw().toBuffer().then(mask);
    await page.goto(`${BASE}/filmy/fakty/${slug}?krok=${k}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const w0 = await page.evaluate(() => Number(getComputedStyle(document.querySelector('.fk-panel[data-slot="0"] .fk-body')).getPropertyValue('--w')));
    let best = null;
    for (let b = 14; b <= 40; b++) {
      await page.evaluate((b) => document.querySelector('.fk-panel[data-slot="0"] .fk-body').style.setProperty('--b', String(b)), b);
      const shot = mask(await sharp(await page.screenshot()).extract(CROP).ensureAlpha().raw().toBuffer());
      const n = xor(ref, shot);
      if (!best || n < best.n) best = { w: b, n };
    }
    console.log(slug, k, 'best bottom', best.w, 'diff px', best.n);
  }
}
await browser.close();
