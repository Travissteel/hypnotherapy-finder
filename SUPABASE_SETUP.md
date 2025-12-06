# Supabase Setup Guide

This guide will help you set up the complete claim system for your hypnotherapy directory.

## Prerequisites

- Supabase account (free tier is sufficient)
- Node.js installed
- Project already created at: https://cprlplsmgznmyzwcusro.supabase.co

## Step 1: Set Up Database Tables

1. Go to your Supabase project dashboard: https://app.supabase.com/project/cprlplsmgznmyzwcusro
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/schema.sql` and paste it into the editor
5. Click **Run** to execute the SQL

This will create:
- `practitioners` table (with claim status fields)
- `claims` table (to track claim requests)
- `user_profiles` table (for user metadata)
- `verification_logs` table (to track verifications)
- `audit_logs` table (for admin actions)
- All necessary indexes, triggers, and Row Level Security (RLS) policies

## Step 2: Get Service Role Key

You need to add the service role key to your `.env.local` file:

1. In Supabase dashboard, go to **Settings** → **API**
2. Scroll down to **Project API keys**
3. Copy the `service_role` key (marked as **secret**)
4. Add it to your `.env.local` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ IMPORTANT**: Never commit this key to Git. It's already in `.gitignore`.

## Step 3: Migrate Practitioner Data

Run the migration script to load your 2,030+ practitioners into Supabase:

```bash
cd hypnotherapy-directory
npx tsx scripts/migrate-practitioners.ts
```

This script will:
- Read all practitioners from `lib/data/practitioners.json`
- Transform them to match the database schema
- Insert them in batches of 100
- Set all as `unclaimed` status
- Calculate profile completeness
- Generate unique slugs

Expected output:
```
🚀 Starting practitioner migration...
📊 Total practitioners to migrate: 2030
✅ Batch 1 completed: 100 practitioners inserted
✅ Batch 2 completed: 100 practitioners inserted
...
✅ Successfully migrated: 2030 practitioners
```

## Step 4: Configure Authentication

Supabase authentication is already configured in your app. You may want to customize:

### Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize the templates for:
   - Confirm Signup
   - Reset Password
   - Magic Link (optional)

### Email Settings

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `https://hypnotherapy-finder.com` (production) or `http://localhost:3000` (development)
   - **Redirect URLs**: Add your domains
   - **Email Auth**: Enable/disable as needed
   - **Confirm Email**: Recommended to enable

## Step 5: Test the System

### Test User Signup

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/practitioner-signup
3. Create a test account
4. Check your email for confirmation (if enabled)
5. Confirm email and log in

### Test Claim Workflow

1. Log in at http://localhost:3000/login
2. Go to http://localhost:3000/claim-listing
3. Search for a practitioner by email/phone/name
4. Select a listing
5. Submit claim
6. Check the `claims` table in Supabase to see the pending claim

### Verify Database

1. Go to **Table Editor** in Supabase
2. Check these tables:
   - `practitioners`: Should have 2,030+ records with `claim_status = 'unclaimed'`
   - `user_profiles`: Should have your test user
   - `claims`: Should have your test claim with `status = 'pending'`

## Step 6: Create Admin User

To approve/reject claims, you need an admin account:

1. Create a regular user account through signup
2. Go to **Table Editor** → `user_profiles`
3. Find your user record
4. Set `is_admin = true` and `admin_level = 'super'`
5. Log out and log back in

## Features Implemented

### For Practitioners

- ✅ User registration and authentication
- ✅ Email verification
- ✅ Search for unclaimed listings by email/phone/name
- ✅ Submit claim requests
- ✅ View claim status
- ✅ Dashboard to manage claimed listings

### For Admins

- ✅ View all pending claims
- ✅ Approve/reject claims
- ✅ View claim details with practitioner info
- ✅ Add admin notes
- ✅ Audit logging of all actions

### Technical Features

- ✅ Row Level Security (RLS) policies
- ✅ Automatic profile creation on signup
- ✅ Automatic practitioner update on claim approval
- ✅ Verification logging
- ✅ Audit trail for admin actions
- ✅ Protected API routes
- ✅ Session management
- ✅ Middleware for auth protection

## API Routes

The following API routes are available:

### Claims
- `GET /api/claims` - Get user's claims (or all if admin)
- `POST /api/claims` - Create new claim
- `GET /api/claims/[id]` - Get specific claim
- `PATCH /api/claims/[id]` - Update claim (admin only)

### Practitioners
- `GET /api/practitioners/search?email=...&phone=...&name=...` - Search for practitioners to claim

## Next Steps

### Optional Enhancements

1. **Email Notifications**
   - Install Resend: `npm install resend`
   - Set up email sending on claim approval/rejection
   - Add verification code emails

2. **Admin Dashboard**
   - Create `/admin/claims` page to view and manage claims
   - Add filtering/sorting
   - Add bulk actions

3. **Document Upload**
   - Add Supabase Storage bucket for license verification
   - Allow practitioners to upload credentials
   - Add document review in admin dashboard

4. **Advanced Verification**
   - Email verification with OTP
   - Phone verification with SMS
   - License number validation

5. **Profile Management**
   - Allow practitioners to edit their profiles
   - Add photo upload
   - Add availability calendar
   - Add pricing information

## Troubleshooting

### Migration Errors

**Error**: "relation 'practitioners' does not exist"
- **Fix**: Run the schema.sql in Supabase SQL Editor first

**Error**: "duplicate key value violates unique constraint"
- **Fix**: Clear the table and run migration again
  ```sql
  TRUNCATE practitioners CASCADE;
  ```

### Authentication Errors

**Error**: "Invalid API key"
- **Fix**: Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct in `.env.local`

**Error**: "Email not confirmed"
- **Fix**: Disable email confirmation in Supabase Auth settings, or check email for confirmation link

### RLS Errors

**Error**: "new row violates row-level security policy"
- **Fix**: Check that RLS policies are set up correctly. Re-run schema.sql if needed.

## Security Notes

1. **Service Role Key**: Never expose this in client-side code. Only use in server-side API routes or scripts.
2. **RLS Policies**: Always keep RLS enabled. Policies ensure users can only access their own data.
3. **Email Verification**: Enable this in production to prevent spam accounts.
4. **Rate Limiting**: Consider adding rate limiting to prevent abuse.

## Production Deployment

Before deploying to production:

1. ✅ Enable email confirmation in Supabase Auth settings
2. ✅ Set proper redirect URLs in Supabase Auth
3. ✅ Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables
4. ✅ Add Supabase keys to Vercel environment variables
5. ✅ Test the full claim workflow on production
6. ✅ Set up email notifications
7. ✅ Create admin accounts
8. ✅ Add monitoring/logging

## Support

If you encounter issues:
1. Check Supabase logs: **Logs** → **Postgres Logs** or **API Logs**
2. Check browser console for errors
3. Check server logs: `npm run dev` output
4. Verify environment variables are set correctly
