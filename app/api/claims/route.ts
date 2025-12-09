import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient, createAdminClient } from '@/lib/supabase/server';

// GET /api/claims - Get user's claims or all claims (admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    let query = supabase
      .from('claims')
      .select(`
        *,
        practitioner:practitioners(id, name, email, city, state, phone),
        user:user_profiles(full_name, phone)
      `)
      .order('created_at', { ascending: false });

    // If not admin, only show user's own claims
    if (!profile?.is_admin) {
      query = query.eq('user_id', session.user.id);
    }

    const { data: claims, error } = await query;

    if (error) throw error;

    return NextResponse.json({ claims });
  } catch (error: any) {
    console.error('Error fetching claims:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch claims' },
      { status: 500 }
    );
  }
}

// POST /api/claims - Create a new claim
export async function POST(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { practitioner_id, claim_method, verification_email, verification_phone, license_number } = body;

    if (!practitioner_id) {
      return NextResponse.json({ error: 'Practitioner ID is required' }, { status: 400 });
    }

    // Ensure user_profile exists (required for foreign key constraint on claims table)
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', session.user.id)
      .maybeSingle();

    console.log('[Claims API] Profile check:', {
      userId: session.user.id,
      existingProfile,
      profileCheckError
    });

    if (!existingProfile) {
      // Create a minimal user profile if it doesn't exist
      // Use admin client to bypass RLS policies
      // Note: user_profiles table has: id, user_type, full_name, phone, is_practitioner, is_admin, etc.
      console.log('[Claims API] Creating user profile for:', session.user.id);

      try {
        const adminClient = createAdminClient();
        const { error: profileError } = await adminClient
          .from('user_profiles')
          .insert({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            user_type: 'practitioner',
            is_practitioner: false,
            is_admin: false,
          });

        if (profileError) {
          console.error('[Claims API] Error creating user profile:', profileError);
          return NextResponse.json(
            { error: `Failed to create user profile: ${profileError.message}` },
            { status: 500 }
          );
        }
        console.log('[Claims API] User profile created successfully');
      } catch (adminError: any) {
        console.error('[Claims API] Admin client error:', adminError);
        return NextResponse.json(
          { error: `Failed to create user profile: ${adminError.message}` },
          { status: 500 }
        );
      }
    } else {
      console.log('[Claims API] User profile already exists');
    }

    // Check if practitioner exists and is unclaimed
    const { data: practitioner, error: practitionerError } = await supabase
      .from('practitioners')
      .select('id, name, claim_status, email, phone')
      .eq('id', practitioner_id)
      .single();

    if (practitionerError || !practitioner) {
      return NextResponse.json({ error: 'Practitioner not found' }, { status: 404 });
    }

    if (practitioner.claim_status !== 'unclaimed') {
      return NextResponse.json(
        { error: `This listing is already ${practitioner.claim_status}` },
        { status: 400 }
      );
    }

    // Check if user already has a pending claim for this practitioner
    const { data: existingClaim } = await supabase
      .from('claims')
      .select('id, status')
      .eq('practitioner_id', practitioner_id)
      .eq('user_id', session.user.id)
      .single();

    if (existingClaim) {
      return NextResponse.json(
        { error: `You already have a ${existingClaim.status} claim for this listing` },
        { status: 400 }
      );
    }

    // Create claim
    const { data: claim, error: claimError } = await supabase
      .from('claims')
      .insert({
        practitioner_id,
        user_id: session.user.id,
        claim_method: claim_method || 'email',
        verification_email: verification_email || session.user.email,
        verification_phone,
        license_number,
        status: 'pending',
      })
      .select()
      .single();

    if (claimError) throw claimError;

    // Update practitioner status to pending
    await supabase
      .from('practitioners')
      .update({ claim_status: 'pending' })
      .eq('id', practitioner_id);

    // Create verification log
    await supabase.from('verification_logs').insert({
      claim_id: claim.id,
      user_id: session.user.id,
      verification_type: claim_method || 'email',
      status: 'sent',
    });

    return NextResponse.json({ claim }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating claim:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create claim' },
      { status: 500 }
    );
  }
}
