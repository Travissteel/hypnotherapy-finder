-- Run in the Supabase SQL editor for the hypnotherapydirectory project.
-- Adds visibility into badge embed installs (see app/api/badge/[slug]/route.ts,
-- which now logs each render as a practitioner_views row with
-- source='badge_embed').

-- Badge embed hits are not profile page views, so exclude them from the
-- existing "most viewed" aggregate to keep that metric meaning what it says.
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
WHERE pv.source IS DISTINCT FROM 'badge_embed'
GROUP BY pv.practitioner_id, p.name, p.city, p.state
ORDER BY view_count DESC;

-- One row per badge-eligible (verified + claimed) practitioner, with a
-- LEFT JOIN so practitioners who have never had a badge hit still show up
-- with embed_hits = 0 — that's how you tell "not installed" from "installed".
CREATE OR REPLACE VIEW badge_installs
WITH (security_invoker=true) AS
SELECT
  p.id AS practitioner_id,
  p.name,
  p.slug,
  p.city,
  p.state,
  COUNT(pv.id) AS embed_hits,
  COUNT(DISTINCT pv.referrer) FILTER (WHERE pv.referrer IS NOT NULL) AS distinct_referrers,
  MIN(pv.viewed_at) AS first_seen,
  MAX(pv.viewed_at) AS last_seen
FROM practitioners p
LEFT JOIN practitioner_views pv
  ON pv.practitioner_id = p.id AND pv.source = 'badge_embed'
WHERE p.verified = true AND p.claim_status = 'claimed'
GROUP BY p.id, p.name, p.slug, p.city, p.state
ORDER BY last_seen DESC NULLS LAST;
