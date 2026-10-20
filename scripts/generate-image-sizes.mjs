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
// Paliers imposés par le cahier des charges V2
const WIDTHS = [400, 800, 1600];
// Plafonds du cahier : 300 Ko par vignette, 600 Ko en plein écran.
// On baisse la qualité par paliers jusqu'à passer sous la limite.
const PLAFOND_KO = { 400: 150, 800: 300, 1600: 600, max: 600 };
const QUALITES = [82, 74, 66, 58, 50];

// Les déclinaisons portent un suffixe qui ne peut pas apparaître dans un nom
// de photo livré. Un simple "-800" ne suffisait pas : « 01_sitl-2025-2026.webp »
// était pris pour une déclinaison, donc supprimé au passage suivant.
const SUFFIXE = (largeur) => `@${largeur}w.webp`;
const isGenerated = (name) => /@\d+w\.webp$/.test(name);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else if (/\.webp$/i.test(entry)) out.push(full);
  }
  return out;
}

// Réencode en baissant la qualité jusqu'à passer sous le plafond.
// Écrire sur le fichier source directement n'est pas possible avec sharp :
// on passe par un buffer.
async function encoderSousPlafond(source, destination, largeur, plafondKo) {
  let dernier = null;
  for (const qualite of QUALITES) {
    const buffer = await sharp(source)
      .rotate()
      .resize({ width: largeur, withoutEnlargement: true })
      .webp({ quality: qualite })
      .toBuffer();
    dernier = buffer;
    if (buffer.length / 1024 <= plafondKo) break;
  }
  await writeFile(destination, dernier);
}

const all = await walk(SCAN_DIR);

// On repart d'une base propre : sinon une photo remplacée laisse ses anciennes tailles
for (const file of all.filter((f) => isGenerated(f))) await rm(file);

const sources = (await walk(SCAN_DIR)).filter((f) => !isGenerated(f));
const sizes = {};
let generated = 0;
let allege = 0;

for (const file of sources) {
  const meta = await sharp(file).metadata();
  const swap = meta.orientation >= 5; // l'EXIF demande une rotation d'un quart de tour
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;
  const key = '/' + relative(PUBLIC_DIR, file);

  const variants = [];
  for (const target of WIDTHS) {
    if (target >= w) continue; // jamais d'agrandissement
    const out = file.replace(/\.webp$/i, SUFFIXE(target));
    await encoderSousPlafond(file, out, target, PLAFOND_KO[target]);
    variants.push({ w: target, src: '/' + relative(PUBLIC_DIR, out) });
    generated++;
  }

  // Le fichier pleine taille est celui qu'ouvre la visionneuse : il doit lui
  // aussi tenir sous les 600 Ko. 18 images le dépassaient.
  const poidsKo = (await stat(file)).size / 1024;
  if (poidsKo > PLAFOND_KO.max) {
    await encoderSousPlafond(file, file, w, PLAFOND_KO.max);
    allege++;
  }
  variants.push({ w, src: key });

  sizes[key] = { w, h, variants };
}

const ordered = Object.fromEntries(Object.keys(sizes).sort().map((k) => [k, sizes[k]]));
await writeFile(OUTPUT, JSON.stringify(ordered, null, 2) + '\n');
console.log(`${Object.keys(ordered).length} photos indexées, ${generated} déclinaisons générées, ${allege} originaux allégés sous 600 Ko`);
