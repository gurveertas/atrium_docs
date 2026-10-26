import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, CreditCard, Sparkles, Compass } from 'lucide-react';

export default function Sidebar({ activeSection, onSelectSection }) {
  const [search, setSearch] = useState('');

  const navGroups = [
    {
      label: 'Getting Started',
      icon: Compass,
      items: [
        { id: 'overview', title: 'Introduction' },
        { id: 'how-it-works', title: 'Attribution Lifecycle' },
        { id: 'installation', title: 'Installation' },
        { id: 'quickstart', title: 'Quickstart Guide' },
        { id: 'security', title: 'Security & Key Types' },
      ],
    },
    {
      label: 'Core SDK Reference',
      icon: BookOpen,
      items: [
        { id: 'api-init', title: 'Elysium.init()' },
        { id: 'api-record-touch', title: 'Elysium.recordTouch()' },
        { id: 'api-identify', title: 'Elysium.identify()' },
        { id: 'api-checkout-token', title: 'Elysium.getCheckoutToken()' },
        { id: 'api-create-order', title: 'Elysium.createOrder()' },
        { id: 'api-create-booking', title: 'Elysium.createBooking()' },
        { id: 'api-visitor', title: 'Elysium.getVisitorId()' },
      ],
    },
    {
      label: 'Gateway Integrations',
      icon: CreditCard,
      items: [
        { id: 'gw-stripe', title: 'Stripe Adapter' },
        { id: 'gw-razorpay', title: 'Razorpay Adapter' },
        { id: 'gw-paypal', title: 'PayPal Adapter' },
        { id: 'gw-shopify', title: 'Shopify Adapter' },
        { id: 'gw-woocommerce', title: 'WooCommerce Adapter' },
        { id: 'gw-zenoti', title: 'Zenoti Adapter' },
      ],
    },
    {
      label: 'Interactive Sandbox',
      icon: Sparkles,
      items: [
        { id: 'simulator', title: 'Live Attribution Simulator' },
      ],
    },
  ];

  const filteredGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      group.label.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-40 w-72 overflow-y-auto border-r border-stone-200 bg-[#FAF8F5] p-5 hidden lg:block">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter docs..."
          className="w-full rounded-lg border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-stone-400 focus:ring-1 focus:ring-stone-400 shadow-sm"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-2 text-[10px] text-stone-400 hover:text-stone-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Nav Groups */}
      <div className="space-y-6">
        {filteredGroups.map((group, idx) => {
          const GroupIcon = group.icon;
          return (
            <div key={idx}>
              <div className="mb-2 flex items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                <GroupIcon className="h-3.5 w-3.5 text-stone-500" />
                <span>{group.label}</span>
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => onSelectSection && onSelectSection(item.id)}
                        className={`group flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-stone-200/70 text-stone-900 border-l-2 border-stone-900 font-semibold pl-2'
                            : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        <ChevronRight className={`h-3 w-3 transition-transform ${isActive ? 'text-stone-900 translate-x-0.5' : 'text-stone-400 group-hover:text-stone-600'}`} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
