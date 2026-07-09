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

      // ============================================
      // Phobia test keyword variants
      // ============================================
      {
        source: '/phobia-quiz',
        destination: '/phobia-test',
        permanent: true,
      },
      {
        source: '/do-i-have-a-phobia-test',
        destination: '/phobia-test',
        permanent: true,
      },

      // ============================================
      // Thalassophobia test keyword variants
      // ============================================
      {
        source: '/thalassophobia-quiz',
        destination: '/thalassophobia-test',
        permanent: true,
      },
      {
        source: '/fear-of-deep-water-test',
        destination: '/thalassophobia-test',
        permanent: true,
      },

      // ============================================
      // Burnout keyword variants
      // ============================================
      {
        source: '/burnout-test',
        destination: '/burnout-quiz',
        permanent: true,
      },
      {
        source: '/am-i-burned-out',
        destination: '/burnout-quiz',
        permanent: true,
      },

      // ============================================
      // Specific phobia redirects
      // ============================================
      {
        source: '/acrophobia-test',
        destination: '/phobia-test',
        permanent: true,
      },
      {
        source: '/agoraphobia-quiz',
        destination: '/agoraphobia-test',
        permanent: true,
      },
      {
        source: '/claustrophobia-quiz',
        destination: '/claustrophobia-test',
        permanent: true,
      },
      {
        source: '/emetophobia-quiz',
        destination: '/emetophobia-test',
        permanent: true,
      },

      // ============================================
      // Insomnia test keyword variants
      // ============================================
      {
        source: '/insomnia-quiz',
        destination: '/insomnia-test',
        permanent: true,
      },
      {
        source: '/do-i-have-insomnia-quiz',
        destination: '/insomnia-test',
        permanent: true,
      },

      // ============================================
      // Anger test keyword variants
      // ============================================
      {
        source: '/anger-issues-test',
        destination: '/anger-test',
        permanent: true,
      },
      {
        source: '/anger-issues-quiz',
        destination: '/anger-test',
        permanent: true,
      },
      {
        source: '/multidimensional-anger-test',
        destination: '/anger-test',
        permanent: true,
      },
      {
        source: '/anger-quiz',
        destination: '/anger-test',
        permanent: true,
      },

      // ============================================
      // People pleaser quiz keyword variants
      // ============================================
      {
        source: '/people-pleaser-test',
        destination: '/people-pleaser-quiz',
        permanent: true,
      },

      // ============================================
      // Self-esteem test keyword variants
      // ============================================
      {
        source: '/self-esteem-quiz',
        destination: '/self-esteem-test',
        permanent: true,
      },
      {
        source: '/low-self-esteem-test',
        destination: '/self-esteem-test',
        permanent: true,
      },

      // ============================================
      // Codependency quiz keyword variants
      // ============================================
      {
        source: '/codependency-test',
        destination: '/codependency-quiz',
        permanent: true,
      },
      {
        source: '/am-i-codependent-quiz',
        destination: '/codependency-quiz',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insight.com https://analytics.ahrefs.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://hypnotherapy-finder.com https://*.supabase.co https://d8j0ntlcm91z4.cloudfront.net",
              "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://vitals.vercel-insight.com https://analytics.ahrefs.com",
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
