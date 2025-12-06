/**
 * Script to migrate static practitioner data to Supabase
 * Run with: npx tsx scripts/migrate-practitioners.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';
import practitionersData from '../data/practitioners.json';

// Load .env.local
config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function generateSlug(name: string, city: string, state: string, index: number): string {
  const slug = `${name}-${city}-${state}-${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug;
}

function calculateProfileCompleteness(practitioner: any): number {
  let completeness = 0;
  const fields = [
    'name', 'email', 'phone', 'website', 'bio',
    'credentials', 'specialties', 'address', 'city',
    'state', 'zip', 'session_types', 'price_range'
  ];

  fields.forEach((field) => {
    if (practitioner[field]) {
      if (Array.isArray(practitioner[field])) {
        if (practitioner[field].length > 0) completeness += 100 / fields.length;
      } else if (practitioner[field].toString().trim() !== '') {
        completeness += 100 / fields.length;
      }
    }
  });

  return Math.round(completeness);
}

async function migratePractitioners() {
  console.log('🚀 Starting practitioner migration...');
  console.log(`📊 Total practitioners to migrate: ${practitionersData.length}`);

  let successCount = 0;
  let errorCount = 0;
  const errors: any[] = [];

  // Process in batches of 100
  const batchSize = 100;
  for (let i = 0; i < practitionersData.length; i += batchSize) {
    const batch = practitionersData.slice(i, i + batchSize);

    const transformedBatch = batch.map((practitioner: any, idx: number) => ({
      name: practitioner.name,
      email: practitioner.email || null,
      phone: practitioner.phone || null,
      website: practitioner.website || null,
      credentials: practitioner.credentials || [],
      specialties: practitioner.specialties || [],
      bio: practitioner.bio || null,
      years_experience: practitioner.yearsExperience || null,
      address: practitioner.address || null,
      city: practitioner.city,
      state: practitioner.state,
      zip: practitioner.zip || null,
      country: practitioner.country || 'United States',
      latitude: practitioner.latitude || null,
      longitude: practitioner.longitude || null,
      session_types: practitioner.sessionTypes || [],
      insurance_accepted: practitioner.insuranceAccepted || [],
      price_range: practitioner.priceRange || null,
      consultation_free: practitioner.consultationFree || false,
      languages: practitioner.languages || ['English'],
      certifications: practitioner.certifications || [],
      memberships: practitioner.memberships || [],
      rating: practitioner.rating || null,
      review_count: practitioner.reviewCount || 0,
      claim_status: 'unclaimed',
      claimed_by: null,
      verified: false,
      profile_completeness: calculateProfileCompleteness(practitioner),
      slug: generateSlug(practitioner.name, practitioner.city, practitioner.state, i + idx),
      data_source: 'scraped',
      source_url: practitioner.sourceUrl || null,
    }));

    const { data, error } = await supabase
      .from('practitioners')
      .insert(transformedBatch)
      .select();

    if (error) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
      errorCount += batch.length;
      errors.push({ batch: i / batchSize + 1, error: error.message });
    } else {
      successCount += data?.length || 0;
      console.log(`✅ Batch ${i / batchSize + 1} completed: ${data?.length} practitioners inserted`);
    }
  }

  console.log('\n📈 Migration Summary:');
  console.log(`✅ Successfully migrated: ${successCount} practitioners`);
  console.log(`❌ Failed: ${errorCount} practitioners`);

  if (errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    errors.forEach((err) => {
      console.log(`  Batch ${err.batch}: ${err.error}`);
    });
  }

  // Print stats
  const { data: stats } = await supabase
    .from('practitioners')
    .select('claim_status, state')
    .limit(1000);

  if (stats) {
    console.log('\n📊 Database Statistics:');
    console.log(`Total practitioners: ${stats.length}`);

    const unclaimedCount = stats.filter((p: any) => p.claim_status === 'unclaimed').length;
    console.log(`Unclaimed listings: ${unclaimedCount}`);

    const stateCount = stats.reduce((acc: any, p: any) => {
      acc[p.state] = (acc[p.state] || 0) + 1;
      return acc;
    }, {});
    console.log('Top 5 states:', Object.entries(stateCount).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5));
  }

  console.log('\n✨ Migration complete!');
}

// Run migration
migratePractitioners().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
