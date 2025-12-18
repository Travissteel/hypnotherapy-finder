import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    category: string;
    readingTime: string;
    summary?: string;
    content: string;
    image?: string;
}

export function getAllPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Combine the data with the slug
        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            category: data.category || 'General',
            readingTime: data.readingTime || '5 min read',
            summary: data.summary || '',
            image: data.image || '/blog/images/placeholder.jpg',
            content,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            category: data.category || 'General',
            readingTime: data.readingTime || '5 min read',
            summary: data.summary || '',
            image: data.image || '/blog/images/placeholder.jpg',
            content,
        };
    } catch (err) {
        return null;
    }
}
