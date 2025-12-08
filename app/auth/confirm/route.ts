import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/dashboard';

  console.log('[Auth Confirm] Starting confirmation flow', { type, has_token: !!token_hash });

  if (token_hash && type) {
    const supabase = await createRouteHandlerClient();

    try {
      // Verify the OTP token
      const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        console.error('[Auth Confirm] Error verifying OTP:', error);
        return NextResponse.redirect(new URL('/login?error=verification_failed', request.url));
      }

      if (data?.session) {
        console.log('[Auth Confirm] Session created for user:', data.session.user.id);

        // Check if user has a practitioner profile
        const { data: practitioner, error: practitionerError } = await supabase
          .from('practitioners')
          .select('id')
          .eq('claimed_by', data.session.user.id)
          .maybeSingle();

        if (practitionerError) {
          console.error('[Auth Confirm] Error checking practitioner:', practitionerError);
        }

        // If no practitioner profile exists, redirect to complete signup
        if (!practitioner) {
          console.log('[Auth Confirm] No practitioner profile found, redirecting to complete signup');
          return NextResponse.redirect(
            new URL('/practitioner-signup?step=complete&confirmed=true', request.url)
          );
        }

        // Profile exists, redirect to dashboard
        console.log('[Auth Confirm] Practitioner profile exists, redirecting to dashboard');
        return NextResponse.redirect(new URL(next, request.url));
      }
    } catch (err) {
      console.error('[Auth Confirm] Unexpected error:', err);
      return NextResponse.redirect(new URL('/login?error=unexpected_error', request.url));
    }
  }

  // Invalid or missing token
  console.error('[Auth Confirm] Invalid confirmation link');
  return NextResponse.redirect(new URL('/login?error=invalid_link', request.url));
}
