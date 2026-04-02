import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images-compressed';
const MAX_WIDTH = 2400;
const QUALITY = 82;

async function compressImages() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

  console.log(`\n${images.length} images trouvées\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of images) {
    const inputPath = join(INPUT_DIR, file);
    const outputName = basename(file, extname(file)) + '.webp';
    const outputPath = join(OUTPUT_DIR, outputName);

    const statBefore = await stat(inputPath);
    const sizeBefore = statBefore.size;

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const statAfter = await stat(outputPath);
    const sizeAfter = statAfter.size;

    const reduction = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);

    totalBefore += sizeBefore;
    totalAfter += sizeAfter;

    console.log(`${file} → ${outputName}`);
    console.log(`  ${(sizeBefore / 1024 / 1024).toFixed(1)} Mo → ${(sizeAfter / 1024 / 1024).toFixed(1)} Mo  (-${reduction}%)`);
  }

  console.log('\n=== RÉSUMÉ ===');
  console.log(`Total avant : ${(totalBefore / 1024 / 1024).toFixed(0)} Mo`);
  console.log(`Total après : ${(totalAfter / 1024 / 1024).toFixed(0)} Mo`);
  console.log(`Gain total  : ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
  console.log(`\nImages compressées dans : ${OUTPUT_DIR}`);
}

compressImages().catch(console.error);
