'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ChevronDown, Plus, Minus } from 'lucide-react';

const fieldStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.1)',
  flex: 1,
  minWidth: 0,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  padding: '13px 14px 13px 40px',
  fontSize: 14,
  fontWeight: 400,
  background: 'transparent',
  color: 'var(--hf-fg)',
  border: 'none',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
};

const iconWrap: React.CSSProperties = {
  position: 'absolute',
  left: 13,
  color: 'rgba(255,255,255,0.38)',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
};

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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
    const qs = params.toString();
    router.push(`/search${qs ? '?' + qs : ''}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      {/* Main row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        {/* Location */}
        <div style={fieldStyle}>
          <span style={iconWrap}><MapPin size={15} /></span>
          <input
            type="text"
            placeholder="City or Zip Code"
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ ...inputStyle }}
          />
        </div>
        {/* Specialty */}
        <div style={fieldStyle}>
          <span style={iconWrap}><Search size={15} /></span>
          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            style={{
              ...inputStyle,
              paddingRight: 36,
              appearance: 'none',
              cursor: 'pointer',
              color: specialty ? 'var(--hf-fg)' : 'rgba(255,255,255,0.35)',
            }}
          >
            <option value="">All Specialties</option>
            <option value="anxiety">Anxiety &amp; Stress</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="smoking">Smoking Cessation</option>
            <option value="phobias">Phobias</option>
            <option value="sleep">Sleep &amp; Insomnia</option>
            <option value="pain">Chronic Pain</option>
            <option value="confidence">Confidence Building</option>
          </select>
          <span style={{ position: 'absolute', right: 11, color: 'rgba(255,255,255,0.38)', pointerEvents: 'none' }}>
            <ChevronDown size={14} />
          </span>
        </div>
      </div>

      {/* Advanced filters toggle */}
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.42)',
          fontSize: 12,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10,
          padding: '3px 0',
          fontFamily: 'inherit',
          letterSpacing: '0.02em',
        }}
      >
        {showFilters ? <Minus size={13} /> : <Plus size={13} />}
        {showFilters ? 'Hide filters' : 'Advanced filters'}
      </button>

      {showFilters && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          {[
            {
              value: sessionType, set: setSessionType,
              opts: [['', 'Session (Any)'], ['in-person', 'In-Person'], ['virtual', 'Online'], ['both', 'Both']],
            },
            {
              value: gender, set: setGender,
              opts: [['', 'Gender (Any)'], ['male', 'Male'], ['female', 'Female'], ['non-binary', 'Non-Binary']],
            },
            {
              value: language, set: setLanguage,
              opts: [['', 'Language (Any)'], ['English', 'English'], ['Spanish', 'Spanish'], ['French', 'French'], ['Mandarin', 'Mandarin']],
            },
            {
              value: insurance, set: setInsurance,
              opts: [['', 'Insurance (Any)'], ['accepts', 'Accepts Insurance'], ['self-pay', 'Self-Pay Only']],
            },
          ].map(({ value, set, opts }, i) => (
            <select
              key={i}
              value={value}
              onChange={e => set(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '9px 12px',
                fontSize: 13,
                color: 'rgba(255,255,255,0.58)',
                fontFamily: 'inherit',
                cursor: 'pointer',
                appearance: 'none',
                outline: 'none',
              }}
            >
              {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          ))}
        </div>
      )}

      {/* Search button */}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '13px',
          borderRadius: 12,
          background: 'var(--hf-accent)',
          border: 'none',
          color: '#04040d',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: 'inherit',
          letterSpacing: '0.01em',
          transition: 'filter .2s, transform .15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'brightness(1.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = 'brightness(1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Search size={16} /> Search Therapists
      </button>
    </form>
  );
}
