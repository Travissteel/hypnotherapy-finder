import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Wind, Heart, CheckCircle, Search, Ban, TrendingUp } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Quit Smoking Hypnotherapy | Stop Smoking',
  description: 'Quit smoking hypnotherapy helps you become smoke-free. Find certified specialists in smoking cessation.',
  keywords: 'quit smoking hypnotherapy, stop smoking hypnosis, smoking cessation hypnotherapy, hypnosis to quit smoking, quit cigarettes hypnotherapy',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/quit-smoking-hypnotherapy',
  },
  openGraph: {
    title: 'Quit Smoking with Hypnotherapy - Natural Smoking Cessation',
    description: 'Stop smoking for good with hypnotherapy. Find qualified practitioners specializing in smoking cessation.',
    url: 'https://hypnotherapy-finder.com/quit-smoking-hypnotherapy',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Quit Smoking Hypnotherapy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quit Smoking with Hypnotherapy - Natural Smoking Cessation',
    description: 'Stop smoking for good with hypnotherapy. Find qualified practitioners specializing in smoking cessation.',
    images: ['/logo.png'],
  },
};

export default async function QuitSmokingHypnotherapyPage() {
  const allPractitioners = getAllPractitioners();

  const smokingCessationSpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('smoking'))
  ).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Quit Smoking Hypnotherapy - Stop Smoking Permanently',
    description: 'Comprehensive guide to quit smoking hypnotherapy. Learn how hypnotherapy helps break nicotine addiction and achieve lasting smoking cessation. Find certified smoking cessation hypnotherapists.',
    mainEntity: {
      '@type': 'MedicalCondition',
      name: 'Nicotine Addiction',
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'Quit Smoking Hypnotherapy',
        description: 'Evidence-based hypnotherapy techniques for smoking cessation, addressing nicotine cravings, behavioral triggers, and long-term relapse prevention.',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does quit smoking hypnotherapy really work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research shows quit smoking hypnotherapy is one of the most effective methods for smoking cessation. Studies indicate that hypnotherapy can be more effective than nicotine replacement therapy or willpower alone. It works by addressing both the physical addiction and psychological dependence on cigarettes, helping to break the habit permanently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many sessions does it take to quit smoking with hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many people quit smoking in just 1-3 sessions of hypnotherapy, though some may benefit from additional sessions for reinforcement. The exact number depends on how long you\'ve smoked, how heavily you smoke, and your individual response to treatment. Your hypnotherapist will create a personalized quit smoking plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens during a quit smoking hypnotherapy session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'During quit smoking hypnotherapy, your practitioner guides you into a relaxed, focused state. They use suggestion techniques to help you break associations between smoking and daily activities, reduce cravings, strengthen your resolve to quit, and reinforce your identity as a non-smoker. Sessions typically last 60-90 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I gain weight after quitting smoking with hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quit smoking hypnotherapy often includes suggestions to prevent weight gain after quitting. Hypnotherapists can address concerns about eating habits, metabolism, and healthy alternatives to smoking. Many people find that hypnotherapy helps them quit smoking without significant weight gain.',
        },
      },
      {
        '@type': 'Question',
        name: 'How effective is quit smoking hypnotherapy compared to other methods?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Studies suggest quit smoking hypnotherapy has higher success rates than many other cessation methods. Research shows hypnotherapy can be 2-3 times more effective than nicotine replacement therapy alone. It addresses both the physical addiction and psychological aspects of smoking, making it a comprehensive solution for permanent smoking cessation.',
        },
      },
    ],
  };

  const numBox: React.CSSProperties = { width: 40, height: 40, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)' };
  const iconBg: React.CSSProperties = { width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' };

  return (
    <>
      <Script id="schema-medical" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', background: 'oklch(0.72 0.12 185 / 0.15)', color: 'var(--hf-accent)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Smoking Cessation
              </span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Quit Smoking Hypnotherapy — Stop Smoking for Good
              </h1>
              <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 620, margin: '0 auto 36px' }}>
                Ready to quit smoking? Quit smoking hypnotherapy offers one of the most effective ways to become
                smoke-free. Find certified smoking cessation hypnotherapists near you.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=smoking" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Smoking Cessation Specialists
                </Link>
                <Link href="#how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How It Works
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image
                  src="/quit-smoking-hypnotherapy.png"
                  alt="Quit smoking hypnotherapy session with professional hypnotherapist helping client break nicotine addiction and become smoke-free for good"
                  fill
                  className="object-contain"
                  style={{ padding: 16 }}
                  priority
                />
              </div>
            </div>
          </section>

          {/* What is Quit Smoking Hypnotherapy */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 24 }}>What is Quit Smoking Hypnotherapy?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--hf-fg)' }}>Quit smoking hypnotherapy</strong> is a proven therapeutic approach that uses hypnosis to help
                  smokers overcome nicotine addiction and break free from cigarettes. Unlike willpower alone or nicotine
                  replacement therapy, quit smoking hypnotherapy addresses both the physical addiction and the psychological
                  habits that keep you smoking.
                </p>
                <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                  During quit smoking hypnotherapy sessions, a certified hypnotherapist guides you into a deeply relaxed
                  state where your subconscious mind becomes receptive to positive suggestions about being smoke-free.
                  This makes quit smoking hypnotherapy particularly effective because smoking is largely a subconscious
                  habit — your conscious mind may want to quit, but your subconscious drives the urge to smoke.
                </p>
                <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                  Research supports quit smoking hypnotherapy as an effective cessation method. A meta-analysis in the
                  International Journal of Clinical and Experimental Hypnosis found that hypnosis to quit smoking showed
                  higher success rates than unassisted quitting and was comparable to or better than nicotine replacement
                  therapy. Many people successfully quit smoking after just one to three quit smoking hypnotherapy sessions.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 48 }}>Benefits of Quit Smoking Hypnotherapy</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {[
                  { icon: <Ban style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'No Nicotine Replacement', body: 'Quit smoking hypnotherapy works without patches, gum, or medication — just natural, effective behavioral change.' },
                  { icon: <TrendingUp style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'High Success Rate', body: 'Studies show quit smoking hypnotherapy has success rates significantly higher than willpower alone or nicotine replacement.' },
                  { icon: <Wind style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'Reduces Cravings', body: 'Hypnosis to quit smoking significantly reduces or eliminates cravings by changing your subconscious association with cigarettes.' },
                  { icon: <CheckCircle style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'Fast Results', body: 'Many people quit smoking after just one quit smoking hypnotherapy session, with some programs offering 1-3 session packages.' },
                  { icon: <Heart style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'Addresses Root Causes', body: 'Quit smoking hypnotherapy identifies and resolves psychological triggers that cause smoking, not just the physical addiction.' },
                  { icon: <Ban style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />, title: 'No Weight Gain', body: 'Smoking cessation hypnotherapy can include suggestions to maintain healthy eating and prevent post-quitting weight gain.' },
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                    <div style={iconBg}>{item.icon}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>How Quit Smoking Hypnotherapy Works</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'Pre-Session Assessment', body: 'Your quit smoking hypnotherapy begins with understanding your smoking habits, triggers, and reasons for wanting to quit. The hypnotherapist learns when you smoke, why you smoke, and what\'s prevented you from quitting before. This information customizes your treatment.' },
                  { title: 'Deep Relaxation Induction', body: 'The hypnotherapist guides you into a deeply relaxed, focused state through breathing exercises and verbal cues. This hypnotic state allows your subconscious mind to become more receptive to quit smoking suggestions. You remain fully aware and in control.' },
                  { title: 'Reframing Smoking Associations', body: 'During quit smoking hypnotherapy, the practitioner introduces suggestions that change how your subconscious perceives cigarettes. Smoking becomes associated with negative feelings rather than relaxation or pleasure. This reframing makes quitting easier and more natural.' },
                  { title: 'Reinforcing Non-Smoker Identity', body: 'Hypnosis to quit smoking helps you visualize yourself as a non-smoker. You imagine your life smoke-free, breathing easily, feeling healthier, and being proud of your achievement. This creates a powerful mental blueprint that your subconscious follows.' },
                  { title: 'Breaking Trigger Patterns', body: 'Quit smoking hypnotherapy addresses specific triggers like stress, coffee, alcohol, or social situations. The hypnotherapist provides alternative coping mechanisms and breaks the automatic trigger-smoke response pattern that keeps you addicted.' },
                  { title: 'Post-Hypnotic Suggestions', body: 'The hypnotherapist embeds post-hypnotic suggestions that continue working after the session ends. These ensure cravings remain minimal, withdrawal symptoms are manageable, and you maintain your commitment to being smoke-free.' },
                ].map((step, i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={numBox}>{i + 1}</div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{step.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Effective */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Why Quit Smoking Hypnotherapy is So Effective</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 40, lineHeight: 1.7 }}>
                Understanding why quit smoking hypnotherapy works requires knowing why smoking is so hard to quit.
                Smoking isn't just physical addiction — it's deeply psychological. Quit smoking hypnotherapy addresses all aspects of the addiction.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
                {[
                  {
                    title: 'Breaks the Habit Loop',
                    body: 'Smoking is a habit driven by cue-routine-reward loops. Quit smoking hypnotherapy rewrites these loops at a subconscious level, eliminating the automatic response to smoke when triggers appear.',
                    bullets: ['Identifies your smoking triggers', 'Breaks automatic smoking responses', 'Creates new, healthy habits'],
                  },
                  {
                    title: 'Changes Emotional Associations',
                    body: 'Many smokers use cigarettes to manage stress, boredom, or anxiety. Smoking cessation hypnotherapy helps you develop healthier coping mechanisms and removes the emotional dependency on smoking.',
                    bullets: ['Addresses emotional smoking triggers', 'Provides alternative stress management', 'Breaks emotional dependence'],
                  },
                  {
                    title: 'Reduces Withdrawal Symptoms',
                    body: 'Hypnosis to quit smoking includes suggestions to minimize withdrawal symptoms like irritability, anxiety, and intense cravings. This makes the quitting process much more comfortable than going cold turkey.',
                    bullets: ['Minimizes physical withdrawal', 'Reduces craving intensity', 'Maintains calm and focus'],
                  },
                  {
                    title: 'Strengthens Willpower and Motivation',
                    body: 'Quit smoking hypnotherapy reinforces your reasons for quitting and strengthens your commitment. You become deeply motivated to remain smoke-free, making relapse much less likely.',
                    bullets: ['Amplifies motivation to quit', 'Strengthens commitment daily', 'Prevents relapse temptation'],
                  },
                ].map((card, i) => (
                  <div key={i} className="glass-card" style={{ padding: '28px 24px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 16 }}>{card.body}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {card.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 14, height: 14, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Find Specialists */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>
                Find Quit Smoking Hypnotherapy Specialists Near You
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
                Connect with certified hypnotherapists who specialize in smoking cessation. Each practitioner has experience helping smokers quit for good.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
                {smokingCessationSpecialists.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    {practitioner.credentials && (
                      <p style={{ fontSize: 13, color: 'var(--hf-accent)', marginBottom: 8 }}>{practitioner.credentials}</p>
                    )}
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 12 }}>{practitioner.city}, {practitioner.state}</p>
                    {practitioner.specialties.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--hf-fg-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Specialties</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {practitioner.specialties.slice(0, 3).map((specialty, idx) => (
                            <span key={idx} style={{ fontSize: 11, background: 'oklch(0.72 0.12 185 / 0.12)', color: 'var(--hf-accent)', padding: '3px 8px', borderRadius: 6 }}>
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link href={`/practitioner/${practitioner.slug}`} className="btn-gradient hf-btn-accent" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/search?specialty=smoking" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  View All Smoking Cessation Specialists
                </Link>
              </div>
            </div>
          </section>

          {/* What to Expect */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>What to Expect from Quit Smoking Hypnotherapy</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  {
                    title: 'During Your Session',
                    body: 'Quit smoking hypnotherapy sessions typically last 60-90 minutes. You\'ll be seated or reclined comfortably as the hypnotherapist guides you into a relaxed state. Most people describe the experience as pleasant and deeply calming.',
                    bullets: ['You remain fully conscious and aware', 'You cannot be made to do anything against your will', 'Most people feel relaxed and refreshed afterward'],
                  },
                  {
                    title: 'After Your Session',
                    body: 'Many people find they have no desire to smoke immediately after their first quit smoking hypnotherapy session. For others, the urge to smoke gradually diminishes over a few days.',
                    bullets: ['Significantly reduced or eliminated cravings', 'Minimal withdrawal symptoms', 'Strong motivation to remain smoke-free', 'Cigarettes may seem unappealing or disgusting'],
                  },
                ].map((card, i) => (
                  <div key={i} className="glass-card" style={{ padding: '28px 24px', borderLeft: '3px solid var(--hf-accent)' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 16 }}>{card.body}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {card.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 16, height: 16, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can anyone quit smoking with hypnotherapy?', a: 'Quit smoking hypnotherapy works best for people who are genuinely motivated to quit. While nearly everyone can benefit from hypnosis, you must actually want to stop smoking for it to be effective. If you\'re being pressured by others but aren\'t personally committed, results may be limited. The good news is that if you truly want to quit, hypnosis is one of the most effective methods available.' },
                  { q: 'How many sessions does it take to quit smoking?', a: 'Many people quit smoking after just one quit smoking hypnotherapy session. Some hypnotherapists offer single-session intensive programs (2-3 hours), while others recommend 2-3 sessions for reinforcement. If you\'ve been a heavy smoker for many years, you might benefit from additional follow-up sessions to ensure long-term success.' },
                  { q: 'Will I experience withdrawal symptoms?', a: 'Quit smoking hypnotherapy significantly reduces withdrawal symptoms for most people. While you may experience some mild physical symptoms as nicotine leaves your body, the psychological cravings and irritability are usually minimal. Many clients report being surprised at how easy quitting was with hypnosis compared to previous attempts.' },
                  { q: "What's the success rate of quit smoking hypnotherapy?", a: 'Studies show quit smoking hypnotherapy has success rates ranging from 50-80%, significantly higher than the 5-7% success rate of quitting cold turkey. Success depends on factors like your motivation level, the hypnotherapist\'s skill, and whether you follow through with post-session recommendations. Many practitioners offer satisfaction guarantees or free follow-up sessions.' },
                  { q: 'Will I gain weight after quitting smoking with hypnotherapy?', a: 'One advantage of quit smoking hypnotherapy is that it can include suggestions to prevent weight gain. The hypnotherapist can address concerns about substituting food for cigarettes and help you maintain healthy eating habits. Many people maintain their weight or even lose weight after quitting with hypnosis.' },
                  { q: 'How much does quit smoking hypnotherapy cost?', a: 'Smoking cessation hypnotherapy typically costs $150-$500 per session, with some practitioners offering package deals. While this may seem expensive, consider that a pack-a-day smoker spends over $2,500 per year on cigarettes. Quit smoking hypnotherapy pays for itself within weeks and may be covered by some health insurance plans.' },
                ].map((faq, i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{faq.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {[
                  { href: '/weight-loss-hypnotherapy', title: 'Weight Loss Hypnotherapy', desc: 'Achieve sustainable weight management through hypnotherapy' },
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Manage stress and anxiety with proven techniques' },
                  { href: '/does-hypnotherapy-work', title: 'Does Hypnotherapy Work?', desc: 'Learn about the research and effectiveness of hypnotherapy' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Quit Smoking for Good?</h2>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
                Take the first step toward a smoke-free life. Find a certified quit smoking hypnotherapist near you today.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=smoking" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Smoking Cessation Hypnotherapists
                </Link>
                <Link href="/hypnotherapy-near-me" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Browse All Hypnotherapists
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
