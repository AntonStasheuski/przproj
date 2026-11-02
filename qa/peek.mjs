// Ad-hoc screenshot: node qa/peek.mjs <path> <width> <height> <out> [hoverSelector]
import { chromium } from '@playwright/test';
const [path, w, h, out, hover] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto('http://localhost:5173' + path, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
if (hover) await p.hover(hover);
await p.waitForTimeout(900);
await p.screenshot({ path: out });
await b.close();
