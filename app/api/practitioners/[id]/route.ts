import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';

// GET /api/practitioners/[id] - Get specific practitioner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!practitioner) {
      return NextResponse.json(
        { error: 'Practitioner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ practitioner });
  } catch (error: any) {
    console.error('Error fetching practitioner:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch practitioner' },
      { status: 500 }
    );
  }
}

// PATCH /api/practitioners/[id] - Update practitioner profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the practitioner to check ownership
    const { data: practitioner } = await supabase
      .from('practitioners')
      .select('claimed_by')
      .eq('id', id)
      .single();

    if (!practitioner) {
      return NextResponse.json(
        { error: 'Practitioner not found' },
        { status: 404 }
      );
    }

    // Check if user owns this profile or is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (practitioner.claimed_by !== session.user.id && !profile?.is_admin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only edit your own profile' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Allowed fields for update
    const allowedFields = [
      'bio',
      'phone',
      'email',
      'website',
      'address',
      'city',
      'state',
      'zip',
      'credentials',
      'specialties',
      'years_experience',
      'session_types',
      'insurance_accepted',
      'price_range',
      'consultation_free',
      'languages',
      'certifications',
      'memberships',
      'profile_photo_url',
    ];

    // Filter only allowed fields
    const updateData: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Calculate profile completeness
    const completenessScore = calculateProfileCompleteness({
      ...practitioner,
      ...updateData,
    });
    updateData.profile_completeness = completenessScore;

    // Update practitioner
    const { data: updatedPractitioner, error: updateError } = await supabase
      .from('practitioners')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ practitioner: updatedPractitioner });
  } catch (error: any) {
    console.error('Error updating practitioner:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update practitioner' },
      { status: 500 }
    );
  }
}

// Calculate profile completeness percentage
function calculateProfileCompleteness(practitioner: any): number {
  const fields = [
    { key: 'bio', weight: 20 },
    { key: 'phone', weight: 10 },
    { key: 'email', weight: 10 },
    { key: 'website', weight: 10 },
    { key: 'credentials', weight: 15, isArray: true },
    { key: 'specialties', weight: 15, isArray: true },
    { key: 'years_experience', weight: 5 },
    { key: 'session_types', weight: 5, isArray: true },
    { key: 'insurance_accepted', weight: 5, isArray: true },
    { key: 'profile_photo_url', weight: 5 },
  ];

  let score = 0;

  for (const field of fields) {
    const value = practitioner[field.key];
    if (field.isArray) {
      if (value && Array.isArray(value) && value.length > 0) {
        score += field.weight;
      }
    } else {
      if (value && value.toString().trim() !== '') {
        score += field.weight;
      }
    }
  }

  return Math.min(100, Math.round(score));
}
