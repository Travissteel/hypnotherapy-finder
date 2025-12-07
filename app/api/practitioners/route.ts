import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';

// POST /api/practitioners - Create new practitioner profile
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

    // Create practitioner record
    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .insert({
        name: body.name,
        title: body.credentials || null,
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
        certifications: body.certifications ? [body.certifications] : [],
        claim_status: 'claimed',
        claimed_by: session.user.id,
        claim_date: new Date().toISOString(),
        verified: true,
        verification_date: new Date().toISOString(),
        profile_completeness: 60, // Base completeness
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ practitioner }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating practitioner:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create practitioner' },
      { status: 500 }
    );
  }
}
