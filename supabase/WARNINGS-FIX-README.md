# Supabase Security Warnings - Fix Documentation

This document explains how to address the remaining security warnings from the Supabase database linter.

## Warning Categories

### 1. Function Search Path Mutable (9 warnings) ✅ CAN FIX

**Issue**: Functions don't have a fixed `search_path`, which could allow SQL injection attacks through search path manipulation.

**Affected Functions**:
- `update_updated_at_column`
- `handle_new_user`
- `handle_claim_approval`
- `generate_slug`
- `search_practitioners_fuzzy`
- `search_practitioners_fulltext`
- `track_page_view`
- `track_search_query`
- `track_practitioner_view`

**Fix**: Run [fix-function-search-paths.sql](fix-function-search-paths.sql)

This adds `SET search_path = public, pg_catalog` to all functions, preventing malicious search path manipulation.

---

### 2. Extension in Public Schema (1 warning) ⚠️ OPTIONAL

**Issue**: The `pg_trgm` extension is installed in the `public` schema instead of a dedicated `extensions` schema.

**Fix**: Run [fix-extension-schema.sql](fix-extension-schema.sql)

**⚠️ WARNING**: This will drop and recreate the extension, which may briefly affect fuzzy search functionality. The indexes will be automatically recreated.

**Alternative**: You can safely ignore this warning. Having `pg_trgm` in the public schema is functional and common in many PostgreSQL databases.

---

### 3. RLS Policy Always True (4 warnings) ℹ️ INTENTIONAL

**Issue**: Analytics tables have INSERT policies with `WITH CHECK (true)` that allow unrestricted inserts.

**Affected Tables**:
- `page_views` - "Anyone can track page views"
- `search_queries` - "Anyone can track searches"
- `practitioner_views` - "Anyone can track practitioner views"
- `claim_events` - "Anyone can track claim events"

**Why This Is Intentional**:
These policies are designed to allow **anonymous tracking** for analytics purposes. This is a common pattern for:
- Public website analytics (Google Analytics equivalent)
- User behavior tracking without authentication
- Anonymous event logging

**Options**:

**Option 1: Keep As-Is (RECOMMENDED)**
- Accept these warnings as known and intentional
- Analytics tracking requires public INSERT access
- Data is protected by SELECT policies (admin-only)

**Option 2: Add Basic Validation**
- Run [fix-analytics-rls-policies.sql](fix-analytics-rls-policies.sql)
- Adds minimal validation (e.g., require session_id)
- Still allows public tracking but ensures data quality
- Addresses linter warnings

---

### 4. Leaked Password Protection Disabled (1 warning) ⚠️ DASHBOARD SETTING

**Issue**: Supabase Auth is not checking passwords against known leaked passwords database (HaveIBeenPwned).

**Fix**: This is a **dashboard setting**, not a SQL change.

**Steps to Enable**:
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Policies**
3. Find **Password Security** section
4. Enable **"Leaked Password Protection"**
5. Save changes

**What This Does**:
- Checks user passwords against HaveIBeenPwned database
- Prevents users from using known compromised passwords
- Enhances security for user accounts

**Recommendation**: **Enable this immediately** for production environments.

---

## Quick Fix Summary

### Must Fix (Security Critical)
1. ✅ **Function Search Path**: Run `fix-function-search-paths.sql`
2. ✅ **Leaked Password Protection**: Enable in dashboard

### Optional (Best Practice)
3. ⚠️ **Extension Schema**: Run `fix-extension-schema.sql` (or ignore)
4. ℹ️ **Analytics RLS**: Keep as-is (or run `fix-analytics-rls-policies.sql` for stricter validation)

---

## Application Order

Run migrations in this order:

```sql
-- 1. Fix function search paths (REQUIRED)
-- Run: fix-function-search-paths.sql

-- 2. Move extension to extensions schema (OPTIONAL)
-- Run: fix-extension-schema.sql

-- 3. Add validation to analytics policies (OPTIONAL)
-- Run: fix-analytics-rls-policies.sql
```

Then enable leaked password protection in the dashboard.

---

## Verification

After applying fixes:

1. Go to **Database** > **Linter**
2. Click **Run Linter**
3. Verify warnings are resolved or documented as intentional

### Expected Results:
- ✅ Function search path warnings: **0**
- ✅ Leaked password protection: **0** (after enabling in dashboard)
- ⚠️ Extension in public: **0** (if you ran the fix) or **1** (acceptable)
- ℹ️ RLS policy always true: **0** (if you added validation) or **4** (intentional for analytics)

---

## Impact Assessment

| Fix | Breaking Changes | Risk | Recommendation |
|-----|------------------|------|----------------|
| Function Search Paths | None | Low | **Apply immediately** |
| Extension Schema | Brief downtime for fuzzy search | Medium | Optional, test first |
| Analytics RLS Validation | May break tracking if session_id missing | Low | Optional, depends on needs |
| Leaked Password Protection | None (dashboard setting) | None | **Enable immediately** |

---

## Questions?

### "Should I fix all warnings?"
- **Must fix**: Function search paths, leaked password protection
- **Optional**: Extension schema, analytics RLS validation

### "Will these changes break my application?"
- Function search paths: No breaking changes
- Extension schema: Brief disruption to fuzzy search
- Analytics RLS: Only if your app doesn't send session_id

### "What about the analytics warnings?"
Those are **intentional** for public tracking. You can either:
1. Ignore them (they're working as designed)
2. Add basic validation (addresses warnings but still allows public tracking)

---

## Next Steps

1. Run `fix-function-search-paths.sql` ✅
2. Enable leaked password protection in dashboard ✅
3. Decide on optional fixes (extension schema, analytics RLS)
4. Run the linter to verify
5. Update your memory/documentation with the decisions made
