import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';

// POST /api/practitioners - Create new practitioner profile
export async function POST(request: NextRequest) {
  try {
    console.log('[API] POST /api/practitioners - Starting...');
    const supabase = await createRouteHandlerClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('[API] Session exists:', !!session);
    console.log('[API] User ID:', session?.user?.id);

    if (!session) {
      console.error('[API] No session found - Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('[API] Request body:', body);

    // Prepare the insert data
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
      claim_status: 'claimed',
      claimed_by: session.user.id,
      claim_date: new Date().toISOString(),
      verified: true,
      verification_date: new Date().toISOString(),
      profile_completeness: 60,
    };

    console.log('[API] Insert data:', insertData);

    // Create practitioner record
    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('[API] Database error:', error);
      throw error;
    }

    console.log('[API] Practitioner created successfully:', practitioner);
    return NextResponse.json({ practitioner }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error creating practitioner:', error);
    console.error('[API] Error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json(
      { error: error.message || 'Failed to create practitioner', details: error.details, hint: error.hint },
      { status: 500 }
    );
  }
}
