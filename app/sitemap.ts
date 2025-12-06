import { MetadataRoute } from 'next';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hypnotherapy-finder.com';

  const practitioners = getAllPractitioners();
  const cities = getAllCities();

  // Homepage and static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Location pages
  const locationPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/location/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Practitioner pages
  const practitionerPages: MetadataRoute.Sitemap = practitioners.map((practitioner) => ({
    url: `${baseUrl}/practitioner/${practitioner.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...locationPages, ...practitionerPages];
}
