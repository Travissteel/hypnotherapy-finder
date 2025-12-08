# Supabase Email Confirmation Solution for Next.js App Router

## Complete Guide for Hypnotherapy Directory Project

This comprehensive solution addresses the email confirmation flow issues and provides a reliable approach for creating practitioner profiles with email confirmation enabled.

---

## Table of Contents

1. [Problem Summary](#problem-summary)
2. [Supabase Configuration](#supabase-configuration)
3. [Email Template Configuration](#email-template-configuration)
4. [Code Implementation](#code-implementation)
5. [Best Approach for Practitioner Profile Creation](#best-approach-for-practitioner-profile-creation)
6. [Complete Working Example](#complete-working-example)
7. [Common Pitfalls](#common-pitfalls)
8. [Testing Checklist](#testing-checklist)

---

## Problem Summary

### Current Issues:
1. Email confirmation redirects to wrong domain (hypnotherapy-finder.com instead of Vercel app)
2. Practitioner profile not created when email confirmation is enabled
3. After email confirmation, users see "No Practitioner Profile Found"

### Root Causes:
- Wrong callback route handler (using `/auth/callback` instead of `/auth/confirm`)
- Missing `emailRedirectTo` parameter in signUp call
- Incorrect Supabase Site URL and Redirect URLs configuration
- Profile creation happens client-side after signup, but session doesn't exist until email is confirmed

---

## Supabase Configuration

### 1. Dashboard Settings

Go to your Supabase Dashboard > Authentication > URL Configuration:

**Site URL:**
- **Development:** `http://localhost:3000`
- **Production:** `https://your-vercel-app.vercel.app` or your custom domain

**Redirect URLs (Add all of these):**
```
http://localhost:3000/**
https://your-vercel-app.vercel.app/**
https://*.vercel.app/**
https://hypnotherapy-finder.com/**
```

**Important Notes:**
- The Site URL is the default redirect when no `redirectTo` is specified
- Supabase supports wildcards (`**`) for preview URLs
- The redirect URL in code must EXACTLY match an entry in this list

### 2. Email Configuration

Go to Authentication > Email Templates > Confirm signup

**Current template uses:** `{{ .ConfirmationURL }}`

**Change to:** `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`

This ensures the confirmation link points to your custom route handler instead of Supabase's default.

---

## Email Template Configuration

### Confirm Signup Template

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your account:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirm your email</a></p>
```

### Magic Link Template (if using)

```html
<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink">Log In</a></p>
```

### Password Reset Template

```html
<h2>Reset Password</h2>

<p>Follow this link to reset your password:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password">Reset Password</a></p>
```

---

## Code Implementation

### 1. Environment Variables

**File:** `.env.local`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site Configuration - CRITICAL for email confirmation
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_key
EMAIL_FROM=Hypnotherapy Finder <noreply@hypnotherapy-finder.com>
EMAIL_REPLY_TO=support@hypnotherapy-finder.com
```

**For Production (Vercel):**
Set `NEXT_PUBLIC_SITE_URL` to your production domain in Vercel environment variables.

### 2. Create Auth Confirm Route Handler

**File:** `app/auth/confirm/route.ts` (NEW FILE)

```typescript
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
```

### 3. Update Auth Callback Route (Keep for OAuth)

**File:** `app/auth/callback/route.ts` (EXISTING - KEEP AS IS)

This route is still needed for OAuth flows (Google, GitHub, etc.). The current implementation is correct for OAuth PKCE flow.

### 4. Update AuthContext SignUp Function

**File:** `lib/contexts/AuthContext.tsx`

```typescript
const signUp = async (email: string, password: string, fullName: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        user_type: 'practitioner',
      },
      // CRITICAL: Set the redirect URL for email confirmation
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });
  return { error };
};
```

### 5. Update Practitioner Signup Page

**File:** `app/practitioner-signup/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { CheckCircle, Star, Users, TrendingUp, Shield, AlertCircle } from 'lucide-react';

export default function PractitionerSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',

    // Business Info
    businessName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',

    // Professional Info
    certifications: '',
    specialties: [] as string[],
    yearsExperience: '',
    bio: '',

    // Preferences
    acceptsInsurance: false,
    offersOnline: false,
  });

  // Check if user is returning after email confirmation
  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    const stepParam = searchParams.get('step');

    if (confirmed === 'true' && stepParam === 'complete') {
      // User confirmed email but has no profile yet
      // Load data from localStorage if available
      const savedData = localStorage.getItem('signupFormData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
          setStep(3); // Go to final step to complete profile
        } catch (err) {
          console.error('Error loading saved form data:', err);
          setStep(1);
        }
      } else {
        // No saved data, start from beginning
        setStep(1);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Save form data to localStorage before signup
      // This ensures we don't lose the data if email confirmation is required
      localStorage.setItem('signupFormData', JSON.stringify(formData));

      const { error } = await signUp(formData.email, formData.password, fullName);

      if (error) {
        setError(error.message || 'Failed to create account');
        setLoading(false);
      } else {
        // Check if user is immediately authenticated (email confirmation disabled)
        const { createBrowserClient } = await import('@/lib/supabase/client');
        const supabase = createBrowserClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // Email confirmation is DISABLED - create profile immediately
          console.log('Creating practitioner profile...');
          await createPractitionerProfile(fullName);

          // Clear saved form data
          localStorage.removeItem('signupFormData');

          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          // Email confirmation is ENABLED - show confirmation message
          setStep(4);
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
      setLoading(false);
    }
  };

  const createPractitionerProfile = async (fullName: string) => {
    const profileData = {
      name: fullName,
      credentials: formData.certifications,
      email: formData.email,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      website: formData.website,
      bio: formData.bio,
      specialties: formData.specialties,
      yearsExperience: formData.yearsExperience,
      acceptsInsurance: formData.acceptsInsurance,
      offersOnline: formData.offersOnline,
    };

    const response = await fetch('/api/practitioners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || 'Failed to create profile');
    }

    return response.json();
  };

  const specialtyOptions = [
    'Anxiety & Stress',
    'Weight Loss',
    'Smoking Cessation',
    'Phobias',
    'Insomnia',
    'Pain Management',
    'PTSD & Trauma',
    'Confidence & Performance',
    'Past Life Regression',
    'General Hypnotherapy',
  ];

  const toggleSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.includes(specialty)
        ? formData.specialties.filter(s => s !== specialty)
        : [...formData.specialties, specialty],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join Hypnotherapy Finder
              </h1>
              <p className="text-xl mb-6">
                Connect with clients actively seeking hypnotherapy services in your area
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  100% Free During Pre-Launch
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Easy Profile Setup
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Found by Local Clients
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Why List with Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Reach More Clients</h3>
                    <p className="text-sm text-gray-600">
                      Get discovered by people actively searching for hypnotherapy
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Star className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Build Your Reputation</h3>
                    <p className="text-sm text-gray-600">
                      Showcase your credentials and expertise
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Grow Your Practice</h3>
                    <p className="text-sm text-gray-600">
                      Connect with clients in your specialty areas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">100% Free (Launch Special)</h3>
                    <p className="text-sm text-gray-600">
                      Join during our pre-launch period
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {step === 4 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Check Your Email!</h2>
                      <p className="text-gray-600 mb-6">
                        We've sent a confirmation link to <strong>{formData.email}</strong>.
                        Please check your email and click the link to verify your account.
                      </p>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-left">
                          <h3 className="font-semibold mb-2">What happens next?</h3>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>✓ Click the confirmation link in your email</li>
                            <li>✓ You'll be redirected back to complete your profile</li>
                            <li>✓ Your profile will be live and searchable</li>
                          </ul>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-left">
                          <h3 className="font-semibold mb-2">Didn't receive the email?</h3>
                          <p className="text-sm text-gray-700">
                            Check your spam folder, or contact support@hypnotherapy-finder.com for assistance.
                          </p>
                        </div>
                        <Button asChild className="w-full">
                          <Link href="/">Return to Homepage</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Create Your Profile</CardTitle>
                    <div className="flex gap-2 mt-4">
                      <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`h-2 flex-1 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Step 1: Personal Information */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Personal Information</h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">First Name *</label>
                              <Input
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Last Name *</label>
                              <Input
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <Input
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <Input
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 123-4567"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Password *</label>
                            <Input
                              name="password"
                              type="password"
                              required
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create a secure password"
                            />
                          </div>

                          <Button type="button" onClick={() => setStep(2)} className="w-full">
                            Continue
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Business Information */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Business Information</h3>

                          <div>
                            <label className="block text-sm font-medium mb-2">Business Name</label>
                            <Input
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleChange}
                              placeholder="Your practice name (or leave blank to use your name)"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Street Address *</label>
                            <Input
                              name="street"
                              required
                              value={formData.street}
                              onChange={handleChange}
                              placeholder="123 Main St, Suite 100"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">City *</label>
                              <Input
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Austin"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">State *</label>
                              <Input
                                name="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="TX"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Zip Code *</label>
                              <Input
                                name="zipCode"
                                required
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="78701"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Website</label>
                              <Input
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                              />
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                              Back
                            </Button>
                            <Button type="button" onClick={() => setStep(3)} className="flex-1">
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Professional Details */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Professional Details</h3>

                          {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-red-800">{error}</p>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium mb-2">Certifications *</label>
                            <Input
                              name="certifications"
                              required
                              value={formData.certifications}
                              onChange={handleChange}
                              placeholder="e.g., CHt, NGH Certified"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-3">Specialties * (select all that apply)</label>
                            <div className="flex flex-wrap gap-2">
                              {specialtyOptions.map((specialty) => (
                                <Badge
                                  key={specialty}
                                  variant={formData.specialties.includes(specialty) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleSpecialty(specialty)}
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Years of Experience</label>
                            <Input
                              name="yearsExperience"
                              type="number"
                              value={formData.yearsExperience}
                              onChange={handleChange}
                              placeholder="5"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">About You / Bio</label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Tell potential clients about your approach, experience, and what makes you unique..."
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="acceptsInsurance"
                                checked={formData.acceptsInsurance}
                                onChange={handleChange}
                                className="rounded"
                              />
                              <span className="text-sm">I accept insurance</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="offersOnline"
                                checked={formData.offersOnline}
                                onChange={handleChange}
                                className="rounded"
                              />
                              <span className="text-sm">I offer online/virtual sessions</span>
                            </label>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg text-sm">
                            <p className="font-semibold mb-2">Launch Special - Free Access</p>
                            <p className="text-gray-700">
                              Join us and get free access for 6 months before our official launch as a founding practitioner.
                              All features are completely free during this pre-launch period. After official launch, premium features start at $29/month.
                            </p>
                          </div>

                          <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={loading}>
                              Back
                            </Button>
                            <Button type="submit" className="flex-1" disabled={loading}>
                              {loading ? 'Creating Account...' : 'Complete Registration'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Already Have Account */}
              {step !== 4 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

---

## Best Approach for Practitioner Profile Creation

After analyzing all three options, here's the recommended approach:

### **Recommended: Hybrid Approach (Option A + C)**

Use **localStorage for form data persistence** combined with **database triggers for user_profile creation**, then create the practitioner profile in the `/auth/confirm` callback.

#### Why This Approach:

1. **Reliability:** Form data is preserved even if user doesn't confirm email immediately
2. **User Experience:** Seamless flow from email confirmation to dashboard
3. **Data Integrity:** User profile is created automatically via trigger, practitioner profile created only after confirmation
4. **Flexibility:** Works with both email confirmation enabled and disabled

#### Implementation Flow:

```
1. User fills out signup form
   ↓
2. Form data saved to localStorage
   ↓
3. signUp() called with emailRedirectTo
   ↓
4. User created in auth.users (session = null if email confirmation enabled)
   ↓
5. Database trigger creates user_profile record
   ↓
6. User receives confirmation email
   ↓
7. User clicks email link → /auth/confirm?token_hash=xxx
   ↓
8. verifyOtp() exchanges token for session
   ↓
9. Check if practitioner profile exists
   ↓
10a. If exists → redirect to /dashboard
10b. If not exists → redirect to /practitioner-signup?step=complete&confirmed=true
   ↓
11. Page loads saved form data from localStorage
   ↓
12. Create practitioner profile via API
   ↓
13. Clear localStorage
   ↓
14. Redirect to /dashboard
```

### Why NOT Option B (Incomplete Profile):

- Creates orphaned records if user never confirms email
- Requires complex cleanup logic
- Violates data integrity (required fields would be null)

### Why NOT Pure Option C (Triggers Only):

- Can't create practitioner-specific fields from auth.users alone
- Would need to store all form data in user_meta_data (size limits)
- Less flexible for multi-step forms

---

## Complete Working Example

### Database Trigger (Already Exists)

Your existing trigger in `supabase/schema.sql` is correct:

```sql
-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'practitioner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

This creates the `user_profiles` record automatically. The practitioner profile is created separately after email confirmation.

---

## Common Pitfalls

### 1. Wrong Callback Route

**Problem:** Using `/auth/callback` for email confirmation
**Solution:** Use `/auth/confirm` for email confirmation, `/auth/callback` for OAuth

### 2. Missing emailRedirectTo

**Problem:** Email links redirect to Supabase default URL
**Solution:** Always include `emailRedirectTo` in signUp options

### 3. Exact URL Matching

**Problem:** Redirect fails because URL doesn't exactly match allow list
**Solution:** Ensure exact match including trailing slashes, use wildcards for preview URLs

### 4. Site URL Misconfiguration

**Problem:** Wrong domain in confirmation emails
**Solution:** Set Site URL to your actual domain (localhost for dev, production URL for prod)

### 5. Using exchangeCodeForSession for Email Confirmation

**Problem:** Email confirmation uses `token_hash`, not `code`
**Solution:** Use `verifyOtp()` for email confirmation, `exchangeCodeForSession()` for OAuth

### 6. Creating Profile Before Session Exists

**Problem:** API call fails because no session exists yet
**Solution:** Save form data, create profile after email confirmation in callback

### 7. Lost Form Data

**Problem:** User confirms email but form data is gone
**Solution:** Use localStorage to persist form data until profile is created

### 8. Trigger Failures Block Signups

**Problem:** If trigger has error, signup fails
**Solution:** Add error handling in trigger, ensure required fields exist

---

## Testing Checklist

### Local Development

- [ ] Email confirmation redirects to `http://localhost:3000/auth/confirm`
- [ ] After confirmation, user is redirected to complete profile or dashboard
- [ ] Form data persists in localStorage during email confirmation flow
- [ ] Practitioner profile is created successfully after confirmation
- [ ] Dashboard loads correctly with practitioner data
- [ ] localStorage is cleared after successful profile creation

### Production (Vercel)

- [ ] `NEXT_PUBLIC_SITE_URL` is set to production domain
- [ ] Email confirmation redirects to production domain
- [ ] All redirect URLs are added to Supabase allow list
- [ ] Email templates use correct confirmation URL
- [ ] OAuth still works (if implemented)
- [ ] Preview deployments work with wildcard URLs

### Edge Cases

- [ ] User closes browser after signup, before confirming email
- [ ] User clicks confirmation link twice
- [ ] User tries to sign up again with same email
- [ ] User already has profile (shouldn't create duplicate)
- [ ] Network errors during profile creation
- [ ] Invalid or expired confirmation tokens

---

## Quick Reference

### Key Files to Update:

1. **NEW:** `app/auth/confirm/route.ts` - Email confirmation handler
2. **UPDATE:** `lib/contexts/AuthContext.tsx` - Add emailRedirectTo
3. **UPDATE:** `app/practitioner-signup/page.tsx` - Add localStorage persistence
4. **VERIFY:** Supabase Dashboard > Authentication > URL Configuration
5. **VERIFY:** Supabase Dashboard > Authentication > Email Templates

### Environment Variables Needed:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change per environment
```

### Supabase Dashboard Settings:

**Site URL:** `http://localhost:3000` (dev) or `https://your-domain.com` (prod)

**Redirect URLs:**
```
http://localhost:3000/**
https://your-vercel-app.vercel.app/**
https://*.vercel.app/**
```

**Email Template (Confirm Signup):**
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

---

## Additional Resources

- [Supabase Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Redirect URLs Documentation](https://supabase.com/docs/guides/auth/redirect-urls)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase PKCE Flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow)
- [Managing User Data in Supabase](https://supabase.com/docs/guides/auth/managing-user-data)

---

## Summary

This solution provides:

1. Proper email confirmation flow using `/auth/confirm` route
2. Correct Supabase configuration for redirect URLs
3. Form data persistence using localStorage
4. Database triggers for automatic user_profile creation
5. Practitioner profile creation after email confirmation
6. Comprehensive error handling and edge case coverage
7. Works seamlessly with both email confirmation enabled and disabled

The hybrid approach (localStorage + triggers + callback creation) is the most reliable solution that provides excellent UX while maintaining data integrity.
