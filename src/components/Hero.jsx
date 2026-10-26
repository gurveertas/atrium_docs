import { ArrowRight, ArrowDown, Terminal, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section id="overview" className="pt-8 pb-16 border-b border-stone-200">
      {/* Badge with subtle hover lift */}
      <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold text-stone-700 shadow-sm mb-7 transition-transform duration-200 hover:scale-102 cursor-default">
        <Sparkles className="h-3.5 w-3.5 text-stone-500 animate-pulse-subtle" />
        <span>Elysium Attribution SDK · Production Ready</span>
      </div>

      {/* Main Headline - Unique Editorial Display Font */}
      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-stone-900 leading-[1.08] max-w-4xl">
        Understand Which Marketing Channels Drive Your <span className="italic font-normal">True Revenue</span>.
      </h1>

      {/* Supporting Text */}
      <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
        Connect advertising ad clicks, multi-touch journeys, and payment gateway sessions directly to the Elysium Attribution Engine. Automatically captures UTMs, click IDs, ad cookies, and freezes checkout snapshots across 6 multi-touch models.
      </p>

      {/* CTA Buttons with micro-interaction hover transforms */}
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a
          href="#quickstart"
          className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <span>Get Started in 2 Minutes</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>

        <a
          href="#simulator"
          className="group inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-7 py-3.5 text-sm font-semibold text-stone-800 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <Terminal className="h-4 w-4 text-stone-600 transition-transform duration-200 group-hover:scale-110" />
          <span>Live Interactive Sandbox</span>
        </a>
      </div>

      {/* Feature Highlights Grid - Micro-Interactions on hover */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 text-xs font-medium text-stone-700">
        <div className="group flex items-center gap-3.5 rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-800 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
            <CheckCircle2 className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-stone-900 text-[13px]">6 Multi-Touch Models</span>
        </div>

        <div className="group flex items-center gap-3.5 rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-800 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-stone-900 text-[13px]">Secret Key Protection</span>
        </div>

        <div className="group flex items-center gap-3.5 rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-800 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
            <Activity className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-stone-900 text-[13px]">30m Deduplication</span>
        </div>

        <div className="group flex items-center gap-3.5 rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-800 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
            <Zap className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-stone-900 text-[13px]">Gateway Adapters</span>
        </div>
      </div>

      {/* Attribution Lifecycle Flow Cards - Sleek Spacious Pipeline with Arrows */}
      <div id="how-it-works" className="mt-16 scroll-mt-24">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              <span>End-to-End Pipeline</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              The Attribution Waterfall Flow
            </h3>
            <p className="text-sm text-stone-600 mt-1.5 max-w-2xl">
              Follow how an anonymous ad click moves through identity resolution, payment freezing, and revenue credit:
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Real-time Event Stream</span>
          </div>
        </div>

        {/* Phase 1: Ingestion & Identity (Row 1) */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch relative">
            {/* Step 1 */}
            <div className="group relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold shadow-xs transition-transform duration-200 group-hover:scale-110">
                    01
                  </div>
                  <span className="font-heading text-base font-bold text-stone-900 group-hover:text-stone-950 transition-colors">
                    Ad Click & Touch Capture
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 transition-colors group-hover:border-stone-300">
                  POST /v1/touches
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
                Captures incoming UTM parameters, ad click IDs (<code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">gclid</code>, <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">fbclid</code>, <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">ttclid</code>), organic referrers, and syncs the persistent UUID.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono pt-3 border-t border-stone-100">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>Deduplicated in 30m rolling session</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold shadow-xs transition-transform duration-200 group-hover:scale-110">
                    02
                  </div>
                  <span className="font-heading text-base font-bold text-stone-900 group-hover:text-stone-950 transition-colors">
                    Identity Resolution
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 transition-colors group-hover:border-stone-300">
                  POST /v1/identify
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
                When a visitor submits an email, logs in, or enters phone details, past anonymous multi-device touches are stitched together into a single unified customer profile.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono pt-3 border-t border-stone-100">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>SHA-256 salted contact hashing</span>
              </div>
            </div>
          </div>

          {/* Flow Connector 1 to 2 with bouncing arrow micro-interaction */}
          <div className="flex items-center justify-center py-1">
            <div className="group flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 shadow-xs text-xs font-medium text-stone-700 transition-all duration-200 hover:border-stone-300 hover:shadow-sm">
              <span>Checkout Initiated</span>
              <ArrowDown className="h-3.5 w-3.5 text-stone-500 animate-bounce-subtle" />
            </div>
          </div>

          {/* Phase 2: Checkout & Gateway Handshake (Row 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch relative">
            {/* Step 3 */}
            <div className="group relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold shadow-xs transition-transform duration-200 group-hover:scale-110">
                    03
                  </div>
                  <span className="font-heading text-base font-bold text-stone-900 group-hover:text-stone-950 transition-colors">
                    Freeze Checkout Token
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 transition-colors group-hover:border-stone-300">
                  POST /v1/checkout-sessions
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
                When user clicks checkout, touch history is frozen into an immutable token (<code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">cs_sec_...</code>) so payment gateway sessions cannot be spoofed or altered.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono pt-3 border-t border-stone-100">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>72-hour cryptographically signed token</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold shadow-xs transition-transform duration-200 group-hover:scale-110">
                    04
                  </div>
                  <span className="font-heading text-base font-bold text-stone-900 group-hover:text-stone-950 transition-colors">
                    Gateway Hook & Ingest
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 transition-colors group-hover:border-stone-300">
                  POST /v1/orders
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
                Payment webhook (Stripe, Razorpay, PayPal, Shopify) sends the token and order amount. Alternatively, your client-side confirmation page calls <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">createOrder()</code> directly.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono pt-3 border-t border-stone-100">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>Idempotent transaction deduplication</span>
              </div>
            </div>
          </div>

          {/* Flow Connector 2 to 3 with bouncing arrow micro-interaction */}
          <div className="flex items-center justify-center py-1">
            <div className="group flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-4 py-1.5 shadow-xs text-xs font-medium text-stone-700 transition-all duration-200 hover:border-stone-300 hover:shadow-sm">
              <span>Conversion Authenticated & Triggered</span>
              <ArrowDown className="h-3.5 w-3.5 text-stone-500 animate-bounce-subtle" />
            </div>
          </div>

          {/* Phase 3: Grand Finale / Step 5 (Full Width Destination Card) */}
          <div className="group relative rounded-2xl border border-stone-300 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-stone-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white font-mono text-sm font-bold shadow-xs transition-transform duration-200 group-hover:scale-110">
                  05
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-stone-900">
                    6-Model Multi-Touch Revenue Attribution
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Every transaction is calculated simultaneously across all 6 industry-standard attribution models:
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto font-mono text-[11px] font-semibold px-3 py-1.5 rounded-md bg-stone-900 text-white shadow-xs">
                Atomic Split Engine
              </span>
            </div>

            {/* 6 Models Pill Grid with lift on hover */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4 border-t border-stone-100">
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">First Touch</span>
                <span className="block text-[11px] text-stone-500 mt-1">100% to Acquisition</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">Last Touch</span>
                <span className="block text-[11px] text-stone-500 mt-1">100% to Conversion</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">Linear</span>
                <span className="block text-[11px] text-stone-500 mt-1">Equal split (1/N)</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">U-Shaped</span>
                <span className="block text-[11px] text-stone-500 mt-1">40% First / 40% Last</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">Time-Decay</span>
                <span className="block text-[11px] text-stone-500 mt-1">7-day half-life</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:border-stone-300 hover:shadow-xs cursor-default">
                <span className="block text-xs font-bold text-stone-900">Last Non-Direct</span>
                <span className="block text-[11px] text-stone-500 mt-1">Filters direct type-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
