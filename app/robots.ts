import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/dashboard/',
        '/login',
        '/claim-listing',
        '/profile/',
        '/auth/',
      ],
    },
    sitemap: 'https://hypnotherapy-finder.com/sitemap.xml',
    host: 'https://hypnotherapy-finder.com',
  };
}
