import { getCityBySlug, getPractitionersByCity } from './practitioners';
import type { City } from '@/lib/types/practitioner';
import type { Practitioner } from '@/lib/types/practitioner';

/**
 * Spanish-language surface for the directory.
 *
 * WHY THIS EXISTS
 * Search Console shows a clean, repeatable pattern: where a practitioner page
 * whose business name is Spanish exists, it ranks position 1-12 ("terapia
 * regresiva" 1.0, "hipnosis terapéutica" 2.0, "hipnosis" 2.0). Where only an
 * English location page serves a Spanish query, it ranks 37-48 — the entire
 * Houston cluster ("hipnosis en houston" 45.0, "hipnoterapeuta en houston"
 * 39.6, "servicios de hipnoterapia en houston" 48.7) is currently answered by
 * the English /location/houston page. Spanish queries convert at 3.49% CTR
 * against a 0.51% sitewide baseline, and are 99% US-domestic traffic.
 *
 * WHAT WE MAY AND MAY NOT ASSERT
 * practitioners.json carries a `languages` array, but its distribution
 * (English 1152/1152, then Spanish 352, French 182, German 180, Portuguese
 * 172, Mandarin 172) is a uniform random draw, not observed data — French,
 * German and Mandarin do not occur at ~15% each among US hypnotherapists.
 * That field is enrichment noise. Claiming "speaks Spanish" on a real, named
 * business from it would be fabricating a credential, so this module never
 * touches `languages`.
 *
 * The only defensible claim is that a practice *markets itself* in Spanish,
 * which is self-evident from its own business name. Those are enumerated
 * explicitly below rather than matched by regex, so no listing can be swept
 * in by accident (a practice literally named "salud" is not a Spanish-language
 * practice). Copy must say these practices advertise in Spanish — never that
 * any given practitioner speaks it, or that we verified anything.
 */

/** Practices whose own business name is in Spanish. Verified by inspection. */
export const SPANISH_MARKETING_SLUGS: ReadonlySet<string> = new Set([
  'hipnosis-en-espa-ol-chicago-amaury-chicago-21',
  'hipnosis-conductual-chicago-55',
  'hipnosis-terapeutica-regresiva-en-dallas-dallas-26',
  'hipnosis-terapia-regresiva-dallas-48',
  'hipnosis-terapeutica-regresiva-en-dallas-dallas-50',
  'hipnosis-medica-denver-21',
  'despertar-terapias-holisticas-fort-worth-7',
  'hipnosis-houston-houston-5',
  'hipnocenter-houston-houston-7',
  'hipnoterapia-en-su-clinica-de-hipnosis-los-angeles-54',
  'sanando-el-presente-con-hipnoterapia-los-angeles-59',
]);

export interface SpanishCity {
  /** Shares the English city slug, so /location/<slug> and /es/<slug> pair up for hreflang. */
  slug: string;
  /** City name as written in Spanish copy. */
  nombre: string;
  /** State name in Spanish. */
  estado: string;
  /** Two-letter state code, used in titles. */
  estadoAbbr: string;
  /** Lead paragraph. Describes the directory and the city — asserts nothing about practitioners. */
  intro: string;
}

/**
 * Cities launched in Spanish. Every one has at least one practice that markets
 * in Spanish, so each page has something real to anchor on. Ordered by the
 * strength of the Spanish query demand already visible in Search Console.
 */
export const SPANISH_CITIES: readonly SpanishCity[] = [
  {
    slug: 'houston',
    nombre: 'Houston',
    estado: 'Texas',
    estadoAbbr: 'TX',
    intro:
      'Houston tiene una de las poblaciones hispanohablantes más grandes de Estados Unidos, y varias consultas de hipnoterapia de la ciudad se anuncian directamente en español. En esta página puedes ver los consultorios de hipnoterapia registrados en Houston, empezando por los que se presentan en español, y pasar después al listado completo de la ciudad.',
  },
  {
    slug: 'dallas',
    nombre: 'Dallas',
    estado: 'Texas',
    estadoAbbr: 'TX',
    intro:
      'En Dallas hay varias consultas de hipnoterapia que se anuncian en español, incluidas algunas centradas en terapia regresiva. Abajo aparecen primero esos consultorios y después el listado completo de hipnoterapeutas registrados en la ciudad.',
  },
  {
    slug: 'chicago',
    nombre: 'Chicago',
    estado: 'Illinois',
    estadoAbbr: 'IL',
    intro:
      'Chicago cuenta con consultas de hipnoterapia que se presentan en español en varios puntos de la ciudad. Aquí puedes revisar primero esos consultorios y luego el resto de hipnoterapeutas registrados en Chicago.',
  },
  {
    slug: 'los-angeles',
    nombre: 'Los Ángeles',
    estado: 'California',
    estadoAbbr: 'CA',
    intro:
      'Los Ángeles es la ciudad con más hipnoterapeutas registrados en este directorio, e incluye consultas que se anuncian en español. Empieza por esos consultorios y después revisa el listado completo de la ciudad.',
  },
  {
    slug: 'fort-worth',
    nombre: 'Fort Worth',
    estado: 'Texas',
    estadoAbbr: 'TX',
    intro:
      'Fort Worth es un listado más pequeño que el de Dallas, pero incluye una consulta de terapias holísticas que se anuncia en español. Abajo puedes ver ese consultorio y el resto de hipnoterapeutas registrados en la ciudad.',
  },
  {
    slug: 'denver',
    nombre: 'Denver',
    estado: 'Colorado',
    estadoAbbr: 'CO',
    intro:
      'En Denver hay consultas de hipnoterapia que se presentan en español. Aquí puedes revisarlas primero y después ver el listado completo de hipnoterapeutas registrados en la ciudad.',
  },
];

export function getSpanishCities(): readonly SpanishCity[] {
  return SPANISH_CITIES;
}

export function getSpanishCityBySlug(slug: string): SpanishCity | undefined {
  return SPANISH_CITIES.find(c => c.slug === slug);
}

/** True when the practice's own business name is in Spanish. */
export function marketsInSpanish(slug: string): boolean {
  return SPANISH_MARKETING_SLUGS.has(slug);
}

/**
 * Practitioners in a city, split into those that advertise in Spanish and the
 * rest. Both lists are shown — the second is the same inventory the English
 * page carries, so a Spanish-speaking visitor is never given a shorter
 * directory than an English-speaking one.
 */
export function getSpanishCityPractitioners(citySlug: string): {
  enEspanol: Practitioner[];
  resto: Practitioner[];
  total: number;
} {
  const all = getPractitionersByCity(citySlug);
  const enEspanol = all.filter(p => marketsInSpanish(p.slug));
  const resto = all.filter(p => !marketsInSpanish(p.slug));
  return { enEspanol, resto, total: all.length };
}

/** The English City record paired with a Spanish page, for hreflang and counts. */
export function getPairedCity(slug: string): City | undefined {
  return getCityBySlug(slug);
}
