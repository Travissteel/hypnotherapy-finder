-- ============================================
-- CHECK CLAIMED PRACTITIONERS
-- ============================================

-- Show the 3 claimed practitioners with all details
SELECT
  p.id,
  p.name,
  p.email,
  p.city,
  p.state,
  p.slug,
  p.claim_status,
  p.claimed_by,
  p.claim_date,
  au.email as claimed_by_email,
  CASE
    WHEN p.slug IS NULL THEN '⚠️ MISSING SLUG - THIS WILL 404'
    WHEN p.slug = '' THEN '⚠️ EMPTY SLUG - THIS WILL 404'
    ELSE '✅ Has slug'
  END as slug_status
FROM practitioners p
LEFT JOIN auth.users au ON p.claimed_by = au.id
WHERE p.claim_status = 'claimed'
ORDER BY p.claim_date DESC;

-- Check if these practitioners have all required fields
SELECT
  p.id,
  p.name,
  p.slug,
  CASE WHEN p.slug IS NULL OR p.slug = '' THEN 'MISSING' ELSE 'OK' END as slug_check,
  CASE WHEN p.name IS NULL OR p.name = '' THEN 'MISSING' ELSE 'OK' END as name_check,
  CASE WHEN p.city IS NULL OR p.city = '' THEN 'MISSING' ELSE 'OK' END as city_check,
  CASE WHEN p.state IS NULL OR p.state = '' THEN 'MISSING' ELSE 'OK' END as state_check
FROM practitioners p
WHERE p.claim_status = 'claimed';

-- Show what the URL should be for each claimed practitioner
SELECT
  p.name,
  p.slug,
  'https://hypnotherapy-finder.com/practitioner/' || COALESCE(p.slug, 'NO-SLUG') as profile_url,
  CASE
    WHEN p.slug IS NULL THEN '❌ Will 404 - No slug'
    WHEN p.slug = '' THEN '❌ Will 404 - Empty slug'
    ELSE '✅ Should work'
  END as url_status
FROM practitioners p
WHERE p.claim_status = 'claimed';
