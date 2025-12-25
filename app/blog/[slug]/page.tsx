import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/blog/MDXComponents';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Hypnotherapy Directory`,
        description: post.summary || `Read about ${post.title}`,
        alternates: {
            canonical: `https://hypnotherapy-finder.com/blog/${slug}`,
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

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1 pt-24 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market Reports
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readingTime}
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-lg bg-gray-100">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl">
                        <MDXRemote source={post.content} components={MDXComponents} />
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="bg-blue-50 p-8 rounded-xl text-center">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Looking for a qualified hypnotherapist?</h3>
                            <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                                Browse our directory of verified professionals to find the right match for your needs.
                            </p>
                            <Link
                                href="/search"
                                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
