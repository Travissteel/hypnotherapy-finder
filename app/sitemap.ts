import { MetadataRoute } from 'next';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';
import { getAllPosts } from '@/lib/blog';

// Slugs that have permanent redirects in next.config.ts — exclude from sitemap
const REDIRECTED_PRACTITIONER_SLUGS = new Set([
  'you-austin-1',
  'victoria-lee-denver-33',
  'technologies-of-the-self-victoria-bresee-denver-35',
  'hypnosis-network-fort-worth-3',
  'john-bentz-master-hypnotherapist-houston-20',
  'dr-jane-smith',
]);

// Slugs removed at practitioner request (410 Gone in middleware) — exclude from sitemap
const REMOVED_PRACTITIONER_SLUGS = new Set([
  'jq-new-york-67',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hypnotherapy-finder.com';

  const practitioners = getAllPractitioners();
  const cities = getAllCities();
  const blogPosts = getAllPosts();

  // Homepage and static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/weight-loss-hypnotherapy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-hypnotherapy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-near-me`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/find-a-hypnotherapist`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quit-smoking-hypnotherapy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-for-anxiety`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/does-hypnotherapy-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hypnotherapy-cost`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/practitioner-signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Quiz & test pages (keyword-targeted tools)
    // Compare pages
    { url: `${baseUrl}/compare/hypnotherapy-finder-vs-psychology-today`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    // Quiz & test pages (keyword-targeted tools)
    { url: `${baseUrl}/free-quizzes`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/anxiety-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/social-anxiety-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ptsd-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/stress-level-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ocd-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/burnout-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/caregiver-burnout-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/people-pleaser-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/anger-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/codependency-quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/insomnia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/self-esteem-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/phobia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/agoraphobia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/claustrophobia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/emetophobia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/thalassophobia-test`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Location pages
  const locationPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/location/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Practitioner pages (exclude redirected and removed slugs)
  const practitionerPages: MetadataRoute.Sitemap = practitioners
    .filter((p) => p.slug && !REDIRECTED_PRACTITIONER_SLUGS.has(p.slug) && !REMOVED_PRACTITIONER_SLUGS.has(p.slug))
    .map((practitioner) => ({
      url: `${baseUrl}/practitioner/${practitioner.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...locationPages, ...practitionerPages, ...blogPages];
}
