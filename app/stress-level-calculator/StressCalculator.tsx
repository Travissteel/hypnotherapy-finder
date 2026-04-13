'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function StressCalculator() {
  const [events, setEvents] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [workHours, setWorkHours] = useState('');
  const [emotionalState, setEmotionalState] = useState('');
  const [socialSupport, setSocialSupport] = useState('');
  const [result, setResult] = useState<{ level: string; score: number; recommendation: string; cta: boolean } | null>(null);

  const symptomOptions = [
    { value: '0', label: 'None' },
    { value: '2', label: 'Headaches' },
    { value: '2', label: 'Tension' },
    { value: '3', label: 'Fatigue' },
    { value: '3', label: 'Irritability' },
  ];

  const toggleSymptom = (value: string, label: string) => {
    const key = `${value}:${label}`;
    setSymptoms((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const calculateStress = () => {
    const eventsNum = parseInt(events) || 0;
    const symptomsScore = symptoms.reduce((total, s) => total + parseInt(s.split(':')[0]), 0);
    const workHoursNum = parseInt(workHours) || 0;
    const emotionalNum = parseInt(emotionalState) || 5;
    const socialNum = parseInt(socialSupport) || 5;

    const score =
      eventsNum * 2 +
      symptomsScore +
      (workHoursNum > 8 ? (workHoursNum - 8) * 3 : 0) +
      (10 - emotionalNum) +
      (10 - socialNum);

    if (score < 15) {
      setResult({
        level: 'Low Stress',
        score,
        recommendation:
          'Your stress levels are manageable. Continue practising self-care and maintaining healthy boundaries. Hypnotherapy can be a great preventive tool to build resilience.',
        cta: false,
      });
    } else if (score < 25) {
      setResult({
        level: 'Moderate Stress',
        score,
        recommendation:
          'You are experiencing noticeable stress. Relaxation techniques like hypnotherapy, meditation, and breathwork can make a significant difference. Consider speaking with a hypnotherapist to develop personalised coping strategies.',
        cta: true,
      });
    } else {
      setResult({
        level: 'High Stress',
        score,
        recommendation:
          'Your stress levels are elevated and may be affecting your health and wellbeing. Speaking with a qualified hypnotherapist can help you address the root causes and develop effective relief strategies.',
        cta: true,
      });
    }
  };

  const levelColor = (level: string) => {
    if (level === 'Low Stress') return 'text-green-700';
    if (level === 'Moderate Stress') return 'text-amber-600';
    return 'text-red-600';
  };

  const levelBg = (level: string) => {
    if (level === 'Low Stress') return 'bg-green-50 border-green-200';
    if (level === 'Moderate Stress') return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const levelIcon = (level: string) => {
    if (level === 'Low Stress') return <CheckCircle className="h-7 w-7 text-green-600" />;
    if (level === 'Moderate Stress') return <Activity className="h-7 w-7 text-amber-500" />;
    return <AlertTriangle className="h-7 w-7 text-red-500" />;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">

        {/* Q1 */}
        <div className="mb-8">
          <label className="block text-gray-800 font-semibold mb-2">
            1. How many stressful events have you experienced in the past month?
          </label>
          <input
            type="number"
            min="0"
            value={events}
            onChange={(e) => setEvents(e.target.value)}
            placeholder="e.g. 3"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Q2 */}
        <div className="mb-8">
          <label className="block text-gray-800 font-semibold mb-3">
            2. Which physical symptoms are you currently experiencing?
          </label>
          <div className="flex flex-wrap gap-3">
            {symptomOptions.map((opt) => {
              const key = `${opt.value}:${opt.label}`;
              const selected = symptoms.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSymptom(opt.value, opt.label)}
                  className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition-all ${
                    selected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-400'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q3 */}
        <div className="mb-8">
          <label className="block text-gray-800 font-semibold mb-2">
            3. How many hours per day do you spend on work-related tasks?
          </label>
          <input
            type="number"
            min="0"
            max="24"
            value={workHours}
            onChange={(e) => setWorkHours(e.target.value)}
            placeholder="e.g. 9"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Q4 */}
        <div className="mb-8">
          <label className="block text-gray-800 font-semibold mb-2">
            4. Rate your current emotional state (1 = very low, 10 = excellent)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={emotionalState || 5}
              onChange={(e) => setEmotionalState(e.target.value)}
              className="flex-1 accent-indigo-600"
            />
            <span className="text-sm text-gray-500">10</span>
            <span className="w-8 text-center font-bold text-indigo-700">{emotionalState || 5}</span>
          </div>
        </div>

        {/* Q5 */}
        <div className="mb-10">
          <label className="block text-gray-800 font-semibold mb-2">
            5. Rate your level of social support (1 = very little, 10 = strong network)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={socialSupport || 5}
              onChange={(e) => setSocialSupport(e.target.value)}
              className="flex-1 accent-indigo-600"
            />
            <span className="text-sm text-gray-500">10</span>
            <span className="w-8 text-center font-bold text-indigo-700">{socialSupport || 5}</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={calculateStress}
          className="w-full bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all"
        >
          Calculate My Stress Level
        </Button>

        {/* Result */}
        {result && (
          <div className={`mt-8 p-6 rounded-2xl border-2 ${levelBg(result.level)}`}>
            <div className="flex items-center gap-3 mb-3">
              {levelIcon(result.level)}
              <h2 className={`text-2xl font-extrabold ${levelColor(result.level)}`}>
                {result.level}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-5">{result.recommendation}</p>
            {result.cta && (
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist Near You →</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6 px-4">
        This tool is for informational purposes only and is not a clinical diagnosis. If you are in distress, please contact a qualified healthcare professional.
      </p>
    </div>
  );
}
