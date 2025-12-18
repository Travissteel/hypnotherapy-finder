import Image from 'next/image';
import Link from 'next/link';

export const MDXComponents = {
    h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
    p: (props: any) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700" {...props} />,
    li: (props: any) => <li className="" {...props} />,
    a: (props: any) => (
        <Link className="text-blue-600 hover:underline font-medium" {...props}>
            {props.children}
        </Link>
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 text-gray-700 italic rounded-r" {...props} />
    ),
    img: (props: any) => (
        <div className="my-8 relative rounded-lg overflow-hidden shadow-md">
            <Image
                src={props.src}
                alt={props.alt || ''}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px', objectFit: 'contain', backgroundColor: '#f8fafc' }}
            />
            {props.title && <p className="text-center text-sm text-gray-500 mt-2 italic">{props.title}</p>}
        </div>
    ),
    // Add a specific component for full-width images if needed
    Image: (props: any) => (
        <div className="my-8 relative rounded-lg overflow-hidden shadow-md">
            <Image
                {...props}
                className="w-full h-auto"
                style={{ maxHeight: '500px', objectFit: 'contain', backgroundColor: '#f8fafc' }}
            />
        </div>
    ),
};
