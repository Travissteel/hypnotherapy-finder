'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ChevronDown, Plus, Minus } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filter states
  const [sessionType, setSessionType] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [insurance, setInsurance] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) params.append('location', location);
    if (specialty) params.append('specialty', specialty);
    if (sessionType) params.append('sessionType', sessionType);
    if (gender) params.append('gender', gender);
    if (language) params.append('language', language);
    if (insurance) params.append('insurance', insurance);

    const queryString = params.toString();
    router.push(`/search${queryString ? '?' + queryString : ''}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="space-y-5">
        {/* Main Search Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <MapPin className="h-5 w-5 text-teal-600 group-hover:scale-110 transition-transform" />
            </div>
            <input
              type="text"
              placeholder="City or Zip Code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl bg-white/90 focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all placeholder-gray-500 text-gray-900 font-bold text-lg appearance-none cursor-text shadow-sm"
            />
          </div>

          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-teal-600 group-hover:scale-110 transition-transform" />
            </div>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="block w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl bg-white/90 focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all text-gray-900 font-bold text-lg appearance-none cursor-pointer shadow-sm"
            >
              <option value="">All Specialties</option>
              <option value="anxiety">Anxiety & Stress</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="smoking">Smoking Cessation</option>
              <option value="phobias">Phobias</option>
              <option value="sleep">Sleep & Insomnia</option>
              <option value="pain">Chronic Pain</option>
              <option value="confidence">Confidence Building</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="text-base text-teal-700 font-bold hover:text-teal-900 flex items-center gap-2 mb-3 px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors w-fit"
          >
            {showFilters ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>

          {/* Advanced Filter Fields */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pb-2">
              <div className="relative">
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="">Session Type (Any)</option>
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Online / Virtual</option>
                  <option value="both">Both Options</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="">Gender Preference (Any)</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="">Language (Any)</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                >
                  <option value="">Insurance (Any)</option>
                  <option value="accepts">Accepts Insurance</option>
                  <option value="self-pay">Self-Pay Only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full py-4 btn-gradient text-white font-extrabold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-xl tracking-wide border border-white/20"
        >
          <Search className="h-6 w-6 mr-2" />
          Search Therapists
        </Button>
      </div>
    </form>
  );
}
