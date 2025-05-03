import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../dist');
const outputFile = path.join(outputDir, 'index.d.ts');
const categoryJSONFile = path.join(outputDir, 'categories.json');

function getAllIconFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach((item) => {
    const itemPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      files = files.concat(getAllIconFiles(itemPath));
    } else if (
      item.isFile() &&
      item.name.endsWith('.js') &&
      item.name !== 'index.js'
    ) {
      files.push(itemPath);
    }
  });

  return files;
}

function generateDeclarations() {
  try {
    const files = getAllIconFiles(iconsDir);
    const categories = {};
    const exports = files.map((file) => {
      const relativePath = path.relative(iconsDir, file).replace(/\\/g, '/');
      const parts = relativePath.split('/');
      const iconName = 'Icon' + path.basename(file, '.js');
      const category = parts.length > 1 ? parts[0] : 'uncategorized';

      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(iconName);

      return `export declare const ${iconName}: React.FC<React.SVGProps<SVGSVGElement>>;`;
    });

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const content = ["import React from 'react';\n", ...exports].join('\n');
    fs.writeFileSync(outputFile, content, 'utf8');

    fs.writeFileSync(
      categoryJSONFile,
      JSON.stringify(categories, null, 2),
      'utf8',
    );

    console.log(
      `✅ Successfully generated:\n- ${outputFile}\n- ${categoryJSONFile}`,
    );
  } catch (err) {
    console.error('❌ Error generating TypeScript declarations:', err);
  }
}

generateDeclarations();
