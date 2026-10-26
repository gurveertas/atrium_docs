import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Installation from './components/Installation';
import Quickstart from './components/Quickstart';
import ApiReference from './components/ApiReference';
import Gateways from './components/Gateways';
import Simulator from './components/Simulator';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'how-it-works',
        'installation',
        'quickstart',
        'security',
        'api-init',
        'api-record-touch',
        'api-identify',
        'api-checkout-token',
        'api-create-order',
        'api-create-booking',
        'api-visitor',
        'gw-stripe',
        'gw-razorpay',
        'gw-paypal',
        'gw-square',
        'gw-shopify',
        'gw-woocommerce',
        'gw-zenoti',
        'simulator',
      ];

      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-300 selection:text-stone-900">
      {/* Top Navigation */}
      <Navbar onOpenSimulator={() => setActiveSection('simulator')} />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sticky Sidebar */}
          <Sidebar
            activeSection={activeSection}
            onSelectSection={(id) => setActiveSection(id)}
          />

          {/* Main Content Area */}
          <main className="min-w-0 flex-1 lg:pl-80 pt-4 pb-20">
            <Hero />
            <Installation />
            <Quickstart />
            <ApiReference />
            <Gateways />
            <Simulator />
          </main>
        </div>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
