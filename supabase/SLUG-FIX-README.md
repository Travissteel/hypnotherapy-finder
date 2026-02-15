# Practitioner Profile Slug Fix - Complete Solution

## Problem Summary

When practitioners claim their profiles, they were getting 404 errors when trying to view their profile pages. This was caused by **missing slugs** in the `practitioners` table.

### Root Cause

The `handle_claim_approval()` trigger function was updating practitioner claim status but **NOT generating slugs**. This meant:

1. ✅ Claim gets approved
2. ✅ Practitioner status set to 'claimed'
3. ❌ **Slug remains NULL/empty**
4. ❌ Profile URL returns 404

## Complete Solution

This fix has **two parts**:

### Part 1: Fix Existing Claimed Practitioners ⚡ (Immediate)

**Run this SQL to fix the 3 existing claimed practitioners:**

```sql
-- File: fix-missing-slugs.sql
UPDATE practitioners
SET slug = generate_slug(name, city, state)
WHERE claim_status = 'claimed'
  AND (slug IS NULL OR slug = '');
```

**What it does:**
- Finds all claimed practitioners with missing slugs
- Generates URL-friendly slugs using their name, city, and state
- Updates the `slug` column

**Expected result:**
- 3 rows updated
- All claimed practitioner profiles now accessible

### Part 2: Prevent Future Issues 🛡️ (Long-term)

**Run this SQL to update the trigger function:**

```sql
-- File: fix-auto-generate-slugs.sql
-- This updates the handle_claim_approval() function to auto-generate slugs
```

**What it does:**
- Updates `handle_claim_approval()` trigger function
- Adds automatic slug generation when claims are approved
- Uses `COALESCE` to preserve existing slugs (if any)

**How it works:**
```sql
slug = COALESCE(
  NULLIF(slug, ''),  -- Keep existing slug if not empty
  generate_slug(name, city, state)  -- Generate new slug if missing
)
```

## Execution Order

**✅ Run in this order:**

1. **First**: `fix-auto-generate-slugs.sql` (prevents future issues)
2. **Second**: `fix-missing-slugs.sql` (fixes existing practitioners)

## Verification

### Before Fix

```sql
-- Check current state
SELECT
  name,
  city,
  state,
  slug,
  CASE
    WHEN slug IS NULL OR slug = '' THEN '❌ WILL 404'
    ELSE '✅ OK'
  END as status
FROM practitioners
WHERE claim_status = 'claimed';
```

Expected output:
```
name                    | slug  | status
------------------------|-------|----------
John Doe                | NULL  | ❌ WILL 404
Jane Smith              | NULL  | ❌ WILL 404
Bob Johnson             | NULL  | ❌ WILL 404
```

### After Fix

```sql
-- Verify the fix worked
SELECT
  name,
  city,
  state,
  slug,
  'https://hypnotherapy-finder.com/practitioner/' || slug as profile_url,
  CASE
    WHEN slug IS NULL OR slug = '' THEN '❌ STILL BROKEN'
    ELSE '✅ FIXED'
  END as status
FROM practitioners
WHERE claim_status = 'claimed';
```

Expected output:
```
name        | slug                      | profile_url                                                    | status
------------|---------------------------|----------------------------------------------------------------|--------
John Doe    | john-doe-austin-tx       | https://hypnotherapy-finder.com/practitioner/john-doe-austin-tx | ✅ FIXED
Jane Smith  | jane-smith-denver-co     | ...                                                            | ✅ FIXED
Bob Johnson | bob-johnson-seattle-wa   | ...                                                            | ✅ FIXED
```

## Testing Future Claims

After applying both fixes, test the complete flow:

1. **User registers** → Creates account in `auth.users` + `user_profiles`
2. **User claims listing** → Creates entry in `claims` table with status='pending'
3. **Admin approves claim** → Changes `claims.status` to 'approved'
4. **Trigger fires** → `handle_claim_approval()` runs automatically
5. **Slug auto-generated** → Practitioner gets a slug if missing
6. **Profile accessible** → URL works: `/practitioner/[slug]`

### Test Query

```sql
-- Approve a pending claim and verify slug is created
UPDATE claims SET status = 'approved' WHERE id = 'CLAIM_ID';

-- Check that slug was auto-generated
SELECT p.name, p.slug, c.status
FROM practitioners p
JOIN claims c ON c.practitioner_id = p.id
WHERE c.id = 'CLAIM_ID';
```

## Files Modified

### Migration Scripts (Run Once)
- ✅ [`fix-auto-generate-slugs.sql`](fix-auto-generate-slugs.sql) - Updates trigger function
- ✅ [`fix-missing-slugs.sql`](fix-missing-slugs.sql) - Fixes existing data

### Schema Files (Updated)
- ✅ [`schema.sql`](schema.sql) - Updated `handle_claim_approval()` function

### Diagnostic Scripts (Reference)
- 📊 [`check-claimed-practitioners.sql`](check-claimed-practitioners.sql) - Check slug status

## Technical Details

### Slug Generation Function

The `generate_slug()` function is already defined in the schema:

```sql
CREATE OR REPLACE FUNCTION generate_slug(name TEXT, city TEXT, state TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug: "john-doe-austin-tx"
  base_slug := lower(regexp_replace(name || '-' || city || '-' || state, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;

  -- Ensure uniqueness (add counter if needed)
  WHILE EXISTS (SELECT 1 FROM practitioners WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;
```

### COALESCE Logic

```sql
COALESCE(NULLIF(slug, ''), generate_slug(name, city, state))
```

This ensures:
1. If slug exists and is not empty → **keep it**
2. If slug is NULL or empty → **generate new one**

This preserves custom slugs while fixing missing ones.

## Common Issues

### Issue: "ERROR: function generate_slug does not exist"

**Solution**: The `generate_slug()` function must exist before running `fix-auto-generate-slugs.sql`. It should already be in your schema. Verify:

```sql
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'generate_slug';
```

### Issue: Slugs still NULL after running fix

**Solution**: Check that claims are actually approved:

```sql
SELECT id, status, practitioner_id FROM claims;
```

The trigger only runs when `status` changes from non-approved to 'approved'.

### Issue: Duplicate slugs

**Solution**: The `generate_slug()` function includes uniqueness checking. If a slug already exists, it appends a counter:
- `john-doe-austin-tx`
- `john-doe-austin-tx-1`
- `john-doe-austin-tx-2`

## Summary

| Action | Purpose | When to Run |
|--------|---------|-------------|
| `fix-auto-generate-slugs.sql` | Prevent future slug issues | **Once** (now) |
| `fix-missing-slugs.sql` | Fix existing claimed practitioners | **Once** (now) |
| `check-claimed-practitioners.sql` | Verify everything works | Anytime for diagnostics |

**After running both scripts:**
- ✅ All existing claimed practitioners have slugs
- ✅ Future claims will auto-generate slugs
- ✅ Profile pages work correctly
- ✅ No more 404 errors

## Next Steps

1. ✅ Run `fix-auto-generate-slugs.sql` in Supabase SQL Editor
2. ✅ Run `fix-missing-slugs.sql` in Supabase SQL Editor
3. ✅ Verify with `check-claimed-practitioners.sql`
4. ✅ Test by visiting practitioner profile URLs
5. ✅ Update PROJECT-SUMMARY.md (done)

---

**Related Documentation:**
- [Security Fix README](SECURITY-FIX-README.md)
- [Admin Guide](ADMIN-GUIDE.md)
- [Project Summary](../PROJECT-SUMMARY.md)
