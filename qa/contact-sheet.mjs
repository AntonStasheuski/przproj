// Screenshots every page type at 1512×982 and tiles them into qa/out/contact.png (for a quick visual audit).
import { chromium } from '@playwright/test';
import sharp from 'sharp';
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/art-project', '/art-project/sajat-nowa', '/art-project/sajat-nowa?krok=9', '/galeria', '/galeria/2', '/filmy', '/filmy/plakaty', '/filmy/andrijesz', '/filmy/fakty', '/filmy/fakty/andrijesz?krok=2', '/filmy/kraje', '/filmy/kraje/ukraina?krok=2', '/nie-ma'];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1512, height: 982 }, reducedMotion: 'reduce' });
const tiles = [];
for (const path of paths) {
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const buf = await p.screenshot();
  tiles.push(await sharp(buf).resize(504).png().toBuffer());
}
await b.close();
const cols = 3, w = 504, h = 327, rows = Math.ceil(tiles.length / cols);
await sharp({ create: { width: cols * w + (cols - 1) * 6, height: rows * h + (rows - 1) * 6, channels: 3, background: '#ff00ff' } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * (w + 6), top: Math.floor(i / cols) * (h + 6) })))
  .png().toFile('qa/out/contact.png');
console.log('qa/out/contact.png', paths.length);
