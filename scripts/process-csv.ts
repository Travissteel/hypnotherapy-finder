import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { Practitioner, City } from '../lib/types/practitioner';

// Common hypnotherapy specialties to extract from titles and categories
const SPECIALTIES_KEYWORDS = [
  'anxiety', 'weight loss', 'smoking', 'phobias', 'insomnia', 'stress',
  'pain', 'ptsd', 'confidence', 'performance', 'hypnosis', 'hypnotherapy',
  'quit smoking', 'past life', 'regression', 'nlp', 'coaching', 'therapy'
];

function extractSpecialties(title: string, category: string): string[] {
  const text = `${title} ${category}`.toLowerCase();
  const found = new Set<string>();

  if (text.includes('anxiety') || text.includes('stress')) found.add('Anxiety & Stress');
  if (text.includes('weight') || text.includes('diet')) found.add('Weight Loss');
  if (text.includes('smoking') || text.includes('quit')) found.add('Smoking Cessation');
  if (text.includes('phobia') || text.includes('fear')) found.add('Phobias');
  if (text.includes('sleep') || text.includes('insomnia')) found.add('Insomnia');
  if (text.includes('pain')) found.add('Pain Management');
  if (text.includes('ptsd') || text.includes('trauma')) found.add('PTSD & Trauma');
  if (text.includes('confidence') || text.includes('performance')) found.add('Confidence & Performance');
  if (text.includes('past life') || text.includes('regression')) found.add('Past Life Regression');

  if (found.size === 0) found.add('General Hypnotherapy');

  return Array.from(found);
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractName(title: string): string {
  // Remove common business suffixes
  let name = title
    .replace(/\s*\|.*$/, '') // Remove everything after pipe
    .replace(/,.*$/, '') // Remove everything after comma
    .replace(/\s*-\s*hypnotherapy.*$/i, '')
    .replace(/\s*hypnosis.*$/i, '')
    .replace(/\s*CHt.*$/i, '')
    .replace(/\s*LPC.*$/i, '')
    .trim();

  return name || title;
}

function processCityData(csvPath: string, cityName: string, state: string): Practitioner[] {
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((record: any, index: number) => {
    const name = extractName(record.title || '');
    const practitionerId = `${createSlug(name)}-${createSlug(cityName)}-${index}`;

    return {
      id: practitionerId,
      title: record.title || name,
      name,
      street: record.street || '',
      city: cityName,
      state,
      website: record.website || undefined,
      phone: record.phone || undefined,
      email: record.email || undefined,
      categoryname: record.categoryname || 'Hypnotherapy service',
      specialties: extractSpecialties(record.title || '', record.categoryname || ''),
      slug: practitionerId,
      citySlug: createSlug(cityName),
    };
  }).filter((p: Practitioner) => p.name && p.city);
}

// City mapping with state information
const CITY_STATE_MAP: Record<string, { name: string; state: string }> = {
  'atlanta': { name: 'Atlanta', state: 'Georgia' },
  'austin': { name: 'Austin', state: 'Texas' },
  'baltimore': { name: 'Baltimore', state: 'Maryland' },
  'boston': { name: 'Boston', state: 'Massachusetts' },
  'charlotte': { name: 'Charlotte', state: 'North Carolina' },
  'chicago': { name: 'Chicago', state: 'Illinois' },
  'columbus': { name: 'Columbus', state: 'Ohio' },
  'dallas': { name: 'Dallas', state: 'Texas' },
  'denver': { name: 'Denver', state: 'Colorado' },
  'detroit': { name: 'Detroit', state: 'Michigan' },
  'fort-worth': { name: 'Fort Worth', state: 'Texas' },
  'fortworth': { name: 'Fort Worth', state: 'Texas' },
  'houston': { name: 'Houston', state: 'Texas' },
  'indianapolis': { name: 'Indianapolis', state: 'Indiana' },
  'jacksonville': { name: 'Jacksonville', state: 'Florida' },
  'las-vegas': { name: 'Las Vegas', state: 'Nevada' },
  'lasvegas': { name: 'Las Vegas', state: 'Nevada' },
  'los-angeles': { name: 'Los Angeles', state: 'California' },
  'losangeles': { name: 'Los Angeles', state: 'California' },
  'louisville': { name: 'Louisville', state: 'Kentucky' },
  'memphis': { name: 'Memphis', state: 'Tennessee' },
  'milwaukee': { name: 'Milwaukee', state: 'Wisconsin' },
  'nashville': { name: 'Nashville', state: 'Tennessee' },
  'ny': { name: 'New York', state: 'New York' },
  'philadelphia': { name: 'Philadelphia', state: 'Pennsylvania' },
  'phoenix': { name: 'Phoenix', state: 'Arizona' },
  'portland': { name: 'Portland', state: 'Oregon' },
  'sanantonio': { name: 'San Antonio', state: 'Texas' },
  'sandiego': { name: 'San Diego', state: 'California' },
  'sanfrancisco': { name: 'San Francisco', state: 'California' },
  'sanjose': { name: 'San Jose', state: 'California' },
  'seattle': { name: 'Seattle', state: 'Washington' },
  'washingtondc': { name: 'Washington', state: 'DC' },
};

async function main() {
  const csvDir = path.join(process.cwd(), '..', 'hypnotherapy-data');
  const outputDir = path.join(process.cwd(), 'data');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const allPractitioners: Practitioner[] = [];
  const citiesMap = new Map<string, City>();

  // Read all *_merged.csv files
  const files = fs.readdirSync(csvDir).filter(f => f.endsWith('_merged.csv') || f.endsWith('_clean.csv'));

  // Prefer merged files, but use clean if merged doesn't exist
  const processedCities = new Set<string>();

  files.forEach(file => {
    const cityKey = file
      .replace('_hypnotherapy_merged.csv', '')
      .replace('_hypnotherapy_clean.csv', '');

    // Skip if we already processed the merged version of this city
    if (processedCities.has(cityKey) && file.includes('_clean.csv')) {
      return;
    }

    if (file.includes('_merged.csv')) {
      processedCities.add(cityKey);
    }

    const cityInfo = CITY_STATE_MAP[cityKey];
    if (!cityInfo) {
      console.warn(`Unknown city: ${cityKey}`);
      return;
    }

    console.log(`Processing ${cityInfo.name}, ${cityInfo.state}...`);
    const csvPath = path.join(csvDir, file);
    const practitioners = processCityData(csvPath, cityInfo.name, cityInfo.state);

    allPractitioners.push(...practitioners);

    // Use Map to avoid duplicate cities
    const citySlug = createSlug(cityInfo.name);
    if (!citiesMap.has(citySlug)) {
      citiesMap.set(citySlug, {
        name: cityInfo.name,
        state: cityInfo.state,
        slug: citySlug,
        practitionerCount: practitioners.length,
      });
    } else {
      // Add to existing city count
      const existing = citiesMap.get(citySlug)!;
      existing.practitionerCount += practitioners.length;
    }
  });

  const cities = Array.from(citiesMap.values());

  // Mark some practitioners as featured (random selection)
  const featuredCount = Math.min(12, Math.floor(allPractitioners.length * 0.1));
  const shuffled = [...allPractitioners].sort(() => Math.random() - 0.5);
  shuffled.slice(0, featuredCount).forEach(p => p.featured = true);

  // Write output files
  fs.writeFileSync(
    path.join(outputDir, 'practitioners.json'),
    JSON.stringify(allPractitioners, null, 2)
  );

  fs.writeFileSync(
    path.join(outputDir, 'cities.json'),
    JSON.stringify(cities, null, 2)
  );

  console.log(`\n✅ Processing complete!`);
  console.log(`   - ${allPractitioners.length} practitioners processed`);
  console.log(`   - ${cities.length} cities processed`);
  console.log(`   - ${featuredCount} practitioners marked as featured`);
  console.log(`\nOutput files:`);
  console.log(`   - data/practitioners.json`);
  console.log(`   - data/cities.json`);
}

main().catch(console.error);
