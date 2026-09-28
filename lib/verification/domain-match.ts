export function normalizeHostname(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withProtocol).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

/**
 * True if two URLs/domains resolve to the same hostname (ignoring
 * protocol, "www.", path, and case). Used to check whether a pixel/badge
 * embed's Referer header actually came from the practitioner's own
 * submitted business website.
 */
export function hostnamesMatch(a?: string | null, b?: string | null): boolean {
  const ha = normalizeHostname(a);
  const hb = normalizeHostname(b);
  return !!ha && !!hb && ha === hb;
}
