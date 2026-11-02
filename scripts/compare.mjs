#!/usr/bin/env node
/**
 * Visual diff against Figma references (figma/ref/all/*.png, 1:1 frame exports).
 *
 * Usage: node scripts/compare.mjs <url-path> <ref-name> [--wait 2500] [--full] [--scale 0.5] [--click "<selector>" ...]
 *   url-path  e.g. /art-project/sajat-nowa?krok=3
 *   ref-name  file in figma/ref/all without extension, e.g. 437-3971__sn-3-art-rrj
 *   --full    full-page screenshot (long pages: home, film pages)
 *   --scale   downscale the page screenshot before diffing (home ref is 0.5×)
 * Needs the dev server (npm run dev, port 5173) or BASE_URL.
 * Writes qa/out/<ref>.{site,diff}.png and prints mismatch %.
 */
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const [path, ref] = args;
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const clicks = args.flatMap((a, i) => (a === '--click' ? [args[i + 1]] : []));
const ROOT = new URL('..', import.meta.url).pathname;
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const out = join(ROOT, 'qa/out');
await mkdir(out, { recursive: true });

// references wider than the frame: Figma exports overflowing content on the left, the frame is the right-most 1512px
let refBuf = await readFile(join(ROOT, 'figma/ref/all', `${ref}.png`));
let refMeta = await sharp(refBuf).metadata();
if (refMeta.width > 1513) {
  refBuf = await sharp(refBuf).extract({ left: refMeta.width - 1512, top: 0, width: 1512, height: refMeta.height }).png().toBuffer();
  refMeta = await sharp(refBuf).metadata();
}
const scale = Number(opt('--scale', '1'));
const full = args.includes('--full');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 982 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(BASE + path, { waitUntil: 'networkidle' });
for (const sel of clicks) {
  await page.click(sel);
  await page.waitForTimeout(300);
}
await page.evaluate(() => document.fonts.ready);
if (full) {
  // scroll through long pages so lazy images load, then wait for every image to finish
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await Promise.all(Array.from(document.images).map((i) => (i.complete ? null : i.decode().catch(() => null))));
  });
}
await page.waitForTimeout(Number(opt('--wait', '600')));
let shot = await page.screenshot({ fullPage: full });
await browser.close();

const W = Math.round(refMeta.width);
const H = Math.round(refMeta.height);
let pipe = sharp(shot);
if (scale !== 1) pipe = pipe.resize(Math.round(1512 * scale));
shot = await pipe.png().toBuffer();
// align canvas sizes (crop/pad to the reference)
const site = await sharp(shot).extend({ right: Math.max(0, W - (await sharp(shot).metadata()).width), bottom: Math.max(0, H - (await sharp(shot).metadata()).height), background: '#ff00ff' }).extract({ left: 0, top: 0, width: W, height: H }).ensureAlpha().raw().toBuffer();
const refRaw = await sharp(refBuf).ensureAlpha().raw().toBuffer();
const diff = new PNG({ width: W, height: H });
const n = pixelmatch(refRaw, site, diff.data, W, H, { threshold: 0.12, includeAA: false });
await writeFile(join(out, `${ref}.diff.png`), PNG.sync.write(diff));
await sharp(site, { raw: { width: W, height: H, channels: 4 } }).png().toFile(join(out, `${ref}.site.png`));
const pct = ((n / (W * H)) * 100).toFixed(2);
console.log(JSON.stringify({ ref, path, mismatch: `${pct}%`, pixels: n, consoleErrors: errors }));
