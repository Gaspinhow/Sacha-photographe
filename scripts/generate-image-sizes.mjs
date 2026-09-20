// Génère data/image-sizes.json : les dimensions réelles de chaque photo du site.
// Les pages s'en servent pour afficher les images à leur format d'origine,
// sans recadrage et sans réserver une place au mauvais ratio.
import sharp from 'sharp';
import { readdir, stat, writeFile } from 'fs/promises';
import { join, relative } from 'path';

const PUBLIC_DIR = './public';
// Seul ce dossier est livré : les originaux lourds restent hors dépôt.
const SCAN_DIRS = ['./public/images-compressed'];
const OUTPUT = './data/image-sizes.json';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp)$/i.test(entry)) out.push(full);
  }
  return out;
}

const sizes = {};
for (const dir of SCAN_DIRS) {
  for (const file of await walk(dir)) {
    const meta = await sharp(file).metadata();
    // orientation >= 5 : l'EXIF demande une rotation de 90°, largeur et hauteur sont inversées
    const swap = meta.orientation >= 5;
    const key = '/' + relative(PUBLIC_DIR, file);
    sizes[key] = { w: swap ? meta.height : meta.width, h: swap ? meta.width : meta.height };
  }
}

const ordered = Object.fromEntries(Object.keys(sizes).sort().map(k => [k, sizes[k]]));
await writeFile(OUTPUT, JSON.stringify(ordered, null, 2) + '\n');
console.log(`${Object.keys(ordered).length} images indexées dans ${OUTPUT}`);
