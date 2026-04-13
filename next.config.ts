import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable trailing slashes for consistent URLs (SEO best practice)
  // This ensures /about and /about/ are not treated as different pages
  trailingSlash: false,

  // Redirect ghost/old URLs to correct pages
  // NOTE: With trailingSlash: false, Next.js handles trailing slash redirects automatically
  // Do NOT add duplicate redirects for trailing slash versions - this creates redirect chains
  async redirects() {
    return [
      // ============================================
      // Legacy WordPress category URLs
      // ============================================
      {
        source: '/category/:slug*',
        destination: '/search',
        permanent: true,
      },

      // ============================================
      // Legacy WordPress wpbdp_category URLs
      // ============================================
      {
        source: '/all-practitioners/wpbdp_category/:slug*',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/all-practitioners/:path*',
        destination: '/search',
        permanent: true,
      },

      // ============================================
      // Legacy specialty/certification URLs
      // ============================================
      {
        source: '/specialty/:slug*',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/certification/:slug*',
        destination: '/search',
        permanent: true,
      },

      // ============================================
      // Legacy practitioner URLs (old WordPress format)
      // ============================================
      {
        source: '/practitioner/dr-jane-smith',
        destination: '/search',
        permanent: true,
      },
      // Old practitioner slugs with city suffixes (from 404 report)
      {
        source: '/practitioner/technologies-of-the-self-victoria-bresee-denver-35',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/practitioner/hypnosis-network-fort-worth-3',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/practitioner/victoria-lee-denver-33',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/practitioner/john-bentz-master-hypnotherapist-houston-20',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/practitioner/you-austin-1',
        destination: '/search',
        permanent: true,
      },

      // ============================================
      // Malformed location URLs
      // ============================================
      // URL-encoded specialty text mistakenly used as location
      {
        source: '/location/Anxiety%20%7C%20Habits%20%7C%20Emotional%20Blockages',
        destination: '/hypnotherapy-for-anxiety',
        permanent: true,
      },

      // ============================================
      // Catch-all for malformed URLs with .com domains
      // These handle all the .com URLs in both practitioner and location paths
      // ============================================
      {
        source: '/practitioner/:slug*.com',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/location/:slug*.com',
        destination: '/locations',
        permanent: true,
      },

      // ============================================
      // Old city URL formats (city-state pattern)
      // ============================================
      {
        source: '/fort-worth-tx-2',
        destination: '/location/fort-worth',
        permanent: true,
      },
      {
        source: '/philadelphia-pa',
        destination: '/location/philadelphia',
        permanent: true,
      },
      {
        source: '/phoenix-az',
        destination: '/location/phoenix',
        permanent: true,
      },
      {
        source: '/austin-tx',
        destination: '/location/austin',
        permanent: true,
      },
      {
        source: '/jacksonville-fl-2',
        destination: '/locations',
        permanent: true,
      },

      // ============================================
      // Other legacy page redirects
      // ============================================
      {
        source: '/how-it-works-2',
        destination: '/how-it-works',
        permanent: true,
      },

      // /location/ (bare) to /locations
      {
        source: '/location',
        destination: '/locations',
        permanent: true,
      },

      // /register to practitioner signup
      {
        source: '/register',
        destination: '/practitioner-signup',
        permanent: true,
      },

      // ============================================
      // Stress quiz/test keyword variants
      // ============================================
      {
        source: '/stress-quiz',
        destination: '/stress-level-calculator',
        permanent: true,
      },
      {
        source: '/stress-test',
        destination: '/stress-level-calculator',
        permanent: true,
      },
      {
        source: '/how-stressed-am-i',
        destination: '/stress-level-calculator',
        permanent: true,
      },

      // ============================================
      // PTSD quiz keyword variants
      // ============================================
      {
        source: '/do-i-have-ptsd-quiz',
        destination: '/ptsd-quiz',
        permanent: true,
      },
      {
        source: '/complex-ptsd-quiz',
        destination: '/ptsd-quiz',
        permanent: true,
      },
      {
        source: '/ptsd-test',
        destination: '/ptsd-quiz',
        permanent: true,
      },

      // ============================================
      // Anxiety quiz keyword variants
      // ============================================
      {
        source: '/anxiety-test',
        destination: '/anxiety-quiz',
        permanent: true,
      },
      {
        source: '/do-i-have-anxiety-quiz',
        destination: '/anxiety-quiz',
        permanent: true,
      },

      // ============================================
      // Social anxiety test keyword variants
      // ============================================
      {
        source: '/social-anxiety-quiz',
        destination: '/social-anxiety-test',
        permanent: true,
      },
      {
        source: '/social-anxiety-disorder-test',
        destination: '/social-anxiety-test',
        permanent: true,
      },

      // ============================================
      // OCD test keyword variants
      // ============================================
      {
        source: '/do-i-have-ocd-quiz',
        destination: '/ocd-test',
        permanent: true,
      },
      {
        source: '/ocd-quiz',
        destination: '/ocd-test',
        permanent: true,
      },
      {
        source: '/do-i-have-ocd-test',
        destination: '/ocd-test',
        permanent: true,
      },

      // Homepage with specialty param -> search page with specialty param
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'specialty',
            value: '(?<specialty>.*)',
          },
        ],
        destination: '/search?specialty=:specialty',
        permanent: true,
      },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insight.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://hypnotherapy-finder.com https://*.supabase.co",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://vitals.vercel-insight.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
