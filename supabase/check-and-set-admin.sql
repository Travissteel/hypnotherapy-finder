-- ============================================
-- CHECK AND SET ADMIN STATUS
-- ============================================
-- Use this to check your user profiles and grant admin access

-- 1. First, check all user profiles
SELECT
  id,
  full_name,
  user_type,
  is_admin,
  created_at
FROM user_profiles
ORDER BY created_at DESC;

-- 2. If you need to grant admin access to a specific user,
-- replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users
--
-- To find your user ID, you can:
-- - Check the auth.users table in Supabase Dashboard
-- - Look at your profile in the Authentication section
-- - Or run: SELECT id, email FROM auth.users;

-- Example: Set admin for a specific user
-- UPDATE user_profiles
-- SET
--   is_admin = true,
--   user_type = 'admin',
--   admin_level = 'super'
-- WHERE id = 'YOUR_USER_ID_HERE';

-- 3. To grant yourself admin access (if you know your email):
-- UPDATE user_profiles
-- SET
--   is_admin = true,
--   user_type = 'admin',
--   admin_level = 'super'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com' LIMIT 1);

-- 4. Check all claims to see pending ones
SELECT
  c.id,
  c.status,
  c.created_at,
  p.name as practitioner_name,
  p.city,
  p.state,
  up.full_name as claimant_name,
  c.verification_email
FROM claims c
JOIN practitioners p ON c.practitioner_id = p.id
LEFT JOIN user_profiles up ON c.user_id = up.id
ORDER BY c.created_at DESC;
