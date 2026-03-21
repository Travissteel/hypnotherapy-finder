import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

const BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 56" width="200" height="56">
  <!-- Background -->
  <rect width="200" height="56" rx="6" fill="#1e3a5f"/>
  <!-- Shield icon area -->
  <rect width="52" height="56" rx="6" fill="#163058"/>
  <!-- Checkmark circle -->
  <circle cx="26" cy="28" r="13" fill="#10b981"/>
  <!-- Checkmark path -->
  <path d="M20 28 L24.5 33 L33 22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Text: Verified Practitioner -->
  <text x="62" y="22" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="bold" fill="white">Verified Practitioner</text>
  <!-- Text: hypnotherapy-finder.com -->
  <text x="62" y="39" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#93c5fd">hypnotherapy-finder.com</text>
</svg>`;

// GET /api/badge/[slug] - Return SVG verified practitioner badge
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Use admin client (service role) to bypass RLS for public badge lookups
    const supabase = createAdminClient();

    const { data: practitioner, error } = await supabase
      .from('practitioners')
      .select('id,name,verified,claim_status')
      .eq('slug', slug)
      .single();

    if (error || !practitioner) {
      return NextResponse.json(
        { error: 'Practitioner not found' },
        { status: 404 }
      );
    }

    // Must be verified AND claimed to receive a badge
    if (!practitioner.verified || practitioner.claim_status !== 'claimed') {
      return NextResponse.json(
        { error: 'Practitioner is not verified' },
        { status: 404 }
      );
    }

    return new NextResponse(BADGE_SVG, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API] Error serving badge:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
