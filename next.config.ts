import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect ghost/old URLs to correct pages
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
      // Redirect to search since old practitioners may not exist
      // ============================================
      {
        source: '/practitioner/dr-jane-smith',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/practitioner/dr-jane-smith/',
        destination: '/search',
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
        source: '/fort-worth-tx-2/',
        destination: '/location/fort-worth',
        permanent: true,
      },
      {
        source: '/philadelphia-pa',
        destination: '/location/philadelphia',
        permanent: true,
      },
      {
        source: '/philadelphia-pa/',
        destination: '/location/philadelphia',
        permanent: true,
      },
      {
        source: '/phoenix-az',
        destination: '/location/phoenix',
        permanent: true,
      },
      {
        source: '/phoenix-az/',
        destination: '/location/phoenix',
        permanent: true,
      },
      {
        source: '/austin-tx',
        destination: '/location/austin',
        permanent: true,
      },
      {
        source: '/austin-tx/',
        destination: '/location/austin',
        permanent: true,
      },
      {
        source: '/jacksonville-fl-2',
        destination: '/location/jacksonville',
        permanent: true,
      },
      {
        source: '/jacksonville-fl-2/',
        destination: '/location/jacksonville',
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
      {
        source: '/how-it-works-2/',
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
      {
        source: '/register/',
        destination: '/practitioner-signup',
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
