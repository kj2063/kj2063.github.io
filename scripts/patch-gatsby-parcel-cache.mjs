import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const targetFile = require.resolve('gatsby/dist/utils/parcel/compile-gatsby-files');
const marker = 'shouldDisableCache: true,';
const search = '    mode: `production`,\n    cache,';
const replacement = `    mode: \`production\`,\n    ${marker}\n    cache,`;

const source = await readFile(targetFile, 'utf8');

if (source.includes(marker)) {
  console.log('Gatsby Parcel cache patch already applied.');
} else if (source.includes(search)) {
  await writeFile(targetFile, source.replace(search, replacement), 'utf8');
  console.log('Applied Gatsby Parcel cache patch.');
} else {
  throw new Error(`Could not find Gatsby Parcel patch point in ${targetFile}`);
}
