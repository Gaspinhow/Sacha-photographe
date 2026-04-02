import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DIRS = ['./app', './components', './data'];
const EXTENSIONS = ['.jsx', '.json', '.js'];

async function getAllFiles(dir) {
  let results = [];
  const items = await readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(await getAllFiles(fullPath));
    } else if (EXTENSIONS.some(ext => item.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

async function updateRefs() {
  let files = [];
  for (const dir of DIRS) {
    files = files.concat(await getAllFiles(dir));
  }

  let totalReplaced = 0;

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    // Replace /images/filename.jpg|jpeg|png → /images-compressed/filename.webp
    // But NOT /images/pdf/... paths
    const updated = content.replace(
      /("\/images\/)([a-zA-Z0-9_-]+)\.(jpg|jpeg|png)(")/g,
      (_, prefix, name, ext, suffix) => `"/images-compressed/${name}.webp"`
    );

    if (updated !== content) {
      const count = (content.match(/("\/images\/)([a-zA-Z0-9_-]+)\.(jpg|jpeg|png)(")/g) || []).length;
      totalReplaced += count;
      await writeFile(file, updated, 'utf-8');
      console.log(`✓ ${file} (${count} remplacement(s))`);
    }
  }

  console.log(`\nTotal : ${totalReplaced} référence(s) mises à jour`);
}

updateRefs().catch(console.error);
