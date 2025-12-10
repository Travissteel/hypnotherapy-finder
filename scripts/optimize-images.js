const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const images = [
  'therapy-session.png',
  'hypnotherapy-near-me.png',
  'hypnotherapy-for-anxiety.png',
  'quit-smoking-hypnotherapy.png',
  'weight-loss-hypnotherapy.png',
  'what-is-hypnotherapy.png',
  'logo.png'
];

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const basenamePng = filename.replace('.png', '');
  const outputWebp = path.join(publicDir, `${basenamePng}.webp`);
  const tempPng = path.join(publicDir, `${basenamePng}-temp.png`);

  try {
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${filename} - file not found`);
      return null;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);

    console.log(`\n--- Processing ${filename} ---`);
    console.log(`Original size: ${originalSizeKB} KB (${(originalStats.size / 1024 / 1024).toFixed(2)} MB)`);

    const metadata = await sharp(inputPath).metadata();
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);

    // Optimize and resize PNG (max width 1200px, maintaining aspect ratio)
    await sharp(inputPath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 85,
        compressionLevel: 9
      })
      .toFile(tempPng);

    const pngStats = fs.statSync(tempPng);
    const pngSizeKB = (pngStats.size / 1024).toFixed(2);
    console.log(`Optimized PNG size: ${pngSizeKB} KB`);

    // Convert to WebP with high quality compression
    await sharp(inputPath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 80
      })
      .toFile(outputWebp);

    const webpStats = fs.statSync(outputWebp);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    console.log(`WebP size: ${webpSizeKB} KB`);

    const pngSavings = ((1 - pngStats.size / originalStats.size) * 100).toFixed(1);
    const webpSavings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`PNG savings: ${pngSavings}%`);
    console.log(`WebP savings: ${webpSavings}%`);

    // Replace original with optimized PNG
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPng, inputPath);
    console.log('✓ Replaced original with optimized version');

    return {
      filename,
      originalSize: originalSizeKB,
      pngSize: pngSizeKB,
      webpSize: webpSizeKB,
      pngSavings,
      webpSavings
    };
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(tempPng)) {
      fs.unlinkSync(tempPng);
    }
    return null;
  }
}

async function main() {
  console.log('Starting image optimization...\n');

  const results = [];
  for (const image of images) {
    const result = await optimizeImage(image);
    if (result) {
      results.push(result);
    }
  }

  if (results.length === 0) {
    console.log('\nNo images were optimized.');
    return;
  }

  console.log('\n\n=== SUMMARY ===\n');
  console.log('Image                           | Original  | PNG (opt) | WebP      | PNG Savings | WebP Savings');
  console.log('--------------------------------|-----------|-----------|-----------|-------------|-------------');

  results.forEach(r => {
    console.log(
      `${r.filename.padEnd(31)} | ${r.originalSize.padStart(7)} KB | ${r.pngSize.padStart(7)} KB | ${r.webpSize.padStart(7)} KB | ${r.pngSavings.padStart(10)}% | ${r.webpSavings.padStart(11)}%`
    );
  });

  const totalOriginal = results.reduce((sum, r) => sum + parseFloat(r.originalSize), 0);
  const totalPng = results.reduce((sum, r) => sum + parseFloat(r.pngSize), 0);
  const totalWebp = results.reduce((sum, r) => sum + parseFloat(r.webpSize), 0);

  console.log('--------------------------------|-----------|-----------|-----------|-------------|-------------');
  console.log(
    `${'TOTAL'.padEnd(31)} | ${totalOriginal.toFixed(2).padStart(7)} KB | ${totalPng.toFixed(2).padStart(7)} KB | ${totalWebp.toFixed(2).padStart(7)} KB | ${((1 - totalPng/totalOriginal) * 100).toFixed(1).padStart(10)}% | ${((1 - totalWebp/totalOriginal) * 100).toFixed(1).padStart(11)}%`
  );
}

main().catch(console.error);
