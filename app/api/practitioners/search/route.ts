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
    if (forClaim && !email && !phone && !name) {
      return NextResponse.json(
        { error: 'At least one search parameter (email, phone, or name) is required' },
        { status: 400 }
      );
    }

    // Build RPC call for fuzzy search
    if (name) {
      // Use PostgreSQL trigram similarity for fuzzy name matching
      const { data, error } = await supabase.rpc('search_practitioners_fuzzy', {
        search_name: name,
        search_city: city || null,
        search_state: state || null,
        search_specialty: specialty || null,
        limit_count: limit,
        offset_count: offset,
        unclaimed_only: forClaim,
      });

      if (error) {
        // If RPC function doesn't exist yet, fall back to basic search
        console.warn('Fuzzy search function not available, using basic search:', error);
        return basicSearch(email, phone, name, city, state, specialty, insurance, sessionType, limit, offset, forClaim);
      }

      return NextResponse.json({ practitioners: data || [], total: data?.length || 0 });
    }

    // Use basic search if no name provided
    return basicSearch(email, phone, name, city, state, specialty, insurance, sessionType, limit, offset, forClaim);
  } catch (error: any) {
    console.error('Error searching practitioners:', error);
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

  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (city) {
    query = query.ilike('city', `%${city}%`);
  }

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

  if (error) throw error;

  return NextResponse.json({
    practitioners: practitioners || [],
    total: count || 0,
    limit,
    offset,
  });
}
