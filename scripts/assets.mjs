#!/usr/bin/env node
/**
 * Raster pipeline. Input: figma/assets-src/<section>/<name>@2x.png — Figma node renders at 2×.
 * Output: public/img/<section>/<name>-{1x,2x}.{avif,webp} and one manifest per top-level section,
 * src/generated/images/<section>.json ({ "<section>/<name>": { w, h } } in design px), so sections
 * can be built in parallel. Unchanged inputs are skipped.
 *
 * Usage: node scripts/assets.mjs            (all)
 *        node scripts/assets.mjs art/sn      (only keys under a prefix)
 */
import { readdir, stat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'figma/assets-src');
const OUT = join(ROOT, 'public/img');
const MANIFESTS = join(ROOT, 'src/generated/images');
const prefix = process.argv[2] ?? '';

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('figma-export-')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('@2x.png')) out.push(p);
  }
  return out;
};

const exists = async (p) => stat(p).then((s) => s, () => null);

const manifests = new Map();
const manifestFor = async (section) => {
  if (!manifests.has(section)) {
    const file = join(MANIFESTS, `${section}.json`);
    manifests.set(section, JSON.parse(await readFile(file, 'utf8').catch(() => '{}')));
  }
  return manifests.get(section);
};
const files = (await walk(SRC)).filter((f) => relative(SRC, f).startsWith(prefix));
let built = 0;

for (const file of files) {
  const key = relative(SRC, file).replace(/@2x\.png$/, '');
  const src = sharp(file);
  const meta = await src.metadata();
  const w = Math.round(meta.width / 2);
  const h = Math.round(meta.height / 2);
  (await manifestFor(key.split('/')[0]))[key] = { w, h };

  const base = join(OUT, key);
  const target = `${base}-2x.avif`;
  const [s, t] = await Promise.all([stat(file), exists(target)]);
  if (t && t.mtimeMs >= s.mtimeMs) continue;

  await mkdir(dirname(base), { recursive: true });
  const one = sharp(file).resize(w, h);
  await Promise.all([
    sharp(file).avif({ quality: 55, effort: 5 }).toFile(`${base}-2x.avif`),
    sharp(file).webp({ quality: 78, effort: 5 }).toFile(`${base}-2x.webp`),
    one.clone().avif({ quality: 60, effort: 5 }).toFile(`${base}-1x.avif`),
    one.clone().webp({ quality: 80, effort: 5 }).toFile(`${base}-1x.webp`),
  ]);
  built++;
}

await mkdir(MANIFESTS, { recursive: true });
for (const [section, m] of manifests) {
  const sorted = Object.fromEntries(Object.entries(m).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(join(MANIFESTS, `${section}.json`), JSON.stringify(sorted, null, 1) + '\n');
}
console.log(`assets: ${files.length} inputs, ${built} built, sections: ${[...manifests.keys()].join(', ')}`);
