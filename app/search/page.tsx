'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { getAllSpecialties, getAllCities } from '@/lib/data/practitioners';
import { Practitioner } from '@/lib/types/practitioner';
import { Search, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Practitioner[]>([]);
  const [query, setQuery] = useState(searchParams.get('location') || searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  // Initialize specialty from URL param (normalize case for matching)
  const initialSpecialty = searchParams.get('specialty');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSpecialty ? [initialSpecialty.charAt(0).toUpperCase() + initialSpecialty.slice(1).toLowerCase()] : []
  );
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure we're on the client before rendering results
  useEffect(() => {
    setIsClient(true);
  }, []);

  // New filter states
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [acceptsInsurance, setAcceptsInsurance] = useState<boolean | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('any');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [acceptingNewClients, setAcceptingNewClients] = useState<boolean | null>(null);

  // Collapsible filter sections
  const [showSessionType, setShowSessionType] = useState(true);
  const [showPricing, setShowPricing] = useState(true);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const specialties = getAllSpecialties();
  const cities = getAllCities();

  // Common certifications in hypnotherapy
  const certifications = [
    'NGH (National Guild of Hypnotists)',
    'IACT (International Association of Counselors & Therapists)',
    'ABH (American Board of Hypnotherapy)',
    'IMDHA (International Medical and Dental Hypnotherapy Association)',
    'AHA (American Hypnosis Association)',
    'Licensed Psychologist',
    'Licensed Counselor (LPC/LMFT)',
    'Clinical Hypnotherapist (CHt)',
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Cantonese', 'Italian', 'Portuguese'];

  // Fetch practitioners from API
  const fetchPractitioners = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (query) params.set('name', query);
      if (selectedCity && selectedCity !== 'all') params.set('city', selectedCity);
      if (selectedSpecialties.length > 0) params.set('specialty', selectedSpecialties[0]);
      if (selectedSessionType) params.set('sessionType', selectedSessionType);

      const response = await fetch(`/api/practitioners/search?${params}`);
      const data = await response.json();

      if (response.ok && data.practitioners) {
        // Map database fields to component expected fields
        const mappedResults = data.practitioners.map((p: any) => ({
          ...p,
          // Map database field names to UI field names
          yearsExperience: p.years_experience,
          sessionType: p.session_types?.[0] || null,
          acceptsInsurance: p.insurance_accepted?.length > 0,
          street: p.address,
          slug: p.slug || p.id,
        }));
        setResults(mappedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching practitioners:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedCity, selectedSpecialties, selectedSessionType]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPractitioners();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchPractitioners]);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleCertification = (cert: string) => {
    setSelectedCertifications((prev) =>
      prev.includes(cert)
        ? prev.filter((c) => c !== cert)
        : [...prev, cert]
    );
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCity('all');
    setSelectedSpecialties([]);
    setSelectedSessionType('');
    setAcceptsInsurance(null);
    setSelectedPriceRange('');
    setMinExperience(0);
    setSelectedCertifications([]);
    setSelectedGender('any');
    setSelectedLanguages([]);
    setAcceptingNewClients(null);
  };

  const activeFilterCount = [
    selectedSpecialties.length > 0,
    selectedSessionType,
    acceptsInsurance !== null,
    selectedPriceRange,
    minExperience > 0,
    selectedCertifications.length > 0,
    selectedGender !== 'any',
    selectedLanguages.length > 0,
    acceptingNewClients !== null,
  ].filter(Boolean).length;

  return (
    <>
      <main className="flex-1 bg-gray-50 pt-20">
        <div className="bg-white border-b py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find a Hypnotherapist Near You</h1>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, city, or specialty..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    // Auto-clear city dropdown when typing in search bar for better UX
                    if (e.target.value && selectedCity !== 'all') {
                      setSelectedCity('all');
                    }
                  }}
                  className="h-12 pl-10"
                />
              </div>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-64 h-12">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.slug} value={city.slug}>
                      {city.name}, {city.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSpecialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialty}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {selectedSessionType && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedSessionType('')}
                >
                  {selectedSessionType === 'in-person' ? 'In-Person' : selectedSessionType === 'virtual' ? 'Virtual' : 'Both Options'}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {acceptsInsurance && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setAcceptsInsurance(null)}
                >
                  Accepts Insurance
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {selectedPriceRange && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedPriceRange('')}
                >
                  {selectedPriceRange === 'budget' ? '$75-125' : selectedPriceRange === 'moderate' ? '$125-200' : '$200+'}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6"
                >
                  Clear all ({activeFilterCount})
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg border sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">

                {/* Specialties */}
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-lg mb-4">Specialties</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {specialties.map((specialty) => (
                      <label
                        key={specialty}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSpecialties.includes(specialty)}
                          onChange={() => toggleSpecialty(specialty)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Session Type */}
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowSessionType(!showSessionType)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-semibold text-lg">Session Type</h3>
                    {showSessionType ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {showSessionType && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="radio"
                          name="sessionType"
                          checked={selectedSessionType === 'in-person'}
                          onChange={() => setSelectedSessionType('in-person')}
                          className="border-gray-300"
                        />
                        <span className="text-sm">In-Person Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="radio"
                          name="sessionType"
                          checked={selectedSessionType === 'virtual'}
                          onChange={() => setSelectedSessionType('virtual')}
                          className="border-gray-300"
                        />
                        <span className="text-sm">Virtual/Online Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="radio"
                          name="sessionType"
                          checked={selectedSessionType === 'both'}
                          onChange={() => setSelectedSessionType('both')}
                          className="border-gray-300"
                        />
                        <span className="text-sm">Both Options</span>
                      </label>
                      {selectedSessionType && (
                        <button
                          onClick={() => setSelectedSessionType('')}
                          className="text-sm text-blue-600 hover:underline mt-1"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing & Insurance */}
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowPricing(!showPricing)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-semibold text-lg">Pricing & Insurance</h3>
                    {showPricing ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {showPricing && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Price Range</p>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                              type="radio"
                              name="priceRange"
                              checked={selectedPriceRange === 'budget'}
                              onChange={() => setSelectedPriceRange('budget')}
                              className="border-gray-300"
                            />
                            <span className="text-sm">Budget ($75-125/session)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                              type="radio"
                              name="priceRange"
                              checked={selectedPriceRange === 'moderate'}
                              onChange={() => setSelectedPriceRange('moderate')}
                              className="border-gray-300"
                            />
                            <span className="text-sm">Moderate ($125-200/session)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                              type="radio"
                              name="priceRange"
                              checked={selectedPriceRange === 'premium'}
                              onChange={() => setSelectedPriceRange('premium')}
                              className="border-gray-300"
                            />
                            <span className="text-sm">Premium ($200+/session)</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={acceptsInsurance === true}
                            onChange={(e) => setAcceptsInsurance(e.target.checked ? true : null)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm font-medium">Accepts Insurance</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowCertifications(!showCertifications)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-semibold text-lg">Certifications</h3>
                    {showCertifications ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {showCertifications && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {certifications.map((cert) => (
                        <label
                          key={cert}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCertifications.includes(cert)}
                            onChange={() => toggleCertification(cert)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience & Preferences */}
                <div className="p-6 border-b">
                  <button
                    onClick={() => setShowPreferences(!showPreferences)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-semibold text-lg">Experience & More</h3>
                    {showPreferences ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {showPreferences && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Minimum Years Experience
                        </label>
                        <Select
                          value={minExperience.toString()}
                          onValueChange={(val) => setMinExperience(parseInt(val))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any</SelectItem>
                            <SelectItem value="1">1+ years</SelectItem>
                            <SelectItem value="3">3+ years</SelectItem>
                            <SelectItem value="5">5+ years</SelectItem>
                            <SelectItem value="10">10+ years</SelectItem>
                            <SelectItem value="15">15+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Gender</p>
                        <Select value={selectedGender} onValueChange={setSelectedGender}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="non-binary">Non-Binary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Languages Spoken</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {languages.map((lang) => (
                            <label
                              key={lang}
                              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={selectedLanguages.includes(lang)}
                                onChange={() => toggleLanguage(lang)}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm">{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={acceptingNewClients === true}
                            onChange={(e) => setAcceptingNewClients(e.target.checked ? true : null)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm font-medium">Accepting New Clients</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear All Filters Button */}
                {activeFilterCount > 0 && (
                  <div className="p-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear All Filters ({activeFilterCount})
                    </Button>
                  </div>
                )}
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {isLoading ? 'Searching...' : `${results.length} practitioner${results.length !== 1 ? 's' : ''} found`}
                </h2>
                {activeFilterCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Filtered by {activeFilterCount} criteria
                  </p>
                )}
              </div>

              {!isClient || isLoading ? (
                <div className="bg-white p-12 rounded-lg border text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-2" />
                  <p className="text-gray-600">Loading practitioners...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="bg-white p-12 rounded-lg border text-center">
                  <p className="text-gray-600 text-lg mb-2">
                    No practitioners found matching your criteria.
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Try adjusting your filters to see more results.
                  </p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={`results-${results.length}-${results[0]?.id}`}>
                  {results.map((practitioner) => (
                    <PractitionerCard
                      key={practitioner.id}
                      practitioner={practitioner}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
