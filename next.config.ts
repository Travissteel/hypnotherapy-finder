import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect ghost/old URLs to correct pages
  async redirects() {
    return [
      {
        source: '/how-it-works-2',
        destination: '/how-it-works',
        permanent: true, // 301 redirect
      },
      {
        source: '/how-it-works-2/',
        destination: '/how-it-works',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
