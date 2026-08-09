/**
 * Generates the fallback description shown on unclaimed practitioner profiles.
 *
 * Why this exists: the previous fallback was a single hardcoded paragraph
 * written in the practitioner's FIRST PERSON ("Welcome. I'm {name}, a certified
 * hypnotherapist...") and rendered byte-identical on all ~1,150 unclaimed
 * profiles. Two problems: it put words and an unverified credential claim in a
 * real, named person's mouth, and duplicate boilerplate at that scale is the
 * classic scaled-content signal.
 *
 * Rules for anything added here:
 *   1. Third person only. Never write as the practitioner.
 *   2. Only state what is in the source listing (business name, locality,
 *      listed category, whether a phone/website is on file). Do NOT assert
 *      credentials, certifications, years of experience, pricing, insurance
 *      acceptance, or availability — those fields are not verified.
 *   3. Vary per record, deterministically, so profiles are not duplicates.
 */

interface BioSource {
  name?: string;
  title?: string;
  city?: string;
  state?: string;
  categoryname?: string;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  street?: string | null;
}

/** Stable hash of the slug so a profile's phrasing never changes between builds. */
function seedFrom(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(options: T[], seed: number, salt: number): T {
  return options[(seed + salt * 2654435761) % options.length];
}

/** Normalises the Maps category into a readable noun phrase. */
function servicePhrase(categoryname?: string): string {
  const c = (categoryname || '').toLowerCase();
  if (c.includes('hypnotherapy') || c.includes('hypnotist') || c.includes('hypnosis')) {
    return 'hypnotherapy';
  }
  if (c.includes('counsel') || c.includes('therapist')) return 'therapy and counselling';
  if (c.includes('coach')) return 'coaching';
  return 'hypnotherapy';
}

export function buildFallbackBio(p: BioSource, slug: string): string[] {
  const seed = seedFrom(slug);
  const business = (p.title && p.title.trim()) || (p.name && p.name.trim()) || 'This practice';
  const person = (p.name && p.name.trim()) || business;
  const city = p.city?.trim();
  const state = p.state?.trim();
  const service = servicePhrase(p.categoryname);

  const place = city && state ? `${city}, ${state}` : city || state || null;

  // --- Sentence 1: who and where (varied openers) ---
  const openers = place
    ? [
        `${business} is a ${service} practice listed in ${place}.`,
        `${business} offers ${service} services in ${place}.`,
        `Based in ${place}, ${business} is listed as a ${service} provider.`,
        `${business} appears in our directory as a ${service} practice serving ${place}.`,
        `${business} is a ${service} provider operating in ${place}.`,
      ]
    : [
        `${business} is listed in our directory as a ${service} practice.`,
        `${business} offers ${service} services.`,
        `${business} appears in our directory as a ${service} provider.`,
      ];
  const opener = pick(openers, seed, 1);

  // --- Sentence 2: what contact detail is actually on file ---
  const hasSite = Boolean(p.website && String(p.website).trim());
  const hasPhone = Boolean(p.phone && String(p.phone).trim());
  const hasAddress = Boolean((p.address || p.street || '').toString().trim());

  let contact: string;
  if (hasSite && hasPhone) {
    contact = pick(
      [
        `Contact details and a practice website are listed below.`,
        `A phone number and website for the practice are shown below.`,
        `You can reach the practice using the phone number or website listed below.`,
      ],
      seed,
      2
    );
  } else if (hasPhone) {
    contact = pick(
      [
        `A contact number for the practice is listed below.`,
        `Phone details for the practice are shown below.`,
      ],
      seed,
      3
    );
  } else if (hasSite) {
    contact = pick(
      [
        `A website for the practice is listed below.`,
        `You can find the practice website linked below.`,
      ],
      seed,
      4
    );
  } else if (hasAddress) {
    contact = `A practice address is listed below.`;
  } else {
    contact = `Limited contact information is currently on file for this listing.`;
  }

  // --- Sentence 3: honest provenance + claim prompt ---
  const claim = pick(
    [
      `This profile was compiled from public business listings and has not yet been claimed. If you are ${person}, you can claim this listing to add your background, approach, qualifications and availability.`,
      `Details here come from public business listings and have not been confirmed by the practitioner. If this is your practice, claim the listing to add your own description, training and session information.`,
      `This is an unclaimed profile built from publicly available listing data. If you are ${person}, claiming it lets you add your qualifications, specialisms and current availability.`,
      `We built this profile from public directory data and it has not been verified by the practice. If this is your listing, claim it to add your background, approach and availability.`,
    ],
    seed,
    5
  );

  return [`${opener} ${contact}`, claim];
}
