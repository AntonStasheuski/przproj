// Diffs every Figma frame against its route/state (SPEC §2). Writes qa/out/compare-all.json.
// Usage: node qa/compare-all.mjs   (dev server on :5173 or BASE_URL)
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';

const refs = readdirSync('figma/ref/all').filter((f) => f.endsWith('.png'));
const ref = (id) => refs.find((f) => f.startsWith(`${id}__`))?.replace(/\.png$/, '');
const series = (base, ids, factIds = []) => [
  ...ids.map((id, i) => [id, i ? `${base}?krok=${i + 1}` : base]),
  ...factIds.map((id, i) => [id, `${base}?fakt=${i + 1}`]),
];
const FRAMES = [
  ['1-2', '/', ['--full', '--scale', '0.5', '--height', '861']],
  ['29-88', '/art-project'],
  ...series('/art-project/sajat-nowa', ['490-4619', '490-4670', '437-3876', '437-3971', '437-4068', '437-4167', '437-4268', '437-4466', '437-4571'], ['484-3908', '484-4021', '484-4134', '484-4247']),
  ...series('/art-project/cienie-zapomnianych-przodkow', ['415-2709', '416-3278', '416-3393', '416-3557', '416-3641', '416-3727', '416-3815', '416-3948'], ['480-3743', '480-3991', '480-4079', '480-4167']),
  ...series('/art-project/aszik-kerib', ['436-3611', '442-4889', '442-5020', '442-5116', '442-5214', '442-5314', '442-5416', '442-5520', '444-5774'], ['488-4088', '488-4196', '488-4291', '488-4387']),
  ['344-2041', '/galeria'], ['344-2188', '/galeria?krok=2'],
  ...['325-2755', '344-2288', '344-2439', '344-2532', '344-2625', '493-5007'].map((id, i) => [id, `/galeria/${i + 1}`]),
  ['493-5111', '/galeria/1'],
  ['191-227', '/filmy'], ['198-350', '/filmy/plakaty'], ['376-2679', '/filmy/plakaty?krok=2'],
  ['378-2705', '/filmy/fakty'], ['378-2732', '/filmy/fakty?krok=2'],
  ...[['398-2905', 'andrijesz'], ['401-2575', 'cienie'], ['401-2991', 'kijowskie-freski'], ['401-3400', 'sajat-nowa'], ['401-3809', 'legenda'], ['401-4218', 'aszik-kerib'], ['401-4636', 'andrijesz']].map(([id, s]) => [id, `/filmy/${s}`, ['--full']]),
  ...series('/filmy/fakty/andrijesz', ['211-227', '217-278', '217-317', '217-396', '217-448']),
  ...series('/filmy/fakty/cienie', ['235-631', '235-677', '235-1230', '235-1288', '235-1349']),
  ...series('/filmy/fakty/kijowskie-freski', ['235-1419', '237-1550', '237-1606', '237-1664', '240-1726']),
  ...series('/filmy/fakty/sajat-nowa', ['240-1863', '241-1980', '243-2052', '243-2112', '243-2174']),
  ...series('/filmy/fakty/legenda', ['244-2241', '245-2319', '245-2374', '245-2432', '245-2493']),
  ...series('/filmy/fakty/aszik-kerib', ['245-2568', '247-2644', '247-2699', '248-2758', '248-2819']),
  ['249-520', '/filmy/kraje'],
  ...series('/filmy/kraje/ukraina', ['252-721', '265-750', '265-856', '265-909']),
  ...series('/filmy/kraje/gruzja', ['288-572', '305-1761', '305-1843', '305-1925']),
  ...series('/filmy/kraje/armenia', ['309-2016', '352-1943', '352-2023', '352-2103']),
];
const out = [];
for (const [id, path, extra = []] of FRAMES) {
  const name = ref(id);
  if (!name) { out.push({ id, path, error: 'no ref' }); continue; }
  try {
    const line = execFileSync('node', ['scripts/compare.mjs', path, name, ...extra], { encoding: 'utf8', timeout: 120000 }).trim().split('\n').pop();
    out.push({ id, ...JSON.parse(line) });
  } catch (e) {
    out.push({ id, path, ref: name, error: String(e.message).slice(0, 200) });
  }
  console.log(JSON.stringify(out.at(-1)));
}
writeFileSync('qa/out/compare-all.json', JSON.stringify(out, null, 1));
console.log(`frames: ${out.length}, errors: ${out.filter((o) => o.error).length}`);
