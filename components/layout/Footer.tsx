import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hypnotherapy Finder</h3>
            <p className="text-sm">
              Connect with qualified hypnotherapy practitioners specializing in anxiety,
              weight loss, smoking cessation, and more.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Popular Searches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hypnotherapy-near-me" className="hover:text-white transition">
                  Hypnotherapy Near Me
                </Link>
              </li>
              <li>
                <Link href="/hypnotherapy-for-anxiety" className="hover:text-white transition">
                  Anxiety Hypnotherapy
                </Link>
              </li>
              <li>
                <Link href="/weight-loss-hypnotherapy" className="hover:text-white transition">
                  Weight Loss Hypnotherapy
                </Link>
              </li>
              <li>
                <Link href="/quit-smoking-hypnotherapy" className="hover:text-white transition">
                  Quit Smoking Hypnotherapy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/what-is-hypnotherapy" className="hover:text-white transition">
                  What is Hypnotherapy?
                </Link>
              </li>
              <li>
                <Link href="/does-hypnotherapy-work" className="hover:text-white transition">
                  Does Hypnotherapy Work?
                </Link>
              </li>
              <li>
                <Link href="/hypnotherapy-cost" className="hover:text-white transition">
                  Cost & Insurance
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; {currentYear} Hypnotherapy Finder. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <span className="text-sm">Follow us:</span>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61584471600142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/hypnotherapy-finder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/hypnotherapyfinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/Hypnofinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Follow us on X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
