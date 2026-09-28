import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// A neutral "pending" graphic — deliberately NOT the "Verified Practitioner"
// badge (see app/api/badge/[slug]/route.ts), since this is served before any
// admin has actually reviewed the claim. Showing "Verified" wording here
// would mislead site visitors.
const PENDING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 56" width="220" height="56">
  <rect width="220" height="56" rx="6" fill="#4a3a12"/>
  <rect width="52" height="56" rx="6" fill="#332707"/>
  <circle cx="26" cy="28" r="13" fill="#f59e0b"/>
  <path d="M26 21v9M26 34.5h.01" stroke="#1a1400" stroke-width="2.5" stroke-linecap="round"/>
  <text x="62" y="22" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="bold" fill="white">Listing Pending Review</text>
  <text x="62" y="39" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#fbbf24">hypnotherapy-finder.com</text>
</svg>`;

// GET /api/verify-pixel/[id] - Ownership-verification pixel for a pending
// claim. Referenced by practitioner id (not slug, since a pending listing
// may not have a public slug yet). Practitioners are told to place this on
// their own business website; when it loads from there, the Referer header
// lets us confirm they actually control that domain (see
// lib/verification/domain-match.ts and its use in app/api/claims/route.ts).
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = createAdminClient();

    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .select('id,claim_status')
      .eq('id', id)
      .single();

    if (error || !practitioner) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Only serve this while a claim is actually under review — once
    // approved (or if never claimed), this endpoint has nothing to prove.
    if (practitioner.claim_status !== 'pending') {
      return NextResponse.json({ error: 'Not pending verification' }, { status: 404 });
    }

    try {
      await supabase.from('practitioner_views').insert({
        practitioner_id: practitioner.id,
        source: 'ownership_pixel',
        referrer: request.headers.get('referer'),
        ip_address:
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          request.headers.get('x-real-ip') ||
          null,
      });
    } catch (trackError) {
      console.error('[API] Failed to log ownership pixel view:', trackError);
    }

    return new NextResponse(PENDING_SVG, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        // Short cache so a freshly-installed pixel gets picked up quickly.
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API] Error serving verification pixel:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
