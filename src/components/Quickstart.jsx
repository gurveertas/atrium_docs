import React, { useState } from 'react';
import MacPanel from './MacPanel';
import { Zap, ShieldAlert } from 'lucide-react';

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState('vanilla');

  const tabs = [
    { id: 'vanilla', label: 'Vanilla JS / ESM' },
    { id: 'next', label: 'Next.js (App Router)' },
    { id: 'react', label: 'React / Vite' },
    { id: 'vue', label: 'Vue / Nuxt' },
  ];

  const snippets = {
    vanilla: `import Elysium from 'elysium-attribution';

// 1. Initialize once in your app entry point
Elysium.init({
  apiKey: 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxx', // Publishable key
  apiBaseUrl: 'http://localhost:5000',         // Backend API Base URL
  autoTrack: true,                            // Automatically track pageviews & UTMs
});

// 2. Identify visitor on login, inquiry or checkout form
await Elysium.identify('alex@customer.com', '+14155552671');

// 3. Obtain frozen checkout token for payment metadata
const token = await Elysium.getCheckoutToken();
console.log('Attribution Token:', token); // "cs_sec_999abc123..."`,

    next: `// app/layout.jsx (Next.js 14+ App Router)
'use client';
import { useEffect } from 'react';
import Elysium from 'elysium-attribution';

export default function RootLayout({ children }) {
  useEffect(() => {
    Elysium.init({
      apiKey: process.env.NEXT_PUBLIC_ELYSIUM_KEY,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      autoTrack: true,
    });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,

    react: `// src/main.jsx or src/App.jsx (React + Vite)
import React, { useEffect } from 'react';
import Elysium from 'elysium-attribution';

export default function App() {
  useEffect(() => {
    Elysium.init({
      apiKey: import.meta.env.VITE_ELYSIUM_KEY,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
      autoTrack: true,
    });
  }, []);

  return <div>Your Storefront Content</div>;
}`,

    vue: `// plugins/elysium.client.js (Nuxt 3)
import Elysium from 'elysium-attribution';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  Elysium.init({
    apiKey: config.public.elysiumApiKey,
    apiBaseUrl: config.public.apiUrl,
    autoTrack: true,
  });
});`,
  };

  return (
    <section id="quickstart" className="pt-10 pb-8 border-b border-stone-200 scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-2">
        <Zap className="h-5 w-5 text-stone-700" />
        <h2 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
          Quickstart Guide
        </h2>
      </div>
      <p className="text-sm text-stone-600 max-w-2xl">
        Initialize Elysium once in your frontend entry file. Page views, advertising query parameters (<code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">utm_source</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">gclid</code>, <code className="text-stone-800 bg-stone-200/60 px-1 py-0.5 rounded font-mono text-xs">fbclid</code>), and persistent visitor IDs are tracked automatically.
      </p>

      {/* Code Panel */}
      <MacPanel
        title={activeTab === 'next' ? 'layout.jsx' : activeTab === 'vue' ? 'elysium.client.js' : 'app.js'}
        code={snippets[activeTab]}
        language="javascript"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Security Best Practices Callout - Minimalist Solid Amber */}
      <div id="security" className="mt-10 rounded-2xl border border-amber-300 bg-amber-50/70 p-6 sm:p-7 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="space-y-2 text-[13px] text-amber-950 leading-relaxed">
            <h4 className="font-heading text-base font-bold text-amber-950">
              Crucial Security Rule: Publishable vs Secret Keys
            </h4>
            <p>
              Only use a <strong className="text-stone-950">Publishable Key</strong> (prefix: <code className="font-mono bg-amber-200/80 border border-amber-300 text-amber-950 px-1.5 py-0.5 rounded">pk_live_...</code> or <code className="font-mono bg-amber-200/80 border border-amber-300 text-amber-950 px-1.5 py-0.5 rounded">pk_test_...</code>) on the client side.
            </p>
            <p>
              <strong className="text-stone-950">Secret keys</strong> (<code className="font-mono bg-amber-200/80 border border-amber-300 text-amber-950 px-1.5 py-0.5 rounded">sk_live_...</code>) are strictly for server-to-server calls (refunds, order updates, and report reads). The Elysium SDK automatically audits runtime config and strips secret keys to protect your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
