import fs from 'fs';
import path from 'path';

const iconsFolderPath = 'icons';
const outputJsonPath = './icon-statistics.json';

// Function to check if a file is an SVG
function isSvgFile(filename) {
  return path.extname(filename).toLowerCase() === '.svg';
}

// Function to check if an icon is a filled variant
function isFilledIcon(filename) {
  return filename.endsWith('-filled.svg');
}

// Function to check if an icon is an outline variant
function isOutlineIcon(filename) {
  return isSvgFile(filename) && !isFilledIcon(filename);
}

// Initialize statistics object
const stats = {
  summary: {
    totalIcons: 0,
    totalFilled: 0,
    totalOutline: 0,
    totalCategories: 0,
  },
  categories: {},
};

try {
  // Check if the icons folder exists
  if (!fs.existsSync(iconsFolderPath)) {
    console.error(`Folder not found: ${iconsFolderPath}`);
    process.exit(1);
  }

  // Read category directories inside the icons folder
  const categories = fs
    .readdirSync(iconsFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  stats.summary.totalCategories = categories.length;
  console.log(`Found ${categories.length} categories in the icons folder`);

  // Process each category folder
  categories.forEach((category) => {
    const categoryPath = path.join(iconsFolderPath, category);
    const files = fs.readdirSync(categoryPath);

    const svgFiles = files.filter(isSvgFile);
    const filledIcons = svgFiles.filter(isFilledIcon);
    const outlineIcons = svgFiles.filter(isOutlineIcon);

    // Update summary statistics
    stats.summary.totalIcons += svgFiles.length;
    stats.summary.totalFilled += filledIcons.length;
    stats.summary.totalOutline += outlineIcons.length;

    // Store category-specific statistics
    stats.categories[category] = {
      total: svgFiles.length,
      filled: filledIcons.length,
      outline: outlineIcons.length,
      filledIcons: filledIcons,
      outlineIcons: outlineIcons,
    };
  });

  // Save statistics to a JSON file
  fs.writeFileSync(outputJsonPath, JSON.stringify(stats, null, 2));

  console.log('\n=== ICON STATISTICS SUCCESSFULLY SAVED ===');
  console.log(`Output file: ${outputJsonPath}`);
  console.log('\nSummary:');
  console.log(`- Total icons: ${stats.summary.totalIcons}`);
  console.log(`- Total filled icons: ${stats.summary.totalFilled}`);
  console.log(`- Total outline icons: ${stats.summary.totalOutline}`);
  console.log(`- Number of categories: ${stats.summary.totalCategories}`);
} catch (error) {
  console.error('Error:', error);
}
