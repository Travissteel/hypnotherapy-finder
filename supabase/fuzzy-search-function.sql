-- ============================================
-- FUZZY SEARCH FUNCTION
-- ============================================
-- This function uses PostgreSQL's pg_trgm extension for fuzzy text matching
-- Run this in Supabase SQL Editor after the main schema

-- Create fuzzy search function for practitioners
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
$$ LANGUAGE plpgsql;

-- Create index for faster trigram searches (if not already created)
CREATE INDEX IF NOT EXISTS idx_practitioners_name_trgm
ON practitioners USING GIN(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_practitioners_city_trgm
ON practitioners USING GIN(city gin_trgm_ops);

-- Create full-text search function for more complex queries
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
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT * FROM search_practitioners_fuzzy('John Smyth', 'Los Angles', 'California', NULL, 20, 0, FALSE);
-- SELECT * FROM search_practitioners_fulltext('hypnotherapy anxiety Los Angeles', 20, 0);
