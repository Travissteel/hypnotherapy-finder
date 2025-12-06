/**
 * Test Supabase connection
 * Run with: npx tsx scripts/test-connection.ts
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
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Basic connection
    console.log('Test 1: Basic Connection');
    const { data, error } = await supabase.from('practitioners').select('count').limit(1);

    // If no error, connection is good
    if (!error || error.message.includes('does not exist')) {
      console.log('✅ Connection successful!\n');
    } else {
      throw error;
    }

    // Test 2: Check if tables exist
    console.log('Test 2: Checking Tables');
    const tables = ['practitioners', 'claims', 'user_profiles', 'verification_logs', 'audit_logs'];

    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('count').limit(1);

      if (tableError) {
        if (tableError.message.includes('does not exist')) {
          console.log(`⚠️  Table '${table}' does not exist yet`);
        } else {
          console.log(`❌ Error checking '${table}':`, tableError.message);
        }
      } else {
        console.log(`✅ Table '${table}' exists`);
      }
    }

    console.log('\n📊 Next Steps:');
    console.log('1. Go to: https://app.supabase.com/project/cprlplsmgznmyzwcusro/sql/new');
    console.log('2. Copy the contents of supabase/schema.sql');
    console.log('3. Paste into the SQL Editor and click Run');
    console.log('4. Run this script again to verify tables were created');
    console.log('5. Then run: npx tsx scripts/migrate-practitioners.ts');

  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
