import fs from 'fs';
import path from 'path';

interface Practitioner {
  id: string;
  slug: string;
  [key: string]: any;
}

// Read practitioners data
const practitionersPath = path.join(process.cwd(), 'data', 'practitioners.json');
const practitioners: Practitioner[] = JSON.parse(fs.readFileSync(practitionersPath, 'utf-8'));

console.log(`Total practitioners before deduplication: ${practitioners.length}`);

// Deduplicate by ID - keep only the first occurrence of each ID
const seenIds = new Set<string>();
const uniquePractitioners = practitioners.filter(p => {
  if (seenIds.has(p.id)) {
    return false; // Duplicate, remove it
  }
  seenIds.add(p.id);
  return true; // Keep it
});

console.log(`Total practitioners after deduplication: ${uniquePractitioners.length}`);
console.log(`Removed ${practitioners.length - uniquePractitioners.length} duplicates`);

// Write back the deduplicated data
fs.writeFileSync(
  practitionersPath,
  JSON.stringify(uniquePractitioners, null, 2),
  'utf-8'
);

console.log('✓ Deduplication complete!');
