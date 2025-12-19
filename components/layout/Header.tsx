import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
              <Image src="/logo.png" alt="Hypnotherapy Finder Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 tracking-tight">Hypnotherapy Finder</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-700 hover:text-teal-600 font-bold text-lg transition-colors">
              Find a Therapist
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-teal-600 font-bold text-lg transition-colors">
              How it Works
            </Link>
            <Link href="/what-is-hypnotherapy" className="text-gray-700 hover:text-teal-600 font-bold text-lg transition-colors">
              Resources
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-teal-600 font-bold text-lg transition-colors">
              Blog
            </Link>
            <Link href="/practitioner-signup" className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              For Practitioners
            </Link>
          </div>

          <div className="md:hidden">
            <Button asChild size="sm">
              <Link href="/search">Search</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
