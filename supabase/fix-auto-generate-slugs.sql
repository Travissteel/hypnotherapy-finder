-- ============================================
-- FIX: AUTO-GENERATE SLUGS ON CLAIM APPROVAL
-- ============================================
-- This fixes the core issue where practitioners get claimed
-- but don't have slugs generated, leading to 404 errors.

-- Update the handle_claim_approval function to automatically generate slugs
CREATE OR REPLACE FUNCTION public.handle_claim_approval()
RETURNS TRIGGER AS $$
DECLARE
  practitioner_record RECORD;
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Get practitioner details
    SELECT name, city, state INTO practitioner_record
    FROM practitioners
    WHERE id = NEW.practitioner_id;

    -- Update practitioner with claim info AND auto-generate slug
    UPDATE practitioners
    SET
      claim_status = 'claimed',
      claimed_by = NEW.user_id,
      claim_date = NOW(),
      verified = true,
      verification_date = NOW(),
      -- ✅ FIX: Auto-generate slug if missing
      slug = COALESCE(
        NULLIF(slug, ''),  -- Keep existing slug if not empty
        generate_slug(practitioner_record.name, practitioner_record.city, practitioner_record.state)  -- Generate new slug
      )
    WHERE id = NEW.practitioner_id;

    -- Update user profile
    UPDATE user_profiles
    SET claimed_listings_count = claimed_listings_count + 1
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog;

-- Verification query
SELECT
  'Function updated successfully. New claims will auto-generate slugs.' as status,
  'Run fix-missing-slugs.sql to fix existing claimed practitioners' as next_step;
