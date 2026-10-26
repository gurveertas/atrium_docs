import { ArrowRight, ArrowDown, Terminal, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section id="overview" className="pt-6 pb-14 border-b border-stone-200">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 text-xs font-semibold text-stone-700 shadow-sm mb-6">
        <Sparkles className="h-3.5 w-3.5 text-stone-500" />
        <span>Elysium Attribution SDK · Production Ready</span>
      </div>

      {/* Main Headline (Minimalist Solid Colors, No Gradients) */}
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12] max-w-4xl">
        Understand Which Marketing Channels Drive Your True Revenue.
      </h1>

      {/* Supporting Text */}
      <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
        Connect advertising ad clicks, multi-touch journeys, and payment gateway sessions directly to the Elysium Attribution Engine. Automatically captures UTMs, click IDs, ad cookies, and freezes checkout snapshots across 6 multi-touch models.
      </p>

      {/* CTA Buttons - Solid Colors */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#quickstart"
          className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800 active:scale-95"
        >
          <span>Get Started in 2 Minutes</span>
          <ArrowRight className="h-4 w-4" />
        </a>

        <a
          href="#simulator"
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 active:scale-95"
        >
          <Terminal className="h-4 w-4 text-stone-600" />
          <span>Live Interactive Sandbox</span>
        </a>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-stone-700">
        <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-stone-800 shrink-0" />
          <span>6 Multi-Touch Models</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-stone-800 shrink-0" />
          <span>Secret Key Protection</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
          <Activity className="h-4 w-4 text-stone-800 shrink-0" />
          <span>30m Session De-duplication</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
          <Zap className="h-4 w-4 text-stone-800 shrink-0" />
          <span>Stripe, PayPal, Razorpay</span>
        </div>
      </div>

      {/* Attribution Lifecycle Flow Cards - Sleek Spacious Pipeline with Arrows */}
      <div id="how-it-works" className="mt-14 scroll-mt-24">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              <span>End-to-End Pipeline</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-stone-900 tracking-tight">
              The Attribution Waterfall Flow
            </h3>
            <p className="text-sm text-stone-600 mt-1">
              Follow how an anonymous ad click moves through identity resolution, payment freezing, and revenue credit:
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Real-time Event Stream</span>
          </div>
        </div>

        {/* Phase 1: Ingestion & Identity (Row 1) */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative">
            {/* Step 1 */}
            <div className="group relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold">
                    01
                  </div>
                  <span className="font-heading text-sm font-bold text-stone-900">
                    Ad Click & Touch Capture
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                  POST /v1/touches
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Captures incoming UTM parameters, ad click IDs (<code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">gclid</code>, <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">fbclid</code>, <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">ttclid</code>), organic referrers, and syncs the persistent UUID.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>Deduplicated in 30m rolling session</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold">
                    02
                  </div>
                  <span className="font-heading text-sm font-bold text-stone-900">
                    Identity Resolution
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                  POST /v1/identify
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                When a visitor submits an email, logs in, or enters phone details, past anonymous multi-device touches are stitched together into a single unified customer profile.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>SHA-256 salted contact hashing</span>
              </div>
            </div>
          </div>

          {/* Flow Connector 1 to 2 */}
          <div className="flex items-center justify-center py-0.5">
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 shadow-sm text-xs font-medium text-stone-600">
              <span>Checkout Initiated</span>
              <ArrowDown className="h-3.5 w-3.5 text-stone-500" />
            </div>
          </div>

          {/* Phase 2: Checkout & Gateway Handshake (Row 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative">
            {/* Step 3 */}
            <div className="group relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold">
                    03
                  </div>
                  <span className="font-heading text-sm font-bold text-stone-900">
                    Freeze Checkout Token
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                  POST /v1/checkout-sessions
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                When user clicks checkout, touch history is frozen into an immutable token (<code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">cs_sec_...</code>) so payment gateway sessions cannot be spoofed or altered.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>72-hour cryptographically signed token</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:border-stone-300 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-xs font-bold">
                    04
                  </div>
                  <span className="font-heading text-sm font-bold text-stone-900">
                    Gateway Hook & Direct Ingest
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700">
                  POST /v1/orders
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Payment webhook (Stripe, Razorpay, PayPal, Shopify) sends the token and order amount. Alternatively, your client-side confirmation page calls <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded">createOrder()</code> directly.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400"></span>
                <span>Idempotent transaction deduplication</span>
              </div>
            </div>
          </div>

          {/* Flow Connector 2 to 3 */}
          <div className="flex items-center justify-center py-0.5">
            <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1 shadow-sm text-xs font-medium text-stone-600">
              <span>Conversion Authenticated & Triggered</span>
              <ArrowDown className="h-3.5 w-3.5 text-stone-500" />
            </div>
          </div>

          {/* Phase 3: Grand Finale / Step 5 (Full Width Destination Card) */}
          <div className="group relative rounded-xl border border-stone-300 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white font-mono text-sm font-bold">
                  05
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-stone-900">
                    6-Model Multi-Touch Revenue Attribution
                  </h4>
                  <p className="text-xs text-stone-500">
                    Every transaction is calculated simultaneously across all 6 industry-standard attribution models:
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-900 text-white">
                Atomic Split Engine
              </span>
            </div>

            {/* 6 Models Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-stone-100">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">First Touch</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">100% to Acquisition</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">Last Touch</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">100% to Conversion</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">Linear</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Equal split (1/N)</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">U-Shaped</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">40% First / 40% Last</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">Time-Decay</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">7-day half-life</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-center">
                <span className="block text-[11px] font-bold text-stone-900">Last Non-Direct</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Filters direct type-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
