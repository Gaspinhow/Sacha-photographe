// Importe les photos corporate livrées (public/images/v2) vers le site :
// conversion WebP, orientation EXIF respectée, plafonds de poids du cahier,
// puis écriture de data/clients.json consommé par la page Corporate.
//
// Les originaux restent hors dépôt ; relancer après toute livraison de photos :
//   node scripts/import-photos-corporate.mjs && npm run images
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename, extname } from 'path';
import { CLIENTS } from '../data/clients.config.mjs';

const SOURCE = './public/images/v2';
const SORTIE = './public/images-compressed/v2';
const MANIFESTE = './data/clients.json';
const LARGEUR_MAX = 2400;
const PLAFOND_KO = 600;
const QUALITES = [82, 74, 66, 58, 50];

if (!existsSync(SOURCE)) {
  console.error(`Dossier source introuvable : ${SOURCE}`);
  console.error("Copiez-y les photos livrées (un dossier par client) puis relancez.");
  process.exit(1);
}

// Encode en baissant la qualité jusqu'à passer sous le plafond.
async function encoder(source, destination) {
  let dernier = null;
  for (const qualite of QUALITES) {
    const buffer = await sharp(source)
      .rotate() // applique l'orientation EXIF : sans ça les portraits ressortent couchés
      .resize({ width: LARGEUR_MAX, withoutEnlargement: true })
      .webp({ quality: qualite })
      .toBuffer();
    dernier = buffer;
    if (buffer.length / 1024 <= PLAFOND_KO) break;
  }
  await writeFile(destination, dernier);
  return dernier.length;
}

const photosDe = async (dossier) =>
  (await readdir(dossier))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort(); // les noms sont numérotés : 01 est la couverture

await rm(SORTIE, { recursive: true, force: true });

const clients = [];
let total = 0;
let octets = 0;

for (const client of CLIENTS) {
  const dossierClient = join(SOURCE, client.dossier);
  if (!existsSync(dossierClient)) {
    console.error(`  MANQUANT : ${client.dossier} (client ${client.nom})`);
    process.exitCode = 1;
    continue;
  }

  const reportages = [];
  for (const reportage of client.reportages) {
    const dossier = reportage.sousDossier ? join(dossierClient, reportage.sousDossier) : dossierClient;
    if (!existsSync(dossier)) {
      console.error(`  MANQUANT : ${dossier} (${reportage.titre})`);
      process.exitCode = 1;
      continue;
    }

    const fichiers = await photosDe(dossier);
    if (fichiers.length === 0) {
      console.error(`  VIDE : ${dossier}`);
      process.exitCode = 1;
      continue;
    }

    const sortie = join(SORTIE, client.ancre, reportage.sousDossier ? reportage.sousDossier : '');
    await mkdir(sortie, { recursive: true });

    const images = [];
    for (const fichier of fichiers) {
      const nom = basename(fichier, extname(fichier)) + '.webp';
      const chemin = join(sortie, nom);
      octets += await encoder(join(dossier, fichier), chemin);
      images.push('/' + chemin.replace(/^\.?\/?public\//, ''));
      total++;
    }

    reportages.push({
      id: reportage.sousDossier
        ? reportage.sousDossier.replace(/^[a-z]_/, '')
        : client.ancre,
      titre: reportage.titre,
      images,
    });
  }

  clients.push({
    rang: client.rang,
    ancre: client.ancre,
    nom: client.nom,
    // La photo 01 du premier reportage est la plus forte : elle sert de couverture.
    couverture: reportages[0]?.images[0] ?? null,
    reportages,
  });
}

await writeFile(MANIFESTE, JSON.stringify(clients, null, 2) + '\n');

console.log(`${clients.length} clients, ${clients.reduce((a, c) => a + c.reportages.length, 0)} reportages, ${total} photos`);
console.log(`poids total : ${(octets / 1024 / 1024).toFixed(1)} Mo — plus lourde sous ${PLAFOND_KO} Ko`);
console.log(`manifeste écrit : ${MANIFESTE}`);
