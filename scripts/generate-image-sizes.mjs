// Prépare les images pour le web et écrit data/image-sizes.json.
//
// Pour chaque photo de public/images-compressed, on génère des versions plus
// petites (suffixe -400, -800, ...) et on note ses dimensions réelles.
// Les pages s'en servent pour deux choses :
//   - afficher la photo à son format d'origine, sans recadrage ni saut de mise en page
//   - laisser le navigateur télécharger la largeur qui correspond à l'écran,
//     au lieu d'envoyer du 2400 px sur un téléphone
//
// Relancer après tout ajout de photo :  npm run images
import sharp from 'sharp';
import { readdir, stat, writeFile, rm } from 'fs/promises';
import { join, relative, extname } from 'path';

const PUBLIC_DIR = './public';
const SCAN_DIR = './public/images-compressed';
const OUTPUT = './data/image-sizes.json';
// 400 : téléphone en 1x   800 : téléphone en 2x et vignettes retina
// 1200 : colonne de page projet en 2x   l'original (2400) sert la visionneuse
const WIDTHS = [400, 800, 1200];
const QUALITY = 82;

// Les fichiers déjà générés par un passage précédent, pour ne pas les réindexer
const isGenerated = (name) => /-(\d+)\.webp$/.test(name);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else if (/\.webp$/i.test(entry)) out.push(full);
  }
  return out;
}

const all = await walk(SCAN_DIR);

// On repart d'une base propre : sinon une photo remplacée laisse ses anciennes tailles
for (const file of all.filter((f) => isGenerated(f))) await rm(file);

const sources = (await walk(SCAN_DIR)).filter((f) => !isGenerated(f));
const sizes = {};
let generated = 0;

for (const file of sources) {
  const meta = await sharp(file).metadata();
  const swap = meta.orientation >= 5; // l'EXIF demande une rotation d'un quart de tour
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;
  const key = '/' + relative(PUBLIC_DIR, file);

  const variants = [];
  for (const target of WIDTHS) {
    if (target >= w) continue; // jamais d'agrandissement
    const out = file.replace(/\.webp$/i, `-${target}.webp`);
    await sharp(file).rotate().resize({ width: target }).webp({ quality: QUALITY }).toFile(out);
    variants.push({ w: target, src: '/' + relative(PUBLIC_DIR, out) });
    generated++;
  }
  variants.push({ w, src: key });

  sizes[key] = { w, h, variants };
}

const ordered = Object.fromEntries(Object.keys(sizes).sort().map((k) => [k, sizes[k]]));
await writeFile(OUTPUT, JSON.stringify(ordered, null, 2) + '\n');
console.log(`${Object.keys(ordered).length} photos indexées, ${generated} déclinaisons générées`);
