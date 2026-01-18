import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllCities } from '@/lib/data/practitioners';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata = {
  title: 'Hypnotherapy Locations | Find Practitioners in Your City',
  description: 'Browse hypnotherapists by location across the United States. Find certified practitioners in over 50 cities nationwide.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/locations',
  },
};

export default function LocationsPage() {
  const cities = getAllCities();

  // Group cities by state
  const citiesByState = cities.reduce((acc, city) => {
    if (!acc[city.state]) {
      acc[city.state] = [];
    }
    acc[city.state].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  const states = Object.keys(citiesByState).sort();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Browse by Location
              </h1>
              <p className="text-xl text-gray-600">
                Find certified hypnotherapists in {cities.length} cities across the United States
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {states.map((state) => (
              <div key={state} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">
                  {state}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {citiesByState[state].map((city) => (
                    <Link
                      key={city.slug}
                      href={`/location/${city.slug}`}
                      className="p-4 border rounded-lg hover:border-blue-600 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900">{city.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {city.practitionerCount} practitioner
                            {city.practitionerCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
