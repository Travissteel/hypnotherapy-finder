'use client';

import { useRef, useEffect } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const show = () => {
      video.style.opacity = '1';
    };

    // Handle already-loaded case (cached video fires canplay before listener)
    if (video.readyState >= 2) {
      show();
      video.play().catch(() => {});
      return;
    }

    video.addEventListener('canplay', show, { once: true });
    video.addEventListener('canplaythrough', show, { once: true });
    video.load();

    return () => {
      video.removeEventListener('canplay', show);
      video.removeEventListener('canplaythrough', show);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      autoPlay
      muted
      playsInline
      loop
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translateY(15%)',
        opacity: 0,
        transition: 'opacity 0.8s ease',
        willChange: 'opacity',
        zIndex: 0,
      }}
    />
  );
}
