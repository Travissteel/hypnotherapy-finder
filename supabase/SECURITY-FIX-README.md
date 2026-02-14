# Security Definer Views - Fix Documentation

## Issue Summary

The Supabase database linter detected 7 views that were created with the `SECURITY DEFINER` property, which is a security vulnerability. Views with `SECURITY DEFINER` bypass Row Level Security (RLS) policies and execute with the permissions of the view creator rather than the querying user.

### Affected Views
1. `public.top_searches`
2. `public.daily_page_views`
3. `public.most_viewed_practitioners`
4. `public.practitioner_stats`
5. `public.pending_claims_view`
6. `public.claim_funnel`
7. `public.popular_pages`

## What Was Fixed

All affected views have been updated to use `SECURITY INVOKER` instead of `SECURITY DEFINER`. This ensures that:
- RLS policies are properly enforced
- Queries execute with the permissions of the querying user
- Security is maintained according to your defined RLS policies

## How to Apply the Fix

### Option 1: Run the Migration File (Recommended)

1. Open your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file: `fix-security-definer-views.sql`
4. Copy and paste the entire content into the SQL Editor
5. Click **Run** to execute the migration

### Option 2: Re-run the Schema Files

If you're doing a fresh database setup:

1. The main schema files have been updated:
   - `schema.sql` - Updated `pending_claims_view` and `practitioner_stats`
   - `analytics-schema.sql` - Updated all analytics views

2. Simply run these files in order and the views will be created correctly

## Verification

After applying the fix, run the Supabase Database Linter again:

1. Go to **Database** > **Linter** in your Supabase Dashboard
2. Click **Run Linter**
3. Verify that all `security_definer_view` errors are resolved

## Technical Details

### What Changed

**Before:**
```sql
CREATE OR REPLACE VIEW top_searches AS
SELECT ...
```

**After:**
```sql
CREATE OR REPLACE VIEW top_searches
WITH (security_invoker=true) AS
SELECT ...
```

The `WITH (security_invoker=true)` option ensures the view respects RLS policies and runs with the permissions of the querying user.

### Why This Matters

- **Security**: Prevents unauthorized data access
- **RLS Enforcement**: Ensures your carefully crafted RLS policies are actually enforced
- **Best Practice**: Follows Supabase and PostgreSQL security recommendations
- **Compliance**: Meets security standards for external-facing applications

## Impact

- ✅ No breaking changes to view structure or output
- ✅ RLS policies will now be properly enforced on view queries
- ✅ Only users with appropriate permissions can access view data
- ⚠️ If you were relying on views to bypass RLS, you'll need to grant appropriate permissions

## Next Steps

1. Apply the migration using Option 1 above
2. Run the database linter to verify the fix
3. Test your application to ensure analytics and claims views work correctly
4. Verify that admin users can still access analytics data (RLS policies allow this)

## Questions?

If you encounter any issues after applying this fix:
1. Check that RLS policies are correctly configured for the underlying tables
2. Verify that admin users have the `is_admin = true` flag in `user_profiles`
3. Review the RLS policies in `analytics-schema.sql` (lines 319-355)
