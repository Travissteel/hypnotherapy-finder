import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient, createAdminClient } from '@/lib/supabase/server';

// POST /api/practitioners - Create new practitioner profile (self-registration)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Prepare the insert data. claim_status/verified are left at their
    // 'unclaimed'/false defaults here — the claims-approval pipeline below
    // (same one used for claiming existing scraped listings) is what sets
    // claim_status='claimed', claimed_by, verified, and increments
    // user_profiles.claimed_listings_count, via the on_claim_approved trigger.
    const insertData = {
      name: body.name,
      credentials: body.credentials ? [body.credentials] : [],
      email: body.email,
      phone: body.phone,
      website: body.website || null,
      address: body.street,
      city: body.city,
      state: body.state,
      zip: body.zipCode,
      bio: body.bio || null,
      specialties: body.specialties || [],
      years_experience: body.yearsExperience ? parseInt(body.yearsExperience) : null,
      session_types: body.offersOnline ? ['in-person', 'online'] : ['in-person'],
      insurance_accepted: body.acceptsInsurance ? ['Insurance accepted'] : [],
      certifications: body.credentials ? [body.credentials] : [],
      profile_completeness: 60,
    };

    // Create practitioner record
    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('[API] Database error creating practitioner:', error);
      throw error;
    }

    // Claims can only be approved by an admin (RLS), so use the admin client
    // for the auto-approval step below — a self-registered practitioner has
    // no pre-existing listing to dispute, so their own claim is fast-tracked.
    const adminClient = createAdminClient();

    const { data: existingProfile } = await adminClient
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!existingProfile) {
      await adminClient.from('user_profiles').insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        user_type: 'practitioner',
        is_practitioner: false,
        is_admin: false,
      });
    }

    const { data: claim, error: claimError } = await adminClient
      .from('claims')
      .insert({
        practitioner_id: practitioner.id,
        user_id: user.id,
        claim_method: 'email',
        verification_email: body.email || user.email,
        status: 'pending',
      })
      .select()
      .single();

    if (claimError) {
      console.error('[API] Error creating claim for new practitioner:', claimError);
      throw claimError;
    }

    const { error: approveError } = await adminClient
      .from('claims')
      .update({
        status: 'approved',
        reviewed_at: new Date().toISOString(),
        admin_notes: 'Auto-approved: self-registered listing',
      })
      .eq('id', claim.id);

    if (approveError) {
      console.error('[API] Error auto-approving claim for new practitioner:', approveError);
      throw approveError;
    }

    // Re-fetch so the response reflects the claim_status/verified fields
    // the on_claim_approved trigger just set.
    const { data: claimedPractitioner, error: refetchError } = await supabase
      .from('practitioners')
      .select()
      .eq('id', practitioner.id)
      .single();

    if (refetchError) throw refetchError;

    return NextResponse.json({ practitioner: claimedPractitioner }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error creating practitioner:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create practitioner', details: error.details, hint: error.hint },
      { status: 500 }
    );
  }
}
