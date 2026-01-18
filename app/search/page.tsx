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
  Tune,
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

  const toggleFilter = (key: keyof FilterState, value: any) => {
    const currentValues = filters[key] as any[];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((v: any) => v !== value)
      : [...currentValues, value];
    handleFilterChange({ [key]: nextValues });
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
      if (filters.specializations.length > 0) params.set('specialty', filters.specializations[0]);

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
                  Search
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
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-indigo-50 rounded-xl">
                        <Tune className="h-5 w-5 text-indigo-700" />
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
                          className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all font-medium"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                      <div className="max-h-64 overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                        {filteredSpecs.map((spec) => (
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
                            <span className="ml-3 text-xs font-bold text-gray-600 group-hover:text-indigo-700 transition-colors">{spec}</span>
                          </label>
                        ))}
                        {filteredSpecs.length === 0 && <p className="text-[10px] text-gray-400 italic py-2 text-center">No matching specialties</p>}
                      </div>
                    </CollapsibleSection>

                    {/* Session Type Collapsible */}
                    <CollapsibleSection title="Session Type" count={filters.sessionTypes.length}>
                      <div className="space-y-3">
                        {["In-Person Only", "Virtual/Online Only", "Both Options"].map((type) => (
                          <label key={type} className="flex items-center group cursor-pointer">
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-300"
                                checked={filters.sessionTypes.includes(type)}
                                onChange={() => toggleFilter('sessionTypes', type)}
                              />
                              <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                            </div>
                            <span className="ml-3 text-xs font-bold text-gray-600 group-hover:text-indigo-700 transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </CollapsibleSection>

                    {/* Pricing & Insurance Collapsible */}
                    <CollapsibleSection title="Pricing & Insurance" count={filters.priceRanges.length + (filters.acceptsInsurance ? 1 : 0)}>
                      <div className="space-y-6">
                        <div className="space-y-3">
                          {[
                            { label: "Budget ($75-125)", value: "budget" },
                            { label: "Moderate ($125-200)", value: "moderate" },
                            { label: "Premium ($200+)", value: "premium" }
                          ].map((tier) => (
                            <label key={tier.value} className="flex items-center group cursor-pointer">
                              <div className="relative flex items-center">
                                <input
                                  type="checkbox"
                                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white transition-all checked:bg-indigo-600 checked:border-indigo-600 hover:border-indigo-300"
                                  checked={filters.priceRanges.includes(tier.value)}
                                  onChange={() => toggleFilter('priceRanges', tier.value)}
                                />
                                <CheckCircle className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1 pointer-events-none" />
                              </div>
                              <span className="ml-3 text-xs font-bold text-gray-600 group-hover:text-indigo-700 transition-colors">{tier.label}</span>
                            </label>
                          ))}
                        </div>
                        <div className="pt-2">
                          <label className="flex items-center cursor-pointer group">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={filters.acceptsInsurance}
                                onChange={() => handleFilterChange({ acceptsInsurance: !filters.acceptsInsurance })}
                              />
                              <div className={`w-11 h-6 bg-gray-200 rounded-full transition-colors ${filters.acceptsInsurance ? 'bg-indigo-600' : ''}`}></div>
                              <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${filters.acceptsInsurance ? 'translate-x-5' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-[11px] font-extrabold text-gray-700 uppercase tracking-wider group-hover:text-indigo-700 transition-colors">Accepts Insurance</span>
                          </label>
                        </div>
                      </div>
                    </CollapsibleSection>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50">
                    <Button
                      onClick={() => fetchPractitioners()}
                      className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-4 rounded-2xl text-sm font-extrabold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group transform active:scale-95"
                    >
                      Apply All Filters
                      <Tune className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-gray-900 text-3xl font-extrabold tracking-tight">
                      Therapists in <span className="text-indigo-700">{filters.location || 'Your Area'}</span>
                    </h2>
                    <p className="text-sm font-bold text-gray-500 mt-2 flex items-center gap-2">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">{results.length}</span> practitioners match your current search
                    </p>
                  </div>
                  <div className="inline-flex p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-[1.25rem] border border-gray-200/50 shadow-inner">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold transition-all rounded-[1rem] ${viewMode === 'list' ? 'bg-white text-indigo-700 shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                      List
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold transition-all rounded-[1rem] ${viewMode === 'map' ? 'bg-white text-indigo-700 shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                      <MapIcon className="h-4 w-4" />
                      Map
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                      <BrainCircuit className="absolute inset-0 h-10 w-10 text-indigo-600 m-5" />
                    </div>
                    <h3 className="text-gray-900 font-extrabold text-xl mt-8">Analyzing the directory...</h3>
                    <p className="text-gray-500 text-sm mt-3 font-medium">Connecting with top-tier practitioners in your region.</p>
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="flex flex-col gap-8">
                    {results.length > 0 ? (
                      results.map((practitioner) => (
                        <PractitionerCard
                          key={practitioner.id}
                          practitioner={practitioner}
                        />
                      ))
                    ) : (
                      <div className="bg-white rounded-[3rem] p-16 md:p-24 text-center border border-gray-100 shadow-sm">
                        <div className="relative w-24 h-24 mx-auto mb-8">
                          <div className="absolute inset-0 bg-indigo-50 rounded-full animate-pulse"></div>
                          <SearchIcon className="absolute inset-0 h-12 w-12 text-indigo-200 m-6" />
                        </div>
                        <h3 className="text-gray-900 font-extrabold text-2xl">Refine your inquiry</h3>
                        <p className="text-gray-500 text-lg mt-4 max-w-sm mx-auto font-medium leading-relaxed">We couldn't find a direct match. Try adjusting your filters or expanding your search area.</p>
                        <button
                          onClick={handleReset}
                          className="mt-10 px-10 py-4 bg-white hover:bg-gray-50 text-indigo-700 font-extrabold rounded-2xl border-2 border-indigo-50 transition-all shadow-lg shadow-indigo-100 transform hover:-translate-y-1"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-[3rem] h-[650px] flex items-center justify-center border-2 border-dashed border-gray-200 relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i1024!3i1024!2m3!1e0!2sm!3i123456789!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i123456789')] opacity-30 grayscale saturate-0 contrast-50 transition-all group-hover:scale-105 duration-[10s]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-teal-50/20"></div>
                    <div className="relative z-10 text-center bg-white/95 backdrop-blur-md p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white max-w-sm mx-4">
                      <div className="w-20 h-20 bg-indigo-600 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-200 group-hover:rotate-0 transition-all duration-500">
                        <MapIcon className="h-10 w-10 text-white -rotate-12 group-hover:rotate-0 transition-all duration-500" />
                      </div>
                      <h3 className="text-gray-900 font-extrabold text-2xl">Spatial Discovery</h3>
                      <p className="text-gray-500 text-base mt-4 font-medium leading-relaxed">Map integration is being finalized. Soon you'll be able to discover practitioners via geographic proximity.</p>
                      <Button
                        onClick={() => setViewMode('list')}
                        variant="ghost"
                        className="mt-8 text-indigo-700 font-bold hover:bg-indigo-50 px-8 py-2 rounded-xl"
                      >
                        Back to List View
                      </Button>
                    </div>
                  </div>
                )}

                {results.length > 0 && results.length < 50 && (
                  <div className="mt-12 text-center text-gray-400 font-bold text-xs uppercase tracking-[0.2em] py-8 border-t border-gray-50">
                    End of directory results
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
    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
