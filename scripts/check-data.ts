/**
 * Check what data is already in Supabase
 * Run with: npx tsx scripts/check-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkData() {
  console.log('🔍 Checking Supabase data...\n');

  try {
    // Check practitioners count
    const { count: practitionerCount, error: practitionerError } = await supabase
      .from('practitioners')
      .select('*', { count: 'exact', head: true });

    if (practitionerError) {
      console.error('❌ Error checking practitioners:', practitionerError.message);
    } else {
      console.log(`✅ Practitioners: ${practitionerCount || 0} records`);
    }

    // Check claims count
    const { count: claimsCount, error: claimsError } = await supabase
      .from('claims')
      .select('*', { count: 'exact', head: true });

    if (claimsError) {
      console.error('❌ Error checking claims:', claimsError.message);
    } else {
      console.log(`✅ Claims: ${claimsCount || 0} records`);
    }

    // Check user profiles count
    const { count: usersCount, error: usersError } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    if (usersError) {
      console.error('❌ Error checking user profiles:', usersError.message);
    } else {
      console.log(`✅ User Profiles: ${usersCount || 0} records`);
    }

    // Get sample practitioners
    const { data: samplePractitioners, error: sampleError } = await supabase
      .from('practitioners')
      .select('name, city, state, claim_status')
      .limit(5);

    if (sampleError) {
      console.error('❌ Error fetching sample:', sampleError.message);
    } else if (samplePractitioners && samplePractitioners.length > 0) {
      console.log('\n📋 Sample Practitioners:');
      samplePractitioners.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} - ${p.city}, ${p.state} [${p.claim_status}]`);
      });
    }

    // Check by city
    const { data: cityStats, error: cityError } = await supabase
      .from('practitioners')
      .select('city')
      .limit(1000);

    if (!cityError && cityStats) {
      const cityCounts = cityStats.reduce((acc: any, p: any) => {
        acc[p.city] = (acc[p.city] || 0) + 1;
        return acc;
      }, {});

      console.log('\n🏙️  Top 10 Cities:');
      Object.entries(cityCounts)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([city, count]) => {
          console.log(`   ${city}: ${count}`);
        });
    }

    console.log('\n✅ Database check complete!');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkData();
