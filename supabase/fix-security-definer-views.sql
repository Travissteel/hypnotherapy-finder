-- ============================================
-- FIX SECURITY DEFINER VIEWS
-- ============================================
-- This migration fixes the security vulnerability where views were
-- using SECURITY DEFINER, which bypasses RLS policies.
-- All views are recreated with SECURITY INVOKER to respect RLS.
--
-- Run this in Supabase SQL Editor to fix security linter warnings

-- Fix top_searches view
CREATE OR REPLACE VIEW top_searches
WITH (security_invoker=true) AS
SELECT
  query_text,
  COUNT(*) as search_count,
  AVG(results_count) as avg_results,
  SUM(CASE WHEN result_clicked THEN 1 ELSE 0 END) as clicks,
  ROUND(SUM(CASE WHEN result_clicked THEN 1 ELSE 0 END)::numeric / COUNT(*)::numeric * 100, 2) as click_through_rate
FROM search_queries
GROUP BY query_text
ORDER BY search_count DESC;

-- Fix daily_page_views view
CREATE OR REPLACE VIEW daily_page_views
WITH (security_invoker=true) AS
SELECT
  DATE(viewed_at) as date,
  COUNT(*) as total_views,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM page_views
GROUP BY DATE(viewed_at)
ORDER BY date DESC;

-- Fix most_viewed_practitioners view
CREATE OR REPLACE VIEW most_viewed_practitioners
WITH (security_invoker=true) AS
SELECT
  pv.practitioner_id,
  p.name,
  p.city,
  p.state,
  COUNT(*) as view_count,
  COUNT(DISTINCT pv.user_id) as unique_viewers,
  SUM(CASE WHEN pv.clicked_phone THEN 1 ELSE 0 END) as phone_clicks,
  SUM(CASE WHEN pv.clicked_email THEN 1 ELSE 0 END) as email_clicks,
  SUM(CASE WHEN pv.clicked_website THEN 1 ELSE 0 END) as website_clicks
FROM practitioner_views pv
JOIN practitioners p ON pv.practitioner_id = p.id
GROUP BY pv.practitioner_id, p.name, p.city, p.state
ORDER BY view_count DESC;

-- Fix practitioner_stats view
CREATE OR REPLACE VIEW practitioner_stats
WITH (security_invoker=true) AS
SELECT
  p.id,
  p.name,
  p.claim_status,
  p.review_count,
  p.rating,
  COUNT(DISTINCT c.id) as total_claims,
  COUNT(DISTINCT c.id) FILTER (WHERE c.status = 'pending') as pending_claims
FROM practitioners p
LEFT JOIN claims c ON p.id = c.practitioner_id
GROUP BY p.id, p.name, p.claim_status, p.review_count, p.rating;

-- Fix pending_claims_view
CREATE OR REPLACE VIEW pending_claims_view
WITH (security_invoker=true) AS
SELECT
  c.*,
  p.name as practitioner_name,
  p.email as practitioner_email,
  p.city,
  p.state,
  up.full_name as claimant_name,
  up.phone as claimant_phone
FROM claims c
JOIN practitioners p ON c.practitioner_id = p.id
JOIN user_profiles up ON c.user_id = up.id
WHERE c.status = 'pending'
ORDER BY c.created_at ASC;

-- Fix claim_funnel view
CREATE OR REPLACE VIEW claim_funnel
WITH (security_invoker=true) AS
SELECT
  DATE(created_at) as date,
  COUNT(*) FILTER (WHERE event_type = 'created') as claims_created,
  COUNT(*) FILTER (WHERE event_type = 'approved') as claims_approved,
  COUNT(*) FILTER (WHERE event_type = 'rejected') as claims_rejected,
  ROUND(
    COUNT(*) FILTER (WHERE event_type = 'approved')::numeric /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'created'), 0)::numeric * 100,
    2
  ) as approval_rate
FROM claim_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Fix popular_pages view
CREATE OR REPLACE VIEW popular_pages
WITH (security_invoker=true) AS
SELECT
  page_path,
  COUNT(*) as view_count,
  COUNT(DISTINCT user_id) as unique_viewers,
  COUNT(DISTINCT session_id) as unique_sessions
FROM page_views
GROUP BY page_path
ORDER BY view_count DESC;
