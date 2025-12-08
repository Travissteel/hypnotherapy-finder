import { createRouteHandlerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = await createRouteHandlerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('[Auth Callback] Error exchanging code:', error);
      return NextResponse.redirect(new URL('/login?error=authentication_failed', request.url));
    }

    if (data?.session) {
      console.log('[Auth Callback] Session created for user:', data.session.user.id);

      // Check if user has a practitioner profile
      const { data: practitioner, error: practitionerError } = await supabase
        .from('practitioners')
        .select('id')
        .eq('claimed_by', data.session.user.id)
        .maybeSingle();

      if (practitionerError) {
        console.error('[Auth Callback] Error checking practitioner:', practitionerError);
      }

      // If no practitioner profile, redirect to complete signup
      if (!practitioner) {
        console.log('[Auth Callback] No practitioner profile found, redirecting to complete signup');
        return NextResponse.redirect(new URL('/practitioner-signup?step=2&confirmed=true', request.url));
      }
    }
  }

  // Redirect to the dashboard or specified page
  return NextResponse.redirect(new URL(next, request.url));
}
