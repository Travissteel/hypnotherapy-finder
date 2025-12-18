/**
 * Script to fix Google redirect tracking URLs in practitioners.json
 *
 * This script finds and cleans up URLs that are in the format:
 * /url?q=https://example.com/&opi=...&sa=...
 *
 * And converts them to clean URLs:
 * https://example.com/
 */

const fs = require('fs');
const path = require('path');

// Path to practitioners.json
const practitionersPath = path.join(__dirname, '..', 'data', 'practitioners.json');

function cleanGoogleRedirectUrl(url) {
  if (!url) return url;

  // Check if it's a Google redirect URL
  if (url.startsWith('/url?q=')) {
    try {
      // Remove the /url?q= prefix
      const withoutPrefix = url.substring(7);

      // Find the first & which marks the start of tracking parameters
      const ampersandIndex = withoutPrefix.indexOf('&');

      if (ampersandIndex !== -1) {
        // Extract just the actual URL
        const cleanUrl = withoutPrefix.substring(0, ampersandIndex);

        // Decode any URL encoding
        return decodeURIComponent(cleanUrl);
      } else {
        // No tracking parameters, just decode
        return decodeURIComponent(withoutPrefix);
      }
    } catch (error) {
      console.error(`Error cleaning URL: ${url}`, error);
      return url;
    }
  }

  return url;
}

function fixPractitionersData() {
  console.log('Reading practitioners.json...');

  // Read the file
  const data = fs.readFileSync(practitionersPath, 'utf8');
  const practitioners = JSON.parse(data);

  console.log(`Total practitioners: ${practitioners.length}`);

  let fixedCount = 0;
  const fixes = [];

  // Process each practitioner
  practitioners.forEach((practitioner, index) => {
    if (practitioner.website && practitioner.website.startsWith('/url?q=')) {
      const originalUrl = practitioner.website;
      const cleanedUrl = cleanGoogleRedirectUrl(practitioner.website);

      practitioner.website = cleanedUrl;
      fixedCount++;

      fixes.push({
        id: practitioner.id,
        name: practitioner.name,
        city: practitioner.city,
        original: originalUrl,
        cleaned: cleanedUrl
      });

      console.log(`\n[${fixedCount}] Fixed: ${practitioner.name}`);
      console.log(`  Original: ${originalUrl.substring(0, 100)}...`);
      console.log(`  Cleaned:  ${cleanedUrl}`);
    }
  });

  if (fixedCount > 0) {
    // Create a backup
    const backupPath = practitionersPath + '.backup-' + Date.now();
    console.log(`\nCreating backup at: ${backupPath}`);
    fs.copyFileSync(practitionersPath, backupPath);

    // Write the fixed data
    console.log('\nWriting fixed data to practitioners.json...');
    fs.writeFileSync(
      practitionersPath,
      JSON.stringify(practitioners, null, 2),
      'utf8'
    );

    console.log(`\n✓ Successfully fixed ${fixedCount} URLs!`);

    // Write a summary report
    const reportPath = path.join(__dirname, 'url-fix-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(fixes, null, 2),
      'utf8'
    );
    console.log(`✓ Report saved to: ${reportPath}`);
  } else {
    console.log('\nNo Google redirect URLs found!');
  }
}

// Run the script
try {
  fixPractitionersData();
} catch (error) {
  console.error('Error running script:', error);
  process.exit(1);
}
