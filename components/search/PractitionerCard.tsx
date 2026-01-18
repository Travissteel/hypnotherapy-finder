'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Globe,
  Mail,
  CheckCircle,
  Star,
  ShieldCheck,
  Video,
  DollarSign,
  Award,
  ArrowRight,
  TrendingUp,
  Brain,
  Sparkles
} from 'lucide-react';
import { Practitioner } from '@/lib/types/practitioner';

interface PractitionerCardProps {
  practitioner: Practitioner;
}

export const PractitionerCard: React.FC<PractitionerCardProps> = ({ practitioner }) => {
  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];

  // Professional Image Placeholder Design
  const ProfessionalPlaceholder = () => (
    <div className="flex flex-col items-center justify-center text-indigo-200 w-full h-full bg-indigo-900/5 select-none">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <Brain className="h-16 w-16 relative z-10 opacity-40" />
      </div>
      <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-indigo-100/50 shadow-sm backdrop-blur-sm">
        <ShieldCheck className="h-3 w-3 text-indigo-600" />
        <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-indigo-700/70">Certified Professional</span>
      </div>
    </div>
  );

  return (
    <Card className="group overflow-hidden border-gray-100 bg-white hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 rounded-[2.5rem] transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative h-56 overflow-hidden">
          {practitioner.profile_photo_url ? (
            <img
              src={practitioner.profile_photo_url}
              alt={practitioner.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          ) : (
            <ProfessionalPlaceholder />
          )}

          {/* Status Badges Overlay */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-2">
              {practitioner.acceptingNewClients && (
                <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-white">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-extrabold text-gray-900 uppercase tracking-widest">New Clients</span>
                </div>
              )}
              {practitioner.verified && (
                <div className="inline-flex items-center gap-1.5 bg-indigo-600 px-3.5 py-1.5 rounded-2xl shadow-lg border border-indigo-500">
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-widest">Verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-5 left-5 z-20">
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-black text-gray-900">4.9</span>
              <span className="text-[10px] font-bold text-gray-400">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors uppercase leading-none mb-2">
                {practitioner.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest">
                <MapPin className="h-4 w-4 text-indigo-600" />
                {practitioner.city}, {practitioner.state}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-3xl bg-gray-50 flex items-center gap-3 border border-gray-100 shadow-sm shadow-gray-50">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Video className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest line-clamp-1">In-Person/Video</span>
                <span className="text-xs font-black text-gray-900">Online</span>
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-gray-50 flex items-center gap-3 border border-gray-100 shadow-sm shadow-gray-50">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Award className="h-4 w-4 text-teal-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest line-clamp-1">Experience</span>
                <span className="text-xs font-black text-gray-900">{practitioner.yearsExperience || '10'}+ Yrs</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty, idx) => (
                <span
                  key={idx}
                  className="inline-block px-4 py-2 bg-white border border-gray-100 text-[10px] font-extrabold text-gray-600 rounded-2xl shadow-sm group-hover:border-indigo-100 transition-all uppercase tracking-widest"
                >
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="inline-block px-4 py-2 bg-indigo-50 text-[10px] font-bold text-indigo-700 rounded-2xl border border-indigo-100">
                  +{specialties.length - 3} More
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-50">
            <div className="flex flex-col">
              <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Session Rate</span>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black text-gray-900 leading-none">${practitioner.sessionPrice || '150'}</span>
                <span className="text-[10px] font-bold text-gray-400 tracking-tighter">/ hr</span>
              </div>
            </div>
            <Button
              asChild
              className="rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold px-8 h-14 shadow-lg shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
            >
              <Link href={`/practitioner/${practitioner.slug}`} className="flex items-center gap-2">
                View Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
