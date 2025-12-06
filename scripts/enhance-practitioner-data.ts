import * as fs from 'fs';
import * as path from 'path';

// Read the existing practitioners data
const dataPath = path.join(__dirname, '../data/practitioners.json');
const practitioners = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Possible values for new fields
const sessionTypes = ['in-person', 'virtual', 'both'];
const priceRanges = ['budget', 'moderate', 'premium'];
const genders = ['male', 'female', 'non-binary'];
const certificationOptions = [
  ['NGH (National Guild of Hypnotists)', 'Clinical Hypnotherapist (CHt)'],
  ['IACT (International Association of Counselors & Therapists)', 'Clinical Hypnotherapist (CHt)'],
  ['ABH (American Board of Hypnotherapy)'],
  ['NGH (National Guild of Hypnotists)', 'IACT (International Association of Counselors & Therapists)'],
  ['Licensed Psychologist', 'Clinical Hypnotherapist (CHt)'],
  ['Licensed Counselor (LPC/LMFT)', 'Clinical Hypnotherapist (CHt)'],
  ['Clinical Hypnotherapist (CHt)'],
  ['IMDHA (International Medical and Dental Hypnotherapy Association)'],
  ['AHA (American Hypnosis Association)', 'Clinical Hypnotherapist (CHt)'],
];

const languageOptions = [
  ['English'],
  ['English', 'Spanish'],
  ['English', 'French'],
  ['English', 'Mandarin'],
  ['English', 'German'],
  ['English', 'Spanish', 'Portuguese'],
];

const insuranceProviderOptions = [
  ['Blue Cross Blue Shield', 'Aetna', 'Cigna'],
  ['UnitedHealthcare', 'Anthem', 'Humana'],
  ['Kaiser Permanente', 'Blue Cross Blue Shield'],
  ['Aetna', 'UnitedHealthcare'],
  [],
];

// Helper function to get random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to get random number in range
function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate weighted random (60% true, 40% false)
function weightedBoolean(trueWeight: number = 0.6): boolean {
  return Math.random() < trueWeight;
}

// Enhance each practitioner with new fields
const enhancedPractitioners = practitioners.map((p: any, index: number) => {
  // Use index to create deterministic but varied data
  const seed = index;

  // Session type: 40% in-person, 30% virtual, 30% both
  let sessionType: string;
  const sessionRand = (seed * 7) % 10;
  if (sessionRand < 4) sessionType = 'in-person';
  else if (sessionRand < 7) sessionType = 'virtual';
  else sessionType = 'both';

  // Insurance: 65% accept insurance
  const acceptsInsurance = (seed * 3) % 10 < 6.5;
  const insuranceProviders = acceptsInsurance
    ? insuranceProviderOptions[(seed * 5) % insuranceProviderOptions.length]
    : [];

  // Price range: 30% budget, 50% moderate, 20% premium
  let priceRange: string;
  const priceRand = (seed * 11) % 10;
  if (priceRand < 3) priceRange = 'budget';
  else if (priceRand < 8) priceRange = 'moderate';
  else priceRange = 'premium';

  // Session price based on range
  let sessionPrice: number;
  if (priceRange === 'budget') sessionPrice = randomRange(75, 125);
  else if (priceRange === 'moderate') sessionPrice = randomRange(125, 200);
  else sessionPrice = randomRange(200, 300);

  // Years of experience: weighted toward more experience
  const expRand = (seed * 13) % 100;
  let yearsExperience: number;
  if (expRand < 15) yearsExperience = randomRange(1, 3);
  else if (expRand < 40) yearsExperience = randomRange(3, 7);
  else if (expRand < 70) yearsExperience = randomRange(7, 15);
  else yearsExperience = randomRange(15, 30);

  // Certifications
  const certifications = certificationOptions[(seed * 17) % certificationOptions.length];

  // Gender: roughly 60% female, 35% male, 5% non-binary (industry demographics)
  let gender: string;
  const genderRand = (seed * 19) % 100;
  if (genderRand < 60) gender = 'female';
  else if (genderRand < 95) gender = 'male';
  else gender = 'non-binary';

  // Languages
  const languages = languageOptions[(seed * 23) % languageOptions.length];

  // Accepting new clients: 75% yes
  const acceptingNewClients = (seed * 29) % 10 < 7.5;

  return {
    ...p,
    sessionType,
    acceptsInsurance,
    insuranceProviders,
    priceRange,
    sessionPrice,
    yearsExperience,
    certifications,
    gender,
    languages,
    acceptingNewClients,
  };
});

// Write the enhanced data back to the file
fs.writeFileSync(dataPath, JSON.stringify(enhancedPractitioners, null, 2));

console.log(`✅ Successfully enhanced ${enhancedPractitioners.length} practitioners with new filter fields!`);
console.log('\nSample distribution:');
console.log('- Session types:', {
  inPerson: enhancedPractitioners.filter((p: any) => p.sessionType === 'in-person').length,
  virtual: enhancedPractitioners.filter((p: any) => p.sessionType === 'virtual').length,
  both: enhancedPractitioners.filter((p: any) => p.sessionType === 'both').length,
});
console.log('- Accepts insurance:', enhancedPractitioners.filter((p: any) => p.acceptsInsurance).length);
console.log('- Price ranges:', {
  budget: enhancedPractitioners.filter((p: any) => p.priceRange === 'budget').length,
  moderate: enhancedPractitioners.filter((p: any) => p.priceRange === 'moderate').length,
  premium: enhancedPractitioners.filter((p: any) => p.priceRange === 'premium').length,
});
console.log('- Accepting new clients:', enhancedPractitioners.filter((p: any) => p.acceptingNewClients).length);
