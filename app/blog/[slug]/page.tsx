import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/blog/MDXComponents';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    const title = `${post.title} | Hypnotherapy Directory`;
    const description = post.summary || `Read about ${post.title}`;
    const image = post.image || 'https://hypnotherapy-finder.com/og-image.jpg';

    return {
        title,
        description,
        alternates: {
            canonical: `https://hypnotherapy-finder.com/blog/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://hypnotherapy-finder.com/blog/${slug}`,
            siteName: 'Hypnotherapy Finder',
            images: [{ url: image.startsWith('http') ? image : `https://hypnotherapy-finder.com${image}`, width: 1200, height: 630, alt: post.title }],
            type: 'article',
            publishedTime: post.date,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image.startsWith('http') ? image : `https://hypnotherapy-finder.com${image}`],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const image = post.image || 'https://hypnotherapy-finder.com/og-image.jpg';
    const absoluteImage = image.startsWith('http') ? image : `https://hypnotherapy-finder.com${image}`;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.summary || '',
        image: absoluteImage,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: 'Hypnotherapy Finder',
            url: 'https://hypnotherapy-finder.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Hypnotherapy Finder',
            url: 'https://hypnotherapy-finder.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://hypnotherapy-finder.com/og-image.jpg',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://hypnotherapy-finder.com/blog/${slug}`,
        },
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Header />

            <main style={{ flex: 1, paddingTop: 96, paddingBottom: 80 }}>
                <article style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                    {/* Back Link */}
                    <div style={{ marginBottom: 32 }}>
                        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--hf-fg-dim)', textDecoration: 'none', fontSize: 14 }}>
                            <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Market Reports
                        </Link>
                    </div>

                    {/* Header */}
                    <header style={{ marginBottom: 48, textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                            <span style={{ background: 'oklch(0.72 0.12 185 / 0.15)', color: 'var(--hf-accent)', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {post.category}
                            </span>
                        </div>

                        <h1 className="font-serif-display" style={{ fontSize: 'clamp(24px, 4vw, 40px)', color: 'var(--hf-fg)', lineHeight: 1.2, marginBottom: 24 }}>
                            {post.title}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, color: 'var(--hf-fg-dim)', fontSize: 13 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Calendar style={{ width: 14, height: 14 }} />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Clock style={{ width: 14, height: 14 }} />
                                {post.readingTime}
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div style={{ position: 'relative', width: '100%', height: 400, marginBottom: 48, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-contain"
                                style={{ padding: 16 }}
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose-dark">
                        <MDXRemote source={post.content} components={MDXComponents} />
                    </div>

                    {/* Footer CTA */}
                    <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Looking for a qualified hypnotherapist?</h3>
                            <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
                                Browse our directory of verified professionals to find the right match for your needs.
                            </p>
                            <Link
                                href="/search"
                                className="btn-gradient hf-btn-accent"
                                style={{ display: 'inline-block', padding: '12px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                            >
                                Search Directory
                            </Link>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
