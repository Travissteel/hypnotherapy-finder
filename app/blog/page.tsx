import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Hypnotherapy Blog | Industry Insights',
  description: 'Latest reports, trends, and market data for the hypnotherapy industry. Expert analysis on pricing, demographics, and clinical efficacy.',
  alternates: { canonical: 'https://hypnotherapy-finder.com/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: 'var(--hf-bg-mid)', padding: '80px 24px 56px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Research & Insights</span>
          <h1 className="font-serif-display" style={{ fontSize: 'clamp(30px, 5vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
            Industry Insights & News
          </h1>
          <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
            Data-driven reports and analysis on the state of hypnotherapy.
          </p>
        </div>
      </section>

      <main style={{ flex: 1, padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {posts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {posts.map((post) => (
                <article key={post.slug} className="glass-card hf-card-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ height: 180, background: 'var(--hf-bg-mid)', position: 'relative', flexShrink: 0 }}>
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 10 }}>
                      {post.category}
                    </div>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--hf-fg)', lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.title}
                      </h2>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
                        <Calendar style={{ width: 11, height: 11 }} />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
                        <Clock style={{ width: 11, height: 11 }} />
                        {post.readingTime}
                      </span>
                    </div>
                    {post.summary && (
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginBottom: 16, flex: 1, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.summary}
                      </p>
                    )}
                    <Link href={`/blog/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: 'var(--hf-accent)', textDecoration: 'none', marginTop: 'auto' }}>
                      Read Report <ArrowRight style={{ width: 12, height: 12 }} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)' }}>Coming soon…</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
