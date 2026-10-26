import React from 'react';
import { ArrowRight, Terminal, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Hero() {
  const steps = [
    {
      step: '01',
      title: 'Ad Click & Touch',
      desc: 'Captures UTMs, gclid, fbclid, ttclid, referrers, and syncs persistent visitor UUID.',
      tag: 'POST /v1/touches',
    },
    {
      step: '02',
      title: 'Identity Resolution',
      desc: 'Binds anonymous multi-device touches to a known customer email or phone.',
      tag: 'POST /v1/identify',
    },
    {
      step: '03',
      title: 'Freeze Checkout Token',
      desc: 'Freezes touch history into an immutable token (cs_sec_...) passed to payments.',
      tag: 'POST /v1/checkout-sessions',
    },
    {
      step: '04',
      title: 'Gateway Hook / Direct Ingest',
      desc: 'Stripe, PayPal, or Razorpay webhook sends token, or client calls createOrder().',
      tag: 'POST /v1/orders',
    },
    {
      step: '05',
      title: '6-Model Attribution',
      desc: 'Backend splits revenue across First, Last, Linear, Time-Decay, U-Shaped, and Non-Direct.',
      tag: 'Real-time Credit',
    },
  ];

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

      {/* Attribution Lifecycle Flow Cards */}
      <div id="how-it-works" className="mt-14 scroll-mt-24">
        <div className="mb-5">
          <h3 className="font-heading text-xl font-bold text-stone-900 tracking-tight">
            The Attribution Waterfall Flow
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            How visitor clicks travel through the browser SDK into immutable attribution credits:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {steps.map((st) => (
            <div
              key={st.step}
              className="relative flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-stone-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-stone-400">
                    STEP {st.step}
                  </span>
                  <span className="rounded font-mono text-[10px] font-semibold px-1.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-600">
                    {st.tag}
                  </span>
                </div>
                <h4 className="font-heading text-sm font-bold text-stone-900 mb-1.5">
                  {st.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
