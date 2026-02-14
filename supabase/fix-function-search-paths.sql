-- ============================================
-- FIX FUNCTION SEARCH PATH WARNINGS
-- ============================================
-- This migration adds explicit search_path settings to all functions
-- to prevent potential SQL injection attacks via search_path manipulation.
--
-- Run this in Supabase SQL Editor to fix function search path warnings

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'practitioner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog;

-- Fix handle_claim_approval function
CREATE OR REPLACE FUNCTION public.handle_claim_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Update practitioner
    UPDATE practitioners
    SET
      claim_status = 'claimed',
      claimed_by = NEW.user_id,
      claim_date = NOW(),
      verified = true,
      verification_date = NOW()
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

-- Fix generate_slug function
CREATE OR REPLACE FUNCTION generate_slug(name TEXT, city TEXT, state TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug
  base_slug := lower(regexp_replace(name || '-' || city || '-' || state, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;

  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM practitioners WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix track_page_view function
CREATE OR REPLACE FUNCTION track_page_view(
  p_page_path TEXT,
  p_page_title TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_view_id UUID;
BEGIN
  INSERT INTO page_views (
    page_path,
    page_title,
    referrer,
    user_id,
    session_id,
    ip_address,
    user_agent
  )
  VALUES (
    p_page_path,
    p_page_title,
    p_referrer,
    p_user_id,
    p_session_id,
    p_ip_address,
    p_user_agent
  )
  RETURNING id INTO v_view_id;

  RETURN v_view_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix track_search_query function
CREATE OR REPLACE FUNCTION track_search_query(
  p_query_text TEXT,
  p_filters JSONB DEFAULT NULL,
  p_results_count INTEGER DEFAULT 0,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_search_id UUID;
BEGIN
  INSERT INTO search_queries (
    query_text,
    filters,
    results_count,
    user_id,
    session_id,
    ip_address
  )
  VALUES (
    p_query_text,
    p_filters,
    p_results_count,
    p_user_id,
    p_session_id,
    p_ip_address
  )
  RETURNING id INTO v_search_id;

  RETURN v_search_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix track_practitioner_view function
CREATE OR REPLACE FUNCTION track_practitioner_view(
  p_practitioner_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'direct',
  p_referrer TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_view_id UUID;
BEGIN
  INSERT INTO practitioner_views (
    practitioner_id,
    user_id,
    session_id,
    ip_address,
    source,
    referrer
  )
  VALUES (
    p_practitioner_id,
    p_user_id,
    p_session_id,
    p_ip_address,
    p_source,
    p_referrer
  )
  RETURNING id INTO v_view_id;

  RETURN v_view_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix search_practitioners_fuzzy function
CREATE OR REPLACE FUNCTION search_practitioners_fuzzy(
  search_name TEXT DEFAULT NULL,
  search_city TEXT DEFAULT NULL,
  search_state TEXT DEFAULT NULL,
  search_specialty TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0,
  unclaimed_only BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  credentials TEXT[],
  specialties TEXT[],
  bio TEXT,
  years_experience INTEGER,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  session_types TEXT[],
  insurance_accepted TEXT[],
  price_range TEXT,
  consultation_free BOOLEAN,
  languages TEXT[],
  certifications TEXT[],
  memberships TEXT[],
  rating DECIMAL,
  review_count INTEGER,
  claim_status TEXT,
  claimed_by UUID,
  claim_date TIMESTAMP WITH TIME ZONE,
  verified BOOLEAN,
  verification_date TIMESTAMP WITH TIME ZONE,
  profile_photo_url TEXT,
  profile_completeness INTEGER,
  featured BOOLEAN,
  slug TEXT,
  meta_description TEXT,
  data_source TEXT,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  similarity_score REAL
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.*,
    -- Calculate similarity score based on name match
    GREATEST(
      SIMILARITY(p.name, COALESCE(search_name, '')),
      SIMILARITY(p.city, COALESCE(search_city, '')),
      SIMILARITY(p.state, COALESCE(search_state, ''))
    ) as similarity_score
  FROM practitioners p
  WHERE
    -- Filter by claim status if needed
    (unclaimed_only = FALSE OR p.claim_status = 'unclaimed')
    AND
    -- Name fuzzy match (trigram similarity > 0.2)
    (search_name IS NULL OR SIMILARITY(p.name, search_name) > 0.2)
    AND
    -- City exact or fuzzy match
    (search_city IS NULL OR p.city ILIKE '%' || search_city || '%' OR SIMILARITY(p.city, search_city) > 0.4)
    AND
    -- State exact match (abbreviations)
    (search_state IS NULL OR p.state ILIKE '%' || search_state || '%')
    AND
    -- Specialty array contains
    (search_specialty IS NULL OR search_specialty = ANY(p.specialties))
  ORDER BY
    -- Prioritize higher similarity scores
    similarity_score DESC,
    -- Then alphabetical
    p.name ASC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Fix search_practitioners_fulltext function
CREATE OR REPLACE FUNCTION search_practitioners_fulltext(
  search_query TEXT,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  credentials TEXT[],
  specialties TEXT[],
  bio TEXT,
  years_experience INTEGER,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  session_types TEXT[],
  insurance_accepted TEXT[],
  price_range TEXT,
  consultation_free BOOLEAN,
  languages TEXT[],
  certifications TEXT[],
  memberships TEXT[],
  rating DECIMAL,
  review_count INTEGER,
  claim_status TEXT,
  claimed_by UUID,
  claim_date TIMESTAMP WITH TIME ZONE,
  verified BOOLEAN,
  verification_date TIMESTAMP WITH TIME ZONE,
  profile_photo_url TEXT,
  profile_completeness INTEGER,
  featured BOOLEAN,
  slug TEXT,
  meta_description TEXT,
  data_source TEXT,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  rank_score REAL
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.*,
    -- Calculate rank based on multiple fields
    ts_rank(
      to_tsvector('english',
        COALESCE(p.name, '') || ' ' ||
        COALESCE(p.bio, '') || ' ' ||
        COALESCE(p.city, '') || ' ' ||
        COALESCE(p.state, '') || ' ' ||
        COALESCE(array_to_string(p.specialties, ' '), '') || ' ' ||
        COALESCE(array_to_string(p.credentials, ' '), '')
      ),
      plainto_tsquery('english', search_query)
    ) as rank_score
  FROM practitioners p
  WHERE
    to_tsvector('english',
      COALESCE(p.name, '') || ' ' ||
      COALESCE(p.bio, '') || ' ' ||
      COALESCE(p.city, '') || ' ' ||
      COALESCE(p.state, '') || ' ' ||
      COALESCE(array_to_string(p.specialties, ' '), '') || ' ' ||
      COALESCE(array_to_string(p.credentials, ' '), '')
    ) @@ plainto_tsquery('english', search_query)
  ORDER BY rank_score DESC, p.name ASC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;
