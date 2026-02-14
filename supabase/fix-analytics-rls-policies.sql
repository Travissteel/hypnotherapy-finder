-- ============================================
-- FIX ANALYTICS RLS POLICIES (OPTIONAL)
-- ============================================
-- This migration adds basic validation to analytics INSERT policies
-- to address the "RLS Policy Always True" warnings.
--
-- IMPORTANT: The current policies (WITH CHECK true) are intentional
-- to allow anonymous tracking. This fix adds minimal validation while
-- still allowing public tracking.
--
-- Run this in Supabase SQL Editor ONLY if you want stricter validation.

-- Option 1: Keep existing policies (RECOMMENDED for analytics)
-- The current policies are intentional to allow public tracking.
-- You can safely ignore the linter warnings for these analytics tables.
-- No action needed.

-- Option 2: Add basic validation (if you want to address warnings)
-- This adds minimal checks to ensure required fields are provided.

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can track page views" ON page_views;
DROP POLICY IF EXISTS "Anyone can track searches" ON search_queries;
DROP POLICY IF EXISTS "Anyone can track practitioner views" ON practitioner_views;
DROP POLICY IF EXISTS "Anyone can track claim events" ON claim_events;

-- Create new policies with basic validation
-- Page views: require page_path and session_id
CREATE POLICY "Anyone can track page views with valid data"
ON page_views FOR INSERT
WITH CHECK (
  page_path IS NOT NULL AND
  page_path != '' AND
  session_id IS NOT NULL
);

-- Search queries: require query_text and session_id
CREATE POLICY "Anyone can track searches with valid data"
ON search_queries FOR INSERT
WITH CHECK (
  query_text IS NOT NULL AND
  query_text != '' AND
  session_id IS NOT NULL
);

-- Practitioner views: require practitioner_id and session_id
CREATE POLICY "Anyone can track practitioner views with valid data"
ON practitioner_views FOR INSERT
WITH CHECK (
  practitioner_id IS NOT NULL AND
  session_id IS NOT NULL
);

-- Claim events: require all essential fields
CREATE POLICY "Anyone can track claim events with valid data"
ON claim_events FOR INSERT
WITH CHECK (
  practitioner_id IS NOT NULL AND
  user_id IS NOT NULL AND
  event_type IS NOT NULL
);

-- Note: These policies still allow public access but with basic validation
-- to ensure data quality and address linter warnings.
