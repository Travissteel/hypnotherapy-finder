import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Practitioner } from '@/lib/types/practitioner';
import { MapPin, Star, Video, CheckCircle, Globe, Phone, Users } from 'lucide-react';

interface PractitionerCardProps {
  practitioner: Practitioner;
}

// Helper to ensure website URLs have proper protocol
function normalizeWebsiteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  const websiteUrl = normalizeWebsiteUrl(practitioner.website);

  // Theme selection based on practitioner ID or name for consistency
  const themeColors = ['indigo', 'teal', 'purple', 'blue'];
  const themeIndex = (practitioner.name.length + (practitioner.id?.length || 0)) % themeColors.length;
  const theme = themeColors[themeIndex];

  const themeStyles: Record<string, any> = {
    indigo: {
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100/50',
      text: 'text-indigo-700',
      tagBorder: 'border-indigo-100',
      button: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
    },
    teal: {
      bg: 'bg-teal-50/50',
      border: 'border-teal-100/50',
      text: 'text-teal-700',
      tagBorder: 'border-teal-100',
      button: 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'
    },
    purple: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-100/50',
      text: 'text-purple-700',
      tagBorder: 'border-purple-100',
      button: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
    },
    blue: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-100/50',
      text: 'text-blue-700',
      tagBorder: 'border-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
    }
  };

  const style = themeStyles[theme];

  return (
    <div className={`group flex flex-col sm:flex-row items-start gap-6 rounded-3xl ${style.bg} border ${style.border} p-6 transition-all hover:shadow-xl hover:shadow-gray-200/50`}>
      <div className="relative flex-shrink-0">
        <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white flex items-center justify-center relative">
          {practitioner.imageUrl ? (
            <img
              alt={practitioner.name}
              className="w-full h-full object-cover"
              src={practitioner.imageUrl}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full">
              <div className={`w-full h-full absolute inset-0 bg-gradient-to-br ${style.bg} opacity-50`}></div>
              <Users className="h-12 w-12 relative z-10 text-gray-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1 relative z-10">Premium</span>
            </div>
          )}
        </div>
        {practitioner.acceptingNewClients && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <CheckCircle className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h3 className={`text-xl font-bold text-gray-900 group-hover:${style.text} transition-colors line-clamp-1`}>
              {practitioner.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 font-medium text-gray-400">
              <MapPin className="h-4 w-4" />
              <p className="text-sm text-gray-600">{practitioner.city}, {practitioner.state}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border ${style.tagBorder} shadow-sm`}>
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-gray-700">4.9 (82 reviews)</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {practitioner.specialties.slice(0, 3).map((spec, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold uppercase tracking-wider ${idx === 0 ? 'bg-white ' + style.text : 'bg-white/50 text-gray-600'} px-3 py-1 rounded-full border ${idx === 0 ? style.tagBorder : 'border-gray-200/50'} shadow-sm`}
            >
              {spec}
            </span>
          ))}
          {practitioner.session_types && practitioner.session_types.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/50 text-gray-600 px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
              <Video className="h-3 w-3" />
              {practitioner.session_types.includes('virtual') && practitioner.session_types.includes('in-person')
                ? 'Both Options'
                : practitioner.session_types.includes('virtual')
                  ? 'Virtual'
                  : 'In-Person'}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl font-medium line-clamp-2">
          {practitioner.bio || `Highly qualified hypnotherapist in ${practitioner.city} specializing in ${practitioner.specialties.join(', ')}. Dedicated to helping clients achieve lasting positive change.`}
        </p>

        <div className="mt-2 flex items-center justify-between pt-4 border-t border-gray-200/40">
          <div className="text-sm flex items-baseline gap-1">
            <span className="font-extrabold text-gray-900 text-xl">${practitioner.session_price || '150'}</span>
            <span className="text-gray-500 font-bold text-xs uppercase tracking-tighter">/ session</span>
          </div>
          <Button asChild className={`${style.button} text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg transform hover:-translate-y-0.5`}>
            <Link href={`/practitioner/${practitioner.slug || practitioner.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
