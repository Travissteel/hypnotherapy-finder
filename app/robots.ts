import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/dashboard',
        '/dashboard/',
        '/login',
        '/login/',
        '/claim-listing',
        '/claim-listing/',
        '/profile/',
        '/auth/',
      ],
    },
    sitemap: 'https://hypnotherapy-finder.com/sitemap.xml',
  };
}
