import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const outputFile = path.join(srcDir, 'index.js');

async function generateIndex() {
  try {
    let folders = await fs.promises.readdir(srcDir, { withFileTypes: true });
    let exports = [];

    for (let folder of folders) {
      if (folder.isDirectory()) {
        let folderPath = path.join(srcDir, folder.name);
        let files = await fs.promises.readdir(folderPath);

        for (let file of files) {
          if (file.endsWith('.js') && file !== 'index.js') {
            let componentName = path.basename(file, '.js');
            exports.push(
              `export { default as Icon${componentName} } from './${folder.name}/${componentName}';`,
            );
          }
        }
      }
    }

    // Generate the main index.js
    await fs.promises.writeFile(outputFile, exports.join('\n') + '\n', 'utf8');
    console.log(`✅ Successfully generated ${outputFile}`);

    // Delete all index.js files inside subdirectories
    for (let folder of folders) {
      if (folder.isDirectory()) {
        let indexPath = path.join(srcDir, folder.name, 'index.js');
        if (fs.existsSync(indexPath)) {
          await fs.promises.unlink(indexPath);
          console.log(`🗑️ Deleted ${indexPath}`);
        }
      }
    }
  } catch (err) {
    console.error('❌ Error generating index.js:', err);
  }
}

generateIndex();
