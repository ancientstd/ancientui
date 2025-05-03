import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const srcRoot = 'src';
const folders = ['components', 'hooks', 'lib', 'providers', 'ui'];
const outputFile = join(srcRoot, 'index.ts');

function getExports(dir) {
  const fullDirPath = join(srcRoot, dir);
  const files = readdirSync(fullDirPath);

  return files
    .filter((file) => {
      const fullPath = join(fullDirPath, file);
      const isFile = statSync(fullPath).isFile();
      const isTsOrTsx = ['.ts', '.tsx'].includes(extname(file));
      const isIndex = basename(file).startsWith('index');
      return isFile && isTsOrTsx && !isIndex;
    })
    .map((file) => {
      const name = basename(file, extname(file));
      return `export * from './${dir}/${name}';`;
    });
}

let allExports = [];
for (const folder of folders) {
  allExports = allExports.concat(getExports(folder));
}

writeFileSync(outputFile, allExports.join('\n') + '\n');
console.log(`✅ Generated ${outputFile}`);
