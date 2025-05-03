import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../icons');
const outputDir = path.join(__dirname, '../optimized');
const DELAY_MS = 100; // 100ms
const CONCURRENT_LIMIT = 10;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getAllSvgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllSvgFiles(filePath));
    } else if (file.name.endsWith('.svg')) {
      results.push(filePath);
    }
  });

  return results;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function optimizeSvg(filePath, index) {
  const relativePath = path.relative(inputDir, filePath);
  const inputFilePath = path.resolve(filePath);
  const outputFilePath = path.resolve(outputDir, relativePath);

  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

  console.log(`🔄 Optimizing (${index + 1}): ${relativePath}...`);

  return new Promise((resolve, reject) => {
    const svgoProcess = spawn(
      'npx',
      ['svgo', `"${inputFilePath}"`, '-o', `"${outputFilePath}"`],
      { shell: true },
    );

    svgoProcess.stdout.on('data', (data) => {
      console.log(`✅ Optimized: ${relativePath}`);
    });

    svgoProcess.stderr.on('data', (data) => {
      console.error(`⚠️ Error optimizing ${relativePath}:\n${data}`);
    });

    svgoProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`❌ SVGO exited with code ${code} for ${relativePath}`);
      }
    });
  });
}

async function optimizeAllSvg() {
  const svgFiles = getAllSvgFiles(inputDir);
  console.log(
    `🔍 Found ${svgFiles.length} SVG files. Starting optimization...\n`,
  );

  let index = 0;
  while (index < svgFiles.length) {
    const batch = svgFiles.slice(index, index + CONCURRENT_LIMIT);
    await Promise.all(batch.map((file, i) => optimizeSvg(file, index + i)));
    index += CONCURRENT_LIMIT;
    await delay(DELAY_MS * CONCURRENT_LIMIT);
  }

  console.log(`🎉 Optimization completed for ${svgFiles.length} SVG files!`);
}

optimizeAllSvg().catch((err) => console.error(err));
