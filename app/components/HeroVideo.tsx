'use client';

import { useRef, useEffect } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const cancelRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const fadeIn = (video: HTMLVideoElement) => {
    cancelRaf();
    fadingOutRef.current = false;
    const start = performance.now();
    const from = video.style.opacity ? parseFloat(video.style.opacity) : 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / 600, 1);
      video.style.opacity = String(from + (1 - from) * t);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const fadeOut = (video: HTMLVideoElement) => {
    if (fadingOutRef.current) return;
    fadingOutRef.current = true;
    cancelRaf();
    const start = performance.now();
    const from = parseFloat(video.style.opacity || '1');
    const step = (now: number) => {
      const t = Math.min((now - start) / 500, 1);
      video.style.opacity = String(from * (1 - t));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const onCanPlay = () => {
      video.play().catch(() => {});
      fadeIn(video);
    };

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) fadeOut(video);
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        fadingOutRef.current = false;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeIn(video);
      }, 120);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelRaf();
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      loop={false}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translateY(15%)',
        opacity: 0,
        willChange: 'opacity',
        zIndex: 0,
      }}
    />
  );
}
