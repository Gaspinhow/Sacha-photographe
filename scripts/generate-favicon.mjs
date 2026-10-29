// Fabrique app/favicon.ico à partir du logo.
//
// Next sert déjà app/icon.svg, mais Google cherche d'abord /favicon.ico : sans
// ce fichier, le résultat de recherche affiche l'icône générique. Google
// recommande une icône carrée dont le côté est un multiple de 48 : on embarque
// 16, 32 et 48 px dans le même .ico.
import sharp from 'sharp';
import { writeFile } from 'fs/promises';

const SOURCE = './app/icon.svg';
const SORTIE = './app/favicon.ico';
// 48 en premier : Next reprend la taille de la première image dans la balise
// <link sizes>, et c'est celle que Google recommande.
const TAILLES = [48, 32, 16];

// Google, Android et iOS affichent les favicons dans un cercle. Un dessin qui
// touche les bords du carré se fait rogner : le demi-dôme y perdait sa base.
// On le réduit pour qu'il tienne dans le cercle inscrit, le reste est de la marge.
const PART_DESSIN = 0.72;

const images = [];
for (const taille of TAILLES) {
  const dessin = Math.round(taille * PART_DESSIN);
  const marge = Math.round((taille - dessin) / 2);

  const png = await sharp(SOURCE, { density: 600 })
    .resize(dessin, dessin, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .extend({
      top: marge,
      bottom: taille - dessin - marge,
      left: marge,
      right: taille - dessin - marge,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  images.push({ taille, png });
}

// En-tête ICONDIR : 2 octets réservés, type 1 (icône), nombre d'images
const entete = Buffer.alloc(6);
entete.writeUInt16LE(0, 0);
entete.writeUInt16LE(1, 2);
entete.writeUInt16LE(images.length, 4);

// Une entrée ICONDIRENTRY de 16 octets par image, puis les PNG à la suite
let offset = entete.length + images.length * 16;
const entrees = [];
for (const { taille, png } of images) {
  const e = Buffer.alloc(16);
  e.writeUInt8(taille === 256 ? 0 : taille, 0); // largeur
  e.writeUInt8(taille === 256 ? 0 : taille, 1); // hauteur
  e.writeUInt8(0, 2);  // palette : aucune
  e.writeUInt8(0, 3);  // réservé
  e.writeUInt16LE(1, 4);   // plans
  e.writeUInt16LE(32, 6);  // bits par pixel
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  entrees.push(e);
  offset += png.length;
}

await writeFile(SORTIE, Buffer.concat([entete, ...entrees, ...images.map((i) => i.png)]));
console.log(`${SORTIE} écrit — ${TAILLES.join(', ')} px, ${offset} octets`);
