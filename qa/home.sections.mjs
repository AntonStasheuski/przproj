#!/usr/bin/env node
/**
 * 1× section diff for the home page: screenshots section states (selector A/G/F, bio 1–5,
 * museum hover, friend hover cards) and diffs them with figma/ref/home/*.png (figma_local 1× exports).
 * Usage: node qa/home.sections.mjs → qa/out/home-sec-<name>.{site,diff}.png + mismatch %.
 */
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'qa/out');
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 982 }, reducedMotion: 'reduce' });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const diff = async (name, shot) => {
  const ref = await readFile(join(ROOT, 'figma/ref/home', `${name}.png`));
  const { width: W, height: H } = await sharp(ref).metadata();
  const site = await sharp(shot).resize(W, H, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const r = await sharp(ref).ensureAlpha().raw().toBuffer();
  const d = new PNG({ width: W, height: H });
  const n = pixelmatch(r, site, d.data, W, H, { threshold: 0.12, includeAA: false });
  await writeFile(join(OUT, `home-sec-${name}.diff.png`), PNG.sync.write(d));
  await sharp(site, { raw: { width: W, height: H, channels: 4 } }).png().toFile(join(OUT, `home-sec-${name}.site.png`));
  console.log(`${name.padEnd(24)} ${((n / (W * H)) * 100).toFixed(2)}%`);
};
const shoot = async (sel, clip) => {
  const el = page.locator(sel);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const b = await el.boundingBox();
  return page.screenshot({ clip: { x: b.x + (clip?.x ?? 0), y: b.y + (clip?.y ?? 0), width: clip?.w ?? b.width, height: clip?.h ?? b.height } });
};

const cols = page.locator('.sel__col');
await diff('sel-art', await shoot('.sel'));
await cols.nth(1).locator('.sel__toggle').click();
await diff('sel-galeria', await shoot('.sel'));
await cols.nth(2).locator('.sel__toggle').click();
await diff('sel-filmy', await shoot('.sel'));

for (let i = 1; i <= 5; i++) {
  if (i > 1) await page.locator('.bio__chev.arrow--next').click();
  await diff(`bio-${i}`, await shoot('.bio'));
}

await page.locator('.museum__link').hover();
await page.waitForTimeout(200);
await diff('museum-hover', await shoot('.museum__link'));

for (const [n, name] of [[0, 'fellini'], [2, 'tarkowski']]) {
  const card = page.locator('.friend').nth(n);
  await card.hover();
  await page.waitForTimeout(200);
  await diff(`friend-${name}-hover`, await shoot(`.friend:nth-child(${n + 1})`));
}
await browser.close();
