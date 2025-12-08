# Email Confirmation Implementation Checklist

## Step-by-Step Implementation Guide

Follow these steps in order to implement the complete email confirmation solution.

---

## Phase 1: Supabase Dashboard Configuration

### 1.1 Configure URL Settings

- [ ] Go to Supabase Dashboard > Authentication > URL Configuration
- [ ] Set **Site URL** to `http://localhost:3000` (for development)
- [ ] Add the following to **Redirect URLs**:
  - [ ] `http://localhost:3000/**`
  - [ ] `https://your-vercel-app.vercel.app/**`
  - [ ] `https://*.vercel.app/**`
  - [ ] `https://hypnotherapy-finder.com/**`

### 1.2 Update Email Templates

- [ ] Go to Supabase Dashboard > Authentication > Email Templates
- [ ] Click on **"Confirm signup"** template
- [ ] Replace `{{ .ConfirmationURL }}` with:
  ```
  {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
  ```
- [ ] Save the template

### 1.3 Verify Email Provider Settings

- [ ] Go to Supabase Dashboard > Authentication > Providers > Email
- [ ] Verify **"Confirm email"** is **ENABLED**
- [ ] Note: This is required for spam protection

---

## Phase 2: Code Implementation

### 2.1 Create Auth Confirm Route Handler

**Status:** ✅ Complete (file created)

**File:** `app/auth/confirm/route.ts`

- [x] File created with proper verifyOtp implementation
- [x] Checks for practitioner profile after confirmation
- [x] Redirects to complete signup if no profile exists
- [x] Redirects to dashboard if profile exists

### 2.2 Update AuthContext

**Status:** ✅ Complete (file updated)

**File:** `lib/contexts/AuthContext.tsx`

- [x] Added `emailRedirectTo` parameter to signUp function
- [x] Points to `/auth/confirm` route

### 2.3 Update Practitioner Signup Page

**Status:** ✅ Complete (file updated)

**File:** `app/practitioner-signup/page.tsx`

Changes made:
- [x] Added `useSearchParams` hook
- [x] Added `useEffect` to check for confirmation redirect
- [x] Added localStorage persistence for form data
- [x] Created `createPractitionerProfile` helper function
- [x] Created `createPractitionerProfileAfterConfirmation` function
- [x] Updated `handleSubmit` to save form data before signup
- [x] Updated success message for email confirmation

### 2.4 Verify Environment Variables

**File:** `.env.local`

- [ ] Verify `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
- [ ] Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set correctly
- [ ] Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### 2.5 Keep Existing Auth Callback (for OAuth)

**File:** `app/auth/callback/route.ts`

- [x] Keep existing file (no changes needed)
- [x] This is still used for OAuth flows (Google, GitHub, etc.)

---

## Phase 3: Testing

### 3.1 Local Development Testing

- [ ] Start development server: `npm run dev`
- [ ] Navigate to `/practitioner-signup`
- [ ] Fill out the signup form completely
- [ ] Submit the form
- [ ] Verify you see "Check Your Email!" message
- [ ] Check your email inbox for confirmation email
- [ ] Verify email link points to `http://localhost:3000/auth/confirm`
- [ ] Click the confirmation link in email
- [ ] Verify you're redirected back to the application
- [ ] Verify practitioner profile is created automatically
- [ ] Verify you're redirected to `/dashboard`
- [ ] Verify dashboard shows your practitioner information

### 3.2 Test Edge Cases

- [ ] Close browser after signup (before confirming email)
- [ ] Open email confirmation link later
- [ ] Verify localStorage data is preserved
- [ ] Verify profile is created correctly
- [ ] Click email confirmation link twice (should still work)
- [ ] Try to sign up again with same email (should show error)
- [ ] Test with email confirmation disabled (should work immediately)

### 3.3 Verify Database State

- [ ] Check Supabase Dashboard > Table Editor > auth.users
- [ ] Verify new user is created with `email_confirmed_at` timestamp
- [ ] Check Table Editor > user_profiles
- [ ] Verify user_profile record is created (by trigger)
- [ ] Check Table Editor > practitioners
- [ ] Verify practitioner record is created with correct data
- [ ] Verify `claimed_by` field points to correct user ID

---

## Phase 4: Production Deployment

### 4.1 Update Vercel Environment Variables

- [ ] Go to Vercel Dashboard > Your Project > Settings > Environment Variables
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain:
  - Production: `https://your-vercel-app.vercel.app`
  - OR Custom: `https://hypnotherapy-finder.com`
- [ ] Verify other environment variables are set:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `RESEND_API_KEY`

### 4.2 Update Supabase for Production

- [ ] Go to Supabase Dashboard > Authentication > URL Configuration
- [ ] Update **Site URL** to production domain
- [ ] Keep development URL in **Redirect URLs** for local testing
- [ ] Add production URL to **Redirect URLs**

### 4.3 Deploy to Vercel

- [ ] Commit all changes to git
- [ ] Push to GitHub
- [ ] Verify Vercel deployment succeeds
- [ ] Check deployment logs for any errors

### 4.4 Test Production Flow

- [ ] Navigate to production URL
- [ ] Complete signup form
- [ ] Verify confirmation email points to production domain
- [ ] Click confirmation link
- [ ] Verify redirect works correctly
- [ ] Verify profile is created
- [ ] Verify dashboard loads

---

## Phase 5: Monitoring & Validation

### 5.1 Check Logs

- [ ] Supabase Dashboard > Logs > Auth Logs
  - [ ] Verify signup events are logged
  - [ ] Verify email confirmation events are logged
  - [ ] Check for any errors
- [ ] Vercel Dashboard > Deployments > [Your Deployment] > Functions
  - [ ] Check `/auth/confirm` function logs
  - [ ] Check `/api/practitioners` function logs
  - [ ] Look for any errors or warnings

### 5.2 Verify Email Deliverability

- [ ] Test with different email providers:
  - [ ] Gmail
  - [ ] Outlook/Hotmail
  - [ ] Yahoo
  - [ ] Custom domain
- [ ] Check spam folders
- [ ] Verify email formatting looks correct
- [ ] Verify all links work

---

## Troubleshooting Guide

### Issue: Email redirects to wrong domain

**Check:**
- [ ] Site URL in Supabase dashboard
- [ ] `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Email template uses `{{ .SiteURL }}`

**Solution:** Update Site URL to match your current environment

---

### Issue: "Invalid redirect URL" error

**Check:**
- [ ] URL is in Redirect URLs list in Supabase dashboard
- [ ] URL includes wildcard (`/**`)
- [ ] URL protocol matches (http vs https)

**Solution:** Add exact URL to Redirect URLs list

---

### Issue: Profile not created after email confirmation

**Check:**
- [ ] Browser console for errors
- [ ] Network tab for failed API calls
- [ ] Supabase logs for auth errors
- [ ] `/api/practitioners` route logs

**Solution:** Verify localStorage has form data, check session exists

---

### Issue: "No Practitioner Profile Found" after confirmation

**Check:**
- [ ] localStorage contains `signupFormData`
- [ ] `/auth/confirm` redirects to correct URL
- [ ] useEffect in signup page is triggering
- [ ] API call is succeeding

**Solution:** Check browser console and network logs

---

### Issue: Email never arrives

**Check:**
- [ ] Supabase email provider is enabled
- [ ] Resend API key is valid
- [ ] Email is not in spam folder
- [ ] Supabase logs show email was sent

**Solution:** Check Supabase logs, verify Resend integration

---

## Rollback Plan

If you need to rollback these changes:

### Option 1: Disable Email Confirmation (Temporary)

- [ ] Go to Supabase Dashboard > Authentication > Providers > Email
- [ ] Disable **"Confirm email"**
- [ ] Users will be immediately authenticated after signup
- [ ] Profile will be created immediately

### Option 2: Revert Code Changes

- [ ] Delete `app/auth/confirm/route.ts`
- [ ] Revert changes to `lib/contexts/AuthContext.tsx`
- [ ] Revert changes to `app/practitioner-signup/page.tsx`
- [ ] Clear localStorage: `localStorage.removeItem('signupFormData')`

### Option 3: Use Previous Flow

- [ ] Keep email confirmation disabled
- [ ] Remove localStorage logic
- [ ] Create profile immediately in signup flow

---

## Success Criteria

The implementation is successful when:

- [x] Code changes are complete
- [ ] Supabase dashboard is configured correctly
- [ ] Email confirmation redirects to correct domain
- [ ] Practitioner profile is created after confirmation
- [ ] User can access dashboard after confirmation
- [ ] localStorage is used to persist form data
- [ ] No errors in browser console
- [ ] No errors in Supabase logs
- [ ] Production deployment works correctly
- [ ] Emails are delivered successfully

---

## Additional Notes

### LocalStorage Data Structure

The form data saved to localStorage has this structure:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "password": "password123",
  "businessName": "",
  "street": "123 Main St",
  "city": "Austin",
  "state": "TX",
  "zipCode": "78701",
  "website": "https://example.com",
  "certifications": "CHt, NGH",
  "specialties": ["Anxiety & Stress", "Weight Loss"],
  "yearsExperience": "5",
  "bio": "Professional hypnotherapist...",
  "acceptsInsurance": true,
  "offersOnline": true
}
```

### Database Trigger Already Exists

The `handle_new_user()` trigger already exists in your schema and will automatically create the `user_profiles` record when a user signs up. No additional database changes needed.

### Email Template Variables

Available variables in Supabase email templates:

- `{{ .SiteURL }}` - Your configured Site URL
- `{{ .TokenHash }}` - The verification token
- `{{ .Email }}` - User's email address
- `{{ .ConfirmationURL }}` - Supabase default (don't use)
- `{{ .Token }}` - Deprecated (don't use)

---

## Timeline

Estimated implementation time:

- **Phase 1:** 10-15 minutes (Supabase dashboard configuration)
- **Phase 2:** Already complete (code implementation)
- **Phase 3:** 20-30 minutes (testing)
- **Phase 4:** 15-20 minutes (production deployment)
- **Phase 5:** 10-15 minutes (monitoring & validation)

**Total:** ~1-1.5 hours

---

## Support

If you encounter issues not covered in this checklist:

1. Check the detailed solution guide: `SUPABASE-EMAIL-CONFIRMATION-SOLUTION.md`
2. Check the dashboard config guide: `SUPABASE-DASHBOARD-CONFIG.md`
3. Review Supabase documentation: https://supabase.com/docs/guides/auth
4. Check the GitHub issues for similar problems
5. Contact Supabase support or ask in their Discord

---

## Completion

Once all checkboxes are checked, your email confirmation flow is fully implemented and tested!

**Final verification:**
- [ ] All phases complete
- [ ] All tests passing
- [ ] Production deployment successful
- [ ] Email confirmation working end-to-end
- [ ] No errors in logs
- [ ] Documentation reviewed

🎉 **Implementation Complete!**
