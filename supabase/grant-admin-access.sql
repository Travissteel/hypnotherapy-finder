-- ============================================
-- GRANT ADMIN ACCESS
-- ============================================
-- Use this to grant yourself admin access after registering

-- Step 1: Check all registered users
SELECT
  au.id,
  au.email,
  au.created_at,
  up.full_name,
  up.is_admin,
  up.admin_level
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;

-- Step 2: Grant admin access to your email
-- ⚠️ IMPORTANT: Replace 'your-email@example.com' with your actual email!

UPDATE user_profiles
SET
  is_admin = true,
  user_type = 'admin',
  admin_level = 'super'
WHERE id = (
  SELECT id
  FROM auth.users
  WHERE email = 'your-email@example.com'  -- ← CHANGE THIS!
  LIMIT 1
);

-- Step 3: Verify it worked
SELECT
  au.id,
  au.email,
  up.full_name,
  up.is_admin,
  up.admin_level,
  up.user_type
FROM user_profiles up
JOIN auth.users au ON au.id = up.id
WHERE up.is_admin = true;

-- Step 4: Check if there are any pending claims waiting for you
SELECT
  c.id,
  c.status,
  c.created_at,
  p.name as practitioner_name,
  p.city || ', ' || p.state as location,
  c.verification_email
FROM claims c
JOIN practitioners p ON c.practitioner_id = p.id
WHERE c.status = 'pending'
ORDER BY c.created_at DESC;
