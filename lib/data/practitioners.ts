import { Practitioner, City } from '../types/practitioner';
import practitionersData from '@/data/practitioners.json';
import citiesData from '@/data/cities.json';

export const practitioners: Practitioner[] = practitionersData as Practitioner[];
export const cities: City[] = citiesData as City[];

export function getAllPractitioners(): Practitioner[] {
  return practitioners;
}

export function getFeaturedPractitioners(): Practitioner[] {
  return practitioners.filter(p => p.featured).slice(0, 6);
}

export function getPractitionerBySlug(slug: string): Practitioner | undefined {
  return practitioners.find(p => p.slug === slug);
}

export function getPractitionersByCity(citySlug: string): Practitioner[] {
  return practitioners.filter(p => p.citySlug === citySlug);
}

export function searchPractitioners(params: {
  city?: string;
  specialties?: string[];
  query?: string;
  sessionType?: string;
  acceptsInsurance?: boolean | null;
  priceRange?: string;
  minExperience?: number;
  certifications?: string[];
  gender?: string;
  languages?: string[];
  acceptingNewClients?: boolean | null;
}): Practitioner[] {
  let results = [...practitioners];

  // City filter
  if (params.city) {
    const cityLower = params.city.toLowerCase();
    results = results.filter(p =>
      p.citySlug === params.city ||
      p.city.toLowerCase().includes(cityLower)
    );
  }

  // Specialties filter
  if (params.specialties && params.specialties.length > 0) {
    results = results.filter(p =>
      params.specialties!.some(specialty =>
        p.specialties.some(ps => ps.toLowerCase().includes(specialty.toLowerCase()))
      )
    );
  }

  // Text query filter
  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.specialties.some(s => s.toLowerCase().includes(q))
    );
  }

  // Session type filter
  if (params.sessionType) {
    results = results.filter(p => p.sessionType === params.sessionType);
  }

  // Insurance filter
  if (params.acceptsInsurance === true) {
    results = results.filter(p => p.acceptsInsurance === true);
  }

  // Price range filter
  if (params.priceRange) {
    results = results.filter(p => p.priceRange === params.priceRange);
  }

  // Minimum experience filter
  if (params.minExperience && params.minExperience > 0) {
    const minExp = params.minExperience;
    results = results.filter(p =>
      p.yearsExperience !== undefined && p.yearsExperience >= minExp
    );
  }

  // Certifications filter
  if (params.certifications && params.certifications.length > 0) {
    results = results.filter(p =>
      p.certifications && params.certifications!.some(cert =>
        p.certifications!.some(pc => pc.toLowerCase().includes(cert.toLowerCase()))
      )
    );
  }

  // Gender filter
  if (params.gender) {
    results = results.filter(p => p.gender === params.gender);
  }

  // Languages filter
  if (params.languages && params.languages.length > 0) {
    results = results.filter(p =>
      p.languages && params.languages!.some(lang =>
        p.languages!.some(pl => pl.toLowerCase() === lang.toLowerCase())
      )
    );
  }

  // Accepting new clients filter
  if (params.acceptingNewClients === true) {
    results = results.filter(p => p.acceptingNewClients === true);
  }

  return results;
}

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllSpecialties(): string[] {
  const specialtiesSet = new Set<string>();
  practitioners.forEach(p => {
    p.specialties.forEach(s => specialtiesSet.add(s));
  });
  return Array.from(specialtiesSet).sort();
}
