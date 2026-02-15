-- ============================================
-- VERIFY USERS VS PRACTITIONERS
-- ============================================

-- 1. Show all registered USER ACCOUNTS
SELECT
  au.id,
  au.email,
  au.created_at,
  up.full_name,
  up.user_type,
  'USER ACCOUNT' as record_type
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;

-- 2. Show all PRACTITIONER LISTINGS (from CSV import)
SELECT
  id,
  name,
  email,
  city,
  state,
  claim_status,
  slug,
  'PRACTITIONER LISTING' as record_type
FROM practitioners
ORDER BY created_at DESC
LIMIT 10;

-- 3. Check if any practitioners are CLAIMED by these users
SELECT
  p.id,
  p.name,
  p.email,
  p.city,
  p.state,
  p.claim_status,
  p.claimed_by,
  au.email as claimed_by_email
FROM practitioners p
LEFT JOIN auth.users au ON p.claimed_by = au.id
WHERE p.claimed_by IS NOT NULL
ORDER BY p.claim_date DESC;

-- 4. Total counts
SELECT
  (SELECT COUNT(*) FROM auth.users) as total_user_accounts,
  (SELECT COUNT(*) FROM practitioners) as total_practitioner_listings,
  (SELECT COUNT(*) FROM practitioners WHERE claim_status = 'claimed') as claimed_listings,
  (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pending_claims;
