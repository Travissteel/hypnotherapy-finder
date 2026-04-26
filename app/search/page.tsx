'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { Practitioner } from '@/lib/types/practitioner';
import {
  Search,
  X,
  ChevronDown,
  Loader2,
  Sliders,
  MapPin,
  CheckCircle,
  LayoutGrid,
} from 'lucide-react';

const SPECIALTIES_LIST = [
  'Anxiety & Stress', 'Smoking Cessation', 'Weight Loss', 'Pain Management',
  'PTSD & Trauma', 'Confidence & Performance', 'Past Life Regression',
  'General Hypnotherapy', 'Phobias & Fears', 'Sleep Issues',
  'Public Speaking', 'Self-Esteem', 'Addiction Recovery', 'Performance Anxiety'
];

interface FilterState {
  specializations: string[];
  sessionTypes: string[];
  location: string;
  searchQuery: string;
  priceRanges: string[];
  acceptsInsurance: boolean;
}

const CollapsibleSection: React.FC<{ title: string; count?: number; isOpenInitial?: boolean; children: React.ReactNode }> = ({ title, count, isOpenInitial = true, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 20, marginBottom: 20 }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-fg-dim)' }}>{title}</h3>
          {count && count > 0 && (
            <span style={{ background: 'oklch(0.72 0.12 185 / 0.2)', color: 'var(--hf-accent)', fontSize: 10, padding: '1px 7px', borderRadius: 9999, fontWeight: 700 }}>{count}</span>
          )}
        </div>
        <ChevronDown style={{ width: 14, height: 14, color: 'var(--hf-fg-dim)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {isOpen && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  );
};

function SearchContent() {
  const searchParams = useSearchParams();

  const [results, setResults] = useState<Practitioner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [specSearch, setSpecSearch] = useState('');

  const [filters, setFilters] = useState<FilterState>({
    specializations: searchParams.get('specialty') ? [searchParams.get('specialty')!] : [],
    sessionTypes: [],
    location: searchParams.get('location') || searchParams.get('city') || '',
    searchQuery: searchParams.get('q') || '',
    priceRanges: [],
    acceptsInsurance: false
  });

  const handleFilterChange = (updates: Partial<FilterState>) => setFilters(prev => ({ ...prev, ...updates }));

  const toggleFilter = <K extends keyof FilterState>(key: K, value: FilterState[K] extends Array<infer U> ? U : never) => {
    const currentValues = filters[key] as Array<typeof value>;
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((v: typeof value) => v !== value)
      : [...currentValues, value];
    handleFilterChange({ [key]: nextValues } as Partial<FilterState>);
  };

  const handleReset = () => setFilters({ specializations: [], sessionTypes: [], location: '', searchQuery: '', priceRanges: [], acceptsInsurance: false });

  const fetchPractitioners = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.set('name', filters.searchQuery);
      if (filters.location) params.set('city', filters.location);
      if (filters.specializations.length > 0) params.set('specialty', filters.specializations.join(','));
      if (filters.sessionTypes.length > 0) {
        if (filters.sessionTypes.includes('In-Person Only')) params.set('sessionType', 'in-person');
        else if (filters.sessionTypes.includes('Virtual/Online Only')) params.set('sessionType', 'virtual');
      }
      const response = await fetch(`/api/practitioners/search?${params}`);
      const data = await response.json();
      setResults(response.ok && data.practitioners ? data.practitioners : []);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.searchQuery, filters.location, filters.specializations, filters.sessionTypes]);

  useEffect(() => {
    const timer = setTimeout(() => fetchPractitioners(), 300);
    return () => clearTimeout(timer);
  }, [fetchPractitioners]);

  const filteredSpecs = SPECIALTIES_LIST.filter(s => s.toLowerCase().includes(specSearch.toLowerCase()));
  const activeFilterCount = [filters.specializations.length > 0, filters.sessionTypes.length > 0, filters.priceRanges.length > 0, filters.acceptsInsurance].filter(Boolean).length;

  const checkboxStyle = { width: 18, height: 18, cursor: 'pointer', accentColor: 'var(--hf-accent)' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Search Header */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 1020, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Directory Search</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 10 }}>
                Find Your Perfect <span style={{ color: 'var(--hf-accent)' }}>Practitioner</span>
              </h1>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)' }}>Connect with certified hypnotherapists dedicated to your wellbeing.</p>
            </div>
            <div className="glass" style={{ borderRadius: 20, padding: '8px', maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--hf-fg-dim)' }} />
                  <input
                    type="text"
                    placeholder="Name, title, or keyword…"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                    style={{ width: '100%', height: 48, paddingLeft: 44, paddingRight: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: 'var(--hf-fg)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--hf-fg-dim)' }} />
                  <input
                    type="text"
                    placeholder="City or state…"
                    value={filters.location}
                    onChange={(e) => handleFilterChange({ location: e.target.value })}
                    style={{ width: '100%', height: 48, paddingLeft: 44, paddingRight: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: 'var(--hf-fg)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <button
                  onClick={() => fetchPractitioners()}
                  className="btn-gradient hf-btn-accent"
                  style={{ height: 48, padding: '0 28px', borderRadius: 12, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}
                >
                  <Search style={{ width: 15, height: 15 }} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '40px 24px 80px' }}>
          <div style={{ maxWidth: 1020, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            {/* Sidebar Filters */}
            <aside style={{ width: 280, flexShrink: 0, position: 'sticky', top: 100 }}>
              <div className="glass-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sliders style={{ width: 14, height: 14, color: 'var(--hf-accent)' }} />
                    </div>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)' }}>Filters</h2>
                  </div>
                  {activeFilterCount > 0 && (
                    <button onClick={handleReset} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', background: 'oklch(0.72 0.12 185 / 0.1)', border: 'none', padding: '4px 10px', borderRadius: 9999, cursor: 'pointer' }}>
                      Clear All
                    </button>
                  )}
                </div>

                <CollapsibleSection title="Specialties" count={filters.specializations.length}>
                  <div style={{ position: 'relative', marginBottom: 12 }}>
                    <input
                      type="text"
                      placeholder="Search specialties…"
                      value={specSearch}
                      onChange={(e) => setSpecSearch(e.target.value)}
                      style={{ width: '100%', height: 38, paddingLeft: 12, paddingRight: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'var(--hf-fg)', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filteredSpecs.map((spec) => (
                      <label key={spec} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" style={checkboxStyle} checked={filters.specializations.includes(spec)} onChange={() => toggleFilter('specializations', spec)} />
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{spec}</span>
                      </label>
                    ))}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="Session Type" count={filters.sessionTypes.length}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Virtual/Online Only', 'In-Person Only', 'Hybrid Sessions'].map((type) => (
                      <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" style={checkboxStyle} checked={filters.sessionTypes.includes(type)} onChange={() => toggleFilter('sessionTypes', type)} />
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="Pricing & Insurance">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['$', '$$', '$$$', '$$$$'].map((range) => (
                      <label key={range} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" style={checkboxStyle} checked={filters.priceRanges.includes(range)} onChange={() => toggleFilter('priceRanges', range)} />
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                          {range === '$' ? 'Under $100' : range === '$$' ? '$100–$150' : range === '$$$' ? '$150–$200' : '$200+'}
                        </span>
                      </label>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, marginTop: 4 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input type="checkbox" style={checkboxStyle} checked={filters.acceptsInsurance} onChange={(e) => handleFilterChange({ acceptsInsurance: e.target.checked })} />
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>Accepts Insurance</span>
                      </label>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>
            </aside>

            {/* Results */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)' }}>
                    {isLoading ? 'Searching…' : `${results.length} Practitioners Found`}
                  </h2>
                  <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginTop: 2 }}>Based on your current filters</p>
                </div>
              </div>

              {/* Active Filter Badges */}
              {activeFilterCount > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {filters.specializations.map((spec) => (
                    <span key={spec} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: 'var(--hf-accent)', background: 'oklch(0.72 0.12 185 / 0.12)', padding: '4px 10px', borderRadius: 9999 }}>
                      {spec}
                      <button onClick={() => toggleFilter('specializations', spec)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', lineHeight: 1 }}>
                        <X style={{ width: 11, height: 11 }} />
                      </button>
                    </span>
                  ))}
                  {filters.sessionTypes.map((type) => (
                    <span key={type} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: 'oklch(0.72 0.12 160)', background: 'oklch(0.72 0.12 160 / 0.12)', padding: '4px 10px', borderRadius: 9999 }}>
                      {type}
                      <button onClick={() => toggleFilter('sessionTypes', type)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', lineHeight: 1 }}>
                        <X style={{ width: 11, height: 11 }} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <Loader2 style={{ width: 40, height: 40, color: 'var(--hf-accent)' }} className="animate-spin" />
                  <p style={{ marginTop: 20, fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)' }}>Finding Specialists…</p>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginTop: 4 }}>Matching your specific needs</p>
                </div>
              ) : results.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                  {results.map((practitioner) => (
                    <PractitionerCard key={practitioner.id} practitioner={practitioner} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Search style={{ width: 24, height: 24, color: 'var(--hf-fg-dim)' }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 10 }}>No results found</h3>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', maxWidth: 320, margin: '0 auto 24px', lineHeight: 1.6 }}>Try adjusting your filters or searching in a different location.</p>
                  <button onClick={handleReset} style={{ padding: '10px 24px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-accent)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)' }}>
        <Loader2 style={{ width: 40, height: 40, color: 'var(--hf-accent)' }} className="animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
