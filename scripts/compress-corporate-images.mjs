// Les photos corporate (public/images/pdf) étaient servies en JPEG brut,
// parfois 17 Mo pour une seule image. On les convertit en WebP dans
// public/images-compressed/pdf en gardant l'arborescence, puis on repointe
// les fiches projet. Les originaux restent en place, rien n'est supprimé.
import sharp from 'sharp';
import { readdir, stat, mkdir, readFile, writeFile } from 'fs/promises';
import { join, extname, basename, relative } from 'path';

const INPUT_DIR = './public/images/pdf';
const OUTPUT_DIR = './public/images-compressed/pdf';
const PROJECTS_DIR = './data/projects';
const MAX_WIDTH = 2400;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else if (/\.(jpe?g|png)$/i.test(entry)) out.push(full);
  }
  return out;
}

const mapping = {};
let before = 0;
let after = 0;

for (const input of await walk(INPUT_DIR)) {
  const rel = relative(INPUT_DIR, input);
  const outPath = join(OUTPUT_DIR, rel.replace(extname(rel), '') + '.webp');
  await mkdir(join(outPath, '..'), { recursive: true });

  await sharp(input)
    .rotate() // applique l'orientation EXIF, sinon les portraits ressortent couchés
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  before += (await stat(input)).size;
  after += (await stat(outPath)).size;

  mapping['/' + relative('./public', input)] = '/' + relative('./public', outPath);
  console.log(`${basename(input)} → ${basename(outPath)}`);
}

// Repointage des fiches projet
let refs = 0;
for (const file of await readdir(PROJECTS_DIR)) {
  if (!file.endsWith('.json')) continue;
  const path = join(PROJECTS_DIR, file);
  let content = await readFile(path, 'utf-8');
  const original = content;
  for (const [from, to] of Object.entries(mapping)) {
    if (content.includes(`"${from}"`)) {
      content = content.split(`"${from}"`).join(`"${to}"`);
      refs++;
    }
  }
  if (content !== original) {
    await writeFile(path, content, 'utf-8');
    console.log(`✓ ${file}`);
  }
}

const mo = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\n${mo(before)} Mo → ${mo(after)} Mo (-${(((before - after) / before) * 100).toFixed(1)}%)`);
console.log(`${refs} référence(s) mises à jour dans les fiches projet`);
