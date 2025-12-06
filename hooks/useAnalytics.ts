'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/track';

/**
 * Hook to automatically track page views
 */
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView({
        path: pathname,
        title: document.title,
        referrer: document.referrer,
      });
    }
  }, [pathname]);
}

/**
 * Hook to provide analytics tracking functions
 */
export function useAnalytics() {
  return {
    trackPageView,
    trackSearch: (query: string, filters?: Record<string, any>, resultsCount?: number) => {
      const { trackSearch } = require('@/lib/analytics/track');
      trackSearch({ query, filters, resultsCount });
    },
    trackPractitionerView: (practitionerId: string, source?: string, referrer?: string) => {
      const { trackPractitionerView } = require('@/lib/analytics/track');
      trackPractitionerView({ practitionerId, source, referrer });
    },
    trackContactClick: (practitionerId: string, contactType: 'phone' | 'email' | 'website') => {
      const { trackContactClick } = require('@/lib/analytics/track');
      trackContactClick({ practitionerId, contactType });
    },
    trackClaimEvent: (
      claimId: string,
      practitionerId: string,
      eventType: 'created' | 'approved' | 'rejected' | 'disputed' | 'updated',
      eventData?: Record<string, any>,
      adminId?: string
    ) => {
      const { trackClaimEvent } = require('@/lib/analytics/track');
      trackClaimEvent({ claimId, practitionerId, eventType, eventData, adminId });
    },
  };
}
