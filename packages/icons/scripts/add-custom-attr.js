import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');

async function processFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const filePath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processFiles(filePath);
      } else if (entry.name.endsWith('.js')) {
        try {
          const fileName = path.basename(entry.name, '.js');
          const iconClassName = convertToClassName(fileName);

          // Read file content
          const data = await fs.readFile(filePath, 'utf8');

          // Update SVG attributes
          let updatedData = data.replace(
            /<svg([^>]*?)>/,
            (match, attributes) => {
              return `<svg${attributes} className={\`ancient-icons ${iconClassName} \${props.className || "size-4"}\`} data-slot={props["data-slot"] || "icon"} aria-hidden="true">`;
            },
          );

          // Write updated content back to file
          await fs.writeFile(filePath, updatedData, 'utf8');
          console.log(`Updated ${filePath}`);
        } catch (fileErr) {
          console.error(`Error processing file ${filePath}:`, fileErr);
        }
      }
    }
  } catch (err) {
    console.error('Error processing files:', err);
  }
}

processFiles(srcDir)
  .then(() => console.log('Processing completed'))
  .catch((err) => console.error('Fatal error:', err));

function convertToClassName(fileName) {
  return (
    'ancient-icon-' +
    fileName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/(\d+)/g, '-$1')
      .toLowerCase()
  );
}
