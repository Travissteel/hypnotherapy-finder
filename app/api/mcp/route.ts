import { NextRequest, NextResponse } from 'next/server';
import practitionersData from '@/data/practitioners.json';
import citiesData from '@/data/cities.json';

export const runtime = 'nodejs';

const practitioners = practitionersData as Array<Record<string, unknown>>;
const cities = citiesData as Array<Record<string, unknown>>;
const SITE_URL = 'https://hypnotherapy-finder.com';

const tools = [
  { name: 'search_practitioners', description: 'Use this when a user wants directory listings for hypnotherapy practitioners by name, city, or state. Results are directory contact listings only, not medical or mental-health advice. Do not use this tool to diagnose, assess treatment suitability, or claim credentials, availability, pricing, insurance, session format, or specialties.', inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'Practitioner name or place to match.' }, city: { type: 'string', description: 'City to search.' }, state: { type: 'string', description: 'State to search.' }, limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Maximum listings, default 10.' } }, additionalProperties: false } },
  { name: 'get_practitioner_profile', description: 'Use this when a user has a specific Hypnotherapy Finder listing ID or slug and needs directory contact details. Do not use it to make health, credential, or treatment claims.', inputSchema: { type: 'object', properties: { id_or_slug: { type: 'string', description: 'The listing ID or URL slug.' } }, required: ['id_or_slug'], additionalProperties: false } },
  { name: 'browse_location', description: 'Use this when a user wants the cities represented in Hypnotherapy Finder or a directory listing count for a named city. This is a directory browse tool, not clinical advice.', inputSchema: { type: 'object', properties: { city: { type: 'string', description: 'Optional city name or city slug. Omit to list locations.' } }, additionalProperties: false } },
];

const value = (input: unknown) => typeof input === 'string' ? input : '';
const result = (id: unknown, data: unknown) => NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result: data });
const error = (id: unknown, code: number, message: string) => NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });
const content = (data: unknown) => ({ content: [{ type: 'text', text: JSON.stringify({ source: 'Hypnotherapy Finder directory', directory_notice: 'Directory contact information only. Verify details directly with the practitioner. This is not medical, mental-health, or clinical advice.', data }, null, 2) }] });

function publicListing(item: Record<string, unknown>) {
  const slug = value(item.slug);
  return {
    id: value(item.id), name: value(item.name), listing_name: value(item.title), category: value(item.categoryname),
    address: [value(item.street), value(item.city), value(item.state)].filter(Boolean).join(', '), city: value(item.city), state: value(item.state),
    phone: value(item.phone), website: value(item.website), listing_url: slug ? `${SITE_URL}/practitioner/${slug}` : undefined,
  };
}

function matches(item: Record<string, unknown>, query: string) {
  const needle = query.trim().toLowerCase();
  return [item.id, item.slug, item.name, item.title, item.city, item.state].some((field) => value(field).toLowerCase().includes(needle));
}

export async function POST(request: NextRequest) {
  let body: { id?: unknown; method?: string; params?: { name?: unknown; arguments?: unknown } };
  try { body = await request.json(); } catch { return error(null, -32700, 'Invalid JSON-RPC request.'); }
  if (body.method === 'initialize') return result(body.id, { protocolVersion: '2025-03-26', capabilities: { tools: {} }, serverInfo: { name: 'hypnotherapy-finder', version: '1.0.0' } });
  if (body.method === 'notifications/initialized') return new NextResponse(null, { status: 202 });
  if (body.method === 'ping') return result(body.id, {});
  if (body.method === 'tools/list') return result(body.id, { tools });
  if (body.method !== 'tools/call') return error(body.id, -32601, 'Method not found.');
  if (typeof body.params?.name !== 'string' || (body.params.arguments !== undefined && (typeof body.params.arguments !== 'object' || Array.isArray(body.params.arguments)))) return error(body.id, -32602, 'Invalid tool arguments.');
  const args = (body.params.arguments ?? {}) as Record<string, unknown>;

  if (body.params.name === 'search_practitioners') {
    const query = value(args.query), city = value(args.city).toLowerCase(), state = value(args.state).toLowerCase();
    const limit = typeof args.limit === 'number' ? Math.max(1, Math.min(20, Math.floor(args.limit))) : 10;
    return result(body.id, content({ results: practitioners.filter((item) => (!query || matches(item, query)) && (!city || value(item.city).toLowerCase().includes(city)) && (!state || value(item.state).toLowerCase().includes(state))).slice(0, limit).map(publicListing) }));
  }
  if (body.params.name === 'get_practitioner_profile') {
    const id = value(args.id_or_slug).toLowerCase();
    if (!id) return error(body.id, -32602, 'id_or_slug is required.');
    const practitioner = practitioners.find((item) => [item.id, item.slug].some((field) => value(field).toLowerCase() === id));
    return result(body.id, content(practitioner ? { practitioner: publicListing(practitioner) } : { error: 'Listing not found.' }));
  }
  if (body.params.name === 'browse_location') {
    const requested = value(args.city).toLowerCase();
    if (!requested) return result(body.id, content({ locations: cities.map((city) => ({ name: value(city.name), slug: value(city.slug), state: value(city.state), listing_count: typeof city.practitionerCount === 'number' ? city.practitionerCount : undefined })) }));
    const location = cities.find((city) => [city.name, city.slug].some((field) => value(field).toLowerCase() === requested));
    return result(body.id, content(location ? { location: { name: value(location.name), state: value(location.state), listing_count: typeof location.practitionerCount === 'number' ? location.practitionerCount : undefined, location_url: `${SITE_URL}/location/${value(location.slug)}` } } : { error: 'Location not found.' }));
  }
  return error(body.id, -32601, 'Unknown tool.');
}
