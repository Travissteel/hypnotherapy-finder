import { MetadataRoute } from 'next';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';
import { getAllPosts } from '@/lib/blog';

// Slugs that have permanent redirects in next.config.ts — exclude from sitemap
const REDIRECTED_PRACTITIONER_SLUGS = new Set([
  'dr-jane-smith',
]);

// Stable content-update stamp for pages without per-page tracking. Bump when
// site content meaningfully changes; emitting new Date() on every build tells
// crawlers everything changed daily, which erodes trust in lastmod entirely.
const SITE_LAST_UPDATED = new Date('2026-07-20');

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
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/weight-loss-hypnotherapy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-hypnotherapy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-near-me`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/find-a-hypnotherapist`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quit-smoking-hypnotherapy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-for-anxiety`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-hypnotherapy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-for-sleep`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-for-depression`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hypnotherapy-for-phobias`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/does-hypnotherapy-work`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hypnotherapy-cost`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/practitioner-signup`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Quiz & test pages (keyword-targeted tools)
    // Compare pages
    { url: `${baseUrl}/compare/hypnotherapy-finder-vs-psychology-today`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    // Quiz & test pages (keyword-targeted tools)
    { url: `${baseUrl}/free-quizzes`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/anxiety-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/social-anxiety-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ptsd-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/stress-level-calculator`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ocd-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/burnout-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/caregiver-burnout-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/people-pleaser-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/anger-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/codependency-quiz`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/insomnia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/self-esteem-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/phobia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/agoraphobia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/claustrophobia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/emetophobia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/thalassophobia-test`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Location pages
  const locationPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/location/${city.slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Practitioner pages (exclude redirected and removed slugs)
  const practitionerPages: MetadataRoute.Sitemap = practitioners
    .filter((p) => p.slug && !REDIRECTED_PRACTITIONER_SLUGS.has(p.slug) && !REMOVED_PRACTITIONER_SLUGS.has(p.slug))
    .map((practitioner) => ({
      url: `${baseUrl}/practitioner/${practitioner.slug}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_LAST_UPDATED,
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
