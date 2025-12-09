import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import practitionersData from '@/data/practitioners.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role for bulk insert
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/admin/import-practitioners - Import static JSON practitioners to database
export async function POST(request: NextRequest) {
    try {
        // Verify admin access (simple API key check)
        const authHeader = request.headers.get('authorization');
        const expectedKey = process.env.ADMIN_API_KEY || 'import-practitioners-secret';

        if (authHeader !== `Bearer ${expectedKey}`) {
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
            const { data, error } = await supabase
                .from('practitioners')
                .upsert(mappedBatch, {
                    onConflict: 'slug',
                    ignoreDuplicates: true
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
