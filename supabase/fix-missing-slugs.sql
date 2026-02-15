-- ============================================
-- FIX MISSING SLUGS FOR CLAIMED PRACTITIONERS
-- ============================================

-- BEFORE: Check current state
SELECT
  p.name,
  p.city,
  p.state,
  p.slug as current_slug,
  CASE WHEN p.slug IS NULL OR p.slug = '' THEN '❌ MISSING' ELSE '✅ HAS SLUG' END as status
FROM practitioners p
WHERE p.claim_status = 'claimed'
ORDER BY p.claim_date DESC;

-- FIX: Generate slugs for practitioners missing them
UPDATE practitioners
SET slug = generate_slug(name, city, state)
WHERE claim_status = 'claimed'
  AND (slug IS NULL OR slug = '');

-- AFTER: Verify the fix worked
SELECT
  p.name,
  p.city,
  p.state,
  p.slug as new_slug,
  'https://hypnotherapy-finder.com/practitioner/' || p.slug as profile_url,
  CASE WHEN p.slug IS NULL OR p.slug = '' THEN '❌ STILL MISSING' ELSE '✅ FIXED' END as status
FROM practitioners p
WHERE p.claim_status = 'claimed'
ORDER BY p.claim_date DESC;
