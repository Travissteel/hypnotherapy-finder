-- ============================================
-- FIX EXTENSION IN PUBLIC SCHEMA
-- ============================================
-- This migration moves the pg_trgm extension from public schema
-- to the extensions schema, which is the recommended best practice.
--
-- Run this in Supabase SQL Editor to fix extension schema warnings

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move pg_trgm extension to extensions schema
-- Note: This requires dropping and recreating the extension
-- The extension must be recreated in the new schema

-- Drop existing extension from public schema
DROP EXTENSION IF EXISTS pg_trgm CASCADE;

-- Create extension in extensions schema
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA extensions;

-- Note: After running this, you may need to recreate the indexes that use pg_trgm
-- The indexes should still work, but if you encounter issues, run:

-- DROP INDEX IF EXISTS idx_practitioners_name_trgm;
-- DROP INDEX IF EXISTS idx_practitioners_city_trgm;
--
-- CREATE INDEX idx_practitioners_name_trgm ON practitioners USING GIN(name extensions.gin_trgm_ops);
-- CREATE INDEX idx_practitioners_city_trgm ON practitioners USING GIN(city extensions.gin_trgm_ops);
