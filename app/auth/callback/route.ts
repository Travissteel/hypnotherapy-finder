import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { type EmailOtpType, type SupabaseClient, type User } from '@supabase/supabase-js';
import { createPractitionerFromSignup } from '@/lib/practitioners/create-from-signup';

// If the user signed up via the practitioner form, their profile fields were
// stashed in user_metadata at signUp time (see AuthContext.signUp) so they
// survive confirming their email on a different device/tab than the one
// they signed up on. Finish creating the listing here, server-side, instead
// of sending the user back to the signup form to re-enter everything.
async function completePractitionerSignupIfNeeded(supabase: SupabaseClient, user: User) {
  const { data: practitioner, error: practitionerError } = await supabase
    .from('practitioners')
    .select('id')
    .eq('claimed_by', user.id)
    .maybeSingle();

  if (practitionerError) {
    console.error('[Auth Callback] Error checking practitioner:', practitionerError);
    return true; // don't block on a check failure; treat as "already has one"
  }

  if (practitioner) return true;

  const metadata = user.user_metadata || {};
  if (metadata.user_type !== 'practitioner' || !metadata.street) {
    // Not a practitioner signup (or metadata is missing for some other
    // reason) — nothing for us to create.
    return true;
  }

  try {
    await createPractitionerFromSignup(supabase, user.id, {
      firstName: metadata.firstName,
      lastName: metadata.lastName,
      credentials: metadata.certifications,
      email: user.email!,
      phone: metadata.phone,
      website: metadata.website,
      street: metadata.street,
      city: metadata.city,
      state: metadata.state,
      zipCode: metadata.zipCode,
      bio: metadata.bio,
      specialties: metadata.specialties,
      yearsExperience: metadata.yearsExperience,
      acceptsInsurance: metadata.acceptsInsurance,
      offersOnline: metadata.offersOnline,
    });
    return true;
  } catch (err) {
    console.error('[Auth Callback] Failed to create practitioner profile from signup metadata:', err);
    return false;
  }
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  console.log('[Auth Callback] Request received', {
    has_code: !!code,
    has_token_hash: !!token_hash,
    type,
    url: requestUrl.toString()
  });

  // Default redirect URL (will be updated based on flow)
  let redirectUrl = new URL('/login?error=auth_failed', requestUrl);

  // Create response object that we'll set cookies on
  const response = NextResponse.redirect(redirectUrl);

  // Create Supabase client that sets cookies on the response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Handle email confirmation with token_hash (email OTP flow)
  if (token_hash && type) {
    console.log('[Auth Callback] Processing email confirmation with token_hash');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (error) {
        console.error('[Auth Callback] Error verifying OTP:', error);
        return NextResponse.redirect(new URL('/login?error=verification_failed', requestUrl));
      }

      if (data?.session) {
        console.log('[Auth Callback] Email verified, session created for user:', data.session.user.id);

        const ok = await completePractitionerSignupIfNeeded(supabase, data.session.user);

        redirectUrl = ok
          ? new URL(next, requestUrl)
          : new URL('/practitioner-signup?setup_error=true', requestUrl);

        // Return response with updated redirect URL and cookies
        return NextResponse.redirect(redirectUrl, {
          headers: response.headers,
        });
      }
    } catch (err) {
      console.error('[Auth Callback] Unexpected error during email confirmation:', err);
      return NextResponse.redirect(new URL('/login?error=unexpected_error', requestUrl));
    }
  }

  // Handle OAuth callback with code
  if (code) {
    console.log('[Auth Callback] Processing OAuth callback with code');

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('[Auth Callback] Error exchanging code:', error);
      return NextResponse.redirect(new URL('/login?error=authentication_failed', requestUrl));
    }

    if (data?.session) {
      console.log('[Auth Callback] OAuth session created for user:', data.session.user.id);

      const ok = await completePractitionerSignupIfNeeded(supabase, data.session.user);

      redirectUrl = ok
        ? new URL(next, requestUrl)
        : new URL('/practitioner-signup?setup_error=true', requestUrl);

      // Return response with updated redirect URL and cookies
      return NextResponse.redirect(redirectUrl, {
        headers: response.headers,
      });
    }
  }

  // No valid auth parameters found
  console.error('[Auth Callback] No valid auth parameters (code or token_hash)');
  return NextResponse.redirect(new URL('/login?error=invalid_callback', requestUrl));
}

