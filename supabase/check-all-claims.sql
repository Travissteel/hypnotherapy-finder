-- ============================================
-- CHECK ALL CLAIMS AND USERS
-- ============================================

-- 1. Check all registered users
SELECT
  au.id,
  au.email,
  au.created_at as registered_at,
  up.full_name,
  up.is_admin,
  up.user_type
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;

-- 2. Check all claims (any status)
SELECT
  c.id,
  c.status,
  c.created_at,
  c.user_id,
  c.practitioner_id,
  c.verification_email,
  p.name as practitioner_name,
  p.city,
  p.state
FROM claims c
LEFT JOIN practitioners p ON c.practitioner_id = p.id
ORDER BY c.created_at DESC;

-- 3. Count claims by status
SELECT
  status,
  COUNT(*) as count
FROM claims
GROUP BY status;

-- 4. Check practitioners that are pending or claimed
SELECT
  id,
  name,
  claim_status,
  claimed_by,
  claim_date,
  city,
  state
FROM practitioners
WHERE claim_status != 'unclaimed'
ORDER BY claim_date DESC;

-- 5. Check if there are any user profiles without claims
SELECT
  up.id,
  up.full_name,
  au.email,
  up.user_type,
  up.created_at,
  (SELECT COUNT(*) FROM claims WHERE user_id = up.id) as claim_count
FROM user_profiles up
JOIN auth.users au ON au.id = up.id
WHERE up.user_type = 'practitioner'
ORDER BY up.created_at DESC;
