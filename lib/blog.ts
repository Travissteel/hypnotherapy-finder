import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
const publicDirectory = path.join(process.cwd(), 'public');
const DEFAULT_POST_IMAGE = '/therapy-session.png';

// Blog posts may reference header images that were never added to /public.
// Serving those paths returns a 400 from the Next image optimizer, so fall
// back to a real file whenever the referenced image doesn't exist on disk.
function resolvePostImage(image?: string): string {
    if (image && fs.existsSync(path.join(publicDirectory, image))) {
        return image;
    }
    return DEFAULT_POST_IMAGE;
}

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
            image: resolvePostImage(data.image),
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
            image: resolvePostImage(data.image),
            content,
        };
    } catch (err) {
        return null;
    }
}
