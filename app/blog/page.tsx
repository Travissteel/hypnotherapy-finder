import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Hypnotherapy Industry Insights & Data | Hypnotherapy Directory',
    description: 'Latest reports, trends, and market data for the hypnotherapy industry. Expert analysis on pricing, demographics, and clinical efficacy.',
    alternates: {
        canonical: 'https://hypnotherapy-finder.com/blog',
    },
};

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-blue-900 text-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry Insights & News</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Data-driven reports and analysis on the state of hypnotherapy in 2025.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <main className="flex-1 container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Card key={post.slug} className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-none shadow-md overflow-hidden h-full">
                            <div className="relative h-48 w-full bg-gray-200">
                                {/* Fallback or actual image if we had one in frontmatter */}
                                {post.image && (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                {!post.image && (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <span className="text-lg">No Image</span>
                                    </div>
                                )}
                            </div>

                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
                                    <span className="uppercase tracking-wider">{post.category}</span>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                                </Link>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readingTime}
                                    </div>
                                </div>
                                {post.summary && (
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {post.summary}
                                    </p>
                                )}
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-semibold text-sm flex items-center hover:translate-x-1 transition-transform">
                                    Read Report <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Coming soon...</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
