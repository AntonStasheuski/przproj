#!/usr/bin/env node
/**
 * Moves a figma_local export batch into figma/assets-src/<section>/.
 * Batch files look like "007-layer-3.png"; the numeric prefix is dropped.
 * PNG renders exported at scale 2 get the "@2x" suffix the pipeline expects; SVGs go as is.
 *
 * Usage: node scripts/collect-export.mjs <batchDir> <section> [--svg-to <dir>]
 */
import { readdir, rename, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const [batch, section, flag, svgDir] = process.argv.slice(2);
if (!batch || !section) {
  console.error('usage: collect-export.mjs <batchDir> <section> [--svg-to <dir>]');
  process.exit(1);
}
const ROOT = new URL('..', import.meta.url).pathname;
const pngOut = join(ROOT, 'figma/assets-src', section);
const svgOut = flag === '--svg-to' && svgDir ? join(ROOT, svgDir) : join(ROOT, 'public/img', section);
await mkdir(pngOut, { recursive: true });
await mkdir(svgOut, { recursive: true });

let n = 0;
for (const f of await readdir(batch)) {
  const m = /^\d+-(.+)\.(png|svg)$/.exec(f);
  if (!m) continue;
  const [, name, ext] = m;
  const dest = ext === 'png' ? join(pngOut, `${name.replace(/@2x$/, '')}@2x.png`) : join(svgOut, `${name}.svg`);
  await rename(join(batch, f), dest);
  n++;
}
await rm(batch, { recursive: true, force: true });
console.log(`collected ${n} files → ${section}`);
