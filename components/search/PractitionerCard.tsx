import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Practitioner } from '@/lib/types/practitioner';
import { MapPin, Phone, Globe, Video, DollarSign, Award, CheckCircle } from 'lucide-react';

interface PractitionerCardProps {
  practitioner: Practitioner;
}

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {practitioner.name}
              </h3>
              {practitioner.acceptingNewClients && (
                <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Accepting
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{practitioner.city}, {practitioner.state}</span>
            </div>
          </div>

          {/* Key Information Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            {practitioner.sessionType && (
              <Badge variant="outline" className="gap-1">
                <Video className="h-3 w-3" />
                {practitioner.sessionType === 'in-person' ? 'In-Person' :
                 practitioner.sessionType === 'virtual' ? 'Virtual' : 'Both Options'}
              </Badge>
            )}
            {practitioner.acceptsInsurance && (
              <Badge variant="outline" className="gap-1">
                <DollarSign className="h-3 w-3" />
                Insurance
              </Badge>
            )}
            {practitioner.yearsExperience && (
              <Badge variant="outline" className="gap-1">
                <Award className="h-3 w-3" />
                {practitioner.yearsExperience}+ years
              </Badge>
            )}
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {practitioner.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {practitioner.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{practitioner.specialties.length - 3} more
              </Badge>
            )}
          </div>

          {/* Price and Certifications */}
          <div className="space-y-1 text-sm text-gray-600">
            {practitioner.sessionPrice && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Session fee:</span>
                <span className="font-semibold text-gray-900">${practitioner.sessionPrice}</span>
              </div>
            )}
            {practitioner.certifications && practitioner.certifications.length > 0 && (
              <div className="text-xs text-gray-500 truncate">
                {practitioner.certifications[0]}
                {practitioner.certifications.length > 1 && ` +${practitioner.certifications.length - 1}`}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-gray-600 pt-2 border-t">
            {practitioner.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${practitioner.phone}`} className="hover:text-blue-600">
                  {practitioner.phone}
                </a>
              </div>
            )}
            {practitioner.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href={practitioner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 truncate"
                >
                  Visit website
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/practitioner/${practitioner.slug}`}>View Full Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
