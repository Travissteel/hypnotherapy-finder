'use client';

import { useState, useEffect, Suspense, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Practitioner } from '@/lib/types/practitioner';
import {
  Search as SearchIcon,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sliders,
  MapPin,
  Video,
  DollarSign,
  Award,
  CheckCircle,
  BrainCircuit,
  LayoutGrid,
  Map as MapIcon,
  Search
} from 'lucide-react';

const SPECIALTIES_LIST = [
  'Anxiety & Stress',
  'Smoking Cessation',
  'Weight Loss',
  'Pain Management',
  'PTSD & Trauma',
  'Confidence & Performance',
  'Past Life Regression',
  'General Hypnotherapy',
  'Phobias & Fears',
  'Sleep Issues',
  'Public Speaking',
  'Self-Esteem',
  'Addiction Recovery',
  'Performance Anxiety'
];

interface FilterState {
  specializations: string[];
  sessionTypes: string[];
  location: string;
  searchQuery: string;
  priceRanges: string[];
  acceptsInsurance: boolean;
}

const CollapsibleSection: React.FC<{
  title: string;
  count?: number;
  isOpenInitial?: boolean;
  children: React.ReactNode;
}> = ({ title, count, isOpenInitial = true, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <div className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em] group-hover:text-indigo-700 transition-colors">
            {title}
          </h3>
          {count && count > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {count}
            </span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
  );
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [results, setResults] = useState<Practitioner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [specSearch, setSpecSearch] = useState('');

  const [filters, setFilters] = useState<FilterState>({
    specializations: searchParams.get('specialty') ? [searchParams.get('specialty')!] : [],
    sessionTypes: [],
    location: searchParams.get('location') || searchParams.get('city') || '',
    searchQuery: searchParams.get('q') || '',
    priceRanges: [],
    acceptsInsurance: false
  });

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const toggleFilter = <K extends keyof FilterState>(key: K, value: FilterState[K] extends Array<infer U> ? U : never) => {
    const currentValues = filters[key] as Array<typeof value>;
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((v: typeof value) => v !== value)
      : [...currentValues, value];
    handleFilterChange({ [key]: nextValues } as Partial<FilterState>);
  };

  const handleReset = () => {
    setFilters({
      specializations: [],
      sessionTypes: [],
      location: '',
      searchQuery: '',
      priceRanges: [],
      acceptsInsurance: false
    });
  };

  // Fetch practitioners from API
  const fetchPractitioners = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.searchQuery) params.set('name', filters.searchQuery);
      if (filters.location) params.set('city', filters.location);
      if (filters.specializations.length > 0) params.set('specialty', filters.specializations.join(','));

      // Map session types to API format
      if (filters.sessionTypes.length > 0) {
        if (filters.sessionTypes.includes('In-Person Only')) params.set('sessionType', 'in-person');
        else if (filters.sessionTypes.includes('Virtual/Online Only')) params.set('sessionType', 'virtual');
      }

      const response = await fetch(`/api/practitioners/search?${params}`);
      const data = await response.json();

      if (response.ok && data.practitioners) {
        setResults(data.practitioners);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching practitioners:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.searchQuery, filters.location, filters.specializations, filters.sessionTypes]);

  // Initial fetch and on filter changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPractitioners();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchPractitioners]);

  const filteredSpecs = SPECIALTIES_LIST.filter(s =>
    s.toLowerCase().includes(specSearch.toLowerCase())
  );

  const activeFilterCount = [
    filters.specializations.length > 0,
    filters.sessionTypes.length > 0,
    filters.priceRanges.length > 0,
    filters.acceptsInsurance
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Search Header Section */}
        <section className="bg-gradient-to-br from-indigo-50/50 via-white to-teal-50/30 border-b border-gray-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 mb-4 shadow-sm">Directory Search</span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Find Your Perfect <span className="text-indigo-700">Practitioner</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 font-medium">
                Connect with certified hypnotherapists dedicated to your wellbeing.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
                <div className="flex-1 relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search by name, title, or keyword..."
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border-transparent rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all font-medium"
                  />
                  {filters.searchQuery && (
                    <button
                      onClick={() => handleFilterChange({ searchQuery: '' })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
                <div className="flex-1 relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-teal-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="City, state, or zip code..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange({ location: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border-transparent rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-200 outline-none transition-all font-medium"
                  />
                  {filters.location && (
                    <button
                      onClick={() => handleFilterChange({ location: '' })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
                <Button
                  onClick={() => fetchPractitioners()}
                  className="h-14 px-10 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Search className="h-5 w-5" />
                  Search Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Content Section */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sticky Sidebar Filters */}
              <aside className="w-full lg:w-80 flex-shrink-0">
                <div className="sticky top-28 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="size-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Sliders className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-gray-900 text-xl font-extrabold tracking-tight">Filters</h2>
                    </div>
                    {activeFilterCount > 0 && (
                      <button onClick={handleReset} className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full transition-colors">Clear All</button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {/* Specialties Collapsible */}
                    <CollapsibleSection title="Specialties" count={filters.specializations.length}>
                      <div className="relative mb-4 group">
                        <input
                          type="text"
                          placeholder="Search specialties..."
                          value={specSearch}
                          onChange={(e) => setSpecSearch(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all font-medium"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                      <div className="max-h-64 overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                        {filteredSpecs.map((spec: string) => (
                          <label key={spec} className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-300"
                                checked={filters.specializations.includes(spec)}
                                onChange={() => toggleFilter('specializations', spec)}
                              />
                              <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                            </div>
                            <span className="ml-3 text-sm font-bold text-gray-500 group-hover:text-indigo-700 transition-colors">{spec}</span>
                          </label>
                        ))}
                      </div>
                    </CollapsibleSection>

                    {/* Session Type Collapsible */}
                    <CollapsibleSection title="Session Type" count={filters.sessionTypes.length}>
                      <div className="space-y-2.5">
                        {['Virtual/Online Only', 'In-Person Only', 'Hybrid Sessions'].map((type) => (
                          <label key={type} className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-teal-600 checked:border-teal-600 hover:border-teal-300"
                                checked={filters.sessionTypes.includes(type)}
                                onChange={() => toggleFilter('sessionTypes', type)}
                              />
                              <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                            </div>
                            <span className="ml-3 text-sm font-bold text-gray-500 group-hover:text-teal-700 transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </CollapsibleSection>

                    {/* Pricing Collapsible */}
                    <CollapsibleSection title="Pricing & Insurance">
                      <div className="space-y-4">
                        <div className="space-y-2.5">
                          {['$', '$$', '$$$', '$$$$'].map((range) => (
                            <label key={range} className="flex items-center group cursor-pointer">
                              <div className="relative flex items-center">
                                <input
                                  type="checkbox"
                                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-amber-500 checked:border-amber-500 hover:border-amber-300"
                                  checked={filters.priceRanges.includes(range)}
                                  onChange={() => toggleFilter('priceRanges', range)}
                                />
                                <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                              </div>
                              <span className="ml-3 text-sm font-bold text-gray-500 group-hover:text-amber-700 transition-colors">
                                {range === '$' ? 'Under $100' : range === '$$' ? '$100 - $150' : range === '$$$' ? '$150 - $200' : '$200+'}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                          <label className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-300"
                                checked={filters.acceptsInsurance}
                                onChange={(e) => handleFilterChange({ acceptsInsurance: e.target.checked })}
                              />
                              <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                            </div>
                            <span className="ml-3 text-sm font-bold text-gray-500 group-hover:text-indigo-700 transition-colors">Accepts Insurance</span>
                          </label>
                        </div>
                      </div>
                    </CollapsibleSection>
                  </div>
                </div>
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                      {isLoading ? 'Searching...' : `${results.length} Practitioners Found`}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">Based on your current filters</p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 rounded-xl transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <MapIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Active Filter Badges */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {filters.specializations.map((spec: string) => (
                      <Badge key={spec} variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 py-1.5 px-3 rounded-xl flex items-center gap-1.5 group hover:bg-indigo-100 transition-colors">
                        {spec}
                        <button onClick={() => toggleFilter('specializations', spec)} className="hover:text-indigo-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.sessionTypes.map((type: string) => (
                      <Badge key={type} variant="secondary" className="bg-teal-50 text-teal-700 border-teal-100 py-1.5 px-3 rounded-xl flex items-center gap-1.5 group hover:bg-teal-100 transition-colors">
                        {type}
                        <button onClick={() => toggleFilter('sessionTypes', type)} className="hover:text-teal-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                      <Loader2 className="h-16 w-16 text-indigo-600 animate-spin relative z-10" />
                    </div>
                    <p className="mt-8 text-xl font-extrabold text-gray-900 tracking-tight">Finding Specialists...</p>
                    <p className="mt-2 text-gray-500 font-medium">Matching your specific needs</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {results.map((practitioner) => (
                      <PractitionerCard key={practitioner.id} practitioner={practitioner} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="size-20 bg-white rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center mx-auto mb-8">
                      <Search className="h-10 w-10 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">No results found</h3>
                    <p className="mt-4 text-gray-600 font-medium max-w-sm mx-auto">Try adjusting your filters or searching in a different location.</p>
                    <Button onClick={handleReset} variant="outline" className="mt-10 rounded-2xl border-2 px-8 py-6 h-auto font-bold text-indigo-600 hover:bg-indigo-50 border-indigo-100">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
