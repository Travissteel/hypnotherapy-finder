import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role for advanced search queries
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/practitioners/search - Advanced search with fuzzy matching
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const name = searchParams.get('name');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const specialty = searchParams.get('specialty');
    const insurance = searchParams.get('insurance');
    const sessionType = searchParams.get('sessionType');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // For claim search, require at least one identifier
    const forClaim = searchParams.get('forClaim') === 'true';

    console.log('[Search API] Request params:', { email, phone, name, city, state, forClaim });

    if (forClaim && !email && !phone && !name) {
      return NextResponse.json(
        { error: 'At least one search parameter (email, phone, or name) is required' },
        { status: 400 }
      );
    }

    // Always use basic search with ILIKE pattern matching
    // (The fuzzy search RPC function is not deployed)
    return basicSearch(email, phone, name, city, state, specialty, insurance, sessionType, limit, offset, forClaim);
  } catch (error: any) {
    console.error('[Search API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search practitioners' },
      { status: 500 }
    );
  }
}

async function basicSearch(
  email: string | null,
  phone: string | null,
  name: string | null,
  city: string | null,
  state: string | null,
  specialty: string | null,
  insurance: string | null,
  sessionType: string | null,
  limit: number,
  offset: number,
  forClaim: boolean
) {
  let query = supabase
    .from('practitioners')
    .select('*', { count: 'exact' });

  // For claim search, only show unclaimed listings
  if (forClaim) {
    query = query.eq('claim_status', 'unclaimed');
  }

  // Build search conditions
  if (email) {
    query = query.ilike('email', `%${email}%`);
  }

  if (phone) {
    // Remove non-numeric characters for phone comparison
    const cleanPhone = phone.replace(/\D/g, '');
    query = query.ilike('phone', `%${cleanPhone}%`);
  }

  // When name is provided (from the search bar), search across name, city, AND state
  // This allows users to type "texas" or "sydney" and find matching results
  if (name) {
    query = query.or(`name.ilike.%${name}%,city.ilike.%${name}%,state.ilike.%${name}%`);
  }

  // City filter (from dropdown) - exact match on city field
  if (city) {
    query = query.ilike('city', `%${city}%`);
  }

  // State filter - if provided separately
  if (state) {
    query = query.ilike('state', `%${state}%`);
  }

  if (specialty) {
    query = query.contains('specialties', [specialty]);
  }

  if (insurance) {
    query = query.contains('insurance_accepted', [insurance]);
  }

  if (sessionType) {
    query = query.contains('session_types', [sessionType]);
  }

  query = query.range(offset, offset + limit - 1).order('name');

  const { data: practitioners, error, count } = await query;

  console.log('[Search API] Query result:', {
    practitionersCount: practitioners?.length || 0,
    totalCount: count,
    error: error?.message || null
  });

  if (error) throw error;

  return NextResponse.json({
    practitioners: practitioners || [],
    total: count || 0,
    limit,
    offset,
  });
}
