import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Activity, Brain, HeartPulse, Users2, Repeat2, Zap, Waves, Flame, Heart, TreePine, Box, Leaf, Moon, Angry, Smile, Star, Link2, CloudRain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Mental Health Quizzes & Tests',
  description: 'Free online mental health quizzes and phobia tests. Check for anxiety, stress, PTSD, OCD, burnout, social anxiety, and specific phobias. All anonymous, results in minutes.',
  keywords: 'free mental health quiz, anxiety quiz, stress test, ptsd quiz, ocd test, phobia test, burnout quiz, social anxiety test, free psychological tests online',
  alternates: { canonical: 'https://hypnotherapy-finder.com/free-quizzes' },
  openGraph: {
    title: 'Free Mental Health Quizzes & Tests',
    description: 'Take our free online mental health quizzes covering anxiety, stress, PTSD, OCD, burnout, phobias and more. All anonymous.',
    url: 'https://hypnotherapy-finder.com/free-quizzes',
    type: 'website',
  },
};

const quizzes = [
  { href: '/depression-quiz', icon: CloudRain, hue: 250, title: 'Depression Quiz', desc: 'Check low mood, motivation, sleep, self-talk, and daily impact.', volume: 'high-intent searches/month' },
  { href: '/ocd-test', icon: Repeat2, hue: 20, title: 'OCD Test', desc: 'Check for obsessions, compulsions, and Pure O symptoms.', volume: '27k+ searches/month' },
  { href: '/social-anxiety-test', icon: Users2, hue: 300, title: 'Social Anxiety Test', desc: 'Do you have social anxiety disorder? Find out in 2 minutes.', volume: '5.7k searches/month' },
  { href: '/ptsd-quiz', icon: Brain, hue: 270, title: 'PTSD Quiz', desc: 'Check for PTSD and Complex PTSD symptoms.', volume: '4.1k searches/month' },
  { href: '/agoraphobia-test', icon: TreePine, hue: 160, title: 'Agoraphobia Test', desc: 'Do you fear open spaces, crowds, or public places?', volume: '800 searches/month' },
  { href: '/anxiety-quiz', icon: HeartPulse, hue: 185, title: 'Anxiety Quiz', desc: 'Do you have anxiety? Find out with 12 questions.', volume: '2.2k searches/month' },
  { href: '/burnout-quiz', icon: Flame, hue: 40, title: 'Burnout Quiz', desc: 'Are you burned out? Check for exhaustion and cynicism.', volume: '1.2k searches/month' },
  { href: '/caregiver-burnout-quiz', icon: Heart, hue: 350, title: 'Caregiver Burnout Quiz', desc: 'Are you burned out from caring for a loved one?', volume: '900 searches/month' },
  { href: '/thalassophobia-test', icon: Waves, hue: 200, title: 'Thalassophobia Test', desc: 'Fear of deep water or the ocean? Find out here.', volume: '2k searches/month' },
  { href: '/phobia-test', icon: Zap, hue: 280, title: 'Phobia Test', desc: 'Check 16 common phobias and rate their impact on your life.', volume: '2k searches/month' },
  { href: '/claustrophobia-test', icon: Box, hue: 220, title: 'Claustrophobia Test', desc: 'Fear of enclosed spaces, lifts, or tunnels?', volume: '150 searches/month' },
  { href: '/emetophobia-test', icon: Leaf, hue: 130, title: 'Emetophobia Test', desc: 'Fear of vomiting or nausea? Take the free test.', volume: '100 searches/month' },
  { href: '/anger-test', icon: Angry, hue: 10, title: 'Anger Test', desc: 'Do you have anger issues? Check across 6 dimensions including suppression and hostility.', volume: '7.2k searches/month' },
  { href: '/insomnia-test', icon: Moon, hue: 240, title: 'Insomnia Test', desc: 'Do you have insomnia? Check for sleep problems and their impact.', volume: '3.45k searches/month' },
  { href: '/self-esteem-test', icon: Star, hue: 60, title: 'Self-Esteem Test', desc: 'Do you have low self-esteem? Check across self-worth, criticism, and confidence.', volume: '1.45k searches/month' },
  { href: '/codependency-quiz', icon: Link2, hue: 210, title: 'Codependency Quiz', desc: 'Am I codependent? Check for caretaking, loss of self, and abandonment fears.', volume: '450 searches/month' },
  { href: '/people-pleaser-quiz', icon: Smile, hue: 320, title: 'People Pleaser Quiz', desc: 'Am I a people pleaser? Check for approval seeking and boundary issues.', volume: '150 searches/month' },
  { href: '/stress-level-calculator', icon: Activity, hue: 175, title: 'Stress Quiz', desc: 'How stressed are you? Get your personalised score.', volume: '520 searches/month' },
];

export default function FreeQuizzesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 320, height: 320, background: 'oklch(0.72 0.12 185)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 320, height: 320, background: 'oklch(0.72 0.12 285)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06 }} />
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free Tools</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Free Mental Health Quizzes & Tests
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Free, anonymous self-assessments covering anxiety, phobias, burnout, PTSD, OCD, and more. All tools are for guidance only — not clinical diagnoses.
            </p>
          </div>
        </section>

        {/* Quiz Grid */}
        <section style={{ padding: '56px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {quizzes.map((q) => (
                <Link key={q.href} href={q.href} className="glass-card hf-card-hover-3" style={{ display: 'block', padding: '28px', textDecoration: 'none' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: `oklch(0.72 0.18 ${q.hue} / 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <q.icon style={{ width: 26, height: 26, color: `oklch(0.75 0.18 ${q.hue})` }} />
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>{q.title}</h2>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 14, fontWeight: 300 }}>{q.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-accent)' }}>Take the free test →</span>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="glass-card" style={{ marginTop: 56, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, oklch(0.72 0.12 185 / 0.06) 0%, oklch(0.72 0.12 285 / 0.04) 100%)' }} />
              <div style={{ position: 'relative' }}>
                <h2 className="font-serif-display" style={{ fontSize: 28, color: 'var(--hf-fg)', marginBottom: 12 }}>Found Something Worth Addressing?</h2>
                <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.6 }}>
                  Connect with a certified hypnotherapist who specialises in exactly what you are dealing with.
                </p>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 9999, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                  Find a Hypnotherapist Near You →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
