const BASE_URL = 'https://hypnotherapy-finder.com';

// Next.js does not auto-generate an index for generateSitemaps() in app/sitemap.ts,
// so this index is served at /sitemap-index.xml (Next reserves /sitemap.xml for app/sitemap.ts). Keep these ids in sync with generateSitemaps().
const SITEMAP_IDS = [0, 1, 2];

// Matches SITE_LAST_UPDATED in app/sitemap.ts
const LAST_MODIFIED = '2026-07-31';

export async function GET() {
  const entries = SITEMAP_IDS.map(
    (id) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${id}.xml</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
