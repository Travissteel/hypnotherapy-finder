import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';
import { createPractitionerFromSignup } from '@/lib/practitioners/create-from-signup';

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

    const claimedPractitioner = await createPractitionerFromSignup(supabase, user.id, {
      name: body.name,
      credentials: body.credentials,
      email: body.email,
      phone: body.phone,
      website: body.website,
      street: body.street,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      bio: body.bio,
      specialties: body.specialties,
      yearsExperience: body.yearsExperience,
      acceptsInsurance: body.acceptsInsurance,
      offersOnline: body.offersOnline,
    });

    return NextResponse.json({ practitioner: claimedPractitioner }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error creating practitioner:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create practitioner', details: error.details, hint: error.hint },
      { status: 500 }
    );
  }
}
