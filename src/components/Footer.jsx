import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-[#FAF8F5] pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-200">
          {/* Brand: Logo removed, only typography font kept */}
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-lg text-stone-900">Elysium</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-stone-600">
            <a href="#overview" className="hover:text-stone-900 transition-colors">Overview</a>
            <a href="#installation" className="hover:text-stone-900 transition-colors">Installation</a>
            <a href="#api-reference" className="hover:text-stone-900 transition-colors">API Reference</a>
            <a href="#gateways" className="hover:text-stone-900 transition-colors">Gateways</a>
            <a href="#simulator" className="hover:text-stone-900 transition-colors">Simulator</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-all shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Elysium Attribution Platform. Built for high-growth e-commerce & SaaS.</p>
          <p>Released under ISC License · Production Verified</p>
        </div>
      </div>
    </footer>
  );
}
