import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { timingSafeEqual } from 'crypto';
import practitionersData from '@/data/practitioners.json';

// Constant-time comparison so the API key can't be guessed byte-by-byte via timing
function safeKeyCompare(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;

  // Lazy-init so build-time module evaluation doesn't crash when env vars
  // aren't present in local/CI environments.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) throw new Error('supabaseUrl is required.');
  if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required.');

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  return _supabaseAdmin;
}

// POST /api/admin/import-practitioners - Import static JSON practitioners to database
export async function POST(request: NextRequest) {
    try {
        // Verify admin access (simple API key check)
        const authHeader = request.headers.get('authorization');
        const expectedKey = process.env.ADMIN_API_KEY;

        if (!expectedKey || !authHeader || !safeKeyCompare(authHeader, `Bearer ${expectedKey}`)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const practitioners = practitionersData as any[];
        console.log(`[Import] Starting import of ${practitioners.length} practitioners`);

        let imported = 0;
        let skipped = 0;
        let errors = 0;

        // Process in batches of 100
        const batchSize = 100;
        for (let i = 0; i < practitioners.length; i += batchSize) {
            const batch = practitioners.slice(i, i + batchSize);

            const mappedBatch = batch.map((p: any) => ({
                // Use the slug as the ID to avoid duplicates if re-run
                name: p.name || p.title,
                email: p.email || null,
                phone: p.phone || null,
                website: p.website || null,
                credentials: p.certifications || [],
                specialties: p.specialties || ['General Hypnotherapy'],
                bio: p.bio || null,
                years_experience: p.yearsExperience || null,
                address: p.street || null,
                city: p.city,
                state: p.state,
                zip: p.zip || null,
                session_types: p.sessionType ? [p.sessionType] : [],
                insurance_accepted: p.acceptsInsurance ? (p.insuranceProviders || []) : [],
                price_range: p.priceRange || null,
                languages: p.languages || ['English'],
                certifications: p.certifications || [],
                claim_status: 'unclaimed',
                verified: false,
                slug: p.slug,
                data_source: 'imported',
            }));

            // Use upsert to handle duplicates (based on slug)
            const { data, error } = await (getSupabaseAdmin() as any)
                .from('practitioners')
                .upsert(mappedBatch as any, {
                    onConflict: 'slug',
                    ignoreDuplicates: true,
                });

            if (error) {
                console.error(`[Import] Batch error at ${i}:`, error.message);
                errors += batch.length;
            } else {
                imported += batch.length;
            }
        }

        console.log(`[Import] Complete: ${imported} imported, ${skipped} skipped, ${errors} errors`);

        return NextResponse.json({
            success: true,
            total: practitioners.length,
            imported,
            skipped,
            errors,
        });
    } catch (error: any) {
        console.error('[Import] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to import practitioners' },
            { status: 500 }
        );
    }
}
